'use client'

import { useTranslation } from '@/hooks/use-translation'
import type { Project } from '@/types/project'
import {
  Badge,
  Button,
  buttonVariants,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Star } from 'lucide-react'
import Link from 'next/link'
import { ProjectImage } from './project-image'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { t, locale } = useTranslation()

  const getCategoryColor = (category: Project['category']) => {
    const colors = {
      web: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      webapp: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      library: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    }
    return colors[category]
  }

  const getStatusColor = (status: NonNullable<Project['status']>) => {
    const colors = {
      completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'in-progress':
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      concept: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    } as const
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getStatusLabel = (status: NonNullable<Project['status']>) => {
    const labels = {
      completed: t('projects.status.completed'),
      'in-progress': t('projects.status.inProgress'),
      concept: t('projects.status.concept'),
    } as const
    return labels[status] || status
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="h-full pt-0 hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col">
        {/* Project Image */}
        <div className="relative overflow-hidden">
          <ProjectImage
            src={project.thumbnail}
            alt={project.title[locale]}
            width={400}
            height={240}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <CardHeader className="pb-3">
          {/* Status and Featured Badges */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              {project.status && (
                <Badge className={getStatusColor(project.status)}>
                  {getStatusLabel(project.status)}
                </Badge>
              )}
              {project.featured && (
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  <Star className="w-3 h-3 mr-1" />
                  {t('projects.featuredBadge')}
                </Badge>
              )}
              <Badge className={getCategoryColor(project.category)}>
                {project.category}
              </Badge>
            </div>
          </div>

          <CardTitle className="text-xl line-clamp-2">{project.title[locale]}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 flex-1 flex flex-col">
          {/* Description */}
          <p className="text-muted-foreground text-sm line-clamp-3">
            {project.shortDescription[locale]}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>

          {/* Client Info */}
          {project.client && (
            <div className="text-xs text-muted-foreground">
              {t('projects.client')}:{' '}
              <span className="font-medium">{project.client.name}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2 mt-auto">
            <Link href={`/projects/${project.slug}`} className="flex-1">
              <Button size="sm" className="w-full">
                {t('projects.viewDetails')}
              </Button>
            </Link>

            <div className="flex gap-1 ">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ver demo"
                  className={buttonVariants({ variant: 'outline', size: 'sm' })}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ver código"
                  className={buttonVariants({ variant: 'outline', size: 'sm' })}
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
