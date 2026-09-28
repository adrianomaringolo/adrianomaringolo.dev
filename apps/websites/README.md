# websites.adrianomaringolo.dev

Landing page comercial de oferta de serviços de criação de sites (Next.js, bilíngue pt-BR/en-US).

## Antes de publicar

Estes itens estão como placeholder e precisam de valor real antes do lançamento:

1. **Preços dos pacotes** — `src/locales/pt-BR.json` e `src/locales/en-US.json`, chave `packages.*.price`. Os valores atuais (`a partir de R$ 1.997`, etc.) são só referência.
2. **Número de WhatsApp** — variável de ambiente `NEXT_PUBLIC_WHATSAPP_NUMBER` (ver `.env.example`). Sem ela, o botão "Chamar no WhatsApp" abre um link quebrado.
3. **Webhook do formulário de contato** — variável `CONTACT_WEBHOOK_URL`. Pode reaproveitar o mesmo endpoint (Google Apps Script) já usado em `apps/portfolio`, ou apontar para um novo. O payload enviado inclui `"source": "websites-landing"` para diferenciar a origem do lead.
4. **Prova social** (`proof.items` nos dois locales) — hoje lista 3 projetos reais do portfolio (Yane Leitão, GoLaser Barão Geraldo, Gota de Cura). Trocar/ampliar conforme o que fizer mais sentido destacar aqui.

## Rodando localmente

Na raiz do monorepo:

```bash
pnpm install
pnpm dev:websites
```

## Deploy

Este app é pensado para ser um **projeto Vercel separado** do `apps/portfolio`, ambos apontando para o mesmo repositório:

1. Criar um novo projeto na Vercel a partir deste repo.
2. Em **Settings → General → Root Directory**, definir `apps/websites`.
3. Em **Settings → Environment Variables**, configurar `CONTACT_WEBHOOK_URL` e `NEXT_PUBLIC_WHATSAPP_NUMBER`.
4. Em **Settings → Domains**, adicionar `websites.adrianomaringolo.dev`. Se o domínio `adrianomaringolo.dev` já estiver gerenciado pela Vercel, o registro DNS é sugerido automaticamente; senão, criar um CNAME `websites` apontando para `cname.vercel-dns.com` no provedor de DNS.

O projeto Vercel já existente do `apps/portfolio` também precisa ter seu **Root Directory** atualizado para `apps/portfolio` após este merge, senão o build de produção do site pessoal quebra.
