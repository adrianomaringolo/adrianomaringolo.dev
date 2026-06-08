'use client'

import { useLocale } from '@/hooks/use-locale'
import type { BlogPostMetadata } from '@/types/blog'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface BlogCardProps {
  post: BlogPostMetadata
  index?: number
}

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const { locale, t } = useLocale()

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(locale === 'pt-BR' ? 'pt-BR' : 'en-US', {
      year: 'numeric',
      month: 'short',
    })

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease }}
      viewport={{ once: true, amount: 0 }}
    >
      <Link href={`/blog/${post.slug}`} className="group flex items-start gap-4 py-5">
        <span className="text-xs font-mono text-muted-foreground/25 w-5 shrink-0 tabular-nums select-none pt-0.5">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="flex-1 space-y-1.5 min-w-0">
          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
            {post.title[locale]}
          </h3>
          <p className="text-sm text-muted-foreground/70 line-clamp-2 leading-relaxed">
            {post.excerpt[locale]}
          </p>
          <p className="text-xs text-muted-foreground/40">
            {formatDate(post.publishedAt)}
            {' · '}
            {post.readingTime} {t('home.blog.readTime')}
            {post.tags.length > 0 && (
              <> · {post.tags.slice(0, 2).join(' · ')}</>
            )}
          </p>
        </div>

        <ArrowRight
          className="w-3.5 h-3.5 shrink-0 text-muted-foreground/25 group-hover:text-primary group-hover:translate-x-1 transition-all mt-0.5"
          aria-hidden
        />
      </Link>
    </motion.div>
  )
}
