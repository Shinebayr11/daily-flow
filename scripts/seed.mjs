// Standalone demo-data seeder.
// Run with:  npm run seed     (needs SEED_USER_ID + MONGODB_URI in .env.local)
// Node 20.6+ loads .env.local via the "--env-file" flag in the npm script.

import mongoose from "mongoose";

const { MONGODB_URI, SEED_USER_ID } = process.env;

if (!MONGODB_URI) {
  console.error("✖ MONGODB_URI is missing. Add it to .env.local.");
  process.exit(1);
}
if (!SEED_USER_ID) {
  console.error(
    "✖ SEED_USER_ID is missing. Sign in once, copy your Clerk user id (user_...) into .env.local.",
  );
  process.exit(1);
}

// ---- Minimal schemas (mirror src/models) ----
const Task = mongoose.model(
  "Task",
  new mongoose.Schema(
    {
      userId: String,
      title: String,
      description: String,
      date: Date,
      startTime: String,
      endTime: String,
      allDay: Boolean,
      category: String,
      priority: String,
      status: String,
      estimatedDuration: Number,
      repeat: String,
      reminderOffset: Number,
      isTopPriority: Boolean,
      completedAt: Date,
    },
    { timestamps: true },
  ),
);

const Habit = mongoose.model(
  "Habit",
  new mongoose.Schema(
    {
      userId: String,
      name: String,
      icon: String,
      frequency: [String],
      currentStreak: Number,
      bestStreak: Number,
      completedDates: [String],
    },
    { timestamps: true },
  ),
);

const WeeklyPlan = mongoose.model(
  "WeeklyPlan",
  new mongoose.Schema(
    { userId: String, weekStartDate: Date, goals: [String], taskIds: [String] },
    { timestamps: true },
  ),
);

// ---- Date helpers (local) ----
const iso = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};
const addDays = (base, n) => {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d;
};
const atMidnight = (isoStr) => new Date(`${isoStr}T00:00:00`);
const weekStart = () => {
  const d = new Date();
  const day = d.getDay();
  d.setDate(d.getDate() + (day === 0 ? -6 : 1 - day));
  return atMidnight(iso(d));
};

const today = new Date();

const TASKS = [
  ["SQL хичээл үзэх", 0, "09:00", "10:00", "Study", "high", 60, false, true],
  ["Next.js төсөл дээр ажиллах", 0, "10:30", "12:00", "Coding", "high", 90, false, false],
  ["Кодын алдаа засах", 0, "14:00", "15:00", "Coding", "medium", 60, false, true],
  ["Ном унших", 0, "20:00", "20:30", "Reading", "low", 30, false, false],
  ["Англи хэл давтах", 1, "08:00", "08:45", "Study", "medium", 45, true, false],
  ["Дасгал хийх", 1, "18:00", "18:45", "Exercise", "high", 45, true, false],
  ["Портфолио шинэчлэх", 1, "13:00", "14:30", "Work", "medium", 90, true, false],
  ["Багийн уулзалт", 3, "11:00", "12:00", "Work", "high", 60, false, false],
];

const HABITS = [
  ["Код бичих", "💻"],
  ["Ном унших", "📖"],
  ["Ус уух", "💧"],
  ["Дасгал хийх", "🏃"],
  ["Эрт унтах", "😴"],
];

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("→ Connected to MongoDB");

  await Promise.all([
    Task.deleteMany({ userId: SEED_USER_ID }),
    Habit.deleteMany({ userId: SEED_USER_ID }),
    WeeklyPlan.deleteMany({ userId: SEED_USER_ID }),
  ]);

  await Task.insertMany(
    TASKS.map(([title, off, s, e, cat, pri, dur, top, done]) => ({
      userId: SEED_USER_ID,
      title,
      description: "",
      date: atMidnight(iso(addDays(today, off))),
      startTime: s,
      endTime: e,
      allDay: false,
      category: cat,
      priority: pri,
      status: done ? "completed" : "pending",
      estimatedDuration: dur,
      repeat: "never",
      reminderOffset: 0,
      isTopPriority: top,
      completedAt: done ? new Date() : undefined,
    })),
  );

  await Habit.insertMany(
    HABITS.map(([name, icon], i) => {
      const dates =
        i < 3 ? [iso(addDays(today, -2)), iso(addDays(today, -1)), iso(today)] : [];
      return {
        userId: SEED_USER_ID,
        name,
        icon,
        frequency: [],
        completedDates: dates,
        currentStreak: dates.length,
        bestStreak: dates.length,
      };
    }),
  );

  await WeeklyPlan.create({
    userId: SEED_USER_ID,
    weekStartDate: weekStart(),
    goals: [
      "SQL-ийн 3 хичээл дуусгах",
      "Next.js dashboard хийх",
      "3 өдөр дасгал хийх",
      "Англи хэл 5 өдөр давтах",
    ],
    taskIds: [],
  });

  console.log(`✔ Seeded ${TASKS.length} tasks, ${HABITS.length} habits, 1 weekly plan.`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
