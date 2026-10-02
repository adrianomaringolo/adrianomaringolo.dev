'use client'

import { useLocale } from '@/hooks/use-locale'
import type { Bookmark, BookmarkTag, BookmarkType } from '@/lib/bookmarks'
import { cn } from '@/lib/utils'
import { Button } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { ArrowUpRight, Search, Star, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]
const TYPES: BookmarkType[] = ['tool', 'library', 'article', 'video', 'course', 'reference']

// Lowercase and strip accents so "animacao" finds "animação".
const fold = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()

interface BookmarksClientProps {
  bookmarks: Bookmark[]
  tags: BookmarkTag[]
}

export function BookmarksClient({ bookmarks, tags }: BookmarksClientProps) {
  const { locale, t } = useLocale()
  const [query, setQuery] = useState('')
  const [type, setType] = useState<BookmarkType | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [favoritesOnly, setFavoritesOnly] = useState(false)

  // Filters live in the URL (?q=&tipo=&tags=&fav=1) so a filtered view can be shared.
  // Read after mount instead of useSearchParams, so the page needs no Suspense boundary.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlType = params.get('tipo') as BookmarkType | null
    /* eslint-disable react-hooks/set-state-in-effect */
    setQuery(params.get('q') ?? '')
    setType(urlType && TYPES.includes(urlType) ? urlType : null)
    setSelectedTags(params.get('tags')?.split(',').filter(Boolean) ?? [])
    setFavoritesOnly(params.get('fav') === '1')
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [])

  useEffect(() => {
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (type) params.set('tipo', type)
    if (selectedTags.length) params.set('tags', selectedTags.join(','))
    if (favoritesOnly) params.set('fav', '1')
    const search = params.toString()
    window.history.replaceState(null, '', search ? `?${search}` : window.location.pathname)
  }, [query, type, selectedTags, favoritesOnly])

  const tagLabel = useMemo(
    () => new Map(tags.map((tag) => [tag.slug, tag.label[locale]])),
    [tags, locale],
  )

  // Everything a visitor might type to find an item, in both languages.
  const haystacks = useMemo(
    () =>
      new Map(
        bookmarks.map((b) => {
          const tagText = b.tags.flatMap((slug) => {
            const tag = tags.find((tg) => tg.slug === slug)
            return tag ? [tag.label['pt-BR'], tag.label['en-US']] : [slug]
          })
          return [
            b.slug,
            fold([b.title, b.domain, b.note['pt-BR'], b.note['en-US'], ...tagText].join(' ')),
          ]
        }),
      ),
    [bookmarks, tags],
  )

  const terms = fold(query).split(/\s+/).filter(Boolean)
  const matchesExceptTags = (b: Bookmark) =>
    (!type || b.type === type) &&
    (!favoritesOnly || b.favorite) &&
    terms.every((term) => haystacks.get(b.slug)!.includes(term))

  const filtered = bookmarks.filter(
    (b) => matchesExceptTags(b) && selectedTags.every((tag) => b.tags.includes(tag)),
  )

  // Tag counts follow the other filters, so a tag never promises results it can't deliver.
  const tagCounts = new Map<string, number>()
  for (const b of bookmarks.filter(matchesExceptTags)) {
    for (const tag of b.tags) tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1)
  }
  const visibleTags = tags
    .filter((tag) => tagCounts.has(tag.slug) || selectedTags.includes(tag.slug))
    .sort((a, b) => (tagCounts.get(b.slug) ?? 0) - (tagCounts.get(a.slug) ?? 0))

  const typesInUse = TYPES.filter((ty) => bookmarks.some((b) => b.type === ty))
  const hasFilters = !!(terms.length || type || selectedTags.length || favoritesOnly)

  const toggleTag = (slug: string) =>
    setSelectedTags((current) =>
      current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug],
    )

  const clearFilters = () => {
    setQuery('')
    setType(null)
    setSelectedTags([])
    setFavoritesOnly(false)
  }

  const formatDate = (date: string) =>
    new Date(`${date}T12:00:00`).toLocaleDateString(locale, { year: 'numeric', month: 'short' })

  const chip = (active: boolean) =>
    cn(
      'rounded-full font-mono',
      active && 'bg-foreground text-background border-foreground hover:bg-foreground/90',
    )

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-12"
        >
          <p className="text-xs tracking-[0.2em] text-primary uppercase font-mono mb-4">
            {t('bookmarks.eyebrow')}
          </p>
          <h1
            className="font-bold tracking-tight text-foreground [font-family:var(--font-geist-sans)] text-wrap-balance"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
          >
            {t('bookmarks.title')}
          </h1>
          <p className="mt-3 text-muted-foreground leading-relaxed max-w-xl">
            {t('bookmarks.subtitle')}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="space-y-5 mb-10"
        >
          <label className="relative block max-w-xl">
            <span className="sr-only">{t('bookmarks.searchLabel')}</span>
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('bookmarks.searchPlaceholder')}
              className="w-full rounded-full border border-border bg-background py-3 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground/40"
            />
          </label>

          <div role="group" aria-label={t('bookmarks.typeLabel')} className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant={type === null ? 'default' : 'outline'}
              aria-pressed={type === null}
              onClick={() => setType(null)}
              className={chip(type === null)}
            >
              {t('bookmarks.all')}
              <span className="ml-1.5 opacity-50">{bookmarks.length}</span>
            </Button>
            {typesInUse.map((ty) => (
              <Button
                key={ty}
                type="button"
                size="sm"
                variant={type === ty ? 'default' : 'outline'}
                aria-pressed={type === ty}
                onClick={() => setType(type === ty ? null : ty)}
                className={chip(type === ty)}
              >
                {t(`bookmarks.types.${ty}`)}
              </Button>
            ))}
            <Button
              type="button"
              size="sm"
              variant={favoritesOnly ? 'default' : 'outline'}
              aria-pressed={favoritesOnly}
              onClick={() => setFavoritesOnly(!favoritesOnly)}
              className={chip(favoritesOnly)}
            >
              <Star className="w-3.5 h-3.5 mr-1.5" aria-hidden />
              {t('bookmarks.favoritesOnly')}
            </Button>
          </div>

          {visibleTags.length > 0 && (
            <div role="group" aria-label={t('bookmarks.tagsLabel')} className="flex flex-wrap gap-x-4 gap-y-2">
              {visibleTags.map((tag) => {
                const active = selectedTags.includes(tag.slug)
                return (
                  <button
                    key={tag.slug}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleTag(tag.slug)}
                    className={cn(
                      'font-mono text-xs transition-colors',
                      active ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    #{tag.label[locale]}
                    <span className="ml-1 opacity-50">{tagCounts.get(tag.slug) ?? 0}</span>
                  </button>
                )
              })}
            </div>
          )}
        </motion.div>

        {/* Result count */}
        <div className="flex items-center justify-between gap-4 mb-3 text-xs font-mono text-muted-foreground/70">
          <p aria-live="polite">
            {t('bookmarks.results')
              .replace('{count}', String(filtered.length))
              .replace('{total}', String(bookmarks.length))}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" aria-hidden />
              {t('bookmarks.clear')}
            </button>
          )}
        </div>

        {/* List */}
        {filtered.length > 0 ? (
          <ul className="divide-y divide-border/40 border-y border-border/40">
            {filtered.map((b) => (
              <li key={b.slug} className="group">
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid gap-x-8 gap-y-2 py-7 -mx-4 px-4 rounded-lg transition-colors hover:bg-muted/40 md:grid-cols-[180px_1fr_32px]"
                >
                  <div className="font-mono text-xs text-muted-foreground/70 space-y-1 md:pt-1">
                    <p className="truncate">{b.domain}</p>
                    <p className="text-muted-foreground/50">
                      {t(`bookmarks.types.${b.type}`)} · {formatDate(b.addedAt)}
                    </p>
                  </div>

                  <div className="min-w-0 space-y-2">
                    <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {b.title}
                      {b.favorite && (
                        <Star
                          className="w-4 h-4 shrink-0 fill-amber-400 text-amber-400"
                          aria-label={t('bookmarks.favorite')}
                        />
                      )}
                    </h2>
                    {b.note[locale] && (
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                        {b.note[locale]}
                      </p>
                    )}
                    <p className="font-mono text-xs text-muted-foreground/60">
                      {b.tags.map((slug) => `#${tagLabel.get(slug) ?? slug}`).join('  ')}
                      {b.language !== 'other' &&
                        b.language !== (locale === 'pt-BR' ? 'pt' : 'en') && (
                          <span className="ml-3 text-muted-foreground/40">
                            {t(`bookmarks.language.${b.language}`)}
                          </span>
                        )}
                    </p>
                  </div>

                  <div className="hidden md:flex justify-end pt-1.5">
                    <ArrowUpRight
                      className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      aria-hidden
                    />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-16 border-t border-border/40">
            <p className="text-sm text-muted-foreground/60">{t('bookmarks.empty')}</p>
            {hasFilters && (
              <Button
                type="button"
                variant="link"
                onClick={clearFilters}
                className="px-0 h-auto text-sm mt-1"
              >
                {t('bookmarks.clear')}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
