'use client'

import { useLocale } from '@/hooks/use-locale'
import type { Project } from '@/types/project'
import { motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface ProjectScreenshotsProps {
  screenshots: Project['screenshots']
  locale: 'pt-BR' | 'en-US'
}

export function ProjectScreenshots({ screenshots, locale }: ProjectScreenshotsProps) {
  const { t } = useLocale()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex(lightboxIndex > 0 ? lightboxIndex - 1 : screenshots.length - 1)
  }, [lightboxIndex, screenshots.length])

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex(lightboxIndex < screenshots.length - 1 ? lightboxIndex + 1 : 0)
  }, [lightboxIndex, screenshots.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex, goPrev, goNext])

  if (!screenshots || screenshots.length === 0) return null

  const [first, ...rest] = screenshots

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-border/40">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0 }}
          className="text-xs tracking-[0.2em] text-primary uppercase font-mono mb-14"
        >
          {t('projects.screenshots')}
        </motion.p>

        {/* First screenshot — full width */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-3 mb-6"
        >
          <button
            onClick={() => openLightbox(0)}
            className="group relative w-full overflow-hidden rounded-xl ring-1 ring-border/20 block"
            aria-label={first.alt}
          >
            <Image
              src={first.url}
              alt={first.alt}
              width={1280}
              height={720}
              className="w-full h-auto transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          </button>
          {first.caption[locale] && (
            <p className="text-xs text-muted-foreground/50 text-center italic">
              {first.caption[locale]}
            </p>
          )}
        </motion.div>

        {/* Remaining screenshots — 2-column grid */}
        {rest.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-6">
            {rest.map((shot, i) => (
              <motion.div
                key={shot.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease }}
                viewport={{ once: true, amount: 0.1 }}
                className="space-y-3"
              >
                <button
                  onClick={() => openLightbox(i + 1)}
                  className="group relative w-full overflow-hidden rounded-xl ring-1 ring-border/30 bg-muted/20 block h-64"
                  aria-label={shot.alt}
                >
                  <Image
                    src={shot.url}
                    alt={shot.alt}
                    fill
                    className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02] p-2"
                  />
                </button>
                {shot.caption[locale] && (
                  <p className="text-xs text-muted-foreground/50 text-center italic">
                    {shot.caption[locale]}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/92 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-10 text-white/60 hover:text-white transition-colors p-2"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          {screenshots.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white transition-colors p-2"
                aria-label={t('projects.carousel.previousImage')}
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white transition-colors p-2"
                aria-label={t('projects.carousel.nextImage')}
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </>
          )}

          <div
            className="max-w-5xl w-full flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={screenshots[lightboxIndex].url}
              alt={screenshots[lightboxIndex].alt}
              width={1280}
              height={720}
              className="max-h-[82vh] w-auto max-w-full rounded-lg object-contain"
            />
            <div className="text-center space-y-1">
              {screenshots[lightboxIndex].caption[locale] && (
                <p className="text-white/70 text-sm italic">
                  {screenshots[lightboxIndex].caption[locale]}
                </p>
              )}
              <p className="text-white/30 text-xs font-mono">
                {lightboxIndex + 1} / {screenshots.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
