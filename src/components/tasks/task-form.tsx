"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react";
import { taskSchema, type TaskInput } from "@/lib/validations";
import {
  CATEGORIES,
  DURATION_PRESETS,
  PRIORITIES,
  REMINDER_OPTIONS,
  REPEAT_OPTIONS,
} from "@/lib/constants";
import { addMinutesToTime, durationBetween, timesOverlap } from "@/lib/date";
import { useLanguage } from "@/lib/i18n";
import type { ReminderOffset, TaskDTO } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskFormProps {
  defaultDate: string;
  /** Existing tasks on the same day, for the overlap warning. */
  sameDayTasks?: TaskDTO[];
  /** When editing, the task being edited (excluded from overlap checks). */
  editingId?: string;
  initialValues?: Partial<TaskInput>;
  submitLabel?: string;
  onSubmit: (values: TaskInput) => Promise<void>;
}

const PRIORITY_LABEL: Record<string, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

export function TaskForm({
  defaultDate,
  sameDayTasks = [],
  editingId,
  initialValues,
  submitLabel = "Save task",
  onSubmit,
}: TaskFormProps) {
  const { t } = useLanguage();
  const form = useForm<TaskInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      date: defaultDate,
      allDay: false,
      startTime: "",
      endTime: "",
      category: "Coding",
      priority: "medium",
      estimatedDuration: undefined,
      repeat: "never",
      reminderOffset: 0,
      isTopPriority: false,
      ...initialValues,
    },
  });

  const [submitting, setSubmitting] = useState(false);
  // Whether the user picked "Custom" duration (shows a free number input).
  const [customDuration, setCustomDuration] = useState(
    !!initialValues?.estimatedDuration &&
      !DURATION_PRESETS.some((p) => p.value === initialValues.estimatedDuration),
  );

  const allDay = form.watch("allDay");
  const startTime = form.watch("startTime");
  const endTime = form.watch("endTime");
  const duration = form.watch("estimatedDuration");

  // Auto-compute end time when a start time + duration are both present.
  useEffect(() => {
    if (!allDay && startTime && duration) {
      form.setValue("endTime", addMinutesToTime(startTime, duration), {
        shouldValidate: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, duration, allDay]);

  // Overlap detection against other tasks on the same day (soft warning).
  const overlaps = useMemo(() => {
    if (allDay || !startTime || !endTime) return false;
    return sameDayTasks.some(
      (t) =>
        t.id !== editingId &&
        !t.allDay &&
        timesOverlap(startTime, endTime, t.startTime, t.endTime),
    );
  }, [allDay, startTime, endTime, sameDayTasks, editingId]);

  const computedDuration = durationBetween(startTime, endTime);

  async function handleSubmit(values: TaskInput) {
    try {
      setSubmitting(true);
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.title")}</FormLabel>
              <FormControl>
                <Input placeholder={t("form.titlePlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.description")}</FormLabel>
              <FormControl>
                <Textarea rows={2} placeholder={t("form.descPlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date + all-day */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>{t("form.date")}</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="allDay"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 pb-2.5">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(v) => field.onChange(Boolean(v))}
                  />
                </FormControl>
                <FormLabel className="!mt-0 cursor-pointer">{t("form.allDayTask")}</FormLabel>
              </FormItem>
            )}
          />
        </div>

        {/* Time pickers (hidden for all-day) */}
        {!allDay && (
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.startTime")}</FormLabel>
                  <FormControl>
                    <Input type="time" step={300} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.endTime")}</FormLabel>
                  <FormControl>
                    <Input type="time" step={300} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {/* Estimated duration */}
        {!allDay && (
          <FormField
            control={form.control}
            name="estimatedDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.duration")}</FormLabel>
                <Select
                  value={
                    customDuration
                      ? "custom"
                      : field.value
                        ? String(field.value)
                        : ""
                  }
                  onValueChange={(v) => {
                    if (v === "custom") {
                      setCustomDuration(true);
                      return;
                    }
                    setCustomDuration(false);
                    field.onChange(Number(v));
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("form.pickDuration")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {DURATION_PRESETS.map((d) => (
                      <SelectItem key={d.value} value={String(d.value)}>
                        {d.label}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">{t("form.custom")}</SelectItem>
                  </SelectContent>
                </Select>
                {customDuration && (
                  <Input
                    type="number"
                    min={5}
                    step={5}
                    placeholder={t("form.minutes")}
                    className="mt-2"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
                {computedDuration && !field.value && (
                  <p className="text-xs text-muted-foreground">
                    {t("form.fromTimes")}: {computedDuration} {t("form.minutes")}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Overlap warning — non-blocking */}
        {overlaps && (
          <div className="flex items-center gap-2 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-sm text-warning">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            {t("form.overlap")}
          </div>
        )}

        {/* Category + priority */}
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.category")}</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.priority")}</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PRIORITIES.map((p) => (
                      <SelectItem key={p} value={p}>
                        {PRIORITY_LABEL[p]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Repeat + reminder */}
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="repeat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.repeat")}</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {REPEAT_OPTIONS.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reminderOffset"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.reminder")}</FormLabel>
                <Select
                  value={String(field.value)}
                  onValueChange={(v) => field.onChange(Number(v) as ReminderOffset)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {REMINDER_OPTIONS.map((r) => (
                      <SelectItem key={r.value} value={String(r.value)}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Top priority */}
        <FormField
          control={form.control}
          name="isTopPriority"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(v) => field.onChange(Boolean(v))}
                />
              </FormControl>
              <FormLabel className="!mt-0 cursor-pointer">
                {t("form.topPriorityLabel")}
              </FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? t("common.saving") : submitLabel}
        </Button>
      </form>
    </Form>
  );
}
