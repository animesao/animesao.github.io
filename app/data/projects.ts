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
  versionBadge?: string
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
      github: 'https://github.com/animesao/cardinal',
      website: 'https://cardinal.work.gd/'
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
      ru: 'Высокопроизводительный HTTP REST API демон на Go, выступающий связующим звеном между рантаймом Cardinal и внешней веб-панелью управления (@cardinal-panel).',
      en: 'High-performance HTTP REST API daemon in Go acting as the unified control interface between the Cardinal runtime and external control panels (@cardinal-panel).'
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
      ru: 'v1 Live · Активная поддержка',
      en: 'v1 Live · Active Production'
    },
    versionBadge: 'v1 Live',
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
    name: '@cardinal-panel',
    role: {
      ru: 'Планируемая веб-панель управления серверами и хостингом',
      en: 'Planned Web Hosting & Server Infrastructure Control Panel'
    },
    tagline: {
      ru: 'Next-generation web interface for Cardinal infrastructure.',
      en: 'Next-generation web interface for Cardinal infrastructure.'
    },
    summary: {
      ru: 'Проектируемая панель управления инфраструктурой, хостингом серверов и кластерами Cardinal. Выбранное архитектурное направление: PHP + Laravel.',
      en: 'Planned infrastructure and hosting management dashboard for Cardinal clusters. Architecture direction: PHP + Laravel.'
    },
    fullDescription: {
      ru: [
        '@cardinal-panel — это планируемый графический интерфейс управления экосистемой Cardinal, предназначенный для администраторов хостинга и разработчиков.',
        'В качестве технологического стека выбрана связка PHP + Laravel, обеспечивающая надёжную структуру работы с базами данных, очередями задач, аутентификацией пользователей и взаимодействием с REST API демона cardinal-wings.',
        'Проект находится на этапе архитектурного проектирования и формирования контрактов взаимодействия. Статус строго зафиксирован как «Запланировано», без вымышленных релизов.'
      ],
      en: [
        '@cardinal-panel is the envisioned web control panel for the Cardinal ecosystem, tailored for server administrators and hosting infrastructure management.',
        'PHP and Laravel have been selected as the implementation stack, providing robust primitives for queue processing, database migrations, authentication, and HTTP integration with cardinal-wings.',
        'The project is currently in the architectural design and API contract definition phase. Status is honestly recorded as Planned with zero speculative releases.'
      ]
    },
    status: 'planned',
    statusLabel: {
      ru: 'На этапе проектирования · Planned',
      en: 'In Architecture Planning · Planned'
    },
    versionBadge: 'Roadmap',
    license: 'TBD',
    language: 'PHP',
    technologies: ['PHP', 'Laravel', 'REST Integration', 'Server Management', 'Infrastructure UI'],
    ecosystemRole: 'control-plane',
    links: {},
    architecture: {
      ru: 'Классическое веб-приложение на Laravel, взаимодействующее с нодами через API cardinal-wings с использованием OpenAPI-спецификации.',
      en: 'Web application built with Laravel communicating with cluster nodes via the cardinal-wings REST API generated from its OpenAPI specification.'
    },
    features: [
      {
        title: { ru: 'Управление нодами и кластером', en: 'Node & Cluster Administration' },
        description: { ru: 'Централизованный интерфейс мониторинга распределённых нод Cardinal', en: 'Centralized UI for orchestrating multi-node Cardinal environments' },
        implemented: false
      },
      {
        title: { ru: 'Визуальный менеджер контейнеров', en: 'Visual Container Management' },
        description: { ru: 'Интерфейс запуска, остановки, настройки портов и переменных окружения', en: 'Web UI for container lifecycle, port configuration, and env vars' },
        implemented: false
      },
      {
        title: { ru: 'Интеграция с cardinal-wings', en: 'Native cardinal-wings Bridge' },
        description: { ru: 'Авторизованное взаимодействие по OpenAPI контракту с безопасными токенами', en: 'Authorized OpenAPI client interaction with bearer tokens' },
        implemented: false
      }
    ],
    isFeatured: true
  }
]
