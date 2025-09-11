'use client'

import { useLocale } from '@/hooks/use-locale'
import { motion } from 'framer-motion'

export function AboutSection() {
  const { t } = useLocale()

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-balance">
            {t('home.about.title')}
          </h2>

          <p className="text-2xl text-center text-gray-600 leading-relaxed text-pretty whitespace-pre-line">
            {t('home.about.description')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
