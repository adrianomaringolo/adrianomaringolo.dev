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

// Content folders are named `YYYY-MM-DD-slug` (optionally prefixed with `_` to
// exclude drafts from listing). The date prefix is for organizing files on
// disk only — it's stripped to produce the public route slug, so renaming a
// folder for organization doesn't change a post's URL.
const DATE_PREFIX_RE = /^\d{4}-\d{2}-\d{2}-/

function stripDatePrefix(dirName: string): string {
  return dirName.replace(DATE_PREFIX_RE, '')
}

function readMdxFile(dir: string, locale: Locale): { data: Record<string, unknown>; content: string } | null {
  const filePath = path.join(CONTENT_DIR, dir, `${locale}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { data, content }
}

function getEntries(): { slug: string; dir: string }[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((entry) => !entry.startsWith('_') && fs.statSync(path.join(CONTENT_DIR, entry)).isDirectory())
    .map((dir) => ({ slug: stripDatePrefix(dir), dir }))
}

export function getBlogPosts(): BlogPostMetadata[] {
  const entries = getEntries()

  const posts = entries
    .map(({ slug, dir }): BlogPostMetadata | null => {
      const ptBR = readMdxFile(dir, 'pt-BR')
      const enUS = readMdxFile(dir, 'en-US')
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
  const entry = getEntries().find((e) => e.slug === slug)
  if (!entry) return undefined

  const ptBR = readMdxFile(entry.dir, 'pt-BR')
  const enUS = readMdxFile(entry.dir, 'en-US')
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
