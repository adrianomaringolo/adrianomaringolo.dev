import { generatePageMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import type React from 'react'

export const metadata: Metadata = generatePageMetadata({
  locale: 'pt-BR',
  page: 'contact',
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
