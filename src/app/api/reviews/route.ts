import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { DailyReview, type DailyReviewDoc } from "@/models/DailyReview";
import { getUserId, unauthorized, badRequest, serverError } from "@/lib/api";
import { serializeReview, type Lean } from "@/lib/serialize";
import { dailyReviewSchema } from "@/lib/validations";
import { dayRange, parseISODate } from "@/lib/date";

/**
 * GET /api/reviews
 *   ?date=yyyy-mm-dd  -> single review (or null)
 *   (no params)       -> recent reviews list
 */
export async function GET(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return unauthorized();

  try {
    await connectToDatabase();
    const date = req.nextUrl.searchParams.get("date");

    if (date) {
      const { start, end } = dayRange(date);
      const doc = await DailyReview.findOne({
        userId,
        date: { $gte: start, $lt: end },
      }).lean();
      return NextResponse.json(
        doc ? serializeReview(doc as Lean<DailyReviewDoc>) : null,
      );
    }

    const docs = await DailyReview.find({ userId }).sort({ date: -1 }).limit(30).lean();
    return NextResponse.json(
      docs.map((d) => serializeReview(d as Lean<DailyReviewDoc>)),
    );
  } catch (error) {
    console.error("GET /api/reviews", error);
    return serverError();
  }
}

/** POST /api/reviews — upsert the review for a given day. */
export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return unauthorized();

  try {
    const parsed = dailyReviewSchema.safeParse(await req.json());
    if (!parsed.success) return badRequest("Invalid review", parsed.error.flatten());
    const { date, ...rest } = parsed.data;

    await connectToDatabase();
    const doc = await DailyReview.findOneAndUpdate(
      { userId, date: parseISODate(date) },
      { $set: { ...rest, date: parseISODate(date) } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    ).lean();

    return NextResponse.json(
      serializeReview(doc as Lean<DailyReviewDoc>),
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/reviews", error);
    return serverError();
  }
}
