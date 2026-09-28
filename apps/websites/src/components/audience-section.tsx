'use client'

import { useDemo } from '@/hooks/use-demo'
import { useLocale } from '@/hooks/use-locale'
import { ArrowRight, Check } from 'lucide-react'

const panels = [
  { key: 'local', image: '/images/audience-local.webp', href: '#pacotes', pkg: null },
  { key: 'company', image: '/images/audience-company.webp', href: '#contato', pkg: 'webapp' },
] as const

export function AudienceSection() {
  const { t, tList } = useLocale()
  const { setSelectedPackage } = useDemo()

  return (
    <section aria-labelledby="audience-heading" className="px-4 pt-28 pb-24 sm:px-6 lg:px-10 lg:pt-36">
      <div className="mx-auto max-w-7xl">
        <h2
          id="audience-heading"
          className="max-w-[18ch] text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance"
        >
          {t('audience.headline')}
        </h2>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-6 lg:gap-10">
          {panels.map((panel) => (
            <article key={panel.key} className="group">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-line">
                <img
                  src={panel.image}
                  alt={t(`audience.${panel.key}.imageAlt`)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]"
                />
              </div>
              <h3 className="mt-7 text-2xl font-semibold tracking-tight">{t(`audience.${panel.key}.title`)}</h3>
              <p className="mt-3 max-w-[52ch] leading-relaxed text-ink-soft">{t(`audience.${panel.key}.body`)}</p>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {tList(`audience.${panel.key}.points`).map((point) => (
                  <li key={point} className="flex items-center gap-3 py-3 text-[15px]">
                    <Check className="h-4 w-4 shrink-0 text-ok" />
                    {point}
                  </li>
                ))}
              </ul>
              <a
                href={panel.href}
                onClick={() => panel.pkg && setSelectedPackage(panel.pkg)}
                className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium underline decoration-line-strong hover:decoration-ink"
              >
                {t(`audience.${panel.key}.cta`)}
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
