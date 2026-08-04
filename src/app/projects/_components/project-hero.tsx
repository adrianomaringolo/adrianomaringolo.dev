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

      {/*
        Hero image — full bleed. Height is not fixed: a reserved viewing area
        plus whatever the identity band needs. With a fixed height the band ate
        into the image, so a three-line title left almost nothing of the
        screenshot visible while a one-line title left plenty. Reserving the
        viewing area instead keeps that amount constant and lets the container
        grow with the title.
      */}
      <div className="relative w-full overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.title[locale]}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />

        {/* Reserved viewing area — the part of the image the band never covers. */}
        <div aria-hidden style={{ height: 'clamp(240px, 32vh, 480px)' }} />

        {/*
          The identity band sits in flow, so it adds its own height rather than
          overlapping. The two treatment layers hang off it — a one-line title
          and a three-line title land on the same guaranteed contrast. Tying
          fixed gradient stops to a variable-height text block is what left the
          eyebrow stranded on a pale strip of the screenshot.
        */}
        <div className="relative">
          {/*
            Blur first. Thumbnails are full screenshots, so the area under the
            title already carries the project's own headline type — white text
            over black text reads as noise however dark the scrim gets. This
            turns the competing type into texture, masked so the image above
            stays sharp.
          */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 -top-40"
            style={{
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              maskImage:
                'linear-gradient(to top, black calc(100% - 160px), rgba(0,0,0,0.45) calc(100% - 74px), transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to top, black calc(100% - 160px), rgba(0,0,0,0.45) calc(100% - 74px), transparent 100%)',
            }}
          />

          {/*
            Then the scrim carries the contrast. Stops are pinned in pixels off
            the top edge, not in percentages: percentages stretch with the band,
            so a one-line title pulled the eyebrow up into the fade while a
            two-line title kept it safe. In pixels the plateau always covers the
            text and the fade always lives in the 160px overhang above it.
            The floor is the worst case — white type over a near-white screenshot.
          */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 -top-48"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.90) 0, rgba(0,0,0,0.88) calc(100% - 192px), rgba(0,0,0,0.72) calc(100% - 140px), rgba(0,0,0,0.38) calc(100% - 78px), transparent 100%)',
            }}
          />

          {/* Project identity — always visible, motion only for entrance polish */}
          <div className="relative px-6 md:px-12 lg:px-20 pb-12 pt-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
            >
              <p className="text-sm tracking-[0.18em] text-white/85 uppercase font-mono mb-3">
                {project.category}
                {project.client && ` · ${project.client.name[locale]}`}
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
      </div>
    </>
  )
}
