import type { Project } from '@/types/project'

export const buildgridUI: Project = {
  id: '7',
  slug: 'buildgrid-ui',
  title: {
    'pt-BR': 'BuildGrid UI - Biblioteca de Componentes React',
    'en-US': 'BuildGrid UI - React Component Library',
  },
  shortDescription: {
    'pt-BR':
      'Primeira biblioteca open-source: coleção moderna e abrangente de componentes React battle-tested, focada em consistência e experiência do desenvolvedor.',
    'en-US':
      'First open-source library: modern and comprehensive collection of battle-tested React components, focused on consistency and developer experience.',
  },
  fullDescription: {
    'pt-BR':
      'BuildGrid UI é uma biblioteca de componentes React moderna desenvolvida como primeiro projeto open-source. Lançada em dezembro de 2025, oferece 44 componentes básicos e 13 blocos complexos, todos battle-tested em aplicações reais. Inspirada pelo shadcn/ui, resolve o problema de manutenção de componentes copiados entre projetos, fornecendo uma solução curada e consistente.',
    'en-US':
      'BuildGrid UI is a modern React component library developed as a first open-source project. Launched in December 2025, it offers 44 basic components and 13 complex blocks, all battle-tested in real applications. Inspired by shadcn/ui, it solves the problem of maintaining copied components between projects, providing a curated and consistent solution.',
  },
  category: 'library',
  tags: {
    'pt-BR': [
      'Open Source',
      'Biblioteca de Componentes',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Radix UI',
      'Storybook',
      'Acessibilidade',
      'Design System',
    ],
    'en-US': [
      'Open Source',
      'Component Library',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Radix UI',
      'Storybook',
      'Accessibility',
      'Design System',
    ],
  },
  technologies: [
    'React 19',
    'TypeScript',
    'Tailwind CSS v4',
    'Radix UI',
    'Vite',
    'Storybook',
    'Vitest',
    'ESLint',
    'Prettier',
    'Husky',
    'Semantic Release',
    'Docusaurus',
  ],
  thumbnail: '/projects/buildgrid-ui/buildgridui-landing.jpeg',
  images: [
    '/projects/buildgrid-ui/buildgridui-components.jpeg',
    '/projects/buildgrid-ui/buildgridui-blocks.jpeg',
  ],
  liveUrl: 'https://adrianomaringolo.github.io/buildgrid-ui',
  githubUrl: 'https://github.com/adrianomaringolo/buildgrid-ui',
  screenshots: [
    {
      id: '1',
      url: '/projects/buildgrid-ui/buildgridui-landing.jpeg',
      alt: 'Homepage da documentação',
      caption: {
        'pt-BR':
          'Site de documentação construído com Docusaurus com exemplos interativos',
        'en-US':
          'Documentation site built with Docusaurus featuring interactive examples',
      },
    },
    {
      id: '2',
      url: '/projects/buildgrid-ui/buildgridui-bento.jpeg',
      alt: 'Storybook dos componentes',
      caption: {
        'pt-BR': 'Storybook público com explorador visual de todos os componentes',
        'en-US': 'Public Storybook with visual explorer of all components',
      },
    },
    {
      id: '3',
      url: '/projects/buildgrid-ui/buildgridui-components.jpeg',
      alt: 'Grid de componentes',
      caption: {
        'pt-BR': 'Visão geral dos 44 componentes básicos organizados por categoria',
        'en-US': 'Overview of 44 basic components organized by category',
      },
    },
    {
      id: '4',
      url: '/projects/buildgrid-ui/buildgridui-blocks.jpeg',
      alt: 'Componentes complexos',
      caption: {
        'pt-BR': 'Coleção de 13 blocos complexos para casos de uso específicos',
        'en-US': 'Collection of 13 complex blocks for specific use cases',
      },
    },
    {
      id: '5',
      url: '/projects/buildgrid-ui/buildgridui-data-table.jpeg',
      alt: 'Data Table component',
      caption: {
        'pt-BR': 'Componente Data Table com ordenação, filtragem e paginação avançada',
        'en-US': 'Data Table component with sorting, filtering and advanced pagination',
      },
    },
    {
      id: '6',
      url: '/projects/buildgrid-ui/buildgridui-html-text.jpeg',
      alt: 'HTML Text Editor',
      caption: {
        'pt-BR': 'Editor de texto rico com barra de ferramentas completa',
        'en-US': 'Rich text editor with complete toolbar',
      },
    },
    {
      id: '7',
      url: '/projects/buildgrid-ui/buildgridui-image-gallery.jpeg',
      alt: 'Lazy Image Gallery',
      caption: {
        'pt-BR': 'Galeria de imagens otimizada com lazy loading e performance',
        'en-US': 'Optimized image gallery with lazy loading and performance',
      },
    },
    {
      id: '8',
      url: '/projects/buildgrid-ui/buildgridui-contribution.jpeg',
      alt: 'Contribuições',
      caption: {
        'pt-BR': 'Orientações claras para contribuições',
        'en-US': 'Clear guidelines for contribution',
      },
    },
  ],
  status: 'completed',
  featured: true,
  startDate: '2024-08-01',
  client: {
    name: 'Projeto Open Source',
    industry: 'Desenvolvimento de Software',
    size: 'small',
  },
  challenges: [
    {
      title: {
        'pt-BR': 'Inconsistência Entre Projetos',
        'en-US': 'Inconsistency Between Projects',
      },
      description: {
        'pt-BR':
          'Manter consistência de componentes entre múltiplos projetos React era um desafio constante, com componentes sendo copiados e modificados sem controle de versão.',
        'en-US':
          'Maintaining component consistency across multiple React projects was a constant challenge, with components being copied and modified without version control.',
      },
      solution: {
        'pt-BR':
          'Criamos uma biblioteca centralizada com componentes battle-tested, versionamento semântico e documentação completa para garantir consistência.',
        'en-US':
          'We created a centralized library with battle-tested components, semantic versioning and complete documentation to ensure consistency.',
      },
    },
    {
      title: {
        'pt-BR': 'Primeira Experiência Open Source',
        'en-US': 'First Open Source Experience',
      },
      description: {
        'pt-BR':
          'Como primeiro projeto open-source, foi necessário aprender sobre design de APIs públicas, documentação abrangente, testes confiáveis e construção de comunidade.',
        'en-US':
          'As a first open-source project, it was necessary to learn about public API design, comprehensive documentation, reliable testing and community building.',
      },
      solution: {
        'pt-BR':
          'Implementamos processos rigorosos de qualidade, CI/CD automatizado, documentação interativa e canais de comunicação com a comunidade.',
        'en-US':
          'We implemented rigorous quality processes, automated CI/CD, interactive documentation and community communication channels.',
      },
    },
  ],
  metrics: [
    {
      label: { 'pt-BR': 'Componentes Disponíveis', 'en-US': 'Available Components' },
      value: { 'pt-BR': '57', 'en-US': '57' },
      improvement: { 'pt-BR': 'componentes e blocos', 'en-US': 'components and blocks' },
    },

    {
      label: { 'pt-BR': 'Tempo de Desenvolvimento', 'en-US': 'Development Time' },
      value: { 'pt-BR': '-60%', 'en-US': '-60%' },
      improvement: { 'pt-BR': 'redução no tempo', 'en-US': 'time reduction' },
    },
  ],
  story: {
    problem: {
      'pt-BR':
        'A necessidade real de manter consistência entre múltiplos projetos React levou ao problema comum de componentes copiados e modificados sem controle. Cada projeto acabava com sua própria versão de componentes similares, gerando inconsistências visuais e dificuldades de manutenção.',
      'en-US':
        'The real need to maintain consistency across multiple React projects led to the common problem of copied and modified components without control. Each project ended up with its own version of similar components, generating visual inconsistencies and maintenance difficulties.',
    },
    solution: {
      'pt-BR':
        'Desenvolvi BuildGrid UI como uma biblioteca completa de componentes React, inspirada pelo shadcn/ui mas focada em resolver o problema de manutenção. Criei 44 componentes básicos e 13 blocos complexos, todos battle-tested em aplicações reais, com documentação completa e sistema de design consistente.',
      'en-US':
        'I developed BuildGrid UI as a complete React component library, inspired by shadcn/ui but focused on solving the maintenance problem. I created 44 basic components and 13 complex blocks, all battle-tested in real applications, with complete documentation and consistent design system.',
    },
    process: {
      'pt-BR':
        'O projeto começou com a curadoria de componentes já testados em produção, evoluindo para uma arquitetura de duas camadas: Components (elementos básicos) e Blocks (componentes complexos). Implementei processos rigorosos de qualidade com TypeScript, testes automatizados, CI/CD, e documentação interativa com Storybook e Docusaurus.',
      'en-US':
        'The project started with curation of components already tested in production, evolving into a two-layer architecture: Components (basic elements) and Blocks (complex components). I implemented rigorous quality processes with TypeScript, automated testing, CI/CD, and interactive documentation with Storybook and Docusaurus.',
    },
    results: {
      'pt-BR':
        'A biblioteca foi lançada publicamente em dezembro de 2025 como meu primeiro projeto open-source. Oferece uma solução prática para consistência de componentes, com foco na experiência do desenvolvedor, acessibilidade completa e performance otimizada. Estabeleceu um novo padrão pessoal para qualidade de código e documentação.',
      'en-US':
        'The library was publicly launched in December 2025 as my first open-source project. It offers a practical solution for component consistency, focusing on developer experience, complete accessibility and optimized performance. It established a new personal standard for code quality and documentation.',
    },
  },
  features: [
    {
      title: {
        'pt-BR': '44 Componentes Básicos',
        'en-US': '44 Basic Components',
      },
      description: {
        'pt-BR':
          'Elementos fundamentais organizados por categoria: formulários, navegação, feedback e layout.',
        'en-US':
          'Fundamental elements organized by category: forms, navigation, feedback and layout.',
      },
      icon: '🧩',
    },
    {
      title: {
        'pt-BR': '13 Blocos Complexos',
        'en-US': '13 Complex Blocks',
      },
      description: {
        'pt-BR':
          'Componentes compostos para casos específicos como Data Table, Editor de Texto e Galeria.',
        'en-US':
          'Composite components for specific cases like Data Table, Text Editor and Gallery.',
      },
      icon: '🏗️',
    },
    {
      title: {
        'pt-BR': 'TypeScript First',
        'en-US': 'TypeScript First',
      },
      description: {
        'pt-BR':
          'Tipagem completa com IntelliSense para melhor experiência de desenvolvimento.',
        'en-US': 'Complete typing with IntelliSense for better development experience.',
      },
      icon: '📝',
    },
    {
      title: {
        'pt-BR': 'Acessibilidade WCAG',
        'en-US': 'WCAG Accessibility',
      },
      description: {
        'pt-BR':
          'Conformidade completa com padrões de acessibilidade e navegação por teclado.',
        'en-US': 'Full compliance with accessibility standards and keyboard navigation.',
      },
      icon: '♿',
    },
    {
      title: {
        'pt-BR': 'Documentação Interativa',
        'en-US': 'Interactive Documentation',
      },
      description: {
        'pt-BR':
          'Site completo com Docusaurus e Storybook público para exploração visual.',
        'en-US':
          'Complete site with Docusaurus and public Storybook for visual exploration.',
      },
      icon: '📚',
    },
    {
      title: {
        'pt-BR': 'Performance Otimizada',
        'en-US': 'Optimized Performance',
      },
      description: {
        'pt-BR': 'Tree shaking, bundle otimizado e lazy loading para máxima eficiência.',
        'en-US':
          'Tree shaking, optimized bundle and lazy loading for maximum efficiency.',
      },
      icon: '⚡',
    },
    {
      title: {
        'pt-BR': 'Hooks Utilitários',
        'en-US': 'Utility Hooks',
      },
      description: {
        'pt-BR':
          'Hooks customizados para localStorage, debounce, clipboard e sanitização HTML.',
        'en-US':
          'Custom hooks for localStorage, debounce, clipboard and HTML sanitization.',
      },
      icon: '🎣',
    },
    {
      title: {
        'pt-BR': 'CI/CD Automatizado',
        'en-US': 'Automated CI/CD',
      },
      description: {
        'pt-BR':
          'Pipeline completo com testes, linting, versionamento semântico e publicação NPM.',
        'en-US':
          'Complete pipeline with testing, linting, semantic versioning and NPM publishing.',
      },
      icon: '🚀',
    },
  ],
  nextSteps: {
    'pt-BR': [
      'Expandir biblioteca com novos componentes baseados em feedback da comunidade',
      'Implementar sistema de temas mais flexível e customizável',
      'Adicionar mais blocos especializados para casos de uso específicos',
      'Melhorar performance e otimizações de bundle',
      'Desenvolver plugins para ferramentas de design (Figma)',
    ],
    'en-US': [
      'Expand library with new components based on community feedback',
      'Implement more flexible and customizable theme system',
      'Add more specialized blocks for specific use cases',
      'Improve performance and bundle optimizations',
      'Develop plugins for design tools (Figma)',
    ],
  },
  technicalChallenges: {
    'pt-BR': [
      'Design de API pública intuitiva e consistente',
      'Implementação de acessibilidade completa em todos os componentes',
      'Otimização de performance com tree shaking eficiente',
      'Configuração de CI/CD robusto para projeto open-source',
      'Documentação abrangente com exemplos interativos',
      'Versionamento semântico automatizado baseado em commits convencionais',
      'Compatibilidade cross-browser e responsividade',
    ],
    'en-US': [
      'Intuitive and consistent public API design',
      'Complete accessibility implementation in all components',
      'Performance optimization with efficient tree shaking',
      'Robust CI/CD setup for open-source project',
      'Comprehensive documentation with interactive examples',
      'Automated semantic versioning based on conventional commits',
      'Cross-browser compatibility and responsiveness',
    ],
  },
  skillsAcquired: {
    'pt-BR': [
      'Desenvolvimento de bibliotecas open-source',
      'Design de APIs públicas e experiência do desenvolvedor',
      'Implementação avançada de acessibilidade web',
      'Configuração de pipelines CI/CD para projetos NPM',
      'Documentação técnica e construção de comunidade',
      'Versionamento semântico e gestão de releases',
    ],
    'en-US': [
      'Open-source library development',
      'Public API design and developer experience',
      'Advanced web accessibility implementation',
      'CI/CD pipeline setup for NPM projects',
      'Technical documentation and community building',
      'Semantic versioning and release management',
    ],
  },
}
