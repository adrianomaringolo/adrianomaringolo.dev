'use client'

import { FloatingCode } from '@/components/ui/floating-code'
import { GradientMesh } from '@/components/ui/gradient-mesh'
import { RevealAnimation } from '@/components/ui/reveal-animation'
import { useLocale } from '@/hooks/use-locale'
import type { BlogPost, BlogPostMetadata } from '@/types/blog'
import { Badge, Button, cn } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { BlogCard } from '../_components/blog-card'

interface BlogPostClientProps {
  post: BlogPost
  relatedPosts: BlogPostMetadata[]
}

export function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const { locale, t } = useLocale()
  const tBlog = (tag: string) => t(`blog.${tag}`)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale === 'pt-BR' ? 'pt-BR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen relative">
      <GradientMesh />

      {/* Floating Code Elements */}
      <FloatingCode count={25} />

      <div className="relative z-10">
        {/* Header */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <RevealAnimation direction="up" delay={0.2}>
              {/* Back Button */}
              <Button
                className={cn(
                  'mb-8 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium',
                  'ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  'focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background',
                  'hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 group',
                )}
                asChild
              >
                <Link href="/blog">
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  {tBlog('backToBlog')}
                </Link>
              </Button>

              {/* Featured Badge */}
              {post.featured && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="mb-4"
                >
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    ⭐ {locale === 'pt-BR' ? 'Post em Destaque' : 'Featured Post'}
                  </Badge>
                </motion.div>
              )}

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {post.title[locale]}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>
                    {tBlog('author')} {post.author}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {tBlog('publishedAt')} {formatDate(post.publishedAt)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    {post.readingTime} {tBlog('readingTime')}
                  </span>
                </div>
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="text-sm text-muted-foreground mr-2">
                    {tBlog('tags')}:
                  </span>
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-muted/30 text-muted-foreground border-muted/50 hover:bg-muted/40"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </RevealAnimation>
          </div>
        </section>

        {/* Content */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <RevealAnimation direction="up" delay={0.4}>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold mb-6 text-foreground">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold mb-4 mt-8 text-foreground">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-bold mb-3 mt-6 text-foreground">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-4 text-muted-foreground leading-relaxed">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="mb-4 space-y-2 text-muted-foreground">{children}</ul>
                    ),
                    li: ({ children }) => (
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{children}</span>
                      </li>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-foreground font-semibold">
                        {children}
                      </strong>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {post.content[locale]}
                </ReactMarkdown>
              </div>
            </RevealAnimation>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
            <div className="max-w-6xl mx-auto">
              <RevealAnimation direction="up" delay={0.6}>
                <h2 className="text-3xl font-bold mb-8 text-center">
                  {tBlog('relatedPosts')}
                </h2>
              </RevealAnimation>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
