"use client";

import { ListTodo } from "lucide-react";
import type { TaskDTO } from "@/types";
import { sortTasksByTime } from "@/utils/tasks";
import { useLanguage } from "@/lib/i18n";
import { TaskCard } from "./task-card";
import { EmptyState } from "@/components/shared/empty-state";
import { ListSkeleton } from "@/components/shared/loading-skeleton";

interface TaskListProps {
  tasks: TaskDTO[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: React.ReactNode;
}

/** Renders a time-sorted task list with loading + empty states. */
export function TaskList({
  tasks,
  isLoading,
  emptyTitle,
  emptyDescription,
  emptyAction,
}: TaskListProps) {
  const { t } = useLanguage();
  if (isLoading) return <ListSkeleton />;

  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={ListTodo}
        title={emptyTitle ?? t("list.noTasksTitle")}
        description={emptyDescription ?? t("list.noTasksDesc")}
        action={emptyAction}
      />
    );
  }

  const sorted = sortTasksByTime(tasks);
  return (
    <div className="space-y-3">
      {sorted.map((task) => (
        <TaskCard key={task.id} task={task} sameDayTasks={tasks} />
      ))}
    </div>
  );
}
