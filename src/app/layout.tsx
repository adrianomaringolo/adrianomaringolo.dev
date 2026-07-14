import { DynamicMetadata } from '@/components/dynamic-metadata'
import { Footer } from '@/components/footer'
import { JsonLd } from '@/components/json-ld'
import { Navbar } from '@/components/navbar'
import { testimonials } from '@/data/testimonials'
import { LocaleProvider } from '@/hooks/use-locale'
import { ThemeProvider } from '@/hooks/use-theme'
import { getTranslations } from '@/lib/i18n'
import { generatePageMetadata } from '@/lib/metadata'
import { Analytics } from '@vercel/analytics/next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Manrope } from 'next/font/google'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})
import type { Metadata } from 'next'
import Image from 'next/image'
import type React from 'react'
import { Suspense } from 'react'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://adrianomaringolo.dev'),
  ...generatePageMetadata({ locale: 'pt-BR', page: 'home' }),
}

const t = getTranslations('pt-BR')

// A few curated testimonials (one colleague, one client) as `review` on the
// Person schema. Deliberately not adding an `AggregateRating` — there's no
// real aggregate score behind these, and fabricating one risks being read as
// manipulation by stricter systems.
const reviewedTestimonialIds = ['vinicius-moreira', 'saulo-veiga', 'anelita-massucate']
const personReviews = testimonials
  .filter((testimonial) => reviewedTestimonialIds.includes(testimonial.id))
  .map((testimonial) => ({
    '@type': 'Review',
    reviewBody: testimonial.quote['pt-BR'],
    author: { '@type': 'Person', name: testimonial.name },
  }))

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Adriano Maringolo',
  url: 'https://adrianomaringolo.dev',
  jobTitle: 'Full-stack Software Engineer',
  description: t.about.directBio,
  image: 'https://adrianomaringolo.dev/images/about-profile-photo-light.jpeg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'São Paulo',
    addressCountry: 'BR',
  },
  worksFor: { '@type': 'Organization', name: 'Codurance' },
  alumniOf: ['Venturus', 'Dextra', 'Avenue Code'],
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Tailwind CSS',
    'GraphQL',
    'PostgreSQL',
    'AWS',
  ],
  sameAs: [
    'https://github.com/adrianomaringolo',
    'https://linkedin.com/in/adrianomaringolo',
    'https://instagram.com/adrianomaringolo.dev',
  ],
  review: personReviews,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${manrope.variable} ${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={`font-sans ${manrope.className}`}>
        <JsonLd data={personJsonLd} />
        <ThemeProvider>
          <LocaleProvider>
            <DynamicMetadata />
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
            <Analytics />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
