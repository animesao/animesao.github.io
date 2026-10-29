# ANIMESAO — Personal Portfolio Website

[![Nuxt 4](https://img.shields.io/badge/Nuxt-4.6.3-00DC82?logo=nuxt.js&logoColor=white)](https://nuxt.com)
[![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vuedotjs&logoColor=white)](https://vuejs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)
[![Discord](https://img.shields.io/badge/Discord-Cardinal_Community-5865F2?logo=discord&logoColor=white)](https://dsc.gg/cardinal-organization)
[![Deploy to GitHub Pages](https://github.com/animesao/animesao.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/animesao/animesao.github.io/actions/workflows/deploy.yml)

> High-performance personal website and software engineering portfolio for **animesao**, author of the **Cardinal** container ecosystem. Built with Nuxt 4, Vue 3, Tailwind CSS 4, and Nuxt UI. Featuring an **Obsidian & Electric Amber** dark sci-fi aesthetic, complete bilingual support (RU / EN), and automated release tracking.

🌐 **Live Website:** [https://animesao.work.gd/](https://animesao.work.gd/)  
💬 **Discord Community:** [https://dsc.gg/cardinal-organization](https://dsc.gg/cardinal-organization)

---

## Overview

- **Developer:** animesao
- **Role:** Software Developer · AI-assisted Development
- **Core Ecosystem:** [Cardinal Organization](https://github.com/cardinal-organization) — [Cardinal](https://github.com/animesao/cardinal) (Daemonless container runtime in Go), [Cardinal Wings](https://github.com/animesao/cardinal-wings) (API Daemon & SFTP in Go), [Cardinal Panel](https://github.com/animesao/cardinal-panel) (Full-stack management UI with Nuxt 4, Drizzle ORM, Monaco Editor & WebSocket terminal), and [Cardinal Blueprints](https://github.com/cardinal-organization/cardinal-blueprints) (Official curated registry of 27 container templates).
- **Discord Community:** [dsc.gg/cardinal-organization](https://dsc.gg/cardinal-organization)
- **Core Tooling:** OpenCode, Gemini 3.8 Flash, Git, Linux containers.
- **Design Philosophy:** Dark obsidian backdrop (`#0d0e12`), glowing electric amber accents (`#f59e0b`), monospace technical typography, subtle grid lines, and micro-interactions.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | [Nuxt 4.6.x](https://nuxt.com/) (Vue 3, TypeScript with strict typing) |
| **Styling** | [Tailwind CSS 4.x](https://tailwindcss.com/) with `@theme` CSS tokens & utilities |
| **UI Components** | [@nuxt/ui 4.x](https://ui.nuxt.com/) + `@iconify-json/lucide` & `@iconify-json/simple-icons` |
| **Internationalization** | `@nuxtjs/i18n` (Dual-locale RU / EN with SEO canonicals and route prefixing) |
| **Data Layer** | Centralized TypeScript state (`app/data/`) with fallback resilience |
| **Version Tracking** | Automated script querying local repos and GitHub Releases API (`sync-versions.mjs`) |
| **Build Architecture** | Static Site Generation (SSG, Nitro preset `static`) with prerendered payload |
| **Quality & Linting** | ESLint (stylistic, Better Tailwind rules), vue-tsc (`nuxt typecheck`) |

---

## Project Structure

```
mysite/
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions CI/CD pipeline for GitHub Pages
├── app/
│   ├── assets/css/main.css     # Tailwind CSS 4 tokens and dark theme utilities
│   ├── components/             # Reusable Vue components
│   │   ├── AppAvatar.vue       # Avatar component with fallback cascade
│   │   ├── AppFooter.vue       # Footer with validated external links
│   │   ├── AppHeader.vue       # Header navigation and LanguageSwitcher
│   │   ├── AppLogo.vue         # Sci-fi emblem with SVG vector rendering
│   │   ├── CardinalArchitecture.vue # Interactive Cardinal ecosystem diagram
│   │   ├── LanguageSwitcher.vue# RU / EN seamless locale switcher
│   │   ├── ProjectCard.vue     # Dynamic project showcase card
│   │   └── TechCard.vue        # Technology card with status and context
│   ├── composables/
│   │   └── useProjectVersions.ts # Reactive baseline versions composable
│   ├── data/                   # Centralized single source of truth
│   │   ├── links.ts            # Public validated profiles and repos
│   │   ├── profile.ts          # Positioning, biography, and engineering focuses
│   │   ├── projects.ts         # Verified project registry (Cardinal, Wings, Panel)
│   │   ├── siteConfig.ts       # Domain config, URLs, metadata
│   │   ├── techStack.ts        # Categorized technology stack
│   │   ├── versions.ts         # Verified project release baselines
│   │   ├── versions.json       # Synced versions JSON store
│   │   └── translations/       # i18n dictionaries (ru.ts, en.ts)
│   ├── pages/                  # Nuxt 4 file-based routing
│   │   ├── index.vue           # Hero, Cardinal deep dive, tech overview
│   │   ├── about.vue           # Developer profile and AI methodology
│   │   ├── projects/           # Project directory and individual project pages
│   │   ├── stack.vue           # Categorized technology stack view
│   │   └── notes.vue           # Technical notes section with neutral empty state
│   ├── app.vue                 # Root layout with meta tags, favicons, dark theme
│   └── error.vue               # Custom 404 / 500 error boundary
├── public/
│   ├── custom/                 # User customizable branding assets (avatar, logo)
│   ├── CNAME                   # Custom domain pointer (animesao.work.gd)
│   ├── .nojekyll               # Disables Jekyll processing on GitHub Pages
│   ├── favicon.ico             # Multi-resolution ICO favicon suite
│   ├── favicon.svg             # Sharp vector SVG favicon
│   ├── robots.txt              # Search crawler directives
│   └── sitemap.xml             # Generated sitemap for search engines
├── scripts/
│   └── sync-versions.mjs       # Version syncer across local folders and GitHub API
├── nuxt.config.ts              # Nuxt 4, Nitro prerender, i18n, icons configuration
├── package.json
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- **Node.js:** `>= 20.x` (LTS recommended)
- **Package Manager:** [pnpm](https://pnpm.io/) `>= 9.x`

### Installation

```bash
# Clone the repository
git clone https://github.com/animesao/animesao.github.io.git
cd animesao.github.io

# Install dependencies
pnpm install
```

### Development

```bash
# Start the local development server (automatically syncs versions)
pnpm run dev
```

The site will be available at `http://localhost:3000`.

### Type Checking & Linting

```bash
# Run ESLint validation
pnpm run lint

# Run strict TypeScript type checking
pnpm run typecheck
```

### Static Site Generation (Build)

```bash
# Generate the full static production build
pnpm run generate
```

The compiled static site will be generated into `.output/public`, ready for deployment to any static hosting provider.

---

## Deployment & CI/CD

This repository is deployed to **GitHub Pages** with the custom domain **[animesao.work.gd](https://animesao.work.gd/)**.

Deployment is fully automated using GitHub Actions (`.github/workflows/deploy.yml`):
1. Runs code quality checks (`eslint` and `vue-tsc`).
2. Runs static site generation (`pnpm run generate`) with release version synchronization.
3. Automatically publishes the generated static assets to GitHub Pages with `CNAME` and `.nojekyll`.

---

## License

This project is licensed under the **[MIT License](LICENSE)** — see the [LICENSE](LICENSE) file for details.
