"use client";

import { Sun } from "lucide-react";
import type { TaskDTO } from "@/types";
import { sortTasksByTime } from "@/utils/tasks";
import { useLanguage } from "@/lib/i18n";
import { TaskCard } from "./task-card";
import { EmptyState } from "@/components/shared/empty-state";
import { ListSkeleton } from "@/components/shared/loading-skeleton";

interface DailyTimelineProps {
  tasks: TaskDTO[];
  isLoading?: boolean;
  emptyAction?: React.ReactNode;
}

/**
 * Timeline view for the Today page. Timed tasks get a time gutter on the left;
 * untimed / all-day tasks are grouped under "Anytime".
 */
export function DailyTimeline({ tasks, isLoading, emptyAction }: DailyTimelineProps) {
  const { t } = useLanguage();
  if (isLoading) return <ListSkeleton rows={5} />;

  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={Sun}
        title={t("today.emptyTitle")}
        description={t("today.emptyDesc")}
        action={emptyAction}
      />
    );
  }

  const sorted = sortTasksByTime(tasks);
  const timed = sorted.filter((t) => !t.allDay && t.startTime);
  const anytime = sorted.filter((t) => t.allDay || !t.startTime);

  return (
    <div className="space-y-6">
      {timed.length > 0 && (
        <div className="space-y-3">
          {timed.map((task) => (
            <div key={task.id} className="flex gap-3">
              <div className="flex w-14 shrink-0 flex-col items-end pt-4">
                <span className="text-sm font-semibold tabular-nums">
                  {task.startTime}
                </span>
                {task.endTime && (
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {task.endTime}
                  </span>
                )}
              </div>
              <div className="relative flex-1 border-l pl-4">
                <span className="absolute -left-[5px] top-5 h-2.5 w-2.5 rounded-full bg-primary" />
                <TaskCard task={task} sameDayTasks={tasks} />
              </div>
            </div>
          ))}
        </div>
      )}

      {anytime.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">{t("common.anytime")}</h3>
          {anytime.map((task) => (
            <TaskCard key={task.id} task={task} sameDayTasks={tasks} />
          ))}
        </div>
      )}
    </div>
  );
}
