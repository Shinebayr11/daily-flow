"use client";

import { Bell } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LanguageToggle } from "@/components/shared/language-toggle";
import { formatDate, todayISO } from "@/lib/date";
import { motivationForToday } from "@/lib/greetings";
import { useLanguage } from "@/lib/i18n";

interface DashboardHeaderProps {
  /** Optional page title override; defaults to a personalized greeting. */
  title?: string;
  subtitle?: string;
}

/**
 * Sticky top bar shown on every app page: greeting/title, today's date and a
 * motivational line on the left; notifications, theme toggle and profile menu
 * on the right.
 */
export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const { user } = useUser();
  const { t } = useLanguage();
  const firstName = user?.firstName ?? user?.username ?? "";

  const hour = new Date().getHours();
  const greetingKey =
    hour < 12 ? "greeting.morning" : hour < 18 ? "greeting.afternoon" : "greeting.evening";
  const greeting = `${t(greetingKey)}${firstName ? `, ${firstName}` : ""} 👋`;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b bg-background/80 px-4 py-3 backdrop-blur md:px-8">
      <div className="min-w-0">
        <h1 className="truncate text-lg font-bold sm:text-xl">{title ?? greeting}</h1>
        <p className="truncate text-sm text-muted-foreground">
          {subtitle ?? `${formatDate(todayISO(), { weekday: "long" })} · ${motivationForToday()}`}
        </p>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
        </Button>
        <LanguageToggle />
        <ThemeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{ elements: { avatarBox: "h-8 w-8" } }}
        />
      </div>
    </header>
  );
}
