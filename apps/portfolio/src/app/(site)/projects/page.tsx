'use client'

import { projects } from '@/data/projects'
import { useLocale } from '@/hooks/use-locale'
import type { Project } from '@/types/project'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ExternalLink, LayoutGrid, List } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

type FilterKey = 'all' | Project['category']
type ViewMode = 'list' | 'grid'

const VIEW_STORAGE_KEY = 'projects-view'

export default function ProjectsPage() {
  const { t, locale } = useLocale()
  const [filter, setFilter] = useState<FilterKey>('all')
  const [view, setView] = useState<ViewMode>('grid')

  // The URL (?view=grid) wins so links are shareable; localStorage remembers the last choice
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('view')
    let stored: string | null = null
    try {
      stored = localStorage.getItem(VIEW_STORAGE_KEY)
    } catch {}
    const initial = fromUrl ?? stored
    if (initial === 'grid' || initial === 'list') setView(initial)
  }, [])

  const changeView = (next: ViewMode) => {
    setView(next)
    const url = new URL(window.location.href)
    url.searchParams.set('view', next)
    window.history.replaceState(null, '', url)
    try {
      localStorage.setItem(VIEW_STORAGE_KEY, next)
    } catch {}
  }

  const filters: { key: FilterKey; label: string }[] = [
    { key: 'all', label: t('projects.all') },
    { key: 'web', label: t('projects.web') },
    { key: 'webapp', label: t('projects.webapp') },
    { key: 'library', label: t('projects.library') },
    { key: 'games', label: t('projects.games') },
  ]

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.category === filter)

  return (
    <div>
      {/* Page hero */}
      <section className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs tracking-[0.2em] text-primary uppercase font-mono mb-8"
          >
            {t('projects.title')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="font-bold tracking-tight text-foreground text-balance [font-family:var(--font-geist-sans)]"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.75rem)' }}
          >
            {t('projects.pageHeading')}
          </motion.h1>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="flex flex-wrap items-center gap-6 mt-10"
            role="group"
            aria-label="Filter projects by category"
          >
            {filters.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  filter === key
                    ? 'text-foreground'
                    : 'text-muted-foreground/60 hover:text-muted-foreground'
                }`}
              >
                {filter === key && (
                  <span
                    aria-hidden
                    className="inline-block w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                  />
                )}
                {label}
              </button>
            ))}

            {/* View switcher */}
            <div
              className="ml-auto flex items-center gap-1 rounded-lg border border-border/40 p-0.5"
              role="group"
              aria-label={t('projects.viewMode')}
            >
              {(
                [
                  { key: 'list', label: t('projects.viewList'), Icon: List },
                  { key: 'grid', label: t('projects.viewGrid'), Icon: LayoutGrid },
                ] as const
              ).map(({ key, label, Icon }) => (
                <button
                  key={key}
                  onClick={() => changeView(key)}
                  aria-pressed={view === key}
                  aria-label={label}
                  title={label}
                  className={`p-1.5 rounded-md transition-colors ${
                    view === key
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground/60 hover:text-muted-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" aria-hidden />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project list */}
      <section className="px-6 md:px-12 lg:px-20 pb-24 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 && view === 'grid' ? (
              <motion.ul
                key={`grid-${filter}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pt-10"
              >
                {filteredProjects.map((project, index) => {
                  const metric = project.metrics?.[0]
                  return (
                    <motion.li
                      key={project.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: index * 0.07, ease }}
                    >
                      <Link
                        href={`/projects/${project.slug}`}
                        className="group block space-y-3"
                      >
                        <div
                          className="relative w-full overflow-hidden rounded-xl ring-1 ring-border/20"
                          style={{ aspectRatio: '16/10' }}
                        >
                          <Image
                            src={project.thumbnail}
                            alt={project.title[locale]}
                            fill
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                            sizes="(min-width: 768px) 50vw, 100vw"
                          />
                          {metric && (
                            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0">
                              <span className="text-xs text-white/80 line-clamp-1">
                                {metric.label[locale]}
                              </span>
                              <span className="font-mono text-sm font-semibold text-white shrink-0">
                                {metric.value[locale]}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="min-w-0 flex-1 space-y-1">
                            <h2 className="text-base lg:text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                              {project.title[locale]}
                            </h2>
                            <p className="text-xs text-muted-foreground/60 line-clamp-1">
                              {project.technologies.slice(0, 4).join(' · ')}
                            </p>
                          </div>
                          <span className="text-[10px] tracking-[0.15em] uppercase font-mono text-muted-foreground/60 pt-1.5 shrink-0">
                            {t(`projects.${project.category}`)}
                          </span>
                        </div>
                      </Link>
                    </motion.li>
                  )
                })}
              </motion.ul>
            ) : filteredProjects.length > 0 ? (
              <motion.ul
                key={`list-${filter}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="divide-y divide-border/40"
              >
                {filteredProjects.map((project, index) => (
                  <motion.li
                    key={project.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: index * 0.07, ease }}
                    className="group"
                  >
                    <Link href={`/projects/${project.slug}`}>
                      <div className="grid grid-cols-[32px_1fr] lg:grid-cols-[48px_1fr_280px] gap-4 lg:gap-10 py-8 lg:py-9 items-center -mx-4 px-4 rounded-lg transition-colors hover:bg-muted/40">

                        {/* Index */}
                        <span className="text-sm text-muted-foreground/25 font-mono tabular-nums self-start pt-1">
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        {/* Title + description + tech + arrow */}
                        <div className="space-y-2 min-w-0">
                          <div className="flex items-start gap-3">
                            <h2 className="text-lg lg:text-xl font-semibold text-foreground group-hover:text-primary transition-colors leading-snug flex-1">
                              {project.title[locale]}
                            </h2>
                            <span className="shrink-0 mt-0.5 hidden lg:block">
                              {project.liveUrl ? (
                                <ExternalLink className="w-4 h-4 text-muted-foreground/25 group-hover:text-primary transition-colors" />
                              ) : (
                                <ArrowRight className="w-4 h-4 text-muted-foreground/25 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                              )}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                            {project.shortDescription[locale]}
                          </p>
                          <p className="text-xs text-muted-foreground/50">
                            {project.technologies.slice(0, 5).join(' · ')}
                            {project.technologies.length > 5 && (
                              <span> · +{project.technologies.length - 5}</span>
                            )}
                          </p>
                        </div>

                        {/* Thumbnail — desktop only, aspect-video, always visible */}
                        <div className="hidden lg:block relative w-full overflow-hidden rounded-xl ring-1 ring-border/20" style={{ aspectRatio: '16/9' }}>
                          <Image
                            src={project.thumbnail}
                            alt={project.title[locale]}
                            fill
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                            sizes="280px"
                          />
                        </div>
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-sm text-muted-foreground py-20 text-center"
              >
                {t('projects.noProjectsFound')}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
