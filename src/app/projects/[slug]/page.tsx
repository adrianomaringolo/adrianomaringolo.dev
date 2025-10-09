'use client'

import { ProjectGallery } from '@/components/project-gallery'
import { ProjectMetricsComponent } from '@/components/project-metrics'
import { getProjectBySlug } from '@/data/projects'
import { useTranslation } from '@/hooks/use-translation'
import { useParams, type PageProps } from '@/lib/params-utils'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { Badge, Button, buttonVariants, Card } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Quote,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type ProjectDetailPageProps = PageProps<{ slug: string }>

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale } = useTranslation()
  const { slug } = useParams(params)
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      web: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      mobile: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      fullstack: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      design: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6 text-center">
        <Link href="/projects">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="w-4 h-4" />
            {locale === 'pt-BR' ? 'Voltar aos Projetos' : 'Back to Projects'}
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
            <div className="flex justify-center gap-2 mb-4">
              <Badge className={getCategoryColor(project.category)}>
                {project.category}
              </Badge>
              {project.featured && (
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  <Star className="w-3 h-3 mr-1" />
                  {locale === 'pt-BR' ? 'Destaque' : 'Featured'}
                </Badge>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
              {project.title[locale]}
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {project.fullDescription[locale]}
            </p>

            {/* Project Meta */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(project.startDate).toLocaleDateString(locale)}
                  {project.endDate &&
                    ` - ${new Date(project.endDate).toLocaleDateString(locale)}`}
                </span>
              </div>

              {project.client && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{project.client.name}</span>
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
                  {locale === 'pt-BR' ? 'Ver Demo' : 'View Demo'}
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
                  {locale === 'pt-BR' ? 'Ver Código' : 'View Code'}
                </a>
              )}
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl mb-16"
          >
            <Image
              src={project.images[0] || project.thumbnail}
              alt={project.title[locale]}
              width={1200}
              height={600}
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
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
                {locale === 'pt-BR' ? 'A História do Projeto' : 'Project Story'}
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Problem */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                      <Target className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      {locale === 'pt-BR' ? 'O Desafio' : 'The Challenge'}
                    </h3>
                  </div>
                  <p className="text-muted-foreground">{project.story.problem[locale]}</p>
                </Card>

                {/* Solution */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      {locale === 'pt-BR' ? 'A Solução' : 'The Solution'}
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    {project.story.solution[locale]}
                  </p>
                </Card>

                {/* Process */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                      <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      {locale === 'pt-BR' ? 'O Processo' : 'The Process'}
                    </h3>
                  </div>
                  <p className="text-muted-foreground">{project.story.process[locale]}</p>
                </Card>

                {/* Results */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      {locale === 'pt-BR' ? 'Os Resultados' : 'The Results'}
                    </h3>
                  </div>
                  <p className="text-muted-foreground">{project.story.results[locale]}</p>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      {project.screenshots.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-center mb-12">
                  {locale === 'pt-BR' ? 'Capturas de Tela' : 'Screenshots'}
                </h2>

                <ProjectGallery screenshots={project.screenshots} locale={locale} />
              </motion.div>
            </div>
          </div>
        </section>
      )}

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
                  {locale === 'pt-BR' ? 'Resultados Alcançados' : 'Results Achieved'}
                </h2>

                <ProjectMetricsComponent metrics={project.metrics} locale={locale} />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonial Section */}
      {project.testimonial && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-center mb-12">
                  {locale === 'pt-BR' ? 'Depoimento do Cliente' : 'Client Testimonial'}
                </h2>

                <Card className="p-8 relative">
                  <Quote className="absolute top-4 left-4 w-8 h-8 text-muted-foreground/20" />

                  <div className="text-center">
                    {project.testimonial.rating && (
                      <div className="flex justify-center gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < project.testimonial!.rating!
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    <blockquote className="text-lg italic mb-6">
                      &ldquo;{project.testimonial.content[locale]}&rdquo;
                    </blockquote>

                    <div className="flex items-center justify-center gap-4">
                      {project.testimonial.avatar && (
                        <Image
                          src={project.testimonial.avatar}
                          alt={project.testimonial.author}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      )}
                      <div className="text-left">
                        <div className="font-semibold">{project.testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">
                          {typeof project.testimonial.role === 'string'
                            ? project.testimonial.role
                            : project.testimonial.role[locale]}{' '}
                          • {project.testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Technologies Section */}
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
                {locale === 'pt-BR' ? 'Tecnologias Utilizadas' : 'Technologies Used'}
              </h2>

              <div className="flex flex-wrap justify-center gap-3">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-sm px-3 py-1">
                    {tech}
                  </Badge>
                ))}
              </div>

              {project.tags[locale].length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-center mb-4">
                    {locale === 'pt-BR' ? 'Tags' : 'Tags'}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {project.tags[locale].map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">
                {locale === 'pt-BR' ? 'Gostou do que viu?' : 'Like what you see?'}
              </h2>
              <p className="text-muted-foreground mb-8">
                {locale === 'pt-BR'
                  ? 'Vamos conversar sobre como posso ajudar no seu próximo projeto.'
                  : "Let's talk about how I can help with your next project."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className={buttonVariants({ size: 'lg' })}>
                  {locale === 'pt-BR' ? 'Entre em Contato' : 'Get in Touch'}
                </Link>

                <Link
                  href="/projects"
                  className={buttonVariants({ variant: 'outline', size: 'lg' })}
                >
                  {locale === 'pt-BR' ? 'Ver Mais Projetos' : 'View More Projects'}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
