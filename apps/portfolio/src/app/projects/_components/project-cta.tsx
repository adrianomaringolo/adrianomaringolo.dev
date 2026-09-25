'use client'

import { useLocale } from '@/hooks/use-locale'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function ProjectCTA() {
  const { t } = useLocale()

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-border/40">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-4"
        >
          <h2
            className="font-bold tracking-tight text-foreground [font-family:var(--font-geist-sans)] text-balance"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
          >
            {t('projects.likeWhatYouSee')}
          </h2>
          <p className="text-sm text-muted-foreground max-w-sm">
            {t('projects.letsWorkTogether')}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity"
          >
            {t('projects.getInTouch')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            {t('projects.viewMoreProjects')}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
