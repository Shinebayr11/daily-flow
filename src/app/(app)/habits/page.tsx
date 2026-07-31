"use client";

import { Repeat } from "lucide-react";
import { useHabits } from "@/hooks/use-habits";
import { useLanguage } from "@/lib/i18n";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { PageContainer, SectionHeader } from "@/components/shared/page-container";
import { HabitCard } from "@/components/habits/habit-card";
import { WeeklyHabitGrid } from "@/components/habits/weekly-habit-grid";
import { AddHabitDialog } from "@/components/habits/add-habit-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { ListSkeleton } from "@/components/shared/loading-skeleton";

export default function HabitsPage() {
  const { t } = useLanguage();
  const { habits, isLoading, mutate } = useHabits();

  return (
    <>
      <DashboardHeader title={t("hab.title")} subtitle={t("hab.subtitle")} />
      <PageContainer>
        <SectionHeader
          title={t("hab.yourHabits")}
          action={<AddHabitDialog onCreated={() => mutate()} />}
        />

        {isLoading ? (
          <ListSkeleton rows={3} />
        ) : habits.length === 0 ? (
          <EmptyState
            icon={Repeat}
            title={t("hab.emptyTitle")}
            description={t("hab.emptyDesc")}
            action={<AddHabitDialog onCreated={() => mutate()} />}
          />
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {habits.map((h) => (
                <HabitCard key={h.id} habit={h} onChanged={() => mutate()} />
              ))}
            </div>

            <div>
              <SectionHeader title={t("hab.thisWeek")} />
              <div className="mt-3">
                <WeeklyHabitGrid habits={habits} onChanged={() => mutate()} />
              </div>
            </div>
          </>
        )}
      </PageContainer>
    </>
  );
}
