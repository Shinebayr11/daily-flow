import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { Habit, type HabitDoc } from "@/models/Habit";
import {
  getUserId,
  unauthorized,
  badRequest,
  notFound,
  serverError,
} from "@/lib/api";
import { serializeHabit, type Lean } from "@/lib/serialize";
import { computeStreaks } from "@/lib/streak";
import { todayISO } from "@/lib/date";

// Per-user data — never prerender these at build time.
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

const toggleSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).default(todayISO()),
});

/**
 * POST /api/habits/:id/toggle
 * Toggle completion of a habit for a given day, then recompute streaks.
 */
export async function POST(req: NextRequest, { params }: Ctx) {
  const userId = await getUserId();
  if (!userId) return unauthorized();

  try {
    const { id } = await params;
    const parsed = toggleSchema.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) return badRequest("Invalid request", parsed.error.flatten());
    const { date } = parsed.data;

    await connectToDatabase();
    const habit = await Habit.findOne({ _id: id, userId });
    if (!habit) return notFound("Habit not found");

    const dates = new Set(habit.completedDates ?? []);
    if (dates.has(date)) dates.delete(date);
    else dates.add(date);

    const completedDates = [...dates].sort();
    const { currentStreak, bestStreak } = computeStreaks(completedDates);

    habit.completedDates = completedDates;
    habit.currentStreak = currentStreak;
    habit.bestStreak = Math.max(bestStreak, habit.bestStreak ?? 0);
    await habit.save();

    return NextResponse.json(
      serializeHabit(habit.toObject() as Lean<HabitDoc>),
    );
  } catch (error) {
    console.error("POST /api/habits/:id/toggle", error);
    return serverError();
  }
}
