'use client'

import { getProjectBySlug } from '@/data/projects'
import { useLocale } from '@/hooks/use-locale'
import { useParams } from '@/lib/params-utils'
import type { PageProps } from '@/lib/params-utils'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { notFound } from 'next/navigation'
import {
  ProjectCTA,
  ProjectFeatures,
  ProjectHero,
  ProjectScreenshots,
  ProjectStorySection,
  ProjectTechnologies,
  ProjectTestimonials,
} from '../_components'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

type ProjectDetailPageProps = PageProps<{ slug: string }>

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { t, locale } = useLocale()
  const { slug } = useParams(params)
  const project = getProjectBySlug(slug)

  if (!project) notFound()

  const startDate = new Date(project.startDate).toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
  })
  const endDate = project.endDate
    ? new Date(project.endDate).toLocaleDateString(locale, { month: 'long', year: 'numeric' })
    : t('common.ongoing')

  return (
    <div className="min-h-screen pt-16">
      {/* Hero: nav + full-bleed image + title */}
      <ProjectHero project={project} locale={locale} />

      {/* Lead: description + meta + CTAs */}
      <section className="py-20 px-6 md:px-12 lg:px-20 border-t border-border/40">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_260px] gap-10 lg:gap-20 items-start">

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="space-y-5"
          >
            <p className="text-lg leading-relaxed text-foreground/80 max-w-2xl">
              {project.fullDescription[locale]}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease }}
            className="space-y-6 lg:pt-1"
          >
            {/* Meta */}
            <div className="space-y-2 text-sm text-muted-foreground/60">
              {project.myRole && (
                <div className="flex gap-2">
                  <span className="text-muted-foreground/40 w-16 shrink-0">{t('projects.myRole')}</span>
                  <span className="text-foreground/70">{t(`projects.roles.${project.myRole}`)}</span>
                </div>
              )}
              {project.client && (
                <div className="flex gap-2">
                  <span className="text-muted-foreground/40 w-16 shrink-0">{t('projects.client')}</span>
                  <span className="text-foreground/70">{project.client.name}</span>
                </div>
              )}
              <div className="flex gap-2">
                <span className="text-muted-foreground/40 w-16 shrink-0">
                  {locale === 'pt-BR' ? 'Período' : 'Period'}
                </span>
                <span className="text-foreground/70">{startDate} – {endDate}</span>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
                >
                  {t('projects.viewDemo')}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground border border-border/50 px-4 py-2 rounded-md hover:border-border transition-colors"
                >
                  GitHub
                  <SiGithub className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Narrative: challenge → solution → process → results + metrics */}
      <ProjectStorySection
        story={project.story}
        metrics={project.metrics}
        locale={locale}
      />

      {/* Features */}
      <ProjectFeatures features={project.features} locale={locale} />

      {/* Screenshots gallery */}
      <ProjectScreenshots screenshots={project.screenshots} locale={locale} />

      {/* Tech stack */}
      <ProjectTechnologies
        technologies={project.technologies}
        tags={project.tags}
        locale={locale}
      />

      {/* Testimonials */}
      <ProjectTestimonials
        testimonial={project.testimonial}
        testimonials={project.testimonials}
        locale={locale}
      />

      {/* CTA */}
      <ProjectCTA />
    </div>
  )
}
