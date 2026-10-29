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
      ru: 'Ключевые языки реализации проектов, системных рантаймов и веб-приложений.',
      en: 'Core implementation languages across systems engineering and full-stack applications.'
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
          ru: 'Основной язык рантайма Cardinal и демона Cardinal Wings. Системные вызовы Linux, cgroups v2, namespaces, сетевые мосты и конкурентные HTTP/SSE-серверы.',
          en: 'Primary systems language powering the Cardinal runtime and Cardinal Wings daemon. Direct Linux syscalls, cgroups v2, namespaces, Netlink, and SSE streaming.'
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
          ru: 'В ключевых проектах',
          en: 'In Core Projects'
        },
        context: {
          ru: 'Основной язык веб-экосистемы: разработка веб-панели Cardinal Panel (Nuxt 4, Drizzle ORM), этого персонального сайта, утилит и API-интеграций.',
          en: 'Core language for web engineering: powering Cardinal Panel (Nuxt 4, Drizzle ORM), this personal portfolio website, utilities, and API bridges.'
        },
        icon: 'i-simple-icons-typescript',
        highlight: true
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
          ru: 'Применяется для прикладного скриптинга, автоматизации рутинных задач, вспомогательных ботов и исследования алгоритмов.',
          en: 'Used for practical scripting, automation workflows, service bots, and algorithmic experiments.'
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
      ru: 'Инструменты построения интерфейсов, серверных приложений и баз данных.',
      en: 'Modern UI engineering, full-stack application frameworks, and database layers.'
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
          ru: 'Основной фреймворк для веб-приложений: на нём реализованы Cardinal Panel (full-stack с серверным Nitro и Drizzle ORM) и этот сайт (SSG-архитектура).',
          en: 'Core web framework: powers both Cardinal Panel (full-stack with Nitro server and Drizzle ORM) and this site (SSG architecture).'
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
          ru: 'Composition API, строгая типизация в SFC, реактивное состояние интерфейсов и консолей.',
          en: 'Composition API, strict typing across SFCs, and real-time reactive state management for dashboard and console.'
        },
        icon: 'i-simple-icons-vuedotjs',
        highlight: true
      },
      {
        id: 'drizzle',
        name: 'Drizzle ORM & SQLite / MySQL',
        category: 'web',
        status: 'in-projects',
        statusLabel: {
          ru: 'В Cardinal Panel',
          en: 'In Cardinal Panel'
        },
        context: {
          ru: 'Слой данных Cardinal Panel: строго типизированные схемы, автоматические миграции, поддержка локального SQLite и внешнего MySQL.',
          en: 'Data layer in Cardinal Panel: type-safe schemas, automated migrations, out-of-the-box SQLite with production MySQL support.'
        },
        icon: 'i-simple-icons-sqlite',
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
          ru: 'Стилизация интерфейсов, кастомные утилиты и дизайн-токены.',
          en: 'Interface styling, custom utility layers, and consistent design tokens.'
        },
        icon: 'i-simple-icons-tailwindcss',
        highlight: true
      }
    ]
  },
  {
    id: 'systems',
    title: {
      ru: 'Инфраструктура и системные технологии',
      en: 'Systems, Tooling & Infrastructure'
    },
    description: {
      ru: 'Контейнерные примитивы Linux, средства контроля версий и среды сборки.',
      en: 'Linux containerization primitives, version control systems, and build tooling.'
    },
    items: [
      {
        id: 'linux-primitives',
        name: 'Linux Namespaces & cgroups v2',
        category: 'systems',
        status: 'in-projects',
        statusLabel: {
          ru: 'В рантайме Cardinal',
          en: 'In Cardinal Runtime'
        },
        context: {
          ru: 'Прямая изоляция процессов через unshare (PID/Mount/Net/UTS/IPC), контроль ресурсов через cgroups v2 и оверлейная ФС OverlayFS.',
          en: 'Direct Linux process isolation via unshare, fine-grained cgroups v2 resource controllers, and OverlayFS layered filesystem.'
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
          ru: 'Основная площадка для открытого исходного кода, релизов и управления версиями (Cardinal, Wings, Panel).',
          en: 'Primary platform for open-source repositories, releases, and versioning across the entire ecosystem.'
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
