"use client";

import { useState } from "react";
import { Clock, MoreVertical, Pencil, Trash2, ArrowRight, Star } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  toggleTaskComplete,
  deleteTask,
  updateTask,
  moveTasks,
} from "@/hooks/use-tasks";
import { tomorrowISO, formatDuration } from "@/lib/date";
import { useLanguage } from "@/lib/i18n";
import type { TaskDTO } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PriorityBadge } from "@/components/shared/priority-badge";
import { CategoryBadge } from "@/components/shared/category-badge";
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog";
import { AddTaskDialog } from "./add-task-dialog";

interface TaskCardProps {
  task: TaskDTO;
  sameDayTasks?: TaskDTO[];
}

/** A single task row: complete toggle, meta badges and an actions menu. */
export function TaskCard({ task, sameDayTasks }: TaskCardProps) {
  const { t } = useLanguage();
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [busy, setBusy] = useState(false);
  const done = task.status === "completed";

  async function handleToggle() {
    setBusy(true);
    try {
      await toggleTaskComplete(task);
    } catch {
      toast.error("Could not update task.");
    } finally {
      setBusy(false);
    }
  }

  async function handleMoveTomorrow() {
    try {
      await moveTasks([task.id], tomorrowISO());
      toast.success("Moved to tomorrow.");
    } catch {
      toast.error("Could not move task.");
    }
  }

  async function handleTopPriority() {
    try {
      await updateTask(task.id, { isTopPriority: !task.isTopPriority });
      toast.success(task.isTopPriority ? "Removed top priority." : "Marked as top priority.");
    } catch {
      toast.error("Could not update task.");
    }
  }

  return (
    <>
      <div
        className={cn(
          "flex items-start gap-3 rounded-xl border bg-card p-4 transition-colors",
          done && "opacity-70",
        )}
      >
        <Checkbox
          checked={done}
          disabled={busy}
          onCheckedChange={handleToggle}
          className="mt-0.5"
          aria-label={done ? "Mark as not done" : "Mark as done"}
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {task.isTopPriority && (
              <Star className="h-3.5 w-3.5 shrink-0 fill-warning text-warning" />
            )}
            <p
              className={cn(
                "truncate font-medium",
                done && "text-muted-foreground line-through",
              )}
            >
              {task.title}
            </p>
          </div>

          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            {!task.allDay && task.startTime && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {task.startTime}
                {task.endTime ? `–${task.endTime}` : ""}
              </span>
            )}
            {task.allDay && (
              <span className="text-xs text-muted-foreground">{t("common.allDay")}</span>
            )}
            {task.estimatedDuration ? (
              <span className="text-xs text-muted-foreground">
                {formatDuration(task.estimatedDuration)}
              </span>
            ) : null}
            <PriorityBadge priority={task.priority} />
            <CategoryBadge category={task.category} />
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Task actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setEditing(true)}>
              <Pencil className="mr-2 h-4 w-4" /> {t("common.edit")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleMoveTomorrow}>
              <ArrowRight className="mr-2 h-4 w-4" /> {t("common.moveToTomorrow")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleTopPriority}>
              <Star className="mr-2 h-4 w-4" />
              {task.isTopPriority ? t("common.removeTopPriority") : t("common.setTopPriority")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setConfirmDelete(true)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" /> {t("common.delete")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Edit dialog (controlled) */}
      <AddTaskDialog
        defaultDate={task.date}
        sameDayTasks={sameDayTasks}
        task={task}
        open={editing}
        onOpenChange={setEditing}
      />

      <ConfirmDeleteDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title="Delete this task?"
        description={`"${task.title}" will be permanently removed.`}
        onConfirm={async () => {
          try {
            await deleteTask(task.id);
            toast.success("Task deleted.");
          } catch {
            toast.error("Could not delete task.");
          }
        }}
      />
    </>
  );
}
