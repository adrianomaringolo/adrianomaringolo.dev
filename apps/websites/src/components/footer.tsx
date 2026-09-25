'use client'

import { useLocale } from '@/hooks/use-locale'

export function Footer() {
  const { t } = useLocale()

  return (
    <footer className="border-t border-border/60 px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-semibold text-foreground">Adriano Maringolo</p>
          <p className="text-sm text-muted-foreground">{t('footer.tagline')}</p>
        </div>
        <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground sm:items-end">
          <a
            href="https://adrianomaringolo.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            {t('footer.portfolio')}
          </a>
          <p>
            © {new Date().getFullYear()} Adriano Maringolo. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
