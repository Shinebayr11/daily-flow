"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { dailyReviewSchema, type DailyReviewInput } from "@/lib/validations";
import { MOODS } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n";
import { saveReview } from "@/hooks/use-reviews";
import type { DailyReviewDTO } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { StarRating } from "@/components/shared/star-rating";

interface DailyReviewFormProps {
  date: string;
  initial?: DailyReviewDTO | null;
  onSaved?: () => void;
}

// Review prompts — labels resolved via i18n at render.
const PROMPTS: { name: keyof DailyReviewInput; key: string }[] = [
  { name: "goodThings", key: "rev.q1" },
  { name: "unfinishedTasks", key: "rev.q2" },
  { name: "unfinishedReason", key: "rev.q3" },
  { name: "learnedToday", key: "rev.q4" },
  { name: "tomorrowPriority", key: "rev.q5" },
];

export function DailyReviewForm({ date, initial, onSaved }: DailyReviewFormProps) {
  const { t } = useLanguage();
  const form = useForm<DailyReviewInput>({
    resolver: zodResolver(dailyReviewSchema),
    defaultValues: {
      date,
      goodThings: initial?.goodThings ?? "",
      unfinishedTasks: initial?.unfinishedTasks ?? "",
      unfinishedReason: initial?.unfinishedReason ?? "",
      learnedToday: initial?.learnedToday ?? "",
      tomorrowPriority: initial?.tomorrowPriority ?? "",
      rating: initial?.rating ?? 0,
      mood: initial?.mood ?? "Normal",
    },
  });

  async function onSubmit(values: DailyReviewInput) {
    try {
      await saveReview(values);
      toast.success("Review saved. See you tomorrow 🌙");
      onSaved?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save review.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {PROMPTS.map((p) => (
          <FormField
            key={p.name}
            control={form.control}
            name={p.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t(p.key)}</FormLabel>
                <FormControl>
                  <Textarea
                    rows={2}
                    {...field}
                    value={typeof field.value === "string" ? field.value : ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Rating */}
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("rev.rating")}</FormLabel>
              <FormControl>
                <StarRating value={Number(field.value)} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mood — plain Controller (no FormField context needed) */}
        <Controller
          control={form.control}
          name="mood"
          render={({ field }) => (
            <div className="space-y-2">
              <Label>{t("rev.mood")}</Label>
              <div className="flex flex-wrap gap-2">
                {MOODS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => field.onChange(m)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                      field.value === m
                        ? "border-primary bg-primary text-primary-foreground"
                        : "hover:bg-muted",
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          )}
        />

        <Button type="submit" className="w-full sm:w-auto">
          {t("rev.saveBtn")}
        </Button>
      </form>
    </Form>
  );
}
