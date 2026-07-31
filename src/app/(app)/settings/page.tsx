"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { Monitor, Moon, Sun, Sparkles, LogOut } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { apiPost } from "@/lib/fetcher";
import { revalidateTasks } from "@/hooks/use-tasks";
import { useLanguage } from "@/lib/i18n";
import { LANGUAGES } from "@/lib/i18n/dictionary";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { PageContainer } from "@/components/shared/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { user } = useUser();
  const { t, lang, setLang } = useLanguage();
  const [seeding, setSeeding] = useState(false);

  const THEMES = [
    { value: "light", label: t("set.light"), icon: Sun },
    { value: "dark", label: t("set.dark"), icon: Moon },
    { value: "system", label: t("set.system"), icon: Monitor },
  ];

  async function handleSeed() {
    setSeeding(true);
    try {
      const res = await apiPost<{ seeded: boolean; message?: string }>("/api/seed", {});
      await revalidateTasks();
      toast.success(res.seeded ? "Demo data added." : res.message ?? "Nothing to seed.");
    } catch {
      toast.error("Could not seed demo data.");
    } finally {
      setSeeding(false);
    }
  }

  return (
    <>
      <DashboardHeader title={t("set.title")} subtitle={t("set.subtitle")} />
      <PageContainer className="max-w-3xl">
        {/* Account */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("set.account")}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="font-medium">{user?.fullName ?? user?.username ?? "You"}</p>
              <p className="text-sm text-muted-foreground">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
            <SignOutButton>
              <Button variant="outline">
                <LogOut className="mr-1.5 h-4 w-4" /> {t("common.signOut")}
              </Button>
            </SignOutButton>
          </CardContent>
        </Card>

        {/* Language */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("set.language")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {LANGUAGES.map((l) => (
                <button
                  key={l.value}
                  type="button"
                  onClick={() => setLang(l.value)}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-xl border p-4 text-sm transition-colors",
                    lang === l.value ? "border-primary bg-accent" : "hover:bg-muted",
                  )}
                >
                  <span className="text-xs font-semibold">{l.short}</span>
                  {l.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("set.appearance")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {THEMES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setTheme(t.value)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border p-4 text-sm transition-colors",
                    theme === t.value ? "border-primary bg-accent" : "hover:bg-muted",
                  )}
                >
                  <t.icon className="h-5 w-5" />
                  {t.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Demo data */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("set.demo")}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">{t("set.demoDesc")}</p>
            <Button onClick={handleSeed} disabled={seeding} className="shrink-0">
              <Sparkles className="mr-1.5 h-4 w-4" />
              {seeding ? t("set.adding") : t("set.addDemo")}
            </Button>
          </CardContent>
        </Card>
      </PageContainer>
    </>
  );
}
