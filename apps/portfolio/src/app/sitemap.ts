import { projects } from '@/data/projects'
import { getBlogPosts } from '@/lib/blog'
import type { MetadataRoute } from 'next'

// Bump this by hand when a static page's content meaningfully changes.
// Using `new Date()` here would make every page look "modified now" on every
// build, which is a misleading freshness signal to crawlers.
const staticPagesLastModified = new Date('2026-07-14')

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://adrianomaringolo.dev'
  const pages = ['', '/about', '/projects', '/blog', '/contact', '/resume']
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
              : page === '/resume'
                ? 0.5
                : 0.6
    const changeFrequency =
      page === '/projects' || page === '/blog' ? 'weekly' : 'monthly'

    // No `alternates.languages`: pt-BR/en-US share this URL (locale switches
    // client-side), so there's no distinct URL per language to declare.
    return {
      url: `${baseUrl}${page}`,
      lastModified: staticPagesLastModified,
      changeFrequency: changeFrequency as 'weekly' | 'monthly',
      priority,
    }
  })

  // Project pages — same as above, no distinct URL per language.
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.startDate),
    changeFrequency: 'monthly' as const,
    priority: project.featured ? 0.8 : 0.6,
  }))

  // Blog posts — these DO have a distinct URL per language (see
  // src/app/blog/[slug]/page.tsx generateMetadata), so hreflang is valid here.
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: post.featured ? 0.8 : 0.6,
    alternates: {
      languages: {
        'pt-BR': `${baseUrl}/blog/${post.slug}`,
        'en-US': `${baseUrl}/blog/${post.slug}?lang=en-US`,
      },
    },
  }))

  return [...staticPages, ...projectPages, ...blogPages]
}
