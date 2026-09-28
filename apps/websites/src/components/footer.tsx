'use client'

import { useLocale } from '@/hooks/use-locale'
import { ArrowUpRight } from 'lucide-react'

export function Footer() {
  const { t } = useLocale()

  return (
    <footer
      data-ground="stage"
      className="on-stage border-t border-stage-line bg-stage px-4 py-10 text-stage-soft sm:px-6 lg:px-10"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[15px] font-semibold text-stage-ink">Adriano Maringolo</p>
          <p className="mt-1 max-w-[46ch]">{t('footer.tagline')}</p>
        </div>
        <div className="flex flex-col gap-1.5 sm:items-end">
          <a
            href="https://adrianomaringolo.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-stage-ink underline decoration-stage-line hover:decoration-volt"
          >
            {t('footer.portfolio')}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <p className="tabular">
            © {new Date().getFullYear()} Adriano Maringolo. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
