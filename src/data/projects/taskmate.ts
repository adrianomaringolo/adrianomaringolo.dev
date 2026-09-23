import type { Project } from '@/types/project'

export const taskmate: Project = {
  id: '9',
  slug: 'taskmate',
  title: {
    'pt-BR': 'Taskmate — Gerenciador de Tarefas Local-First',
    'en-US': 'Taskmate — Local-First Task Manager',
  },
  shortDescription: {
    'pt-BR':
      'Produto próprio: gerenciador de tarefas pessoal com grupos, listas e atividades, captura em linguagem natural, quadro, calendário e sincronização opcional pelo Google Drive. Sem conta, sem servidor, funciona até sem internet.',
    'en-US':
      'Own product: personal task manager with groups, lists and tasks, natural-language capture, board, calendar and optional Google Drive sync. No account, no server, works even offline.',
  },
  fullDescription: {
    'pt-BR':
      'O Taskmate nasceu de uma necessidade pessoal: um gerenciador de tarefas próximo do ideal para o meu dia a dia, sem a estrutura complexa das ferramentas completas e sem mensalidade. É um app instalável (PWA) construído em React 19 e Vite, local-first: o documento vive no IndexedDB do próprio navegador em formato Automerge (CRDT) e, se o usuário quiser usar em mais de um dispositivo, sincroniza por um único arquivo no seu Google Drive. Sem tabela de usuários, sem senha, sem backend. Além do app, o projeto tem página de produto própria em /produto/, textos legais e hospedagem estática no Firebase Hosting.',
    'en-US':
      'Taskmate was born from a personal need: a task manager close to ideal for my day to day, without the complex structure of full-featured tools and without a subscription. It is an installable app (PWA) built on React 19 and Vite, local-first: the document lives in the browser’s own IndexedDB in Automerge (CRDT) format and, if the user wants to use it on more than one device, it syncs through a single file in their Google Drive. No user table, no password, no backend. Besides the app, the project has its own product page at /produto/, legal pages and static hosting on Firebase Hosting.',
  },
  category: 'webapp',
  tags: {
    'pt-BR': [
      'Produto Próprio',
      'Local-First',
      'PWA',
      'Offline',
      'CRDT',
      'Automerge',
      'Google Drive',
      'Produtividade',
      'Linguagem Natural',
      'Acessibilidade',
      'Sem Backend',
      'Em Constante Melhoria',
    ],
    'en-US': [
      'Own Product',
      'Local-First',
      'PWA',
      'Offline',
      'CRDT',
      'Automerge',
      'Google Drive',
      'Productivity',
      'Natural Language',
      'Accessibility',
      'No Backend',
      'Continuous Improvement',
    ],
  },
  technologies: [
    'React 19',
    'TypeScript',
    'Vite 6',
    'Automerge 3',
    'IndexedDB',
    'vite-plugin-pwa (Service Worker)',
    'Google Identity Services',
    'Google Drive API',
    'react-html-content-editor',
    'fractional-indexing',
    'DOMPurify',
    'Lucide',
    'Playwright',
    'Firebase Hosting',
  ],
  thumbnail: '/projects/taskmate/01-hero.jpg',
  images: [
    '/projects/taskmate/01-hero.jpg',
    '/projects/taskmate/02-captura.png',
    '/projects/taskmate/03-hoje.png',
    '/projects/taskmate/04-quadro.png',
    '/projects/taskmate/05-calendario.png',
    '/projects/taskmate/06-tema-escuro.png',
    '/projects/taskmate/07-app-mobile.png',
    '/projects/taskmate/08-hero-mobile.png',
  ],
  screenshots: [
    {
      id: '1',
      url: '/projects/taskmate/01-hero.jpg',
      alt: 'Página do produto Taskmate com o título "Suas tarefas, num lugar calmo" sobre um vídeo de fundo com luz natural',
      caption: {
        'pt-BR':
          'Página do produto em /produto/ — a promessa é calma: sem conta, sem servidor, funciona até sem internet',
        'en-US':
          'Product page at /produto/ — the promise is calm: no account, no server, works even offline',
      },
    },
    {
      id: '2',
      url: '/projects/taskmate/02-captura.png',
      alt: 'Campo de captura rápida com o texto "Revisar contrato com a Acme amanhã p1 toda sexta" e as palavras reconhecidas destacadas',
      caption: {
        'pt-BR':
          'Captura em linguagem natural — prazo, prioridade e repetição saem da própria frase, e o app destaca o que reconheceu antes de gravar',
        'en-US':
          'Natural-language capture — due date, priority and recurrence come out of the sentence itself, and the app highlights what it recognized before saving',
      },
    },
    {
      id: '3',
      url: '/projects/taskmate/03-hoje.png',
      alt: 'Visão Hoje reunindo as tarefas do dia de todos os grupos',
      caption: {
        'pt-BR':
          'A visão Hoje cruza todos os grupos — é o momento de triagem, quando o usuário quer decidir o dia sem abrir uma pasta por vez',
        'en-US':
          'The Today view cuts across all groups — the triage moment, when the user wants to decide the day without opening one folder at a time',
      },
    },
    {
      id: '4',
      url: '/projects/taskmate/04-quadro.png',
      alt: 'Quadro do grupo Cliente Acme com as listas Sprint 14 e Contrato e faturamento como colunas',
      caption: {
        'pt-BR':
          'Quadro de um grupo: cada lista vira uma coluna e cada atividade um cartão, com prazo, prioridade e atraso sempre em texto e ícone, nunca só em cor',
        'en-US':
          'Board for a group: each list becomes a column and each task a card, with due date, priority and overdue always in text and icon, never color alone',
      },
    },
    {
      id: '5',
      url: '/projects/taskmate/05-calendario.png',
      alt: 'Calendário mensal com tarefas distribuídas por dia e pontos coloridos por grupo',
      caption: {
        'pt-BR':
          'Calendário em mês, semana e dia, mostrando as tarefas de todos os grupos — a cor do grupo é só uma pista discreta de orientação',
        'en-US':
          'Calendar in month, week and day modes, showing tasks from every group — group color is just a subtle orientation cue',
      },
    },
    {
      id: '6',
      url: '/projects/taskmate/06-tema-escuro.png',
      alt: 'Quadro do Taskmate no tema escuro',
      caption: {
        'pt-BR':
          'Tema escuro com o mesmo sistema de cor em OKLCH, com contraste verificado numericamente para WCAG 2.2 AA',
        'en-US':
          'Dark theme sharing the same OKLCH color system, with contrast checked numerically against WCAG 2.2 AA',
      },
    },
    {
      id: '7',
      url: '/projects/taskmate/07-app-mobile.png',
      alt: 'Versão mobile do app Taskmate',
      caption: {
        'pt-BR':
          'O app no celular — instalável como PWA, com ações da tarefa em menu no toque e menu de compartilhamento do sistema como entrada de captura',
        'en-US':
          'The app on a phone — installable as a PWA, with task actions in a menu on touch and the system share sheet as a capture entry point',
      },
    },
    {
      id: '8',
      url: '/projects/taskmate/08-hero-mobile.png',
      alt: 'Página do produto Taskmate em versão mobile',
      caption: {
        'pt-BR':
          'A página do produto em mobile, com a mesma hierarquia do desktop reorganizada em coluna única',
        'en-US':
          'The product page on mobile, with the same hierarchy as desktop reorganized into a single column',
      },
    },
  ],
  liveUrl: 'https://get-taskmate.web.app/produto/',
  githubUrl: 'https://github.com/adrianomaringolo/taskmate',
  featured: true,
  status: 'continous-improvement',
  myRole: 'founder',
  startDate: '2026-08-17',
  client: {
    name: { 'pt-BR': 'Projeto Próprio', 'en-US': 'Own Project' },
    industry: {
      'pt-BR': 'Produtividade Pessoal',
      'en-US': 'Personal Productivity',
    },
    size: 'startup',
  },
  challenges: [
    {
      title: {
        'pt-BR': 'Sincronizar vários dispositivos sem perder uma tarefa',
        'en-US': 'Syncing several devices without losing a task',
      },
      description: {
        'pt-BR':
          'Com dados locais e sem servidor, dois dispositivos editam offline e depois precisam convergir. Um ciclo ingênuo de "baixa o arquivo, sobe o arquivo" perde dados em silêncio, e a regra do produto é nunca engolir trabalho do usuário.',
        'en-US':
          'With local data and no server, two devices edit offline and must later converge. A naive "download the file, upload the file" loop loses data silently, and the product rule is never to swallow the user’s work.',
      },
      solution: {
        'pt-BR':
          'O documento é um CRDT (Automerge) e todo dispositivo parte da mesma semente de bytes, porque documentos criados separadamente têm raízes sem parentesco e o merge descartaria um lado. A ordem usa índice fracionário, a exclusão é tombstone em vez de remoção e cada edição grava só os campos que nomeia. O ciclo lê, mescla e grava, e tem um teste com um Drive falso e hostil, sem lock e capaz de descartar um upload, com 12 cenários de convergência.',
        'en-US':
          'The document is a CRDT (Automerge) and every device starts from the same byte seed, since separately created documents have unrelated roots and the merge would drop one side. Ordering uses fractional indexing, deletion is a tombstone instead of removal and each edit writes only the fields it names. The cycle reads, merges and writes, and is covered by a test with a fake, hostile Drive, with no lock and able to drop an upload, across 12 convergence scenarios.',
      },
    },
    {
      title: {
        'pt-BR': 'Sincronizar pelo Google Drive sem ter backend',
        'en-US': 'Syncing through Google Drive with no backend',
      },
      description: {
        'pt-BR':
          'Sem servidor não há tabela de usuários, senha nem refresh token, e o Drive não tem escrita condicional. Ainda assim o usuário precisa confiar que o arquivo é dele e que o app não enxerga o resto do seu Drive.',
        'en-US':
          'Without a server there is no user table, password or refresh token, and Drive has no conditional writes. Still, the user needs to trust that the file is theirs and that the app cannot see the rest of their Drive.',
      },
      solution: {
        'pt-BR':
          'O login usa Google Identity Services com escopos não sensíveis (drive.file e userinfo.email), então o app só acessa o arquivo taskmate.automerge que ele mesmo criou, visível na raiz do Drive. A sincronização dispara ao abrir, ao voltar o foco, após uma edição com debounce e num heartbeat de 45 s, e só baixa o arquivo quando a revisão muda. Dois uploads simultâneos custam um round trip, mas nenhum dado se perde.',
        'en-US':
          'Login uses Google Identity Services with non-sensitive scopes (drive.file and userinfo.email), so the app only reaches the taskmate.automerge file it created itself, visible at the Drive root. Sync triggers on open, on tab focus, after a debounced edit and on a 45 s heartbeat, and only downloads the file when the revision changes. Two simultaneous uploads cost one round trip, but no data is lost.',
      },
    },
    {
      title: {
        'pt-BR': 'Funcionar de verdade offline',
        'en-US': 'Really working offline',
      },
      description: {
        'pt-BR':
          'O motor do Automerge é WebAssembly (1,1 MB comprimido). Um service worker que cacheia só o shell abre o app offline e depois falha ao ler o próprio documento, o que é pior do que não abrir.',
        'en-US':
          'The Automerge engine is WebAssembly (1.1 MB compressed). A service worker that only caches the shell opens the app offline and then fails to read its own document, which is worse than not opening at all.',
      },
      solution: {
        'pt-BR':
          'O service worker precacheia o shell e o WASM, com atualização por prompt (toast "Recarregar", nunca recarrega sozinho) e sem cache de runtime nas chamadas ao Drive, para o sync não raciocinar sobre estado velho. Um teste desliga a rede, recarrega e confere que as tarefas aparecem. A escrita no IndexedDB não tem debounce, depois que um teste perdeu uma nota digitada segundos antes de um reload.',
        'en-US':
          'The service worker precaches the shell and the WASM, with prompt-based updates (a "Reload" toast, never reloading by itself) and no runtime cache on Drive calls, so sync never reasons over stale state. A test turns the network off, reloads and checks that the tasks appear. IndexedDB writes are not debounced, after a test lost a note typed seconds before a reload.',
      },
    },
    {
      title: {
        'pt-BR': 'Capturar em segundos sem exigir estrutura',
        'en-US': 'Capturing in seconds without requiring structure',
      },
      description: {
        'pt-BR':
          'A hierarquia grupo, lista e atividade ajuda a triar, mas se capturar exige escolher onde guardar, a captura não acontece e o app é abandonado.',
        'en-US':
          'The group, list and task hierarchy helps triage, but if capturing requires choosing where to store, capture does not happen and the app gets abandoned.',
      },
      solution: {
        'pt-BR':
          'Uma tecla (N) abre a captura, que cai na lista Entrada por padrão. Um parser em linguagem natural extrai prazo, prioridade e repetição da própria frase e destaca no campo as palavras reconhecidas. A estrutura aparece depois, na triagem, com a visão Hoje cruzando todos os grupos.',
        'en-US':
          'A single key (N) opens capture, which lands in the Inbox list by default. A natural-language parser extracts due date, priority and recurrence from the sentence itself and highlights the recognized words in the field. Structure comes later, at triage, with the Today view cutting across all groups.',
      },
    },
  ],
  metrics: [
    {
      label: {
        'pt-BR': 'Lighthouse (página do produto)',
        'en-US': 'Lighthouse (product page)',
      },
      value: { 'pt-BR': '100 / 96 / 100 / 92', 'en-US': '100 / 96 / 100 / 92' },
      improvement: {
        'pt-BR': 'performance / acessibilidade / boas práticas / SEO',
        'en-US': 'performance / accessibility / best practices / SEO',
      },
    },
    {
      label: {
        'pt-BR': 'Cenários de Convergência de Sync',
        'en-US': 'Sync Convergence Scenarios',
      },
      value: { 'pt-BR': '12', 'en-US': '12' },
      improvement: {
        'pt-BR': 'contra um Drive falso e hostil, sem navegador',
        'en-US': 'against a fake, hostile Drive, no browser',
      },
    },
    {
      label: { 'pt-BR': 'Checagens de Contraste', 'en-US': 'Contrast Checks' },
      value: { 'pt-BR': '47', 'en-US': '47' },
      improvement: {
        'pt-BR': 'em OKLCH, para WCAG 2.2 AA',
        'en-US': 'in OKLCH, for WCAG 2.2 AA',
      },
    },
    {
      label: { 'pt-BR': 'Fluxos E2E', 'en-US': 'E2E Flows' },
      value: { 'pt-BR': '23', 'en-US': '23' },
      improvement: {
        'pt-BR': 'no navegador, mais 10 checagens offline do service worker',
        'en-US': 'in the browser, plus 10 offline service worker checks',
      },
    },
  ],
  story: {
    problem: {
      'pt-BR':
        'Criei o Taskmate para uso pessoal. O gerenciador de tarefas mais próximo do ideal para mim era o Todoist, mas ele é pago, e pensei em construir um só meu, sem estrutura complexa. As ferramentas simples achatam tudo em listas soltas e não separam contexto de frente de trabalho; as completas cobram configuração antes de qualquer valor. Eu precisava de duas coisas: tirar algo da cabeça em menos de cinco segundos, sem escolher onde guardar, e, uma ou duas vezes por dia, ver tudo cruzando grupos para decidir o que é de hoje. Misturo trabalho de cliente e vida pessoal no mesmo dia, e sucesso, para mim, é confiar que nada se perdeu.',
      'en-US':
        'I created Taskmate for personal use. The task manager closest to ideal for me was Todoist, but it is paid, so I decided to build one of my own, without a complex structure. Simple tools flatten everything into loose lists and do not separate context from workstream; full-featured ones demand configuration before delivering any value. I needed two things: to get something out of my head in under five seconds without choosing where to store it, and, once or twice a day, to see everything across groups to decide what is for today. I mix client work and personal life in the same day, and success, for me, is trusting that nothing got lost.',
    },
    solution: {
      'pt-BR':
        'A solução foi uma hierarquia de três níveis, grupos, listas e atividades, que serve à triagem e nunca é pré-requisito da captura: uma tecla abre o campo e a tarefa cai na Entrada. Do lado técnico, escolhi local-first. O documento fica no dispositivo e a sincronização é opcional, por um único arquivo no Google Drive do próprio usuário, então o app é completo sem sync, não precisa de servidor nem de conta e o usuário é dono dos seus dados. O tom é calmo e discreto: cor é estado e não enfeite, ação reversível não pede confirmação e oferece desfazer, e estado vazio ensina o próximo gesto em uma frase.',
      'en-US':
        'The solution was a three-level hierarchy, groups, lists and tasks, that serves triage and is never a prerequisite for capture: one key opens the field and the task lands in the Inbox. On the technical side, I chose local-first. The document stays on the device and sync is optional, through a single file in the user’s own Google Drive, so the app is complete without sync, needs no server or account and the user owns their data. The tone is calm and discreet: color is state, not decoration, reversible actions ask for no confirmation and offer undo, and empty states teach the next gesture in one sentence.',
    },
    process: {
      'pt-BR':
        'Comecei bem simples, no dia 17 de agosto de 2026, e fui evoluindo conforme o uso, já que uso o app no meu dia a dia para acompanhar tarefas e me planejar. Nas semanas seguintes vieram o quadro por grupo, o calendário, a linguagem natural para prazo e repetição, checklist, data de início e etiquetas no modelo de tarefa, as Notas com editor rich text (o meu react-html-content-editor), a página Insights como assistente de triagem, o compartilhamento do celular como entrada de captura e a renomeação de Trellis para Taskmate, com migração de banco, localStorage e do arquivo no Drive. O design tem contrato escrito (PRODUCT.md e DESIGN.md), o contraste é verificado numericamente por script e as decisões de sincronização nasceram dos testes, não da leitura de documentação. Em setembro o projeto ganhou página de produto, termos e privacidade, hospedados no Firebase Hosting.',
      'en-US':
        'I started very simple, on August 17, 2026, and kept evolving it with use, since I use the app in my day to day to track tasks and plan. In the following weeks came the board per group, the calendar, natural language for due dates and recurrence, checklist, start date and tags in the task model, Notes with a rich text editor (my own react-html-content-editor), the Insights page as a triage assistant, phone sharing as a capture entry point and the rename from Trellis to Taskmate, with migration of the database, localStorage and the Drive file. The design has a written contract (PRODUCT.md and DESIGN.md), contrast is verified numerically by script and the sync decisions came out of tests, not from reading documentation. In September the project gained a product page, terms and privacy pages, hosted on Firebase Hosting.',
    },
    results: {
      'pt-BR':
        'O Taskmate está no ar, é usado diariamente por mim e passou de 70 commits e da versão 0.18. Funciona sem conta, sem servidor e sem internet, e é instalável como PWA. A página do produto marca 100 em performance e boas práticas no Lighthouse, 96 em acessibilidade e 92 em SEO. O repositório é público, com 12 cenários de convergência de sync, 47 checagens de contraste, 23 fluxos E2E e 10 checagens offline. Ainda não tenho métricas de uso além do meu próprio, então não publico números de adoção.',
      'en-US':
        'Taskmate is live, used daily by me, and has passed 70 commits and version 0.18. It works with no account, no server and no internet, and is installable as a PWA. The product page scores 100 in performance and best practices on Lighthouse, 96 in accessibility and 92 in SEO. The repository is public, with 12 sync convergence scenarios, 47 contrast checks, 23 E2E flows and 10 offline checks. I have no usage metrics beyond my own yet, so I am not publishing adoption numbers.',
    },
  },
  technicalChallenges: {
    'pt-BR': [
      'Documento Automerge com semente de bytes compartilhada, índice fracionário para ordem e tombstones em vez de remoção',
      'Algoritmo de sync ler, mesclar e gravar, sem importar nada do Drive, testado contra um Drive falso e hostil',
      'OAuth no navegador com Google Identity Services e escopos não sensíveis, sem backend nem refresh token',
      'Service worker que precacheia o WebAssembly do Automerge, com teste offline automatizado',
      'Datas de calendário guardadas como YYYY-MM-DD no fuso local, nunca como instantes UTC',
      'Renomeação Trellis para Taskmate migrando IndexedDB, localStorage e o arquivo no Drive sem perder dados',
      'Sistema de cor em OKLCH com verificador de contraste e gamut rodando como teste',
    ],
    'en-US': [
      'Automerge document with a shared byte seed, fractional indexing for order and tombstones instead of removal',
      'Read, merge and write sync algorithm, importing nothing from Drive, tested against a fake, hostile Drive',
      'Browser OAuth with Google Identity Services and non-sensitive scopes, with no backend or refresh token',
      'Service worker precaching Automerge’s WebAssembly, with an automated offline test',
      'Calendar dates stored as YYYY-MM-DD in local time, never as UTC instants',
      'Trellis to Taskmate rename migrating IndexedDB, localStorage and the Drive file without data loss',
      'OKLCH color system with a contrast and gamut checker running as a test',
    ],
  },
  skillsAcquired: {
    'pt-BR': [
      'Modelagem de dados com CRDTs (Automerge) e merge sem servidor',
      'Arquitetura local-first e PWA offline de verdade',
      'Integração com Google Identity Services e Drive API sem backend',
      'Testes de convergência com dependências hostis simuladas',
      'Design de produto guiado por princípios escritos e acessibilidade verificável',
    ],
    'en-US': [
      'Data modeling with CRDTs (Automerge) and serverless merging',
      'Local-first architecture and truly offline PWAs',
      'Integrating Google Identity Services and the Drive API without a backend',
      'Convergence testing with simulated hostile dependencies',
      'Product design driven by written principles and verifiable accessibility',
    ],
  },
  nextSteps: {
    'pt-BR': [
      'Testar o renovar silencioso do token do Drive no Safari, onde cookies de terceiros podem quebrar o fluxo',
      'Reduzir o custo do primeiro acesso, hoje dominado pelo WebAssembly do Automerge',
      'Ampliar a página Insights com mais sugestões de triagem',
      'Publicar o app para outras pessoas usarem, ainda sem métricas de adoção',
    ],
    'en-US': [
      'Test silent Drive token renewal on Safari, where third-party cookies may break the flow',
      'Reduce first-visit cost, currently dominated by Automerge’s WebAssembly',
      'Expand the Insights page with more triage suggestions',
      'Open the app to other people, with no adoption metrics yet',
    ],
  },
  features: [
    {
      title: { 'pt-BR': 'Captura Rápida', 'en-US': 'Quick Capture' },
      description: {
        'pt-BR':
          'Uma tecla abre o campo, a tarefa cai na Entrada e prazo, prioridade e repetição saem da própria frase em português.',
        'en-US':
          'One key opens the field, the task lands in the Inbox and due date, priority and recurrence come out of the sentence itself in Portuguese.',
      },
    },
    {
      title: {
        'pt-BR': 'Grupos, Listas e Atividades',
        'en-US': 'Groups, Lists and Tasks',
      },
      description: {
        'pt-BR':
          'Três níveis em árvore na lateral: grupos separam contextos de vida, listas dividem as frentes e atividades são o trabalho.',
        'en-US':
          'Three levels as a tree in the sidebar: groups separate life contexts, lists split workstreams and tasks are the work.',
      },
    },
    {
      title: {
        'pt-BR': 'Hoje, Próximos 7 Dias e Calendário',
        'en-US': 'Today, Next 7 Days and Calendar',
      },
      description: {
        'pt-BR':
          'Visões que cruzam todos os grupos para a triagem diária, com calendário em mês, semana e dia e botões para adiar tarefas atrasadas.',
        'en-US':
          'Views that cut across all groups for daily triage, with a month, week and day calendar and buttons to postpone overdue tasks.',
      },
    },
    {
      title: { 'pt-BR': 'Quadro por Grupo', 'en-US': 'Board per Group' },
      description: {
        'pt-BR':
          'Cada lista de um grupo vira uma coluna e cada atividade um cartão, com largura total opcional.',
        'en-US':
          'Each list in a group becomes a column and each task a card, with optional full width.',
      },
    },
    {
      title: { 'pt-BR': 'Notas e Etiquetas', 'en-US': 'Notes and Tags' },
      description: {
        'pt-BR':
          'Captura livre com etiquetas e autocomplete, corpo em rich text e checklist nas tarefas. Do celular, o compartilhamento pergunta se é tarefa ou nota.',
        'en-US':
          'Free capture with tags and autocomplete, rich text body and checklists on tasks. From the phone, sharing asks whether it is a task or a note.',
      },
    },
    {
      title: {
        'pt-BR': 'Local-First com Sync Opcional',
        'en-US': 'Local-First with Optional Sync',
      },
      description: {
        'pt-BR':
          'Dados no navegador, funcionamento offline como PWA instalável e sincronização por um arquivo no Google Drive do usuário, com exportação em Markdown.',
        'en-US':
          'Data in the browser, offline operation as an installable PWA and sync through a file in the user’s Google Drive, with Markdown export.',
      },
    },
    {
      title: {
        'pt-BR': 'Desfazer em vez de Confirmar',
        'en-US': 'Undo Instead of Confirm',
      },
      description: {
        'pt-BR':
          'Concluir e excluir não pedem confirmação e oferecem desfazer, inclusive para listas e grupos inteiros, graças aos tombstones.',
        'en-US':
          'Completing and deleting ask for no confirmation and offer undo, even for whole lists and groups, thanks to tombstones.',
      },
    },
    {
      title: { 'pt-BR': 'Acessível por Padrão', 'en-US': 'Accessible by Default' },
      description: {
        'pt-BR':
          'Teclado completo, foco visível, movimento reduzido, modo de texto maior, temas claro e escuro, e nada comunicado só por cor.',
        'en-US':
          'Full keyboard support, visible focus, reduced motion, larger text mode, light and dark themes, and nothing communicated by color alone.',
      },
    },
    {
      title: {
        'pt-BR': 'Página de Produto com Demonstração em Scroll',
        'en-US': 'Product Page with Scroll-Driven Demo',
      },
      description: {
        'pt-BR':
          'A página /produto/ mostra o app funcionando enquanto o visitante rola: capturar, organizar, decidir o dia e ver o calendário, com opção de rolar sozinho. Dá para entender o Taskmate sem criar conta nem instalar nada.',
        'en-US':
          'The /produto/ page shows the app working as the visitor scrolls: capture, organize, decide the day and see the calendar, with an auto-scroll option. You can understand Taskmate without creating an account or installing anything.',
      },
    },
  ],
}
