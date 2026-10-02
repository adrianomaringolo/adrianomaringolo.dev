import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../keystatic.config'

export type BookmarkType = 'tool' | 'library' | 'article' | 'video' | 'course' | 'reference'

export interface BookmarkTag {
  slug: string
  label: { 'pt-BR': string; 'en-US': string }
}

export interface Bookmark {
  slug: string
  title: string
  url: string
  domain: string
  type: BookmarkType
  tags: string[]
  note: { 'pt-BR': string; 'en-US': string }
  language: 'en' | 'pt' | 'other'
  favorite: boolean
  addedAt: string
}

// Reads the JSON files Keystatic writes; runs at build time, so the page is static.
const reader = createReader(process.cwd(), keystaticConfig)

function domainOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export async function getBookmarks(): Promise<{ bookmarks: Bookmark[]; tags: BookmarkTag[] }> {
  const [items, tagEntries] = await Promise.all([
    reader.collections.bookmarks.all(),
    reader.collections.bookmarkTags.all(),
  ])

  const tags = tagEntries.map(({ slug, entry }) => ({
    slug,
    label: { 'pt-BR': entry.name, 'en-US': entry.labelEn || entry.name },
  }))
  const known = new Set(tags.map((t) => t.slug))

  const bookmarks = items
    .map(({ slug, entry }) => ({
      slug,
      title: entry.title,
      url: entry.url ?? '',
      domain: domainOf(entry.url ?? ''),
      type: entry.type,
      tags: entry.tags.filter((t): t is string => !!t && known.has(t)),
      note: { 'pt-BR': entry.notePt, 'en-US': entry.noteEn || entry.notePt },
      language: entry.language,
      favorite: entry.favorite,
      addedAt: entry.addedAt ?? '',
    }))
    .filter((b) => b.url)
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt) || a.title.localeCompare(b.title))

  return { bookmarks, tags }
}
