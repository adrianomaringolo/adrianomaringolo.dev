'use client'

import { getProjectBySlug } from '@/data/projects'
import { useTranslation } from '@/hooks/use-translation'
import { useParams, type PageProps } from '@/lib/params-utils'
import { Button } from 'buildgrid-ui'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type EditProjectPageProps = PageProps<{ slug: string }>

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const { locale } = useTranslation()
  const { slug } = useParams(params)
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-6">
        <Link href={`/projects/${slug}`}>
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {locale === 'pt-BR' ? 'Voltar ao Projeto' : 'Back to Project'}
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            {locale === 'pt-BR' ? 'Editar Projeto' : 'Edit Project'}:{' '}
            {project.title[locale]}
          </h1>

          <div className="bg-muted/50 rounded-lg p-8 text-center">
            <p className="text-muted-foreground">
              {locale === 'pt-BR'
                ? 'Esta página é apenas um exemplo de como usar os novos parâmetros assíncronos do Next.js 15.'
                : 'This page is just an example of how to use Next.js 15 new async params.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
