import type { Project } from '@/types/project'

export const asmMarketingDigital: Project = {
  id: '1',
  slug: 'asm-marketing-digital',
  title: {
    'pt-BR': 'ASM Marketing Digital - Website Institucional',
    'en-US': 'ASM Digital Marketing - Corporate Website',
  },
  shortDescription: {
    'pt-BR':
      'Website institucional moderno para consultoria de marketing digital, focado em conversão e autoridade da marca.',
    'en-US':
      'Modern corporate website for digital marketing consultancy, focused on conversion and brand authority.',
  },
  fullDescription: {
    'pt-BR':
      'Desenvolvimento completo de website institucional para a ASM Marketing Digital, consultoria especializada em posicionamento de marcas e gestão de redes sociais. O projeto incluiu arquitetura da informação estratégica, design responsivo e integração com ferramentas de captação de leads.',
    'en-US':
      'Complete development of corporate website for ASM Digital Marketing, a consultancy specialized in brand positioning and social media management. The project included strategic information architecture, responsive design and integration with lead capture tools.',
  },
  category: 'web',
  tags: {
    'pt-BR': [
      'Website Institucional',
      'Marketing Digital',
      'Conversão',
      'Branding',
      'Consultoria',
      'Redes Sociais',
      'Landing Page',
      'SEO',
    ],
    'en-US': [
      'Corporate Website',
      'Digital Marketing',
      'Conversion',
      'Branding',
      'Consultancy',
      'Social Media',
      'Landing Page',
      'SEO',
    ],
  },
  technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'shadcn/ui', 'Vercel'],
  thumbnail: '/projects/asm-marketing/hero.jpeg',
  images: ['/projects/asm-marketing/hero.jpeg', '/projects/asm-marketing/thumbnail.svg'],
  screenshots: [
    {
      id: '1',
      url: '/projects/asm-marketing/hero.jpeg',
      alt: 'Homepage da ASM Marketing Digital',
      caption: {
        'pt-BR':
          'Homepage com proposta de valor clara e CTAs estratégicos para conversão',
        'en-US':
          'Homepage with clear value proposition and strategic CTAs for conversion',
      },
    },
    {
      id: '2',
      url: '/projects/asm-marketing/services.jpeg',
      alt: 'Seção de serviços',
      caption: {
        'pt-BR': 'Apresentação visual dos serviços com design limpo e moderno',
        'en-US': 'Visual presentation of services with clean and modern design',
      },
    },
    {
      id: '3',
      url: '/projects/asm-marketing/about.jpeg',
      alt: 'Seção Quem sou eu',
      caption: {
        'pt-BR':
          'Seção "Quem sou eu" envolvente que reforça o branding pessoal da fundadora',
        'en-US':
          'Engaging "About me" section that reinforces the founder\'s personal branding',
      },
    },
  ],
  liveUrl: 'https://asmmktdigital.com.br',
  githubUrl: 'https://github.com/adrianomaringolo/asm-website',
  status: 'completed',
  featured: true,
  startDate: '2025-04-09',
  endDate: '2025-05-15',
  client: {
    name: 'ASM Marketing Digital',
    industry: 'Marketing Digital',
    size: 'small',
  },
  challenges: [
    {
      title: {
        'pt-BR': 'Diferenciação no Mercado Saturado',
        'en-US': 'Differentiation in Saturated Market',
      },
      description: {
        'pt-BR':
          'O mercado de marketing digital está saturado de landing pages genéricas. Era preciso criar algo único que refletisse a personalidade e abordagem humana da Anelita.',
        'en-US':
          "The digital marketing market is saturated with generic landing pages. It was necessary to create something unique that reflected Anelita's personality and human approach.",
      },
      solution: {
        'pt-BR':
          'Desenvolvemos uma identidade visual única, focando no storytelling pessoal e na apresentação estratégica dos serviços com design diferenciado.',
        'en-US':
          'We developed a unique visual identity, focusing on personal storytelling and strategic presentation of services with differentiated design.',
      },
    },
    {
      title: {
        'pt-BR': 'Conversão e Captação de Leads',
        'en-US': 'Conversion and Lead Generation',
      },
      description: {
        'pt-BR':
          'Era necessário criar um site que não apenas informasse, mas que efetivamente convertesse visitantes em leads qualificados.',
        'en-US':
          'It was necessary to create a website that not only informed, but effectively converted visitors into qualified leads.',
      },
      solution: {
        'pt-BR':
          'Implementamos CTAs estratégicos, formulários integrados ao Google Forms e uma jornada do usuário otimizada para conversão.',
        'en-US':
          'We implemented strategic CTAs, forms integrated with Google Forms and a user journey optimized for conversion.',
      },
    },
  ],
  metrics: [
    {
      label: { 'pt-BR': 'Tempo de Desenvolvimento', 'en-US': 'Development Time' },
      value: { 'pt-BR': '1 semana', 'en-US': '1 week' },
      improvement: { 'pt-BR': 'Entrega no prazo', 'en-US': 'On-time delivery' },
    },
    {
      label: { 'pt-BR': 'SEO', 'en-US': 'SEO' },
      value: { 'pt-BR': '100/100', 'en-US': '100/100' },
      improvement: { 'pt-BR': 'Lighthouse', 'en-US': 'Lighthouse' },
    },
    {
      label: { 'pt-BR': 'Conversão de Leads', 'en-US': 'Lead Conversion' },
      value: { 'pt-BR': '+150%', 'en-US': '+150%' },
      improvement: { 'pt-BR': 'vs. período anterior', 'en-US': 'vs. previous period' },
    },
  ],
  testimonial: {
    author: 'Anelita Scaliza Massucate',
    role: { 'pt-BR': 'Fundadora', 'en-US': 'Founder' },
    company: 'ASM Marketing Digital',
    avatar: '/projects/asm-marketing/client-thumb.jpg',
    content: {
      'pt-BR':
        'Ter o Adriano como parceiro é ter certeza de qualidade e profissionalismo.\n Ele entrega sites bonitos, funcionais e feitos com muito cuidado, sempre pensando na melhor experiência de quem vai usar.\n Excelente profissional.',
      'en-US':
        'Having Adriano as a partner is ensuring quality and professionalism. He delivers beautiful, functional websites, made with great care, always thinking about the best user experience to be provided.\n Excellent professional.',
    },
    rating: 5,
  },
  story: {
    problem: {
      'pt-BR':
        'A ASM Marketing Digital, liderada por Anelita Scaliza Massucate, é uma agência focada em posicionamento de marcas e estratégias de social media. Com o crescimento da empresa, surgiu a necessidade de ter um site profissional que refletisse a identidade da marca, comunicasse seus serviços de forma estratégica e reforçasse a autoridade da fundadora no mercado digital. O desafio principal era criar uma presença online moderna, inspiradora e conversiva, que traduzisse o estilo humano e estratégico do trabalho da Anelita — sem parecer uma landing page genérica de marketing digital.',
      'en-US':
        "ASM Digital Marketing, led by Anelita Scaliza Massucate, is an agency focused on brand positioning and social media strategies. With the company's growth, the need arose for a professional website that reflected the brand identity, communicated its services strategically and reinforced the founder's authority in the digital market. The main challenge was to create a modern, inspiring and conversion-focused online presence that translated Anelita's human and strategic work style — without looking like a generic digital marketing landing page.",
    },
    solution: {
      'pt-BR':
        'Iniciei o projeto com uma etapa de descoberta, conversando com a cliente para entender o público-alvo e o tom de comunicação da marca — uma combinação entre profissionalismo, empatia e propósito. A partir desse diagnóstico, defini a arquitetura da informação com foco em: clareza da proposta de valor logo no primeiro scroll, apresentação dos serviços de forma visual e direta, construção de credibilidade através da história e experiência da fundadora, e inclusão de CTAs estratégicos para agendamento de consultoria gratuita.',
      'en-US':
        "I started the project with a discovery phase, talking with the client to understand the target audience and the brand's communication tone — a combination of professionalism, empathy and purpose. From this diagnosis, I defined the information architecture focusing on: clarity of value proposition right from the first scroll, visual and direct presentation of services, building credibility through the founder's story and experience, and inclusion of strategic CTAs for free consultation scheduling.",
    },
    process: {
      'pt-BR':
        'O design foi pensado para valorizar o conteúdo visual e criar uma experiência fluida tanto no desktop quanto no mobile. Utilizei Next.js com App Router para performance e SEO otimizados, TypeScript para confiabilidade no desenvolvimento, TailwindCSS para design responsivo consistente, shadcn/ui para componentes acessíveis, e Vercel para deploy contínuo. O desenvolvimento foi iterativo, com feedback constante da cliente para garantir alinhamento com a visão da marca.',
      'en-US':
        'The design was conceived to enhance visual content and create a fluid experience on both desktop and mobile. I used Next.js with App Router for optimized performance and SEO, TypeScript for development reliability, TailwindCSS for consistent responsive design, shadcn/ui for accessible components, and Vercel for continuous deployment. Development was iterative, with constant client feedback to ensure alignment with the brand vision.',
    },
    results: {
      'pt-BR':
        'O resultado foi um site moderno, otimizado e estratégico, que apresenta os serviços da ASM com clareza e design limpo, reforça o branding pessoal da Anelita com uma seção "Quem sou eu" envolvente, inclui formulários integrados ao Google Forms para captação de leads, e contém links integrados ao Instagram e e-books gratuitos para fortalecer a presença digital. O novo site elevou a percepção profissional da marca, consolidando a ASM como uma consultoria de marketing sólida e acessível.',
      'en-US':
        "The result was a modern, optimized and strategic website that presents ASM's services with clarity and clean design, reinforces Anelita's personal branding with an engaging \"About me\" section, includes forms integrated with Google Forms for lead capture, and contains integrated links to Instagram and free e-books to strengthen digital presence. The new website elevated the brand's professional perception, consolidating ASM as a solid and accessible marketing consultancy.",
    },
  },
  features: [
    {
      title: {
        'pt-BR': 'Design Responsivo',
        'en-US': 'Responsive Design',
      },
      description: {
        'pt-BR':
          'Layout adaptável que funciona perfeitamente em todos os dispositivos, garantindo uma experiência consistente.',
        'en-US':
          'Adaptive layout that works perfectly on all devices, ensuring a consistent experience.',
      },
      icon: '📱',
    },
    {
      title: {
        'pt-BR': 'SEO Otimizado',
        'en-US': 'SEO Optimized',
      },
      description: {
        'pt-BR':
          'Estrutura otimizada para mecanismos de busca com meta tags, schema markup e performance de carregamento.',
        'en-US':
          'Structure optimized for search engines with meta tags, schema markup and loading performance.',
      },
      icon: '🔍',
    },
    {
      title: {
        'pt-BR': 'Captação de Leads',
        'en-US': 'Lead Generation',
      },
      description: {
        'pt-BR':
          'Formulários estratégicos integrados ao Google Forms para conversão eficiente de visitantes em leads.',
        'en-US':
          'Strategic forms integrated with Google Forms for efficient conversion of visitors into leads.',
      },
      icon: '🎯',
    },
    {
      title: {
        'pt-BR': 'Branding Pessoal',
        'en-US': 'Personal Branding',
      },
      description: {
        'pt-BR':
          'Seção dedicada ao storytelling pessoal da fundadora, reforçando autoridade e conexão emocional.',
        'en-US':
          "Section dedicated to the founder's personal storytelling, reinforcing authority and emotional connection.",
      },
      icon: '👤',
    },
  ],
}
