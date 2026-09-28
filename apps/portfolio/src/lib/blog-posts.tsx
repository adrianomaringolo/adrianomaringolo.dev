export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: number
  tags: string[]
  image?: string
  content?: string
}

export const blogPosts: Record<string, BlogPost[]> = {
  'pt-BR': [
    {
      slug: 'react-performance-tips',
      title: '10 Dicas de Performance para React',
      excerpt:
        'Aprenda técnicas essenciais para otimizar a performance de suas aplicações React e proporcionar uma melhor experiência do usuário.',
      date: '2024-01-15',
      readTime: 8,
      tags: ['React', 'Performance', 'JavaScript'],
      image: '/react-performance-optimization-code.jpg',
      content: `# 10 Dicas de Performance para React

React é uma biblioteca poderosa, mas aplicações mal otimizadas podem sofrer com problemas de performance. Aqui estão 10 dicas essenciais para manter sua aplicação React rápida e responsiva.

## 1. Use React.memo para Componentes Puros

\`\`\`jsx
const MyComponent = React.memo(({ name, age }) => {
  return <div>{name} - {age}</div>
})
\`\`\`

## 2. Implemente useMemo para Cálculos Custosos

\`\`\`jsx
const expensiveValue = useMemo(() => {
  return heavyCalculation(data)
}, [data])
\`\`\`

## 3. Use useCallback para Funções

\`\`\`jsx
const handleClick = useCallback(() => {
  // lógica do click
}, [dependency])
\`\`\`

Essas técnicas podem melhorar significativamente a performance da sua aplicação React.`,
    },
    {
      slug: 'nextjs-app-router',
      title: 'Guia Completo do Next.js App Router',
      excerpt:
        'Descubra como usar o novo App Router do Next.js 13+ para criar aplicações web modernas com roteamento baseado em arquivos.',
      date: '2024-01-10',
      readTime: 12,
      tags: ['Next.js', 'React', 'Roteamento'],
      image: '/next-js-app-router-architecture.jpg',
      content: `# Guia Completo do Next.js App Router

O App Router é a nova forma de estruturar aplicações Next.js, introduzindo conceitos como Server Components e layouts aninhados.

## Estrutura de Pastas

\`\`\`
app/
  layout.tsx
  page.tsx
  about/
    page.tsx
  blog/
    [slug]/
      page.tsx
\`\`\`

## Server Components vs Client Components

Por padrão, todos os componentes no App Router são Server Components, executados no servidor.

\`\`\`tsx
// Server Component (padrão)
export default function Page() {
  return <h1>Hello World</h1>
}

// Client Component
'use client'
export default function ClientPage() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
\`\`\`

O App Router oferece melhor performance e SEO por padrão.`,
    },
    {
      slug: 'tailwind-best-practices',
      title: 'Melhores Práticas com Tailwind CSS',
      excerpt:
        'Aprenda a usar Tailwind CSS de forma eficiente e mantenha seu código limpo e organizado com essas práticas recomendadas.',
      date: '2024-01-05',
      readTime: 6,
      tags: ['CSS', 'Tailwind', 'Design'],
      image: '/tailwindcss-utility-classes-design.jpg',
      content: `# Melhores Práticas com Tailwind CSS

Tailwind CSS é um framework CSS utility-first que permite criar designs customizados rapidamente.

## 1. Use @apply para Componentes Reutilizáveis

\`\`\`css
.btn-primary {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
}
\`\`\`

## 2. Configure Seu Design System

\`\`\`js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2',
        secondary: '#14171A'
      }
    }
  }
}
\`\`\`

## 3. Use Responsive Design

\`\`\`html
<div class="text-sm md:text-base lg:text-lg">
  Texto responsivo
</div>
\`\`\`

Essas práticas ajudam a manter o código organizado e escalável.`,
    },
  ],
  'en-US': [
    {
      slug: 'react-performance-tips',
      title: '10 React Performance Tips',
      excerpt:
        'Learn essential techniques to optimize your React applications performance and provide a better user experience.',
      date: '2024-01-15',
      readTime: 8,
      tags: ['React', 'Performance', 'JavaScript'],
      image: '/react-performance-optimization-code.jpg',
      content: `# 10 React Performance Tips

React is a powerful library, but poorly optimized applications can suffer from performance issues. Here are 10 essential tips to keep your React application fast and responsive.

## 1. Use React.memo for Pure Components

\`\`\`jsx
const MyComponent = React.memo(({ name, age }) => {
  return <div>{name} - {age}</div>
})
\`\`\`

## 2. Implement useMemo for Expensive Calculations

\`\`\`jsx
const expensiveValue = useMemo(() => {
  return heavyCalculation(data)
}, [data])
\`\`\`

## 3. Use useCallback for Functions

\`\`\`jsx
const handleClick = useCallback(() => {
  // click logic
}, [dependency])
\`\`\`

These techniques can significantly improve your React application's performance.`,
    },
    {
      slug: 'nextjs-app-router',
      title: 'Complete Guide to Next.js App Router',
      excerpt:
        'Discover how to use the new App Router in Next.js 13+ to create modern web applications with file-based routing.',
      date: '2024-01-10',
      readTime: 12,
      tags: ['Next.js', 'React', 'Routing'],
      image: '/next-js-app-router-architecture.jpg',
      content: `# Complete Guide to Next.js App Router

The App Router is the new way to structure Next.js applications, introducing concepts like Server Components and nested layouts.

## Folder Structure

\`\`\`
app/
  layout.tsx
  page.tsx
  about/
    page.tsx
  blog/
    [slug]/
      page.tsx
\`\`\`

## Server Components vs Client Components

By default, all components in the App Router are Server Components, executed on the server.

\`\`\`tsx
// Server Component (default)
export default function Page() {
  return <h1>Hello World</h1>
}

// Client Component
'use client'
export default function ClientPage() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
\`\`\`

The App Router offers better performance and SEO by default.`,
    },
    {
      slug: 'tailwind-best-practices',
      title: 'Tailwind CSS Best Practices',
      excerpt:
        'Learn how to use Tailwind CSS efficiently and keep your code clean and organized with these recommended practices.',
      date: '2024-01-05',
      readTime: 6,
      tags: ['CSS', 'Tailwind', 'Design'],
      image: '/tailwindcss-utility-classes-design.jpg',
      content: `# Tailwind CSS Best Practices

Tailwind CSS is a utility-first CSS framework that allows you to create custom designs quickly.

## 1. Use @apply for Reusable Components

\`\`\`css
.btn-primary {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
}
\`\`\`

## 2. Configure Your Design System

\`\`\`js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2',
        secondary: '#14171A'
      }
    }
  }
}
\`\`\`

## 3. Use Responsive Design

\`\`\`html
<div class="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
\`\`\`

These practices help keep your code organized and scalable.`,
    },
  ],
}

export function getAllPosts(locale = 'pt-BR'): BlogPost[] {
  return blogPosts[locale] || blogPosts['pt-BR']
}

export function getPostBySlug(slug: string, locale = 'pt-BR'): BlogPost | undefined {
  const posts = getAllPosts(locale)
  return posts.find((post) => post.slug === slug)
}
