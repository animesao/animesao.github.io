export interface FocusArea {
  id: string
  title: {
    ru: string
    en: string
  }
  description: {
    ru: string
    en: string
  }
  icon: string
  isCore: boolean
  tags: string[]
}

export interface DeveloperPrinciple {
  title: {
    ru: string
    en: string
  }
  description: {
    ru: string
    en: string
  }
  code: string
}

export interface ProfileData {
  handle: string
  name: string
  tagline: {
    ru: string
    en: string
  }
  headline: {
    ru: string
    en: string
  }
  summary: {
    ru: string
    en: string
  }
  manifesto: {
    ru: string[]
    en: string[]
  }
  workflow: {
    editor: string
    aiModel: string
    vcs: string
    principles: DeveloperPrinciple[]
  }
  focusAreas: FocusArea[]
}

export const profileData: ProfileData = {
  handle: 'animesao',
  name: 'animesao',
  tagline: {
    ru: 'Software Developer · AI-assisted Development · Автор экосистемы Cardinal',
    en: 'Software Developer · AI-assisted Development · Founder of Cardinal'
  },
  headline: {
    ru: 'Разработка программного обеспечения, инфраструктурных инструментов и веб-приложений с инженерным подходом к AI-assisted development.',
    en: 'Building software, developer infrastructure, and modern web applications with a disciplined approach to AI-assisted engineering.'
  },
  summary: {
    ru: 'Независимый разработчик. Самостоятельно проектирую архитектуру, выбираю технологии и реализую системы, используя современные языковые модели для ускорения анализа, разработки и тестирования. Создатель и мейнтейнер проекта Cardinal — легковесного daemonless контейнерного рантайма на Go.',
    en: 'Independent software developer. I design system architecture, select toolchains, and implement solutions using AI to accelerate reasoning, implementation, and rigorous verification. Author and maintainer of Cardinal — a lightweight daemonless container runtime in Go.'
  },
  manifesto: {
    ru: [
      'Честное позиционирование: я не приписываю себе чужой опыт или фиктивные звания. Я проектирую архитектуру, пишу и валидирую код, решаю прикладные инженерные задачи.',
      'AI-assisted подход: современные языковые модели — мощный рычаг разработчика. Использую OpenCode и Gemini 3.8 Flash для быстрого прототипирования, глубокого рефакторинга и поиска граничных случаев, сохраняя полный контроль над архитектурными решениями.',
      'Открытый код и практическая польза: ключевые проекты публикуются на GitHub под открытыми лицензиями, снабжаются детальной документацией и проверяются в реальных сценариях.'
    ],
    en: [
      'Honest positioning: no exaggerated credentials or fabricated corporate titles. I architect systems, write and verify code, and solve genuine engineering challenges.',
      'AI-assisted methodology: modern LLMs are a developer force-multiplier. I leverage OpenCode and Gemini 3.8 Flash for rapid prototyping, deep refactoring, and edge-case discovery while maintaining absolute ownership of architecture and quality.',
      'Open source & practical utility: core projects are published on GitHub under open licenses with comprehensive technical documentation and reproducible workflows.'
    ]
  },
  workflow: {
    editor: 'OpenCode',
    aiModel: 'Gemini 3.8 Flash',
    vcs: 'Git & GitHub',
    principles: [
      {
        code: 'P-01',
        title: {
          ru: 'Архитектура первична',
          en: 'Architecture First'
        },
        description: {
          ru: 'Качественная модульность, чёткие границы компонентов и ясные интерфейсы важнее поспешного кода.',
          en: 'Clear module boundaries, decoupled interfaces, and predictable data flow take precedence over hasty code.'
        }
      },
      {
        code: 'P-02',
        title: {
          ru: 'Честный статус и верификация',
          en: 'Truth in Status & Verification'
        },
        description: {
          ru: 'Никаких фиктивных бенчмарков или декоративных функций: рабочий код обязан компилироваться, тестироваться и проверяться.',
          en: 'No fabricated benchmarks or decorative placeholders: functional code must build, test, and pass verification.'
        }
      },
      {
        code: 'P-03',
        title: {
          ru: 'Осознанный AI-ассистивный пайплайн',
          en: 'Conscious AI-Assisted Workflow'
        },
        description: {
          ru: 'ИИ ускоряет рутину и анализ, но ответственность за архитектурную целостность и безопасность всегда несёт разработчик.',
          en: 'AI accelerates synthesis and iteration, but final architectural integrity and system safety rest with the developer.'
        }
      },
      {
        code: 'P-04',
        title: {
          ru: 'Элегантный минимализм',
          en: 'Pragmatic Minimalism'
        },
        description: {
          ru: 'Отсутствие избыточных демонов, ненужных фоновых сервисов и тяжеловесных фреймворков там, где достаточно чистого решения.',
          en: 'Eliminating bloated daemons, unnecessary background servers, and heavy dependencies wherever clean primitives suffice.'
        }
      }
    ]
  },
  focusAreas: [
    {
      id: 'containers',
      title: {
        ru: 'Контейнерные рантаймы и низкоуровневые системы',
        en: 'Container Runtimes & Low-Level Systems'
      },
      description: {
        ru: 'Разработка на Go: работа с Linux namespaces, cgroups v2, OverlayFS, сетевыми мостами и запуском OCI-контейнеров без фонового демона.',
        en: 'Go systems engineering: Linux namespaces, cgroups v2, OverlayFS, network bridging, and OCI image execution without background daemons.'
      },
      icon: 'i-lucide-box',
      isCore: true,
      tags: ['Go', 'Linux Namespaces', 'cgroups v2', 'OCI', 'OverlayFS']
    },
    {
      id: 'web-dev',
      title: {
        ru: 'Веб-разработка и инструменты разработчика',
        en: 'Web Applications & Developer Tooling'
      },
      description: {
        ru: 'Создание современных быстрых интерфейсов на Nuxt 4, Vue 3, TypeScript и Tailwind CSS. Архитектура статической генерации и чистые контракты данных.',
        en: 'Building high-performance interfaces using Nuxt 4, Vue 3, TypeScript, and Tailwind CSS. SSG architecture and clean data contracts.'
      },
      icon: 'i-lucide-layout-grid',
      isCore: true,
      tags: ['TypeScript', 'Nuxt 4', 'Vue 3', 'Tailwind CSS', 'SSG']
    },
    {
      id: 'ai-assisted',
      title: {
        ru: 'AI-assisted Development & автоматизация',
        en: 'AI-Assisted Engineering & Automation'
      },
      description: {
        ru: 'Построение эффективных процессов разработки с OpenCode и Gemini 3.8 Flash: быстрое прототипирование, генерация тестов и верификация кода.',
        en: 'Refined engineering pipelines with OpenCode and Gemini 3.8 Flash: rapid prototyping, test generation, and automated verification.'
      },
      icon: 'i-lucide-sparkles',
      isCore: true,
      tags: ['OpenCode', 'Gemini 3.8 Flash', 'Prompt Engineering', 'CI/CD']
    },
    {
      id: 'open-source',
      title: {
        ru: 'Инфраструктура и Open Source',
        en: 'Infrastructure & Open Source'
      },
      description: {
        ru: 'Публикация открытых инструментов на GitHub, подготовка скриптов установки, дистрибутивов пакетов (.deb, .rpm, AppImage) и документации.',
        en: 'Publishing open-source software on GitHub, packaging (.deb, .rpm, AppImage), universal install scripts, and technical documentation.'
      },
      icon: 'i-lucide-git-branch',
      isCore: true,
      tags: ['GitHub', 'Packaging', 'AppImage', 'Docs', 'Bash']
    },
    {
      id: 'secondary-plugins',
      title: {
        ru: 'Minecraft-плагины и игровые серверы',
        en: 'Minecraft Plugins & Game Servers'
      },
      description: {
        ru: 'Опыт настройки, контейнеризации игровых серверов (Paper / Java) и разработки плагинов.',
        en: 'Experience configuring, containerizing dedicated game servers (Paper / Java), and plugin development.'
      },
      icon: 'i-lucide-gamepad-2',
      isCore: false,
      tags: ['PaperMC', 'Java runtime', 'Game Servers']
    },
    {
      id: 'secondary-bots',
      title: {
        ru: 'Discord-боты и скрипты автоматизации',
        en: 'Discord Bots & Automation Scripts'
      },
      description: {
        ru: 'Разработка сервисных ботов и вспомогательных скриптов автоматизации на Python и Node.js.',
        en: 'Building service bots and utility automation scripts using Python and Node.js.'
      },
      icon: 'i-lucide-bot',
      isCore: false,
      tags: ['Python', 'Discord API', 'Automation']
    }
  ]
}
