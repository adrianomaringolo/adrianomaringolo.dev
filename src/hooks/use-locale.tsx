"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { type Locale, defaultLocale, translations } from "@/lib/i18n";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    // Check localStorage first, then system preference
    const savedLocale = localStorage.getItem("locale") as Locale;
    if (savedLocale && (savedLocale === "pt-BR" || savedLocale === "en-US")) {
      setLocaleState(savedLocale);
    } else {
      // Detect system language
      const systemLang = navigator.language;
      if (systemLang.startsWith("pt")) {
        setLocaleState("pt-BR");
      } else {
        setLocaleState("en-US");
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = translations[locale];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
