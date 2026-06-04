'use client'

import { useLocale } from '@/hooks/use-locale'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

function LineReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div className="overflow-hidden">
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

function drawBlob(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  t: number,
) {
  const n = 8
  const pts: [number, number][] = []
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2
    const wobble = Math.sin(t * 1.4 + i * 2.3) * Math.cos(t * 0.9 + i * 1.6)
    const r = radius * (1 + 0.38 * wobble)
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r])
  }
  ctx.beginPath()
  ctx.moveTo(pts[0][0], pts[0][1])
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % n]
    const p3 = pts[(i + 2) % n]
    ctx.bezierCurveTo(
      p1[0] + (p2[0] - p0[0]) / 6,
      p1[1] + (p2[1] - p0[1]) / 6,
      p2[0] - (p3[0] - p1[0]) / 6,
      p2[1] - (p3[1] - p1[1]) / 6,
      p2[0],
      p2[1],
    )
  }
  ctx.closePath()
}

function OutlinedBlobName({ children }: { children: string }) {
  const outerRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const t0Ref = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const activeRef = useRef(false)
  const [active, setActive] = useState(false)

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current
    const textSpan = textRef.current
    const outer = outerRef.current
    if (!canvas || !textSpan || !outer) return

    if (t0Ref.current === null) t0Ref.current = performance.now()
    const t = (performance.now() - t0Ref.current) / 1000

    const dpr = window.devicePixelRatio || 1
    const W = canvas.offsetWidth
    const H = canvas.offsetHeight
    if (!W || !H) return

    if (canvas.width !== Math.round(W * dpr)) {
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.save()
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, W, H)

    const cs = getComputedStyle(textSpan)
    const fsPx = parseFloat(cs.fontSize)
    const primary = getComputedStyle(outer).getPropertyValue('--primary').trim() || '#0891b2'
    const { x, y } = mouseRef.current

    // 1. Draw solid morphing blob
    ctx.fillStyle = primary
    drawBlob(ctx, x, y, fsPx * 0.5, t)
    ctx.fill()

    // 2. Mask: keep only pixels where the text glyphs are
    ctx.globalCompositeOperation = 'destination-in'
    ctx.font = `${cs.fontWeight} ${fsPx}px ${cs.fontFamily}`
    if ('letterSpacing' in ctx) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(ctx as any).letterSpacing = `${(-0.04 * fsPx).toFixed(1)}px`
    }
    const { actualBoundingBoxAscent: asc } = ctx.measureText(children)
    ctx.fillStyle = '#000'
    ctx.fillText(children, 0, asc)

    ctx.restore()

    if (activeRef.current) {
      rafRef.current = requestAnimationFrame(drawFrame)
    }
  }, [children])

  useEffect(() => {
    activeRef.current = active
    if (active) {
      rafRef.current = requestAnimationFrame(drawFrame)
    } else {
      cancelAnimationFrame(rafRef.current)
    }
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, drawFrame])

  return (
    <span
      ref={outerRef}
      className="relative inline-block cursor-default"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <span
        ref={textRef}
        style={{ WebkitTextStroke: '2px var(--foreground)', color: 'transparent' }}
      >
        {children}
      </span>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 pointer-events-none w-full h-full"
        style={{ opacity: active ? 1 : 0, transition: 'opacity 0.3s ease' }}
      />
    </span>
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
  const { t } = useLocale()
  const years = new Date().getFullYear() - 2009

  return (
    <section
      className="relative flex flex-col justify-center px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ minHeight: 'calc(100svh - 64px)' }}
    >
      {/* Ambient glow — barely visible, bottom-left origin */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 w-[700px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, oklch(0.65 0.13 200) 0%, transparent 70%)',
          opacity: 0.07,
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-6xl mx-auto w-full py-16 lg:py-0 space-y-10 relative z-10">

        {/* Name — typographic statement */}
        <div>
          <h1
            className="font-black leading-[0.88] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(4.5rem, 15vw, 11rem)' }}
          >
            {/* Adriano — filled */}
            <LineReveal delay={0.1}>
              <span className="text-foreground">Adriano</span>
            </LineReveal>

            {/* Maringolo — outline only, blob on hover */}
            <LineReveal delay={0.22}>
              <OutlinedBlobName>Maringolo</OutlinedBlobName>
            </LineReveal>
          </h1>
        </div>

        {/* Label framed by two cyan lines */}
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
