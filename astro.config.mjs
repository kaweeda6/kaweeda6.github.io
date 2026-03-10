import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'

import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://www.thrivedentalny.com',
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
        return true
      },
      serialize(item) {
        if (item.url === 'https://www.thrivedentalny.com/') {
          return { ...item, priority: 1.0, changefreq: 'weekly' }
        }
        if (item.url.includes('/blog/')) {
          return { ...item, priority: 0.6, changefreq: 'monthly' }
        }
        if (item.url.includes('/services/')) {
          return { ...item, priority: 0.8, changefreq: 'monthly' }
        }
        if (item.url.includes('/doctors')) {
          return { ...item, priority: 0.7, changefreq: 'monthly' }
        }
        // Service+location pages and neighborhood pages
        const localPatterns = ['/dental-implants-', '/invisalign-', '/emergency-dentist-', '/cosmetic-dentist-', '/porcelain-veneers-', '/teeth-whitening-', '/dentist-']
        if (localPatterns.some(p => item.url.includes(p))) {
          return { ...item, priority: 0.6, changefreq: 'monthly' }
        }
        return { ...item, priority: 0.5, changefreq: 'monthly' }
      },
    }),
    mdx(),
  ],
})