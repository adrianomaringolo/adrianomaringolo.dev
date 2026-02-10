'use client'

import { FloatingCode } from '@/components/ui/floating-code'
import { GradientMesh } from '@/components/ui/gradient-mesh'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { TiltCard } from '@/components/ui/tilt-card'
import { TypewriterEffect } from '@/components/ui/typewriter-effect'
import { useLocale } from '@/hooks/use-locale'
import { useShouldReduceAnimations } from '@/hooks/use-reduced-motion'
import { useTheme } from '@/hooks/use-theme'
import { Button } from 'buildgrid-ui'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Code, Hand, MessageCircle, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

export function HeroSection() {
  const { t, locale } = useLocale()
  const { resolvedTheme } = useTheme()
  const shouldReduceAnimations = useShouldReduceAnimations()
  const tHero = (tag: string) => t(`home.hero.${tag}`)
  const ref = useRef<HTMLDivElement>(null)

  // Calcula anos de experiência (2009 até agora)
  const yearsOfExperience = new Date().getFullYear() - 2009

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', shouldReduceAnimations ? '0%' : '50%'],
  )
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    [1, shouldReduceAnimations ? 1 : 0],
  )

  const typewriterWords =
    locale === 'pt-BR'
      ? [
          'Criador de experiências digitais',
          'Desenvolvedor Full Stack',
          'Especialista em React',
          'Arquiteto de Soluções',
        ]
      : [
          'Digital Experience Creator',
          'Full Stack Developer',
          'React Specialist',
          'Solution Architect',
        ]

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Dynamic Background - Desabilitado no mobile */}
      {!shouldReduceAnimations && <GradientMesh />}

      {/* Floating Code Elements - Reduzido no mobile */}
      {!shouldReduceAnimations && <FloatingCode count={40} />}
      {shouldReduceAnimations && <FloatingCode count={8} />}

      <motion.div
        className="relative z-10 min-h-screen flex items-center justify-center pt-32 lg:pt-0 px-6 md:px-4 lg:px-8"
        style={{ y, opacity }}
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left space-y-6"
            >
              {/* Greeting with glitch effect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center lg:justify-start gap-2 text-lg text-muted-foreground"
              >
                <Hand className="w-5 h-5 text-primary animate-pulse" />
                <span>{tHero('greeting')}</span>
              </motion.div>

              {/* Name with special styling */}
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="bg-linear-to-r from-blue-600 via-cyan-500 to-indigo-900 bg-clip-text text-transparent animate-text font-black">
                  Adriano Maringolo
                </span>
              </motion.h1>

              {/* Typewriter Effect */}
              <div className="text-xl sm:text-2xl text-muted-foreground min-h-12 flex items-center justify-center lg:justify-start">
                <Code className="w-6 h-6 mr-2 text-primary" />
                <TypewriterEffect words={typewriterWords} className="font-medium" />
              </div>

              {/* Subtitle */}
              <motion.p
                className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {tHero('subtitle')}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <Link href="/projects">
                  <MagneticButton className="group">
                    <Button size="lg" className="relative overflow-hidden">
                      <span className="relative z-10 flex items-center">
                        {tHero('cta')}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </MagneticButton>
                </Link>

                <Link href="/contact">
                  <MagneticButton>
                    <Button variant="outline" size="lg" className="group">
                      <span className="flex items-center">
                        {tHero('contact')}
                        <motion.div
                          whileHover={{
                            scale: [1, 1.2, 1],
                            rotate: [0, -10, 10, 0],
                          }}
                          transition={{
                            duration: 0.6,
                            ease: 'easeInOut',
                          }}
                          className="ml-2"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </motion.div>
                      </span>
                    </Button>
                  </MagneticButton>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex justify-center lg:justify-start gap-8 pt-8 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {yearsOfExperience}+
                  </div>
                  <div>{tHero('stats.experience')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div>{tHero('stats.projects')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div>{tHero('stats.satisfaction')}</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Profile Image with 3D Tilt */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center lg:justify-end"
            >
              {shouldReduceAnimations ? (
                <div className="relative">
                  <div className="relative group">
                    {/* Main image container */}
                    <div className="w-80 h-80 lg:w-[450px] lg:h-[450px] relative rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={`/images/about-profile-photo-${resolvedTheme}.jpeg`}
                        alt="Adriano Maringolo - Full Stack Engineer"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        priority
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-linear-to-t from-background/20 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>
              ) : (
                <TiltCard className="relative">
                  <div className="relative group">
                    {/* Main image container */}
                    <div className="w-80 h-80 lg:w-[450px] lg:h-[450px] relative rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={`/images/about-profile-photo-${resolvedTheme}.jpeg`}
                        alt="Adriano Maringolo - Full Stack Engineer"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        priority
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-linear-to-t from-background/20 via-transparent to-transparent" />
                    </div>

                    {/* Floating elements around image */}
                    <motion.div
                      className="absolute -top-6 -right-6 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/30"
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <Code className="w-6 h-6 text-primary" />
                    </motion.div>

                    <motion.div
                      className="absolute -bottom-6 -left-6 w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-accent/30"
                      animate={{
                        y: [0, 10, 0],
                        x: [0, 5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <Sparkles className="w-8 h-8 text-accent" />
                    </motion.div>

                    {/* Decorative rings */}
                    <div className="absolute -inset-4 rounded-2xl border border-primary/20 animate-pulse" />
                    <div className="absolute -inset-8 rounded-2xl border border-accent/10" />
                  </div>
                </TiltCard>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator - Desabilitado no mobile */}
      {!shouldReduceAnimations && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm">{tHero('scrollToExplore')}</span>
            <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-primary rounded-full mt-2"
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
