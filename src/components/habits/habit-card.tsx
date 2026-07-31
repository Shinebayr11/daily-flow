"use client";

import { useState } from "react";
import { Check, Flame, Trophy, MoreVertical, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { toggleHabit, deleteHabit } from "@/hooks/use-habits";
import { getWeekDays, getWeekStart, todayISO } from "@/lib/date";
import { useLanguage } from "@/lib/i18n";
import type { HabitDTO } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog";

interface HabitCardProps {
  habit: HabitDTO;
  /** Called after a successful mutation so the parent can revalidate. */
  onChanged?: () => void;
}

export function HabitCard({ habit, onChanged }: HabitCardProps) {
  const { t } = useLanguage();
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const completed = new Set(habit.completedDates);
  const weekDays = getWeekDays(getWeekStart());
  const weekCount = weekDays.filter((d) => completed.has(d)).length;
  const doneToday = completed.has(todayISO());

  async function handleToggleToday() {
    setBusy(true);
    try {
      await toggleHabit(habit.id, todayISO());
      onChanged?.();
    } catch {
      toast.error("Could not update habit.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Card>
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-2xl">
                {habit.icon}
              </span>
              <div>
                <p className="font-semibold">{habit.name}</p>
                <p className="text-xs text-muted-foreground">
                  {weekCount}/7 {t("hab.daysThisWeek")}
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setConfirmDelete(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Week dots */}
          <div className="mt-4 flex justify-between">
            {weekDays.map((d) => (
              <span
                key={d}
                className={cn(
                  "h-6 w-6 rounded-full border",
                  completed.has(d)
                    ? "border-success bg-success"
                    : "border-dashed bg-transparent",
                )}
                title={d}
              />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-4 text-sm">
              <span className="inline-flex items-center gap-1 text-warning">
                <Flame className="h-4 w-4" /> {habit.currentStreak}
              </span>
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <Trophy className="h-4 w-4" /> {habit.bestStreak}
              </span>
            </div>
            <Button
              size="sm"
              variant={doneToday ? "secondary" : "default"}
              disabled={busy}
              onClick={handleToggleToday}
            >
              <Check className="mr-1.5 h-4 w-4" />
              {doneToday ? t("common.doneToday") : t("common.complete")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <ConfirmDeleteDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title="Delete this habit?"
        description={`"${habit.name}" and its streak history will be removed.`}
        onConfirm={async () => {
          try {
            await deleteHabit(habit.id);
            toast.success("Habit deleted.");
            onChanged?.();
          } catch {
            toast.error("Could not delete habit.");
          }
        }}
      />
    </>
  );
}
