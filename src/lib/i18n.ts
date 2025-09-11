import ptBR from "@/locales/pt-BR.json";
import enUS from "@/locales/en-US.json";

export const defaultLocale = "pt-BR";
export const locales = ["pt-BR", "en-US"] as const;

export type Locale = (typeof locales)[number];

export const translations = {
  "pt-BR": ptBR,
  "en-US": enUS,
} as const;
