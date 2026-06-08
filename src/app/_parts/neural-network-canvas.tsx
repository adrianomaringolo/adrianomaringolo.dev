'use client'

import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  phase: number
  phaseSpeed: number
}

function getPrimaryRgb(): readonly [number, number, number] {
  return document.documentElement.classList.contains('dark')
    ? [6, 182, 212]
    : [8, 145, 178]
}

const SPEED = 0.18
const MAX_DIST = 180
const NODE_COUNT = 30

export function NeuralNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let dpr = 1
    let rgb = getPrimaryRgb()
    let animId = 0
    let isVisible = !document.hidden

    // Same pattern as existing particle-fields.tsx in this project
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * SPEED * 2,
      vy: (Math.random() - 0.5) * SPEED * 2,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.005 + Math.random() * 0.007,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const [r, g, b] = rgb

      if (!prefersReduced) {
        for (const n of nodes) {
          n.x += n.vx
          n.y += n.vy
          n.phase += n.phaseSpeed
          if (n.x < 0) { n.vx = Math.abs(n.vx); n.x = 0 }
          else if (n.x > w) { n.vx = -Math.abs(n.vx); n.x = w }
          if (n.y < 0) { n.vy = Math.abs(n.vy); n.y = 0 }
          else if (n.y > h) { n.vy = -Math.abs(n.vy); n.y = h }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist2 = dx * dx + dy * dy
          if (dist2 < MAX_DIST * MAX_DIST) {
            const t = 1 - Math.sqrt(dist2) / MAX_DIST
            ctx.globalAlpha = t * t * 0.25
            ctx.lineWidth = t * 1.0
            ctx.strokeStyle = `rgb(${r},${g},${b})`
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
      for (const n of nodes) {
        const pulse = prefersReduced ? 1 : 0.75 + Math.sin(n.phase) * 0.25
        ctx.fillStyle = `rgba(${r},${g},${b},${0.30 + pulse * 0.10})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.5 + pulse * 0.8, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = () => {
      draw()
      if (!prefersReduced && isVisible) animId = requestAnimationFrame(loop)
    }

    loop()

    // Trigger CSS transition: two rAFs ensure initial opacity:0 is committed before we set opacity:1
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        canvas.style.opacity = '1'
      })
    )

    const onVisibility = () => {
      isVisible = !document.hidden
      if (isVisible && !prefersReduced) { cancelAnimationFrame(animId); loop() }
      else cancelAnimationFrame(animId)
    }
    document.addEventListener('visibilitychange', onVisibility)

    const themeObserver = new MutationObserver(() => { rgb = getPrimaryRgb() })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      themeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ opacity: 0, transition: 'opacity 1.5s ease 0.5s' }}
    />
  )
}
