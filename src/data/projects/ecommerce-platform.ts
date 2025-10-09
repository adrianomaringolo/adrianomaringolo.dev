import type { Project } from '@/types/project'

export const ecommercePlatform: Project = {
  id: '2',
  slug: 'ecommerce-platform',
  title: {
    'pt-BR': 'Plataforma de E-commerce Moderna',
    'en-US': 'Modern E-commerce Platform',
  },
  shortDescription: {
    'pt-BR':
      'Plataforma completa de e-commerce com dashboard administrativo e experiência de compra otimizada.',
    'en-US':
      'Complete e-commerce platform with admin dashboard and optimized shopping experience.',
  },
  fullDescription: {
    'pt-BR':
      'Desenvolvimento de uma plataforma de e-commerce completa do zero, incluindo catálogo de produtos, carrinho de compras, sistema de pagamento, dashboard administrativo e sistema de gestão de pedidos.',
    'en-US':
      'Development of a complete e-commerce platform from scratch, including product catalog, shopping cart, payment system, admin dashboard and order management system.',
  },
  category: 'fullstack',
  tags: {
    'pt-BR': [
      'E-commerce',
      'Dashboard',
      'Pagamentos',
      'Responsive',
      'Carrinho',
      'Catálogo',
      'Gestão',
      'Stripe',
      'Performance',
    ],
    'en-US': [
      'E-commerce',
      'Dashboard',
      'Payments',
      'Responsive',
      'Cart',
      'Catalog',
      'Management',
      'Stripe',
      'Performance',
    ],
  },
  technologies: [
    'Next.js',
    'TypeScript',
    'Prisma',
    'PostgreSQL',
    'Stripe',
    'TailwindCSS',
  ],
  thumbnail: '/projects/placeholder-ecommerce.svg',
  images: [
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop&crop=center',
  ],
  screenshots: [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop&crop=center',
      alt: 'Homepage do e-commerce',
      caption: {
        'pt-BR': 'Homepage com design moderno e navegação intuitiva',
        'en-US': 'Homepage with modern design and intuitive navigation',
      },
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop&crop=center',
      alt: 'Página de produto',
      caption: {
        'pt-BR': 'Página de produto com galeria de imagens e informações detalhadas',
        'en-US': 'Product page with image gallery and detailed information',
      },
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1556742111-f327d2c6cf04?w=1200&h=800&fit=crop&crop=center',
      alt: 'Processo de checkout',
      caption: {
        'pt-BR': 'Checkout simplificado em etapas com integração Stripe',
        'en-US': 'Simplified step-by-step checkout with Stripe integration',
      },
    },
  ],
  liveUrl: 'https://ecommerce-demo.adrianomaringolo.dev',
  githubUrl: 'https://github.com/adrianomaringolo/ecommerce-platform',
  status: 'completed',
  featured: true,
  startDate: '2024-01-15',
  endDate: '2024-03-20',
  client: {
    name: 'TechStore Brasil',
    industry: 'Tecnologia',
    size: 'medium',
  },
  challenges: [
    {
      title: {
        'pt-BR': 'Performance em Catálogo Extenso',
        'en-US': 'Performance with Large Catalog',
      },
      description: {
        'pt-BR':
          'O cliente possuía mais de 10.000 produtos e precisava de carregamento rápido.',
        'en-US': 'The client had over 10,000 products and needed fast loading times.',
      },
      solution: {
        'pt-BR':
          'Implementamos paginação virtual, lazy loading de imagens e cache inteligente.',
        'en-US':
          'We implemented virtual pagination, image lazy loading and intelligent caching.',
      },
    },
  ],
  metrics: [
    {
      label: { 'pt-BR': 'Tempo de Carregamento', 'en-US': 'Loading Time' },
      value: { 'pt-BR': '1,2s', 'en-US': '1.2s' },
      improvement: { 'pt-BR': '60% mais rápido', 'en-US': '60% faster' },
    },
    {
      label: { 'pt-BR': 'Taxa de Conversão', 'en-US': 'Conversion Rate' },
      value: { 'pt-BR': '3,8%', 'en-US': '3.8%' },
      improvement: { 'pt-BR': '+45%', 'en-US': '+45%' },
    },
  ],
  testimonial: {
    author: 'Carlos Silva',
    role: { 'pt-BR': 'CEO', 'en-US': 'CEO' },
    company: 'TechStore Brasil',
    avatar: '/testimonials/carlos-silva.jpg',
    content: {
      'pt-BR':
        'O Adriano entregou uma plataforma que superou nossas expectativas. A performance é excepcional e nossos clientes adoraram a nova experiência de compra.',
      'en-US':
        'Adriano delivered a platform that exceeded our expectations. The performance is exceptional and our customers loved the new shopping experience.',
    },
    rating: 5,
  },
  story: {
    problem: {
      'pt-BR':
        'A TechStore Brasil estava perdendo vendas devido à sua plataforma de e-commerce desatualizada, com carregamento lento e experiência de usuário confusa.',
      'en-US':
        'TechStore Brasil was losing sales due to their outdated e-commerce platform with slow loading and confusing user experience.',
    },
    solution: {
      'pt-BR':
        'Desenvolvemos uma plataforma moderna do zero, focando em performance, usabilidade e conversão, com dashboard administrativo completo.',
      'en-US':
        'We developed a modern platform from scratch, focusing on performance, usability and conversion, with a complete admin dashboard.',
    },
    process: {
      'pt-BR':
        'Começamos com pesquisa de usuário e análise da concorrência, seguido por prototipagem, desenvolvimento iterativo e testes extensivos.',
      'en-US':
        'We started with user research and competitor analysis, followed by prototyping, iterative development and extensive testing.',
    },
    results: {
      'pt-BR':
        'A nova plataforma resultou em 45% de aumento na conversão, 60% de melhoria na performance e 90% de satisfação dos usuários.',
      'en-US':
        'The new platform resulted in 45% increase in conversion, 60% performance improvement and 90% user satisfaction.',
    },
  },
}
