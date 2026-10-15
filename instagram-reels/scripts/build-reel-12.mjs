#!/usr/bin/env node
/**
 * Gera as cenas do reel-12 "O ChatGPT recomenda o seu negócio? Faça o teste" (narrado).
 * A duração de cada cena segue a fala em html/reel-12/voz/ e cada elemento entra no início da frase
 * que fala dele (T[i] = início da frase i no tempo da cena).
 *
 * Usage: node scripts/build-reel-12.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { probeDuration, speechSegments } from './lib/voice-scenes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'html', 'reel-12');
const VOZ = path.join(OUT, 'voz');
const VOICE_DELAY = 0.15;
const TAIL = 0.45;

// Frases de cada cena → índices dos trechos de fala (detectados por silêncio)
const PHRASES = {
  1: [[0], [1]],                 // Eu perguntei para a IA: | qual eletricista...
  2: [[0], [1], [2, 3]],         // Ela respondeu na hora. | Três nomes... | e o motivo...
  3: [[0], [1], [2], [3]],       // Aí eu perguntei por outro. | A resposta? | "Não encontrei..." | E se fosse...
  4: [[0], [1], [2]],            // A IA não adivinha. | Ela lê. | E só recomenda...
  5: [[0]],
  6: [[0], [1]],                 // Depois, entender: | o que você faz...
  7: [[0], [1]],
  8: [[0], [1], [2]],            // Faz o teste agora. | Pergunta pra IA... | e me conta...
};
const TIMING = {};
for (const [n, phrases] of Object.entries(PHRASES)) {
  const audio = path.join(VOZ, `cena-0${n}.mp3`);
  const aDur = probeDuration(audio);
  const segs = speechSegments(audio, aDur);
  const need = Math.max(...phrases.flat()) + 1;
  if (segs.length < need) throw new Error(`cena ${n}: ${segs.length} trechos de fala, roteiro pede ${need}`);
  TIMING[n] = {
    dur: +(VOICE_DELAY + aDur + TAIL).toFixed(2),
    T: phrases.map(p => +(VOICE_DELAY + segs[p[0]][0]).toFixed(2)),
    E: phrases.map(p => +(VOICE_DELAY + segs[p[p.length - 1]][1]).toFixed(2)),
  };
}
const t = x => `${x.toFixed(2)}s`;

const head = (extraCss, duration) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
  /* Toda animação fica em elemento real (nunca ::before/::after). Texto essencial entre x 70–930 e y 120–1540. */
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1080px; height: 1920px; overflow: hidden; background: #0f172a; font-family: 'Manrope', sans-serif; }
  .scene { width: 1080px; height: 1920px; position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: center; padding: 140px 150px 380px 88px; }
  .bg-dots { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(248,250,252,0.05) 1.5px, transparent 1.5px); background-size: 48px 48px; }
  .blob-1 { position: absolute; top: -120px; right: -160px; width: 780px; height: 780px; background: radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 62%); animation: driftA 9s ease-in-out 0.9s infinite; }
  .blob-2 { position: absolute; bottom: -160px; left: -180px; width: 760px; height: 760px; background: radial-gradient(circle, rgba(99,102,241,0.16) 0%, transparent 62%); animation: driftB 11s ease-in-out 0.9s infinite; }
  .accent-left { position: absolute; left: 0; top: 0; width: 8px; height: 100%; background: linear-gradient(180deg, #06b6d4 0%, #6366f1 100%); }
  .handle { position: absolute; bottom: 64px; right: 64px; font-size: 34px; font-weight: 700; color: #94a3b8; animation: fadeIn 0.4s ease 0.6s both; }
  .handle em { font-style: normal; color: #06b6d4; }
  .eyebrow { display: inline-flex; align-items: center; gap: 16px; align-self: flex-start; background: rgba(6,182,212,0.14); border: 2px solid rgba(6,182,212,0.38); border-radius: 100px; padding: 16px 36px; font-size: 32px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #06b6d4; animation: dropIn 0.5s cubic-bezier(.2,.8,.3,1) 0.05s both; }
  .eyebrow-dot { width: 16px; height: 16px; border-radius: 50%; background: #06b6d4; animation: dotPulse 1.8s ease-in-out 0.9s infinite; }

  /* chat genérico de assistente de IA (sem marca) */
  .chat { position: relative; align-self: stretch; background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.10); border-radius: 40px; padding: 36px 36px 40px; display: flex; flex-direction: column; gap: 30px; }
  .chat-head { display: flex; align-items: center; gap: 18px; font-size: 32px; font-weight: 800; color: #f8fafc; padding-bottom: 26px; border-bottom: 2px solid rgba(255,255,255,0.08); }
  .ai-avatar { width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; background: linear-gradient(135deg, #06b6d4, #6366f1); flex-shrink: 0; }
  .ai-avatar svg { animation: twinkle 2.4s ease-in-out 1s infinite; }
  .chat-head small { display: block; font-size: 24px; font-weight: 600; color: #4ade80; }
  .msg-user { align-self: flex-end; max-width: 88%; background: linear-gradient(135deg, #0891b2, #4f46e5); color: #fff; border-radius: 34px 34px 8px 34px; padding: 26px 34px; font-size: 46px; font-weight: 700; line-height: 1.3; }
  .msg-ai { align-self: flex-start; max-width: 100%; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.10); color: #e2e8f0; border-radius: 34px 34px 34px 8px; padding: 28px 34px; font-size: 40px; font-weight: 600; line-height: 1.35; }
  .typing { display: inline-flex; gap: 12px; padding: 26px 34px; border-radius: 34px 34px 34px 8px; background: rgba(255,255,255,0.07); align-self: flex-start; }
  .typing i { width: 18px; height: 18px; border-radius: 50%; background: #94a3b8; animation: bounce 1s ease-in-out infinite; }
  .typing i:nth-child(2) { animation-delay: 0.15s; } .typing i:nth-child(3) { animation-delay: 0.3s; }
  .wd { display: inline-block; animation: fadeIn 0.12s ease both; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: none; } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes dropIn { from { opacity: 0; transform: translateY(-28px); } to { opacity: 1; transform: none; } }
  @keyframes popIn { 0% { opacity: 0; transform: scale(0.4) rotate(-10deg); } 70% { opacity: 1; transform: scale(1.08); } 100% { opacity: 1; transform: none; } }
  @keyframes wipeX { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  @keyframes driftA { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-30px, 24px) scale(1.06); } }
  @keyframes driftB { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(28px, -22px) scale(1.05); } }
  @keyframes dotPulse { 0%, 100% { opacity: 0.35; transform: scale(1); box-shadow: 0 0 0 0 rgba(6,182,212,0.5); } 50% { opacity: 1; transform: scale(1.3); box-shadow: 0 0 0 16px rgba(6,182,212,0); } }
  @keyframes bounce { 0%, 100% { transform: translateY(0); opacity: 0.5; } 50% { transform: translateY(-10px); opacity: 1; } }
  @keyframes twinkle { 0%, 100% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.15) rotate(12deg); } }
  @keyframes hideAt { to { opacity: 0; height: 0; padding: 0; margin: 0; } }
  @keyframes blink { 50% { opacity: 0; } }
${extraCss}
</style>
</head>
<body data-duration="${duration}">`;

const bg = `
  <div class="blob-1"></div>
  <div class="blob-2"></div>
  <div class="bg-dots"></div>
  <div class="accent-left"></div>`;
const handle = `  <div class="handle"><em>@</em>adrianomaringolo.dev</div>`;

const I = {
  sparkles: s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.94 14.06 8 20l-1.94-5.94L0 12l6.06-1.94L8 4l1.94 6.06L16 12z" transform="translate(2 -1) scale(0.9)"/><path d="M20 3v4M22 5h-4"/></svg>`,
  search: s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  book: s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  quote: s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></svg>`,
  eye: s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  check: s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  x: s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>`,
  arrow: s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></svg>`,
};

// palavras entrando uma a uma, como digitação
const typed = (text, start, step = 0.07) => text.split(' ').map((w, i) =>
  `<span class="wd" style="animation-delay:${(start + i * step).toFixed(2)}s">${w}</span>`).join(' ');

const chatHead = `<div class="chat-head"><div class="ai-avatar">${I.sparkles(36)}</div><div>Assistente de IA<small>online</small></div></div>`;

// ── Cena 1 — Gancho ──────────────────────────────────────────────────────────
const scene1 = `${head(`
  .eyebrow { margin-bottom: 44px; }
  h1 { font-size: 104px; font-weight: 900; letter-spacing: -0.04em; line-height: 1.02; color: #f8fafc; margin-bottom: 64px; animation: fadeUp 0.5s ease 0.15s both; }
  h1 em { font-style: normal; background: linear-gradient(90deg, #22d3ee, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .chat { animation: fadeUp 0.5s ease 0.45s both; }
  .cursor { display: inline-block; width: 4px; height: 48px; background: #fff; vertical-align: -8px; margin-left: 6px; animation: blink 1s step-end ${t(TIMING[1].E[1])} infinite; }
`, TIMING[1].dur)}
<div class="scene">${bg}
  <div class="eyebrow"><span class="eyebrow-dot"></span>Fiz o teste</div>
  <h1>Perguntei<br>para a <em>IA.</em></h1>
  <div class="chat">
    ${chatHead}
    <div class="msg-user">${typed('Qual eletricista você recomenda em Campinas?', TIMING[1].T[1], (TIMING[1].E[1] - TIMING[1].T[1]) / 6)}<span class="cursor"></span></div>
  </div>
${handle}
</div>
</body>
</html>
`;

// ── Cena 2 — A resposta com 3 nomes ──────────────────────────────────────────
const scene2 = `${head(`
  .chat { animation: fadeIn 0.3s ease both; }
  .typing { animation: hideAt 0.01s linear ${t(TIMING[2].T[1] - 0.05)} both; overflow: hidden; }
  .msg-ai { animation: fadeUp 0.4s ease ${t(TIMING[2].T[1])} both; }
  .msg-ai p { margin-bottom: 18px; }
  .rec { display: flex; align-items: center; gap: 18px; margin-top: 16px; padding: 18px 22px; border-radius: 22px; background: rgba(6,182,212,0.08); border: 1px solid rgba(6,182,212,0.25); }
  .rec b { display: block; color: #f8fafc; font-weight: 900; font-size: 46px; }
  .rec span { display: block; color: #cbd5e1; font-size: 36px; font-weight: 600; }
  .num { flex-shrink: 0; width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #06b6d4, #6366f1); color: #fff; font-weight: 900; font-size: 32px; display: flex; align-items: center; justify-content: center; }
  .r1 { animation: fadeUp 0.4s ease ${t(TIMING[2].T[1] + 0.25)} both, recGlow 2.6s ease-in-out ${t(TIMING[2].T[2])} infinite; }
  .r2 { animation: fadeUp 0.4s ease ${t(TIMING[2].T[1] + 0.5)} both; }
  .r3 { animation: fadeUp 0.4s ease ${t(TIMING[2].T[1] + 0.75)} both; }
  @keyframes recGlow { 0%, 100% { border-color: rgba(6,182,212,0.25); } 50% { border-color: rgba(6,182,212,0.85); } }
`, TIMING[2].dur)}
<div class="scene">${bg}
  <div class="chat">
    ${chatHead}
    <div class="msg-user" style="font-size:38px">Qual eletricista você recomenda em Campinas?</div>
    <div class="typing"><i></i><i></i><i></i></div>
    <div class="msg-ai">
      <p>Encontrei 3 opções:</p>
      <div class="rec r1"><div class="num">1</div><div><b>Faísca Elétrica</b><span>atende Campinas e região</span></div></div>
      <div class="rec r2"><div class="num">2</div><div><b>Voltagem Serviços</b><span>WhatsApp e horário no site</span></div></div>
      <div class="rec r3"><div class="num">3</div><div><b>Luz &amp; Cia</b><span>responde as dúvidas no site</span></div></div>
    </div>
  </div>
${handle}
</div>
</body>
</html>
`;

// ── Cena 3 — E o seu? ────────────────────────────────────────────────────────
const scene3 = `${head(`
  .chat { animation: fadeIn 0.3s ease both; }
  .msg-user { animation: fadeUp 0.4s ease 0.2s both; }
  .typing { animation: fadeIn 0.2s ease ${t(TIMING[3].T[1])} both, hideAt 0.01s linear ${t(TIMING[3].T[2] - 0.05)} both; overflow: hidden; }
  .msg-ai { animation: fadeUp 0.4s ease ${t(TIMING[3].T[2])} both; }
  .miss { display: flex; align-items: center; gap: 18px; margin-top: 20px; padding: 18px 22px; border-radius: 22px; background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.35); }
  .miss b { color: #94a3b8; font-weight: 900; font-size: 40px; text-decoration: line-through; text-decoration-color: #ef4444; text-decoration-thickness: 5px; }
  .xmark { flex-shrink: 0; width: 60px; height: 60px; border-radius: 50%; background: rgba(239,68,68,0.18); border: 3px solid rgba(239,68,68,0.6); color: #f87171; display: flex; align-items: center; justify-content: center; animation: popIn 0.4s cubic-bezier(.2,.9,.3,1.3) ${t(TIMING[3].T[2] + 0.5)} both, xPulse 1.8s ease-in-out ${t(TIMING[3].T[2] + 1.2)} infinite; }
  @keyframes xPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.5); } 50% { box-shadow: 0 0 0 16px rgba(239,68,68,0); } }
  .punch { margin-top: 70px; font-size: 64px; font-weight: 600; line-height: 1.3; color: #94a3b8; animation: fadeUp 0.5s ease ${t(TIMING[3].T[3])} both; }
  .punch strong { color: #f8fafc; font-weight: 900; }
`, TIMING[3].dur)}
<div class="scene">${bg}
  <div class="chat">
    ${chatHead}
    <div class="msg-user">E a Ferreira Elétrica?</div>
    <div class="typing"><i></i><i></i><i></i></div>
    <div class="msg-ai">Não encontrei informações claras sobre o serviço.
      <div class="miss"><div class="xmark">${I.x(30)}</div><b>Ferreira Elétrica</b></div>
    </div>
  </div>
  <div class="punch">E se fosse <strong>o seu negócio?</strong></div>
${handle}
</div>
</body>
</html>
`;

// ── Cena 4 — A virada ────────────────────────────────────────────────────────
const scene4 = `${head(`
  .bg-icon { position: absolute; right: -170px; top: 520px; width: 760px; height: 760px; color: #06b6d4; opacity: 0.1; animation: fadeInLow 0.6s ease both, breathe 9s ease-in-out 1s infinite; }
  @keyframes fadeInLow { from { opacity: 0; } to { opacity: 0.1; } }
  @keyframes breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
  h2 { position: relative; font-size: 130px; font-weight: 900; letter-spacing: -0.045em; line-height: 1.04; color: #f8fafc; }
  .l1 { display: block; animation: fadeUp 0.5s ease 0.2s both; }
  .l2 { display: block; margin-top: 20px; line-height: 1.2; padding-bottom: 0.06em; background: linear-gradient(100deg, #22d3ee 0%, #818cf8 60%, #22d3ee 100%); background-size: 220% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: fadeUp 0.5s ease ${t(TIMING[4].T[1])} both, shimmer 3.6s ease-in-out ${t(TIMING[4].T[1] + 0.7)} infinite; }
  @keyframes shimmer { 0%, 100% { background-position: 0% 0; } 50% { background-position: 100% 0; } }
  .sub { position: relative; margin-top: 70px; font-size: 56px; font-weight: 600; line-height: 1.36; color: #94a3b8; animation: fadeUp 0.5s ease ${t(TIMING[4].T[2])} both; }
  .sub strong { color: #f8fafc; font-weight: 900; }
`, TIMING[4].dur)}
<div class="scene">${bg}
  <div class="bg-icon">${I.eye('100%')}</div>
  <h2><span class="l1">A IA não adivinha.</span><span class="l2">Ela lê.</span></h2>
  <div class="sub">E só recomenda quem ela <strong>consegue entender.</strong></div>
${handle}
</div>
</body>
</html>
`;

// ── Cenas 5–7 — As 3 etapas ──────────────────────────────────────────────────
const STEP_CSS = `
  .steps { display: flex; gap: 14px; margin-bottom: 70px; animation: dropIn 0.45s ease 0.05s both; }
  .st { height: 14px; width: 150px; border-radius: 7px; background: rgba(248,250,252,0.12); position: relative; overflow: hidden; }
  .st i { position: absolute; inset: 0; background: linear-gradient(90deg, #22d3ee, #6366f1); transform-origin: left; }
  .st i.now { animation: wipeX 0.6s ease-out 0.3s both; }
  .icon { width: 150px; height: 150px; border-radius: 40px; display: flex; align-items: center; justify-content: center; color: #22d3ee; background: rgba(6,182,212,0.12); border: 2px solid rgba(6,182,212,0.4); animation: popIn 0.4s cubic-bezier(.2,.9,.3,1.3) 0.1s both; }
  .icon svg { animation: floaty 2.4s ease-in-out 0.8s infinite; }
  @keyframes floaty { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  .label { margin-top: 56px; font-size: 32px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: #94a3b8; animation: fadeIn 0.3s ease 0.15s both; }
  h2 { margin-top: 14px; font-size: 128px; font-weight: 900; letter-spacing: -0.045em; line-height: 1.0; color: #f8fafc; animation: fadeUp 0.4s ease 0.2s both; }
  .desc { margin-top: 56px; font-size: 56px; font-weight: 600; line-height: 1.36; color: #94a3b8; animation: fadeUp 0.4s ease var(--desc-at) both; }
  .desc strong { color: #f8fafc; font-weight: 900; }
`;
const stepScene = (n, icon, title, desc, dur, descAt) => `${head(STEP_CSS + `\n  .desc { --desc-at: ${t(descAt)}; }`, dur)}
<div class="scene">${bg}
  <div class="steps">${[1, 2, 3].map(i => `<div class="st">${i < n ? '<i></i>' : i === n ? '<i class="now"></i>' : ''}</div>`).join('')}</div>
  <div class="icon">${icon}</div>
  <div class="label">Etapa ${n} de 3</div>
  <h2>${title}</h2>
  <div class="desc">${desc}</div>
${handle}
</div>
</body>
</html>
`;
const scene5 = stepScene(1, I.search(76), 'Encontrar', 'Seu site <strong>aparece no buscador</strong> e não bloqueia os robôs.', TIMING[5].dur, 0.45);
const scene6 = stepScene(2, I.book(76), 'Entender', 'Texto claro: <strong>o que você faz, onde atende</strong> e como contratar.', TIMING[6].dur, TIMING[6].T[1]);
const scene7 = stepScene(3, I.quote(76), 'Citar', '<strong>Perguntas frequentes</strong> respondidas e as mesmas informações em todo lugar.', TIMING[7].dur, 0.6);

// ── Cena 8 — CTA ─────────────────────────────────────────────────────────────
const scene8 = `${head(`
  .eyebrow { margin-bottom: 50px; }
  h2 { font-size: 112px; font-weight: 900; letter-spacing: -0.04em; line-height: 1.04; color: #f8fafc; animation: fadeUp 0.5s ease 0.2s both; }
  h2 em { font-style: normal; background: linear-gradient(90deg, #22d3ee, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .input { margin-top: 60px; display: flex; align-items: center; gap: 20px; background: rgba(255,255,255,0.06); border: 2px solid rgba(6,182,212,0.4); border-radius: 100px; padding: 26px 34px; font-size: 38px; font-weight: 700; color: #e2e8f0; animation: fadeUp 0.5s ease ${t(TIMING[8].T[1])} both, inGlow 2.6s ease-in-out ${t(TIMING[8].T[1] + 0.9)} infinite; }
  .input .ai-avatar { width: 56px; height: 56px; }
  .input u { text-decoration: none; color: #22d3ee; border-bottom: 4px dashed rgba(34,211,238,0.6); }
  @keyframes inGlow { 0%, 100% { box-shadow: 0 0 0 rgba(6,182,212,0); } 50% { box-shadow: 0 0 44px rgba(6,182,212,0.3); } }
  .sub { margin-top: 60px; font-size: 54px; font-weight: 600; line-height: 1.36; color: #94a3b8; animation: fadeUp 0.5s ease ${t(TIMING[8].T[2])} both; }
  .sub strong { color: #f8fafc; font-weight: 900; }
  .kicker { margin-top: 50px; display: inline-flex; align-items: center; gap: 18px; font-size: 44px; font-weight: 800; color: #f8fafc; animation: fadeUp 0.5s ease ${t(TIMING[8].T[2] + 0.4)} both; }
  .kicker svg { color: #06b6d4; animation: nudge 1.4s ease-in-out ${t(TIMING[8].T[2] + 1.0)} infinite; transform: rotate(90deg); }
  @keyframes nudge { 0%, 100% { translate: 0 0; } 50% { translate: 0 10px; } }
`, TIMING[8].dur + 1.2)}
<div class="scene">${bg}
  <div class="eyebrow"><span class="eyebrow-dot"></span>Sua vez</div>
  <h2>Faça o teste <em>agora.</em></h2>
  <div class="input"><div class="ai-avatar">${I.sparkles(30)}</div><span>Quem você recomenda para <u>seu serviço</u> em <u>sua cidade</u>?</span></div>
  <div class="sub">Apareceu na resposta? <strong>Me conta nos comentários.</strong></div>
  <div class="kicker">Comente aqui ${I.arrow(42)}</div>
${handle}
</div>
</body>
</html>
`;

// ── Capa ─────────────────────────────────────────────────────────────────────
const cover = `${head(`
  .scene { justify-content: center; padding: 140px 150px 380px 88px; }
  .blob-1, .blob-2, .handle, .eyebrow, .eyebrow-dot, .ai-avatar svg { animation: none; }
  .eyebrow { margin-bottom: 56px; font-size: 36px; }
  .big-ai { width: 220px; height: 220px; border-radius: 60px; display: flex; align-items: center; justify-content: center; color: #fff; background: linear-gradient(135deg, #06b6d4, #6366f1); margin-bottom: 70px; box-shadow: 0 30px 80px rgba(6,182,212,0.35); }
  h1 { font-size: 120px; font-weight: 900; letter-spacing: -0.045em; line-height: 1.02; color: #f8fafc; }
  h1 em { font-style: normal; display: inline-block; line-height: 1.15; padding-bottom: 0.04em; background: linear-gradient(90deg, #22d3ee, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .sub { margin-top: 56px; font-size: 60px; font-weight: 800; color: #cbd5e1; }
`, 0)}
<div class="scene">${bg}
  <div class="eyebrow"><span class="eyebrow-dot"></span>Faça o teste</div>
  <div class="big-ai">${I.sparkles(130)}</div>
  <h1>A IA recomenda <em>o seu negócio?</em></h1>
  <div class="sub">Ou o concorrente?</div>
${handle}
</div>
</body>
</html>
`;

const scenesHtml = [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8];
scenesHtml.forEach((h, i) => fs.writeFileSync(path.join(OUT, `scene-0${i + 1}.html`), h));
fs.writeFileSync(path.join(OUT, 'cover.html'), cover);

const metaPath = path.join(OUT, 'meta.json');
const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
meta.scenes = meta.scenes.map((sc, i) => {
  const n = i + 1;
  const dur = n === 8 ? +(TIMING[8].dur + 1.2).toFixed(2) : TIMING[n].dur;
  return { ...sc, duration: dur, voice: `voz/cena-0${n}.mp3`, voiceDelay: VOICE_DELAY };
});
fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n');
meta.scenes.forEach(sc => console.log(`  ✅  ${sc.file}  ${sc.duration}s`));
console.log(`  total ${meta.scenes.reduce((a, sc) => a + sc.duration, 0).toFixed(1)}s`);
