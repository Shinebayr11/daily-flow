import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

/** Resolve the current Clerk user id, or null if signed out. */
export async function getUserId(): Promise<string | null> {
  const { userId } = await auth();
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
