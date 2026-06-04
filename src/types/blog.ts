export interface BlogPost {
  slug: string
  title: {
    'pt-BR': string
    'en-US': string
  }
  excerpt: {
    'pt-BR': string
    'en-US': string
  }
  content: {
    'pt-BR': string
    'en-US': string
  }
  author: string
  publishedAt: string
  readingTime: number
  tags: string[]
  featured: boolean
  image?: string
}

export interface BlogPostMetadata {
  id?: string
  slug: string
  title: {
    'pt-BR': string
    'en-US': string
  }
  excerpt: {
    'pt-BR': string
    'en-US': string
  }
  author: string
  publishedAt: string
  readingTime: number
  tags: string[]
  featured: boolean
  image?: string
}
