"use client";

import { Star, Sunrise } from "lucide-react";
import { useTasks } from "@/hooks/use-tasks";
import { tomorrowISO, formatDate } from "@/lib/date";
import { sortTasksByTime } from "@/utils/tasks";
import { useLanguage } from "@/lib/i18n";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { PageContainer, SectionHeader } from "@/components/shared/page-container";
import { TaskList } from "@/components/tasks/task-list";
import { AddTaskDialog } from "@/components/tasks/add-task-dialog";
import { PriorityBadge } from "@/components/shared/priority-badge";
import { Card, CardContent } from "@/components/ui/card";

export default function TomorrowPage() {
  const { t } = useLanguage();
  const tomorrow = tomorrowISO();
  const { tasks, isLoading } = useTasks({ date: tomorrow });

  const topThree = sortTasksByTime(tasks.filter((t) => t.isTopPriority)).slice(0, 3);

  return (
    <>
      <DashboardHeader title={t("tom.title")} subtitle={t("tom.subtitle")} />
      <PageContainer>
        {/* Top 3 priorities */}
        <div>
          <SectionHeader title={t("tom.top3")} />
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {[0, 1, 2].map((i) => {
              const task = topThree[i];
              return (
                <Card key={i} className={task ? "border-primary/40" : "border-dashed"}>
                  <CardContent className="flex items-center gap-3 p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-primary">
                      {i + 1}
                    </span>
                    {task ? (
                      <div className="min-w-0">
                        <p className="truncate font-medium">{task.title}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                          <PriorityBadge priority={task.priority} />
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">{t("tom.markTop")}</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{t("tom.tip")}</p>
        </div>

        {/* All tomorrow tasks */}
        <div>
          <SectionHeader
            title={formatDate(tomorrow, { weekday: "long", month: "long", day: "numeric" })}
            action={<AddTaskDialog defaultDate={tomorrow} sameDayTasks={tasks} />}
          />
          <div className="mt-3">
            <TaskList
              tasks={tasks}
              isLoading={isLoading}
              emptyTitle={t("tom.emptyTitle")}
              emptyDescription={t("tom.emptyDesc")}
              emptyAction={<AddTaskDialog defaultDate={tomorrow} sameDayTasks={tasks} />}
            />
          </div>
        </div>
      </PageContainer>
    </>
  );
}
