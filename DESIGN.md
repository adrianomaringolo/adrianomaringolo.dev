# Design Rules — adrianomaringolo.dev

> "The design should whisper quality, not shout features."

## Principles

1. **Work speaks for itself.** Projects are the product. Every other element exists only to get the visitor there.
2. **Restraint is confidence.** What you leave out communicates as much as what you include. No decorative element without intent.
3. **Human before professional.** Real person, real experience — not a résumé on a webpage.
4. **Precision in every detail.** Typography, spacing, and motion should feel considered, not generated.
5. **Silence earns attention.** Space and stillness let the important things be seen.

---

## Anti-patterns (never do)

- Gradient text (e.g. `background-clip: text` with multi-color gradients)
- Typewriter / reveal-by-character effects
- Vanity stats ("50+ projects", "100% satisfaction")
- Floating code decorations or particle effects
- Skill icon grids / badge carousels
- Card grids for project lists — use editorial numbered lists instead
- Eyebrow badges above headings (`<span class="badge">Available for work</span>`)
- Elaborate scroll-driven 3D or parallax effects
- Agency-style "demo-reel" animation sequences

---

## Color System

Defined in `src/app/globals.css` via CSS custom properties.

### Light mode
| Token | Value | Use |
|---|---|---|
| `--background` | `#ffffff` | Page background |
| `--foreground` | `#0f172a` | Body text, headings |
| `--muted` | `#f1f5f9` | Subtle backgrounds |
| `--muted-foreground` | `#64748b` | Secondary text |
| `--primary` | `#0891b2` | Accent, links, active states |
| `--secondary` | `#6366f1` | Accent variant (use sparingly) |
| `--border` | `#e5e7eb` | Dividers |

### Dark mode
| Token | Value | Use |
|---|---|---|
| `--background` | `#09090b` | Page background |
| `--foreground` | `#fafafa` | Body text, headings |
| `--muted` | `#1c1c1e` | Subtle backgrounds |
| `--muted-foreground` | `#a1a1aa` | Secondary text |
| `--primary` | `#06b6d4` | Accent |
| `--border` | `#27272a` | Dividers |

**Rules:**
- Always use tokens — never hardcode hex values in components.
- `--primary` is for meaningful interactive elements only. Don't spray it decoratively.
- Use `/opacity` variants (`border-border/40`, `muted-foreground/60`) to create hierarchy without adding colors.

---

## Typography

**Fonts:** Geist Sans (`--font-sans`) + Geist Mono (`--font-mono`)

| Role | Class / style | Notes |
|---|---|---|
| Display heading | `font-black leading-[0.88] tracking-[-0.04em]`, `clamp(4.5rem, 15vw, 11rem)` | Hero only. Tight leading, negative tracking. |
| Section heading | `text-3xl lg:text-4xl font-bold tracking-tight` | |
| Body | `text-base leading-relaxed` | Default prose |
| Secondary / label | `text-sm text-muted-foreground` | Descriptions, captions |
| Caption / meta | `text-xs text-muted-foreground/50` | Dates, tech tags |
| Monospace label | `text-xs tracking-[0.2em] uppercase text-primary font-mono` | Used in hero label, section markers |
| Item index | `text-sm font-mono text-muted-foreground/30 tabular-nums` | `01`, `02`, `03` list numbering |

**Rules:**
- Headings use `tracking-tight` or tighter — never default letter-spacing on large type.
- Uppercase labels always pair with wide tracking (`tracking-[0.2em]`) and small size.
- Mono font is for labels and indices, not for decorative code snippets.

---

## Layout

- **Max content width:** `max-w-6xl mx-auto`
- **Horizontal padding:** `px-6 md:px-12 lg:px-20`
- **Section vertical rhythm:** `py-24` between major sections
- **Section separator:** `border-t border-border/40` (not full `border-border`)

### Page structure (home)
```
Hero          — full viewport height, name as typographic statement
About         — two-column: bio left, disciplines right
Featured      — editorial numbered list (01/02/03), thumbnail on hover
CTA           — two lines of copy + contact link
```

No more than 4 sections on any single page. Every added section must earn its place.

---

## Components

### Project list (editorial, not cards)
```
[index]  [title + description + tech tags]  [thumbnail on hover]  [arrow]
```
- Index: 2-digit zero-padded monospace, low-opacity
- Thumbnail: hidden by default, `opacity-0 group-hover:opacity-100`, desktop only
- Row hover: `hover:bg-muted/40` — subtle, never border or card shadow
- Divider: `divide-y divide-border/40`

### Links / CTAs
- Primary action: `text-sm font-semibold text-foreground hover:text-primary` + `ArrowRight` icon
- Secondary action: `text-sm font-medium text-muted-foreground hover:text-foreground`
- External: `ExternalLink` icon instead of arrow
- Icon micro-interaction: `group-hover:translate-x-1 transition-transform`
- No filled buttons on editorial pages — text links only unless it's a form submit or download.

### Section labels
```tsx
<p className="text-xs tracking-[0.2em] text-primary uppercase font-mono">
  Featured work
</p>
```
Used before lists to identify sections. Never use badge-style elements.

### Divider lines
```tsx
// Animated (hero)
<motion.div className="h-px bg-primary origin-left" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} />

// Static (section separator)
<div className="border-t border-border/40" />
```

---

## Motion

**Library:** Framer Motion  
**Easing:** `[0.16, 1, 0.3, 1]` — expo-out feel, snappy entry

### Entry animations
- Line reveal (headings): `y: '105%' → '0%'`, duration `0.75s`, wrapped in `overflow-hidden`
- Fade in (body text, CTAs): `opacity: 0 → 1`, duration `0.5s`
- Stagger delay: `0.08s` between list items
- Use `whileInView` with `viewport={{ once: true }}`

### Rules
- Animations must add meaning, not fill time. An entrance should feel like punctuation, not performance.
- Max duration per element: `0.75s`. Page should feel loaded within `1.2s` total.
- No looping animations except extremely subtle ambient glows (opacity `0.07` max).
- No animations that block reading content (never animate the paragraph the user needs to read).
- `prefers-reduced-motion`: all animation durations collapse to `0.01ms` via global CSS.
- Mobile: `will-change: auto` is forced globally — no GPU-heavy transforms on mobile.

### Ambient glow (approved pattern)
```tsx
<div
  aria-hidden
  className="pointer-events-none absolute ..."
  style={{
    background: 'radial-gradient(ellipse at center, oklch(0.65 0.13 200) 0%, transparent 70%)',
    opacity: 0.07,
    filter: 'blur(80px)',
  }}
/>
```
Opacity must not exceed `0.10`. Never animate the glow position.

---

## Accessibility

- WCAG AA contrast minimum on all text.
- All interactive elements keyboard-accessible.
- `aria-hidden` on all decorative elements (glows, dividers, icons duplicated by label).
- Skip-to-content link in layout (`sr-only focus:not-sr-only`).
- `prefers-reduced-motion` respected globally.
- Bilingual (pt-BR / en-US) via i18n — all copy goes through `t()`, no hardcoded strings in components.

---

## What this site is not

Reference these categories when evaluating new design decisions:

| Category | Why it's wrong here |
|---|---|
| Generic AI dev portfolio | Gradient names, typewriter, stat counters, floating code |
| Agency spectacular | 3D scroll, cursor effects, demo-reel animations |
| Generic freelancer layout | Hero → skills → timeline → contact (forgettable) |
| SaaS landing page | Headline + feature grid — sells a product, not a person |
