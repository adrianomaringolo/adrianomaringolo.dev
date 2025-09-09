"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/hooks/use-locale";
import Image from "next/image";
import { Button } from "buildgrid-ui";

export function HeroSection() {
  const { t } = useLocale();

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              {t("hero.greeting")}{" "}
              <span className="text-accent">Adriano Maringolo</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto lg:mx-0 text-pretty">
              {t("hero.title")} - {t("hero.subtitle")}
            </p>
            <Link href="/projetos">
              <Button size="lg" className="group">
                {t("hero.cta")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="w-80 h-80 sm:w-96 sm:h-96 relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/profile-photo.jpg"
                  alt="Foto profissional"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Elemento decorativo */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
