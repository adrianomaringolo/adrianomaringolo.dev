'use client'

import { GradientMesh } from '@/components/ui/gradient-mesh'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { RevealAnimation } from '@/components/ui/reveal-animation'
import { WaveBackground } from '@/components/ui/wave-background'
import { useLocale } from '@/hooks/use-locale'
import { Badge, Button } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Coffee, MessageCircle, Sparkles, Star } from 'lucide-react'
import Link from 'next/link'

export function CTASection() {
  const { t } = useLocale()

  const benefits = [
    { icon: Star, text: t('cta.benefits.quality') },
    { icon: Calendar, text: t('cta.benefits.delivery') },
    { icon: Coffee, text: t('cta.benefits.support') },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <GradientMesh />
      <WaveBackground />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <RevealAnimation direction="up" delay={0.2}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              {t('cta.badge')}
            </Badge>
          </motion.div>
        </RevealAnimation>

        <RevealAnimation direction="up" delay={0.4}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t('cta.title')}
            </span>
          </h2>
        </RevealAnimation>

        <RevealAnimation direction="up" delay={0.6}>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
            {t('cta.description')}
          </p>
        </RevealAnimation>

        <RevealAnimation direction="up" delay={0.8}>
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.text}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <benefit.icon className="w-4 h-4 text-primary" />
                </div>
                {benefit.text}
              </motion.div>
            ))}
          </div>
        </RevealAnimation>

        <RevealAnimation direction="up" delay={1.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <MagneticButton>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="group relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <MessageCircle className="mr-2 h-5 w-5 relative z-10" />
                    <span className="relative z-10">{t('cta.button')}</span>
                    <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </MagneticButton>
            </Link>

            <Link href="/projects">
              <MagneticButton>
                <Button variant="outline" size="lg" className="group">
                  {t('cta.secondaryButton')}
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
        </RevealAnimation>

        <RevealAnimation direction="up" delay={1.4}>
          <motion.p
            className="text-sm text-muted-foreground mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            viewport={{ once: true }}
          >
            {t('cta.note')}
          </motion.p>
        </RevealAnimation>
      </div>
    </section>
  )
}
