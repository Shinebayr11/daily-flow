"use client";

import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTasks } from "@/hooks/use-tasks";
import { getWeekDays, addDaysISO, formatDate, todayISO } from "@/lib/date";
import { sortTasksByTime } from "@/utils/tasks";
import { useLanguage } from "@/lib/i18n";
import type { TaskDTO } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddTaskDialog } from "@/components/tasks/add-task-dialog";
import { ListSkeleton } from "@/components/shared/loading-skeleton";

const PRIORITY_DOT: Record<string, string> = {
  high: "bg-destructive",
  medium: "bg-warning",
  low: "bg-success",
};

interface WeeklyPlannerProps {
  weekStart: string;
}

/**
 * Mon–Sun grid of day columns. Each column lists its tasks and has its own
 * "add task" action pre-filled with that day's date.
 */
export function WeeklyPlanner({ weekStart }: WeeklyPlannerProps) {
  const { t } = useLanguage();
  const weekDays = getWeekDays(weekStart);
  const weekEnd = addDaysISO(weekStart, 6);
  const { tasks, isLoading } = useTasks({ from: weekStart, to: weekEnd });

  if (isLoading) return <ListSkeleton rows={4} />;

  const byDay = (iso: string): TaskDTO[] =>
    sortTasksByTime(tasks.filter((t) => t.date === iso));

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
      {weekDays.map((iso) => {
        const dayTasks = byDay(iso);
        const isCurrent = iso === todayISO();
        return (
          <Card
            key={iso}
            className={cn("flex flex-col p-3", isCurrent && "ring-2 ring-primary")}
          >
            <div className="mb-2">
              <p className="text-sm font-semibold">
                {formatDate(iso, { weekday: "long", month: undefined, day: undefined })}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDate(iso, { weekday: undefined, month: "short", day: "numeric" })}
              </p>
            </div>

            <div className="flex-1 space-y-1.5">
              {dayTasks.length === 0 ? (
                <p className="py-2 text-xs text-muted-foreground">{t("week.noTasks")}</p>
              ) : (
                dayTasks.map((t) => (
                  <div
                    key={t.id}
                    className={cn(
                      "flex items-center gap-2 rounded-md border bg-background px-2 py-1.5 text-xs",
                      t.status === "completed" && "opacity-60",
                    )}
                  >
                    <span className={cn("h-2 w-2 shrink-0 rounded-full", PRIORITY_DOT[t.priority])} />
                    <span
                      className={cn(
                        "truncate",
                        t.status === "completed" && "line-through",
                      )}
                    >
                      {t.startTime ? `${t.startTime} ` : ""}
                      {t.title}
                    </span>
                  </div>
                ))
              )}
            </div>

            <AddTaskDialog
              defaultDate={iso}
              sameDayTasks={dayTasks}
              trigger={
                <Button variant="ghost" size="sm" className="mt-2 w-full justify-start text-muted-foreground">
                  <Plus className="mr-1 h-3.5 w-3.5" /> {t("common.add")}
                </Button>
              }
            />
          </Card>
        );
      })}
    </div>
  );
}
