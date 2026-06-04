'use client'

import { useLocale } from '@/hooks/use-locale'
import { useTheme } from '@/hooks/use-theme'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

const disciplineKeys = ['frontend', 'fullstack', 'architecture'] as const

export function AboutSection() {
  const { t } = useLocale()
  const { resolvedTheme } = useTheme()
  const years = new Date().getFullYear() - 2009

  const intro = t('home.about.intro').replace('{{years}}', years.toString())

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-border/40">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 items-start">

        {/* Photo */}
        <motion.div
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0 }}
          className="relative overflow-hidden rounded-xl w-full aspect-[3/4] lg:sticky lg:top-28"
        >
          <Image
            src={`/images/about-profile-photo-${resolvedTheme}.jpeg`}
            alt="Adriano Maringolo"
            fill
            sizes="(max-width: 1024px) 100vw, 280px"
            className="object-cover"
          />
        </motion.div>

        {/* Bio + disciplines */}
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 1, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            viewport={{ once: true, amount: 0 }}
            className="space-y-5"
          >
            <p className="text-xl leading-relaxed text-foreground">
              {intro}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-all hover:gap-3"
            >
              {t('home.about.cta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            viewport={{ once: true, amount: 0 }}
          >
            <p className="text-sm text-muted-foreground/60 mb-4">
              {t('home.disciplines.title')}
            </p>
            <ul className="divide-y divide-border/40">
              {disciplineKeys.map((key) => (
                <li key={key}>
                  <Link
                    href="/about"
                    className="group flex items-center justify-between py-4 text-base font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {t(`home.disciplines.${key}`)}
                    <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
