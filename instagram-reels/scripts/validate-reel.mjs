#!/usr/bin/env node
/**
 * Validate scanning time for each scene in a reel.
 *
 * Usage:
 *   node scripts/validate-reel.mjs reel-01
 *
 * Reading model (social media visual scanning, not article reading):
 *   - All prose: 5 WPS (300 WPM) — Reels are scanned, not read word-by-word.
 *     Users rewatch; the first pass is a quick scan for the key idea.
 *   - Code blocks: 0.35s per non-blank line (pattern recognition, not parsing)
 *   - Brand/handle elements: excluded (decorative)
 *   - Settle time: last non-infinite CSS animation to complete
 *   - Absorb buffer: 0.4s — pause to let the key idea land
 *
 * Thresholds:
 *   TIGHT  (⚠️): scene has less than 1.0s of breathing room over the minimum
 *   SHORT  (❌): scene is shorter than the calculated minimum
 */

import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const reelId = process.argv[2];
if (!reelId) {
  console.error('Usage: node scripts/validate-reel.mjs <reel-id>');
  process.exit(1);
}

const htmlDir  = path.join(ROOT, 'html', reelId);
const metaPath = path.join(htmlDir, 'meta.json');
if (!fs.existsSync(metaPath)) { console.error(`meta.json not found in html/${reelId}`); process.exit(1); }

const meta   = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
const scenes = meta.scenes;

const WORDS_PER_SEC      = 5.0;  // 300 WPM — social media scanning
const CODE_SECS_PER_LINE = 0.35;
const ABSORB_BUFFER      = 0.4;
const TIGHT_MARGIN       = 1.0;

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--allow-file-access-from-files'],
});

console.log(`\n📋  Validacao de leitura — ${reelId}  "${meta.title}"\n`);
console.log(`    Prosa: ${WORDS_PER_SEC * 60} WPM (scanning)  |  Codigo: ${CODE_SECS_PER_LINE}s/linha  |  Buffer: ${ABSORB_BUFFER}s\n`);

let hasWarning = false;

for (const scene of scenes) {
  const htmlPath = path.join(htmlDir, scene.file);
  const declared = scene.duration ?? 3;

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.waitForFunction(() => document.fonts.ready);

  const analysis = await page.evaluate((WPS, CODE_SPL) => {
    const EXCLUDE_SELECTORS = [
      '.handle', '.handle-big', '.bg-dots',
      '.blob-1', '.blob-2', '.accent-left', '.accent-top', '.progress',
    ];

    function isExcluded(el) {
      return EXCLUDE_SELECTORS.some(s => el.closest(s));
    }
    function isHidden(el) {
      const cs = window.getComputedStyle(el);
      return cs.display === 'none' || cs.visibility === 'hidden';
    }

    // Code lines (visual scanning)
    const codeEls = new Set();
    let codeLines = 0;
    document.querySelectorAll('pre, code').forEach(el => {
      if (isExcluded(el) || isHidden(el)) return;
      codeEls.add(el);
      codeLines += el.innerText.split('\n').filter(l => l.trim().length > 0).length;
    });

    function inCodeEl(el) {
      let a = el;
      while (a) { if (codeEls.has(a)) return true; a = a.parentElement; }
      return false;
    }

    // Prose words (excluding code and brand elements)
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const el = node.parentElement;
        if (!el) return NodeFilter.FILTER_REJECT;
        if (['script', 'style', 'noscript'].includes(el.tagName.toLowerCase())) return NodeFilter.FILTER_REJECT;
        if (isHidden(el)) return NodeFilter.FILTER_REJECT;
        if (isExcluded(el)) return NodeFilter.FILTER_REJECT;
        if (inCodeEl(el)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    let proseWords = 0;
    const preview = [];
    let node;
    while ((node = walker.nextNode())) {
      const words = node.textContent.trim().split(/\s+/).filter(w => w.length > 1);
      proseWords += words.length;
      if (preview.length < 10) preview.push(...words);
    }

    // Settle time: last non-infinite animation
    let settleTime = 0;
    document.querySelectorAll('*').forEach(el => {
      const cs = window.getComputedStyle(el);
      if (!cs.animationName || cs.animationName === 'none') return;
      const delays    = cs.animationDelay.split(',').map(d => parseFloat(d) || 0);
      const durations = cs.animationDuration.split(',').map(d => parseFloat(d) || 0);
      const iters     = cs.animationIterationCount.split(',').map(v => v.trim());
      delays.forEach((delay, i) => {
        if ((iters[i % iters.length] || '1') === 'infinite') return;
        const end = delay + (durations[i % durations.length] || 0);
        if (end > settleTime) settleTime = end;
      });
    });

    return {
      proseWords,
      proseTime: proseWords / WPS,
      preview: preview.join(' '),
      codeLines,
      codeTime: codeLines * CODE_SPL,
      settleTime,
    };
  }, WORDS_PER_SEC, CODE_SECS_PER_LINE);

  await page.close();

  const { proseWords, proseTime, preview, codeLines, codeTime, settleTime } = analysis;
  const minDuration = settleTime + proseTime + codeTime + ABSORB_BUFFER;
  const slack = declared - minDuration;

  let status, note;
  if (slack >= TIGHT_MARGIN) {
    status = '✅ OK';
    note   = `${slack.toFixed(1)}s de sobra`;
  } else if (slack >= 0) {
    status = '⚠️  APERTADO';
    note   = `${slack.toFixed(1)}s de margem — ok, mas considere +${(TIGHT_MARGIN - slack).toFixed(1)}s`;
    hasWarning = true;
  } else {
    status = '❌ CURTO';
    note   = `falta ${(-slack).toFixed(1)}s — aumente para ${Math.ceil(minDuration + 0.5)}s`;
    hasWarning = true;
  }

  const parts = [
    `settle ${settleTime.toFixed(2)}s`,
    proseWords > 0 ? `${proseWords} palavras=${proseTime.toFixed(1)}s` : null,
    codeLines  > 0 ? `${codeLines}L codigo=${codeTime.toFixed(1)}s`  : null,
    `buffer ${ABSORB_BUFFER}s`,
  ].filter(Boolean).join(' + ');

  console.log(`  ${status}  ${scene.file}  [${declared}s declarado  |  min ${minDuration.toFixed(1)}s]`);
  console.log(`           ${parts}`);
  console.log(`           ${note}`);
  if (preview) console.log(`           "${preview}${proseWords > 10 ? '...' : ''}"`);
  console.log();
}

await browser.close();

if (hasWarning) {
  console.log('  Ajuste as duracoes antes de exportar.\n');
  process.exit(1);
} else {
  console.log('  Todos os tempos sao confortaveis.\n');
}
