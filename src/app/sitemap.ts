import { getBlogPosts } from '@/data/blog'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://adrianomaringolo.dev'
  const pages = ['', '/about', '/projects', '/blog', '/contact']
  const blogPosts = getBlogPosts()

  // Static pages
  const staticPages = pages.map((page) => {
    const priority =
      page === ''
        ? 1
        : page === '/projects'
          ? 0.9
          : page === '/about'
            ? 0.8
            : page === '/blog'
              ? 0.7
              : 0.6
    const changeFrequency =
      page === '/projects' || page === '/blog' ? 'weekly' : 'monthly'

    return {
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: changeFrequency as 'weekly' | 'monthly',
      priority,
      alternates: {
        languages: {
          'pt-BR': `${baseUrl}${page}`,
          'en-US': `${baseUrl}${page}`, // Same URL for both languages (client-side switching)
        },
      },
    }
  })

  // Blog posts
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: post.featured ? 0.8 : 0.6,
    alternates: {
      languages: {
        'pt-BR': `${baseUrl}/blog/${post.slug}`,
        'en-US': `${baseUrl}/blog/${post.slug}`,
      },
    },
  }))

  return [...staticPages, ...blogPages]
}
