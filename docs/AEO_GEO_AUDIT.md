# Auditoria de AEO e GEO — adrianomaringolo.dev

> Análise feita em 2026-07-14, complementar ao [`SEO_AUDIT.md`](./SEO_AUDIT.md).
> Baseada em inspeção de código, `next build` de produção e verificação do HTML
> real servido (sem executar JS) — a mesma metodologia usada na auditoria de SEO,
> porque é exatamente o que a maioria dos crawlers de IA também faz.

## O que são AEO e GEO, neste contexto

- **AEO (Answer Engine Optimization)** — otimizar para superfícies que respondem
  diretamente a uma pergunta sem exigir clique: Featured Snippets do Google,
  "People Also Ask", assistentes de voz (Siri, Google Assistant, Alexa). Depende
  de conteúdo formulado como resposta direta a perguntas, `FAQPage`/`HowTo`
  schema, e frases curtas e extraíveis perto de headings que espelham a pergunta.
- **GEO (Generative Engine Optimization)** — otimizar para mecanismos generativos
  que **leem, sintetizam e citam** conteúdo da web: ChatGPT (modo busca), 
  Perplexity, Google AI Overviews/Gemini, Claude e Copilot com navegação. Esses
  sistemas (1) rastreiam a web — geralmente com bots que **não executam
  JavaScript**, (2) recuperam/rankeiam páginas, e (3) extraem fatos para
  sintetizar ou citar. Depende de: o crawler conseguir acessar o conteúdo real
  (sem JS), dados estruturados (`schema.org`, `llms.txt`), fatos verificáveis e
  bem formulados, e sinais de atualidade/autoria.

Boa parte da base para os dois já foi resolvida como efeito colateral da
auditoria de SEO — principalmente o item 1 de lá (conteúdo real no HTML
servido) é **pré-requisito direto** para GEO, porque bots como `GPTBot`,
`ClaudeBot` e `PerplexityBot` não rodam JavaScript: se o HTML tivesse
continuado só um spinner de "Carregando...", nenhum desses sistemas veria
qualquer conteúdo do site, independente de qualquer outra otimização.

> **Atualização (2026-07-14):** os itens 1, 2, 3, 4, 6 e 7 foram corrigidos e
> verificados (build de produção + `curl` + captura visual via Playwright para
> o item 3). O item 5 foi deliberadamente **não** implementado — é a mesma
> decisão já tomada no item 4 do `SEO_AUDIT.md` (custo de manter URLs reais por
> idioma em todo o site), só reafirmada aqui. O item 8 já estava correto,
> nenhuma ação necessária.

## Resumo dos achados

| # | Item | Tipo | Esforço | Impacto | Status |
|---|---|---|---|---|---|
| 1 | Sem `llms.txt` | GEO | Baixo | Alto | ✅ Corrigido |
| 2 | `Person` JSON-LD raso — não usa os fatos que já existem no site | GEO/AEO | Baixo | Alto | ✅ Corrigido |
| 3 | Sem conteúdo em formato pergunta-resposta (`FAQPage`) | AEO | Médio | Alto | ✅ Corrigido |
| 4 | Bio "extraível" existe nos dados, mas a cópia visível é mais slogan que fato | AEO/GEO | Baixo | Médio | ✅ Corrigido |
| 5 | Conteúdo em inglês só existe atrás de troca de idioma client-side (exceto blog) | GEO | — (já mapeado no item 4 do SEO_AUDIT) | Médio | Decidido não fazer |
| 6 | Sinais de atualidade incompletos (`dateModified`, `lastModified` do sitemap) | GEO | Baixo | Baixo–Médio | ✅ Corrigido |
| 7 | Testemunhos não estruturados | GEO | Baixo | Baixo | ✅ Corrigido |
| 8 | Acesso de crawlers de IA — já está bem | GEO | — | — | Nenhuma ação necessária |

---

## 1. ~~Sem `llms.txt`~~ CORRIGIDO

> ✅ **Corrigido em 2026-07-14.**

`llms.txt` é uma proposta de convenção (análoga ao `robots.txt`/`sitemap.xml`,
hoje adotada por um número crescente de sites e ferramentas — inclusive o
próprio `react-html-content-editor`, que **já tem um `llms.txt` publicado**,
segundo a descrição do projeto em `src/data/projects/react-html-content-editor.ts`)
para dar a agentes de IA um índice curado e em Markdown do site: quem é a
pessoa/produto, principais páginas, e um resumo direto do que cada uma contém —
sem precisar raspar HTML e adivinhar o que é conteúdo principal vs. navegação,
animação, etc.

O portfólio em si não tinha um.

**O que foi feito:** `src/app/llms.txt/route.ts` — um Route Handler que gera o
conteúdo dinamicamente a partir de `@/data/projects` e `getBlogPosts()` (os
mesmos dados que já alimentam `sitemap.ts`), então não é conteúdo novo pra
manter, é só uma nova "vista" em Markdown sobre o que já existe: a bio direta
(item 4), as páginas principais e a lista completa de projetos e posts com link
e descrição de cada um.

**Verificação:** `curl https://.../llms.txt` (local: `curl http://localhost:PORT/llms.txt`)
confirma o Markdown gerado corretamente, incluindo todos os 8 projetos e o post
de blog publicado.

---

## 2. ~~`Person` JSON-LD raso~~ CORRIGIDO — o site já tinha os fatos, só não estavam estruturados

> ✅ **Corrigido em 2026-07-14.**

O schema `Person` adicionado em `src/app/layout.tsx` (via `docs/SEO_AUDIT.md`
item 8) tinha só:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Adriano Maringolo",
  "url": "https://adrianomaringolo.dev",
  "jobTitle": "Full-stack Software Engineer",
  "image": "https://adrianomaringolo.dev/images/about-profile-photo-light.jpeg",
  "sameAs": ["...github...", "...linkedin...", "...instagram..."]
}
```

Isso é o suficiente para SEO básico, mas motores generativos se beneficiam de
entidades mais completas. O site já tinha esses fatos espalhados em
`about.history` (2009, Venturus/Dextra/Avenue Code/Codurance, tech lead,
instrutor), `about.availability`, o "São Paulo" citado em `hero-section.tsx`, e
a lista curada de tecnologias em `about-technologies.tsx` — só não estavam no
schema.

**O que foi feito:** `personJsonLd` em `src/app/layout.tsx` ganhou:

```ts
{
  // ...o que já existia...
  description: t.about.directBio, // a bio direta do item 4
  worksFor: { '@type': 'Organization', name: 'Codurance' },
  alumniOf: ['Venturus', 'Dextra', 'Avenue Code'],
  address: { '@type': 'PostalAddress', addressLocality: 'São Paulo', addressCountry: 'BR' },
  knowsAbout: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'GraphQL', 'PostgreSQL', 'AWS'],
}
```

`t.about.directBio` vem de `getTranslations('pt-BR')` (`@/lib/i18n`), então a
description do schema é literalmente a mesma frase renderizada em `/about` — sem
duplicar o texto em dois lugares que podem divergir com o tempo.

**Verificação:** `curl` confirma o JSON-LD completo em produção, com todos os
campos acima corretamente populados.

---

## 3. ~~Sem conteúdo em formato pergunta-resposta~~ CORRIGIDO

> ✅ **Corrigido em 2026-07-14.**

Não havia nenhuma seção de perguntas frequentes no portfólio — nem na Home, nem
em `/about`, nem em `/contact`. Curiosamente, os **sites de clientes** que o
Adriano construiu têm isso (ex: `golaser-barao-geraldo` tem "FAQ completo sobre
depilação a laser"), mas o portfólio dele mesmo não tinha.

Essa era a lacuna de maior impacto pra AEO especificamente: motores de resposta
são otimizados pra extrair pares pergunta→resposta diretos, e sem esse formato
eles têm que inferir a resposta a partir de parágrafos de marketing.

**O que foi feito:** novo componente `src/app/about/_components/about-faq.tsx`,
adicionado ao final de `/about`, com 6 perguntas (chaves `about.faq.q1`–`q6`/
`a1`–`a6` nos dois locales):

- Quem é Adriano Maringolo?
- Ele faz trabalho freelance?
- Quais tecnologias ele domina?
- Onde ele mora / em que fuso horário trabalha?
- Que tipo de projeto ele aceita?
- Como entrar em contato?

Duas decisões deliberadas na implementação:
- **Sem accordion/collapse.** Todas as respostas ficam sempre visíveis no DOM.
  Um FAQ que colapsa via `AnimatePresence` (como
  `project-collapsible-section.tsx` já faz em outro lugar do site) **desmonta**
  o conteúdo colapsado — um crawler sem JS nunca veria a resposta. Aqui é só
  uma lista estática com `divide-y`, sem toggle.
- **`FAQPage` JSON-LD acompanha o locale ativo**, não fica fixo em pt-BR — o
  componente é client-side e re-renderiza (schema incluso) quando o usuário
  troca de idioma, pra nunca ficar com dados estruturados em um idioma
  diferente do conteúdo visível.

**Verificação:** `curl` em produção confirma as 6 perguntas e respostas como
texto real no HTML, mais o `<script type="application/ld+json">` com
`FAQPage`/`mainEntity` correto. Também tirei um screenshot via Playwright (ver
nota abaixo) confirmando que a seção renderiza visualmente consistente com o
resto da página (mesmo padrão de `divide-y border-y` e reveal por scroll já
usado em `about-technologies.tsx`).

> Nota sobre a verificação visual: o ambiente não tinha `chromium-cli` nem
> Playwright instalados. Com autorização explícita, instalei o Playwright
> temporariamente (`pnpm add -D --ignore-workspace`), tirei os screenshots, e
> removi a dependência depois (`pnpm remove`) — não ficou no `package.json`.
> Nesse processo o comando de instalação de browsers do Playwright reescreveu
> `pnpm-workspace.yaml` de forma inválida; revertido com `git checkout` antes
> de finalizar.

---

## 4. ~~A bio "extraível" existe nos dados, mas a cópia visível era mais slogan que fato~~ CORRIGIDO

> ✅ **Corrigido em 2026-07-14.**

O texto que mais aparece como abertura do site é tom de marketing: "Transformo
ideias em experiências digitais" (`home.about.intro`), "Criador de experiências
digitais" (`home.hero.title`). Ótimo como copy visual, mas vago demais pra um
motor generativo citar como resposta a "quem é Adriano Maringolo". O texto de
`about.header` + `about.history` já tinha os fatos concretos (2009, Codurance,
tech lead, instrutor), mas profundo na página, misturado com storytelling mais
longo.

**O que foi feito:** nova chave `about.directBio` (pt-BR e en-US), com a frase:

> "Engenheiro de software full-stack, atuo desde 2009 e hoje sou Senior
> Frontend Engineer na Codurance, especializado em React, Next.js e
> TypeScript. Baseado em São Paulo, Brasil — disponível para novos projetos
> como freelancer."

Renderizada em destaque no topo de `/about` (`about-hero.tsx`, logo abaixo do
badge de disponibilidade, acima do parágrafo de storytelling existente — que
continua lá, sem remover nada) e reaproveitada como `Person.description` (item
2) e como base da primeira resposta do FAQ (item 3) — os três itens realmente
se reforçam, é a mesma frase em três lugares.

**Verificação:** confirmado visualmente (screenshot Playwright) e via `curl` —
a frase aparece como texto real logo após o H1 e o badge "Available for new
projects"/"Disponível para novos projetos".

---

## 5. Conteúdo em inglês só existe atrás de troca de idioma client-side

> ⏸️ **Decidido não implementar (2026-07-14)** — mesma decisão do item 4 do
> `SEO_AUDIT.md`, reafirmada aqui após revisar todos os outros itens. Fica
> registrado como decisão consciente, não como pendência esquecida.

Já mapeado no `SEO_AUDIT.md` (item 4: hreflang), mas vale nomear a consequência
específica pra GEO: como pt-BR e en-US são servidos na mesma URL com troca
100% client-side (exceto o blog, que usa `?lang=en-US`), um crawler que não
executa JS — a maioria dos bots de IA — **só vai ver a versão pt-BR** de
`/`, `/about`, `/projects`, `/projects/[slug]`, `/contact` e `/resume`. Isso
significa que, hoje, o site praticamente não existe em inglês para esses
sistemas — alguém perguntando a um assistente em inglês por um "React/Next.js
freelancer" dificilmente vai receber o Adriano como resultado, mesmo ele tendo
todo o conteúdo traduzido.

Isso não é um item novo — é uma decisão já registrada no item 4 do
`SEO_AUDIT.md` ("estender `?lang=en-US` para as demais páginas" era a opção (a),
não escolhida por custo). Só reforçando aqui porque o *motivo* de reconsiderar
muda: não é só sobre hreflang estar "tecnicamente correto", é sobre o site
literalmente não ser recuperável em inglês por esses mecanismos.

---

## 6. ~~Sinais de atualidade incompletos~~ CORRIGIDO (parcialmente, por design)

> ✅ **Corrigido em 2026-07-14** (a parte acionável agora).

Dois pontos, mas GEO pesa recência como sinal de confiança:

- `sitemap.ts` usava `lastModified: new Date()` para páginas estáticas — ou
  seja, toda vez que o site era (re)buildado, **todas** as páginas apareciam
  como "modificadas agora", mesmo sem mudança real. Isso dilui o sinal de
  atualidade em vez de ajudar.
- O `BlogPosting` JSON-LD (`src/app/blog/[slug]/page.tsx`) só tem
  `datePublished`, sem `dateModified`.

**O que foi feito:** `sitemap.ts` agora usa uma constante fixa
(`staticPagesLastModified = new Date('2026-07-14')`) para as páginas estáticas,
em vez de recalcular `new Date()` a cada build — com um comentário no código
lembrando de atualizar essa data manualmente quando o conteúdo mudar de verdade.
Páginas de projeto e de blog já usavam datas reais (`startDate`/`publishedAt`),
não precisaram de mudança.

**Não fiz:** `dateModified` no `BlogPosting` JSON-LD — continua sem sentido
adicionar, porque não existe campo de "atualizado em" no frontmatter dos posts
(`src/types/blog.ts` não tem `updatedAt`), e inventar um valor seria pior que
não ter o campo. Só vale a pena se o blog passar a ter posts revisados após a
publicação — decisão de conteúdo, não de código.

---

## 7. ~~Testemunhos não estruturados~~ CORRIGIDO

> ✅ **Corrigido em 2026-07-14**, com a cautela que a própria sugestão pedia.

O site tem depoimentos reais de clientes (visíveis na Home via
`testimonials-section.tsx`, e por projeto em vários arquivos de
`src/data/projects/*.ts`). Boa matéria-prima de prova social pra um motor
generativo citar — mas não estava em nenhum schema.

**O que foi feito:** três depoimentos curados (`vinicius-moreira`,
`saulo-veiga` — colegas — e `anelita-massucate` — cliente) de
`@/data/testimonials`, adicionados como propriedade `review` solta no `Person`
schema em `src/app/layout.tsx`:

```ts
review: [
  { '@type': 'Review', reviewBody: '...', author: { '@type': 'Person', name: '...' } },
  // + 2
]
```

**Deliberadamente não fiz:** nenhum `AggregateRating`/nota numérica — não existe
uma nota real por trás desses depoimentos, e inventar uma seria o tipo de coisa
que sistemas mais rigorosos leem como manipulação. `review` sem
`AggregateRating` é o uso mais conservador do schema aqui.

---

## 8. Acesso de crawlers de IA — já está bem, sem ação necessária

Verifiquei explicitamente se algo bloqueia bots de IA:

- `src/app/robots.ts`: `userAgent: '*', allow: '/'` — sem bloqueio a
  `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `CCBot` ou
  qualquer outro. Só `/api/` e `/_next/` são bloqueados (correto — não são
  conteúdo).
- Sem `middleware.ts`, sem `vercel.json`, sem cabeçalho `X-Robots-Tag` em
  `next.config.ts` restringindo nada.
- Depois da correção do item 1 do `SEO_AUDIT.md`, o HTML servido (sem executar
  JS) já contém o conteúdo real de todas as páginas — verificado por `curl` nas
  auditorias anteriores.

Não há mudança a fazer aqui — é só confirmação de que a base está correta,
citado porque normalmente é o primeiro lugar que uma auditoria desse tipo olha.

---

## Priorização sugerida

| # | Item | Esforço | Impacto | Status |
|---|---|---|---|---|
| 1 | Criar `llms.txt` | Baixo | Alto | ✅ Corrigido |
| 2 | Enriquecer `Person` JSON-LD (`worksFor`, `alumniOf`, `knowsAbout`, `address`, `description`) | Baixo | Alto | ✅ Corrigido |
| 4 | Bio direta e factual no topo de `/about` (reaproveitada no `Person.description`) | Baixo | Médio | ✅ Corrigido |
| 3 | Seção FAQ com `FAQPage` schema | Médio | Alto | ✅ Corrigido |
| 6 | `lastModified` real no sitemap (parar de usar `new Date()`) | Baixo | Baixo–Médio | ✅ Corrigido |
| 7 | Testemunhos estruturados (com cautela) | Baixo | Baixo | ✅ Corrigido |
| 5 | Conteúdo em inglês navegável sem JS (mesma decisão do item 4 do SEO_AUDIT) | Médio–Alto | Médio | ⏸️ Decidido não fazer |
