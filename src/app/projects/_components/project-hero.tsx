'use client'

import { useTranslation } from '@/hooks/use-translation'
import type { Project } from '@/types/project'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { Badge, Button, buttonVariants } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, ExternalLink, Star, Users } from 'lucide-react'
import Link from 'next/link'

interface ProjectHeroProps {
  project: Project
  locale: 'pt-BR' | 'en-US'
}

export function ProjectHero({ project, locale }: ProjectHeroProps) {
  const { t } = useTranslation()

  const getCategoryColor = (category: string) => {
    const colors = {
      web: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      webapp: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      library: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <>
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6 text-center">
        <Link href="/projects">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="w-4 h-4" />
            {t('projects.backToProjects')}
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Badges */}
            <div className="flex justify-center gap-2 mb-4">
              <Badge className={getCategoryColor(project.category)}>
                {project.category}
              </Badge>
              {project.featured && (
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  <Star className="w-3 h-3 mr-1" />
                  {t('projects.featuredBadge')}
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
              {project.title[locale]}
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {project.fullDescription[locale]}
            </p>

            {/* Project Meta */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(project.startDate).toLocaleDateString(locale)}
                  {project.endDate
                    ? ` - ${new Date(project.endDate).toLocaleDateString(locale)}`
                    : ` - ${t('common.ongoing')}`}
                </span>
              </div>

              {project.client && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>
                    {t('projects.client')}: {project.client.name}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants()}
                >
                  <ExternalLink className="w-4 h-4" />
                  {t('projects.viewDemo')}
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: 'outline' })}
                >
                  <SiGithub className="w-4 h-4" />
                  {t('projects.viewCode')}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
