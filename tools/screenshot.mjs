import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright'
import { spawnSync } from 'node:child_process'

const BASE = 'http://localhost:4321'
const OUT_DIR = join(process.cwd(), 'screenshots')
const VIEWPORTS = [
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1280', width: 1280, height: 800 },
]

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR)

// Get routes by invoking the listRoutes script
const routes = spawnSync(process.execPath, [join('tools', 'listRoutes.mjs')], { encoding: 'utf8' })
if (routes.status !== 0) {
  console.error('Failed to get routes', routes.stderr)
  process.exit(1)
}
const paths = routes.stdout.trim().split(/\r?\n/).filter(Boolean)

const browser = await chromium.launch()
const context = await browser.newContext({ deviceScaleFactor: 2 })
const page = await context.newPage()

const results = []

for (const vp of VIEWPORTS) {
  const dir = join(OUT_DIR, vp.name)
  try { mkdirSync(dir, { recursive: true }) } catch {}
  await page.setViewportSize({ width: vp.width, height: vp.height })

  for (const p of paths) {
    const url = BASE + p
    const safe = p === '/' ? 'home' : p.replace(/^\//, '').replace(/\//g, '__')
    const file = join(dir, safe + '.png')
    try {
      const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
      if (!resp || !resp.ok()) throw new Error('HTTP ' + (resp ? resp.status() : 'no response'))
      // settle any animations quickly
      await page.waitForTimeout(200)
      const hasOverflow = await page.evaluate(() => {
        const w = window.innerWidth
        const sw = document.documentElement.scrollWidth
        const bodySw = document.body.scrollWidth
        return sw > w + 1 || bodySw > w + 1
      })
      await page.screenshot({ path: file, fullPage: true })
      results.push({ path: p, viewport: vp.name, ok: true, overflow: hasOverflow })
      process.stdout.write('.')
    } catch (err) {
      results.push({ path: p, viewport: vp.name, ok: false, error: String(err) })
      process.stdout.write('E')
    }
  }
  process.stdout.write('\n')
}

await browser.close()

const reportPath = join(OUT_DIR, 'report.json')
writeFileSync(reportPath, JSON.stringify(results, null, 2))
console.log('\nSaved screenshots to', OUT_DIR)
console.log('Report:', reportPath)

