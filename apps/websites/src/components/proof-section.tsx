'use client'

import { useLocale } from '@/hooks/use-locale'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

type ProofItem = { title: string; description: string }

export function ProofSection() {
  const { t, raw } = useLocale()
  const items = raw<ProofItem[]>('proof.items') ?? []

  return (
    <section id="projetos" className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            {t('proof.eyebrow')}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('proof.headline')}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://adrianomaringolo.dev/projects"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            {t('proof.cta')}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
