import { DemoProvider } from '@/hooks/use-demo'
import { LocaleProvider } from '@/hooks/use-locale'
import type { Locale } from '@/lib/i18n'
import { buildJsonLd } from '@/lib/seo'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import type React from 'react'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

// Only used inside the demo site that gets "built" on scroll, to show that
// each client site gets its own typography, not this page's.
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
  display: 'swap',
})

/*
 * Direction contract (kept in source, not shipped: crawlers and answer
 * engines read hidden markup too, and this isn't content about the offer).
 *
 * THESIS: The visitor watches their own site get built while they scroll (conversa, proposta, desenvolvimento, no ar). Refuses the static hero plus feature-card grid.
 * OWN-WORLD: Cool paper (#f5f6f8) and ink (#0e1016) page; one ink stage where a browser window assembles a demo site; volt lime only for live/action fills under ink text; Geist for everything, Geist Mono only for code, URLs and data; 1px hairlines, real photography and real client screenshots.
 * STORY: Understand the fixed-price offer, type the business name, watch it go from notes to live, compare packages, see real sites, request a quote addressed to their own business.
 * FIRST VIEWPORT: Left-aligned headline ~5.5rem over two lines, subline, name input with industry chips, volt CTA; the ink stage and browser chrome peek at the bottom edge.
 * FORM: Category standard (user took the standing exit) at Linear/Vercel/Stripe finish; seed cbf36da4.
 * FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
 */

// Each locale has its own URL and root layout (app/(pt) and app/(en)/en), so
// the server-rendered HTML, <html lang> and metadata already match the
// language: nothing is swapped client-side for crawlers to miss.
export function SiteDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(locale)) }}
        />
        <LocaleProvider locale={locale}>
          <DemoProvider>{children}</DemoProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
