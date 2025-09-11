import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { LocaleProvider } from '@/hooks/use-locale'
import { ThemeProvider } from '@/hooks/use-theme'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import Image from 'next/image'
import type React from 'react'
import { Suspense } from 'react'
import './globals.css'

const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700', '900'],
})

export const metadata: Metadata = {
  title: 'Adriano Maringolo - Desenvolvedor Web',
  description:
    'Desenvolvedor web especializado na criação de sites e aplicações de alta performance com React, Next.js e TailwindCSS.',
  keywords:
    'Adriano Maringolo, desenvolvedor web, portfolio, React, Next.js, TailwindCSS, JavaScript, TypeScript, desenvolvimento de sites, aplicações web',
  authors: [{ name: 'Adriano Maringolo' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://adrianomaringolo.dev',
    title: 'Adriano Maringolo - Desenvolvedor Web',
    description:
      'Desenvolvedor web especializado na criação de sites e aplicações de alta performance com React, Next.js e TailwindCSS.',
    images: [
      {
        url: 'https://adrianomaringolo.dev/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Adriano Maringolo - Desenvolvedor Web',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`font-sans ${lato.className} `}>
        <ThemeProvider>
          <LocaleProvider>
            <Suspense
              fallback={
                <div className="w-dvw h-dvh flex justify-center items-center">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={50}
                    height={50}
                    className="animate-ping"
                  />
                </div>
              }
            >
              <main className="min-h-screen relative pb-20">
                <Navbar />
                <section className="pt-16">{children}</section>
                <Footer />
              </main>
            </Suspense>
            <Analytics />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
