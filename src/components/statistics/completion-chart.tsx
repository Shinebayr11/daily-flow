"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface CompletionDatum {
  label: string;
  percent: number;
}

interface CompletionChartProps {
  title?: string;
  data: CompletionDatum[];
}

/**
 * Weekly / period completion bar chart (Recharts).
 * Colors use literal hex values because Recharts writes SVG fill attributes,
 * which don't resolve CSS `var()`.
 */
export function CompletionChart({ title = "Weekly progress", data }: CompletionChartProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 50% / 0.15)" vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                fontSize={12}
                stroke="hsl(0 0% 50%)"
              />
              <YAxis
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                fontSize={12}
                stroke="hsl(0 0% 50%)"
                tickFormatter={(v: number) => `${v}%`}
              />
              <Tooltip
                cursor={{ fill: "hsl(0 0% 50% / 0.08)" }}
                formatter={(v: number) => [`${v}%`, "Completion"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid hsl(0 0% 50% / 0.2)",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="percent" fill="#6366f1" radius={[6, 6, 0, 0]} maxBarSize={44} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
