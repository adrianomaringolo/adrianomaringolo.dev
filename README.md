# adrianomaringolo.dev — monorepo

pnpm workspace com os sites do Adriano Maringolo.

## Apps

- **`apps/portfolio`** — [adrianomaringolo.dev](https://adrianomaringolo.dev), o portfolio pessoal (Next.js). Segue as regras de design em `apps/portfolio/DESIGN.md`.
- **`apps/websites`** — [websites.adrianomaringolo.dev](https://websites.adrianomaringolo.dev), landing page comercial de oferta de serviços de criação de sites (Next.js).

Cada app é deployado como um projeto Vercel independente, com "Root Directory" apontando para a pasta do app.

## Getting Started

Instale as dependências uma vez, na raiz do repo:

```bash
pnpm install
```

Rodar um app específico:

```bash
pnpm dev:portfolio    # http://localhost:3000
pnpm dev:websites     # http://localhost:3000 (em outra porta se ambos rodarem juntos)
```

Build:

```bash
pnpm build:portfolio
pnpm build:websites
pnpm build:all        # os dois
```

## Outras pastas

- `instagram-posts/`, `instagram-reels/` — scripts standalone (Node + Puppeteer) para gerar artes de posts/reels do Instagram. Não fazem parte do workspace pnpm; têm `package.json` próprio.
