import type { Project } from '@/types/project'

export const designSystem: Project = {
  id: '4',
  slug: 'design-system',
  title: {
    'pt-BR': 'Design System Corporativo',
    'en-US': 'Corporate Design System',
  },
  shortDescription: {
    'pt-BR':
      'Sistema de design completo com componentes reutilizáveis e documentação interativa.',
    'en-US':
      'Complete design system with reusable components and interactive documentation.',
  },
  fullDescription: {
    'pt-BR':
      'Desenvolvimento de um design system completo para empresa de tecnologia, incluindo biblioteca de componentes, tokens de design, documentação interativa e ferramentas de desenvolvimento.',
    'en-US':
      'Development of a complete design system for a technology company, including component library, design tokens, interactive documentation and development tools.',
  },
  category: 'design',
  tags: {
    'pt-BR': [
      'Design System',
      'Componentes',
      'Documentação',
      'Storybook',
      'Tokens',
      'Biblioteca',
      'UI/UX',
      'Consistência',
      'Reutilização',
    ],
    'en-US': [
      'Design System',
      'Components',
      'Documentation',
      'Storybook',
      'Tokens',
      'Library',
      'UI/UX',
      'Consistency',
      'Reusability',
    ],
  },
  technologies: ['React', 'Storybook', 'Figma', 'TypeScript', 'Styled Components'],
  thumbnail: '/projects/placeholder-designsystem.svg',
  images: [
    'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&h=800&fit=crop&crop=center',
  ],
  screenshots: [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&h=800&fit=crop&crop=center',
      alt: 'Biblioteca de componentes',
      caption: {
        'pt-BR': 'Biblioteca completa de componentes com variações e estados',
        'en-US': 'Complete component library with variations and states',
      },
    },
  ],
  figmaUrl: 'https://figma.com/design-system-demo',
  githubUrl: 'https://github.com/adrianomaringolo/design-system',
  status: 'completed',
  featured: false,
  startDate: '2023-06-01',
  endDate: '2023-09-30',
  challenges: [
    {
      title: {
        'pt-BR': 'Consistência Visual',
        'en-US': 'Visual Consistency',
      },
      description: {
        'pt-BR':
          'Diferentes equipes criavam componentes similares com estilos inconsistentes.',
        'en-US': 'Different teams created similar components with inconsistent styles.',
      },
      solution: {
        'pt-BR': 'Criamos tokens de design centralizados e documentação detalhada.',
        'en-US': 'We created centralized design tokens and detailed documentation.',
      },
    },
  ],
  metrics: [
    {
      label: { 'pt-BR': 'Tempo de Desenvolvimento', 'en-US': 'Development Time' },
      value: { 'pt-BR': '-70%', 'en-US': '-70%' },
      improvement: { 'pt-BR': 'redução no tempo', 'en-US': 'time reduction' },
    },
    {
      label: { 'pt-BR': 'Consistência Visual', 'en-US': 'Visual Consistency' },
      value: { 'pt-BR': '100%', 'en-US': '100%' },
      improvement: { 'pt-BR': 'entre produtos', 'en-US': 'across products' },
    },
    {
      label: { 'pt-BR': 'Componentes Reutilizados', 'en-US': 'Reused Components' },
      value: { 'pt-BR': '95%', 'en-US': '95%' },
      improvement: { 'pt-BR': 'taxa de adoção', 'en-US': 'adoption rate' },
    },
  ],
  testimonial: {
    author: 'João Oliveira',
    role: { 'pt-BR': 'Diretor de Tecnologia', 'en-US': 'Technology Director' },
    company: 'InnovaTech Corp',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face',
    content: {
      'pt-BR':
        'O design system transformou nossa produtividade. Agora todas as equipes trabalham com componentes consistentes e nossa identidade visual é uniforme.',
      'en-US':
        'The design system transformed our productivity. Now all teams work with consistent components and our visual identity is uniform.',
    },
    rating: 5,
  },
  story: {
    problem: {
      'pt-BR':
        'A empresa tinha inconsistências visuais entre produtos e equipes de desenvolvimento perdiam tempo recriando componentes.',
      'en-US':
        'The company had visual inconsistencies between products and development teams wasted time recreating components.',
    },
    solution: {
      'pt-BR':
        'Criamos um design system unificado com componentes reutilizáveis, tokens de design e documentação completa.',
      'en-US':
        'We created a unified design system with reusable components, design tokens and complete documentation.',
    },
    process: {
      'pt-BR':
        'Auditoria de componentes existentes, definição de tokens, criação da biblioteca e implementação gradual nos produtos.',
      'en-US':
        'Audit of existing components, token definition, library creation and gradual implementation in products.',
    },
    results: {
      'pt-BR':
        'Redução de 70% no tempo de desenvolvimento de interfaces e 100% de consistência visual entre produtos.',
      'en-US':
        '70% reduction in interface development time and 100% visual consistency between products.',
    },
  },
}
