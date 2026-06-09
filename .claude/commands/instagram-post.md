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

1. Entende o tema e decide o formato (post único ou carrossel)
2. Cria os arquivos HTML dos slides em `instagram-posts/posts/YYYY-MM-DD-<slug>/`
3. Cria o `meta.json` com legenda e hashtags prontas
4. Exporta os PNGs via Puppeteer com `node instagram-posts/scripts/export.mjs posts/<pasta>`
5. Exibe os slides gerados para revisão

---

## Identidade visual obrigatória

### Paleta (light mode — padrão)
| Token | Valor |
|---|---|
| Background | `#f5f7fa` |
| Foreground | `#0f172a` |
| Primary (cyan) | `#0891b2` |
| Secondary (indigo) | `#6366f1` |
| Muted text | `#64748b` |
| Card | `#ffffff` |
| Border | `#e2e8f0` |

### Paleta (dark mode — usar em slides de destaque ou CTA)
| Token | Valor |
|---|---|
| Background | `#0f172a` |
| Primary | `#06b6d4` |
| Secondary | `#6366f1` |

### Tipografia
- **Fonte**: Manrope (Google Fonts) — weights: 500, 600, 700, 800, 900
- **Headlines**: 64–80px, weight 900, `letter-spacing: -0.03em`
- **Body**: 32–38px, weight 500, `line-height: 1.55`
- **Labels/eyebrow**: 16–17px, weight 700, `letter-spacing: 0.1em`, uppercase
- **Cards**: título 24–28px weight 800, subtítulo 19–22px weight 500

### Elementos de background
Usar sempre combinação de:
```css
/* Blobs de gradiente */
radial-gradient(circle, rgba(8,145,178,0.10) 0%, transparent 70%)
radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%)

/* Grid de pontos */
background-image: radial-gradient(circle, rgba(15,23,42,0.05) 1.5px, transparent 1.5px);
background-size: 40px 40px;
```

### Elementos de marca
- Linha de acento esquerda: 5px, `linear-gradient(180deg, #0891b2, #6366f1)`
- Linha de acento superior: 5px, `linear-gradient(90deg, #0891b2, #6366f1)`
- Handle no rodapé direito: `@adrianomaringolo.dev` em `#94a3b8` com `em` cyan
- Indicador de progresso (carrossel): dots de 28×6px, ativo com gradiente e 48px de largura

### Ícones
Usar **apenas SVG inline** estilo Lucide. Nunca usar emojis.

---

## Estrutura de arquivos

```
instagram-posts/
  posts/
    YYYY-MM-DD-<slug>/
      meta.json        ← metadados, legenda, hashtags
      slide-01.html    ← capa (obrigatório em carrossel)
      slide-02.html
      ...
  scripts/
    export.mjs         ← script de exportação
  package.json
```

### Template de meta.json
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

## Estrutura HTML base de cada slide

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1080px; height: 1350px; overflow: hidden; background: #f5f7fa; font-family: 'Manrope', sans-serif; }
  /* ... estilos do slide ... */
</style>
</head>
<body>
<div class="slide">
  <!-- background layers -->
  <div class="blob-1"></div>
  <div class="blob-2"></div>
  <div class="bg-dots"></div>
  <div class="accent-left"></div>
  <div class="accent-top"></div>

  <!-- conteúdo principal -->
  <div class="content">
    <!-- ... -->
  </div>

  <!-- rodapé fixo (carrossel) -->
  <div class="progress"><!-- dots --></div>
  <div class="handle"><em>@</em>adrianomaringolo.dev</div>
</div>
</body>
</html>
```

---

## Comando de exportação

```bash
node instagram-posts/scripts/export.mjs posts/YYYY-MM-DD-<slug>

# exportar só slides específicos:
node instagram-posts/scripts/export.mjs posts/YYYY-MM-DD-<slug> --slides 1,3
```

---

## Tipos de post e estrutura sugerida de slides

### Post único (1 slide)
- Slide único 1080×1080 com todo o conteúdo

### Carrossel (3–7 slides, formato 1080×1350)
| Slide | Papel | Conteúdo |
|---|---|---|
| 1 | Capa / hook | Titular impactante + visual forte. Precisa parar o scroll. |
| 2–N-1 | Desenvolvimento | Conteúdo dividido em blocos. Menos é mais por slide. |
| N | CTA | Chamar para o site, comentar, ou seguir. Destacar `adrianomaringolo.dev`. |

---

## Referências existentes

Consulte `instagram-posts/posts/` para ver posts anteriores como referência de layout, tom e conteúdo.

---

## Checklist antes de entregar

- [ ] Sem emojis — apenas ícones SVG inline
- [ ] Fontes carregadas via Google Fonts (Manrope)
- [ ] Handle `@adrianomaringolo.dev` em todos os slides
- [ ] Indicador de progresso correto (slide ativo destacado)
- [ ] Cores seguem a paleta definida
- [ ] PNGs exportados e exibidos para revisão
- [ ] `meta.json` com legenda e hashtags prontas
