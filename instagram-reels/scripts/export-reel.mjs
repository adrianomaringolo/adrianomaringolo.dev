#!/usr/bin/env node
/**
 * Export Instagram Reel scenes to a single MP4 (or cover PNG).
 *
 * Usage:
 *   node scripts/export-reel.mjs reel-01
 *   node scripts/export-reel.mjs reel-01 --transition blocks   ← HTML strip animation
 *   node scripts/export-reel.mjs reel-01 --transition slideup  ← ffmpeg xfade
 *   node scripts/export-reel.mjs reel-01 --music track.mp3 --volume 0.35
 *   node scripts/export-reel.mjs reel-01 --scenes 1,3 --fps 30
 *   node scripts/export-reel.mjs reel-01 --cover               ← screenshot PNG da capa
 *
 * Transition modes:
 *   blocks            — renders transition.html between scenes (add data-duration to that file)
 *   slideup|fade|...  — ffmpeg xfade filter (any xfade transition name)
 *
 * Cover mode (--cover):
 *   Tira screenshot de cover.html (ou scene-01.html como fallback) → output/reel-NN/cover.png
 *   A screenshot é tirada após as animações de entrada estabilizarem (aguarda settle_time do meta.json,
 *   ou 1.5s por padrão). Use --cover-time N para definir o momento exato em segundos.
 */

import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { execSync, spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import os from 'os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

function getArg(flag, def = null) {
  const i = process.argv.indexOf(flag);
  return i !== -1 ? process.argv[i + 1] : def;
}

const reelId         = process.argv[2];
const scenesArg      = getArg('--scenes');
const FPS            = parseInt(getArg('--fps', '30'));
const musicArg       = getArg('--music');
const volume         = parseFloat(getArg('--volume', '0.35'));
const TRANSITION     = getArg('--transition', 'blocks');
const TRANSITION_DUR = parseFloat(getArg('--transition-duration', '0.5'));
const COVER_MODE     = process.argv.includes('--cover');
const COVER_TIME     = parseFloat(getArg('--cover-time', '1.5'));

if (!reelId) {
  console.error('Usage: node scripts/export-reel.mjs <reel-id> [options]');
  console.error('  --cover                           exportar capa PNG (cover.html ou scene-01)');
  console.error('  --cover-time 1.5                  momento em segundos para o screenshot da capa');
  console.error('  --transition blocks|slideup|fade  transition mode (default: blocks)');
  console.error('  --transition-duration 0.5         xfade duration in seconds');
  console.error('  --scenes 1,3                      export only these scenes');
  console.error('  --fps 30                          frames per second');
  console.error('  --music file.mp3                  background music');
  console.error('  --volume 0.35                     music volume 0–1');
  process.exit(1);
}

try { execSync('ffmpeg -version', { stdio: 'ignore' }); }
catch { console.error('ffmpeg not found. Install: sudo apt install ffmpeg'); process.exit(1); }

let musicPath = null;
if (musicArg) {
  musicPath = path.isAbsolute(musicArg) ? musicArg : path.resolve(process.cwd(), musicArg);
  if (!fs.existsSync(musicPath)) { console.error(`Music file not found: ${musicPath}`); process.exit(1); }
}

const htmlDir   = path.join(ROOT, 'html', reelId);
const outputDir = path.join(ROOT, 'output', reelId);
if (!fs.existsSync(htmlDir))  { console.error(`html/${reelId} not found`); process.exit(1); }

const metaPath = path.join(htmlDir, 'meta.json');
if (!fs.existsSync(metaPath)) { console.error(`meta.json not found in html/${reelId}`); process.exit(1); }

const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
const { scenes } = meta;
const [width, height] = [1080, 1920];

let toExport = scenes;
if (scenesArg) {
  const indices = scenesArg.split(',').map(n => parseInt(n) - 1);
  toExport = scenes.filter((_, i) => indices.includes(i));
}

const scenesTotalDuration = toExport.reduce((sum, s) => sum + (s.duration ?? 3), 0);
const USE_BLOCKS = TRANSITION === 'blocks';

// For blocks: transition is a separate clip inserted between scenes (+time)
// For xfade:  transition overlaps adjacent scenes (-time)
let effectiveDuration;
if (USE_BLOCKS) {
  const transHtmlPath = path.join(htmlDir, 'transition.html');
  const transHtml = fs.existsSync(transHtmlPath) ? fs.readFileSync(transHtmlPath, 'utf8') : '';
  const m = transHtml.match(/data-duration="([^"]+)"/);
  const transDur = m ? parseFloat(m[1]) : 0.8;
  effectiveDuration = scenesTotalDuration + transDur * Math.max(0, toExport.length - 1);
} else {
  effectiveDuration = scenesTotalDuration - TRANSITION_DUR * Math.max(0, toExport.length - 1);
}

fs.mkdirSync(outputDir, { recursive: true });

console.log(`\n🎬  "${meta.title}"`);
console.log(`    ${reelId}  ·  1080x1920  ·  ${FPS}fps  ·  ${effectiveDuration.toFixed(1)}s`);
console.log(`    transicao: ${TRANSITION}`);
if (musicPath) console.log(`    musica: ${path.basename(musicPath)}  vol: ${volume}`);
console.log();

// ── Helper: capture an HTML file into a MP4 clip ──────────────────────────────
async function captureHtml(browser, htmlPath, duration, mp4Path, label) {
  const totalFrames = Math.ceil(duration * FPS);
  const frameMs     = 1000 / FPS;
  const tmpDir      = fs.mkdtempSync(path.join(os.tmpdir(), `reel-cap-`));

  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.waitForFunction(() => document.fonts.ready);
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));

  // Pause all CSS animations and store original delays
  await page.evaluate(() => {
    document.querySelectorAll('*').forEach(el => {
      const cs = window.getComputedStyle(el);
      if (!cs.animationName || cs.animationName === 'none') return;
      const delays = cs.animationDelay.split(',').map(d => parseFloat(d) * 1000);
      el.dataset._origDelays = delays.join(',');
      el.style.animationPlayState = 'paused';
    });
  });

  for (let i = 0; i < totalFrames; i++) {
    const tMs = i * frameMs;
    await page.evaluate((tMs) => {
      document.querySelectorAll('[data-_orig-delays]').forEach(el => {
        const delays = el.dataset._origDelays.split(',').map(Number);
        el.style.animationDelay = delays.map(d => `${-(tMs - d)}ms`).join(',');
      });
    }, tMs);
    await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
    const png = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width, height } });
    fs.writeFileSync(path.join(tmpDir, `frame-${String(i).padStart(5, '0')}.png`), png);
  }

  await page.close();

  const enc = spawnSync('ffmpeg', [
    '-y', '-r', String(FPS),
    '-i', path.join(tmpDir, 'frame-%05d.png'),
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18',
    '-pix_fmt', 'yuv420p', '-vf', `scale=${width}:${height}`, '-an',
    mp4Path,
  ], { stdio: ['ignore', 'pipe', 'pipe'] });

  fs.rmSync(tmpDir, { recursive: true, force: true });

  if (enc.status !== 0) {
    console.error(`ffmpeg encode error (${label}):\n${enc.stderr.toString()}`);
    process.exit(1);
  }

  return totalFrames;
}

// ── Launch browser and export scenes ─────────────────────────────────────────
const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--allow-file-access-from-files'],
});

// ── Cover mode: screenshot de cover.html (ou scene-01.html) ──────────────────
if (COVER_MODE) {
  const coverHtml  = path.join(htmlDir, 'cover.html');
  const fallback   = path.join(htmlDir, scenes[0].file);
  const srcPath    = fs.existsSync(coverHtml) ? coverHtml : fallback;
  const coverPng   = path.join(outputDir, 'cover.png');

  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(`file://${srcPath}`, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.waitForFunction(() => document.fonts.ready);

  // Avança as animações para o momento desejado via scrubbing
  const tMs = COVER_TIME * 1000;
  await page.evaluate(() => {
    document.querySelectorAll('*').forEach(el => {
      const cs = window.getComputedStyle(el);
      if (!cs.animationName || cs.animationName === 'none') return;
      const delays = cs.animationDelay.split(',').map(d => parseFloat(d) * 1000);
      el.dataset._origDelays = delays.join(',');
      el.style.animationPlayState = 'paused';
    });
  });
  await page.evaluate((tMs) => {
    document.querySelectorAll('[data-_orig-delays]').forEach(el => {
      const delays = el.dataset._origDelays.split(',').map(Number);
      el.style.animationDelay = delays.map(d => `${-(tMs - d)}ms`).join(',');
    });
  }, tMs);
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));

  const png = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width, height } });
  fs.writeFileSync(coverPng, png);
  await page.close();
  await browser.close();

  const sizeKb = (fs.statSync(coverPng).size / 1024).toFixed(0);
  console.log(`\n  🖼️   cover.png  —  ${width}×${height}  ·  t=${COVER_TIME}s  ·  ${sizeKb} KB`);
  console.log(`\n🎉  Output: output/${reelId}/cover.png\n`);
  process.exit(0);
}

const sceneMp4Paths = [];

for (const scene of toExport) {
  const htmlPath  = path.join(htmlDir, scene.file);
  const mp4Name   = scene.file.replace('.html', '.mp4');
  const mp4Path   = path.join(outputDir, mp4Name);
  const duration  = scene.duration ?? 3;
  const sceneIdx  = String(scenes.indexOf(scene) + 1).padStart(2, '0');

  const frames = await captureHtml(browser, htmlPath, duration, mp4Path, scene.file);
  sceneMp4Paths.push(mp4Path);
  console.log(`  ✅  ${mp4Name}  —  ${scene.title}  (${duration}s · ${frames} frames)`);
}

// ── Blocks transition: capture transition.html clip ──────────────────────────
let transMp4Path = null;
let transDuration = 0;

if (USE_BLOCKS && sceneMp4Paths.length > 1) {
  const transHtmlPath = path.join(htmlDir, 'transition.html');
  if (!fs.existsSync(transHtmlPath)) {
    console.error('  blocks transition requires transition.html in html/' + reelId + '/');
    process.exit(1);
  }
  const transHtml = fs.readFileSync(transHtmlPath, 'utf8');
  const m = transHtml.match(/data-duration="([^"]+)"/);
  transDuration = m ? parseFloat(m[1]) : 0.8;
  transMp4Path  = path.join(outputDir, '_transition.mp4');

  const frames = await captureHtml(browser, transHtmlPath, transDuration, transMp4Path, 'transition.html');
  console.log(`  🎨  _transition.mp4  (${transDuration}s · ${frames} frames)`);
}

await browser.close();

// ── Stitch ───────────────────────────────────────────────────────────────────
const rawMp4 = musicPath
  ? path.join(outputDir, `${reelId}-raw.mp4`)
  : path.join(outputDir, `${reelId}.mp4`);

if (USE_BLOCKS && sceneMp4Paths.length > 1) {
  // Interleave: scene-01, transition, scene-02, transition, ..., scene-N
  const concatList = [];
  for (let i = 0; i < sceneMp4Paths.length; i++) {
    concatList.push(`file '${sceneMp4Paths[i]}'`);
    if (i < sceneMp4Paths.length - 1) concatList.push(`file '${transMp4Path}'`);
  }
  const concatFile = path.join(outputDir, '_concat.txt');
  fs.writeFileSync(concatFile, concatList.join('\n'));

  const concat = spawnSync('ffmpeg', [
    '-y', '-f', 'concat', '-safe', '0', '-i', concatFile, '-c', 'copy', rawMp4,
  ], { stdio: ['ignore', 'pipe', 'pipe'] });

  fs.unlinkSync(concatFile);
  if (transMp4Path) fs.unlinkSync(transMp4Path);

  if (concat.status !== 0) {
    console.error(`ffmpeg concat error:\n${concat.stderr.toString()}`);
    process.exit(1);
  }
} else if (sceneMp4Paths.length > 1) {
  // xfade filtergraph
  const filters = [];
  let offset = 0, prevLabel = '0:v';
  for (let i = 1; i < sceneMp4Paths.length; i++) {
    offset += (toExport[i - 1].duration ?? 3) - TRANSITION_DUR;
    const outLabel = i === sceneMp4Paths.length - 1 ? 'vout' : `v${i}`;
    filters.push(`[${prevLabel}][${i}:v]xfade=transition=${TRANSITION}:duration=${TRANSITION_DUR}:offset=${offset.toFixed(4)}[${outLabel}]`);
    prevLabel = outLabel;
  }
  const inputs = sceneMp4Paths.flatMap(p => ['-i', p]);
  const stitch = spawnSync('ffmpeg', [
    '-y', ...inputs,
    '-filter_complex', filters.join(';'),
    '-map', '[vout]', '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-an',
    rawMp4,
  ], { stdio: ['ignore', 'pipe', 'pipe'] });
  if (stitch.status !== 0) { console.error(`xfade error:\n${stitch.stderr.toString()}`); process.exit(1); }
} else {
  fs.copyFileSync(sceneMp4Paths[0], rawMp4);
}

// ── Music mix ─────────────────────────────────────────────────────────────────
const finalMp4 = path.join(outputDir, `${reelId}.mp4`);

if (musicPath) {
  const fadeOutStart = Math.max(0, effectiveDuration - 1.5);
  const audioFilter  = [
    `aloop=loop=-1:size=2e+09`,
    `atrim=duration=${effectiveDuration}`,
    `volume=${volume}`,
    `afade=t=in:st=0:d=0.8`,
    `afade=t=out:st=${fadeOutStart}:d=1.5`,
  ].join(',');

  const mix = spawnSync('ffmpeg', [
    '-y', '-i', rawMp4, '-i', musicPath,
    '-filter_complex', `[1:a]${audioFilter}[aout]`,
    '-map', '0:v:0', '-map', '[aout]',
    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest',
    finalMp4,
  ], { stdio: ['ignore', 'pipe', 'pipe'] });

  if (mix.status !== 0) { console.error(`music mix error:\n${mix.stderr.toString()}`); process.exit(1); }
  fs.unlinkSync(rawMp4);
  console.log(`\n  🎵  musica mixada  (vol ${volume} · fade in/out)`);
}

const finalSize = (fs.statSync(finalMp4).size / 1024).toFixed(0);
console.log(`  🎞️   ${reelId}.mp4  —  ${effectiveDuration.toFixed(1)}s  ·  ${finalSize} KB`);

// ── Caption ───────────────────────────────────────────────────────────────────
const hashtags = (meta.hashtags || []).map(t => `#${t}`).join(' ');
const captionMd = `# ${meta.title}

> Reel gerado em ${meta.date} · ${toExport.length} cenas · ${effectiveDuration.toFixed(1)}s · transicao: ${TRANSITION}${musicPath ? ` · musica: ${path.basename(musicPath)}` : ''}

---

## Legenda

${meta.caption}

---

## Hashtags

${hashtags}
`;

fs.writeFileSync(path.join(outputDir, 'caption.md'), captionMd, 'utf8');
console.log(`  📝  caption.md gerado`);
console.log(`\n🎉  Output: output/${reelId}/${reelId}.mp4\n`);
