'use client'

import { useLocale } from '@/hooks/use-locale'
import type { Project } from '@/types/project'
import { motion } from 'framer-motion'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface ProjectFeaturesProps {
  features: Project['features']
  locale: 'pt-BR' | 'en-US'
}

export function ProjectFeatures({ features, locale }: ProjectFeaturesProps) {
  const { t } = useLocale()

  if (!features || features.length === 0) return null

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
          {t('projects.features')}
        </motion.p>

        <ul className="divide-y divide-border/40">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.07, ease }}
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-[32px_1fr] lg:grid-cols-[48px_200px_1fr] gap-4 lg:gap-10 py-8 items-start"
            >
              <span className="text-sm text-muted-foreground/25 font-mono tabular-nums pt-0.5">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="text-base font-semibold text-foreground leading-snug lg:pt-0.5">
                {feature.title[locale]}
              </p>
              <p className="col-start-2 lg:col-start-3 text-sm text-muted-foreground leading-relaxed">
                {feature.description[locale]}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
