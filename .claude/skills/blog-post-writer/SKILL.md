---
name: blog-post-writer
description: "Escreve um novo post para o blog de adrianomaringolo.dev (pt-BR + en-US), seguindo a voz e a estrutura já estabelecidas nos posts publicados. Pergunta tema, ângulo e tipo de post, escreve os dois MDX, sugere tags/slug/pasta e cuida das imagens (fotos via /pexels-search ou diagramas SVG). Uso: /blog-post-writer <tema ou ideia>. Exemplos: '/blog-post-writer próximo post da série SOLID: Single Responsibility em detalhe', '/blog-post-writer post sobre como decidir entre site institucional, landing page ou web app'."
---

# Escritor de Posts do Blog — adrianomaringolo.dev

Esta skill gera um post novo (ou continua uma série existente) no formato MDX bilíngue usado em `src/content/blog/`, seguindo a voz que já está estabelecida nos posts publicados — não um tom genérico de "blog técnico".

## Contexto de referência

Antes de escrever, releia pelo menos:
- Os dois posts já publicados, como exemplo de voz e estrutura:
  `src/content/blog/2026-06-08-why-every-developer-needs-a-portfolio/pt-BR.mdx`
  `src/content/blog/2026-07-14-solid-principles-in-react/pt-BR.mdx`
- `docs/BLOG_POST_IDEAS.md` — banco de ideias já mapeado a partir da carreira real do Adriano. Se o tema pedido bater com uma sugestão de lá, use o ângulo já pensado e depois marque o item como "Publicado" nesse arquivo.
- `src/data/career.ts` e `src/app/about/*` (se existirem) — para ancorar o post em experiência real (Codurance, Dextra/CI&T, Avenue Code, Sedna, Venturus, freelance) em vez de generalidades.

## Passo 1 — Alinhar tema e ângulo (sempre perguntar antes de escrever)

Nunca escreva a partir de um pedido vago. Pergunte (pode ser em uma única rodada de perguntas):

1. **Tema e ângulo**: qual é a tese central do post? Qual experiência real, projeto ou situação vai ancorar isso? (Se o tema veio do `BLOG_POST_IDEAS.md`, confirme o ângulo sugerido lá em vez de reperguntar do zero.)
2. **Tipo de post**, porque isso muda o padrão de abertura (ver Passo 2):
   - **Carreira/reflexivo** (ex.: portfólio, soft skills, trajetória)
   - **Técnico/aprofundamento** (ex.: série SOLID, performance, arquitetura) — precisa de exemplos de código reais quando o conceito pedir
   - **Serviços/negócio** (ex.: como funciona uma consultoria, quando contratar) — mais direto, intenção de busca comercial
3. **Parte de série?** Se sim (ex.: próxima letra do SOLID), leia o post anterior da série para manter o gancho ("O que vem a seguir" de um post vira a abertura implícita do próximo) e o mesmo padrão visual de diagrama.
4. **Rascunho ou publicação imediata?** Rascunhos usam prefixo `_` na pasta (ficam fora da listagem) até o Adriano revisar.

Não avance para o texto final sem essas respostas.

## Passo 2 — Voz e estilo (regras da casa)

A voz de referência é a dos posts de **2026** (os dois publicados), não a de textos antigos do Adriano (LinkedIn 2018, Medium 2018), que eram mais informais, com bullets pesados, perguntas retóricas diretas ao leitor ("Já parou pra pensar...?", "Calma jovem!") e piadinhas autodepreciativas. Essa fase antiga **não** é o alvo — a voz atual é mais madura, direta e confiante. Mas dois recursos bons daquela fase valem a pena reaproveitar quando fizerem sentido: **analogias concretas** para explicar um conceito técnico (ex.: comparar performance de app com desempenho de um jogador de futebol) e **anunciar continuação em série** no fechamento.

Regras concretas:

- **Abertura**: para posts de carreira/reflexivo, abra com uma cena pessoal concreta e datada quando possível ("A primeira vez que...", "Em algum momento da carreira..."). Para posts técnicos ou de serviço, a abertura pode ser mais direta (situação/problema reconhecível), mas ainda concreta — nunca genérica tipo "No mundo acelerado de hoje...".
- **Títulos de seção (`##`)**: curtos. Em posts reflexivos, podem ser aforísticos ("O mercado não te conhece. Mas pode te encontrar."). Em posts técnicos, use o termo técnico +, quando ajudar, uma linha em itálico logo abaixo resumindo a ideia em uma frase (ver padrão do post de SOLID).
- **Prosa é o padrão.** Não quebre ideias em bullet points por hábito. Bullets só quando o conteúdo é genuinamente uma lista, checklist ou sequência de passos.
- **Código**: em posts técnicos de aprofundamento, use exemplos reais de código (antes/depois) sempre que isso explicar o conceito melhor do que só prosa — não fique preso ao formato "só diagrama" do post introdutório do SOLID, que era uma escolha daquele post específico (visão geral rápida), não uma regra permanente.
- **Primeira pessoa, ancorado em experiência real.** Evite conselho abstrato ("desenvolvedores devem...") sem passar por uma situação vivida, um projeto, um erro cometido.
- **Fechamento**: uma frase de efeito que sintetiza a ideia, ou um gancho para o próximo post da série. Nunca feche com agradecimento genérico ("espero que isso seja útil, obrigado por ler") nem call-to-action forçado.
- **Evite**: emoji, exclamações em excesso, perguntas retóricas diretas ao leitor tipo "Já parou pra pensar...?", frases de abertura genéricas de IA ("Em um mundo cada vez mais...", "É inegável que..."), conclusões tipo "Em resumo, ..." como muleta.

## Passo 3 — Escrever pt-BR e en-US juntos

- **pt-BR é a voz nativa** — escreva esse primeiro, é o original.
- **en-US não é tradução literal.** É uma reescrita natural do mesmo conteúdo, mesma estrutura (mesmos headings, mesmas imagens, mesma ordem), mas com frases que soam naturais em inglês, não traduzidas palavra a palavra. Compare com o par já publicado (`2026-06-08-.../pt-BR.mdx` vs `en-US.mdx`) como referência de nível de liberdade aceitável.
- Frontmatter deve ser preenchido nos dois arquivos (tags idênticas nos dois, geralmente em português mesmo no arquivo en-US — é o padrão observado nos posts existentes).

## Passo 4 — Estrutura de arquivos e frontmatter

Pasta: `src/content/blog/YYYY-MM-DD-slug/` com dois arquivos, `pt-BR.mdx` e `en-US.mdx`. Prefixe a pasta com `_` (`_YYYY-MM-DD-slug`) se for rascunho — isso a exclui automaticamente da listagem (ver `src/lib/blog.ts`). O prefixo de data é só organizacional; a URL final usa o slug sem a data.

Frontmatter (mesmo formato nos dois idiomas):

```yaml
---
title: "Título do post"
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

- `readingTime`: é recalculado automaticamente no build (`words/200` sobre o conteúdo real, ver `calcReadingTime` em `src/lib/blog.ts`) — o valor do frontmatter é só cosmético/histórico, preencha uma estimativa razoável mas não perca tempo calculando com precisão.
- `tags`: minúsculas, em português, separadas por hífen quando forem compostas (`clean-code`). 3-5 tags.
- `image`: **precisa ser raster** (`.jpg`/`.png`), nunca `.svg` diretamente — é usada em Open Graph/Twitter cards (`src/app/blog/[slug]/page.tsx`), e a maioria das redes sociais não renderiza SVG em preview de link. Se o hero do post for um diagrama SVG, gere também uma versão PNG exportada para essa função (como em `hero-solid-overview-og.png` vs `hero-solid-overview.svg`).
- `featured`: só marque `true` se o Adriano confirmar — afeta o destaque na home/listagem.
- `tldr`: lista de 3-6 bullets, cada um uma frase autocontida (não fragmentos), cobrindo as ideias centrais do post — é renderizada como caixa de resumo no topo do artigo (`src/app/blog/[slug]/blog-post-client.tsx`). Sempre preencha; se ficar vazio, a página cai de volta pro `excerpt` como prosa, que é mais fraco como resumo. Escreva por último, depois do corpo do post pronto, resumindo o que ele realmente diz — não o que você planejava dizer.

## Passo 5 — Imagens

Decida por seção se a imagem é **foto** (contexto humano/ambiente) ou **diagrama** (conceito técnico/estrutural):

- **Fotos**: use a skill `pexels-search` (`/pexels-search <descrição> --output public/blog/<pasta>/<nome>.jpg --size hero|inline`). `hero` = 1200×500 (imagem de abertura), `inline` = 800×450 (imagens no meio do texto). Sempre escreva um `alt` descritivo da cena, não genérico.
- **Diagramas**: crie um SVG customizado (não use libs externas), seguindo o estilo visual já usado em `public/blog/2026-07-14-solid-principles-in-react/*.svg` — `viewBox="0 0 800 450"`, paleta suave, `<title>` descritivo para acessibilidade logo no topo do SVG. Salve em `public/blog/<pasta>/<nome>.svg`.
- Toda imagem no corpo do post é referenciada com Markdown padrão: `![alt descritivo](/blog/<pasta>/<nome>.ext)`.

## Passo 6 — Fechar o ciclo

1. Escreva os dois arquivos MDX completos.
2. Se o tema veio de `docs/BLOG_POST_IDEAS.md`, atualize a linha correspondente na tabela "Já publicados ou em andamento" para `✅ Publicado` (ou `📝 Rascunho` se a pasta ficou com prefixo `_`).
3. Sugira rodar o dev server e abrir `/blog/<slug>` (pt-BR e en-US) para revisão visual antes de considerar o post pronto — não afirme que o post está bom sem visualização.
4. Se o post for parte de uma série (SOLID, etc.), termine com um gancho explícito para o próximo, no mesmo espírito do "O que vem a seguir" do post introdutório.
