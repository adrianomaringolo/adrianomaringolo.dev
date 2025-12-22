'use client'

import { useTranslation } from '@/hooks/use-translation'
import type { Project } from '@/types/project'
import { Card } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import Image from 'next/image'

interface ProjectTestimonialProps {
  testimonial: Project['testimonial']
  locale: 'pt-BR' | 'en-US'
}

export function ProjectTestimonial({ testimonial, locale }: ProjectTestimonialProps) {
  const { t } = useTranslation()

  if (!testimonial) return null

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              {t('projects.clientTestimonial')}
            </h2>

            <Card className="p-8 relative">
              <Quote className="absolute top-4 left-4 w-8 h-8 text-muted-foreground/20" />

              <div className="text-center">
                {testimonial.rating && (
                  <div className="flex justify-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating!
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}

                <blockquote className="text-lg italic mb-6">
                  &ldquo;{testimonial.content[locale]}&rdquo;
                </blockquote>

                <div className="flex items-center justify-center gap-4">
                  {testimonial.avatar && (
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  )}
                  <div className="text-left">
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {typeof testimonial.role === 'string'
                        ? testimonial.role
                        : testimonial.role[locale]}{' '}
                      • {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
