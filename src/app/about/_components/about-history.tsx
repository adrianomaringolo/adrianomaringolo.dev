'use client'

import { useLocale } from '@/hooks/use-locale'
import { motion } from 'framer-motion'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function AboutHistory() {
  const { t } = useLocale()

  const paragraphs = t('about.history').split('\n\n').filter(Boolean)

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
          {t('about.historyTitle')}
        </motion.p>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-20">
          {paragraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-base leading-relaxed text-foreground/75"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
