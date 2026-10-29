<script setup lang="ts">
import { notesData } from '~/data/notes'

const { locale, t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => locale.value === 'ru' ? 'Заметки и статьи · animesao' : 'Notes & Articles · animesao',
  description: () => locale.value === 'ru'
    ? 'Технические заметки разработчика animesao об архитектуре связки Cardinal Panel и Wings, рантайме на Go и Linux примитивах.'
    : 'Engineering notes by developer animesao on Cardinal Panel & Wings architecture, Go runtime internals, and Linux primitives.',
  ogTitle: () => locale.value === 'ru' ? 'Заметки и статьи · animesao' : 'Notes & Articles · animesao'
})
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 animate-reveal">
    <!-- Header -->
    <div class="space-y-4 border-b border-white/[0.08] pb-8">
      <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#14161f] border border-white/[0.08] text-zinc-400 font-mono text-xs uppercase tracking-wider card-sheen">
        {{ locale === 'ru' ? 'ТЕХНИЧЕСКИЙ ЖУРНАЛ // ARCHITECTURE & SYSTEMS' : 'ENGINEERING JOURNAL // ARCHITECTURE & SYSTEMS' }}
      </div>
      <h1 class="text-3xl sm:text-5xl font-bold font-mono text-white">
        {{ t('notes.title') }}
      </h1>
      <p class="text-sm sm:text-base text-zinc-400 font-sans max-w-2xl leading-relaxed">
        {{ t('notes.subtitle') }}
      </p>
    </div>

    <!-- Notes List -->
    <div class="space-y-6">
      <article
        v-for="note in notesData"
        :key="note.id"
        class="flex flex-col rounded-2xl border border-white/[0.08] bg-[#14161f] card-sheen p-6 sm:p-8 hover:border-amber-500/50 hover:bg-[#181b25] hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 shadow-xl shadow-black/30 group"
      >
        <!-- Meta Row -->
        <header class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-2.5 py-0.5 rounded text-[11px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/25 card-sheen font-medium">
              {{ note.category[locale as 'ru' | 'en'] }}
            </span>
            <span class="px-2.5 py-0.5 rounded text-[11px] font-mono bg-[#1b1e2a] text-zinc-400 border border-white/[0.06] flex items-center gap-1.5">
              <UIcon
                name="i-lucide-clock"
                class="w-3 h-3 text-zinc-400"
              />
              {{ note.readTime[locale as 'ru' | 'en'] }}
            </span>
          </div>

          <time
            :datetime="note.date"
            class="text-xs font-mono text-zinc-500 flex items-center gap-1.5"
          >
            <UIcon
              name="i-lucide-calendar"
              class="w-3.5 h-3.5 text-zinc-500"
            />
            {{ note.date }}
          </time>
        </header>

        <!-- Title -->
        <NuxtLink
          :to="localePath(`/notes/${note.slug}`)"
          class="block mb-3"
        >
          <h2 class="text-xl sm:text-2xl font-bold font-mono text-white group-hover:text-amber-300 transition-colors leading-tight">
            {{ note.title[locale as 'ru' | 'en'] }}
          </h2>
        </NuxtLink>

        <!-- Summary -->
        <p class="text-sm text-zinc-300 leading-relaxed font-sans mb-6">
          {{ note.summary[locale as 'ru' | 'en'] }}
        </p>

        <!-- Tags & Read Link -->
        <footer class="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex flex-wrap items-center gap-1.5">
            <span
              v-for="tag in note.tags"
              :key="tag"
              class="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1b1e2a] text-zinc-400 border border-white/[0.06]"
            >
              #{{ tag }}
            </span>
          </div>

          <NuxtLink
            :to="localePath(`/notes/${note.slug}`)"
            class="inline-flex items-center gap-2 text-xs font-mono font-semibold text-amber-400 group-hover:text-amber-300 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>{{ locale === 'ru' ? 'Читать заметку' : 'Read article' }}</span>
            <UIcon
              name="i-lucide-arrow-right"
              class="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5"
            />
          </NuxtLink>
        </footer>
      </article>
    </div>

    <!-- Bottom note on authenticity -->
    <div class="rounded-xl border border-white/[0.06] bg-[#0d0e12] card-sheen p-5 text-center font-mono text-xs text-zinc-500">
      {{ locale === 'ru'
        ? 'Все заметки основаны на реальном коде и архитектурных решениях репозиториев Cardinal, Wings и Panel.'
        : 'All articles are derived directly from verified codebase architectures across Cardinal, Wings, and Panel.'
      }}
    </div>
  </div>
</template>
