export type ProjectStatus = 'released' | 'active-dev' | 'planned' | 'prototype'

export interface ProjectFeature {
  title: {
    ru: string
    en: string
  }
  description: {
    ru: string
    en: string
  }
  implemented: boolean
}

export interface ProjectItem {
  id: string
  slug: string
  name: string
  role: {
    ru: string
    en: string
  }
  tagline: {
    ru: string
    en: string
  }
  summary: {
    ru: string
    en: string
  }
  fullDescription: {
    ru: string[]
    en: string[]
  }
  status: ProjectStatus
  statusLabel: {
    ru: string
    en: string
  }
  versionBadge: string
  license: string
  language: string
  technologies: string[]
  ecosystemRole: 'core-runtime' | 'api-daemon' | 'control-plane' | 'standalone'
  links: {
    github?: string
    website?: string
    docs?: string
  }
  architecture: {
    ru: string
    en: string
  }
  commandExample?: string
  features: ProjectFeature[]
  isFeatured: boolean
}

export const projectsData: ProjectItem[] = [
  {
    id: 'cardinal',
    slug: 'cardinal',
    name: 'Cardinal',
    role: {
      ru: 'Флагманский проект: лёгкий daemonless container runtime',
      en: 'Flagship Project: Lightweight Daemonless Container Runtime'
    },
    tagline: {
      ru: 'No daemon. No Docker. Just containers.',
      en: 'No daemon. No Docker. Just containers.'
    },
    summary: {
      ru: 'Статический бинарный файл (~5 МБ) на Go, запускающий OCI-контейнеры напрямую через Linux namespaces (PID, Mount, Net, UTS, IPC), cgroups v2 и OverlayFS без постоянного фонового сервиса.',
      en: 'A static ~5 MB binary in Go that runs OCI containers directly via Linux namespaces (PID, Mount, Net, UTS, IPC), cgroups v2, and OverlayFS with zero background daemon overhead.'
    },
    fullDescription: {
      ru: [
        'Cardinal решает фундаментальную задачу запуска изолированных рабочих нагрузок на Linux без громоздкой инфраструктуры daemon-сервисов. В отличие от традиционных решений с непрерывно работающим root-демоном, Cardinal выполняет запуск изолированного процесса и завершает управляющий контекст, снижая потребление памяти хоста.',
        'Рантайм поддерживает загрузку и распаковку OCI-образов из реестров, мостовую и host-сеть, динамическое управление портами без перезапуска контейнера (cardinal port add/rm), живой мониторинг ресурсов через cgroups v2 (cardinal stats), подключение через Unix socket (cardinal attach) и кластерную оркестрацию.',
        'Проект распространяется в форматах .deb, .rpm, .apk, .snap, а также в виде самодостаточного AppImage и статического бинарника.'
      ],
      en: [
        'Cardinal addresses the challenge of running isolated Linux workloads without the memory and process overhead of persistent background daemons. Unlike traditional container platforms that rely on a continuous daemon, Cardinal spawns container processes and releases host overhead.',
        'The runtime natively supports pulling and extracting OCI images from container registries, bridge and host networking, dynamic port mapping without container restarts (cardinal port add/rm), real-time cgroups v2 resource metrics (cardinal stats), Unix-socket attachments (cardinal attach), and cluster orchestration.',
        'Distributed via native .deb, .rpm, .apk, .snap packages, self-contained AppImage bundles, and raw static binaries.'
      ]
    },
    status: 'active-dev',
    statusLabel: {
      ru: 'Активная разработка · v2.4.x',
      en: 'Active Development · v2.4.x'
    },
    versionBadge: 'v2.4.13',
    license: 'Apache-2.0',
    language: 'Go',
    technologies: ['Go', 'Linux Namespaces', 'cgroups v2', 'OverlayFS', 'iptables', 'OCI Specification', 'Unix Sockets'],
    ecosystemRole: 'core-runtime',
    links: {
      github: 'https://github.com/animesao/cardinal'
    },
    architecture: {
      ru: 'Чистый CLI-рантайм на Go. Взаимодействие с ядром через unshare, nsenter, cgroups v2 и Netlink. Отдельный режим `cardinal serve` предоставляет совместимый HTTP API для внешних агентов управления.',
      en: 'Pure CLI runtime in Go. Direct Linux kernel interaction via unshare, nsenter, cgroups v2, and Netlink. Dedicated `cardinal serve` mode provides an HTTP API for external management daemons.'
    },
    commandExample: 'cardinal run -d -n web -p 8081:80 nginx:alpine\ncardinal stats web\ncardinal port add web 9000:9000',
    features: [
      {
        title: { ru: 'Daemonless архитектура', en: 'Daemonless Architecture' },
        description: { ru: 'Никаких постоянных процессов-демонов в памяти между запусками команд', en: 'Zero resident background processes between command invocations' },
        implemented: true
      },
      {
        title: { ru: 'Статический бинарник ~5 МБ', en: '~5 MB Static Binary' },
        description: { ru: 'Автономная сборка без внешних динамических зависимостей', en: 'Self-contained binary with zero external dynamic library dependencies' },
        implemented: true
      },
      {
        title: { ru: 'Поддержка OCI-образов', en: 'OCI Image Compatibility' },
        description: { ru: 'Загрузка и распаковка слоёв Docker Hub и стандартных OCI-реестров', en: 'Direct layer pull and extraction from Docker Hub and compliant OCI registries' },
        implemented: true
      },
      {
        title: { ru: 'Динамическое управление портами', en: 'Dynamic Port Forwarding' },
        description: { ru: 'Добавление и удаление портов на лету без перезапуска контейнера', en: 'Live addition and removal of host port mappings without stopping containers' },
        implemented: true
      },
      {
        title: { ru: 'Живая статистика cgroups v2', en: 'Live cgroups v2 Metrics' },
        description: { ru: 'Стриминг потребления CPU, памяти, I/O и PID в реальном времени', en: 'Streaming real-time CPU, RAM, I/O, and PID metrics from cgroup v2 controllers' },
        implemented: true
      },
      {
        title: { ru: 'Кластерная оркестрация и FaaS', en: 'Cluster Orchestration & FaaS' },
        description: { ru: 'Поддержка распределённых нод и функций-как-сервис на базе встроенного оркестратора', en: 'Multi-node workload dispatch and serverless function primitives via internal orchestrator' },
        implemented: true
      }
    ],
    isFeatured: true
  },
  {
    id: 'cardinal-wings',
    slug: 'cardinal-wings',
    name: 'Cardinal Wings',
    role: {
      ru: 'REST API демон и фасад управления экосистемы Cardinal',
      en: 'REST API Daemon & Control Plane Facade for Cardinal'
    },
    tagline: {
      ru: 'REST API daemon for remote management and cluster control.',
      en: 'REST API daemon for remote management and cluster control.'
    },
    summary: {
      ru: 'Высокопроизводительный HTTP REST API демон на Go, выступающий связующим звеном между рантаймом Cardinal и веб-панелью управления Cardinal Panel.',
      en: 'High-performance HTTP REST API daemon in Go acting as the unified control interface between the Cardinal runtime and Cardinal Panel.'
    },
    fullDescription: {
      ru: [
        'cardinal-wings — это отдельный Go-модуль, предоставляющий унифицированный HTTP API интерфейс для удалённого управления одним хостом или всем кластером Cardinal без необходимости прямого SSH-доступа.',
        'Демон реализует строгую аутентификацию по Bearer токенам с разграничением ролей (readonly / admin), ограничение частоты запросов (rate limiting), аудит всех модифицирующих операций, живой стриминг логов и интерактивных сессий (exec) по Server-Sent Events (SSE).',
        'Включает встроенный изолированный SFTP-сервер для защищённого доступа к файлам каждого отдельного контейнера.'
      ],
      en: [
        'cardinal-wings is an independent Go daemon providing a unified HTTP API interface for managing single nodes or entire Cardinal clusters without requiring direct SSH shell access.',
        'The daemon enforces strict constant-time Bearer token authentication with role-based access control (readonly / admin), per-IP/key rate limiting, comprehensive audit logging of administrative mutations, and live streaming of logs and interactive terminal sessions via Server-Sent Events (SSE).',
        'Includes an integrated, per-container SFTP server for secure file management without exposing host credentials.'
      ]
    },
    status: 'active-dev',
    statusLabel: {
      ru: 'Активная разработка · v0.5.x',
      en: 'Active Development · v0.5.x'
    },
    versionBadge: 'v0.5.20',
    license: 'AGPL-3.0-or-later',
    language: 'Go',
    technologies: ['Go', 'REST API', 'Server-Sent Events (SSE)', 'RBAC', 'SFTP Server', 'Prometheus Metrics'],
    ecosystemRole: 'api-daemon',
    links: {
      github: 'https://github.com/animesao/cardinal-wings'
    },
    architecture: {
      ru: 'Управляет локальным узлом через внутренний HTTP API `cardinal serve`, маршрутизирует запросы на удалённые ноды кластера по параметру `?node=<name>`, предоставляет потоковые SSE-каналы и SFTP.',
      en: 'Communicates with the local node via loopback `cardinal serve` HTTP API, routes cluster commands via `?node=<name>`, and exposes SSE streaming and embedded SFTP.'
    },
    commandExample: 'cardinal-wings --config /etc/cardinal-wings/config.toml\ncurl -H "Authorization: Bearer $KEY" http://localhost:8080/v1/system/info',
    features: [
      {
        title: { ru: 'Собственный REST API контракт', en: 'Custom REST API Contract' },
        description: { ru: 'Полноценные эндпоинты управления контейнерами, образами, сетями и кластером', en: 'Dedicated endpoints for container lifecycle, images, networks, and cluster nodes' },
        implemented: true
      },
      {
        title: { ru: 'Потоковый SSE-вывод', en: 'Real-Time SSE Streaming' },
        description: { ru: 'Стриминг логов в реальном времени и интерактивный терминальный ввод/вывод', en: 'Live event streaming, log follow, and interactive terminal input/output via SSE' },
        implemented: true
      },
      {
        title: { ru: 'Ролевая модель и аудит', en: 'Role-Based Access & Audit Log' },
        description: { ru: 'Разграничение прав readonly/admin и ведение ротируемого журнала wings-audit.jsonl', en: 'Readonly/admin permissions with rotated audit logging in wings-audit.jsonl' },
        implemented: true
      },
      {
        title: { ru: 'Встроенный SFTP для контейнеров', en: 'Integrated Per-Container SFTP' },
        description: { ru: 'Изолированный доступ к файловой системе контейнеров по SFTP на отдельном порту', en: 'Isolated filesystem access per container over SFTP on a dedicated port' },
        implemented: true
      }
    ],
    isFeatured: true
  },
  {
    id: 'cardinal-panel',
    slug: 'cardinal-panel',
    name: 'Cardinal Panel',
    role: {
      ru: 'Панель управления серверами и хостингом на Cardinal',
      en: 'Server & Container Control Panel on Cardinal'
    },
    tagline: {
      ru: 'Full-featured web control panel for servers and game hosting.',
      en: 'Full-featured web control panel for servers and game hosting.'
    },
    summary: {
      ru: 'Полнофункциональная веб-панель управления игровыми серверами и контейнерами на базе Nuxt 4, Vue 3, Drizzle ORM (SQLite / MySQL) и WebSocket-консоли, взаимодействующая с нодами через Cardinal Wings.',
      en: 'Full-featured web management dashboard for dedicated game servers and containers built with Nuxt 4, Vue 3, Drizzle ORM (SQLite / MySQL), and WebSocket terminal, communicating with nodes via Cardinal Wings.'
    },
    fullDescription: {
      ru: [
        'Cardinal Panel — это современная графическая панель управления серверами (включая Minecraft Paper, Fabric, BungeeCord, Discord-ботов и кастомные приложения), работающая поверх рантайма Cardinal через агент Cardinal Wings.',
        'Панель не взаимодействует с контейнерами хоста напрямую: управление происходит централизованно через REST API демона wings. Каждый сервер идентифицируется стабильным именем `srv-<uuid>`, что гарантирует сохранность данных и отсутствие привязки к случайным системным ID.',
        'Стек реализации: Nuxt 4, Vue 3, TypeScript, Tailwind CSS, Drizzle ORM (поддержка SQLite из коробки и MySQL), WebSocket для интерактивной консоли, Monaco Editor для редактирования файлов конфигурации и двухфакторная аутентификация (2FA).'
      ],
      en: [
        'Cardinal Panel is a modern web control panel for managing game servers (Minecraft Paper, Fabric, BungeeCord, bots, and custom applications) running on Cardinal through the Cardinal Wings agent.',
        'The panel never accesses host containers directly: orchestration is handled via the Cardinal Wings REST API. Containers are tracked using deterministic identifiers (`srv-<uuid>`), eliminating migration drift and surviving container reinstalls.',
        'Implementation stack: Nuxt 4, Vue 3, TypeScript, Tailwind CSS, Drizzle ORM (SQLite default with MySQL support), WebSocket for real-time console streaming, Monaco Editor for in-browser configuration editing, and 2FA authentication.'
      ]
    },
    status: 'active-dev',
    statusLabel: {
      ru: 'Активная разработка · v0.6.x',
      en: 'Active Development · v0.6.x'
    },
    versionBadge: 'v0.6.7',
    license: 'Apache-2.0',
    language: 'TypeScript',
    technologies: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Tailwind CSS', 'Drizzle ORM', 'SQLite', 'MySQL', 'WebSocket', 'Monaco Editor'],
    ecosystemRole: 'control-plane',
    links: {
      github: 'https://github.com/animesao/cardinal-panel'
    },
    architecture: {
      ru: 'Браузер ──► Cardinal Panel (Nuxt, :3000) ──► Wings-нода (:8080) ──► Cardinal serve ──► Контейнер. Все консольные сессии, файлы и бэкапы изолированы и проходят через авторизованный API.',
      en: 'Browser ──► Cardinal Panel (Nuxt, :3000) ──► Wings Node (:8080) ──► Cardinal serve ──► Container. Real-time console, filesystem access, and backups stream through authenticated API boundaries.'
    },
    commandExample: 'curl -fsSL https://raw.githubusercontent.com/animesao/cardinal-panel/main/install.sh | sudo bash',
    features: [
      {
        title: { ru: 'WebSocket консоль в реальном времени', en: 'Real-Time WebSocket Console' },
        description: { ru: 'Интерактивный ввод команд и отображение цветных ANSI-логов через xterm/ansi-to-html', en: 'Interactive command dispatch and ANSI log streaming via WebSocket' },
        implemented: true
      },
      {
        title: { ru: 'Файловый менеджер и Monaco Editor', en: 'File Manager & Monaco Editor' },
        description: { ru: 'Управление файлами сервера, подсветка синтаксиса и безопасный SFTP', en: 'In-browser code editor with syntax highlighting, file upload, and SFTP bridge' },
        implemented: true
      },
      {
        title: { ru: 'Детерминированная адресация серверов', en: 'Deterministic Server Addressing' },
        description: { ru: 'Именование `srv-<uuid>`, сохраняющее конфигурацию при переустановке', en: 'Stable `srv-<uuid>` container naming surviving rebuilds and updates' },
        implemented: true
      },
      {
        title: { ru: 'Управление несколькими нодами', en: 'Multi-Node Cluster Management' },
        description: { ru: 'Подключение и мониторинг нескольких узлов Cardinal Wings через API', en: 'Orchestrating distributed nodes running Cardinal Wings through uniform API' },
        implemented: true
      }
    ],
    isFeatured: true
  }
]
