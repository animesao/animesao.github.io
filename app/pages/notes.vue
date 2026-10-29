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
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 animate-reveal">
    <!-- Header -->
    <div class="space-y-4 border-b border-[#222736] pb-8">
      <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#161a25] border border-[#2b3346] text-zinc-400 font-mono text-xs uppercase tracking-wider">
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
    <div class="rounded-2xl border border-dashed border-[#2c3448] bg-[#131620] p-8 sm:p-12 text-center space-y-6 shadow-xl shadow-black/20">
      <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-[#2b3346] bg-[#1a1e2c] text-sky-400">
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
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 text-black font-mono text-xs font-bold hover:bg-white transition-all duration-150 shadow-md shadow-black/30 hover:-translate-y-0.5"
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
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#2b3346] bg-[#141722] text-white font-mono text-xs hover:bg-[#1c2130] hover:border-[#3e4860] transition-all duration-150 hover:-translate-y-0.5"
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
