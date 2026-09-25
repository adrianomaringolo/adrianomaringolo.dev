'use client'

import { createTranslator, defaultLocale, type Locale } from '@/lib/i18n'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface LocaleContextType {
  locale: Locale
  t: (key: string) => string
  tList: (key: string) => string[]
  raw: <T>(key: string) => T | undefined
  setLocale: (locale: Locale) => void
  isLoading: boolean
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Reads browser-only APIs (localStorage, navigator.language), which
    // aren't available during SSR — has to run post-mount, not in a lazy
    // useState initializer, to avoid a hydration mismatch.
    try {
      const saved = localStorage.getItem('preferred-locale') as Locale
      if (saved === 'pt-BR' || saved === 'en-US') {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocaleState(saved)
      } else {
        const detected = navigator.language.startsWith('pt') ? 'pt-BR' : 'en-US'
        setLocaleState(detected)
        localStorage.setItem('preferred-locale', detected)
      }
    } catch {
      setLocaleState(defaultLocale)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    try {
      localStorage.setItem('preferred-locale', newLocale)
      document.documentElement.lang = newLocale
    } catch {
      // localStorage can throw in private/blocked-storage contexts; locale
      // still updates for this session via state.
    }
  }

  const { t, tList, raw } = createTranslator(locale)

  return (
    <LocaleContext.Provider value={{ locale, t, tList, raw, setLocale, isLoading }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}
