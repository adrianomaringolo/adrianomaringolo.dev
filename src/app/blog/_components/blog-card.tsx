'use client'

import { useLocale } from '@/hooks/use-locale'
import type { BlogPostMetadata } from '@/types/blog'
import { Badge, Button, Card, CardContent } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { Calendar, Clock, User } from 'lucide-react'
import Link from 'next/link'

interface BlogCardProps {
  post: BlogPostMetadata
  index?: number
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card className="h-full bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-border/50 hover:border-primary/30 transition-all duration-300 flex flex-col">
        <CardContent className="p-6 flex flex-col h-full">
          {/* Featured Badge */}
          {post.featured && (
            <Badge className="mb-4 w-fit bg-primary/10 text-primary border-primary/20">
              ⭐ {locale === 'pt-BR' ? 'Destaque' : 'Featured'}
            </Badge>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold mb-3 line-clamp-2 flex-shrink-0">
            {post.title[locale]}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
            {post.excerpt[locale]}
          </p>

          {/* Meta Info */}
          <div className="flex flex-col gap-3 mt-auto">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>
                  {post.readingTime} {tBlog('readingTime')}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>

              <Link href={`/blog/${post.slug}`}>
                <Button size="sm" variant="outline">
                  {tBlog('readMore')}
                </Button>
              </Link>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    className="text-xs bg-muted/30 text-muted-foreground border-muted/50 hover:bg-muted/40"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
