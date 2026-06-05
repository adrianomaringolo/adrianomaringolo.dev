'use client'

import { useLocale } from '@/hooks/use-locale'
import { motion } from 'framer-motion'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

const categories = [
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Sass', 'Framer Motion', 'Astro'],
  },
  {
    label: 'Back-end',
    items: ['Node.js', 'PostgreSQL', 'MongoDB', 'GraphQL', 'Supabase', 'Firebase', 'AWS'],
  },
  {
    label: 'Ferramentas',
    items: ['Docker', 'GitHub Actions', 'Vercel', 'Figma', 'Jest', 'Cypress', 'Storybook'],
  },
  {
    label: 'IA & Automação',
    items: ['OpenAI', 'GitHub Copilot', 'n8n', 'Cursor AI', 'Kiro AI'],
  },
]

export function AboutTechnologies() {
  const { t } = useLocale()

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-border/40">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0 }}
          className="text-xs tracking-[0.2em] text-primary uppercase font-mono mb-14"
        >
          {t('about.techs')}
        </motion.p>

        <ul className="divide-y divide-border/40 border-y border-border/40">
          {categories.map((cat, i) => (
            <motion.li
              key={cat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease }}
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-[120px_1fr] md:grid-cols-[160px_1fr] gap-6 py-6 items-baseline"
            >
              <span className="text-xs font-mono text-muted-foreground/40 uppercase tracking-wide">
                {cat.label}
              </span>
              <span className="text-sm text-foreground/70 leading-relaxed">
                {cat.items.join(' · ')}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
