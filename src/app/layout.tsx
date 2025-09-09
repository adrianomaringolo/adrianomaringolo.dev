import type React from "react";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { LocaleProvider } from "@/hooks/use-locale";
import { ThemeProvider } from "@/hooks/use-theme";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
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
      <body className={`font-sans ${dmSans.variable} ${GeistMono.variable}`}>
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
