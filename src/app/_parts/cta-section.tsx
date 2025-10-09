'use client'

import { useLocale } from '@/hooks/use-locale'
import { Button } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import Link from 'next/link'

export function CTASection() {
  const { t } = useLocale()

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            {t('cta.description')}
          </p>
          <Link href="/contact">
            <Button size="lg" className="group">
              <MessageCircle className="mr-2 h-4 w-4" />
              {t('cta.button')}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
