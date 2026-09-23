#!/usr/bin/env node
/**
 * Export template preview slides to PNG.
 *
 * Renders every HTML in templates/previews/<template-id>/ to a PNG next to it,
 * so os .md dos templates podem mostrar como cada esqueleto fica.
 *
 * Usage:
 *   node scripts/export-templates.mjs                 # todos os templates
 *   node scripts/export-templates.mjs tipografico     # só um
 *   node scripts/export-templates.mjs --scale 0.5     # metade da resolução (arquivos leves)
 */

import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PREVIEWS = path.join(ROOT, 'templates', 'previews');

const args = process.argv.slice(2);
const scaleFlag = args.indexOf('--scale');
const scale = scaleFlag !== -1 ? Number(args[scaleFlag + 1]) : 1;
const only = args.filter((a, i) => !a.startsWith('--') && !(scaleFlag !== -1 && i === scaleFlag + 1));

if (!fs.existsSync(PREVIEWS)) {
  console.error(`Pasta não encontrada: templates/previews/`);
  process.exit(1);
}

const WIDTH = 1080;
const HEIGHT = 1350;

const dirs = fs
  .readdirSync(PREVIEWS, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name)
  .filter(name => only.length === 0 || only.includes(name))
  .sort();

if (dirs.length === 0) {
  console.error(only.length ? `Template não encontrado: ${only.join(', ')}` : 'Nenhum preview para exportar.');
  process.exit(1);
}

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);
const executablePath = CHROME_CANDIDATES.find(p => fs.existsSync(p));
if (!executablePath) {
  console.error('Chrome/Chromium não encontrado. Defina CHROME_PATH.');
  process.exit(1);
}

console.log(`\n🎨  Previews de template  ·  ${WIDTH}×${HEIGHT} @ ${scale}x\n`);

const browser = await puppeteer.launch({
  executablePath,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--allow-file-access-from-files'],
});

let total = 0;

for (const dir of dirs) {
  const dirPath = path.join(PREVIEWS, dir);
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html')).sort();

  if (files.length === 0) continue;
  console.log(`  ${dir}`);

  for (const file of files) {
    const htmlPath = path.join(dirPath, file);
    const pngPath = path.join(dirPath, file.replace('.html', '.png'));

    const page = await browser.newPage();
    await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: scale });
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 20000 });
    await page.waitForFunction(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: pngPath, type: 'png', clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT } });
    await page.close();

    console.log(`     ✅  ${file.replace('.html', '.png')}`);
    total++;
  }
}

await browser.close();
console.log(`\n🎉  ${total} preview(s) em templates/previews/\n`);
