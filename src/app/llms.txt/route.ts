import { projects } from '@/data/projects'
import { getBlogPosts } from '@/lib/blog'

const baseUrl = 'https://adrianomaringolo.dev'

export async function GET() {
  const blogPosts = getBlogPosts()

  const projectLinesPtBR = projects
    .map((p) => `- [${p.title['pt-BR']}](${baseUrl}/projects/${p.slug}): ${p.shortDescription['pt-BR']}`)
    .join('\n')

  // Project pages have no dedicated English URL (unlike blog posts) — same
  // link as the pt-BR entry above, English text describes the content but
  // the page itself renders in Portuguese. Said explicitly in the intro
  // below so this isn't read as a metadata/content mismatch.
  const projectLinesEnUS = projects
    .map((p) => `- [${p.title['en-US']}](${baseUrl}/projects/${p.slug}): ${p.shortDescription['en-US']}`)
    .join('\n')

  const blogLinesPtBR = blogPosts
    .map((p) => {
      const series = p.series ? ` (série: ${p.series['pt-BR']})` : ''
      return `- [${p.title['pt-BR']}](${baseUrl}/blog/${p.slug})${series}: ${p.excerpt['pt-BR']}`
    })
    .join('\n')

  const blogLinesEnUS = blogPosts
    .map((p) => {
      const series = p.series ? ` (series: ${p.series['en-US']})` : ''
      return `- [${p.title['en-US']}](${baseUrl}/blog/${p.slug}?lang=en-US)${series}: ${p.excerpt['en-US']}`
    })
    .join('\n')

  const body = `# Adriano Maringolo

> Engenheiro de software full-stack, atua desde 2009 e atualmente é Senior
> Frontend Engineer na Codurance. Especialista em React, Next.js e TypeScript.
> Baseado em São Paulo, Brasil. Disponível para novos projetos como freelancer.
>
> Full-stack software engineer since 2009, currently Senior Frontend Engineer
> at Codurance. Specialized in React, Next.js and TypeScript. Based in São
> Paulo, Brazil. Available for freelance work.

O conteúdo principal do site é em português (pt-BR). Posts do blog têm uma
URL própria em inglês via \`?lang=en-US\` (linkada abaixo); páginas de projeto e
as demais páginas não têm URL dedicada em inglês — os resumos em inglês abaixo
descrevem o conteúdo, mas o link abre a página em português.

Most site content is in Portuguese (pt-BR). Blog posts have a real English URL
via \`?lang=en-US\` (linked below); project pages and other pages don't have a
dedicated English URL — the English summaries below describe the content, but
the link opens the Portuguese page.

## Páginas principais

- [Sobre](${baseUrl}/about): trajetória profissional, tecnologias e princípios de trabalho.
- [Projetos](${baseUrl}/projects): cases de web, web apps e bibliotecas open-source.
- [Blog](${baseUrl}/blog): artigos sobre React, Next.js e engenharia de software.
- [Contato](${baseUrl}/contact): serviços oferecidos (site, web app, consultoria) e formas de contato.
- [Currículo](${baseUrl}/resume): currículo completo em PDF.
- [Feed RSS](${baseUrl}/feed.xml): feed dos posts do blog (versão em inglês: \`?lang=en-US\`).

## Main pages

- [About](${baseUrl}/about): career background, technologies and working principles.
- [Projects](${baseUrl}/projects): web, web app and open-source library case studies.
- [Blog](${baseUrl}/blog): articles on React, Next.js and software engineering.
- [Contact](${baseUrl}/contact): services offered (website, web app, consulting) and contact channels.
- [Resume](${baseUrl}/resume): full resume as PDF.
- [RSS feed](${baseUrl}/feed.xml?lang=en-US): blog posts feed (Portuguese version: without \`?lang=\`).

## Projetos

${projectLinesPtBR}

## Projects

${projectLinesEnUS}

## Blog

${blogLinesPtBR}

## Blog posts (English)

${blogLinesEnUS}
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
