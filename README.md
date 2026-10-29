# ANIMESAO — Персональный сайт-портфолио

Современный, высокопроизводительный персональный сайт и инженерное портфолио для разработчика **animesao**, автора экосистемы контейнерных инструментов **Cardinal** (рантайм Cardinal, API-демон Cardinal Wings и веб-панель Cardinal Panel).

Сайт построен на архитектуре статической генерации (SSG), лишён серверных зависимостей и базы данных, полностью локализован на русском и английском языках и оформлен в сдержанной футуристической, монохромно-графитовой эстетике с акцентом на типографику и техническую строгость.

---

## 1. Технологический стек

- **Фреймворк:** [Nuxt 4.x](https://nuxt.com/) (Vue 3, TypeScript со строгой проверкой типов).
- **Стилизация:** [Tailwind CSS 4.x](https://tailwindcss.com/) + CSS Design Tokens (`main.css`).
- **Компоненты интерфейса:** [@nuxt/ui 4.x](https://ui.nuxt.com/) с набором иконок `@iconify-json/lucide` и `@iconify-json/simple-icons`.
- **Интернационализация (i18n):** `@nuxtjs/i18n` (полная поддержка RU / EN, префиксная стратегия для английской версии, бесшовное переключение).
- **Синхронизация версий:** автоматический модуль синхронизации версий напрямую из локальных репозиториев (`Desktop/cardinal`, `Desktop/cardinal-wings`, `Desktop/cardinal-panel`) и GitHub Releases API + клиентский реактивный composable `useProjectVersions()`.
- **Архитектура сборки:** Static Site Generation (SSG, Nitro preset: `static`), генерация чистых HTML, JSON payload и статических ассетов в `.output/public`.
- **SEO & Индексация:** динамически генерируемый `sitemap.xml`, `robots.txt`, Open Graph метатеги, семантическая верстка.
- **Инструменты контроля качества:** ESLint (с Nuxt stylistic и Better Tailwind CSS), vue-tsc / `nuxt typecheck`.

---

## 2. Требования к среде

- **Node.js:** `>= 20.x` (рекомендуется `v24.x` LTS).
- **Пакетный менеджер:** [pnpm](https://pnpm.io/) `>= 9.x` (в проекте зафиксирован `pnpm 12.x`).
- **Операционная система:** Linux, macOS или Windows.

---

## 3. Установка зависимостей

```bash
pnpm install
```

---

## 4. Локальный запуск (Development)

При запуске автоматически выполняется скрипт синхронизации версий `scripts/sync-versions.mjs`:

```bash
pnpm run dev
```

Сайт будет доступен по адресу: `http://localhost:3000`. Поддерживается HMR для компонентов, данных и стилей.

---

## 5. Production-сборка и статическая генерация (SSG)

### Генерация статического сайта (Основной режим)

Скрипт автоматически обновляет версии проектов из локальных каталогов/GitHub и генерирует автономный статический сайт:

```bash
pnpm run generate
```

Результат сборки помещается в директорию `.output/public`. Этот каталог полностью автономен и готов к развёртыванию на любом статическом хостинге.

### Ручная синхронизация версий:

```bash
pnpm run sync:versions
```

### Серверная сборка (Node server, опционально):

```bash
pnpm run build
```

---

## 6. Проверка качества кода

### Проверка типов TypeScript:
```bash
pnpm run typecheck
```

### Линтинг и проверка стиля:
```bash
pnpm run lint
```

### Автоматическое исправление стиля:
```bash
pnpm exec eslint . --fix
```

---

## 7. Папка для аватара и логотипа (`public/custom/`)

Для загрузки персональных изображений создана директория:

```
mysite/public/custom/
├── avatar.svg      # Базовый векторный аватар
├── logo.svg        # Базовый векторный логотип
└── README.md       # Инструкция по форматам
```

### Как добавить свой аватар:
Поместите файл с именем `avatar.png` (или `avatar.svg` / `avatar.jpg`) в папку `public/custom/`.
- Рекомендуемый размер: `256x256` или `512x512` px.
- Аватар автоматически появится на главной странице (Hero-блок), странице «О себе» (About) и в профиле.

### Как добавить свой логотип:
Поместите файл с именем `logo.png` (или `logo.svg`) в папку `public/custom/`.
- Рекомендуемый размер: квадратная иконка `32x32` или `48x48` px.
- Логотип автоматически появится в шапке сайта.
- Если файл не добавлен, сайт аккуратно показывает фирменный знак `ANIMESAO // DEV`.

---

## 8. Проекты экосистемы Cardinal

1. **Cardinal** (`v2.4.13`):
   - Репозиторий: [https://github.com/animesao/cardinal](https://github.com/animesao/cardinal)
   - У проекта **нет отдельного сайта**, только официальный репозиторий на GitHub.
   - Легковесный daemonless container runtime на Go (~5 МБ статический бинарник).

2. **Cardinal Wings** (`v0.5.20`):
   - Репозиторий: [https://github.com/animesao/cardinal-wings](https://github.com/animesao/cardinal-wings)
   - HTTP REST API демон управления рантаймом с SSE-стримингом и SFTP.

3. **Cardinal Panel** (`v0.6.7`):
   - Репозиторий: [https://github.com/animesao/cardinal-panel](https://github.com/animesao/cardinal-panel)
   - Полнофункциональная веб-панель управления игровыми серверами на Nuxt 4 + Drizzle ORM (SQLite / MySQL) + WebSocket-терминал.

---

## 9. Публикация на статическом хостинге

Каталог `.output/public` не требует Node.js в продакшене. Его можно разместить на:

- **Cloudflare Pages:**
  - Build command: `pnpm run generate`
  - Build output directory: `.output/public`
- **GitHub Pages:**
  - Настройте GitHub Action для выполнения `pnpm run generate` и выгрузки артефакта `.output/public` в Pages.
- **Vercel:**
  - Framework Preset: `Nuxt.js`
  - Output Directory: `.output/public`
- **Nginx / Caddy / Статический веб-сервер:**
  - Скопируйте содержимое папки `.output/public` в директорию веб-сервера (например, `/var/www/html/`).
