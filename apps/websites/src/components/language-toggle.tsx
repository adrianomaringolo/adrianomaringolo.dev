'use client'

import { useLocale } from '@/hooks/use-locale'
import { Languages } from 'lucide-react'

export function LanguageToggle() {
  const { locale, setLocale, t, isLoading } = useLocale()

  if (isLoading) {
    return (
      <button disabled className="flex items-center gap-1.5 text-sm text-muted-foreground/50">
        <Languages className="h-4 w-4 animate-pulse" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setLocale(locale === 'pt-BR' ? 'en-US' : 'pt-BR')}
      aria-label={t('common.changeLanguage')}
      className="flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
    >
      <Languages className="h-4 w-4" />
      {locale === 'pt-BR' ? 'PT' : 'EN'}
    </button>
  )
}
