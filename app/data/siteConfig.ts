export interface SiteConfig {
  name: string
  handle: string
  role: string
  defaultLocale: 'ru' | 'en'
  locales: Array<{ code: 'ru' | 'en', name: string, label: string }>
  siteUrl: string
  socialLinks: {
    github?: string
    cardinalRepo?: string
    cardinalWingsRepo?: string
    cardinalPanelRepo?: string
  }
}

const envSiteUrl = typeof process !== 'undefined' ? process.env?.NUXT_PUBLIC_SITE_URL : undefined

export const siteConfig: SiteConfig = {
  name: 'ANIMESAO',
  handle: 'animesao',
  role: 'Software Developer · AI-assisted Development',
  defaultLocale: 'ru',
  locales: [
    { code: 'ru', name: 'Русский', label: 'RU' },
    { code: 'en', name: 'English', label: 'EN' }
  ],
  siteUrl: envSiteUrl || 'https://animesao.work.gd',
  socialLinks: {
    github: 'https://github.com/animesao',
    cardinalRepo: 'https://github.com/animesao/cardinal',
    cardinalWingsRepo: 'https://github.com/animesao/cardinal-wings',
    cardinalPanelRepo: 'https://github.com/animesao/cardinal-panel'
  }
}
