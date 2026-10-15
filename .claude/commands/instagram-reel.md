# Instagram Reel & Story Generator

Cria **Reels** e **Stories** para o Instagram de Adriano Maringolo (@adrianomaringolo.dev) seguindo a identidade visual do portfolio.

Aja como um **especialista em marketing digital**: antes de gerar qualquer coisa, defina o **objetivo** da peça (alcance / autoridade / tráfego / resposta no direct), o **público** (dev, empreendedor, prestador de serviço...) e a **ação desejada**. Formato, ritmo e CTA seguem o objetivo — não o contrário.

## Como usar

```
/instagram-reel <tema>                    → Reel (padrão)
/instagram-reel story <tema>              → Story (sequência de cards)
/instagram-reel story do reel-NN          → Story que divulga um Reel já publicado
```

Exemplos:
- `/instagram-reel dica rápida de React hooks`
- `/instagram-reel 3 erros que todo dev júnior comete`
- `/instagram-reel story bastidor de um projeto de cliente`
- `/instagram-reel story enquete: site próprio ou só Instagram?`
- `/instagram-reel story do reel-08`

> **Reel vs. Story — quando usar cada um**
> | | Reel | Story |
> |---|---|---|
> | Objetivo | alcance novo, descoberta, entrar no feed de quem não segue | relacionamento com quem já segue, tráfego, prova social, resposta no direct |
> | Vida útil | permanente (fica no grid, indexa) | 24h (ou vira Destaque) |
> | Formato | vídeo único, assistido passivamente | cards verticais avançados com toque, muitas vezes com sticker interativo |
> | Produção | alta — timing, trilha, transições | leve e frequente — pode ser 1 card só; autenticidade > perfeição |
> | CTA | "segue", "salva", "comenta" | "toque aqui" + link sticker, "responde aqui", enquete/quiz |

---

## O que este skill faz — modo Reel

1. Determina o próximo ID do reel (`reel-NN`) — ver "Numeração e pautas"
2. Planeja cenas e calcula duração com base no volume de conteúdo (tabela de timing abaixo)
3. Cria as cenas HTML em `instagram-reels/html/reel-NN/` (formato 1080×1920) com animações CSS de entrada **e elementos animados contínuos** (ver seção abaixo), respeitando as **safe zones do Reel**
4. Cria o `meta.json` com título, data, pauta, criatividade, cenas, legenda e hashtags
5. **Valida** o tempo de leitura: `node instagram-reels/scripts/validate-reel.mjs reel-NN` (não se aplica a reel narrado)
6. **Revisão visual**: `node instagram-reels/scripts/snapshot-reel.mjs reel-NN` → olhar o `grid.png` e corrigir antes de exportar
7. Exporta o **vídeo único** MP4 com transição `blocks` entre cenas: `node instagram-reels/scripts/export-reel.mjs reel-NN`
8. Exporta a **capa PNG** para o grid do Instagram: `node instagram-reels/scripts/export-reel.mjs reel-NN --cover`
9. Música de fundo com `--music`: embute a recomendada e gera as alternativas em `opcoes-musica/` (ver "Música de fundo")
10. Atualiza a pauta no `instagram-posts/PAUTAS.md` (status e coluna Post)
11. Exibe a caption para revisão
12. **Publica na galeria na nuvem** quando o projeto tem `instagram-posts/galeria.json`: a galeria só mostra o que foi
    enviado. `node ~/.claude/skills/instagram-post/cloud/bin/galeria-cloud.mjs publicar instagram-posts` (sincroniza
    antes, envia só o que mudou). Ofereça ao terminar o reel, e rode de novo depois de reexportar um vídeo.

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
    reel-10/                     ← reel narrado
      roteiro.md                 ← conceito, narração, direção de voz e visual
      voz/falas.json             ← falas para o ElevenLabs (texto, voz, modelo)
      voz/cena-01.mp3 ...        ← falas escolhidas (voz/testes/ fica fora do git)
    story-01/                    ← Story (mesmo html/, prefixo story-)
      meta.json                  ← type:"story", frames, objetivo, stickers, CTA
      frame-01.html
      frame-02.html
      ...
  output/                        ← gitignore (gerado pelo script)
    reel-01/
      scene-01.mp4               ← cena individual
      scene-02.mp4
      reel-01.mp4                ← reel completo concatenado
      cover.png                  ← capa 1080×1920 para o grid do Instagram
      caption.md                 ← legenda pronta para copiar
      snapshots/grid.png         ← revisão visual (snapshot-reel.mjs)
      opcoes-musica/             ← o mesmo reel com cada trilha candidata
    story-01/
      frame-01.png               ← card do story (publicar na ordem)
      frame-01-guides.png        ← só com --guides (revisão de safe zones)
      frame-01.mp4               ← só com --video
      story.md                   ← roteiro de publicação: ordem, sticker por frame, CTA
  scripts/
    export-reel.mjs
    validate-reel.mjs
    snapshot-reel.mjs            ← revisão visual: screenshot de cada cena + grade
    export-story.mjs
    generate-voice.mjs           ← falas com ElevenLabs (reel narrado)
    build-reel-NN.mjs            ← gerador de cenas de um reel narrado
    lib/voice-scenes.mjs         ← helpers de áudio, legenda karaokê e boca sincronizada
  .env                           ← ELEVENLABS_API_KEY (fora do git)
  package.json
```

### Numeração e pautas

```bash
ls instagram-reels/html/   # ver reel-01... e story-01...
```

- **Próximo ID = maior `reel-NN` existente + 1.** Não preencha buracos: os IDs `reel-02` a `reel-06` estão reservados
  para a fila técnica do `instagram-posts/content-plan.md`.
- Se o reel sai de uma pauta (`instagram-posts/PAUTAS.md`), registre `"pauta": "<id>"` no `meta.json` e, na linha
  da pauta, mude o status para **Em produção** (ou Feita, quando publicado) e preencha a coluna **Post** com `reel-NN`.
- Ideia nova que surgir na conversa e não for feita agora vira linha nova na pauta (ID `p` + 6 hex aleatórios,
  status Ideia, tipo Reel, coluna Criatividade preenchida). Edite só entre os marcadores `<!-- pautas -->`.

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

## Revisão visual antes de exportar (obrigatória)

O validador mede tempo, não layout. Todo reel recente teve pelo menos um problema que só apareceu olhando a cena
(palavra saindo da tela, letra cortada, menu vazando da janela, carimbo cobrindo texto, legenda sumindo antes da hora).
Exportar leva minutos; revisar leva segundos.

```bash
node scripts/snapshot-reel.mjs reel-NN                  # cada cena em (duração − 0,6s) + capa → grid.png
node scripts/snapshot-reel.mjs reel-NN --at 1@2.5,4@6   # instantes específicos (meio de uma frase, depois de um carimbo...)
node scripts/snapshot-reel.mjs reel-NN --scenes 3,4     # só as cenas que mudaram
```

Abra `output/reel-NN/snapshots/grid.png` e confira, cena a cena:
- nada essencial fora das **safe zones do Reel** (abaixo) nem saindo dos 1080px;
- nenhum elemento cobrindo texto que precisa ser lido;
- textos grandes com a parte de baixo das letras inteira (g, p, ç);
- o estado no instante escolhido é o esperado (em reel narrado, tire um screenshot no meio de cada frase).

O screenshot usa o mesmo método do export (Web Animations API), então é exatamente o quadro do vídeo.

---

## Safe zones do Reel

A interface do Reel cobre partes do quadro 1080×1920:

| Região | Reservado | O que o Instagram põe ali |
|---|---|---|
| Direita | **~150px** (x > 930) | coluna de curtir, comentar, compartilhar, áudio |
| Base | **~380px** (y > 1540) | perfil, legenda, botão seguir, nome da música |
| Topo | **~120px** | "Reels", câmera |

Texto essencial, legendas queimadas e CTA ficam entre **x 70–930** e **y 120–1540**. O handle no rodapé
(`bottom: 64px`) é marca d'água, não informação — pode ficar na faixa coberta. Na grade do perfil, a capa aparece
cortada em 3:4 pelo centro: o foco da capa fica entre y ~240 e ~1680.

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

# Com música de fundo (ver seção "Música de fundo"):
node scripts/export-reel.mjs reel-01 --music music/track.mp3

# Usar o final da faixa (alinha o clímax com o fim do reel) e ajustar volume:
node scripts/export-reel.mjs reel-01 --music music/track.mp3 --music-start end --volume 0.3

# Reaproveitar cenas já renderizadas (só refaz o concat e a mixagem):
node scripts/export-reel.mjs reel-01 --resume --music music/track.mp3 --music-start end

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
  "pauta": "p0eda5c",
  "creativity": "Base | Expressivo | Ousado",
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

## Modo Story — sequência de cards

Um Story é uma **sequência de cards verticais 1080×1920** que o espectador avança com toque. Cada card é publicado como **imagem** (`frame-NN.png`) ou **vídeo curto** (`frame-NN.mp4`). Os **stickers nativos** (enquete, quiz, pergunta, link, contagem regressiva) são adicionados **no app** pelo Adriano, e o `story.md` diz onde e com que texto.

### Imagem ou vídeo?

| Use **PNG** (padrão) | Use **vídeo** (`--video` / `--stitch`) |
|---|---|
| Card majoritariamente texto, dica rápida, print, bastidor estático | Frame tem hook animado, número que sobe, seta, glow, contraste antes/depois |
| Story leve do dia a dia | Peça mais "produzida" (lançamento, reaproveitamento de Reel, campanha) |
| Menos atrito para publicar | Mais retenção — movimento segura o dedo mais 1–2s |

Quando for vídeo, **todo frame precisa de motivo para se mover além da entrada**: um elemento contínuo (`infinite`, `animation-delay ≥ 0.8s`, amplitude sutil) para o card não "congelar" depois de 1,5s. Sem isso, exporte como PNG — um vídeo que trava parece bug.

- `--video`: um `frame-NN.mp4` por frame — publica card a card, sticker por card (recomendado).
- `--stitch`: implica `--video` e ainda concatena tudo em `story-NN.mp4` — **upload único**; o Instagram divide em segmentos automaticamente. Bom para agendador ou quando não vai colocar sticker.
- `--music trilha.mp3` (implica `--stitch`): trilha de fundo no `story-NN.mp4` — mesmo esquema do Reel (loop, fade in/out, `--music-start end`, `--volume` padrão 0.32). Stories publicados card a card usam a **trilha nativa do app**; a trilha embutida é para o `story-NN.mp4` de upload único, agendador ou repost fora do Instagram.
- `--resume`: reaproveita os `frame-NN.mp4` já renderizados e só refaz o concat/mixagem — use ao trocar só a música, a transição ou o volume (evita re-renderizar ~12 min de frames).

### Transição entre frames (`story-NN.mp4`)

Se existir `html/story-NN/transition.html`, ela é **intercalada entre os frames** no `story-NN.mp4` concatenado — mesmo mecanismo `blocks` do `export-reel` (tiras coloridas subindo/saindo, `data-duration` no `<body>`, ~1.0s). Não afeta os `frame-NN.mp4` individuais (cada um é postado separado). Copie o template de `reel-08/transition.html` e ajuste as cores para cyan/indigo.

### O que o skill faz no modo Story

1. Determina o próximo ID (`story-NN`) verificando `instagram-reels/html/`
2. Define **objetivo** e **quantidade de frames** (regra: 3–5 frames; acima de 7 a taxa de conclusão despenca)
3. Cria os frames HTML em `instagram-reels/html/story-NN/` (1080×1920) respeitando as **safe zones**
4. Cria o `meta.json` (`type: "story"`, array `frames`, objetivo, stickers, CTA, convite de resposta)
5. Exporta os PNGs: `node instagram-reels/scripts/export-story.mjs story-NN`
6. Gera `story.md` com o roteiro de publicação (ordem, sticker por frame, texto sugerido, CTA)
7. Revê a peça com olhar de marketing (hook, uma ideia por card, sticker, CTA) antes de entregar

```bash
node scripts/export-story.mjs story-01                              # PNGs + story.md
node scripts/export-story.mjs story-01 --guides                     # + *-guides.png com as safe zones (revisão)
node scripts/export-story.mjs story-01 --video                      # + frame-NN.mp4 (um vídeo por frame)
node scripts/export-story.mjs story-01 --stitch                     # --video + story-NN.mp4 concatenado + transição
node scripts/export-story.mjs story-01 --music track.mp3            # --stitch + trilha no story-NN.mp4
node scripts/export-story.mjs story-01 --resume --music track.mp3  # reaproveita os mp4, só remixa
node scripts/export-story.mjs story-01 --frames 1,3                 # só esses frames
node scripts/export-story.mjs story-01 --settle 2.4                 # momento do screenshot PNG (após as entradas)
```

**Saída**: `output/story-NN/frame-01.png ...` (+ `frame-NN.mp4` / `story-NN.mp4` com vídeo) + `story.md`. Cada `frame-NN.mp4` usa o `data-duration` do `<body>` (= `duration` do `meta.json`) e nunca tem áudio; só o `story-NN.mp4` recebe trilha (com `--music`). O export de vídeo abre um Chrome por frame (centenas de screenshots numa aba só estouram a memória).

### Safe zones (obrigatório) — a interface do Instagram cobre as bordas

O app sobrepõe elementos sobre o card. Todo conteúdo essencial (texto, logo, ícone-foco) fica na **área central segura**:

| Região | Reservado | O que o Instagram põe ali |
|---|---|---|
| Topo | **250px** | foto de perfil, nome, hora, botão fechar |
| Base | **250px** | barra "Enviar mensagem", reações |
| Base (com sticker/link) | **340px** | link sticker, enquete, "toque aqui" |
| Laterais | **64px** cada | margem de respiro, gestos de navegação |

O template de frame já embute `padding: 280px 96px 340px 112px`. Rode `--guides` e confira que **nada importante** invade as faixas vermelhas.

### Tempo de leitura — bem mais confortável que o Reel

O Story **não empurra o espectador pra frente** como o Reel (que tem trilha e corte automático no próximo clipe): aqui é o próprio espectador quem decide quando tocar pra avançar. Isso parece dar folga, mas é o contrário — se o card não entrega a mensagem rápido e com clareza, o toque de avançar vem **antes** da leitura terminar. Por isso a duração declarada em cada frame (`duration` no `meta.json` = `data-duration` no `<body>`, usada pelo `--video`) precisa ser generosa, não apertada.

**Regra prática**: se em dúvida entre duas durações, escolha a maior. Sobra de tempo não incomoda ninguém; texto cortado no meio, sim.

**Fórmula** (mais folgada que o `validate-reel.mjs`, que mede scanning de Reel):

```
duração mínima = settle_time + tempo_de_leitura + 0.8s de buffer
```

- **Settle time**: mesmo critério do Reel — quando a última animação de entrada (não-`infinite`) termina.
- **Tempo de leitura**: ritmo de leitura pausada, **não** de scanning — **≈ 200 WPM (3,3 palavras/segundo)**, contra os 300 WPM (scanning) usados no Reel. O Story para a rolagem; a pessoa já parou, então dá pra ler no ritmo normal, e ler rápido demais é o que faz ela tocar cedo demais.
- **Item de lista com ícone**: conte também um mínimo de **0,8s por item**, além do tempo de palavra — o olho salta ícone → texto → próximo item, o que consome mais tempo do que só ler as palavras. Use o maior entre `tempo_de_leitura` (por palavra) e `nº de itens × 0,8s`.
- **Buffer de absorção**: **0,8s** (o dobro do Reel) — no Story a mensagem geralmente pede uma decisão (tocar no sticker, seguir, responder), não só "ler e passar".

**Referência rápida por tipo de conteúdo de frame:**

| Conteúdo do frame | Duração confortável |
|---|---|
| Hook — 1 frase de impacto + selo/eyebrow | 5–6s |
| Título + 1 linha de apoio | 6–7s |
| Título + 2 linhas de corpo | 7–8s |
| Lista de 3–4 itens com ícone | 8–9s |
| Lista de 5–6 itens com ícone | 9–11s |
| CTA (ícone + título + subtítulo) | 7–8s |

Essas durações já **não cabem mais em 4–5 frames de 3–4s** como um Reel curto — um Story de 4 frames de leitura fica na casa de 30–40s de duração somada, e está certo: o espectador nunca vê os 4 de uma vez, ele avança um a um no próprio ritmo. O que importa é que **cada card, sozinho, dê tempo de sobra**.

### Qualidade do Story — checklist do especialista em marketing digital

**Gancho e retenção**
- **Frame 1 é um padrão-interrupção**: a maioria toca "avançar" nos primeiros 2s. Abra com tensão, número, pergunta ou afirmação polêmica — nunca com "oi pessoal" ou capa institucional.
- **Uma ideia por card.** Story é escaneado mais rápido que Reel: ~2–4s por frame. Se precisa de dois parágrafos, são dois frames.
- **Payoff cedo.** Não guarde a informação boa pro último card — quem sai no meio nunca vê.
- **Continuidade visual**: mesma âncora de layout entre frames (posição do título, cor do acento) cria a sensação de "história", aumenta o tap-through.

**Legibilidade**
- Fonte de corpo **≥ 32px**, títulos **≥ 56px**. Nada de `font-weight` < 600 em texto sobre foto.
- Texto **sempre sobre scrim** (degradê escuro), nunca direto sobre foto crua.
- Contraste alto; teste mentalmente em brilho baixo de celular no sol.
- Máx. ~2 linhas de título + ~3 linhas de apoio por frame.

**Interação (o que o algoritmo premia)**
- **Todo Story deve ter pelo menos 1 sticker nativo.** Ordem de força do sinal: resposta no direct > pergunta/caixa de perguntas > enquete/quiz > controle deslizante > figurinhas passivas.
- Deixe **espaço reservado** no card para o sticker (área inferior, dentro dos 340px) e descreva no `meta.json` (`sticker`, `sticker_note`) — o skill NÃO desenha o sticker, ele vai no app.
- **Enquete**: pergunta binária com atrito baixo ("Você já perdeu cliente por não ter site? Sim / Ainda não percebi").
- **Quiz**: use quando há um dado contra-intuitivo — o erro engaja mais que o acerto.
- **Contagem regressiva**: só para lançamento/live com data real.

**CTA e conversão**
- "Arraste pra cima" **não existe mais** (desde 2021). Use **link sticker** + microcópia "toque aqui".
- Um CTA por Story, no **último frame**. Se o objetivo é tráfego, o link sticker é o CTA; se é relacionamento, é a caixa de pergunta.
- Feche com **convite de resposta** ("me conta aqui", "responde essa"): resposta no direct é o sinal de engajamento mais forte e abre conversa 1:1.

**Ritmo e cadência**
- 3–5 frames é o ponto ideal. 1 frame também é válido (dica rápida, bastidor).
- Story é **volume e frequência** — produção leve, tom mais pessoal e direto que o Reel. Imperfeição autêntica converte melhor que card institucional.
- Se a peça é perene, defina `highlight` no `meta.json`: ela vira **Destaque** e merece um frame de capa pensado para o ícone do Destaque (~180px, texto de 1 palavra).

**Divulgar um Reel via Story (`story do reel-NN`)**
- 2–3 frames: (1) teaser com o hook do Reel + "novo Reel no ar", (2) 1 argumento/preview, (3) frame com **enquete ou "toque pra ver"** + sticker de menção ao próprio post do Reel.
- Nunca só "post novo lá no feed" — dê o motivo de sair do Story pra assistir.

### Template de meta.json — Story

```json
{
  "type": "story",
  "title": "Título do story",
  "date": "YYYY-MM-DD",
  "objective": "alcance | engajamento | trafego | resposta-no-direct",
  "highlight": "Nome do Destaque (opcional — se a peça é perene)",
  "cta": "Texto do CTA do último frame + destino do link sticker",
  "reply_prompt": "Pergunta final que convida resposta no direct",
  "frames": [
    {
      "file": "frame-01.html",
      "title": "Hook",
      "role": "hook | conteudo | prova | cta",
      "duration": 4,
      "sticker": "enquete | quiz | pergunta | slider | link | countdown | nenhum",
      "sticker_note": "Onde posicionar e o texto sugerido do sticker",
      "description": "O que aparece e por quê"
    }
  ]
}
```

### Estrutura HTML base — frame de Story (1080×1920 com safe zones)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1080px; height: 1920px; overflow: hidden; background: #0f172a; font-family: 'Manrope', sans-serif; }
  .frame {
    width: 1080px; height: 1920px;
    position: relative; overflow: hidden;
    display: flex; flex-direction: column;
    align-items: flex-start; justify-content: center;
    /* safe zones: topo 280 (perfil), base 340 (barra + sticker/link), laterais 96–112 */
    padding: 280px 96px 340px 112px;
  }
  /* zona reservada para o sticker nativo — deixe vazia, o sticker entra no app */
  .sticker-slot { position: absolute; left: 0; right: 0; bottom: 96px; height: 220px; }
  .handle {
    position: absolute; bottom: 270px; right: 96px; z-index: 5;
    font-size: 28px; font-weight: 600; color: #94a3b8;
  }
  .handle em { font-style: normal; color: #06b6d4; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
</style>
</head>
<body data-duration="4"><!-- data-duration só é usado por --video -->
<div class="frame">
  <div class="bg-dots"></div>
  <div class="blob-1"></div>
  <div class="accent-left"></div>
  <div class="content"><!-- título + apoio, uma ideia só --></div>
  <div class="sticker-slot"></div>
  <div class="handle"><em>@</em>adrianomaringolo.dev</div>
</div>
</body>
</html>
```

Diferenças em relação ao frame de Reel:
- Identidade visual **mais leve**: handle menor, menos "moldura de marca" — o Story já mostra o perfil no topo.
- **Fontes tão grandes quanto (ou maiores que) o Reel**, não menores: o hook pode chegar a 180–190px ocupando quase o quadro; títulos de conteúdo 72–100px; corpo/itens de lista 48–52px (acima do teto de 48px do Reel — no Story, tela cheia e sem concorrência de legenda, dá pra ir mais longe). Card com fonte "segura" de 40px em texto que devia ser o protagonista fica subdimensionado.
- Animações de **entrada** sempre (o screenshot PNG é tirado em `--settle`, com elas estabilizadas).
- **Ícone Lucide por bloco de conteúdo** com micro-animação contínua sutil (float, tilt, pulse de anel, shimmer no acento). Um card de story sem nenhum ícone/elemento vivo fica chapado — especialmente em vídeo.
- Elementos contínuos (`infinite`, `animation-delay ≥ 0.8s`, amplitude ≤ 10px / ≤ 10% scale) valorizam o PNG e são **obrigatórios** se for exportar vídeo (senão o card "congela" depois de 1,5s).
- **Nunca** ocupe a `.sticker-slot` com conteúdo essencial.
- Sem `validate-story` — a régua é visual: **dá pra entender num toque de olho?** Duração de cada frame segue a fórmula de "Tempo de leitura" acima, não um número fixo.

---

## Português Brasileiro — revisão obrigatória

**Todo texto em português gerado neste skill deve passar por revisão antes de ser entregue** — vale para Reels **e Stories**. Isso inclui: legendas (`caption`), textos das cenas/frames HTML, títulos, descrições no `meta.json`, textos sugeridos de enquete/quiz/CTA no `story.md` e qualquer outro campo visível ao usuário.

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

## Legenda (caption) — Reel

> **Story não leva legenda.** O texto do Story vive dentro dos frames e nos stickers. Um card pode ter uma frase de contexto por cima (adicionada no app), curta. Nada de bloco de hashtags.

A legenda é o texto publicado no Instagram junto com o reel. Deve:

- **Usar emojis** — enriquecem o engajamento e tornam o texto mais escaneável
- Começar com um emoji ou frase de impacto que prenda a atenção
- Ter tom conversacional, direto, sem enrolação
- Terminar com um CTA claro (ex: `👇`, `💬`, `🔔`)
- Incluir 8–12 hashtags relevantes ao final
- **Imperativo**: usar a forma correta — `salve`, `comente`, `siga`, `acesse` (não `salva`, `comenta`, `segue`)

> **Atenção**: emojis são exclusivos da legenda. **Nunca** usar emojis nos arquivos HTML das cenas.

---

## Números, dados e fontes

- **Dado de pesquisa** ("73% dos clientes…", "você tem 3 segundos segundo o Google") só com fonte verificável,
  citada na legenda. Sem fonte, reformule sem número ("se não encontra, volta para o Google").
- **Números de ficção** dentro de uma narrativa são livres: horários ("21h14"), número de caso, contador de
  visitantes, "© 2019". O contexto deixa claro que é encenação.
- **Métrica de projeto real** (Lighthouse, tempo de carregamento) só se foi medida — nunca arredondada para cima.

---

## Identidade visual obrigatória

Aplica-se a **Reels e Stories** (paleta, tipografia Manrope, acento lateral, handle, ícones SVG, sem emojis nos HTMLs). No Story a marca entra **mais discreta** — ver "Estrutura HTML base — frame de Story".

**Exceção:** reels de criatividade **Ousado** podem sair da identidade no corpo, desde que o CTA final volte para ela — ver "Formatos ousados".

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
| Hook / palavra-chave | Glow pulsante em `<div>` posicionado com `radial-gradient` | `pulse: opacity 0.4→1→0.4, scale 1→1.08` |
| Título de alerta / erro | Halo vermelho em volta do texto | `scale 1→1.05, opacity 0.3→0.8` |
| Bloco de código | Cursor piscando (`|`) no final | `blink: opacity 1→0, step-end, 1s` |
| Bloco de código | Scan line horizontal atravessando | `translateY 0%→100%, linear, 2s` |
| Seta indicativa | Seta flutuando lateralmente ou para baixo | `translateX ±8px ou translateY 8px, ease-in-out, 1.4s` |
| Cards / lista | Ícone aparecendo com mola (`cubic-bezier`) | `scale 0→1, rotate -10→0, 0.3s` |
| Cards | Pulse de destaque no card correto | `background-opacity 0→1→0, 2.5s` |
| CTA / handle | Sparkles (estrelas SVG) girando | `scale 0→1→0, rotate 0→360deg, 2.4s` |
| Decorativo | Partículas subindo (pontos circulares) | `translateY 0→-80px, opacity 0→0.8→0` |
| Tip / aviso | Pulse de borda/fundo no card | `background-opacity 0→1→0, 2.2s` |
| Hook / capa (decorativo, grande) | **Ícone Lucide gigante ao fundo**, opacidade baixa | ícone em `opacity: 0.08–0.15`, `scale` ou `rotate` bem sutil e lento (8–12s); nunca "lowpoly"/ilustração facetada — ver regra abaixo |

### Ícone grande de fundo — regra e receita

**Nunca usar ilustração lowpoly/facetada.** Para um elemento gráfico grande de fundo (capa, hook), use sempre um **ícone Lucide simples** (o mesmo catálogo de ícones inline já usado nos cards), só que **gigante e com opacidade baixa** — não uma forma poligonal desenhada à mão.

1. **Escolha o ícone pelo significado do frame**, igual a qualquer outro ícone da cena: lâmpada para ideia/dica, foguete para lançamento, escudo para segurança, globo para presença digital etc.
2. **Tamanho**: 500–700px, bem maior que qualquer ícone de conteúdo (que ficam em 30–70px).
3. **Opacidade baixa**: `0.08–0.15` — é textura de fundo, não elemento de leitura. `stroke` ou `fill` na cor de acento (cyan/indigo, ou uma cor com significado como âmbar para "ideia") sobre o fundo escuro.
4. **Posição**: atrás do texto (antes dele no DOM, sem `z-index` maior que o conteúdo), tipicamente ocupando um canto ou o fundo inteiro — pode sangrar pra fora da safe zone, é decorativo.
5. **Vida sutil**: `scale` 1→1.04 ou `rotate` ±3°, bem lento (8–12s, `ease-in-out infinite`), começando ≥ 1s depois da entrada. Nada de giro completo ou pulso forte — na opacidade baixa, qualquer movimento exagerado vira ruído visual.
6. **Um só por frame.** Ícone de fundo gigante nunca compete com o ícone de conteúdo (badge, card) — se o frame já tem um ícone pequeno fazendo esse papel, não duplique com um gigante atrás.

### Regras para elementos animados contínuos

0. **Nunca animar pseudo-elementos (`::before` / `::after`)** — ver abaixo. É a regra mais importante desta seção
1. **Sempre `animation-iteration-count: infinite`** — a cena dura vários segundos e o elemento deve continuar animando
2. **`animation-delay` inicial ≥ 0.8s** — deixar as animações de entrada terminarem antes de iniciar os contínuos
3. **Amplitude sutil** — max 10px de translação, max 10% de scale, opacidade máxima 1.0
4. **Nunca bloquear a leitura** — os elementos contínuos ficam atrás do conteúdo (`z-index` menor) ou nas bordas
5. **Infinitos não interferem no validador** — o script `validate-reel.mjs` ignora animações `infinite` no cálculo de settle_time

### ⚠️ Animação só em elementos reais — nunca em `::before` / `::after`

O `export-reel.mjs` renderiza o vídeo **frame a frame**: pausa todas as animações e posiciona cada uma no instante exato do frame pela Web Animations API (`document.getAnimations()` + `currentTime`). O `validate-reel.mjs`, porém, calcula o settle_time com `document.querySelectorAll('*')`, que **não alcança pseudo-elementos** — uma animação em `::after` fica fora da validação. E versões antigas do export (scrub por `animation-delay`) faziam essas animações piscarem no vídeo.

Isso vale para qualquer animação, contínua ou de entrada. Sempre usar um `<div>` real:

```html
<span class="highlight-word">
  <span class="glow"></span>
  concorrente.
</span>
```
```css
.highlight-word {
  position: relative;
  display: inline-block;
}
.glow {
  position: absolute;
  inset: -8px -16px;
  z-index: -1;
  background: radial-gradient(ellipse, rgba(239,68,68,0.35) 0%, transparent 70%);
  border-radius: 10px;
  animation: glowPulse 1.8s ease-in-out 0.9s infinite;
}
@keyframes glowPulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.08); }
}
```

Pseudo-elementos **estáticos** (sem `animation`) continuam liberados.

> **Timeline exata**: desde out/2026 o export usa `currentTime` (Web Animations API) e o vídeo segue os `animation-delay` à risca. O método anterior deslocava `animation-delay` depois de pausar e somava o tempo de carregamento da página a todos os frames (timeline adiantada). Reels exportados antes disso (até o reel-09) saíram com as entradas um pouco antes do previsto.

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

## Armadilhas de CSS que já aconteceram

| Sintoma | Causa | Como evitar |
|---|---|---|
| Ícone de fundo forte demais, apesar de `opacity: 0.09` | a entrada `fadeIn` termina em `opacity: 1` e sobrescreve a opacidade base | keyframe de entrada que termina na opacidade final (`fadeInLow { to { opacity: 0.09 } }`) |
| Parte de baixo de "g", "p", "ç" cortada | texto em gradiente (`background-clip: text`) com `line-height: 1` | `line-height` ≥ 1.15 ou `padding-bottom: 0.08em` |
| Palavra saindo da tela | 110px+ em Manrope 900 passa fácil dos ~920px úteis | medir no snapshot; reduzir a fonte ou quebrar a linha |
| Efeito máquina de escrever corta o texto | `width` fixa animada em fonte não monoespaçada | animar `clip-path: inset(0 100% 0 0)` → `inset(0)` com `steps(n)` |
| Menu/elemento vazando da moldura | posição absoluta abrindo para fora de um container com `overflow: hidden` | abrir para dentro (para baixo/para a esquerda) e conferir no snapshot |
| Carimbo/selo cobrindo o texto que ele comenta | selo centralizado sobre o card | ancorar no canto (`right`/`bottom` negativos) e deixar padding para ele |
| Chrome caindo na captura e arquivo enorme (67 MB no reel-11) | granulado com `feTurbulence` em tela cheia, animado | usar com moderação, opacidade baixa, `steps()`; o `snapshot-reel` abre um Chrome por cena |

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

Formatos aceitos: `.mp3`, `.wav`, `.aac`, `.ogg`. As faixas ficam em `instagram-reels/music/` (no `.gitignore` — mp3 não entra no repositório).

O script:
- **Loopa** automaticamente se a música for mais curta que o reel
- **Aplica fade in** (0.8s) no início
- **Aplica fade out** (1.5s) no final
- **Reduz o volume** ao padrão 35% (`--volume 0.35`) para não sobrepor o conteúdo visual
- Encoda o áudio final em AAC 192kbps

Se o usuário não fornecer música, o reel é gerado sem áudio — o que também é uma opção válida: faixas da biblioteca nativa do Instagram costumam ter melhor distribuição, e áudio embutido concorre com isso. A versão com música serve para publicar em outros canais ou como fallback.

### Escolher o trecho da faixa (`--music-start`)

Por padrão a música começa do zero. Muitas faixas royalty-free só ganham corpo depois de 30–40s, e o começo é uma intro rala que enfraquece o hook.

```bash
--music-start end     # alinha o FIM da música com o fim do reel (recomendado)
--music-start 24      # começa em 24s da faixa
```

`end` calcula `duração_da_faixa − duração_do_reel` via ffprobe. Para um reel de 53,7s com uma faixa de 100s, começa em 46,4s — ou seja, o reel roda em cima do clímax. Use isso como padrão, salvo quando a faixa já abrir forte.

### Banco de músicas — Mixkit

**Mixkit** (mixkit.co, da Envato) é a fonte padrão: licença livre para uso comercial, **sem atribuição obrigatória**, e com mp3 em link direto — dá para baixar sem navegador. A única restrição é não redistribuir a faixa isolada, o que não afeta o uso em reel.

Alternativas se o Mixkit não tiver o clima certo:

| Fonte | Observação |
|---|---|
| **Pixabay Music** (pixabay.com/music) | Equivalente direto ao Pexels, sem atribuição. Bloqueia requisição automatizada (403) — download manual |
| **Free Music Archive** / **ccMixter** | Creative Commons, mas checar licença faixa a faixa (algumas exigem atribuição) |
| **Biblioteca de Áudio do YouTube** / **Uppbeat** | Boas, mas exigem login |

> O Pexels teve uma seção de música própria, mas o acervo hoje vive no Pixabay. Não existe skill `/pexels-search` equivalente para áudio.

#### Como buscar e baixar do Mixkit

As páginas de tag trazem um bloco JSON-LD com nome, gênero, artista, duração e URL do mp3 de cada faixa. Listar os candidatos:

```bash
python3 - <<'EOF'
import re, urllib.request

TAG = 'corporate'   # corporate | technology | inspiring | happy | dramatic ...
req = urllib.request.Request(f'https://mixkit.co/free-stock-music/tag/{TAG}/',
                             headers={'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64)'})
h = urllib.request.urlopen(req, timeout=25).read().decode('utf-8', 'ignore')

for m in re.finditer(r'"@type":"MusicRecording",(.*?)"datePublished"', h):
    b = m.group(1)
    name  = re.search(r'"name":"([^"]*)"', b)
    genre = re.search(r'"genre":"([^"]*)"', b)
    url   = re.search(r'"url":"([^"]*)"', b)
    d     = re.search(r'"duration":"PT(?:(\d+)M)?(?:(\d+)S)?"', b)
    secs  = int(d.group(1) or 0) * 60 + int(d.group(2) or 0) if d else 0
    print(f'{secs:>4}s  {name.group(1):<34} {genre.group(1):<18} {url.group(1)}')
EOF
```

O mp3 segue o padrão `https://assets.mixkit.co/music/<id>/<id>.mp3`. Baixar:

```bash
mkdir -p instagram-reels/music
curl -sL -A "Mozilla/5.0" "https://assets.mixkit.co/music/173/173.mp3" \
     -o instagram-reels/music/better-times-are-coming.mp3
```

#### Como escolher a faixa

1. **Baixar 3–4 candidatas com vibes distintas.** O critério é de gosto: a escolha final é do usuário
2. **Recomendar uma**, com justificativa ligada ao conteúdo do reel (a curva emocional do roteiro, não o visual das cenas), e **embuti-la** no `reel-NN.mp4`
3. **Gerar o reel com cada candidata** para comparação — `--resume` só refaz a mixagem (segundos), sem renderizar cenas:
   ```bash
   mkdir -p output/reel-NN/opcoes-musica
   for n in faixa-a faixa-b faixa-c faixa-d; do
     node scripts/export-reel.mjs reel-NN --resume --music music/$n.mp3 --volume 0.3
     cp output/reel-NN/reel-NN.mp4 output/reel-NN/opcoes-musica/reel-NN-$n.mp4
   done
   # por último, rode de novo com a recomendada para o reel-NN.mp4 final ficar com ela
   ```
   Ouvir o vídeo pronto decide melhor do que ouvir a faixa solta. Não afirme que a faixa "combina" sem ressalva — o agente não ouve o áudio.
4. **Casar com o público**, não com a estética: reel de venda para público não-técnico pede faixa otimista/crescente, mesmo que o visual seja dark; techno frio soa distante
5. **Sem vocais** — competem com o texto na tela
6. **Duração ≥ a do reel** sempre que possível, para evitar loop audível

#### Registrar no meta.json

Anotar a faixa e os parâmetros usados no campo `music`, para reproduzir o export depois:

```json
"music": "better-times-are-coming.mp3 (Mixkit #173) — --music-start end --volume 0.3"
```

---

## Formatos ousados (criatividade: Ousado)

Ao sugerir reels, inclua **ao menos uma opção narrativa ou ousada** além das de template. O `BRAND.md` define o teto
do cliente (hoje "Ousado") e o mix: registre `creativity` no `meta.json` e **nunca publique dois Ousados seguidos**.

| Formato | Exemplo | Quando usar | O que exige |
|---|---|---|---|
| **Objeto que fala** | reel-10 "O site que fala" | humor e identificação; dor do cliente contada pelo próprio problema | personagem com rosto feito de UI (olhos, boca sincronizada), voz expressiva (cansada, irônica), visual "velho de propósito" |
| **Paródia de gênero** | reel-11 "O caso do cliente que sumiu" (true crime) | tensão e retenção; transformar um dado abstrato em história concreta | narrador grave, códigos visuais do gênero (fichas, carimbos, horários), evidências entrando na fala |
| **Série com episódios** | "Caso nº 0418…" | quando um formato funciona; cria retorno | numeração visível, mesma abertura, gancho para o próximo no CTA |

Regras comuns:
- **Sair da marca no corpo, voltar para ela no CTA.** A última cena usa a identidade (fundo `#0f172a`, Manrope,
  acento cyan → indigo, handle) — é o que liga a peça ao perfil.
- O **próprio personagem pode pedir a ação** ("manda o meu link pro Adriano") — soa natural e não parece anúncio.
- **Tudo fictício e genérico**: negócio, endereço e telefone inventados ("Ferreira Elétrica", "(00) 0000-0000",
  "ferreiraeletrica.com.br"). Nunca marca, pessoa ou site real.
- Ícones e efeitos podem fugir do catálogo da marca, mas continuam **sem emojis nos HTMLs**.

---

## Reel narrado (voz com IA)

Para reels com narração (ex.: reel-10 "O site que fala", reel-11 "O caso do cliente que sumiu"):

1. **Roteiro** em `html/reel-NN/roteiro.md` e falas em `html/reel-NN/voz/falas.json` (uma fala por cena, `voice_id`, modelo, `voice_settings`). No `eleven_v3`, pausas são reticências e `[pause]`, emoções são tags em inglês (`[tired]`, `[sarcastic]`, `[sighs]`, `[whispers]`); números por extenso.
2. **Voz**: `node scripts/generate-voice.mjs reel-NN [--takes 2] [--only 1,3] [--voice-id id] [--out dir]`. Chave em `instagram-reels/.env` (`ELEVENLABS_API_KEY`, fora do git). A chave atual só tem permissão de text-to-speech (não lista vozes nem transcreve). Vozes usadas: Bill `pqHfZKP75CvOlQylNhV4` (cansado, personagem) e Brian `nPczCjzI2devNBz1zQrb` (narrador grave). George soa português de Portugal.
3. **Cenas**: um `scripts/build-reel-NN.mjs` por reel, usando `scripts/lib/voice-scenes.mjs`: duração da cena = atraso + áudio + respiro; frases da legenda casadas com os trechos de fala detectados por silêncio; palavras distribuídas dentro do trecho (karaokê); boca/elementos sincronizados pelo envelope do áudio. Cada cena no `meta.json` ganha `voice` e `voiceDelay`.
4. **Export**: `node scripts/export-reel.mjs reel-NN --transition cut --music music/faixa.mp3 --volume 0.3` — a fala entra no início de cada cena e a trilha abaixa sozinha sob a voz (sidechain). `--voice-volume`, `--no-voice`.
5. **Publicar com o selo "Informações de IA"** no Instagram (voz gerada por IA). Não imitar a voz de pessoa real.

O `validate-reel.mjs` não se aplica (mede leitura de texto parado; aqui a voz dita o tempo).

**Duração:** mire em **45–55 s** de reel. O `eleven_v3` fala com muitas pausas e os dois primeiros narrados saíram com
60–65 s. Ao enxugar, corte primeiro a cena de reforço (a que repete o argumento) e use `[pause]` só onde a pausa é
dramática; reticências já dão respiro.

**Sincronia:** os elementos de cada cena entram no início da frase que fala deles (o build recebe os instantes de
cada frase). Revise com `snapshot-reel.mjs --at` no meio de cada frase.

---

## Checklist antes de entregar — Reel

- [ ] Duração calculada pelo conteúdo (tabela de timing + `validate-reel.mjs`)
- [ ] `data-duration` definido em cada `<body>` (deve ser igual ao `duration` no meta.json)
- [ ] Animações de **entrada** em todos os elementos (fadeUp/fadeIn, `animation-fill-mode: both`)
- [ ] Ao menos **1 elemento animado contínuo** (`infinite`) por cena (glow, cursor, seta, sparkle...)
- [ ] Elementos contínuos com `animation-delay ≥ 0.8s` para não conflitar com entradas
- [ ] **Nenhuma animação em `::before` / `::after`** — só em elementos reais (pisca no vídeo)
- [ ] Sem emojis nos HTMLs — apenas ícones SVG inline
- [ ] Handle `@adrianomaringolo.dev` em todas as cenas
- [ ] Fonte Manrope carregada via Google Fonts
- [ ] Paleta dark respeitada (fundo `#0f172a`)
- [ ] `meta.json` com `duration` e `description` por cena, legenda e hashtags
- [ ] **Validação aprovada**: `node scripts/validate-reel.mjs reel-NN` → todos ✅ OK (reel narrado: não se aplica)
- [ ] **Revisão visual feita**: `node scripts/snapshot-reel.mjs reel-NN` → `grid.png` conferido, nada fora das safe zones, nada cortado ou coberto
- [ ] Texto essencial e legendas entre x 70–930 e y 120–1540 (safe zones do Reel)
- [ ] Números de pesquisa com fonte; números de ficção só dentro da narrativa
- [ ] Export executado: `node scripts/export-reel.mjs reel-NN [--music music/track.mp3 --music-start end]`
- [ ] Trilha recomendada embutida, alternativas em `output/reel-NN/opcoes-musica/`, faixa registrada no `music` do `meta.json`
- [ ] **MP4 único final gerado**: `output/reel-NN/reel-NN.mp4`
- [ ] **Capa exportada**: `node scripts/export-reel.mjs reel-NN --cover` → `output/reel-NN/cover.png`
- [ ] `caption.md` gerado e exibido para revisão
- [ ] Galeria na nuvem: `publicar` oferecido (ou rodado) para o reel aparecer em posts-adrianomaringolo.web.app
- [ ] `pauta` e `creativity` no `meta.json`; linha da pauta atualizada no `PAUTAS.md` (status + coluna Post)
- [ ] Ousado: CTA volta para a identidade da marca; nada de marca, pessoa ou contato real; não vem logo depois de outro Ousado
- [ ] Narrado: voz escolhida pelo usuário a partir de amostras; duração 45–55 s; aviso para publicar com o selo "Informações de IA"

---

## Checklist antes de entregar — Story

- [ ] **Objetivo definido** no `meta.json` (`objective`) e o formato serve a ele
- [ ] **3–5 frames** (1 também é válido; nunca mais de 7)
- [ ] Frame 1 é **padrão-interrupção** — prende nos primeiros 2s, sem capa institucional
- [ ] **Uma ideia por frame**; payoff não fica só no último card
- [ ] **Safe zones respeitadas** — rodar `--guides` e conferir que nada essencial invade topo/base/laterais
- [ ] `.sticker-slot` livre em todo frame que tem sticker
- [ ] Corpo ≥ 32px (48–52px se for o elemento principal do frame), títulos 72–100px (hook até 180px+), texto sobre scrim, `font-weight ≥ 600`
- [ ] **Ícone Lucide + micro-animação contínua** em cada bloco de conteúdo (float/tilt/pulse/shimmer)
- [ ] `duration` calculado pela fórmula de "Tempo de leitura" (settle + ≈200 WPM + 0,8s buffer, min. 0,8s/item em lista) — não um número arbitrário; na dúvida, arredonde pra cima
- [ ] **Ao menos 1 sticker nativo** especificado (`sticker` + `sticker_note`) no `meta.json`
- [ ] CTA único no último frame — link sticker + "toque aqui", ou "me siga" numa peça perene (nunca "arraste pra cima")
- [ ] `reply_prompt` definido — convite claro de resposta no direct
- [ ] `highlight` preenchido se a peça for perene (+ frame de capa pensado para o ícone do Destaque)
- [ ] Identidade visual **leve** (handle menor, sem moldura pesada de marca)
- [ ] Sem emojis nos HTMLs; ícones SVG inline; Manrope via Google Fonts; paleta dark
- [ ] Português revisado (frames, `meta.json`, textos de sticker/CTA no `story.md`)
- [ ] Decidido **PNG ou vídeo** (ver tabela) — se vídeo, **todo frame tem elemento contínuo** para não congelar
- [ ] Se vídeo concatenado: `transition.html` presente; trilha escolhida (`--music`) e registrada no `meta.json`
- [ ] Export executado: `node scripts/export-story.mjs story-NN [--video | --stitch | --music track.mp3]`
- [ ] `story.md` gerado e exibido para revisão (ordem, sticker por frame, CTA)
