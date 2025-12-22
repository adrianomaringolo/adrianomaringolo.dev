'use client'

import { useTranslation } from '@/hooks/use-translation'
import type { Project } from '@/types/project'
import { motion } from 'framer-motion'
import { Target, TrendingUp, Users, Zap } from 'lucide-react'
import { ProjectStoryCard } from './project-story-card'

interface ProjectStorySectionProps {
  story: Project['story']
  locale: 'pt-BR' | 'en-US'
}

export function ProjectStorySection({ story, locale }: ProjectStorySectionProps) {
  const { t } = useTranslation()

  const storyItems = [
    {
      key: 'challenge',
      icon: Target,
      iconColor: 'text-red-600 dark:text-red-400',
      iconBgColor: 'bg-red-100 dark:bg-red-900',
      title: t('projects.challenge'),
      content: story.problem[locale],
    },
    {
      key: 'solution',
      icon: Zap,
      iconColor: 'text-blue-600 dark:text-blue-400',
      iconBgColor: 'bg-blue-100 dark:bg-blue-900',
      title: t('projects.solution'),
      content: story.solution[locale],
    },
    {
      key: 'process',
      icon: Users,
      iconColor: 'text-purple-600 dark:text-purple-400',
      iconBgColor: 'bg-purple-100 dark:bg-purple-900',
      title: t('projects.process'),
      content: story.process[locale],
    },
    {
      key: 'results',
      icon: TrendingUp,
      iconColor: 'text-green-600 dark:text-green-400',
      iconBgColor: 'bg-green-100 dark:bg-green-900',
      title: t('projects.results'),
      content: story.results[locale],
    },
  ]

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
              {t('projects.projectStory')}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {storyItems.map((item, index) => (
                <ProjectStoryCard
                  key={item.key}
                  icon={item.icon}
                  iconColor={item.iconColor}
                  iconBgColor={item.iconBgColor}
                  title={item.title}
                  content={item.content}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
