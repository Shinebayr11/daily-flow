"use client";

import {
  ListTodo,
  CheckCircle2,
  CircleDashed,
  Flame,
  CalendarRange,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useTasks } from "@/hooks/use-tasks";
import { useHabits } from "@/hooks/use-habits";
import {
  todayISO,
  tomorrowISO,
  getWeekStart,
  addDaysISO,
  getWeekDays,
  formatDate,
} from "@/lib/date";
import { getTaskStats } from "@/utils/tasks";
import { useLanguage } from "@/lib/i18n";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { PageContainer, SectionHeader } from "@/components/shared/page-container";
import { StatCard } from "@/components/shared/stat-card";
import { ProgressCard } from "@/components/shared/progress-card";
import { TaskList } from "@/components/tasks/task-list";
import { AddTaskDialog } from "@/components/tasks/add-task-dialog";
import { HabitCard } from "@/components/habits/habit-card";
import { CompletionChart } from "@/components/statistics/completion-chart";
import { CardGridSkeleton } from "@/components/shared/loading-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { t } = useLanguage();
  const today = todayISO();
  const weekStart = getWeekStart();
  const weekEnd = addDaysISO(weekStart, 6);

  const { tasks: todayTasks, isLoading } = useTasks({ date: today });
  const { tasks: tomorrowTasks } = useTasks({ date: tomorrowISO() });
  const { tasks: weekTasks } = useTasks({ from: weekStart, to: weekEnd });
  const { habits, mutate: mutateHabits } = useHabits();

  const stats = getTaskStats(todayTasks);
  const bestStreak = habits.reduce((m, h) => Math.max(m, h.currentStreak), 0);

  // Per-day completion % for the weekly chart.
  const chartData = getWeekDays(weekStart).map((iso) => {
    const dayTasks = weekTasks.filter((t) => t.date === iso);
    const done = dayTasks.filter((t) => t.status === "completed").length;
    return {
      label: formatDate(iso, { weekday: "short", month: undefined, day: undefined }),
      percent: dayTasks.length ? Math.round((done / dayTasks.length) * 100) : 0,
    };
  });
  const weeklyAvg =
    chartData.length > 0
      ? Math.round(chartData.reduce((s, d) => s + d.percent, 0) / chartData.length)
      : 0;

  return (
    <>
      <DashboardHeader />
      <PageContainer>
        {/* Stat cards */}
        {isLoading ? (
          <CardGridSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label={t("dash.todaysTasks")} value={stats.total} icon={ListTodo} />
            <StatCard
              label={t("dash.completed")}
              value={stats.completed}
              icon={CheckCircle2}
              accent="text-success"
            />
            <StatCard
              label={t("dash.remaining")}
              value={stats.remaining}
              icon={CircleDashed}
              accent="text-warning"
            />
            <StatCard
              label={t("dash.currentStreak")}
              value={`${bestStreak} ${t("dash.days")}`}
              icon={Flame}
              accent="text-warning"
            />
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-2">
          <ProgressCard
            title={t("dash.todaysCompletion")}
            percent={stats.completion}
            caption={`${stats.completed}/${stats.total} ${t("dash.done")}`}
          />
          <ProgressCard
            title={t("dash.thisWeek")}
            percent={weeklyAvg}
            caption={t("dash.avgDaily")}
          />
        </div>

        {/* Today's tasks + quick add */}
        <div>
          <SectionHeader
            title={t("dash.todaysTasks")}
            action={<AddTaskDialog defaultDate={today} sameDayTasks={todayTasks} />}
          />
          <div className="mt-3">
            <TaskList
              tasks={todayTasks}
              isLoading={isLoading}
              emptyTitle={t("dash.noTasksTitle")}
              emptyDescription={t("dash.noTasksDesc")}
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upcoming (tomorrow) */}
          <div>
            <SectionHeader
              title={t("dash.upcoming")}
              action={
                <Link
                  href="/tomorrow"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  {t("dash.planTomorrow")} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              }
            />
            <div className="mt-3">
              <TaskList
                tasks={tomorrowTasks}
                emptyTitle={t("dash.noUpcomingTitle")}
                emptyDescription={t("dash.noUpcomingDesc")}
              />
            </div>
          </div>

          {/* Weekly chart */}
          <div>
            <SectionHeader title={t("dash.weeklyProgress")} />
            <div className="mt-3">
              <CompletionChart data={chartData} title="" />
            </div>
          </div>
        </div>

        {/* Today's habits */}
        <div>
          <SectionHeader
            title={t("dash.todaysHabits")}
            action={
              <Link
                href="/habits"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                {t("dash.allHabits")} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            }
          />
          <div className="mt-3">
            {habits.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{t("dash.noHabitsTitle")}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {t("dash.noHabitsDesc")}
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {habits.slice(0, 3).map((h) => (
                  <HabitCard key={h.id} habit={h} onChanged={() => mutateHabits()} />
                ))}
              </div>
            )}
          </div>
        </div>
      </PageContainer>
    </>
  );
}
