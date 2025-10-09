import type { Project } from '@/types/project'

export const taskManagementApp: Project = {
  id: '3',
  slug: 'task-management-app',
  title: {
    'pt-BR': 'App de Gestão de Tarefas',
    'en-US': 'Task Management App',
  },
  shortDescription: {
    'pt-BR':
      'Aplicativo colaborativo para gestão de projetos e tarefas com interface intuitiva.',
    'en-US':
      'Collaborative app for project and task management with intuitive interface.',
  },
  fullDescription: {
    'pt-BR':
      'Aplicativo web responsivo para gestão de projetos e tarefas em equipe, com recursos de colaboração em tempo real, notificações e relatórios de produtividade.',
    'en-US':
      'Responsive web app for team project and task management, with real-time collaboration features, notifications and productivity reports.',
  },
  category: 'webapp',
  tags: {
    'pt-BR': [
      'Produtividade',
      'Colaboração',
      'Real-time',
      'Dashboard',
      'Equipes',
      'Projetos',
      'Notificações',
      'Relatórios',
      'WebSocket',
    ],
    'en-US': [
      'Productivity',
      'Collaboration',
      'Real-time',
      'Dashboard',
      'Teams',
      'Projects',
      'Notifications',
      'Reports',
      'WebSocket',
    ],
  },
  technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
  thumbnail: '/projects/placeholder-taskapp.svg',
  images: [
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop&crop=center',
  ],
  screenshots: [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop&crop=center',
      alt: 'Dashboard principal',
      caption: {
        'pt-BR': 'Dashboard com visão geral dos projetos e métricas de produtividade',
        'en-US': 'Dashboard with project overview and productivity metrics',
      },
    },
  ],
  liveUrl: 'https://taskapp-demo.adrianomaringolo.dev',
  githubUrl: 'https://github.com/adrianomaringolo/task-management',
  status: 'completed',
  featured: true,
  startDate: '2023-10-01',
  endDate: '2023-12-15',
  challenges: [
    {
      title: {
        'pt-BR': 'Sincronização em Tempo Real',
        'en-US': 'Real-time Synchronization',
      },
      description: {
        'pt-BR': 'Múltiplos usuários editando simultaneamente sem conflitos.',
        'en-US': 'Multiple users editing simultaneously without conflicts.',
      },
      solution: {
        'pt-BR': 'Implementamos WebSockets com resolução de conflitos automática.',
        'en-US': 'We implemented WebSockets with automatic conflict resolution.',
      },
    },
  ],
  metrics: [
    {
      label: { 'pt-BR': 'Produtividade da Equipe', 'en-US': 'Team Productivity' },
      value: { 'pt-BR': '+35%', 'en-US': '+35%' },
      improvement: {
        'pt-BR': 'vs. ferramentas anteriores',
        'en-US': 'vs. previous tools',
      },
    },
    {
      label: { 'pt-BR': 'Tempo de Coordenação', 'en-US': 'Coordination Time' },
      value: { 'pt-BR': '-50%', 'en-US': '-50%' },
      improvement: { 'pt-BR': 'redução significativa', 'en-US': 'significant reduction' },
    },
    {
      label: { 'pt-BR': 'Satisfação do Usuário', 'en-US': 'User Satisfaction' },
      value: { 'pt-BR': '4,8/5', 'en-US': '4.8/5' },
      improvement: { 'pt-BR': 'avaliação média', 'en-US': 'average rating' },
    },
  ],
  testimonial: {
    author: 'Maria Santos',
    role: { 'pt-BR': 'Gerente de Projetos', 'en-US': 'Project Manager' },
    company: 'TechTeam Solutions',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=96&h=96&fit=crop&crop=face',
    content: {
      'pt-BR':
        'O app revolucionou nossa forma de trabalhar. A colaboração em tempo real e os relatórios visuais nos ajudaram a ser muito mais eficientes.',
      'en-US':
        'The app revolutionized the way we work. Real-time collaboration and visual reports helped us become much more efficient.',
    },
    rating: 5,
  },
  story: {
    problem: {
      'pt-BR':
        'Equipes remotas precisavam de uma ferramenta simples mas poderosa para coordenar projetos e acompanhar o progresso das tarefas.',
      'en-US':
        'Remote teams needed a simple but powerful tool to coordinate projects and track task progress.',
    },
    solution: {
      'pt-BR':
        'Criamos um app intuitivo com colaboração em tempo real, notificações inteligentes e relatórios visuais de produtividade.',
      'en-US':
        'We created an intuitive app with real-time collaboration, smart notifications and visual productivity reports.',
    },
    process: {
      'pt-BR':
        'Processo ágil com sprints de 2 semanas, feedback constante dos usuários e iterações rápidas baseadas em dados de uso.',
      'en-US':
        'Agile process with 2-week sprints, constant user feedback and rapid iterations based on usage data.',
    },
    results: {
      'pt-BR':
        'O app melhorou a produtividade das equipes em 35% e reduziu o tempo de coordenação de projetos em 50%.',
      'en-US':
        'The app improved team productivity by 35% and reduced project coordination time by 50%.',
    },
  },
}
