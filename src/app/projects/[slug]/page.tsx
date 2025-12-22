'use client'

import { getProjectBySlug } from '@/data/projects'
import { useTranslation } from '@/hooks/use-translation'
import { useParams, type PageProps } from '@/lib/params-utils'
import { motion } from 'framer-motion'
import { BookOpen, MapPin, Settings } from 'lucide-react'
import { notFound } from 'next/navigation'
import {
  ProjectCarousel,
  ProjectCollapsibleSection,
  ProjectCTA,
  ProjectFeatures,
  ProjectHero,
  ProjectMetricsComponent,
  ProjectScreenshots,
  ProjectStorySection,
  ProjectTechnologies,
  ProjectTestimonial,
  ProjectTestimonials,
} from '../_components'

type ProjectDetailPageProps = PageProps<{ slug: string }>

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { t, locale } = useTranslation()
  const { slug } = useParams(params)
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <ProjectHero project={project} locale={locale} />

      {/* Hero Carousel */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <ProjectCarousel
            images={project.images}
            title={project.title[locale]}
            thumbnail={project.thumbnail}
          />
        </div>
      </section>

      {/* Story Section */}
      <ProjectStorySection story={project.story} locale={locale} />

      {/* Features Section */}
      <ProjectFeatures features={project.features} locale={locale} />

      {/* Screenshots Section */}
      <ProjectScreenshots screenshots={project.screenshots} locale={locale} />

      {/* Metrics Section */}
      {project.metrics && project.metrics.length > 0 && (
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
                  {t('projects.resultsAchieved')}
                </h2>

                <ProjectMetricsComponent metrics={project.metrics} locale={locale} />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonial Section */}
      <ProjectTestimonial testimonial={project.testimonial} locale={locale} />

      {/* Testimonials Section */}
      <ProjectTestimonials testimonials={project.testimonials} locale={locale} />

      {/* Technologies Section */}
      <ProjectTechnologies
        technologies={project.technologies}
        tags={project.tags}
        locale={locale}
      />

      {/* Next Steps Section */}
      {project.nextSteps && (
        <ProjectCollapsibleSection
          title={t('projects.nextSteps')}
          items={project.nextSteps[locale]}
          icon={MapPin}
          bgColor="default"
          itemColor="primary"
        />
      )}

      {/* Technical Challenges Section */}
      {project.technicalChallenges && (
        <ProjectCollapsibleSection
          title={t('projects.technicalChallenges')}
          items={project.technicalChallenges[locale]}
          icon={Settings}
          bgColor="muted"
          itemColor="orange"
        />
      )}

      {/* Skills Acquired Section */}
      {project.skillsAcquired && (
        <ProjectCollapsibleSection
          title={t('projects.skillsAcquired')}
          items={project.skillsAcquired[locale]}
          icon={BookOpen}
          bgColor="default"
          itemColor="green"
        />
      )}

      {/* CTA Section */}
      <ProjectCTA />
    </div>
  )
}
