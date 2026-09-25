'use client'

import { useLocale } from '@/hooks/use-locale'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function HeroSection() {
  const { t } = useLocale()

  return (
    <section id="top" className="relative overflow-hidden px-6 pt-20 pb-24 md:px-12 md:pt-28 md:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px]"
        style={{
          background:
            'radial-gradient(ellipse 800px 400px at 50% -10%, oklch(0.65 0.13 200 / 0.18), transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="mb-3 flex items-center justify-center gap-2"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
          <span className="text-sm font-medium text-muted-foreground">{t('hero.availability')}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="text-4xl font-black tracking-tight text-balance text-foreground sm:text-5xl md:text-6xl"
        >
          {t('hero.headline')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
        >
          {t('hero.subline')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contato"
            className="flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t('hero.ctaPrimary')}
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#pacotes"
            className="text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            {t('hero.ctaSecondary')}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
