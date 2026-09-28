'use client'

import { LanguageToggle } from '@/components/language-toggle'
import { useLocale } from '@/hooks/use-locale'
import { ArrowRight } from 'lucide-react'

const navItems = [
  { key: 'packages', href: '#pacotes' },
  { key: 'process', href: '#como-funciona' },
  { key: 'work', href: '#projetos' },
  { key: 'contact', href: '#contato' },
] as const

export function Header() {
  const { t } = useLocale()

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-12">
        <a href="#top" className="text-lg font-bold tracking-tight text-foreground">
          Adriano Maringolo
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <LanguageToggle />
          <a
            href="#contato"
            className="hidden items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:flex"
          >
            {t('nav.cta')}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  )
}
