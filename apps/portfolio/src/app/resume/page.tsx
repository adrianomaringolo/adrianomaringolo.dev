'use client'

import { useLocale } from '@/hooks/use-locale'
import { ArrowDownToLine, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const CV_PATH = '/documents/CV_Adriano_Maringolo_Senior_Software_Engineer.pdf'

export default function ResumePage() {
  const { t } = useLocale()

  return (
    <div className="flex flex-col" style={{ height: 'calc(100svh - 64px)' }}>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-3 border-b border-border/40 shrink-0">
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('nav.about')}
        </Link>

        <a
          href={CV_PATH}
          download
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowDownToLine className="w-4 h-4" />
          {t('common.downloadCV')}
        </a>
      </div>

      {/* PDF viewer — desktop */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        <object
          data={CV_PATH}
          type="application/pdf"
          className="w-full h-full"
        >
          <p />
        </object>
      </div>

      {/* Mobile fallback */}
      <div className="flex md:hidden flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="text-sm text-muted-foreground">
          {t('resume.mobileMessage')}
        </p>
        <a
          href={CV_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
        >
          {t('resume.openPdf')}
          <ArrowDownToLine className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}
