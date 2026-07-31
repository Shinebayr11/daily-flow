"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getWeekStart, addDaysISO, formatDate } from "@/lib/date";
import { useLanguage } from "@/lib/i18n";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { PageContainer } from "@/components/shared/page-container";
import { GoalsEditor } from "@/components/weekly/goals-editor";
import { WeeklyPlanner } from "@/components/weekly/weekly-planner";
import { Button } from "@/components/ui/button";

export default function WeeklyPlanPage() {
  const { t } = useLanguage();
  const [weekStart, setWeekStart] = useState(getWeekStart());
  const weekEnd = addDaysISO(weekStart, 6);

  return (
    <>
      <DashboardHeader title={t("week.title")} subtitle={t("week.subtitle")} />
      <PageContainer>
        {/* Week navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setWeekStart(addDaysISO(weekStart, -7))}
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> {t("common.prev")}
          </Button>
          <p className="text-sm font-medium">
            {formatDate(weekStart, { weekday: undefined, month: "short", day: "numeric" })}
            {" – "}
            {formatDate(weekEnd, { weekday: undefined, month: "short", day: "numeric" })}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setWeekStart(addDaysISO(weekStart, 7))}
          >
            {t("common.next")} <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <GoalsEditor weekStart={weekStart} />
        <WeeklyPlanner weekStart={weekStart} />
      </PageContainer>
    </>
  );
}
