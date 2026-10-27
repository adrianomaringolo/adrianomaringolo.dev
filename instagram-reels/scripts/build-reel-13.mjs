#!/usr/bin/env node
// Gera as cenas do reel-13 "Tour pelo imóvel" (narrado: corretor + narrador, ver html/reel-13/roteiro.md).
// Corpo em estética de anúncio de imobiliária (âmbar, terroso); virada, checklist e CTA voltam para a marca.
// A duração de cada cena segue a fala; balão entra com o corretor, carimbo com o narrador.
// Uso: node scripts/build-reel-13.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { probeDuration, speechSegments } from './lib/voice-scenes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'html', 'reel-13');
const VOZ = path.join(OUT, 'voz');

// ---------- narração: corretor (c-NN) + narrador (n-NN) → voz/cena-NN.mp3 ----------
// Pausas internas longas do eleven_v3 viram 0,35s e o ritmo acelera (TEMPO); o narrador entra GAP depois do corretor.
const VOICE_DELAY = 0.15;
const GAP = 0.25;
const TAIL = 0.45;
const TMP = path.join(__dirname, '..', 'output', 'reel-13', 'voz-proc');
fs.mkdirSync(TMP, { recursive: true });

// Corretor 12% mais rápido (vendedor apressado), narrador 5%.
const TEMPO = { c: 1.12, n: 1.05 };

function tighten(name) {
  const src = path.join(VOZ, name);
  if (!fs.existsSync(src)) return null;
  const out = path.join(TMP, name.replace('.mp3', '.wav'));
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', src, '-af',
    `silenceremove=stop_periods=-1:stop_duration=0.4:stop_threshold=-35dB:stop_silence=0.35,atempo=${TEMPO[name[0]]}`, '-ar', '44100', '-ac', '1', out]);
  const dur = probeDuration(out);
  return { file: out, dur, segs: speechSegments(out, dur) };
}

const TIMING = {};
for (let n = 1; n <= 11; n++) {
  const nn = String(n).padStart(2, '0');
  const c = tighten(`c-${nn}.mp3`);
  const v = tighten(`n-${nn}.mp3`);
  const inputs = [], filters = [];
  if (c) { inputs.push('-i', c.file); filters.push(`[${filters.length}:a]apad=pad_dur=${v ? GAP : 0}[p${filters.length}]`); }
  if (v) { inputs.push('-i', v.file); filters.push(`[${filters.length}:a]anull[p${filters.length}]`); }
  const k = filters.length;
  execFileSync('ffmpeg', ['-v', 'error', '-y', ...inputs, '-filter_complex',
    `${filters.join(';')};${Array.from({ length: k }, (_, i) => `[p${i}]`).join('')}concat=n=${k}:v=0:a=1`,
    '-b:a', '128k', path.join(VOZ, `cena-${nn}.mp3`)]);
  const nStart = VOICE_DELAY + (c ? c.dur + (v ? GAP : 0) : 0);
  TIMING[n] = {
    dur: +(nStart + (v ? v.dur : 0) + TAIL).toFixed(2),
    c: c && c.segs.map(([a]) => +(VOICE_DELAY + a).toFixed(2)),   // início de cada frase do corretor
    n: v && v.segs.map(([a]) => +(nStart + a).toFixed(2)),        // início de cada frase do narrador
    nStart: +nStart.toFixed(2),
  };
}
// frase i (ou a última, se o silencedetect juntou trechos)
const at = (arr, i) => arr[Math.min(i, arr.length - 1)];
// Corretor fictício (personagem do reel): terno, gravata vermelha, cabelo engomado, piscadinha.
// view 'bust' = meio corpo com joinha; 'head' = só o rosto (avatar do balão).
function corretor(view = 'bust') {
  const vb = view === 'head' ? '92 78 216 216' : '0 40 400 440';
  return `<svg viewBox="${vb}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
    <path d="M30 480 C30 365 105 318 200 318 C295 318 370 365 370 480 Z" fill="#1e3a5f"/>
    <polygon points="160,320 200,425 240,320" fill="#f8fafc"/>
    <polygon points="188,336 212,336 219,356 208,428 200,438 192,428 181,356" fill="#dc2626"/>
    <rect x="186" y="324" width="28" height="18" rx="5" fill="#b91c1c"/>
    <polygon points="150,322 200,440 168,480 110,345" fill="#172a45"/>
    <polygon points="250,322 200,440 232,480 290,345" fill="#172a45"/>
    <rect x="248" y="392" width="56" height="10" rx="3" fill="#f8fafc"/>
    <rect x="174" y="272" width="52" height="56" fill="#e0a96d"/>
    <circle cx="106" cy="212" r="21" fill="#e9b47c"/><circle cx="294" cy="212" r="21" fill="#e9b47c"/>
    <ellipse cx="200" cy="205" rx="94" ry="104" fill="#f1c27d"/>
    <path d="M104 196 C96 112 150 82 206 84 C268 86 306 120 297 196 C288 150 256 126 202 128 C156 130 126 150 104 196 Z" fill="#1f2937"/>
    <path d="M150 104 C185 92 235 94 262 112" stroke="#6b7280" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M140 172 Q160 156 182 168" stroke="#1f2937" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M218 164 Q242 150 264 166" stroke="#1f2937" stroke-width="9" fill="none" stroke-linecap="round"/>
    <ellipse cx="162" cy="198" rx="17" ry="20" fill="#fff"/><circle cx="166" cy="201" r="10" fill="#1f2937"/><circle cx="170" cy="196" r="3.5" fill="#fff"/>
    <path d="M222 202 Q242 186 262 202" stroke="#1f2937" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M200 205 Q192 228 204 234" stroke="#c98a4b" stroke-width="6" fill="none" stroke-linecap="round"/>
    <circle cx="136" cy="238" r="15" fill="#f87171" opacity="0.35"/><circle cx="266" cy="238" r="15" fill="#f87171" opacity="0.35"/>
    <path d="M168 248 Q184 238 200 246 Q216 238 232 248 Q218 252 200 250 Q182 252 168 248 Z" fill="#1f2937"/>
    <path d="M150 260 Q200 312 252 260 Q200 276 150 260 Z" fill="#fff" stroke="#7c2d12" stroke-width="5" stroke-linejoin="round"/>
    <rect x="212" y="266" width="13" height="14" rx="2" fill="#fbbf24"/>
    <g class="tooth-spark" style="transform-origin:236px 262px"><path d="M236 248 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4z" fill="#fff"/></g>
    ${view === 'bust' ? `<path d="M300 480 L312 380 L350 372 L372 480 Z" fill="#1e3a5f"/>
    <rect x="300" y="352" width="58" height="24" rx="6" fill="#f8fafc"/>
    <rect x="296" y="290" width="70" height="66" rx="22" fill="#f1c27d"/>
    <rect x="304" y="236" width="26" height="70" rx="13" fill="#f1c27d"/>
    <path d="M310 312 h46 M310 330 h46" stroke="#c98a4b" stroke-width="4" stroke-linecap="round"/>` : ''}
  </svg>`;
}

const FONTS = '<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800;900&family=JetBrains+Mono:wght@600;700&display=swap" rel="stylesheet">';

const BASE_CSS = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1080px; height: 1920px; overflow: hidden; font-family: 'Manrope', sans-serif; }
  .scene { width: 1080px; height: 1920px; position: relative; overflow: hidden; }
  .handle { position: absolute; bottom: 64px; right: 64px; font-size: 34px; font-weight: 700; color: #94a3b8; animation: fadeIn 0.4s ease 0.6s both; }
  .handle em { font-style: normal; color: #06b6d4; }
  svg { display: block; overflow: visible; }
  .anim { transform-box: fill-box; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: none; } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes dropIn { from { opacity: 0; transform: translateY(-28px); } to { opacity: 1; transform: none; } }
  @keyframes popIn {
    0%   { opacity: 0; transform: scale(0.4) rotate(-10deg); }
    70%  { opacity: 1; transform: scale(1.08) rotate(0deg); }
    100% { opacity: 1; transform: scale(1) rotate(0deg); }
  }
  @keyframes stampIn {
    0%   { opacity: 0; transform: scale(1.9); }
    60%  { opacity: 1; transform: scale(0.94); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes floatY { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  @keyframes bobX { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(10px); } }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
  @keyframes sway { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
  @keyframes driftA { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-30px, 24px) scale(1.06); } }
  @keyframes driftB { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(28px, -22px) scale(1.05); } }
`;

// ---------- tema "anúncio de imobiliária" (cenas ruins) ----------
const LISTING_CSS = `
  body { background: #1c1512; }
  .scene { background: radial-gradient(ellipse at 50% 30%, #2b1f18 0%, #1c1512 70%); }
  .bg-dots { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(254,243,199,0.05) 1.5px, transparent 1.5px); background-size: 48px 48px; }
  .glow-amber { position: absolute; top: 520px; left: 50%; width: 1000px; height: 900px; margin-left: -500px;
    background: radial-gradient(circle, rgba(245,158,11,0.13) 0%, transparent 62%); animation: driftA 9s ease-in-out 0.9s infinite; }

  .topbar { position: absolute; top: 230px; left: 88px; right: 150px; display: flex; align-items: center; justify-content: space-between; animation: dropIn 0.45s ease 0s both; }
  .eyebrow { display: inline-flex; align-items: center; gap: 14px; background: #f59e0b; color: #1c1512; border-radius: 12px; padding: 12px 26px;
    font-size: 30px; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; }
  .eyebrow svg { width: 34px; height: 34px; }
  .counter { font-size: 32px; font-weight: 800; color: #fcd34d; letter-spacing: 0.06em; }

  .agent { position: absolute; top: 340px; left: 88px; width: 842px; display: flex; align-items: center; gap: 30px; }
  .avatar { flex: 0 0 180px; width: 180px; height: 180px; border-radius: 50%; overflow: hidden; border: 6px solid #f59e0b;
    box-shadow: 0 0 0 8px rgba(245,158,11,0.18); animation: popIn 0.4s cubic-bezier(.2,.8,.3,1) 0.05s both; }
  .avatar { background: #fcd34d; }
  .tooth-spark { animation: toothSpark 1.6s ease-in-out 1s infinite; }
  @keyframes toothSpark { 0%, 100% { opacity: 0; transform: scale(0.2); } 50% { opacity: 1; transform: scale(1.1); } }
  .bubble { position: relative; flex: 1; background: #fef3c7; color: #1c1512; border-radius: 34px; padding: 30px 38px;
    font-size: 50px; font-weight: 800; line-height: 1.18; letter-spacing: -0.02em; animation: popIn 0.4s cubic-bezier(.2,.8,.3,1) 0.2s both; transform-origin: left center; }
  .bubble-tail { position: absolute; left: -18px; top: 50%; width: 40px; height: 40px; margin-top: -20px; background: #fef3c7; transform: rotate(45deg); border-radius: 6px; }
  .bubble span { position: relative; }

  .art { position: absolute; top: 650px; left: 90px; width: 840px; height: 680px; animation: fadeUp 0.5s ease 0.45s both; }
  .panel { position: absolute; inset: 0; border-radius: 36px; overflow: hidden; border: 5px solid rgba(254,243,199,0.18); }

  .stamp-wrap { position: absolute; top: 1380px; left: 88px; width: 842px; display: flex; justify-content: center; transform: rotate(-3deg); }
  .stamp { border: 7px solid #ef4444; border-radius: 22px; padding: 18px 40px 22px; text-align: center; color: #f87171; background: rgba(239,68,68,0.10);
    animation: stampIn 0.38s cubic-bezier(.2,.8,.3,1) 1.4s both; }
  .stamp small { display: block; font-size: 26px; font-weight: 900; letter-spacing: 0.18em; color: #fca5a5; text-transform: uppercase; margin-bottom: 6px; }
  .stamp b { display: block; font-size: 64px; font-weight: 900; letter-spacing: -0.03em; line-height: 1.12; color: #fef2f2; }
`;

// ---------- tema da marca ----------
const BRAND_CSS = `
  body { background: #0f172a; }
  .scene { background: #0f172a; }
  .bg-dots { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(248,250,252,0.05) 1.5px, transparent 1.5px); background-size: 48px 48px; }
  .blob-1 { position: absolute; top: -120px; right: -160px; width: 780px; height: 780px; background: radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 62%); animation: driftA 9s ease-in-out 0.9s infinite; }
  .blob-2 { position: absolute; bottom: -160px; left: -180px; width: 760px; height: 760px; background: radial-gradient(circle, rgba(99,102,241,0.16) 0%, transparent 62%); animation: driftB 11s ease-in-out 0.9s infinite; }
  .accent-left { position: absolute; left: 0; top: 0; width: 8px; height: 100%; background: linear-gradient(180deg, #06b6d4 0%, #6366f1 100%); }
  .grad { background: linear-gradient(90deg, #22d3ee, #818cf8); -webkit-background-clip: text; background-clip: text; color: transparent; padding-bottom: 0.08em; }
`;

const ICON_HOUSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>';

function page({ duration, theme, css = '', body }) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
${FONTS}
<style>${BASE_CSS}${theme === 'brand' ? BRAND_CSS : LISTING_CSS}${css}
</style>
</head>
<body data-duration="${duration}">
<div class="scene">
${body}
  <div class="handle"><em>@</em>adrianomaringolo.dev</div>
</div>
</body>
</html>
`;
}

function listingScene({ duration, n, quote, art, artCss = '', stampSmall = 'Na vida real', stamp }) {
  return page({
    duration, theme: 'listing', css: artCss,
    body: `  <div class="bg-dots"></div>
  <div class="glow-amber"></div>
  <div class="topbar"><div class="eyebrow">${ICON_HOUSE}Tour pelo imóvel</div><div class="counter">${n}/6</div></div>
  <div class="agent">
    <div class="avatar">${corretor('head')}</div>
    <div class="bubble"><div class="bubble-tail"></div><span>${quote}</span></div>
  </div>
  <div class="art"><div class="panel">${art}</div></div>
  <div class="stamp-wrap"><div class="stamp"><small>${stampSmall}</small><b>${stamp}</b></div></div>`,
  });
}

// casa torta reutilizável; door: 'none' | 'front'
function badHouse({ x = 0, y = 0, s = 1, door = 'front', rot = -3, dim = false }) {
  const wall = dim ? '#57534e' : '#a8a29e';
  const roof = dim ? '#44291b' : '#7c2d12';
  return `<g transform="translate(${x},${y}) scale(${s}) rotate(${rot} 210 300)">
    <polygon points="-30,175 210,20 450,175" fill="${roof}"/>
    <path d="M60 120 L60 60 L100 60 L100 95" fill="${roof}" stroke="#2b1f18" stroke-width="4"/>
    <rect x="0" y="165" width="420" height="300" fill="${wall}"/>
    <path d="M40 200 L70 250 L55 300 M330 380 L360 420 L350 465" stroke="#57534e" stroke-width="5" fill="none"/>
    <rect x="40" y="225" width="110" height="100" fill="#292524" stroke="#78716c" stroke-width="8"/>
    <path d="M30 245 L160 300 M30 300 L160 255" stroke="#a16207" stroke-width="14"/>
    <rect x="280" y="225" width="110" height="100" fill="#292524" stroke="#78716c" stroke-width="8"/>
    <path d="M280 228 L390 322" stroke="#78716c" stroke-width="6"/>
    ${door === 'front' ? '<rect x="170" y="320" width="90" height="145" fill="#57341f" stroke="#2b1f18" stroke-width="6"/><circle cx="244" cy="395" r="7" fill="#d6d3d1"/>' : ''}
  </g>`;
}

const sky = (id, a = '#3b2a4a', b = '#5b3a2e') => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
<rect width="840" height="680" fill="url(#${id})"/>`;
const ground = (y = 560) => `<rect x="0" y="${y}" width="840" height="${680 - y}" fill="#3f2d1d"/><rect x="0" y="${y}" width="840" height="10" fill="#57412b"/>`;

const scenes = [];

// ---------- 01 · gancho ----------
scenes.push({
  file: 'scene-01.html', title: 'Gancho — Oportunidade única', duration: 5,
  description: 'Corretor fictício em SVG (terno, gravata vermelha, piscadinha, dente de ouro, joinha) em moldura âmbar, balão "Oportunidade única!", placa VENDE-SE onde CASA é riscado e SITE entra carimbado.',
  html: page({
    duration: 5, theme: 'listing',
    css: `
  .eyebrow-top { position: absolute; top: 230px; left: 88px; animation: dropIn 0.4s ease 0s both; }
  .photo { position: absolute; top: 330px; left: 100px; width: 540px; height: 620px; border-radius: 36px; overflow: hidden; border: 8px solid #f59e0b;
    transform: rotate(-3deg); animation: popIn 0.4s cubic-bezier(.2,.8,.3,1) 0.05s both; box-shadow: 0 30px 80px rgba(0,0,0,0.5); }
  .photo { background: radial-gradient(circle at 50% 35%, #fde68a 0%, #f59e0b 75%); }
  .photo-float { position: absolute; inset: 0; animation: floatY 3s ease-in-out 1s infinite; }
  .badge { position: absolute; top: 870px; left: 110px; background: #1c1512; color: #fcd34d; border: 4px solid #f59e0b; border-radius: 100px; padding: 10px 28px;
    font-size: 28px; font-weight: 900; letter-spacing: 0.14em; text-transform: uppercase; animation: fadeUp 0.4s ease 0.3s both; }
  .hook-bubble { position: absolute; top: 420px; left: 480px; width: 450px; background: #fef3c7; color: #1c1512; border-radius: 34px; padding: 30px 32px;
    font-size: 50px; font-weight: 900; line-height: 1.08; letter-spacing: -0.03em; animation: popIn 0.4s cubic-bezier(.2,.8,.3,1) 0.25s both; transform-origin: left bottom; }
  .hook-bubble .tail { position: absolute; left: -16px; bottom: 50px; width: 40px; height: 40px; background: #fef3c7; transform: rotate(45deg); border-radius: 6px; }
  .hook-bubble span { position: relative; }
  .sign-wrap { position: absolute; top: 1030px; left: 110px; width: 820px; transform-origin: 50% 0; animation: sway 3.2s ease-in-out 1.2s infinite; }
  .strings { display: flex; justify-content: space-between; padding: 0 120px; height: 60px; }
  .strings div { width: 6px; background: #78716c; }
  .sign { background: #f59e0b; border-radius: 28px; padding: 34px 40px 40px; text-align: center; color: #1c1512; box-shadow: 0 24px 60px rgba(0,0,0,0.45);
    animation: dropIn 0.45s ease 0.5s both; }
  .sign h1 { font-size: 150px; font-weight: 900; letter-spacing: -0.04em; line-height: 1; }
  .row { display: flex; justify-content: center; align-items: center; gap: 44px; margin-top: 26px; }
  .old { position: relative; font-size: 96px; font-weight: 900; color: rgba(28,21,18,0.55); letter-spacing: -0.03em; }
  .strike { position: absolute; left: -10px; right: -10px; top: 50%; height: 14px; margin-top: -7px; background: #dc2626; border-radius: 7px;
    transform-origin: left center; animation: wipe 0.3s ease-out 1.5s both; }
  @keyframes wipe { from { transform: scaleX(0) rotate(-6deg); } to { transform: scaleX(1) rotate(-6deg); } }
  .new { font-size: 104px; font-weight: 900; color: #fef2f2; background: #dc2626; border-radius: 18px; padding: 0 30px 6px; letter-spacing: -0.03em;
    transform: rotate(-4deg); animation: stampIn 0.35s cubic-bezier(.2,.8,.3,1) 1.85s both; }
`,
    body: `  <div class="bg-dots"></div>
  <div class="glow-amber"></div>
  <div class="eyebrow eyebrow-top">${ICON_HOUSE}Tour pelo imóvel</div>
  <div class="photo"><div class="photo-float">${corretor('bust')}</div></div>
  <div class="badge">Corretor</div>
  <div class="hook-bubble"><div class="tail"></div><span>Oportunidade única!</span></div>
  <div class="sign-wrap">
    <div class="strings"><div></div><div></div></div>
    <div class="sign">
      <h1>VENDE-SE</h1>
      <div class="row"><span class="old">CASA<span class="strike"></span></span><span class="new">SITE</span></div>
    </div>
  </div>`,
  }),
});

// ---------- 02 · endereço ----------
scenes.push({
  file: 'scene-02.html', title: 'Endereço confuso → domínio', duration: 5.4,
  description: 'Placa com endereço comprido de site grátis (fictício) solta um prego e fica pendurada balançando. Carimbo: domínio confuso.',
  html: listingScene({
    duration: 5.4, n: 1, quote: 'Endereço fácil de lembrar!',
    stamp: 'Domínio confuso',
    artCss: `
  .sign-g { transform-origin: 92% 6%; animation: nail 0.5s cubic-bezier(.3,1.6,.5,1) 1.0s both, swing 2.4s ease-in-out 1.6s infinite; }
  @keyframes nail { from { transform: rotate(0deg); } to { transform: rotate(16deg); } }
  @keyframes swing { 0%, 100% { transform: rotate(16deg); } 50% { transform: rotate(12deg); } }
  .nail { animation: nailPop 0.4s ease-out 1.0s both; }
  @keyframes nailPop { from { transform: translate(0,0); opacity: 1; } to { transform: translate(-30px, 160px); opacity: 0; } }
`,
    art: `<svg width="840" height="680" viewBox="0 0 840 680">${sky('sk2')}${ground()}
      ${badHouse({ x: 470, y: 150, s: 0.78 })}
      <rect x="415" y="250" width="18" height="320" fill="#57341f"/>
      <g class="sign-g anim">
        <rect x="20" y="250" width="420" height="190" rx="14" fill="#fef3c7" stroke="#a16207" stroke-width="6"/>
        <text x="40" y="318" font-family="JetBrains Mono" font-weight="700" font-size="31" fill="#1c1512">casa-do-joao.</text>
        <text x="40" y="364" font-family="JetBrains Mono" font-weight="700" font-size="31" fill="#1c1512">sitegratis.net/</text>
        <text x="40" y="410" font-family="JetBrains Mono" font-weight="700" font-size="31" fill="#1c1512">pagina-1/home-2</text>
        <circle cx="420" cy="268" r="8" fill="#78716c"/>
      </g>
      <circle class="nail anim" cx="40" cy="268" r="8" fill="#78716c"/>
    </svg>`,
  }),
});

// ---------- 03 · porta escondida ----------
scenes.push({
  file: 'scene-03.html', title: 'Porta escondida → WhatsApp', duration: 5.4,
  description: 'Fachada sem porta; a porta fica na lateral, atrás do mato, com seta balançando. Carimbo: WhatsApp escondido.',
  html: listingScene({
    duration: 5.4, n: 2, quote: 'A porta? Fica ali atrás, é só procurar.',
    stamp: 'WhatsApp escondido',
    artCss: `
  .arrow { animation: fadeIn 0.3s ease 0.9s both, bobArrow 1.2s ease-in-out 1.2s infinite; }
  @keyframes bobArrow { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(12px, 10px); } }
`,
    art: `<svg width="840" height="680" viewBox="0 0 840 680">${sky('sk3')}${ground()}
      ${badHouse({ x: 120, y: 110, s: 1, door: 'none', rot: -2 })}
      <rect x="560" y="420" width="60" height="140" fill="#57341f" stroke="#2b1f18" stroke-width="5"/>
      <circle cx="600" cy="540" r="70" fill="#365314"/><circle cx="660" cy="520" r="80" fill="#3f6212"/><circle cx="560" cy="545" r="55" fill="#4d7c0f"/>
      <circle cx="720" cy="548" r="50" fill="#365314"/>
      <g class="arrow anim">
        <path d="M640 180 C 760 200, 790 300, 700 400" stroke="#f59e0b" stroke-width="16" fill="none" stroke-linecap="round"/>
        <path d="M670 370 L700 410 L735 375" stroke="#f59e0b" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <text x="520" y="160" font-family="Manrope" font-weight="900" font-size="38" fill="#fcd34d">entrada</text>
    </svg>`,
  }),
});

// ---------- 04 · fechadura ----------
scenes.push({
  file: 'scene-04.html', title: 'Fechadura quebrada → sem HTTPS', duration: 5.4,
  description: 'Porta de perto com cadeado aberto pendurado; sirene e aviso "Não seguro" piscando em vermelho. Carimbo: sem cadeado (HTTPS).',
  html: listingScene({
    duration: 5.4, n: 3, quote: 'Fechadura? Quem precisa?',
    stamp: 'Site sem cadeado',
    
    artCss: `
  .siren { animation: blink 0.7s steps(1) 0.9s infinite; }
  .warn { animation: fadeUp 0.35s ease 0.8s both; }
  .lock { transform-origin: 50% 0; animation: lockSwing 1.6s ease-in-out 1s infinite; }
  @keyframes lockSwing { 0%, 100% { transform: rotate(14deg); } 50% { transform: rotate(4deg); } }
`,
    art: `<svg width="840" height="680" viewBox="0 0 840 680"><rect width="840" height="680" fill="#78716c"/>
      <rect x="0" y="0" width="840" height="680" fill="url(#bricks)"/>
      <defs><pattern id="bricks" width="120" height="60" patternUnits="userSpaceOnUse"><rect width="120" height="60" fill="#8a5a44"/><path d="M0 0H120M0 30H120M60 0V30M0 30V60M120 30V60" stroke="#5b3a2e" stroke-width="4"/></pattern></defs>
      <rect x="250" y="120" width="340" height="560" fill="#57341f" stroke="#2b1f18" stroke-width="10"/>
      <rect x="290" y="170" width="260" height="190" fill="none" stroke="#3f2414" stroke-width="8"/>
      <rect x="290" y="400" width="260" height="230" fill="none" stroke="#3f2414" stroke-width="8"/>
      <rect x="520" y="380" width="60" height="26" rx="4" fill="#a8a29e"/>
      <g class="lock anim">
        <path d="M535 395 v-40 a30 30 0 0 1 60 0 v12" stroke="#d6d3d1" stroke-width="12" fill="none"/>
        <rect x="515" y="420" width="90" height="80" rx="12" fill="#a16207"/>
        <path d="M540 445 l40 30 M580 445 l-40 30" stroke="#451a03" stroke-width="7"/>
      </g>
      <g class="siren"><circle cx="150" cy="130" r="56" fill="#ef4444"/><circle cx="150" cy="130" r="100" fill="#ef4444" opacity="0.25"/></g>
      <rect x="120" y="180" width="60" height="30" rx="6" fill="#44403c"/>
      <g class="warn">
        <rect x="200" y="40" width="440" height="80" rx="40" fill="#dc2626"/>
        <path d="M248 98 L268 62 L288 98 Z" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round"/>
        <text x="300" y="94" font-family="Manrope" font-weight="900" font-size="40" fill="#fff">Não seguro</text>
      </g>
    </svg>`,
  }),
});

// ---------- 05 · porta lenta ----------
scenes.push({
  file: 'scene-05.html', title: 'Porta que demora → site lento', duration: 5.4,
  description: 'Porta abrindo devagar, barra "Carregando" empacada e teia de aranha crescendo no canto. Carimbo: site lento.',
  html: listingScene({
    duration: 5.4, n: 4, quote: 'Ela abre. Uma hora, abre.',
    stamp: 'Site lento',
    artCss: `
  .door { transform-origin: 0 50%; animation: creak 9s ease-out 0.8s infinite; }
  @keyframes creak { 0% { transform: scaleX(1); } 100% { transform: scaleX(0.62); } }
  .bar-fill { transform-origin: 0 50%; animation: load 10s cubic-bezier(.1,.9,.2,1) 0.8s infinite; }
  @keyframes load { 0% { transform: scaleX(0.02); } 30% { transform: scaleX(0.09); } 100% { transform: scaleX(0.13); } }
  .web { transform-origin: 100% 0; animation: grow 8s ease-out 0.8s infinite; }
  @keyframes grow { 0% { transform: scale(0.15); opacity: 0.3; } 60%, 100% { transform: scale(1); opacity: 1; } }
  .dots { animation: blink 1s steps(1) 1s infinite; }
`,
    art: `<svg width="840" height="680" viewBox="0 0 840 680"><rect width="840" height="680" fill="#44403c"/>
      <rect x="260" y="70" width="320" height="470" fill="#0c0a09" stroke="#2b1f18" stroke-width="12"/>
      <rect class="door anim" x="266" y="76" width="308" height="458" fill="#57341f"/>
      <g class="web anim" stroke="#e7e5e4" stroke-width="3" fill="none" opacity="0.8">
        <path d="M840 0 L640 0 M840 0 L840 200 M840 0 L680 160 M840 0 L760 190 M840 0 L660 70"/>
        <path d="M700 0 Q 760 40 840 60 M740 0 Q 780 70 840 120 M780 0 Q 800 30 840 30"/>
      </g>
      <rect x="140" y="585" width="560" height="44" rx="22" fill="#1c1917" stroke="#78716c" stroke-width="4"/>
      <rect class="bar-fill anim" x="146" y="591" width="548" height="32" rx="16" fill="#f59e0b"/>
      <text x="140" y="568" font-family="JetBrains Mono" font-weight="700" font-size="32" fill="#fcd34d">Carregando<tspan class="dots">...</tspan></text>
    </svg>`,
  }),
});

// ---------- 06 · desatualizado ----------
scenes.push({
  file: 'scene-06.html', title: 'Decoração de 2019 → desatualizado', duration: 5.4,
  description: 'Sala com calendário "Promoção de Natal 2019" balançando, TV de tubo com chiado. Carimbo: site desatualizado.',
  html: listingScene({
    duration: 5.4, n: 5, quote: 'Decoração clássica!',
    stamp: 'Site desatualizado',
    artCss: `
  .cal { transform-origin: 50% 0; animation: sway 2.6s ease-in-out 0.9s infinite; }
  .static { animation: blink 0.25s steps(1) 0.9s infinite; }
`,
    art: `<svg width="840" height="680" viewBox="0 0 840 680"><rect width="840" height="680" fill="#57534e"/>
      <defs><pattern id="wp" width="60" height="680" patternUnits="userSpaceOnUse"><rect width="60" height="680" fill="#6b5d4f"/><rect width="18" height="680" fill="#5e5245"/></pattern></defs>
      <rect width="840" height="520" fill="url(#wp)"/><rect y="520" width="840" height="160" fill="#3f2d1d"/>
      <g class="cal anim">
        <circle cx="250" cy="70" r="9" fill="#292524"/>
        <rect x="90" y="80" width="320" height="380" rx="12" fill="#fef3c7" stroke="#a8a29e" stroke-width="5"/>
        <rect x="90" y="80" width="320" height="90" rx="12" fill="#b91c1c"/>
        <text x="250" y="140" text-anchor="middle" font-family="Manrope" font-weight="900" font-size="40" fill="#fff">DEZ · 2019</text>
        <text x="250" y="222" text-anchor="middle" font-family="Manrope" font-weight="900" font-size="34" fill="#b91c1c">PROMOÇÃO</text>
        <text x="250" y="262" text-anchor="middle" font-family="Manrope" font-weight="900" font-size="34" fill="#b91c1c">DE NATAL!</text>
        <g fill="#d6d3d1">${Array.from({ length: 12 }, (_, i) => `<rect x="${118 + (i % 4) * 68}" y="${300 + Math.floor(i / 4) * 50}" width="50" height="34" rx="5"/>`).join('')}</g>
      </g>
      <rect x="500" y="390" width="280" height="130" fill="#57341f"/>
      <rect x="520" y="200" width="240" height="190" rx="26" fill="#292524"/>
      <rect x="542" y="222" width="170" height="146" rx="18" fill="#a8a29e"/>
      <g class="static" stroke="#e7e5e4" stroke-width="4"><path d="M552 250h150M552 280h120M552 310h150M552 340h90"/></g>
      <circle cx="736" cy="250" r="9" fill="#78716c"/><circle cx="736" cy="285" r="9" fill="#78716c"/>
      <path d="M600 200 L570 140 M680 200 L720 140" stroke="#292524" stroke-width="6"/>
    </svg>`,
  }),
});

// ---------- 07 · GPS ----------
scenes.push({
  file: 'scene-07.html', title: 'Ninguém acha → sem SEO', duration: 6.6,
  description: 'Celular com mapa, pino com interrogação pulando e aviso "Destino não encontrado". Carimbo: o Google não encontra.',
  html: listingScene({
    duration: 6.6, n: 6, quote: 'Bem discreta. Nem o Google acha.',
    stamp: 'Ninguém te encontra',
    
    artCss: `
  .pin { animation: floatY 1.2s ease-in-out 0.9s infinite; }
  .ring { transform-origin: 50% 50%; animation: ring 1.8s ease-out 0.9s infinite; }
  @keyframes ring { 0% { transform: scale(0.4); opacity: 0.9; } 100% { transform: scale(1.6); opacity: 0; } }
  .nf { animation: fadeUp 0.35s ease 0.85s both; }
`,
    art: `<svg width="840" height="680" viewBox="0 0 840 680">${sky('sk7', '#2b1f18', '#3b2a2a')}
      <rect x="230" y="30" width="380" height="640" rx="54" fill="#1c1917" stroke="#57534e" stroke-width="8"/>
      <rect x="252" y="80" width="336" height="560" rx="24" fill="#e7e5e4"/>
      <g stroke="#fff" stroke-width="22" fill="none"><path d="M252 260 H588 M252 460 H588 M340 80 V640 M500 80 V640"/></g>
      <g stroke="#d6d3d1" stroke-width="10" fill="none"><path d="M252 360 H588 M420 80 V640"/></g>
      <rect x="270" y="100" width="300" height="64" rx="32" fill="#fff" stroke="#a8a29e" stroke-width="3"/>
      <circle cx="306" cy="130" r="13" fill="none" stroke="#57534e" stroke-width="5"/><path d="M316 140 l12 12" stroke="#57534e" stroke-width="5" stroke-linecap="round"/>
      <text x="340" y="143" font-family="Manrope" font-weight="800" font-size="30" fill="#57534e">casa do joão</text>
      <circle class="ring anim" cx="420" cy="410" r="60" fill="none" stroke="#ef4444" stroke-width="6"/>
      <g class="pin">
        <path d="M420 420 C 380 370, 370 340, 370 320 a50 50 0 0 1 100 0 c0 20 -10 50 -50 100z" fill="#ef4444"/>
        <text x="420" y="342" text-anchor="middle" font-family="Manrope" font-weight="900" font-size="54" fill="#fff">?</text>
      </g>
      <g class="nf"><rect x="262" y="540" width="316" height="84" rx="20" fill="#dc2626"/>
        <text x="420" y="576" text-anchor="middle" font-family="Manrope" font-weight="900" font-size="28" fill="#fff">Destino</text>
        <text x="420" y="608" text-anchor="middle" font-family="Manrope" font-weight="900" font-size="28" fill="#fff">não encontrado</text></g>
    </svg>`,
  }),
});

// ---------- 08 · vizinho ----------
scenes.push({
  file: 'scene-08.html', title: 'O cliente foi pro vizinho', duration: 5.6,
  description: 'Rua com a casa torta apagada e a do vizinho iluminada; o cliente atravessa e entra no vizinho. "Seu cliente foi pro vizinho."',
  html: page({
    duration: 5.6, theme: 'listing',
    css: `
  .agent { top: 330px; }
  .art { top: 620px; height: 640px; }
  .walker { animation: walk 2.2s cubic-bezier(.4,0,.4,1) 0.7s both; }
  @keyframes walk { from { transform: translateX(0); } to { transform: translateX(420px); } }
  .step { transform-origin: 50% 0; animation: step 0.35s ease-in-out 0.7s infinite alternate; }
  @keyframes step { from { transform: rotate(-14deg); } to { transform: rotate(14deg); } }
  .lit { animation: litPulse 2s ease-in-out 1s infinite; }
  @keyframes litPulse { 0%, 100% { opacity: 0.35; } 50% { opacity: 0.7; } }
  .big { position: absolute; top: 1320px; left: 88px; width: 842px; font-size: 96px; font-weight: 900; line-height: 1.05; letter-spacing: -0.04em; color: #fef3c7;
    animation: fadeUp 0.5s ease 2.2s both; }
  .big em { font-style: normal; color: #f59e0b; }
`,
    body: `  <div class="bg-dots"></div>
  <div class="glow-amber"></div>
  <div class="agent">
    <div class="avatar">${corretor('head')}</div>
    <div class="bubble"><div class="bubble-tail"></div><span>Ué… cadê o cliente?</span></div>
  </div>
  <div class="art"><div class="panel">
    <svg width="840" height="640" viewBox="0 0 840 640">${sky('sk8', '#1e1b2e', '#3b2a2a')}
      <rect x="0" y="520" width="840" height="120" fill="#3f2d1d"/><rect x="0" y="520" width="840" height="10" fill="#57412b"/>
      ${badHouse({ x: 10, y: 200, s: 0.62, dim: true })}
      <circle class="lit" cx="640" cy="380" r="260" fill="#fbbf24" opacity="0.4"/>
      <g transform="translate(520,250)">
        <polygon points="-20,110 130,10 280,110" fill="#0e7490"/>
        <rect x="0" y="105" width="260" height="170" fill="#f8fafc"/>
        <rect x="24" y="135" width="64" height="60" fill="#fde68a"/><rect x="172" y="135" width="64" height="60" fill="#fde68a"/>
        <rect x="104" y="170" width="54" height="105" fill="#06b6d4"/>
      </g>
      <g class="walker">
        <circle cx="200" cy="450" r="20" fill="#fef3c7"/>
        <rect x="186" y="472" width="28" height="44" rx="12" fill="#f59e0b"/>
        <rect class="step anim" x="190" y="510" width="9" height="28" rx="4" fill="#fef3c7"/>
        <rect x="202" y="510" width="9" height="28" rx="4" fill="#fef3c7"/>
      </g>
    </svg>
  </div></div>
  <div class="big">Seu cliente foi<br>pro <em>vizinho.</em></div>`,
  }),
});

// ---------- 09 · virada ----------
scenes.push({
  file: 'scene-09.html', title: 'Virada — a casa que eu construo', duration: 3.2,
  description: 'Corte para a identidade da marca: "Agora, a casa que eu construo:" com ícone de casa gigante ao fundo.',
  html: page({
    duration: 3.2, theme: 'brand',
    css: `
  .bg-icon { position: absolute; right: -170px; top: 520px; width: 820px; height: 820px; color: #06b6d4; opacity: 0.09;
    animation: fadeInLow 0.6s ease both, tilt 10s ease-in-out 1s infinite; }
  @keyframes fadeInLow { from { opacity: 0; } to { opacity: 0.09; } }
  @keyframes tilt { 0%, 100% { transform: rotate(-3deg) scale(1); } 50% { transform: rotate(3deg) scale(1.04); } }
  .content { position: absolute; top: 0; bottom: 0; left: 88px; width: 842px; display: flex; flex-direction: column; justify-content: center; }
  .pre { font-size: 64px; font-weight: 700; color: #94a3b8; animation: fadeUp 0.45s ease 0.1s both; }
  h1 { margin-top: 18px; font-size: 128px; font-weight: 900; line-height: 1.04; letter-spacing: -0.045em; color: #f8fafc; animation: fadeUp 0.5s ease 0.35s both; }
`,
    body: `  <div class="blob-1"></div><div class="blob-2"></div><div class="bg-dots"></div><div class="accent-left"></div>
  <div class="bg-icon">${ICON_HOUSE.replace('stroke-width="2.4"', 'stroke-width="1.2"')}</div>
  <div class="content"><div class="pre">Agora,</div><h1>a casa que<br><span class="grad">eu construo:</span></h1></div>`,
  }),
});

// ---------- 10 · checklist ----------
const checks = [
  ['Endereço claro', 'seunegocio.com.br'],
  ['Porta na frente', 'WhatsApp à vista'],
  ['Cadeado na porta', 'site seguro (HTTPS)'],
  ['Abre na hora', 'carrega rápido'],
  ['Aparece no mapa', 'o Google encontra'],
  ['Cabe em qualquer terreno', 'funciona no celular'],
];
scenes.push({
  file: 'scene-10.html', title: 'Tour certo — 6 checks', duration: 10,
  description: 'Seis itens entram em sequência com check cyan: a parte da casa em branco e a tradução para o site em cyan.',
  html: page({
    duration: 10, theme: 'brand',
    css: `
  .content { position: absolute; top: 290px; left: 88px; width: 842px; }
  .eyebrow { display: inline-flex; align-items: center; gap: 14px; background: rgba(6,182,212,0.14); border: 2px solid rgba(6,182,212,0.38); border-radius: 100px;
    padding: 14px 32px; font-size: 30px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #06b6d4; animation: dropIn 0.45s ease 0s both; }
  .eyebrow svg { width: 34px; height: 34px; }
  .list { margin-top: 56px; display: flex; flex-direction: column; gap: 30px; }
  .item { display: flex; align-items: center; gap: 32px; background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.10); border-radius: 28px; padding: 26px 32px; }
  .check { flex: 0 0 84px; width: 84px; height: 84px; border-radius: 50%; background: linear-gradient(135deg, #06b6d4, #6366f1); display: flex; align-items: center; justify-content: center; }
  .check svg { width: 48px; height: 48px; }
  .label { font-size: 46px; font-weight: 900; color: #f8fafc; letter-spacing: -0.02em; line-height: 1.15; }
  .sub { font-size: 38px; font-weight: 700; color: #22d3ee; margin-top: 4px; }
  .shine { animation: shine 2.4s ease-in-out infinite; }
  @keyframes shine { 0%, 100% { box-shadow: 0 0 0 0 rgba(6,182,212,0); } 50% { box-shadow: 0 0 0 10px rgba(6,182,212,0.18); } }
${checks.map((_, i) => `  .item:nth-child(${i + 1}) { animation: fadeUp 0.4s ease ${(0.3 + i * 0.3).toFixed(1)}s both; }
  .item:nth-child(${i + 1}) .check { animation: popIn 0.35s cubic-bezier(.2,.8,.3,1) ${(0.45 + i * 0.3).toFixed(2)}s both, shine 2.4s ease-in-out ${(2.6 + i * 0.4).toFixed(1)}s infinite; }`).join('\n')}
`,
    body: `  <div class="blob-1"></div><div class="blob-2"></div><div class="bg-dots"></div><div class="accent-left"></div>
  <div class="content">
    <div class="eyebrow">${ICON_HOUSE}Versão certa</div>
    <div class="list">
${checks.map(([a, b]) => `      <div class="item"><div class="check"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div><div><div class="label">${a}</div><div class="sub">${b}</div></div></div>`).join('\n')}
    </div>
  </div>`,
  }),
});

// ---------- 11 · CTA ----------
scenes.push({
  file: 'scene-11.html', title: 'CTA — a chave fica no seu nome', duration: 6.8,
  description: 'Casa bem construída (cadeado, porta em destaque, seunegocio.com.br) com a chave "SEU NOME" balançando. "E a chave fica no seu nome." + "Seu site, sua casa. Bora construir?" e handle.',
  html: page({
    duration: 6.8, theme: 'brand',
    css: `
  .photo { position: absolute; top: 250px; left: 88px; width: 520px; height: 600px; border-radius: 40px; overflow: hidden; border: 6px solid rgba(6,182,212,0.5);
    animation: popIn 0.45s cubic-bezier(.2,.8,.3,1) 0.05s both; }
  .photo { background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); }
  .lit { animation: litPulse 2.4s ease-in-out 1s infinite; }
  @keyframes litPulse { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.55; } }
  .key { position: absolute; top: 440px; left: 540px; width: 360px; transform-origin: 30px 30px; animation: popIn 0.45s cubic-bezier(.2,.8,.3,1) 0.5s both; }
  .key-swing { transform-origin: 30px 30px; animation: keySwing 2.2s ease-in-out 1.1s infinite; }
  @keyframes keySwing { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(5deg); } }
  .sparkle { position: absolute; color: #22d3ee; opacity: 0; animation: sparkle 2.4s ease-in-out infinite; }
  @keyframes sparkle { 0% { opacity: 0; transform: scale(0) rotate(0deg); } 30%, 70% { opacity: 1; transform: scale(1) rotate(180deg); } 100% { opacity: 0; transform: scale(0) rotate(360deg); } }
  .text { position: absolute; top: 930px; left: 88px; width: 842px; }
  h1 { font-size: 98px; font-weight: 900; line-height: 1.06; letter-spacing: -0.045em; color: #f8fafc; animation: fadeUp 0.5s ease 0.8s both; }
  .line { margin-top: 44px; font-size: 60px; font-weight: 800; color: #94a3b8; letter-spacing: -0.02em; animation: fadeUp 0.5s ease 1.3s both; }
  .line b { color: #f8fafc; }
  .cta { margin-top: 48px; display: inline-flex; align-items: center; gap: 18px; background: linear-gradient(90deg, #06b6d4, #6366f1); color: #fff; border-radius: 100px;
    padding: 26px 46px; font-size: 48px; font-weight: 900; animation: popIn 0.4s cubic-bezier(.2,.8,.3,1) 1.7s both; }
  .cta svg { width: 46px; height: 46px; animation: bobX 1.2s ease-in-out 2.2s infinite; }
`,
    body: `  <div class="blob-1"></div><div class="blob-2"></div><div class="bg-dots"></div><div class="accent-left"></div>
  <div class="photo"><svg width="100%" height="100%" viewBox="0 0 520 600">
    <circle class="lit" cx="260" cy="330" r="230" fill="#22d3ee" opacity="0.3"/>
    <rect x="0" y="470" width="520" height="130" fill="#1e293b"/><rect x="0" y="470" width="520" height="8" fill="#334155"/>
    <polygon points="70,250 260,110 450,250" fill="#6366f1"/>
    <rect x="100" y="240" width="320" height="232" fill="#f8fafc"/>
    <rect x="130" y="280" width="80" height="74" rx="6" fill="#fde68a"/><rect x="310" y="280" width="80" height="74" rx="6" fill="#fde68a"/>
    <rect x="222" y="340" width="76" height="132" rx="6" fill="#06b6d4"/><circle cx="284" cy="410" r="6" fill="#f8fafc"/>
    <rect x="236" y="300" width="48" height="22" rx="6" fill="#0f172a"/><path d="M247 300 v-8 a13 13 0 0 1 26 0 v8" stroke="#0f172a" stroke-width="5" fill="none"/>
    <rect x="140" y="190" width="240" height="40" rx="10" fill="#0f172a" stroke="#22d3ee" stroke-width="3"/>
    <text x="260" y="218" text-anchor="middle" font-family="JetBrains Mono" font-weight="700" font-size="22" fill="#22d3ee">seunegocio.com.br</text>
  </svg></div>
  <div class="key"><div class="key-swing">
    <svg width="360" height="360" viewBox="0 0 360 360">
      <circle cx="30" cy="30" r="14" fill="none" stroke="#94a3b8" stroke-width="6"/>
      <path d="M30 44 L70 110" stroke="#94a3b8" stroke-width="5"/>
      <circle cx="95" cy="150" r="52" fill="none" stroke="#fbbf24" stroke-width="22"/>
      <path d="M128 190 L250 330 M205 278 l30 -26 M228 304 l22 -20" stroke="#fbbf24" stroke-width="22" stroke-linecap="round"/>
      <g transform="translate(150,40) rotate(12)"><rect width="250" height="84" rx="16" fill="#f8fafc"/><circle cx="24" cy="42" r="9" fill="#0f172a"/>
        <text x="140" y="55" text-anchor="middle" font-family="Manrope" font-weight="900" font-size="32" fill="#0f172a">SEU NOME</text></g>
    </svg>
  </div></div>
  <div class="sparkle" style="top:410px;left:860px;width:48px;height:48px;animation-delay:1.2s"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
  <div class="sparkle" style="top:780px;left:640px;width:36px;height:36px;animation-delay:1.9s"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg></div>
  <div class="text">
    <h1>E a chave fica<br>no <span class="grad">seu nome.</span></h1>
    <div class="line"><b>Seu site, sua casa.</b><br>Bora construir?</div>
    <div class="cta">Me chama no direct<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>
  </div>`,
  }),
});

// ---------- capa ----------
const cover = page({
  duration: 0, theme: 'listing',
  css: `
  .eyebrow-top { position: absolute; top: 300px; left: 88px; }
  h1 { position: absolute; top: 390px; left: 88px; width: 860px; font-size: 124px; font-weight: 900; line-height: 1.02; letter-spacing: -0.045em; color: #fef3c7; }
  h1 em { font-style: normal; color: #f59e0b; }
  .art { top: 860px; height: 520px; animation: none; }
  .tag { position: absolute; top: 1420px; left: 88px; right: 150px; text-align: center; transform: rotate(-3deg); }
  .tag span { display: inline-block; border: 7px solid #ef4444; border-radius: 22px; padding: 14px 36px; font-size: 54px; font-weight: 900; color: #fef2f2; background: rgba(239,68,68,0.12); }
  .handle { animation: none; }
`,
  body: `  <div class="bg-dots"></div>
  <div class="glow-amber" style="animation:none"></div>
  <div class="eyebrow eyebrow-top">${ICON_HOUSE}Tour pelo imóvel</div>
  <h1>Você compraria <em>esta casa?</em></h1>
  <div class="art"><div class="panel"><svg width="840" height="520" viewBox="0 0 840 520">
    <defs><linearGradient id="skc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b2a4a"/><stop offset="1" stop-color="#5b3a2e"/></linearGradient></defs>
    <rect width="840" height="520" fill="url(#skc)"/><rect y="440" width="840" height="80" fill="#3f2d1d"/>
    ${badHouse({ x: 220, y: -20, s: 0.95 })}
    <g transform="translate(40,250) rotate(-8)"><rect x="70" y="40" width="12" height="170" fill="#57341f"/><rect width="230" height="96" rx="12" fill="#f59e0b"/>
      <text x="115" y="64" text-anchor="middle" font-family="Manrope" font-weight="900" font-size="44" fill="#1c1512">VENDE-SE</text></g>
  </svg></div></div>
  <div class="tag"><span>Muita gente tem um site assim</span></div>`,
});

// ---------- sincronia com a fala: duração da cena e entradas que dependem da frase ----------
const s = x => `${x.toFixed(2)}s`;
const SYNC = {
  1: T => `.strike { animation-delay: ${s(at(T.c, 2))}; } .new { animation-delay: ${s(at(T.c, 3))}; }`,
  8: T => `.big { animation-delay: ${s(T.nStart)}; }`,
  9: T => `h1 { animation-delay: ${s(at(T.n, 1))}; }`,
  10: T => checks.map((_, i) => `.item:nth-child(${i + 1}) { animation-delay: ${s(at(T.n, i) - 0.1)}; }
  .item:nth-child(${i + 1}) .check { animation: popIn 0.35s cubic-bezier(.2,.8,.3,1) ${s(at(T.n, i))} both, shine 2.4s ease-in-out ${s(at(T.n, i) + 0.8)} infinite; }`).join('\n'),
  11: T => `h1 { animation-delay: ${s(at(T.n, 0))}; } .line { animation-delay: ${s(at(T.n, 1))}; } .cta { animation-delay: ${s(at(T.n, 3))}; }`,
};
scenes.forEach((sc, i) => {
  const n = i + 1, T = TIMING[n];
  sc.duration = T.dur;
  sc.voice = `voz/cena-${String(n).padStart(2, '0')}.mp3`;
  sc.voiceDelay = VOICE_DELAY;
  let css = T.n && T.c ? `.stamp { animation-delay: ${s(T.nStart)}; }` : '';
  if (SYNC[n]) css += SYNC[n](T);
  sc.html = sc.html.replace(/data-duration="[\d.]+"/, `data-duration="${T.dur}"`).replace('</style>', `  /* sincronia com a fala */\n  ${css}\n</style>`);
});

fs.mkdirSync(OUT, { recursive: true });
for (const sc of scenes) fs.writeFileSync(path.join(OUT, sc.file), sc.html);
fs.writeFileSync(path.join(OUT, 'cover.html'), cover);

const metaPath = path.join(OUT, 'meta.json');
const prev = fs.existsSync(metaPath) ? JSON.parse(fs.readFileSync(metaPath, 'utf8')) : {};
prev.scenes = scenes.map(({ file, title, duration, description, voice, voiceDelay }) => ({ file, title, duration, description, voice, voiceDelay }));
fs.writeFileSync(metaPath, JSON.stringify(prev, null, 2) + '\n');
console.log(`reel-13: ${scenes.length} cenas, ${scenes.reduce((a, s) => a + s.duration, 0).toFixed(1)}s`);
