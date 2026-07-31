"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/i18n";

/**
 * Client-side providers: next-themes (dark mode) + LanguageProvider (i18n).
 * Kept in its own file so the root layout stays a server component.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageProvider>{children}</LanguageProvider>
    </NextThemesProvider>
  );
}
