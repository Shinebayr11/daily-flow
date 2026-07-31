import type {
  Category,
  Mood,
  Priority,
  ReminderOffset,
  RepeatOption,
} from "@/types";

export const CATEGORIES: Category[] = [
  "Coding",
  "Study",
  "Work",
  "Health",
  "Exercise",
  "Personal",
  "Reading",
  "Other",
];

export const PRIORITIES: Priority[] = ["high", "medium", "low"];

export const REPEAT_OPTIONS: { value: RepeatOption; label: string }[] = [
  { value: "never", label: "Never" },
  { value: "daily", label: "Daily" },
  { value: "weekdays", label: "Weekdays" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

/** Reminder offsets in minutes before the task start time. */
export const REMINDER_OPTIONS: { value: ReminderOffset; label: string }[] = [
  { value: 0, label: "No reminder" },
  { value: 5, label: "5 min before" },
  { value: 10, label: "10 min before" },
  { value: 15, label: "15 min before" },
  { value: 30, label: "30 min before" },
  { value: 60, label: "1 hour before" },
];

/** Estimated-duration presets in minutes (Custom handled separately). */
export const DURATION_PRESETS: { value: number; label: string }[] = [
  { value: 15, label: "15 min" },
  { value: 30, label: "30 min" },
  { value: 45, label: "45 min" },
  { value: 60, label: "1 hour" },
  { value: 90, label: "1h 30m" },
  { value: 120, label: "2 hours" },
];

export const MOODS: Mood[] = ["Great", "Good", "Normal", "Tired", "Bad"];

/** Weekday keys, Monday-first (matches getWeekDays in lib/date). */
export const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
export const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** Available emoji icons for habits. */
export const HABIT_ICONS = [
  "💻", "📖", "💧", "🇬🇧", "🏃", "😴", "🧘", "🎯", "✍️", "🥗", "☀️", "🎸",
];

/** Category color map — used by CategoryBadge. Tailwind-safe static classes. */
export const CATEGORY_COLORS: Record<Category, string> = {
  Coding: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
  Study: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  Work: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  Health: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  Exercise: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  Personal: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  Reading: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Other: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};
