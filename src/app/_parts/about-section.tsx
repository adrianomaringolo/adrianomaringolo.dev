"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/hooks/use-locale";
import { Card, CardContent } from "buildgrid-ui";

export function AboutSection() {
  const { t, locale } = useLocale();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-balance">
            {t("about.title")}
          </h2>
          <Card>
            <CardContent className="p-8">
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                {locale === "pt-BR"
                  ? "Sou um desenvolvedor web apaixonado por criar experiências digitais excepcionais. Com mais de 3 anos de experiência, especializo-me em React, Next.js e TailwindCSS para desenvolver soluções web modernas, responsivas e performáticas. Meu foco está em transformar ideias em realidade digital, sempre priorizando a experiência do usuário e as melhores práticas de desenvolvimento."
                  : "I am a web developer passionate about creating exceptional digital experiences. With over 3 years of experience, I specialize in React, Next.js and TailwindCSS to develop modern, responsive and performant web solutions. My focus is on transforming ideas into digital reality, always prioritizing user experience and development best practices."}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
