"use client";

import { motion } from "framer-motion";
import { Globe, Smartphone } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { Card, CardContent, CardHeader, CardTitle } from "buildgrid-ui";

export function ServicesSection() {
  const { t, locale } = useLocale();

  const services = [
    {
      icon: Globe,
      title: locale === "pt-BR" ? "Criação de Websites" : "Website Development",
      description:
        locale === "pt-BR"
          ? "Desenvolvimento de sites institucionais, landing pages e portfólios com design responsivo e otimização para SEO."
          : "Development of institutional websites, landing pages and portfolios with responsive design and SEO optimization.",
    },
    {
      icon: Smartphone,
      title: locale === "pt-BR" ? "Criação de Web Apps" : "Web App Development",
      description:
        locale === "pt-BR"
          ? "Desenvolvimento de aplicações web complexas com React, Next.js e integração com APIs e bancos de dados."
          : "Development of complex web applications with React, Next.js and integration with APIs and databases.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-balance">
            {t("services.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-pretty">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
