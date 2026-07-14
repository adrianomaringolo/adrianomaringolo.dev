# Auditoria de SEO — adrianomaringolo.dev

> Análise feita em 2026-07-13 via inspeção de código, `next build` de produção e
> verificação do HTML real servido (`next start` local + `curl`, sem executar JS).
> Stack: Next.js 16.2.7 (App Router), React 19.2.7.

## Resumo executivo

> **Atualização (2026-07-14):** todos os itens (1 a 9) já foram corrigidos e
> reverificados em produção (`npm run build && npm run start` + `curl`), exceto o
> item 7 que ficou parcialmente resolvido (ver seção 7 — o restante é opcional).
> Os detalhes de cada correção estão marcados inline em cada seção.

O site tem uma base técnica sólida (Next.js moderno, `next/image` em todo lugar,
`sitemap.ts`/`robots.ts`, uma página de blog bem implementada com metadata por post).
Os dois problemas mais graves que existiam — quase todas as páginas não
entregando conteúdo real no HTML enviado pelo servidor (item 1) e todas
compartilhando o mesmo `<title>`/`<meta description>`/`<link rel="canonical">` da
Home (item 2) — **já foram corrigidos**, assim como o restante da lista (sitemap
incompleto, `hreflang` inválido, `metadataBase`, placeholder de tradução
vazando, JSON-LD ausente e H1 duplicado nos rascunhos de blog).

Isso foi confirmado rodando `npm run build && npm run start` e inspecionando a
resposta HTTP crua (sem JS) de cada rota — exatamente o que um crawler que não
renderiza JavaScript (e muitos bots de preview social) recebe.

| Página | `<title>` real? | Conteúdo real no HTML? | Canonical correto? |
|---|---|---|---|
| `/` | ✅ (é a própria home) | ✅ *(corrigido)* | ✅ (é a home) |
| `/about` | ✅ *(corrigido)* | ✅ *(corrigido)* | ✅ *(corrigido)* |
| `/projects` | ✅ *(corrigido)* | ✅ *(corrigido)* | ✅ *(corrigido)* |
| `/projects/[slug]` | ✅ *(corrigido)* | ✅ *(corrigido)* | ✅ *(corrigido)* |
| `/contact` | ✅ *(corrigido)* | ✅ *(corrigido)* | ✅ *(corrigido)* |
| `/resume` | ✅ *(corrigido)* | ✅ *(corrigido)* | ✅ *(corrigido)* |
| `/blog` | ✅ *(corrigido)* | ✅ *(corrigido)* | ✅ *(corrigido)* |
| `/blog/[slug]` | ✅ | ✅ | ✅ |

O único item que não foi 100% fechado é o 7 (imagem de Open Graph): projetos já
usam o próprio `thumbnail`, mas Home/Sobre/Projetos/Contato/Currículo/Blog seguem
com a imagem genérica do site — o que é razoável, já que essas rotas não têm uma
imagem própria mais específica para usar. Uma OG image gerada dinamicamente por
projeto (com template visual, como a da Home) ficou como sugestão opcional, não
implementada.

O blog continua sendo a única área do site com o modelo "certo" completo para SEO
(Server Component + `generateMetadata` + `generateStaticParams` + canonical
próprio) — é o padrão a seguir quando o item 2 for implementado.

---

## 1. ~~Crítico~~ CORRIGIDO — Conteúdo não era renderizado no servidor (bailout para CSR)

> ✅ **Corrigido em 2026-07-14.** Ver "O que foi feito" no final desta seção.

**O que acontecia:** `LocaleLoading` (`src/components/locale-loading.tsx`) envolve
todo o `{children}` do `RootLayout` e decide o que renderizar com base em
`isLoading`, vindo de `useLocale()` (`src/hooks/use-locale.tsx`). Esse hook começa
com `useState(true)` e só vira `false` dentro de um `useEffect` — ou seja, **nunca
no servidor**, só depois que o JS carrega no navegador e lê `localStorage`/
`navigator.language`.

```tsx
// src/hooks/use-locale.tsx
const [isLoading, setIsLoading] = useState(true)
useEffect(() => {
  // só roda no client
  ...
  setIsLoading(false)
}, [])
```

```tsx
// src/components/locale-loading.tsx
if (isLoading) {
  return fallback || <Spinner + "Carregando..." />
}
return <>{children}</>
```

Resultado verificado (antes da correção) no HTML de produção de `/about`,
`/projects`, `/projects/[slug]`, `/contact`, `/resume`, `/blog`:

```html
<body>
  <div class="w-dvw h-dvh flex justify-center items-center">
    <img src="/logo.png" class="animate-ping" />
  </div>
  <!--$!--><template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"></template><!--/$-->
  ...
```

`BAILOUT_TO_CLIENT_SIDE_RENDERING` é o marcador interno do React/Next dizendo "não
consegui (ou não fui instruído a) renderizar isso no servidor — o cliente vai
refazer do zero". Ou seja: **o HTML que chega no navegador (e no crawler) é
literalmente só uma logo pulsando**. Todo o conteúdo real — títulos, textos,
projetos, cases, formulário de contato — só existe depois que o JavaScript baixa,
executa, hidrata e o `useEffect` resolve o locale.

O `/blog` e `/blog/[slug]` escapam disso porque suas `page.tsx` são **Server
Components** (sem `'use client'` no topo), então o Next consegue montar o HTML real
via streaming mesmo com o mesmo `LocaleLoading` por cima. Todas as outras páginas
(`about/page.tsx`, `projects/page.tsx`, `projects/[slug]/page.tsx`,
`contact/page.tsx`, `resume/page.tsx`) começam com `'use client'` — isso, combinado
com o gate de `isLoading`, é o que produz o bailout.

**Por que isso importa:**
- Ferramentas que não renderizam JS (muitos crawlers de SEO como Ahrefs/SEMrush no
  modo padrão, leitores de preview de link do Slack/WhatsApp/Discord, alguns bots
  de IA) **não veem nenhum conteúdo** nessas páginas.
- Mesmo o Googlebot, que renderiza JS, faz isso numa "segunda onda" de indexação,
  mais lenta e com orçamento limitado — depender disso pra todo o site é arriscado.
- Isso é também o pior cenário possível de Core Web Vitals: o LCP (maior elemento
  visível) só pode acontecer depois de baixar JS, hidratar, rodar efeito, ler
  `localStorage` e re-renderizar. Um logo pulsando não é um LCP aceitável.
- Explica todos os problemas de metadata do item 2 abaixo: como o React nunca
  resolve a árvore real no servidor para essas rotas, o Next também nunca tem
  chance de aplicar metadata específica de rota — cai tudo no `layout.tsx` raiz.

**O que foi feito:**
1. Removido o gate de `isLoading` que escondia toda a árvore: `LocaleLoading`
   (`src/components/locale-loading.tsx`) foi deletado, e `layout.tsx` agora
   renderiza `{children}` diretamente dentro do `<Suspense>` que já existia
   (mantido — cobre casos legítimos de streaming, como `React.use(params)` em
   `/projects/[slug]`). O locale continua começando em `pt-BR`
   (`useState(defaultLocale)` em `use-locale.tsx`, inalterado) e a troca para
   `en-US`/preferência salva acontece via re-render normal depois do mount — sem
   nunca esconder o conteúdo real por trás de um spinner.
2. Corrigido um segundo bailout independente, específico de `/contact`: a página
   inteira estava dentro de um `<Suspense>` sem fallback só por causa de
   `useSearchParams()` (usado para pré-selecionar um serviço via `?service=...`).
   Como `/contact` é estática (`○`), o Next não tem URL de request no build e não
   tinha como resolver isso no servidor — resultado, `<main>` ficava vazio até a
   hidratação. Troquei `useSearchParams()` por leitura de
   `window.location.search` dentro de um `useEffect` (mesma funcionalidade,
   sem exigir Suspense/renderização dinâmica).

**Verificação:** rebuild de produção + `curl` (sem JS) em `/`, `/about`,
`/projects`, `/projects/[slug]`, `/contact`, `/resume` confirmam texto real no
HTML — por exemplo, `/projects/react-html-content-editor` agora entrega a
descrição completa do projeto ("React HTML Content Editor é uma biblioteca React
sofisticada...") e `/contact` entrega o formulário e os links de contato, não mais
um `<main>` vazio.

**Ainda pendente:** a conversão de `about/page.tsx`, `projects/page.tsx`,
`projects/[slug]/page.tsx`, `contact/page.tsx` em Server Components não foi feita
— não era estritamente necessária para resolver o bailout (o problema real era só
o gate de `isLoading` + o `useSearchParams` sem fallback), mas continua sendo o
pré-requisito para o item 2 (`generateMetadata` por rota), já que uma página
`'use client'` não pode exportar `generateMetadata`.

---

## 2. ~~Crítico~~ CORRIGIDO — Título, descrição e canonical idênticos em todas as páginas

> ✅ **Corrigido em 2026-07-14.** Ver "O que foi feito" no final desta seção.

Consequência direta do item 1: como não existia `layout.tsx` em nenhuma subpasta
(`about/`, `projects/`, `contact/`, `resume/`) nem `generateMetadata` nessas
páginas, todas herdavam o `metadata` estático do `layout.tsx` raiz, gerado uma
única vez para `locale: 'pt-BR', page: 'home'`:

```tsx
// src/app/layout.tsx
export const metadata: Metadata = generatePageMetadata({ locale: 'pt-BR', page: 'home' })
```

Confirmado com `curl` em produção (antes da correção) — **toda página não-blog**
entregava:

```html
<title>Adriano Maringolo - Desenvolvedor Web</title>
<meta name="description" content="Engenheiro full-stack. {{years}} anos construindo produtos web que as pessoas escolhem."/>
<link rel="canonical" href="https://adrianomaringolo.dev"/>
<meta property="og:title" content="Adriano Maringolo - Desenvolvedor Web"/>
```

Isso valia até para `/projects/react-html-content-editor` — uma página de case
study com conteúdo rico que nunca ia diferenciar-se da Home nos resultados de
busca, e que ao ser compartilhada no LinkedIn/WhatsApp/Twitter mostrava o card
genérico "Adriano Maringolo - Desenvolvedor Web" em vez do projeto em si.

O `<link rel="canonical" href="https://adrianomaringolo.dev">` repetido em todas
as páginas era o ponto mais grave: um sinal explícito para o Google de que "esta
página é uma cópia da Home, indexe a Home no lugar dela".

**O que foi feito:** como as páginas continuam sendo `'use client'` (a conversão
para Server Components citada no item 1 não foi necessária nem feita), usei o
mecanismo de `layout.tsx` aninhado do App Router — um Server Component por rota,
que só declara `metadata`/`generateMetadata` e repassa `{children}` — sem tocar
nas páginas client existentes:

- `src/app/about/layout.tsx`, `src/app/projects/layout.tsx`,
  `src/app/contact/layout.tsx`, `src/app/resume/layout.tsx`,
  `src/app/blog/layout.tsx`: cada um chama `generatePageMetadata({ locale: 'pt-BR', page: '<rota>' })`,
  que agora resolve `title`/`description` a partir de `t.pages.<rota>Title`/
  `<rota>Description` (chaves `resumeTitle`/`resumeDescription`/`blogTitle`/
  `blogDescription` foram adicionadas aos dois arquivos de locale, que ainda não
  existiam) e calcula `canonical`/`openGraph.url` a partir da própria rota, em vez
  de sempre apontar pra Home.
- `src/app/projects/[slug]/layout.tsx`: `generateMetadata` dinâmico (mesmo padrão
  de `/blog/[slug]/page.tsx`) que lê `getProjectBySlug(slug)` e usa
  `project.title`, `project.shortDescription`, `project.tags` e
  `project.thumbnail` (já bilíngues, já existiam no objeto `Project`) para gerar
  `title`, `description`, `canonical` e imagem de Open Graph **específicos por
  projeto** — resolvendo de quebra parte do item 7 para as páginas de projeto.
- `generatePageMetadata` (`src/lib/metadata.ts`) passou a priorizar
  `t.pages[\`${page}Title\`]` sobre o antigo fallback `t.nav[page]`, pra bater com
  o título que `DynamicMetadata` já usava no client (evita um "flash" de título
  diferente depois da hidratação) — e passou a aceitar `path`/`image` opcionais
  pra permitir canonical e OG image customizados sem repetir toda a função.
- `DynamicMetadata` (`src/components/dynamic-metadata.tsx`) ganhou os casos que
  faltavam (`/resume`, `/blog`, `/projects/[slug]`) para continuar consistente com
  a troca de idioma client-side. De quebra, corrigi um bug real que existia: o
  efeito rodava em **toda** página (inclusive `/blog/[slug]`) e sobrescrevia
  `document.title` para o título genérico da Home depois da hidratação — mesmo em
  posts que já tinham o título certo vindo do `generateMetadata` do servidor.
  Como o blog usa dados vindos do sistema de arquivos (não pode ser lido num
  componente client), o efeito agora simplesmente ignora rotas `/blog/[slug]` e
  deixa a metadata SSR intocada.

**Verificação em produção** (`curl`, sem JS):

```html
<!-- /about -->
<title>Sobre Mim | Adriano Maringolo</title>
<meta name="description" content="Conheça mais sobre minha trajetória, habilidades e experiência no desenvolvimento web."/>
<link rel="canonical" href="https://adrianomaringolo.dev/about"/>

<!-- /projects/react-html-content-editor -->
<title>React HTML Content Editor | Adriano Maringolo</title>
<meta name="description" content="Editor de conteúdo HTML/CSS para React construído sobre o Monaco..."/>
<link rel="canonical" href="https://adrianomaringolo.dev/projects/react-html-content-editor"/>
<meta property="og:image" content="https://adrianomaringolo.dev/projects/react-html-content-editor/cover.png"/>
```

Cada rota (`/`, `/about`, `/projects`, `/projects/[slug]`, `/contact`, `/resume`,
`/blog`, `/blog/[slug]`) agora entrega `title`, `description`, `canonical` e
`og:title`/`og:image` próprios e distintos.

**Ainda pendente:** o `hreflang` (`alternates.languages`) continua apontando
pt-BR e en-US para a mesma URL em todas essas rotas — isso é o item 4, que não foi
mexido aqui de propósito, para manter o escopo desta correção restrito ao item 2.

---

## 3. ~~Alto~~ CORRIGIDO — Páginas de projeto ausentes do sitemap

> ✅ **Corrigido em 2026-07-14.**

`src/app/sitemap.ts` listava apenas rotas estáticas fixas:

```ts
const pages = ['', '/about', '/projects', '/blog', '/contact']
```

Isso ignorava completamente as 8 páginas `/projects/[slug]` (cada case study) e
`/resume`. Comparado ao blog, que itera `getBlogPosts()` para gerar uma entrada por
post, os projetos não tinham o mesmo tratamento — apesar de `getProjectBySlug` e a
lista `projects` já existirem em `@/data/projects`.

**O que foi feito:** `/resume` foi adicionado a `pages` (prioridade 0.5), e um novo
bloco `projectPages` itera `projects` de `@/data/projects` gerando uma entrada por
projeto (`priority: 0.8` para featured, `0.6` para os demais, `lastModified` a
partir de `project.startDate`) — mesmo padrão já usado para `blogPages`.

**Verificação:** `curl http://localhost:PORT/sitemap.xml` em produção confirma 15
URLs no total: as 6 páginas estáticas, as 8 páginas de projeto (incluindo
`react-html-content-editor`) e o post de blog publicado.

---

## 4. ~~Alto~~ CORRIGIDO — `hreflang` aponta pt-BR e en-US para a mesma URL

> ✅ **Corrigido em 2026-07-14**, optando pela opção (b) descrita abaixo.

Em `generatePageMetadata` (`src/lib/metadata.ts`) e em `sitemap.ts`, os
`alternates.languages` declaravam:

```ts
languages: {
  'pt-BR': `${baseUrl}${page}`,
  'en-US': `${baseUrl}${page}`, // Same URL, different content via client-side
}
```

Duas entradas de `hreflang` apontando para a **URL idêntica** não é uma
implementação válida — o Google não tem como saber que ali existem duas versões de
idioma, porque não existem duas URLs. Na prática o idioma é 100% client-side
(troca via `localStorage`/`setLocale`), então não havia nada para o hreflang
anunciar.

O blog já resolvia isso corretamente com `?lang=en-US`:
```ts
// src/app/blog/[slug]/page.tsx
alternates: {
  canonical: `/blog/${post.slug}`,
  languages: {
    'pt-BR': `/blog/${post.slug}`,
    'en-US': `/blog/${post.slug}?lang=en-US`,
  },
},
```

**O que foi feito:** como manter duas URLs reais por página em todo o site não
compensava agora (exigiria replicar o padrão `?lang=en-US` + `searchParams` em
cada rota), optei pela opção (b): removi o bloco `alternates.languages` de
`generatePageMetadata` (`src/lib/metadata.ts`) e do `generateMetadata` de
`projects/[slug]/layout.tsx` — mantendo só `canonical`, que continua válido. A
função morta `generateAlternateLinks` (não usada em lugar nenhum, mesmo padrão
quebrado) foi removida também.

Em `sitemap.ts`, apliquei a mesma lógica de forma diferenciada: `staticPages` e
`projectPages` perderam o bloco `alternates.languages` (sem URL distinta, não há
o que declarar), mas `blogPages` **manteve** o hreflang — e eu corrigi o valor de
`en-US`, que também estava com a URL duplicada por engano em `sitemap.ts` (embora
a metadata real do post já usasse `?lang=en-US` corretamente):

```ts
// blogPages agora bate com o generateMetadata do próprio post
alternates: {
  languages: {
    'pt-BR': `${baseUrl}/blog/${post.slug}`,
    'en-US': `${baseUrl}/blog/${post.slug}?lang=en-US`,
  },
},
```

**Verificação em produção:** `/`, `/about`, `/projects`, `/projects/[slug]`,
`/contact`, `/resume`, `/blog` não emitem mais `<link rel="alternate" hreflang=...>`
algum. `/blog/[slug]` continua emitindo os dois, agora apontando para URLs reais
e distintas — confirmado tanto no HTML da página quanto no `sitemap.xml`.

---

## 5. ~~Médio~~ CORRIGIDO — `metadataBase` não configurado

> ✅ **Corrigido em 2026-07-14** (como parte da correção do item 2, já que as
> novas imagens de OG por projeto dependiam disso para resolver corretamente).

O build de produção emitia este aviso:

```
⚠ metadataBase property in metadata export is not set for resolving social
  open graph or twitter images, using "http://localhost:3000".
```

Sem `metadataBase`, o Next resolve URLs relativas de OG image usando o host da
própria requisição como fallback — frágil em preview deployments ou atrás de
proxy.

**O que foi feito:** `src/app/layout.tsx` agora define
`metadataBase: new URL('https://adrianomaringolo.dev')` no `metadata` exportado.
O warning não aparece mais no build, e as imagens OG (inclusive as novas por
projeto do item 2) resolvem para URLs absolutas corretas.

---

## 6. ~~Médio~~ CORRIGIDO — Placeholder de tradução vazando para produção

> ✅ **Corrigido em 2026-07-14.**

O `<meta name="description">` de toda página não-blog estava sendo servido como:

```
Engenheiro full-stack. {{years}} anos construindo produtos web que as pessoas escolhem.
```

O placeholder `{{years}}` não era interpolado nessa string (usada como
`description` default em `generatePageMetadata` → `t.home.hero.subtitle`) — o
texto literal aparecia em resultados de busca e cards de compartilhamento.

**O que foi feito:** `generatePageMetadata` (`src/lib/metadata.ts`) agora importa
`getYearsOfExperience` de `src/lib/experience.ts` (a mesma função que os
componentes client-side já usavam) e interpola `{{years}}` no resultado final de
`pageDescription`. Verificado em produção: a description passou a ser "Engenheiro
full-stack. 17 anos construindo produtos web que as pessoas escolhem." em todas as
páginas.

---

## 7. Médio — Uma única imagem de Open Graph para o site inteiro

> ⚠️ **Parcialmente corrigido em 2026-07-14.** As páginas de projeto
> (`/projects/[slug]`) já usam o `thumbnail` do próprio projeto como imagem de OG
> (resolvido junto com o item 2, já que o `generateMetadata` dessa rota precisava
> de uma imagem de qualquer forma). Home, Sobre, Projetos, Contato, Currículo e
> Blog (listagem) continuam usando a imagem genérica do site — o que é razoável
> pra essas rotas, já que não têm uma imagem própria mais específica.

`opengraph-image.tsx` gera uma imagem fixa ("Adriano Maringolo /
adrianomaringolo.dev") usada pela Home, Sobre, Projetos, Contato, Currículo e
Blog (listagem). Os posts do blog já têm `post.image` próprio, e agora as páginas
de projeto usam `project.thumbnail`.

**Sugestão restante (opcional):** se quiser uma imagem OG gerada (com título/logo
compostos, como o `opengraph-image.tsx` atual da Home) em vez de usar a screenshot
crua do projeto como imagem de compartilhamento, dá pra criar
`src/app/projects/[slug]/opengraph-image.tsx` usando
[OG Image dinâmica por rota](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image),
compondo o `thumbnail`/título do projeto sobre o mesmo template visual do
`opengraph-image.tsx` atual. Não é necessário — o `thumbnail` puro já resolve o
problema principal (imagem genérica) — mas ficaria mais consistente
visualmente com o resto do site.

---

## 8. ~~Baixo~~ CORRIGIDO — Dados estruturados (JSON-LD) ausentes

> ✅ **Corrigido em 2026-07-14.**

Não havia nenhum `<script type="application/ld+json">` no site.

**O que foi feito:** criei um componente pequeno reutilizável,
`src/components/json-ld.tsx` (`<script type="application/ld+json">` +
`dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}`, o padrão
recomendado pelo próprio Next.js), e adicionei três schemas:

- **`Person`** — em `src/app/layout.tsx` (renderizado em toda página): nome,
  `jobTitle`, `image` (foto de perfil já usada em `/about`), e `sameAs` com
  GitHub/LinkedIn/Instagram (os mesmos links já usados em `/contact`).
- **`BlogPosting`** — em `src/app/blog/[slug]/page.tsx`: `headline`,
  `description`, `datePublished`, `keywords` (a partir de `post.tags`), `image` e
  `author`, usando os dados que o `generateMetadata` daquela rota já carrega.
- **`CreativeWork`/`SoftwareSourceCode`** — em `src/app/projects/[slug]/layout.tsx`:
  `SoftwareSourceCode` (com `codeRepository` e `programmingLanguage`) para
  projetos `category: 'library'`, `CreativeWork` para os demais (`web`/`webapp`).
  Reaproveita os mesmos dados (`title`, `shortDescription`, `thumbnail`,
  `githubUrl`, `technologies`) já usados para gerar a metadata da página.

Não adicionei `WebSite`/`SearchAction` (opcional na sugestão original) — o site
não tem busca interna, então o schema não teria o que anunciar.

**Verificação em produção:** `curl` confirma os três schemas presentes e
corretos no HTML — `Person` em `/`, `/projects/react-html-content-editor` com
`SoftwareSourceCode` (incluindo `codeRepository` e a lista de tecnologias em
`programmingLanguage`), e o post publicado com `BlogPosting`.

---

## 9. ~~Baixo~~ CORRIGIDO — H1 duplicado se os posts-rascunho do blog forem publicados como estão

> ✅ **Corrigido em 2026-07-14.**

`src/app/blog/[slug]/blog-post-client.tsx` mapeava `# heading` do Markdown para um
`<h1>` dentro do corpo do post, além do `<h1>` do próprio título da página. Os
posts publicados hoje já evitavam isso começando as seções com `##`, mas os
rascunhos com prefixo `_` (`_nextjs-15-whats-new`,
`_react-performance-optimization`, `_how-ai-transforms-web-development`) começam
com `# ` — se fossem publicados sem ajuste, a página teria dois `<h1>`.

**O que foi feito:** o mapeamento de `h1` do `ReactMarkdown` agora renderiza um
`<h2>` (mantendo o mesmo estilo visual de antes via className) em vez de `<h1>` —
o título da página segue sendo o único `<h1>` do documento, e isso vale para
qualquer post, publicado ou rascunho, sem precisar editar os arquivos `.mdx`
manualmente antes de publicar.

---

## O que já está bem implementado (não mexer)

- **Next.js 16 + React 19**, `next/image` em 100% das imagens do app (nenhum
  `<img>` cru fora do gerador de OG image, que precisa disso por restrição do
  Satori).
- `robots.ts` e `sitemap.ts` existem e estão razoavelmente configurados
  (só faltam as rotas do item 3).
- `next.config.ts`: compressão ligada, cache headers para `/images`, `deviceSizes`/
  `imageSizes` bem pensados, `optimizePackageImports` para `lucide-react` e
  `framer-motion`.
- **`/blog/[slug]` é o modelo correto**: Server Component, `generateStaticParams`,
  `generateMetadata` assíncrono com título/descrição/OG/Twitter/canonical por
  post, e alternates de idioma com URLs distintas via `?lang=en-US`. Vale copiar
  esse padrão para `/projects/[slug]` e as demais rotas.
- Todos os textos de projeto (`title`, `shortDescription`, `fullDescription`,
  `tags`) já são bilíngues no shape de dados — a informação para gerar metadata
  por idioma já existe, só falta consumi-la fora do client-side.

---

## Priorização sugerida

| # | Item | Esforço | Impacto | Status |
|---|---|---|---|---|
| 1 | Parar de esconder o conteúdo atrás do gate de `isLoading` | Médio | Crítico — destrava tudo o resto | ✅ Corrigido |
| 2 | `generateMetadata` por rota (title/description/canonical únicos) | Médio | Crítico | ✅ Corrigido |
| 6 | Corrigir `{{years}}` vazando na description | Trivial | Alto (visível hoje em todo resultado de busca) | ✅ Corrigido |
| 5 | Definir `metadataBase` | Trivial | Médio | ✅ Corrigido |
| 3 | Incluir `/projects/[slug]` e `/resume` no sitemap | Trivial | Alto | ✅ Corrigido |
| 4 | Corrigir/remover `hreflang` para URL duplicada | Baixo | Médio | ✅ Corrigido |
| 8 | JSON-LD (`Person`, `BlogPosting`, projetos) | Médio | Baixo–Médio | ✅ Corrigido |
| 9 | Corrigir H1 duplicado nos rascunhos de blog | Trivial | Baixo | ✅ Corrigido |
| 7 | OG image dinâmica por projeto | Médio | Médio | ⚠️ Parcial (projetos usam `thumbnail`; demais rotas seguem com imagem genérica) |
