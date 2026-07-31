"use client";

import useSWR from "swr";
import { fetcher, apiPost } from "@/lib/fetcher";
import type { DailyReviewDTO } from "@/types";
import type { DailyReviewInput } from "@/lib/validations";
import { todayISO } from "@/lib/date";

/** The review for a single day (null if none saved yet). */
export function useReview(date: string = todayISO()) {
  const { data, error, isLoading, mutate } = useSWR<DailyReviewDTO | null>(
    `/api/reviews?date=${date}`,
    fetcher,
  );
  return { review: data ?? null, error, isLoading, mutate };
}

/** Recent reviews (most recent first). */
export function useReviews() {
  const { data, error, isLoading, mutate } = useSWR<DailyReviewDTO[]>(
    "/api/reviews",
    fetcher,
  );
  return { reviews: data ?? [], error, isLoading, mutate };
}

export async function saveReview(input: DailyReviewInput): Promise<DailyReviewDTO> {
  return apiPost<DailyReviewDTO>("/api/reviews", input);
}
