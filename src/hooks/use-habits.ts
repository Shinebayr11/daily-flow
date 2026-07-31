"use client";

import useSWR from "swr";
import { fetcher, apiPost, apiPatch, apiDelete } from "@/lib/fetcher";
import type { HabitDTO } from "@/types";
import type { HabitInput } from "@/lib/validations";

const HABITS_KEY = "/api/habits";

export function useHabits() {
  const { data, error, isLoading, mutate } = useSWR<HabitDTO[]>(HABITS_KEY, fetcher);
  return { habits: data ?? [], error, isLoading, mutate };
}

export async function createHabit(input: HabitInput): Promise<HabitDTO> {
  const habit = await apiPost<HabitDTO>(HABITS_KEY, input);
  return habit;
}

export async function toggleHabit(id: string, date: string): Promise<HabitDTO> {
  return apiPost<HabitDTO>(`${HABITS_KEY}/${id}/toggle`, { date });
}

export async function updateHabit(
  id: string,
  patch: Partial<Pick<HabitDTO, "name" | "icon" | "frequency">>,
): Promise<HabitDTO> {
  return apiPatch<HabitDTO>(`${HABITS_KEY}/${id}`, patch);
}

export async function deleteHabit(id: string): Promise<void> {
  await apiDelete(`${HABITS_KEY}/${id}`);
}
