import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const versionsJsonPath = path.resolve(__dirname, '../app/data/versions.json')
const versionsTsPath = path.resolve(__dirname, '../app/data/versions.ts')

// Local desktop locations to inspect
const localPaths = {
  'cardinal': path.resolve(__dirname, '../../cardinal'),
  'cardinal-wings': path.resolve(__dirname, '../../cardinal-wings'),
  'cardinal-panel': path.resolve(__dirname, '../../cardinal-panel'),
  'cardinal-blueprints': path.resolve(__dirname, '../../cardinal-blueprints')
}

// GitHub repo fallback if local directories are absent
const repos = {
  'cardinal': 'animesao/cardinal',
  'cardinal-wings': 'animesao/cardinal-wings',
  'cardinal-panel': 'animesao/cardinal-panel',
  'cardinal-blueprints': 'cardinal-organization/cardinal-blueprints'
}

let existingVersions = {
  'cardinal': 'v2.4.13',
  'cardinal-wings': 'v0.5.20',
  'cardinal-panel': 'v0.6.7',
  'cardinal-blueprints': '27 blueprints'
}

if (fs.existsSync(versionsJsonPath)) {
  try {
    existingVersions = JSON.parse(fs.readFileSync(versionsJsonPath, 'utf8'))
  } catch {
    // keep default
  }
}

const resolvedVersions = { ...existingVersions }

async function sync() {
  for (const [key, dir] of Object.entries(localPaths)) {
    let detected = null

    if (fs.existsSync(dir)) {
      // 0. Try reading registry.json (for blueprints)
      const registryFile = path.join(dir, 'registry.json')
      if (fs.existsSync(registryFile)) {
        try {
          const reg = JSON.parse(fs.readFileSync(registryFile, 'utf8'))
          if (reg.blueprints && typeof reg.blueprints === 'object') {
            const count = Object.keys(reg.blueprints).length
            detected = `${count} blueprints`
          }
        } catch {
          // ignore
        }
      }

      // 1. Try reading VERSION file
      const versionFile = path.join(dir, 'VERSION')
      if (fs.existsSync(versionFile)) {
        const v = fs.readFileSync(versionFile, 'utf8').trim()
        if (v) detected = v.startsWith('v') ? v : `v${v}`
      }

      // 2. Try git tag in that directory
      if (!detected) {
        try {
          const out = execSync('git describe --tags --abbrev=0', { cwd: dir, stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim()
          if (out) detected = out
        } catch {
          // ignore
        }
      }

      // 3. Try package.json version
      if (!detected) {
        const pkgJson = path.join(dir, 'package.json')
        if (fs.existsSync(pkgJson)) {
          try {
            const pkg = JSON.parse(fs.readFileSync(pkgJson, 'utf8'))
            if (pkg.version) detected = `v${pkg.version}`
          } catch {
            // ignore
          }
        }
      }
    } else {
      // Remote fallback via GitHub API
      try {
        const headers = { 'User-Agent': 'animesao-sync-script' }
        if (process.env.GITHUB_TOKEN) {
          headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
        }
        const res = await fetch(`https://api.github.com/repos/${repos[key]}/releases/latest`, {
          headers
        })
        if (res.ok) {
          const data = await res.json()
          if (data && data.tag_name) detected = data.tag_name
        }
      } catch {
        // fallback
      }
    }

    if (detected) {
      resolvedVersions[key] = detected
      console.log(`[sync-versions] Resolved ${key}: ${detected}`)
    } else {
      console.log(`[sync-versions] Kept current baseline for ${key}: ${resolvedVersions[key]}`)
    }
  }

  // Write JSON
  fs.writeFileSync(versionsJsonPath, JSON.stringify(resolvedVersions, null, 2) + '\n', 'utf8')

  // Write TS
  const tsContent = `export interface ProjectVersions {
  'cardinal': string
  'cardinal-wings': string
  'cardinal-panel': string
  'cardinal-blueprints': string
}

export const baselineVersions: ProjectVersions = {
  'cardinal': '${resolvedVersions.cardinal}',
  'cardinal-wings': '${resolvedVersions['cardinal-wings']}',
  'cardinal-panel': '${resolvedVersions['cardinal-panel']}',
  'cardinal-blueprints': '${resolvedVersions['cardinal-blueprints'] || '27 blueprints'}'
}
`
  fs.writeFileSync(versionsTsPath, tsContent, 'utf8')
  console.log(`[sync-versions] Successfully updated ${versionsJsonPath} and ${versionsTsPath}`)
}

await sync()
