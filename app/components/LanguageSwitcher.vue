<script setup lang="ts">
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div class="inline-flex items-center rounded-lg border border-white/[0.08] bg-[#12141a] card-sheen p-0.5 text-xs font-mono shadow-sm">
    <NuxtLink
      :to="switchLocalePath('ru')"
      class="px-2 py-1 rounded-md transition-all duration-150"
      :class="locale === 'ru' ? 'bg-[#181b24] text-white font-semibold border border-white/[0.12] card-sheen shadow-sm' : 'text-zinc-400 hover:text-white border border-transparent'"
      aria-label="Переключить на русский язык"
    >
      RU
    </NuxtLink>
    <span class="text-zinc-600 px-0.5 select-none">/</span>
    <NuxtLink
      :to="switchLocalePath('en')"
      class="px-2 py-1 rounded-md transition-all duration-150"
      :class="locale === 'en' ? 'bg-[#181b24] text-white font-semibold border border-white/[0.12] card-sheen shadow-sm' : 'text-zinc-400 hover:text-white border border-transparent'"
      aria-label="Switch to English language"
    >
      EN
    </NuxtLink>
  </div>
</template>
