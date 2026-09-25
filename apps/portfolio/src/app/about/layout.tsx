import { generatePageMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import type React from 'react'

export const metadata: Metadata = generatePageMetadata({
  locale: 'pt-BR',
  page: 'about',
})

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
