import type { BlogPost, BlogPostMetadata } from '@/types/blog'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const CONTENT_DIR = path.join(process.cwd(), 'src/content/blog')

type Locale = 'pt-BR' | 'en-US'

function calcReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

function readMdxFile(slug: string, locale: Locale): { data: Record<string, unknown>; content: string } | null {
  const filePath = path.join(CONTENT_DIR, slug, `${locale}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { data, content }
}

function getSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs.readdirSync(CONTENT_DIR).filter((entry) => {
    return !entry.startsWith('_') && fs.statSync(path.join(CONTENT_DIR, entry)).isDirectory()
  })
}

export function getBlogPosts(): BlogPostMetadata[] {
  const slugs = getSlugs()

  const posts = slugs
    .map((slug): BlogPostMetadata | null => {
      const ptBR = readMdxFile(slug, 'pt-BR')
      const enUS = readMdxFile(slug, 'en-US')
      if (!ptBR && !enUS) return null

      const data = (ptBR?.data ?? enUS?.data) as Record<string, unknown>

      return {
        id: slug,
        slug,
        title: {
          'pt-BR': (ptBR?.data.title as string) ?? (enUS?.data.title as string) ?? slug,
          'en-US': (enUS?.data.title as string) ?? (ptBR?.data.title as string) ?? slug,
        },
        excerpt: {
          'pt-BR': (ptBR?.data.excerpt as string) ?? '',
          'en-US': (enUS?.data.excerpt as string) ?? '',
        },
        author: data.author as string,
        publishedAt: data.publishedAt as string,
        readingTime: calcReadingTime(ptBR?.content ?? enUS?.content ?? ''),
        tags: (data.tags as string[]) ?? [],
        featured: (data.featured as boolean) ?? false,
        image: data.image as string | undefined,
      }
    })
    .filter((p): p is BlogPostMetadata => p !== null)

  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
}

export function getBlogPost(slug: string): BlogPost | undefined {
  const ptBR = readMdxFile(slug, 'pt-BR')
  const enUS = readMdxFile(slug, 'en-US')
  if (!ptBR && !enUS) return undefined

  const data = (ptBR?.data ?? enUS?.data) as Record<string, unknown>

  return {
    slug,
    title: {
      'pt-BR': (ptBR?.data.title as string) ?? (enUS?.data.title as string) ?? slug,
      'en-US': (enUS?.data.title as string) ?? (ptBR?.data.title as string) ?? slug,
    },
    excerpt: {
      'pt-BR': (ptBR?.data.excerpt as string) ?? '',
      'en-US': (enUS?.data.excerpt as string) ?? '',
    },
    content: {
      'pt-BR': ptBR?.content ?? enUS?.content ?? '',
      'en-US': enUS?.content ?? ptBR?.content ?? '',
    },
    author: data.author as string,
    publishedAt: data.publishedAt as string,
    readingTime: calcReadingTime(ptBR?.content ?? enUS?.content ?? ''),
    tags: (data.tags as string[]) ?? [],
    featured: (data.featured as boolean) ?? false,
    image: data.image as string | undefined,
  }
}

export function getFeaturedPosts(): BlogPostMetadata[] {
  return getBlogPosts().filter((p) => p.featured)
}

export function getRelatedPosts(currentSlug: string, tags: string[], limit = 3): BlogPostMetadata[] {
  return getBlogPosts()
    .filter((p) => p.slug !== currentSlug)
    .filter((p) => p.tags.some((tag) => tags.includes(tag)))
    .slice(0, limit)
}
