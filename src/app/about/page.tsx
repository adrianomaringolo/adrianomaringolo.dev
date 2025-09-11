'use client'

import { Navbar } from '@/components/navbar'
import { useLocale } from '@/hooks/use-locale'
import {
  SiFigma,
  SiFirebase,
  SiGithub,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from '@icons-pack/react-simple-icons'
import { Card, CardContent } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { Cloud, Smartphone, Users, Zap } from 'lucide-react'
import Image from 'next/image'

export default function SobrePage() {
  const { t } = useLocale()
  const tAbout = (tag: string) => t(`about.${tag}`)

  const technologies = [
    { name: 'React', icon: SiReact },
    { name: 'Next.js', icon: SiNextdotjs },
    { name: 'TailwindCSS', icon: SiTailwindcss },
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'Node.js', icon: SiNodedotjs },
    { name: 'Github', icon: SiGithub },
    { name: 'Figma', icon: SiFigma },
    { name: 'Vercel', icon: SiVercel },
    { name: 'Supabase', icon: SiSupabase },
    { name: 'Firebase', icon: SiFirebase },
    { name: 'AWS', icon: Cloud },
  ]

  const workPrinciples = [
    {
      title: 'Responsividade',
      description:
        'Todos os projetos são desenvolvidos com mobile-first, garantindo perfeita adaptação em qualquer dispositivo.',
      icon: Smartphone,
    },
    {
      title: 'Experiência do Usuário',
      description:
        'Foco na usabilidade e acessibilidade, criando interfaces intuitivas e agradáveis de usar.',
      icon: Users,
    },
    {
      title: 'Performance',
      description:
        'Otimização constante para garantir carregamento rápido e experiência fluida.',
      icon: Zap,
    },
  ]

  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-balance">
              {tAbout('title')}
            </h1>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center lg:justify-start"
              >
                <div className="relative">
                  <div className="w-80 h-80 lg:w-96 lg:h-96 relative rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/images/profile-photo.jpg"
                      alt="Foto profissional"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-16 h-16 bg-accent/20 rounded-full blur-lg"></div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-2xl font-semibold mb-6">{tAbout('header')}</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p className="text-pretty whitespace-pre-line">
                    {tAbout('description')}
                  </p>
                </div>
              </motion.div>
            </div>

            <Card className="mb-16">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6">{tAbout('historyTitle')}</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p className="text-pretty whitespace-pre-line">{tAbout('history')}</p>
                </div>
              </CardContent>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-center mb-12">Tecnologias</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="text-center hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <tech.icon className="h-6 w-6 text-accent" />
                        </div>
                        <h3 className="font-medium">{tech.name}</h3>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">Como Trabalho</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {workPrinciples.map((principle, index) => (
                  <motion.div
                    key={principle.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full text-center">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <principle.icon className="h-6 w-6 text-accent" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{principle.title}</h3>
                        <p className="text-muted-foreground text-pretty">
                          {principle.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
