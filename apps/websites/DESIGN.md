# Design

Visual system of `websites.adrianomaringolo.dev`, recorded from the built page. Deliberately separate from `apps/portfolio` (no cyan/indigo, no Manrope).

## Direction

Category standard at Linear / Vercel / Stripe finish, chosen over metaphor-driven directions. One idea carries it: **the visitor watches their own site get built while they scroll**. The hero sits on the ink ground and makes the typed business name its display type (shrunk to fit one line), with the industry as radio tiles and the live `slug.com.br` in mono under it; the h1 and CTAs sit in a quieter row at the fold. The ink stage right below pins a browser (phone on mobile) and walks the four real process steps, ending with the site live under that name. The contact headline reuses the name.

## Color

Light middle, ink bookends: hero + build stage at the top, contact + footer at the bottom. Tokens live in `src/app/globals.css` (`:root`) and are exposed to Tailwind as `paper`, `surface`, `ink`, `ink-soft`, `line`, `line-strong`, `stage*`, `volt`, `volt-deep`, `ok`, `danger`.

| Role | Token | Use |
|---|---|---|
| Ground | `paper` oklch(0.975 0.003 250) | Page background |
| Raised | `surface` white | Builder panel, pricing table, overlay cards |
| Text | `ink` / `ink-soft` | Body and secondary copy (never gray on colored grounds) |
| Stage | `stage` / `stage-raised` / `stage-ink` / `stage-soft` / `stage-line` | Hero, build stage, contact, footer (`data-ground="stage"`) |
| Volt | `volt` oklch(0.91 0.2 122) | Only for what is live or actionable: primary CTAs, live URL bar, progress rail, selected package, text selection. Always a fill under ink text, never text on paper |

The header reads `data-ground="stage"` under it and flips to the ink treatment.

## Type

- **Geist** for everything. Display: semibold, tracking about -0.035em, leading about 1.0, `text-balance`. The hero's display is the name input (up to 6rem); the hero h1 is `clamp(1.6rem, 2.8vw, 2.4rem)`, section h2s are `clamp(2rem, 4.4vw, 3.75rem)`.
- **Geist Mono** only for code, URLs and file names (URL bars, code panel, language toggle).
- **Instrument Serif** only inside the demo client sites (`demo-site.tsx`), to show that client sites get their own typography.
- No eyebrows or kickers above headings. No section numbers.

## Components

- Buttons: pill (`rounded-full`). The primary is `ink` on paper and `volt` on stage/header; the secondary is an underlined text link. Press state is `active:scale-[0.97–0.98]`, and arrow icons nudge on hover.
- Pricing: one ruled table split into three columns (not floating cards). The package matching the hero's industry gets a 4px volt top rule and the ink CTA.
- Browser frames: 1px border, three muted dots, mono URL. Used for the stage demo and the real-project screenshots (with an overlapping phone crop).
- Form: dark fields on `stage-raised`, volt focus border, package choice as radio tiles.
- Icons: lucide-react only.

## Motion

Two scroll sequences, the build stage and a quieter one after it.

**`build-stage.tsx`:** All states derive from a single `scrollYProgress` (`STEP_STARTS = [0, .26, .48, .78]`): notes card, proposal card with approval, wireframe fade, code panel typing, a clip-path wipe from wireframe to design with a volt scan line, then the live URL, the "Published" toast and the phone. Easing is `ease-out-expo`. Framer offsets must stay in [0,1]. `prefers-reduced-motion` renders `StaticStage` (final state plus the step list).

**FAQ (`faq-section.tsx` + `network-diagram.tsx`):** an accordion (one item open, grid-rows height transition, `+` rotating to `×`, `aria-expanded`, `inert` when closed). Opening "Por que ter um site próprio?" plays the network diagram from Instagram post-18 slide 06 on a 7.5s timer, with no scroll: the lines draw out from the ink "Seu site" node and each channel pops in; then the channels dim and a dashed ring holds the site (rented vs. owned); then ink dots flow into the site, which turns volt. The three reasons highlight in step, and "Ver de novo" replays. Node visibility is a prop plus a CSS transition, because Framer-driven opacity got stuck half-transparent. The section also emits `FAQPage` JSON-LD.

**Hero (`hero-section.tsx`):** on load its blocks rise in once (`.hero-rise`: opacity, 14px lift and blur, staggered 0–420ms). Until the visitor types, the industry's example name types itself in at display size with a blinking volt caret, and on an industry change it deletes back and retypes the new one (55ms per character). The industry's photo sits in the right corner (20% opacity on mobile, 30% on desktop, desaturated, masked toward the text and the bottom) and crossfades with a slow 1.06→1 settle. Reduced motion shows the name and photo without typing or rise.

No entrance animations elsewhere.

## Imagery

- Pexels photos in `public/images` (one per industry, used by the demo site and faded behind the hero; two audience panels). Provenance lives in `*.webp.json` sidecars.
- Real client screenshots in `public/projects`, copied from `apps/portfolio`.
- Demo content (Clínica Aurora, Padaria Estrela, Flor de Lis, Escala Fácil, Marina Costa) is fictional and labeled "Demonstração" in the URL bar.
