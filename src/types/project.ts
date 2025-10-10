export interface ProjectScreenshot {
  id: string
  url: string
  alt: string
  caption: {
    'pt-BR': string
    'en-US': string
  }
}

export interface ProjectTestimonial {
  author: string
  role: {
    'pt-BR': string
    'en-US': string
  }
  company: string
  avatar?: string
  content: {
    'pt-BR': string
    'en-US': string
  }
  rating?: number
}

export interface ProjectChallenge {
  title: {
    'pt-BR': string
    'en-US': string
  }
  description: {
    'pt-BR': string
    'en-US': string
  }
  solution: {
    'pt-BR': string
    'en-US': string
  }
}

export interface ProjectMetrics {
  label: {
    'pt-BR': string
    'en-US': string
  }
  value: {
    'pt-BR': string
    'en-US': string
  }
  improvement?: {
    'pt-BR': string
    'en-US': string
  }
}

export interface Project {
  id: string
  slug: string
  title: {
    'pt-BR': string
    'en-US': string
  }
  shortDescription: {
    'pt-BR': string
    'en-US': string
  }
  fullDescription: {
    'pt-BR': string
    'en-US': string
  }
  category: 'web' | 'webapp' | 'library'
  tags: {
    'pt-BR': string[]
    'en-US': string[]
  }
  technologies: string[]
  thumbnail: string
  images: string[]
  screenshots: ProjectScreenshot[]
  liveUrl?: string
  githubUrl?: string
  figmaUrl?: string
  status?: 'completed' | 'in-progress' | 'concept'
  featured: boolean
  startDate: string
  endDate?: string
  client?: {
    name: string
    industry: string
    size: 'startup' | 'small' | 'medium' | 'enterprise'
  }
  challenges: ProjectChallenge[]
  metrics?: ProjectMetrics[]
  testimonial?: ProjectTestimonial
  story: {
    problem: {
      'pt-BR': string
      'en-US': string
    }
    solution: {
      'pt-BR': string
      'en-US': string
    }
    process: {
      'pt-BR': string
      'en-US': string
    }
    results: {
      'pt-BR': string
      'en-US': string
    }
  }
  nextSteps?: {
    'pt-BR': string[]
    'en-US': string[]
  }
  features?: {
    title: {
      'pt-BR': string
      'en-US': string
    }
    description: {
      'pt-BR': string
      'en-US': string
    }
    icon?: string
  }[]
}
