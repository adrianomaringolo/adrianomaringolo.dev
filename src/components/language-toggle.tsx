'use client'

import { useLocale } from '@/hooks/use-locale'
import { localeMetadata, locales, type Locale } from '@/lib/i18n'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'buildgrid-ui'
import { Languages } from 'lucide-react'

export function LanguageToggle() {
  const { locale, setLocale, t, isLoading } = useLocale()

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale)
  }

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <Languages className="h-4 w-4 animate-pulse" />
        <span className="ml-2 text-sm">...</span>
      </Button>
    )
  }

  const currentLocaleData = localeMetadata[locale]
  const ariaLabel = locale === 'pt-BR' ? 'Alterar idioma' : 'Change language'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={ariaLabel}
          className="transition-all duration-200 hover:scale-105"
        >
          <Languages className="h-4 w-4" />
          <span className="ml-2 text-sm font-medium">
            {currentLocaleData.flag} {locale === 'pt-BR' ? 'PT' : 'EN'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        {locales.map((loc) => {
          const localeData = localeMetadata[loc]
          const isActive = locale === loc

          return (
            <DropdownMenuItem
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              className={`cursor-pointer transition-colors ${
                isActive ? 'bg-accent text-accent-foreground' : ''
              }`}
              disabled={isActive}
            >
              <span className="flex items-center gap-2">
                <span className="text-base">{localeData.flag}</span>
                <span className="font-medium">{localeData.name}</span>
                {isActive && (
                  <span className="ml-auto text-xs opacity-70">
                    {locale === 'pt-BR' ? '✓ Ativo' : '✓ Active'}
                  </span>
                )}
              </span>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
