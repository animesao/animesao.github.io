<script setup lang="ts">
import { profileData } from '~/data/profile'
import { getConfirmedPublicLinks } from '~/data/links'

const { locale, t } = useI18n()
const localePath = useLocalePath()
const confirmedLinks = computed(() => getConfirmedPublicLinks(locale.value as 'ru' | 'en'))

useSeoMeta({
  title: () => locale.value === 'ru' ? 'О себе · animesao' : 'About · animesao',
  description: () => locale.value === 'ru'
    ? 'Информация о разработчике animesao: создание рантайма Cardinal, инженерные принципы и AI-assisted методология разработки.'
    : 'About independent developer animesao: creator of the Cardinal container runtime, engineering principles, and AI-assisted workflow.',
  ogTitle: () => locale.value === 'ru' ? 'О себе · animesao' : 'About · animesao',
  ogDescription: () => profileData.summary[locale.value as 'ru' | 'en']
})
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
    <!-- Header -->
    <div class="space-y-4 border-b border-white/10 pb-8">
      <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-400 font-mono text-xs uppercase tracking-wider">
        {{ t('aboutPage.eyebrow') }}
      </div>
      <h1 class="text-3xl sm:text-5xl font-bold font-mono text-white">
        {{ profileData.handle }}
      </h1>
      <p class="text-lg text-sky-400 font-mono">
        {{ profileData.tagline[locale as 'ru' | 'en'] }}
      </p>
    </div>

    <!-- Introduction & Positioning -->
    <section class="space-y-6">
      <h2 class="text-xl font-bold font-mono text-white uppercase tracking-wider">
        {{ locale === 'ru' ? 'Позиционирование и профиль' : 'Positioning & Background' }}
      </h2>
      <div class="space-y-4 text-sm text-zinc-300 leading-relaxed font-sans">
        <p>
          {{ profileData.summary[locale as 'ru' | 'en'] }}
        </p>
        <p>
          {{ locale === 'ru'
            ? 'Моя ключевая техническая специализация сосредоточена на пересечении системного программирования (Go, Linux primitives), архитектуры веб-приложений (TypeScript, Nuxt 4) и современных AI-assisted инструментов. Я не использую шаблонных преувеличений и не создаю фиктивных историй: вся деятельность подтверждается реальным кодом в открытых репозиториях.'
            : 'My primary technical discipline bridges low-level systems engineering (Go, Linux primitives), modern web architectures (TypeScript, Nuxt 4), and disciplined AI-assisted development. I avoid inflated titles or fabricated achievements: my track record is directly verifiable through open-source code.'
          }}
        </p>
      </div>
    </section>

    <!-- The Cardinal Story -->
    <section class="rounded-xl border border-white/10 bg-[#0d0f17] p-6 sm:p-8 space-y-4">
      <div class="flex items-center justify-between">
        <span class="text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider">
          {{ locale === 'ru' ? 'Основной проект' : 'Core Engineering Focus' }}
        </span>
        <NuxtLink
          :to="localePath('/projects/cardinal')"
          class="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:text-sky-300 font-semibold"
        >
          <span>{{ locale === 'ru' ? 'Страница Cardinal' : 'Cardinal Overview' }}</span>
          <UIcon
            name="i-lucide-arrow-right"
            class="w-3.5 h-3.5"
          />
        </NuxtLink>
      </div>

      <h2 class="text-2xl font-bold font-mono text-white">
        Cardinal & Cardinal Wings
      </h2>

      <p class="text-xs text-zinc-300 leading-relaxed font-sans">
        {{ locale === 'ru'
          ? 'Работа над Cardinal началась из потребности в легковесном, быстром и автономном инструменте запуска изолированных сервисов без оверхеда традиционных тяжеловесных демонов. Архитектура Cardinal основана на прямом вызове системных примитивов Linux: пространств имён (PID, Mount, Net, UTS, IPC), контроллеров памяти и процессора cgroups v2, файловой системы OverlayFS и сетевых мостов.'
          : 'Cardinal originated from the need for a lightweight, fast, and self-contained tool to run isolated workloads without the resource overhead of heavy background daemons. The architecture directly harnesses Linux kernel primitives: namespaces (PID, Mount, Net, UTS, IPC), cgroups v2 CPU and memory controllers, OverlayFS, and bridge networking.'
        }}
      </p>

      <p class="text-xs text-zinc-300 leading-relaxed font-sans">
        {{ locale === 'ru'
          ? 'Для удалённого взаимодействия и будущей интеграции с планируемой панелью управления был спроектирован cardinal-wings — REST API демон на Go с потоковой передачей логов (SSE), интерактивными exec-сессиями и встроенным per-container SFTP-сервером.'
          : 'To enable remote API interaction and future integration with the planned control panel, I engineered cardinal-wings — a dedicated REST API daemon in Go featuring real-time SSE log streaming, interactive exec sessions, and an embedded per-container SFTP server.'
        }}
      </p>
    </section>

    <!-- AI-assisted Workflow -->
    <section class="space-y-6">
      <h2 class="text-xl font-bold font-mono text-white uppercase tracking-wider">
        {{ t('aboutPage.environmentTitle') }}
      </h2>
      <p class="text-sm text-zinc-300 leading-relaxed font-sans">
        {{ t('aboutPage.workflowDesc') }}
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="p-5 rounded-lg border border-white/10 bg-white/5 space-y-2">
          <div class="flex items-center gap-2 text-sky-400 font-mono text-xs font-bold">
            <UIcon
              name="i-lucide-code-2"
              class="w-4 h-4"
            />
            <span>OpenCode</span>
          </div>
          <p class="text-xs text-zinc-300">
            {{ locale === 'ru' ? 'Основное окружение для архитектурной работы, навигации по коду и интеграции ИИ-агентов.' : 'Primary workspace for architectural design, code navigation, and agent coordination.' }}
          </p>
        </div>

        <div class="p-5 rounded-lg border border-white/10 bg-white/5 space-y-2">
          <div class="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
            <UIcon
              name="i-lucide-sparkles"
              class="w-4 h-4"
            />
            <span>Gemini 3.8 Flash</span>
          </div>
          <p class="text-xs text-zinc-300">
            {{ locale === 'ru' ? 'Анализ сложных технических спецификаций, генерация тестов, проверка граничных случаев и рефакторинг.' : 'Analyzing technical specs, generating test suites, boundary checking, and refactoring.' }}
          </p>
        </div>

        <div class="p-5 rounded-lg border border-white/10 bg-white/5 space-y-2">
          <div class="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold">
            <UIcon
              name="i-simple-icons-git"
              class="w-4 h-4"
            />
            <span>Git & GitHub</span>
          </div>
          <p class="text-xs text-zinc-300">
            {{ locale === 'ru' ? 'Строгий контроль версий, атомарные коммиты, CI-пайплайны и открытая публикация релизов.' : 'Strict version control, atomic commits, automated CI pipelines, and public release distribution.' }}
          </p>
        </div>
      </div>
    </section>

    <!-- Manifesto & Principles -->
    <section class="space-y-6">
      <h2 class="text-xl font-bold font-mono text-white uppercase tracking-wider">
        {{ t('aboutPage.manifestoTitle') }}
      </h2>

      <div class="space-y-4">
        <div
          v-for="(point, idx) in profileData.manifesto[locale as 'ru' | 'en']"
          :key="idx"
          class="flex items-start gap-4 p-4 rounded-lg border border-white/5 bg-black/20"
        >
          <span class="text-xs font-mono text-sky-400 font-bold mt-0.5">
            // 0{{ idx + 1 }}
          </span>
          <p class="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
            {{ point }}
          </p>
        </div>
      </div>
    </section>

    <!-- Reach / Public Links -->
    <section class="space-y-6 pt-6 border-t border-white/10">
      <h2 class="text-xl font-bold font-mono text-white uppercase tracking-wider">
        {{ t('contactSection.title') }}
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <a
          v-for="link in confirmedLinks"
          :key="link.id"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-[#0d0f17] hover:border-white/25 hover:bg-white/5 transition-colors group"
        >
          <div class="flex items-center gap-3">
            <div class="p-2 rounded bg-white/5 border border-white/10 text-white group-hover:text-sky-400 transition-colors">
              <UIcon
                :name="link.icon"
                class="w-4 h-4"
              />
            </div>
            <div>
              <span class="text-xs font-bold font-mono text-white block">
                {{ link.label[locale as 'ru' | 'en'] }}
              </span>
              <span
                v-if="link.badge"
                class="text-[10px] font-mono text-zinc-400"
              >
                {{ link.badge }}
              </span>
            </div>
          </div>
          <UIcon
            name="i-lucide-arrow-up-right"
            class="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors"
          />
        </a>
      </div>
    </section>
  </div>
</template>
