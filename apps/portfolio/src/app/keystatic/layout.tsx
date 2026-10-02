import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { keystaticAdminEnabled } from '../../../keystatic.config'
import KeystaticApp from './keystatic'

// The admin gets its own root layout: none of the site's chrome or CSS.
export const metadata: Metadata = {
  title: 'Bookmarks · Admin',
  robots: { index: false, follow: false },
}

export default function KeystaticLayout() {
  if (!keystaticAdminEnabled) notFound()

  return (
    <html lang="pt-BR">
      <body>
        <KeystaticApp />
      </body>
    </html>
  )
}
