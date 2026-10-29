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
    { name: 'theme-color', content: '#0d0e12' },
    { name: 'author', content: 'animesao' }
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'shortcut icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: computed(() => locale.value)
  }
})
</script>

<template>
  <UApp>
    <div class="min-h-screen flex flex-col bg-[#0d0e12] text-zinc-100 selection:bg-amber-500/30 selection:text-amber-100">
      <AppHeader />
      <main
        id="main-content"
        class="flex-1"
      >
        <NuxtPage />
      </main>
      <AppFooter />
      <AppLicenseModal />
    </div>
  </UApp>
</template>
