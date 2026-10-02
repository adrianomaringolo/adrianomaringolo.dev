# Bookmarks

Conteúdo da página `/bookmarks`, editado pelo Keystatic (`keystatic.config.ts`).
Cada link é um JSON em `items/`, cada tag um JSON em `tags/`. Não há banco: a
página lê esses arquivos no build.

## Editar

- **Local:** `pnpm dev` e abra `http://localhost:3000/keystatic`. Salva direto no disco;
  depois é só commitar.
- **Produção:** `https://adrianomaringolo.dev/keystatic`, com login do GitHub. Salvar
  faz um commit na `main`, e o deploy da Vercel publica em cerca de um minuto.

## Configurar o modo GitHub (uma vez)

Enquanto as variáveis abaixo não existirem na Vercel, `/keystatic` responde 404
em produção (a página `/bookmarks` funciona normalmente).

1. Rode o dev forçando o modo GitHub e abra o admin:
   `NEXT_PUBLIC_KEYSTATIC_STORAGE=github pnpm dev` → `http://localhost:3000/keystatic`.
   O Keystatic oferece criar o GitHub App e grava as variáveis em `apps/portfolio/.env`
   (ignorado pelo git). Detalhes: https://keystatic.com/docs/github-mode
2. Instale o GitHub App só no repositório `adrianomaringolo/adrianomaringolo.dev`.
3. Copie para a Vercel (projeto do portfolio):
   - `KEYSTATIC_GITHUB_CLIENT_ID`
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`
   - `KEYSTATIC_SECRET`
   - `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`
4. Na configuração do GitHub App, a callback URL precisa incluir
   `https://adrianomaringolo.dev/api/keystatic/github/oauth/callback`.
