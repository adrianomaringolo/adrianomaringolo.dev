'use client'

import { useTranslation } from '@/hooks/use-translation'
import type { Project } from '@/types/project'
import { Card } from 'buildgrid-ui'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import Image from 'next/image'

interface ProjectTestimonialsProps {
  testimonials: Project['testimonials']
  locale: 'pt-BR' | 'en-US'
}

export function ProjectTestimonials({ testimonials, locale }: ProjectTestimonialsProps) {
  const { t } = useTranslation()

  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              {t('projects.clientTestimonials')}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 h-full relative">
                    <Quote className="absolute top-4 right-4 w-6 h-6 text-muted-foreground/20" />

                    <div className="flex flex-col h-full">
                      {/* Rating */}
                      {testimonial.rating && (
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < testimonial.rating!
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Content */}
                      <blockquote className="text-sm italic mb-6 flex-grow leading-relaxed">
                        &ldquo;{testimonial.content[locale]}&rdquo;
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center gap-3 mt-auto">
                        {testimonial.avatar && (
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.author}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        )}
                        <div className="text-left">
                          <div className="font-semibold text-sm">
                            {testimonial.author}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {typeof testimonial.role === 'string'
                              ? testimonial.role
                              : testimonial.role[locale]}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
