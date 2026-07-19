'use client'

import { BlogCard } from '@/app/blog/_components/blog-card'
import { GiscusComments } from '@/app/blog/_components/giscus-comments'
import { ShareModal } from '@/app/blog/_components/share-modal'
import { ReadingProgressBar } from '@/components/reading-progress-bar'
import { useLocale } from '@/hooks/use-locale'
import { parseLocalDate } from '@/lib/formatters'
import type { BlogPost, BlogPostMetadata } from '@/types/blog'
import { motion } from 'framer-motion'
import GithubSlugger from 'github-slugger'
import { ArrowLeft, Calendar, Clock, List, User } from 'lucide-react'
import Link from 'next/link'
import { Children, useMemo, useRef, type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface BlogPostClientProps {
  post: BlogPost
  relatedPosts: BlogPostMetadata[]
}

interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

// Headings are extracted straight from the raw markdown (skipping fenced code
// blocks, since a code sample can itself contain lines starting with `#`).
// This uses its own GithubSlugger instance so the id sequence it produces
// matches the one the heading renderers below generate while walking the
// same document — sharing a single slugger between the two passes would
// double-count repeated headings and desync the ids.
function extractToc(markdown: string): TocItem[] {
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, '')
  const slugger = new GithubSlugger()
  const items: TocItem[] = []

  for (const line of withoutCode.split('\n')) {
    const h3 = /^###\s+(.+)$/.exec(line)
    const h2 = !h3 && /^##\s+(.+)$/.exec(line)
    const match = h3 ?? h2
    if (!match) continue
    const text = match[1].replace(/[`*_]/g, '').trim()
    items.push({ id: slugger.slug(text), text, level: h3 ? 3 : 2 })
  }

  return items
}

function headingText(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => (typeof child === 'string' ? child : ''))
    .join('')
}

export function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const { locale, t } = useLocale()

  const tocItems = useMemo(() => extractToc(post.content[locale]), [post.content, locale])

  // Pure lookup instead of calling a stateful slugger from inside the heading
  // renderers: React (Strict Mode in dev, but also discarded/retried renders
  // in production) can invoke a render-prop component more than once per
  // commit, and a shared GithubSlugger mutates on every `.slug()` call — a
  // second call for the same heading returns a different (suffixed) slug,
  // desyncing it from the TOC's href. Building this map from the
  // already-computed tocItems keeps heading ids idempotent no matter how
  // many times a heading renders.
  const headingIdByText = useMemo(() => {
    const map: Record<string, string> = {}
    for (const item of tocItems) map[item.text] = item.id
    return map
  }, [tocItems])

  const contentRef = useRef<HTMLDivElement>(null)

  const formatDate = (dateString: string) =>
    parseLocalDate(dateString).toLocaleDateString(locale === 'pt-BR' ? 'pt-BR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

  return (
    <div className="min-h-screen">
      <ReadingProgressBar targetRef={contentRef} />

      {/* Header */}
      <section className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {/* Back link */}
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
            >
              <ArrowLeft
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                aria-hidden
              />
              {t('blog.backToBlog')}
            </Link>

            {/* Featured marker */}
            {post.featured && (
              <p className="text-xs font-mono text-primary/60 uppercase tracking-[0.15em] mb-4">
                {locale === 'pt-BR' ? 'Post em destaque' : 'Featured post'}
              </p>
            )}

            {/* Title */}
            <h1
              className="font-bold tracking-tight text-foreground [font-family:var(--font-geist-sans)] text-wrap-balance mb-8"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
            >
              {post.title[locale]}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground/60 mb-6">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" aria-hidden />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" aria-hidden />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" aria-hidden />
                {post.readingTime} {t('blog.readingTime')}
              </span>
            </div>

            {/* Tags + Share */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              {post.tags.length > 0 && (
                <p className="text-xs text-muted-foreground/50">
                  {post.tags.map((tag) => t(`blog.tags.${tag}`)).join(' · ')}
                </p>
              )}
              <ShareModal post={post} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 px-6 md:px-12 lg:px-20 border-t border-border/40">
        <div ref={contentRef} className="max-w-3xl mx-auto pt-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="prose prose-slate dark:prose-invert max-w-none"
          >
            {(post.tldr[locale].length > 0 || post.excerpt[locale]) && (
              <div className="mb-6 rounded-lg border border-primary/20 bg-primary/5 px-6 py-5">
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-primary/70 mb-3">
                  {t('blog.tldr')}
                </p>
                {post.tldr[locale].length > 0 ? (
                  <ul className="space-y-1.5 text-sm text-foreground/80">
                    {post.tldr[locale].map((point, index) => (
                      <li key={index} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-primary/60 mt-1.5 shrink-0 text-xs">▸</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-foreground/80 leading-relaxed">{post.excerpt[locale]}</p>
                )}
              </div>
            )}

            {tocItems.length > 0 && (
              <nav className="mb-10 rounded-lg border border-border/40 bg-muted/30 px-6 py-5" aria-label={t('blog.tableOfContents')}>
                <p className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground/60 mb-3">
                  <List className="w-3.5 h-3.5" aria-hidden />
                  {t('blog.tableOfContents')}
                </p>
                <ul className="space-y-2 text-sm">
                  {tocItems.map((item) => (
                    <li key={item.id} className={item.level === 3 ? 'pl-4' : ''}>
                      <a
                        href={`#${item.id}`}
                        className="text-foreground/70 hover:text-primary transition-colors"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <ReactMarkdown
              rehypePlugins={[
                [rehypeHighlight, { ignoreMissing: true, aliases: { typescript: ['tsx'], javascript: ['jsx'] } }],
              ]}
              components={{
                // Rendered as h2, not h1: the page title above is already the
                // page's only h1 — a `# heading` in post body must not compete
                // with it for document outline / SEO purposes.
                h1: ({ children }) => (
                  <h2
                    id={headingIdByText[headingText(children)]}
                    className="scroll-mt-24 text-2xl font-bold mb-6 mt-10 text-foreground tracking-tight [font-family:var(--font-geist-sans)] first:mt-0"
                  >
                    {children}
                  </h2>
                ),
                h2: ({ children }) => (
                  <h2
                    id={headingIdByText[headingText(children)]}
                    className="scroll-mt-24 text-xl font-semibold mb-4 mt-10 text-foreground tracking-tight"
                  >
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3
                    id={headingIdByText[headingText(children)]}
                    className="scroll-mt-24 text-lg font-semibold mb-3 mt-8 text-foreground"
                  >
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-5 text-foreground/80 leading-relaxed max-w-[65ch]">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-5 space-y-2 text-foreground/80">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-5 space-y-2 text-foreground/80 list-decimal list-inside">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="flex items-start gap-2 leading-relaxed">
                    <span className="text-primary/60 mt-1.5 shrink-0 text-xs">▸</span>
                    <span>{children}</span>
                  </li>
                ),
                strong: ({ children }) => (
                  <strong className="text-foreground font-semibold">{children}</strong>
                ),
                a: ({ children, href }) => (
                  <a
                    href={href}
                    className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary transition-colors"
                  >
                    {children}
                  </a>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-primary/30 pl-5 my-6 text-muted-foreground italic">
                    {children}
                  </blockquote>
                ),
                code: ({ children, className }) => {
                  const isBlock = className?.includes('language-')
                  if (isBlock) {
                    return (
                      <code className={`hljs block text-sm font-mono leading-relaxed ${className ?? ''}`}>
                        {children}
                      </code>
                    )
                  }
                  return (
                    <code className="bg-muted/60 rounded px-1.5 py-0.5 text-sm font-mono text-foreground/90">
                      {children}
                    </code>
                  )
                },
                pre: ({ children }) => (
                  <pre className="mb-5 rounded-lg overflow-x-auto bg-[#0d1117] px-5 py-4">{children}</pre>
                ),
                img: ({ src, alt }) => (
                  <span className="block my-8 -mx-0">
                    <img
                      src={src}
                      alt={alt ?? ''}
                      className="w-full rounded-lg object-cover"
                      style={{ maxHeight: '450px' }}
                      loading="lazy"
                    />
                    {alt && (
                      <span className="block text-xs text-muted-foreground/40 text-center mt-2 italic">
                        {alt}
                      </span>
                    )}
                  </span>
                ),
              }}
            >
              {post.content[locale]}
            </ReactMarkdown>
          </motion.div>
        </div>
      </section>

      {/* Comments */}
      <section className="py-16 px-6 md:px-12 lg:px-20 border-t border-border/40">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            viewport={{ once: true, amount: 0 }}
          >
            <p className="text-xs tracking-[0.2em] text-primary uppercase font-mono mb-8">
              {t('blog.comments')}
            </p>
            <GiscusComments />
          </motion.div>
        </div>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-6 md:px-12 lg:px-20 border-t border-border/40">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              viewport={{ once: true, amount: 0 }}
            >
              <p className="text-xs tracking-[0.2em] text-primary uppercase font-mono mb-8">
                {t('blog.relatedPosts')}
              </p>
              <ul className="divide-y divide-border/40 border-y border-border/40">
                {relatedPosts.map((relatedPost, index) => (
                  <li key={relatedPost.slug}>
                    <BlogCard post={relatedPost} index={index} />
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  )
}
