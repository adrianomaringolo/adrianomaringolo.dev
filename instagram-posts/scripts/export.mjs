#!/usr/bin/env node
/**
 * Export Instagram post slides to PNG.
 *
 * Usage:
 *   node scripts/export.mjs posts/2026-06-09-quem-sou-eu
 *   node scripts/export.mjs posts/2026-06-09-quem-sou-eu --slides 1,3
 */

import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const postArg = process.argv[2];
const slidesArg = process.argv[4]; // after --slides

if (!postArg) {
  console.error('Usage: node scripts/export.mjs <post-folder> [--slides 1,3,5]');
  process.exit(1);
}

const postDir = path.resolve(ROOT, postArg);
if (!fs.existsSync(postDir)) {
  console.error(`Post folder not found: ${postDir}`);
  process.exit(1);
}

const meta = JSON.parse(fs.readFileSync(path.join(postDir, 'meta.json'), 'utf8'));
const { format = '1080x1080', slides } = meta;
const [width, height] = format.split('x').map(Number);

let toExport = slides;
if (slidesArg) {
  const indices = slidesArg.split(',').map(n => parseInt(n) - 1);
  toExport = slides.filter((_, i) => indices.includes(i));
}

console.log(`\n📸  Exportando "${meta.title}" (${format})\n`);

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--allow-file-access-from-files'],
});

for (const slide of toExport) {
  const htmlPath = path.join(postDir, slide.file);
  const pngPath = htmlPath.replace('.html', '.png');

  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 2 });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 20000 });
  await page.waitForFunction(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: pngPath, type: 'png', clip: { x: 0, y: 0, width, height } });
  await page.close();

  console.log(`  ✅  ${slide.file.replace('.html', '.png')}  —  ${slide.title}`);
}

await browser.close();
console.log(`\n🎉  Exportado em ${path.relative(ROOT, postDir)}/\n`);
