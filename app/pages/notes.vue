<script setup lang="ts">
const { locale, t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => locale.value === 'ru' ? 'Заметки · animesao' : 'Notes · animesao',
  description: () => locale.value === 'ru'
    ? 'Технические заметки и статьи разработчика animesao о рантайме Cardinal, Go и AI-assisted engineering.'
    : 'Technical notes and essays by developer animesao on Cardinal internals, Go systems programming, and AI-assisted pipelines.',
  ogTitle: () => locale.value === 'ru' ? 'Заметки · animesao' : 'Notes · animesao'
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
    <!-- Header -->
    <div class="space-y-4 border-b border-white/10 pb-8">
      <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-400 font-mono text-xs uppercase tracking-wider">
        {{ locale === 'ru' ? 'ТЕХНИЧЕСКИЙ БЛОГ' : 'ENGINEERING JOURNAL' }}
      </div>
      <h1 class="text-3xl sm:text-5xl font-bold font-mono text-white">
        {{ t('notes.title') }}
      </h1>
      <p class="text-sm sm:text-base text-zinc-400 font-sans max-w-2xl leading-relaxed">
        {{ t('notes.subtitle') }}
      </p>
    </div>

    <!-- Elegant Empty State -->
    <div class="rounded-xl border border-dashed border-white/15 bg-[#0d0f17]/50 p-8 sm:p-12 text-center space-y-6">
      <div class="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 text-zinc-400">
        <UIcon
          name="i-lucide-file-text"
          class="w-6 h-6"
        />
      </div>

      <div class="space-y-2 max-w-lg mx-auto">
        <h2 class="text-lg font-bold font-mono text-white">
          {{ t('notes.emptyTitle') }}
        </h2>
        <p class="text-xs text-zinc-400 font-sans leading-relaxed">
          {{ t('notes.emptyDesc') }}
        </p>
      </div>

      <div class="pt-4 flex flex-wrap items-center justify-center gap-3">
        <NuxtLink
          :to="localePath('/projects')"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black font-mono text-xs font-bold hover:bg-zinc-200 transition-colors"
        >
          <span>{{ t('common.viewProjects') }}</span>
          <UIcon
            name="i-lucide-arrow-right"
            class="w-3.5 h-3.5"
          />
        </NuxtLink>

        <a
          href="https://github.com/animesao"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white font-mono text-xs hover:bg-white/10 transition-colors"
        >
          <UIcon
            name="i-simple-icons-github"
            class="w-3.5 h-3.5"
          />
          <span>{{ t('common.openGitHub') }}</span>
        </a>
      </div>
    </div>
  </div>
</template>
