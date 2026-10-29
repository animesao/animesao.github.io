# AGENTS.md — Developer & AI Agent Guidelines

Этот документ описывает архитектуру, структуру каталогов, ключевые соглашения и правила разработки персонального сайта-портфолио **animesao**. Любой последующий AI coding agent или инженер обязан соблюдать эти правила.

---

## 1. Архитектурный стек и структура директорий

Проект реализован на **Nuxt 4.6.x** с использованием актуальной структуры директорий `app/` (согласно соглашениям Nuxt 4).

```
mysite/
├── .github/workflows/          # CI/CD пайплайны
├── app/                        # Основной исходный код Nuxt 4
│   ├── assets/css/main.css     # Tailwind CSS 4, @theme, @utility, кастомные токены
│   ├── components/             # Переиспользуемые Vue-компоненты
│   │   ├── AppAvatar.vue       # Компонент аватара с поддержкой /custom/avatar
│   │   ├── AppHeader.vue       # Шапка с адаптивным меню и LanguageSwitcher
│   │   ├── AppFooter.vue       # Подвал с валидированными контактами
│   │   ├── AppLogo.vue         # Sci-fi логотип с поддержкой /custom/logo
│   │   ├── CardinalArchitecture.vue # Архитектурный блок экосистемы Cardinal
│   │   ├── LanguageSwitcher.vue # Переключатель RU / EN
│   │   ├── ProjectCard.vue     # Карточка проекта с динамической версией
│   │   └── TechCard.vue        # Карточка технологии со статусом и контекстом
│   ├── composables/            # Vue-композаблы
│   │   └── useProjectVersions.ts # Реактивное получение актуальных версий проектов
│   ├── data/                   # СТРОГО ЦЕНТРАЛИЗОВАННЫЙ СЛОЙ ДАННЫХ
│   │   ├── links.ts            # Публичные ссылки и безопасный фильтр контактов
│   │   ├── profile.ts          # Биография, позиционирование, принципы, фокусы
│   │   ├── projects.ts         # Реестр проектов (Cardinal, Wings, Panel)
│   │   ├── siteConfig.ts       # Базовые параметры сайта, домен, локали
│   │   ├── techStack.ts        # Структурированный каталог технологий
│   │   ├── versions.ts         # Базовые проверенные версии проектов
│   │   ├── versions.json       # JSON-версии для синхронизации
│   │   └── translations/       # Строки переводов (ru.ts, en.ts)
│   ├── pages/                  # Файловая маршрутизация Nuxt 4
│   │   ├── index.vue           # Главная страница (Hero с аватаром, Cardinal, Стек)
│   │   ├── about.vue           # Страница о разработчике и AI-методологии
│   │   ├── projects/
│   │   │   ├── index.vue       # Каталог проектов с фильтрами
│   │   │   └── [slug].vue      # Детальная страница отдельного проекта
│   │   ├── stack.vue           # Полная страница технологического стека
│   │   └── notes.vue           # Раздел заметок с нейтральным пустым состоянием
│   ├── app.config.ts           # Конфигурация темы @nuxt/ui
│   ├── app.vue                 # Корневой шаблон с UApp, метатегами и версткой
│   └── error.vue               # Обработчик ошибок 404 / 500
├── i18n/
│   └── i18n.config.ts          # Конфигурация vue-i18n, импортирующая ru.ts и en.ts
├── public/
│   ├── custom/                 # Папка для пользовательских аватара и логотипа
│   │   ├── avatar.svg          # Базовый векторный аватар
│   │   ├── logo.svg            # Базовый векторный логотип
│   │   └── README.md           # Инструкция для пользователя
│   ├── favicon.ico             # Иконка сайта
│   └── robots.txt              # Директивы для поисковых краулеров
├── scripts/
│   └── sync-versions.mjs       # Скрипт синхронизации версий с Desktop и GitHub
├── server/
│   └── routes/
│       ├── api/versions.ts     # Динамический/статический эндпоинт версий проектов
│       └── sitemap.xml.ts      # Динамический генератор карты сайта (Nitro route)
├── nuxt.config.ts              # Конфигурация Nuxt 4, Nitro prerender, i18n, fonts
├── package.json                # Зависимости и скрипты сборки
├── pnpm-lock.yaml              # Фиксированный lockfile
└── tsconfig.json               # TypeScript конфигурация
```

---

## 2. Ключевые команды

| Команда | Описание |
|---|---|
| `pnpm install` | Установка зависимостей через pnpm |
| `pnpm run dev` | Запуск локального dev-сервера (с авто-синхронизацией версий) |
| `pnpm run sync:versions` | Ручной опрос версий из локальных репозиториев или GitHub |
| `pnpm run generate` | **Основной способ сборки:** Статическая генерация сайта (SSG) в `.output/public` |
| `pnpm run build` | Сборка SSR/Node-сервера (Nitro preset: `node-server`) |
| `pnpm run typecheck` | Проверка типов TypeScript через `nuxt typecheck` / `vue-tsc` |
| `pnpm run lint` | Проверка линтером ESLint с Nuxt-правилами |
| `pnpm exec eslint . --fix` | Автоматическое исправление стиля кода |

---

## 3. Критические правила для последующих AI-агентов

### 3.1. Достоверность данных и экосистема Cardinal
- **У Cardinal НЕТ отдельного сайта:** официальный источник — исключительно GitHub репозиторий `https://github.com/animesao/cardinal`. Не добавлять ссылки на `cardinal.work.gd`!
- **Cardinal Panel реален и активен:** это полнофункциональная панель на **Nuxt 4 + Vue 3 + Drizzle ORM (SQLite / MySQL) + WebSocket-терминал + Monaco Editor** (версия `v0.6.x`), репозиторий `https://github.com/animesao/cardinal-panel`. Не описывать её как планируемую или на PHP/Laravel!
- **Cardinal Wings реален и активен:** HTTP REST API демон на Go с SSE и SFTP (версия `v0.5.x`), репозиторий `https://github.com/animesao/cardinal-wings`.
- **Синхронизация версий:** перед сборкой выполняется `scripts/sync-versions.mjs`, опрашивающий локальные папки `C:\Users\Anime\Desktop\cardinal`, `cardinal-wings`, `cardinal-panel` и GitHub API. Версии сохраняются в `app/data/versions.json` и `app/data/versions.ts`.
- **НЕЛЬЗЯ** выдумывать компании, звания (CTO, Lead Architect корпораций), возраст, образование, сертификаты или годы опыта для `animesao`.
- **НЕЛЬЗЯ** придумывать профили в соцсетях, телефоны или email. Только подтверждённые ссылки из `app/data/links.ts`.

### 3.2. Пользовательские ассеты (Аватар и Логотип)
- Директория `public/custom/` зарезервирована для пользовательских файлов:
  - `public/custom/avatar.png` (или `.svg` / `.jpg`)
  - `public/custom/logo.png` (или `.svg`)
- Компоненты `AppAvatar.vue` и `AppLogo.vue` обязаны иметь изящные fallback-состояния на случай отсутствия пользовательских картинок.

### 3.3. Разделение контента и представления
- Весь контент (тексты, описания, технологии, ссылки, статусы) хранится в `app/data/`.
- Компоненты разметки (`app/components/` и `app/pages/`) должны оставаться переиспользуемыми шаблонами, получающими данные из `app/data/` и функции `useI18n()`.

### 3.4. Проверка перед сдачей задачи
Перед завершением любых модификаций агент обязан последовательно выполнить:
1. `pnpm run lint` — код должен быть чист (0 errors, 0 warnings).
2. `pnpm run typecheck` — строгая проверка типов TypeScript должна завершаться успешно.
3. `pnpm run generate` — генерация статического сайта обязана проходить без ошибок, создавая `.output/public`.
