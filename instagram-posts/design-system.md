# Design System — Instagram Posts (Carrossel)

> Documento de referência para a skill `instagram-post`. Consulte antes de gerar qualquer slide.

---

## Dimensões e formato

| Propriedade | Valor |
|---|---|
| Largura | 1080px |
| Altura | 1350px |
| Formato | 4:5 (portrait) |
| Fonte | Manrope (Google Fonts) — pesos: 400, 500, 600, 700, 800, 900 |

---

## Paleta de cores

### Gradiente de marca (acento)
```css
cyan:   #06b6d4
indigo: #6366f1
gradient: linear-gradient(90deg, #06b6d4, #6366f1)   /* horizontal */
gradient: linear-gradient(180deg, #06b6d4, #6366f1)   /* vertical */
```

### Tema escuro (capa / slide-01)
```css
background:   #0a1226
text-primary: #f1f5f9
text-muted:   #cbd5e1
text-dim:     #475569
```

### Tema claro (slides internos)
```css
background:   #f5f7fa
text-primary: #0f172a
text-muted:   #475569
text-dim:     #64748b
border:       #e2e8f0
card-bg:      #ffffff
```

---

## Elementos recorrentes (todos os slides)

### Accent borders
Presentes em **todos** os slides.
```css
.accent-left {
  position: absolute; left: 0; top: 0; bottom: 0; width: 5px;
  background: linear-gradient(180deg, #06b6d4, #6366f1);
  z-index: 20;
}
.accent-top {
  position: absolute; top: 0; left: 0; right: 0; height: 5px;
  background: linear-gradient(90deg, #06b6d4, #6366f1);
  z-index: 20;
}
```

### Progress dots
Presentes em **todos** os slides. Centralizado horizontalmente, `bottom: 52px`.
```css
.progress { position: absolute; bottom: 52px; left: 0; right: 0;
  display: flex; justify-content: center; gap: 10px; z-index: 30; }
.dot { width: 28px; height: 6px; border-radius: 3px; background: rgba(255,255,255,0.18); }  /* escuro */
.dot { width: 28px; height: 6px; border-radius: 3px; background: #e2e8f0; }                  /* claro */
.dot.active { width: 48px; background: linear-gradient(90deg, #06b6d4, #6366f1); }
```
O número de dots deve corresponder ao total de slides do post. O slide atual recebe `.active`.

### Handle (@username)
Presente em **todos** os slides. `bottom: 44px; right: 72px`.
```css
.handle { position: absolute; bottom: 44px; right: 72px;
  font-size: 27px; font-weight: 700; color: #f1f5f9; z-index: 30; }  /* escuro */
.handle { position: absolute; bottom: 48px; right: 72px;
  font-size: 18px; font-weight: 700; color: #94a3b8; }                /* claro */
.handle em { font-style: normal; color: #06b6d4; }
```
HTML: `<div class="handle"><em>@</em>adrianomaringolo.dev</div>`

---

## Tipos de slide

### 1. Capa (slide-01) — PADRÃO OBRIGATÓRIO

**Tema escuro.** Foto de fundo com overlay gradiente escuro do topo. Conteúdo textual no topo, sobre a área escura. A foto aparece visualmente na metade inferior.

#### Estrutura HTML
```html
<div class="slide">
  <div class="bg-photo"></div>
  <div class="gradient-overlay"></div>
  <div class="accent-left"></div>
  <div class="accent-top"></div>

  <div class="content">
    <div class="eyebrow">CATEGORIA DO POST</div>

    <h1 class="headline">
      <span class="headline-kicker">kicker / sub-headline</span>
      Headline <span class="headline-gradient">principal</span>
    </h1>

    <p class="subtitle">Frase de apoio que complementa o headline.</p>

    <div class="arrow">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
      </svg>
    </div>
  </div>

  <div class="progress"><!-- dots --></div>
  <div class="handle"><em>@</em>adrianomaringolo.dev</div>
</div>
```

#### CSS da capa
```css
body { width: 1080px; height: 1350px; overflow: hidden;
       background: #0a1226; font-family: 'Manrope', sans-serif; }

.bg-photo {
  position: absolute; inset: 0;
  background: url('bg-cover.jpg') center center / cover no-repeat;
}

.gradient-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(10, 18, 38, 1.00)  0%,
    rgba(10, 18, 38, 0.97) 22%,
    rgba(10, 18, 38, 0.90) 38%,
    rgba(10, 18, 38, 0.78) 52%,
    rgba(10, 18, 38, 0.65) 66%,
    rgba(10, 18, 38, 0.55) 80%,
    rgba(10, 18, 38, 0.50) 100%
  );
}

.content {
  position: absolute; top: 0; left: 0; right: 0; z-index: 10;
  padding: 88px 80px 0 88px;
  display: flex; flex-direction: column; gap: 20px;
}

.eyebrow {
  font-size: 22px; font-weight: 700;
  letter-spacing: 0.13em; text-transform: uppercase;
  color: #475569;
}

.headline {
  font-size: 102px; font-weight: 900;
  line-height: 1.0; letter-spacing: -0.03em;
  color: #f1f5f9;
}

.headline-kicker {
  display: block;
  font-size: 48px; font-weight: 700; letter-spacing: -0.01em;
  color: #06b6d4;
  margin-bottom: 10px;
}

.headline-gradient {
  background: linear-gradient(90deg, #06b6d4, #6366f1);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 39px; font-weight: 500;
  color: #cbd5e1; line-height: 1.5;
  max-width: 820px;
}
```

#### Imagem de fundo
- Arquivo: `bg-cover.jpg` (ou `.png`) dentro da pasta do post
- Path relativo no HTML: `url('bg-cover.jpg')`
- Posicionamento padrão: `center center / cover`
- A imagem deve ser fotográfica — pessoa, ambiente ou objeto relacionado ao tema
- O overlay escuro garante legibilidade — não use fotos já muito escuras

---

### 2. Slides internos — Tema claro

Slides de conteúdo (razões, conceitos, exemplos, listas). Fundo `#f5f7fa` com decoração sutil.

#### Elementos decorativos de fundo
```css
.blob-1 { position: absolute; top: -80px; right: -100px; width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(8,145,178,0.08) 0%, transparent 70%); pointer-events: none; }
.blob-2 { position: absolute; bottom: -80px; left: -80px; width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%); pointer-events: none; }
.bg-dots { position: absolute; inset: 0;
  background-image: radial-gradient(circle, rgba(15,23,42,0.05) 1.5px, transparent 1.5px);
  background-size: 40px 40px; pointer-events: none; }
```

#### Tipografia interna
```css
.eyebrow { font-size: 16px; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; color: #0891b2; margin-bottom: 20px; }
.headline { font-size: 64px; font-weight: 900; line-height: 1.05;
  letter-spacing: -0.03em; color: #0f172a; margin-bottom: 48px; }
.headline em { font-style: normal;
  background: linear-gradient(90deg, #0891b2, #6366f1);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
```

#### Layout base (slides de conteúdo)
```css
.slide { width: 1080px; height: 1350px; position: relative;
  display: flex; flex-direction: column; justify-content: center;
  padding: 80px 80px 100px; }
```

#### Componentes de conteúdo disponíveis

**Card padrão** (destaque de item)
```html
<div class="card">
  <div class="card-label">RÓTULO</div>
  <div class="card-title">Título do item</div>
  <ul class="card-list">
    <li><span class="li-dot"></span>Detalhe</li>
  </ul>
</div>
```

**Highlight box** (callout com borda colorida)
```html
<div class="highlight">Frase de destaque ou takeaway do slide.</div>
```
```css
.highlight { background: #fff; border: 1.5px solid #e2e8f0;
  border-left: 4px solid #0891b2; border-radius: 16px;
  padding: 22px 28px; font-size: 27px; font-weight: 700; color: #0f172a; line-height: 1.4; }
```

**Note box** (citação ou observação com borda indigo)
```html
<p class="note">Observação ou nota importante.</p>
```
```css
.note { font-size: 24px; font-weight: 500; color: #64748b; line-height: 1.55;
  padding: 24px 28px; background: #fff;
  border-left: 4px solid #6366f1; border-radius: 0 12px 12px 0; }
```

**Conclusion box** (gradiente leve cyan→indigo)
```html
<div class="conclusion">Conclusão principal.
  <span>Complemento ou nuance da conclusão.</span>
</div>
```
```css
.conclusion { font-size: 26px; font-weight: 700; color: #0f172a; line-height: 1.5;
  padding: 28px 32px;
  background: linear-gradient(135deg, #f0f9ff 0%, #ede9fe 100%);
  border-radius: 16px; border: 1.5px solid #e0f2fe; }
.conclusion span { display: block; font-size: 19px; font-weight: 500; color: #64748b; margin-top: 8px; }
```

**Counter line** (indicador de progresso em listas numeradas)
```html
<div class="counter">
  <div class="counter-line"></div>
  <span class="counter-text">RAZÃO <span class="counter-num">01</span> / 05</span>
</div>
```
```css
.counter { display: flex; align-items: center; gap: 14px; }
.counter-line { width: 40px; height: 3px; background: linear-gradient(90deg, #0891b2, #6366f1); border-radius: 2px; }
.counter-text { font-size: 16px; font-weight: 700; color: #94a3b8; letter-spacing: 0.1em; text-transform: uppercase; }
.counter-num { color: #0891b2; }
```

---

### 3. Slide CTA (último slide) — Tema escuro

Fundo escuro `#0f172a`. Chamada para ação com URL do site.

```css
body { background: #0f172a; }
.slide { background: #0f172a; display: flex; flex-direction: column; padding: 80px 88px 100px; }
.blob-1 { background: radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%); }
.blob-2 { background: radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%); }
.bg-dots { background-image: radial-gradient(circle, rgba(248,250,252,0.04) 1.5px, transparent 1.5px); }
```

#### Componentes CTA
```html
<div class="label">
  <div class="label-dot"></div>
  <span class="label-text">Vamos conversar?</span>
</div>
<div class="headline">Título principal com <em>destaque</em></div>
<div class="sub">Frase de apoio clara e direta.</div>
<div class="cta-box">
  <div class="cta-label">me encontra aqui</div>
  <div class="cta-url">adrianomaringolo.dev</div>
</div>
```

```css
.label { display: inline-flex; align-items: center; gap: 10px; width: fit-content;
  background: rgba(6,182,212,0.10); border: 1.5px solid rgba(6,182,212,0.25);
  border-radius: 100px; padding: 10px 22px; }
.label-dot { width: 8px; height: 8px; background: #06b6d4; border-radius: 50%; }
.label-text { font-size: 15px; font-weight: 700; color: #06b6d4; letter-spacing: 0.1em; text-transform: uppercase; }
.headline { font-size: 86px; font-weight: 900; color: #f1f5f9; line-height: 1.0; letter-spacing: -0.03em; }
.headline em { font-style: normal;
  background: linear-gradient(90deg, #06b6d4 0%, #6366f1 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.sub { font-size: 32px; font-weight: 500; color: #64748b; line-height: 1.5; }
.cta-box { background: rgba(6,182,212,0.08); border: 1.5px solid rgba(6,182,212,0.22);
  border-radius: 22px; padding: 36px 42px; display: flex; flex-direction: column; gap: 10px; }
.cta-label { font-size: 16px; font-weight: 700; color: #64748b; letter-spacing: 0.08em; text-transform: uppercase; }
.cta-url { font-size: 50px; font-weight: 900; letter-spacing: -0.02em;
  background: linear-gradient(90deg, #06b6d4, #6366f1);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
```

---

## Estrutura de arquivos por post

```
instagram-posts/html/post-XX/
├── meta.json          # metadados do post (título, slides, caption, hashtags)
├── bg-cover.jpg       # imagem de fundo da capa (1080×1350 ou maior)
├── slide-01.html      # capa (tema escuro obrigatório)
├── slide-02.html      # conteúdo (tema claro)
├── ...
└── slide-NN.html      # CTA (tema escuro)
```

### meta.json
```json
{
  "title": "Título do post",
  "date": "YYYY-MM-DD",
  "type": "carousel",
  "format": "1080x1350",
  "slides": [
    { "file": "slide-01.html", "title": "Capa", "description": "Descrição breve" }
  ],
  "caption": "Texto da legenda do Instagram com emojis e quebras de linha",
  "hashtags": ["hashtag1", "hashtag2"]
}
```

---

## Regras de consistência

1. **Capa sempre escura** — slide-01 sempre usa o template de capa com tema escuro e foto de fundo.
2. **CTA sempre escuro** — último slide usa tema escuro `#0f172a`.
3. **Slides internos sempre claros** — fundo `#f5f7fa` com blobs e dots.
4. **Accent borders em todos os slides** — `.accent-left` e `.accent-top` sem exceção.
5. **Progress dots corretos** — quantidade de dots = número total de slides; o dot ativo muda por slide.
6. **Handle sempre presente** — `@adrianomaringolo.dev` em todos os slides.
7. **Paths de imagem relativos** — usar `url('bg-cover.jpg')` sem path absoluto.
8. **Fonte Manrope** — importar sempre via Google Fonts com pesos 400;500;600;700;800;900.
9. **Cor primária de acento**: `#06b6d4` (cyan) + `#6366f1` (indigo). Nunca usar tons diferentes.
10. **Hierarquia tipográfica na capa**: eyebrow (22px/uppercase) → headline-kicker (48px) → headline (102px) → subtitle (39px).
