import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { WeeklyPlan, type WeeklyPlanDoc } from "@/models/WeeklyPlan";
import { getUserId, unauthorized, badRequest, serverError } from "@/lib/api";
import { serializeWeeklyPlan, type Lean } from "@/lib/serialize";
import { weeklyPlanSchema } from "@/lib/validations";
import { getWeekStart, parseISODate } from "@/lib/date";

/** GET /api/weekly-plan?weekStart=yyyy-mm-dd (defaults to current week). */
export async function GET(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return unauthorized();

  try {
    const weekStart = req.nextUrl.searchParams.get("weekStart") ?? getWeekStart();
    await connectToDatabase();
    const doc = await WeeklyPlan.findOne({
      userId,
      weekStartDate: parseISODate(weekStart),
    }).lean();

    // Return an empty shell so the client always has a shape to render.
    if (!doc) {
      return NextResponse.json({
        id: "",
        userId,
        weekStartDate: weekStart,
        goals: [],
        taskIds: [],
        createdAt: new Date().toISOString(),
      });
    }
    return NextResponse.json(serializeWeeklyPlan(doc as Lean<WeeklyPlanDoc>));
  } catch (error) {
    console.error("GET /api/weekly-plan", error);
    return serverError();
  }
}

/** PUT /api/weekly-plan — upsert the plan (goals + linked tasks) for a week. */
export async function PUT(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return unauthorized();

  try {
    const parsed = weeklyPlanSchema.safeParse(await req.json());
    if (!parsed.success) return badRequest("Invalid plan", parsed.error.flatten());
    const { weekStartDate, goals, taskIds } = parsed.data;

    await connectToDatabase();
    const doc = await WeeklyPlan.findOneAndUpdate(
      { userId, weekStartDate: parseISODate(weekStartDate) },
      { $set: { goals, taskIds } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    ).lean();

    return NextResponse.json(
      serializeWeeklyPlan(doc as Lean<WeeklyPlanDoc>),
    );
  } catch (error) {
    console.error("PUT /api/weekly-plan", error);
    return serverError();
  }
}
