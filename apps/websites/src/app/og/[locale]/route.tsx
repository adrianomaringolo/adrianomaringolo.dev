import { locales, type Locale } from '@/lib/i18n'
import { renderOgImage } from '@/lib/og-image'

// A plain route instead of opengraph-image files: those get a hashed path
// inside route groups, and the JSON-LD needs a URL that stays put.
export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function GET(_req: Request, { params }: { params: Promise<{ locale: string }> }) {
  return renderOgImage((await params).locale as Locale)
}
