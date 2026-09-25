import data from './testimonials.json'

export type TestimonialType = 'colleague' | 'client'

export interface Testimonial {
  id: string
  quote: Record<string, string>
  name: string
  role: Record<string, string>
  company: string
  type: TestimonialType
  avatar?: string
  linkedIn?: string
}

const colleagues: Testimonial[] = data.colleagues.map((t) => ({ ...t, type: 'colleague' as const }))
const clients: Testimonial[] = data.clients.map((t) => ({ ...t, type: 'client' as const }))

export const testimonials: Testimonial[] = [...colleagues, ...clients]
