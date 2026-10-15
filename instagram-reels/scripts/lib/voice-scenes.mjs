// Helpers para reels narrados: leitura do áudio, legenda karaokê e boca sincronizada.
// Tudo vira animação CSS para o scrub do export-reel.mjs funcionar.

import { spawnSync } from 'child_process';

export const FPS = 30;

// ── Áudio: duração, trechos de fala e envelope ───────────────────────────────
export function probeDuration(file) {
  const r = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]);
  return parseFloat(r.stdout.toString());
}

export function speechSegments(file, dur) {
  const r = spawnSync('ffmpeg', ['-i', file, '-af', 'silencedetect=noise=-35dB:d=0.22', '-f', 'null', '-']);
  const log = r.stderr.toString();
  const starts = [...log.matchAll(/silence_start: ([\d.]+)/g)].map(m => +m[1]);
  const ends = [...log.matchAll(/silence_end: ([\d.]+)/g)].map(m => +m[1]);
  const segs = [];
  let cursor = 0;
  starts.forEach((s, i) => {
    if (s > cursor + 0.05) segs.push([cursor, s]);
    cursor = ends[i] ?? dur;
  });
  if (cursor < dur - 0.05) segs.push([cursor, dur]);
  return segs;
}

export function envelope(file) {
  const r = spawnSync('ffmpeg', ['-i', file, '-ac', '1', '-ar', '8000', '-f', 's16le', '-'], { maxBuffer: 64 * 1024 * 1024 });
  const pcm = new Int16Array(r.stdout.buffer, r.stdout.byteOffset, r.stdout.length / 2);
  const per = 8000 / FPS;
  const out = [];
  for (let i = 0; i < pcm.length; i += per) {
    let sum = 0, n = 0;
    for (let j = i; j < Math.min(i + per, pcm.length); j++) { sum += pcm[j] * pcm[j]; n++; }
    out.push(Math.sqrt(sum / Math.max(1, n)) / 32768);
  }
  const peak = Math.max(...out) || 1;
  return out.map(v => v / peak);
}

// ── Helpers de keyframes (tudo como animação CSS para o scrub do export) ─────
export const pct = (t, dur) => `${Math.min(100, Math.max(0, (t / dur) * 100)).toFixed(3)}%`;
export const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

export function captionsFor(scene, segs, dur, { voiceDelay, hi = '#ffe14d', base = '#fff' }) {
  const VOICE_DELAY = voiceDelay;
  let css = '', html = '';
  const spans = scene.phrases.map(p => [segs[p.segs[0]][0], segs[p.segs[p.segs.length - 1]][1]]);
  scene.phrases.forEach((p, pi) => {
    const start = VOICE_DELAY + spans[pi][0] - 0.05;
    const end = pi < scene.phrases.length - 1 ? VOICE_DELAY + spans[pi + 1][0] - 0.05 : dur;
    css += `@keyframes ph${pi} { 0%, ${pct(start - 0.001, dur)} { opacity: 0; visibility: hidden; } ${pct(start, dur)}, ${pct(end - 0.001, dur)} { opacity: 1; visibility: visible; } ${pct(end, dur)}, 100% { opacity: 0; visibility: hidden; } }\n`;
    const words = p.text.split(' ');
    const weights = words.map(w => w.replace(/[^\p{L}\p{N}]/gu, '').length + 1.5);
    const total = weights.reduce((a, b) => a + b, 0);
    const [s0, s1] = spans[pi];
    let t = s0;
    const wordHtml = words.map((w, wi) => {
      const wd = (s1 - s0) * weights[wi] / total;
      const ws = VOICE_DELAY + t, we = VOICE_DELAY + t + wd;
      t += wd;
      const name = `w${pi}_${wi}`;
      css += `@keyframes ${name} { 0%, ${pct(ws - 0.001, dur)} { opacity: 0.0; transform: translateY(14px) scale(0.9); color: ${base}; } ${pct(ws, dur)} { opacity: 1; transform: translateY(0) scale(1.08); color: ${hi}; } ${pct(Math.min(ws + 0.12, we), dur)} { transform: scale(1); } ${pct(we, dur)} { color: ${hi}; } ${pct(we + 0.05, dur)}, 100% { opacity: 1; transform: none; color: ${base}; } }\n`;
      return `<span class="w" style="animation: ${name} ${dur}s linear 0s both">${esc(w)}</span>`;
    }).join(' ');
    html += `    <div class="phrase" style="animation: ph${pi} ${dur}s linear 0s both">${wordHtml}</div>\n`;
  });
  return { css, html };
}

export function mouthKeyframes(env, dur, voiceDelay, name = 'talk') {
  const VOICE_DELAY = voiceDelay;
  const frames = [`0% { transform: scaleY(0.14); }`];
  env.forEach((v, i) => {
    const t = VOICE_DELAY + i / FPS;
    const s = 0.14 + Math.min(1, Math.pow(v, 0.7) * 1.15) * 0.86;
    frames.push(`${pct(t, dur)} { transform: scaleY(${s.toFixed(3)}); }`);
  });
  frames.push(`${pct(VOICE_DELAY + env.length / FPS + 0.05, dur)}, 100% { transform: scaleY(0.14); }`);
  return `@keyframes ${name} {\n  ${frames.join('\n  ')}\n}\n`;
}
