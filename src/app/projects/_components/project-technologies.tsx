'use client'

import { useLocale } from '@/hooks/use-locale'
import type { Project } from '@/types/project'
import { motion } from 'framer-motion'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface ProjectTechnologiesProps {
  technologies: Project['technologies']
  tags: Project['tags']
  locale: 'pt-BR' | 'en-US'
}

export function ProjectTechnologies({ technologies, tags, locale }: ProjectTechnologiesProps) {
  const { t } = useLocale()

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-border/40">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[200px_1fr] gap-6 lg:gap-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0 }}
          className="text-xs tracking-[0.2em] text-primary uppercase font-mono lg:pt-0.5"
        >
          Stack
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-4"
        >
          <p className="text-base text-muted-foreground leading-relaxed">
            {technologies.join(' · ')}
          </p>

          {tags[locale as keyof typeof tags]?.length > 0 && (
            <p className="text-xs text-muted-foreground/40">
              {tags[locale as keyof typeof tags].join(' · ')}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
