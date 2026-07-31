import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Consistent page padding + max width for the main content area. */
export function PageContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl space-y-6 p-4 md:p-8", className)}>
      {children}
    </div>
  );
}

/** Small section heading with an optional action slot on the right. */
export function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold">{title}</h2>
      {action}
    </div>
  );
}
