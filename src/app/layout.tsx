import { DynamicMetadata } from '@/components/dynamic-metadata'
import { Footer } from '@/components/footer'
import { LocaleLoading } from '@/components/locale-loading'
import { Navbar } from '@/components/navbar'
import { LocaleProvider } from '@/hooks/use-locale'
import { ThemeProvider } from '@/hooks/use-theme'
import { generatePageMetadata } from '@/lib/metadata'
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
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export const metadata: Metadata = generatePageMetadata({
  locale: 'pt-BR',
  page: 'home',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`font-sans ${lato.className}`}>
        <ThemeProvider>
          <LocaleProvider>
            <DynamicMetadata />
            <LocaleLoading
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
                <div className="min-h-screen relative pb-20">
                  <a 
                    href="#main-content" 
                    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
                  >
                    Pular para o conteúdo principal
                  </a>
                  <Navbar />
                  <main id="main-content" className="pt-16" role="main">
                    {children}
                  </main>
                  <Footer />
                </div>
              </Suspense>
            </LocaleLoading>
            <Analytics />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
