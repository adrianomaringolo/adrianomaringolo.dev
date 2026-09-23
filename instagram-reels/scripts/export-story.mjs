#!/usr/bin/env node
/**
 * Export Instagram Story frames to PNGs (and optionally short MP4 loops).
 *
 * Stories são uma SEQUÊNCIA de cards verticais 1080×1920 que o espectador
 * avança com toque. Cada card é publicado como uma imagem (ou vídeo curto)
 * separada — não existe concatenação como no Reel.
 *
 * Usage:
 *   node scripts/export-story.mjs story-01
 *   node scripts/export-story.mjs story-01 --guides       ← gera também *-guides.png com as safe zones
 *   node scripts/export-story.mjs story-01 --video        ← gera também frame-NN.mp4 (um vídeo por frame)
 *   node scripts/export-story.mjs story-01 --stitch       ← --video + story-NN.mp4 concatenado (upload único)
 *   node scripts/export-story.mjs story-01 --stitch --music trilha.mp3   ← + trilha no story-NN.mp4
 *   node scripts/export-story.mjs story-01 --resume --music trilha.mp3   ← reaproveita os frame-NN.mp4, só remixa
 *   node scripts/export-story.mjs story-01 --frames 1,3   ← exporta só esses frames
 *   node scripts/export-story.mjs story-01 --settle 2.4   ← momento (s) do screenshot PNG após as entradas
 *
 * Transição: se existir html/story-NN/transition.html, ela é intercalada entre os frames
 * no story-NN.mp4 concatenado (mesmo esquema "blocks" do export-reel).
 *
 * Saída:  output/story-NN/frame-01.png ... (+ frame-NN.mp4 / story-NN.mp4) + story.md
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

const storyId   = process.argv[2];
const framesArg = getArg('--frames');
const SETTLE    = parseFloat(getArg('--settle', '2.0'));
const FPS       = parseInt(getArg('--fps', '30'));
const GUIDES    = process.argv.includes('--guides');
const RESUME    = process.argv.includes('--resume');
const musicArg  = getArg('--music');
const musicStartArg = getArg('--music-start', 'end');
const volume    = parseFloat(getArg('--volume', '0.32'));
const STITCH    = process.argv.includes('--stitch') || !!musicArg;
const VIDEO     = process.argv.includes('--video') || STITCH;

const [width, height] = [1080, 1920];

// Safe zones do Instagram Stories (px, a partir das bordas de 1080×1920)
const SAFE = { top: 250, bottom: 250, side: 64, sticker: 340 };

if (!storyId) {
  console.error('Usage: node scripts/export-story.mjs <story-id> [options]');
  console.error('  --guides          gera também *-guides.png com as safe zones desenhadas');
  console.error('  --video           gera também frame-NN.mp4 (movimento sutil, usa data-duration)');
  console.error('  --stitch          implica --video + concatena tudo em story-NN.mp4 (upload único)');
  console.error('  --resume          reaproveita frame-NN.mp4 já renderizados (só refaz stitch/música)');
  console.error('  --music file.mp3  trilha no story-NN.mp4 (implica --stitch); relativo ao cwd ou music/');
  console.error('  --music-start end trecho da faixa: "end" alinha o fim, ou segundos a partir de onde cortar');
  console.error('  --volume 0.32     volume da música 0–1');
  console.error('  --frames 1,3      exporta só esses frames');
  console.error('  --settle 2.0      momento em segundos do screenshot (após as animações de entrada)');
  console.error('  --fps 30          frames por segundo (só com --video)');
  process.exit(1);
}

let musicPath = null;
if (musicArg) {
  const cands = [
    path.isAbsolute(musicArg) ? musicArg : path.resolve(process.cwd(), musicArg),
    path.join(ROOT, 'music', musicArg),
    path.join(ROOT, 'music', path.basename(musicArg)),
  ];
  musicPath = cands.find(p => fs.existsSync(p));
  if (!musicPath) { console.error(`Música não encontrada: ${musicArg}`); process.exit(1); }
}

const htmlDir   = path.join(ROOT, 'html', storyId);
const outputDir = path.join(ROOT, 'output', storyId);
if (!fs.existsSync(htmlDir)) { console.error(`html/${storyId} não encontrado`); process.exit(1); }

const metaPath = path.join(htmlDir, 'meta.json');
if (!fs.existsSync(metaPath)) { console.error(`meta.json não encontrado em html/${storyId}`); process.exit(1); }

const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
const allFrames = meta.frames || meta.scenes;
if (!allFrames?.length) { console.error('meta.json precisa de um array "frames"'); process.exit(1); }

if (VIDEO) {
  try { execSync('ffmpeg -version', { stdio: 'ignore' }); }
  catch { console.error('ffmpeg não encontrado (necessário para --video). Instale: brew install ffmpeg'); process.exit(1); }
}

let toExport = allFrames;
if (framesArg) {
  const idx = framesArg.split(',').map(n => parseInt(n) - 1);
  toExport = allFrames.filter((_, i) => idx.includes(i));
}

fs.mkdirSync(outputDir, { recursive: true });

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);
const chromeExecutable = CHROME_CANDIDATES.find(p => fs.existsSync(p));
if (!chromeExecutable) { console.error('Chrome/Chromium não encontrado. Defina CHROME_PATH.'); process.exit(1); }

const browser = await puppeteer.launch({
  executablePath: chromeExecutable,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--allow-file-access-from-files'],
});

console.log(`\n📱  Story "${meta.title}"`);
console.log(`    ${storyId}  ·  1080×1920  ·  ${toExport.length} frame(s)  ·  screenshot @ ${SETTLE}s\n`);

// scrub das animações de entrada para o instante `SETTLE`
async function scrubTo(page, seconds) {
  const tMs = seconds * 1000;
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
}

async function drawGuides(page) {
  await page.evaluate((SAFE) => {
    const o = document.createElement('div');
    o.style.cssText = 'position:fixed;inset:0;z-index:99999;pointer-events:none;font-family:monospace';
    const band = (css, label) => `<div style="position:absolute;${css};background:rgba(239,68,68,0.16);
      border:2px dashed rgba(239,68,68,0.9);color:#fca5a5;font-size:22px;
      display:flex;align-items:center;justify-content:center">${label}</div>`;
    o.innerHTML =
      band(`top:0;left:0;right:0;height:${SAFE.top}px`, 'topo — perfil / hora') +
      band(`bottom:0;left:0;right:0;height:${SAFE.bottom}px`, 'base — barra de resposta') +
      `<div style="position:absolute;left:0;right:0;bottom:0;height:${SAFE.sticker}px;
        border-top:2px dotted rgba(250,204,21,0.9)"></div>` +
      band(`top:0;bottom:0;left:0;width:${SAFE.side}px`, '') +
      band(`top:0;bottom:0;right:0;width:${SAFE.side}px`, '');
    document.body.appendChild(o);
  }, SAFE);
}

async function captureVideo(htmlPath, duration, mp4Path, label) {
  const totalFrames = Math.ceil(duration * FPS);
  const frameMs = 1000 / FPS;
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'story-cap-'));

  // Browser dedicado por frame: renderizar centenas de screenshots numa aba só
  // estoura a memória do Chrome (ProtocolError / Session closed) quando são vários frames.
  const vb = await puppeteer.launch({
    executablePath: chromeExecutable,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--allow-file-access-from-files'],
  });
  try {
    const page = await vb.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForFunction(() => document.fonts.ready);
    await page.evaluate(() => {
      document.querySelectorAll('*').forEach(el => {
        const cs = window.getComputedStyle(el);
        if (!cs.animationName || cs.animationName === 'none') return;
        el.dataset._origDelays = cs.animationDelay.split(',').map(d => parseFloat(d) * 1000).join(',');
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
  } finally {
    await vb.close();
  }

  const enc = spawnSync('ffmpeg', [
    '-y', '-r', String(FPS), '-i', path.join(tmpDir, 'frame-%05d.png'),
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18',
    '-pix_fmt', 'yuv420p', '-vf', `scale=${width}:${height}`, '-an', mp4Path,
  ], { stdio: ['ignore', 'pipe', 'pipe'] });
  fs.rmSync(tmpDir, { recursive: true, force: true });
  if (enc.status !== 0) { console.error(`ffmpeg (${label}):\n${enc.stderr.toString()}`); process.exit(1); }
  return totalFrames;
}

const frameMp4s = [];

for (const frame of toExport) {
  const htmlPath = path.join(htmlDir, frame.file);
  if (!fs.existsSync(htmlPath)) { console.error(`  ${frame.file} não encontrado`); continue; }
  const base = frame.file.replace('.html', '');
  const pngPath = path.join(outputDir, `${base}.png`);
  const mp4Path = path.join(outputDir, `${base}.mp4`);
  const dur = frame.duration ?? 5;

  // --resume: só re-stitcha/remixa; reaproveita frame-NN.mp4 e frame-NN.png já gerados
  if (RESUME && fs.existsSync(mp4Path) && fs.existsSync(pngPath)) {
    frameMp4s.push(mp4Path);
    console.log(`  ⏭️   ${base}  —  ${frame.title}  (reaproveitado)`);
    continue;
  }

  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.waitForFunction(() => document.fonts.ready);
  await scrubTo(page, SETTLE);
  const png = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width, height } });
  fs.writeFileSync(pngPath, png);

  let guideNote = '';
  if (GUIDES) {
    await drawGuides(page);
    const g = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width, height } });
    fs.writeFileSync(path.join(outputDir, `${base}-guides.png`), g);
    guideNote = ' (+guides)';
  }
  await page.close();

  let videoNote = '';
  if (VIDEO) {
    await captureVideo(htmlPath, dur, mp4Path, frame.file);
    frameMp4s.push(mp4Path);
    videoNote = ` (+mp4 ${dur}s)`;
  }

  const kb = (fs.statSync(pngPath).size / 1024).toFixed(0);
  console.log(`  ✅  ${base}.png  —  ${frame.title}  ·  ${kb} KB${guideNote}${videoNote}`);
}

// ── --stitch: transição opcional entre frames + concat em story-NN.mp4 ───────
let transMp4 = null, transDur = 0;
if (STITCH && frameMp4s.length > 1) {
  const transHtml = path.join(htmlDir, 'transition.html');
  if (fs.existsSync(transHtml)) {
    const raw = fs.readFileSync(transHtml, 'utf8');
    const m = raw.match(/data-duration="([^"]+)"/);
    transDur = m ? parseFloat(m[1]) : 1.0;
    transMp4 = path.join(outputDir, '_transition.mp4');
    await captureVideo(transHtml, transDur, transMp4, 'transition.html');
    console.log(`  🎨  transição  (${transDur}s)`);
  }
}

await browser.close();

if (STITCH && frameMp4s.length > 1) {
  // Intercala: frame-01, [transição], frame-02, [transição], ..., frame-N
  const seq = [];
  frameMp4s.forEach((p, i) => {
    seq.push(p);
    if (transMp4 && i < frameMp4s.length - 1) seq.push(transMp4);
  });
  const concatFile = path.join(outputDir, '_concat.txt');
  fs.writeFileSync(concatFile, seq.map(p => `file '${p}'`).join('\n'));
  const stitchedPath = path.join(outputDir, `${storyId}.mp4`);
  const silentPath   = musicPath ? path.join(outputDir, `${storyId}-mudo.mp4`) : stitchedPath;

  const cat = spawnSync('ffmpeg', [
    '-y', '-f', 'concat', '-safe', '0', '-i', concatFile,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-an',
    silentPath,
  ], { stdio: ['ignore', 'pipe', 'pipe'] });
  fs.unlinkSync(concatFile);
  if (transMp4) fs.rmSync(transMp4, { force: true });
  if (cat.status !== 0) { console.error(`ffmpeg concat:\n${cat.stderr.toString()}`); process.exit(1); }

  const total = toExport.reduce((s, f) => s + (f.duration ?? 5), 0)
    + (transMp4 ? transDur * (frameMp4s.length - 1) : 0);

  if (musicPath) {
    let musicStart = 0;
    if (musicStartArg === 'end') {
      const probe = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', musicPath], { stdio: ['ignore', 'pipe', 'pipe'] });
      const trackDur = parseFloat(probe.stdout.toString().trim());
      musicStart = Number.isFinite(trackDur) ? Math.max(0, trackDur - total) : 0;
    } else {
      musicStart = Math.max(0, parseFloat(musicStartArg) || 0);
    }
    const fadeOutStart = Math.max(0, total - 1.2);
    const audioFilter = [
      ...(musicStart > 0 ? [`atrim=start=${musicStart.toFixed(3)}`, 'asetpts=N/SR/TB'] : []),
      'aloop=loop=-1:size=2e+09',
      `atrim=duration=${total}`,
      `volume=${volume}`,
      'afade=t=in:st=0:d=0.6',
      `afade=t=out:st=${fadeOutStart}:d=1.2`,
    ].join(',');
    const mix = spawnSync('ffmpeg', [
      '-y', '-i', silentPath, '-i', musicPath,
      '-filter_complex', `[1:a]${audioFilter}[aout]`,
      '-map', '0:v:0', '-map', '[aout]',
      '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest',
      stitchedPath,
    ], { stdio: ['ignore', 'pipe', 'pipe'] });
    if (mix.status !== 0) { console.error(`música:\n${mix.stderr.toString()}`); process.exit(1); }
    fs.rmSync(silentPath, { force: true });
    console.log(`  🎵  ${path.basename(musicPath)}  (vol ${volume} · trecho a partir de ${musicStart.toFixed(1)}s · fade in/out)`);
  }

  const mb = (fs.statSync(stitchedPath).size / 1048576).toFixed(1);
  console.log(`\n  🎬  ${storyId}.mp4  —  ${total.toFixed(1)}s  ·  ${mb} MB  (upload único; o Instagram divide em segmentos)`);
}

// ── story.md — roteiro para publicar (ordem, stickers, CTA) ──────────────────
const line = (f, i) => {
  const parts = [
    `### Frame ${String(i + 1).padStart(2, '0')} — ${f.title}`,
    f.role ? `- **Papel**: ${f.role}` : null,
    f.duration ? `- **Tempo de tela sugerido**: ~${f.duration}s` : null,
    f.sticker && f.sticker !== 'nenhum' ? `- **Sticker nativo**: ${f.sticker} — ${f.sticker_note || 'posicionar sobre a área reservada inferior'}` : null,
    f.description ? `- ${f.description}` : null,
  ].filter(Boolean);
  return parts.join('\n');
};

const storyMd = `# ${meta.title}

> Story gerado em ${meta.date || new Date().toISOString().slice(0, 10)} · ${toExport.length} frame(s)
> Objetivo: ${meta.objective || '—'}${meta.highlight ? ` · Destaque: ${meta.highlight}` : ''}

Publique cada \`frame-NN.png\` como um card, na ordem. Adicione os stickers nativos
(enquete, quiz, pergunta, controle deslizante, link, contagem regressiva) NO APP —
eles rendem mais alcance que qualquer elemento desenhado.

Safe zones já respeitadas nos HTMLs: topo ${SAFE.top}px, base ${SAFE.bottom}px
(${SAFE.sticker}px se houver sticker/link), laterais ${SAFE.side}px.

---

${toExport.map(line).join('\n\n')}

---

## CTA / link

${meta.cta || '_"Toque aqui" + link sticker no último frame (o "arraste pra cima" não existe mais)._'}

## Convite de resposta no direct

${meta.reply_prompt || '_Feche com uma pergunta que peça resposta — DM é o sinal de engajamento mais forte._'}
`;

fs.writeFileSync(path.join(outputDir, 'story.md'), storyMd, 'utf8');
console.log(`\n  📝  story.md gerado`);
console.log(`\n🎉  Output: output/${storyId}/\n`);
