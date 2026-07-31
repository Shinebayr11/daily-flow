import { timeToMinutes } from "@/lib/date";
import type { Category, Priority, TaskDTO } from "@/types";

/** Sort tasks by start time; timed tasks first, then all-day/untimed. */
export function sortTasksByTime(tasks: TaskDTO[]): TaskDTO[] {
  return [...tasks].sort((a, b) => {
    const aHas = !a.allDay && !!a.startTime;
    const bHas = !b.allDay && !!b.startTime;
    if (aHas && bHas) return timeToMinutes(a.startTime!) - timeToMinutes(b.startTime!);
    if (aHas) return -1;
    if (bHas) return 1;
    return a.title.localeCompare(b.title);
  });
}

export interface TaskStats {
  total: number;
  completed: number;
  remaining: number;
  completion: number; // 0..100
}

/** Completion stats for a list of tasks. */
export function getTaskStats(tasks: TaskDTO[]): TaskStats {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const remaining = total - completed;
  const completion = total ? Math.round((completed / total) * 100) : 0;
  return { total, completed, remaining, completion };
}

/** Count tasks per category (for the statistics distribution chart). */
export function countByCategory(tasks: TaskDTO[]): Record<Category, number> {
  const base = {
    Coding: 0, Study: 0, Work: 0, Health: 0,
    Exercise: 0, Personal: 0, Reading: 0, Other: 0,
  } as Record<Category, number>;
  for (const t of tasks) base[t.category] += 1;
  return base;
}

/** Count tasks per priority. */
export function countByPriority(tasks: TaskDTO[]): Record<Priority, number> {
  const base = { high: 0, medium: 0, low: 0 } as Record<Priority, number>;
  for (const t of tasks) base[t.priority] += 1;
  return base;
}
