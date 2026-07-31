import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Habit, type HabitDoc } from "@/models/Habit";
import { getUserId, unauthorized, badRequest, serverError } from "@/lib/api";
import { serializeHabit } from "@/lib/serialize";
import { habitSchema } from "@/lib/validations";

/** GET /api/habits — all habits for the current user. */
export async function GET() {
  const userId = await getUserId();
  if (!userId) return unauthorized();

  try {
    await connectToDatabase();
    const docs = await Habit.find({ userId }).sort({ createdAt: 1 }).lean();
    return NextResponse.json(
      docs.map((d) => serializeHabit(d as HabitDoc & { _id: string })),
    );
  } catch (error) {
    console.error("GET /api/habits", error);
    return serverError();
  }
}

/** POST /api/habits — create a habit. */
export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return unauthorized();

  try {
    const parsed = habitSchema.safeParse(await req.json());
    if (!parsed.success) return badRequest("Invalid habit", parsed.error.flatten());

    await connectToDatabase();
    const created = await Habit.create({ userId, ...parsed.data });
    return NextResponse.json(
      serializeHabit(created.toObject() as HabitDoc & { _id: string }),
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/habits", error);
    return serverError();
  }
}
