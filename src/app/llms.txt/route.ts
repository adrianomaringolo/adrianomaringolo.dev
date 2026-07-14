import { projects } from '@/data/projects'
import { getBlogPosts } from '@/lib/blog'

const baseUrl = 'https://adrianomaringolo.dev'

export async function GET() {
  const blogPosts = getBlogPosts()

  const projectLines = projects
    .map((p) => `- [${p.title['pt-BR']}](${baseUrl}/projects/${p.slug}): ${p.shortDescription['pt-BR']}`)
    .join('\n')

  const blogLines = blogPosts
    .map((p) => `- [${p.title['pt-BR']}](${baseUrl}/blog/${p.slug}): ${p.excerpt['pt-BR']}`)
    .join('\n')

  const body = `# Adriano Maringolo

> Engenheiro de software full-stack, atua desde 2009 e atualmente é Senior
> Frontend Engineer na Codurance. Especialista em React, Next.js e TypeScript.
> Baseado em São Paulo, Brasil. Disponível para novos projetos como freelancer.

## Páginas principais

- [Sobre](${baseUrl}/about): trajetória profissional, tecnologias e princípios de trabalho.
- [Projetos](${baseUrl}/projects): cases de web, web apps e bibliotecas open-source.
- [Blog](${baseUrl}/blog): artigos sobre React, Next.js e engenharia de software.
- [Contato](${baseUrl}/contact): serviços oferecidos (site, web app, consultoria) e formas de contato.
- [Currículo](${baseUrl}/resume): currículo completo em PDF.

## Projetos

${projectLines}

## Blog

${blogLines}
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
