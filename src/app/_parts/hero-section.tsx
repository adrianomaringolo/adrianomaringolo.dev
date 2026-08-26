'use client'

import { useLocale } from '@/hooks/use-locale'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

const HERO_VIDEO_SOURCES = [
  '/videos/hero-bg-1-waveform.mp4',
  '/videos/hero-bg-2-earth-projection.mp4',
  '/videos/hero-bg-3-code-display.mp4',
  '/videos/hero-bg-4-coding-glow.mp4',
  '/videos/hero-bg-5-neon-tunnel.mp4',
]

/** Desktop + motion-safe only: avoids autoplay cost/battery drain on mobile. */
function useHeroVideoEnabled() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktop = window.matchMedia('(min-width: 768px)')
    const update = () => setEnabled(desktop.matches && !reducedMotion.matches)
    update()
    reducedMotion.addEventListener('change', update)
    desktop.addEventListener('change', update)
    return () => {
      reducedMotion.removeEventListener('change', update)
      desktop.removeEventListener('change', update)
    }
  }, [])

  return enabled
}

function HeroBackgroundVideo() {
  const enabled = useHeroVideoEnabled()
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const fadeOut = useCallback(() => setVisible(false), [])

  useEffect(() => {
    if (!enabled) return
    const v = videoRef.current
    if (!v) return
    v.load()
    v.play().catch(() => {})
  }, [enabled, index])

  if (!enabled) return null

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="metadata"
        onCanPlay={() => setVisible(true)}
        onEnded={fadeOut}
        onError={fadeOut}
        onTransitionEnd={() => {
          if (!visible) setIndex((i) => (i + 1) % HERO_VIDEO_SOURCES.length)
        }}
        className="absolute inset-0 w-full h-full object-cover grayscale transition-opacity duration-300"
        style={{ opacity: visible ? 0.28 : 0 }}
      >
        <source src={HERO_VIDEO_SOURCES[index]} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/55" />
    </div>
  )
}

function LineReveal({
  children,
  delayMs = 0,
  descender = false,
}: {
  children: React.ReactNode
  delayMs?: number
  descender?: boolean
}) {
  return (
    <div className={`overflow-hidden ${descender ? 'pb-[0.25em]' : ''}`}>
      <div className="hero-line-reveal" style={{ animationDelay: `${delayMs}ms` }}>
        {children}
      </div>
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

  const yearsUnit = locale === 'pt-BR' ? 'anos' : 'yrs'
  const statusText = locale === 'pt-BR' ? 'disponível' : 'available'

  return (
    <section
      className="relative flex flex-col justify-center px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ minHeight: 'calc(100svh - 64px)' }}
    >
      <HeroBackgroundVideo />

      {/* Ambient glow — static, per the approved pattern in DESIGN.md */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 w-175 h-150 rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, oklch(0.65 0.13 200) 0%, transparent 70%)',
          opacity: 0.06,
          filter: 'blur(80px)',
          transform: 'translate(-20%, 60%)',
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
            <LineReveal delayMs={100}>
              <span className="text-foreground">Adriano</span>
            </LineReveal>

            <LineReveal delayMs={220} descender>
              <span style={{ WebkitTextStroke: '2px var(--foreground)', color: 'transparent' }}>
                Maringolo
              </span>
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
