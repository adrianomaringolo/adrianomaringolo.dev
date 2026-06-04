import type { BlogPost, BlogPostMetadata } from '@/types/blog'
import { aiDevelopment } from './ai-development'
import { nextjsTips } from './nextjs-tips'
import { reactPerformance } from './react-performance'
import { vantagensPortfolio } from './vantagens-portfolio'

export const blogPosts: BlogPost[] = [
  vantagensPortfolio,
  nextjsTips,
  reactPerformance,
  aiDevelopment,
]

export const getBlogPosts = (): BlogPostMetadata[] => {
  return blogPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map(({ content, ...post }) => ({ ...post, id: post.slug }))
}

export const getFeaturedPosts = (): BlogPostMetadata[] => {
  return getBlogPosts().filter((post) => post.featured)
}

export const getBlogPost = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug)
}

export const getRelatedPosts = (
  currentSlug: string,
  tags: string[],
  limit = 3,
): BlogPostMetadata[] => {
  return getBlogPosts()
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => post.tags.some((tag) => tags.includes(tag)))
    .slice(0, limit)
}
