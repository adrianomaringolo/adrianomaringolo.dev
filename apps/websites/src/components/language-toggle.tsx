'use client'

import { useLocale } from '@/hooks/use-locale'
import { localePaths } from '@/lib/seo'
import { cn } from '@/lib/utils'

export function LanguageToggle({ dark = false }: { dark?: boolean }) {
  const { locale, setLocale, t } = useLocale()
  const other = locale === 'pt-BR' ? 'en-US' : 'pt-BR'

  // A real link to the other language's URL (crawlable, hreflang-tagged);
  // the click handler also remembers the choice for later visits.
  return (
    <a
      href={localePaths[other]}
      hrefLang={other}
      onClick={(e) => {
        e.preventDefault()
        setLocale(other)
      }}
      aria-label={t('common.changeLanguage')}
      className={cn(
        'flex h-8 items-center rounded-full border px-1 font-mono text-[11px] tracking-wide transition-colors',
        dark ? 'border-stage-line' : 'border-line-strong',
      )}
    >
      {(['pt-BR', 'en-US'] as const).map((l) => (
        <span
          key={l}
          className={cn(
            'rounded-full px-2 py-0.5 transition-colors',
            locale === l
              ? dark
                ? 'bg-stage-ink text-stage'
                : 'bg-ink text-paper'
              : dark
                ? 'text-stage-soft'
                : 'text-ink-soft',
          )}
        >
          {l === 'pt-BR' ? 'PT' : 'EN'}
        </span>
      ))}
    </a>
  )
}
