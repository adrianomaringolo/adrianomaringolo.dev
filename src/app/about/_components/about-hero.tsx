'use client'

import { FloatingCode } from '@/components/ui/floating-code'
import { GradientMesh } from '@/components/ui/gradient-mesh'
import { RevealAnimation } from '@/components/ui/reveal-animation'
import { TypewriterEffect } from '@/components/ui/typewriter-effect'
import { WaveBackground } from '@/components/ui/wave-background'
import { useLocale } from '@/hooks/use-locale'
import { Badge } from 'buildgrid-ui'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import { useRef } from 'react'
import { AboutStats } from './about-stats'

export function AboutHero() {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const tAbout = (tag: string) => t(`about.${tag}`)

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center pt-32 lg:pt-0"
      style={{ y, opacity }}
    >
      <GradientMesh />
      <FloatingCode count={30} />
      <WaveBackground />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <RevealAnimation direction="up" delay={0.2}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-lg px-4 py-2">
                <Heart className="w-4 h-4 mr-2" />
                {tAbout('badge')}
              </Badge>
            </motion.div>
          </RevealAnimation>

          <RevealAnimation direction="up" delay={0.4}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-balance">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
                {tAbout('title')}
              </span>
            </h1>
          </RevealAnimation>

          <RevealAnimation direction="up" delay={0.6}>
            <div className="text-xl sm:text-2xl text-muted-foreground mb-8 min-h-[3rem] flex items-center justify-center">
              <Sparkles className="w-6 h-6 mr-2 text-primary animate-pulse" />
              <TypewriterEffect
                words={[
                  tAbout('typewriter.developer'),
                  tAbout('typewriter.creator'),
                  tAbout('typewriter.solver'),
                  tAbout('typewriter.enthusiast'),
                ]}
                className="font-medium"
              />
            </div>
          </RevealAnimation>
        </div>

        {/* Stats Section */}
        <AboutStats />
      </div>
    </motion.section>
  )
}
