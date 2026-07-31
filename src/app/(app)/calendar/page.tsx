"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTasks } from "@/hooks/use-tasks";
import { toISODate, todayISO, formatDate } from "@/lib/date";
import { getTaskStats } from "@/utils/tasks";
import { WEEKDAY_LABELS } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { PageContainer } from "@/components/shared/page-container";
import { TaskList } from "@/components/tasks/task-list";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

/** Build the Monday-first grid (with leading/trailing nulls) for a month. */
function monthGrid(year: number, month: number): (string | null)[] {
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // JS: 0=Sun..6=Sat -> shift so Monday is index 0.
  const lead = (first.getDay() + 6) % 7;
  const cells: (string | null)[] = Array.from({ length: lead }, () => null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(toISODate(new Date(year, month, d)));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function CalendarPage() {
  const { t } = useLanguage();
  const now = new Date();
  const [cursor, setCursor] = useState({ year: now.getFullYear(), month: now.getMonth() });
  const [selected, setSelected] = useState<string | null>(null);

  const cells = useMemo(() => monthGrid(cursor.year, cursor.month), [cursor]);
  const monthStart = toISODate(new Date(cursor.year, cursor.month, 1));
  const monthEnd = toISODate(new Date(cursor.year, cursor.month + 1, 0));
  const { tasks } = useTasks({ from: monthStart, to: monthEnd });
  const { tasks: selectedTasks } = useTasks({ date: selected ?? todayISO() });

  // Completion % per day.
  const completionByDay = useMemo(() => {
    const map = new Map<string, number>();
    const grouped = new Map<string, typeof tasks>();
    for (const t of tasks) {
      const arr = grouped.get(t.date) ?? [];
      arr.push(t);
      grouped.set(t.date, arr);
    }
    for (const [day, arr] of grouped) map.set(day, getTaskStats(arr).completion);
    return map;
  }, [tasks]);

  function dayColor(iso: string): string {
    if (!completionByDay.has(iso)) return "";
    const pct = completionByDay.get(iso)!;
    if (pct >= 80) return "bg-success/15 text-success border-success/30";
    if (pct >= 50) return "bg-warning/15 text-warning border-warning/30";
    return "bg-destructive/10 text-destructive border-destructive/30";
  }

  const monthLabel = new Date(cursor.year, cursor.month, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  function shiftMonth(delta: number) {
    setCursor((c) => {
      const d = new Date(c.year, c.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }

  return (
    <>
      <DashboardHeader title={t("cal.title")} subtitle={t("cal.subtitle")} />
      <PageContainer>
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={() => shiftMonth(-1)}>
            <ChevronLeft className="mr-1 h-4 w-4" /> {t("common.prev")}
          </Button>
          <p className="text-sm font-semibold">{monthLabel}</p>
          <Button variant="outline" size="sm" onClick={() => shiftMonth(1)}>
            {t("common.next")} <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <Card className="p-3">
          <div className="grid grid-cols-7 gap-1">
            {WEEKDAY_LABELS.map((d) => (
              <div key={d} className="py-1 text-center text-xs font-medium text-muted-foreground">
                {d}
              </div>
            ))}
            {cells.map((iso, i) => {
              if (!iso) return <div key={`e-${i}`} />;
              const day = Number(iso.slice(-2));
              const isToday = iso === todayISO();
              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => setSelected(iso)}
                  className={cn(
                    "aspect-square rounded-lg border text-sm transition-colors hover:border-primary",
                    dayColor(iso) || "border-transparent hover:bg-muted",
                    isToday && "ring-2 ring-primary",
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <span className="h-3 w-3 rounded bg-success/40" /> 80–100%
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-3 w-3 rounded bg-warning/40" /> 50–79%
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-3 w-3 rounded bg-destructive/40" /> 0–49%
            </span>
          </div>
        </Card>
      </PageContainer>

      <Dialog open={selected !== null} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selected &&
                formatDate(selected, { weekday: "long", month: "long", day: "numeric" })}
            </DialogTitle>
          </DialogHeader>
          <TaskList tasks={selectedTasks} emptyTitle={t("cal.noTasksDay")} emptyDescription="" />
        </DialogContent>
      </Dialog>
    </>
  );
}
