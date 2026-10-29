<script setup lang="ts">
import { siteConfig } from '~/data/siteConfig'

const { locale } = useI18n()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} · ${siteConfig.name}` : `${siteConfig.name} · Software Developer`
  },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'color-scheme', content: 'dark' },
    { name: 'theme-color', content: '#0a0b0e' },
    { name: 'author', content: 'animesao' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: computed(() => locale.value)
  }
})
</script>

<template>
  <UApp>
    <div class="min-h-screen flex flex-col bg-[#0a0b0e] text-zinc-100 selection:bg-sky-500/30 selection:text-white">
      <AppHeader />
      <main
        id="main-content"
        class="flex-1"
      >
        <NuxtPage />
      </main>
      <AppFooter />
    </div>
  </UApp>
</template>
