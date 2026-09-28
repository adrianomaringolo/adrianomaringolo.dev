'use client'

import { useLocale } from '@/hooks/use-locale'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export const segmentKeys = ['saude', 'alimentacao', 'comercio', 'startup'] as const
export type SegmentKey = (typeof segmentKeys)[number]
export type PackageKey = 'site' | 'landing' | 'webapp'

export interface Segment {
  key: SegmentKey
  label: string
  defaultName: string
  headline: string
  sub: string
  cta: string
  nav: string[]
  services: string[]
  audience: string
  goal: string
  package: PackageKey
}

interface DemoContextType {
  /** What the visitor typed; empty until they type something. */
  name: string
  setName: (name: string) => void
  segmentKey: SegmentKey
  setSegmentKey: (key: SegmentKey) => void
  segment: Segment
  segments: Segment[]
  /** The name to render in the demo: typed name, or the segment's example. */
  displayName: string
  /** Package picked for the contact form, set by package CTAs or ?pacote=. */
  selectedPackage: PackageKey | ''
  setSelectedPackage: (key: PackageKey | '') => void
  /** Add-on services (blog, crm, launch) the visitor flagged interest in. */
  selectedAddons: string[]
  toggleAddon: (key: string, on?: boolean) => void
}

export const packageKeys = ['site', 'landing', 'webapp'] as const

const DemoContext = createContext<DemoContextType | undefined>(undefined)

// The business name the visitor types in the hero drives the demo site built
// in the scroll stage and the contact headline, so it lives above both.
export function DemoProvider({ children }: { children: ReactNode }) {
  const { raw } = useLocale()
  const [name, setName] = useState('')
  const [segmentKey, setSegmentKey] = useState<SegmentKey>('saude')
  const [selectedPackage, setSelectedPackage] = useState<PackageKey | ''>('')
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])

  const toggleAddon = (key: string, on?: boolean) =>
    setSelectedAddons((current) => {
      const next = on ?? !current.includes(key)
      return next ? Array.from(new Set([...current, key])) : current.filter((k) => k !== key)
    })

  // Read ?pacote= after mount (not via useSearchParams) so the contact form
  // needs no Suspense boundary and hydrates together with the rest of the page.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('pacote')
    if (packageKeys.includes(param as PackageKey)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedPackage(param as PackageKey)
    }
  }, [])

  const segments = raw<Segment[]>('segments') ?? []
  const segment = segments.find((s) => s.key === segmentKey) ?? segments[0]
  const displayName = name.trim() || segment.defaultName

  return (
    <DemoContext.Provider
      value={{
        name,
        setName,
        segmentKey,
        setSegmentKey,
        segment,
        segments,
        displayName,
        selectedPackage,
        setSelectedPackage,
        selectedAddons,
        toggleAddon,
      }}
    >
      {children}
    </DemoContext.Provider>
  )
}

export function useDemo() {
  const context = useContext(DemoContext)
  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider')
  }
  return context
}

export function slugify(value: string): string {
  return (
    value
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '')
      .slice(0, 28) || 'seunegocio'
  )
}
