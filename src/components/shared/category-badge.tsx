import { cn } from "@/lib/utils";
import { CATEGORY_COLORS } from "@/lib/constants";
import type { Category } from "@/types";

/** Colored pill for a task category. */
export function CategoryBadge({
  category,
  className,
}: {
  category: Category;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        CATEGORY_COLORS[category] ?? CATEGORY_COLORS.Other,
        className,
      )}
    >
      {category}
    </span>
  );
}
