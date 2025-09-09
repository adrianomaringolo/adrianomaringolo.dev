"use client";

import { Languages } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "buildgrid-ui";

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Languages className="h-4 w-4" />
          <span className="ml-2 text-sm">
            {locale === "pt-BR" ? "PT" : "EN"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLocale("pt-BR")}>
          🇧🇷 Português
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale("en-US")}>
          🇺🇸 English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
