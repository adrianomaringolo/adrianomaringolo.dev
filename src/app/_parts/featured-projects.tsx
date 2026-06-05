'use client'

import { getFeaturedProjects } from '@/data/projects'
import { useLocale } from '@/hooks/use-locale'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function FeaturedProjects() {
  const { t, locale } = useLocale()
  const featuredProjects = getFeaturedProjects().slice(0, 3)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  if (featuredProjects.length === 0) return null

  const hoveredProject = featuredProjects.find((p) => p.id === hoveredId)

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-border/40">
      <div className="max-w-6xl mx-auto">

        <motion.p
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0 }}
          className="text-xs tracking-[0.2em] text-primary uppercase font-mono mb-10"
        >
          {t('projects.featured')}
        </motion.p>

        {/* Project list */}
        <ul className="divide-y divide-border/40">
          {featuredProjects.map((project, index) => (
            <motion.li
              key={project.id}
              initial={{ opacity: 1, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease }}
              viewport={{ once: true, amount: 0 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group"
            >
              <Link href={`/projects/${project.slug}`}>
                <div className="grid grid-cols-[32px_1fr] lg:grid-cols-[48px_1fr_200px_32px] gap-4 lg:gap-8 py-8 lg:py-10 items-start rounded-lg -mx-4 px-4 transition-colors hover:bg-muted/40">

                  {/* Index */}
                  <span className="text-sm text-muted-foreground/30 font-mono pt-0.5 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Title + description + tech */}
                  <div className="space-y-2 min-w-0">
                    <h3 className="text-lg lg:text-xl font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {project.title[locale]}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {project.shortDescription[locale]}
                    </p>
                    <p className="text-xs text-muted-foreground/50">
                      {project.technologies.slice(0, 4).join(' · ')}
                      {project.technologies.length > 4 && (
                        <span> · +{project.technologies.length - 4}</span>
                      )}
                    </p>
                  </div>

                  {/* Thumbnail — desktop only, fades in on hover */}
                  <div className="hidden lg:block h-28 relative rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Image
                      src={project.thumbnail}
                      alt={project.title[locale]}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>

                  {/* Arrow */}
                  <div className="hidden lg:flex items-center justify-end pt-1">
                    {project.liveUrl ? (
                      <ExternalLink className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    )}
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Floating preview for large screens (shows hovered project thumbnail near list) */}
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              key={hoveredProject.id}
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.2 }}
              className="hidden xl:block fixed right-12 top-1/2 -translate-y-1/2 z-20 pointer-events-none w-72 h-48 rounded-xl overflow-hidden shadow-2xl border border-border/40"
            >
              <Image
                src={hoveredProject.thumbnail}
                alt={hoveredProject.title[locale]}
                fill
                className="object-cover"
                sizes="288px"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, amount: 0 }}
          className="mt-12"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('projects.viewAllProjects')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
