'use client'

import { useLocale } from '@/hooks/use-locale'
import type { Project } from '@/types/project'
import { motion } from 'framer-motion'
import Image from 'next/image'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface ProjectTestimonialsProps {
  testimonials: Project['testimonials']
  testimonial?: Project['testimonial']
  locale: 'pt-BR' | 'en-US'
}

function TestimonialBlock({
  testimonial,
  locale,
  delay = 0,
}: {
  testimonial: NonNullable<Project['testimonial']>
  locale: 'pt-BR' | 'en-US'
  delay?: number
}) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease }}
      viewport={{ once: true, amount: 0.1 }}
      className="space-y-5"
    >
      <p className="text-lg leading-relaxed text-foreground/80 italic">
        &ldquo;{testimonial.content[locale]}&rdquo;
      </p>
      <footer className="flex items-center gap-3">
        {testimonial.avatar && (
          <Image
            src={testimonial.avatar}
            alt={testimonial.author}
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
        )}
        <div>
          <p className="text-sm font-semibold text-foreground">{testimonial.author}</p>
          <p className="text-xs text-muted-foreground/60">
            {typeof testimonial.role === 'string'
              ? testimonial.role
              : testimonial.role[locale]}
            {testimonial.company && ` · ${testimonial.company}`}
          </p>
        </div>
      </footer>
    </motion.blockquote>
  )
}

export function ProjectTestimonials({ testimonials, testimonial, locale }: ProjectTestimonialsProps) {
  const { t } = useLocale()

  const all = [
    ...(testimonial ? [testimonial] : []),
    ...(testimonials ?? []),
  ]

  if (all.length === 0) return null

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
          {t('projects.clientTestimonials')}
        </motion.p>

        {all.length === 1 ? (
          <div className="max-w-2xl">
            <TestimonialBlock testimonial={all[0]} locale={locale} />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {all.map((item, i) => (
              <TestimonialBlock key={i} testimonial={item} locale={locale} delay={i * 0.1} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
