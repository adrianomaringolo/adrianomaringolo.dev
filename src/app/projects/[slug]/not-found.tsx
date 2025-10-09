'use client'

import { useTranslation } from '@/hooks/use-translation'
import { buttonVariants } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { ArrowLeft, Search } from 'lucide-react'
import Link from 'next/link'

export default function ProjectNotFound() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-4">{t('projects.notFound.title')}</h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-8">
            {t('projects.notFound.description')}
          </p>

          {/* Suggestions */}
          <div className="bg-muted/50 rounded-lg p-6 mb-8">
            <h2 className="font-semibold mb-3">{t('projects.notFound.whatYouCanDo')}</h2>
            <ul className="text-left space-y-2 text-muted-foreground">
              <li>{t('projects.notFound.checkUrl')}</li>
              <li>{t('projects.notFound.browseProjects')}</li>
              <li>{t('projects.notFound.contactError')}</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects" className={buttonVariants({ size: 'lg' })}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('projects.notFound.backToProjects')}
            </Link>

            <Link href="/" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              {t('projects.notFound.backToHome')}
            </Link>
          </div>

          {/* Contact Link */}
          <div className="mt-8 pt-8 border-t">
            <p className="text-sm text-muted-foreground mb-2">
              {t('projects.notFound.didntFind')}
            </p>

            <Link href="/contact" className={buttonVariants({ variant: 'link' })}>
              {t('projects.notFound.getInTouch')}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
