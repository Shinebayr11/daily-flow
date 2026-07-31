"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PriorityBadge } from "@/components/shared/priority-badge";
import { deleteTask, moveTasks } from "@/hooks/use-tasks";
import { tomorrowISO } from "@/lib/date";
import { useLanguage } from "@/lib/i18n";
import type { TaskDTO } from "@/types";

interface MoveToTomorrowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Incomplete tasks from the day being wrapped up. */
  tasks: TaskDTO[];
}

/**
 * End-of-day flow for unfinished tasks. Nothing moves automatically — the user
 * chooses which tasks to carry over to tomorrow, keep, or delete.
 */
export function MoveToTomorrowDialog({
  open,
  onOpenChange,
  tasks,
}: MoveToTomorrowDialogProps) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);

  // Pre-select everything when the dialog opens.
  useEffect(() => {
    if (open) setSelected(new Set(tasks.map((t) => t.id)));
  }, [open, tasks]);

  const allSelected = selected.size === tasks.length && tasks.length > 0;
  const ids = [...selected];

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleMove() {
    if (ids.length === 0) return;
    setBusy(true);
    try {
      await moveTasks(ids, tomorrowISO());
      toast.success(`Moved ${ids.length} task${ids.length > 1 ? "s" : ""} to tomorrow.`);
      onOpenChange(false);
    } catch {
      toast.error("Could not move tasks.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (ids.length === 0) return;
    setBusy(true);
    try {
      await Promise.all(ids.map((id) => deleteTask(id)));
      toast.success("Selected tasks deleted.");
      onOpenChange(false);
    } catch {
      toast.error("Could not delete tasks.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("today.wrapTitle")}</DialogTitle>
          <DialogDescription>{t("today.wrapDesc")}</DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between border-b pb-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
            <Checkbox
              checked={allSelected}
              onCheckedChange={(v) =>
                setSelected(v ? new Set(tasks.map((task) => task.id)) : new Set())
              }
            />
            {t("common.selectAll")}
          </label>
          <span className="text-xs text-muted-foreground">
            {selected.size} {t("common.selected")}
          </span>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <label
              key={task.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border p-3"
            >
              <Checkbox
                checked={selected.has(task.id)}
                onCheckedChange={() => toggle(task.id)}
              />
              <span className="flex-1 truncate text-sm">{task.title}</span>
              <PriorityBadge priority={task.priority} />
            </label>
          ))}
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={busy}
            className="sm:mr-auto"
          >
            {t("common.keepOnToday")}
          </Button>
          <Button
            variant="outline"
            onClick={handleDelete}
            disabled={busy || ids.length === 0}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="mr-1.5 h-4 w-4" /> {t("common.delete")}
          </Button>
          <Button onClick={handleMove} disabled={busy || ids.length === 0}>
            <ArrowRight className="mr-1.5 h-4 w-4" /> {t("common.moveToTomorrow")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
