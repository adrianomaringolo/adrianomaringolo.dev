import type { Project } from '@/types/project'

export const gotaDeCura: Project = {
  id: '5',
  slug: 'gota-de-cura',
  title: {
    'pt-BR': 'Gota de Cura - Loja de Aromaterapia',
    'en-US': 'Gota de Cura - Aromatherapy Store',
  },
  shortDescription: {
    'pt-BR':
      'Projeto voluntário: E-commerce completo para loja de aromaterapia e cosméticos naturais com sistema de pedidos e área administrativa.',
    'en-US':
      'Volunteer project: Complete e-commerce for aromatherapy and natural cosmetics store with order system and administrative area.',
  },
  fullDescription: {
    'pt-BR':
      'Projeto voluntário desenvolvido para a Gota de Cura, iniciativa sem fins lucrativos voltada à aromaterapia. Plataforma digital completa com e-commerce, sistema de pedidos, área administrativa e integração com eventos presenciais. Todos os recursos são revertidos para trabalhos assistenciais. O projeto está em constante melhoria, com novas funcionalidades sendo adicionadas regularmente.',
    'en-US':
      'Volunteer project developed for Gota de Cura, a non-profit aromatherapy initiative. Complete digital platform featuring e-commerce, order system, administrative area and integration with in-person events. All proceeds go to charitable work. The project is under constant improvement, with new features being added regularly.',
  },
  category: 'webapp',
  tags: {
    'pt-BR': [
      'Projeto Voluntário',
      'E-commerce',
      'Aromaterapia',
      'Sem fins lucrativos',
      'Sistema de Pedidos',
      'Área Administrativa',
      'Cosméticos Naturais',
      'Propósito Social',
      'Em Constante Melhoria',
    ],
    'en-US': [
      'Volunteer Project',
      'E-commerce',
      'Aromatherapy',
      'Non-profit',
      'Order System',
      'Admin Panel',
      'Natural Cosmetics',
      'Social Purpose',
      'Continuous Improvement',
    ],
  },
  technologies: [
    'Next.js',
    'TypeScript',
    'TailwindCSS',
    'Firebase',
    'WhatsApp API',
    'EmailJS',
    'Vercel',
  ],
  thumbnail: '/projects/gota-de-cura/product-types-section.jpeg',
  images: [],
  screenshots: [
    {
      id: '1',
      url: '/projects/gota-de-cura/product-types-section.jpeg',
      alt: 'Homepage da Gota de Cura',
      caption: {
        'pt-BR': 'Homepage com destaque e apresentação das categorias dos produtos',
        'en-US': 'Homepage with highlight and product category presentation',
      },
    },
    {
      id: '2',
      url: '/projects/gota-de-cura/product-type-detail.jpeg',
      alt: 'Listagem de produtos',
      caption: {
        'pt-BR':
          'Catálogo completo com hidrolatos, óleos essenciais e cosméticos naturais',
        'en-US': 'Complete catalog with hydrolats, essential oils and natural cosmetics',
      },
    },
    {
      id: '3',
      url: '/projects/gota-de-cura/visit-subscription.jpeg',
      alt: 'Formulário de inscrição para visitas',
      caption: {
        'pt-BR': 'Inscrições para passeios de visita em grupo',
        'en-US': 'Group tour bookings',
      },
    },
    {
      id: '4',
      url: '/projects/gota-de-cura/admin-orders.jpg',
      alt: 'Área administrativa de pedidos',
      caption: {
        'pt-BR': 'Dashboard administrativo para gestão de pedidos',
        'en-US': 'Administrative dashboard for order management',
      },
    },
    {
      id: '5',
      url: '/projects/gota-de-cura/admin-products.jpeg',
      alt: 'Área administrativa de produtos',
      caption: {
        'pt-BR': 'Dashboard administrativo para gestão de produtos',
        'en-US': 'Administrative dashboard for products management',
      },
    },
  ],
  liveUrl: 'https://gotadecura.com.br',
  featured: true,
  startDate: '2021-08-01',
  client: {
    name: 'Gota de Cura',
    industry: 'Aromaterapia e Cosméticos Naturais',
    size: 'small',
  },
  challenges: [
    {
      title: {
        'pt-BR': 'Unir E-commerce, Propósito e Espiritualidade',
        'en-US': 'Combining E-commerce, Purpose and Spirituality',
      },
      description: {
        'pt-BR':
          'O desafio era criar uma plataforma que transmitisse o cuidado artesanal da marca e sua missão solidária, unindo funcionalidade comercial com propósito espiritual.',
        'en-US':
          'The challenge was to create a platform that conveyed the artisanal care of the brand and its charitable mission, combining commercial functionality with spiritual purpose.',
      },
      solution: {
        'pt-BR':
          'Desenvolvemos uma arquitetura de informações que priorizou clareza na navegação, simplicidade no fluxo de pedidos e conexão com o propósito social.',
        'en-US':
          'We developed an information architecture that prioritized navigation clarity, simplicity in the order flow and connection with the social purpose.',
      },
    },
    {
      title: {
        'pt-BR': 'Sistema Administrativo Integrado',
        'en-US': 'Integrated Administrative System',
      },
      description: {
        'pt-BR':
          'Era necessário criar um sistema que permitisse gestão completa de produtos, pedidos e eventos, mantendo a simplicidade para usuários não técnicos.',
        'en-US':
          'It was necessary to create a system that allowed complete management of products, orders and events, maintaining simplicity for non-technical users.',
      },
      solution: {
        'pt-BR':
          'Implementamos uma área administrativa intuitiva com Supabase, permitindo gestão em tempo real e notificações automáticas via WhatsApp.',
        'en-US':
          'We implemented an intuitive administrative area with Supabase, allowing real-time management and automatic notifications via WhatsApp.',
      },
    },
  ],
  metrics: [
    {
      label: { 'pt-BR': 'Pedidos Realizados', 'en-US': 'Orders Completed' },
      value: { 'pt-BR': '+1300', 'en-US': '+1300' },
      improvement: { 'pt-BR': 'pedidos processados', 'en-US': 'orders processed' },
    },
    {
      label: { 'pt-BR': 'Tempo de Gestão', 'en-US': 'Management Time' },
      value: { 'pt-BR': '-70%', 'en-US': '-70%' },
      improvement: { 'pt-BR': 'redução no tempo', 'en-US': 'time reduction' },
    },
    {
      label: { 'pt-BR': 'Alcance Nacional', 'en-US': 'National Reach' },
      value: { 'pt-BR': '100%', 'en-US': '100%' },
      improvement: {
        'pt-BR': 'clientes em todo Brasil',
        'en-US': 'customers across Brazil',
      },
    },
  ],
  testimonial: {
    author: 'Marcelo Soares Mattar',
    role: { 'pt-BR': 'Aromaterapeuta Responsável', 'en-US': 'Lead Aromatherapist' },
    company: 'Gota de Cura',
    avatar: '/projects/gota-de-cura/client-thumb.jpg',
    content: {
      'pt-BR':
        'O site representa exatamente o que é a Gota de Cura: simplicidade, amor e propósito. Adriano conseguiu traduzir nossa essência e facilitar nossa rotina com o sistema de pedidos. Foi um divisor de águas para o nosso trabalho.',
      'en-US':
        'The website represents exactly what Gota de Cura is: simplicity, love and purpose. Adriano managed to translate our essence and facilitate our routine with the order system. It was a game changer for our work.',
    },
    rating: 5,
  },
  story: {
    problem: {
      'pt-BR':
        'A Gota de Cura é uma iniciativa sem fins lucrativos voltada à aromaterapia e ao uso consciente das plantas, com todos os recursos revertidos para a Morada Espírita Professor Lairi Hans. O desafio era criar uma plataforma digital completa que unisse e-commerce, propósito e espiritualidade, transmitindo o cuidado artesanal da marca e sua missão solidária.',
      'en-US':
        'Gota de Cura is a non-profit initiative focused on aromatherapy and conscious use of plants, with all proceeds going to Morada Espírita Professor Lairi Hans. The challenge was to create a complete digital platform that combined e-commerce, purpose and spirituality, conveying the artisanal care of the brand and its charitable mission.',
    },
    solution: {
      'pt-BR':
        'O projeto foi desenvolvido a partir de um mergulho profundo no propósito da marca. Conduzi uma etapa de descoberta e escuta com a equipe, para entender não só o funcionamento da venda dos produtos, mas também a dimensão humana e espiritual que permeia o trabalho da Gota de Cura.',
      'en-US':
        "The project was developed from a deep dive into the brand's purpose. I conducted a discovery and listening phase with the team, to understand not only how product sales work, but also the human and spiritual dimension that permeates Gota de Cura's work.",
    },
    process: {
      'pt-BR':
        'A partir do entendimento do propósito, defini uma arquitetura de informações que priorizou a clareza na navegação, simplicidade no fluxo de pedidos respeitando o formato artesanal, conexão com o propósito social e comunicação visual leve e natural, alinhada ao universo da aromaterapia.',
      'en-US':
        'Based on understanding the purpose, I defined an information architecture that prioritized clarity in navigation, simplicity in the order flow respecting the artisanal format, connection with the social purpose and light and natural visual communication, aligned with the aromatherapy universe.',
    },
    results: {
      'pt-BR':
        'O resultado foi uma plataforma integrada e intuitiva com catálogo completo de produtos, área administrativa para gestão em tempo real, sistema de reservas para eventos, página institucional com propósito da marca e integração com WhatsApp. Como projeto voluntário, o sistema ampliou o alcance do trabalho assistencial para todo o Brasil, processou mais de 1300 pedidos e continua sendo aprimorado com novas funcionalidades regularmente.',
      'en-US':
        'The result was an integrated and intuitive platform with complete product catalog, administrative area for real-time management, event reservation system, institutional page with brand purpose and WhatsApp integration. As a volunteer project, the system expanded the reach of charitable work throughout Brazil, processed over 1300 orders and continues to be improved with new features regularly.',
    },
  },
  nextSteps: {
    'pt-BR': [
      'Renovar e modernizar layout de navegação para suportar maior número de produtos e categorias',
      'Implementar sistema de fidelidade para clientes recorrentes',
      'Criar módulo de gestão de estoque automatizado',
      'Desenvolver aplicativo mobile para facilitar pedidos',
      'Integrar sistema de pagamento online (PIX, cartões)',
      'Criar sistema de avaliações e depoimentos de produtos',
      'Incrementar detalhes de produtos e imagens',
      'Sistema de busca avançado',
    ],
    'en-US': [
      'Renew and modernize navigation layout to support larger number of products and categories',
      'Implement loyalty system for recurring customers',
      'Create automated inventory management module',
      'Develop mobile app to facilitate orders',
      'Integrate online payment system (PIX, cards)',
      'Create product reviews and testimonials system',
      'Increase product details and images',
      'Advanced search functionality',
    ],
  },
  features: [
    {
      title: {
        'pt-BR': 'Catálogo de Produtos',
        'en-US': 'Product Catalog',
      },
      description: {
        'pt-BR':
          'Sistema completo de gestão de produtos com categorias, preços e descrições detalhadas para hidrolatos, óleos essenciais e cosméticos naturais.',
        'en-US':
          'Complete product management system with categories, prices and detailed descriptions for hydrolats, essential oils and natural cosmetics.',
      },
      icon: '🛍️',
    },
    {
      title: {
        'pt-BR': 'Sistema de Pedidos',
        'en-US': 'Order System',
      },
      description: {
        'pt-BR':
          'Fluxo simplificado de pedidos respeitando o formato artesanal da produção, com carrinho de compras e resumo detalhado.',
        'en-US':
          'Simplified order flow respecting the artisanal production format, with shopping cart and detailed summary.',
      },
      icon: '📋',
    },
    {
      title: {
        'pt-BR': 'Área Administrativa',
        'en-US': 'Admin Panel',
      },
      description: {
        'pt-BR':
          'Dashboard completo para gestão de produtos, pedidos e clientes em tempo real, com interface intuitiva para usuários não técnicos.',
        'en-US':
          'Complete dashboard for real-time management of products, orders and customers, with intuitive interface for non-technical users.',
      },
      icon: '⚙️',
    },
    {
      title: {
        'pt-BR': 'Integração Email',
        'en-US': 'Email Integration',
      },
      description: {
        'pt-BR':
          'Notificações automáticas via e-mail para novos pedidos, mantendo o atendimento personalizado.',
        'en-US':
          'Automatic email notifications for new orders, maintaining personalized service.',
      },
      icon: '📧',
    },
    {
      title: {
        'pt-BR': 'Reservas de Eventos',
        'en-US': 'Event Reservations',
      },
      description: {
        'pt-BR':
          'Sistema de agendamento para visitas guiadas à Chácara Mãe Luzia e eventos de aromaterapia, com formulários integrados.',
        'en-US':
          'Scheduling system for guided visits to Chácara Mãe Luzia and aromatherapy events, with integrated forms.',
      },
      icon: '📅',
    },
    {
      title: {
        'pt-BR': 'Propósito Social',
        'en-US': 'Social Purpose',
      },
      description: {
        'pt-BR':
          'Transparência total sobre a reversão dos recursos para trabalhos assistenciais da Morada Espírita Professor Lairi Hans.',
        'en-US':
          'Complete transparency about the allocation of resources to charitable work by Morada Espírita Professor Lairi Hans.',
      },
      icon: '🤝',
    },
  ],
}
