import { readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const PAGES_DIR = join(process.cwd(), 'src', 'pages')

function walk(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    if (name.startsWith('.')) continue
    const full = join(dir, name)
    const st = statSync(full)
    if (st.isDirectory()) out.push(...walk(full))
    else if (st.isFile() && (name.endsWith('.astro') || name.endsWith('.mdx'))) out.push(full)
  }
  return out
}

const files = walk(PAGES_DIR)

function toRoute(file) {
  const rel = relative(PAGES_DIR, file)
  let path = '/' + rel.split(sep).join('/')
  // strip extensions
  path = path.replace(/\.(astro|mdx)$/i, '')
  // remove trailing /index
  path = path.replace(/\/index$/i, '')
  if (path === '') path = '/'
  return path
}

// Exclude utility pages and 404
const EXCLUDE = new Set(['/404', '/privacy'])

const routes = files.map(toRoute).filter(p => !EXCLUDE.has(p))

// Sort by length for nicer order
routes.sort((a, b) => a.localeCompare(b))

for (const r of routes) console.log(r)

