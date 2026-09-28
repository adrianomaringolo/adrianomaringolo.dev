import { getBlogPosts } from '@/lib/blog'

const baseUrl = 'https://adrianomaringolo.dev'

type Locale = 'pt-BR' | 'en-US'

function resolveLocale(lang: string | null): Locale {
  return lang === 'en-US' ? 'en-US' : 'pt-BR'
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// Same `?lang=` convention the blog posts themselves use (see
// localizedBlogHref in @/lib/i18n) — a feed reader just GETs a URL, so this
// keeps the locale mechanism consistent site-wide instead of inventing a
// separate one just for the feed.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const locale = resolveLocale(searchParams.get('lang'))
  const posts = getBlogPosts()

  const channelDescription =
    locale === 'en-US'
      ? 'Articles on React, Next.js and software engineering.'
      : 'Artigos sobre React, Next.js e engenharia de software.'
  const feedUrl = locale === 'en-US' ? `${baseUrl}/feed.xml?lang=en-US` : `${baseUrl}/feed.xml`

  const items = posts
    .map((post) => {
      const title = post.title[locale] ?? post.title['pt-BR']
      const excerpt = post.excerpt[locale] ?? post.excerpt['pt-BR']
      const url =
        locale === 'en-US'
          ? `${baseUrl}/blog/${post.slug}?lang=en-US`
          : `${baseUrl}/blog/${post.slug}`
      const pubDate = new Date(post.publishedAt).toUTCString()
      const categories = post.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join('\n')

      return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <dc:creator><![CDATA[${post.author}]]></dc:creator>
${categories}
      <description><![CDATA[${excerpt}]]></description>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Adriano Maringolo — Blog</title>
    <link>${baseUrl}/blog</link>
    <description>${escapeXml(channelDescription)}</description>
    <language>${locale}</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
