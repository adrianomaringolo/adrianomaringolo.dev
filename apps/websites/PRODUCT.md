# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, equal weight:

- **Pequenos negócios locais e profissionais liberais** (nutricionista, clínica, farmácia, comércio) que precisam do primeiro site profissional ou de um redesign, e querem prazo e preço claros sem intermediário.
- **Empresas e startups** que precisam de um web app ou sistema sob medida (login, dados, regras de negócio, integrações) e querem alguém sênior cuidando de arquitetura, testes e suporte.

Both arrive deciding whether to trust one independent engineer with their project and whether to ask for a quote.

## Product Purpose

`websites.adrianomaringolo.dev` is the commercial landing page for Adriano Maringolo's website-building service. It turns a visitor into a lead: a contact-form submission (sent to `CONTACT_WEBHOOK_URL` with `source: "websites-landing"`) or a WhatsApp conversation. Success is a qualified quote request with a package picked.

## Positioning

Built directly by a senior software engineer with 15+ years of experience, no agency or middleman. Scope, deadline and price are fixed in writing before any code. Custom-made for the client's content rather than a template. The same person who builds a landing page can build the system behind it.

## Operating Context

Four-step process: conversa inicial → proposta e prazo por escrito → desenvolvimento com pontos de revisão → lançamento (domínio configurado, hospedagem inclusa) seguido de acompanhamento e manutenção contínuos.

Every project is always built responsive, with SEO, AEO (answer engines, voice search) and GEO (generative engines like ChatGPT/Gemini), and optimized performance. **All packages include hosting and ongoing follow-up and maintenance** after launch. Domain setup is included, but **domain purchase and renewal are not** (marked with `**` on the page).

Three packages: Site institucional (até 5 páginas, 2–3 semanas), Landing page (página única focada em conversão, 1–2 semanas), Web app / sistema sob medida (prazo após escopo). The contact form can preselect a package via `?pacote=site|landing|webapp`.

Add-on services, priced on request ("sob orçamento"): Sistema de blog, CRM básico, Artes de lançamento, Rastreamento de conversões (GTM with WhatsApp/form events, Google Ads, Meta Pixel). The contact payload carries `addons` (titles) alongside `package`. Still undecided: whether Search Console setup and basic GA4 count as included (under SEO/metrics).

## Capabilities and Constraints

- Next.js 16 app in a pnpm monorepo (`apps/websites`), deployed as a separate Vercel project from `apps/portfolio`.
- Bilingual pt-BR (default) and en-US via `src/locales/*.json` and `useLocale()`.
- Contact goes through `/api/contact` to a webhook; WhatsApp via `NEXT_PUBLIC_WHATSAPP_NUMBER`.
- **Placeholders, not facts yet:** package prices (`a partir de R$ 1.597*`, `R$ 987*`, `sob orçamento*`) are reference values marked with an asterisk and disclaimer; the WhatsApp number is a placeholder.

## Brand Commitments

- Visual identity may diverge from the personal portfolio (`apps/portfolio`); the user explicitly allowed a separate identity for this service.
- Voice: direct, plain Portuguese, first person, no hype ("Sem intermediário, sem enrolação").
- Copy may be rewritten; facts (packages, prices, deadlines, process, projects) must stay.

## Evidence on Hand

- Three real projects: Yane Leitão (nutricionista, site com agendamento e catálogo), GoLaser Barão Geraldo (clínica de estética, jornada de conversão + WhatsApp), Gota de Cura (farmácia de manipulação, blog + catálogo). Full portfolio at https://adrianomaringolo.dev.
- No testimonials, client counts, performance benchmarks or ratings exist. Do not invent them.

## Product Principles

1. Transparency before persuasion: scope, deadline and price are shown, not hidden behind "fale conosco".
2. Show the craft, don't claim it: the page itself should demonstrate engineering quality.
3. One person, end to end: from conversation to deploy and support.
4. Serve both the local business and the system buyer without making either feel like the secondary audience.

## Accessibility & Inclusion

WCAG AA contrast, full keyboard navigation, honors `prefers-reduced-motion`, readable on mid-range phones (many local-business visitors arrive from Instagram/WhatsApp on mobile).
