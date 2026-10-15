#!/usr/bin/env node
/**
 * Gera as cenas do reel-10 "O site que fala" a partir das falas em html/reel-10/voz/.
 *
 * - Duração de cada cena = atraso da voz + duração do áudio + respiro.
 * - Boca do personagem: keyframes gerados do envelope de volume de cada fala.
 * - Legenda karaokê: cada frase ocupa um trecho de fala (detectado por silêncio); dentro dela,
 *   as palavras são distribuídas proporcionalmente ao tamanho.
 *
 * Usage: node scripts/build-reel-10.mjs
 */

import fs from 'fs';
import path from 'path';
import { probeDuration, speechSegments, envelope, captionsFor, mouthKeyframes } from './lib/voice-scenes.mjs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, '..', 'html', 'reel-10');
const VOZ = path.join(DIR, 'voz');

const VOICE_DELAY = 0.15;   // a voz entra logo depois do corte
const TAIL = 0.35;          // respiro depois da última palavra

// ── Roteiro: frases por trecho de fala ───────────────────────────────────────
// `segs` = índices dos trechos de fala que a frase ocupa (0-based).
const SCENES = [
  { id: 1, title: 'Gancho — finalmente alguém apareceu', phrases: [
    { text: 'Ah... finalmente alguém apareceu.', segs: [0] },
    { text: 'Eu sou o site da sua empresa.', segs: [1] },
    { text: 'Lembra de mim?', segs: [2] },
  ] },
  { id: 2, title: 'O abandono — rodapé de 2019', phrases: [
    { text: 'Faz seis anos que ninguém mexe em mim...', segs: [0] },
    { text: 'Meu rodapé ainda diz...', segs: [1] },
    { text: '2019.', segs: [2] },
  ] },
  { id: 3, title: 'O cliente chega — carregando', phrases: [
    { text: 'Hoje entrou um cliente.', segs: [0] },
    { text: 'Pelo celular...', segs: [1] },
    { text: 'Eu demorei uma eternidade pra abrir.', segs: [2] },
  ] },
  { id: 4, title: 'O telefone escondido', phrases: [
    { text: 'Aí ele procurou o seu telefone.', segs: [0] },
    { text: 'Tava escondido numa página chamada...', segs: [1] },
    { text: '"Fale Conosco".', segs: [2] },
    { text: 'Lá embaixo.', segs: [3] },
  ] },
  { id: 5, title: 'O banner de Natal', phrases: [
    { text: 'E o banner?', segs: [0] },
    { text: 'Ainda é da promoção de Natal...', segs: [1] },
    { text: 'De 2020.', segs: [2, 3] },
  ] },
  { id: 6, title: 'Ele foi embora — o concorrente', phrases: [
    { text: 'Ele foi embora...', segs: [0] },
    { text: 'Foi pro site do seu concorrente.', segs: [1] },
    { text: 'Aquele que abre rapidinho.', segs: [2] },
  ] },
  { id: 7, title: 'O pedido — só uma reforma', phrases: [
    { text: 'Eu não tô pedindo muito...', segs: [0] },
    { text: 'Só uma reforma.', segs: [1] },
    { text: 'Um texto que diga o que você faz.', segs: [2] },
    { text: 'Um botão de WhatsApp que apareça.', segs: [3] },
  ] },
  { id: 8, title: 'CTA — manda o meu link pro Adriano', phrases: [
    { text: 'Faz um favor?', segs: [0] },
    { text: 'Manda o meu link pro Adriano, no direct...', segs: [1] },
    { text: 'Ele me conserta.', segs: [2] },
  ], extraTail: 3.3 },
];

// ── Conteúdo do "site" por cena ──────────────────────────────────────────────
const SVG = {
  hourglass: `<svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>`,
  web: `<svg width="260" height="260" viewBox="0 0 100 100" fill="none" stroke="rgba(40,40,40,0.75)" stroke-width="1.4"><path d="M100 0 L0 100 M100 0 L30 100 M100 0 L60 100 M100 0 L0 30 M100 0 L0 65"/><path d="M80 0 Q82 18 100 20"/><path d="M58 0 Q62 38 100 42"/><path d="M36 0 Q42 58 100 64"/><path d="M14 0 Q22 78 100 86"/></svg>`,
  hat: `<svg width="230" height="200" viewBox="0 0 230 200"><path d="M20 170 Q60 40 170 30 Q150 90 200 150 Z" fill="#d62828"/><rect x="0" y="150" width="215" height="44" rx="22" fill="#f5f5f5"/><circle cx="190" cy="30" r="26" fill="#f5f5f5"/></svg>`,
  wa: `<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`,
};

const CONTENT = {
  1: { mood: 'tired', css: `
  .marquee { height: 90px; overflow: hidden; background: #ffff66; border: 4px ridge #c0c0c0; display: flex; align-items: center; }
  .marquee span { white-space: nowrap; font: bold 52px 'Comic Sans MS', cursive; color: #e00000; animation: marq 6s linear 0s infinite; }
  @keyframes marq { from { transform: translateX(900px); } to { transform: translateX(-1400px); } }
  .counter { margin-top: 34px; display: flex; align-items: center; gap: 18px; font: 34px 'Times New Roman', serif; color: #000; justify-content: center; }
  .digits { display: flex; gap: 4px; }
  .digits b { background: #000; color: #39ff14; font: 46px 'Courier New', monospace; padding: 2px 10px; }
  .construcao { margin-top: 34px; height: 64px; background: repeating-linear-gradient(45deg, #111 0 30px, #ffd000 30px 60px); display: flex; align-items: center; justify-content: center; }
  .construcao span { background: #ffd000; font: bold 36px Arial, sans-serif; padding: 2px 18px; color: #111; animation: blink 1s step-end 0.8s infinite; }
  @keyframes blink { 50% { opacity: 0; } }`, html: `
        <div class="marquee"><span>*** SEJA BEM-VINDO AO NOSSO SITE!!! ***</span></div>
        <div class="counter">Você é o visitante nº <span class="digits"><b>0</b><b>0</b><b>0</b><b>1</b><b>2</b><b>7</b></span></div>
        <div class="construcao"><span>PÁGINA EM CONSTRUÇÃO</span></div>` },

  2: { mood: 'tired', css: `
  .zoomwrap { animation: zoomIn 6s ease-in-out 0.2s both; transform-origin: 50% 90%; }
  @keyframes zoomIn { from { transform: scale(1); } to { transform: scale(1.12); } }
  .lines i { display: block; height: 18px; background: #ddd; margin: 14px 0; }
  .footer { margin-top: 26px; background: #e8e8e8; border-top: 3px solid #999; padding: 28px 20px; text-align: center; font: 40px 'Times New Roman', serif; color: #333; }
  .footer .year { display: inline-block; font-weight: bold; color: #c00; animation: yearPulse 1.6s ease-in-out 1.2s infinite; }
  @keyframes yearPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }
  .footer small { display: block; margin-top: 10px; font-size: 28px; color: #666; }
  .web { position: absolute; right: 0; bottom: 0; transform-origin: 100% 100%; animation: webIn 1.2s ease-out 1.0s both, sway 4s ease-in-out 2.2s infinite; z-index: 3; }
  @keyframes webIn { from { opacity: 0; transform: scale(0.2); } to { opacity: 1; transform: scale(1); } }
  @keyframes sway { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-2deg); } }`, html: `
        <div class="zoomwrap">
          <div class="lines"><i style="width:90%"></i><i style="width:70%"></i></div>
          <div class="footer">© <span class="year">2019</span> Ferreira Elétrica<small>Todos os direitos reservados</small></div>
        </div>
        <div class="web">${SVG.web}</div>` },

  3: { mood: 'tired', css: `
  .loading { display: flex; flex-direction: column; align-items: center; gap: 30px; padding-top: 10px; }
  .hg { animation: flip 1.6s ease-in-out 0.6s infinite; }
  @keyframes flip { 0%, 40% { transform: rotate(0deg); } 60%, 100% { transform: rotate(180deg); } }
  .bar { width: 760px; height: 54px; border: 4px inset #c0c0c0; background: #fff; padding: 4px; }
  .bar-fill { height: 100%; background: repeating-linear-gradient(90deg, #000080 0 34px, #fff 34px 40px); animation: crawl 3.4s ease-in-out 0.3s infinite; }
  @keyframes crawl { 0% { width: 4%; } 45% { width: 31%; } 60% { width: 18%; } 100% { width: 4%; } }
  .ltext { font: 40px 'Times New Roman', serif; color: #222; }`, html: `
        <div class="loading">
          <div class="hg">${SVG.hourglass}</div>
          <div class="bar"><div class="bar-fill"></div></div>
          <div class="ltext">Carregando, aguarde...</div>
        </div>` },

  4: { mood: 'side', css: `
  .menu { display: flex; gap: 0; font: bold 32px Arial, sans-serif; background: #003399; color: #fff; }
  .menu span { padding: 14px 20px; border-right: 2px solid #6688cc; }
  .menu .hot { background: #ff9900; position: relative; }
  .sub { position: absolute; top: 62px; left: 0; background: #fff; border: 3px outset #c0c0c0; color: #003399; font-weight: normal; white-space: nowrap; z-index: 4; }
  .sub div { padding: 10px 18px; border-bottom: 1px solid #ccc; }
  .sub1 { animation: pop 0.25s ease-out 0.6s both; }
  .sub1 { left: auto; right: 0; }
  .sub2 { left: auto; right: 60px; top: 100%; animation: pop 0.25s ease-out 1.3s both; }
  .sub3 { left: auto; right: 60px; top: 100%; animation: pop 0.25s ease-out 2.0s both; }
  .sub3 div { background: #ffff99; font-weight: bold; }
  @keyframes pop { from { opacity: 0; transform: scaleY(0); } to { opacity: 1; transform: none; } }
  .scroll { margin-top: 20px; height: 300px; overflow: hidden; position: relative; }
  .scroll-in { animation: scrollDown 1.4s linear 2.6s infinite; }
  @keyframes scrollDown { from { transform: translateY(0); } to { transform: translateY(-300px); } }
  .scroll-in i { display: block; height: 16px; background: #ddd; margin: 14px 0; }
  .tel { position: absolute; right: 8px; bottom: 6px; font: 18px Arial, sans-serif; color: #999; }`, html: `
        <div class="menu"><span>Home</span><span>Empresa</span><span>Serviços</span><span class="hot">Mais ▾
          <div class="sub sub1"><div>Institucional ▸
            <div class="sub sub2"><div>Atendimento ▸
              <div class="sub sub3"><div>Fale Conosco</div></div>
            </div></div>
          </div></div>
        </span></div>
        <div class="scroll"><div class="scroll-in">${'<i style="width:92%"></i><i style="width:78%"></i><i style="width:85%"></i>'.repeat(8)}</div>
          <div class="tel">Tel.: (00) 0000-0000</div></div>` },

  5: { mood: 'deadpan', css: `
  .xmas { position: relative; height: 380px; overflow: hidden; border: 6px ridge #c0c0c0; background: repeating-linear-gradient(135deg, #c1121f 0 50px, #1b7f3b 50px 100px); display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .xmas h3 { font: bold 64px 'Comic Sans MS', cursive; color: #fff200; text-shadow: 4px 4px 0 #000; text-align: center; line-height: 1.05; animation: blink 0.9s step-end 0.8s infinite; }
  .xmas p { margin-top: 12px; font: bold 34px Arial, sans-serif; color: #fff; text-shadow: 3px 3px 0 #000; }
  @keyframes blink { 50% { opacity: 0.15; } }
  .flake { position: absolute; top: -20px; width: 14px; height: 14px; border-radius: 50%; background: #fff; animation: snow 2.6s linear infinite; }
  @keyframes snow { from { transform: translateY(0); } to { transform: translateY(420px); } }
  .hat { position: absolute; left: -64px; top: -126px; transform: rotate(-24deg); z-index: 6; animation: hatIn 0.5s cubic-bezier(.2,.9,.3,1.3) 0.3s both; }
  @keyframes hatIn { from { opacity: 0; transform: translateY(-120px) rotate(-24deg); } to { opacity: 1; transform: rotate(-24deg); } }`, html: `
        <div class="xmas">
          ${[60, 170, 300, 420, 540, 660, 780].map((x, i) => `<div class="flake" style="left:${x}px; animation-delay:${(0.8 + i * 0.37).toFixed(2)}s"></div>`).join('')}
          <h3>PROMOÇÃO DE<br>NATAL 2020</h3>
          <p>Aproveite! Só até 25/12</p>
        </div>`, window: `<div class="hat">${SVG.hat}</div>` },

  6: { mood: 'side', css: `
  .stage-old { animation: oldAway 0.8s ease-in-out 2.2s both; transform-origin: 30% 40%; }
  @keyframes oldAway { from { transform: none; filter: none; } to { transform: translateX(-120px) scale(0.86); filter: grayscale(0.7) brightness(0.8); } }
  .gone { text-align: center; font: 40px 'Times New Roman', serif; color: #444; padding-top: 40px; }
  .gone b { display: block; font-size: 96px; color: #999; }
  .rival { position: absolute; right: 50px; top: 360px; width: 470px; height: 860px; border-radius: 60px; background: #0b0f19; padding: 16px; box-shadow: 0 40px 90px rgba(0,0,0,0.55); z-index: 8; animation: rivalIn 0.6s cubic-bezier(.2,.8,.3,1) 2.4s both; }
  @keyframes rivalIn { from { opacity: 0; transform: translateX(520px) rotate(6deg); } to { opacity: 1; transform: rotate(3deg); } }
  .rival-screen { height: 100%; border-radius: 46px; background: #f8fafc; padding: 70px 32px 32px; display: flex; flex-direction: column; gap: 24px; font-family: 'Manrope', sans-serif; }
  .r-h { font-size: 50px; font-weight: 900; line-height: 1.05; color: #0f172a; letter-spacing: -0.03em; }
  .r-loc { font-size: 28px; font-weight: 700; color: #0891b2; }
  .r-img { height: 220px; border-radius: 22px; background: linear-gradient(135deg, #bae6fd, #c7d2fe); }
  .r-btn { display: flex; align-items: center; justify-content: center; gap: 12px; border-radius: 20px; padding: 26px 0; background: #16a34a; color: #fff; font-size: 34px; font-weight: 900; animation: btnPulse 1.2s ease-in-out 3.2s infinite; }
  @keyframes btnPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(22,163,74,0.6); } 50% { box-shadow: 0 0 0 22px rgba(22,163,74,0); } }`, html: `
        <div class="gone"><b>0</b>visitantes online agora</div>`, wrapOld: true, extra: `
  <div class="rival"><div class="rival-screen">
    <div class="r-h">Eletricista em Campinas</div>
    <div class="r-loc">Atendimento no mesmo dia</div>
    <div class="r-img"></div>
    <div class="r-btn">${SVG.wa}WhatsApp</div>
  </div></div>` },

  7: { mood: 'hopeful', css: `
  .fix { display: flex; flex-direction: column; align-items: center; gap: 36px; padding-top: 10px; }
  .logo-try { font: 900 64px 'Manrope', sans-serif; letter-spacing: -0.03em; color: #0f172a; animation: sharpen 2.2s steps(1) 0.8s infinite; }
  @keyframes sharpen { 0% { filter: blur(6px); } 30% { filter: none; } 55% { filter: blur(6px); } 80% { filter: none; } }
  .wa-try { display: flex; align-items: center; gap: 14px; background: #16a34a; color: #fff; font: 900 40px 'Manrope', sans-serif; padding: 26px 56px; border-radius: 22px; animation: glitchy 1.7s steps(1) 1.0s infinite; }
  @keyframes glitchy { 0% { opacity: 1; transform: none; } 20% { opacity: 0; } 35% { opacity: 1; transform: translateX(-10px); } 45% { opacity: 0.2; } 60% { opacity: 1; transform: none; } 85% { opacity: 0; } }`, html: `
        <div class="fix">
          <div class="logo-try">Ferreira Elétrica</div>
          <div class="wa-try">${SVG.wa}Chamar no WhatsApp</div>
        </div>` },

  8: { mood: 'puppy', css: `
  .please { text-align: center; font: bold 44px 'Comic Sans MS', cursive; color: #c00; padding-top: 30px; animation: blink 1.2s step-end 0.8s infinite; }
  @keyframes blink { 50% { opacity: 0.2; } }`, html: `
        <div class="please">por favor :(</div>` },
};

// ── Template da cena ─────────────────────────────────────────────────────────
function sceneHtml(scene, dur, captions, mouthCss) {
  const c = CONTENT[scene.id];
  const moods = {
    tired:   { lid: '46%', pupil: 'translate(0, 6px)' },
    side:    { lid: '40%', pupil: 'translate(-26px, 4px)' },
    deadpan: { lid: '55%', pupil: 'translate(0, 0)' },
    hopeful: { lid: '18%', pupil: 'translate(0, -6px)' },
    puppy:   { lid: '8%',  pupil: 'translate(0, -4px) scale(1.35)' },
  }[c.mood];
  const ctaAt = scene.id === 8 ? dur - 3.2 : null;
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Manrope:wght@500;600;700;800;900&display=swap" rel="stylesheet">
<style>
  /* Reel fora da identidade da marca (criatividade: Ousado). Toda animação fica em elemento real
     (o export faz scrub via querySelectorAll('*'), que não alcança ::before / ::after). */
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1080px; height: 1920px; overflow: hidden; background: #008080; }

  .stage { position: relative; width: 1080px; height: 1920px; overflow: hidden;
    background: radial-gradient(ellipse at 50% 40%, #0a9a9a 0%, #007070 70%, #005a5a 100%);
    animation: cutGlitch 0.22s steps(2) 0s both; }
  @keyframes cutGlitch { 0% { transform: translateX(-14px); filter: hue-rotate(80deg) contrast(1.4); } 50% { transform: translateX(10px); } 100% { transform: none; filter: none; } }
  .scan { position: absolute; inset: 0; z-index: 30; pointer-events: none;
    background: repeating-linear-gradient(0deg, rgba(0,0,0,0.07) 0 2px, transparent 2px 5px); }

  /* janela estilo Windows 95 */
  .win { position: absolute; left: 60px; top: 170px; width: 960px; height: 1060px; background: #c0c0c0;
    border: 4px solid; border-color: #fff #404040 #404040 #fff; box-shadow: 10px 12px 0 rgba(0,0,0,0.35);
    animation: winBob 5s ease-in-out 1s infinite; }
  @keyframes winBob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  .title { height: 56px; background: linear-gradient(90deg, #000080, #1084d0); color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 0 12px 0 16px; font: bold 26px Tahoma, Arial, sans-serif; }
  .btns { display: flex; gap: 6px; }
  .btns b { width: 40px; height: 36px; background: #c0c0c0; border: 3px solid; border-color: #fff #404040 #404040 #fff; color: #000; display: flex; align-items: center; justify-content: center; font: bold 24px Tahoma, sans-serif; }
  .addr { height: 60px; display: flex; align-items: center; gap: 12px; padding: 0 12px; font: 24px Tahoma, Arial, sans-serif; color: #000; }
  .addr span { flex: 1; background: #fff; border: 3px inset #c0c0c0; padding: 6px 10px; white-space: nowrap; overflow: hidden; }
  .page { position: absolute; left: 10px; right: 10px; top: 126px; bottom: 10px; background: #fff; border: 3px inset #c0c0c0; overflow: hidden; padding: 0 30px; }
  .head { height: 96px; display: flex; align-items: center; justify-content: center; gap: 16px; font: bold 50px 'Comic Sans MS', cursive; color: #003399; border-bottom: 4px double #003399; }

  /* o rosto do site */
  .face { position: relative; height: 380px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 30px; }
  .eyes { display: flex; gap: 120px; }
  .eye { position: relative; width: 170px; height: 170px; border-radius: 50%; background: #fff; border: 7px solid #111; overflow: hidden; }
  .spin { position: absolute; inset: -18px; border-radius: 50%; border: 10px solid transparent; border-top-color: #1084d0; animation: rot 1.6s linear 0.8s infinite; }
  @keyframes rot { to { transform: rotate(360deg); } }
  .pupil { position: absolute; left: 50%; top: 50%; width: 60px; height: 60px; margin: -30px; border-radius: 50%; background: #111; transform: ${moods.pupil}; }
  .shine { position: absolute; left: 12px; top: 10px; width: 18px; height: 18px; border-radius: 50%; background: #fff; }
  .lid { position: absolute; left: 0; right: 0; top: 0; height: ${moods.lid}; background: #b8b8b8; border-bottom: 7px solid #111; animation: blinkLid 4.2s ease-in-out 1.4s infinite; transform-origin: top; }
  @keyframes blinkLid { 0%, 92%, 100% { transform: scaleY(1); } 96% { transform: scaleY(${(100 / parseFloat(moods.lid)).toFixed(2)}); } }
  .mouth { width: 230px; height: 96px; border-radius: 50px; background: #2a0a0a; border: 7px solid #111; overflow: hidden; position: relative; transform: scaleY(0.14); animation: talk ${dur}s linear 0s both; }
  .tongue { position: absolute; left: 50%; bottom: -26px; width: 120px; height: 60px; margin-left: -60px; border-radius: 50%; background: #d94a5a; }
  ${mouthCss}
  .content { position: relative; }
  ${c.css}

  /* legenda karaokê */
  .captions { position: absolute; left: 70px; right: 150px; top: 1290px; height: 300px; z-index: 20; }
  .phrase { position: absolute; inset: 0; display: flex; flex-wrap: wrap; align-content: center; justify-content: center; column-gap: 22px; row-gap: 4px; text-align: center; }
  .w { display: inline-block; font: 82px 'Archivo Black', sans-serif; line-height: 1.1; text-transform: uppercase; color: #fff;
    -webkit-text-stroke: 12px #000; paint-order: stroke fill; text-shadow: 0 8px 0 rgba(0,0,0,0.35); }
${captions.css}
${ctaAt !== null ? ctaCss(ctaAt) : ''}
</style>
</head>
<body data-duration="${dur}">
<div class="stage">
  ${c.wrapOld ? '<div class="stage-old">' : ''}
  <div class="win">
    ${c.window || ''}
    <div class="title"><span>Ferreira Elétrica - Página Inicial</span><div class="btns"><b>_</b><b>□</b><b>x</b></div></div>
    <div class="addr">Endereço <span>http://www.ferreiraeletrica.com.br/index.html</span></div>
    <div class="page">
      <div class="head">Ferreira Elétrica</div>
      <div class="face">
        <div class="eyes">
          <div class="eye"><div class="spin"></div><div class="pupil"><div class="shine"></div></div><div class="lid"></div></div>
          <div class="eye"><div class="spin"></div><div class="pupil"><div class="shine"></div></div><div class="lid"></div></div>
        </div>
        <div class="mouth"><div class="tongue"></div></div>
      </div>
      <div class="content">${c.html}
      </div>
    </div>
  </div>
  ${c.wrapOld ? '</div>' : ''}
  ${c.extra || ''}
  <div class="captions">
${captions.html}  </div>
${ctaAt !== null ? CTA_HTML : ''}
  <div class="scan"></div>
</div>
</body>
</html>
`;
}

// ── CTA de marca (fim da cena 8) ─────────────────────────────────────────────
function ctaCss(at) {
  return `
  .cta { position: absolute; inset: 0; z-index: 25; background: #0f172a; font-family: 'Manrope', sans-serif;
    display: flex; flex-direction: column; justify-content: center; padding: 100px 90px 100px 100px;
    animation: ctaIn 0.45s cubic-bezier(.2,.85,.25,1) ${at.toFixed(2)}s both; }
  @keyframes ctaIn { from { transform: translateY(100%); } to { transform: none; } }
  .cta-dots { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(248,250,252,0.05) 1.5px, transparent 1.5px); background-size: 48px 48px; }
  .cta-blob { position: absolute; top: -120px; right: -160px; width: 800px; height: 800px; background: radial-gradient(circle, rgba(6,182,212,0.22) 0%, transparent 62%); animation: breathe 4s ease-in-out ${(at + 0.9).toFixed(2)}s infinite; }
  @keyframes breathe { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.08); } }
  .cta-accent { position: absolute; left: 0; top: 0; width: 8px; height: 100%; background: linear-gradient(180deg, #06b6d4, #6366f1); }
  .cta h2 { position: relative; font-size: 104px; font-weight: 900; letter-spacing: -0.04em; line-height: 1.04; color: #f8fafc; animation: fadeUp 0.5s ease ${(at + 0.35).toFixed(2)}s both; }
  .cta h2 em { font-style: normal; background: linear-gradient(90deg, #06b6d4, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .cta p { position: relative; margin-top: 48px; font-size: 54px; font-weight: 600; line-height: 1.36; color: #94a3b8; animation: fadeUp 0.5s ease ${(at + 0.6).toFixed(2)}s both; }
  .cta p strong { color: #f8fafc; font-weight: 900; }
  .cta .handle { position: relative; margin-top: 80px; font-size: 48px; font-weight: 800; color: #f8fafc; animation: fadeUp 0.5s ease ${(at + 0.85).toFixed(2)}s both; }
  .cta .handle i { font-style: normal; color: #06b6d4; }
  .mini { position: absolute; right: 90px; bottom: 300px; width: 200px; height: 160px; background: #c0c0c0; border: 4px solid; border-color: #fff #404040 #404040 #fff; animation: fadeUp 0.5s ease ${(at + 1.1).toFixed(2)}s both, hop 1.4s ease-in-out ${(at + 1.8).toFixed(2)}s infinite; }
  .mini-bar { height: 26px; background: linear-gradient(90deg, #000080, #1084d0); }
  .mini-eyes { display: flex; justify-content: center; gap: 30px; margin-top: 26px; }
  .mini-eyes i { width: 40px; height: 40px; border-radius: 50%; background: #fff; border: 4px solid #111; position: relative; }
  .mini-eyes i b { position: absolute; left: 50%; top: 50%; width: 18px; height: 18px; margin: -9px; border-radius: 50%; background: #111; transform: translateY(-4px); }
  .mini-smile { width: 70px; height: 32px; margin: 14px auto 0; border: 5px solid #111; border-top: none; border-radius: 0 0 40px 40px; }
  @keyframes hop { 0%, 100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-14px) rotate(3deg); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: none; } }`;
}
const CTA_HTML = `  <div class="cta">
    <div class="cta-dots"></div><div class="cta-blob"></div><div class="cta-accent"></div>
    <h2>Seu site também<br><em>está pedindo socorro?</em></h2>
    <p><strong>Mande o link no direct.</strong> Eu dou uma olhada.</p>
    <div class="handle"><i>@</i>adrianomaringolo.dev</div>
    <div class="mini"><div class="mini-bar"></div><div class="mini-eyes"><i><b></b></i><i><b></b></i></div><div class="mini-smile"></div></div>
  </div>
`;

// ── Build ────────────────────────────────────────────────────────────────────
const metaPath = path.join(DIR, 'meta.json');
const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
meta.scenes = [];

for (const scene of SCENES) {
  const audio = path.join(VOZ, `cena-${String(scene.id).padStart(2, '0')}.mp3`);
  const aDur = probeDuration(audio);
  const segs = speechSegments(audio, aDur);
  const need = Math.max(...scene.phrases.flatMap(p => p.segs)) + 1;
  if (segs.length < need) throw new Error(`cena ${scene.id}: ${segs.length} trechos de fala, roteiro pede ${need}`);
  const dur = +(VOICE_DELAY + aDur + TAIL + (scene.extraTail || 0)).toFixed(2);
  const captions = captionsFor(scene, segs, dur, { voiceDelay: VOICE_DELAY });
  const html = sceneHtml(scene, dur, captions, mouthKeyframes(envelope(audio), dur, VOICE_DELAY));
  const file = `scene-${String(scene.id).padStart(2, '0')}.html`;
  fs.writeFileSync(path.join(DIR, file), html);
  meta.scenes.push({
    file, title: scene.title, duration: dur,
    voice: `voz/cena-${String(scene.id).padStart(2, '0')}.mp3`, voiceDelay: VOICE_DELAY,
    description: scene.phrases.map(p => p.text).join(' '),
  });
  console.log(`  ✅  ${file}  ${dur}s  (${segs.length} trechos de fala)`);
}
fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n');
console.log(`  total ${meta.scenes.reduce((a, s) => a + s.duration, 0).toFixed(1)}s`);
