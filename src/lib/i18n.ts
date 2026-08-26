import enUS from '@/locales/en-US.json'
import ptBR from '@/locales/pt-BR.json'

export const defaultLocale = 'pt-BR'
export const locales = ['pt-BR', 'en-US'] as const

export type Locale = (typeof locales)[number]

export const translations = {
  'pt-BR': ptBR,
  'en-US': enUS,
} as const

// Server-side translation function
export function getTranslations(locale: Locale) {
  return translations[locale] || translations[defaultLocale]
}

// Client-side translation function
export function createTranslator(locale: Locale) {
  const t = (key: string): string => {
    const keys = key.split('.')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = translations[locale]

    for (const k of keys) {
      value = value?.[k]
    }

    return typeof value === 'string' ? value : key
  }

  return { t, locale }
}

// Blog posts have a real per-language URL (`?lang=en-US`); every internal
// link to one must carry the current locale so navigation doesn't silently
// drop back to the default language.
export function localizedBlogHref(slug: string, locale: Locale): string {
  return locale === 'en-US' ? `/blog/${slug}?lang=en-US` : `/blog/${slug}`
}

// Locale metadata for SEO
export const localeMetadata = {
  'pt-BR': {
    name: 'Português (Brasil)',
    dir: 'ltr',
    hreflang: 'pt-BR',
  },
  'en-US': {
    name: 'English (US)',
    dir: 'ltr',
    hreflang: 'en-US',
  },
} as const
