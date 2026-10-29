import { baselineVersions } from '../../../app/data/versions'

let cachedVersions = { ...baselineVersions }
let lastFetchTime = 0
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

export default defineEventHandler(async (event) => {
  setHeader(event, 'cache-control', 'public, max-age=300, s-maxage=300')

  const now = Date.now()
  if (now - lastFetchTime < CACHE_TTL_MS) {
    return cachedVersions
  }

  const repos: Record<string, string> = {
    'cardinal': 'animesao/cardinal',
    'cardinal-wings': 'animesao/cardinal-wings',
    'cardinal-panel': 'animesao/cardinal-panel'
  }

  const updated = { ...cachedVersions }

  await Promise.allSettled(
    Object.entries(repos).map(async ([key, repo]) => {
      try {
        const response = await $fetch<{ tag_name?: string }>(`https://api.github.com/repos/${repo}/releases/latest`, {
          headers: {
            'User-Agent': 'animesao-portfolio-sync'
          },
          timeout: 4000
        })

        if (response?.tag_name) {
          updated[key as keyof typeof updated] = response.tag_name
        }
      } catch {
        // Fallback silently to existing cached / baseline version
      }
    })
  )

  cachedVersions = updated
  lastFetchTime = now

  return cachedVersions
})
