#!/usr/bin/env node
/**
 * Screenshot helper for the project-writer skill (fallback to Claude-in-Chrome).
 *
 * Usage:
 *   node .claude/skills/project-writer/scripts/shoot.mjs <slug> <config.json>
 *
 * Reuses the puppeteer already installed under instagram-posts/node_modules,
 * or a globally/locally resolvable `puppeteer`.
 *
 * Config shape: see config.example.json in this folder.
 *   {
 *     "baseUrl": "http://localhost:3000",
 *     "outDir": "public/projects/<slug>",           // optional, defaults to public/projects/<slug>
 *     "desktop": { "width": 1440, "height": 900, "deviceScaleFactor": 2 },
 *     "mobile":  { "width": 390,  "height": 844, "deviceScaleFactor": 3 },
 *     "defaultQuality": 82,
 *     "shots": [
 *       { "name": "01-hero", "path": "/", "device": "desktop", "clip": "viewport" },
 *       { "name": "02-sobre", "path": "/", "device": "desktop", "scrollTo": "#sobre" },
 *       { "name": "03-app", "path": "/app", "device": "desktop", "fullPage": true, "waitFor": 1500 }
 *     ]
 *   }
 *
 * Per-shot fields:
 *   name      - file name without extension
 *   path      - route appended to baseUrl
 *   device    - "desktop" | "mobile" (default "desktop")
 *   format    - "jpg" | "png" (default "jpg")
 *   quality   - JPEG quality (default config.defaultQuality or 82)
 *   one of:
 *     clip: "viewport"   - capture just the current viewport
 *     selector: "..."    - capture the bounding box of the first match
 *     fullPage: true     - capture the entire scrollable page
 *     scrollTo: "..."    - scrollIntoView the selector, then capture the viewport
 *   waitFor   - extra ms to wait after load / scroll (default 800)
 *   hide      - array of selectors to display:none before capturing (cookie banners, etc.)
 */

import fs from 'fs'
import path from 'path'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)
const here = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(here, '../../../..')

function loadPuppeteer() {
  const candidates = [
    'puppeteer',
    path.join(repoRoot, 'node_modules/puppeteer'),
    path.join(repoRoot, 'instagram-posts/node_modules/puppeteer'),
    path.join(repoRoot, 'instagram-reels/node_modules/puppeteer'),
  ]
  for (const c of candidates) {
    try {
      return require(c)
    } catch {
      /* try next */
    }
  }
  console.error(
    'Could not resolve puppeteer. Install it (e.g. `cd instagram-posts && npm i`) or use the Claude-in-Chrome plugin instead.',
  )
  process.exit(1)
}

const [, , slug, configPath] = process.argv
if (!slug || !configPath) {
  console.error('Usage: node shoot.mjs <slug> <config.json>')
  process.exit(1)
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
const baseUrl = (config.baseUrl || 'http://localhost:3000').replace(/\/$/, '')
const outDir = path.resolve(repoRoot, config.outDir || `public/projects/${slug}`)
const defaultQuality = config.defaultQuality ?? 82
const devices = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 2, ...(config.desktop || {}) },
  mobile: { width: 390, height: 844, deviceScaleFactor: 3, ...(config.mobile || {}) },
}

fs.mkdirSync(outDir, { recursive: true })

const puppeteer = loadPuppeteer()

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean)

const executablePath = CHROME_CANDIDATES.find((p) => {
  try {
    return fs.existsSync(p)
  } catch {
    return false
  }
})

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: executablePath || undefined,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars'],
})

console.log(`\n📸  ${slug}  ·  ${baseUrl}  ·  ${config.shots.length} shots\n`)

for (const shot of config.shots) {
  const device = devices[shot.device || 'desktop']
  const format = shot.format || 'jpg'
  const ext = format === 'png' ? 'png' : 'jpg'
  const quality = shot.quality ?? defaultQuality
  const file = path.join(outDir, `${shot.name}.${ext}`)

  const page = await browser.newPage()
  await page.setViewport(device)

  const url = baseUrl + (shot.path || '/')
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 })
  } catch {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 })
  }
  await sleep(shot.waitFor ?? 800)

  if (Array.isArray(shot.hide) && shot.hide.length) {
    await page.evaluate((selectors) => {
      for (const s of selectors) {
        document.querySelectorAll(s).forEach((el) => {
          el.style.setProperty('display', 'none', 'important')
        })
      }
    }, shot.hide)
  }

  const opts = { path: file }
  if (ext === 'jpg') opts.quality = quality
  opts.type = ext === 'png' ? 'png' : 'jpeg'

  if (shot.fullPage) {
    opts.fullPage = true
  } else if (shot.selector) {
    const el = await page.$(shot.selector)
    if (!el) {
      console.warn(`  ⚠  ${shot.name}: selector "${shot.selector}" not found — capturing viewport`)
    } else {
      await el.evaluate((node) => node.scrollIntoView({ block: 'start' }))
      await sleep(300)
      await el.screenshot(opts)
      console.log(`  ✓  ${shot.name}.${ext}  (selector)`)
      await page.close()
      continue
    }
  } else if (shot.scrollTo) {
    const found = await page.evaluate((sel) => {
      const el = document.querySelector(sel)
      if (!el) return false
      el.scrollIntoView({ block: 'start' })
      return true
    }, shot.scrollTo)
    if (!found) console.warn(`  ⚠  ${shot.name}: scrollTo "${shot.scrollTo}" not found`)
    await sleep(500)
  }

  await page.screenshot(opts)
  console.log(`  ✓  ${shot.name}.${ext}  (${shot.fullPage ? 'full page' : 'viewport'})`)
  await page.close()
}

await browser.close()
console.log(`\nDone. Files in ${path.relative(repoRoot, outDir)}/\n`)
