// Shared domain types used across client + server. No `any` anywhere.

export type Priority = "high" | "medium" | "low";
export type TaskStatus = "pending" | "completed" | "missed";
export type Category =
  | "Coding"
  | "Study"
  | "Work"
  | "Health"
  | "Exercise"
  | "Personal"
  | "Reading"
  | "Other";
export type RepeatOption = "never" | "daily" | "weekdays" | "weekly" | "monthly";
export type Mood = "Great" | "Good" | "Normal" | "Tired" | "Bad";

/** Minutes-before-start reminder options (0 = none). */
export type ReminderOffset = 0 | 5 | 10 | 15 | 30 | 60;

/**
 * A task as returned by the API — Mongo `_id` is serialized to a string `id`
 * and dates come back as ISO strings, so the client never touches ObjectId.
 */
export interface TaskDTO {
  id: string;
  userId: string;
  title: string;
  description?: string;
  date: string; // ISO date (yyyy-mm-dd anchored)
  startTime?: string; // "HH:mm"
  endTime?: string; // "HH:mm"
  allDay: boolean;
  category: Category;
  priority: Priority;
  status: TaskStatus;
  estimatedDuration?: number; // minutes
  repeat: RepeatOption;
  reminderOffset: ReminderOffset;
  isTopPriority: boolean;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HabitDTO {
  id: string;
  userId: string;
  name: string;
  icon: string;
  frequency: string[]; // weekday keys the habit is active on
  currentStreak: number;
  bestStreak: number;
  completedDates: string[]; // ISO dates
  createdAt: string;
}

export interface WeeklyPlanDTO {
  id: string;
  userId: string;
  weekStartDate: string; // Monday, ISO
  goals: string[];
  taskIds: string[];
  createdAt: string;
}

export interface DailyReviewDTO {
  id: string;
  userId: string;
  date: string;
  goodThings: string;
  unfinishedTasks: string;
  unfinishedReason: string;
  learnedToday: string;
  tomorrowPriority: string;
  rating: number; // 1..5
  mood: Mood;
  createdAt: string;
}
