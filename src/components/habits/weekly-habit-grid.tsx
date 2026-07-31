"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { toggleHabit } from "@/hooks/use-habits";
import { getWeekDays, getWeekStart, todayISO } from "@/lib/date";
import { WEEKDAY_LABELS } from "@/lib/constants";
import type { HabitDTO } from "@/types";
import { Card } from "@/components/ui/card";

interface WeeklyHabitGridProps {
  habits: HabitDTO[];
  onChanged?: () => void;
}

/**
 * 7-day grid: rows = habits, columns = Mon..Sun.
 *   done   → green check
 *   missed → x (a past active day with no completion)
 *   future → empty circle
 * Clicking a cell toggles completion for that day.
 */
export function WeeklyHabitGrid({ habits, onChanged }: WeeklyHabitGridProps) {
  const [pending, setPending] = useState<string | null>(null);
  const weekDays = getWeekDays(getWeekStart());
  const today = todayISO();

  async function toggle(habit: HabitDTO, date: string) {
    if (date > today) return; // can't complete a future day
    const key = `${habit.id}:${date}`;
    setPending(key);
    try {
      await toggleHabit(habit.id, date);
      onChanged?.();
    } catch {
      toast.error("Could not update habit.");
    } finally {
      setPending(null);
    }
  }

  if (habits.length === 0) return null;

  return (
    <Card className="overflow-x-auto p-4">
      <table className="w-full min-w-[520px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="pb-3 text-left font-medium text-muted-foreground">Habit</th>
            {WEEKDAY_LABELS.map((label, i) => (
              <th
                key={label}
                className={cn(
                  "pb-3 text-center font-medium text-muted-foreground",
                  weekDays[i] === today && "text-primary",
                )}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.map((habit) => {
            const done = new Set(habit.completedDates);
            return (
              <tr key={habit.id} className="border-t">
                <td className="py-2 pr-3">
                  <span className="mr-1.5">{habit.icon}</span>
                  {habit.name}
                </td>
                {weekDays.map((date) => {
                  const isDone = done.has(date);
                  const isFuture = date > today;
                  const isMissed = !isDone && !isFuture;
                  return (
                    <td key={date} className="py-2 text-center">
                      <button
                        type="button"
                        disabled={isFuture || pending === `${habit.id}:${date}`}
                        onClick={() => toggle(habit, date)}
                        className={cn(
                          "mx-auto flex h-7 w-7 items-center justify-center rounded-full border transition-colors",
                          isDone && "border-success bg-success text-success-foreground",
                          isMissed && "border-muted-foreground/30 text-muted-foreground/40 hover:border-primary",
                          isFuture && "border-dashed opacity-40",
                        )}
                        aria-label={`${habit.name} on ${date}`}
                      >
                        {isDone ? (
                          <Check className="h-4 w-4" />
                        ) : isMissed ? (
                          <X className="h-3.5 w-3.5" />
                        ) : null}
                      </button>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
