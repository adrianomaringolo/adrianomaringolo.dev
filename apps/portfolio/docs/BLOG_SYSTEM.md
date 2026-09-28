# Sistema de Blog com BentoGrid (buildgrid-ui)

Este documento descreve como funciona o sistema de blog implementado no portfólio usando o BentoGrid do buildgrid-ui.

## Estrutura de Arquivos

```
src/
├── app/blog/
│   ├── _components/
│   │   ├── blog-card.tsx         # Card tradicional do post
│   │   ├── blog-bento-card.tsx   # Card otimizado para bento grid
│   │   ├── blog-stats-card.tsx   # Card de estatísticas
│   │   └── index.ts              # Exportações dos componentes
│   ├── [slug]/
│   │   ├── blog-post-client.tsx  # Componente client-side do post
│   │   └── page.tsx              # Página individual do post (server-side)
│   └── page.tsx                  # Página principal com bento grid
├── data/blog/
│   ├── vantagens-portfolio.ts    # Post sobre vantagens do portfólio
│   ├── react-performance.ts     # Post sobre performance em React
│   ├── nextjs-tips.ts           # Post sobre Next.js 15
│   ├── ai-development.ts        # Post sobre IA no desenvolvimento
│   └── index.ts                 # Funções utilitárias e exportações
└── types/
    └── blog.ts                  # Tipos TypeScript para o blog
```

## BentoGrid Layout (buildgrid-ui)

O blog usa o **BentoGrid** do buildgrid-ui, que oferece um sistema de grid flexível inspirado no design de caixas Bento japonesas.

### Características do BentoGrid:

**Layout Responsivo:**

- Mobile: 1 coluna
- Tablet: 3 colunas
- Desktop: 4 colunas
- Auto-rows: 200px de altura base

**Classes de Layout:**

- `col-span-1`: 1 coluna
- `col-span-2`: 2 colunas (wide/large)
- `row-span-1`: 1 linha (small/wide)
- `row-span-2`: 2 linhas (medium)
- `row-span-3`: 3 linhas (tall)

**Uso do BentoGrid:**

```typescript
import { BentoGrid, BentoCard } from 'buildgrid-ui'

<BentoGrid className="grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-6">
  <BentoCard className="col-span-1 row-span-2">
    <Content />
  </BentoCard>
</BentoGrid>
```

### Padrão de Layout Implementado:

**Posts em Destaque:**

- Primeiro post: `col-span-2 row-span-2` (large)
- Segundo post: `col-span-2 row-span-1` (wide)
- Demais posts: `col-span-1 row-span-2` (medium)

**Posts Regulares:**

```typescript
const patterns = [
  'col-span-1 row-span-2', // medium
  'col-span-1 row-span-1', // small
  'col-span-2 row-span-1', // wide
  'col-span-1 row-span-2', // medium
  'col-span-1 row-span-3', // tall
  'col-span-1 row-span-1', // small
]
```

### Componentes do Bento Grid:

**1. BlogBentoCard**

- Card otimizado para diferentes tamanhos do grid
- Adapta conteúdo baseado no tamanho
- Cards grandes mostram excerpt completo
- Cards pequenos são mais compactos

**2. BlogStatsCard**

- Mostra estatísticas do blog calculadas automaticamente
- Total de posts, tempo de leitura, tópicos únicos
- Animações com AnimatedCounter
- Sempre posicionado primeiro no grid (`col-span-1 row-span-2`)

**3. Posts em Destaque**

- Seção separada para posts com `featured: true`
- Layouts especiais para maior destaque visual
- Grid próprio antes dos posts regulares

## Posts Criados

### 1. "Por Que Todo Desenvolvedor Precisa de um Portfólio Profissional"

- **Slug**: `vantagens-portfolio`
- **Status**: Featured
- **Tópicos**: carreira, portfolio, desenvolvimento, dicas

### 2. "Next.js 15: Novidades e Dicas Práticas"

- **Slug**: `nextjs-tips`
- **Status**: Featured
- **Tópicos**: nextjs, javascript, web

### 3. "10 Técnicas Avançadas para Otimizar Performance em React"

- **Slug**: `react-performance`
- **Tópicos**: react, performance, otimização

### 4. "Como a IA Está Transformando o Desenvolvimento Web"

- **Slug**: `ai-development`
- **Tópicos**: ai, produtividade, ferramentas

## Como Adicionar um Novo Post

### 1. Criar o arquivo do post

```typescript
import type { BlogPost } from '@/types/blog'

export const meuNovoPost: BlogPost = {
  slug: 'meu-novo-post',
  title: {
    'pt-BR': 'Título em Português',
    'en-US': 'Title in English'
  },
  excerpt: {
    'pt-BR': 'Resumo em português...',
    'en-US': 'Excerpt in english...'
  },
  content: {
    'pt-BR': \`# Conteúdo em Markdown\`,
    'en-US': \`# Content in Markdown\`
  },
  author: 'Adriano Maringolo',
  publishedAt: '2025-01-22',
  readingTime: 5,
  tags: ['tag1', 'tag2'],
  featured: false, // true para aparecer na seção de destaque
  image: '/blog/meu-post.jpg' // opcional
}
```

### 2. Adicionar ao índice

```typescript
export const blogPosts: BlogPost[] = [
  meuNovoPost,
  vantagensPortfolio,
  // outros posts...
]
```

## Funcionalidades

- ✅ **BentoGrid do buildgrid-ui** - Layout profissional e testado
- ✅ **Layout Responsivo** - Adapta perfeitamente em todos os dispositivos
- ✅ **Posts em Destaque** - Seção especial para posts importantes
- ✅ **Estatísticas Automáticas** - Card com métricas calculadas dinamicamente
- ✅ **Posts Relacionados** - Sugestões baseadas em tags
- ✅ **Multilíngue** - Suporte completo a PT-BR e EN-US
- ✅ **SEO Otimizado** - Metadados dinâmicos e sitemap automático
- ✅ **Markdown Support** - Renderização com react-markdown
- ✅ **Animações Suaves** - Efeitos visuais com Framer Motion
- ✅ **Server/Client Components** - Arquitetura otimizada do Next.js

## Vantagens do BentoGrid (buildgrid-ui)

**Profissional:**

- Componente testado e documentado
- Mantido pela equipe do buildgrid-ui
- Atualizações e melhorias automáticas

**Flexível:**

- Sistema de grid CSS nativo
- Classes Tailwind para posicionamento
- Totalmente customizável

**Performático:**

- Otimizado para performance
- Bundle size mínimo
- CSS-in-JS eficiente

**Acessível:**

- Conformidade com padrões de acessibilidade
- Navegação por teclado
- Screen reader friendly
