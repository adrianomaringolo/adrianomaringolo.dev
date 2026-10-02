'use client'

import { segmentImages } from '@/components/demo-site'
import { slugify, useDemo, type SegmentKey } from '@/hooks/use-demo'
import { useLocale } from '@/hooks/use-locale'
import { cn } from '@/lib/utils'
import { useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { useEffect, useState, type CSSProperties } from 'react'

/*
 * The hero is the first frame of the build: the business name the visitor
 * types is the display type, on the same ink ground as the stage below, so
 * scrolling continues straight into the site being built under that name.
 * Until they type, the industry's example name types itself in, and the
 * industry's photo sits faded in the right corner, crossfading on change.
 */

const TYPE_STEP_MS = 55

// Walks `shown` toward `target` one character per tick: deletes back to the
// shared prefix, then types the rest, like someone retyping the name.
function useTypedText(target: string, enabled: boolean) {
  const [shown, setShown] = useState('')

  useEffect(() => {
    if (!enabled) return
    const id = window.setInterval(() => {
      setShown((s) => {
        if (s === target) return s
        return target.startsWith(s) ? target.slice(0, s.length + 1) : s.slice(0, -1)
      })
    }, TYPE_STEP_MS)
    return () => window.clearInterval(id)
  }, [target, enabled])

  return enabled ? shown : target
}

const rise = (delayMs: number): CSSProperties => ({ animationDelay: `${delayMs}ms` })

export function HeroSection() {
  const { t } = useLocale()
  const { name, setName, segmentKey, setSegmentKey, segment, segments, displayName } = useDemo()
  const reduced = useReducedMotion() ?? false
  const typed = useTypedText(segment.defaultName, !reduced)
  const [focused, setFocused] = useState(false)

  // Photos mount the first time their industry is picked, then stay mounted
  // so switching back and forth crossfades instead of reloading.
  const [seen, setSeen] = useState<SegmentKey[]>([segmentKey])
  const pickSegment = (key: SegmentKey) => {
    setSegmentKey(key)
    setSeen((current) => (current.includes(key) ? current : [...current, key]))
  }

  const liveName = name.trim() || typed
  // Shrink the name to fit one line: Geist semibold averages ~0.56em per
  // character, and the line never goes below 10 characters' worth of size.
  const chars = Math.max(displayName.length, 10)
  const nameStyle: CSSProperties = {
    fontSize: `min(clamp(3rem, 8vw, 6rem), calc(min(100vw - 2rem, 75rem) / ${(chars * 0.56).toFixed(2)}))`,
  }
  const nameType = 'leading-[1.05] font-semibold tracking-[-0.04em]'

  return (
    <section
      id="top"
      data-ground="stage"
      className="on-stage relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-stage px-4 pt-24 pb-10 text-stage-ink [caret-color:var(--volt)] sm:px-6 md:pt-28 lg:px-10 lg:pb-14"
    >
      <div aria-hidden className="hero-photo pointer-events-none absolute inset-y-0 right-0 -z-10 w-[70%] sm:w-[55%] lg:w-[48%]">
        {Array.from(new Set([...seen, segmentKey])).map((key) => {
          const active = key === segmentKey
          return (
            <img
              key={key}
              src={segmentImages[key]}
              alt=""
              className={cn(
                'absolute inset-0 h-full w-full object-cover saturate-[0.75] transition-[opacity,transform] ease-out-expo',
                active
                  ? 'scale-100 opacity-20 duration-[900ms,1800ms] lg:opacity-30'
                  : 'scale-[1.06] opacity-0 duration-[600ms,600ms]',
              )}
            />
          )
        })}
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
        <p className="hero-rise inline-flex items-center gap-2.5 text-sm text-stage-soft" style={rise(0)}>
          <span className="relative flex h-2 w-2">
            <span className="live-ping absolute inset-0 rounded-full bg-volt" />
            <span className="relative h-2 w-2 rounded-full bg-volt" />
          </span>
          {t('hero.availability')}
        </p>

        <div className="my-auto py-12 md:py-16">
          <label
            htmlFor="business-name"
            style={rise(80)}
            className="hero-rise block text-[clamp(1.35rem,2.6vw,2.25rem)] leading-tight font-medium tracking-[-0.025em] text-stage-soft"
          >
            {t('hero.namePrefix')}
            <span className="sr-only"> {t('hero.builderLabel')}</span>
          </label>

          <div className="hero-rise relative mt-2" style={{ ...nameStyle, ...rise(160) }}>
            <input
              id="business-name"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 40))}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              autoComplete="organization"
              spellCheck={false}
              aria-describedby="business-url"
              className={cn(
                nameType,
                'w-full border-b-2 border-stage-line bg-transparent pb-3 text-stage-ink outline-none transition-colors duration-300 hover:border-stage-soft focus:border-volt focus-visible:outline-none!',
              )}
            />
            {/* Placeholder the input can't draw: the example name typing itself, with a volt caret. */}
            {!name && (
              <span
                aria-hidden
                className={cn(nameType, 'pointer-events-none absolute inset-x-0 top-0 truncate whitespace-pre text-stage-soft/75')}
              >
                {typed}
                {!focused && (
                  <span className="caret ml-[0.04em] inline-block h-[0.82em] w-[0.06em] translate-y-[0.08em] bg-volt" />
                )}
              </span>
            )}
          </div>

          <p
            id="business-url"
            style={rise(240)}
            className="hero-rise mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stage-soft"
          >
            <span className="min-h-[1lh] font-mono text-stage-ink">{liveName && `${slugify(liveName)}.com.br`}</span>
            <a
              href="#como-funciona"
              className="group inline-flex items-center gap-1.5 underline decoration-stage-line underline-offset-4 hover:text-stage-ink hover:decoration-volt"
            >
              {t('hero.scrollHint')}
              <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-y-0.5" />
            </a>
          </p>

          <div
            role="radiogroup"
            aria-label={t('hero.segmentLabel')}
            style={rise(320)}
            className="hero-rise mt-8 flex flex-wrap gap-2"
          >
            {segments.map((s) => {
              const active = s.key === segmentKey
              return (
                <button
                  key={s.key}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => pickSegment(s.key)}
                  className={cn(
                    'flex items-center gap-2.5 rounded-lg border px-3.5 py-3 text-sm transition-[background-color,border-color,color,transform] duration-200 ease-out-expo active:scale-[0.97] sm:min-w-36',
                    active
                      ? 'border-volt bg-volt text-ink'
                      : 'border-stage-line bg-stage-raised/80 text-stage-ink backdrop-blur-sm hover:border-stage-soft',
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                      active ? 'border-ink bg-ink' : 'border-stage-soft',
                    )}
                  >
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-volt" />}
                  </span>
                  {s.label}
                </button>
              )
            })}
          </div>
        </div>

        <div
          style={rise(420)}
          className="hero-rise grid gap-6 border-t border-stage-line pt-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-16"
        >
          <h1 className="max-w-[24ch] text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-balance">
            {t('hero.headline')}
          </h1>
          <div>
            <p className="max-w-[52ch] text-base leading-relaxed text-stage-soft md:text-lg md:leading-relaxed">
              {t('hero.subline')}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="#contato"
                className="group inline-flex items-center gap-2 rounded-full bg-volt px-6 py-3.5 text-[15px] font-medium text-ink transition-[background-color,transform] duration-200 ease-out-expo hover:bg-volt-deep active:scale-[0.97]"
              >
                {t('hero.ctaPrimary')}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
              </a>
              <a
                href="#pacotes"
                className="text-[15px] font-medium underline decoration-stage-line underline-offset-4 hover:decoration-volt"
              >
                {t('hero.ctaSecondary')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
