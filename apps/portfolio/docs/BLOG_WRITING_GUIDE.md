# Guia de Escrita do Blog — adrianomaringolo.dev

Regras de voz, estrutura e convenções para posts do blog. A skill `blog-post-writer`
(genérica, mora em `~/Projects/claude-skills`) lê este arquivo como fonte de verdade —
tudo que é específico deste projeto está aqui, não na skill.

Posts são MDX bilíngues em `src/content/blog/`. A voz de referência é a dos posts de
**2026**, não um tom genérico de "blog técnico".

---

## Material de referência (reler antes de escrever)

- **Posts publicados** — exemplo de voz e estrutura:
  - `src/content/blog/2026-06-08-why-every-developer-needs-a-portfolio/pt-BR.mdx`
  - `src/content/blog/2026-07-14-solid-principles-in-react/pt-BR.mdx`
  - Compare cada `pt-BR.mdx` com seu `en-US.mdx` para calibrar o nível de liberdade da versão em inglês.
- **`docs/BLOG_POST_IDEAS.md`** — banco de ideias mapeado a partir da carreira real do Adriano.
  Se o tema pedido bater com uma sugestão de lá, use o ângulo já pensado e, ao final,
  marque o item como publicado (ver "Fechar o ciclo").
- **`src/data/career.ts`** e **`src/app/about/*`** — para ancorar o post em experiência real
  (Codurance, Dextra/CI&T, Avenue Code, Sedna, Venturus, freelance) em vez de generalidades.

---

## Tipos de post

O tipo muda o padrão de abertura e a necessidade de código:

- **Carreira/reflexivo** — portfólio, soft skills, trajetória.
- **Técnico/aprofundamento** — série SOLID, performance, arquitetura. Precisa de exemplos de
  código reais (antes/depois) quando o conceito pedir.
- **Serviços/negócio** — como funciona uma consultoria, quando contratar. Mais direto,
  intenção de busca comercial.

---

## Voz e estilo

A voz-alvo é a dos dois posts publicados em 2026: madura, direta, confiante. **Não** é a fase
antiga do Adriano (LinkedIn/Medium 2018), que era mais informal, com bullets pesados, perguntas
retóricas diretas ao leitor ("Já parou pra pensar...?", "Calma jovem!") e piadinhas
autodepreciativas. Dois recursos daquela fase valem a pena reaproveitar quando fizerem sentido:
**analogias concretas** para explicar um conceito técnico (ex.: comparar performance de app com
desempenho de um jogador de futebol) e **anunciar continuação em série** no fechamento.

### Regras concretas

- **Abertura**: em posts de carreira/reflexivo, abra com uma cena pessoal concreta e datada
  quando possível ("A primeira vez que...", "Em algum momento da carreira..."). Em posts técnicos
  ou de serviço, a abertura pode ser mais direta (situação/problema reconhecível), mas ainda
  concreta — nunca genérica tipo "No mundo acelerado de hoje...".
- **Títulos de seção (`##`)**: curtos. Em posts reflexivos, podem ser aforísticos
  ("O mercado não te conhece. Mas pode te encontrar."). Em posts técnicos, use o termo técnico
  +, quando ajudar, uma linha em itálico logo abaixo resumindo a ideia em uma frase
  (padrão do post de SOLID).
- **Prosa é o padrão.** Não quebre ideias em bullet points por hábito. Bullets só quando o
  conteúdo é genuinamente uma lista, checklist ou sequência de passos.
- **Código**: em posts técnicos de aprofundamento, use exemplos reais de código (antes/depois)
  sempre que isso explicar o conceito melhor do que só prosa. Não fique preso ao formato
  "só diagrama" do post introdutório do SOLID — aquilo foi uma escolha daquele post (visão geral
  rápida), não uma regra permanente.
- **Primeira pessoa, ancorado em experiência real.** Evite conselho abstrato
  ("desenvolvedores devem...") sem passar por uma situação vivida, um projeto, um erro cometido.
- **Fechamento**: uma frase de efeito que sintetiza a ideia, ou um gancho para o próximo post da
  série. Nunca feche com agradecimento genérico ("espero que isso seja útil, obrigado por ler")
  nem call-to-action forçado.
- **Nunca use travessão (`—`) no texto do post.** Hoje ele é lido como marca de texto gerado por
  IA e contamina a percepção do artigo inteiro. Vale para os dois idiomas, incluindo frontmatter
  (`excerpt`, `tldr`), comentários dentro de blocos de código e lista de referências. No lugar:
  vírgula (o padrão da casa para aposto e inciso: "os problemas que o SOLID resolve, componentes
  que fazem coisa demais, código que quebra ao crescer, são os mesmos"), dois-pontos quando a
  segunda parte explica a primeira, ou quebre em duas frases. Parênteses servem quando o inciso
  já tem vírgulas dentro. Antes de fechar o post, rode `grep -n -- "—" <arquivo>.mdx` nos dois
  arquivos e resolva cada ocorrência. Posts publicados antes desta regra (SOLID introdutório, SRP)
  ainda têm travessões — não os copie como referência de pontuação.
- **Evite**: emoji, exclamações em excesso, perguntas retóricas diretas ao leitor, frases de
  abertura genéricas de IA ("Em um mundo cada vez mais...", "É inegável que..."), conclusões
  tipo "Em resumo, ..." como muleta.

---

## pt-BR + en-US

- **pt-BR é a voz nativa** — escreva esse primeiro, é o original.
- **en-US não é tradução literal.** É uma reescrita natural do mesmo conteúdo, mesma estrutura
  (mesmos headings, mesmas imagens, mesma ordem), com frases que soam naturais em inglês.
  Use o par já publicado (`2026-06-08-.../pt-BR.mdx` vs `en-US.mdx`) como referência de nível
  de liberdade aceitável.
- Frontmatter preenchido nos dois arquivos. **Tags idênticas nos dois**, geralmente em português
  mesmo no arquivo `en-US` — é o padrão observado nos posts existentes.

---

## Estrutura de arquivos

Pasta: `src/content/blog/YYYY-MM-DD-slug/` com dois arquivos, `pt-BR.mdx` e `en-US.mdx`.

- Prefixe a pasta com `_` (`_YYYY-MM-DD-slug`) se for rascunho — isso a exclui automaticamente
  da listagem (ver `src/lib/blog.ts`).
- O prefixo de data é só organizacional; a URL final usa o slug sem a data.

### Frontmatter (mesmo formato nos dois idiomas)

```yaml
---
title: "Título do post"
series: "Nome da Série"
excerpt: "Um ou dois períodos que resumem a tese central, não um teaser vago."
author: "Adriano Maringolo"
publishedAt: "YYYY-MM-DD"
readingTime: 7
tags: ["tag1", "tag2", "tag3"]
featured: false
image: "/blog/YYYY-MM-DD-slug/hero-nome.jpg"
tldr:
  - "Primeiro ponto-chave do artigo, uma frase autocontida."
  - "Segundo ponto-chave."
  - "Terceiro ponto-chave."
---
```

- **`readingTime`**: recalculado no build (`words/200` sobre o conteúdo real, ver
  `calcReadingTime` em `src/lib/blog.ts`). O valor do frontmatter é cosmético/histórico —
  preencha uma estimativa razoável, não perca tempo com precisão.
- **`series`**: opcional. Só existe quando o post integra uma série; omita a chave inteira em
  post avulso (não deixe string vazia). É o único campo que se traduz junto com `title` e
  `excerpt`: `"SOLID no React"` no `pt-BR.mdx`, `"SOLID in React"` no `en-US.mdx`. Escreva
  exatamente o mesmo nome em todos os posts da série — é a chave que os agrupa, e uma variação
  de grafia quebra o agrupamento. Aparece como eyebrow acima do título, na listagem e nos cards
  de posts relacionados, e entra no JSON-LD como `isPartOf`.
- **`tags`**: minúsculas, em português, hífen quando compostas (`clean-code`). 3-5 tags.
- **`image`**: precisa ser raster (`.jpg`/`.png`), nunca `.svg` diretamente — é usada em
  Open Graph/Twitter cards (`src/app/blog/[slug]/page.tsx`) e a maioria das redes não renderiza
  SVG em preview de link. Se o hero for um diagrama SVG, gere também uma versão PNG exportada
  (como `hero-solid-overview-og.png` vs `hero-solid-overview.svg`).
- **`featured`**: só marque `true` se o Adriano confirmar — afeta o destaque na home/listagem.
- **`tldr`**: 3-6 bullets, cada um uma frase autocontida (não fragmentos), cobrindo as ideias
  centrais. Renderizado como caixa de resumo no topo do artigo
  (`src/app/blog/[slug]/blog-post-client.tsx`). Sempre preencha; se ficar vazio a página cai
  de volta pro `excerpt` como prosa, que é mais fraco. Escreva por último, depois do corpo
  pronto, resumindo o que o post realmente diz — não o que você planejava dizer.

---

## Imagens

Decida por seção se a imagem é **foto** (contexto humano/ambiente) ou **diagrama**
(conceito técnico/estrutural):

- **Fotos**: skill `pexels-search` —
  `/pexels-search <descrição> --output public/blog/<pasta>/<nome>.jpg --size hero|inline`.
  `hero` = 1200×500 (imagem de abertura), `inline` = 800×450 (meio do texto). Sempre um `alt`
  descritivo da cena, não genérico.
- **Diagramas**: SVG customizado (sem libs externas), no estilo visual de
  `public/blog/2026-07-14-solid-principles-in-react/*.svg` — `viewBox="0 0 800 450"`, paleta
  suave, `<title>` descritivo para acessibilidade logo no topo do SVG. Salve em
  `public/blog/<pasta>/<nome>.svg`.
- Toda imagem no corpo é referenciada com Markdown padrão:
  `![alt descritivo](/blog/<pasta>/<nome>.ext)`.

---

## Fechar o ciclo

1. Escreva os dois arquivos MDX completos.
2. Se o tema veio de `docs/BLOG_POST_IDEAS.md`, atualize a linha correspondente na tabela
   "Já publicados ou em andamento" para `✅ Publicado` (ou `📝 Rascunho` se a pasta ficou com
   prefixo `_`).
3. Sugira rodar o dev server e abrir `/blog/<slug>` (pt-BR e en-US) para revisão visual antes
   de considerar o post pronto — não afirme que o post está bom sem visualização.
4. Se o post for parte de uma série, termine com um gancho explícito para o próximo, no mesmo
   espírito do "O que vem a seguir" do post introdutório.
