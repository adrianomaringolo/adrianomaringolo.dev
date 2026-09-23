# Template `explicador-tecnico`

Explica **como uma coisa funciona** por dentro. O recurso visual é um diagrama ou uma
interface simulada em HTML/CSS — não uma foto, não um ícone solto. Fundo escuro com grid
e brilhos, estética de "console".

---

## Preview

<table>
<tr><td width="32%"><img src="previews/explicador-tecnico/slide-01.png" alt="Capa"></td><td width="32%"><img src="previews/explicador-tecnico/slide-02.png" alt="Interno"></td><td width="32%"><img src="previews/explicador-tecnico/slide-03.png" alt="Fecho"></td></tr>
<tr><td align="center"><b>Capa</b><br><sub>painel de interface simulada</sub></td><td align="center"><b>Interno</b><br><sub>fluxo de etapas</sub></td><td align="center"><b>Fecho</b><br><sub>CTA para a próxima parte</sub></td></tr>
</table>

Conteúdo placeholder. O HTML que gera estas imagens está em `previews/explicador-tecnico/` — edite e rode
`node scripts/export-templates.mjs explicador-tecnico` para regerar.

---

## Quando usar

- "Como a IA escolhe a próxima palavra", "o que é um agente", "como funciona um LLM".
- Desmontar um mecanismo que o público acha mágico.
- Pilares 1 (educação) e 4 (autoridade técnica).
- Séries: quando o post faz parte de uma sequência, o rótulo `series` no topo marca isso.

---

## Estrutura de slides

| Slide | Papel | Tema |
|---|---|---|
| 01 | Capa: a pergunta + o diagrama-chave | Escuro `#0a1226` |
| 02 | A intuição errada que todo mundo tem | Claro `#f5f7fa` |
| 03 a N-2 | O mecanismo, uma etapa por slide | Claro (diagramas) |
| N-1 | O que isso muda na prática pra você | Claro |
| N | CTA | Escuro `#0f172a` |

Faixa: **6 a 9 slides**.

### Post único

Quando o diagrama se explica sozinho, este template cabe em **1 slide**: painel simulado no
centro, headline curta acima, nota de uma linha abaixo. `"type": "single"`, sem progress
dots, o desdobramento vive na legenda. Ver `post-12`.

---

## Capa

```css
body { width: 1080px; height: 1350px; overflow: hidden;
       background: #0a1226; font-family: 'Manrope', sans-serif; }

.bg-grid { position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px);
  background-size: 54px 54px; }
.bg-glow     { position: absolute; top: -200px; right: -160px; width: 720px; height: 720px;
  background: radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%); }
.bg-glow-low { position: absolute; bottom: -220px; left: -180px; width: 700px; height: 700px;
  background: radial-gradient(circle, rgba(99,102,241,0.16) 0%, transparent 70%); }
```

### Marcador de série

```html
<div class="series">
  <div class="series-dot"></div>
  <span class="series-label">IA para humanos · 3 de 5</span>
</div>
```

### Painel de interface simulada

O coração do template: uma "caixa" que imita uma tela real (prompt, lista de tokens com
probabilidade, barras de confiança). Exemplo do `post-12`:

```html
<div class="panel">
  <div class="prompt">O gato subiu no <span class="blank">___</span></div>
  <div class="rows">
    <div class="row pick">
      <span class="word">telhado</span>
      <span class="track"><span class="fill" style="width:62%"></span></span>
      <span class="pct">62%</span>
      <span class="tag">escolhida</span>
    </div>
    <!-- mais linhas -->
  </div>
  <div class="loop">e então repete <span class="sep">·</span> palavra <span class="sep">·</span> por palavra</div>
</div>
```

```css
.panel { background: rgba(15,23,42,0.72); border: 1.5px solid rgba(148,163,184,0.18);
  border-radius: 24px; padding: 40px 44px; backdrop-filter: blur(2px); }
.prompt { font-size: 38px; font-weight: 700; color: #e2e8f0; margin-bottom: 32px; }
.blank  { color: #06b6d4; border-bottom: 3px solid #06b6d4; padding: 0 12px; }
.row    { display: flex; align-items: center; gap: 18px; margin-bottom: 18px; }
.word   { width: 240px; font-size: 28px; font-weight: 700; color: #cbd5e1; }
.track  { flex: 1; height: 18px; border-radius: 9px; background: rgba(148,163,184,0.16); }
.fill   { display: block; height: 100%; border-radius: 9px;
          background: linear-gradient(90deg, #06b6d4, #6366f1); }
.pct    { width: 84px; font-size: 26px; font-weight: 800; color: #f1f5f9; text-align: right; }
.row.pick .word { color: #f1f5f9; }
.tag    { font-size: 15px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          color: #06b6d4; background: rgba(6,182,212,0.12); border-radius: 100px; padding: 6px 14px; }
```

---

## Slides internos

Base clara padrão, mas o protagonista é sempre um **diagrama**, não um bloco de texto:

- **Fluxo em etapas**: caixas conectadas por setas Lucide, uma etapa destacada em gradiente.
- **Antes/depois**: duas colunas, a da esquerda com borda `#e2e8f0`, a da direita com
  borda-esquerda `#0891b2`.
- **Camadas**: retângulos empilhados com deslocamento, cada um com rótulo.
- **Mito × realidade**: `card` cinza com o mito riscado, `highlight` com a realidade.

Regra: se um slide interno não tem elemento gráfico, ele provavelmente pode ser fundido
com o vizinho.

---

## Fecho

CTA escuro `#0f172a`. Neste template o CTA costuma convidar para a próxima parte da série
(quando houver) **antes** do link do site.

---

## Imagens

Nenhuma foto. Diagramas e interfaces são construídos em HTML/CSS/SVG inline.

Ícones: Lucide, path real, `stroke-width: 2`, um único conjunto por post.

---

## Escala tipográfica

| Elemento | Tamanho | Peso | Cor |
|---|---|---|---|
| `series-label` | 20–22px | 700 | `#94a3b8` |
| `headline` (capa) | 82–96px | 900 | `#f1f5f9` |
| `prompt` (painel) | 34–38px | 700 | `#e2e8f0` |
| `word` / rótulo de diagrama | 26–30px | 700 | `#cbd5e1` (escuro) / `#0f172a` (claro) |
| `headline` (interno) | 58–66px | 900 | `#0f172a` |
| `note` / ressalva | 22–24px | 500 | `#64748b` |

---

## Variações permitidas

- Painel simulado (padrão), fluxo de etapas ou camadas — conforme o mecanismo.
- Marcador de série entra só quando o post pertence a uma sequência.
- Capa pode ser clara se o diagrama ficar melhor sobre fundo claro; nesse caso mantenha
  `bg-dots` no lugar do grid.
- Slide de "ressalva honesta" (o que o modelo mental simplifica demais) é opcional mas
  recomendado.
- Densidade do grid ajustável entre 48px e 60px.

## Travas

- Analogia nunca vira mentira: se a simplificação distorce o mecanismo, não use.
- Um mecanismo por post. Não misture "como LLM funciona" com "como agente funciona".
- Sem jargão sem tradução: todo termo técnico ganha uma frase em linguagem de negócio.
- Números em barras/probabilidades são ilustrativos — rotule como exemplo quando não forem
  medidos.
- `background` escuro declarado no `body`.
- `accent-left` + `accent-top`, progress dots e handle em todos os slides.

---

## Posts de referência

`post-12` (a IA adivinha uma palavra por vez) — post único com painel simulado.

Cruzamentos: `post-04` (IA para humanos) e `post-05` (IA generativa) usam capa de
`foto-editorial` com slides internos no espírito deste template — combinação válida quando
existe uma foto forte para a capa.
