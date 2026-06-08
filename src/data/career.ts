export interface CareerEntry {
  id: string
  company: Record<string, string>
  location: Record<string, string>
  role: Record<string, string>
  startYear: number
  endYear: number | null // null = current
  description: Record<string, string>
}

export const career: CareerEntry[] = [
  {
    id: 'codurance',
    company: { 'pt-BR': 'Codurance', 'en-US': 'Codurance' },
    location: {
      'pt-BR': 'Lisboa, Portugal · Remoto',
      'en-US': 'Lisbon, Portugal · Remote',
    },
    role: {
      'pt-BR': 'Senior Software Craftsperson',
      'en-US': 'Senior Software Craftsperson',
    },
    startYear: 2025,
    endYear: null,
    description: {
      'pt-BR': 'Consultoria em craftsmanship para clientes internacionais — Clean Code, TDD e arquitetura de software.',
      'en-US': 'Consulting on software craftsmanship for international clients — Clean Code, TDD, and software architecture.',
    },
  },
  {
    id: 'avenue-code',
    company: { 'pt-BR': 'Avenue Code', 'en-US': 'Avenue Code' },
    location: {
      'pt-BR': 'Brasil / EUA · Remoto',
      'en-US': 'Brazil / USA · Remote',
    },
    role: {
      'pt-BR': 'Senior Frontend Software Engineer',
      'en-US': 'Senior Frontend Software Engineer',
    },
    startYear: 2022,
    endYear: 2025,
    description: {
      'pt-BR': 'Arquitetei e desenvolvi uma component library acessível (WCAG) para um grande e-commerce esportivo dos EUA.',
      'en-US': 'Architected and developed an accessible component library (WCAG) for a major US sports e-commerce platform.',
    },
  },
  {
    id: 'independent',
    company: { 'pt-BR': 'Consultor Independente', 'en-US': 'Independent Consultant' },
    location: {
      'pt-BR': 'Remoto',
      'en-US': 'Remote',
    },
    role: {
      'pt-BR': 'Frontend Software Engineer',
      'en-US': 'Frontend Software Engineer',
    },
    startYear: 2022,
    endYear: 2023,
    description: {
      'pt-BR': 'Entrega end-to-end de projetos web — do levantamento de requisitos ao deploy — com infraestrutura serverless.',
      'en-US': 'End-to-end delivery of web projects — from requirements to deployment — with serverless infrastructure.',
    },
  },
  {
    id: 'dextra',
    company: { 'pt-BR': 'Dextra (adquirida pela CI&T)', 'en-US': 'Dextra (acquired by CI&T)' },
    location: {
      'pt-BR': 'Campinas, Brasil',
      'en-US': 'Campinas, Brazil',
    },
    role: {
      'pt-BR': 'Tech Lead & Senior Software Engineer',
      'en-US': 'Tech Lead & Senior Software Engineer',
    },
    startYear: 2019,
    endYear: 2021,
    description: {
      'pt-BR': 'Tech Lead de equipe de 9 devs em projeto de saúde dos EUA. Reduzi um processo crítico de 8h para 10 minutos.',
      'en-US': 'Tech Lead of a 9-person team on a US healthcare project. Reduced a critical process from 8 hours to 10 minutes.',
    },
  },
  {
    id: 'venturus',
    company: { 'pt-BR': 'Venturus', 'en-US': 'Venturus' },
    location: {
      'pt-BR': 'Campinas, Brasil',
      'en-US': 'Campinas, Brazil',
    },
    role: {
      'pt-BR': 'Senior Software Engineer',
      'en-US': 'Senior Software Engineer',
    },
    startYear: 2015,
    endYear: 2019,
    description: {
      'pt-BR': 'Desenvolvimento fullstack em C#, Angular e React para clientes nacionais e internacionais. Instrutor técnico para mais de 160 pessoas.',
      'en-US': 'Fullstack development in C#, Angular, and React for national and international clients. Technical instructor for 160+ people.',
    },
  },
  {
    id: 'sedna',
    company: { 'pt-BR': 'Sedna Software', 'en-US': 'Sedna Software' },
    location: {
      'pt-BR': 'Brasil',
      'en-US': 'Brazil',
    },
    role: {
      'pt-BR': 'Software Engineer',
      'en-US': 'Software Engineer',
    },
    startYear: 2009,
    endYear: 2015,
    description: {
      'pt-BR': 'Início de carreira com desenvolvimento fullstack de sistemas corporativos em .NET. Participei da certificação MPS.br.',
      'en-US': 'Career start with fullstack development of corporate systems in .NET. Participated in MPS.br certification.',
    },
  },
]
