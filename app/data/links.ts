export interface PublicLink {
  id: string
  label: {
    ru: string
    en: string
  }
  url: string
  icon: string
  category: 'social' | 'project' | 'official'
  badge?: string
}

export interface ContactsConfig {
  github?: string
  cardinalSite?: string
  cardinalRepo?: string
  cardinalWingsRepo?: string
  // Unverified/unknown contacts left intentionally undefined - never displayed
  email?: string
  discord?: string
  telegram?: string
  twitter?: string
}

export const publicContacts: ContactsConfig = {
  github: 'https://github.com/animesao',
  cardinalSite: 'https://cardinal.work.gd/',
  cardinalRepo: 'https://github.com/animesao/cardinal',
  cardinalWingsRepo: 'https://github.com/animesao/cardinal-wings'
}

/**
 * Returns only confirmed and non-empty public links
 */
export function getConfirmedPublicLinks(_locale: 'ru' | 'en' = 'ru'): PublicLink[] {
  const links: PublicLink[] = []

  if (publicContacts.github) {
    links.push({
      id: 'github',
      label: {
        ru: 'GitHub Профиль',
        en: 'GitHub Profile'
      },
      url: publicContacts.github,
      icon: 'i-simple-icons-github',
      category: 'social',
      badge: '@animesao'
    })
  }

  if (publicContacts.cardinalSite) {
    links.push({
      id: 'cardinal-site',
      label: {
        ru: 'Сайт Cardinal',
        en: 'Cardinal Website'
      },
      url: publicContacts.cardinalSite,
      icon: 'i-lucide-globe',
      category: 'official',
      badge: 'cardinal.work.gd'
    })
  }

  if (publicContacts.cardinalRepo) {
    links.push({
      id: 'cardinal-repo',
      label: {
        ru: 'Репозиторий Cardinal',
        en: 'Cardinal Repository'
      },
      url: publicContacts.cardinalRepo,
      icon: 'i-lucide-box',
      category: 'project',
      badge: 'Runtime'
    })
  }

  if (publicContacts.cardinalWingsRepo) {
    links.push({
      id: 'cardinal-wings-repo',
      label: {
        ru: 'Репозиторий Cardinal Wings',
        en: 'Cardinal Wings Repository'
      },
      url: publicContacts.cardinalWingsRepo,
      icon: 'i-lucide-cpu',
      category: 'project',
      badge: 'API Daemon'
    })
  }

  return links
}
