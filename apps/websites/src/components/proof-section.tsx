'use client'

import { useLocale } from '@/hooks/use-locale'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'

type ProofItem = { key: string; title: string; kind: string; description: string; url: string }

export function ProofSection() {
  const { t, raw } = useLocale()
  const items = raw<ProofItem[]>('proof.items') ?? []

  return (
    <section id="projetos" aria-labelledby="proof-heading" className="border-t border-line px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2
              id="proof-heading"
              className="text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.035em]"
            >
              {t('proof.headline')}
            </h2>
            <p className="mt-4 text-lg text-ink-soft">{t('proof.subline')}</p>
          </div>
          <a
            href="https://adrianomaringolo.dev/projects"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[15px] font-medium underline decoration-line-strong hover:decoration-ink"
          >
            {t('proof.cta')}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-16 space-y-20 lg:space-y-28">
          {items.map((item, i) => (
            <article
              key={item.key}
              className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn('group relative block lg:col-span-8', i % 2 === 1 && 'lg:order-2 lg:col-start-5')}
              >
                <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[0_1px_2px_oklch(0.2_0.01_265/0.05),0_24px_48px_-24px_oklch(0.2_0.01_265/0.25)]">
                  <div className="flex items-center gap-3 border-b border-line px-3.5 py-2">
                    <div className="flex gap-1.5" aria-hidden>
                      <span className="h-2 w-2 rounded-full bg-line-strong" />
                      <span className="h-2 w-2 rounded-full bg-line-strong" />
                      <span className="h-2 w-2 rounded-full bg-line-strong" />
                    </div>
                    <span className="truncate font-mono text-[11px] text-ink-soft">
                      {item.url.replace('https://', '')}
                    </span>
                  </div>
                  <img
                    src={`/projects/${item.key}.webp`}
                    alt={t('proof.screenshotAlt').replace('{title}', item.title)}
                    loading="lazy"
                    className="aspect-[2/1] w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.015]"
                  />
                </div>
                <div
                  className={cn(
                    'absolute -bottom-8 w-[22%] min-w-[92px] overflow-hidden rounded-[1.1rem] border-4 border-ink bg-ink shadow-[0_18px_40px_-12px_oklch(0.2_0.01_265/0.45)]',
                    i % 2 === 1 ? '-left-3 lg:-left-6' : '-right-3 lg:-right-6',
                  )}
                >
                  <img src={`/projects/${item.key}-m.webp`} alt="" loading="lazy" className="aspect-[9/16] w-full rounded-[0.8rem] object-cover object-top" />
                </div>
              </a>

              <div className={cn('lg:col-span-4', i % 2 === 1 && 'lg:order-1 lg:col-start-1 lg:row-start-1')}>
                <p className="text-sm text-ink-soft">{item.kind}</p>
                <h3 className="mt-2 text-[1.75rem] leading-tight font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-4 max-w-[46ch] leading-relaxed text-ink-soft">{item.description}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1 text-[15px] font-medium underline decoration-line-strong hover:decoration-ink"
                >
                  {t('proof.visit')}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
