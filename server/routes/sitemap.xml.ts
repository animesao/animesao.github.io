import { siteConfig } from '../../app/data/siteConfig'
import { projectsData } from '../../app/data/projects'

export default defineEventHandler((event) => {
  const envUrl = typeof process !== 'undefined' ? process.env?.NUXT_PUBLIC_SITE_URL : undefined
  const baseUrl = envUrl || siteConfig.siteUrl || 'https://animesao.work.gd'

  const staticRoutes = [
    '',
    '/about',
    '/projects',
    '/stack',
    '/notes'
  ]

  const projectRoutes = projectsData.map(p => `/projects/${p.slug}`)
  const allBaseRoutes = [...staticRoutes, ...projectRoutes]

  const urls: string[] = []

  // Add RU (default) and EN routes
  for (const route of allBaseRoutes) {
    urls.push(`${baseUrl}${route || '/'}`)
    urls.push(`${baseUrl}/en${route}`)
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    url => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url.endsWith('/') ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  setHeader(event, 'content-type', 'application/xml')
  return sitemap
})
