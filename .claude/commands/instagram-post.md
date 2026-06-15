# Instagram Post Generator

Cria posts para o Instagram de Adriano Maringolo (@adrianomaringolo.dev) seguindo a identidade visual do portfolio.

## Como usar

```
/instagram-post <tema do post>
```

Exemplos:
- `/instagram-post dica de React sobre performance`
- `/instagram-post carrossel sobre Clean Code`
- `/instagram-post post único sobre minha stack favorita`

---

## O que este skill faz

1. Determina o próximo ID do post (`post-NN`) verificando `instagram-posts/html/`
2. Cria os arquivos HTML em `instagram-posts/html/post-NN/`
3. Cria o `meta.json` com título, data, slides, legenda e hashtags
4. Exporta os PNGs e gera `caption.md` em `instagram-posts/output/post-NN/`
5. Exibe os slides para revisão

---

## Estrutura de arquivos

```
instagram-posts/
  html/                          ← versionado no git
    post-01/
      meta.json                  ← metadados, legenda, hashtags
      slide-01.html
      slide-02.html
      ...
    post-02/
      meta.json
      slide-01.html
      ...
  output/                        ← gitignore (gerado pelo script)
    post-01/
      slide-01.png
      slide-02.png
      caption.md                 ← legenda pronta para copiar
    post-02/
      ...
  scripts/
    export.mjs
  package.json
```

### Como determinar o próximo ID

```bash
ls instagram-posts/html/   # ver post-01, post-02 etc.
# usar o próximo número disponível: post-02, post-03 ...
```

---

## Comando de exportação

```bash
# A partir da raiz do projeto:
node instagram-posts/scripts/export.mjs post-01

# Exportar só slides específicos:
node instagram-posts/scripts/export.mjs post-01 --slides 1,3
```

O script lê de `html/post-NN/`, escreve PNGs em `output/post-NN/` e gera `output/post-NN/caption.md`.

---

## Template de meta.json

```json
{
  "title": "Título do post",
  "date": "YYYY-MM-DD",
  "type": "carousel | single",
  "format": "1080x1350",
  "slides": [
    { "file": "slide-01.html", "title": "Nome do slide", "description": "O que contém" }
  ],
  "caption": "Legenda completa pronta para copiar...",
  "hashtags": ["tag1", "tag2"]
}
```

---

## Legenda (caption)

A legenda é o texto publicado no Instagram junto com o post. Deve:

- **Usar emojis** — enriquecem o engajamento e tornam o texto mais escaneável
- Começar com um emoji ou frase de impacto que prenda a atenção no feed
- Usar emojis como marcadores de lista (ex: `→ 🛠️ item`) ou pontuação visual
- Ter tom conversacional, direto, sem enrolação
- Terminar com um CTA claro (ex: `👇`, `💬`, `🔔`)
- Incluir 8–12 hashtags relevantes ao final

Emojis úteis por contexto:
| Contexto | Emojis sugeridos |
|---|---|
| Abertura / saudação | 👋 🙌 |
| Desenvolvedor / código | 👨‍💻 💻 ⌨️ |
| Dica técnica | ⚡ 🛠️ 🔧 |
| Clean Code / qualidade | 🧹 ✅ 🎯 |
| Carreira / crescimento | 🚀 📈 🏆 |
| Localização / contexto | 🇵🇹 🌍 |
| CTA / engajamento | 👇 💬 🔔 ❤️ |

> **Atenção**: emojis são exclusivos da legenda. **Nunca** usar emojis nos arquivos HTML dos slides.

---

## Identidade visual obrigatória

### Paleta — light mode (padrão)
| Token | Valor |
|---|---|
| Background | `#f5f7fa` |
| Foreground | `#0f172a` |
| Primary (cyan) | `#0891b2` |
| Secondary (indigo) | `#6366f1` |
| Muted text | `#64748b` |
| Card | `#ffffff` |
| Border | `#e2e8f0` |

### Paleta — dark mode (slides de destaque ou CTA)
| Token | Valor |
|---|---|
| Background | `#0f172a` |
| Primary | `#06b6d4` |
| Secondary | `#6366f1` |

### Tipografia
- **Fonte**: Manrope via Google Fonts — weights 500–900
- **Headlines**: 64–80px, weight 900, `letter-spacing: -0.03em`
- **Body**: 32–38px, weight 500, `line-height: 1.55`
- **Labels/eyebrow**: 16–17px, weight 700, `letter-spacing: 0.1em`, uppercase
- **Cards**: título 24–28px weight 800, subtítulo 19–22px weight 500

### Elementos de background
```css
/* Blobs */
radial-gradient(circle, rgba(8,145,178,0.10) 0%, transparent 70%)
radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%)
/* Grid de pontos */
background-image: radial-gradient(circle, rgba(15,23,42,0.05) 1.5px, transparent 1.5px);
background-size: 40px 40px;
```

### Elementos de marca
- Acento esquerdo: 5px, `linear-gradient(180deg, #0891b2, #6366f1)`
- Acento superior: 5px, `linear-gradient(90deg, #0891b2, #6366f1)`
- Handle no rodapé direito: `@adrianomaringolo.dev` — cor `#94a3b8`, `@` em cyan
- Progress dots (carrossel): 28×6px inativos, ativo com gradiente e 48px

### Ícones
Usar **apenas SVG inline** estilo Lucide. Nunca usar emojis nos slides HTML.

---

## Estrutura HTML base

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1080px; height: 1350px; overflow: hidden; background: #f5f7fa; font-family: 'Manrope', sans-serif; }
</style>
</head>
<body>
<div class="slide">
  <div class="blob-1"></div>
  <div class="blob-2"></div>
  <div class="bg-dots"></div>
  <div class="accent-left"></div>
  <div class="accent-top"></div>
  <div class="content"><!-- conteúdo --></div>
  <div class="progress"><!-- dots --></div>
  <div class="handle"><em>@</em>adrianomaringolo.dev</div>
</div>
</body>
</html>
```

---

## Tipos de post

### Post único (1 slide — 1080×1080)
Slide único com todo o conteúdo. Usar `"format": "1080x1080"` no meta.json.

### Carrossel (3–7 slides — 1080×1350)
| Slide | Papel | Diretriz |
|---|---|---|
| 1 | Capa / hook | Titular impactante. Precisa parar o scroll. |
| 2–N-1 | Desenvolvimento | Um conceito por slide. Menos é mais. |
| N | CTA | Destacar `adrianomaringolo.dev` em tipografia grande. |

---

## Referências

Consulte `instagram-posts/html/` para ver posts anteriores como referência de layout, tom e conteúdo.

---

## Checklist antes de entregar

- [ ] Slides HTML sem emojis — apenas ícones SVG inline
- [ ] Legenda com emojis relevantes e CTA claro
- [ ] Fontes Manrope carregadas via Google Fonts
- [ ] Handle `@adrianomaringolo.dev` em todos os slides
- [ ] Progress dots com slide ativo correto
- [ ] Paleta de cores respeitada
- [ ] `meta.json` com legenda e hashtags completas
- [ ] Export executado: `node instagram-posts/scripts/export.mjs post-NN`
- [ ] PNGs exibidos para revisão
- [ ] `output/post-NN/caption.md` gerado e exibido
