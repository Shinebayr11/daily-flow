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
import { serializeHabit } from "@/lib/serialize";

type Ctx = { params: Promise<{ id: string }> };

const patchSchema = z.object({
  name: z.string().trim().min(1).max(60).optional(),
  icon: z.string().min(1).optional(),
  frequency: z.array(z.string()).optional(),
});

/** PATCH /api/habits/:id — rename / change icon / frequency. */
export async function PATCH(req: NextRequest, { params }: Ctx) {
  const userId = await getUserId();
  if (!userId) return unauthorized();

  try {
    const { id } = await params;
    const parsed = patchSchema.safeParse(await req.json());
    if (!parsed.success) return badRequest("Invalid update", parsed.error.flatten());

    await connectToDatabase();
    const doc = await Habit.findOneAndUpdate({ _id: id, userId }, parsed.data, {
      new: true,
    }).lean();
    if (!doc) return notFound("Habit not found");
    return NextResponse.json(serializeHabit(doc as HabitDoc & { _id: string }));
  } catch (error) {
    console.error("PATCH /api/habits/:id", error);
    return serverError();
  }
}

/** DELETE /api/habits/:id */
export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const userId = await getUserId();
  if (!userId) return unauthorized();

  try {
    const { id } = await params;
    await connectToDatabase();
    const res = await Habit.deleteOne({ _id: id, userId });
    if (res.deletedCount === 0) return notFound("Habit not found");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/habits/:id", error);
    return serverError();
  }
}
