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
        return locale === 'pt-BR'
          ? 'Adriano Maringolo - Desenvolvedor Web'
          : 'Adriano Maringolo - Web Developer'
      }

      if (pathname === '/about') {
        return locale === 'pt-BR'
          ? 'Sobre Mim | Adriano Maringolo'
          : 'About Me | Adriano Maringolo'
      }

      if (pathname === '/projects') {
        return locale === 'pt-BR'
          ? 'Projetos | Adriano Maringolo'
          : 'Projects | Adriano Maringolo'
      }

      if (pathname === '/contact') {
        return locale === 'pt-BR'
          ? 'Contato | Adriano Maringolo'
          : 'Contact | Adriano Maringolo'
      }

      return locale === 'pt-BR'
        ? 'Adriano Maringolo - Desenvolvedor Web'
        : 'Adriano Maringolo - Web Developer'
    }

    const getPageDescription = () => {
      if (pathname === '/about') {
        return locale === 'pt-BR'
          ? 'Conheça mais sobre minha trajetória, habilidades e experiência no desenvolvimento web.'
          : 'Learn more about my journey, skills and experience in web development.'
      }

      if (pathname === '/projects') {
        return locale === 'pt-BR'
          ? 'Explore meus projetos mais recentes e as tecnologias que utilizo.'
          : 'Explore my latest projects and the technologies I use.'
      }

      if (pathname === '/contact') {
        return locale === 'pt-BR'
          ? 'Entre em contato comigo para discutir seu próximo projeto.'
          : 'Get in touch with me to discuss your next project.'
      }

      return locale === 'pt-BR'
        ? 'Desenvolvedor web especializado na criação de sites e aplicações de alta performance com React, Next.js e TailwindCSS.'
        : 'Web developer specialized in creating high-performance websites and applications with React, Next.js and TailwindCSS.'
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
      const keywordContent =
        locale === 'pt-BR'
          ? 'Adriano Maringolo, desenvolvedor web, portfolio, React, Next.js, TailwindCSS, JavaScript, TypeScript, desenvolvimento de sites, aplicações web'
          : 'Adriano Maringolo, web developer, portfolio, React, Next.js, TailwindCSS, JavaScript, TypeScript, website development, web applications'
      keywords.setAttribute('content', keywordContent)
    }
  }, [locale, pathname, isLoading, t])

  return null
}
