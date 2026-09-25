'use client'

import { GradientMesh } from '@/components/ui/gradient-mesh'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { useLocale } from '@/hooks/use-locale'
import { motion } from 'framer-motion'
import { ArrowLeft, FileX } from 'lucide-react'
import Link from 'next/link'

export default function BlogPostNotFound() {
  const { locale } = useLocale()

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <GradientMesh />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <div className="mb-8">
            <FileX className="w-24 h-24 mx-auto text-muted-foreground/50" />
          </div>

          <h1 className="text-4xl font-bold mb-4">
            {locale === 'pt-BR' ? 'Post não encontrado' : 'Post not found'}
          </h1>

          <p className="text-muted-foreground mb-8">
            {locale === 'pt-BR'
              ? 'O post que você está procurando não existe ou foi removido.'
              : 'The post you are looking for does not exist or has been removed.'}
          </p>

          <Link href="/blog">
            <MagneticButton className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-md">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {locale === 'pt-BR' ? 'Voltar ao Blog' : 'Back to Blog'}
            </MagneticButton>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
