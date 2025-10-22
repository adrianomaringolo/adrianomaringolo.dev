'use client'

import { ParticleField } from '@/components/ui/particle-fields'
import { projects } from '@/data/projects'
import { useTranslation } from '@/hooks/use-translation'
import type { Project } from '@/types/project'
import { Button } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ProjectCard } from './_components'

export default function ProjectsPage() {
  const { t } = useTranslation()
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

  return (
    <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <ParticleField
        particleCount={200}
        colors={['#0891b2', '#1c398e', '#c3923e']}
        opacity={0.7}
      />
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
              <ProjectCard key={project.id} project={project} index={index} />
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
