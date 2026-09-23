---
name: project-writer
description: "Documenta um projeto no portfolio de adrianomaringolo.dev a partir de um repositório local. Analisa o repo, pergunta ao usuário só o que não dá pra extrair do código, tira screenshots das áreas confirmadas com o usuário (via plugin do Claude no Chrome ou Puppeteer) e gera o arquivo bilíngue em src/data/projects/<slug>.ts, registrando no index.ts. Uso: /project-writer <caminho-do-repo-local>. Exemplos: '/project-writer ~/Projects/clientes/padaria-do-ze', '/project-writer ../meu-saas'."
---

# Escritor de Projetos do Portfolio — adrianomaringolo.dev

Esta skill transforma um repositório local em uma página de projeto (case study) no formato usado
em `src/data/projects/`, seguindo a estrutura, o nível de detalhe e a voz dos projetos já publicados
— não um resumo genérico de README.

O resultado final é:

1. `public/projects/<slug>/` com os screenshots (`01-hero.jpg`, `01-hero-mobile.png`, `02-...`, etc.);
2. `src/data/projects/<slug>.ts` completo, bilíngue pt-BR + en-US, tipado com a interface `Project`;
3. o projeto adicionado a `src/data/projects/index.ts`;
4. instrução pra revisar em `/projects/<slug>`.

## Contexto de referência (leia antes de começar)

- **Interface e campos**: `src/types/project.ts` — é o contrato. Todo campo obrigatório precisa existir.
- **O que realmente renderiza na página de detalhe**: `src/app/projects/[slug]/page.tsx` e os componentes
  em `src/app/projects/_components/` (`project-hero`, `project-story-section`, `project-features`,
  `project-screenshots`, `project-technologies`, `project-testimonials`, `project-cta`).
- **Guia da estrutura**: `docs/PROJECTS_STRUCTURE.md` e `src/data/projects/README.md`.
- **Exemplos por tipo de projeto** (releia pelo menos um do mesmo tipo do projeto atual):
  - `web` (site institucional / landing): `src/data/projects/yane-leitao.ts`, `golaser-barao-geraldo.ts`,
    `sympro-landing.ts`, `asm-marketing-digital.ts`
  - `webapp` (produto / sistema): `src/data/projects/portal-da-morada.ts`, `gota-de-cura.ts`
  - `library` (open source / npm): `src/data/projects/react-html-content-editor.ts`, `buildgrid-ui.ts`
- **Case study em prosa** (exemplo de profundidade de descoberta): `docs/ASM_PROJECT_CASE_STUDY.md`.

## Passo 1 — Receber o repositório e extrair o máximo automaticamente

O usuário passa um caminho local (`/project-writer <caminho>`). Antes de perguntar qualquer coisa,
vasculhe o repo e extraia:

| Campo do `Project` | De onde tirar |
| --- | --- |
| `technologies` | `package.json` (deps + devDeps relevantes), lockfile, `next.config`, `tailwind`, framework, ORM, deploy config (`vercel.json`, `netlify.toml`, `Dockerfile`), CI (`.github/workflows`), testes (vitest/jest/playwright), `tsconfig` |
| `title`, `shortDescription` (rascunho) | `package.json` `name`/`description`, `README` (H1 + primeiro parágrafo), `<title>`/metadata do app |
| `category` | `library` se tem `package.json` publicável (`main`/`module`/`exports`, `files`, `.npmignore`, changesets) e/ou está publicado no npm. `webapp` se tem auth, banco, área logada, dashboard, CRUD. `web` se é site institucional / landing / marketing sem área logada. Na dúvida, confirme no Passo 2. |
| `githubUrl` | `git remote -v` (origin) — só se for público |
| `npmUrl` | `package.json` `name` + confirmar publicação (`npm view <name> version`); só pra `library` |
| `liveUrl` | `README` badges, `package.json` `homepage`, deploy configs, metadata `metadataBase`/canonical |
| `startDate` | primeiro commit (`git log --reverse --format=%ad --date=short \| head -1`) |
| `endDate` | último commit relevante, se o projeto está claramente parado |
| `status` | atividade recente do git + estágio (`in-progress`, `completed`, `continous-improvement`, `concept`) — confirmar |
| `technicalChallenges` (rascunho) | padrões não triviais no código: SSR/ISR, i18n, realtime, cache, migrações, workers, integrações, acessibilidade, performance |
| `features` (rascunho) | rotas/páginas principais, componentes de destaque, seções do site, módulos do sistema |
| `technologies` → versões | leia as versões reais do `package.json`, não invente ("Next.js 16", "React 19", "Tailwind CSS 4") |

Rode pelo menos:

```bash
cd <caminho-do-repo>
git log --reverse --format='%ad' --date=short | head -1        # startDate
git log -1 --format='%ad' --date=short                          # última atividade
git log --format='%an' | sort -u                                # autores (pista de myRole/solo)
git remote -v
cat package.json
ls -la && find . -maxdepth 2 -name 'README*' -o -maxdepth 2 -name 'llms.txt'
```

Leia o `README` inteiro e navegue pela estrutura de `src`/`app`/`pages` pra entender o que o projeto faz.
Monte um **rascunho interno** de todos os campos antes de falar com o usuário.

## Passo 2 — Perguntar ao usuário (só o que o repo não conta)

Faça **uma rodada única** de perguntas (use `AskUserQuestion` quando forem escolhas fechadas, texto livre
quando for narrativa). Pergunte apenas o que não deu pra extrair com confiança. Itens típicos:

**Contexto do projeto**
1. **Cliente**: nome, indústria/segmento, porte (`startup` / `small` / `medium` / `enterprise`). Se for
   projeto próprio/open source, usar o padrão dos exemplos (`name: 'Projeto Open Source'`, indústria
   `'Desenvolvimento de Software'`). Confirmar se pode citar o nome real do cliente.
2. **Seu papel** (`myRole`): `founder` / `freelancer` / `employee` / `contributor`.
3. **`category`** — confirmar o palpite do Passo 1.
4. **Período**: confirmar `startDate` (git costuma acertar) e se há `endDate` ou segue ativo (`status`).
5. **`liveUrl`**: URL de produção. Se apontar pra demo/documentação (não produção real), marcar `isDemo: true`.
6. **`featured`**: destacar na home? (só `true` se o usuário confirmar).

**Narrativa — `story` (o coração da página, os 4 blocos)**
7. **Problema**: contexto do cliente, dor concreta, impacto no negócio. O que existia antes?
8. **Solução**: a abordagem escolhida e o porquê. Decisões de produto e de design.
9. **Processo**: como foi tocado — descoberta, arquitetura da informação, etapas, colaboração, ciclos.
10. **Resultados**: o que mudou. Puxar números reais se existirem.

**`challenges`** (2 a 4): pra cada um, `title` + `description` (o problema) + `solution` (como resolveu).
Pergunte quais foram os desafios não óbvios; combine com o que você já detectou no código.

**`metrics`** (opcional, mas forte): números reais e verificáveis — Lighthouse (performance, a11y, SEO,
best practices), tempo de carregamento, conversão, redução de custo/tempo, nº de usuários, pedidos,
módulos, testes. Cada métrica tem `label`, `value` e `improvement` opcional, todos bilíngues. **Não invente
métrica.** Se o usuário não tiver, pode rodar Lighthouse na `liveUrl` (ver Passo 4) ou omitir o campo.

**`testimonial` / `testimonials`** (opcional): autor, cargo (bilíngue), empresa, texto (bilíngue), `rating`.
Perguntar se há depoimento do cliente. Não fabricar.

**Opcionais de aprofundamento** (preencher só se o usuário quiser e tiver material):
`nextSteps`, `skillsAcquired`, `technicalChallenges` (listas bilíngues). Existem na interface e podem
ser usados; priorize-os em projetos `library` e `webapp` de longo prazo (ver `react-html-content-editor.ts`).

Se o usuário responder de forma vaga em algum bloco da `story`, repergunte com mais foco antes de escrever.

## Passo 3 — Confirmar as áreas dos screenshots (dar lista de opções)

Antes de tirar print nenhum, **apresente uma lista de áreas candidatas e peça pro usuário confirmar/editar**
(via `AskUserQuestion`, `multiSelect: true`). Monte a lista a partir do tipo de projeto e do que você viu no
repo (rotas, seções, componentes). Sugestões por tipo:

**`web` (site institucional / landing)**
- Hero / topo da home (desktop) — vira o `thumbnail`
- Hero (mobile)
- Seção "Sobre" / história
- Seção de serviços / o que faz (ou modal de serviço)
- Diferenciais / benefícios
- Prova social / depoimentos
- Galeria / portfólio de trabalhos
- FAQ
- Planos / preços
- Contato / rodapé / mapa
- Uma segunda captura mobile de uma seção-chave

**`webapp` (produto / sistema)**
- Landing / login (desktop) — pode virar `thumbnail`
- Dashboard / visão geral
- Telas dos módulos principais (listar quais: membros, financeiro, catálogo, pedidos, permissões...)
- Fluxo de criação/edição (formulário, wizard)
- Área administrativa
- Relatórios / gráficos
- Visão mobile / responsiva
- Blog / conteúdo público, se houver

**`library` (open source / npm)**
- Landing da documentação + quick start — costuma virar `cover.jpg` (thumbnail)
- Componente/feature principal em uso
- Demo interativa / playground
- Todos os controles / catálogo de componentes
- Exemplo de composição / API
- Temas claro/escuro
- Storybook, se houver

Para cada área confirmada, defina: **nome do arquivo** (`NN-slug.ext`, dois dígitos, começando em `01`),
**device** (desktop/mobile) e **formato** (`.jpg` pra hero e seções com muita foto; `.png` pra UI de app,
texto pequeno, telas com transparência). Mobile sempre `-mobile` no nome (ex.: `01-hero-mobile.png`).

## Passo 4 — Tirar os screenshots

O projeto precisa estar **rodando e acessível**. Se você não tiver a URL:

> Peça ao usuário para rodar o projeto localmente (`npm run dev` / `pnpm dev` / etc.) e informar o
> endereço (ex.: `http://localhost:3000`). Se houver área logada, peça credenciais de teste ou peça
> que o usuário deixe a sessão já autenticada no Chrome.

Use a `liveUrl` de produção quando ela existir e representar a versão atual; senão, o localhost informado.

### Opção A (preferida) — Plugin do Claude no Chrome

Carregue as ferramentas com **uma** chamada de `ToolSearch`:

```
select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__computer,mcp__claude-in-chrome__read_page,mcp__claude-in-chrome__tabs_create_mcp,mcp__claude-in-chrome__resize_window
```

Fluxo por captura:
1. `tabs_context_mcp` no início; crie uma aba nova (`tabs_create_mcp`) — não reaproveite abas do usuário.
2. `resize_window` para desktop **1440×900** (ou 1512×945) antes das capturas desktop; **390×844** para mobile.
3. `navigate` para a rota da área.
4. Role até a seção (`computer` com scroll, ou `javascript_tool`/`find` para dar `scrollIntoView` num seletor).
   Espere as animações de entrada (Framer Motion) assentarem antes do print.
5. `computer` action `screenshot` para capturar o viewport.
6. Salve o arquivo em `public/projects/<slug>/<NN-slug>.<ext>` com o nome definido no Passo 3.
7. Para o `thumbnail`/hero, capture uma faixa larga do topo (o componente usa `object-cover`, proporção
   ~2:1 funciona bem).

### Opção B (fallback) — Puppeteer

Existe um helper em `.claude/skills/project-writer/scripts/shoot.mjs`. Ele reaproveita o Puppeteer já
instalado em `instagram-posts/node_modules` (ou um `puppeteer` global). Crie um config JSON e rode:

```bash
node .claude/skills/project-writer/scripts/shoot.mjs <slug> /caminho/para/config.json
```

Formato do config (veja `scripts/config.example.json`):

```json
{
  "baseUrl": "http://localhost:3000",
  "outDir": "public/projects/<slug>",
  "desktop": { "width": 1440, "height": 900, "deviceScaleFactor": 2 },
  "mobile":  { "width": 390,  "height": 844, "deviceScaleFactor": 3 },
  "defaultQuality": 82,
  "shots": [
    { "name": "01-hero",         "path": "/",          "device": "desktop", "clip": "viewport" },
    { "name": "01-hero-mobile",  "path": "/",          "device": "mobile",  "clip": "viewport" },
    { "name": "02-sobre",        "path": "/",          "device": "desktop", "scrollTo": "#sobre" },
    { "name": "03-servicos",     "path": "/servicos",  "device": "desktop", "selector": "main" },
    { "name": "04-dashboard",    "path": "/app",       "device": "desktop", "fullPage": true, "waitFor": 1500 }
  ]
}
```

Campos por shot: `name` (sem extensão — `.jpg`/`.png` decidido por `format`, default `jpg`), `path`,
`device`, e um de `clip:"viewport"` | `selector` | `fullPage` | `scrollTo` (seletor: rola até ele e captura
o viewport). Opcionais: `waitFor` (ms), `format`, `quality`, `hide` (lista de seletores pra esconder,
ex.: banner de cookies).

### Otimização

Depois de capturar, garanta que cada arquivo tem no máximo ~2000px de largura e peso razoável
(as imagens existentes ficam entre ~80 KB e ~450 KB):

```bash
sips -Z 2000 public/projects/<slug>/*.jpg
# PNGs de UI podem passar por pngquant/oxipng se o peso estourar
```

### Lighthouse (opcional, se o usuário quiser métricas e não tiver os números)

```bash
npx lighthouse <liveUrl> --only-categories=performance,accessibility,best-practices,seo --output=json --quiet --chrome-flags="--headless"
```

Use os scores reais nas `metrics` (formato `'100 / 100'`, como em `golaser-barao-geraldo.ts`).

## Passo 5 — Gerar `src/data/projects/<slug>.ts`

Escreva o arquivo seguindo **exatamente** o padrão dos exemplos do mesmo tipo. Regras:

- **`slug`**: kebab-case, único, igual ao nome da pasta em `public/projects/`. `id`: próximo número livre
  (veja os `id` existentes em `src/data/projects/*.ts`).
- **Bilíngue de verdade**: `pt-BR` é o original; `en-US` é reescrita natural, mesma estrutura, não tradução
  literal. Todos os campos com shape `{ 'pt-BR', 'en-US' }` precisam dos dois.
- **`tags`**: `{ 'pt-BR': string[], 'en-US': string[] }`, 8–13 tags, mesma ordem nos dois idiomas.
- **`technologies`**: array simples de strings, com as versões reais do `package.json`.
- **`thumbnail`**: caminho da captura hero (`/projects/<slug>/01-hero.jpg` ou `/projects/<slug>/cover.jpg`).
- **`images`**: inclua o thumbnail + as principais capturas.
- **`screenshots`**: um objeto por captura confirmada no Passo 3 — `id` (string, `'1'`, `'2'`, `'1m'` pra
  mobile), `url`, `alt` (descritivo, em pt-BR, específico), `caption` bilíngue. A **primeira** screenshot
  aparece full-width no topo da galeria; as demais em grade 2 colunas — ordene com isso em mente.
- **`story`**: os 4 blocos (`problem`, `solution`, `process`, `results`), cada um 1 parágrafo denso e
  concreto por idioma. É o texto mais importante da página.
- **`challenges`**: 2–4, cada um com `title` / `description` / `solution` bilíngues.
- **`metrics`** / **`testimonial(s)`** / **`features`** / opcionais: só se houver material real.
- **`myRole`**, **`status`**, **`startDate`** (`'YYYY-MM-DD'`), **`endDate`** opcional, **`client`**,
  **`featured`**: conforme Passos 1–2.
- **Sem travessão (`—`)** onde não for o padrão dos arquivos existentes? Os arquivos de projeto **usam**
  travessão livremente (títulos, incisos) — siga o estilo do arquivo de exemplo do mesmo tipo, não a regra
  do blog.
- **Formatação**: Prettier do repo (`semi: false`, `singleQuote: true`, `printWidth: 90`). Rode
  `npx prettier --write src/data/projects/<slug>.ts` no final.

Estrutura mínima do arquivo:

```typescript
import type { Project } from '@/types/project'

export const <camelCaseSlug>: Project = {
  id: '<n>',
  slug: '<slug>',
  title: { 'pt-BR': '...', 'en-US': '...' },
  shortDescription: { 'pt-BR': '...', 'en-US': '...' },
  fullDescription: { 'pt-BR': '...', 'en-US': '...' },
  category: 'web' | 'webapp' | 'library',
  tags: { 'pt-BR': [...], 'en-US': [...] },
  technologies: [...],
  thumbnail: '/projects/<slug>/01-hero.jpg',
  images: [...],
  screenshots: [ /* ... */ ],
  liveUrl: '...',
  // isDemo, githubUrl, npmUrl, figmaUrl conforme o caso
  status: '...',
  myRole: '...',
  featured: false,
  startDate: 'YYYY-MM-DD',
  // endDate?
  client: { name: {...}, industry: {...}, size: '...' },
  challenges: [ /* ... */ ],
  metrics: [ /* opcional */ ],
  testimonial: { /* opcional */ },
  story: { problem: {...}, solution: {...}, process: {...}, results: {...} },
  features: [ /* opcional */ ],
  // nextSteps / technicalChallenges / skillsAcquired opcionais
}
```

## Passo 6 — Registrar e fechar o ciclo

1. Em `src/data/projects/index.ts`: adicione o `import`, inclua no array `projects` e no bloco
   `export { ... }` (mantendo a ordem alfabética já usada nos exports).
2. Rode `npx tsc --noEmit` (ou o typecheck do repo) e o Prettier pra garantir que compila e está formatado.
3. Confira que todos os arquivos de imagem referenciados existem em `public/projects/<slug>/`.
4. Sugira ao usuário: `pnpm dev` e abrir `/projects/<slug>` (pt-BR e en-US, via seletor de idioma) pra
   revisão visual — não afirme que está pronto sem visualização. Verifique especialmente o recorte do
   hero (`thumbnail`) e a ordem da galeria.
5. Liste o que ficou como `TODO` (métrica sem número real, depoimento pendente, etc.) em vez de preencher
   com invenção.
