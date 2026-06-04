import { getBlogPost, getBlogPosts, getRelatedPosts } from '@/data/blog'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogPostClient } from './blog-post-client'

interface BlogPostProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return {
      title: 'Post não encontrado',
      description: 'O post que você está procurando não foi encontrado.',
    }
  }

  return {
    title: `${post.title['pt-BR']} | Adriano Maringolo`,
    description: post.excerpt['pt-BR'],
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title['pt-BR'],
      description: post.excerpt['pt-BR'],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: post.image
        ? [
            {
              url: post.image,
              width: 1200,
              height: 630,
              alt: post.title['pt-BR'],
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title['pt-BR'],
      description: post.excerpt['pt-BR'],
      images: post.image ? [post.image] : undefined,
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
      languages: {
        'pt-BR': `/blog/${post.slug}`,
        'en-US': `/blog/${post.slug}`,
      },
    },
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params
  console.log('Blog post slug:', slug)

  const post = getBlogPost(slug)
  console.log('Found post:', post ? 'Yes' : 'No')

  if (!post) {
    console.log('Post not found, calling notFound()')
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.slug, post.tags)

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />
}
