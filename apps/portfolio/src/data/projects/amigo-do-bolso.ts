import type { Project } from '@/types/project'

export const amigoDoBolso: Project = {
  id: '10',
  slug: 'amigo-do-bolso',
  title: {
    'pt-BR': 'Amigo do Bolso — Controle de Gastos em Bandeiras',
    'en-US': 'Amigo do Bolso — Spending Control in Flags',
  },
  shortDescription: {
    'pt-BR':
      'App gratuito de controle de gastos para o celular, em PWA. A renda do mês é dividida em seis categorias e cada uma hasteia uma bandeira azul, amarela ou vermelha, para ver na hora se o gasto está dentro do plano. Sem planilha.',
    'en-US':
      'Free spending-control app for phones, built as a PWA. Monthly income is split into six categories and each one raises a blue, yellow or red flag, so you see at a glance whether spending is within the plan. No spreadsheet.',
  },
  fullDescription: {
    'pt-BR':
      'O Amigo do Bolso responde à pergunta "para onde vai meu dinheiro todo mês?" com a lógica da conta de luz: cada categoria de gasto tem uma bandeira, azul, amarela ou vermelha, conforme o quanto do alvo já foi consumido. É um app instalável (PWA), mobile-first, em Next.js 15 e React 19, com Supabase para autenticação (e-mail e senha ou Google) e dados, e o método Dolfyn de seis categorias com alvos fixos de renda. Além do app logado (Início, Lançamentos, Relatórios e a série educativa Dica do Amigo), o projeto tem página de produto própria com SEO, AEO e GEO, termos de uso, política de privacidade, tutoriais com capturas de uma conta fictícia, vídeo animado de apresentação e material de divulgação.',
    'en-US':
      'Amigo do Bolso answers "where does my money go every month?" with the logic of a utility bill: each spending category has a flag, blue, yellow or red, depending on how much of its target has been used. It is an installable, mobile-first PWA built on Next.js 15 and React 19, with Supabase for authentication (email and password or Google) and data, and the Dolfyn six-category method with fixed income targets. Besides the signed-in app (Home, Entries, Reports and the Dica do Amigo educational series), the project has its own product page with SEO, AEO and GEO, terms of use, a privacy policy, tutorials with screenshots of a fictional account, an animated presentation video and promotional material.',
  },
  category: 'webapp',
  tags: {
    'pt-BR': [
      'Finanças Pessoais',
      'PWA',
      'Mobile-First',
      'Supabase',
      'Next.js',
      'Autenticação',
      'Google OAuth',
      'Relatórios',
      'Educação Financeira',
      'SEO / AEO / GEO',
      'Design System',
      'Em Andamento',
    ],
    'en-US': [
      'Personal Finance',
      'PWA',
      'Mobile-First',
      'Supabase',
      'Next.js',
      'Authentication',
      'Google OAuth',
      'Reports',
      'Financial Education',
      'SEO / AEO / GEO',
      'Design System',
      'In Progress',
    ],
  },
  technologies: [
    'Next.js 15 (App Router)',
    'React 19',
    'TypeScript',
    'Tailwind CSS 3',
    'buildgrid-ui',
    'Supabase (Auth + Postgres)',
    'TanStack Query 5',
    'React Hook Form',
    'Zod',
    'Recharts',
    'next-pwa',
    'Playwright',
    'Vercel',
  ],
  thumbnail: '/projects/amigo-do-bolso/01-hero.jpg',
  images: [
    '/projects/amigo-do-bolso/01-hero.jpg',
    '/projects/amigo-do-bolso/02-inicio.jpg',
    '/projects/amigo-do-bolso/03-lancamentos.jpg',
    '/projects/amigo-do-bolso/04-relatorios.jpg',
    '/projects/amigo-do-bolso/01-hero-mobile.png',
    '/projects/amigo-do-bolso/05-inicio-mobile.png',
    '/projects/amigo-do-bolso/06-mapa-mobile.png',
  ],
  screenshots: [
    {
      id: '1',
      url: '/projects/amigo-do-bolso/01-hero.jpg',
      alt: 'Página de produto do Amigo do Bolso com o título "Para onde vai seu dinheiro todo mês?" e, ao lado, uma conta de exemplo com as bandeiras azul e amarela por categoria',
      caption: {
        'pt-BR':
          'Página do produto em /produto — a promessa é uma pergunta que o público já se faz, e a resposta aparece ao lado como uma "conta do mês" de exemplo',
        'en-US':
          'Product page at /produto — the promise is a question the audience already asks, and the answer sits right beside it as a sample "monthly bill"',
      },
    },
    {
      id: '2',
      url: '/projects/amigo-do-bolso/02-inicio.jpg',
      alt: 'Tela Início no desktop com a bandeira do mês no vermelho, os seis medidores por categoria e as maiores despesas do mês',
      caption: {
        'pt-BR':
          'Início — a primeira resposta é "estou dentro do plano?": a bandeira do mês vem antes dos valores, e cada categoria mostra medidor, porcentagem e palavra, nunca só cor',
        'en-US':
          'Home — the first answer is "am I within the plan?": the month flag comes before the numbers, and each category shows gauge, percentage and a word, never color alone',
      },
    },
    {
      id: '3',
      url: '/projects/amigo-do-bolso/03-lancamentos.jpg',
      alt: 'Tela Lançamentos com navegador de mês, botão laranja para lançar receita ou despesa e a lista agrupada por dia com saldo',
      caption: {
        'pt-BR':
          'Lançamentos — o mês é a unidade: navegador de mês no topo, lançamentos agrupados por dia com saldo corrente e um botão grande para o loop principal',
        'en-US':
          'Entries — the month is the unit: month navigator on top, entries grouped by day with running balance and one large button for the core loop',
      },
    },
    {
      id: '4',
      url: '/projects/amigo-do-bolso/04-relatorios.jpg',
      alt: 'Tela Relatórios na aba Despesas com receitas, despesas e balanço do mês e o gasto por categoria com bandeira',
      caption: {
        'pt-BR':
          'Relatórios em três abas (Despesas, Mapa e Anual) — o resumo do mês cruza receitas, despesas e balanço, e cada categoria carrega a bandeira do período',
        'en-US':
          'Reports in three tabs (Expenses, Map and Annual) — the month summary crosses income, expenses and balance, and each category carries the period flag',
      },
    },
    {
      id: '1m',
      url: '/projects/amigo-do-bolso/01-hero-mobile.png',
      alt: 'Página de produto do Amigo do Bolso em versão mobile',
      caption: {
        'pt-BR':
          'A página do produto no celular, em coluna única, com o mesmo argumento do desktop',
        'en-US':
          'The product page on a phone, in a single column, with the same argument as desktop',
      },
    },
    {
      id: '2m',
      url: '/projects/amigo-do-bolso/05-inicio-mobile.png',
      alt: 'Tela Início do app no celular com a bandeira do mês e os medidores por categoria',
      caption: {
        'pt-BR':
          'O app no celular, o uso principal — navegação inferior com o botão "Lançar" em destaque, instalável como PWA',
        'en-US':
          'The app on a phone, the primary use — bottom navigation with a highlighted "Add" button, installable as a PWA',
      },
    },
    {
      id: '3m',
      url: '/projects/amigo-do-bolso/06-mapa-mobile.png',
      alt: 'Aba Mapa dos relatórios no celular com o consumo de cada categoria nos últimos seis meses',
      caption: {
        'pt-BR':
          'Mapa de categorias: gasto contra alvo e o consumo dos últimos seis meses, para ver tendência e não só o mês atual',
        'en-US':
          'Category map: spending against target and consumption over the last six months, to see the trend and not just the current month',
      },
    },
  ],
  liveUrl: 'https://amigodobolso.dolfyn.com.br/produto',
  featured: true,
  status: 'in-progress',
  myRole: 'freelancer',
  startDate: '2026-09-02',
  client: {
    name: { 'pt-BR': 'Dolfyn', 'en-US': 'Dolfyn' },
    industry: {
      'pt-BR': 'Comunicação e Treinamento (Educação Financeira)',
      'en-US': 'Communication and Training (Financial Education)',
    },
    size: 'startup',
  },
  challenges: [
    {
      title: {
        'pt-BR': 'Tornar o "quanto já gastei do plano" legível em um olhar',
        'en-US': 'Making "how much of the plan I have spent" readable at a glance',
      },
      description: {
        'pt-BR':
          'O público é de assalariados com pouca familiaridade com finanças, que já abandonaram planilhas. Mostrar seis categorias com valores, alvos e percentuais vira contabilidade, e o app perde o motivo de existir.',
        'en-US':
          'The audience is salaried people with little finance familiarity who have already abandoned spreadsheets. Showing six categories with amounts, targets and percentages turns into bookkeeping, and the app loses its reason to exist.',
      },
      solution: {
        'pt-BR':
          'A metáfora da conta de luz virou o sistema: cada categoria hasteia uma bandeira azul, amarela ou vermelha, e o mês inteiro tem uma bandeira própria que aparece antes dos valores. A bandeira sempre vem acompanhada de rótulo e porcentagem, então o estado nunca depende só de cor, e as cores de estado têm contraste verificado em um DESIGN.md versionado.',
        'en-US':
          'The utility-bill metaphor became the system: each category raises a blue, yellow or red flag, and the whole month has its own flag shown before the numbers. The flag always comes with a label and percentage, so state never depends on color alone, and state colors have contrast verified in a versioned DESIGN.md.',
      },
    },
    {
      title: {
        'pt-BR': 'Parcelas e lançamentos pendentes sem confundir o mês',
        'en-US': 'Installments and pending entries without muddying the month',
      },
      description: {
        'pt-BR':
          'Compras parceladas atravessam meses, e um lançamento pode estar pago ou só agendado. Editar ou excluir uma parcela costuma deixar a dúvida: vale só para esta ou para as seguintes?',
        'en-US':
          'Installment purchases span several months, and an entry can be paid or only scheduled. Editing or deleting one installment usually raises the question: does it apply to this one only or to the following ones too?',
      },
      solution: {
        'pt-BR':
          'Cada lançamento tem o estado pago ou pendente e, nas parcelas, um grupo de parcelamento ligando todas elas. Ao editar ou excluir, o usuário escolhe se a mudança vale só para aquela parcela ou também para as seguintes. As pendentes aparecem em um card próprio no Início.',
        'en-US':
          'Each entry has a paid or pending state and, for installments, an installment group linking all of them. When editing or deleting, the user picks whether the change applies to that installment only or to the following ones too. Pending entries show up in their own card on Home.',
      },
    },
    {
      title: {
        'pt-BR': 'Privacidade e exclusão de conta em um app financeiro',
        'en-US': 'Privacy and account deletion in a finance app',
      },
      description: {
        'pt-BR':
          'Dados financeiros pedem confiança. O usuário precisa poder apagar a própria conta de verdade, e os textos legais não podem prometer o que a infraestrutura não faz.',
        'en-US':
          'Financial data demands trust. Users must be able to really delete their own account, and the legal texts cannot promise what the infrastructure does not do.',
      },
      solution: {
        'pt-BR':
          'A exclusão da própria conta é uma função no banco (migration delete_own_account) acionada pelo Perfil, e a política de privacidade foi reescrita para refletir o que o app realmente faz, sem ferramenta de rastreamento e com a transferência internacional apoiada nos acordos com Supabase e Vercel. Pendências como backups e revisão jurídica ficam em um TODO versionado, priorizado por P1, P2 e P3.',
        'en-US':
          'Self-service account deletion is a database function (delete_own_account migration) triggered from Profile, and the privacy policy was rewritten to reflect what the app really does, with no tracking tool and international transfer backed by agreements with Supabase and Vercel. Pending items such as backups and legal review live in a versioned TODO, prioritized P1, P2 and P3.',
      },
    },
    {
      title: {
        'pt-BR': 'Ser achado e entendido por buscadores e por IAs',
        'en-US': 'Being found and understood by search engines and AI',
      },
      description: {
        'pt-BR':
          'Um app novo, sem histórico, depende de uma página pública que responda direto o que ele é. A área logada não pode ser indexada, e o site precisa funcionar bem em conexões móveis.',
        'en-US':
          'A new app with no track record depends on a public page that answers directly what it is. The signed-in area cannot be indexed, and the site must perform well on mobile connections.',
      },
      solution: {
        'pt-BR':
          'A página /produto tem JSON-LD (WebApplication, Organization e FAQ), perguntas frequentes com respostas diretas, sitemap, robots e um llms.txt servido por rota. O CSS é inline e a ordem de títulos foi corrigida, o que levou o Lighthouse mobile da página de 86 para 95 e a acessibilidade a 100.',
        'en-US':
          'The /produto page has JSON-LD (WebApplication, Organization and FAQ), frequently asked questions with direct answers, a sitemap, robots and an llms.txt served by a route. CSS is inlined and heading order was fixed, which took the page’s mobile Lighthouse from 86 to 95 and accessibility to 100.',
      },
    },
  ],
  metrics: [
    {
      label: {
        'pt-BR': 'Performance Mobile (Lighthouse, página do produto)',
        'en-US': 'Mobile Performance (Lighthouse, product page)',
      },
      value: { 'pt-BR': '95 / 100', 'en-US': '95 / 100' },
      improvement: {
        'pt-BR': 'de 86 antes da otimização',
        'en-US': 'up from 86 before optimization',
      },
    },
    {
      label: {
        'pt-BR': 'Acessibilidade (Lighthouse, página do produto)',
        'en-US': 'Accessibility (Lighthouse, product page)',
      },
      value: { 'pt-BR': '100 / 100', 'en-US': '100 / 100' },
    },
    {
      label: { 'pt-BR': 'Categorias do Método', 'en-US': 'Method Categories' },
      value: { 'pt-BR': '6', 'en-US': '6' },
      improvement: {
        'pt-BR': 'com alvos fixos de 55%, 10%, 5%, 10%, 10% e 10% da renda',
        'en-US': 'with fixed targets of 55%, 10%, 5%, 10%, 10% and 10% of income',
      },
    },
  ],
  story: {
    problem: {
      'pt-BR':
        'A Dolfyn, empresa de comunicação e treinamento, criou um método de organização financeira em seis categorias, cada uma com um alvo fixo em porcentagem da renda. O público é um assalariado brasileiro de renda média, com pouca familiaridade com finanças, cuja queixa é "não sei para onde vai meu dinheiro": o salário some todo mês e ele não sabe explicar por quê. Muitos já tentaram planilhas e desistiram. O método existia, mas faltava um produto que o colocasse no bolso, em linguagem leve e sem exigir noção de contabilidade.',
      'en-US':
        'Dolfyn, a communication and training company, created a financial organization method of six categories, each with a fixed target as a percentage of income. The audience is a middle-income Brazilian salaried worker with little finance familiarity whose complaint is "I don’t know where my money goes": the salary vanishes every month and they cannot say why. Many already tried spreadsheets and quit. The method existed, but there was no product to put it in their pocket, in light language and without requiring any accounting knowledge.',
    },
    solution: {
      'pt-BR':
        'A solução foi um app mobile-first em que o plano vem antes da planilha. O usuário informa a renda do mês, lança receitas e despesas atribuídas a uma das seis categorias, e o app responde com bandeiras no estilo da conta de luz: azul, amarela ou vermelha, conforme o quanto do alvo foi consumido. O mês é a unidade de tudo, e a linguagem é a de um amigo, que explica e nunca dá bronca. O nome, a paleta e a identidade partem da bandeira tarifária, com papel, linhas finas e números em fonte monoespaçada, como numa conta impressa.',
      'en-US':
        'The solution was a mobile-first app where the plan comes before the spreadsheet. Users enter the month’s income, log income and expenses assigned to one of six categories, and the app answers with utility-bill-style flags: blue, yellow or red, depending on how much of the target was consumed. The month is the unit of everything, and the language is a friend’s, one that explains and never scolds. The name, palette and identity start from the tariff flag, with paper tones, hairlines and monospaced numbers, like a printed bill.',
    },
    process: {
      'pt-BR':
        'O desenvolvimento começou em setembro de 2026, com a migration inicial da tabela de lançamentos, e o produto foi fechado em contratos escritos: PRODUCT.md, com usuários, método e princípios, e DESIGN.md, com cores, tipografia e componentes. O núcleo veio primeiro (autenticação com e-mail e Google, lançamentos, Início e Relatórios), depois etiquetas, parcelas com grupo, exclusão da própria conta e a série educativa Dica do Amigo, com áudio e transcrição. Em paralelo vieram a página de produto com SEO, AEO e GEO, termos e política de privacidade, tutoriais com capturas geradas por script contra uma conta fictícia, suíte E2E em Playwright, um vídeo animado do produto com narração e a identidade para redes sociais.',
      'en-US':
        'Development began in September 2026 with the initial entries-table migration, and the product was anchored in written contracts: PRODUCT.md, with users, method and principles, and DESIGN.md, with colors, typography and components. The core came first (authentication with email and Google, entries, Home and Reports), then tags, installments with a group, self-service account deletion and the Dica do Amigo educational series, with audio and transcript. In parallel came the product page with SEO, AEO and GEO, terms and privacy policy, tutorials with screenshots generated by script against a fictional account, a Playwright E2E suite, an animated product video with narration and the social media identity.',
    },
    results: {
      'pt-BR':
        'O Amigo do Bolso está no ar como MVP em validação com usuários reais, instalável como PWA e gratuito. A página do produto marca 95 em performance mobile e 100 em acessibilidade no Lighthouse, e o repositório tem mais de 100 commits, cinco migrations de banco, suíte E2E e material de divulgação pronto. Como ainda está em validação, não publico números de adoção nem depoimentos.',
      'en-US':
        'Amigo do Bolso is live as an MVP being validated with real users, installable as a PWA and free. The product page scores 95 in mobile performance and 100 in accessibility on Lighthouse, and the repository has over 100 commits, five database migrations, an E2E suite and promotional material ready. Since it is still being validated, I am not publishing adoption numbers or testimonials.',
    },
  },
  technicalChallenges: {
    'pt-BR': [
      'Autenticação Supabase com @supabase/ssr, login por e-mail e Google e papel do usuário lido do JWT',
      'PWA instalável com guia de instalação específico para iOS e botão de instalar no Android',
      'Lançamentos parcelados com grupo de parcelamento e edição ou exclusão da parcela atual ou das seguintes',
      'Exclusão da própria conta como função no banco, acionada pelo Perfil',
      'Relatórios com gráficos (Recharts), mapa de seis meses e comparativo anual',
      'Página pública com JSON-LD, FAQ, sitemap e llms.txt, e CSS inline para performance mobile',
      'Capturas dos tutoriais geradas por script com as chamadas ao Supabase interceptadas e uma conta fictícia',
    ],
    'en-US': [
      'Supabase authentication with @supabase/ssr, email and Google login and user role read from the JWT',
      'Installable PWA with an iOS-specific install guide and an install button on Android',
      'Installment entries with an installment group and editing or deleting the current or following installments',
      'Self-service account deletion as a database function triggered from Profile',
      'Reports with charts (Recharts), a six-month map and an annual comparison',
      'Public page with JSON-LD, FAQ, sitemap and llms.txt, and inline CSS for mobile performance',
      'Tutorial screenshots generated by script with Supabase calls intercepted and a fictional account',
    ],
  },
  skillsAcquired: {
    'pt-BR': [
      'Design de produto financeiro orientado por princípios escritos e acessibilidade verificável',
      'Supabase Auth e Postgres em um app Next.js 15 com SSR',
      'PWA instalável em Android e iOS',
      'SEO, AEO e GEO para páginas de produto',
    ],
    'en-US': [
      'Financial product design driven by written principles and verifiable accessibility',
      'Supabase Auth and Postgres in an SSR Next.js 15 app',
      'Installable PWAs on Android and iOS',
      'SEO, AEO and GEO for product pages',
    ],
  },
  nextSteps: {
    'pt-BR': [
      'Configurar SMTP próprio no Supabase para os e-mails de autenticação',
      'Ativar backups automáticos e monitoramento de erros',
      'Revisão jurídica dos termos e da política de privacidade antes de divulgar em larga escala',
      'Validar o app com usuários reais e medir retenção mês a mês',
    ],
    'en-US': [
      'Set up custom SMTP on Supabase for authentication emails',
      'Enable automatic backups and error monitoring',
      'Legal review of the terms and privacy policy before wide promotion',
      'Validate the app with real users and measure month-over-month retention',
    ],
  },
  features: [
    {
      title: { 'pt-BR': 'Bandeiras por Categoria', 'en-US': 'Flags per Category' },
      description: {
        'pt-BR':
          'Seis medidores com gasto contra alvo e uma bandeira azul, amarela ou vermelha, mais uma bandeira para o mês inteiro.',
        'en-US':
          'Six gauges with spending against target and a blue, yellow or red flag, plus one flag for the whole month.',
      },
    },
    {
      title: { 'pt-BR': 'Lançamentos do Mês', 'en-US': 'Monthly Entries' },
      description: {
        'pt-BR':
          'Receitas e despesas agrupadas por dia, com pago ou pendente, etiquetas, filtros e parcelas.',
        'en-US':
          'Income and expenses grouped by day, with paid or pending, tags, filters and installments.',
      },
    },
    {
      title: { 'pt-BR': 'Relatórios', 'en-US': 'Reports' },
      description: {
        'pt-BR':
          'Despesas do mês, mapa de categorias dos últimos seis meses e visão anual.',
        'en-US':
          'Month expenses, a category map for the last six months and an annual view.',
      },
    },
    {
      title: { 'pt-BR': 'Dica do Amigo', 'en-US': 'Dica do Amigo' },
      description: {
        'pt-BR':
          'Série educativa com artigos, áudio e transcrição, com progresso de leitura e estatísticas no Início.',
        'en-US':
          'Educational series with articles, audio and transcript, with reading progress and stats on Home.',
      },
    },
    {
      title: { 'pt-BR': 'App Instalável', 'en-US': 'Installable App' },
      description: {
        'pt-BR':
          'PWA para o celular, com guia de instalação para iOS e login por e-mail ou Google.',
        'en-US': 'Phone PWA with an iOS install guide and email or Google login.',
      },
    },
  ],
}
