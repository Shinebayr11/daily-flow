"use client";

import useSWR from "swr";
import { fetcher, apiPut } from "@/lib/fetcher";
import type { WeeklyPlanDTO } from "@/types";
import { getWeekStart } from "@/lib/date";

export function useWeeklyPlan(weekStart: string = getWeekStart()) {
  const key = `/api/weekly-plan?weekStart=${weekStart}`;
  const { data, error, isLoading, mutate } = useSWR<WeeklyPlanDTO>(key, fetcher);
  return { plan: data, error, isLoading, mutate };
}

export async function saveWeeklyPlan(
  weekStartDate: string,
  goals: string[],
  taskIds: string[] = [],
): Promise<WeeklyPlanDTO> {
  return apiPut<WeeklyPlanDTO>("/api/weekly-plan", {
    weekStartDate,
    goals,
    taskIds,
  });
}
