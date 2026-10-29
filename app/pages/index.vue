<script setup lang="ts">
import { profileData } from '~/data/profile'
import { techStackData } from '~/data/techStack'
import { getConfirmedPublicLinks } from '~/data/links'

const { locale, t } = useI18n()
const localePath = useLocalePath()

const confirmedLinks = computed(() => getConfirmedPublicLinks(locale.value as 'ru' | 'en'))
const coreFocusAreas = computed(() => profileData.focusAreas.filter(a => a.isCore))
const highlightedTech = computed(() => {
  return techStackData.flatMap(c => c.items.filter(i => i.highlight))
})

useSeoMeta({
  title: () => locale.value === 'ru'
    ? 'animesao · Персональный сайт разработчика · Автор Cardinal'
    : 'animesao · Personal Developer Website · Founder of Cardinal',
  description: () => locale.value === 'ru'
    ? 'Персональный сайт independent software developer animesao. Разработка рантаймов (Cardinal), веб-приложений и AI-assisted engineering.'
    : 'Personal portfolio of independent software developer animesao. Container runtimes (Cardinal), systems engineering, and AI-assisted workflows.',
  ogTitle: () => 'animesao · Software Developer',
  ogDescription: () => profileData.headline[locale.value as 'ru' | 'en'],
  ogType: 'website'
})
</script>

<template>
  <div class="relative overflow-hidden">
    <!-- Subtle technical graphite grid background with warm amber glow -->
    <div class="absolute inset-0 bg-tech-grid opacity-75 pointer-events-none" />
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial-glow pointer-events-none" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-24 sm:space-y-32">
      <!-- 1. HERO SECTION -->
      <section class="space-y-8 pt-4 animate-reveal">
        <!-- Status Pill -->
        <div class="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white/[0.1] bg-[#14161f] font-mono text-xs text-zinc-300 shadow-sm card-sheen">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{{ t('hero.badge') }}</span>
        </div>

        <!-- Avatar & Name / Headline -->
        <div class="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-8">
          <AppAvatar
            size="xl"
            class="mt-1"
          />

          <div class="space-y-4 max-w-4xl">
            <h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight font-mono uppercase bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              {{ profileData.handle }}
            </h1>
            <p class="text-xl sm:text-2xl text-amber-400 font-mono">
              {{ profileData.tagline[locale as 'ru' | 'en'] }}
            </p>
            <p class="text-base sm:text-lg text-zinc-300 leading-relaxed font-sans max-w-3xl">
              {{ profileData.summary[locale as 'ru' | 'en'] }}
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap items-center gap-4 pt-2">
          <NuxtLink
            :to="localePath('/projects')"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-100 text-black font-mono text-sm font-bold hover:bg-white transition-all duration-150 shadow-lg shadow-black/40 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>{{ t('common.viewProjects') }}</span>
            <UIcon
              name="i-lucide-arrow-right"
              class="w-4 h-4"
            />
          </NuxtLink>

          <NuxtLink
            :to="localePath('/about')"
            class="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.1] bg-[#14161f] text-white font-mono text-sm font-medium hover:bg-[#1b1e2a] hover:border-amber-500/40 transition-all duration-150 hover:-translate-y-0.5 card-sheen cursor-pointer"
          >
            <UIcon
              name="i-lucide-user"
              class="w-4 h-4 text-zinc-400"
            />
            <span>{{ t('nav.about') }}</span>
          </NuxtLink>

          <a
            href="https://github.com/animesao"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.1] bg-[#14161f] text-zinc-300 font-mono text-sm hover:text-white hover:bg-[#1b1e2a] hover:border-amber-500/40 transition-all duration-150 hover:-translate-y-0.5 card-sheen cursor-pointer"
          >
            <UIcon
              name="i-simple-icons-github"
              class="w-4 h-4"
            />
            <span>GitHub</span>
          </a>
        </div>

        <!-- Quick Info Tags -->
        <div class="pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs text-zinc-400">
          <div>
            <span class="text-zinc-500 block text-[10px] uppercase">Primary Systems</span>
            <span class="text-white font-semibold">Go · Linux Namespaces</span>
          </div>
          <div>
            <span class="text-zinc-500 block text-[10px] uppercase">Web Stack</span>
            <span class="text-white font-semibold">Nuxt 4 · TypeScript</span>
          </div>
          <div>
            <span class="text-zinc-500 block text-[10px] uppercase">AI-assisted Tooling</span>
            <span class="text-white font-semibold">OpenCode · Gemini 3.8</span>
          </div>
          <div>
            <span class="text-zinc-500 block text-[10px] uppercase">Open Source</span>
            <span class="text-white font-semibold">GitHub @animesao</span>
          </div>
        </div>
      </section>

      <!-- 2. CARDINAL ECOSYSTEM SPOTLIGHT & LIVE TERMINAL -->
      <section
        id="cardinal"
        class="space-y-8"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-mono text-zinc-500 tracking-widest uppercase">
            // 01 ECOSYSTEM ARCHITECTURE
          </span>
        </div>
        <CardinalArchitecture />

        <!-- Interactive Terminal Showcase -->
        <div class="space-y-3 pt-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400" />
              {{ locale === 'ru' ? 'Интерактивный терминал экосистемы' : 'Interactive Ecosystem Terminal' }}
            </span>
            <span class="text-[11px] font-mono text-zinc-500 hidden sm:inline">
              {{ locale === 'ru' ? 'Переключайте вкладки и копируйте команды' : 'Switch tabs and copy commands' }}
            </span>
          </div>
          <TerminalPreview />
        </div>
      </section>

      <!-- 3. FOCUS AREAS -->
      <section class="space-y-8">
        <div>
          <span class="text-xs font-mono text-zinc-500 tracking-widest uppercase block mb-2">
            // 02 CORE FOCUS AREAS
          </span>
          <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#14161f] border border-white/[0.08] text-zinc-400 font-mono text-xs uppercase tracking-wider mb-2 card-sheen">
            {{ t('focusSection.eyebrow') }}
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold font-mono text-white">
            {{ t('focusSection.title') }}
          </h2>
          <p class="text-sm text-zinc-400 font-sans mt-1">
            {{ t('focusSection.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article
            v-for="area in coreFocusAreas"
            :key="area.id"
            class="flex flex-col rounded-xl border border-white/[0.08] bg-[#14161f] card-sheen p-6 hover:border-amber-500/40 hover:bg-[#1a1d28] transition-all duration-200 hover:-translate-y-0.5 shadow-xl shadow-black/30"
          >
            <div class="flex items-center gap-3 mb-3">
              <div class="p-2 rounded-lg bg-[#1b1e2a] border border-white/[0.1] text-amber-400 card-sheen">
                <UIcon
                  :name="area.icon"
                  class="w-5 h-5"
                />
              </div>
              <h3 class="text-base font-bold font-mono text-white">
                {{ area.title[locale as 'ru' | 'en'] }}
              </h3>
            </div>
            <p class="text-xs text-zinc-300 leading-relaxed font-sans mb-4 flex-1">
              {{ area.description[locale as 'ru' | 'en'] }}
            </p>
            <div class="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.08]">
              <span
                v-for="tag in area.tags"
                :key="tag"
                class="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1b1e2a] text-zinc-300 border border-white/[0.08] card-sheen"
              >
                {{ tag }}
              </span>
            </div>
          </article>
        </div>
      </section>

      <!-- 4. SELECTED TECH STACK PREVIEW -->
      <section class="space-y-8">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span class="text-xs font-mono text-zinc-500 tracking-widest uppercase block mb-2">
              // 03 SELECTED TECHNOLOGIES
            </span>
            <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#14161f] border border-white/[0.08] text-zinc-400 font-mono text-xs uppercase tracking-wider mb-2 card-sheen">
              {{ t('stackSection.eyebrow') }}
            </div>
            <h2 class="text-2xl sm:text-3xl font-bold font-mono text-white">
              {{ t('stackSection.title') }}
            </h2>
            <p class="text-sm text-zinc-400 font-sans mt-1">
              {{ t('stackSection.subtitle') }}
            </p>
          </div>

          <NuxtLink
            :to="localePath('/stack')"
            class="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 font-semibold group cursor-pointer"
          >
            <span>{{ t('stackSection.viewFullStack') }}</span>
            <UIcon
              name="i-lucide-arrow-right"
              class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
            />
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TechCard
            v-for="item in highlightedTech"
            :key="item.id"
            :item="item"
          />
        </div>
      </section>

      <!-- 5. ENGINEERING APPROACH / WORKFLOW -->
      <section class="space-y-8 rounded-2xl border border-white/[0.08] bg-[#14161f] card-sheen p-6 sm:p-8 shadow-2xl shadow-black/40">
        <div>
          <span class="text-xs font-mono text-zinc-500 tracking-widest uppercase block mb-2">
            // 04 METHODOLOGY & PRINCIPLES
          </span>
          <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#1b1e2a] border border-white/[0.1] text-zinc-400 font-mono text-xs uppercase tracking-wider mb-2 card-sheen">
            {{ t('workflowSection.eyebrow') }}
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold font-mono text-white">
            {{ t('workflowSection.title') }}
          </h2>
          <p class="text-sm text-zinc-400 font-sans mt-1">
            {{ t('workflowSection.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="principle in profileData.workflow.principles"
            :key="principle.code"
            class="p-5 rounded-xl border border-white/[0.06] bg-[#0a0b0f] card-sheen space-y-2 hover:border-amber-500/30 transition-colors"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono text-amber-400 font-bold">
                {{ principle.code }}
              </span>
              <h3 class="text-sm font-bold font-mono text-white">
                {{ principle.title[locale as 'ru' | 'en'] }}
              </h3>
            </div>
            <p class="text-xs text-zinc-300 leading-relaxed font-sans">
              {{ principle.description[locale as 'ru' | 'en'] }}
            </p>
          </div>
        </div>

        <div class="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-zinc-400">
          <div>
            <span class="text-zinc-500">Editor:</span> {{ profileData.workflow.editor }}
          </div>
          <div>
            <span class="text-zinc-500">AI Model:</span> {{ profileData.workflow.aiModel }}
          </div>
          <div>
            <span class="text-zinc-500">VCS:</span> {{ profileData.workflow.vcs }}
          </div>
          <NuxtLink
            :to="localePath('/about')"
            class="text-white hover:text-amber-300 font-semibold inline-flex items-center gap-1 group cursor-pointer"
          >
            <span>{{ t('common.readMore') }}</span>
            <UIcon
              name="i-lucide-arrow-right"
              class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
            />
          </NuxtLink>
        </div>
      </section>

      <!-- 6. CONTACTS & VERIFIED LINKS -->
      <section class="space-y-8">
        <div>
          <span class="text-xs font-mono text-zinc-500 tracking-widest uppercase block mb-2">
            // 05 VERIFIED CHANNELS
          </span>
          <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#14161f] border border-white/[0.08] text-zinc-400 font-mono text-xs uppercase tracking-wider mb-2 card-sheen">
            {{ t('contactSection.eyebrow') }}
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold font-mono text-white">
            {{ t('contactSection.title') }}
          </h2>
          <p class="text-sm text-zinc-400 font-sans mt-1">
            {{ t('contactSection.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            v-for="link in confirmedLinks"
            :key="link.id"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-between p-4 rounded-xl border border-white/[0.08] bg-[#14161f] card-sheen hover:border-amber-500/40 hover:bg-[#1a1d28] transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-black/30 group"
          >
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-[#1b1e2a] border border-white/[0.1] text-white group-hover:text-amber-400 transition-colors card-sheen">
                <UIcon
                  :name="link.icon"
                  class="w-4 h-4"
                />
              </div>
              <div>
                <span class="text-xs font-bold font-mono text-white block group-hover:text-amber-300 transition-colors">
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
  </div>
</template>
