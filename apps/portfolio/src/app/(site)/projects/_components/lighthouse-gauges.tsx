'use client'

import type { ProjectMetrics } from '@/types/project'
import { motion } from 'framer-motion'

/*
 * Lighthouse scores drawn the way the Lighthouse report draws them: a ring
 * filled to the score, colored by its band, with the number in the middle.
 * A metric counts as a Lighthouse score when its label mentions "Lighthouse"
 * and its value is "N / 100". Anything inside the label's parentheses after
 * "Lighthouse" (e.g. "Performance (Lighthouse, desktop)") is the qualifier.
 */

type Locale = 'pt-BR' | 'en-US'

export interface LighthouseScore {
  category: string
  qualifier: string
  score: number
  note?: string
}

const SCORE_PATTERN = /^\s*(\d{1,3})\s*\/\s*100\s*$/

function text(value: ProjectMetrics['value'] | undefined, locale: Locale) {
  if (!value) return undefined
  return typeof value === 'string' ? value : value[locale]
}

export function splitLighthouseMetrics(metrics: ProjectMetrics[], locale: Locale) {
  const scores: LighthouseScore[] = []
  const rest: ProjectMetrics[] = []

  for (const metric of metrics) {
    const label = metric.label[locale]
    const match = text(metric.value, locale)?.match(SCORE_PATTERN)
    if (!match || !/lighthouse/i.test(label)) {
      rest.push(metric)
      continue
    }
    const [, category = label, inner = ''] = label.match(/^(.*?)\s*\((.*)\)\s*$/) ?? []
    scores.push({
      category: category.trim(),
      qualifier: inner.replace(/lighthouse,?/i, '').trim(),
      score: Math.min(100, Number(match[1])),
      note: text(metric.improvement, locale),
    })
  }

  return { scores, rest }
}

// Lighthouse's own bands: 90–100 pass, 50–89 average, 0–49 fail.
function band(score: number) {
  if (score >= 90) return 'text-[#008800] dark:text-[#0cce6b] [--gauge:#0cce6b]'
  if (score >= 50) return 'text-[#c33300] dark:text-[#ffa400] [--gauge:#ffa400]'
  return 'text-[#cc0000] dark:text-[#ff4e42] [--gauge:#ff4e42]'
}

const RADIUS = 44
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

function Gauge({ score, delay }: { score: number; delay: number }) {
  return (
    <div className={`relative h-24 w-24 ${band(score)}`}>
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden>
        <circle cx="50" cy="50" r={RADIUS} className="fill-[var(--gauge)]/10" />
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          strokeWidth="8"
          className="stroke-[var(--gauge)]/15"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          strokeWidth="8"
          className="stroke-[var(--gauge)]"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: score / 100 }}
          transition={{ duration: 1.1, delay, ease }}
          viewport={{ once: true }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-mono text-[1.75rem] font-medium tabular-nums">
        {score}
      </span>
    </div>
  )
}

export function LighthouseGauges({ scores }: { scores: LighthouseScore[] }) {
  // A qualifier shared by every score goes in the caption instead of under each gauge.
  const shared = scores.every((s) => s.qualifier === scores[0].qualifier)
    ? scores[0].qualifier
    : ''

  return (
    <div>
      <p className="text-xs tracking-[0.2em] text-muted-foreground/70 uppercase font-mono">
        Lighthouse{shared && ` · ${shared}`}
      </p>
      <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-8">
        {scores.map((s, i) => (
          <li
            key={`${s.category}-${i}`}
            className="flex w-28 flex-col items-center text-center"
          >
            <Gauge score={s.score} delay={0.15 + i * 0.12} />
            <p className="mt-3 text-sm font-medium leading-snug text-foreground">
              {s.category}
            </p>
            {!shared && s.qualifier && (
              <p className="text-xs text-muted-foreground/70">{s.qualifier}</p>
            )}
            {s.note && (
              <p className="mt-0.5 text-xs text-muted-foreground/70">{s.note}</p>
            )}
            <span className="sr-only">{`${s.score} / 100`}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
