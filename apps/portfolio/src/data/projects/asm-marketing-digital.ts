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
      'Website institucional de uma consultoria de marketing digital, redesenhado em 2026 sobre o manual de marca da ASM, com diagnóstico digital gratuito e SEO preparado para buscadores e IAs.',
    'en-US':
      "Corporate website for a digital marketing consultancy, redesigned in 2026 on ASM's brand guidelines, with a free digital diagnosis and SEO built for search engines and AI assistants.",
  },
  fullDescription: {
    'pt-BR':
      'Website institucional da ASM Marketing Digital, consultoria de posicionamento de marca e gestão de redes sociais liderada por Anelita Scaliza Massucate. Lançado em 2025, o site evoluiu junto com o negócio: ganhou ferramentas interativas e o feed do Instagram, depois uma página de diagnóstico digital gratuito que leva o lead até o WhatsApp, e em setembro de 2026 foi redesenhado sobre o manual de identidade visual da marca, com terracota, café e areia, Cormorant Garamond e Manrope, o monograma ASM como padrão gráfico, uma seção de perguntas frequentes e dados estruturados para Google, ChatGPT e Gemini.',
    'en-US':
      "Corporate website for ASM Digital Marketing, a brand positioning and social media consultancy led by Anelita Scaliza Massucate. Launched in 2025, the site grew with the business: it gained interactive tools and the Instagram feed, then a free digital diagnosis page that takes the lead straight to WhatsApp, and in September 2026 it was redesigned on the brand's visual identity guidelines, with terracotta, coffee and sand, Cormorant Garamond and Manrope, the ASM monogram as a graphic pattern, an FAQ section and structured data for Google, ChatGPT and Gemini.",
  },
  category: 'web',
  tags: {
    'pt-BR': [
      'Website Institucional',
      'Marketing Digital',
      'Redesign',
      'Identidade Visual',
      'Branding',
      'Consultoria',
      'Redes Sociais',
      'Captação de Leads',
      'SEO',
      'AEO / GEO',
      'Dados Estruturados',
    ],
    'en-US': [
      'Corporate Website',
      'Digital Marketing',
      'Redesign',
      'Visual Identity',
      'Branding',
      'Consultancy',
      'Social Media',
      'Lead Generation',
      'SEO',
      'AEO / GEO',
      'Structured Data',
    ],
  },
  technologies: [
    'Next.js 16',
    'React 19',
    'TypeScript',
    'Tailwind CSS 4',
    'Framer Motion',
    'Lucide',
    'JSON-LD (Schema.org)',
    'Google Apps Script',
    'Vercel',
  ],
  thumbnail: '/projects/asm-marketing-digital/01-hero.jpg',
  images: [
    '/projects/asm-marketing-digital/01-hero.jpg',
    '/projects/asm-marketing-digital/02-servicos.jpg',
    '/projects/asm-marketing-digital/03-quem-sou-eu.jpg',
  ],
  screenshots: [
    {
      id: '1',
      url: '/projects/asm-marketing-digital/01-hero.jpg',
      alt: 'Hero da ASM Marketing Digital com o logotipo, a pergunta em Cormorant Garamond com "presença no digital" em terracota e o retrato da Anelita sobre um painel café com o padrão do monograma',
      caption: {
        'pt-BR':
          'Hero redesenhado: a pergunta que abre a conversa, o CTA do diagnóstico gratuito e o retrato da fundadora sobre o padrão do monograma ASM',
        'en-US':
          "Redesigned hero: the question that opens the conversation, the free diagnosis CTA and the founder's portrait over the ASM monogram pattern",
      },
    },
    {
      id: '1m',
      url: '/projects/asm-marketing-digital/01-hero-mobile.jpg',
      alt: 'Hero da ASM no celular, com logotipo, título em serifa e o botão "Faça o diagnóstico digital gratuito" ocupando a largura da tela',
      caption: {
        'pt-BR': 'No celular, o CTA do diagnóstico aparece já na primeira tela',
        'en-US': 'On mobile, the diagnosis CTA shows up on the first screen',
      },
    },
    {
      id: '2',
      url: '/projects/asm-marketing-digital/02-servicos.jpg',
      alt: 'Seção "Como posso te ajudar?" em fundo café profundo, com os seis serviços em lista editorial de duas colunas, números de clientes e designs em dourado e o bloco de consultoria gratuita',
      caption: {
        'pt-BR':
          'Os seis serviços como lista editorial sobre café profundo, no lugar dos cards com efeito de vidro',
        'en-US':
          'The six services as an editorial list on deep coffee, replacing the glass-effect cards',
      },
    },
    {
      id: '3',
      url: '/projects/asm-marketing-digital/03-quem-sou-eu.jpg',
      alt: 'Seção "Quem sou eu?" com retrato da Anelita, números de experiência, formação, experiência profissional, especialidades e a citação em itálico',
      caption: {
        'pt-BR':
          '"Quem sou eu?" reorganizada como bio editorial: números, formação, trajetória e o propósito da fundadora',
        'en-US':
          '"Who am I?" reorganized as an editorial bio: numbers, education, career and the founder\'s purpose',
      },
    },
    {
      id: '4',
      url: '/projects/asm-marketing-digital/04-diagnostico.jpg',
      alt: 'Faixa areia "Descubra como está sua presença digital" com o botão "Fazer meu diagnóstico grátis"',
      caption: {
        'pt-BR':
          'Chamada para o diagnóstico digital gratuito, a principal porta de entrada de leads',
        'en-US': 'Call to the free digital diagnosis, the main entry point for leads',
      },
    },
    {
      id: '5',
      url: '/projects/asm-marketing-digital/05-faq.jpg',
      alt: 'Seção "Perguntas frequentes" com sete perguntas em acordeão sobre a ASM, os serviços, o diagnóstico e a fundadora',
      caption: {
        'pt-BR':
          'FAQ nova, que compartilha o conteúdo com o schema FAQPage lido por buscadores e IAs',
        'en-US':
          'New FAQ, sharing its content with the FAQPage schema read by search engines and AI',
      },
    },
    {
      id: '6',
      url: '/projects/asm-marketing-digital/06-conteudos.jpg',
      alt: 'Seção "Conteúdos Gratuitos" em café com o monograma ASM em marca d\'água e o card do e-book "5 Prompts de IA para Criar Conteúdo"',
      caption: {
        'pt-BR': "E-book gratuito sobre o monograma da marca em marca d'água",
        'en-US': "Free e-book over the brand's monogram as a watermark",
      },
    },
    {
      id: '7',
      url: '/projects/asm-marketing-digital/07-rodape.jpg',
      alt: 'Rodapé com faixa do padrão de logotipos ASM em areia e o logo dourado sobre café',
      caption: {
        'pt-BR': 'Rodapé com a faixa do padrão de logotipos tirada do manual de marca',
        'en-US': 'Footer with the logotype pattern band taken from the brand guidelines',
      },
    },
  ],
  liveUrl: 'https://asmmktdigital.com.br',
  githubUrl: 'https://github.com/adrianomaringolo/asm-website',
  status: 'completed',
  myRole: 'freelancer',
  featured: false,
  startDate: '2025-04-09',
  endDate: '2026-09-30',
  client: {
    name: { 'pt-BR': 'ASM Marketing Digital', 'en-US': 'ASM Marketing Digital' },
    industry: { 'pt-BR': 'Marketing Digital', 'en-US': 'Digital Marketing' },
    size: 'small',
  },
  challenges: [
    {
      title: {
        'pt-BR': 'Levar o manual de marca para a web',
        'en-US': 'Bringing the brand guidelines to the web',
      },
      description: {
        'pt-BR':
          'A ASM ganhou um documento de identidade visual com paleta, tipografia e padrões gráficos pensados para peças estáticas. O site, montado antes disso, usava tons dourados genéricos, blobs flutuantes, vidro e brilhos que não conversavam com a marca.',
        'en-US':
          'ASM got a visual identity document with a palette, typography and graphic patterns designed for static pieces. The site, built before that, used generic gold tones, floating blobs, glass and shine effects that had nothing to do with the brand.',
      },
      solution: {
        'pt-BR':
          'Transformei o manual em um DESIGN.md com tokens de cor, escala tipográfica e componentes, e reconstruí todas as seções sobre ele: cores chapadas, Cormorant Garamond nos títulos e Manrope no texto, o monograma e o padrão de logotipos extraídos do documento como assets, e ícones lucide no lugar de emojis.',
        'en-US':
          'I turned the guidelines into a DESIGN.md with color tokens, a type scale and components, and rebuilt every section on top of it: flat colors, Cormorant Garamond for headings and Manrope for body text, the monogram and logotype pattern extracted from the document as assets, and lucide icons instead of emojis.',
      },
    },
    {
      title: {
        'pt-BR': 'Ser encontrada por buscadores e por IAs',
        'en-US': 'Being found by search engines and AI assistants',
      },
      description: {
        'pt-BR':
          'Cada vez mais gente pergunta ao ChatGPT ou ao Gemini por indicação de social media. O site tinha uma imagem de compartilhamento vazia, uma verificação falsa no metadata, breadcrumbs baseados em âncoras e páginas duplicadas do diagnóstico.',
        'en-US':
          'More and more people ask ChatGPT or Gemini to recommend a social media consultant. The site had an empty share image, a fake verification tag in its metadata, anchor-based breadcrumbs and duplicate diagnosis pages.',
      },
      solution: {
        'pt-BR':
          'Montei um único grafo JSON-LD com ProfessionalService, Person, WebSite, WebPage e FAQPage, com os seis serviços que de fato estão na página e atendimento 100% online, uma seção de FAQ que compartilha o conteúdo com o schema, um llms.txt para motores generativos, imagem de Open Graph com a marca, sitemap só com URLs reais e redirecionamento permanente da URL antiga do diagnóstico.',
        'en-US':
          'I built a single JSON-LD graph with ProfessionalService, Person, WebSite, WebPage and FAQPage, listing the six services actually on the page and a 100% online service area, an FAQ section that shares its content with the schema, an llms.txt for generative engines, a branded Open Graph image, a sitemap with real URLs only and a permanent redirect from the old diagnosis URL.',
      },
    },
    {
      title: {
        'pt-BR': 'Transformar visita em conversa',
        'en-US': 'Turning visits into conversations',
      },
      description: {
        'pt-BR':
          'Um site institucional bonito não basta para uma consultoria que vive de agenda. Era preciso dar ao visitante um motivo concreto para deixar o contato antes de sair.',
        'en-US':
          "A good-looking corporate site isn't enough for a consultancy that lives off its calendar. Visitors needed a concrete reason to leave their contact before leaving.",
      },
      solution: {
        'pt-BR':
          'Criei a página de diagnóstico digital gratuito: um questionário rápido que gera uma análise da presença online do negócio e termina num bloco de WhatsApp, com o resultado enviado por e-mail via Google Apps Script. No redesign, o diagnóstico virou o CTA principal do hero e ganhou uma faixa própria na home.',
        'en-US':
          "I built the free digital diagnosis page: a short questionnaire that produces an analysis of the business's online presence and ends in a WhatsApp block, with the result emailed through Google Apps Script. In the redesign, the diagnosis became the hero's main CTA and got its own band on the home page.",
      },
    },
  ],
  metrics: [
    {
      label: { 'pt-BR': 'Performance (Lighthouse)', 'en-US': 'Performance (Lighthouse)' },
      value: { 'pt-BR': '100 / 100', 'en-US': '100 / 100' },
      improvement: { 'pt-BR': '94 no celular', 'en-US': '94 on mobile' },
    },
    {
      label: {
        'pt-BR': 'Acessibilidade (Lighthouse)',
        'en-US': 'Accessibility (Lighthouse)',
      },
      value: { 'pt-BR': '100 / 100', 'en-US': '100 / 100' },
    },
    {
      label: {
        'pt-BR': 'Boas Práticas (Lighthouse)',
        'en-US': 'Best Practices (Lighthouse)',
      },
      value: { 'pt-BR': '100 / 100', 'en-US': '100 / 100' },
    },
    {
      label: { 'pt-BR': 'SEO (Lighthouse)', 'en-US': 'SEO (Lighthouse)' },
      value: { 'pt-BR': '100 / 100', 'en-US': '100 / 100' },
    },
  ],
  testimonial: {
    author: 'Anelita Scaliza Massucate',
    role: { 'pt-BR': 'Fundadora', 'en-US': 'Founder' },
    company: 'ASM Marketing Digital',
    avatar: '/projects/asm-marketing-digital/client-thumb.jpg',
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
        'A ASM Marketing Digital, liderada por Anelita Scaliza Massucate, trabalha com posicionamento de marca e social media para empresas e profissionais autônomos. Em 2025 ela precisava de um site que reforçasse sua autoridade e apresentasse os serviços sem cara de landing page genérica de marketing. Um ano e meio depois, o problema era outro: a marca ganhou um manual de identidade visual, e o site, que tinha crescido por acréscimos (ferramentas interativas, feed do Instagram, diagnóstico), ainda usava efeitos de template como blobs, vidro, partículas e emojis, que destoavam da elegância da marca e da própria Anelita.',
      'en-US':
        'ASM Digital Marketing, led by Anelita Scaliza Massucate, works on brand positioning and social media for companies and self-employed professionals. In 2025 she needed a site that reinforced her authority and presented the services without looking like a generic marketing landing page. A year and a half later the problem had changed: the brand got a visual identity guide, and the site, which had grown by additions (interactive tools, Instagram feed, diagnosis), still relied on template effects such as blobs, glass, particles and emojis that clashed with the elegance of the brand and of Anelita herself.',
    },
    solution: {
      'pt-BR':
        'A primeira versão partiu de uma conversa de descoberta sobre público e tom de voz e definiu a arquitetura da home: proposta de valor no primeiro scroll, serviços, a história da fundadora e CTAs para consultoria gratuita. No redesign, o manual de marca virou a fonte de verdade: o hero traz a pergunta que abre a conversa, com o retrato da Anelita sobre um painel café com o monograma; os serviços viraram uma lista editorial sobre café profundo; a bio foi reorganizada em números, formação e trajetória; e o rodapé ganhou a faixa com o padrão de logotipos. O diagnóstico gratuito passou a ser o CTA principal, e uma seção de FAQ alimenta também os dados estruturados.',
      'en-US':
        "The first version came out of a discovery conversation about audience and tone of voice and set the home page architecture: value proposition in the first scroll, services, the founder's story and CTAs for a free consultation. In the redesign, the brand guide became the source of truth: the hero asks the question that opens the conversation, with Anelita's portrait on a coffee panel with the monogram; the services became an editorial list on deep coffee; the bio was reorganized into numbers, education and career; and the footer got the logotype pattern band. The free diagnosis became the main CTA, and an FAQ section also feeds the structured data.",
    },
    process: {
      'pt-BR':
        'O projeto foi tocado em fases ao longo de um ano e meio. Em abril de 2025, o lançamento em Next.js com e-book gratuito. Entre outubro e novembro, ferramentas interativas (calculadoras de engajamento e ROI, gerador de hashtags e de paletas) e o feed do Instagram. Entre maio e junho de 2026, a página de diagnóstico digital com envio por Google Apps Script e CTA de WhatsApp. Em setembro de 2026, o redesign: primeiro um DESIGN.md escrito a partir do documento de identidade, depois o favicon refeito com o monograma, a reconstrução das seções com Tailwind CSS 4 e, por fim, a revisão de SEO, AEO e GEO com JSON-LD, FAQ, llms.txt e imagem de compartilhamento.',
      'en-US':
        'The project ran in phases over a year and a half. In April 2025, the Next.js launch with a free e-book. Between October and November, interactive tools (engagement and ROI calculators, hashtag and palette generators) and the Instagram feed. Between May and June 2026, the digital diagnosis page with Google Apps Script delivery and a WhatsApp CTA. In September 2026, the redesign: first a DESIGN.md written from the identity document, then the favicon rebuilt from the monogram, the sections rebuilt with Tailwind CSS 4 and, finally, an SEO, AEO and GEO pass with JSON-LD, FAQ, llms.txt and a share image.',
    },
    results: {
      'pt-BR':
        'O site agora parece a marca: as mesmas cores, fontes e padrões do material impresso e do Instagram da ASM, sem nenhum efeito de template. O código encolheu no redesign (cerca de 330 linhas a menos, com o menu lateral flutuante e os efeitos removidos), o diagnóstico gratuito ficou a um clique do primeiro scroll, e a página tira 100 nas quatro categorias do Lighthouse no desktop, com dados estruturados que descrevem a ASM, a fundadora, os serviços e as perguntas frequentes para buscadores e assistentes de IA.',
      'en-US':
        "The site now looks like the brand: the same colors, fonts and patterns as ASM's printed material and Instagram, with no template effects left. The code got smaller in the redesign (about 330 fewer lines, with the floating side menu and effects removed), the free diagnosis sits one click away from the first scroll, and the page scores 100 in all four Lighthouse categories on desktop, with structured data describing ASM, its founder, services and FAQ for search engines and AI assistants.",
    },
  },
  features: [
    {
      title: {
        'pt-BR': 'Sistema de Marca',
        'en-US': 'Brand System',
      },
      description: {
        'pt-BR':
          'Paleta terracota, café e areia, Cormorant Garamond com Manrope e os padrões de monograma e logotipo aplicados em todas as seções.',
        'en-US':
          'Terracotta, coffee and sand palette, Cormorant Garamond with Manrope, and the monogram and logotype patterns applied across every section.',
      },
      icon: '🎨',
    },
    {
      title: {
        'pt-BR': 'Diagnóstico Digital Gratuito',
        'en-US': 'Free Digital Diagnosis',
      },
      description: {
        'pt-BR':
          'Questionário rápido que analisa a presença online do negócio e leva o lead direto ao WhatsApp, com o resultado enviado por e-mail.',
        'en-US':
          "A short questionnaire that analyzes the business's online presence and takes the lead straight to WhatsApp, with the result sent by email.",
      },
      icon: '🎯',
    },
    {
      title: {
        'pt-BR': 'SEO, AEO e GEO',
        'en-US': 'SEO, AEO and GEO',
      },
      description: {
        'pt-BR':
          'Grafo JSON-LD com serviço, pessoa, site e FAQ, llms.txt e imagem de compartilhamento para aparecer em buscadores e respostas de IA.',
        'en-US':
          'JSON-LD graph with service, person, website and FAQ, llms.txt and a share image to show up in search results and AI answers.',
      },
      icon: '🔍',
    },
    {
      title: {
        'pt-BR': 'Branding Pessoal',
        'en-US': 'Personal Branding',
      },
      description: {
        'pt-BR':
          'Bio editorial com números, formação, trajetória e o propósito da fundadora, reforçando autoridade e conexão.',
        'en-US':
          "Editorial bio with numbers, education, career and the founder's purpose, reinforcing authority and connection.",
      },
      icon: '👤',
    },
  ],
}
