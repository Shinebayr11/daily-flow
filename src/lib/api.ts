import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { isAllowedUser } from "@/lib/allowlist";

/**
 * Resolve the current Clerk user id, or null if signed out.
 *
 * Also returns null for a signed-in user who is not on `ALLOWED_EMAILS`, so
 * every route that already guards with `if (!userId) return unauthorized()`
 * is covered by the allowlist without any further change.
 */
export async function getUserId(): Promise<string | null> {
  const { userId } = await auth();
  if (!userId) return null;
  if (!(await isAllowedUser())) return null;
  return userId;
}

export const unauthorized = () =>
  NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export const badRequest = (message: string, details?: unknown) =>
  NextResponse.json({ error: message, details }, { status: 400 });

export const notFound = (message = "Not found") =>
  NextResponse.json({ error: message }, { status: 404 });

export const serverError = (message = "Something went wrong") =>
  NextResponse.json({ error: message }, { status: 500 });
