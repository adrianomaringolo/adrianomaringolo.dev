'use client'

import { AnimatedCounter } from '@/components/ui/animated-counter'
import { FloatingCode } from '@/components/ui/floating-code'
import { GradientMesh } from '@/components/ui/gradient-mesh'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { RevealAnimation } from '@/components/ui/reveal-animation'
import { TiltCard } from '@/components/ui/tilt-card'
import { useLocale } from '@/hooks/use-locale'
import { useShouldReduceAnimations } from '@/hooks/use-reduced-motion'
import { Badge, Button } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { ArrowRight, Code2, Coffee, Lightbulb, Rocket } from 'lucide-react'
import Link from 'next/link'

export function AboutSection() {
  const { t } = useLocale()
  const shouldReduceAnimations = useShouldReduceAnimations()

  // Calcula anos de experiência (2009 até agora)
  const yearsOfExperience = new Date().getFullYear() - 2009

  const skills = [
    { icon: Code2, label: t('home.about.skills.frontend'), color: 'bg-blue-500' },
    { icon: Rocket, label: t('home.about.skills.performance'), color: 'bg-green-500' },
    { icon: Lightbulb, label: t('home.about.skills.creative'), color: 'bg-yellow-500' },
    { icon: Coffee, label: t('home.about.skills.problem'), color: 'bg-purple-500' },
  ]

  const stats = [
    { number: 50, suffix: '+', label: t('home.about.stats.projects') },
    { number: yearsOfExperience, suffix: '+', label: t('home.about.stats.experience') },
    { number: 100, suffix: '%', label: t('home.about.stats.satisfaction') },
  ]

  // Interpolação manual para a descrição
  const description = t('home.about.description').replace(
    '{{years}}',
    yearsOfExperience.toString(),
  )

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {!shouldReduceAnimations && <GradientMesh />}
      {!shouldReduceAnimations && <FloatingCode />}

      {/* Animated background elements - Desabilitado no mobile */}
      {!shouldReduceAnimations && (
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.6, 0.3, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
        </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        <RevealAnimation direction="up" delay={0.2}>
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                {t('home.about.badge')}
              </Badge>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('home.about.title')}
            </h2>
          </div>
        </RevealAnimation>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <RevealAnimation direction="left" delay={0.4}>
            <div className="space-y-6">
              <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                {description}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <div
                      className={`w-8 h-8 ${skill.color} rounded-lg flex items-center justify-center`}
                    >
                      <skill.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">{skill.label}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-4">
                <Link href="/about">
                  <MagneticButton>
                    <Button size="lg" className="group">
                      {t('home.about.cta')}
                      <motion.div
                        className="ml-2"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </Button>
                  </MagneticButton>
                </Link>
              </div>
            </div>
          </RevealAnimation>

          <RevealAnimation direction="right" delay={0.6}>
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => {
                const StatWrapper = shouldReduceAnimations ? 'div' : TiltCard
                return (
                  <StatWrapper key={stat.label} {...(!shouldReduceAnimations && {})}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">
                        <AnimatedCounter
                          value={stat.number}
                          suffix={stat.suffix}
                          duration={2.5}
                          delay={index * 0.3}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  </StatWrapper>
                )
              })}
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  )
}
