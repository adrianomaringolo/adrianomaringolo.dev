import ptBR from "@/locales/pt-BR.json";
import enUS from "@/locales/en-US.json";

export const defaultLocale = "pt-BR";
export const locales = ["pt-BR", "en-US"] as const;

export type Locale = (typeof locales)[number];

export const translations = {
  "pt-BR": ptBR,
  "en-US": enUS,
} as const;

// Server-side translation function
export function getTranslations(locale: Locale) {
  return translations[locale] || translations[defaultLocale];
}

// Client-side translation function
export function createTranslator(locale: Locale) {
  const t = (key: string): string => {
    const keys = key.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = translations[locale];

    for (const k of keys) {
      value = value?.[k];
    }

    return typeof value === 'string' ? value : key;
  };

  return { t, locale };
}

// Locale metadata for SEO
export const localeMetadata = {
  'pt-BR': {
    name: 'Português (Brasil)',
    flag: '🇧🇷',
    dir: 'ltr',
    hreflang: 'pt-BR',
  },
  'en-US': {
    name: 'English (US)',
    flag: '🇺🇸',
    dir: 'ltr',
    hreflang: 'en-US',
  },
} as const;
