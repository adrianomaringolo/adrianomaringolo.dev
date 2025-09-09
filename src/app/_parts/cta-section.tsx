"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/hooks/use-locale";
import { Button } from "buildgrid-ui";

export function CTASection() {
  const { locale } = useLocale();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance">
            {locale === "pt-BR"
              ? "Tem uma ideia em mente?"
              : "Have an idea in mind?"}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            {locale === "pt-BR"
              ? "Vamos conversar e transformar sua visão em realidade digital!"
              : "Let's talk and turn your vision into digital reality!"}
          </p>
          <Link href="/contato">
            <Button size="lg" className="group">
              <MessageCircle className="mr-2 h-4 w-4" />
              {locale === "pt-BR" ? "Entre em Contato" : "Get in Touch"}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
