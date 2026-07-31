import { z } from "zod";
import { timeToMinutes } from "@/lib/date";

const HHMM = /^([01]\d|2[0-3]):[0-5]\d$/;

// ---- Task ----
export const taskSchema = z
  .object({
    title: z.string().trim().min(1, "Task title is required").max(120),
    description: z.string().trim().max(1000).optional().or(z.literal("")),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date"),
    allDay: z.boolean(),
    startTime: z
      .string()
      .regex(HHMM, "Use 24h format, e.g. 09:00")
      .optional()
      .or(z.literal("")),
    endTime: z
      .string()
      .regex(HHMM, "Use 24h format, e.g. 10:30")
      .optional()
      .or(z.literal("")),
    category: z.enum([
      "Coding",
      "Study",
      "Work",
      "Health",
      "Exercise",
      "Personal",
      "Reading",
      "Other",
    ]),
    priority: z.enum(["high", "medium", "low"]),
    estimatedDuration: z.number().int().positive().max(1440).optional(),
    repeat: z.enum(["never", "daily", "weekdays", "weekly", "monthly"]),
    reminderOffset: z.union([
      z.literal(0),
      z.literal(5),
      z.literal(10),
      z.literal(15),
      z.literal(30),
      z.literal(60),
    ]),
    isTopPriority: z.boolean(),
  })
  // End time must be after start time (only when both provided & not all-day).
  .refine(
    (d) =>
      d.allDay ||
      !d.startTime ||
      !d.endTime ||
      timeToMinutes(d.endTime) > timeToMinutes(d.startTime),
    { path: ["endTime"], message: "End time must be after the start time" },
  );

export type TaskInput = z.infer<typeof taskSchema>;

// Partial schema for PATCH updates (status toggles, reschedules, etc.).
export const taskUpdateSchema = z.object({
  title: z.string().trim().min(1).max(120).optional(),
  description: z.string().trim().max(1000).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  allDay: z.boolean().optional(),
  startTime: z.string().regex(HHMM).optional().or(z.literal("")),
  endTime: z.string().regex(HHMM).optional().or(z.literal("")),
  category: z.string().optional(),
  priority: z.enum(["high", "medium", "low"]).optional(),
  status: z.enum(["pending", "completed", "missed"]).optional(),
  estimatedDuration: z.coerce.number().int().positive().max(1440).optional(),
  repeat: z.enum(["never", "daily", "weekdays", "weekly", "monthly"]).optional(),
  reminderOffset: z.number().optional(),
  isTopPriority: z.boolean().optional(),
});

// ---- Habit ----
export const habitSchema = z.object({
  name: z.string().trim().min(1, "Habit name is required").max(60),
  icon: z.string().min(1).default("🎯"),
  frequency: z.array(z.string()).default([]),
});
export type HabitInput = z.infer<typeof habitSchema>;

// ---- Weekly plan ----
export const weeklyPlanSchema = z.object({
  weekStartDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  goals: z.array(z.string().trim().min(1)).default([]),
  taskIds: z.array(z.string()).default([]),
});
export type WeeklyPlanInput = z.infer<typeof weeklyPlanSchema>;

// ---- Daily review ----
export const dailyReviewSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  goodThings: z.string().trim().max(2000),
  unfinishedTasks: z.string().trim().max(2000),
  unfinishedReason: z.string().trim().max(2000),
  learnedToday: z.string().trim().max(2000),
  tomorrowPriority: z.string().trim().max(2000),
  rating: z.number().int().min(1, "Give today a rating").max(5),
  mood: z.enum(["Great", "Good", "Normal", "Tired", "Bad"]),
});
export type DailyReviewInput = z.infer<typeof dailyReviewSchema>;
