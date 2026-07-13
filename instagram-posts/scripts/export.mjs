#!/usr/bin/env node
/**
 * Export Instagram post slides to PNG and generate caption.md.
 *
 * Usage:
 *   node scripts/export.mjs post-01
 *   node scripts/export.mjs post-01 --slides 1,3
 */

import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const postId = process.argv[2];
const slidesFlag = process.argv.indexOf('--slides');
const slidesArg = slidesFlag !== -1 ? process.argv[slidesFlag + 1] : null;

if (!postId) {
  console.error('Usage: node scripts/export.mjs <post-id> [--slides 1,3,5]');
  console.error('Example: node scripts/export.mjs post-01');
  process.exit(1);
}

const htmlDir = path.join(ROOT, 'html', postId);
const outputDir = path.join(ROOT, 'output', postId);

if (!fs.existsSync(htmlDir)) {
  console.error(`HTML folder not found: html/${postId}`);
  process.exit(1);
}

const metaPath = path.join(htmlDir, 'meta.json');
if (!fs.existsSync(metaPath)) {
  console.error(`meta.json not found in html/${postId}`);
  process.exit(1);
}

const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
const { format = '1080x1350', slides } = meta;
const [width, height] = format.split('x').map(Number);

let toExport = slides;
if (slidesArg) {
  const indices = slidesArg.split(',').map(n => parseInt(n) - 1);
  toExport = slides.filter((_, i) => indices.includes(i));
}

fs.mkdirSync(outputDir, { recursive: true });

console.log(`\n📸  "${meta.title}"  ·  ${postId}  ·  ${format}\n`);

// Export PNGs
const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--allow-file-access-from-files'],
});

for (const slide of toExport) {
  const htmlPath = path.join(htmlDir, slide.file);
  const pngName = slide.file.replace('.html', '.png');
  const pngPath = path.join(outputDir, pngName);

  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 2 });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 20000 });
  await page.waitForFunction(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: pngPath, type: 'png', clip: { x: 0, y: 0, width, height } });
  await page.close();

  console.log(`  ✅  ${pngName}  —  ${slide.title}`);
}

await browser.close();

// Generate caption.md
const hashtags = (meta.hashtags || []).map(t => `#${t}`).join(' ');
const captionMd = `# ${meta.title}

> Post gerado em ${meta.date} · ${meta.type} · ${format}

---

## Legenda

${meta.caption}

---

## Hashtags

${hashtags}
`;

const captionPath = path.join(outputDir, 'caption.md');
fs.writeFileSync(captionPath, captionMd, 'utf8');
console.log(`\n  📝  caption.md gerado`);

console.log(`\n🎉  Output em output/${postId}/\n`);
