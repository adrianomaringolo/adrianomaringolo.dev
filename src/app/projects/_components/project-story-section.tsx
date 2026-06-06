'use client'

import { useLocale } from '@/hooks/use-locale'
import type { Project } from '@/types/project'
import { motion } from 'framer-motion'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface ProjectStorySectionProps {
  story: Project['story']
  metrics?: Project['metrics']
  locale: 'pt-BR' | 'en-US'
}

export function ProjectStorySection({ story, metrics, locale }: ProjectStorySectionProps) {
  const { t } = useLocale()

  const items = [
    { label: t('projects.challenge'), content: story.problem[locale] },
    { label: t('projects.solution'), content: story.solution[locale] },
    { label: t('projects.process'), content: story.process[locale] },
    { label: t('projects.results'), content: story.results[locale] },
  ]

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
          {t('projects.projectStory')}
        </motion.p>

        <div>
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.07, ease }}
              viewport={{ once: true, amount: 0.1 }}
              className={`grid lg:grid-cols-[200px_1fr] gap-6 lg:gap-16 py-10 ${
                index < items.length - 1 ? 'border-b border-border/40' : ''
              }`}
            >
              <p className="text-sm font-medium text-muted-foreground/60 lg:pt-0.5">
                {item.label}
              </p>
              <p className="text-base leading-relaxed text-foreground/80 max-w-2xl">
                {item.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Metrics — inline below results, no cards */}
        {metrics && metrics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease }}
            viewport={{ once: true, amount: 0.1 }}
            className="flex flex-wrap gap-10 pt-10 mt-4 border-t border-border/40"
          >
            {metrics.map((metric, i) => (
              <div key={i}>
                <p className="text-3xl font-bold tracking-tight text-foreground tabular-nums">
                  {typeof metric.value === 'string' ? metric.value : metric.value[locale]}
                </p>
                <p className="text-xs text-muted-foreground/60 mt-1 leading-snug max-w-[140px]">
                  {metric.label[locale]}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
