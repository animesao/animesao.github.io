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
  cardinalRepo?: string
  cardinalWingsRepo?: string
  cardinalPanelRepo?: string
  cardinalOrg?: string
  cardinalBlueprintsRepo?: string
  // Unverified/unknown contacts left intentionally undefined - never displayed
  email?: string
  discord?: string
  telegram?: string
  twitter?: string
}

export const publicContacts: ContactsConfig = {
  github: 'https://github.com/animesao',
  cardinalRepo: 'https://github.com/animesao/cardinal',
  cardinalWingsRepo: 'https://github.com/animesao/cardinal-wings',
  cardinalPanelRepo: 'https://github.com/animesao/cardinal-panel',
  cardinalOrg: 'https://github.com/cardinal-organization',
  cardinalBlueprintsRepo: 'https://github.com/cardinal-organization/cardinal-blueprints',
  discord: 'https://dsc.gg/cardinal-organization'
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

  if (publicContacts.cardinalPanelRepo) {
    links.push({
      id: 'cardinal-panel-repo',
      label: {
        ru: 'Репозиторий Cardinal Panel',
        en: 'Cardinal Panel Repository'
      },
      url: publicContacts.cardinalPanelRepo,
      icon: 'i-lucide-layout-dashboard',
      category: 'project',
      badge: 'Web Panel'
    })
  }

  if (publicContacts.cardinalOrg) {
    links.push({
      id: 'cardinal-org',
      label: {
        ru: 'Организация Cardinal',
        en: 'Cardinal Organization'
      },
      url: publicContacts.cardinalOrg,
      icon: 'i-simple-icons-github',
      category: 'official',
      badge: '@cardinal-organization'
    })
  }

  if (publicContacts.cardinalBlueprintsRepo) {
    links.push({
      id: 'cardinal-blueprints-repo',
      label: {
        ru: 'Репозиторий Blueprints',
        en: 'Cardinal Blueprints'
      },
      url: publicContacts.cardinalBlueprintsRepo,
      icon: 'i-lucide-layers',
      category: 'project',
      badge: '27 Blueprints'
    })
  }

  if (publicContacts.discord) {
    links.push({
      id: 'discord',
      label: {
        ru: 'Discord сообщество',
        en: 'Discord Community'
      },
      url: publicContacts.discord,
      icon: 'i-simple-icons-discord',
      category: 'official',
      badge: 'Cardinal Discord'
    })
  }

  return links
}
