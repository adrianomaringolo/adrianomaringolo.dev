import type { BlogPost } from '@/types/blog'

export const nextjsTips: BlogPost = {
  slug: 'nextjs-tips',
  title: {
    'pt-BR': 'Next.js 15: Novidades e Dicas Práticas',
    'en-US': "Next.js 15: What's New and Practical Tips",
  },
  excerpt: {
    'pt-BR':
      'Explore as principais novidades do Next.js 15 e como aplicá-las em seus projetos.',
    'en-US':
      'Explore the main features of Next.js 15 and how to apply them in your projects.',
  },
  content: {
    'pt-BR': `# Next.js 15: Novidades e Dicas Práticas

O Next.js 15 trouxe várias melhorias importantes. Vamos explorar as principais.

## App Router Melhorado

O App Router agora está mais estável e performático.

## Server Components por Padrão

Entenda como aproveitar ao máximo os Server Components.

## Turbopack em Produção

O novo bundler está revolucionando a velocidade de build.`,
    'en-US': `# Next.js 15: What's New and Practical Tips

Next.js 15 brought several important improvements. Let's explore the main ones.

## Improved App Router

The App Router is now more stable and performant.

## Server Components by Default

Understand how to make the most of Server Components.

## Turbopack in Production

The new bundler is revolutionizing build speed.`,
  },
  author: 'Adriano Maringolo',
  publishedAt: '2025-01-18',
  readingTime: 4,
  tags: ['nextjs', 'javascript', 'web'],
  featured: true,
}
