# Estrutura de Projetos

Este diretório contém os dados dos projetos organizados em arquivos individuais para facilitar manutenção e alterações.

## Estrutura

```
src/data/projects/
├── index.ts                    # Arquivo principal que exporta todos os projetos
├── asm-marketing-digital.ts    # Projeto ASM Marketing Digital
├── ecommerce-platform.ts       # Plataforma de E-commerce
├── task-management-app.ts      # App de Gestão de Tarefas
├── design-system.ts           # Design System Corporativo
└── README.md                  # Este arquivo
```

## Características

### Conteúdo Multilíngue Completo

Cada projeto agora possui tags, métricas (incluindo valores localizados) e testimonials em português e inglês:

```typescript
tags: {
  'pt-BR': ['Website Institucional', 'Marketing Digital', 'Conversão'],
  'en-US': ['Corporate Website', 'Digital Marketing', 'Conversion']
}

metrics: [
  {
    label: { 'pt-BR': 'Performance', 'en-US': 'Performance' },
    value: { 'pt-BR': '95/100', 'en-US': '95/100' },
    improvement: { 'pt-BR': 'Lighthouse', 'en-US': 'Lighthouse' }
  },
  {
    label: { 'pt-BR': 'Tempo de Carregamento', 'en-US': 'Loading Time' },
    value: { 'pt-BR': '1,2s', 'en-US': '1.2s' },
    improvement: { 'pt-BR': '60% mais rápido', 'en-US': '60% faster' }
  }
]

testimonial: {
  author: 'Nome do Cliente',
  role: { 'pt-BR': 'Fundadora', 'en-US': 'Founder' },
  company: 'Nome da Empresa',
  content: {
    'pt-BR': 'Depoimento em português...',
    'en-US': 'Testimonial in English...'
  }
}
```

### Organização por Arquivo

- Cada projeto tem seu próprio arquivo
- Facilita edições e manutenção
- Permite versionamento granular
- Melhora a legibilidade do código

## Como Adicionar um Novo Projeto

1. Crie um novo arquivo `nome-do-projeto.ts`
2. Exporte o projeto seguindo a interface `Project`
3. Adicione a importação e exportação no `index.ts`
4. Inclua tags em português e inglês

## Exemplo de Estrutura

```typescript
import type { Project } from '@/types/project'

export const nomeDoProject: Project = {
  id: 'unique-id',
  slug: 'nome-do-projeto',
  title: {
    'pt-BR': 'Título em Português',
    'en-US': 'Title in English',
  },
  tags: {
    'pt-BR': ['Tag 1', 'Tag 2', 'Tag 3'],
    'en-US': ['Tag 1', 'Tag 2', 'Tag 3'],
  },
  // ... resto das propriedades
}
```

## Benefícios

- ✅ Melhor organização do código
- ✅ Facilita manutenção individual
- ✅ Tags multilíngues para melhor SEO
- ✅ Métricas multilíngues (labels, valores e melhorias)
- ✅ Testimonials multilíngues para credibilidade
- ✅ Estrutura escalável
- ✅ Separação de responsabilidades
- ✅ Suporte completo a internacionalização
- ✅ Experiência consistente em ambos idiomas
- ✅ Formatação numérica localizada (vírgula vs ponto decimal)
