import type { Project } from '@/types/project'

export const portalDaMorada: Project = {
  id: '6',
  slug: 'portal-da-morada',
  title: {
    'pt-BR': 'Portal da Morada - Sistema de Gestão Organizacional',
    'en-US': 'Portal da Morada - Organizational Management System',
  },
  shortDescription: {
    'pt-BR':
      'Projeto voluntário: Sistema completo de gestão organizacional (PWA + Web App) para digitalizar e centralizar toda a operação de uma organização comunitária.',
    'en-US':
      'Volunteer project: Complete organizational management system (PWA + Web App) to digitize and centralize all operations of a community organization.',
  },
  fullDescription: {
    'pt-BR':
      'Projeto voluntário desenvolvido desde 2021 para digitalizar e centralizar toda a gestão de uma organização comunitária. Plataforma web robusta e em constante evolução com mais de 25 módulos funcionais, incluindo gestão de membros, eventos, finanças, escalas de trabalho, notificações e muito mais. Atualmente em migração progressiva do Firebase para Supabase.',
    'en-US':
      'Volunteer project developed since 2021 to digitize and centralize all management of a community organization. Robust and constantly evolving web platform with over 25 functional modules, including member management, events, finances, work schedules, notifications and much more. Currently in progressive migration from Firebase to Supabase.',
  },
  category: 'webapp',
  tags: {
    'pt-BR': [
      'Projeto Voluntário',
      'PWA',
      'Sistema de Gestão',
      'React 19',
      'TypeScript',
      'Supabase',
      'Firebase',
      'Em Constante Evolução',
      'Design System',
    ],
    'en-US': [
      'Volunteer Project',
      'PWA',
      'Management System',
      'React 19',
      'TypeScript',
      'Supabase',
      'Firebase',
      'Continuous Evolution',
      'Design System',
    ],
  },
  technologies: [
    'React 19',
    'TypeScript',
    'Vite',
    'TailwindCSS 4',
    'Supabase',
    'Firebase',
    'Buildgrid UI',
    'PWA',
    'Sentry',
    'n8n',
    'Google Apps Script',
  ],
  thumbnail: '/projects/portal-da-morada/portal-login.png',
  images: [
    '/projects/portal-da-morada/portal-acessos.png',
    '/projects/portal-da-morada/portal-membros.png',
  ],
  liveUrl: 'https://portal.morada.org.br/',
  screenshots: [
    {
      id: '1',
      url: '/projects/portal-da-morada/portal-dashboard.png',
      alt: 'Dashboard principal',
      caption: {
        'pt-BR': 'Dashboard com visão geral das informações principais para o membro',
        'en-US': 'Dashboard with overview of main information for the member',
      },
    },
    {
      id: '2',
      url: '/projects/portal-da-morada/portal-membros.png',
      alt: 'Gestão de membros',
      caption: {
        'pt-BR': 'Sistema completo de gestão de membros com histórico e permissões',
        'en-US': 'Complete member management system with history and permissions',
      },
    },
    {
      id: '3',
      url: '/projects/portal-da-morada/portal-pendencias.png',
      alt: 'Módulo financeiro',
      caption: {
        'pt-BR': 'Dashboard financeiro com relatórios, pendências e análises',
        'en-US': 'Financial dashboard with reports, pending items and analytics',
      },
    },
    {
      id: '4',
      url: '/projects/portal-da-morada/portal-comandas.png',
      alt: 'Sistema de eventos',
      caption: {
        'pt-BR':
          'Gestão de eventos com QR Code, scanner integrado e acompanhamento em tempo real',
        'en-US':
          'Event management with QR Code, integrated scanner and real-time tracking',
      },
    },
    {
      id: '5',
      url: '/projects/portal-da-morada/portal-comunicados.png',
      alt: 'Comunicados',
      caption: {
        'pt-BR': 'Acompanhamento de comunicados e notificações para membros',
        'en-US': 'Tracking of communications and notifications for members',
      },
    },
    {
      id: '7',
      url: '/projects/portal-da-morada/portal-biblioteca.png',
      alt: 'Biblioteca',
      caption: {
        'pt-BR':
          'Listagem de livros da biblioteca com pesquisa e filtros, criação de coleções e pedidos de empréstimo',
        'en-US':
          'Library book listing with search and filters, collection creation and loan requests',
      },
    },
    {
      id: '8',
      url: '/projects/portal-da-morada/portal-acessos.png',
      alt: 'Acessos',
      caption: {
        'pt-BR': 'Gestão de acessos com histórico, relatórios e gráficos',
        'en-US': 'Access management with history, reports and charts',
      },
    },
    {
      id: '9',
      url: '/projects/portal-da-morada/portal-atividades.png',
      alt: 'Calendário de atividades',
      caption: {
        'pt-BR':
          'Gerenciamento e visualização do calendário de atividades da organização',
        'en-US': "Management and visualization of the organization's activity calendar",
      },
    },
    {
      id: '10',
      url: '/projects/portal-da-morada/portal-escalas.jpeg',
      alt: 'Escalas de atividades',
      caption: {
        'pt-BR': 'Criação e gerenciamento de escalas para atividades dos membros',
        'en-US': 'Creation and management of schedules for member activities',
      },
    },
    {
      id: '11',
      url: '/projects/portal-da-morada/portal-conteudos.jpeg',
      alt: 'Área de conteúdos',
      caption: {
        'pt-BR':
          'Áreas de conteúdos para compartilhamento de informações, vídeos, pdf, entre outros',
        'en-US':
          'Content areas for sharing information, videos, PDFs, and other materials',
      },
    },
  ],
  status: 'in-progress',
  featured: true,
  startDate: '2021-09-01',
  client: {
    name: 'Morada Espírita Professor Lairi Hans',
    industry: 'Organização Comunitária',
    size: 'small',
  },
  challenges: [
    {
      title: {
        'pt-BR': 'Processos Manuais e Dispersos',
        'en-US': 'Manual and Dispersed Processes',
      },
      description: {
        'pt-BR':
          'A organização enfrentava processos altamente manuais, dispersos entre planilhas, formulários, listas e diversos canais de comunicação. Era difícil manter informações atualizadas e controlar atividades.',
        'en-US':
          'The organization faced highly manual processes, dispersed among spreadsheets, forms, lists and various communication channels. It was difficult to keep information updated and control activities.',
      },
      solution: {
        'pt-BR':
          'Criamos uma plataforma única, moderna e acessível que unificou todos os fluxos administrativos e operacionais em um sistema centralizado.',
        'en-US':
          'We created a single, modern and accessible platform that unified all administrative and operational flows in a centralized system.',
      },
    },
    {
      title: {
        'pt-BR': 'Migração Progressiva de Backend',
        'en-US': 'Progressive Backend Migration',
      },
      description: {
        'pt-BR':
          'Necessidade de migrar do Firebase para Supabase mantendo o sistema funcionando sem interrupções e garantindo integridade dos dados.',
        'en-US':
          'Need to migrate from Firebase to Supabase while keeping the system running without interruptions and ensuring data integrity.',
      },
      solution: {
        'pt-BR':
          'Implementamos uma migração gradual e segura, módulo por módulo, com testes extensivos e rollback planejado para cada etapa.',
        'en-US':
          'We implemented a gradual and safe migration, module by module, with extensive testing and planned rollback for each stage.',
      },
    },
  ],
  metrics: [
    {
      label: { 'pt-BR': 'Redução em Gastos', 'en-US': 'Cost Reduction' },
      value: { 'pt-BR': '-90%', 'en-US': '-90%' },
      improvement: {
        'pt-BR': 'em materiais impressos',
        'en-US': 'in printed materials',
      },
    },
    {
      label: { 'pt-BR': 'Membros Ativos', 'en-US': 'Active Members' },
      value: { 'pt-BR': '+200', 'en-US': '+200' },
      improvement: { 'pt-BR': 'usuários cadastrados', 'en-US': 'registered users' },
    },
    {
      label: { 'pt-BR': 'Módulos Funcionais', 'en-US': 'Functional Modules' },
      value: { 'pt-BR': '+25', 'en-US': '+25' },
      improvement: { 'pt-BR': 'módulos ativos', 'en-US': 'active modules' },
    },
    {
      label: { 'pt-BR': 'Componentes Reutilizáveis', 'en-US': 'Reusable Components' },
      value: { 'pt-BR': '+100', 'en-US': '+100' },
      improvement: { 'pt-BR': 'componentes', 'en-US': 'components' },
    },
  ],
  story: {
    problem: {
      'pt-BR':
        'A organização enfrentava processos altamente manuais, dispersos entre planilhas, formulários, listas e diversos canais de comunicação. Era difícil manter informações atualizadas, controlar atividades e garantir histórico confiável. O objetivo era claro: criar uma plataforma única, moderna e acessível que unificasse todos os fluxos administrativos e operacionais.',
      'en-US':
        'The organization faced highly manual processes, dispersed among spreadsheets, forms, lists and various communication channels. It was difficult to keep information updated, control activities and ensure reliable history. The goal was clear: create a single, modern and accessible platform that would unify all administrative and operational flows.',
    },
    solution: {
      'pt-BR':
        'Conduzi todo o desenvolvimento do projeto — arquitetura, implementação, otimização e expansão contínua. Criei também um design system próprio (Buildgrid UI), refatorei módulos legados para padrões atuais, implementei melhorias progressivas de performance e adicionei camadas avançadas de segurança, cache e observabilidade.',
      'en-US':
        'I led all project development — architecture, implementation, optimization and continuous expansion. I also created my own design system (Buildgrid UI), refactored legacy modules to current standards, implemented progressive performance improvements and added advanced layers of security, cache and observability.',
    },
    process: {
      'pt-BR':
        'O sistema nasceu em React 16 como um painel simples, mas rapidamente ganhou escala e hoje é uma aplicação madura, construída com React 19, TypeScript, Vite, TailwindCSS 4. Atualmente, estou conduzindo uma migração gradual do backend do Firebase para o Supabase, incluindo autenticação, banco de dados, storage, regras de acesso e eventos em tempo real.',
      'en-US':
        'The system was born in React 16 as a simple panel, but quickly gained scale and today is a mature application, built with React 19, TypeScript, Vite, TailwindCSS 4. Currently, I am conducting a gradual migration of the backend from Firebase to Supabase, including authentication, database, storage, access rules and real-time events.',
    },
    results: {
      'pt-BR':
        'A plataforma reduziu em cerca de 80% o tempo gasto com processos administrativos, digitalizou integralmente a operação e trouxe transparência, organização e praticidade para coordenadores e membros. Hoje, o sistema é utilizado diariamente e continua evoluindo, acompanhando o crescimento da organização que atende.',
      'en-US':
        'The platform reduced by about 80% the time spent on administrative processes, fully digitized the operation and brought transparency, organization and practicality to coordinators and members. Today, the system is used daily and continues to evolve, following the growth of the organization it serves.',
    },
  },
  features: [
    {
      title: {
        'pt-BR': 'Gestão de Membros',
        'en-US': 'Member Management',
      },
      description: {
        'pt-BR':
          'Sistema completo com histórico, permissões, importação/exportação e até amigo oculto automatizado.',
        'en-US':
          'Complete system with history, permissions, import/export and even automated secret santa.',
      },
      icon: '👥',
    },
    {
      title: {
        'pt-BR': 'Sistema de Comandas',
        'en-US': 'Order System',
      },
      description: {
        'pt-BR':
          'Consumo via QR Code, histórico completo de pedidos e integração com pagamentos.',
        'en-US': 'QR Code consumption, complete order history and payment integration.',
      },
      icon: '🍽️',
    },
    {
      title: {
        'pt-BR': 'Biblioteca de Conteúdos',
        'en-US': 'Content Library',
      },
      description: {
        'pt-BR':
          'Documentos, artigos, listas, calendários e pesquisas organizados e acessíveis.',
        'en-US':
          'Documents, articles, lists, calendars and surveys organized and accessible.',
      },
      icon: '📚',
    },
    {
      title: {
        'pt-BR': 'Sistema de Pesquisa/Surveys',
        'en-US': 'Research/Survey System',
      },
      description: {
        'pt-BR':
          'Criação, distribuição e análise de pesquisas com relatórios automáticos e visualização de dados.',
        'en-US':
          'Creation, distribution and analysis of surveys with automatic reports and data visualization.',
      },
      icon: '📊',
    },
    {
      title: {
        'pt-BR': 'Eventos com QR Code',
        'en-US': 'Events with QR Code',
      },
      description: {
        'pt-BR':
          'Scanner integrado, impressão em lote e acompanhamento em tempo real de presença.',
        'en-US': 'Integrated scanner, batch printing and real-time attendance tracking.',
      },
      icon: '📅',
    },
    {
      title: {
        'pt-BR': 'Módulo Financeiro',
        'en-US': 'Financial Module',
      },
      description: {
        'pt-BR':
          'Completo com pendências, relatórios, pagamentos e dashboards analíticos.',
        'en-US':
          'Complete with pending items, reports, payments and analytical dashboards.',
      },
      icon: '💰',
    },
    {
      title: {
        'pt-BR': 'Escalas de Trabalho',
        'en-US': 'Work Schedules',
      },
      description: {
        'pt-BR':
          'Múltiplos horários, vagas por período, duplicação automática e visualizações inteligentes.',
        'en-US':
          'Multiple schedules, slots per period, automatic duplication and intelligent views.',
      },
      icon: '📋',
    },
    {
      title: {
        'pt-BR': 'PWA Completo',
        'en-US': 'Complete PWA',
      },
      description: {
        'pt-BR':
          'Offline-first, push notifications, instalação e sincronização em background.',
        'en-US': 'Offline-first, push notifications, installation and background sync.',
      },
      icon: '📱',
    },
    {
      title: {
        'pt-BR': 'Notificações em Tempo Real',
        'en-US': 'Real-time Notifications',
      },
      description: {
        'pt-BR': 'Sistema completo com controle de leitura e histórico de notificações.',
        'en-US': 'Complete system with read control and notification history.',
      },
      icon: '🔔',
    },
  ],
  nextSteps: {
    'pt-BR': [
      'Concluir migração para o Supabase',
      'Otimizar sistema de push notifications',
      'Integração com sistemas de pagamentos online',
      'Melhorias no sistema de comandas e pedidos',
    ],
    'en-US': [
      'Complete migration to Supabase',
      'Optimize push notification system',
      'Integration with online payment systems',
      'Improvements to order and command system',
    ],
  },
  technicalChallenges: {
    'pt-BR': [
      'Migração de dados complexos Firebase → Supabase sem perda',
      'Implementação de PWA offline-first robusta',
      'Sincronização em tempo real com múltiplos usuários',
      'Performance com grandes volumes de dados',
      'Scanner QR Code cross-browser',
      'Refatorações profundas entre React 16 → 17 → 18 → 19',
      'Compatibilizar módulos legados com novos padrões de arquitetura',
    ],
    'en-US': [
      'Complex data migration Firebase → Supabase without loss',
      'Robust offline-first PWA implementation',
      'Real-time synchronization with multiple users',
      'Performance with large data volumes',
      'Cross-browser QR Code scanner',
      'Deep refactoring between React 16 → 17 → 18 → 19',
      'Compatibility of legacy modules with new architecture patterns',
    ],
  },
  skillsAcquired: {
    'pt-BR': [
      'Arquitetura avançada de frontend',
      'Gerenciamento de estado e dados complexos',
      'Integração de múltiplos serviços backend',
      'PWA completo com push notifications',
      'Desenvolvimento de design system modular',
      'Migração gradual de plataformas sem downtime',
    ],
    'en-US': [
      'Advanced frontend architecture',
      'Complex state and data management',
      'Multiple backend services integration',
      'Complete PWA with push notifications',
      'Modular design system development',
      'Gradual platform migration without downtime',
    ],
  },
  testimonials: [
    {
      author: 'Marcelo M.',
      role: {
        'pt-BR': 'Coordenador',
        'en-US': 'Coordinator',
      },
      company: 'Morada Espírita Professor Lairi Hans',
      content: {
        'pt-BR':
          'O Portal da Morada transformou completamente a nossa gestão. Antes gastávamos horas conciliando planilhas, confirmando presenças e controlando finanças manualmente. Hoje tudo está centralizado, organizado e acessível em segundos. A plataforma não só trouxe eficiência, mas também transparência e tranquilidade para nossa rotina. É impressionante ver o quanto o sistema evoluiu ao longo dos anos — sempre com melhorias que realmente fazem diferença no nosso dia a dia.',
        'en-US':
          "Portal da Morada completely transformed our management. Before, we spent hours reconciling spreadsheets, confirming attendance and controlling finances manually. Today everything is centralized, organized and accessible in seconds. The platform not only brought efficiency, but also transparency and peace of mind to our routine. It's impressive to see how much the system has evolved over the years — always with improvements that really make a difference in our daily lives.",
      },
      rating: 5,
    },
    {
      author: 'Kelly B.',
      role: {
        'pt-BR': 'Membro Ativo',
        'en-US': 'Active Member',
      },
      company: 'Morada Espírita Professor Lairi Hans',
      content: {
        'pt-BR':
          'Para nós, membros, o Portal facilitou muito a participação nas atividades. Consigo ver os eventos, convites, me inscrever nas escalas e acompanhar tudo pelo celular. É simples, rápido e funciona muito bem. A sensação é de que estamos todos mais conectados e informados. Ficou muito mais fácil acompanhar o que está acontecendo na comunidade.',
        'en-US':
          "For us members, the Portal made participation in activities much easier. I can see events, invitations, sign up for schedules and follow everything on my phone. It's simple, fast and works very well. The feeling is that we are all more connected and informed. It became much easier to follow what is happening in the community.",
      },
      rating: 5,
    },
    {
      author: 'André A.',
      role: {
        'pt-BR': 'Membro Participante',
        'en-US': 'Participating Member',
      },
      company: 'Morada Espírita Professor Lairi Hans',
      content: {
        'pt-BR':
          'O que eu mais gosto é a organização. Tenho acesso ao meu histórico, aos comunicados, às pendências e às atividades, tudo no mesmo lugar. Antes eu sempre acabava perdendo alguma informação nos grupos, agora o sistema me avisa automaticamente. É prático e dá mais segurança, porque sei que tudo está registrado. Uso o Portal no dia a dia e realmente faz diferença.',
        'en-US':
          "What I like most is the organization. I have access to my history, communications, pending items and activities, all in one place. Before I always ended up losing some information in groups, now the system automatically notifies me. It's practical and gives more security, because I know everything is recorded. I use the Portal daily and it really makes a difference.",
      },
      rating: 5,
    },
  ],
}
