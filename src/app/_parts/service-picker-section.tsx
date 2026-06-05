'use client'

import { useLocale } from '@/hooks/use-locale'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, LayoutDashboard, Lightbulb, Monitor, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

type ServiceKey = 'website' | 'webapp' | 'consulting'

const serviceIcons: Record<ServiceKey, React.ComponentType<{ className?: string }>> = {
  website: Monitor,
  webapp: LayoutDashboard,
  consulting: Lightbulb,
}

const serviceKeys: ServiceKey[] = ['website', 'webapp', 'consulting']
const pointKeys = ['point1', 'point2', 'point3', 'point4'] as const

export function ServicePickerSection() {
  const { t } = useLocale()
  const [open, setOpen] = useState<ServiceKey | null>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const ActiveIcon = open ? serviceIcons[open] : null

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-border/40">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-14"
        >
          <p className="text-xs tracking-[0.2em] text-primary uppercase font-mono mb-4">
            {t('home.servicePicker.eyebrow')}
          </p>
          <h2
            className="font-bold tracking-tight text-foreground"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
          >
            {t('home.servicePicker.headline')}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl leading-relaxed">
            {t('home.servicePicker.subline')}
          </p>
        </motion.div>

        <div className="divide-y divide-border/40 border-y border-border/40">
          {serviceKeys.map((key, i) => {
            const Icon = serviceIcons[key]
            return (
              <motion.button
                key={key}
                onClick={() => setOpen(key)}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                viewport={{ once: true, amount: 0.2 }}
                className="group w-full text-left py-7 flex items-center gap-5 md:gap-8 cursor-pointer"
              >
                <span className="text-xs font-mono text-muted-foreground/25 w-5 shrink-0 select-none">
                  0{i + 1}
                </span>

                <div className="w-10 h-10 rounded-lg border border-border/50 flex items-center justify-center text-muted-foreground/50 group-hover:border-primary/50 group-hover:text-primary transition-all duration-300 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                    {t(`home.servicePicker.${key}.label`)}
                  </p>
                  <p className="text-sm text-muted-foreground/50 mt-0.5 hidden sm:block">
                    {t(`home.servicePicker.${key}.tagline`)}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground/40 group-hover:text-primary transition-colors duration-200 shrink-0">
                  <span className="hidden md:block">{t('home.servicePicker.explore')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {open && ActiveIcon && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/70 backdrop-blur-sm z-40"
              onClick={() => setOpen(null)}
            />

            <motion.aside
              key="panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-[440px] bg-background border-l border-border/60 flex flex-col shadow-2xl"
            >
              <div className="flex items-start justify-between p-6 border-b border-border/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg border border-primary/30 bg-primary/5 flex items-center justify-center text-primary shrink-0">
                    <ActiveIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground leading-tight">
                      {t(`home.servicePicker.${open}.label`)}
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-0.5">
                      {t(`home.servicePicker.${open}.tagline`)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(null)}
                  aria-label="Fechar"
                  className="p-1.5 rounded-md text-muted-foreground/50 hover:text-foreground hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <p className="text-foreground/80 leading-relaxed">
                  {t(`home.servicePicker.${open}.description`)}
                </p>

                <div>
                  <p className="text-[10px] tracking-[0.18em] text-muted-foreground/40 uppercase mb-4">
                    {t('home.servicePicker.includes')}
                  </p>
                  <ul className="space-y-3">
                    {pointKeys.map((pk) => (
                      <li key={pk} className="flex items-start gap-3 text-sm text-foreground/75">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        {t(`home.servicePicker.${open}.${pk}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 border-t border-border/40">
                <Link
                  href={`/contact?service=${open}`}
                  onClick={() => setOpen(null)}
                  className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground text-sm font-semibold py-3 px-4 rounded-md hover:opacity-90 transition-opacity"
                >
                  {t(`home.servicePicker.${open}.cta`)}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
