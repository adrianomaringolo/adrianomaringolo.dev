import { generatePageMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import type React from 'react'

export const metadata: Metadata = generatePageMetadata({
  locale: 'pt-BR',
  page: 'projects',
})

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
