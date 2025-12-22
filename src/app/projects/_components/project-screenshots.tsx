'use client'

import { useTranslation } from '@/hooks/use-translation'
import type { Project } from '@/types/project'
import { motion } from 'framer-motion'
import { ProjectGallery } from './project-gallery'

interface ProjectScreenshotsProps {
  screenshots: Project['screenshots']
  locale: 'pt-BR' | 'en-US'
}

export function ProjectScreenshots({ screenshots, locale }: ProjectScreenshotsProps) {
  const { t } = useTranslation()

  if (!screenshots || screenshots.length === 0) return null

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              {t('projects.screenshots')}
            </h2>

            <ProjectGallery screenshots={screenshots} locale={locale} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
