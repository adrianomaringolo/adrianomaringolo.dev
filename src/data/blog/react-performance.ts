import type { BlogPost } from '@/types/blog'

export const reactPerformance: BlogPost = {
  slug: 'react-performance',
  title: {
    'pt-BR': '10 Técnicas Avançadas para Otimizar Performance em React',
    'en-US': '10 Advanced Techniques to Optimize React Performance',
  },
  excerpt: {
    'pt-BR':
      'Descubra técnicas profissionais para tornar suas aplicações React mais rápidas e eficientes.',
    'en-US':
      'Discover professional techniques to make your React applications faster and more efficient.',
  },
  content: {
    'pt-BR': `# 10 Técnicas Avançadas para Otimizar Performance em React

Performance é crucial para uma boa experiência do usuário. Aqui estão as técnicas mais eficazes que uso em projetos reais.

## 1. React.memo e useMemo

Evite re-renders desnecessários com memoização inteligente.

## 2. Code Splitting com React.lazy

Carregue componentes sob demanda para reduzir o bundle inicial.

## 3. Virtualization para Listas Grandes

Use bibliotecas como react-window para listas com milhares de itens.

## 4. Otimização de Imagens

Implemente lazy loading e formatos modernos como WebP.

## 5. Bundle Analysis

Analise e otimize o tamanho do seu bundle regularmente.`,
    'en-US': `# 10 Advanced Techniques to Optimize React Performance

Performance is crucial for good user experience. Here are the most effective techniques I use in real projects.

## 1. React.memo and useMemo

Avoid unnecessary re-renders with smart memoization.

## 2. Code Splitting with React.lazy

Load components on demand to reduce initial bundle.

## 3. Virtualization for Large Lists

Use libraries like react-window for lists with thousands of items.

## 4. Image Optimization

Implement lazy loading and modern formats like WebP.

## 5. Bundle Analysis

Analyze and optimize your bundle size regularly.`,
  },
  author: 'Adriano Maringolo',
  publishedAt: '2025-01-20',
  readingTime: 6,
  tags: ['react', 'performance', 'otimização'],
  featured: false,
}
