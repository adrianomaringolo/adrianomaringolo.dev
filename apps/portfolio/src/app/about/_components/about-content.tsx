'use client'

import { DownloadCVButton } from '@/components/ui/download-cv-button'
import { RevealAnimation } from '@/components/ui/reveal-animation'
import { ScrollParallax } from '@/components/ui/scroll-parallax'
import { useExperience } from '@/hooks/use-experience'
import { useLocale } from '@/hooks/use-locale'
import { Badge, Button } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { ArrowRight, Code2, Coffee, Lightbulb, MessageCircle, Rocket } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function AboutContent() {
  const { t } = useLocale()
  const { years } = useExperience()

  const tAbout = (tag: string) => t(`about.${tag}`)

  // Interpolação manual para o header
  const header = t('about.header').replace('{{years}}', years.toString())

  const skills = [
    { icon: Code2, label: 'Frontend Development', color: 'bg-blue-500' },
    { icon: Rocket, label: 'Performance Optimization', color: 'bg-green-500' },
    { icon: Lightbulb, label: 'Creative Solutions', color: 'bg-yellow-500' },
    { icon: Coffee, label: 'Problem Solving', color: 'bg-purple-500' },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <ScrollParallax offset={50} className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
      </ScrollParallax>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <RevealAnimation direction="left" delay={0.2}>
            <div className="relative">
              <motion.div
                className="relative w-full max-w-md mx-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="aspect-square relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/profile-photo.jpg"
                    alt="Foto profissional"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-tr from-accent/30 to-primary/30 rounded-full blur-xl"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.8, 0.5, 0.8],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.5,
                  }}
                />
              </motion.div>
            </div>
          </RevealAnimation>

          <RevealAnimation direction="right" delay={0.4}>
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {header}
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p className="text-pretty whitespace-pre-line">{tAbout('description')}</p>
              </div>

              {/* Skills Pills */}
              <div className="flex flex-wrap gap-3 pt-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge className="px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 text-foreground">
                      <skill.icon className="w-4 h-4 mr-2" />
                      {skill.label}
                    </Badge>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="pt-6"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" className="group relative overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                        <MessageCircle className="w-5 h-5 mr-2 relative z-10 group-hover:animate-bounce" />
                        <span className="relative z-10">{tAbout('cta')}</span>
                        <ArrowRight className="w-4 h-4 ml-2 relative z-10 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </motion.div>
                  </Link>

                  <DownloadCVButton size="lg" />
                </div>
              </motion.div>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  )
}
