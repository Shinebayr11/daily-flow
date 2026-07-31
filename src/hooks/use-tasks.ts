"use client";

import useSWR, { mutate as globalMutate } from "swr";
import { fetcher, apiPost, apiPatch, apiDelete } from "@/lib/fetcher";
import type { Priority, RepeatOption, TaskDTO, TaskStatus } from "@/types";
import type { TaskInput } from "@/lib/validations";

const TASKS_KEY = "/api/tasks";

export type TaskPatch = Partial<{
  title: string;
  description: string;
  date: string;
  allDay: boolean;
  startTime: string;
  endTime: string;
  category: string;
  priority: Priority;
  status: TaskStatus;
  estimatedDuration: number;
  repeat: RepeatOption;
  reminderOffset: number;
  isTopPriority: boolean;
}>;

export interface TaskQuery {
  date?: string;
  from?: string;
  to?: string;
  status?: TaskStatus;
}

/** Build a `/api/tasks?...` key from query params. */
export function tasksKey(params: TaskQuery = {}): string {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v) qs.set(k, v);
  const s = qs.toString();
  return s ? `${TASKS_KEY}?${s}` : TASKS_KEY;
}

/** Read tasks for a day / range / status. */
export function useTasks(params: TaskQuery = {}) {
  const { data, error, isLoading, mutate } = useSWR<TaskDTO[]>(
    tasksKey(params),
    fetcher,
  );
  return { tasks: data ?? [], error, isLoading, mutate };
}

/** Revalidate every task query (any params) after a mutation. */
export function revalidateTasks() {
  return globalMutate(
    (key) => typeof key === "string" && key.startsWith(TASKS_KEY),
  );
}

export async function createTask(input: TaskInput): Promise<TaskDTO> {
  const task = await apiPost<TaskDTO>(TASKS_KEY, input);
  await revalidateTasks();
  return task;
}

export async function updateTask(id: string, patch: TaskPatch): Promise<TaskDTO> {
  const task = await apiPatch<TaskDTO>(`${TASKS_KEY}/${id}`, patch);
  await revalidateTasks();
  return task;
}

export async function toggleTaskComplete(task: TaskDTO): Promise<TaskDTO> {
  return updateTask(task.id, {
    status: task.status === "completed" ? "pending" : "completed",
  });
}

export async function deleteTask(id: string): Promise<void> {
  await apiDelete(`${TASKS_KEY}/${id}`);
  await revalidateTasks();
}

export async function moveTasks(ids: string[], date: string): Promise<void> {
  await apiPost(`${TASKS_KEY}/move`, { ids, date });
  await revalidateTasks();
}
