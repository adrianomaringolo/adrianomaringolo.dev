import { getBlogPost, getBlogPosts, getRelatedPosts } from '@/lib/blog'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogPostClient } from './blog-post-client'

type Locale = 'pt-BR' | 'en-US'

interface BlogPostProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ lang?: string }>
}

function resolveLocale(lang: string | undefined): Locale {
  return lang === 'en-US' ? 'en-US' : 'pt-BR'
}

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params, searchParams }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params
  const { lang } = await searchParams
  const locale = resolveLocale(lang)
  const post = getBlogPost(slug)

  if (!post) {
    return {
      title: 'Post não encontrado',
      description: 'O post que você está procurando não foi encontrado.',
    }
  }

  const title = post.title[locale] ?? post.title['pt-BR']
  const description = post.excerpt[locale] ?? post.excerpt['pt-BR']

  return {
    title: `${title} | Adriano Maringolo`,
    description,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: post.image
        ? [{ url: post.image, width: 1200, height: 630, alt: title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.image ? [post.image] : undefined,
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
      languages: {
        'pt-BR': `/blog/${post.slug}`,
        'en-US': `/blog/${post.slug}?lang=en-US`,
      },
    },
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) notFound()

  const relatedPosts = getRelatedPosts(post.slug, post.tags)

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />
}
