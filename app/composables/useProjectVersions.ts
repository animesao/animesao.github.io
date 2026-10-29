import { ref, onMounted } from 'vue'
import { baselineVersions } from '~/data/versions'

const versions = ref<Record<string, string>>({
  'cardinal': baselineVersions.cardinal || 'v2.4.13',
  'cardinal-wings': baselineVersions['cardinal-wings'] || 'v0.5.20',
  'cardinal-panel': baselineVersions['cardinal-panel'] || 'v0.6.7',
  'cardinal-blueprints': baselineVersions['cardinal-blueprints'] || '27 blueprints'
})

let hasFetched = false

export function useProjectVersions() {
  function getVersion(slug: string): string {
    return versions.value[slug] || 'latest'
  }

  onMounted(async () => {
    if (hasFetched) return
    hasFetched = true

    try {
      // 1. Try internal API endpoint
      const res = await $fetch<Record<string, string>>('/api/versions').catch(() => null)
      if (res && typeof res === 'object') {
        Object.assign(versions.value, res)
        return
      }

      // 2. Client fallback direct to GitHub API
      const repos = [
        { key: 'cardinal', repo: 'animesao/cardinal' },
        { key: 'cardinal-wings', repo: 'animesao/cardinal-wings' },
        { key: 'cardinal-panel', repo: 'animesao/cardinal-panel' },
        { key: 'cardinal-blueprints', repo: 'cardinal-organization/cardinal-blueprints' }
      ]

      await Promise.allSettled(
        repos.map(async ({ key, repo }) => {
          try {
            const release = await $fetch<{ tag_name?: string }>(`https://api.github.com/repos/${repo}/releases/latest`)
            if (release?.tag_name) {
              versions.value[key] = release.tag_name
            }
          } catch {
            // Keep baseline
          }
        })
      )
    } catch {
      // Keep baseline
    }
  })

  return {
    versions,
    getVersion
  }
}
