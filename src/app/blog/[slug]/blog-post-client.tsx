'use client'

import { BlogCard } from '@/app/blog/_components/blog-card'
import { GiscusComments } from '@/app/blog/_components/giscus-comments'
import { useLocale } from '@/hooks/use-locale'
import type { BlogPost, BlogPostMetadata } from '@/types/blog'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface BlogPostClientProps {
  post: BlogPost
  relatedPosts: BlogPostMetadata[]
}

export function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const { locale, t } = useLocale()

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(locale === 'pt-BR' ? 'pt-BR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

  return (
    <div className="min-h-screen">

      {/* Header */}
      <section className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {/* Back link */}
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
            >
              <ArrowLeft
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                aria-hidden
              />
              {t('blog.backToBlog')}
            </Link>

            {/* Featured marker */}
            {post.featured && (
              <p className="text-xs font-mono text-primary/60 uppercase tracking-[0.15em] mb-4">
                {locale === 'pt-BR' ? 'Post em destaque' : 'Featured post'}
              </p>
            )}

            {/* Title */}
            <h1
              className="font-bold tracking-tight text-foreground [font-family:var(--font-geist-sans)] text-wrap-balance mb-8"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
            >
              {post.title[locale]}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground/60 mb-6">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" aria-hidden />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" aria-hidden />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" aria-hidden />
                {post.readingTime} {t('blog.readingTime')}
              </span>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <p className="text-xs text-muted-foreground/50">
                {post.tags.map((tag) => t(`blog.tags.${tag}`)).join(' · ')}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 px-6 md:px-12 lg:px-20 border-t border-border/40">
        <div className="max-w-3xl mx-auto pt-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="prose prose-slate dark:prose-invert max-w-none"
          >
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold mb-6 mt-10 text-foreground tracking-tight [font-family:var(--font-geist-sans)] first:mt-0">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-semibold mb-4 mt-10 text-foreground tracking-tight">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-semibold mb-3 mt-8 text-foreground">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-5 text-foreground/80 leading-relaxed max-w-[65ch]">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-5 space-y-2 text-foreground/80">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-5 space-y-2 text-foreground/80 list-decimal list-inside">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="flex items-start gap-2 leading-relaxed">
                    <span className="text-primary/60 mt-1.5 shrink-0 text-xs">▸</span>
                    <span>{children}</span>
                  </li>
                ),
                strong: ({ children }) => (
                  <strong className="text-foreground font-semibold">{children}</strong>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-primary/30 pl-5 my-6 text-muted-foreground italic">
                    {children}
                  </blockquote>
                ),
                code: ({ children, className }) => {
                  const isBlock = className?.includes('language-')
                  if (isBlock) {
                    return (
                      <code className="block bg-muted/60 rounded-lg px-5 py-4 text-sm font-mono text-foreground/90 overflow-x-auto mb-5 leading-relaxed">
                        {children}
                      </code>
                    )
                  }
                  return (
                    <code className="bg-muted/60 rounded px-1.5 py-0.5 text-sm font-mono text-foreground/90">
                      {children}
                    </code>
                  )
                },
                pre: ({ children }) => (
                  <pre className="mb-5 rounded-lg overflow-hidden">{children}</pre>
                ),
                img: ({ src, alt }) => (
                  <span className="block my-8 -mx-0">
                    <img
                      src={src}
                      alt={alt ?? ''}
                      className="w-full rounded-lg object-cover"
                      style={{ maxHeight: '450px' }}
                      loading="lazy"
                    />
                    {alt && (
                      <span className="block text-xs text-muted-foreground/40 text-center mt-2 italic">
                        {alt}
                      </span>
                    )}
                  </span>
                ),
              }}
            >
              {post.content[locale]}
            </ReactMarkdown>
          </motion.div>
        </div>
      </section>

      {/* Comments */}
      <section className="py-16 px-6 md:px-12 lg:px-20 border-t border-border/40">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            viewport={{ once: true, amount: 0 }}
          >
            <p className="text-xs tracking-[0.2em] text-primary uppercase font-mono mb-8">
              {t('blog.comments')}
            </p>
            <GiscusComments />
          </motion.div>
        </div>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-6 md:px-12 lg:px-20 border-t border-border/40">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              viewport={{ once: true, amount: 0 }}
            >
              <p className="text-xs tracking-[0.2em] text-primary uppercase font-mono mb-8">
                {t('blog.relatedPosts')}
              </p>
              <ul className="divide-y divide-border/40 border-y border-border/40">
                {relatedPosts.map((relatedPost, index) => (
                  <li key={relatedPost.slug}>
                    <BlogCard post={relatedPost} index={index} />
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  )
}
