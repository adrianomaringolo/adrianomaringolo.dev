export interface Testimonial {
  id: string
  quote: Record<string, string>
  name: string
  role: Record<string, string>
  company: string
}

// Replace with real testimonials from clients or colleagues.
export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: {
      'pt-BR':
        'Adriano entrega muito além do código. Ele entendeu o problema de negócio desde o primeiro dia e trouxe soluções que eu não teria imaginado. O produto ficou melhor do que esperávamos.',
      'en-US':
        'Adriano delivers far beyond code. He understood the business problem from day one and brought solutions I wouldn\'t have imagined. The product turned out better than we expected.',
    },
    name: 'Nome do Cliente',
    role: {
      'pt-BR': 'CEO',
      'en-US': 'CEO',
    },
    company: 'Nome da Empresa',
  },
  {
    id: '2',
    quote: {
      'pt-BR':
        'Trabalhar com o Adriano é trabalhar com alguém que se importa com o resultado final. Proativo, comunicativo e tecnicamente muito sólido. Recomendo sem hesitar.',
      'en-US':
        'Working with Adriano means working with someone who genuinely cares about the final outcome. Proactive, communicative, and technically very solid. I recommend him without hesitation.',
    },
    name: 'Nome do Colega',
    role: {
      'pt-BR': 'Tech Lead',
      'en-US': 'Tech Lead',
    },
    company: 'Nome da Empresa',
  },
]
