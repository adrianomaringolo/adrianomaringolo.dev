import { createTranslator, type Locale } from '@/lib/i18n'
import { lastModified, localeUrl } from '@/lib/seo'

export const dynamic = 'force-static'

type Item = { key: string; title: string; description: string }
type FaqItem = { key: string; question: string; answer?: string }
type Project = { title: string; kind: string; description: string; url: string }

// Built from the same locale files the page renders, so what answer engines
// read here can't drift from what visitors see.
function section(locale: Locale) {
  const { t, tList, raw } = createTranslator(locale)
  const url = localeUrl(locale)
  const pt = locale === 'pt-BR'

  const packages = (['site', 'landing', 'webapp'] as const)
    .map((key) => {
      const features = tList(`packages.${key}.features`)
        .map((f) => `  - ${f}`)
        .join('\n')
      return `- **${t(`packages.${key}.name`)}** — ${t(`packages.${key}.price`)} ${t(`packages.${key}.maintenance`)}. ${t(`packages.${key}.tagline`)}.\n${features}`
    })
    .join('\n')

  const included = (raw<Item[]>('packages.included.items') ?? [])
    .map((i) => `- ${i.title}: ${i.description}`)
    .join('\n')

  const addons = (raw<Item[]>('packages.addons.items') ?? [])
    .map((i) => `- ${i.title}: ${i.description}`)
    .join('\n')

  const steps = (raw<{ title: string; description: string }[]>('stage.steps') ?? [])
    .map((s, i) => `${i + 1}. ${s.title}: ${s.description}`)
    .join('\n')

  const reasons = raw<{ title: string; description: string }[]>('why.reasons') ?? []
  const faq = (raw<FaqItem[]>('faq.items') ?? [])
    .map((f) => {
      const answer = f.answer ?? reasons.map((r) => `${r.title}. ${r.description}`).join(' ')
      return `#### ${f.question}\n\n${answer}`
    })
    .join('\n\n')

  const projects = (raw<Project[]>('proof.items') ?? [])
    .map((p) => `- [${p.title}](${p.url}) (${p.kind}): ${p.description}`)
    .join('\n')

  return `## ${pt ? 'Versão em português' : 'English version'}: ${url}

${t('hero.headline')} ${t('hero.subline')}

### ${t('packages.headline')}

${t('packages.subline')}

${packages}

${t('packages.disclaimer')}

### ${t('packages.included.title')}

${included}

### ${t('packages.addons.title')}

${addons}

### ${t('stage.headline')}

${steps}

### ${t('proof.headline')}

${projects}

### ${t('faq.headline')}

${faq}

### ${pt ? 'Contato' : 'Contact'}

${pt ? 'Formulário e WhatsApp na seção de contato' : 'Form and WhatsApp in the contact section'}: ${url.replace(/\/$/, '')}#contato
`
}

export function GET() {
  const body = `# Adriano Maringolo · Websites

> Criação de sites institucionais, landing pages e sistemas web sob medida,
> com prazo e preço fechados, feitos diretamente por Adriano Maringolo,
> engenheiro de software sênior com mais de 15 anos de experiência, baseado
> em São Paulo, Brasil. Atende clientes no Brasil, em português e inglês.
>
> Custom business websites, landing pages and web systems with a fixed
> deadline and price, built directly by Adriano Maringolo, a senior software
> engineer with over 15 years of experience based in São Paulo, Brazil.

Portfólio / portfolio: https://adrianomaringolo.dev
Instagram: https://www.instagram.com/adrianomaringolo.dev/
Atualizado em / last updated: ${lastModified}

${section('pt-BR')}
${section('en-US')}`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
