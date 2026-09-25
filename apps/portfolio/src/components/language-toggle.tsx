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
import Image from 'next/image'
// Flags come from the `flag-icons` package, but only the two SVGs this site
// actually needs are imported. Pulling in `flag-icons/css/flag-icons.min.css`
// would ship 28 KB of CSS and make the build emit all ~260 flag files to serve
// two of them. Emoji flags were the previous approach and don't render at all
// on Windows, which is the reason for the swap.
import brFlag from 'flag-icons/flags/4x3/br.svg'
import usFlag from 'flag-icons/flags/4x3/us.svg'

const flagByLocale: Record<Locale, typeof brFlag> = {
  'pt-BR': brFlag,
  'en-US': usFlag,
}

function Flag({ locale, className = '' }: { locale: Locale; className?: string }) {
  return (
    <Image
      src={flagByLocale[locale]}
      alt=""
      aria-hidden
      width={20}
      height={15}
      unoptimized
      // The hairline ring keeps the white stripes of a flag from bleeding into
      // the surface behind it — which is why it has to flip in dark mode.
      className={`h-[0.9em] w-auto rounded-[1px] ring-1 ring-black/10 dark:ring-white/20 ${className}`}
    />
  )
}

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

  const ariaLabel = t('common.changeLanguage')

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
          <span className="ml-2 flex items-center gap-1.5 text-sm font-medium">
            <Flag locale={locale} />
            {locale === 'pt-BR' ? 'PT' : 'EN'}
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
                <Flag locale={loc} className="text-base" />
                <span className="font-medium">{localeData.name}</span>
              </span>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
