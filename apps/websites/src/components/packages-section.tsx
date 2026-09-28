'use client'

import { useDemo } from '@/hooks/use-demo'
import { useLocale } from '@/hooks/use-locale'
import { cn } from '@/lib/utils'
import {
  ArrowRight,
  Check,
  Contact,
  Gauge,
  Megaphone,
  Target,
  MessageSquareText,
  Newspaper,
  Plus,
  Search,
  Server,
  Smartphone,
  Sparkles,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

const packageKeys = ['site', 'landing', 'webapp'] as const

type IncludedItem = { key: string; title: string; description: string }

type AddonItem = { key: string; title: string; description: string }

const addonIcons: Record<string, LucideIcon> = {
  blog: Newspaper,
  crm: Contact,
  launch: Megaphone,
  tracking: Target,
}

const includedIcons: Record<string, LucideIcon> = {
  responsive: Smartphone,
  seo: Search,
  aeo: MessageSquareText,
  geo: Sparkles,
  performance: Gauge,
  hosting: Server,
  care: Wrench,
}

export function PackagesSection() {
  const { t, tList, raw } = useLocale()
  const included = raw<IncludedItem[]>('packages.included.items') ?? []
  const addons = raw<AddonItem[]>('packages.addons.items') ?? []
  const { segment, setSelectedPackage, selectedAddons, toggleAddon } = useDemo()

  return (
    <section id="pacotes" aria-labelledby="packages-heading" className="border-t border-line px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <h2
            id="packages-heading"
            className="max-w-[16ch] text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance"
          >
            {t('packages.headline')}
          </h2>
          <p className="max-w-[46ch] text-lg leading-relaxed text-ink-soft lg:justify-self-end">{t('packages.subline')}</p>
        </div>

        {/* One ruled table split into three columns rather than three floating cards. */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-line bg-surface">
          <div className="grid md:grid-cols-3">
          {packageKeys.map((key, i) => {
            // The package matching the industry picked in the hero gets marked, so the demo carries through.
            const matched = segment.package === key
            return (
              <div
                key={key}
                className={cn(
                  'relative flex flex-col p-7 lg:p-9',
                  i > 0 && 'border-t border-line md:border-t-0 md:border-l',
                )}
              >
                {matched && <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-volt" />}
                <h3 className="text-xl font-semibold tracking-tight">{t(`packages.${key}.name`)}</h3>
                <p className="mt-2 min-h-[3em] text-[15px] leading-snug text-ink-soft">{t(`packages.${key}.tagline`)}</p>
                <p className="tabular mt-7 text-[1.9rem] leading-none font-semibold tracking-[-0.03em]">
                  {t(`packages.${key}.price`)}
                </p>
                <p className="mt-2 text-[15px] text-ink-soft">{t(`packages.${key}.maintenance`)}</p>

                <ul className="mt-8 flex-1 space-y-3.5">
                  {tList(`packages.${key}.features`).map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-[15px] leading-snug">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-ok" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contato"
                  onClick={() => setSelectedPackage(key)}
                  className={cn(
                    'group mt-10 inline-flex items-center justify-between gap-2 rounded-full px-5 py-3 text-[15px] font-medium transition-[background-color,transform] duration-200 ease-out-expo active:scale-[0.98]',
                    matched ? 'bg-ink text-paper' : 'bg-paper text-ink ring-1 ring-line-strong hover:ring-ink',
                  )}
                >
                  {t(`packages.${key}.cta`)}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
                </a>
              </div>
            )
          })}
          </div>

          {/* What every package ships with, so the columns only list what differs. */}
          <div className="border-t border-line bg-paper/60 p-7 lg:p-9">
            <h3 className="text-lg font-semibold tracking-tight">{t('packages.included.title')}</h3>
            <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
              {included.map((item) => {
                const Icon = includedIcons[item.key] ?? Check
                return (
                  <li key={item.key} className="flex gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <span>
                      <span className="block text-[15px] font-medium">{item.title}</span>
                      <span className="mt-0.5 block text-sm leading-snug text-ink-soft">{item.description}</span>
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="mt-6 space-y-1 text-sm text-ink-soft">
          <p>{t('packages.disclaimer')}</p>
          <p>{t('packages.domainNote')}</p>
        </div>

        {/* Add-ons: a ruled row, quieter than the packages above. */}
        <div className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight font-semibold tracking-[-0.03em]">
              {t('packages.addons.title')}
            </h3>
            <p className="max-w-[44ch] text-ink-soft">{t('packages.addons.subline')}</p>
          </div>
          <ul className="mt-8 grid gap-px overflow-hidden border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {addons.map((addon) => {
              const Icon = addonIcons[addon.key] ?? Plus
              const added = selectedAddons.includes(addon.key)
              return (
                <li
                  key={addon.key}
                  className="flex flex-col bg-paper py-7 sm:px-6"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                  <p className="mt-4 text-lg font-medium tracking-tight">{addon.title}</p>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">{addon.description}</p>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <span className="text-sm text-ink-soft">{t('packages.addons.price')}</span>
                    <a
                      href="#contato"
                      onClick={() => toggleAddon(addon.key, true)}
                      className="inline-flex items-center gap-1.5 text-[15px] font-medium underline decoration-line-strong hover:decoration-ink"
                    >
                      {added ? <Check className="h-4 w-4 text-ok" /> : <Plus className="h-4 w-4" />}
                      {added ? t('packages.addons.added') : t('packages.addons.cta')}
                    </a>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
