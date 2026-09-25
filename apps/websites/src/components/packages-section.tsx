'use client'

import { useLocale } from '@/hooks/use-locale'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Check, LayoutDashboard, Monitor, Rocket } from 'lucide-react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

const packageKeys = ['site', 'landing', 'webapp'] as const
type PackageKey = (typeof packageKeys)[number]

const packageIcons: Record<PackageKey, React.ComponentType<{ className?: string }>> = {
  site: Monitor,
  landing: Rocket,
  webapp: LayoutDashboard,
}

const featuredPackage: PackageKey = 'landing'

export function PackagesSection() {
  const { t, tList } = useLocale()

  return (
    <section id="pacotes" className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            {t('packages.eyebrow')}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('packages.headline')}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{t('packages.subline')}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {packageKeys.map((key, i) => {
            const Icon = packageIcons[key]
            const isFeatured = key === featuredPackage

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className={cn(
                  'flex flex-col rounded-2xl border p-8',
                  isFeatured
                    ? 'border-primary/50 bg-primary/[0.03] shadow-lg shadow-primary/5'
                    : 'border-border bg-card',
                )}
              >
                {isFeatured && (
                  <span className="mb-4 w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Popular
                  </span>
                )}

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-primary">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-xl font-bold text-foreground">{t(`packages.${key}.name`)}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{t(`packages.${key}.tagline`)}</p>
                <p className="mt-5 text-2xl font-bold text-foreground">{t(`packages.${key}.price`)}</p>

                <ul className="mt-6 flex-1 space-y-3">
                  {tList(`packages.${key}.features`).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={`/?pacote=${key}#contato`}
                  className={cn(
                    'mt-8 flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90',
                    isFeatured ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground',
                  )}
                >
                  {t(`packages.${key}.cta`)}
                </a>
              </motion.div>
            )
          })}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground/60">{t('packages.disclaimer')}</p>
      </div>
    </section>
  )
}
