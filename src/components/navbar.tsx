'use client'

import { LanguageToggle } from '@/components/language-toggle'
import { ThemeToggle } from '@/components/theme-toggle'
import { useLocale } from '@/hooks/use-locale'
import { useScrollDirection } from '@/hooks/use-scroll-direction'
import { AnimatePresence, motion } from 'framer-motion'
import { FileText, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLocale()
  const { scrollDirection, isAtTop } = useScrollDirection()
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/projects', label: t('nav.projects') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/contact', label: t('nav.contact') },
  ]

  const isVisible = isAtTop || scrollDirection === 'up' || isOpen

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        !isAtTop ? 'bg-background border-b border-border/40' : ''
      }`}
      animate={{ y: isVisible ? 0 : -64, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            aria-label="Home"
            className="opacity-70 hover:opacity-100 transition-opacity duration-200"
          >
            <Image
              src="/logo.png"
              alt="Adriano Maringolo"
              width={28}
              height={28}
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm pb-1 transition-colors duration-200 ${
                    active
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-px bg-primary" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Desktop utility controls */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/resume"
              className={`inline-flex items-center gap-1.5 text-sm transition-colors duration-200 px-2 mr-1 ${
                isActive('/resume')
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              {t('common.viewResume')}
            </Link>
            <ThemeToggle />
            <LanguageToggle />
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="block"
                  >
                    <X size={18} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="block"
                  >
                    <Menu size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-background border-t border-border/40"
          >
            <nav className="px-6 py-4" aria-label="Mobile navigation">
              <ul className="divide-y divide-border/30">
                {navItems.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between py-4 text-sm transition-colors duration-200 ${
                          active
                            ? 'text-foreground font-medium'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {item.label}
                        {active && <span className="h-px w-5 bg-primary" />}
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <div className="flex items-center justify-between pt-4 mt-2 border-t border-border/30">
                <Link
                  href="/resume"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <FileText className="w-3.5 h-3.5" />
                  {t('common.viewResume')}
                </Link>
                <LanguageToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
