"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Target, X } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWeeklyPlan, saveWeeklyPlan } from "@/hooks/use-weekly-plan";
import { useLanguage } from "@/lib/i18n";

interface GoalsEditorProps {
  weekStart: string;
}

/** Editable list of weekly goals, persisted to the WeeklyPlan document. */
export function GoalsEditor({ weekStart }: GoalsEditorProps) {
  const { t } = useLanguage();
  const { plan, mutate } = useWeeklyPlan(weekStart);
  const [goals, setGoals] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  // Signature of the last server state we synced, so a failed save (which
  // returns an empty shell with id "") can't wipe an optimistic edit.
  const syncedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!plan) return;
    const sig = `${plan.id}:${plan.goals.join("|")}`;
    // Ignore the empty shell (id ""); only sync real saved plans.
    if (!plan.id && goals.length > 0) return;
    if (syncedRef.current === sig) return;
    syncedRef.current = sig;
    setGoals(plan.goals);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan]);

  async function persist(next: string[]) {
    setSaving(true);
    try {
      await saveWeeklyPlan(weekStart, next, plan?.taskIds ?? []);
      await mutate();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save goals.");
    } finally {
      setSaving(false);
    }
  }

  function addGoal() {
    const value = draft.trim();
    if (!value) return;
    const next = [...goals, value];
    setGoals(next);
    setDraft("");
    void persist(next);
  }

  function removeGoal(index: number) {
    const next = goals.filter((_, i) => i !== index);
    setGoals(next);
    void persist(next);
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Target className="h-5 w-5 text-primary" />
          {t("week.goals")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addGoal();
              }
            }}
            placeholder={t("week.goalPlaceholder")}
          />
          <Button onClick={addGoal} disabled={saving} size="icon" aria-label="Add goal">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {goals.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("week.noGoals")}</p>
        ) : (
          <ul className="space-y-2">
            {goals.map((goal, i) => (
              <li
                key={`${goal}-${i}`}
                className="flex items-center justify-between rounded-lg border bg-background px-3 py-2 text-sm"
              >
                <span>{goal}</span>
                <button
                  type="button"
                  onClick={() => removeGoal(i)}
                  className="text-muted-foreground hover:text-destructive"
                  aria-label="Remove goal"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
