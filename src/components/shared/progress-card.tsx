import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProgressCardProps {
  title: string;
  /** 0..100 */
  percent: number;
  caption?: string;
  className?: string;
}

/** Card with a labelled progress bar; color shifts with completion. */
export function ProgressCard({ title, percent, caption, className }: ProgressCardProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(percent)));
  const barColor =
    clamped >= 80 ? "bg-success" : clamped >= 50 ? "bg-warning" : "bg-destructive";

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex items-end justify-between">
          <span className="text-3xl font-bold">{clamped}%</span>
          {caption && <span className="text-xs text-muted-foreground">{caption}</span>}
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full rounded-full transition-all", barColor)}
            style={{ width: `${clamped}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
