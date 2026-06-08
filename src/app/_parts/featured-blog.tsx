'use client'

import { useLocale } from '@/hooks/use-locale'
import type { BlogPostMetadata } from '@/types/blog'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface FeaturedBlogProps {
  posts: BlogPostMetadata[]
}

export function FeaturedBlog({ posts }: FeaturedBlogProps) {
  const { locale, t } = useLocale()

  if (posts.length === 0) return null

  const [featured, ...rest] = posts

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(locale === 'pt-BR' ? 'pt-BR' : 'en-US', {
      year: 'numeric',
      month: 'short',
    })

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-border/40">
      <div className="max-w-6xl mx-auto">

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          viewport={{ once: true, amount: 0 }}
          className="text-xs tracking-[0.2em] text-primary uppercase font-mono mb-10"
        >
          {t('home.blog.title')}
        </motion.p>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-start">

          {/* Featured post — large card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            viewport={{ once: true, amount: 0 }}
          >
            <Link href={`/blog/${featured.slug}`} className="group block">
              {featured.image && (
                <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-5 bg-muted">
                  <Image
                    src={featured.image}
                    alt={featured.title[locale]}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 700px"
                    priority
                  />
                </div>
              )}
              <div className="space-y-2">
                {featured.featured && (
                  <p className="text-xs font-mono text-primary/60 uppercase tracking-[0.15em]">
                    {locale === 'pt-BR' ? 'Destaque' : 'Featured'}
                  </p>
                )}
                <h2 className="text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug tracking-tight [font-family:var(--font-geist-sans)]">
                  {featured.title[locale]}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {featured.excerpt[locale]}
                </p>
                <p className="text-xs text-muted-foreground/40 pt-1">
                  {formatDate(featured.publishedAt)}
                  {' · '}
                  {featured.readingTime} {t('home.blog.readTime')}
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Remaining posts — compact list */}
          <div className="lg:border-l lg:border-border/40 lg:pl-12">
            <ul className="divide-y divide-border/40">
              {rest.slice(0, 3).map((post, index) => (
                <motion.li
                  key={post.slug}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.07, ease }}
                  viewport={{ once: true, amount: 0 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group flex gap-3 py-5 items-start">
                    {post.image && (
                      <div className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden bg-muted">
                        <Image
                          src={post.image}
                          alt={post.title[locale]}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="64px"
                        />
                      </div>
                    )}
                    <div className="space-y-1 min-w-0">
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {post.title[locale]}
                      </h3>
                      <p className="text-xs text-muted-foreground/40">
                        {formatDate(post.publishedAt)}
                        {' · '}
                        {post.readingTime} {t('home.blog.readTime')}
                      </p>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="pt-5">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('home.blog.seeAll')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
