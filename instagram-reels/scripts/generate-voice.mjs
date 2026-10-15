#!/usr/bin/env node
/**
 * Gera as falas de um reel com o ElevenLabs (text-to-speech).
 *
 * Usage:
 *   node scripts/generate-voice.mjs reel-10                       # todas as falas de html/reel-10/voz/falas.json
 *   node scripts/generate-voice.mjs reel-10 --only 1,3            # só as cenas 1 e 3
 *   node scripts/generate-voice.mjs reel-10 --takes 3             # 3 versões de cada (cena-01-take1.mp3 ...)
 *   node scripts/generate-voice.mjs reel-10 --voice-id <id>       # sobrescreve o voice_id do falas.json
 *   node scripts/generate-voice.mjs reel-10 --out <dir>           # salva em outra pasta (ex.: testes de voz)
 *
 * A chave vem de ELEVENLABS_API_KEY (ambiente ou instagram-reels/.env, fora do git).
 * Precisa só da permissão text_to_speech.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// ── .env ─────────────────────────────────────────────────────────────────────
const envPath = path.join(ROOT, '.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) { console.error('ELEVENLABS_API_KEY não definida (instagram-reels/.env).'); process.exit(1); }

// ── Args ─────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const reelId = args[0];
if (!reelId) { console.error('Usage: node scripts/generate-voice.mjs <reel-id> [--only 1,3] [--takes N] [--voice-id id] [--out dir]'); process.exit(1); }
const opt = name => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };

const vozDir = path.join(ROOT, 'html', reelId, 'voz');
const cfg = JSON.parse(fs.readFileSync(path.join(vozDir, 'falas.json'), 'utf8'));
const voiceId = opt('--voice-id') || cfg.voice_id;
if (!voiceId) { console.error('Defina voice_id no falas.json ou passe --voice-id.'); process.exit(1); }
const takes = parseInt(opt('--takes') || '1', 10);
const only = opt('--only')?.split(',').map(n => parseInt(n, 10));
const outDir = opt('--out') ? path.resolve(opt('--out')) : vozDir;
fs.mkdirSync(outDir, { recursive: true });

// ── Geração ──────────────────────────────────────────────────────────────────
async function tts(text) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'xi-api-key': API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, model_id: cfg.model, language_code: 'pt', voice_settings: cfg.voice_settings }),
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return Buffer.from(await res.arrayBuffer());
}

console.log(`\n🎙️  ${reelId} — voz ${voiceId} · ${cfg.model}\n`);
for (const [i, fala] of cfg.falas.entries()) {
  if (only && !only.includes(i + 1)) continue;
  for (let t = 1; t <= takes; t++) {
    const name = takes > 1 ? fala.file.replace(/\.mp3$/, `-take${t}.mp3`) : fala.file;
    try {
      fs.writeFileSync(path.join(outDir, name), await tts(fala.text));
      console.log(`  ✅  ${name}`);
    } catch (e) {
      console.error(`  ❌  ${name}: ${e.message}`);
      process.exitCode = 1;
    }
  }
}
console.log(`\n  Saída: ${path.relative(process.cwd(), outDir) || '.'}\n`);
