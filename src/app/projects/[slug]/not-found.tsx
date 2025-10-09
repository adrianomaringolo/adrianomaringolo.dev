'use client'

import { useTranslation } from '@/hooks/use-translation'
import { buttonVariants } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { ArrowLeft, Search } from 'lucide-react'
import Link from 'next/link'

export default function ProjectNotFound() {
  const { locale } = useTranslation()

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
          <h1 className="text-4xl font-bold mb-4">
            {locale === 'pt-BR' ? 'Projeto Não Encontrado' : 'Project Not Found'}
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-8">
            {locale === 'pt-BR'
              ? 'O projeto que você está procurando não existe ou foi removido.'
              : 'The project you are looking for does not exist or has been removed.'}
          </p>

          {/* Suggestions */}
          <div className="bg-muted/50 rounded-lg p-6 mb-8">
            <h2 className="font-semibold mb-3">
              {locale === 'pt-BR' ? 'O que você pode fazer:' : 'What you can do:'}
            </h2>
            <ul className="text-left space-y-2 text-muted-foreground">
              <li>
                {locale === 'pt-BR'
                  ? '• Verificar se o URL está correto'
                  : '• Check if the URL is correct'}
              </li>
              <li>
                {locale === 'pt-BR'
                  ? '• Navegar pelos projetos disponíveis'
                  : '• Browse available projects'}
              </li>
              <li>
                {locale === 'pt-BR'
                  ? '• Entrar em contato se você acredita que isso é um erro'
                  : '• Contact me if you believe this is an error'}
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects" className={buttonVariants({ size: 'lg' })}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {locale === 'pt-BR' ? 'Ver Todos os Projetos' : 'View All Projects'}
            </Link>

            <Link href="/" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              {locale === 'pt-BR' ? 'Voltar ao Início' : 'Back to Home'}
            </Link>
          </div>

          {/* Contact Link */}
          <div className="mt-8 pt-8 border-t">
            <p className="text-sm text-muted-foreground mb-2">
              {locale === 'pt-BR'
                ? 'Não encontrou o que procurava?'
                : "Didn't find what you were looking for?"}
            </p>

            <Link href="/contact" className={buttonVariants({ variant: 'link' })}>
              {locale === 'pt-BR' ? 'Entre em contato comigo' : 'Get in touch with me'}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
