import type { Project } from '@/types/project'

export const lojaDaMorada: Project = {
  id: '12',
  slug: 'loja-da-morada',
  title: {
    'pt-BR': 'Loja da Morada — Vitrine, Bazar de Natal e Catálogo Digital',
    'en-US': 'Loja da Morada — Storefront, Christmas Bazaar and Digital Catalog',
  },
  shortDescription: {
    'pt-BR':
      'Site da loja beneficente da Morada Espírita em Campinas: uma landing mobile-first que responde "o que vende, quando abre e onde fica", com galeria do Bazar, catálogo de Natal em revista com virada de página e página de divulgação das campanhas.',
    'en-US':
      'Website for the charity shop of Morada Espírita in Campinas, Brazil: a mobile-first landing page that answers "what do they sell, when are they open and where are they", with a Bazaar gallery, a page-flip Christmas catalog and a campaign sharing page.',
  },
  fullDescription: {
    'pt-BR':
      'Desenvolvimento do site da Loja da Morada, loja da Morada Espírita Professor Lairi Hans, em Campinas, cuja renda é inteiramente revertida para a manutenção da casa e para as ações assistenciais a famílias da região. O público chega quase sempre pelo Instagram, no celular, com perguntas práticas: o que a loja vende, quando abre e onde fica. O projeto entregou uma landing de uma página com identidade própria (três rosas em aquarela, tipografia serifada com uma palavra em script por título e fotografia em arco), uma galeria do Bazar organizada por categoria, um banner de campanha que sai do ar sozinho depois da data final, um catálogo do Bazar de Natal em formato de revista com virada de página e tela cheia, e uma página para baixar o vídeo da campanha e compartilhar. Todo o conteúdo que muda (horários, endereço, eventos, peças) vive em arquivos de dados, para que voluntários consigam manter o site sem mexer em componentes.',
    'en-US':
      'Development of the website for Loja da Morada, the shop of Morada Espírita Professor Lairi Hans in Campinas, Brazil, whose entire revenue goes to maintaining the house and to its assistance work with local families. Visitors almost always arrive from Instagram on their phones with practical questions: what the shop sells, when it opens and where it is. The project delivered a one-page landing with its own identity (three watercolor roses, serif typography with one script word per heading and arch-framed photography), a Bazaar gallery organized by category, a campaign banner that takes itself down after the end date, a Christmas Bazaar catalog as a page-flip magazine with fullscreen mode, and a page to download the campaign video and share it. Everything that changes (hours, address, events, pieces) lives in data files, so volunteers can maintain the site without touching components.',
  },
  category: 'web',
  tags: {
    'pt-BR': [
      'Website Institucional',
      'Loja Beneficente',
      'Terceiro Setor',
      'Artesanato',
      'Bazar de Natal',
      'Catálogo Digital',
      'Mobile First',
      'Branding',
      'Responsivo',
      'SEO',
      'Campinas',
      'Acessibilidade',
    ],
    'en-US': [
      'Institutional Website',
      'Charity Shop',
      'Nonprofit',
      'Handicrafts',
      'Christmas Bazaar',
      'Digital Catalog',
      'Mobile First',
      'Branding',
      'Responsive',
      'SEO',
      'Campinas',
      'Accessibility',
    ],
  },
  technologies: [
    'Next.js 16',
    'React 19',
    'TypeScript 5',
    'Tailwind CSS 4',
    'StPageFlip (page-flip)',
    'pnpm',
    'ESLint 9',
  ],
  thumbnail: '/projects/loja-da-morada/01-hero.jpg',
  images: [
    '/projects/loja-da-morada/01-hero.jpg',
    '/projects/loja-da-morada/01-hero-mobile.png',
    '/projects/loja-da-morada/02-missao-produtos.jpg',
    '/projects/loja-da-morada/03-sabados.jpg',
    '/projects/loja-da-morada/04-bazar.jpg',
    '/projects/loja-da-morada/05-catalogo.jpg',
    '/projects/loja-da-morada/06-divulgacao.jpg',
    '/projects/loja-da-morada/07-visite-nos.jpg',
  ],
  screenshots: [
    {
      id: '1',
      url: '/projects/loja-da-morada/01-hero.jpg',
      alt: 'Homepage da Loja da Morada com a faixa do Bazar de Natal, a frase "Peças feitas à mão. Renda que vira cuidado." e os horários de funcionamento',
      caption: {
        'pt-BR':
          'Homepage: proposta de valor, horários e ações principais visíveis sem rolar, com a faixa da campanha de Natal',
        'en-US':
          'Homepage: value proposition, opening hours and main actions visible without scrolling, with the Christmas campaign strip',
      },
    },
    {
      id: '1m',
      url: '/projects/loja-da-morada/01-hero-mobile.png',
      alt: 'Homepage mobile da Loja da Morada',
      caption: {
        'pt-BR': 'Versão mobile do hero, pensada para quem chega pelo Instagram',
        'en-US': 'Mobile hero, designed for visitors coming from Instagram',
      },
    },
    {
      id: '2',
      url: '/projects/loja-da-morada/02-missao-produtos.jpg',
      alt: 'Seção "O que você encontra" com a foto do Bazar da loja',
      caption: {
        'pt-BR': 'Seção "O que você encontra": fotos reais da loja em molduras de arco',
        'en-US': '"What you will find" section: real shop photos in arch frames',
      },
    },
    {
      id: '3',
      url: '/projects/loja-da-morada/03-sabados.jpg',
      alt: 'Seção de sábados com feira, padaria e pastéis',
      caption: {
        'pt-BR': 'Seção dos sábados, em faixa azul: feira, padaria e pastéis só neste dia',
        'en-US': 'Saturday section in a blue band: farm stand, bakery and pastries on this day only',
      },
    },
    {
      id: '4',
      url: '/projects/loja-da-morada/04-bazar.jpg',
      alt: 'Página do Bazar com a galeria de gessos e imagens sacras',
      caption: {
        'pt-BR': 'Página do Bazar: galeria por categoria, com navegação por chips',
        'en-US': 'Bazaar page: gallery by category with chip navigation',
      },
    },
    {
      id: '5',
      url: '/projects/loja-da-morada/05-catalogo.jpg',
      alt: 'Catálogo do Bazar de Natal 2026 em formato de revista com virada de página',
      caption: {
        'pt-BR': 'Catálogo do Bazar de Natal em revista digital, com 17 páginas e modo tela cheia',
        'en-US': 'Christmas Bazaar catalog as a digital magazine, 17 pages with fullscreen mode',
      },
    },
    {
      id: '6',
      url: '/projects/loja-da-morada/06-divulgacao.jpg',
      alt: 'Página de divulgação com o vídeo da abertura do Bazar de Natal',
      caption: {
        'pt-BR': 'Página de divulgação: vídeo vertical para baixar e texto pronto para compartilhar',
        'en-US': 'Sharing page: vertical video to download and ready-made text to share',
      },
    },
    {
      id: '7',
      url: '/projects/loja-da-morada/07-visite-nos.jpg',
      alt: 'Seção "Visite-nos" com endereço, horários e rota',
      caption: {
        'pt-BR': 'Seção "Visite-nos": endereço, horários e link direto para a rota',
        'en-US': '"Visit us" section: address, hours and a direct link to directions',
      },
    },
  ],
  liveUrl: 'https://loja.morada.org.br',
  status: 'continous-improvement',
  myRole: 'contributor',
  featured: false,
  startDate: '2026-10-29',
  client: {
    name: {
      'pt-BR': 'Loja da Morada (Morada Espírita Professor Lairi Hans)',
      'en-US': 'Loja da Morada (Morada Espírita Professor Lairi Hans)',
    },
    industry: {
      'pt-BR': 'Loja beneficente e Terceiro Setor',
      'en-US': 'Charity Retail & Nonprofit',
    },
    size: 'small',
  },
  challenges: [
    {
      title: {
        'pt-BR': 'Responder o essencial antes de qualquer discurso',
        'en-US': 'Answering the essentials before any storytelling',
      },
      description: {
        'pt-BR':
          'O visitante vem do Instagram, no celular, com pressa e uma pergunta prática. Ao mesmo tempo, a loja tem uma história forte (renda 100% revertida para a caridade) que não pode virar apelo emocional nem "doe agora".',
        'en-US':
          'Visitors come from Instagram, on a phone, in a hurry and with a practical question. At the same time, the shop has a strong story (100% of revenue goes to charity) that must not turn into emotional pressure or a "donate now" pitch.',
      },
      solution: {
        'pt-BR':
          'O hero entrega a proposta de valor, os horários e os dois botões principais (visitar e Instagram) sem rolar. A missão aparece logo depois, dita com simplicidade, e o texto segue a voz acolhedora da casa. Não há carrinho, checkout nem preços, porque a loja não vende online.',
        'en-US':
          'The hero delivers the value proposition, opening hours and the two main buttons (visit and Instagram) without scrolling. The mission comes right after, stated simply, and the copy follows the house\'s warm voice. There is no cart, checkout or pricing, since the shop does not sell online.',
      },
    },
    {
      title: {
        'pt-BR': 'Um site mantido por voluntários',
        'en-US': 'A site maintained by volunteers',
      },
      description: {
        'pt-BR':
          'Horários de feriado, eventos, campanhas e peças do Bazar mudam o tempo todo, e quem cuida da loja não é desenvolvedor.',
        'en-US':
          'Holiday hours, events, campaigns and Bazaar pieces change constantly, and the people who run the shop are not developers.',
      },
      solution: {
        'pt-BR':
          'Todo o conteúdo variável fica em arquivos de dados comentados (`shop.ts` para horários, endereço e eventos; `bazar.ts` para a galeria). Campanhas têm data de início e fim e saem da página sozinhas, calculadas no fuso de Brasília, e uma categoria nova do Bazar é só um novo bloco no arquivo. As fotos passam por um script de melhoria de imagem antes de entrar no site.',
        'en-US':
          'All variable content lives in commented data files (`shop.ts` for hours, address and events; `bazar.ts` for the gallery). Campaigns have start and end dates and remove themselves from the page, computed in the Brasília time zone, and a new Bazaar category is just a new block in the file. Photos go through an image enhancement script before reaching the site.',
      },
    },
    {
      title: {
        'pt-BR': 'Catálogo de Natal como revista digital',
        'en-US': 'Christmas catalog as a digital magazine',
      },
      description: {
        'pt-BR':
          'A loja já produzia o catálogo do Bazar de Natal como PDF, formato pesado e ruim de abrir no celular, e queria que o público o folheasse de verdade.',
        'en-US':
          'The shop already produced the Christmas Bazaar catalog as a PDF, a heavy format that is awkward on phones, and wanted people to actually flip through it.',
      },
      solution: {
        'pt-BR':
          'As 17 páginas foram exportadas em WebP e viram um livro com virada de página (StPageFlip, carregado só no cliente), com setas do teclado, arraste, botões grandes, contador de páginas e modo tela cheia. O PDF original continua disponível para download.',
        'en-US':
          'The 17 pages were exported as WebP and became a page-flip book (StPageFlip, loaded client-side only), with keyboard arrows, drag, large buttons, a page counter and fullscreen mode. The original PDF remains available for download.',
      },
    },
    {
      title: {
        'pt-BR': 'Acessibilidade sem perder a delicadeza',
        'en-US': 'Accessibility without losing delicacy',
      },
      description: {
        'pt-BR':
          'A paleta de pastéis e o dourado da marca têm pouco contraste, e o público inclui muita gente mais velha, frequentadora da casa.',
        'en-US':
          'The pastel palette and the brand gold have low contrast, and the audience includes many older people who attend the house.',
      },
      solution: {
        'pt-BR':
          'O dourado da marca ficou restrito a títulos grandes e ornamentos, com um tom mais escuro para texto pequeno. O corpo de texto tem pelo menos 17px, os alvos de toque têm 48px ou mais, o foco é visível, todas as fotos têm alt descritivo e o vídeo da hero respeita `prefers-reduced-motion`, com botão de pausa.',
        'en-US':
          'The brand gold is restricted to large headings and ornaments, with a darker tone for small text. Body text is at least 17px, touch targets are 48px or larger, focus is visible, every photo has descriptive alt text, and the hero video respects `prefers-reduced-motion` and has a pause button.',
      },
    },
  ],
  story: {
    problem: {
      'pt-BR':
        'A Morada Espírita Professor Lairi Hans mantém, ao lado da sede em Campinas, uma loja cuja renda sustenta a casa e as ações assistenciais a famílias da região. A loja vende artesanato do Bazar, produtos de aromaterapia da Gota de Cura e, aos sábados, feira, padaria e pastéis, mas quase toda a divulgação acontecia no Instagram. Quem queria saber se estava aberto, onde ficava ou o que havia por lá precisava garimpar posts, e as campanhas, como o Bazar de Natal, não tinham um endereço próprio para onde mandar o público.',
      'en-US':
        'Morada Espírita Professor Lairi Hans runs a shop next to its headquarters in Campinas whose revenue supports the house and its assistance work with local families. The shop sells Bazaar handicrafts, Gota de Cura aromatherapy products and, on Saturdays, a farm stand, bakery and fried pastries, but almost all communication happened on Instagram. Anyone wanting to know whether it was open, where it was or what was there had to dig through posts, and campaigns like the Christmas Bazaar had no home of their own to send people to.',
    },
    solution: {
      'pt-BR':
        'Criei uma landing de uma página, mobile-first, que responde primeiro ao que importa (o que é, quando abre, onde fica) e só depois conta a história da casa. A identidade parte das três rosas em aquarela da marca, com tipografia serifada, uma palavra em script por título, fotografia em arco e um sistema de cores por conteúdo: rosa para eventos e campanhas, azul para avisos e informação prática, creme e dourado para o institucional. Para as campanhas, adicionei páginas dedicadas: a galeria do Bazar, o catálogo de Natal em revista e uma página de divulgação.',
      'en-US':
        'I built a one-page, mobile-first landing that answers what matters first (what it is, when it opens, where it is) and only then tells the story of the house. The identity starts from the brand\'s three watercolor roses, with serif typography, one script word per heading, arch-framed photography and a color system by content: rose for events and campaigns, blue for notices and practical info, cream and gold for institutional content. For campaigns I added dedicated pages: the Bazaar gallery, the Christmas catalog as a magazine and a sharing page.',
    },
    process: {
      'pt-BR':
        'O trabalho começou por um documento de produto com público, oferta, restrições (sem venda online, sem WhatsApp próprio, sem preços) e princípios, e por um sistema de design registrado em `DESIGN.md`. A landing foi publicada em 29 de outubro de 2026 e passou a evoluir em ciclos curtos, de acordo com a agenda da loja: galeria do Bazar, campanhas com data de saída automática, faixa e abertura do Bazar de Natal, catálogo digital e página de divulgação. Em paralelo, o mesmo repositório reúne a produção de conteúdo para o Instagram da loja (posts, reels e stories) na mesma identidade visual.',
      'en-US':
        'Work began with a product document covering audience, offering, constraints (no online sales, no dedicated WhatsApp, no prices) and principles, plus a design system recorded in `DESIGN.md`. The landing went live on October 29, 2026 and has since evolved in short cycles following the shop\'s calendar: the Bazaar gallery, campaigns with automatic expiry, the Christmas Bazaar banner and opening, the digital catalog and the sharing page. In parallel, the same repository holds the content production for the shop\'s Instagram (posts, reels and stories) in the same visual identity.',
    },
    results: {
      'pt-BR':
        'A loja ganhou um endereço próprio, loja.morada.org.br, para onde o Instagram e o boca a boca apontam, com horários, localização e campanhas sempre atualizados. O Bazar de Natal ganhou catálogo para folhear no celular e uma página pronta para o público compartilhar o vídeo de abertura. Como o conteúdo vive em arquivos de dados, a manutenção do dia a dia não depende de mexer em componentes.',
      'en-US':
        'The shop now has a home of its own, loja.morada.org.br, where Instagram and word of mouth point, with hours, location and campaigns always up to date. The Christmas Bazaar gained a catalog people can flip through on their phones and a page ready for sharing the opening video. Because content lives in data files, day-to-day upkeep does not depend on touching components.',
    },
  },
  features: [
    {
      title: { 'pt-BR': 'Landing mobile-first', 'en-US': 'Mobile-first landing' },
      description: {
        'pt-BR': 'Proposta de valor, horários e ações principais visíveis sem rolar a página.',
        'en-US': 'Value proposition, hours and main actions visible without scrolling.',
      },
    },
    {
      title: { 'pt-BR': 'Galeria do Bazar', 'en-US': 'Bazaar gallery' },
      description: {
        'pt-BR':
          'Peças organizadas por categoria (gessos, budas, panos, bonecas e crochê, madeira e decoupage), com alt descritivo em todas as fotos.',
        'en-US':
          'Pieces organized by category (plaster figures, Buddhas, table linens, dolls and crochet, wood and decoupage), with descriptive alt text on every photo.',
      },
    },
    {
      title: { 'pt-BR': 'Catálogo em revista', 'en-US': 'Magazine catalog' },
      description: {
        'pt-BR':
          'Catálogo do Bazar de Natal com virada de página, teclado, arraste, tela cheia e download do PDF.',
        'en-US':
          'Christmas Bazaar catalog with page flip, keyboard, drag, fullscreen and PDF download.',
      },
    },
    {
      title: { 'pt-BR': 'Campanhas com prazo', 'en-US': 'Campaigns with expiry' },
      description: {
        'pt-BR':
          'Banner e cards de campanha que entram e saem da página sozinhos pelas datas, no fuso de Brasília.',
        'en-US':
          'Campaign banner and cards that appear and disappear by date on their own, in the Brasília time zone.',
      },
    },
    {
      title: { 'pt-BR': 'Página de divulgação', 'en-US': 'Sharing page' },
      description: {
        'pt-BR':
          'Vídeo vertical para baixar e texto pronto para compartilhar pelo WhatsApp e redes sociais.',
        'en-US':
          'Vertical video to download and ready-made text to share on WhatsApp and social networks.',
      },
    },
    {
      title: { 'pt-BR': 'Conteúdo em arquivos de dados', 'en-US': 'Content in data files' },
      description: {
        'pt-BR': 'Horários, endereço, eventos e peças editáveis em um só lugar, sem tocar em componentes.',
        'en-US': 'Hours, address, events and pieces editable in one place, without touching components.',
      },
    },
  ],
}
