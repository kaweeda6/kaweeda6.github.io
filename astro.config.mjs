import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'

import mdx from '@astrojs/mdx';

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
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  integrations: [
    tailwind(),
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
        // Exclude neighborhood pages (temporarily deactivated)
        if (url.startsWith('/dentist-')) return false
        return true
      },
      serialize(item) {
        const buildDate = new Date().toISOString().split('T')[0]
        // Normalize homepage URL to match canonical (with trailing slash)
        const url = item.url === 'https://www.thrivedentalny.com'
          ? 'https://www.thrivedentalny.com/'
          : item.url
        // Blog posts: use updatedDate from frontmatter if available
        if (url.includes('/blog/') && url !== 'https://www.thrivedentalny.com/blog') {
          const lastmod = item.lastmod ?? buildDate
          return { url, lastmod }
        }
        return { url, lastmod: buildDate }
      },
    }),
    mdx(),
  ],
})