import type { Project } from '@/types/project'

export const symproLanding: Project = {
  id: '5',
  slug: 'sympro-landing',
  title: {
    'pt-BR': 'SymPro — Landing Page de Conversão',
    'en-US': 'SymPro — Conversion Landing Page',
  },
  shortDescription: {
    'pt-BR':
      'Landing page de pré-lançamento para plataforma SaaS de gestão de profissionais autônomos, com foco em captação de leads e comunicação de valor.',
    'en-US':
      'Pre-launch landing page for a SaaS management platform for independent professionals, focused on lead generation and value communication.',
  },
  fullDescription: {
    'pt-BR':
      'Landing page completa para o SymPro, plataforma SaaS voltada a profissionais autônomos brasileiros — cabeleireiros, esteticistas, personal trainers, fisioterapeutas e outros prestadores de serviço. O projeto cobre arquitetura de informação estratégica em 14 seções, design mobile-first, animações com Framer Motion, SEO completo com JSON-LD e formulário de lista de espera via API Route no Next.js.',
    'en-US':
      'Full landing page for SymPro, a SaaS platform targeting Brazilian independent professionals — hairdressers, estheticians, personal trainers, physiotherapists and other service providers. The project covers strategic information architecture across 14 sections, mobile-first design, Framer Motion animations, complete SEO with JSON-LD, and a waitlist form via Next.js API Route.',
  },
  category: 'web',
  tags: {
    'pt-BR': [
      'Landing Page',
      'SaaS',
      'Conversão',
      'Lista de Espera',
      'Mobile-first',
      'SEO',
      'Animações',
      'Projeto Pessoal',
    ],
    'en-US': [
      'Landing Page',
      'SaaS',
      'Conversion',
      'Waitlist',
      'Mobile-first',
      'SEO',
      'Animations',
      'Personal Project',
    ],
  },
  technologies: [
    'Next.js 15',
    'TypeScript',
    'React 19',
    'Tailwind CSS',
    'Radix UI',
    'Framer Motion',
    'Vercel Analytics',
    'Vercel',
  ],
  thumbnail: '/projects/sympro/01-hero-desktop.png',
  images: [
    '/projects/sympro/01-hero-desktop.png',
    '/projects/sympro/03-pillars-section.png',
    '/projects/sympro/05-beneficios.png',
    '/projects/sympro/06-funcionalidades.png',
    '/projects/sympro/07-planos.png',
    '/projects/sympro/08-team.png',
    '/projects/sympro/09-hero-mobile.png',
    '/projects/sympro/10-education-section.png',
  ],
  screenshots: [
    {
      id: '1',
      url: '/projects/sympro/01-hero-desktop.png',
      alt: 'Hero da landing page do SymPro',
      caption: {
        'pt-BR': 'Hero com typewriter animation e formulário de inscrição na lista de espera',
        'en-US': 'Hero with typewriter animation and waitlist sign-up form',
      },
    },
    {
      id: '2',
      url: '/projects/sympro/03-pillars-section.png',
      alt: 'Seção de pilares do SymPro',
      caption: {
        'pt-BR': 'Pilares de valor: clientes, agenda e finanças em um só lugar',
        'en-US': 'Value pillars: clients, schedule, and finances in one place',
      },
    },
    {
      id: '3',
      url: '/projects/sympro/05-beneficios.png',
      alt: 'Seção de benefícios do SymPro',
      caption: {
        'pt-BR': 'Grade de benefícios com as principais funcionalidades da plataforma',
        'en-US': 'Benefits grid with the platform\'s main features',
      },
    },
    {
      id: '4',
      url: '/projects/sympro/06-funcionalidades.png',
      alt: 'Seção de funcionalidades do SymPro',
      caption: {
        'pt-BR': 'Diferenciais únicos: semáforo de follow-up, metas e relatórios',
        'en-US': 'Unique differentiators: follow-up traffic light, goals, and reports',
      },
    },
    {
      id: '5',
      url: '/projects/sympro/07-planos.png',
      alt: 'Planos e preços do SymPro',
      caption: {
        'pt-BR': 'Três planos com toggle mensal/anual e destaque do plano recomendado',
        'en-US': 'Three plans with monthly/annual toggle and recommended plan highlight',
      },
    },
    {
      id: '6',
      url: '/projects/sympro/08-team.png',
      alt: 'Seção do time SymPro',
      caption: {
        'pt-BR': 'Apresentação do time responsável pelo projeto',
        'en-US': 'Presentation of the team behind the project',
      },
    },
    {
      id: '7',
      url: '/projects/sympro/09-hero-mobile.png',
      alt: 'Hero mobile do SymPro',
      caption: {
        'pt-BR': 'Layout mobile-first otimizado para celular e tablet',
        'en-US': 'Mobile-first layout optimized for phone and tablet',
      },
    },
    {
      id: '8',
      url: '/projects/sympro/10-education-section.png',
      alt: 'Seção de educação do SymPro',
      caption: {
        'pt-BR': 'Central de Educação incluída no plano gratuito',
        'en-US': 'Education Center included in the free plan',
      },
    },
  ],
  liveUrl: 'https://sympro.com.br',
  status: 'in-progress',
  myRole: 'founder',
  featured: true,
  startDate: '2025-03-01',
  challenges: [
    {
      title: {
        'pt-BR': 'Comunicar valor para um público não-técnico',
        'en-US': 'Communicating value to a non-technical audience',
      },
      description: {
        'pt-BR':
          'O público-alvo são profissionais autônomos que usam cadernos e WhatsApp. Qualquer sinal de complexidade técnica ou linguagem corporativa afasta o visitante antes da primeira rolagem.',
        'en-US':
          'The target audience are self-employed professionals who use notebooks and WhatsApp. Any signal of technical complexity or corporate language drives the visitor away before the first scroll.',
      },
      solution: {
        'pt-BR':
          'Princípio "mostre, não descreva": mockups reais da plataforma, steps numerados ultra-simples e copywriting direto ao problema do dia a dia ("para de perder clientes por falta de organização").',
        'en-US':
          'The "show, don\'t describe" principle: real platform mockups, ultra-simple numbered steps, and copywriting that speaks directly to the everyday problem ("stop losing clients due to lack of organization").',
      },
    },
    {
      title: {
        'pt-BR': 'Performance em conexões móveis lentas',
        'en-US': 'Performance on slow mobile connections',
      },
      description: {
        'pt-BR':
          'O público acessa pelo celular, muitas vezes em 4G instável. Vídeo de demonstração e múltiplos mockups poderiam arruinar o LCP.',
        'en-US':
          'The audience accesses via mobile, often on unstable 4G. A demo video and multiple mockups could ruin the LCP.',
      },
      solution: {
        'pt-BR':
          'Video facade (zero JS bloqueante até o clique), preload do hero image, next/image em todas as imagens e cache otimizado via Vercel.',
        'en-US':
          'Video facade (zero blocking JS until click), hero image preload, next/image on all images, and optimized caching via Vercel.',
      },
    },
    {
      title: {
        'pt-BR': 'Converter visitante em lead sem produto pronto',
        'en-US': 'Converting visitor into lead without a finished product',
      },
      description: {
        'pt-BR':
          'A plataforma ainda está em desenvolvimento. Era preciso gerar confiança e desejo suficientes para que o visitante deixasse o e-mail antes do lançamento.',
        'en-US':
          'The platform is still under development. Enough trust and desire had to be generated for the visitor to leave their email before the launch.',
      },
      solution: {
        'pt-BR':
          'Seção de planos e preços transparente, screenshots reais das telas em desenvolvimento, seção de diferenciais com funcionalidades únicas e CTA de lista de espera com benefício claro.',
        'en-US':
          'Transparent pricing section, real screenshots of screens in development, differentiators section with unique features, and waitlist CTA with a clear benefit.',
      },
    },
  ],
  metrics: [
    {
      label: { 'pt-BR': 'Seções da landing', 'en-US': 'Landing sections' },
      value: { 'pt-BR': '14', 'en-US': '14' },
    },
    {
      label: { 'pt-BR': 'Breakpoint mínimo', 'en-US': 'Minimum breakpoint' },
      value: { 'pt-BR': '380 px', 'en-US': '380 px' },
    },
    {
      label: { 'pt-BR': 'Planos disponíveis', 'en-US': 'Available plans' },
      value: { 'pt-BR': '3 planos', 'en-US': '3 plans' },
    },
  ],
  story: {
    problem: {
      'pt-BR':
        'Profissionais autônomos brasileiros — cabeleireiros, esteticistas, personal trainers, fisioterapeutas e outros prestadores de serviço — gerenciam clientes, agenda e finanças em cadernos, planilhas ou pelo WhatsApp. O resultado é previsível: clientes esquecidos, cobranças perdidas e receita que escapa por falta de organização. É um problema real, frequente e mal atendido pelo mercado de SaaS, que ou oferece ferramentas genéricas demais ou sistemas complexos demais para quem só quer focar no próprio ofício.',
      'en-US':
        'Brazilian self-employed professionals — hairdressers, estheticians, personal trainers, physiotherapists and other service providers — manage clients, schedules, and finances in notebooks, spreadsheets, or via WhatsApp. The result is predictable: forgotten clients, missed charges, and revenue that slips away due to lack of organization. It is a real, recurring problem that the SaaS market poorly addresses — tools are either too generic or too complex for those who just want to focus on their craft.',
    },
    solution: {
      'pt-BR':
        'O SymPro nasce como uma plataforma SaaS desenhada especificamente para esse público: simples o suficiente para funcionar sem treinamento, mas completa o suficiente para substituir o caderno e a planilha com vantagem. A landing page é o primeiro ponto de contato do funil: seu trabalho é apresentar o produto, demonstrar valor por meio de mockups e seções educativas, qualificar o visitante e capturar o e-mail para a lista de espera antes do lançamento oficial.',
      'en-US':
        'SymPro is built as a SaaS platform designed specifically for this audience: simple enough to work without training, yet complete enough to replace the notebook and spreadsheet with clear advantages. The landing page is the first touchpoint in the funnel: its job is to present the product, demonstrate value through mockups and educational sections, qualify the visitor, and capture the email for the waitlist before the official launch.',
    },
    process: {
      'pt-BR':
        'O projeto foi estruturado em 14 seções ordenadas para guiar o visitante pelo funil: Hero com typewriter animation e formulário de inscrição, "Para Quem" com grid de profissões, Pilares de valor, Como Funciona em três passos, demonstração em vídeo (facade), mockup multi-device, grade de benefícios, diferenciais únicos (semáforo de follow-up, metas, relatórios), vitrine de screenshots, planos e preços com toggle mensal/anual, time, FAQ e CTA final. Todo o layout foi construído mobile-first com breakpoint mínimo em 380 px e animações via Framer Motion com `whileInView` para performance suave no scroll.',
      'en-US':
        'The project was structured across 14 sections ordered to guide the visitor through the funnel: Hero with typewriter animation and sign-up form, "For Who" with a professions grid, Value Pillars, How It Works in three steps, video demo (facade), multi-device mockup, benefits grid, unique differentiators (follow-up traffic light, daily/monthly goals, service reports), screenshot showcase, pricing plans with monthly/annual toggle, team, FAQ, and final CTA. The entire layout was built mobile-first with a minimum breakpoint at 380 px and Framer Motion animations with `whileInView` for smooth scroll performance.',
    },
    results: {
      'pt-BR':
        'A landing está em produção em sympro.com.br capturando leads para a lista de espera. Tecnicamente, a página atinge scores elevados no Lighthouse graças ao video facade, preload do hero image e uso consistente de next/image. O SEO cobre metadata completo, Open Graph, Twitter Card, sitemap.xml, robots.txt e schema WebSite em JSON-LD. O projeto está em pré-lançamento com desenvolvimento ativo da plataforma.',
      'en-US':
        'The landing is live at sympro.com.br capturing leads for the waitlist. Technically, the page achieves high Lighthouse scores thanks to the video facade, hero image preload, and consistent use of next/image. SEO covers full metadata, Open Graph, Twitter Card, sitemap.xml, robots.txt, and WebSite schema in JSON-LD. The project is in pre-launch with active platform development.',
    },
  },
  features: [
    {
      title: { 'pt-BR': 'Hero com Typewriter Animation', 'en-US': 'Hero with Typewriter Animation' },
      description: {
        'pt-BR':
          'Galeria rotativa de profissões na headline, floating cards com métricas e formulário de inscrição na lista de espera.',
        'en-US':
          'Rotating professions gallery in the headline, floating metric cards, and waitlist sign-up form.',
      },
    },
    {
      title: { 'pt-BR': 'Video Facade de Performance', 'en-US': 'Performance Video Facade' },
      description: {
        'pt-BR':
          'Demonstração do produto via YouTube sem carregar o player até o clique — zero JS bloqueante no carregamento inicial.',
        'en-US':
          'Product demo via YouTube without loading the player until clicked — zero blocking JS on initial load.',
      },
    },
    {
      title: { 'pt-BR': 'Planos e Preços com Toggle', 'en-US': 'Pricing with Toggle' },
      description: {
        'pt-BR':
          'Três planos (Gratuito, Profissional, Profissional+) com alternância mensal/anual e destaque visual do plano recomendado.',
        'en-US':
          'Three plans (Free, Professional, Professional+) with monthly/annual toggle and visual highlight of the recommended plan.',
      },
    },
    {
      title: { 'pt-BR': 'SEO Completo com JSON-LD', 'en-US': 'Full SEO with JSON-LD' },
      description: {
        'pt-BR':
          'Metadata, Open Graph, Twitter Card, sitemap.xml, robots.txt e schema WebSite estruturado para máxima visibilidade nos buscadores.',
        'en-US':
          'Metadata, Open Graph, Twitter Card, sitemap.xml, robots.txt, and structured WebSite schema for maximum search engine visibility.',
      },
    },
    {
      title: { 'pt-BR': 'Mobile-First Rigoroso', 'en-US': 'Strict Mobile-First' },
      description: {
        'pt-BR':
          'Layout responsivo com breakpoint mínimo em 380 px, steps horizontais no desktop e verticais no mobile.',
        'en-US':
          'Responsive layout with minimum breakpoint at 380 px, horizontal steps on desktop and vertical on mobile.',
      },
    },
    {
      title: { 'pt-BR': 'API Route de Lista de Espera', 'en-US': 'Waitlist API Route' },
      description: {
        'pt-BR':
          'Formulário de captura integrado a uma API Route do Next.js para inscrição na lista de espera antes do lançamento.',
        'en-US':
          'Capture form integrated with a Next.js API Route for waitlist sign-up before the official launch.',
      },
    },
  ],
  nextSteps: {
    'pt-BR': [
      'Lançamento público da plataforma SymPro',
      'Integração com sistema de e-mail marketing para nurturing dos leads',
      'Adição de depoimentos reais após os primeiros usuários beta',
      'A/B testing nas CTAs do hero para otimização de conversão',
    ],
    'en-US': [
      'Public launch of the SymPro platform',
      'Integration with email marketing system for lead nurturing',
      'Addition of real testimonials after first beta users',
      'A/B testing on hero CTAs for conversion optimization',
    ],
  },
}
