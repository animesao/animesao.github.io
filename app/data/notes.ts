export interface NoteSection {
  title?: {
    ru: string
    en: string
  }
  content: {
    ru: string
    en: string
  }
  code?: {
    language: string
    snippet: string
    caption?: string
  }
  callout?: {
    ru: string
    en: string
  }
}

export interface NoteItem {
  id: string
  slug: string
  title: {
    ru: string
    en: string
  }
  summary: {
    ru: string
    en: string
  }
  category: {
    ru: string
    en: string
  }
  date: string
  readTime: {
    ru: string
    en: string
  }
  tags: string[]
  takeaways: {
    ru: string[]
    en: string[]
  }
  sections: NoteSection[]
}

export const notesData: NoteItem[] = [
  {
    id: 'panel-wings-architecture',
    slug: 'panel-wings-architecture',
    title: {
      ru: 'Архитектура связки Cardinal Panel и Cardinal Wings: от браузерного терминала до cgroups v2',
      en: 'Cardinal Panel & Cardinal Wings Architecture: From In-Browser Terminal to cgroups v2'
    },
    summary: {
      ru: 'Глубокий технический разбор многоуровневой архитектуры: разделение веб-контроллера (Nuxt 4 + Drizzle) и нодового демона на Go, проксирование WebSocket, потоковые логи через SSE и детерминированная адресация srv-<uuid>.',
      en: 'An in-depth technical analysis of multi-tier architecture: decoupling the Nuxt 4 + Drizzle control plane from the Go node daemon, WebSocket proxying, SSE log streams, and deterministic srv-<uuid> addressing.'
    },
    category: {
      ru: 'Архитектура & Системы',
      en: 'Architecture & Systems'
    },
    date: '2026-10-29',
    readTime: {
      ru: '7 мин чтения',
      en: '7 min read'
    },
    tags: ['Cardinal', 'Go', 'Nuxt 4', 'WebSockets', 'SSE', 'SFTP', 'cgroups v2'],
    takeaways: {
      ru: [
        'Панель не имеет прямого доступа к сокету хоста: взаимодействие с узлами происходит строго по защищённому REST API Wings.',
        'Использование детерминированного префикса `srv-<uuid>` устраняет необходимость синхронизировать случайные хэши контейнеров при переустановках.',
        'Потоковый вывод ANSI-логов в браузер организован через Server-Sent Events (SSE), а интерактивный TTY-терминал — через защищённый WebSocket-мост.',
        'Встроенный SFTP-сервер в демоне Wings chroot-изолирует сессию в каталог тома конкретного сервера.'
      ],
      en: [
        'The panel never accesses the host runtime directly: all node interactions are scoped through Wings authenticated REST boundaries.',
        'Deterministic `srv-<uuid>` container naming eliminates database desynchronization during server rebuilds.',
        'ANSI log follow streams use Server-Sent Events (SSE), while interactive PTY sessions run across authenticated WebSocket proxies.',
        'The embedded SFTP daemon in Wings enforces strict per-container chroot boundaries into target volume directories.'
      ]
    },
    sections: [
      {
        title: {
          ru: '1. Топология и разделение ответственности',
          en: '1. Multi-Tier Topology & Decoupling'
        },
        content: {
          ru: 'При проектировании панели управления серверами (PaaS / Game Server Hosting) критически важно не связывать веб-интерфейс напрямую с системными сокетами контейнерного рантайма на хосте. В Cardinal эта задача решена через строгое трёхуровневое разделение: пользовательский браузер взаимодействует только с Nuxt 4 веб-панелью, панель опрашивает агент Cardinal Wings на целевом сервере, а Wings локально управляет процессами через Cardinal.',
          en: 'When designing a server hosting control plane, directly exposing container runtime sockets to the web layer introduces massive attack surfaces. Cardinal adopts a strict three-tier decoupling: browsers interact exclusively with the Nuxt 4 panel, the panel orchestrates remote nodes via Cardinal Wings, and Wings invokes local Cardinal runtime primitives.'
        },
        code: {
          language: 'txt',
          caption: 'Топология сетевых потоков Cardinal Ecosystem',
          snippet: `[ Browser (Client) ]
        │  HTTPS (:443) / WSS (WebSocket Terminal)
        ▼
[ Cardinal Panel (Nuxt 4 + Drizzle ORM) ]  :3000
        │  Bearer Auth · Multi-Node Routing
        ▼
[ Cardinal Wings Daemon (Go) ]  :8080 (REST + SSE) · :2022 (SFTP)
        │  Loopback IPC / HTTP
        ▼
[ Cardinal Runtime (serve) ]  ~5 MB Go Static Binary
        │  clone(2) · setns(2) · pivot_root · cgroups v2
        ▼
[ Isolated Linux Containers (Namespaces + OverlayFS) ]`
        }
      },
      {
        title: {
          ru: '2. Детерминированная адресация: паттерн `srv-<uuid>`',
          en: '2. Deterministic Addressing: The `srv-<uuid>` Pattern'
        },
        content: {
          ru: 'Традиционные панели часто сохраняют в базе данных сгенерированный рантаймом хэш контейнера (например, a1b2c3d4...). При переустановке сервера (reinstall), обновлении базового образа или аварийном падении хэш меняется, что приводит к рассинхронизации состояния. В связке Panel + Wings контейнер всегда адресуется стабильным именем вида `srv-<server-uuid>`. Демон Wings содержит внутренний резолвер (`resolve.go`), сопоставляющий UUID сервера с живым процессом Cardinal. Панели не требуется мигрировать базу данных при пересоздании контейнера.',
          en: 'Traditional orchestration panels persist runtime-generated container IDs in the primary database. Upon server reinstallation or image re-pulling, these IDs mutate, causing state desynchronization. In the Panel + Wings architecture, containers use a deterministic naming scheme: `srv-<server-uuid>`. Wings incorporates an internal lookup resolver (`resolve.go`) that dynamically matches server UUIDs to live Cardinal runtime descriptors, surviving rebuilds with zero database migrations.'
        },
        code: {
          language: 'go',
          caption: 'cardinal-wings/internal/resolver/resolve.go snippet',
          snippet: `// ResolveContainer converts panel server reference to Cardinal container ID
func (r *Resolver) Resolve(serverRef string) (*ContainerMeta, error) {
    if !strings.HasPrefix(serverRef, "srv-") {
        serverRef = "srv-" + serverRef
    }
    container, err := r.cardinalClient.Inspect(serverRef)
    if err != nil {
        return nil, fmt.Errorf("server %s not found on this node: %w", serverRef, err)
    }
    return container, nil
}`
        }
      },
      {
        title: {
          ru: '3. Потоковый вывод логов и интерактивный терминал',
          en: '3. Streaming Logs & Interactive PTY Terminal'
        },
        content: {
          ru: 'Передача консольного вывода делится на два сценария: чтение архивных и свежих логов, а также интерактивный ввод команд (exec TTY). Для логов Wings предоставляет HTTP эндпоинт с Server-Sent Events (SSE): браузер подписывается на поток, экономя системные ресурсы по сравнению с постоянным polling-опросом. Для интерактивной консоли панель поднимает WebSocket-соединение с Wings, проксируя сырой TTY-поток напрямую в библиотеку xterm.js с поддержкой цветных ANSI-последовательностей.',
          en: 'Console streaming is partitioned into two distinct primitives: continuous log following and interactive PTY execution. For stdout/stderr tracking, Wings exposes an SSE endpoint, streaming new lines with minimal network overhead compared to polling. For interactive terminals, the panel bridges browser WebSockets directly to Wings PTY execution sockets, feeding raw ANSI sequences into xterm.js.'
        },
        callout: {
          ru: 'Важное преимущество: панель не раскрывает внутренний IP-адрес демона Wings конечному пользователю. Все WebSocket-сессии проксируются через защищённый внутренний маршрут панели.',
          en: 'Key security guarantee: the panel never exposes private node Wings IP addresses to clients. All WebSocket sessions are authenticated and proxied through internal backend routes.'
        }
      },
      {
        title: {
          ru: '4. Изолированный SFTP-сервер на порту :2022',
          en: '4. Embedded Chrooted SFTP Server on Port :2022'
        },
        content: {
          ru: 'Управление конфигурационными файлами серверов (например, server.properties для Minecraft или postgresql.conf) требует безопасного файлового доступа. Вместо запуска системного OpenSSH-сервера хоста, демон Cardinal Wings содержит встроенную реализацию SFTP-сервера на Go. При авторизации пользователя Wings валидирует права доступа к конкретному серверу и выполняет строгий chroot в директорию тома контейнера, предотвращая выход за пределы папки сервера.',
          en: 'Managing server configurations (such as server.properties or config.toml) demands secure filesystem operations. Rather than spawning host-level OpenSSH processes, Wings embeds a native Go SFTP daemon listening on port :2022. During handshake, Wings verifies server credentials and strictly chroots the SFTP session to the server volume directory, preventing directory traversal.'
        },
        code: {
          language: 'bash',
          caption: 'Подключение к серверу через SFTP',
          snippet: `# Подключение через стандартный SFTP-клиент
sftp -P 2022 admin.srv-7f8a9b2c@node1.example.com

# Внутренняя структура директории контейнера в Cardinal:
/var/lib/cardinal/containers/srv-7f8a9b2c/
├── config.json          # OCI спецификация процесса и cgroups v2
├── rootfs/              # Смонтированный OverlayFS слой
└── data/                # Персистентный том сервера (SFTP chroot root)`
        }
      },
      {
        title: {
          ru: '5. Модель безопасности: Scoped Bearer Tokens и Loopback',
          en: '5. Security Model: Scoped Bearer Tokens and Loopback'
        },
        content: {
          ru: 'Демон Wings по умолчанию слушает локальный интерфейс (loopback) либо защищается внешним mTLS/Nginx прокси. Доступ к API защищён ролевой моделью токенов (Read-Only, Operator, Node Admin). Это гарантирует, что даже в случае компрометации отдельного сервера злоумышленник не получит доступ к управляющему рантайму хоста.',
          en: 'Wings defaults to loopback or mTLS-protected ingress. API endpoints require scoped Bearer authorization tokens (Read-Only, Operator, Node Admin), ensuring that compromised containers cannot access host-level control planes.'
        }
      }
    ]
  },
  {
    id: 'daemonless-runtime-principles',
    slug: 'daemonless-runtime-principles',
    title: {
      ru: 'Принципы daemonless рантайма: почему Cardinal не требует постоянного фонового сервиса',
      en: 'Principles of a Daemonless Runtime: Why Cardinal Requires No Background Service'
    },
    summary: {
      ru: 'Почему архитектура без демона эффективнее для контейнерных нагрузок: прямое использование clone(2), cgroups v2, OverlayFS и освобождение системных ресурсов сразу после старта контейнера.',
      en: 'Why a daemonless runtime is superior for lean container workloads: direct clone(2) execution, cgroups v2 resource accounting, OverlayFS, and zero idle memory footprint.'
    },
    category: {
      ru: 'Низкоуровневые системы',
      en: 'Systems Programming'
    },
    date: '2026-10-28',
    readTime: {
      ru: '5 мин чтения',
      en: '5 min read'
    },
    tags: ['Linux', 'Go', 'Containers', 'Namespaces', 'OverlayFS', 'cgroups v2'],
    takeaways: {
      ru: [
        'Традиционные рантаймы тратят память хоста на непрерывно работающие root-демоны (dockerd / containerd).',
        'Cardinal настраивает изоляцию (PID, Mount, Net, UTS, IPC), монтирует OverlayFS, применяет лимиты cgroups v2 и завершает управляющий процесс.',
        'Изолированные контейнеры продолжают работать под управлением стандартного ядра Linux (init / systemd).',
        'Динамическое добавление портов (`cardinal port add/rm`) работает через манипуляцию iptables/nftables без перезапуска контейнера.'
      ],
      en: [
        'Traditional runtimes consume host memory on persistent root daemon daemons (dockerd / containerd).',
        'Cardinal configures namespaces, mounts OverlayFS, binds cgroups v2 controllers, and cleanly exits.',
        'Containers continue execution under the supervision of the Linux kernel directly.',
        'Dynamic port assignment (`cardinal port add/rm`) modifies nftables/iptables without container restarts.'
      ]
    },
    sections: [
      {
        title: {
          ru: '1. Проблема постоянного демона в традиционных рантаймах',
          en: '1. The Overhead of Persistent Runtime Daemons'
        },
        content: {
          ru: 'В классической архитектуре Docker или containerd на сервере непрерывно запущен фоновый сервис (daemon), потребляющий от 50 до 150 МБ оперативной памяти даже в состоянии полного простоя (0 запущенных контейнеров). Более того, падение демона создаёт риск разрыва соединений или затрудняет восстановление состояния процессов. Cardinal изначально спроектирован по daemonless-философии: статический бинарник (~5 МБ) вызывается только тогда, когда нужно запустить, остановить или проинспектировать контейнер.',
          en: 'In classical container systems like Docker or containerd, a persistent background daemon consumes 50-150 MB of resident RAM even when idle. Daemon crashes endanger state tracking and active workloads. Cardinal was engineered from first principles around a daemonless philosophy: a static ~5 MB binary runs only when executing, stopping, or inspecting containers.'
        }
      },
      {
        title: {
          ru: '2. Системные примитивы ядра Linux: clone(2) и cgroups v2',
          en: '2. Linux Primitives: clone(2) & cgroups v2'
        },
        content: {
          ru: 'Контейнер в Linux — это не виртуальная машина, а обычный процесс с ограниченным пространством имён. Cardinal использует системный вызов clone(2) с флагами CLONE_NEWPID, CLONE_NEWNS, CLONE_NEWNET, CLONE_NEWUTS и CLONE_NEWIPC. Ограничение потребления ресурсов (CPU shares, memory.max, io.weight) настраивается напрямую через контроллеры современной файловой системы cgroups v2 (`/sys/fs/cgroup/cardinal/<id>`).',
          en: 'Linux containers are standard processes isolated via kernel namespaces. Cardinal invokes clone(2) with CLONE_NEWPID, CLONE_NEWNS, CLONE_NEWNET, CLONE_NEWUTS, and CLONE_NEWIPC flags. Resource constraints (CPU quotas, memory.max, and I/O weights) are enforced directly through native cgroups v2 controllers (`/sys/fs/cgroup/cardinal/<id>`).'
        },
        code: {
          language: 'bash',
          caption: 'Пример ограничения ресурсов в Cardinal CLI',
          snippet: `# Запуск PostgreSQL с лимитом 1 ГБ RAM и 2 ядрами CPU
cardinal run -d --name pg-main \\
  --memory 1024m \\
  --cpus 2 \\
  -p 5432:5432 \\
  postgres:16

# Проверка реального потребления ресурсов через cgroups v2:
cardinal stats pg-main`
        }
      },
      {
        title: {
          ru: '3. Динамический проброс портов без перезапуска',
          en: '3. Dynamic Port Forwarding Without Restarts'
        },
        content: {
          ru: 'Одной из уникальных возможностей Cardinal является динамическое добавление и удаление портов на лету без необходимости пересоздавать контейнер. Команда `cardinal port add <container> <host_port>:<container_port>` напрямую вносит правила NAT в сетевой стек Linux, позволяя подключать новые сервисы в работающий контейнер мгновенно.',
          en: 'A distinct feature of Cardinal is dynamic port forwarding on running workloads without recreation. The command `cardinal port add <container> <host_port>:<container_port>` modifies Linux network NAT tables on the fly, immediately routing incoming packets.'
        }
      }
    ]
  }
]
