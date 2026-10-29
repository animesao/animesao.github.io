export type TechStatus = 'in-projects' | 'current-stack' | 'planned' | 'learning'

export interface TechItem {
  id: string
  name: string
  category: 'languages' | 'web' | 'systems' | 'ai-tooling'
  status: TechStatus
  statusLabel: {
    ru: string
    en: string
  }
  context: {
    ru: string
    en: string
  }
  icon: string
  highlight?: boolean
}

export interface TechCategory {
  id: string
  title: {
    ru: string
    en: string
  }
  description: {
    ru: string
    en: string
  }
  items: TechItem[]
}

export const techStackData: TechCategory[] = [
  {
    id: 'languages',
    title: {
      ru: 'Языки программирования',
      en: 'Programming Languages'
    },
    description: {
      ru: 'Ключевые языки реализации проектов, веб-разработки и архитектурных направлений.',
      en: 'Core implementation languages across systems engineering, web development, and planned tools.'
    },
    items: [
      {
        id: 'go',
        name: 'Go',
        category: 'languages',
        status: 'in-projects',
        statusLabel: {
          ru: 'В ключевых проектах',
          en: 'In Core Projects'
        },
        context: {
          ru: 'Основной язык рантайма Cardinal и сервиса Cardinal Wings. Работа с системными вызовами Linux, сетевыми мостами, cgroups v2 и конкурентными сервисами.',
          en: 'Primary language powering the Cardinal runtime and Cardinal Wings. Low-level Linux syscalls, bridge networking, cgroups v2, and concurrent servers.'
        },
        icon: 'i-simple-icons-go',
        highlight: true
      },
      {
        id: 'typescript',
        name: 'TypeScript & JavaScript',
        category: 'languages',
        status: 'in-projects',
        statusLabel: {
          ru: 'В проектах и инструментах',
          en: 'In Projects & Tooling'
        },
        context: {
          ru: 'Основной язык создания современных веб-приложений, включая этот сайт на Nuxt 4, интерфейсы и скрипты автоматизации.',
          en: 'Core language for modern web applications, including this Nuxt 4 personal website, frontend interfaces, and automation utilities.'
        },
        icon: 'i-simple-icons-typescript',
        highlight: true
      },
      {
        id: 'php-laravel',
        name: 'PHP & Laravel',
        category: 'languages',
        status: 'planned',
        statusLabel: {
          ru: 'Направление @cardinal-panel',
          en: 'Planned for @cardinal-panel'
        },
        context: {
          ru: 'Выбранный технологический стек для проектируемой веб-панели управления серверами и хостингом @cardinal-panel.',
          en: 'Target architecture chosen for the upcoming server and hosting control panel @cardinal-panel.'
        },
        icon: 'i-simple-icons-php',
        highlight: false
      },
      {
        id: 'python',
        name: 'Python',
        category: 'languages',
        status: 'learning',
        statusLabel: {
          ru: 'Эксперименты и автоматизация',
          en: 'Experiments & Automation'
        },
        context: {
          ru: 'Применяется для прикладного программирования, вспомогательных скриптов, Discord-ботов и исследовательских задач.',
          en: 'Used for practical scripting, Discord bot prototypes, automation tasks, and programming research.'
        },
        icon: 'i-simple-icons-python',
        highlight: false
      },
      {
        id: 'html-css',
        name: 'HTML5 & Modern CSS',
        category: 'languages',
        status: 'in-projects',
        statusLabel: {
          ru: 'В проектах',
          en: 'In Projects'
        },
        context: {
          ru: 'Семантическая разметка, CSS переменные, тёмная тема, адаптивные сетки и доступность (a11y).',
          en: 'Semantic markup, CSS custom properties, native dark mode, responsive layouts, and accessibility standards.'
        },
        icon: 'i-simple-icons-html5',
        highlight: false
      }
    ]
  },
  {
    id: 'web',
    title: {
      ru: 'Веб-разработка и интерфейсы',
      en: 'Web Development & Interfaces'
    },
    description: {
      ru: 'Инструменты построения интерфейсов, статической генерации и организации клиентского кода.',
      en: 'Modern UI engineering, static generation pipelines, and frontend architecture.'
    },
    items: [
      {
        id: 'nuxt',
        name: 'Nuxt 4',
        category: 'web',
        status: 'current-stack',
        statusLabel: {
          ru: 'Текущий стек',
          en: 'Current Stack'
        },
        context: {
          ru: 'Фреймворк этого сайта: архитектура статической генерации (SSG), файловая маршрутизация Nuxt 4 и локализация.',
          en: 'Framework powering this site: static site generation (SSG), Nuxt 4 file routing, and internationalization.'
        },
        icon: 'i-simple-icons-nuxtdotjs',
        highlight: true
      },
      {
        id: 'vue',
        name: 'Vue 3',
        category: 'web',
        status: 'current-stack',
        statusLabel: {
          ru: 'Текущий стек',
          en: 'Current Stack'
        },
        context: {
          ru: 'Composition API, строгая типизация в Single File Components, предсказуемое состояние интерфейса.',
          en: 'Composition API, strict typing across SFCs, and predictable reactive state architecture.'
        },
        icon: 'i-simple-icons-vuedotjs',
        highlight: true
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS 4',
        category: 'web',
        status: 'current-stack',
        statusLabel: {
          ru: 'Текущий стек',
          en: 'Current Stack'
        },
        context: {
          ru: 'Новейший движок стилизации Tailwind 4 с direct CSS переменными и высокой скоростью сборки.',
          en: 'Latest Tailwind 4 CSS engine utilizing native CSS variables, container queries, and sub-second builds.'
        },
        icon: 'i-simple-icons-tailwindcss',
        highlight: true
      },
      {
        id: 'nuxt-ui',
        name: 'Nuxt UI 4',
        category: 'web',
        status: 'current-stack',
        statusLabel: {
          ru: 'Текущий стек',
          en: 'Current Stack'
        },
        context: {
          ru: 'Библиотека доступных компонентов с поддержкой дизайн-токенов и адаптивной вёрстки.',
          en: 'Accessible UI component layer powered by Tailwind CSS tokens and keyboard navigation.'
        },
        icon: 'i-lucide-component',
        highlight: false
      }
    ]
  },
  {
    id: 'systems',
    title: {
      ru: 'Инфраструктура и инструменты разработки',
      en: 'Systems, Tooling & Infrastructure'
    },
    description: {
      ru: 'Инструменты контроля версий, среды сборки и низкоуровневые технологии контейнеризации.',
      en: 'Version control, packaging formats, and underlying Linux containerization primitives.'
    },
    items: [
      {
        id: 'linux-primitives',
        name: 'Linux Namespaces & cgroups v2',
        category: 'systems',
        status: 'in-projects',
        statusLabel: {
          ru: 'В проекте Cardinal',
          en: 'In Cardinal Runtime'
        },
        context: {
          ru: 'Прямая изоляция процессов через unshare (PID/Mount/Net/UTS/IPC) и контроль ресурсов CPU/RAM через cgroups v2.',
          en: 'Direct Linux process isolation via unshare and fine-grained CPU/memory control through cgroups v2 controllers.'
        },
        icon: 'i-simple-icons-linux',
        highlight: true
      },
      {
        id: 'git-github',
        name: 'Git & GitHub',
        category: 'systems',
        status: 'current-stack',
        statusLabel: {
          ru: 'Постоянно',
          en: 'Daily Use'
        },
        context: {
          ru: 'Основная площадка для открытого исходного кода, публикации релизов, трекинга задач и версионирования.',
          en: 'Primary platform for open-source codebases, release distribution, issue tracking, and versioning.'
        },
        icon: 'i-simple-icons-github',
        highlight: true
      },
      {
        id: 'node-pnpm',
        name: 'Node.js & pnpm',
        category: 'systems',
        status: 'current-stack',
        statusLabel: {
          ru: 'Текущий стек',
          en: 'Current Stack'
        },
        context: {
          ru: 'Быстрый менеджер пакетов с контентно-адресуемым хранилищем и среда выполнения инструментов сборки.',
          en: 'Fast package manager with content-addressable storage and modern runtime for developer tooling.'
        },
        icon: 'i-simple-icons-pnpm',
        highlight: false
      }
    ]
  },
  {
    id: 'ai-tooling',
    title: {
      ru: 'AI-assisted Development Среда',
      en: 'AI-Assisted Development Workflow'
    },
    description: {
      ru: 'Фактический набор инструментов, используемый для ускорения разработки и верификации решений.',
      en: 'Confirmed tooling stack used to accelerate design exploration, synthesis, and code verification.'
    },
    items: [
      {
        id: 'opencode',
        name: 'OpenCode',
        category: 'ai-tooling',
        status: 'current-stack',
        statusLabel: {
          ru: 'Основная среда',
          en: 'Primary Environment'
        },
        context: {
          ru: 'Основная рабочая среда для AI-ассистивной разработки, рефакторинга и работы с кодовой базой.',
          en: 'Primary working IDE environment for AI-assisted development, refactoring, and codebase navigation.'
        },
        icon: 'i-lucide-code-2',
        highlight: true
      },
      {
        id: 'gemini-flash',
        name: 'Gemini 3.8 Flash',
        category: 'ai-tooling',
        status: 'current-stack',
        statusLabel: {
          ru: 'Основная модель',
          en: 'Primary AI Model'
        },
        context: {
          ru: 'Основная используемая модель ИИ: анализ архитектуры, ускорение рутинных операций, генерация вариантов решений и поиск ошибок.',
          en: 'Primary AI model: architectural analysis, accelerating routine implementation, alternative synthesis, and bug discovery.'
        },
        icon: 'i-lucide-sparkle',
        highlight: true
      }
    ]
  }
]
