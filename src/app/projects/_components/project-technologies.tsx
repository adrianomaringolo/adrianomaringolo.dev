'use client'

import { useTranslation } from '@/hooks/use-translation'
import type { Project } from '@/types/project'
import { Badge } from 'buildgrid-ui'
import { motion } from 'framer-motion'

interface ProjectTechnologiesProps {
  technologies: Project['technologies']
  tags: Project['tags']
  locale: 'pt-BR' | 'en-US'
}

export function ProjectTechnologies({
  technologies,
  tags,
  locale,
}: ProjectTechnologiesProps) {
  const { t } = useTranslation()

  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              {t('projects.technologiesUsed')}
            </h2>

            <div className="flex flex-wrap justify-center gap-3">
              {technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-sm px-3 py-1">
                  {tech}
                </Badge>
              ))}
            </div>

            {tags[locale as keyof typeof tags]?.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-center mb-4">
                  {t('projects.tags')}
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {tags[locale as keyof typeof tags].map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
