# Instagram Reel Generator

Cria Reels para o Instagram de Adriano Maringolo (@adrianomaringolo.dev) seguindo a identidade visual do portfolio.

## Como usar

```
/instagram-reel <tema do reel>
```

Exemplos:
- `/instagram-reel dica rápida de React hooks`
- `/instagram-reel 3 erros que todo dev júnior comete`
- `/instagram-reel por que uso TypeScript em todo projeto`

---

## O que este skill faz

1. Determina o próximo ID do reel (`reel-NN`) verificando `instagram-reels/html/`
2. Planeja cenas e calcula duração com base no volume de conteúdo (tabela de timing abaixo)
3. Cria as cenas HTML em `instagram-reels/html/reel-NN/` (formato 1080×1920) com animações CSS de entrada **e elementos animados contínuos** (ver seção abaixo)
4. Cria o `meta.json` com título, data, cenas, legenda e hashtags
5. **Valida** o tempo de leitura antes de exportar: `node instagram-reels/scripts/validate-reel.mjs reel-NN`
6. Exporta o **vídeo único** MP4 com transição `blocks` entre cenas: `node instagram-reels/scripts/export-reel.mjs reel-NN`
7. Exporta a **capa PNG** para o grid do Instagram: `node instagram-reels/scripts/export-reel.mjs reel-NN --cover`
8. Opcionalmente mistura música de fundo com `--music`
9. Exibe a caption para revisão

---

## Estrutura de arquivos

```
instagram-reels/
  html/                          ← versionado no git
    reel-01/
      meta.json                  ← metadados, cenas, legenda, hashtags
      scene-01.html
      scene-02.html
      ...
      transition.html            ← animação de blocos entre cenas (--transition blocks)
      cover.html                 ← capa do reel para o grid (opcional — usa scene-01 como fallback)
  output/                        ← gitignore (gerado pelo script)
    reel-01/
      scene-01.mp4               ← cena individual
      scene-02.mp4
      reel-01.mp4                ← reel completo concatenado
      cover.png                  ← capa 1080×1920 para o grid do Instagram
      caption.md                 ← legenda pronta para copiar
  scripts/
    export-reel.mjs
    validate-reel.mjs
  package.json
```

### Como determinar o próximo ID

```bash
ls instagram-reels/html/   # ver reel-01, reel-02 etc.
# usar o próximo número disponível
```

---

## Validação antes de exportar

Sempre executar antes de exportar para garantir tempo de leitura confortável:

```bash
node scripts/validate-reel.mjs reel-01
```

O validador usa o modelo de **scanning social** (300 WPM para prosa, 0.35s/linha de código) e reporta:
- `✅ OK` — 1s+ de margem após o mínimo calculado
- `⚠️ APERTADO` — menos de 1s de margem, considere aumentar
- `❌ CURTO` — abaixo do mínimo, aumentar obrigatoriamente

O mínimo por cena = **settle_time** (última animação de entrada terminar) + **tempo de leitura** + **0.4s buffer**.

---

## Comandos de exportação

```bash
# Exportar reel completo (transição blocks por padrão):
node scripts/export-reel.mjs reel-01

# Exportar capa PNG para o grid do Instagram:
node scripts/export-reel.mjs reel-01 --cover
# → usa cover.html se existir, senão scene-01.html como fallback
# → screenshot no momento t=1.5s (após animações de entrada)

# Definir o momento exato da capa em segundos:
node scripts/export-reel.mjs reel-01 --cover --cover-time 2.0

# Modo de transição (padrão: blocks):
node scripts/export-reel.mjs reel-01 --transition blocks    # blocos coloridos (recomendado)
node scripts/export-reel.mjs reel-01 --transition slideup   # ffmpeg xfade slideup

# Com música de fundo (arquivo MP3/WAV fornecido pelo usuário):
node scripts/export-reel.mjs reel-01 --music /caminho/para/track.mp3

# Ajustar volume da música (padrão: 0.35, range: 0.0–1.0):
node scripts/export-reel.mjs reel-01 --music track.mp3 --volume 0.4

# Exportar só cenas específicas (útil para revisar uma cena):
node scripts/export-reel.mjs reel-01 --scenes 1,3

# FPS customizado (padrão: 30):
node scripts/export-reel.mjs reel-01 --fps 24
```

Requer `ffmpeg` instalado (`which ffmpeg`). O script:
1. Captura frames de cada cena via Puppeteer com scrubbing de `animation-delay`
2. Encoda cada cena em MP4 com libx264
3. Concatena todas as cenas em um **único MP4 final** (`reel-NN.mp4`)
4. Se `--music` fornecido: loopa o áudio para cobrir toda a duração, aplica fade in (0.8s) e fade out (1.5s), mixa no vídeo final
5. Se `--cover`: tira screenshot no momento indicado e salva `cover.png`

**O vídeo final é sempre `output/reel-NN/reel-NN.mp4`** — arquivo único pronto para publicar.

---

## Template de meta.json

```json
{
  "title": "Título do reel",
  "date": "YYYY-MM-DD",
  "hook": "Frase de gancho do reel (primeiros 1-2s)",
  "music": "nome-do-arquivo.mp3",
  "scenes": [
    {
      "file": "scene-01.html",
      "title": "Nome da cena",
      "duration": 3,
      "description": "O que aparece e por que esse timing"
    }
  ],
  "caption": "Legenda completa pronta para copiar...",
  "hashtags": ["tag1", "tag2"]
}
```

O campo `music` é opcional e serve como documentação. Para usar, passe `--music` no comando de exportação.

---

## Duração e ritmo

### Tabela de referência por tipo de reel

| Tipo | Duração total | Cenas sugeridas |
|---|---|---|
| Dica rápida | 15–20s | 4–6 cenas |
| Lista / top N | 20–30s | 6–8 cenas |
| Tutorial curto | 30–45s | 8–12 cenas |

### Como calcular a duração de cada cena

A duração deve ser calculada com base no **tempo de leitura + absorção** do conteúdo da cena. Use esta fórmula como guia:

| Conteúdo da cena | Duração |
|---|---|
| Frase de hook (1 linha grande) | 2.5–3s |
| Título + 1 linha curta | 3s |
| Título + descrição (2–3 linhas) | 4s |
| Bloco de código pequeno (3–5 linhas) | 4–5s |
| Bloco de código médio (6–10 linhas) | 5–6s |
| Lista de 3 itens | 4–5s |
| Lista de 4–5 itens | 5–6s |
| CTA (handle + mensagem) | 4s |

**Regra prática**: leia o texto da cena em voz alta, devagar. A duração mínima é esse tempo + 0.5s de margem.

Cenas com animação escalonada precisam de tempo extra para o último elemento aparecer antes do corte.

### Timing das animações vs. duração da cena

Os `animation-delay` dos elementos devem terminar com pelo menos **1s de sobra** antes do fim da cena. Exemplo para uma cena de 4s:
- Elemento 1: `animation-delay: 0.1s`
- Elemento 2: `animation-delay: 0.3s`
- Elemento 3: `animation-delay: 0.5s`
- Duração da animação: `0.4s`
- Último elemento visível a partir de `0.9s` → sobram 3.1s para leitura ✓

Se a cena tem muitos elementos, aumente a duração, não comprima os delays.

---

## Português Brasileiro — revisão obrigatória

**Todo texto em português gerado neste skill deve passar por revisão antes de ser entregue.** Isso inclui: legendas (`caption`), textos das cenas HTML, títulos, descrições no `meta.json` e qualquer outro campo visível ao usuário.

### Checklist de revisão de português

Antes de finalizar qualquer texto, revisar item a item:

| Erro comum | Exemplos incorretos | Forma correta |
|---|---|---|
| Acentos em vogais tônicas | `ja`, `la`, `so`, `ta`, `va` | `já`, `lá`, `só`, `tá`, `vá` |
| Acento em palavras paroxítonas | `facil`, `util`, `nivel`, `modulo` | `fácil`, `útil`, `nível`, `módulo` |
| Acento em proparoxítonas | `codigo`, `pratico`, `logico` | `código`, `prático`, `lógico` |
| Til nasal | `nao`, `funcao`, `atencao`, `producao` | `não`, `função`, `atenção`, `produção` |
| Crase obrigatória | `a medida que`, `ir a praia` | `à medida que`, `ir à praia` |
| Pronomes com acento | `voce`, `nos`, `propria` | `você`, `nós`, `própria` |
| Verbos no imperativo | `salva`, `comenta`, `segue` (pedido formal) | `salve`, `comente`, `siga` |
| Cedilha | `variavel`, `posicao`, `secao` | `variável`, `posição`, `seção` |
| Acento diferencial | `e` (verbo ser/estar) | `é` |

### Regra de ouro

Após gerar qualquer texto em português, leia **palavra por palavra** e pergunte: _"esta palavra tem acento?"_. Em caso de dúvida, a resposta é quase sempre **sim**.

---

## Legenda (caption)

A legenda é o texto publicado no Instagram junto com o reel. Deve:

- **Usar emojis** — enriquecem o engajamento e tornam o texto mais escaneável
- Começar com um emoji ou frase de impacto que prenda a atenção
- Ter tom conversacional, direto, sem enrolação
- Terminar com um CTA claro (ex: `👇`, `💬`, `🔔`)
- Incluir 8–12 hashtags relevantes ao final
- **Imperativo**: usar a forma correta — `salve`, `comente`, `siga`, `acesse` (não `salva`, `comenta`, `segue`)

> **Atenção**: emojis são exclusivos da legenda. **Nunca** usar emojis nos arquivos HTML das cenas.

---

## Identidade visual obrigatória

### Paleta — dark mode (padrão para Reels — mais impacto em tela cheia)
| Token | Valor |
|---|---|
| Background | `#0f172a` |
| Primary (cyan) | `#06b6d4` |
| Secondary (indigo) | `#6366f1` |
| Text principal | `#f8fafc` |
| Text muted | `#94a3b8` |
| Card | `rgba(255,255,255,0.05)` |
| Card border | `rgba(255,255,255,0.10)` |

### Paleta — light mode (cenas de destaque ou conclusão)
| Token | Valor |
|---|---|
| Background | `#f5f7fa` |
| Foreground | `#0f172a` |
| Primary (cyan) | `#0891b2` |
| Secondary (indigo) | `#6366f1` |

### Tipografia
- **Fonte**: Manrope via Google Fonts — weights 500–900
- **Headlines / hook**: 72–96px, weight 900, `letter-spacing: -0.03em`
- **Body / pontos**: 40–48px, weight 600, `line-height: 1.45`
- **Labels/eyebrow**: 20–22px, weight 700, `letter-spacing: 0.1em`, uppercase
- **Handle**: 24px, weight 600, `#94a3b8`

### Elementos de background
```css
/* Blobs animados */
radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 60%)
radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 60%)
/* Grid de pontos */
background-image: radial-gradient(circle, rgba(248,250,252,0.06) 1.5px, transparent 1.5px);
background-size: 48px 48px;
```

### Elementos de marca
- Acento lateral: 5px, `linear-gradient(180deg, #06b6d4, #6366f1)`
- Handle no rodapé: `@adrianomaringolo.dev` — cor `#94a3b8`, `@` em cyan `#06b6d4`

### Animações CSS (obrigatórias)
Cada cena DEVE ter entrada animada. Usar `@keyframes` com `animation-fill-mode: both`:

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

Aplicar com `animation-delay` escalonado (0s, 0.2s, 0.4s...) para cada elemento entrar em sequência.

### Ícones
Usar **apenas SVG inline** estilo Lucide. Nunca usar emojis nos HTMLs.

---

## Estrutura HTML base (1080×1920)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1080px;
    height: 1920px;
    overflow: hidden;
    background: #0f172a;
    font-family: 'Manrope', sans-serif;
  }
  /* data-duration é lido pelo export script — não remove */
</style>
</head>
<body data-duration="3">
<div class="scene">
  <div class="blob-1"></div>
  <div class="blob-2"></div>
  <div class="bg-dots"></div>
  <div class="accent-left"></div>
  <div class="content"><!-- conteúdo da cena --></div>
  <div class="handle"><em>@</em>adrianomaringolo.dev</div>
</div>
</body>
</html>
```

**Importante**: o `data-duration` no `<body>` é usado pelo script de exportação para saber quantos frames capturar da cena. Sempre incluir.

---

## Tipos de cenas

### Cena de hook (scene-01) — primeiros 3s
- Uma frase de impacto em tipografia enorme (96px, weight 900)
- Fundo escuro, com animação de entrada rápida (0.3s)
- Deve fazer a pessoa parar de rolar

### Cenas de conteúdo
- Um ponto por cena
- Título + descrição curta
- Ícone SVG relevante
- Animação escalonada dos elementos

### Cena de CTA (última)
- Handle `@adrianomaringolo.dev` em destaque grande
- "Segue para mais" ou CTA equivalente
- Pode usar gradient mais vibrante no fundo

---

## Elementos animados contínuos (obrigatório em cada cena)

Além das animações de **entrada** (fadeUp/fadeIn com `animation-fill-mode: both`), cada cena deve ter ao menos um **elemento animado contínuo** (`animation-iteration-count: infinite`) para manter a cena viva durante a leitura.

### Catálogo de elementos por tipo de cena

| Contexto | Elemento | Animação |
|---|---|---|
| Hook / palavra-chave | Glow pulsante via `::after` com `radial-gradient` | `pulse: opacity 0.4→1→0.4, scale 1→1.08` |
| Título de alerta / erro | Halo vermelho em volta do texto | `scale 1→1.05, opacity 0.3→0.8` |
| Bloco de código | Cursor piscando (`|`) no final | `blink: opacity 1→0, step-end, 1s` |
| Bloco de código | Scan line horizontal atravessando | `translateY 0%→100%, linear, 2s` |
| Seta indicativa | Seta flutuando lateralmente ou para baixo | `translateX ±8px ou translateY 8px, ease-in-out, 1.4s` |
| Cards / lista | Ícone aparecendo com mola (`cubic-bezier`) | `scale 0→1, rotate -10→0, 0.3s` |
| Cards | Pulse de destaque no card correto | `background-opacity 0→1→0, 2.5s` |
| CTA / handle | Sparkles (estrelas SVG) girando | `scale 0→1→0, rotate 0→360deg, 2.4s` |
| Decorativo | Partículas subindo (pontos circulares) | `translateY 0→-80px, opacity 0→0.8→0` |
| Tip / aviso | Pulse de borda/fundo no card | `background-opacity 0→1→0, 2.2s` |

### Regras para elementos animados contínuos

1. **Sempre `animation-iteration-count: infinite`** — a cena dura vários segundos e o elemento deve continuar animando
2. **`animation-delay` inicial ≥ 0.8s** — deixar as animações de entrada terminarem antes de iniciar os contínuos
3. **Amplitude sutil** — max 10px de translação, max 10% de scale, opacidade máxima 1.0
4. **Nunca bloquear a leitura** — os elementos contínuos ficam atrás do conteúdo (`z-index` menor) ou nas bordas
5. **Infinitos não interferem no validador** — o script `validate-reel.mjs` ignora animações `infinite` no cálculo de settle_time

### Exemplo: glow pulsante em palavra-chave

```css
.highlight-word {
  position: relative;
  display: inline-block;
}
.highlight-word::after {
  content: '';
  position: absolute;
  inset: -8px -16px;
  background: radial-gradient(ellipse, rgba(239,68,68,0.35) 0%, transparent 70%);
  border-radius: 10px;
  animation: glowPulse 1.8s ease-in-out infinite;
  animation-delay: 0.9s;
}
@keyframes glowPulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.08); }
}
```

### Exemplo: cursor piscando

```css
.cursor {
  display: inline-block;
  width: 3px; height: 34px;
  background: #06b6d4;
  border-radius: 2px;
  vertical-align: middle;
  margin-left: 6px;
  animation: blink 1.0s step-end infinite;
  animation-delay: 0.9s;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
```

### Exemplo: sparkles (estrelas SVG)

```html
<div class="sparkles">
  <div class="sparkle"><!-- SVG star --></div>
</div>
```
```css
.sparkle {
  position: absolute;
  opacity: 0;
  animation: sparkle 2.4s ease-in-out infinite;
}
@keyframes sparkle {
  0%       { opacity: 0; transform: scale(0) rotate(0deg); }
  30%, 70% { opacity: 1; transform: scale(1) rotate(180deg); }
  100%     { opacity: 0; transform: scale(0) rotate(360deg); }
}
```

---

## Capa do Reel (cover)

A capa é a imagem estática que aparece no grid do perfil e na aba Reels. É o primeiro contato visual — precisa ser impactante em tamanho thumbnail (~200px).

### Quando criar um `cover.html` separado

Crie `cover.html` quando a scene-01 **não** for ideal como thumbnail:
- Scene-01 tem animação muito inicial (tudo fadeIn do zero → thumbnail fica vazio)
- O conteúdo mais impactante está em outra cena
- Você quer texto diferente/maior que no reel (ex: título mais curto para thumbnail)

Quando a scene-01 já é visualmente forte com animações estabelecidas (t≥1.5s), o fallback automático é suficiente — não precisa criar cover.html.

### Design da capa

A capa deve funcionar em **dois tamanhos**: tela cheia (1080×1920) e thumbnail do grid (~200×355px).

Regras:
- Texto principal ≥ 80px — legível em thumbnail
- Contraste alto — escuro vs. claro, sem muitas camadas de transparência
- Um único foco visual — ícone grande ou tipografia bold, não os dois ao mesmo tempo
- Evite texto fino (`font-weight < 700`) — desaparece em thumbnail
- A identidade visual (paleta dark, Manrope, acento) deve ser respeitada

### Template de cover.html

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1080px; height: 1920px; overflow: hidden; background: #0f172a; font-family: 'Manrope', sans-serif; }
  .scene {
    width: 1080px; height: 1920px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 80px; position: relative;
  }
  /* Sem animações de entrada — capa é estática */
  /* Elementos devem estar no estado final desde o início */
</style>
</head>
<body data-duration="0"><!-- data-duration=0 indica capa estática -->
<div class="scene">
  <!-- ícone grande centralizado -->
  <!-- título principal 80–100px weight 900 -->
  <!-- subtítulo curto 40px weight 600 -->
  <div class="handle"><em>@</em>adrianomaringolo.dev</div>
</div>
</body>
</html>
```

> **Dica**: No cover.html, não use animações — o screenshot é tirado num momento fixo. Se quiser usar animações da scene-01, ajuste `--cover-time` para capturar quando os elementos já aparecerem (ex: `--cover-time 2.0`).

### Exportar a capa

```bash
# Capa com fallback automático (scene-01 em t=1.5s):
node scripts/export-reel.mjs reel-01 --cover

# Capa com cover.html (sem precisar de --cover-time):
# basta criar cover.html — o script detecta automaticamente

# Capturar num momento específico da animação:
node scripts/export-reel.mjs reel-01 --cover --cover-time 2.5
```

**Saída**: `output/reel-NN/cover.png` (1080×1920, PNG)

---

## Música de fundo

O usuário deve fornecer um arquivo MP3/WAV de música royalty-free. Formatos aceitos: `.mp3`, `.wav`, `.aac`, `.ogg`.

O script:
- **Loopa** automaticamente se a música for mais curta que o reel
- **Aplica fade in** (0.8s) no início
- **Aplica fade out** (1.5s) no final
- **Reduz o volume** ao padrão 35% (`--volume 0.35`) para não sobrepor o conteúdo visual
- Encoda o áudio final em AAC 192kbps

Se o usuário não fornecer música, o reel é gerado sem áudio (correto para Instagram, que permite adicionar música pelo próprio app ao publicar).

---

## Checklist antes de entregar

- [ ] Duração calculada pelo conteúdo (tabela de timing + `validate-reel.mjs`)
- [ ] `data-duration` definido em cada `<body>` (deve ser igual ao `duration` no meta.json)
- [ ] Animações de **entrada** em todos os elementos (fadeUp/fadeIn, `animation-fill-mode: both`)
- [ ] Ao menos **1 elemento animado contínuo** (`infinite`) por cena (glow, cursor, seta, sparkle...)
- [ ] Elementos contínuos com `animation-delay ≥ 0.8s` para não conflitar com entradas
- [ ] Sem emojis nos HTMLs — apenas ícones SVG inline
- [ ] Handle `@adrianomaringolo.dev` em todas as cenas
- [ ] Fonte Manrope carregada via Google Fonts
- [ ] Paleta dark respeitada (fundo `#0f172a`)
- [ ] `meta.json` com `duration` e `description` por cena, legenda e hashtags
- [ ] **Validação aprovada**: `node scripts/validate-reel.mjs reel-NN` → todos ✅ OK
- [ ] Export executado: `node scripts/export-reel.mjs reel-NN [--music track.mp3]`
- [ ] **MP4 único final gerado**: `output/reel-NN/reel-NN.mp4`
- [ ] **Capa exportada**: `node scripts/export-reel.mjs reel-NN --cover` → `output/reel-NN/cover.png`
- [ ] `caption.md` gerado e exibido para revisão
