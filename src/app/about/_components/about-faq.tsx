'use client'

import { JsonLd } from '@/components/json-ld'
import { useLocale } from '@/hooks/use-locale'
import { motion } from 'framer-motion'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const

export function AboutFaq() {
  const { t } = useLocale()

  // Rendered fully expanded (no accordion/collapse): answers must stay in the
  // DOM for crawlers that don't run JS to interact with a toggle.
  const items = faqKeys.map((key) => ({
    question: t(`about.faq.${key}`),
    answer: t(`about.faq.${key.replace('q', 'a')}`),
  }))

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-border/40">
      {/* Mirrors whatever locale is currently rendered — structured data
          must match visible content, so this re-renders on language switch. */}
      <JsonLd data={faqJsonLd} />

      <div className="max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0 }}
          className="text-xs tracking-[0.2em] text-primary uppercase font-mono mb-14"
        >
          {t('about.faq.title')}
        </motion.p>

        <div className="divide-y divide-border/40 border-y border-border/40">
          {items.map((item, i) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease }}
              viewport={{ once: true, amount: 0.2 }}
              className="py-6"
            >
              <h3 className="text-base font-semibold text-foreground mb-2">
                {item.question}
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed">{item.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
