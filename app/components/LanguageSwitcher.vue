<script setup lang="ts">
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div class="inline-flex items-center rounded-md border border-white/10 bg-white/5 p-0.5 text-xs font-mono">
    <NuxtLink
      :to="switchLocalePath('ru')"
      class="px-2 py-1 rounded transition-colors"
      :class="locale === 'ru' ? 'bg-white/15 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'"
      aria-label="Переключить на русский язык"
    >
      RU
    </NuxtLink>
    <span class="text-zinc-600 select-none">/</span>
    <NuxtLink
      :to="switchLocalePath('en')"
      class="px-2 py-1 rounded transition-colors"
      :class="locale === 'en' ? 'bg-white/15 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'"
      aria-label="Switch to English language"
    >
      EN
    </NuxtLink>
  </div>
</template>
