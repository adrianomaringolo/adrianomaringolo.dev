'use client'

import { getFeaturedProjects } from '@/data/projects'
import { useLocale } from '@/hooks/use-locale'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Six tiles fill a 4-column grid with no gaps: 2x2 + 2x1 + 1x1 + 1x1, then 2x1 + 2x1
const BENTO_SIZES = [
  'md:col-span-2 md:row-span-2',
  'md:col-span-2',
  '',
  '',
  'md:col-span-2',
  'md:col-span-2',
]

export function FeaturedProjects() {
  const { t, locale } = useLocale()
  const featuredProjects = getFeaturedProjects().slice(0, BENTO_SIZES.length)

  if (featuredProjects.length === 0) return null

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-border/40">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0 }}
          className="text-xs tracking-[0.2em] text-primary uppercase font-mono mb-10"
        >
          {t('projects.featured')}
        </motion.p>

        {/* Bento grid: first tile is the hero, sizes follow the pattern below */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] gap-4">
          {featuredProjects.map((project, index) => {
            const size = BENTO_SIZES[index] ?? ''
            const isLarge = index === 0
            return (
              <motion.li
                key={project.id}
                initial={{ opacity: 1, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.07, ease }}
                viewport={{ once: true, amount: 0 }}
                className={size}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group relative block h-full w-full overflow-hidden rounded-2xl ring-1 ring-border/30 bg-muted"
                >
                  <Image
                    src={project.thumbnail}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                    sizes={
                      isLarge
                        ? '(min-width: 1024px) 50vw, 100vw'
                        : '(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw'
                    }
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
                  />

                  <div className="absolute inset-x-0 bottom-0 p-5 space-y-1.5">
                    <p className="text-[10px] tracking-[0.18em] uppercase font-mono text-white/70">
                      {t(`projects.${project.category}`)}
                    </p>
                    <h3
                      className={`font-semibold text-white leading-snug ${
                        isLarge ? 'text-xl lg:text-2xl' : 'text-base'
                      }`}
                    >
                      {project.title[locale]}
                    </h3>
                    {(isLarge || index === 1) && (
                      <p className="text-sm text-white/75 line-clamp-2 leading-relaxed">
                        {project.shortDescription[locale]}
                      </p>
                    )}
                    <p className="text-xs text-white/55 line-clamp-1">
                      {project.technologies.slice(0, 4).join(' · ')}
                    </p>
                  </div>

                  <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
              </motion.li>
            )
          })}
        </ul>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, amount: 0 }}
          className="mt-12"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('projects.viewAllProjects')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
