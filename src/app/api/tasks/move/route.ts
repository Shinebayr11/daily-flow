import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { Task } from "@/models/Task";
import { getUserId, unauthorized, badRequest, serverError } from "@/lib/api";
import { parseISODate } from "@/lib/date";

const moveSchema = z.object({
  ids: z.array(z.string()).min(1, "Select at least one task"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

/**
 * POST /api/tasks/move
 * Bulk-reschedule tasks to `date` and reset them to pending.
 * Used by the end-of-day "move incomplete tasks to tomorrow" flow.
 * Nothing moves without the user explicitly choosing the ids.
 */
export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return unauthorized();

  try {
    const parsed = moveSchema.safeParse(await req.json());
    if (!parsed.success) return badRequest("Invalid request", parsed.error.flatten());

    const { ids, date } = parsed.data;
    await connectToDatabase();
    const res = await Task.updateMany(
      { _id: { $in: ids }, userId },
      { $set: { date: parseISODate(date), status: "pending", completedAt: undefined } },
    );

    return NextResponse.json({ moved: res.modifiedCount });
  } catch (error) {
    console.error("POST /api/tasks/move", error);
    return serverError();
  }
}
