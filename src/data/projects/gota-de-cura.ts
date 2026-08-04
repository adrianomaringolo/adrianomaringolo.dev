import type { Project } from '@/types/project'

export const gotaDeCura: Project = {
  id: '5',
  slug: 'gota-de-cura',
  title: {
    'pt-BR': 'Gota de Cura — Catálogo e Loja de Aromaterapia',
    'en-US': 'Gota de Cura — Aromatherapy Catalog and Shop',
  },
  shortDescription: {
    'pt-BR':
      'Projeto voluntário: catálogo, sistema de pedidos e painel de gestão para uma iniciativa de aromaterapia sem fins lucrativos, reconstruído do zero em Next.js 16 com área editorial própria e publicação integral dos laudos de cromatografia.',
    'en-US':
      'Volunteer project: catalog, order system and management panel for a non-profit aromatherapy initiative, rebuilt from scratch on Next.js 16 with its own editorial section and full publication of chromatography reports.',
  },
  fullDescription: {
    'pt-BR':
      'Projeto voluntário desenvolvido para a Gota de Cura, iniciativa sem fins lucrativos de aromaterapia cujos recursos são revertidos para os trabalhos assistenciais da Morada Espírita Prof. Lairi Hans. A plataforma reúne catálogo de dezessete prateleiras de produtos, sistema de pedidos, agendamento de visitas à Chácara da Mãe Luzia e painel de gestão para a equipe. Em 2026 o site foi reconstruído do zero sobre Next.js 16 e Tailwind CSS v4, com sistema de cor em OKLCH definido em tokens, área de blog para conteúdo editorial, publicação integral dos laudos de cromatografia por planta e grafo completo de dados estruturados para busca.',
    'en-US':
      'Volunteer project developed for Gota de Cura, a non-profit aromatherapy initiative whose proceeds fund the charitable work of Morada Espírita Prof. Lairi Hans. The platform brings together a catalog of seventeen product shelves, an order system, scheduling for visits to Chácara da Mãe Luzia and a management panel for the team. In 2026 the site was rebuilt from scratch on Next.js 16 and Tailwind CSS v4, with an OKLCH color system defined in tokens, an editorial blog section, full publication of chromatography reports per plant and a complete structured-data graph for search.',
  },
  category: 'webapp',
  tags: {
    'pt-BR': [
      'Projeto Voluntário',
      'Catálogo Digital',
      'Aromaterapia',
      'Sem fins lucrativos',
      'Redesign',
      'Blog',
      'Cromatografias',
      'Sistema de Pedidos',
      'Painel de Gestão',
      'SEO',
      'Propósito Social',
      'Em Constante Melhoria',
    ],
    'en-US': [
      'Volunteer Project',
      'Digital Catalog',
      'Aromatherapy',
      'Non-profit',
      'Redesign',
      'Blog',
      'Chromatography',
      'Order System',
      'Admin Panel',
      'SEO',
      'Social Purpose',
      'Continuous Improvement',
    ],
  },
  technologies: [
    'Next.js 16',
    'React 19',
    'TypeScript',
    'Tailwind CSS v4',
    'Firebase (Firestore)',
    'react-hook-form',
    'react-markdown',
    'EmailJS',
    'Vercel',
    'Vercel Analytics',
  ],
  thumbnail: '/projects/gota-de-cura/01-hero.png',
  images: [
    '/projects/gota-de-cura/01-hero.png',
    '/projects/gota-de-cura/02-catalogo.png',
    '/projects/gota-de-cura/03-laudos.png',
    '/projects/gota-de-cura/04-blog.png',
    '/projects/gota-de-cura/05-post.png',
    '/projects/gota-de-cura/06-visitacao.png',
    '/projects/gota-de-cura/07-admin-produtos.png',
    '/projects/gota-de-cura/08-hero-mobile.png',
    '/projects/gota-de-cura/09-blog-mobile.png',
  ],
  screenshots: [
    {
      id: '1',
      url: '/projects/gota-de-cura/01-hero.png',
      alt: 'Homepage da Gota de Cura com foto da loja física e dados de endereço e horário',
      caption: {
        'pt-BR':
          'Homepage reconstruída em 2026 — o convite é para a loja física na José Paulino, com endereço e horário de funcionamento logo no primeiro scroll',
        'en-US':
          'Homepage rebuilt in 2026 — the invitation is to the physical shop on José Paulino, with address and opening hours right on the first scroll',
      },
    },
    {
      id: '2',
      url: '/projects/gota-de-cura/02-catalogo.png',
      alt: 'Seção O catálogo com as prateleiras de produtos em cartões',
      caption: {
        'pt-BR':
          'O catálogo organizado em dezessete prateleiras — hidrolatos, óleos essenciais, diluições e sabonetes artesanais, cada uma abrindo a lista completa com preço e disponibilidade',
        'en-US':
          'The catalog organized into seventeen shelves — hydrolats, essential oils, dilutions and artisanal soaps, each opening the full list with price and availability',
      },
    },
    {
      id: '3',
      url: '/projects/gota-de-cura/03-laudos.png',
      alt: 'Seção de cromatografias com lista de laudos por planta e nome científico',
      caption: {
        'pt-BR':
          'Os laudos de cromatografia publicados por planta, com nome científico e categoria — a procedência fica verificável sem depender da palavra da marca',
        'en-US':
          'Chromatography reports published per plant, with scientific name and category — provenance becomes verifiable without relying on the brand’s word',
      },
    },
    {
      id: '4',
      url: '/projects/gota-de-cura/04-blog.png',
      alt: 'Listagem do blog com filtros por tag e o primeiro artigo publicado',
      caption: {
        'pt-BR':
          'A área de blog, incluída no redesign — listagem com filtro por tag e uma promessa editorial explícita: aromaterapia sem misticismo e sem promessa',
        'en-US':
          'The blog section, added in the redesign — listing with tag filtering and an explicit editorial promise: aromatherapy without mysticism and without hype',
      },
    },
    {
      id: '5',
      url: '/projects/gota-de-cura/05-post.png',
      alt: 'Artigo do blog aberto, com autor, data, tempo de leitura e tags',
      caption: {
        'pt-BR':
          'Artigo aberto — o conteúdo vem de arquivos Markdown no repositório e carrega dados estruturados de BlogPosting para indexação',
        'en-US':
          'An article open — content comes from Markdown files in the repository and carries BlogPosting structured data for indexing',
      },
    },
    {
      id: '6',
      url: '/projects/gota-de-cura/06-visitacao.png',
      alt: 'Seção de visitação à Chácara da Mãe Luzia com duração, local, valores e próximas datas',
      caption: {
        'pt-BR':
          'A visitação à Chácara da Mãe Luzia com duração, local, valores por faixa etária e as próximas datas com vagas abertas',
        'en-US':
          'Visits to Chácara da Mãe Luzia with duration, location, pricing by age group and the next dates with open spots',
      },
    },
    {
      id: '7',
      url: '/projects/gota-de-cura/07-admin-produtos.png',
      alt: 'Tela de disponibilidade e estoque no painel administrativo',
      caption: {
        'pt-BR':
          'Painel da equipe — controle de disponibilidade e estoque por produto, com preço e código, no mesmo sistema visual do site público',
        'en-US':
          'Team panel — availability and stock control per product, with price and SKU, sharing the same visual system as the public site',
      },
    },
    {
      id: '8',
      url: '/projects/gota-de-cura/08-hero-mobile.png',
      alt: 'Versão mobile da homepage da Gota de Cura',
      caption: {
        'pt-BR':
          'Versão mobile — o mesmo conteúdo do topo reorganizado em coluna única, com a tipografia e o espaçamento recalculados para a tela pequena',
        'en-US':
          'Mobile version — the same top-of-page content reorganized into a single column, with typography and spacing recalculated for the small screen',
      },
    },
    {
      id: '9',
      url: '/projects/gota-de-cura/09-blog-mobile.png',
      alt: 'Versão mobile da listagem do blog',
      caption: {
        'pt-BR':
          'Listagem do blog em mobile — os filtros por tag quebram em duas linhas e o cartão do artigo se reorganiza sem perder miniatura nem metadados',
        'en-US':
          'Blog listing on mobile — tag filters wrap onto two lines and the article card reflows without losing its thumbnail or metadata',
      },
    },
  ],
  liveUrl: 'https://www.gotadecura.com.br',
  featured: true,
  status: 'continous-improvement',
  startDate: '2021-08-01',
  client: {
    name: { 'pt-BR': 'Gota de Cura', 'en-US': 'Gota de Cura' },
    industry: {
      'pt-BR': 'Aromaterapia e Cosméticos Naturais',
      'en-US': 'Aromatherapy & Natural Cosmetics',
    },
    size: 'small',
  },
  challenges: [
    {
      title: {
        'pt-BR': 'Reconstruir a interface sem parar a operação',
        'en-US': 'Rebuilding the interface without stopping operations',
      },
      description: {
        'pt-BR':
          'Depois de cinco anos de acréscimos incrementais, a interface tinha acumulado camadas que já não conversavam entre si, enquanto pedidos, visitas e cadastros continuavam entrando todos os dias. Refazer o visual sem interromper o que estava em produção era a condição de partida.',
        'en-US':
          'After five years of incremental additions, the interface had accumulated layers that no longer spoke to each other, while orders, visits and registrations kept coming in every day. Redoing the visuals without interrupting what was in production was the starting condition.',
      },
      solution: {
        'pt-BR':
          'Reconstruí a aplicação do zero sobre Next.js 16 e Tailwind CSS v4, com todo o sistema visual concentrado em tokens OKLCH num único arquivo de tema. O modelo de dados no Firestore foi preservado, então catálogo, pedidos e visitas seguiram funcionando durante a troca.',
        'en-US':
          'I rebuilt the application from scratch on Next.js 16 and Tailwind CSS v4, with the entire visual system concentrated in OKLCH tokens in a single theme file. The Firestore data model was preserved, so catalog, orders and visits kept working throughout the switch.',
      },
    },
    {
      title: {
        'pt-BR': 'Provar a procedência sem intimidar quem compra',
        'en-US': 'Proving provenance without intimidating the buyer',
      },
      description: {
        'pt-BR':
          'A Gota de Cura manda seus óleos e hidrolatos para análise laboratorial, e esse é o principal diferencial frente a produtos industriais. O risco era transformar um argumento de confiança em tecnicismo — uma parede de laudos que ninguém abre.',
        'en-US':
          'Gota de Cura sends its oils and hydrolats for laboratory analysis, and that is its main differentiator against industrial products. The risk was turning an argument for trust into jargon — a wall of reports nobody opens.',
      },
      solution: {
        'pt-BR':
          'Cada laudo é publicado por planta, com nome popular e científico lado a lado e a categoria do produto, listados numa faixa da home que leva à página completa. O texto explica o que é uma cromatografia antes de mostrar qualquer resultado, e a equipe cadastra novos laudos pelo próprio painel.',
        'en-US':
          'Each report is published per plant, with common and scientific names side by side plus the product category, listed in a homepage band that leads to the full page. The copy explains what a chromatography is before showing any result, and the team registers new reports through the panel itself.',
      },
    },
    {
      title: {
        'pt-BR': 'Dar à marca um canal de conteúdo próprio',
        'en-US': 'Giving the brand a content channel of its own',
      },
      description: {
        'pt-BR':
          'A aromaterapia é um assunto cercado de promessa exagerada, e a Gota de Cura queria falar sobre o que faz sem entrar nesse registro. Faltava um espaço editorial no site — o conteúdo vivia disperso em redes sociais, sem permanência nem indexação.',
        'en-US':
          'Aromatherapy is a subject surrounded by overblown claims, and Gota de Cura wanted to talk about its work without adopting that register. The site had no editorial space — content lived scattered across social media, with no permanence and no indexing.',
      },
      solution: {
        'pt-BR':
          'Criei uma área de blog alimentada por arquivos Markdown no próprio repositório, com filtro por tag, faixa de chamada na home e dados estruturados de Blog e BlogPosting. A publicação passa pelo mesmo fluxo de revisão do código, o que dá controle editorial sem depender de um CMS.',
        'en-US':
          'I built a blog section fed by Markdown files in the repository itself, with tag filtering, a homepage band and Blog and BlogPosting structured data. Publishing goes through the same review flow as the code, which gives editorial control without depending on a CMS.',
      },
    },
    {
      title: {
        'pt-BR': 'Ser encontrado por quem procura óleo essencial em Campinas',
        'en-US': 'Being found by people searching for essential oils in Campinas',
      },
      description: {
        'pt-BR':
          'A loja física recebe visitantes que chegam pela busca, e a operação depende desse fluxo. O site anterior não declarava sua identidade de forma legível para mecanismos de busca — sem dados estruturados consistentes, sem canonical por página e com ícones improvisados.',
        'en-US':
          'The physical shop receives visitors who arrive through search, and the operation depends on that flow. The previous site did not declare its identity in a way search engines could read — no consistent structured data, no per-page canonical and improvised icons.',
      },
      solution: {
        'pt-BR':
          'Montei um grafo de dados estruturados com Organization e WebSite emitidos pelo layout e resolvidos por referência de @id, e cada página acrescentando os seus nós — Store na home, Blog, BlogPosting e BreadcrumbList onde cabem. Sitemap, robots e manifest viraram rotas geradas, e o conjunto de ícones foi refeito a partir do logo real.',
        'en-US':
          'I assembled a structured-data graph with Organization and WebSite emitted by the layout and resolved by @id reference, with each page adding its own nodes — Store on the homepage, Blog, BlogPosting and BreadcrumbList where they fit. Sitemap, robots and manifest became generated routes, and the icon set was rebuilt from the real logo.',
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
        'A Gota de Cura é uma iniciativa sem fins lucrativos de aromaterapia, com produção artesanal na Chácara da Mãe Luzia e loja física em Campinas, cujos recursos são revertidos para os trabalhos assistenciais da Morada Espírita Prof. Lairi Hans. A plataforma nasceu em 2021 para dar conta do catálogo e dos pedidos, e desde então cresceu por acréscimo: novas categorias, relatórios, cupons, controle de visitas. Cinco anos depois, a interface já não acompanhava o que o projeto tinha se tornado, e faltava ao site duas coisas que a operação passou a exigir — um canal editorial próprio e uma forma de expor publicamente os laudos que comprovam a procedência dos produtos.',
      'en-US':
        'Gota de Cura is a non-profit aromatherapy initiative, with artisanal production at Chácara da Mãe Luzia and a physical shop in Campinas, whose proceeds fund the charitable work of Morada Espírita Prof. Lairi Hans. The platform started in 2021 to handle the catalog and orders, and has grown by accretion ever since: new categories, reports, coupons, visit management. Five years on, the interface no longer matched what the project had become, and the site was missing two things the operation had come to require — an editorial channel of its own and a way to publicly expose the reports that prove the products’ provenance.',
    },
    solution: {
      'pt-BR':
        'A decisão foi reconstruir em vez de remendar. Voltei aos fundamentos do produto antes de escrever qualquer linha: quem compra valoriza origem e transparência de processo, e o site não deveria parecer farmácia industrial nem e-commerce genérico. A partir daí, defini que o topo da página deixaria de vender o catálogo para convidar à loja física, que os laudos ganhariam presença de destaque e que a marca teria onde escrever com as próprias palavras.',
      'en-US':
        'The decision was to rebuild rather than patch. I went back to the product fundamentals before writing a single line: buyers value origin and process transparency, and the site should look like neither an industrial pharmacy nor a generic e-commerce store. From there, I decided the top of the page would stop selling the catalog and start inviting people to the physical shop, that the reports would take a prominent place, and that the brand would have somewhere to write in its own words.',
    },
    process: {
      'pt-BR':
        'Reconstruí a aplicação sobre Next.js 16 com App Router, React 19 e Tailwind CSS v4, concentrando o sistema visual em tokens OKLCH declarados em um único arquivo de tema. A estratégia de cor é deliberada: o violeta da marca é tinta, preenchendo topo, faixa de laudos e rodapé, com o terracota da terra da chácara como acento. O blog roda sobre arquivos Markdown lidos do repositório, o carrinho vive no localStorage com os preços revalidados contra o Firestore a cada carregamento, e os dados estruturados foram montados como grafo, com Organization e WebSite emitidos pelo layout para que as referências por @id resolvam em qualquer página.',
      'en-US':
        'I rebuilt the application on Next.js 16 with App Router, React 19 and Tailwind CSS v4, concentrating the visual system in OKLCH tokens declared in a single theme file. The color strategy is deliberate: the brand violet is ink, filling the header, the reports band and the footer, with the terracotta of the farm’s red soil as accent. The blog runs on Markdown files read from the repository, the cart lives in localStorage with prices revalidated against Firestore on every load, and structured data was assembled as a graph, with Organization and WebSite emitted by the layout so that @id references resolve on any page.',
    },
    results: {
      'pt-BR':
        'O site atual apresenta o catálogo em dezessete prateleiras, publica os laudos de cromatografia por planta com nome científico e categoria, mantém uma área editorial com filtro por tag e organiza a visitação à chácara com datas, valores por faixa etária e inscrição. O painel da equipe segue cobrindo pedidos, produtos, visitas, cupons, laudos e relatórios, agora com o mesmo sistema visual do site público. Como projeto voluntário, a plataforma já processou mais de 1300 pedidos e continua recebendo funcionalidades novas.',
      'en-US':
        'The current site presents the catalog across seventeen shelves, publishes chromatography reports per plant with scientific name and category, keeps an editorial section with tag filtering, and organizes farm visits with dates, age-based pricing and enrollment. The team panel still covers orders, products, visits, coupons, reports and analytics, now sharing the same visual system as the public site. As a volunteer project, the platform has processed over 1300 orders and keeps receiving new features.',
    },
  },
  technicalChallenges: {
    'pt-BR': [
      'Reconstrução completa da aplicação em Next.js 16 e Tailwind CSS v4, com o sistema de cor em OKLCH declarado como tokens de tema',
      'Carrinho persistido em localStorage com revalidação de preços contra o Firestore a cada carregamento',
      'Grafo de dados estruturados com nós emitidos em camadas — layout e página — e referências por @id que resolvem em qualquer rota',
      'Blog em Markdown lido do repositório, sem CMS, com filtro por tag e metadados de indexação',
      'Sitemap, robots e web manifest como rotas geradas, e conjunto de ícones derivado do logo original',
    ],
    'en-US': [
      'Full application rebuild on Next.js 16 and Tailwind CSS v4, with the OKLCH color system declared as theme tokens',
      'Cart persisted in localStorage with prices revalidated against Firestore on every load',
      'Structured-data graph with nodes emitted in layers — layout and page — and @id references that resolve on any route',
      'Markdown blog read from the repository, with no CMS, with tag filtering and indexing metadata',
      'Sitemap, robots and web manifest as generated routes, and an icon set derived from the original logo',
    ],
  },
  nextSteps: {
    'pt-BR': [
      'Mover a busca de produto para o servidor, para que preço e estoque sejam indexáveis nas páginas de produto',
      'Implementar sistema de fidelidade para clientes recorrentes',
      'Criar módulo de gestão de estoque automatizado',
      'Integrar sistema de pagamento online (PIX, cartões)',
      'Criar sistema de avaliações e depoimentos de produtos',
      'Sistema de busca avançado no catálogo',
      'Ampliar a área editorial com uma série sobre cada planta destilada',
    ],
    'en-US': [
      'Move the product lookup to the server, so price and stock become indexable on product pages',
      'Implement a loyalty system for recurring customers',
      'Create an automated inventory management module',
      'Integrate online payments (PIX, cards)',
      'Create a product reviews and testimonials system',
      'Advanced catalog search',
      'Expand the editorial section with a series on each distilled plant',
    ],
  },
  features: [
    {
      title: {
        'pt-BR': 'Catálogo por Prateleiras',
        'en-US': 'Shelf-Based Catalog',
      },
      description: {
        'pt-BR':
          'Dezessete prateleiras de produtos — das águas florais aos sabonetes de argila — cada uma abrindo a lista completa com preço, descrição e disponibilidade em tempo real.',
        'en-US':
          'Seventeen product shelves — from floral waters to clay soaps — each opening the full list with price, description and real-time availability.',
      },
    },
    {
      title: {
        'pt-BR': 'Laudos de Cromatografia',
        'en-US': 'Chromatography Reports',
      },
      description: {
        'pt-BR':
          'Publicação integral dos laudos laboratoriais por planta, com nome popular e científico, cadastrados pela própria equipe pelo painel de gestão.',
        'en-US':
          'Full publication of laboratory reports per plant, with common and scientific names, registered by the team itself through the management panel.',
      },
    },
    {
      title: {
        'pt-BR': 'Área Editorial',
        'en-US': 'Editorial Section',
      },
      description: {
        'pt-BR':
          'Blog alimentado por arquivos Markdown no repositório, com filtro por tag, faixa de chamada na home e dados estruturados para indexação.',
        'en-US':
          'Blog fed by Markdown files in the repository, with tag filtering, a homepage band and structured data for indexing.',
      },
    },
    {
      title: {
        'pt-BR': 'Sistema de Pedidos',
        'en-US': 'Order System',
      },
      description: {
        'pt-BR':
          'Fluxo de pedido em três passos, com carrinho persistido no navegador e preços revalidados contra a base a cada carregamento.',
        'en-US':
          'Three-step order flow, with the cart persisted in the browser and prices revalidated against the database on every load.',
      },
    },
    {
      title: {
        'pt-BR': 'Painel da Equipe',
        'en-US': 'Team Panel',
      },
      description: {
        'pt-BR':
          'Gestão de pedidos, produtos, visitas, cupons, laudos e relatórios de venda, com interface pensada para quem não é técnico.',
        'en-US':
          'Management of orders, products, visits, coupons, reports and sales analytics, with an interface designed for non-technical users.',
      },
    },
    {
      title: {
        'pt-BR': 'Visitação à Chácara',
        'en-US': 'Farm Visits',
      },
      description: {
        'pt-BR':
          'Agendamento das manhãs na Chácara da Mãe Luzia, com datas abertas, valores por faixa etária e inscrição com confirmação por e-mail.',
        'en-US':
          'Scheduling for mornings at Chácara da Mãe Luzia, with open dates, age-based pricing and enrollment confirmed by email.',
      },
    },
  ],
}
