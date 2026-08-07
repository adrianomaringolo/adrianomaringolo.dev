import type { Project } from '@/types/project'

export const reactHtmlContentEditor: Project = {
  id: '8',
  slug: 'react-html-content-editor',
  title: {
    'pt-BR': 'React HTML Content Editor',
    'en-US': 'React HTML Content Editor',
  },
  shortDescription: {
    'pt-BR':
      'Editor de conteúdo HTML/CSS para React com editor de código plugável, preview ao vivo, modo WYSIWYG rico integrado, auto-save e uma API de composição. Na v2.0, o Monaco virou opcional: instala e roda sem nenhuma dependência de editor.',
    'en-US':
      'React HTML/CSS content editor with a pluggable code editor, live preview, an integrated rich-text WYSIWYG mode, auto-save and a composition API. In v2.0 Monaco became optional: it installs and runs with no editor dependency at all.',
  },
  fullDescription: {
    'pt-BR':
      'React HTML Content Editor é uma biblioteca React sofisticada para edição de conteúdo HTML e CSS. Combina painéis de código para HTML e CSS com preview em tempo real, sincronização de scroll, atalhos de teclado e auto-save. A versão 1.2 introduziu uma API de composição — o editor pode ser montado a partir de partes reutilizáveis — e um modo WYSIWYG rich-text integrado, com mais de 45 controles compostáveis (negrito, títulos, listas, tabelas, imagens, cores, exportação para Markdown e muito mais). A versão 2.0 tornou o editor de código plugável: por padrão renderiza um editor próprio, sem dependências, com numeração de linhas, indentação por Tab/Shift+Tab e paletas clara e escura; o Monaco passou a viver em um entry point dedicado (`react-html-content-editor/monaco`) e é ativado por uma prop. Qualquer componente que implemente o contrato `CodeEditorProps` — CodeMirror, Ace ou uma superfície própria — entra no lugar. Publicada no npm, é tree-shakeable, com zero dependências de frameworks de UI e um arquivo llms.txt otimizado para agentes de IA.',
    'en-US':
      'React HTML Content Editor is a sophisticated React library for editing HTML and CSS content. It pairs HTML and CSS code panes with real-time preview, scroll synchronization, keyboard shortcuts and auto-save. Version 1.2 introduced a composition API — the editor can be assembled from reusable parts — and an integrated rich-text WYSIWYG mode with 45+ composable controls (bold, headings, lists, tables, images, colors, Markdown export and much more). Version 2.0 made the code editor pluggable: by default it renders a built-in, dependency-free editor with a line-number gutter, Tab/Shift+Tab indentation and light and dark palettes; Monaco moved to a dedicated entry point (`react-html-content-editor/monaco`) and is opted into with a single prop. Any component implementing the exported `CodeEditorProps` contract — CodeMirror, Ace or a custom surface — can take its place. Published on npm, it is tree-shakeable, ships zero UI-framework dependencies and includes an llms.txt reference optimized for AI coding agents.',
  },
  category: 'library',
  tags: {
    'pt-BR': [
      'Open Source',
      'Editor de Conteúdo',
      'Editor Plugável',
      'Monaco Editor',
      'WYSIWYG',
      'React 18/19',
      'TypeScript',
      'Composition API',
      'Acessibilidade',
      'npm',
    ],
    'en-US': [
      'Open Source',
      'Content Editor',
      'Pluggable Editor',
      'Monaco Editor',
      'WYSIWYG',
      'React 18/19',
      'TypeScript',
      'Composition API',
      'Accessibility',
      'npm',
    ],
  },
  technologies: [
    'React 18/19',
    'TypeScript',
    'Monaco Editor',
    'lucide-react',
    'Vite',
    'Vitest',
    'fast-check',
    'Testing Library',
    'ESLint',
    'Changesets',
    'pnpm Workspaces',
    'GitHub Actions',
    'GitHub Pages',
  ],
  thumbnail: '/projects/react-html-content-editor/cover.png',
  images: [
    '/projects/react-html-content-editor/02-wysiwyg.png',
    '/projects/react-html-content-editor/03-all-controls.png',
  ],
  liveUrl: 'https://adrianomaringolo.github.io/react-html-content-editor/',
  isDemo: true,
  githubUrl: 'https://github.com/adrianomaringolo/react-html-content-editor',
  npmUrl: 'https://www.npmjs.com/package/react-html-content-editor',
  screenshots: [
    {
      id: '1',
      url: '/projects/react-html-content-editor/01-quickstart.png',
      alt: 'Landing e Quick Start da documentação',
      caption: {
        'pt-BR': 'Site de documentação com guia de início rápido e instalação',
        'en-US': 'Documentation site with quick-start guide and installation',
      },
    },
    {
      id: '2',
      url: '/projects/react-html-content-editor/02-wysiwyg.png',
      alt: 'Editor WYSIWYG',
      caption: {
        'pt-BR': 'Editor rich-text WYSIWYG montado por composição de controles',
        'en-US': 'Rich-text WYSIWYG editor assembled from composable controls',
      },
    },
    {
      id: '3',
      url: '/projects/react-html-content-editor/03-all-controls.png',
      alt: 'Todos os controles WYSIWYG',
      caption: {
        'pt-BR':
          'Todos os 45+ controles WYSIWYG reunidos em uma única barra de ferramentas',
        'en-US': 'All 45+ WYSIWYG controls gathered in a single toolbar',
      },
    },
    {
      id: '4',
      url: '/projects/react-html-content-editor/04-composition.png',
      alt: 'Composition API',
      caption: {
        'pt-BR': 'Composition API: alternância Code/Visual editando o mesmo valor',
        'en-US': 'Composition API: Code/Visual switch editing the same value',
      },
    },
    {
      id: '5',
      url: '/projects/react-html-content-editor/05-basic-code-preview.png',
      alt: 'Editores de código HTML/CSS e preview',
      caption: {
        'pt-BR':
          'Painéis de código HTML e CSS com preview ao vivo e tela cheia — aqui com o Monaco opcional ligado',
        'en-US':
          'HTML and CSS code panes with live preview and fullscreen — shown here with the optional Monaco turned on',
      },
    },
    {
      id: '6',
      url: '/projects/react-html-content-editor/06-theme.png',
      alt: 'Temas claro e escuro',
      caption: {
        'pt-BR': 'Suporte a temas claro e escuro via variáveis CSS',
        'en-US': 'Light and dark theme support via CSS variables',
      },
    },
  ],
  status: 'continous-improvement',
  myRole: 'founder',
  featured: true,
  startDate: '2026-02-01',
  client: {
    name: { 'pt-BR': 'Projeto Open Source', 'en-US': 'Open Source Project' },
    industry: { 'pt-BR': 'Desenvolvimento de Software', 'en-US': 'Software Development' },
    size: 'small',
  },
  challenges: [
    {
      title: {
        'pt-BR': 'Duas Formas de Editar o Mesmo Conteúdo',
        'en-US': 'Two Ways to Edit the Same Content',
      },
      description: {
        'pt-BR':
          'Usuários técnicos querem editar HTML/CSS direto no código, enquanto autores de conteúdo preferem uma experiência visual. Manter as duas visões sincronizadas sobre o mesmo valor era o principal desafio.',
        'en-US':
          'Technical users want to edit HTML/CSS directly in code, while content authors prefer a visual experience. Keeping both views in sync over the same value was the main challenge.',
      },
      solution: {
        'pt-BR':
          'Uma alternância Code/Visual em que ambas as visões editam o mesmo `value.html`; o CSS do editor de código é aplicado à superfície WYSIWYG via tag `<style>`, garantindo fidelidade visual.',
        'en-US':
          'A Code/Visual switch where both views edit the same `value.html`; the code editor CSS is applied to the WYSIWYG surface via a `<style>` tag, ensuring visual fidelity.',
      },
    },
    {
      title: {
        'pt-BR': 'Flexibilidade sem Quebrar Compatibilidade',
        'en-US': 'Flexibility Without Breaking Compatibility',
      },
      description: {
        'pt-BR':
          'Adicionar composição e WYSIWYG a uma biblioteca já publicada exigia não quebrar quem já usava o layout padrão “baterias incluídas”.',
        'en-US':
          'Adding composition and WYSIWYG to an already-published library required not breaking users of the batteries-included default layout.',
      },
      solution: {
        'pt-BR':
          'API de composição opt-in: passar `children` ativa o modo composto; sem `children`, o layout padrão renderiza exatamente como antes — totalmente retrocompatível e versionado com Changesets.',
        'en-US':
          'Opt-in composition API: passing `children` enables composed mode; without children the default layout renders exactly as before — fully backwards compatible and versioned with Changesets.',
      },
    },
    {
      title: {
        'pt-BR': 'Monaco Pesado Demais para Ser Obrigatório',
        'en-US': 'Monaco Too Heavy to Be Mandatory',
      },
      description: {
        'pt-BR':
          'O Monaco entrega uma experiência excelente, mas carrega megabytes de assets e um web worker. Para quem só precisa de um campo de HTML em um formulário, era um custo alto demais para uma dependência obrigatória.',
        'en-US':
          'Monaco delivers an excellent experience, but it ships megabytes of assets and a web worker. For anyone who just needs an HTML field inside a form, that was too high a price for a mandatory dependency.',
      },
      solution: {
        'pt-BR':
          'Na v2.0 o painel de código virou plugável por trás de um contrato `CodeEditorProps`/`CodeEditorHandle`. O padrão é um `TextareaCodeEditor` próprio, sem dependências; o Monaco virou peer dependency opcional em um entry point separado, ativado com `codeEditor={MonacoCodeEditor}` — e nada além dele importa Monaco, então quem não usa nem resolve os pacotes.',
        'en-US':
          'In v2.0 the code pane became pluggable behind a `CodeEditorProps`/`CodeEditorHandle` contract. The default is a built-in, dependency-free `TextareaCodeEditor`; Monaco became an optional peer dependency in a separate entry point, enabled with `codeEditor={MonacoCodeEditor}` — and nothing else imports Monaco, so projects that skip it never resolve those packages.',
      },
    },
  ],
  metrics: [
    {
      label: { 'pt-BR': 'Controles WYSIWYG', 'en-US': 'WYSIWYG Controls' },
      value: { 'pt-BR': '45+', 'en-US': '45+' },
      improvement: {
        'pt-BR': 'componentes compostáveis',
        'en-US': 'composable components',
      },
    },
    {
      label: {
        'pt-BR': 'Dependências de Editor',
        'en-US': 'Editor Dependencies',
      },
      value: { 'pt-BR': '0', 'en-US': '0' },
      improvement: {
        'pt-BR': 'Monaco agora é opcional',
        'en-US': 'Monaco is now optional',
      },
    },
    {
      label: { 'pt-BR': 'Testes', 'en-US': 'Tests' },
      value: { 'pt-BR': '280', 'en-US': '280' },
      improvement: { 'pt-BR': 'testes passando', 'en-US': 'passing tests' },
    },
  ],
  story: {
    problem: {
      'pt-BR':
        'Aplicações React frequentemente precisam de um campo de edição de HTML/CSS que seja poderoso para desenvolvedores e amigável para autores de conteúdo. Soluções prontas normalmente forçam uma única abordagem — só código ou só WYSIWYG — e ainda arrastam dependências pesadas: um editor completo como o Monaco custa megabytes de assets mesmo quando tudo o que se precisa é um campo de HTML dentro de um formulário.',
      'en-US':
        'React applications often need an HTML/CSS editing field that is powerful for developers and friendly for content authors. Off-the-shelf solutions usually force a single approach — code-only or WYSIWYG-only — and drag in heavy dependencies: a full editor like Monaco costs megabytes of assets even when all you need is an HTML field inside a form.',
    },
    solution: {
      'pt-BR':
        'Desenvolvi o React HTML Content Editor com edição de código e preview ao vivo mais um modo WYSIWYG rico integrado, ambos editando o mesmo valor. A API de composição permite montar exatamente o editor necessário, incluindo apenas os controles desejados. Na v2.0, o painel de código virou plugável: instala e funciona sem nenhuma dependência de editor, e quem quiser syntax highlighting e formatação liga o Monaco com uma prop.',
      'en-US':
        'I built React HTML Content Editor with code editing plus live preview and an integrated rich-text WYSIWYG mode, both editing the same value. The composition API lets you assemble exactly the editor you need, including only the controls you want. In v2.0 the code pane became pluggable: it installs and works with no editor dependency at all, and anyone who wants syntax highlighting and formatting turns Monaco on with a single prop.',
    },
    process: {
      'pt-BR':
        'O projeto começou como um editor de código HTML/CSS “baterias incluídas” (v1.1) e evoluiu para uma arquitetura compostável (v1.2): partes do ContentEditor (Toolbar, Body, Code, Preview, Wysiwyg) e um editor Wysiwyg autônomo, que chegou a mais de 45 controles ao longo da v1.3. A v2.0 fechou o ciclo separando o editor de código do resto: um contrato `CodeEditorProps`/`CodeEditorHandle` agnóstico de implementação, um `TextareaCodeEditor` próprio como padrão e o Monaco isolado em `react-html-content-editor/monaco`. Implementei testes com Vitest e fast-check (280 passando), CI/CD com GitHub Actions, versionamento com Changesets, documentação com demo em GitHub Pages e um llms.txt para agentes de IA.',
      'en-US':
        'The project started as a batteries-included HTML/CSS code editor (v1.1) and evolved into a composable architecture (v1.2): ContentEditor parts (Toolbar, Body, Code, Preview, Wysiwyg) and a standalone Wysiwyg editor, which reached 45+ controls through v1.3. Version 2.0 closed the loop by separating the code editor from everything else: an implementation-agnostic `CodeEditorProps`/`CodeEditorHandle` contract, a built-in `TextareaCodeEditor` as the default, and Monaco isolated in `react-html-content-editor/monaco`. I implemented testing with Vitest and fast-check (280 passing), CI/CD with GitHub Actions, versioning with Changesets, documentation with a GitHub Pages demo and an llms.txt for AI agents.',
    },
    results: {
      'pt-BR':
        'A biblioteca está publicada no npm (v2.0.0) com demo pública e documentação. Entrega uma solução prática e leve para edição de conteúdo em React, com dupla experiência (código e visual), editor de código plugável, acessibilidade, temas e uma API compostável extensível. A v2.0 é a única major até aqui — a mudança de dependências veio documentada com caminho de migração em uma linha para quem quiser manter o Monaco.',
      'en-US':
        'The library is published on npm (v2.0.0) with a public demo and documentation. It delivers a practical, lightweight solution for content editing in React, with a dual experience (code and visual), a pluggable code editor, accessibility, theming and an extensible composable API. Version 2.0 is the only major so far — the dependency change shipped with a documented, one-line migration path for anyone who wants to keep Monaco.',
    },
  },
  features: [
    {
      title: { 'pt-BR': 'Editor de Código Plugável', 'en-US': 'Pluggable Code Editor' },
      description: {
        'pt-BR':
          'Painéis de HTML e CSS servidos por um editor próprio sem dependências — ou pelo Monaco, CodeMirror, Ace ou uma superfície sua, via contrato `CodeEditorProps`.',
        'en-US':
          'HTML and CSS panes served by a built-in, dependency-free editor — or by Monaco, CodeMirror, Ace or your own surface, through the `CodeEditorProps` contract.',
      },
      icon: '🔌',
    },
    {
      title: { 'pt-BR': 'Monaco Opcional', 'en-US': 'Optional Monaco' },
      description: {
        'pt-BR':
          'Uma prop liga o mesmo editor do VS Code, com syntax highlighting e formatação. Fica em entry point separado: quem não usa, não baixa.',
        'en-US':
          'One prop turns on the same editor that powers VS Code, with syntax highlighting and formatting. It lives in a separate entry point: skip it and you never download it.',
      },
      icon: '🖥️',
    },
    {
      title: { 'pt-BR': 'WYSIWYG Integrado', 'en-US': 'Integrated WYSIWYG' },
      description: {
        'pt-BR':
          'Alterne entre código e um editor visual rich-text — ambos editam o mesmo valor e o CSS é aplicado à superfície.',
        'en-US':
          'Toggle between code and a rich-text visual editor — both edit the same value and the CSS is applied to the surface.',
      },
      icon: '🎨',
    },
    {
      title: { 'pt-BR': 'API de Composição', 'en-US': 'Composition API' },
      description: {
        'pt-BR':
          'Monte o editor a partir de partes (Toolbar, Body, Code, Preview, Wysiwyg) ou use o layout padrão pronto.',
        'en-US':
          'Assemble the editor from parts (Toolbar, Body, Code, Preview, Wysiwyg) or use the ready-made default layout.',
      },
      icon: '🧩',
    },
    {
      title: { 'pt-BR': '45+ Controles WYSIWYG', 'en-US': '45+ WYSIWYG Controls' },
      description: {
        'pt-BR':
          'Negrito, títulos, listas, tabelas, callouts, imagens, cores, emoji, find/replace, print e exportação para Markdown.',
        'en-US':
          'Bold, headings, lists, tables, callouts, images, colors, emoji, find/replace, print and Markdown export.',
      },
      icon: '🧰',
    },
    {
      title: { 'pt-BR': 'Preview ao Vivo', 'en-US': 'Live Preview' },
      description: {
        'pt-BR':
          'Renderização em tempo real de HTML+CSS com sincronização de scroll e modos edit/preview/split.',
        'en-US':
          'Real-time HTML+CSS rendering with scroll synchronization and edit/preview/split modes.',
      },
      icon: '👁️',
    },
    {
      title: { 'pt-BR': 'Auto-Save e Atalhos', 'en-US': 'Auto-Save & Shortcuts' },
      description: {
        'pt-BR':
          'Detecção de mudanças com indicadores de status e atalhos (Ctrl/⌘+S salvar, +Shift+F formatar, +Shift+M tela cheia).',
        'en-US':
          'Change detection with status indicators and shortcuts (Ctrl/⌘+S save, +Shift+F format, +Shift+M fullscreen).',
      },
      icon: '⚡',
    },
    {
      title: { 'pt-BR': 'TypeScript First', 'en-US': 'TypeScript First' },
      description: {
        'pt-BR':
          'Tipagem completa com definições exportadas para todos os componentes, props e hooks.',
        'en-US':
          'Complete typing with exported definitions for all components, props and hooks.',
      },
      icon: '📝',
    },
    {
      title: {
        'pt-BR': 'Leve e sem Dependências de UI',
        'en-US': 'Lightweight, Zero UI Deps',
      },
      description: {
        'pt-BR':
          'Tree-shakeable, funciona com qualquer projeto React sem Tailwind, bibliotecas de UI ou dependência de editor.',
        'en-US':
          'Tree-shakeable, works with any React project without Tailwind, UI libraries or an editor dependency.',
      },
      icon: '🪶',
    },
  ],
  nextSteps: {
    'pt-BR': [
      'Publicar adaptadores prontos para CodeMirror e outros editores',
      'Adicionar syntax highlighting leve ao editor padrão, sem trazer o Monaco',
      'Expandir os controles WYSIWYG com base em feedback de uso',
      'Melhorar sanitização e segurança do HTML editado',
      'Adicionar mais formatos de exportação além de Markdown',
      'Ampliar customização de temas e tokens de estilo',
      'Fortalecer documentação interativa e exemplos avançados',
    ],
    'en-US': [
      'Ship ready-made adapters for CodeMirror and other editors',
      'Add lightweight syntax highlighting to the default editor without pulling in Monaco',
      'Expand WYSIWYG controls based on usage feedback',
      'Improve sanitization and security of edited HTML',
      'Add more export formats beyond Markdown',
      'Broaden theme and style-token customization',
      'Strengthen interactive documentation and advanced examples',
    ],
  },
  technicalChallenges: {
    'pt-BR': [
      'Sincronizar visão de código e WYSIWYG sobre um único valor',
      'Design de uma API de composição opt-in e retrocompatível',
      'Abstrair o editor de código atrás de um handle agnóstico de implementação',
      'Escrever um editor de código do zero: gutter alinhado sob soft wrap, Tab/Shift+Tab e Enter preservando indentação',
      'Isolar o Monaco em um entry point que nenhum outro módulo importa',
      'Construção de controles WYSIWYG compostáveis sobre execCommand',
      'Redimensionamento de imagens ancorado via portal no DOM',
      'CI/CD e versionamento semântico automatizado com Changesets',
      'Acessibilidade (ARIA, teclado, leitores de tela) em todos os controles',
    ],
    'en-US': [
      'Synchronizing code and WYSIWYG views over a single value',
      'Designing an opt-in, backwards-compatible composition API',
      'Abstracting the code editor behind an implementation-agnostic handle',
      'Writing a code editor from scratch: a gutter that stays aligned under soft wrapping, Tab/Shift+Tab and indentation-preserving Enter',
      'Isolating Monaco in an entry point no other module imports',
      'Building composable WYSIWYG controls on top of execCommand',
      'Portal-anchored image resizing in the DOM',
      'Automated CI/CD and semantic versioning with Changesets',
      'Accessibility (ARIA, keyboard, screen readers) across all controls',
    ],
  },
  skillsAcquired: {
    'pt-BR': [
      'Integração avançada do Monaco Editor em React',
      'Design de APIs de composição (compound components)',
      'Design de pontos de extensão: contratos que aceitam implementações de terceiros',
      'Estratégia de entry points e peer dependencies opcionais no package.json',
      'Condução de uma major release com breaking changes e guia de migração',
      'Desenvolvimento e publicação de bibliotecas no npm',
      'Testes baseados em propriedades com fast-check',
      'Gestão de releases com Changesets e GitHub Actions',
      'Documentação otimizada para agentes de IA (llms.txt)',
    ],
    'en-US': [
      'Advanced Monaco Editor integration in React',
      'Composition API design (compound components)',
      'Extension-point design: contracts that accept third-party implementations',
      'Entry-point strategy and optional peer dependencies in package.json',
      'Running a major release with breaking changes and a migration guide',
      'Developing and publishing npm libraries',
      'Property-based testing with fast-check',
      'Release management with Changesets and GitHub Actions',
      'AI-agent-optimized documentation (llms.txt)',
    ],
  },
}
