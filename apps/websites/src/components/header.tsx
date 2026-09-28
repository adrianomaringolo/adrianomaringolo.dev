'use client'

import { LanguageToggle } from '@/components/language-toggle'
import { useLocale } from '@/hooks/use-locale'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

const navItems = [
  { key: 'process', href: '#como-funciona' },
  { key: 'packages', href: '#pacotes' },
  { key: 'work', href: '#projetos' },
  { key: 'faq', href: '#perguntas' },
  { key: 'contact', href: '#contato' },
] as const

const HEADER_HEIGHT = 64

export function Header() {
  const { t } = useLocale()
  const [dark, setDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Sections marked data-ground="stage" are ink; the bar flips to match
  // whatever sits under it instead of floating a light strip over them.
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 8)
      const probe = HEADER_HEIGHT / 2
      const onStage = Array.from(document.querySelectorAll<HTMLElement>('[data-ground="stage"]')).some(
        (el) => {
          const r = el.getBoundingClientRect()
          return r.top <= probe && r.bottom >= probe
        },
      )
      setDark(onStage)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-300',
        dark
          ? 'on-stage border-b border-stage-line/70 bg-stage/85 text-stage-ink backdrop-blur-md'
          : scrolled
            ? 'border-b border-line bg-paper/85 text-ink backdrop-blur-md'
            : 'border-b border-transparent bg-transparent text-ink',
      )}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:rounded-md focus:bg-volt focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
      >
        {t('common.skipToContent')}
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 lg:px-10">
        <a href="#top" className="flex items-baseline gap-2 text-[15px] font-semibold tracking-tight whitespace-nowrap">
          Adriano Maringolo
          <span className={cn('hidden font-normal sm:inline', dark ? 'text-stage-soft' : 'text-ink-soft')}>
            / websites
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={cn(
                'text-sm transition-colors',
                dark ? 'text-stage-soft hover:text-stage-ink' : 'text-ink-soft hover:text-ink',
              )}
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-4">
          <LanguageToggle dark={dark} />
          <a
            href="#contato"
            className="rounded-full bg-volt px-3.5 py-2 text-sm font-medium whitespace-nowrap text-ink sm:px-4 transition-[transform,background-color] duration-200 ease-out-expo hover:bg-volt-deep active:scale-[0.97]"
          >
            {t('nav.cta')}
          </a>
        </div>
      </div>
    </header>
  )
}
