import { LocaleProvider } from '@/hooks/use-locale'
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import type React from 'react'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://websites.adrianomaringolo.dev'),
  title: 'Adriano Maringolo — Criação de sites e sistemas sob medida',
  description:
    'Sites institucionais, landing pages e sistemas web sob medida, com prazo e preço fechados, desenvolvidos por um engenheiro de software sênior.',
  openGraph: {
    title: 'Adriano Maringolo — Criação de sites e sistemas sob medida',
    description:
      'Sites institucionais, landing pages e sistemas web sob medida, com prazo e preço fechados.',
    url: 'https://websites.adrianomaringolo.dev',
    siteName: 'Adriano Maringolo — Websites',
    locale: 'pt_BR',
    type: 'website',
  },
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Adriano Maringolo — Criação de sites',
  url: 'https://websites.adrianomaringolo.dev',
  provider: {
    '@type': 'Person',
    name: 'Adriano Maringolo',
    url: 'https://adrianomaringolo.dev',
  },
  areaServed: 'BR',
  serviceType: ['Website development', 'Landing page development', 'Custom web application development'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
      </head>
      <body className={`${manrope.variable} font-sans antialiased`}>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  )
}
