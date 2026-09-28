'use client'

import { AnimatedCounter } from '@/components/ui/animated-counter'
import { RevealAnimation } from '@/components/ui/reveal-animation'
import { TiltCard } from '@/components/ui/tilt-card'
import { useExperience } from '@/hooks/use-experience'
import { useLocale } from '@/hooks/use-locale'
import { Card, CardContent } from 'buildgrid-ui'
import { motion } from 'framer-motion'

export function AboutStats() {
  const { t } = useLocale()
  const { years } = useExperience()

  const tAbout = (tag: string) => t(`about.${tag}`)

  const stats = [
    { number: 50, suffix: '+', label: tAbout('stats.projects') },
    { number: years, suffix: '+', label: tAbout('stats.experience') },
    { number: 100, suffix: '%', label: tAbout('stats.satisfaction') },
    { number: 25, suffix: '+', label: tAbout('stats.technologies') },
  ]

  return (
    <RevealAnimation direction="up" delay={0.8}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <TiltCard>
              <Card className="text-center h-full bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-border/50">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    <AnimatedCounter
                      value={stat.number}
                      suffix={stat.suffix}
                      duration={2.5}
                      delay={index * 0.2}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </RevealAnimation>
  )
}
