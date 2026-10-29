// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/i18n'
  ],

  devtools: {
    enabled: false
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2026-06-30',

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/en',
        '/about',
        '/en/about',
        '/projects',
        '/en/projects',
        '/projects/cardinal',
        '/en/projects/cardinal',
        '/projects/cardinal-wings',
        '/en/projects/cardinal-wings',
        '/projects/cardinal-panel',
        '/en/projects/cardinal-panel',
        '/stack',
        '/en/stack',
        '/notes',
        '/en/notes',
        '/sitemap.xml'
      ]
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  fonts: {
    providers: {
      google: false,
      fontsource: false,
      fontshare: false,
      adobe: false,
      bunny: false
    }
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'ru',
    locales: [
      { code: 'ru', language: 'ru-RU', name: 'Русский' },
      { code: 'en', language: 'en-US', name: 'English' }
    ],
    vueI18n: './i18n.config.ts'
  }
})
