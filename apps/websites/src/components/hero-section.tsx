'use client'

import { useDemo } from '@/hooks/use-demo'
import { useLocale } from '@/hooks/use-locale'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  const { t } = useLocale()
  const { name, setName, segmentKey, setSegmentKey, segment, segments } = useDemo()

  return (
    <section id="top" className="relative px-4 pt-28 pb-16 sm:px-6 md:pt-32 lg:px-10 lg:pb-20">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
        <div>
          <p className="mb-7 inline-flex items-center gap-2.5 text-sm text-ink-soft">
            <span className="relative flex h-2 w-2">
              <span className="live-ping absolute inset-0 rounded-full bg-ok" />
              <span className="relative h-2 w-2 rounded-full bg-ok" />
            </span>
            {t('hero.availability')}
          </p>

          <h1 className="max-w-[17ch] text-[clamp(2.6rem,5.6vw,5.25rem)] leading-[0.98] font-semibold tracking-[-0.038em] text-balance">
            {t('hero.headline')}
          </h1>

          <p className="mt-7 max-w-[52ch] text-lg leading-relaxed text-ink-soft md:text-xl md:leading-relaxed">
            {t('hero.subline')}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="#contato"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-paper transition-transform duration-200 ease-out-expo active:scale-[0.97]"
            >
              {t('hero.ctaPrimary')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
            </a>
            <a
              href="#pacotes"
              className="text-[15px] font-medium underline decoration-line-strong hover:decoration-ink"
            >
              {t('hero.ctaSecondary')}
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-5 shadow-[0_1px_2px_oklch(0.2_0.01_265/0.04),0_12px_32px_-12px_oklch(0.2_0.01_265/0.12)] sm:p-7">
          <label htmlFor="business-name" className="block text-sm font-medium">
            {t('hero.builderLabel')}
          </label>
          <input
            id="business-name"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 40))}
            placeholder={t('hero.builderPlaceholder').replace('{example}', segment.defaultName)}
            autoComplete="organization"
            className="mt-3 w-full border-b border-line-strong bg-transparent pb-2 text-2xl font-medium tracking-tight outline-none placeholder:text-ink-soft/60 focus:border-ink sm:text-[1.75rem]"
          />

          <div role="radiogroup" aria-label={t('hero.segmentLabel')} className="mt-5 flex flex-wrap gap-2">
            {segments.map((s) => {
              const active = s.key === segmentKey
              return (
                <button
                  key={s.key}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setSegmentKey(s.key)}
                  className={cn(
                    'rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-200',
                    active
                      ? 'border-ink bg-ink text-paper'
                      : 'border-line-strong text-ink-soft hover:border-ink hover:text-ink',
                  )}
                >
                  {s.label}
                </button>
              )
            })}
          </div>

          <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-ink-soft">
            {t('hero.builderHint')}
          </p>
        </div>
      </div>
    </section>
  )
}
