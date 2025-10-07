import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://adrianomaringolo.dev'
  const pages = ['', '/about', '/projects', '/blog', '/contact']
  
  return pages.map((page) => {
    const priority = page === '' ? 1 : page === '/projects' ? 0.9 : page === '/about' ? 0.8 : page === '/blog' ? 0.7 : 0.6
    const changeFrequency = page === '/projects' || page === '/blog' ? 'weekly' : 'monthly'
    
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
}