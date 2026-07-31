import { NextRequest, NextResponse } from "next/server";
import type { UpdateQuery } from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { Task, type TaskDoc } from "@/models/Task";
import {
  getUserId,
  unauthorized,
  badRequest,
  notFound,
  serverError,
} from "@/lib/api";
import { serializeTask, type Lean } from "@/lib/serialize";
import { taskUpdateSchema } from "@/lib/validations";
import { parseISODate } from "@/lib/date";

type Ctx = { params: Promise<{ id: string }> };

/** PATCH /api/tasks/:id — edit fields, toggle completion, reschedule/move. */
export async function PATCH(req: NextRequest, { params }: Ctx) {
  const userId = await getUserId();
  if (!userId) return unauthorized();

  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = taskUpdateSchema.safeParse(body);
    if (!parsed.success) return badRequest("Invalid update", parsed.error.flatten());

    // Pull `date` out — it's a string on the wire but a Date in the model.
    const { date, ...rest } = parsed.data;
    const update: UpdateQuery<TaskDoc> = { ...rest };

    // Convert the date-only string to a Date when rescheduling / moving.
    if (date) update.date = parseISODate(date);

    // Keep completedAt in sync with the status transition.
    if (rest.status === "completed") update.completedAt = new Date();
    if (rest.status === "pending" || rest.status === "missed") {
      update.completedAt = undefined;
    }

    await connectToDatabase();
    const doc = await Task.findOneAndUpdate({ _id: id, userId }, update, {
      new: true,
    }).lean();

    if (!doc) return notFound("Task not found");
    return NextResponse.json(serializeTask(doc as Lean<TaskDoc>));
  } catch (error) {
    console.error("PATCH /api/tasks/:id", error);
    return serverError();
  }
}

/** DELETE /api/tasks/:id */
export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const userId = await getUserId();
  if (!userId) return unauthorized();

  try {
    const { id } = await params;
    await connectToDatabase();
    const res = await Task.deleteOne({ _id: id, userId });
    if (res.deletedCount === 0) return notFound("Task not found");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/tasks/:id", error);
    return serverError();
  }
}
