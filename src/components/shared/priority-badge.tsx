import { cn } from "@/lib/utils";
import type { Priority } from "@/types";

const STYLES: Record<Priority, string> = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium:
    "bg-warning/10 text-warning border-warning/20 dark:text-warning",
  low: "bg-success/10 text-success border-success/20 dark:text-success",
};

const LABELS: Record<Priority, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

/** Colored pill for a task's priority (red / orange / green). */
export function PriorityBadge({
  priority,
  className,
}: {
  priority: Priority;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        STYLES[priority],
        className,
      )}
    >
      {LABELS[priority]}
    </span>
  );
}
