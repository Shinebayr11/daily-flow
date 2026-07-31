"use client";

import { Languages, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/lib/i18n";
import { LANGUAGES } from "@/lib/i18n/dictionary";

/** Globe/languages dropdown to switch between Mongolian and English. */
export function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const current = LANGUAGES.find((l) => l.value === lang);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5 px-2" aria-label="Language">
          <Languages className="h-5 w-5" />
          <span className="text-xs font-semibold">{current?.short}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map((l) => (
          <DropdownMenuItem key={l.value} onClick={() => setLang(l.value)}>
            <span className="flex-1">{l.label}</span>
            {lang === l.value && <Check className="ml-2 h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
