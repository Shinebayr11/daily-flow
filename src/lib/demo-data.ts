import { addDaysISO, getWeekStart, parseISODate, todayISO } from "@/lib/date";
import type { Category, Priority, RepeatOption } from "@/types";

interface DemoTaskSeed {
  title: string;
  dayOffset: number; // relative to today
  startTime?: string;
  endTime?: string;
  category: Category;
  priority: Priority;
  estimatedDuration?: number;
  isTopPriority?: boolean;
  completed?: boolean;
}

const DEMO_TASKS: DemoTaskSeed[] = [
  { title: "SQL хичээл үзэх", dayOffset: 0, startTime: "09:00", endTime: "10:00", category: "Study", priority: "high", estimatedDuration: 60, completed: true },
  { title: "Next.js төсөл дээр ажиллах", dayOffset: 0, startTime: "10:30", endTime: "12:00", category: "Coding", priority: "high", estimatedDuration: 90 },
  { title: "Кодын алдаа засах", dayOffset: 0, startTime: "14:00", endTime: "15:00", category: "Coding", priority: "medium", estimatedDuration: 60, completed: true },
  { title: "Ном унших", dayOffset: 0, startTime: "20:00", endTime: "20:30", category: "Reading", priority: "low", estimatedDuration: 30 },
  { title: "Англи хэл давтах", dayOffset: 1, startTime: "08:00", endTime: "08:45", category: "Study", priority: "medium", estimatedDuration: 45, isTopPriority: true },
  { title: "Дасгал хийх", dayOffset: 1, startTime: "18:00", endTime: "18:45", category: "Exercise", priority: "high", estimatedDuration: 45, isTopPriority: true },
  { title: "Портфолио шинэчлэх", dayOffset: 1, startTime: "13:00", endTime: "14:30", category: "Work", priority: "medium", estimatedDuration: 90, isTopPriority: true },
  { title: "Долоо хоногийн төлөвлөгөө хийх", dayOffset: 2, startTime: "09:00", endTime: "09:30", category: "Personal", priority: "low", estimatedDuration: 30 },
  { title: "Багийн уулзалт", dayOffset: 3, startTime: "11:00", endTime: "12:00", category: "Work", priority: "high", estimatedDuration: 60 },
];

const DEMO_HABITS = [
  { name: "Код бичих", icon: "💻" },
  { name: "Ном унших", icon: "📖" },
  { name: "Ус уух", icon: "💧" },
  { name: "Дасгал хийх", icon: "🏃" },
  { name: "Эрт унтах", icon: "😴" },
];

const DEMO_GOALS = [
  "SQL-ийн 3 хичээл дуусгах",
  "Next.js dashboard хийх",
  "3 өдөр дасгал хийх",
  "Англи хэл 5 өдөр давтах",
];

/** Build demo documents for a user. Dates are anchored to today. */
export function buildDemoData(userId: string) {
  const today = todayISO();

  const tasks = DEMO_TASKS.map((t) => ({
    userId,
    title: t.title,
    description: "",
    date: parseISODate(addDaysISO(today, t.dayOffset)),
    startTime: t.startTime,
    endTime: t.endTime,
    allDay: false,
    category: t.category,
    priority: t.priority,
    status: t.completed ? "completed" : "pending",
    estimatedDuration: t.estimatedDuration,
    repeat: "never" as RepeatOption,
    reminderOffset: 0,
    isTopPriority: Boolean(t.isTopPriority),
    completedAt: t.completed ? new Date() : undefined,
  }));

  // Give a couple of habits a small streak over the last few days.
  const habits = DEMO_HABITS.map((h, i) => {
    const completedDates =
      i < 3 ? [addDaysISO(today, -2), addDaysISO(today, -1), today] : [];
    return {
      userId,
      name: h.name,
      icon: h.icon,
      frequency: [],
      completedDates,
      currentStreak: completedDates.length,
      bestStreak: completedDates.length,
    };
  });

  const weeklyPlan = {
    userId,
    weekStartDate: parseISODate(getWeekStart()),
    goals: DEMO_GOALS,
    taskIds: [],
  };

  return { tasks, habits, weeklyPlan };
}
