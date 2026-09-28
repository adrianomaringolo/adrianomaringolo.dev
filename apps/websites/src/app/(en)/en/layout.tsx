import { SiteDocument } from '@/components/site-document'
import { buildMetadata } from '@/lib/seo'
import type { Metadata, Viewport } from 'next'
import type React from 'react'
import '../../globals.css'

export const metadata: Metadata = buildMetadata('en-US')

export const viewport: Viewport = {
  themeColor: '#f5f6f8',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <SiteDocument locale="en-US">{children}</SiteDocument>
}
