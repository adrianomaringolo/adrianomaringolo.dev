'use client'

import { createTranslator, type Locale } from '@/lib/i18n'
import { localePaths } from '@/lib/seo'
import { createContext, useContext, useEffect, type ReactNode } from 'react'

// Set only when the visitor clicks the language toggle. Not the old
// 'preferred-locale' key: that one was also written by browser-language
// auto-detection, and redirecting on it would bounce crawlers and shared
// links away from the URL they asked for.
const CHOICE_KEY = 'locale-choice'

interface LocaleContextType {
  locale: Locale
  t: (key: string) => string
  tList: (key: string) => string[]
  raw: <T>(key: string) => T | undefined
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  useEffect(() => {
    // Honor an explicit earlier choice when landing on the other language's URL.
    try {
      const choice = localStorage.getItem(CHOICE_KEY)
      if ((choice === 'pt-BR' || choice === 'en-US') && choice !== locale) {
        window.location.replace(localePaths[choice] + window.location.hash)
      }
    } catch {
      // Blocked storage: stay on the requested URL.
    }
  }, [locale])

  const setLocale = (newLocale: Locale) => {
    try {
      localStorage.setItem(CHOICE_KEY, newLocale)
    } catch {
      // Blocked storage: the navigation below still switches language.
    }
    // Each locale is its own root layout, so this is a full navigation anyway.
    window.location.assign(localePaths[newLocale] + window.location.hash)
  }

  const { t, tList, raw } = createTranslator(locale)

  return <LocaleContext.Provider value={{ locale, t, tList, raw, setLocale }}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}
