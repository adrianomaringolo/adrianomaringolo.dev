#!/usr/bin/env node
/**
 * Revisão visual: tira um screenshot de cada cena num instante fixo e monta uma grade.
 * Rode antes de exportar — é aqui que aparecem texto vazando, sobreposição e elementos cortados.
 *
 * Usage:
 *   node scripts/snapshot-reel.mjs reel-09                  # cada cena em (duração − 0.6s) + capa
 *   node scripts/snapshot-reel.mjs reel-09 --at 1@2.5,4@6   # instantes específicos (cena@segundos)
 *   node scripts/snapshot-reel.mjs reel-09 --scenes 3,4     # só essas cenas
 *
 * Saída: output/<reel>/snapshots/scene-NN@T.png + grid.png (4 colunas)
 *
 * Usa a Web Animations API (mesmo método do export-reel.mjs), então o quadro é exatamente o do vídeo.
 * Abre um Chrome por cena: várias páginas pesadas (ex.: granulado SVG) na mesma sessão derrubam o navegador.
 */

import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const args = process.argv.slice(2);
const reelId = args[0];
if (!reelId) { console.error('Usage: node scripts/snapshot-reel.mjs <reel-id> [--at 1@2.5,4@6] [--scenes 3,4]'); process.exit(1); }
const opt = name => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };

const htmlDir = path.join(ROOT, 'html', reelId);
const meta = JSON.parse(fs.readFileSync(path.join(htmlDir, 'meta.json'), 'utf8'));
const outDir = path.join(ROOT, 'output', reelId, 'snapshots');
fs.mkdirSync(outDir, { recursive: true });

const atMap = Object.fromEntries((opt('--at') || '').split(',').filter(Boolean).map(s => s.split('@').map(Number)));
const only = opt('--scenes')?.split(',').map(Number);

const shots = meta.scenes
  .map((scene, i) => ({ file: scene.file, n: i + 1, t: atMap[i + 1] ?? Math.max(0, (scene.duration ?? 3) - 0.6) }))
  .filter(s => (!only || only.includes(s.n)) && (!opt('--at') || atMap[s.n] !== undefined));
if (!only && !opt('--at') && fs.existsSync(path.join(htmlDir, 'cover.html'))) shots.push({ file: 'cover.html', n: 'capa', t: 0 });

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);
const chromeExecutable = CHROME_CANDIDATES.find(p => fs.existsSync(p));
if (!chromeExecutable) { console.error('Chrome/Chromium não encontrado. Defina a variável CHROME_PATH.'); process.exit(1); }

const pngs = [];
for (const shot of shots) {
  const browser = await puppeteer.launch({
    executablePath: chromeExecutable,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--allow-file-access-from-files'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
  await page.goto(`file://${path.join(htmlDir, shot.file)}`, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(tMs => document.getAnimations().forEach(a => { a.pause(); a.currentTime = tMs; }), shot.t * 1000);
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
  const name = `${shot.file.replace('.html', '')}@${shot.t.toFixed(1)}.png`;
  const png = path.join(outDir, name);
  await page.screenshot({ path: png, clip: { x: 0, y: 0, width: 1080, height: 1920 } });
  await browser.close();
  pngs.push(png);
  console.log(`  📸  ${name}`);
}

// Grade 4 colunas (posições em pixels, já que todas as imagens têm 1080×1920)
if (pngs.length > 1) {
  const cols = Math.min(4, pngs.length);
  const layout = pngs.map((_, i) => `${(i % cols) * 1080}_${Math.floor(i / cols) * 1920}`).join('|');
  const grid = path.join(outDir, 'grid.png');
  const r = spawnSync('ffmpeg', [
    '-loglevel', 'error', '-y', ...pngs.flatMap(p => ['-i', p]),
    '-filter_complex', `${pngs.map((_, i) => `[${i}]`).join('')}xstack=inputs=${pngs.length}:layout=${layout}:fill=black,scale=${cols * 360}:-1`,
    grid,
  ], { stdio: ['ignore', 'pipe', 'pipe'] });
  if (r.status !== 0) { console.error(r.stderr.toString()); process.exit(1); }
  console.log(`\n  🧩  ${path.relative(process.cwd(), grid)}\n`);
}
