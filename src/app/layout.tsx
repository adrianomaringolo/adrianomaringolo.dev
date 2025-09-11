import type React from "react";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { LocaleProvider } from "@/hooks/use-locale";
import { ThemeProvider } from "@/hooks/use-theme";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Portfólio - Desenvolvedor Web",
  description:
    "Portfólio pessoal de desenvolvedor web especializado em React, Next.js e TailwindCSS",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`font-sans ${lato.className} `}>
        <ThemeProvider>
          <LocaleProvider>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            <Analytics />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
