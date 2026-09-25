'use client'

import { useLocale } from './use-locale'

type InterpolationValues = Record<string, string | number>

export function useTranslation() {
  const { locale, t: baseT } = useLocale()

  // Enhanced translation function with interpolation
  const t = (key: string, values?: InterpolationValues): string => {
    let translation = baseT(key)

    if (values && typeof translation === 'string') {
      Object.entries(values).forEach(([placeholder, value]) => {
        const regex = new RegExp(`{{\\s*${placeholder}\\s*}}`, 'g')
        translation = translation.replace(regex, String(value))
      })
    }

    return translation
  }

  // Pluralization helper
  const tp = (key: string, count: number, values?: InterpolationValues): string => {
    const pluralKey = count === 1 ? `${key}.singular` : `${key}.plural`
    return t(pluralKey, { count, ...values })
  }

  // Conditional translation (returns different keys based on condition)
  const tc = (
    condition: boolean,
    trueKey: string,
    falseKey: string,
    values?: InterpolationValues,
  ): string => {
    return t(condition ? trueKey : falseKey, values)
  }

  return {
    t,
    tp,
    tc,
    locale,
  }
}
