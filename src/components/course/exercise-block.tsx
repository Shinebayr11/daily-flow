"use client";

import { ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface ExerciseBlockProps {
  title?: string;
  items: string[];
  /** Stable ids for each item, used as localStorage keys. */
  ids: string[];
  checkedIds: Set<string>;
  onToggle: (id: string) => void;
}

/**
 * Checklist of exercises. The lesson can only be marked complete once every
 * item here (across the whole lesson) is ticked.
 */
export function ExerciseBlock({
  title,
  items,
  ids,
  checkedIds,
  onToggle,
}: ExerciseBlockProps) {
  const doneCount = ids.filter((id) => checkedIds.has(id)).length;
  const allDone = doneCount === ids.length;

  return (
    <div
      className={cn(
        "rounded-xl border p-4 transition-colors",
        allDone ? "border-success/40 bg-success/5" : "bg-card",
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 font-semibold">
          <ClipboardCheck className={cn("h-5 w-5", allDone ? "text-success" : "text-primary")} />
          {title ?? "Дасгал"}
        </span>
        <span className="text-xs text-muted-foreground">
          {doneCount}/{ids.length}
        </span>
      </div>

      <ul className="space-y-2">
        {items.map((item, i) => {
          const id = ids[i];
          const checked = checkedIds.has(id);
          return (
            <li key={id}>
              <label className="flex cursor-pointer items-start gap-2.5 rounded-lg p-1.5 text-sm hover:bg-muted/60">
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => onToggle(id)}
                  className="mt-0.5"
                />
                <span className={cn(checked && "text-muted-foreground line-through")}>
                  {item}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
