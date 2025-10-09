'use client'

import { ProjectImage } from '@/components/project-image'

import { projects } from '@/data/projects'
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
import { Calendar, ExternalLink, Github, Star } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function ProjectsPage() {
  const { t, locale } = useTranslation()
  const [filter, setFilter] = useState<'all' | Project['category']>('all')

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((project) => project.category === filter)

  const filters = [
    { key: 'all' as const, label: t('projects.all') },
    { key: 'web' as const, label: t('projects.web') },
    { key: 'webapp' as const, label: t('projects.webapp') },
    { key: 'library' as const, label: t('projects.library') },
  ]

  const getCategoryColor = (category: Project['category']) => {
    const colors = {
      web: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      webapp: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      library: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    }
    return colors[category]
  }

  const getStatusColor = (status: Project['status']) => {
    const colors = {
      completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'in-progress':
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      concept: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    }
    return colors[status]
  }

  const getStatusLabel = (status: Project['status']) => {
    const labels = {
      completed: t('projects.status.completed'),
      'in-progress': t('projects.status.inProgress'),
      concept: t('projects.status.concept'),
    }
    return labels[status]
  }

  return (
    <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
              {t('projects.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              {t('projects.projectsDescription')}
            </p>
          </div>

          {/* Filters */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap gap-2 p-1 bg-muted rounded-lg">
              {filters.map((filterOption) => (
                <Button
                  key={filterOption.key}
                  variant={filter === filterOption.key ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter(filterOption.key)}
                  className="rounded-md"
                >
                  {filterOption.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group overflow-hidden">
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <ProjectImage
                      src={project.thumbnail}
                      alt={project.title[locale]}
                      width={400}
                      height={240}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Status and Featured Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(project.status)}>
                          {getStatusLabel(project.status)}
                        </Badge>
                        {project.featured && (
                          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            <Star className="w-3 h-3 mr-1" />
                            {t('projects.featuredBadge')}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge className={getCategoryColor(project.category)}>
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl line-clamp-2">
                      {project.title[locale]}
                    </CardTitle>

                    {/* Date */}
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(project.startDate).toLocaleDateString(locale)}
                      {project.endDate && (
                        <span>
                          {' '}
                          - {new Date(project.endDate).toLocaleDateString(locale)}
                        </span>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
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
                    <div className="flex gap-2 pt-2">
                      <Link href={`/projects/${project.slug}`} className="flex-1">
                        <Button size="sm" className="w-full">
                          {t('projects.viewDetails')}
                        </Button>
                      </Link>

                      <div className="flex gap-1">
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
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                {t('projects.noProjectsFound')}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
