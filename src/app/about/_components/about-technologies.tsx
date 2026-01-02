'use client'

import { RevealAnimation } from '@/components/ui/reveal-animation'
import { TiltCard } from '@/components/ui/tilt-card'
import { useLocale } from '@/hooks/use-locale'
import {
  SiAstro,
  SiCypress,
  SiDocker,
  SiFigma,
  SiFirebase,
  SiGithubactions,
  SiGithubcopilot,
  SiGraphql,
  SiJest,
  SiMongodb,
  SiN8n,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiReact,
  SiSass,
  SiStorybook,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from '@icons-pack/react-simple-icons'
import { Card, CardContent } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { Bot, Cloud, Move, Zap } from 'lucide-react'

export function AboutTechnologies() {
  const { t } = useLocale()

  const tAbout = (tag: string) => t(`about.${tag}`)

  const technologies = [
    { name: 'React', icon: SiReact, color: 'text-blue-500' },
    { name: 'Next.js', icon: SiNextdotjs, color: 'text-gray-900 dark:text-white' },
    { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-600' },
    { name: 'TailwindCSS', icon: SiTailwindcss, color: 'text-cyan-500' },
    { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-600' },
    { name: 'Jest', icon: SiJest, color: 'text-red-600' },
    { name: 'Cypress', icon: SiCypress, color: 'text-gray-900 dark:text-white' },
    { name: 'Storybook', icon: SiStorybook, color: 'text-pink-500' },
    { name: 'Astro', icon: SiAstro, color: 'text-orange-500' },
    { name: 'GraphQL', icon: SiGraphql, color: 'text-pink-600' },
    { name: 'MongoDB', icon: SiMongodb, color: 'text-green-500' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-700' },
    { name: 'Docker', icon: SiDocker, color: 'text-blue-500' },
    {
      name: 'GitHub Actions',
      icon: SiGithubactions,
      color: 'text-gray-900 dark:text-white',
    },
    { name: 'Figma', icon: SiFigma, color: 'text-purple-500' },
    { name: 'Vercel', icon: SiVercel, color: 'text-gray-900 dark:text-white' },
    { name: 'Supabase', icon: SiSupabase, color: 'text-green-500' },
    { name: 'Firebase', icon: SiFirebase, color: 'text-orange-500' },
    { name: 'AWS', icon: Cloud, color: 'text-orange-400' },
    { name: 'n8n', icon: SiN8n, color: 'text-red-500' },
    { name: 'Cursor AI', icon: Zap, color: 'text-blue-400' },
    {
      name: 'GitHub Copilot',
      icon: SiGithubcopilot,
      color: 'text-gray-900 dark:text-white',
    },
    { name: 'OpenAI', icon: SiOpenai, color: 'text-gray-900 dark:text-white' },
    { name: 'Kiro AI', icon: Bot, color: 'text-purple-500' },
    { name: 'Sass', icon: SiSass, color: 'text-pink-500' },
    { name: 'Motion', icon: Move, color: 'text-pink-500' },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <RevealAnimation direction="up" delay={0.8}>
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {tAbout('techs')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {tAbout('techsDescription')}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <TiltCard>
                    <Card className="text-center h-full bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-border/50 hover:border-primary/30 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <tech.icon className={`h-6 w-6 ${tech.color}`} />
                        </div>
                        <h3 className="font-medium text-sm">{tech.name}</h3>
                      </CardContent>
                    </Card>
                  </TiltCard>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-8 text-center text-muted-foreground"
            >
              {tAbout('techsMore')}
            </motion.p>
          </div>
        </RevealAnimation>
      </div>
    </section>
  )
}
