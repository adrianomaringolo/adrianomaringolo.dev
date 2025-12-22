'use client'

import { MagneticButton } from '@/components/ui/magnetic-button'
import { RevealAnimation } from '@/components/ui/reveal-animation'
import { ScrollParallax } from '@/components/ui/scroll-parallax'
import { TiltCard } from '@/components/ui/tilt-card'
import { getFeaturedProjects } from '@/data/projects'
import { useTranslation } from '@/hooks/use-translation'
import { SiGithub } from '@icons-pack/react-simple-icons'
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t('projects.featured')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('projects.featuredDescription')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <RevealAnimation key={project.id} direction="up" delay={index * 0.1}>
                <TiltCard className="h-full">
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group overflow-hidden border-0 bg-card/50 backdrop-blur-sm">
                    <div className="relative overflow-hidden">
                      <Image
                        src={project.thumbnail}
                        alt={project.title[locale]}
                        width={400}
                        height={240}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {project.category}
                        </Badge>
                        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs">
                          {t('projects.featuredBadge')}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">
                        {project.title[locale]}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {project.shortDescription[locale]}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Link href={`/projects/${project.slug}`} className="flex-1">
                          <MagneticButton className="w-full">
                            <Button size="sm" className="w-full">
                              {t('projects.viewDetails')}
                            </Button>
                          </MagneticButton>
                        </Link>

                        <div className="flex gap-1">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Ver demo"
                              className={buttonVariants({
                                variant: 'outline',
                                size: 'sm',
                              })}
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
                              className={buttonVariants({
                                variant: 'outline',
                                size: 'sm',
                              })}
                            >
                              <SiGithub className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TiltCard>
              </RevealAnimation>
            ))}
          </div>

          <RevealAnimation direction="up" delay={0.3} className="text-center">
            <Link href="/projects">
              <MagneticButton>
                <Button size="lg" className="group">
                  {t('projects.viewAllProjects')}
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </MagneticButton>
            </Link>
          </RevealAnimation>
        </div>
      </div>
    </section>
  )
}
