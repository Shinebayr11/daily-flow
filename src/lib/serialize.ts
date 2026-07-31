import { Types } from "mongoose";
import { toISODate } from "@/lib/date";
import type {
  Category,
  DailyReviewDTO,
  HabitDTO,
  Mood,
  Priority,
  ReminderOffset,
  RepeatOption,
  TaskDTO,
  TaskStatus,
  WeeklyPlanDTO,
} from "@/types";
import type { TaskDoc } from "@/models/Task";
import type { HabitDoc } from "@/models/Habit";
import type { WeeklyPlanDoc } from "@/models/WeeklyPlan";
import type { DailyReviewDoc } from "@/models/DailyReview";

// Lean Mongoose docs carry an ObjectId `_id` plus timestamps.
type Meta = { _id: Types.ObjectId | string; createdAt?: Date; updatedAt?: Date };

/**
 * Shape of a `.lean()` result for a given schema type.
 * Routes cast to this instead of `T & { _id: string }`, because lean() keeps
 * `_id` as an ObjectId — casting it to `string` makes TS reject the conversion.
 */
export type Lean<T> = T & Meta;

const idToString = (id: Types.ObjectId | string): string =>
  typeof id === "string" ? id : id.toString();

const iso = (d?: Date | null): string | undefined =>
  d ? toISODate(new Date(d)) : undefined;

export function serializeTask(doc: TaskDoc & Meta): TaskDTO {
  return {
    id: idToString(doc._id),
    userId: doc.userId,
    title: doc.title,
    description: doc.description ?? "",
    date: toISODate(new Date(doc.date)),
    startTime: doc.startTime ?? undefined,
    endTime: doc.endTime ?? undefined,
    allDay: Boolean(doc.allDay),
    category: doc.category as Category,
    priority: doc.priority as Priority,
    status: doc.status as TaskStatus,
    estimatedDuration: doc.estimatedDuration ?? undefined,
    repeat: doc.repeat as RepeatOption,
    reminderOffset: (doc.reminderOffset ?? 0) as ReminderOffset,
    isTopPriority: Boolean(doc.isTopPriority),
    completedAt: doc.completedAt ? new Date(doc.completedAt).toISOString() : undefined,
    createdAt: (doc.createdAt ?? new Date()).toISOString(),
    updatedAt: (doc.updatedAt ?? new Date()).toISOString(),
  };
}

export function serializeHabit(doc: HabitDoc & Meta): HabitDTO {
  return {
    id: idToString(doc._id),
    userId: doc.userId,
    name: doc.name,
    icon: doc.icon ?? "🎯",
    frequency: doc.frequency ?? [],
    currentStreak: doc.currentStreak ?? 0,
    bestStreak: doc.bestStreak ?? 0,
    completedDates: doc.completedDates ?? [],
    createdAt: (doc.createdAt ?? new Date()).toISOString(),
  };
}

export function serializeWeeklyPlan(doc: WeeklyPlanDoc & Meta): WeeklyPlanDTO {
  return {
    id: idToString(doc._id),
    userId: doc.userId,
    weekStartDate: toISODate(new Date(doc.weekStartDate)),
    goals: doc.goals ?? [],
    taskIds: doc.taskIds ?? [],
    createdAt: (doc.createdAt ?? new Date()).toISOString(),
  };
}

export function serializeReview(doc: DailyReviewDoc & Meta): DailyReviewDTO {
  return {
    id: idToString(doc._id),
    userId: doc.userId,
    date: iso(doc.date) ?? "",
    goodThings: doc.goodThings ?? "",
    unfinishedTasks: doc.unfinishedTasks ?? "",
    unfinishedReason: doc.unfinishedReason ?? "",
    learnedToday: doc.learnedToday ?? "",
    tomorrowPriority: doc.tomorrowPriority ?? "",
    rating: doc.rating ?? 3,
    mood: doc.mood as Mood,
    createdAt: (doc.createdAt ?? new Date()).toISOString(),
  };
}
