import enUS from '@/locales/en-US.json'
import ptBR from '@/locales/pt-BR.json'

export const defaultLocale = 'pt-BR'
export const locales = ['pt-BR', 'en-US'] as const

export type Locale = (typeof locales)[number]

export const translations = {
  'pt-BR': ptBR,
  'en-US': enUS,
} as const

function resolve(locale: Locale, key: string): unknown {
  const keys = key.split('.')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations[locale]

  for (const k of keys) {
    value = value?.[k]
  }

  return value
}

export function createTranslator(locale: Locale) {
  const t = (key: string): string => {
    const value = resolve(locale, key)
    return typeof value === 'string' ? value : key
  }

  // For content that isn't a single string (arrays of package features,
  // arrays of process-step objects, etc.) — `t()` can't return these since
  // it always resolves to a string.
  function raw<T>(key: string): T | undefined {
    return resolve(locale, key) as T | undefined
  }

  const tList = (key: string): string[] => raw<string[]>(key) ?? []

  return { t, tList, raw, locale }
}

export const localeMetadata = {
  'pt-BR': { name: 'Português (Brasil)' },
  'en-US': { name: 'English (US)' },
} as const
