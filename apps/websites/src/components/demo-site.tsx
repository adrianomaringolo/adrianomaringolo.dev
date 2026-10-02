'use client'

import { useDemo, type SegmentKey } from '@/hooks/use-demo'
import { cn } from '@/lib/utils'
import { ArrowRight, Menu } from 'lucide-react'

/*
 * The fictional client site assembled inside the scroll stage. Everything is
 * sized in container-query units (cqw) so the same markup scales with the
 * browser/phone frame around it. Each industry gets its own palette and type,
 * because the point being demonstrated is "made for your content".
 */

interface DemoTheme {
  bg: string
  ink: string
  soft: string
  accent: string
  accentInk: string
  tile: string
  serif: boolean
  image: string
}

const themes: Record<SegmentKey, DemoTheme> = {
  saude: {
    bg: '#f2f6f3',
    ink: '#15302a',
    soft: '#4d6a61',
    accent: '#2c7a58',
    accentInk: '#ffffff',
    tile: '#e3ece6',
    serif: true,
    image: '/images/demo-saude.webp',
  },
  alimentacao: {
    bg: '#faf1e6',
    ink: '#3a2214',
    soft: '#7a5a45',
    accent: '#b9541f',
    accentInk: '#ffffff',
    tile: '#f1e2cf',
    serif: true,
    image: '/images/demo-alimentacao.webp',
  },
  comercio: {
    bg: '#fbeef1',
    ink: '#3a1530',
    soft: '#7d4d68',
    accent: '#b3305f',
    accentInk: '#ffffff',
    tile: '#f4dde4',
    serif: true,
    image: '/images/demo-comercio.webp',
  },
  startup: {
    bg: '#0e1330',
    ink: '#eef0ff',
    soft: '#a3a9d6',
    accent: '#7b86ff',
    accentInk: '#0e1330',
    tile: '#1a2150',
    serif: false,
    image: '/images/demo-startup.webp',
  },
  portfolio: {
    bg: '#f3f1ec',
    ink: '#1b1a17',
    soft: '#6a655c',
    accent: '#1b1a17',
    accentInk: '#f3f1ec',
    tile: '#e6e2d9',
    serif: true,
    image: '/images/demo-portfolio.webp',
  },
}

/** Each industry's photo, also shown faded behind the hero. */
export const segmentImages = Object.fromEntries(
  Object.entries(themes).map(([key, theme]) => [key, theme.image]),
) as Record<SegmentKey, string>

const wireInk = '#c9cdd6'
const wireFill = '#e6e8ee'

function Bar({ w, h = 1.1, className }: { w: string; h?: number; className?: string }) {
  return (
    <span
      className={cn('block rounded-[0.4cqw]', className)}
      style={{ width: w, height: `${h}cqw`, background: wireInk }}
    />
  )
}

export function DemoSite({ variant = 'desktop', wire = false }: { variant?: 'desktop' | 'mobile'; wire?: boolean }) {
  const { segment, displayName } = useDemo()
  const theme = themes[segment.key]
  const mobile = variant === 'mobile'

  const bg = wire ? '#f7f8fa' : theme.bg
  const headlineFont = theme.serif ? 'font-serif font-normal tracking-[-0.01em]' : 'font-sans font-semibold tracking-[-0.03em]'

  if (mobile) {
    return (
      <div className="h-full w-full overflow-hidden" style={{ background: bg, color: theme.ink }}>
        <div className="flex items-center justify-between px-[6cqw] py-[5cqw]">
          {wire ? (
            <Bar w="38cqw" h={4} />
          ) : (
            <span className={cn('truncate text-[5.6cqw] leading-none', headlineFont)}>{displayName}</span>
          )}
          {wire ? (
            <span className="h-[5cqw] w-[6cqw] rounded-[1cqw]" style={{ background: wireInk }} />
          ) : (
            <Menu className="h-[6cqw] w-[6cqw] shrink-0" />
          )}
        </div>
        <div className="mx-[6cqw] aspect-[4/3] overflow-hidden rounded-[3cqw]" style={{ background: wireFill }}>
          {!wire && <img src={theme.image} alt="" className="h-full w-full object-cover" />}
        </div>
        <div className="px-[6cqw] pt-[6cqw]">
          {wire ? (
            <div className="space-y-[2.4cqw]">
              <Bar w="80cqw" h={6} />
              <Bar w="60cqw" h={6} />
              <Bar w="70cqw" h={2.6} className="mt-[4cqw]" />
            </div>
          ) : (
            <>
              <p className={cn('text-[9.5cqw] leading-[1.02]', headlineFont)}>{segment.headline}</p>
              <p className="mt-[3.5cqw] text-[4cqw] leading-snug" style={{ color: theme.soft }}>
                {segment.sub}
              </p>
            </>
          )}
          <span
            className="mt-[6cqw] flex h-[12cqw] items-center justify-center rounded-full text-[4.2cqw] font-medium"
            style={{ background: wire ? wireInk : theme.accent, color: theme.accentInk }}
          >
            {!wire && segment.cta}
          </span>
          <div className="mt-[6cqw] grid grid-cols-2 gap-[3cqw]">
            {segment.services.slice(0, 2).map((service) => (
              <div
                key={service}
                className="h-[22cqw] rounded-[3cqw] p-[3.5cqw] text-[3.8cqw] font-medium"
                style={{ background: wire ? wireFill : theme.tile }}
              >
                {wire ? <Bar w="18cqw" h={2.4} /> : service}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full overflow-hidden" style={{ background: bg, color: theme.ink }}>
      <div className="flex items-center justify-between px-[4cqw] py-[2.2cqw]">
        {wire ? (
          <Bar w="16cqw" h={1.8} />
        ) : (
          <span className={cn('max-w-[34cqw] truncate text-[2.3cqw] leading-none', headlineFont)}>
            {displayName}
          </span>
        )}
        <div className="flex items-center gap-[2.6cqw]">
          {segment.nav.map((item) =>
            wire ? (
              <Bar key={item} w="6cqw" h={0.9} />
            ) : (
              <span key={item} className="text-[1.25cqw]" style={{ color: theme.soft }}>
                {item}
              </span>
            ),
          )}
          <span
            className="flex h-[3.4cqw] items-center rounded-full px-[1.8cqw] text-[1.2cqw] font-medium"
            style={{ background: wire ? wireInk : theme.accent, color: theme.accentInk, minWidth: '10cqw' }}
          >
            {!wire && segment.cta}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[1.05fr_1fr] items-center gap-[4cqw] px-[4cqw] pt-[2.5cqw]">
        <div>
          {wire ? (
            <div className="space-y-[1.4cqw]">
              <Bar w="38cqw" h={3.6} />
              <Bar w="30cqw" h={3.6} />
              <Bar w="34cqw" h={1.3} className="mt-[3cqw]" />
              <Bar w="26cqw" h={1.3} />
            </div>
          ) : (
            <>
              <p className={cn('text-[4.9cqw] leading-[1.02]', headlineFont)}>{segment.headline}</p>
              <p className="mt-[2cqw] max-w-[36cqw] text-[1.55cqw] leading-snug" style={{ color: theme.soft }}>
                {segment.sub}
              </p>
            </>
          )}
          <span
            className="mt-[3cqw] inline-flex h-[4.4cqw] items-center rounded-full px-[2.6cqw] text-[1.45cqw] font-medium"
            style={{ background: wire ? wireInk : theme.accent, color: theme.accentInk, minWidth: '16cqw' }}
          >
            {!wire && segment.cta}
          </span>
        </div>
        <div className="aspect-[5/4] overflow-hidden rounded-[1.4cqw]" style={{ background: wireFill }}>
          {!wire && <img src={theme.image} alt="" className="h-full w-full object-cover" />}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-[1.6cqw] px-[4cqw] pt-[3.5cqw]">
        {segment.services.map((service) => (
          <div
            key={service}
            className="flex h-[9cqw] flex-col justify-between rounded-[1.2cqw] p-[1.6cqw]"
            style={{ background: wire ? wireFill : theme.tile }}
          >
            {wire ? (
              <>
                <Bar w="12cqw" h={1.2} />
                <Bar w="5cqw" h={0.9} />
              </>
            ) : (
              <>
                <span className="text-[1.5cqw] font-medium">{service}</span>
                <ArrowRight className="h-[1.6cqw] w-[1.6cqw]" style={{ color: theme.accent }} />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
