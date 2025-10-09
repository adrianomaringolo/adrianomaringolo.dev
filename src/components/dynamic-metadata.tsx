'use client'

import { useLocale } from '@/hooks/use-locale'
import { localeMetadata } from '@/lib/i18n'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function DynamicMetadata() {
  const { locale, t, isLoading } = useLocale()
  const pathname = usePathname()

  useEffect(() => {
    if (isLoading) return

    // Get page-specific translations
    const getPageTitle = () => {
      if (pathname === '/') {
        return t('pages.homeTitle')
      }

      if (pathname === '/about') {
        return t('pages.aboutTitle')
      }

      if (pathname === '/projects') {
        return t('pages.projectsTitle')
      }

      if (pathname === '/contact') {
        return t('pages.contactTitle')
      }

      return t('pages.homeTitle')
    }

    const getPageDescription = () => {
      if (pathname === '/about') {
        return t('pages.aboutDescription')
      }

      if (pathname === '/projects') {
        return t('pages.projectsDescription')
      }

      if (pathname === '/contact') {
        return t('pages.contactDescription')
      }

      return t('pages.defaultDescription')
    }

    const title = getPageTitle()
    const description = getPageDescription()

    // Update document title
    document.title = title

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    }

    // Update lang attribute
    document.documentElement.lang = locale

    // Update Open Graph locale
    const ogLocale = document.querySelector('meta[property="og:locale"]')
    if (ogLocale) {
      ogLocale.setAttribute('content', localeMetadata[locale].hreflang)
    }

    // Update Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', title)
    }

    // Update Open Graph description
    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', description)
    }

    // Update Twitter card title
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title)
    }

    // Update Twitter card description
    const twitterDescription = document.querySelector('meta[name="twitter:description"]')
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description)
    }

    // Update keywords based on locale
    const keywords = document.querySelector('meta[name="keywords"]')
    if (keywords) {
      keywords.setAttribute('content', t('pages.keywords'))
    }
  }, [locale, pathname, isLoading, t])

  return null
}
