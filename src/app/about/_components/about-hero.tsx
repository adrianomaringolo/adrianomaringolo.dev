'use client'

import { useLocale } from '@/hooks/use-locale'
import { useTheme } from '@/hooks/use-theme'
import { useExperience } from '@/hooks/use-experience'
import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}
import Image from 'next/image'
import Link from 'next/link'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function AboutHero() {
  const { t } = useLocale()
  const { resolvedTheme } = useTheme()
  const { years } = useExperience()

  const heading = t('about.header').replace('{{years}}', String(years))

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/documents/CV_Adriano_Maringolo_Senior_Software_Engineer.pdf'
    link.download = 'CV_Adriano_Maringolo_Senior_Software_Engineer.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 items-start">

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease }}
          className="relative overflow-hidden rounded-xl w-full aspect-[3/4] lg:sticky lg:top-28"
        >
          <Image
            src={`/images/about-profile-photo-${resolvedTheme}.jpeg`}
            alt="Adriano Maringolo"
            fill
            sizes="(max-width: 1024px) 100vw, 280px"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Content */}
        <div className="space-y-10 lg:pt-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="space-y-6"
          >
            <p className="text-xs tracking-[0.2em] text-primary uppercase font-mono">
              {t('about.title')}
            </p>

            <h1
              className="font-bold tracking-tight text-foreground text-wrap-balance [font-family:var(--font-geist-sans)]"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.75rem)' }}
            >
              {heading}
            </h1>

            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-xs text-muted-foreground/50">
                {t('home.about.availability')}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-foreground/80 max-w-xl">
              {t('about.description')
                .replace(/^\.\.\. /, '')
                .split('\n\n')[0]}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity"
              >
                {t('about.cta')}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('common.downloadCV')}
                <Download className="w-3.5 h-3.5" />
              </button>
              <a
                href="https://linkedin.com/in/adrianomaringolo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/adrianomaringolo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-xs text-muted-foreground/55">
              {t('home.about.workedWith')}&nbsp;
              Venturus · Dextra · Avenue Code · Codurance
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
