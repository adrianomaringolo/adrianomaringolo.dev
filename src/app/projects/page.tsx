'use client'

import { UnderConstructionPage } from '@/components/under-construction-page'
import { useLocale } from '@/hooks/use-locale'
import { SiGithub } from '@icons-pack/react-simple-icons'
import {
  Badge,
  Button,
  buttonVariants,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  cn,
} from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function ProjetosPage() {
  const { t } = useLocale()
  const tProjects = (tag: string) => t(`projects.${tag}`)

  const [filter, setFilter] = useState('todos')

  const underMaintenance = true

  if (underMaintenance) {
    return (
      <section>
        <UnderConstructionPage
          title={tProjects('title')}
          underConstruction={tProjects('underConstruction')}
          description={tProjects('underConstructionDescription')}
          icon="📓"
        />
      </section>
    )
  }

  const projects = [
    {
      id: 1,
      title: 'E-commerce Moderno',
      description:
        'Plataforma completa de e-commerce com carrinho, pagamentos e painel administrativo.',
      image: '/modern-ecommerce-website.png',
      technologies: ['Next.js', 'TailwindCSS', 'Stripe', 'Prisma'],
      category: 'webapp',
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: 2,
      title: 'Landing Page SaaS',
      description:
        'Landing page responsiva para startup de tecnologia com animações suaves.',
      image: '/saas-landing-page.png',
      technologies: ['React', 'TailwindCSS', 'Framer Motion'],
      category: 'website',
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: 3,
      title: 'Dashboard Analytics',
      description:
        'Dashboard interativo para visualização de dados com gráficos e métricas.',
      image: '/analytics-dashboard.png',
      technologies: ['Next.js', 'Chart.js', 'TypeScript'],
      category: 'webapp',
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: 4,
      title: 'Portfólio Criativo',
      description: 'Site portfólio para designer com galeria interativa e animações.',
      image: '/creative-portfolio-website.png',
      technologies: ['React', 'GSAP', 'TailwindCSS'],
      category: 'website',
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: 5,
      title: 'App de Tarefas',
      description: 'Aplicativo web para gerenciamento de tarefas com drag & drop.',
      image: '/task-management-app.png',
      technologies: ['Next.js', 'Zustand', 'DnD Kit'],
      category: 'webapp',
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: 6,
      title: 'Site Institucional',
      description: 'Website corporativo responsivo com CMS integrado.',
      image: '/corporate-website-design.png',
      technologies: ['Next.js', 'Sanity', 'TailwindCSS'],
      category: 'website',
      demoUrl: '#',
      githubUrl: '#',
    },
  ]

  const filteredProjects =
    filter === 'todos'
      ? projects
      : projects.filter((project) => project.category === filter)

  const filters = [
    { key: 'todos', label: 'Todos' },
    { key: 'website', label: 'Websites' },
    { key: 'webapp', label: 'Web Apps' },
  ]

  return (
    <section>
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8 text-balance">
              Meus Projetos
            </h1>
            <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto text-pretty">
              Confira alguns dos projetos que desenvolvi, desde websites institucionais
              até aplicações web complexas.
            </p>

            {/* Filtros */}
            <div className="flex justify-center mb-12">
              <div className="flex gap-2 p-1 bg-muted rounded-lg">
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

            {/* Grid de Projetos */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow group">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={project.image || '/placeholder.svg'}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-pretty">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(buttonVariants({ size: 'sm' }), 'w-full')}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Demo
                        </a>

                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(buttonVariants({ size: 'sm' }), 'w-full')}
                        >
                          <SiGithub className="h-4 w-4 mr-1" />
                          Código
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
