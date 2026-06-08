'use client'

import { useLocale } from '@/hooks/use-locale'
import type { BlogPostMetadata } from '@/types/blog'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface CTASectionProps {
  posts?: BlogPostMetadata[]
}

export function CTASection({ posts = [] }: CTASectionProps) {
  const { t, locale } = useLocale()
  const recentPosts = posts.slice(0, 3)

  return (
    <section className="py-28 px-6 md:px-12 lg:px-20 border-t border-border/40">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_360px] gap-20 items-start">

        {/* CTA principal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          viewport={{ once: true, amount: 0 }}
          className="space-y-6"
        >
          <h2
            className="font-bold tracking-tight text-foreground text-wrap-balance"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
          >
            {t('cta.title')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
            {t('cta.description')}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
          >
            {t('cta.button')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Posts recentes */}
        {recentPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            viewport={{ once: true, amount: 0 }}
          >
            <p className="text-xs tracking-[0.2em] text-primary uppercase font-mono mb-6">
              {t('home.blog.title')}
            </p>
            <ul className="divide-y divide-border/40">
              {recentPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex items-center justify-between py-4 gap-4"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-1">
                        {post.title[locale] ?? post.title['pt-BR']}
                      </p>
                      <p className="text-xs text-muted-foreground/40 mt-0.5">
                        {post.readingTime} {t('home.blog.readTime')}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 text-muted-foreground/25 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors mt-4"
            >
              {t('home.blog.seeAll')}
              <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
