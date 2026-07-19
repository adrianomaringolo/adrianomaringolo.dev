'use client'

import { useLocale } from '@/hooks/use-locale'
import { parseLocalDate } from '@/lib/formatters'
import { cn } from '@/lib/utils'
import type { BlogPostMetadata } from '@/types/blog'
import { Button } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface BlogListClientProps {
  posts: BlogPostMetadata[]
}

export function BlogListClient({ posts }: BlogListClientProps) {
  const { locale, t } = useLocale()
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const formatDate = (dateString: string) =>
    parseLocalDate(dateString).toLocaleDateString(locale === 'pt-BR' ? 'pt-BR' : 'en-US', {
      year: 'numeric',
      month: 'short',
    })

  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>()
    for (const post of posts) {
      for (const tag of post.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1)
      }
    }
    return counts
  }, [posts])

  const tags = useMemo(
    () => Array.from(tagCounts.keys()).sort((a, b) => tagCounts.get(b)! - tagCounts.get(a)!),
    [tagCounts],
  )

  const filteredPosts = useMemo(
    () => (selectedTag ? posts.filter((post) => post.tags.includes(selectedTag)) : posts),
    [posts, selectedTag],
  )

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-14"
        >
          <p className="text-xs tracking-[0.2em] text-primary uppercase font-mono mb-4">
            {t('home.blog.title')}
          </p>
          <h1
            className="font-bold tracking-tight text-foreground [font-family:var(--font-geist-sans)] text-wrap-balance"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
          >
            {t('blog.title')}
          </h1>
          <p className="mt-3 text-muted-foreground leading-relaxed max-w-lg">
            {t('blog.subtitle')}
          </p>
        </motion.div>

        {/* Tag filter */}
        {tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="flex flex-wrap gap-2 mb-10"
          >
            <Button
              type="button"
              variant={selectedTag === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedTag(null)}
              className={cn(
                'rounded-full font-mono',
                selectedTag === null && 'bg-foreground text-background border-foreground hover:bg-foreground/90',
              )}
            >
              {locale === 'pt-BR' ? 'Todos' : 'All'}
              <span className="ml-1.5 opacity-50">{posts.length}</span>
            </Button>
            {tags.map((tag) => (
              <Button
                key={tag}
                type="button"
                variant={selectedTag === tag ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className="rounded-full font-mono"
              >
                {t(`blog.tags.${tag}`)}
                <span className="ml-1.5 opacity-50">{tagCounts.get(tag)}</span>
              </Button>
            ))}
          </motion.div>
        )}

        {/* Post list */}
        {filteredPosts.length > 0 ? (
          <ul className="divide-y divide-border/40 border-y border-border/40">
            {filteredPosts.map((post: BlogPostMetadata, index: number) => (
              <motion.li
                key={post.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.06, ease }}
                viewport={{ once: true, amount: 0 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="grid grid-cols-[28px_96px_1fr] sm:grid-cols-[32px_120px_1fr] lg:grid-cols-[48px_144px_1fr_32px] gap-4 lg:gap-8 py-8 items-start rounded-lg -mx-4 px-4 transition-colors hover:bg-muted/40">

                    {/* Index */}
                    <span className="text-sm text-muted-foreground/30 font-mono pt-0.5 tabular-nums select-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Thumbnail */}
                    <div className="w-full aspect-[4/3] lg:aspect-[16/11] overflow-hidden rounded-lg ring-1 ring-border/50 bg-muted shrink-0">
                      {post.image && (
                        <img
                          src={post.image}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="space-y-2 min-w-0">
                      {post.featured && (
                        <p className="text-xs font-mono text-primary/60 uppercase tracking-[0.15em]">
                          {locale === 'pt-BR' ? 'Destaque' : 'Featured'}
                        </p>
                      )}
                      <h2 className="text-lg lg:text-xl font-semibold text-foreground group-hover:text-primary transition-colors leading-snug text-wrap-balance">
                        {post.title[locale]}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {post.excerpt[locale]}
                      </p>
                      <p className="text-xs text-muted-foreground/40">
                        {formatDate(post.publishedAt)}
                        {' · '}
                        {post.readingTime} {t('home.blog.readTime')}
                        {post.tags.length > 0 && (
                          <> · {post.tags.slice(0, 3).map((tag) => t(`blog.tags.${tag}`)).join(' · ')}</>
                        )}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="hidden lg:flex items-start justify-end pt-1.5">
                      <ArrowRight
                        className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all"
                        aria-hidden
                      />
                    </div>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        ) : posts.length > 0 ? (
          <div className="py-16 border-t border-border/40">
            <p className="text-sm text-muted-foreground/60">
              {locale === 'pt-BR'
                ? 'Nenhum artigo encontrado para essa tag.'
                : 'No articles found for this tag.'}
            </p>
            <Button
              type="button"
              variant="link"
              onClick={() => setSelectedTag(null)}
              className="px-0 h-auto text-sm mt-1"
            >
              {locale === 'pt-BR' ? 'Limpar filtro' : 'Clear filter'}
            </Button>
          </div>
        ) : (
          <div className="py-16 border-t border-border/40">
            <p className="text-sm text-muted-foreground/60">{t('blog.underConstruction')}</p>
            <p className="text-sm text-muted-foreground/40 mt-1">{t('blog.underConstructionDescription')}</p>
          </div>
        )}
      </div>
    </section>
  )
}
