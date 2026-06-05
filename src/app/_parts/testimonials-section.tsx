'use client'

import { testimonials } from '@/data/testimonials'
import { useLocale } from '@/hooks/use-locale'
import { motion } from 'framer-motion'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function TestimonialsSection() {
  const { t, locale } = useLocale()

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
          {t('home.testimonials.title')}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {testimonials.map((item, i) => (
            <motion.blockquote
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease }}
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-5"
            >
              <p className="text-lg leading-relaxed text-foreground/80">
                &ldquo;{item.quote[locale] ?? item.quote['pt-BR']}&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border/40" />
                <cite className="not-italic text-sm text-muted-foreground/50 shrink-0">
                  <span className="font-medium text-foreground/60">{item.name}</span>
                  {' · '}{item.role[locale] ?? item.role['pt-BR']}
                  {item.company ? `, ${item.company}` : ''}
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
