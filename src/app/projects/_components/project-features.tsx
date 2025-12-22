'use client'

import { useTranslation } from '@/hooks/use-translation'
import type { Project } from '@/types/project'
import { Card } from 'buildgrid-ui'
import { motion } from 'framer-motion'

interface ProjectFeaturesProps {
  features: Project['features']
  locale: 'pt-BR' | 'en-US'
}

export function ProjectFeatures({ features, locale }: ProjectFeaturesProps) {
  const { t } = useTranslation()

  if (!features) return null

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
              {t('projects.features')}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="text-center">
                      {feature.icon && (
                        <div className="text-4xl mb-4">{feature.icon}</div>
                      )}
                      <h3 className="text-xl font-semibold mb-3">
                        {feature.title[locale]}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description[locale]}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
