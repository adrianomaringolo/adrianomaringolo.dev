#!/usr/bin/env node
/**
 * Gera as cenas do reel-11 "O caso do cliente que sumiu" (true crime narrado) a partir das falas em
 * html/reel-11/voz/. Os elementos de cada cena entram no início da frase que fala deles.
 *
 * Usage: node scripts/build-reel-11.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { probeDuration, speechSegments, captionsFor } from './lib/voice-scenes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, '..', 'html', 'reel-11');
const VOZ = path.join(DIR, 'voz');

const VOICE_DELAY = 0.2;
const TAIL = 0.45;

const SCENES = [
  { id: 1, title: 'Abertura — Caso nº 0417', phrases: [
    { text: 'Terça-feira.', segs: [0] },
    { text: '21h14.', segs: [1] },
    { text: 'Um cliente desapareceu.', segs: [2] },
  ] },
  { id: 2, title: 'O perfil — pronto pra contratar', phrases: [
    { text: 'Ele tinha um problema.', segs: [0] },
    { text: 'Tinha dinheiro...', segs: [1] },
    { text: 'E estava pronto pra contratar.', segs: [2] },
  ] },
  { id: 3, title: '21h14 e 3 segundos — entrou no site', phrases: [
    { text: 'Às 21h14...', segs: [0] },
    { text: 'e 3 segundos...', segs: [1] },
    { text: 'ele entrou no seu site.', segs: [2] },
  ] },
  { id: 4, title: 'As evidências — não encontrou', phrases: [
    { text: 'Procurou o que você faz.', segs: [0] },
    { text: 'Onde você atende.', segs: [1] },
    { text: 'Como falar com você.', segs: [2] },
    { text: 'Não encontrou.', segs: [3] },
  ] },
  { id: 5, title: '21h14 e 6 segundos — voltou pro Google', phrases: [
    { text: 'Às 21h14...', segs: [0] },
    { text: 'e 6 segundos...', segs: [1] },
    { text: 'ele voltou pro Google.', segs: [2] },
  ] },
  { id: 6, title: 'Visto pela última vez — o concorrente', phrases: [
    { text: 'Foi visto pela última vez no site do seu concorrente.', segs: [0] },
    { text: 'Fechou negócio às 21h31.', segs: [1] },
  ] },
  { id: 7, title: 'Caso arquivado', phrases: [
    { text: 'O caso foi arquivado.', segs: [0] },
    { text: 'Ninguém percebeu que ele existiu.', segs: [1] },
  ] },
  { id: 8, title: 'CTA — eu investigo', phrases: [
    { text: 'Quantos clientes sumiram assim esta semana?', segs: [0] },
    { text: 'Me manda o link do seu site.', segs: [1] },
    { text: 'Eu investigo.', segs: [2] },
  ], noCaptions: true, extraTail: 2.2 },
];

const s = t => `${t.toFixed(2)}s`;

const SVG = {
  user: `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#3a3a3a" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4.5"/><path d="M3.5 22c0-4.7 3.8-8 8.5-8s8.5 3.3 8.5 8"/></svg>`,
  search: `<svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>`,
  back: `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>`,
  wa: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`,
};

// Cada cena recebe T = início de cada frase (no tempo da cena) e devolve { css, html }.
const VISUAL = {
  1: T => ({ css: `
  .tape { position: absolute; left: -200px; width: 1500px; height: 110px; background: #f5c400; color: #111;
    font: 64px 'Oswald', sans-serif; font-weight: 700; letter-spacing: 0.06em; display: flex; align-items: center; white-space: nowrap; overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.6); z-index: 4; }
  .tape span { animation: tapeRun 9s linear 0.6s infinite; }
  @keyframes tapeRun { from { transform: translateX(0); } to { transform: translateX(-640px); } }
  .t1 { top: 260px; transform: rotate(-9deg); animation: tapeIn1 0.45s cubic-bezier(.2,.9,.3,1) 0.05s both; }
  .t2 { top: 1150px; transform: rotate(7deg); animation: tapeIn2 0.45s cubic-bezier(.2,.9,.3,1) 0.2s both; }
  @keyframes tapeIn1 { from { transform: translateX(-1500px) rotate(-9deg); } to { transform: rotate(-9deg); } }
  @keyframes tapeIn2 { from { transform: translateX(1500px) rotate(7deg); } to { transform: rotate(7deg); } }
  .case { position: absolute; left: 0; right: 0; top: 470px; text-align: center; z-index: 5; }
  .case-label { font: 44px 'Special Elite', monospace; color: #bbb; letter-spacing: 0.2em; animation: fadeIn 0.4s ease ${s(T[0])} both; }
  .case-num { display: inline-block; margin-top: 10px; font: 126px 'Special Elite', monospace; color: #f2f2f2; white-space: nowrap;
    animation: typeW 0.9s steps(12) ${s(T[0] + 0.1)} both; }
  @keyframes typeW { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
  .clock { margin-top: 30px; font: 150px 'Share Tech Mono', monospace; color: #ff3b3b; text-shadow: 0 0 30px rgba(255,59,59,0.6);
    animation: slamIn 0.35s cubic-bezier(.2,.9,.3,1.3) ${s(T[1])} both, tick 1s steps(1) ${s(T[1] + 0.8)} infinite; }
  @keyframes tick { 50% { opacity: 0.55; } }
  .missing { display: inline-block; margin-top: 40px; padding: 14px 40px; border: 8px solid #e01e1e; color: #e01e1e; font: 700 74px 'Oswald', sans-serif; letter-spacing: 0.08em; transform: rotate(-6deg);
    animation: stamp 0.35s cubic-bezier(.2,.9,.3,1.2) ${s(T[2] + 0.4)} both; }`,
    html: `
  <div class="tape t1"><span>NÃO ULTRAPASSE · CENA DO CRIME · NÃO ULTRAPASSE · CENA DO CRIME · NÃO ULTRAPASSE · CENA DO CRIME ·</span></div>
  <div class="tape t2"><span>CENA DO CRIME · NÃO ULTRAPASSE · CENA DO CRIME · NÃO ULTRAPASSE · CENA DO CRIME · NÃO ULTRAPASSE ·</span></div>
  <div class="case">
    <div class="case-label">TERÇA-FEIRA</div>
    <div class="case-num">CASO Nº 0417</div>
    <div class="clock">21:14</div>
    <div class="missing">DESAPARECIDO</div>
  </div>` }),

  2: T => ({ css: `
  .dossier { position: absolute; left: 110px; top: 250px; width: 860px; height: 900px; background: #e9dfc7; transform: rotate(-2deg);
    box-shadow: 0 30px 70px rgba(0,0,0,0.7); padding: 60px 64px; font-family: 'Special Elite', monospace; color: #2b2b2b;
    animation: slideIn 0.5s cubic-bezier(.2,.8,.3,1) 0.05s both; }
  @keyframes slideIn { from { transform: translateY(160px) rotate(4deg); opacity: 0; } to { transform: rotate(-2deg); opacity: 1; } }
  .d-head { font-size: 40px; letter-spacing: 0.12em; border-bottom: 3px solid #2b2b2b; padding-bottom: 16px; }
  .d-top { display: flex; gap: 40px; margin-top: 40px; }
  .polaroid { width: 270px; background: #fff; padding: 16px 16px 50px; box-shadow: 0 8px 20px rgba(0,0,0,0.35); transform: rotate(3deg); position: relative; }
  .polaroid .ph { height: 250px; background: #cfcfcf; padding: 30px; }
  .polaroid .q { position: absolute; left: 0; right: 0; bottom: 6px; text-align: center; font-size: 30px; }
  .clip { position: absolute; top: -26px; left: 110px; width: 50px; height: 70px; border: 7px solid #8a8a8a; border-radius: 20px; }
  .d-id { font-size: 38px; line-height: 1.5; }
  .d-id b { font-weight: normal; color: #7a1a1a; }
  .fields { margin-top: 56px; display: flex; flex-direction: column; gap: 34px; }
  .field { display: flex; align-items: center; justify-content: space-between; font-size: 44px; border-bottom: 2px dashed #8b7d60; padding-bottom: 14px; }
  .yes { color: #b01515; border: 5px solid #b01515; padding: 2px 20px; transform: rotate(-5deg); font-family: 'Oswald', sans-serif; font-weight: 700; letter-spacing: 0.06em; }
  .f1 { animation: fadeIn 0.3s ease ${s(T[0])} both; } .f1 .yes { animation: stamp 0.3s cubic-bezier(.2,.9,.3,1.2) ${s(T[0] + 0.45)} both; }
  .f2 { animation: fadeIn 0.3s ease ${s(T[1])} both; } .f2 .yes { animation: stamp 0.3s cubic-bezier(.2,.9,.3,1.2) ${s(T[1] + 0.35)} both; }
  .f3 { animation: fadeIn 0.3s ease ${s(T[2])} both; } .f3 .yes { animation: stamp 0.3s cubic-bezier(.2,.9,.3,1.2) ${s(T[2] + 0.6)} both, glowR 1.4s ease-in-out ${s(T[2] + 1.2)} infinite; }
  @keyframes glowR { 0%, 100% { box-shadow: 0 0 0 rgba(176,21,21,0); } 50% { box-shadow: 0 0 26px rgba(176,21,21,0.55); } }`,
    html: `
  <div class="dossier">
    <div class="d-head">FICHA · CASO Nº 0417</div>
    <div class="d-top">
      <div class="polaroid"><div class="clip"></div><div class="ph">${SVG.user}</div><div class="q">identidade: ?</div></div>
      <div class="d-id">Nome: <b>desconhecido</b><br>Perfil: <b>cliente em potencial</b><br>Visto: <b>pelo celular</b></div>
    </div>
    <div class="fields">
      <div class="field f1">Tinha um problema <span class="yes">SIM</span></div>
      <div class="field f2">Tinha dinheiro <span class="yes">SIM</span></div>
      <div class="field f3">Pronto pra contratar <span class="yes">SIM</span></div>
    </div>
  </div>` }),

  3: T => ({ css: `
  .board { position: absolute; left: 0; right: 0; top: 230px; display: flex; flex-direction: column; align-items: center; }
  .stamp-time { font: 170px 'Share Tech Mono', monospace; color: #ff3b3b; text-shadow: 0 0 34px rgba(255,59,59,0.55); white-space: nowrap; }
  .hm { display: inline-block; animation: slamIn 0.35s cubic-bezier(.2,.9,.3,1.3) ${s(T[0])} both; }
  .ss { display: inline-block; animation: slamIn 0.35s cubic-bezier(.2,.9,.3,1.3) ${s(T[1])} both, tick 1s steps(1) ${s(T[1] + 0.9)} infinite; }
  @keyframes tick { 50% { opacity: 0.5; } }
  .photo { position: relative; margin-top: 50px; background: #fff; padding: 22px 22px 80px; transform: rotate(-3deg); box-shadow: 0 30px 70px rgba(0,0,0,0.7);
    animation: slideIn 0.5s cubic-bezier(.2,.8,.3,1) 0.1s both; }
  @keyframes slideIn { from { transform: translateY(160px) rotate(4deg); opacity: 0; } to { transform: rotate(-3deg); opacity: 1; } }
  .pin { position: absolute; top: -18px; left: 50%; margin-left: -18px; width: 36px; height: 36px; border-radius: 50%; background: #d11; box-shadow: 0 4px 0 #700; }
  .photo .cap { position: absolute; left: 0; right: 0; bottom: 22px; text-align: center; font: 30px 'Special Elite', monospace; color: #333; white-space: nowrap; }
  .phone { width: 380px; height: 640px; border-radius: 52px; background: #111; padding: 14px; filter: grayscale(0.4) contrast(1.1); }
  .screen { position: relative; height: 100%; border-radius: 40px; background: #1d1d1d; overflow: hidden; }
  .site { position: absolute; inset: 0; background: #f4f4f4; padding: 70px 28px; display: flex; flex-direction: column; gap: 22px; animation: fadeIn 0.35s ease ${s(T[2] + 0.5)} both; }
  .site i { display: block; height: 18px; background: #cfcfcf; border-radius: 6px; }
  .site .big { height: 120px; background: #bdbdbd; }
  .spinner { position: absolute; left: 50%; top: 50%; width: 90px; height: 90px; margin: -45px; border-radius: 50%; border: 10px solid #444; border-top-color: #ddd; animation: rot 0.9s linear 0.3s infinite; }
  @keyframes rot { to { transform: rotate(360deg); } }`,
    html: `
  <div class="board">
    <div class="stamp-time"><span class="hm">21:14</span><span class="ss">:03</span></div>
    <div class="photo"><div class="pin"></div>
      <div class="phone"><div class="screen"><div class="spinner"></div>
        <div class="site"><i class="big"></i><i style="width:90%"></i><i style="width:70%"></i><i style="width:80%"></i><i class="big"></i><i style="width:60%"></i></div>
      </div></div>
      <div class="cap">evidência A · o seu site</div>
    </div>
  </div>` }),

  4: T => ({ css: `
  .cards { position: absolute; left: 90px; right: 90px; top: 260px; display: flex; flex-direction: column; gap: 84px; }
  .card { position: relative; background: #e9dfc7; padding: 34px 44px 56px; box-shadow: 0 20px 50px rgba(0,0,0,0.6); font-family: 'Special Elite', monospace; color: #2b2b2b; }
  .card small { display: block; font-size: 30px; letter-spacing: 0.16em; color: #6b5e45; }
  .card div { margin-top: 10px; font-size: 62px; line-height: 1.1; }
  .c1 { transform: rotate(-2deg); animation: dropC 0.4s cubic-bezier(.2,.8,.3,1) ${s(T[0])} both; }
  .c2 { transform: rotate(1.5deg); animation: dropC 0.4s cubic-bezier(.2,.8,.3,1) ${s(T[1])} both; }
  .c3 { transform: rotate(-1deg); animation: dropC 0.4s cubic-bezier(.2,.8,.3,1) ${s(T[2])} both; }
  @keyframes dropC { from { opacity: 0; translate: 0 -80px; } to { opacity: 1; translate: 0 0; } }
  .nf { position: absolute; right: 24px; bottom: -40px; padding: 6px 22px; border: 6px solid #d11; color: #d11; font: 700 46px 'Oswald', sans-serif; letter-spacing: 0.05em; background: rgba(233,223,199,0.85); transform: rotate(-10deg); }
  .c1 .nf { animation: stamp 0.28s cubic-bezier(.2,.9,.3,1.2) ${s(T[3])} both; }
  .c2 .nf { animation: stamp 0.28s cubic-bezier(.2,.9,.3,1.2) ${s(T[3] + 0.18)} both; }
  .c3 .nf { animation: stamp 0.28s cubic-bezier(.2,.9,.3,1.2) ${s(T[3] + 0.36)} both; }
  .redflash { position: absolute; inset: 0; background: rgba(200,0,0,0.0); z-index: 6; animation: flash 0.5s ease-out ${s(T[3])} both; }
  @keyframes flash { 0% { background: rgba(200,0,0,0); } 20% { background: rgba(200,0,0,0.35); } 100% { background: rgba(200,0,0,0); } }`,
    html: `
  <div class="cards">
    <div class="card c1"><small>EVIDÊNCIA 1</small><div>O que você faz?</div><span class="nf">NÃO ENCONTRADO</span></div>
    <div class="card c2"><small>EVIDÊNCIA 2</small><div>Onde você atende?</div><span class="nf">NÃO ENCONTRADO</span></div>
    <div class="card c3"><small>EVIDÊNCIA 3</small><div>Como falar com você?</div><span class="nf">NÃO ENCONTRADO</span></div>
  </div>
  <div class="redflash"></div>` }),

  5: T => ({ css: `
  .board { position: absolute; left: 0; right: 0; top: 260px; display: flex; flex-direction: column; align-items: center; }
  .stamp-time { font: 170px 'Share Tech Mono', monospace; color: #ff3b3b; text-shadow: 0 0 34px rgba(255,59,59,0.55); white-space: nowrap; }
  .hm { display: inline-block; animation: slamIn 0.35s cubic-bezier(.2,.9,.3,1.3) ${s(T[0])} both; }
  .ss { display: inline-block; animation: slamIn 0.35s cubic-bezier(.2,.9,.3,1.3) ${s(T[1])} both, tick 1s steps(1) ${s(T[1] + 0.9)} infinite; }
  @keyframes tick { 50% { opacity: 0.5; } }
  .gbar { margin-top: 90px; width: 880px; height: 120px; border-radius: 60px; background: #fff; display: flex; align-items: center; gap: 24px; padding: 0 44px;
    font: 500 48px 'Manrope', sans-serif; color: #202124; box-shadow: 0 20px 60px rgba(0,0,0,0.6); animation: fadeIn 0.4s ease ${s(T[2])} both; }
  .gtext { white-space: nowrap; overflow: hidden; width: 0; animation: typeW 0.8s steps(23) ${s(T[2] + 0.3)} both; }
  @keyframes typeW { to { width: 560px; } }
  .backarrow { margin-top: 70px; width: 260px; height: 260px; color: #ff3b3b; animation: slamIn 0.35s cubic-bezier(.2,.9,.3,1.3) ${s(T[2])} both, nudgeL 1s ease-in-out ${s(T[2] + 0.6)} infinite; }
  @keyframes nudgeL { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-24px); } }
  .redflash { position: absolute; inset: 0; z-index: 6; animation: flash 0.6s ease-out ${s(T[2])} both; }
  @keyframes flash { 0% { background: rgba(200,0,0,0); } 20% { background: rgba(200,0,0,0.35); } 100% { background: rgba(200,0,0,0); } }`,
    html: `
  <div class="board">
    <div class="stamp-time"><span class="hm">21:14</span><span class="ss">:06</span></div>
    <div class="backarrow">${SVG.back}</div>
    <div class="gbar">${SVG.search}<span class="gtext">eletricista em campinas</span></div>
  </div>
  <div class="redflash"></div>` }),

  6: T => ({ css: `
  .cam { position: absolute; left: 70px; right: 70px; top: 220px; height: 1000px; border: 4px solid rgba(255,255,255,0.5); overflow: hidden;
    background: radial-gradient(ellipse at 50% 50%, #26302a 0%, #0c110e 80%); animation: fadeIn 0.3s ease 0.05s both; }
  .cam-hud { position: absolute; left: 30px; top: 24px; font: 40px 'Share Tech Mono', monospace; color: #e8e8e8; display: flex; gap: 20px; align-items: center; z-index: 3; }
  .rec { width: 26px; height: 26px; border-radius: 50%; background: #ff2b2b; animation: tick2 1s steps(1) 0.8s infinite; }
  @keyframes tick2 { 50% { opacity: 0; } }
  .cam-time { position: absolute; right: 30px; bottom: 24px; font: 40px 'Share Tech Mono', monospace; color: #e8e8e8; z-index: 3; }
  .cross { position: absolute; left: 50%; top: 50%; width: 140px; height: 140px; margin: -70px; border: 3px solid rgba(255,255,255,0.35); border-radius: 50%; z-index: 3; animation: aim 3s ease-in-out 0.8s infinite; }
  @keyframes aim { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(40px, 60px); } }
  .rphone { position: absolute; left: 50%; top: 110px; width: 420px; height: 760px; margin-left: -210px; border-radius: 56px; background: #050505; padding: 14px;
    filter: grayscale(0.6) contrast(1.1) brightness(0.9) sepia(0.25); animation: zoomCam 6s ease-in-out 0.2s both; }
  @keyframes zoomCam { from { transform: scale(0.92); } to { transform: scale(1.04); } }
  .rs { height: 100%; border-radius: 44px; background: #f8fafc; padding: 70px 30px; display: flex; flex-direction: column; gap: 24px; font-family: 'Manrope', sans-serif; }
  .rs .h { font-size: 48px; font-weight: 900; line-height: 1.05; color: #0f172a; }
  .rs .l { font-size: 28px; font-weight: 700; color: #0891b2; }
  .rs .im { height: 200px; border-radius: 20px; background: #cbd5e1; }
  .rs .b { display: flex; align-items: center; justify-content: center; gap: 12px; border-radius: 20px; padding: 24px 0; background: #16a34a; color: #fff; font-size: 34px; font-weight: 900; }
  .closed { position: absolute; left: 50%; top: 380px; margin-left: -360px; width: 720px; text-align: center; padding: 18px 0; border: 10px solid #e01e1e; color: #e01e1e;
    background: rgba(12,17,14,0.88); font: 700 76px 'Oswald', sans-serif; line-height: 1.05; letter-spacing: 0.04em; transform: rotate(-8deg); z-index: 4;
    animation: stamp 0.35s cubic-bezier(.2,.9,.3,1.2) ${s(T[1] + 0.3)} both; }
  .closed small { display: block; font: 54px 'Share Tech Mono', monospace; }`,
    html: `
  <div class="cam">
    <div class="cam-hud"><span class="rec"></span>CAM 02 · REC</div>
    <div class="cross"></div>
    <div class="rphone"><div class="rs">
      <div class="h">Eletricista em Campinas</div><div class="l">Atendimento no mesmo dia</div><div class="im"></div>
      <div class="b">${SVG.wa}WhatsApp</div>
    </div></div>
    <div class="closed">NEGÓCIO FECHADO<small>21:31</small></div>
    <div class="cam-time">TER 21:31:07</div>
  </div>` }),

  7: T => ({ css: `
  .folder { position: absolute; left: 120px; top: 330px; width: 840px; height: 760px; background: #c9a868; border-radius: 0 18px 18px 18px; box-shadow: 0 30px 70px rgba(0,0,0,0.7);
    transform: rotate(-3deg); animation: slideIn 0.5s cubic-bezier(.2,.8,.3,1) 0.05s both; }
  @keyframes slideIn { from { transform: translateY(160px) rotate(3deg); opacity: 0; } to { transform: rotate(-3deg); opacity: 1; } }
  .tab { position: absolute; left: 0; top: -70px; width: 330px; height: 76px; background: #c9a868; border-radius: 18px 18px 0 0; }
  .label { position: absolute; left: 70px; top: 90px; right: 70px; background: #f3ecd9; padding: 30px 40px; font: 54px 'Special Elite', monospace; color: #2b2b2b; line-height: 1.4; }
  .ghost { position: absolute; left: 290px; top: 380px; width: 260px; background: #fff; padding: 14px 14px 46px; transform: rotate(5deg); box-shadow: 0 8px 20px rgba(0,0,0,0.35);
    animation: fadeGhost 2.2s ease-in ${s(T[1] + 0.2)} both; }
  .ghost .ph { height: 240px; background: #cfcfcf; padding: 28px; }
  @keyframes fadeGhost { from { opacity: 1; filter: none; } to { opacity: 0.08; filter: blur(3px); } }
  .archived { position: absolute; left: 140px; top: 560px; padding: 14px 40px; border: 12px solid #e01e1e; color: #e01e1e; font: 700 120px 'Oswald', sans-serif; letter-spacing: 0.06em;
    transform: rotate(-12deg); z-index: 4; animation: stamp 0.35s cubic-bezier(.2,.9,.3,1.2) ${s(T[0] + 0.6)} both; }
  .dust { position: absolute; width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.35); animation: dust 4s linear infinite; z-index: 5; }
  @keyframes dust { from { transform: translateY(0); opacity: 0; } 20% { opacity: 1; } to { transform: translateY(-300px); opacity: 0; } }`,
    html: `
  <div class="folder"><div class="tab"></div>
    <div class="label">CASO Nº 0417<br>Cliente desaparecido</div>
    <div class="ghost"><div class="ph">${SVG.user}</div></div>
    <div class="archived">ARQUIVADO</div>
  </div>
  ${[[200, 1.0], [420, 1.8], [640, 1.3], [820, 2.4], [330, 2.9]].map(([x, d]) => `<div class="dust" style="left:${x}px; top:${1100 - (x % 300)}px; animation-delay:${d}s"></div>`).join('')}` }),

  8: T => ({ css: `
  .cta { position: absolute; inset: 0; background: #0f172a; font-family: 'Manrope', sans-serif; display: flex; flex-direction: column; justify-content: center; padding: 100px 90px 100px 100px; z-index: 2; }
  .cta-dots { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(248,250,252,0.05) 1.5px, transparent 1.5px); background-size: 48px 48px; }
  .cta-blob { position: absolute; top: -120px; right: -160px; width: 800px; height: 800px; background: radial-gradient(circle, rgba(6,182,212,0.22) 0%, transparent 62%); animation: breathe 4s ease-in-out 0.9s infinite; }
  @keyframes breathe { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.08); } }
  .cta-accent { position: absolute; left: 0; top: 0; width: 8px; height: 100%; background: linear-gradient(180deg, #06b6d4, #6366f1); }
  .eyebrow { position: relative; align-self: flex-start; font: 34px 'Special Elite', monospace; color: #e01e1e; border: 5px solid #e01e1e; padding: 8px 24px; transform: rotate(-3deg); animation: stamp 0.3s ease ${s(T[0])} both; }
  .cta h2 { position: relative; margin-top: 56px; font-size: 100px; font-weight: 900; letter-spacing: -0.04em; line-height: 1.04; color: #f8fafc; animation: fadeUp 0.5s ease ${s(T[0] + 0.1)} both; }
  .cta h2 em { font-style: normal; background: linear-gradient(90deg, #06b6d4, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .cta p { position: relative; margin-top: 52px; font-size: 56px; font-weight: 600; line-height: 1.36; color: #94a3b8; animation: fadeUp 0.5s ease ${s(T[1])} both; }
  .cta p strong { color: #f8fafc; font-weight: 900; }
  .inv { position: relative; margin-top: 30px; font-size: 76px; font-weight: 900; color: #f8fafc; letter-spacing: -0.03em; animation: fadeUp 0.45s ease ${s(T[2])} both; }
  .handle { position: relative; margin-top: 80px; font-size: 46px; font-weight: 800; color: #f8fafc; animation: fadeUp 0.5s ease ${s(T[2] + 0.4)} both; }
  .handle i { font-style: normal; color: #06b6d4; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: none; } }`,
    html: `
  <div class="cta">
    <div class="cta-dots"></div><div class="cta-blob"></div><div class="cta-accent"></div>
    <div class="eyebrow">CASO Nº 0418 · ABERTO</div>
    <h2>Quantos clientes <em>sumiram assim</em> esta semana?</h2>
    <p><strong>Mande o link do seu site no direct.</strong></p>
    <div class="inv">Eu investigo.</div>
    <div class="handle"><i>@</i>adrianomaringolo.dev</div>
  </div>` }),
};

function sceneHtml(scene, dur, captions, T) {
  const v = VISUAL[scene.id](T);
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Special+Elite&family=Share+Tech+Mono&family=Manrope:wght@500;600;700;800;900&display=swap" rel="stylesheet">
<style>
  /* Reel fora da identidade da marca (criatividade: Ousado), estética de documentário policial.
     Toda animação fica em elemento real (o export faz scrub via querySelectorAll('*')). */
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1080px; height: 1920px; overflow: hidden; background: #0a0a0a; }
  .stage { position: relative; width: 1080px; height: 1920px; overflow: hidden;
    background: radial-gradient(ellipse at 50% 38%, #1c1c1c 0%, #0a0a0a 65%, #000 100%); }
  .grain { position: absolute; inset: -60px; z-index: 30; pointer-events: none; opacity: 0.14;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
    animation: grain 0.5s steps(4) 0s infinite; }
  @keyframes grain { 0% { transform: translate(0, 0); } 25% { transform: translate(-30px, 20px); } 50% { transform: translate(20px, -30px); } 75% { transform: translate(-20px, -10px); } 100% { transform: translate(0, 0); } }
  .vignette { position: absolute; inset: 0; z-index: 29; pointer-events: none; background: radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(0,0,0,0.75) 100%); }
  .flicker { position: absolute; inset: 0; z-index: 28; pointer-events: none; background: #fff; animation: flick 3.1s steps(1) 0.6s infinite; opacity: 0; }
  @keyframes flick { 0%, 100% { opacity: 0; } 47% { opacity: 0.035; } 49% { opacity: 0; } 83% { opacity: 0.025; } 84% { opacity: 0; } }
  .cutin { position: absolute; inset: 0; z-index: 31; background: #000; animation: cutIn 0.25s ease-out 0s both; }
  @keyframes cutIn { from { opacity: 1; } to { opacity: 0; } }
  .hud { position: absolute; left: 70px; right: 70px; top: 110px; display: flex; justify-content: space-between; z-index: 20;
    font: 34px 'Share Tech Mono', monospace; color: rgba(255,255,255,0.55); letter-spacing: 0.08em; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slamIn { 0% { opacity: 0; transform: scale(1.6); } 100% { opacity: 1; transform: scale(1); } }
  @keyframes stamp { 0% { opacity: 0; scale: 2.2; } 70% { opacity: 1; scale: 0.95; } 100% { opacity: 1; scale: 1; } }
  ${v.css}

  /* legenda de documentário */
  .captions { position: absolute; left: 70px; right: 150px; top: 1300px; height: 280px; z-index: 20; }
  .phrase { position: absolute; inset: 0; display: flex; flex-wrap: wrap; align-content: center; justify-content: center; column-gap: 20px; row-gap: 2px; text-align: center; }
  .w { display: inline-block; font: 700 84px 'Oswald', sans-serif; line-height: 1.12; text-transform: uppercase; color: #fff;
    -webkit-text-stroke: 10px #000; paint-order: stroke fill; letter-spacing: 0.01em; }
${captions.css}
</style>
</head>
<body data-duration="${dur}">
<div class="stage">
  ${scene.id < 8 ? `<div class="hud"><span>CASO Nº 0417</span><span>ARQUIVO ${String(scene.id).padStart(2, '0')}/07</span></div>` : ''}
${v.html}
  <div class="captions">
${captions.html}  </div>
  <div class="flicker"></div>
  <div class="vignette"></div>
  <div class="grain"></div>
  <div class="cutin"></div>
</div>
</body>
</html>
`;
}

// ── Build ────────────────────────────────────────────────────────────────────
const metaPath = path.join(DIR, 'meta.json');
const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
meta.scenes = [];

for (const scene of SCENES) {
  const nn = String(scene.id).padStart(2, '0');
  const audio = path.join(VOZ, `cena-${nn}.mp3`);
  const aDur = probeDuration(audio);
  const segs = speechSegments(audio, aDur);
  const need = Math.max(...scene.phrases.flatMap(p => p.segs)) + 1;
  if (segs.length < need) throw new Error(`cena ${scene.id}: ${segs.length} trechos de fala, roteiro pede ${need}`);
  const dur = +(VOICE_DELAY + aDur + TAIL + (scene.extraTail || 0)).toFixed(2);
  const T = scene.phrases.map(p => VOICE_DELAY + segs[p.segs[0]][0]);
  const captions = scene.noCaptions ? { css: '', html: '' } : captionsFor(scene, segs, dur, { voiceDelay: VOICE_DELAY, hi: '#ffd400' });
  const file = `scene-${nn}.html`;
  fs.writeFileSync(path.join(DIR, file), sceneHtml(scene, dur, captions, T));
  meta.scenes.push({
    file, title: scene.title, duration: dur,
    voice: `voz/cena-${nn}.mp3`, voiceDelay: VOICE_DELAY,
    description: scene.phrases.map(p => p.text).join(' '),
  });
  console.log(`  ✅  ${file}  ${dur}s  (${segs.length} trechos de fala)`);
}
fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n');
console.log(`  total ${meta.scenes.reduce((a, s) => a + s.duration, 0).toFixed(1)}s`);
