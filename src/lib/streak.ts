import { addDaysISO, todayISO } from "@/lib/date";

/**
 * Compute current + best streaks from a set of completed ISO dates.
 * - currentStreak: consecutive days ending today (or yesterday, so an
 *   as-yet-uncompleted today doesn't break the streak).
 * - bestStreak: the longest consecutive run ever recorded.
 */
export function computeStreaks(completedDates: string[]): {
  currentStreak: number;
  bestStreak: number;
} {
  const set = new Set(completedDates);

  // Best streak: sort and walk, counting consecutive runs.
  const sorted = [...set].sort();
  let best = 0;
  let run = 0;
  let prev: string | null = null;
  for (const day of sorted) {
    run = prev && addDaysISO(prev, 1) === day ? run + 1 : 1;
    best = Math.max(best, run);
    prev = day;
  }

  // Current streak: count backwards from today (allow starting at yesterday).
  let current = 0;
  let cursor = set.has(todayISO()) ? todayISO() : addDaysISO(todayISO(), -1);
  while (set.has(cursor)) {
    current += 1;
    cursor = addDaysISO(cursor, -1);
  }

  return { currentStreak: current, bestStreak: Math.max(best, current) };
}
