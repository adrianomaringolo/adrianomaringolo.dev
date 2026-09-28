import { lastModified, localeUrl } from '@/lib/seo'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { 'pt-BR': localeUrl('pt-BR'), 'en-US': localeUrl('en-US') }

  return (['pt-BR', 'en-US'] as const).map((locale) => ({
    url: localeUrl(locale),
    lastModified,
    changeFrequency: 'monthly',
    priority: locale === 'pt-BR' ? 1 : 0.8,
    alternates: { languages },
  }))
}
