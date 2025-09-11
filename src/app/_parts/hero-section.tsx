'use client'

import { useLocale } from '@/hooks/use-locale'
import { Button } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function HeroSection() {
  const { t } = useLocale()
  const tHero = (tag: string) => t(`home.hero.${tag}`)

  return (
    <section className="min-h-screen flex items-center justify-center pt-32 lg:pt-0 px-6 md:px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              {tHero('greeting')} <span className="text-accent">Adriano Maringolo</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto lg:mx-0 text-pretty">
              {tHero('title')}
            </p>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-3xl mx-auto lg:mx-0 text-pretty">
              {tHero('subtitle')}
            </p>
            <Link href="/projetos">
              <Button size="lg" className="group">
                {tHero('cta')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="w-96 h-96 lg:w-[500px] lg:h-[500px] relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/profile-photo.jpg"
                  alt="Foto profissional"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Elemento decorativo */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
