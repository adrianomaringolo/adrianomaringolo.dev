'use client'

import { useLocale } from '@/hooks/use-locale'
import { cn } from '@/lib/utils'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import { Bot, Mail, MessageCircle, Monitor, Search, Star, Users } from 'lucide-react'
import type { ComponentType } from 'react'

/*
 * The network diagram from Instagram post-18 (slide 06): the site at the
 * center, seven channels around it. A progress value `p` (0..1) draws each
 * channel's line and node in; phase 1 dims the channels (rented ground)
 * while the site holds; phase 2 flows people down every line into the site,
 * which lights up volt. The FAQ drives `p` with a timed animation.
 */

type IconProps = { className?: string; strokeWidth?: number }

// lucide-react v1 dropped brand icons; this is lucide's own Instagram path.
function InstagramIcon({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

// Node centers on a 720-unit square, same heptagon as the post.
const CENTER = { x: 360, y: 360 }
export const NODES: { x: number; y: number; icon: ComponentType<IconProps> }[] = [
  { x: 360, y: 80, icon: Search },
  { x: 579, y: 185, icon: InstagramIcon },
  { x: 633, y: 422, icon: MessageCircle },
  { x: 482, y: 612, icon: Star },
  { x: 239, y: 612, icon: Bot },
  { x: 87, y: 422, icon: Users },
  { x: 141, y: 185, icon: Mail },
]

// Progress boundaries of the three phases.
const PHASE_STARTS = [0, 0.46, 0.7] as const
export const nodeStart = (i: number) => 0.08 + i * 0.045

export function phaseAt(p: number) {
  let index = 0
  PHASE_STARTS.forEach((start, i) => {
    if (p >= start) index = i
  })
  return index
}

/** How many nodes are shown at progress `p`. */
export function visibleAt(p: number) {
  return NODES.filter((_, i) => p >= nodeStart(i) + 0.03).length
}

export function NetworkDiagram({ phase, p, visible }: { phase: number; p?: MotionValue<number>; visible: number }) {
  const { t, tList } = useLocale()
  const labels = tList('why.nodes')
  const converting = phase === 2
  const rented = phase === 1

  return (
    <div role="img" aria-label={t('why.diagramLabel')} className="relative aspect-square w-full">
      <svg viewBox="0 0 720 720" fill="none" className="absolute inset-0 h-full w-full" aria-hidden>
        {NODES.map((node, i) => (
          <Line key={i} node={node} i={i} p={p} dim={rented} />
        ))}
        {/* People flowing from every channel into the site. */}
        {NODES.map((node, i) => (
          <line
            key={`flow-${i}`}
            x1={node.x}
            y1={node.y}
            x2={CENTER.x}
            y2={CENTER.y}
            pathLength={1}
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray="0.001 0.11"
            className={cn('flow-dots stroke-ink transition-opacity duration-700', converting ? 'opacity-100' : 'opacity-0')}
            style={{ animationDelay: `${i * -0.23}s` }}
          />
        ))}
      </svg>

      {NODES.map((node, i) => (
        <Node key={i} node={node} shown={i < visible} label={labels[i]} dim={rented} />
      ))}

      <div
        className={cn(
          'absolute flex flex-col items-center justify-center gap-1.5 rounded-full transition-[background-color,color,box-shadow] duration-700 ease-out-expo',
          converting
            ? 'bg-volt text-ink shadow-[0_18px_44px_-10px_oklch(0.8_0.2_125/0.55)]'
            : 'bg-ink text-paper shadow-[0_18px_44px_-14px_oklch(0.2_0.01_265/0.45)]',
        )}
        style={{ width: '22%', height: '22%', left: '39%', top: '39%' }}
      >
        {rented && <span aria-hidden className="absolute -inset-[9%] rounded-full border-2 border-dashed border-ink/25" />}
        <Monitor className="h-[26%] w-[26%]" strokeWidth={1.75} />
        <span className="text-[clamp(0.7rem,1.4vw,1rem)] font-semibold tracking-tight">{t('why.center')}</span>
      </div>
    </div>
  )
}

function Line({ node, i, p, dim }: { node: (typeof NODES)[number]; i: number; p?: MotionValue<number>; dim: boolean }) {
  const start = nodeStart(i)
  const fallback = useTransform(() => 0)
  const offset = useTransform(p ?? fallback, [start, start + 0.05], [1, 0])

  return (
    <g className={cn('transition-opacity duration-700', dim ? 'opacity-35' : 'opacity-100')}>
      {/* Faint full-length guide, then the drawn line on top. */}
      <line x1={CENTER.x} y1={CENTER.y} x2={node.x} y2={node.y} className="stroke-line" strokeWidth={2} />
      <motion.line
        x1={CENTER.x}
        y1={CENTER.y}
        x2={node.x}
        y2={node.y}
        pathLength={1}
        strokeWidth={2.5}
        strokeLinecap="round"
        className="stroke-ink-soft"
        strokeDasharray="1 1"
        style={{ strokeDashoffset: p ? offset : 0 }}
      />
    </g>
  )
}

// Visibility is a prop + CSS transition rather than motion-driven opacity:
// framer's accelerated opacity got stuck half-transparent on these nodes.
function Node({ node, shown, label, dim }: { node: (typeof NODES)[number]; shown: boolean; label: string; dim: boolean }) {
  const Icon = node.icon
  const size = 15.5

  return (
    <div
      style={{
        width: `${size}%`,
        height: `${size}%`,
        left: `${(node.x / 720) * 100 - size / 2}%`,
        top: `${(node.y / 720) * 100 - size / 2}%`,
      }}
      className={cn(
        'absolute transition-[opacity,transform] duration-500 ease-out-expo',
        shown ? 'scale-100 opacity-100' : 'scale-75 opacity-0',
      )}
    >
      <div className="h-full w-full rounded-full bg-paper">
        <div
          className={cn(
            'flex h-full w-full flex-col items-center justify-center gap-[6%] rounded-full border border-line bg-surface text-ink shadow-[0_10px_26px_-10px_oklch(0.2_0.01_265/0.22)] transition-opacity duration-700',
            dim && 'opacity-45',
          )}
        >
          <Icon className="h-[26%] w-[26%]" strokeWidth={1.75} />
          <span className="max-w-[86%] text-center text-[clamp(0.5rem,0.9vw,0.72rem)] leading-tight font-medium">
            {label}
          </span>
        </div>
      </div>
    </div>
  )
}
