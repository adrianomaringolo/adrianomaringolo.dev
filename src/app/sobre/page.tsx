"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import {
  Code,
  Palette,
  Zap,
  Users,
  Smartphone,
  Globe,
  Database,
  GitBranch,
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "buildgrid-ui";

export default function SobrePage() {
  const technologies = [
    { name: "React", icon: Code },
    { name: "Next.js", icon: Globe },
    { name: "TailwindCSS", icon: Palette },
    { name: "TypeScript", icon: Code },
    { name: "Node.js", icon: Database },
    { name: "Git", icon: GitBranch },
    { name: "Figma", icon: Palette },
    { name: "Vercel", icon: Zap },
  ];

  const workPrinciples = [
    {
      title: "Responsividade",
      description:
        "Todos os projetos são desenvolvidos com mobile-first, garantindo perfeita adaptação em qualquer dispositivo.",
      icon: Smartphone,
    },
    {
      title: "Experiência do Usuário",
      description:
        "Foco na usabilidade e acessibilidade, criando interfaces intuitivas e agradáveis de usar.",
      icon: Users,
    },
    {
      title: "Performance",
      description:
        "Otimização constante para garantir carregamento rápido e experiência fluida.",
      icon: Zap,
    },
  ];

  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-balance">
              Sobre Mim
            </h1>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center lg:justify-start"
              >
                <div className="relative">
                  <div className="w-64 h-64 sm:w-80 sm:h-80 relative rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/images/profile-photo.jpg"
                      alt="Foto profissional"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-16 h-16 bg-accent/20 rounded-full blur-lg"></div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-2xl font-semibold mb-6">
                  Olá! Eu sou desenvolvedor web
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p className="text-pretty">
                    Apaixonado por criar experiências digitais únicas e
                    funcionais. Com mais de 3 anos de experiência, transformo
                    ideias em realidade através de código limpo e design
                    intuitivo.
                  </p>
                  <p className="text-pretty">
                    Especializado em React, Next.js e tecnologias modernas,
                    sempre buscando entregar soluções que fazem a diferença na
                    vida das pessoas e no sucesso dos negócios.
                  </p>
                </div>
              </motion.div>
            </div>

            <Card className="mb-16">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6">
                  Minha Trajetória
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p className="text-pretty">
                    Iniciei minha jornada no desenvolvimento web há mais de 3
                    anos, movido pela paixão de criar soluções digitais que
                    fazem a diferença na vida das pessoas. Comecei estudando
                    HTML, CSS e JavaScript, e rapidamente me apaixonei pelo
                    ecossistema React.
                  </p>
                  <p className="text-pretty">
                    Ao longo dos anos, especializei-me em tecnologias modernas
                    como Next.js, TailwindCSS e TypeScript, sempre buscando as
                    melhores práticas de desenvolvimento e mantendo-me
                    atualizado com as tendências do mercado.
                  </p>
                  <p className="text-pretty">
                    Hoje, trabalho como desenvolvedor freelancer, ajudando
                    empresas e empreendedores a materializarem suas ideias em
                    produtos digitais de alta qualidade, sempre priorizando a
                    experiência do usuário e a performance.
                  </p>
                </div>
              </CardContent>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-center mb-12">
                Tecnologias
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="text-center hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <tech.icon className="h-6 w-6 text-accent" />
                        </div>
                        <h3 className="font-medium">{tech.name}</h3>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">
                Como Trabalho
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {workPrinciples.map((principle, index) => (
                  <motion.div
                    key={principle.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full text-center">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <principle.icon className="h-6 w-6 text-accent" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">
                          {principle.title}
                        </h3>
                        <p className="text-muted-foreground text-pretty">
                          {principle.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
