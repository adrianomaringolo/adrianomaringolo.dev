import { JsonLd } from '@/components/json-ld'
import { getProjectBySlug } from '@/data/projects'
import { getTranslations } from '@/lib/i18n'
import type { Project } from '@/types/project'
import type { Metadata } from 'next'
import type React from 'react'

const baseUrl = 'https://adrianomaringolo.dev'

function resolveProjectMeta(project: Project) {
  return {
    title: `${project.title['pt-BR']} | Adriano Maringolo`,
    description: project.shortDescription['pt-BR'],
    url: `${baseUrl}/projects/${project.slug}`,
    image: project.thumbnail.startsWith('http')
      ? project.thumbnail
      : `${baseUrl}${project.thumbnail}`,
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Projeto não encontrado | Adriano Maringolo',
      description: 'O projeto que você está procurando não foi encontrado.',
    }
  }

  const { title, description, url, image } = resolveProjectMeta(project)

  return {
    title,
    description,
    keywords: project.tags['pt-BR'].join(', '),
    authors: [{ name: 'Adriano Maringolo', url: baseUrl }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: 'Adriano Maringolo',
      images: [{ url: image, width: 1200, height: 630, alt: project.title['pt-BR'] }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

export default async function ProjectDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return children
  }

  const { title, description, url, image } = resolveProjectMeta(project)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': project.category === 'library' ? 'SoftwareSourceCode' : 'CreativeWork',
    name: project.title['pt-BR'],
    headline: title,
    description,
    url,
    image,
    datePublished: project.startDate,
    keywords: project.tags['pt-BR'].join(', '),
    author: {
      '@type': 'Person',
      name: 'Adriano Maringolo',
      url: baseUrl,
    },
    ...(project.category === 'library'
      ? {
          codeRepository: project.githubUrl,
          programmingLanguage: project.technologies,
        }
      : {}),
  }

  // Projects have no `?lang=` variant (unlike blog posts) — content is
  // pt-BR only, so the breadcrumb labels match that.
  const t = getTranslations('pt-BR')
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.nav.home, item: baseUrl },
      { '@type': 'ListItem', position: 2, name: t.nav.projects, item: `${baseUrl}/projects` },
      { '@type': 'ListItem', position: 3, name: project.title['pt-BR'], item: url },
    ],
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  )
}
