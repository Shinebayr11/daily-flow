"use client";

import { useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TaskForm } from "./task-form";
import { createTask, updateTask } from "@/hooks/use-tasks";
import { useLanguage } from "@/lib/i18n";
import type { TaskDTO } from "@/types";
import type { TaskInput } from "@/lib/validations";

interface AddTaskDialogProps {
  defaultDate: string;
  sameDayTasks?: TaskDTO[];
  /** Provide to open the dialog in edit mode. */
  task?: TaskDTO;
  /** Custom trigger; falls back to an "Add Task" button. */
  trigger?: ReactNode;
  /** Controlled open state (used when editing from a menu). */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/** Dialog that creates or edits a task with full validation + toast feedback. */
export function AddTaskDialog({
  defaultDate,
  sameDayTasks,
  task,
  trigger,
  open,
  onOpenChange,
}: AddTaskDialogProps) {
  const { t } = useLanguage();
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setOpen = isControlled ? onOpenChange! : setInternalOpen;

  const isEditing = Boolean(task);

  const initialValues: Partial<TaskInput> | undefined = task
    ? {
        title: task.title,
        description: task.description ?? "",
        date: task.date,
        allDay: task.allDay,
        startTime: task.startTime ?? "",
        endTime: task.endTime ?? "",
        category: task.category,
        priority: task.priority,
        estimatedDuration: task.estimatedDuration,
        repeat: task.repeat,
        reminderOffset: task.reminderOffset,
        isTopPriority: task.isTopPriority,
      }
    : undefined;

  async function handleSubmit(values: TaskInput) {
    try {
      if (isEditing && task) {
        await updateTask(task.id, values);
        toast.success(t("toast.taskSaved"));
      } else {
        await createTask(values);
        toast.success(t("toast.taskCreated"));
      }
      setOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("toast.error"));
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {!isControlled && (
        <DialogTrigger asChild>
          {trigger ?? (
            <Button>
              <Plus className="mr-1.5 h-4 w-4" />
              {t("common.addTask")}
            </Button>
          )}
        </DialogTrigger>
      )}
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? t("form.editTitle") : t("form.addTitle")}</DialogTitle>
          <DialogDescription>
            {isEditing ? t("form.editDesc") : t("form.addDesc")}
          </DialogDescription>
        </DialogHeader>
        <TaskForm
          defaultDate={defaultDate}
          sameDayTasks={sameDayTasks}
          editingId={task?.id}
          initialValues={initialValues}
          submitLabel={isEditing ? t("common.saveChanges") : t("common.addTask")}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
