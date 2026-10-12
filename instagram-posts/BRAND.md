# Instagram — Adriano Maringolo (@adrianomaringolo.dev)

Regras de identidade visual e voz para os posts do Instagram. A skill `instagram-post`
(genérica, mora em `~/Projects/claude-skills/skills/instagram-post`) lê este arquivo como
fonte de verdade.

**Este projeto usa templates.** Antes de desenhar qualquer slide, leia
[`templates/TEMPLATES.md`](templates/TEMPLATES.md) e **pergunte ao usuário qual template
seguir**. O detalhamento técnico completo de cores, componentes e CSS está em
[`design-system.md`](design-system.md); a estratégia editorial está em
[`estrategia-conteudo.md`](estrategia-conteudo.md).

---

## Conta e marca

- **Handle**: `@adrianomaringolo.dev`

> As seções **Sobre o negócio**, **Público-alvo**, **Voz da marca**, **Temas e restrições**,
> **Contato e CTA** e **Datas e frequência** têm trechos marcados com `<!-- definicao:… -->`:
> eles são editados pelo cliente na aba Configurações da galeria e voltam para cá com
> `galeria-cloud.mjs sincronizar`. Edite o texto entre os marcadores, nunca os marcadores.

## Sobre o negócio

<!-- definicao:negocio -->
Adriano Maringolo, engenheiro de software sênior com 17 anos de carreira. Trabalha numa
consultoria internacional e faz sites e sistemas sob medida para pequenos negócios e
profissionais autônomos, direto com o cliente, sem agência no meio.

**O que oferece**
- Site institucional: para empresas e profissionais se apresentarem com credibilidade.
- Landing page: para converter o tráfego de uma campanha ou de um produto.
- Web app / sistema sob medida: para produtos com login, dados e regras de negócio próprias.
- Serviços adicionais: sistema de blog, CRM básico e outros, sob orçamento.

**Incluso em todo projeto**: responsivo, SEO, AEO e GEO, performance, publicação com domínio e
HTTPS, hospedagem e manutenção mensal (a compra e a renovação do domínio ficam por conta do
cliente).

**Diferenciais**: prazo e preço fechados desde o começo; honestidade técnica em linguagem de
negócio, explicando decisões de tecnologia para quem não é técnico, sem vender fumaça.

**Atendimento**: remoto.
<!-- /definicao:negocio -->

## Público-alvo

<!-- definicao:publico -->
**Principal: dono de negócio ou profissional autônomo.** Clínicas, personal chefs,
prestadores de serviço, pequenas marcas e organizações.
- Dor: o cliente procura no Google e acha o concorrente; site amador ou inexistente;
  dependência de indicação; não sabe o que pedir nem quanto custa.
- Procura: site institucional, landing page, portfólio, e-commerce simples.
- Fala de: resultado, credibilidade, ser encontrado, tempo e custo.

**Secundário: founder, PM ou CTO de empresa pequena** que precisa de um parceiro técnico
confiável para produto web (web app, dashboard, consultoria de arquitetura e performance).

**Apoio: comunidade dev.** Não compra, mas sustenta credibilidade e indicações. Não deve
dominar o feed.
<!-- /definicao:publico -->

---

## Templates

| ID | Quando |
|---|---|
| `foto-editorial` | Tema com pessoa, ambiente ou objeto real |
| `tipografico` | Conceito, lista, comparativo — sem foto |
| `case-showcase` | Projeto entregue, prova de trabalho |
| `dado-visual` | Uma estatística é o protagonista |
| `explicador-tecnico` | Explicar um mecanismo com diagrama |
| `frase-unica` | Post único, uma ideia forte |
| `foto-protagonista` | A imagem é o conteúdo, só um título no topo |
| `elemento-central` | Post mínimo: um elemento no centro + frase curta |

Cada template tem seu `.md` em `templates/` com capa, slides internos, fecho, uso de
imagem, escala tipográfica, variações permitidas e travas — e abre com um **preview
renderizado** (imagens de exemplo com conteúdo placeholder em
[`templates/previews/`](templates/previews/)).
**O template escolhido vai registrado em `meta.json`, no campo `"template"`.**

Para mexer no conjunto de templates, use os comandos da skill em vez de editar na mão:
`/instagram-post criar-template [ideia]` e `/instagram-post refinar-template [id] [o que mudar]`.

---

## Pilares de conteúdo

| Pilar | O que é | Mix |
|---|---|---|
| 1. Educação para o cliente | Tipos de site, custo, prazo, SEO, o que perguntar antes de contratar | 35% |
| 2. Prova e bastidores | Cases, processo, decisões de UX, métricas | 25% |
| 3. Serviços e oferta | O que faz, para quem, como é trabalhar junto | 15% |
| 4. Autoridade técnica | SOLID, Clean Code, React, IA no fluxo de trabalho | 15% |
| 5. Humano e opinião | Rotina CLT + freela, carreira, valores | 10% |

Regra: a cada 10 conteúdos, no máximo 2 de venda direta (pilar 3).

### Tags (campo `"tags"` do `meta.json`)

Viram os filtros (pills) da galeria. Use só este vocabulário, com esta grafia (minúsculas,
exceto siglas). Todo post leva **1 tag de pilar + 1 ou 2 de tema**, e a de série quando fizer
parte de uma.

| Grupo | Tags |
|---|---|
| Pilar (exatamente 1) | `educação` · `prova` · `serviços` · `autoridade` · `humano` · `engajamento` (enquete, mito ou verdade) |
| Tema | `IA` · `SEO` (inclui Google, AEO/GEO) · `presença digital` · `contratar site` (tipo, custo, prazo, como escolher) · `site na prática` (velocidade, HTTPS, celular, WhatsApp, domínio, manutenção) · `case` · `carreira` · `software` · `dados` (post de estatística) |
| Série | `série: <nome>` — ex.: `série: nível de uso da IA`, `série: ranqueamento no Google`, `série: software para quem não é dev`, `série: perder cliente sem site` |

Tema novo só quando nenhum dos atuais couber; ao criar, registre aqui.

---

## Voz da marca

<!-- definicao:voz -->
**Adjetivos**: direta, honesta, didática, sem hype, com opinião.

**Nunca**:
- Abertura genérica ("No mundo agitado de hoje...", "Você sabia que...").
- Promessa de resultado que não se controla ("seu site vai triplicar as vendas").
- Jargão técnico sem tradução para linguagem de negócio.
- Número, métrica ou pesquisa sem fonte.
- Tom de guru / coach de LinkedIn.
<!-- /definicao:voz -->

**Regras de linguagem inegociáveis**:
- **Português do Brasil revisado**: acentuação, concordância verbal e nominal, ponto final
  em frases declarativas dentro de cards e callouts.
  Erros comuns a caçar antes de exportar: `nao → não` · `voce → você` · `ja → já` ·
  `e → é` (verbo) · `codigo → código` · `funcao → função` · `geracao → geração` ·
  `tecnico → técnico` · `magica → mágica`.
- **Travessão (—): no máximo 1 por slide.** Prefira dois-pontos, vírgula ou frase nova.
- **Imperativo sempre na forma culta (subjuntivo), nunca a coloquial do indicativo.**
  Vale para títulos, CTAs, legenda e qualquer instrução ao leitor:
  `Alugue` (não `Aluga`) · `Construa` (não `Constrói`) · `Comece` (não `Começa`) ·
  `Faça` (não `Faz`) · `Tenha` (não `Tem`) · `Escolha` (não `Escolhe`) ·
  `Peça` (não `Pede`) · `Salve` (não `Salva`) · `Siga` (não `Segue`) ·
  `Veja` (não `Vê`) · `Diga` (não `Diz`) · `Não deixe` (não `Não deixa`) ·
  `Não perca` (não `Não perde`).
  Consistência: o post inteiro mantém a mesma pessoa.
- Sem abreviação que prejudique a leitura.

---

## Temas e restrições

<!-- definicao:temas -->
**Queremos falar de**: tipos de site, custo e prazo, SEO, AEO e GEO; cases e bastidores de
projetos; como é trabalhar junto; código limpo e IA no trabalho; rotina e carreira.

**Evitar**: venda direta em excesso (no máximo 2 a cada 10 posts); conteúdo só para devs
dominando o feed.

**Preço**: posts sobre custo de site explicam os fatores que definem o preço, sem valores em R$.

**Oferta**: hospedagem e manutenção fazem parte de todo pacote. Nunca tratar como extra nem
falar em "período de suporte" limitado.

**Termos**: AEO (Answer Engine Optimization) e GEO (Generative Engine Optimization), sempre
com a tradução para linguagem de negócio.
<!-- /definicao:temas -->

## Contato e CTA

<!-- definicao:contato -->
- **Destino principal**: o site adrianomaringolo.dev (formulário de orçamento), via link na bio.
- **CTAs que usamos**: "Peça um orçamento", "Me chame", "Comente que eu respondo",
  "Salve este post".
- **Oferta atual**: agenda aberta para novos projetos.
- **Hashtags de base**: #sitesprofissionais #presencadigital #pequenosnegocios #empreendedorismo
<!-- /definicao:contato -->

## Datas e frequência

<!-- definicao:datas -->
**Datas importantes** (uma por linha, "- dd/mm — evento"; sem ano, repete todo ano):
- (nenhuma cadastrada ainda)

**Frequência**: 4 posts por semana no feed (2 reels, 1 carrossel e 1 post de frase); no mínimo 3
nas semanas corridas. Stories de 5 a 7 dias por semana.

**Melhores horários** (ajustar com os Insights): terça a quinta, 12h–13h e 19h–21h para reels;
fim de semana de manhã para frases e cases.
<!-- /definicao:datas -->

---

## Paleta

### Claro (slides internos — padrão)
| Papel | Hex |
|---|---|
| Fundo | `#f5f7fa` |
| Texto forte | `#0f172a` |
| Texto médio | `#475569` |
| Texto fraco | `#64748b` / `#94a3b8` |
| Card | `#ffffff` |
| Borda | `#e2e8f0` |

### Escuro (capa / CTA)
| Papel | Hex |
|---|---|
| Fundo capa (foto/diagrama) | `#0a1226` |
| Fundo capa (showcase) | `#080f1e` |
| Fundo CTA | `#0f172a` |
| Texto forte | `#f1f5f9` |
| Texto médio | `#cbd5e1` |
| Texto fraco | `#475569` / `#64748b` |

### Acento (âncora da marca)
`cyan #06b6d4` (escuro) / `#0891b2` (claro) + `indigo #6366f1`.
Gradiente: `linear-gradient(90deg, #06b6d4, #6366f1)` (ou `180deg` na vertical).

O gradiente é **pontual**: headline em `<em>`, accent borders, dot ativo, elemento de
destaque. Nunca como fundo de área grande.

---

## Tipografia

```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

**Manrope** para tudo. Escala varia por template — ver o `.md` de cada um. Referência geral:

| Papel | Tamanho | Peso |
|---|---|---|
| Headline de capa | 88–116px | 900, `letter-spacing: -0.03em` a `-0.04em` |
| Headline interno | 58–68px | 900 |
| Subtítulo de capa | 32–39px | 500 |
| Corpo | 24–32px | 500, `line-height: 1.5` |
| Eyebrow / label | 15–22px | 700, uppercase, `letter-spacing: 0.1em–0.16em` |
| Card: título / subtítulo | 24–28px / 19–22px | 800 / 500 |

---

## Elementos de marca (todos os slides, todos os templates)

- **Accent borders**: `.accent-left` 5px vertical + `.accent-top` 5px horizontal, gradiente
  cyan→indigo, `z-index: 20`.
- **Handle**: `<div class="handle"><em>@</em>adrianomaringolo.dev</div>`, rodapé direito,
  `@` em cyan.
- **Progress dots** (só em carrossel): 28×6px inativos, ativo 48px com gradiente,
  centralizado em `bottom: 52px`. Quantidade = total de slides.
- **Fundo claro**: `.blob-1` cyan + `.blob-2` indigo (radial sutil) + `.bg-dots` (grid de
  pontos 40px).
- **Fundo escuro**: grid de linhas indigo 54px ou `.bg-dots` claro + glows radiais.
- **CTA**: `cta-box` com borda cyan translúcida e `adrianomaringolo.dev` em gradiente 50px.

Não há logo — a marca é o gradiente + o handle + a fonte.

---

## Slide de fechamento (CTA) — varie o formato

O último slide do carrossel **nunca** é só título + espaço vazio + URL. Ele precisa ter um
conteúdo visual próprio, ligado ao tema do post. Existem 4 formatos; **alterne entre eles**
e não repita o mesmo formato em dois carrosséis seguidos (confira o fecho dos últimos posts
no `POSTS.md` antes de escolher).

| ID | Formato | O que tem no slide | Quando funciona melhor |
|---|---|---|---|
| `fecho-grafico` | Gráfico claro | Fundo claro, título com `<em>` em gradiente, **ilustração rabiscada que resume a escolha ou a ideia do post** (traço `#1e293b`, um único elemento em gradiente), linha `#e2e8f0` e URL em gradiente 66px | Post que compara caminhos ou explica um conceito que dá para desenhar |
| `fecho-desfechos` | Escuro com desfechos | Fundo escuro, título em 1ª pessoa e **2 cards de "se… então…"** (um neutro, outro destacado em gradiente) mostrando o que acontece quando a pessoa chama | Post de decisão, objeção ou oferta: deixa claro o que esperar da conversa |
| `fecho-foto` | Fotográfico | Segunda foto (`bg-final.jpg`) na metade de baixo, com fade e scrim; título e frase no topo, URL sobre faixa escurecida | Post com pessoa ou ambiente real, quando existe uma segunda foto boa |
| `fecho-recap` | Escuro com recapitulação | Fundo escuro, título-conclusão e **3 linhas numeradas** retomando os pontos do post (pergunta pequena + resposta grande) | Lista ou checklist, quando a recapitulação acrescenta. Evite se o penúltimo slide já resume |

Referência visual de cada formato (feitos para o `post-41`):
[`templates/previews/fechos/`](templates/previews/fechos/) — `fecho-A.png` (gráfico) ·
`fecho-B.png` (desfechos) · `fecho-C.png` (foto) · `fecho-D.png` (recap).
Para regerar: `node scripts/export-templates.mjs fechos`.

**Compatibilidade com os templates** (as travas do template continuam valendo):

| Template | Formatos de fecho permitidos |
|---|---|
| `foto-editorial` | todos |
| `tipografico` | `fecho-desfechos`, `fecho-recap` (fecho sempre escuro e sem foto) |
| `explicador-tecnico` | `fecho-desfechos`, `fecho-recap` (escuro, sem foto) |
| `case-showcase`, `dado-visual` | `fecho-desfechos`, `fecho-recap` |
| `frase-unica`, `elemento-central` | não têm fecho (post único) |

Para usar `fecho-grafico` ou `fecho-foto` num template que hoje trava o fecho escuro, rode
`/instagram-post refinar-template <id>` antes.

Em todos os formatos: URL `adrianomaringolo.dev` em gradiente, `cta-label` curto convidando
para o próximo passo, progress dots e handle. Registre o formato usado no bloco do post em
`POSTS.md` (ex.: "Fecho: `fecho-grafico`").

---

## Ícones

**Lucide** (https://lucide.dev) por padrão. Sempre o path real da biblioteca, copiado —
**nunca desenhado de memória**. Wrapper padrão:
`viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
stroke-linecap="round" stroke-linejoin="round"`.

Um único conjunto por post, mesmo `stroke-width` em todos.
**Nunca emoji nos slides HTML** — emoji é exclusividade da legenda.

---

## Fotos

- Moram na pasta do post, referenciadas com path **relativo**: `url('bg-cover.jpg')`.
- Nomes convencionados: `bg-cover.jpg` (capa), `bg-final.jpg` (fecho), `bg.jpg` (post único),
  `foto.jpg` (retrato), `shot-*.png` (screenshots de projeto).
- Mínimo 1080×1350; ideal 1620×2025.
- Sobre foto, sempre overlay/scrim escuro o bastante para o texto passar em contraste AA.
- Foto própria > Pexels. Pexels via `/pexels-search`, com enquadramento ligado ao tema.

---

## Acessibilidade

- Contraste mínimo 4.5:1 em corpo de texto.
- `#94a3b8` sobre `#f5f7fa` só para texto de apoio ≥17px e peso ≥600.
- Nunca texto claro sobre foto sem scrim.

---

## Legenda (caption)

Diferente dos slides, **na legenda emoji é bem-vindo**:

- Abre com emoji ou frase de impacto.
- Emoji como marcador de lista (`→ 🛠️ item`) ou pontuação visual, sem exagero.
- Tom conversacional, direto.
- Fecha com CTA claro (`👇`, `💬`, `🔔`, link na bio).
- 8–12 hashtags ao final.

| Contexto | Emojis |
|---|---|
| Abertura / saudação | 👋 🙌 |
| Desenvolvedor / código | 👨‍💻 💻 ⌨️ |
| Dica técnica | ⚡ 🛠️ 🔧 |
| Clean Code / qualidade | 🧹 ✅ 🎯 |
| Carreira / crescimento | 🚀 📈 🏆 |
| Localização / contexto | 🇵🇹 🌍 |
| CTA / engajamento | 👇 💬 🔔 ❤️ |

---

## Estrutura de arquivos

| O quê | Caminho |
|---|---|
| Índice de templates | `instagram-posts/templates/TEMPLATES.md` |
| Previews dos templates | `instagram-posts/templates/previews/` |
| Design system (CSS e componentes) | `instagram-posts/design-system.md` |
| Estratégia editorial | `instagram-posts/estrategia-conteudo.md` |
| Banco de ideias | `instagram-posts/ideas.md` |
| HTML dos slides | `instagram-posts/html/post-NN/` |
| PNGs exportados (gitignore) | `instagram-posts/output/post-NN/` |
| Script de export | `node instagram-posts/scripts/export.mjs post-NN` |
| Export dos previews | `node instagram-posts/scripts/export-templates.mjs [id]` |
| Índice de posts | `instagram-posts/POSTS.md` |

Próximo ID: veja o maior `post-NN` em `instagram-posts/html/` e some 1.

### meta.json

```json
{
  "title": "Título do post",
  "date": "YYYY-MM-DD",
  "type": "carousel | single",
  "template": "foto-editorial",
  "format": "1080x1350",
  "slides": [
    { "file": "slide-01.html", "title": "Capa", "description": "O que contém" }
  ],
  "caption": "Legenda completa pronta para copiar...",
  "hashtags": ["tag1", "tag2"]
}
```

---

## Referências no repo

- `src/app/globals.css` — tokens de design do site (origem da paleta).
- `instagram-posts/html/` — todos os posts anteriores, por template.
- `instagram-posts/content-plan.md` — calendário.
