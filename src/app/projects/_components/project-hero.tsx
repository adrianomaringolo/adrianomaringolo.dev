'use client'

import { useLocale } from '@/hooks/use-locale'
import type { Project } from '@/types/project'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface ProjectHeroProps {
  project: Project
  locale: 'pt-BR' | 'en-US'
}

export function ProjectHero({ project, locale }: ProjectHeroProps) {
  const { t } = useLocale()

  return (
    <>
      {/* Top nav */}
      <nav className="px-6 md:px-12 lg:px-20 py-7">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('projects.backToProjects')}
          </Link>

          <div className="flex items-center gap-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Live
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
                <SiGithub className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero image — full bleed, always visible */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 'clamp(340px, 58vh, 700px)' }}
      >
        <Image
          src={project.thumbnail}
          alt={project.title[locale]}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />

        {/*
          Dark scrim — guarantees white text contrast over any image regardless of theme.
          Heavier at the bottom (text zone), dissolves toward top so the image reads.
        */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.50) 20%, rgba(0,0,0,0.12) 48%, transparent 68%)' }}
        />

        {/* Project identity — always visible, motion only for entrance polish */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:px-20 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            <p className="text-sm tracking-[0.18em] text-white uppercase font-mono mb-3">
              {project.category}
              {project.client && ` · ${project.client.name}`}
            </p>
            <h1
              className="font-bold tracking-tight text-white text-balance [font-family:var(--font-geist-sans)]"
              style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.75rem)' }}
            >
              {project.title[locale]}
            </h1>
          </motion.div>
        </div>
      </div>
    </>
  )
}
