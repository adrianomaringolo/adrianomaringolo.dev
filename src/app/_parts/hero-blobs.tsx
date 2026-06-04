'use client'

import { useEffect, useRef, useState } from 'react'

// ---------------------------------------------------------------------------
// Shared blob drawing utility
// ---------------------------------------------------------------------------

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
    pts.push([cx + Math.cos(a) * radius * (1 + 0.38 * wobble), cy + Math.sin(a) * radius * (1 + 0.38 * wobble)])
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

// ---------------------------------------------------------------------------
// Shared canvas animation hook
// ---------------------------------------------------------------------------

function useBlobCanvas(
  active: boolean,
  children: string,
  paint: (
    ctx: CanvasRenderingContext2D,
    W: number,
    H: number,
    t: number,
    mouse: { x: number; y: number },
    textSpan: HTMLSpanElement,
    outer: HTMLSpanElement,
  ) => void,
) {
  const outerRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const activeRef = useRef(false)

  useEffect(() => {
    activeRef.current = active
    cancelAnimationFrame(rafRef.current)
    if (!active) return

    const canvas = canvasRef.current
    const textSpan = textRef.current
    const outer = outerRef.current
    if (!canvas || !textSpan || !outer) return

    const t0 = performance.now()

    function draw() {
      if (!activeRef.current) return

      const dpr = window.devicePixelRatio || 1
      const W = canvas!.offsetWidth
      const H = canvas!.offsetHeight
      if (!W || !H) { rafRef.current = requestAnimationFrame(draw); return }

      if (canvas!.width !== Math.round(W * dpr)) {
        canvas!.width = Math.round(W * dpr)
        canvas!.height = Math.round(H * dpr)
      }

      const ctx = canvas!.getContext('2d')
      if (!ctx) { rafRef.current = requestAnimationFrame(draw); return }

      ctx.save()
      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, W, H)

      paint(ctx, W, H, (performance.now() - t0) / 1000, mouseRef.current, textSpan!, outer!)

      ctx.restore()
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, children, paint])

  return { outerRef, textRef, canvasRef, mouseRef }
}

// ---------------------------------------------------------------------------
// Helpers shared by both components
// ---------------------------------------------------------------------------

function applyTextFont(
  ctx: CanvasRenderingContext2D,
  cs: CSSStyleDeclaration,
  fsPx: number,
) {
  ctx.font = `${cs.fontWeight} ${fsPx}px ${cs.fontFamily}`
  if ('letterSpacing' in ctx) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(ctx as any).letterSpacing = `${(-0.04 * fsPx).toFixed(1)}px`
  }
}

// ---------------------------------------------------------------------------
// OutlinedBlobName — blob clipped TO letter shapes (primary fill inside)
// ---------------------------------------------------------------------------

export function OutlinedBlobName({ children }: { children: string }) {
  const [active, setActive] = useState(false)

  const paint = (
    ctx: CanvasRenderingContext2D,
    _W: number,
    _H: number,
    t: number,
    mouse: { x: number; y: number },
    textSpan: HTMLSpanElement,
    outer: HTMLSpanElement,
  ) => {
    const cs = getComputedStyle(textSpan)
    const fsPx = parseFloat(cs.fontSize)
    const primary = getComputedStyle(outer).getPropertyValue('--primary').trim() || '#0891b2'

    // 1. Draw blob in primary color
    ctx.fillStyle = primary
    drawBlob(ctx, mouse.x, mouse.y, fsPx * 0.5, t)
    ctx.fill()

    // 2. Mask to letter shapes — keeps only pixels where text glyphs are
    ctx.globalCompositeOperation = 'destination-in'
    applyTextFont(ctx, cs, fsPx)
    const { actualBoundingBoxAscent: asc } = ctx.measureText(children)
    ctx.fillStyle = '#000'
    ctx.fillText(children, 0, asc)
  }

  const { outerRef, textRef, canvasRef, mouseRef } = useBlobCanvas(active, children, paint)

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

// ---------------------------------------------------------------------------
// FilledBlobName — dark blob outside letters, background color punched through
// ---------------------------------------------------------------------------

export function FilledBlobName({ children }: { children: string }) {
  const [active, setActive] = useState(false)

  const paint = (
    ctx: CanvasRenderingContext2D,
    _W: number,
    _H: number,
    t: number,
    mouse: { x: number; y: number },
    textSpan: HTMLSpanElement,
    outer: HTMLSpanElement,
  ) => {
    const cs = getComputedStyle(textSpan)
    const fsPx = parseFloat(cs.fontSize)
    const outerCs = getComputedStyle(outer)
    const fg = outerCs.getPropertyValue('--foreground').trim() || '#0f172a'
    const bg = outerCs.getPropertyValue('--background').trim() || '#ffffff'

    // 1. Draw blob in foreground color (dark)
    ctx.fillStyle = fg
    drawBlob(ctx, mouse.x, mouse.y, fsPx * 0.5, t)
    ctx.fill()

    // 2. Overwrite letter shapes with background color (source-atop)
    //    Result: dark blob with background-colored "windows" at letter positions
    ctx.globalCompositeOperation = 'source-atop'
    applyTextFont(ctx, cs, fsPx)
    const { actualBoundingBoxAscent: asc } = ctx.measureText(children)
    ctx.fillStyle = bg
    ctx.fillText(children, 0, asc)
  }

  const { outerRef, textRef, canvasRef, mouseRef } = useBlobCanvas(active, children, paint)

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
      <span ref={textRef} className="text-foreground">
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
