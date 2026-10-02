'use client'

import type { ProjectMetrics } from '@/types/project'
import { Card } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

interface ProjectMetricsProps {
  metrics: ProjectMetrics[]
  locale: 'pt-BR' | 'en-US'
}

export function ProjectMetricsComponent({ metrics, locale }: ProjectMetricsProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              {/* Main Value */}
              <div className="text-4xl font-bold text-primary mb-2 relative">
                {typeof metric.value === 'string' ? metric.value : metric.value[locale]}
                {metric.improvement && (
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-green-100 dark:bg-green-900 rounded-full p-1">
                      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                )}
              </div>

              {/* Label */}
              <div className="text-sm text-muted-foreground mb-3 font-medium">
                {metric.label[locale]}
              </div>

              {/* Improvement Badge */}
              {metric.improvement && (
                <div className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-xs font-medium">
                  <TrendingUp className="w-3 h-3" />
                  {typeof metric.improvement === 'string'
                    ? metric.improvement
                    : metric.improvement[locale]}
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
