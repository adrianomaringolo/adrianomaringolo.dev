'use client'

import { useTranslation } from '@/hooks/use-translation'
import { buttonVariants } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function ProjectCTA() {
  const { t } = useTranslation()

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">{t('projects.likeWhatYouSee')}</h2>
            <p className="text-muted-foreground mb-8">{t('projects.letsWorkTogether')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className={buttonVariants({ size: 'lg' })}>
                {t('projects.getInTouch')}
              </Link>

              <Link
                href="/projects"
                className={buttonVariants({ variant: 'outline', size: 'lg' })}
              >
                {t('projects.viewMoreProjects')}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
