import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import fs from 'node:fs'
import path from 'node:path'
import { LIVE_NEIGHBORHOODS } from './src/data/live-neighborhoods.mjs'

// Read real updatedDate values from blog frontmatter so sitemap <lastmod>
// is truthful. Every other page omits lastmod entirely — a build-date
// lastmod that advances on every deploy is ignored by Google.
const blogDir = path.resolve('./src/pages/blog')
const blogLastmod = {}
for (const file of fs.readdirSync(blogDir)) {
  if (!file.endsWith('.mdx')) continue
  const m = fs
    .readFileSync(path.join(blogDir, file), 'utf8')
    .match(/^updatedDate:\s*["']?(\d{4}-\d{2}-\d{2})/m)
  if (m) blogLastmod[file.replace(/\.mdx$/, '')] = m[1]
}

export default defineConfig({
  site: 'https://www.thrivedentalny.com',
  trailingSlash: 'never',
  prefetch: true,
  image: {
    endpoint: {
      route: '/_image',
    },
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {},
    },
  },
  integrations: [
    // global.css already contains the @tailwind directives — without this
    // flag the base stylesheet is compiled and shipped twice (~81 KB dupe).
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter(page) {
        const url = page.replace('https://www.thrivedentalny.com', '')
        // Exclude noindexed utility pages
        if (url.startsWith('/privacy') || url === '/404' || url === '/404/') return false
        // Exclude service+location combo pages (noindexed — served by ServiceLocationPage.astro)
        const serviceLocationPatterns = [
          '/dental-implants-', '/invisalign-', '/emergency-dentist-',
          '/cosmetic-dentist-', '/porcelain-veneers-', '/teeth-whitening-',
        ]
        if (serviceLocationPatterns.some(p => url.startsWith(p))) return false
        // Neighborhood pages: only the live (indexed) set
        if (url.startsWith('/dentist-')) return LIVE_NEIGHBORHOODS.includes(url)
        return true
      },
      serialize(item) {
        const slug = item.url.match(/\/blog\/([^/]+?)\/?$/)?.[1]
        if (slug && blogLastmod[slug]) return { url: item.url, lastmod: blogLastmod[slug] }
        // No truthful per-page modification date available — omit lastmod.
        return { url: item.url }
      },
    }),
    mdx(),
  ],
})
