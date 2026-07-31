"use client";

import {
  ClipboardList,
  CheckCircle2,
  Percent,
  CalendarCheck,
  Tag,
  Flame,
} from "lucide-react";
import { useTasks } from "@/hooks/use-tasks";
import { useHabits } from "@/hooks/use-habits";
import {
  todayISO,
  addDaysISO,
  getWeekStart,
  getWeekDays,
  formatDate,
} from "@/lib/date";
import { countByCategory, getTaskStats } from "@/utils/tasks";
import type { Category } from "@/types";
import { useLanguage } from "@/lib/i18n";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { PageContainer, SectionHeader } from "@/components/shared/page-container";
import { StatCard } from "@/components/shared/stat-card";
import { CompletionChart } from "@/components/statistics/completion-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatisticsPage() {
  const { t } = useLanguage();
  const today = todayISO();
  const rangeStart = addDaysISO(today, -29);
  const { tasks } = useTasks({ from: rangeStart, to: today });
  const { habits } = useHabits();

  const stats = getTaskStats(tasks);

  // Most productive day (by completed count).
  const completedByDay = new Map<string, number>();
  for (const t of tasks) {
    if (t.status === "completed") {
      completedByDay.set(t.date, (completedByDay.get(t.date) ?? 0) + 1);
    }
  }
  let bestDay = "—";
  let bestDayCount = 0;
  for (const [day, count] of completedByDay) {
    if (count > bestDayCount) {
      bestDayCount = count;
      bestDay = formatDate(day, { weekday: "short", month: "short", day: "numeric" });
    }
  }

  // Most used category.
  const categoryCounts = countByCategory(tasks);
  const categoryEntries = (Object.entries(categoryCounts) as [Category, number][])
    .filter(([, n]) => n > 0)
    .sort((a, b) => b[1] - a[1]);
  const topCategory = categoryEntries[0]?.[0] ?? "—";
  const maxCategory = categoryEntries[0]?.[1] ?? 1;

  const longestStreak = habits.reduce((m, h) => Math.max(m, h.bestStreak), 0);

  // Current-week completion chart.
  const weekStart = getWeekStart();
  const chartData = getWeekDays(weekStart).map((iso) => {
    const dayTasks = tasks.filter((t) => t.date === iso);
    const done = dayTasks.filter((t) => t.status === "completed").length;
    return {
      label: formatDate(iso, { weekday: "short", month: undefined, day: undefined }),
      percent: dayTasks.length ? Math.round((done / dayTasks.length) * 100) : 0,
    };
  });

  return (
    <>
      <DashboardHeader title={t("stat.title")} subtitle={t("stat.subtitle")} />
      <PageContainer>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          <StatCard label={t("stat.created")} value={stats.total} icon={ClipboardList} />
          <StatCard
            label={t("stat.completed")}
            value={stats.completed}
            icon={CheckCircle2}
            accent="text-success"
          />
          <StatCard
            label={t("stat.avg")}
            value={`${stats.completion}%`}
            icon={Percent}
          />
          <StatCard
            label={t("stat.mostProductive")}
            value={bestDay}
            icon={CalendarCheck}
            hint={bestDayCount ? `${bestDayCount} ${t("dash.done")}` : undefined}
          />
          <StatCard label={t("stat.topCategory")} value={topCategory} icon={Tag} />
          <StatCard
            label={t("stat.longestStreak")}
            value={`${longestStreak} ${t("dash.days")}`}
            icon={Flame}
            accent="text-warning"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <SectionHeader title={t("stat.weeklyCompletion")} />
            <div className="mt-3">
              <CompletionChart data={chartData} title="" />
            </div>
          </div>

          <div>
            <SectionHeader title={t("stat.categoryDist")} />
            <Card className="mt-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{t("stat.byCategory")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categoryEntries.length === 0 ? (
                  <p className="text-sm text-muted-foreground">{t("stat.noData")}</p>
                ) : (
                  categoryEntries.map(([cat, n]) => (
                    <div key={cat}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>{cat}</span>
                        <span className="text-muted-foreground">{n}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${(n / maxCategory) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
