'use client'

import { career } from '@/data/career'
import { useLocale } from '@/hooks/use-locale'
import { motion } from 'framer-motion'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function AboutCareer() {
  const { t, locale } = useLocale()
  const presentLabel = locale === 'pt-BR' ? 'Presente' : 'Present'

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-border/40">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0 }}
          className="text-xs tracking-[0.2em] text-primary uppercase font-mono mb-14"
        >
          {t('about.careerTitle')}
        </motion.p>

        <ul>
          {career.map((entry, i) => {
            const isCurrent = entry.endYear === null
            const isLast = i === career.length - 1
            const period = `${entry.startYear} – ${isCurrent ? presentLabel : entry.endYear}`

            return (
              <motion.li
                key={entry.id}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease }}
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-[28px_1fr] md:grid-cols-[36px_1fr] gap-5 md:gap-8"
              >
                {/* Timeline axis */}
                <div className="flex flex-col items-center">
                  {/* Dot */}
                  {isCurrent ? (
                    <div className="relative shrink-0 mt-1 flex items-center justify-center w-7 h-7">
                      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative flex h-3 w-3 rounded-full bg-emerald-500" />
                    </div>
                  ) : (
                    <div className="mt-1 w-7 h-7 flex items-center justify-center shrink-0">
                      <span className="h-2.5 w-2.5 rounded-full border-2 border-border/60 bg-background" />
                    </div>
                  )}

                  {/* Connecting line */}
                  {!isLast && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      transition={{ duration: 0.6, delay: i * 0.07 + 0.25, ease }}
                      viewport={{ once: true }}
                      className="flex-1 w-px bg-border/35 origin-top mt-1"
                    />
                  )}
                </div>

                {/* Content */}
                <div className={`pb-10${isLast ? ' pb-0' : ''}`}>
                  <p className="text-[10px] font-mono text-muted-foreground/35 tracking-wide mt-6 mb-2">
                    {period}
                  </p>

                  <div className="space-y-0.5 mb-3">
                    <h3 className="text-base font-semibold text-foreground leading-snug">
                      {entry.company[locale] ?? entry.company['pt-BR']}
                    </h3>
                    <p className="text-sm text-primary/60 font-medium">
                      {entry.role[locale] ?? entry.role['pt-BR']}
                    </p>
                    <p className="text-xs text-muted-foreground/30">
                      {entry.location[locale] ?? entry.location['pt-BR']}
                    </p>
                  </div>

                  <p className="text-sm text-muted-foreground/60 leading-relaxed">
                    {entry.description[locale] ?? entry.description['pt-BR']}
                  </p>
                </div>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
