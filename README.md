# ANIMESAO — Персональный сайт-портфолио

Современный, высокопроизводительный персональный сайт и инженерное портфолио для независимого разработчика **animesao**, автора и мейнтейнера экосистемы контейнерных инструментов **Cardinal**.

Сайт построен на архитектуре статической генерации (SSG), лишён серверных зависимостей и базы данных, полностью локализован на русском и английском языках и оформлен в сдержанной футуристической, монохромно-графитовой эстетике с акцентом на типографику и техническую строгость.

---

## 1. Технологический стек

- **Фреймворк:** [Nuxt 4.x](https://nuxt.com/) (Vue 3, TypeScript со строгой проверкой типов).
- **Стилизация:** [Tailwind CSS 4.x](https://tailwindcss.com/) + CSS Design Tokens (`main.css`).
- **Компоненты интерфейса:** [@nuxt/ui 4.x](https://ui.nuxt.com/) с набором иконок `@iconify-json/lucide` и `@iconify-json/simple-icons`.
- **Интернационализация (i18n):** `@nuxtjs/i18n` (полная поддержка RU / EN, префиксная стратегия для английской версии, бесшовное переключение).
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

Клонируйте репозиторий и установите пакеты с помощью pnpm:

```bash
pnpm install
```

---

## 4. Локальный запуск (Development)

Для запуска локального сервера разработки выполните:

```bash
pnpm run dev
```

Сайт будет доступен по адресу: `http://localhost:3000`. Поддерживается HMR (Hot Module Replacement) для Vue-компонентов, данных и стилей.

---

## 5. Production-сборка и статическая генерация (SSG)

### Генерация статического сайта (Рекомендуемый способ)

Для формирования автономного статического сайта (HTML + CSS + JS + Sitemap):

```bash
pnpm run generate
```

Результат сборки помещается в директорию `.output/public`. Этот каталог полностью автономен и готов к развёртыванию на любом статическом хостинге.

### Серверная сборка (Node server, опционально)

```bash
pnpm run build
```

Запуск предпросмотра скомпилированного сервера:

```bash
node .output/server/index.mjs
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

## 7. Публикация на статическом хостинге

Каталог `.output/public` не требует Node.js в продакшене. Его можно разместить на:

- **Cloudflare Pages:**
  - Build command: `pnpm run generate`
  - Build output directory: `.output/public`
- **GitHub Pages:**
  - Настройте GitHub Action для выполнения `pnpm run generate` и выгрузки артефакта `.output/public` в ветку `gh-pages` или Pages.
- **Vercel:**
  - Framework Preset: `Nuxt.js`
  - Output Directory: `.output/public`
- **Netlify:**
  - Build command: `pnpm run generate`
  - Publish directory: `.output/public`
- **Nginx / Caddy / Статический веб-сервер:**
  - Скопируйте содержимое папки `.output/public` в корневую директорию сайта (например, `/var/www/html/`).

---

## 8. Руководство по редактированию контента

Все данные сайта строго отделены от компонентов разметки и находятся в директории `app/data/`. Изменение текстов, ссылок или проектов **не требует** правки Vue-компонентов.

### 8.1. Изменение профиля и биографии
Файл: `app/data/profile.ts`
- `handle`: никнейм разработчика (`animesao`).
- `tagline`: краткий слоган на русском и английском.
- `headline`: основной заголовок для первого экрана и метатегов.
- `summary`: развёрнутое описание позиции и подхода.
- `manifesto`: ключевые тезисы и инженерные принципы.
- `workflow`: описание используемого инструментария (OpenCode, Gemini 3.8 Flash, Git) и правила (`P-01` — `P-04`).
- `focusAreas`: список основных направлений разработки с тегами и иконками.

### 8.2. Добавление и обновление проектов
Файл: `app/data/projects.ts`
Массив `projectsData` содержит описания проектов. Чтобы добавить новый проект:
1. Добавьте объект с уникальным `id` и `slug` (например, `my-tool`).
2. Укажите честный `status` (`'released'`, `'active-dev'`, `'planned'`, `'prototype'`).
3. Заполните `role`, `summary`, `fullDescription`, `license`, `technologies`, `links` и `features`.
4. Маршрут страницы `/projects/[slug]` и `/en/projects/[slug]` сгенерируется автоматически при сборке.

### 8.3. Изменение технологий и стека
Файл: `app/data/techStack.ts`
Массив `techStackData` разделён на тематические категории:
- `languages` — Языки программирования (Go, TypeScript, PHP, Python, HTML/CSS).
- `web` — Веб-разработка (Nuxt 4, Vue 3, Tailwind 4, Nuxt UI 4).
- `systems` — Системные инструменты (Linux Namespaces, cgroups v2, Git, pnpm).
- `ai-tooling` — AI-ассистивная среда (OpenCode, Gemini 3.8 Flash).

Каждый элемент содержит честный статус (`'in-projects'`, `'current-stack'`, `'planned'`, `'learning'`) и текстовое пояснение контекста применения.

### 8.4. Настройка публичных ссылок и контактов
Файл: `app/data/links.ts`
Объект `publicContacts` хранит подтверждённые ссылки:
```typescript
export const publicContacts: ContactsConfig = {
  github: 'https://github.com/animesao',
  cardinalSite: 'https://cardinal.work.gd/',
  cardinalRepo: 'https://github.com/animesao/cardinal',
  cardinalWingsRepo: 'https://github.com/animesao/cardinal-wings'
}
```
*Важно:* Если контакт не подтверждён (например, email или соцсети), поле остаётся пустым или `undefined`. Функция `getConfirmedPublicLinks()` автоматически исключает незаполненные контакты, предотвращая показ пустых или фальшивых ссылок.

### 8.5. Добавление заметок и статей
Файл: `app/pages/notes.vue`
В текущей версии раздел содержит аккуратное нейтральное пустое состояние, предотвращающее публикацию фиктивных статей. При появлении реальных заметок можно добавить рендеринг Markdown или список статей в `app/data/notes.ts`.

### 8.6. Изменение переводов (RU / EN)
Файлы:
- `app/data/translations/ru.ts` — русские строки интерфейса.
- `app/data/translations/en.ts` — английские строки интерфейса.

Файл конфигурации интернационализации `i18n/i18n.config.ts` автоматически импортирует эти словари. Добавленные ключи становятся доступны через `$t('key')` или `t('key')`.

### 8.7. Обновление домена и SEO
Файлы:
- `app/data/siteConfig.ts`: поле `siteUrl` (по умолчанию `https://animesao.dev` или берётся из переменной окружения `NUXT_PUBLIC_SITE_URL`).
- `server/routes/sitemap.xml.ts`: динамический генератор карты сайта для всех страниц обеих локализаций.
- `public/robots.txt`: файл управления индексацией поисковыми роботами.
