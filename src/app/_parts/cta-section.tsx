'use client'

import { useLocale } from '@/hooks/use-locale'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function CTASection() {
  const { t } = useLocale()

  return (
    <section className="py-28 px-6 md:px-12 lg:px-20 border-t border-border/40">
      <motion.div
        initial={{ opacity: 1, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        viewport={{ once: true, amount: 0 }}
        className="max-w-2xl mx-auto text-center space-y-6"
      >
        <h2
          className="font-bold tracking-tight text-foreground text-wrap-balance"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
        >
          {t('cta.title')}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {t('cta.description')}
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
          >
            {t('cta.button')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
