'use client'

import { NetworkDiagram, phaseAt, visibleAt } from '@/components/network-diagram'
import { useLocale } from '@/hooks/use-locale'
import { cn } from '@/lib/utils'
import { animate, useMotionValue, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { ArrowRight, Plus, RotateCcw } from 'lucide-react'
import { useEffect, useId, useState } from 'react'

type FaqItem = { key: string; question: string; answer?: string }
type Reason = { title: string; description: string }

export function FaqSection() {
  const { t, raw } = useLocale()
  const items = raw<FaqItem[]>('faq.items') ?? []
  const reasons = raw<Reason[]>('why.reasons') ?? []
  const [open, setOpen] = useState<string | null>(null)
  // Bumped on every open of the "why" item so its animation replays from zero.
  const [whyRun, setWhyRun] = useState(0)

  const toggle = (key: string) => {
    const opening = open !== key
    setOpen(opening ? key : null)
    if (opening && key === 'why') setWhyRun((n) => n + 1)
  }

  // FAQPage structured data: the page promises AEO/GEO, so it practices it.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer ?? reasons.map((r) => `${r.title}. ${r.description}`).join(' '),
      },
    })),
  }

  return (
    <section id="perguntas" aria-labelledby="faq-heading" className="border-t border-line px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2
            id="faq-heading"
            className="max-w-[12ch] text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance"
          >
            {t('faq.headline')}
          </h2>
          <p className="mt-6 text-ink-soft">{t('faq.more')}</p>
          <a
            href="#contato"
            className="mt-2 inline-flex items-center gap-1.5 text-[15px] font-medium underline decoration-line-strong hover:decoration-ink"
          >
            {t('faq.moreCta')}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <ul className="border-t border-line">
          {items.map((item) => (
            <AccordionItem
              key={item.key}
              question={item.question}
              open={open === item.key}
              onToggle={() => toggle(item.key)}
            >
              {item.key === 'why' ? (
                <WhyAnswer key={whyRun} reasons={reasons} active={open === 'why'} />
              ) : (
                <p className="max-w-[62ch] text-[17px] leading-relaxed text-ink-soft">{item.answer}</p>
              )}
            </AccordionItem>
          ))}
        </ul>
      </div>
    </section>
  )
}

function AccordionItem({
  question,
  open,
  onToggle,
  children,
}: {
  question: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  const id = useId()
  return (
    <li className="border-b border-line">
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium tracking-tight sm:text-xl"
        >
          {question}
          <span
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color,transform] duration-300 ease-out-expo',
              open ? 'rotate-45 border-ink bg-ink text-paper' : 'border-line-strong group-hover:border-ink',
            )}
          >
            <Plus className="h-4 w-4" />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
        inert={!open}
      >
        <div className="overflow-hidden">
          <div className="pb-8">{children}</div>
        </div>
      </div>
    </li>
  )
}

/*
 * The post-18 network diagram, played on a timer when the question opens
 * (no scroll needed): channels connect, then dim (rented), then people flow
 * into the site. The three reasons highlight in step with the phases.
 */
function WhyAnswer({ reasons, active }: { reasons: Reason[]; active: boolean }) {
  const { t } = useLocale()
  const reduced = useReducedMotion()
  const p = useMotionValue(0)
  const [phase, setPhase] = useState(0)
  const [visible, setVisible] = useState(0)
  const [run, setRun] = useState(0)

  useMotionValueEvent(p, 'change', (v) => {
    setPhase(phaseAt(v))
    setVisible(visibleAt(v))
  })

  useEffect(() => {
    if (!active) return
    if (reduced) {
      p.set(1)
      return
    }
    p.set(0)
    const controls = animate(p, 1, { duration: 7.5, ease: 'linear', delay: 0.35 })
    return () => controls.stop()
  }, [active, reduced, run, p])

  return (
    <div className="grid items-center gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:gap-10">
      <div className="mx-auto w-full max-w-[19rem] sm:max-w-[26rem]">
        <NetworkDiagram phase={phase} p={p} visible={visible} />
      </div>
      <div>
        <ol className="space-y-5">
          {reasons.map((r, i) => (
            <li
              key={r.title}
              aria-current={i === phase ? 'step' : undefined}
              className={cn('transition-opacity duration-500 ease-out-expo', i <= phase ? 'opacity-100' : 'opacity-35')}
            >
              <p className="flex items-baseline gap-2.5 font-medium tracking-tight">
                <span
                  aria-hidden
                  className={cn(
                    'relative top-[-1px] h-2 w-2 shrink-0 rounded-full transition-colors duration-500',
                    i === phase ? (phase === 2 ? 'bg-volt-deep' : 'bg-ink') : 'bg-line-strong',
                  )}
                />
                {r.title}
              </p>
              <p className="mt-1 pl-[1.125rem] text-[15px] leading-relaxed text-ink-soft">{r.description}</p>
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={() => setRun((n) => n + 1)}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft underline decoration-line-strong hover:text-ink hover:decoration-ink"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {t('faq.replay')}
        </button>
      </div>
    </div>
  )
}
