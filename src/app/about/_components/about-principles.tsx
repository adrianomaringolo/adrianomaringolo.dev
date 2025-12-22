'use client'

import { RevealAnimation } from '@/components/ui/reveal-animation'
import { TiltCard } from '@/components/ui/tilt-card'
import { useLocale } from '@/hooks/use-locale'
import { Card, CardContent } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import {
  BookOpen,
  DollarSign,
  MessageCircle,
  RefreshCw,
  Settings,
  Smartphone,
  Users,
  Zap,
} from 'lucide-react'

export function AboutPrinciples() {
  const { t } = useLocale()

  const tAbout = (tag: string) => t(`about.${tag}`)

  const workPrinciples = [
    {
      title: tAbout('principles.responsiveness'),
      description: tAbout('principles.responsivenessDescription'),
      icon: Smartphone,
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      title: tAbout('principles.userExperience'),
      description: tAbout('principles.userExperienceDescription'),
      icon: Users,
      color: 'bg-purple-500/10 text-purple-500',
    },
    {
      title: tAbout('principles.performance'),
      description: tAbout('principles.performanceDescription'),
      icon: Zap,
      color: 'bg-yellow-500/10 text-yellow-500',
    },
    {
      title: tAbout('principles.costReduction'),
      description: tAbout('principles.costReductionDescription'),
      icon: DollarSign,
      color: 'bg-green-500/10 text-green-500',
    },
    {
      title: tAbout('principles.communication'),
      description: tAbout('principles.communicationDescription'),
      icon: MessageCircle,
      color: 'bg-indigo-500/10 text-indigo-500',
    },
    {
      title: tAbout('principles.feedback'),
      description: tAbout('principles.feedbackDescription'),
      icon: RefreshCw,
      color: 'bg-orange-500/10 text-orange-500',
    },
    {
      title: tAbout('principles.maintenance'),
      description: tAbout('principles.maintenanceDescription'),
      icon: Settings,
      color: 'bg-gray-500/10 text-gray-500',
    },
    {
      title: tAbout('principles.continuousLearning'),
      description: tAbout('principles.continuousLearningDescription'),
      icon: BookOpen,
      color: 'bg-teal-500/10 text-teal-500',
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <RevealAnimation direction="up" delay={1.0}>
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {tAbout('howIWork')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {tAbout('howIWorkDescription')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {workPrinciples.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="h-80"
                >
                  <TiltCard className="h-full">
                    <Card className="h-full text-center backdrop-blur-xl border-border/50 hover:border-primary/30 transition-all duration-300 bg-transparent">
                      <CardContent className="p-6 flex flex-col justify-between h-full">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-12 h-12 ${principle.color} rounded-xl flex items-center justify-center mb-4`}
                          >
                            <principle.icon className="h-6 w-6" />
                          </div>
                          <h3 className="text-lg font-bold mb-3">{principle.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {principle.description}
                        </p>
                      </CardContent>
                    </Card>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  )
}
