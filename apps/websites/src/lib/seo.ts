import { createTranslator, type Locale } from '@/lib/i18n'
import type { Metadata } from 'next'

export const siteUrl = 'https://websites.adrianomaringolo.dev'

export const localePaths: Record<Locale, string> = {
  'pt-BR': '/',
  'en-US': '/en',
}

export const localeUrl = (locale: Locale) => new URL(localePaths[locale], siteUrl).toString()

export const ogSize = { width: 1200, height: 630 }

export const ogImageUrl = (locale: Locale) => `${siteUrl}/og/${locale}`

// Bumped by hand when the page content meaningfully changes; feeds the
// sitemap and the WebPage dateModified that answer engines read as freshness.
export const lastModified = '2026-09-28'

const sameAs = [
  'https://adrianomaringolo.dev',
  'https://www.instagram.com/adrianomaringolo.dev/',
  'https://github.com/adrianomaringolo',
  'https://linkedin.com/in/adrianomaringolo',
]

const packageKeys = ['site', 'landing', 'webapp'] as const

// "a partir de R$ 1.597*" / "from R$ 1,597*" -> 1597; "sob orçamento*" -> undefined
function parsePrice(label: string): number | undefined {
  const digits = label.replace(/\D/g, '')
  return digits ? Number(digits) : undefined
}

export function buildMetadata(locale: Locale): Metadata {
  const { t } = createTranslator(locale)
  const url = localeUrl(locale)

  return {
    metadataBase: new URL(siteUrl),
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: url,
      languages: {
        'pt-BR': localeUrl('pt-BR'),
        'en-US': localeUrl('en-US'),
        'x-default': localeUrl('pt-BR'),
      },
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.ogDescription'),
      url,
      siteName: t('meta.siteName'),
      locale: locale.replace('-', '_'),
      alternateLocale: locale === 'pt-BR' ? 'en_US' : 'pt_BR',
      type: 'website',
      images: [{ url: ogImageUrl(locale), ...ogSize, alt: t('meta.ogAlt'), type: 'image/png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.ogDescription'),
      images: [ogImageUrl(locale)],
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.png', type: 'image/png' },
      ],
      apple: '/icon.png',
    },
  }
}

export function buildJsonLd(locale: Locale) {
  const { t, tList } = createTranslator(locale)
  const url = localeUrl(locale)
  const personId = 'https://adrianomaringolo.dev/#person'
  const serviceId = `${siteUrl}/#service`

  const offers = packageKeys.map((key) => {
    const price = parsePrice(t(`packages.${key}.price`))
    return {
      '@type': 'Offer',
      name: t(`packages.${key}.name`),
      description: `${t(`packages.${key}.tagline`)}. ${tList(`packages.${key}.features`).join('. ')}.`,
      url: `${url}#pacotes`,
      ...(price && {
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: price,
          priceCurrency: 'BRL',
        },
      }),
    }
  })

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: t('meta.siteName'),
        inLanguage: ['pt-BR', 'en-US'],
        publisher: { '@id': personId },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: t('meta.title'),
        description: t('meta.description'),
        inLanguage: locale,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': serviceId },
        dateModified: lastModified,
        primaryImageOfPage: ogImageUrl(locale),
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: 'Adriano Maringolo',
        url: 'https://adrianomaringolo.dev',
        jobTitle: t('meta.jobTitle'),
        image: `${siteUrl}/icon.png`,
        knowsAbout: [
          'Web development',
          'Next.js',
          'React',
          'TypeScript',
          'SEO',
          'Answer Engine Optimization',
          'Generative Engine Optimization',
          'Web performance',
        ],
        address: { '@type': 'PostalAddress', addressLocality: 'São Paulo', addressCountry: 'BR' },
        sameAs,
      },
      {
        '@type': 'ProfessionalService',
        '@id': serviceId,
        name: t('meta.siteName'),
        description: t('meta.description'),
        url,
        image: ogImageUrl(locale),
        provider: { '@id': personId },
        founder: { '@id': personId },
        areaServed: { '@type': 'Country', name: 'Brazil' },
        availableLanguage: ['pt-BR', 'en-US'],
        priceRange: '$$',
        currenciesAccepted: 'BRL',
        serviceType: offers.map((o) => o.name),
        sameAs,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: t('packages.headline'),
          itemListElement: offers,
        },
      },
    ],
  }
}
