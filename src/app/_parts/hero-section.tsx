'use client'

import { useLocale } from '@/hooks/use-locale'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useRef } from 'react'
import { FilledBlobName, OutlinedBlobName } from './hero-blobs'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

function LineReveal({
  children,
  delay = 0,
  descender = false,
}: {
  children: React.ReactNode
  delay?: number
  descender?: boolean
}) {
  return (
    <div className={`overflow-hidden ${descender ? 'pb-[0.25em]' : ''}`}>
      <motion.div
        initial={{ y: '105%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.75, delay, ease }}
      >
        {children}
      </motion.div>
    </div>
  )
}

function DrawLine({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.7, delay, ease }}
      className="h-px bg-primary origin-left"
    />
  )
}

export function HeroSection() {
  const { t, locale } = useLocale()
  const years = new Date().getFullYear() - 2009
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!glowRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    glowRef.current.style.transform = `translate(calc(${e.clientX - rect.left}px - 50%), calc(${e.clientY - rect.top}px - 50%))`
  }, [])

  const yearsUnit = locale === 'pt-BR' ? 'anos' : 'yrs'
  const statusText = locale === 'pt-BR' ? 'disponível' : 'available'

  return (
    <section
      className="relative flex flex-col justify-center px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ minHeight: 'calc(100svh - 64px)' }}
      onMouseMove={handleMouseMove}
    >
      {/* Cursor-following ambient glow */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 w-175 h-150 rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, oklch(0.65 0.13 200) 0%, transparent 70%)',
          opacity: 0.06,
          filter: 'blur(80px)',
          willChange: 'transform',
          transform: 'translate(-20%, 60%)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Editorial metadata — desktop only, right edge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        aria-hidden
        className="hidden lg:block absolute right-6 xl:right-12 top-1/2 -translate-y-1/2 z-10"
      >
        <p
          className="text-[10px] tracking-[0.22em] font-mono text-muted-foreground/25 uppercase select-none"
          style={{ writingMode: 'vertical-rl' }}
        >
          {years}+ {yearsUnit}&nbsp;&nbsp;·&nbsp;&nbsp;São Paulo&nbsp;&nbsp;·&nbsp;&nbsp;{statusText}
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto w-full py-16 lg:py-0 space-y-10 relative z-10">

        {/* Name — typographic statement */}
        <div>
          <h1
            className="font-black leading-[0.88] tracking-[-0.04em] [font-family:var(--font-geist-sans)]"
            style={{ fontSize: 'clamp(4.5rem, 15vw, 11rem)' }}
          >
            <LineReveal delay={0.1}>
              <FilledBlobName>Adriano</FilledBlobName>
            </LineReveal>

            <LineReveal delay={0.22} descender>
              <OutlinedBlobName>Maringolo</OutlinedBlobName>
            </LineReveal>
          </h1>
        </div>

        {/* Label framed by two primary lines */}
        <div className="space-y-4 max-w-3xl">
          <DrawLine delay={0.45} />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xs tracking-[0.2em] text-primary uppercase px-0.5"
          >
            {t('home.hero.label').replace('{{years}}', String(years))}
          </motion.p>
          <DrawLine delay={0.7} />
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex flex-wrap items-center gap-8"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors group"
          >
            {t('home.hero.cta')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('home.hero.contact')}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
