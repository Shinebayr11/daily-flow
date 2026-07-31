import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Task } from "@/models/Task";
import { Habit } from "@/models/Habit";
import { WeeklyPlan } from "@/models/WeeklyPlan";
import { getUserId, unauthorized, serverError } from "@/lib/api";
import { buildDemoData } from "@/lib/demo-data";

/**
 * POST /api/seed — populate demo data for the signed-in user.
 * Skips seeding if the user already has tasks (avoids duplicates).
 */
export async function POST() {
  const userId = await getUserId();
  if (!userId) return unauthorized();

  try {
    await connectToDatabase();
    const existing = await Task.countDocuments({ userId });
    if (existing > 0) {
      return NextResponse.json(
        { seeded: false, message: "You already have tasks — nothing seeded." },
        { status: 200 },
      );
    }

    const { tasks, habits, weeklyPlan } = buildDemoData(userId);
    await Task.insertMany(tasks);
    await Habit.insertMany(habits);
    await WeeklyPlan.updateOne(
      { userId, weekStartDate: weeklyPlan.weekStartDate },
      { $set: weeklyPlan },
      { upsert: true },
    );

    return NextResponse.json({
      seeded: true,
      tasks: tasks.length,
      habits: habits.length,
    });
  } catch (error) {
    console.error("POST /api/seed", error);
    return serverError();
  }
}
