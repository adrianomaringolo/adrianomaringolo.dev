import { getYearsOfExperience } from './experience'
import type { Metadata } from 'next'
import { getTranslations, localeMetadata, type Locale } from './i18n'

interface GenerateMetadataProps {
  locale: Locale
  page?: string
  title?: string
  description?: string
  path?: string
  image?: string
}

export function generatePageMetadata({
  locale,
  page = 'home',
  title,
  description,
  path,
  image,
}: GenerateMetadataProps): Metadata {
  const t = getTranslations(locale)
  const localeInfo = localeMetadata[locale]

  const baseUrl = 'https://adrianomaringolo.dev'
  const pagePath = path ?? (page === 'home' ? '' : `/${page}`)
  const pageTitle =
    title ||
    t.pages[`${page}Title` as keyof typeof t.pages] ||
    (page === 'home'
      ? 'Adriano Maringolo - Desenvolvedor Web'
      : `${t.nav[page as keyof typeof t.nav]} | Adriano Maringolo`)
  const pageDescription = (
    description ||
    t.pages[`${page}Description` as keyof typeof t.pages] ||
    t.home.hero.subtitle
  ).replace('{{years}}', String(getYearsOfExperience()))
  const pageImage = image ? `${baseUrl}${image}` : `${baseUrl}/opengraph-image`

  return {
    title: pageTitle,
    description: pageDescription,
    keywords:
      locale === 'pt-BR'
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
    // No `alternates.languages` here: pt-BR and en-US are served from the same
    // URL (locale is switched client-side), so there's no distinct URL per
    // language to declare via hreflang. `/blog/[slug]` is the exception — it has
    // a real `?lang=en-US` URL and sets its own `alternates` accordingly.
    alternates: {
      canonical: `${baseUrl}${pagePath}`,
    },
    openGraph: {
      type: 'website',
      locale: localeInfo.hreflang,
      url: `${baseUrl}${pagePath}`,
      title: pageTitle,
      description: pageDescription,
      siteName: 'Adriano Maringolo',
      images: [
        {
          url: pageImage,
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
      images: [pageImage],
    },
  }
}
