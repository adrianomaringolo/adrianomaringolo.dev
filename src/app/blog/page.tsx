'use client'

import { BlogCard } from '@/app/blog/_components/blog-card'
import { FloatingCode } from '@/components/ui/floating-code'
import { GradientMesh } from '@/components/ui/gradient-mesh'
import { getBlogPosts } from '@/data/blog'
import { useLocale } from '@/hooks/use-locale'
import type { BlogPostMetadata } from '@/types/blog'
import { PaginatedItems } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { BookOpen, Clock, Tags } from 'lucide-react'

export default function BlogPage() {
  const { locale, t } = useLocale()
  const posts = getBlogPosts()

  const totalReadingTime = posts.reduce(
    (acc: number, post: BlogPostMetadata) => acc + post.readingTime,
    0,
  )
  const allTags = Array.from(
    new Set(posts.flatMap((post: BlogPostMetadata) => post.tags)),
  )

  const tBlog = (key: string) => t(`blog.${key}`)

  return (
    <div className="min-h-screen relative">
      <GradientMesh />

      {/* Floating Code Elements */}
      <FloatingCode count={30} />

      <div className="container mx-auto px-4 py-24 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{tBlog('title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {tBlog('description')}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-blue-500" />
              </div>
              <span className="text-muted-foreground">
                <strong className="text-foreground">{posts.length}</strong>{' '}
                {locale === 'pt-BR' ? 'Posts' : 'Posts'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-green-500" />
              </div>
              <span className="text-muted-foreground">
                <strong className="text-foreground">{totalReadingTime}</strong>{' '}
                {locale === 'pt-BR' ? 'Min de Leitura' : 'Min Read'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Tags className="w-4 h-4 text-purple-500" />
              </div>
              <span className="text-muted-foreground">
                <strong className="text-foreground">{allTags.length}</strong>{' '}
                {locale === 'pt-BR' ? 'Tópicos' : 'Topics'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Paginated Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-7xl mx-auto"
        >
          <PaginatedItems<BlogPostMetadata>
            data={posts}
            perPage={6}
            itemsContainerClass="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            emptyState={
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {locale === 'pt-BR' ? 'Nenhum post encontrado.' : 'No posts found.'}
                </p>
              </div>
            }
            counterText={
              locale === 'pt-BR'
                ? 'Mostrando {start} a {end} de {total} posts'
                : 'Showing {start} to {end} of {total} posts'
            }
          >
            {(post: BlogPostMetadata, index: number) => (
              <BlogCard key={post.slug} post={post} index={index} />
            )}
          </PaginatedItems>
        </motion.div>
      </div>
    </div>
  )
}
