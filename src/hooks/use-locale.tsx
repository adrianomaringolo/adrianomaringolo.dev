'use client'

import { createTranslator, defaultLocale, type Locale } from '@/lib/i18n'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface LocaleContextType {
  locale: Locale
  t: (key: string) => string
  setLocale: (locale: Locale) => void
  isLoading: boolean
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Prevent hydration mismatch by only running on client
    const initializeLocale = () => {
      try {
        // Check localStorage first
        const savedLocale = localStorage.getItem('preferred-locale') as Locale
        if (savedLocale && (savedLocale === 'pt-BR' || savedLocale === 'en-US')) {
          setLocaleState(savedLocale)
        } else {
          // Detect system language
          const systemLang = navigator.language
          const detectedLocale = systemLang.startsWith('pt') ? 'pt-BR' : 'en-US'
          setLocaleState(detectedLocale)
          localStorage.setItem('preferred-locale', detectedLocale)
        }
      } catch (error) {
        console.warn('Failed to initialize locale:', error)
        setLocaleState(defaultLocale)
      } finally {
        setIsLoading(false)
      }
    }

    initializeLocale()
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    
    try {
      localStorage.setItem('preferred-locale', newLocale)
      // Update document language
      document.documentElement.lang = newLocale
      
      // Announce change to screen readers
      const announcement = newLocale === 'pt-BR' 
        ? 'Idioma alterado para Português' 
        : 'Language changed to English'
      
      // Create temporary announcement element
      const announcer = document.createElement('div')
      announcer.setAttribute('aria-live', 'polite')
      announcer.setAttribute('aria-atomic', 'true')
      announcer.className = 'sr-only'
      announcer.textContent = announcement
      document.body.appendChild(announcer)
      
      // Remove after announcement
      setTimeout(() => {
        document.body.removeChild(announcer)
      }, 1000)
    } catch (error) {
      console.warn('Failed to save locale preference:', error)
    }
  }

  const { t } = createTranslator(locale)

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, isLoading }}>
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
