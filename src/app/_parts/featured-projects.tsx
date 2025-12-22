'use client'

import { MagneticButton } from '@/components/ui/magnetic-button'
import { RevealAnimation } from '@/components/ui/reveal-animation'
import { ScrollParallax } from '@/components/ui/scroll-parallax'
import { getFeaturedProjects } from '@/data/projects'
import { useTranslation } from '@/hooks/use-translation'
import { Badge, Button } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function FeaturedProjects() {
  const { t, locale } = useTranslation()
  const featuredProjects = getFeaturedProjects().slice(0, 3) // Mostrar apenas 3 projetos

  if (featuredProjects.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      <ScrollParallax offset={30} className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
      </ScrollParallax>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('projects.featured')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('projects.featuredDescription')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 mb-12">
            {featuredProjects.map((project, index) => (
              <RevealAnimation key={project.id} direction="up" delay={index * 0.1}>
                <motion.div
                  className="group relative"
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Category Badge - Moves to top external area on hover */}
                  <div className="absolute -top-8 left-4 z-20 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out">
                    <Badge className="bg-primary/90 text-primary-foreground border-0 backdrop-blur-sm shadow-lg">
                      {project.category}
                    </Badge>
                  </div>

                  {/* Card Container */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/50 hover:border-primary/30 transition-all duration-500">
                    {/* Image with Overlay */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={project.thumbnail}
                        alt={project.title[locale]}
                        width={400}
                        height={256}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                      {/* External Link Icon */}
                      {project.liveUrl && (
                        <motion.div
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
                          initial={{ scale: 0, rotate: -180 }}
                          whileHover={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 text-white" />
                          </a>
                        </motion.div>
                      )}

                      {/* Title Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <motion.h3
                          className="text-white font-bold text-xl mb-2 line-clamp-2 drop-shadow-lg"
                          style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          {project.title[locale]}
                        </motion.h3>
                      </div>
                    </div>

                    {/* Hover Action */}
                    <motion.div
                      className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                    >
                      <Link href={`/projects/${project.slug}`}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            className="bg-white/90 text-primary hover:bg-white shadow-lg backdrop-blur-sm"
                            size="sm"
                          >
                            {t('projects.viewDetails')}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </motion.div>
                      </Link>
                    </motion.div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                  </div>

                  {/* Tech Stack Pills - Move to bottom external area on hover */}
                  <div className="absolute -bottom-8 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out delay-75">
                    <div className="flex gap-2 flex-wrap justify-center">
                      {project.technologies.slice(0, 2).map((tech, techIndex) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs bg-card/90 backdrop-blur-sm rounded-full text-foreground shadow-lg border border-border/50 transform scale-95 group-hover:scale-100 transition-transform duration-200"
                          style={{ transitionDelay: `${techIndex * 50}ms` }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 2 && (
                        <span className="px-3 py-1 text-xs bg-accent/90 backdrop-blur-sm rounded-full text-accent-foreground shadow-lg transform scale-95 group-hover:scale-100 transition-transform duration-200 delay-100">
                          +{project.technologies.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Floating Shadow */}
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10 scale-95" />
                </motion.div>
              </RevealAnimation>
            ))}
          </div>

          <RevealAnimation direction="up" delay={0.3} className="text-center">
            <Link href="/projects">
              <MagneticButton>
                <Button size="lg" className="group relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">{t('projects.viewAllProjects')}</span>
                  <ArrowRight className="w-4 h-4 ml-2 relative z-10 transition-transform group-hover:translate-x-1" />
                </Button>
              </MagneticButton>
            </Link>
          </RevealAnimation>
        </div>
      </div>
    </section>
  )
}
