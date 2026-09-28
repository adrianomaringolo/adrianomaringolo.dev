'use client'

import { DemoSite } from '@/components/demo-site'
import { slugify, useDemo } from '@/hooks/use-demo'
import { useLocale } from '@/hooks/use-locale'
import { cn } from '@/lib/utils'
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { ArrowRight, Check, Lock } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

/*
 * The page's one authored motion moment. A tall section pins a frame
 * (browser on desktop, phone on mobile) and scroll progress walks the four
 * real process steps: notes from the conversation, the written proposal,
 * wireframe -> code -> design, then the site going live under the visitor's
 * own business name. Everything is derived from one progress value `p`.
 */

// Scroll-progress boundaries of each step. Keep in sync with the timelines below.
const STEP_STARTS = [0, 0.26, 0.48, 0.78] as const

type Step = { title: string; description: string }

function stepAt(p: number) {
  let index = 0
  STEP_STARTS.forEach((start, i) => {
    if (p >= start) index = i
  })
  return index
}

function useIsDesktop() {
  const [desktop, setDesktop] = useState(true)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return desktop
}

export function BuildStage() {
  const reduced = useReducedMotion()
  const { t, raw } = useLocale()
  const steps = raw<Step[]>('stage.steps') ?? []

  if (reduced) return <StaticStage steps={steps} headline={t('stage.headline')} />
  return <AnimatedStage steps={steps} />
}

function AnimatedStage({ steps }: { steps: Step[] }) {
  const { t } = useLocale()
  const ref = useRef<HTMLElement>(null)
  const desktop = useIsDesktop()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0)
  const [live, setLive] = useState(false)
  const [done, setDone] = useState(false)

  useMotionValueEvent(p, 'change', (v) => {
    setActive(stepAt(v))
    setLive(v >= 0.8)
    setDone(v >= 0.9)
  })

  const railFill = useTransform(p, [0, 0.92], [0, 1])

  return (
    <section
      ref={ref}
      id="como-funciona"
      data-ground="stage"
      aria-labelledby="stage-heading"
      className="on-stage relative h-[460vh] bg-stage text-stage-ink lg:h-[520vh]"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden px-4 pt-20 pb-6 sm:px-6 lg:px-10 lg:pt-24 lg:pb-10">
        <div className="mx-auto grid h-full w-full max-w-7xl min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-5 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.6fr)] lg:grid-rows-1 lg:gap-14">
          {/* Step rail: desktop shows all four, mobile shows only the active one below the frame. */}
          <div className="hidden flex-col justify-center lg:flex">
            <h2 id="stage-heading" className="text-[clamp(2rem,3.2vw,3rem)] leading-[1.02] font-semibold tracking-[-0.03em]">
              {t('stage.headline')}
            </h2>
            <ol className="relative mt-10 space-y-7 pl-6">
              <span aria-hidden className="absolute top-1 bottom-1 left-0 w-px bg-stage-line" />
              <motion.span
                aria-hidden
                className="absolute top-1 bottom-1 left-0 w-px origin-top bg-volt"
                style={{ scaleY: railFill }}
              />
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  aria-current={i === active ? 'step' : undefined}
                  className={cn(
                    'transition-opacity duration-500 ease-out-expo',
                    i === active ? 'opacity-100' : i < active ? 'opacity-45' : 'opacity-30',
                  )}
                >
                  <p className="text-lg font-medium tracking-tight">{step.title}</p>
                  <p
                    className={cn(
                      'grid text-[15px] leading-relaxed text-stage-soft transition-[grid-template-rows,opacity,margin] duration-500 ease-out-expo',
                      i === active ? 'mt-1.5 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                    )}
                  >
                    <span className="overflow-hidden">{step.description}</span>
                  </p>
                </li>
              ))}
            </ol>
            {/* Once the demo is live: it's an example, theirs will be one of a kind. */}
            <div
              className={cn(
                'mt-10 transition-[opacity,transform] duration-700 ease-out-expo',
                done ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
              )}
            >
              <p className="max-w-[30ch] text-xl leading-snug font-medium tracking-tight text-balance">
                {t('stage.closing')}
              </p>
              <ClosingCta />
            </div>
          </div>

          {/* Visual copy of #stage-heading for mobile; the section stays labelled by that one h2. */}
          <p aria-hidden className="text-2xl leading-tight font-semibold tracking-[-0.03em] lg:hidden">
            {t('stage.headline')}
          </p>

          <div className="relative flex min-h-0 items-center justify-center">
            {desktop ? <BrowserFrame p={p} live={live} /> : <PhoneFrame p={p} live={live} />}
            <Overlays p={p} desktop={desktop} />
          </div>

          <div className="min-h-[7.5rem] lg:hidden" aria-live="polite">
            <div className="mb-3 flex gap-1.5">
              {steps.map((step, i) => (
                <span
                  key={step.title}
                  className={cn('h-0.5 flex-1 rounded-full transition-colors duration-500', i <= active ? 'bg-volt' : 'bg-stage-line')}
                />
              ))}
            </div>
            {done ? (
              <>
                <p className="text-base leading-snug font-medium text-balance">{t('stage.closing')}</p>
                <ClosingCta />
              </>
            ) : (
              <>
                <p className="text-base font-medium">{steps[active]?.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-stage-soft">{steps[active]?.description}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function ClosingCta() {
  const { t } = useLocale()
  return (
    <a
      href="#contato"
      className="group mt-4 inline-flex items-center gap-1.5 rounded-full bg-volt px-4 py-2 text-[15px] font-medium text-ink transition-[background-color,transform] duration-200 ease-out-expo hover:bg-volt-deep active:scale-[0.97]"
    >
      {t('stage.closingCta')}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
    </a>
  )
}

/* ------------------------------------------------------------------ frames */

function UrlBar({ live, compact = false }: { live: boolean; compact?: boolean }) {
  const { t } = useLocale()
  const { displayName } = useDemo()
  const url = `${slugify(displayName)}.com.br`

  return (
    <div
      className={cn(
        'flex min-w-0 items-center gap-1.5 rounded-full font-mono transition-colors duration-500',
        compact ? 'h-6 px-2.5 text-[10px]' : 'h-7 px-3 text-xs',
        live ? 'bg-volt text-ink' : 'bg-stage-raised text-stage-soft',
      )}
    >
      {live ? <Lock className="h-3 w-3 shrink-0" /> : null}
      <span className="truncate">{live ? `https://${url}` : 'localhost:3000'}</span>
      {!compact && (
        <span className={cn('ml-auto shrink-0 pl-3 font-sans text-[11px]', live ? 'text-ink/70' : 'text-stage-soft/70')}>
          {t('stage.demoLabel')}
        </span>
      )}
    </div>
  )
}

function Layers({ p, variant }: { p: MotionValue<number>; variant: 'desktop' | 'mobile' }) {
  const wireOpacity = useTransform(p, [0.44, 0.5], [0, 1])
  const reveal = useTransform(p, [0.56, 0.75], [100, 0])
  const clip = useMotionTemplate`inset(0 ${reveal}% 0 0)`
  const scanLeft = useMotionTemplate`${useTransform(reveal, (r) => 100 - r)}%`
  const scanOpacity = useTransform(p, [0.55, 0.57, 0.74, 0.76], [0, 1, 1, 0])

  return (
    <div className="@container relative h-full w-full overflow-hidden bg-[#f7f8fa]">
      <motion.div className="absolute inset-0" style={{ opacity: wireOpacity }}>
        <DemoSite variant={variant} wire />
      </motion.div>
      <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
        <DemoSite variant={variant} />
      </motion.div>
      <motion.span
        aria-hidden
        className="absolute top-0 bottom-0 w-0.5 -translate-x-1/2 bg-volt-deep shadow-[2px_0_12px_oklch(0.8_0.2_125/0.5)]"
        style={{ left: scanLeft, opacity: scanOpacity }}
      />
    </div>
  )
}

function BrowserFrame({ p, live }: { p: MotionValue<number>; live: boolean }) {

  return (
    <div className="relative w-full max-w-[min(100%,calc((100svh-12rem)*1.6))]">
      <div
        role="img"
        aria-label="Demo"
        className="overflow-hidden rounded-xl border border-stage-line bg-stage-raised shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)]"
      >
        <div className="flex items-center gap-3 border-b border-stage-line px-3.5 py-2.5">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-stage-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-stage-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-stage-line" />
          </div>
          <div className="min-w-0 flex-1">
            <UrlBar live={live} />
          </div>
        </div>
        <div className="aspect-[16/10]">
          <Layers p={p} variant="desktop" />
        </div>
      </div>

      {/* Driven by the `live` state, not scroll-linked opacity: the accelerated
          scroll timeline left it stuck half-transparent. */}
      <div
        aria-hidden
        className={cn(
          'transition-[opacity,transform] delay-150 duration-700 ease-out-expo',
          live ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0',
        )}
      >
      <div
        className="absolute -right-3 -bottom-8 w-[22%] min-w-[120px] overflow-hidden rounded-[1.6rem] border-[5px] border-[#23262e] bg-[#23262e] shadow-[0_24px_60px_-12px_rgb(0_0_0/0.7)] xl:-right-8"
      >
        <div className="aspect-[9/19] overflow-hidden rounded-[1.2rem]">
          <Layers p={p} variant="mobile" />
        </div>
      </div>
      </div>
    </div>
  )
}

function PhoneFrame({ p, live }: { p: MotionValue<number>; live: boolean }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <div className="w-[min(78vw,20rem)]">
        <UrlBar live={live} compact />
      </div>
      <div
        role="img"
        aria-label="Demo"
        className="aspect-[9/17] h-[min(100%,34rem)] max-h-full overflow-hidden rounded-[1.8rem] border-[6px] border-[#23262e] bg-[#23262e] shadow-[0_24px_60px_-12px_rgb(0_0_0/0.7)]"
      >
        <div className="h-full overflow-hidden rounded-[1.35rem]">
          <Layers p={p} variant="mobile" />
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- overlays */

function Reveal({ p, at, children, className }: { p: MotionValue<number>; at: number; children: ReactNode; className?: string }) {
  const opacity = useTransform(p, [at, at + 0.025], [0, 1])
  const y = useTransform(p, [at, at + 0.025], [8, 0])
  return (
    <motion.div style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  )
}

// Timeline offsets must stay inside [0, 1] (framer hands them to WAAPI), so a
// card that should stay on screen until the end passes `persist` instead of
// an exit range past 1.
function useCard(
  p: MotionValue<number>,
  [inStart, inEnd, outStart, outEnd]: [number, number, number, number],
  persist = false,
) {
  const opacity = useTransform(p, [inStart, inEnd, outStart, outEnd], [0, 1, 1, persist ? 1 : 0])
  const y = useTransform(p, [inStart, inEnd, outStart, outEnd], [28, 0, 0, persist ? 0 : -28])
  const scale = useTransform(p, [inStart, inEnd], [0.97, 1])
  const visibility = useTransform(p, (v) => (v < inStart || (!persist && v > outEnd) ? 'hidden' : 'visible'))
  return { opacity, y, scale, visibility }
}

function Overlays({ p, desktop }: { p: MotionValue<number>; desktop: boolean }) {
  const { t } = useLocale()
  const { segment, displayName } = useDemo()

  const brief = useCard(p, [0.03, 0.08, 0.23, 0.27])
  const proposal = useCard(p, [0.27, 0.32, 0.45, 0.49])
  const code = useCard(p, [0.48, 0.52, 0.74, 0.78])
  const toast = useCard(p, [0.8, 0.84, 0.99, 1], true)

  const card = 'absolute rounded-xl border border-line bg-surface text-ink shadow-[0_20px_50px_-16px_rgb(0_0_0/0.55)]'
  const pkg = segment.package

  const codeLines = [
    ['k', 'export default function Home() {'],
    ['', '  return ('],
    ['', '    <>'],
    ['t', `      <Hero title="${segment.headline}"`],
    ['t', `        cta="${segment.cta}" />`],
    ['t', `      <Services items={${JSON.stringify(segment.services)}} />`],
    ['t', `      <Contact whatsapp brand="${displayName}" />`],
    ['', '    </>'],
    ['', '  )'],
    ['', '}'],
  ] as const
  const codeStart = 0.5
  const codeStep = 0.2 / codeLines.length

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <motion.div
        style={brief}
        className={cn(card, 'w-[min(88%,26rem)] p-5 sm:p-6', desktop ? 'top-[14%] left-[8%]' : 'top-[18%]')}
      >
        <p className="font-mono text-[11px] tracking-wide text-ink-soft uppercase">{t('stage.brief.title')}</p>
        <dl className="mt-4 space-y-3 text-[15px]">
          {[
            [t('stage.brief.business'), displayName],
            [t('stage.brief.audience'), segment.audience],
            [t('stage.brief.goal'), segment.goal],
          ].map(([label, value], i) => (
            <Reveal key={label} p={p} at={0.08 + i * 0.04} className="grid grid-cols-[7.5rem_1fr] gap-3 border-t border-line pt-3">
              <dt className="text-ink-soft">{label}</dt>
              <dd className="font-medium">{value}</dd>
            </Reveal>
          ))}
        </dl>
      </motion.div>

      <motion.div
        style={proposal}
        className={cn(card, 'w-[min(88%,27rem)] p-5 sm:p-6', desktop ? 'top-[16%] right-[8%]' : 'top-[16%]')}
      >
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-lg font-semibold tracking-tight">{t('stage.proposal.title')}</p>
          <p className="truncate font-mono text-xs text-ink-soft">{displayName}</p>
        </div>
        <dl className="mt-4 text-[15px]">
          {[
            [t('stage.proposal.scope'), t(`packages.scopeShort.${pkg}`)],
            [t('stage.proposal.deadline'), t(`packages.deadlineShort.${pkg}`)],
            [t('stage.proposal.value'), t('stage.proposal.valueText')],
            [t('stage.proposal.care'), t('stage.proposal.careText')],
          ].map(([label, value], i) => (
            <Reveal key={label} p={p} at={0.32 + i * 0.025} className="flex items-center justify-between gap-4 border-t border-line py-3">
              <dt className="text-ink-soft">{label}</dt>
              <dd className="flex items-center gap-2 text-right font-medium">
                {value}
                <Check className="h-4 w-4 shrink-0 text-ok" />
              </dd>
            </Reveal>
          ))}
        </dl>
        <Reveal p={p} at={0.42} className="mt-3 flex justify-end">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-volt px-3 py-1 text-sm font-medium text-ink">
            <Check className="h-3.5 w-3.5" />
            {t('stage.proposal.approved')}
          </span>
        </Reveal>
      </motion.div>

      <motion.div
        style={code}
        className={cn(
          'absolute overflow-hidden rounded-xl border border-stage-line bg-[#0b0d12] shadow-[0_24px_60px_-16px_rgb(0_0_0/0.7)]',
          desktop ? 'bottom-[6%] left-[-4%] w-[min(62%,34rem)]' : 'bottom-[4%] w-[94%]',
        )}
      >
        <div className="flex items-center justify-between border-b border-stage-line px-4 py-2 font-mono text-[11px] text-stage-soft">
          <span>app/page.tsx</span>
          <span>{t('stage.code')}</span>
        </div>
        <pre className="overflow-hidden px-4 py-3 font-mono text-[11px] leading-[1.7] sm:text-xs">
          {codeLines.map(([kind, text], i) => (
            <Reveal key={i} p={p} at={codeStart + i * codeStep} className="truncate">
              <code
                className={cn(
                  kind === 'k' && 'text-[#c4a7ff]',
                  kind === 't' && 'text-[#b9e36b]',
                  kind === '' && 'text-stage-soft',
                )}
              >
                {text}
              </code>
            </Reveal>
          ))}
        </pre>
      </motion.div>

      <motion.div
        style={toast}
        role="status"
        className={cn(
          'absolute flex items-center gap-3 rounded-xl border border-stage-line bg-stage-raised px-4 py-3 text-stage-ink shadow-[0_20px_50px_-16px_rgb(0_0_0/0.7)]',
          desktop ? 'bottom-[14%] left-[-4%]' : 'bottom-[6%]',
        )}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="live-ping absolute inset-0 rounded-full bg-volt" />
          <span className="relative h-2.5 w-2.5 rounded-full bg-volt" />
        </span>
        <span>
          <span className="block text-sm font-medium">{t('stage.launched')}</span>
          <span className="block text-xs text-stage-soft">{t('stage.launchedDetail')}</span>
        </span>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------ reduced motion */

function StaticStage({ steps, headline }: { steps: Step[]; headline: string }) {
  return (
    <section
      id="como-funciona"
      data-ground="stage"
      className="on-stage bg-stage px-4 py-24 text-stage-ink sm:px-6 lg:px-10"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.6fr)] lg:items-center">
        <div>
          <h2 className="text-[clamp(2rem,3.2vw,3rem)] leading-[1.02] font-semibold tracking-[-0.03em]">{headline}</h2>
          <ol className="mt-10 space-y-6">
            {steps.map((step) => (
              <li key={step.title}>
                <p className="text-lg font-medium">{step.title}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-stage-soft">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="overflow-hidden rounded-xl border border-stage-line bg-stage-raised">
          <div className="border-b border-stage-line px-3.5 py-2.5">
            <UrlBar live />
          </div>
          <div className="@container aspect-[16/10]">
            <DemoSite />
          </div>
        </div>
      </div>
    </section>
  )
}
