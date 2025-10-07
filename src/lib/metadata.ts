import type { Metadata } from 'next'
import { getTranslations, localeMetadata, type Locale } from './i18n'

interface GenerateMetadataProps {
  locale: Locale
  page?: string
  title?: string
  description?: string
}

export function generatePageMetadata({
  locale,
  page = 'home',
  title,
  description,
}: GenerateMetadataProps): Metadata {
  const t = getTranslations(locale)
  const localeInfo = localeMetadata[locale]
  
  const baseUrl = 'https://adrianomaringolo.dev'
  const pageTitle = title || (page === 'home' ? 'Adriano Maringolo - Desenvolvedor Web' : `${t.nav[page as keyof typeof t.nav]} | Adriano Maringolo`)
  const pageDescription = description || t.pages[`${page}Description` as keyof typeof t.pages] || t.home.hero.subtitle

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: locale === 'pt-BR' 
      ? 'Adriano Maringolo, desenvolvedor web, portfolio, React, Next.js, TailwindCSS, JavaScript, TypeScript, desenvolvimento de sites, aplicações web'
      : 'Adriano Maringolo, web developer, portfolio, React, Next.js, TailwindCSS, JavaScript, TypeScript, website development, web applications',
    authors: [{ name: 'Adriano Maringolo', url: baseUrl }],
    creator: 'Adriano Maringolo',
    publisher: 'Adriano Maringolo',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${baseUrl}${page === 'home' ? '' : `/${page}`}`,
      languages: {
        'pt-BR': `${baseUrl}${page === 'home' ? '' : `/${page}`}`,
        'en-US': `${baseUrl}${page === 'home' ? '' : `/${page}`}`, // Same URL, different content via client-side
      },
    },
    openGraph: {
      type: 'website',
      locale: localeInfo.hreflang,
      url: `${baseUrl}${page === 'home' ? '' : `/${page}`}`,
      title: pageTitle,
      description: pageDescription,
      siteName: 'Adriano Maringolo',
      images: [
        {
          url: `${baseUrl}/og-image-${locale}.png`,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [`${baseUrl}/og-image-${locale}.png`],
    },
  }
}

export function generateAlternateLinks(currentPath: string) {
  const baseUrl = 'https://adrianomaringolo.dev'
  
  return {
    'pt-BR': `${baseUrl}${currentPath}`,
    'en-US': `${baseUrl}${currentPath}`, // Same URL for both languages
  }
}