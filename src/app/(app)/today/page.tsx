"use client";

import { useState } from "react";
import { MoonStar } from "lucide-react";
import { useTasks } from "@/hooks/use-tasks";
import { todayISO, formatDate } from "@/lib/date";
import { getTaskStats } from "@/utils/tasks";
import { useLanguage } from "@/lib/i18n";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { PageContainer, SectionHeader } from "@/components/shared/page-container";
import { ProgressCard } from "@/components/shared/progress-card";
import { DailyTimeline } from "@/components/tasks/daily-timeline";
import { AddTaskDialog } from "@/components/tasks/add-task-dialog";
import { MoveToTomorrowDialog } from "@/components/tasks/move-to-tomorrow-dialog";
import { Button } from "@/components/ui/button";

export default function TodayPage() {
  const { t } = useLanguage();
  const today = todayISO();
  const { tasks, isLoading } = useTasks({ date: today });
  const [wrapUp, setWrapUp] = useState(false);

  const stats = getTaskStats(tasks);
  const incomplete = tasks.filter((t) => t.status !== "completed");

  return (
    <>
      <DashboardHeader
        title={t("nav.today")}
        subtitle={formatDate(today, { weekday: "long", month: "long", day: "numeric" })}
      />
      <PageContainer>
        <div className="grid gap-4 sm:grid-cols-3">
          <ProgressCard
            title={t("dash.todaysCompletion")}
            percent={stats.completion}
            caption={`${stats.completed}/${stats.total}`}
            className="sm:col-span-1"
          />
          <div className="flex items-center justify-between gap-3 rounded-xl border bg-card p-5 sm:col-span-2">
            <div>
              <p className="text-sm text-muted-foreground">{t("today.endOfDay")}</p>
              <p className="font-medium">
                {incomplete.length} {t("today.unfinished")}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setWrapUp(true)}
              disabled={incomplete.length === 0}
            >
              <MoonStar className="mr-1.5 h-4 w-4" /> {t("common.wrapUpDay")}
            </Button>
          </div>
        </div>

        <div>
          <SectionHeader
            title={t("today.timeline")}
            action={<AddTaskDialog defaultDate={today} sameDayTasks={tasks} />}
          />
          <div className="mt-3">
            <DailyTimeline
              tasks={tasks}
              isLoading={isLoading}
              emptyAction={<AddTaskDialog defaultDate={today} sameDayTasks={tasks} />}
            />
          </div>
        </div>
      </PageContainer>

      <MoveToTomorrowDialog open={wrapUp} onOpenChange={setWrapUp} tasks={incomplete} />
    </>
  );
}
