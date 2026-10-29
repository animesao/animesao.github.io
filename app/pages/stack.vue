<script setup lang="ts">
import { techStackData } from '~/data/techStack'

const { locale, t } = useI18n()

useSeoMeta({
  title: () => locale.value === 'ru' ? 'Технологический стек · animesao' : 'Tech Stack · animesao',
  description: () => locale.value === 'ru'
    ? 'Технологический профиль animesao: Go, TypeScript, Nuxt 4, Linux namespaces, cgroups v2, OpenCode и Gemini 3.8 Flash.'
    : 'Engineering tech stack of animesao: Go, TypeScript, Nuxt 4, Linux namespaces, cgroups v2, OpenCode, and Gemini 3.8 Flash.',
  ogTitle: () => locale.value === 'ru' ? 'Технологический стек · animesao' : 'Tech Stack · animesao'
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 animate-reveal">
    <!-- Header -->
    <div class="space-y-4 border-b border-white/[0.08] pb-8">
      <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#14161f] border border-white/[0.08] text-zinc-400 font-mono text-xs uppercase tracking-wider card-sheen">
        {{ t('stackSection.eyebrow') }}
      </div>
      <h1 class="text-3xl sm:text-5xl font-bold font-mono text-white">
        {{ t('nav.stack') }}
      </h1>
      <p class="text-sm sm:text-base text-zinc-400 font-sans max-w-3xl leading-relaxed">
        {{ locale === 'ru'
          ? 'Структурированный обзор языков, системных инструментов, веб-фреймворков и AI-окружения с подробным описанием контекста их применения в реальных проектах.'
          : 'Structured taxonomy of programming languages, system primitives, web frameworks, and AI workflows with contextual transparency.'
        }}
      </p>

      <!-- Legend / Status descriptions -->
      <div class="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/25 card-sheen">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-400" />
          {{ locale === 'ru' ? 'В ключевых проектах' : 'In Core Projects' }}
        </span>
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 card-sheen">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          {{ locale === 'ru' ? 'Текущий рабочий стек' : 'Current Stack' }}
        </span>
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/25 card-sheen">
          <span class="w-1.5 h-1.5 rounded-full bg-purple-400" />
          {{ locale === 'ru' ? 'Эксперименты / Изучаю' : 'Learning & Scripts' }}
        </span>
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/25 card-sheen">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-400" />
          {{ locale === 'ru' ? 'Запланировано' : 'Planned' }}
        </span>
      </div>
    </div>

    <!-- Tech Categories -->
    <div class="space-y-12">
      <section
        v-for="category in techStackData"
        :key="category.id"
        class="space-y-6"
      >
        <div>
          <h2 class="text-xl sm:text-2xl font-bold font-mono text-white">
            {{ category.title[locale as 'ru' | 'en'] }}
          </h2>
          <p class="text-xs sm:text-sm text-zinc-400 font-sans mt-1">
            {{ category.description[locale as 'ru' | 'en'] }}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TechCard
            v-for="item in category.items"
            :key="item.id"
            :item="item"
          />
        </div>
      </section>
    </div>
  </div>
</template>
