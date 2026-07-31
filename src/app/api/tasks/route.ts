import { NextRequest, NextResponse } from "next/server";
import type { FilterQuery } from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { Task, type TaskDoc } from "@/models/Task";
import { getUserId, unauthorized, badRequest, serverError } from "@/lib/api";
import { serializeTask } from "@/lib/serialize";
import { taskSchema } from "@/lib/validations";
import { dayRange, parseISODate } from "@/lib/date";

/**
 * GET /api/tasks
 * Query params (all optional):
 *   date=yyyy-mm-dd        single day
 *   from=yyyy-mm-dd&to=... inclusive range (to is exclusive-day handled here)
 *   status=pending|completed|missed
 */
export async function GET(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return unauthorized();

  try {
    await connectToDatabase();
    const { searchParams } = req.nextUrl;
    const filter: FilterQuery<TaskDoc> = { userId };

    const date = searchParams.get("date");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const status = searchParams.get("status");

    if (date) {
      const { start, end } = dayRange(date);
      filter.date = { $gte: start, $lt: end };
    } else if (from && to) {
      filter.date = { $gte: parseISODate(from), $lt: dayRange(to).end };
    }
    if (status) filter.status = status;

    const docs = await Task.find(filter).sort({ date: 1, startTime: 1 }).lean();
    return NextResponse.json(docs.map((d) => serializeTask(d as TaskDoc & { _id: string })));
  } catch (error) {
    console.error("GET /api/tasks", error);
    return serverError();
  }
}

/** POST /api/tasks — create a task for the current user. */
export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return unauthorized();

  try {
    const body = await req.json();
    const parsed = taskSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest("Invalid task", parsed.error.flatten());
    }
    const d = parsed.data;

    await connectToDatabase();
    const created = await Task.create({
      userId,
      title: d.title,
      description: d.description || "",
      date: parseISODate(d.date),
      allDay: d.allDay,
      startTime: d.allDay ? undefined : d.startTime || undefined,
      endTime: d.allDay ? undefined : d.endTime || undefined,
      category: d.category,
      priority: d.priority,
      status: "pending",
      estimatedDuration: d.estimatedDuration,
      repeat: d.repeat,
      reminderOffset: d.reminderOffset,
      isTopPriority: d.isTopPriority,
    });

    return NextResponse.json(
      serializeTask(created.toObject() as TaskDoc & { _id: string }),
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/tasks", error);
    return serverError();
  }
}
