// Gera assets/logos/logo-horizontal*.svg: símbolo + "adrianomaringolo.dev" em curvas (Manrope 800 + 500, OFL).
// Uso: node marca/gerar-wordmark.mjs   (precisa de opentype.js; fontes em marca/fontes/)
import opentype from 'opentype.js'
import { readFileSync, writeFileSync } from 'node:fs'
const load = f => { const b = readFileSync(new URL(`./fontes/${f}`, import.meta.url)); return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)) }
const bold = load('manrope-latin-800-normal.woff'), reg = load('manrope-latin-500-normal.woff')
const SIZE = 230, GAP = 110, TRACK = -0.01 * SIZE
const xh = (bold.tables.os2.sxHeight / bold.unitsPerEm) * SIZE
const base = 270 + xh / 2
const run = (font, text, x) => {
  let d = ''
  for (const g of font.stringToGlyphs(text)) { d += g.getPath(x, base, SIZE).toPathData(1); x += g.advanceWidth * SIZE / font.unitsPerEm + TRACK }
  return { d, x }
}
const a = run(bold, 'adrianomaringolo', 540 + GAP)
const b = run(reg, '.dev', a.x)
const W = Math.ceil(b.x - TRACK)
const sym = readFileSync(new URL('../assets/logos/simbolo.svg', import.meta.url), 'utf8').match(/<g fill=.*<\/g>(?=<\/svg>)/s)[0]
const make = c => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} 540" role="img" aria-label="adrianomaringolo.dev">${sym.replaceAll('currentColor', c)}<path fill="${c}" d="${a.d}${b.d}"/></svg>\n`
const out = n => new URL(`../assets/logos/${n}`, import.meta.url)
writeFileSync(out('logo-horizontal.svg'), make('#1E3969'))
writeFileSync(out('logo-horizontal-negativo.svg'), make('#F5F7FA'))
writeFileSync(out('logo-horizontal-mono.svg'), make('currentColor'))
console.log('largura', W)
