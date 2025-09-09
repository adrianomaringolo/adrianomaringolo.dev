export const defaultLocale = "pt-BR"
export const locales = ["pt-BR", "en-US"] as const

export type Locale = (typeof locales)[number]

export const translations = {
  "pt-BR": {
    nav: {
      home: "Início",
      about: "Sobre",
      projects: "Projetos",
      blog: "Blog",
      contact: "Contato",
    },
    hero: {
      greeting: "Olá, eu sou",
      title: "Desenvolvedor Full Stack",
      subtitle: "Especializado em React, Next.js e TailwindCSS",
      cta: "Ver Projetos",
    },
    about: {
      title: "Sobre Mim",
      description: "Desenvolvedor apaixonado por criar experiências digitais incríveis",
    },
    services: {
      title: "Serviços",
      web: "Desenvolvimento Web",
      mobile: "Apps Mobile",
      ui: "UI/UX Design",
    },
    projects: {
      title: "Projetos",
      all: "Todos",
      web: "Web",
      mobile: "Mobile",
      design: "Design",
    },
    blog: {
      title: "Blog",
      readMore: "Ler mais",
      backToBlog: "Voltar ao Blog",
    },
    contact: {
      title: "Contato",
      subtitle: "Vamos trabalhar juntos",
      name: "Nome",
      email: "Email",
      message: "Mensagem",
      send: "Enviar",
    },
    footer: {
      rights: "Todos os direitos reservados",
    },
    pages: {
      aboutDescription: "Conheça mais sobre minha trajetória, habilidades e experiência no desenvolvimento web.",
      projectsDescription: "Explore meus projetos mais recentes e as tecnologias que utilizo.",
      contactDescription: "Entre em contato comigo para discutir seu próximo projeto.",
    },
  },
  "en-US": {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      blog: "Blog",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, I am",
      title: "Full Stack Developer",
      subtitle: "Specialized in React, Next.js and TailwindCSS",
      cta: "View Projects",
    },
    about: {
      title: "About Me",
      description: "Developer passionate about creating amazing digital experiences",
    },
    services: {
      title: "Services",
      web: "Web Development",
      mobile: "Mobile Apps",
      ui: "UI/UX Design",
    },
    projects: {
      title: "Projects",
      all: "All",
      web: "Web",
      mobile: "Mobile",
      design: "Design",
    },
    blog: {
      title: "Blog",
      readMore: "Read more",
      backToBlog: "Back to Blog",
    },
    contact: {
      title: "Contact",
      subtitle: "Let's work together",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send",
    },
    footer: {
      rights: "All rights reserved",
    },
    pages: {
      aboutDescription: "Learn more about my journey, skills and experience in web development.",
      projectsDescription: "Explore my latest projects and the technologies I use.",
      contactDescription: "Get in touch with me to discuss your next project.",
    },
  },
} as const
