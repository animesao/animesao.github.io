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

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'shortcut icon', href: '/favicon.ico' }
      ]
    }
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
        '/projects/cardinal-blueprints',
        '/en/projects/cardinal-blueprints',
        '/stack',
        '/en/stack',
        '/notes',
        '/en/notes',
        '/sitemap.xml',
        '/api/versions'
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
