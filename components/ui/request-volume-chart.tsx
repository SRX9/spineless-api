// --- RequestVolumeChart component ---
import React from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import type { ApiRequestLog } from "@/app/dashboard/page";

export function RequestVolumeChart({ logs }: { logs: ApiRequestLog[] }) {
  // Group logs by day
  const data = React.useMemo(() => {
    if (!logs || logs.length === 0) return [];
    // Sort logs by request_time ascending
    const sorted = [...logs].sort(
      (a, b) => new Date(a.request_time).getTime() - new Date(b.request_time).getTime()
    );
    // Group by day
    const buckets: { [date: string]: number } = {};
    sorted.forEach((log) => {
      const date = new Date(log.request_time);
      if (isNaN(date.getTime())) return;
      // Format: YYYY-MM-DD
      const label = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date
        .getDate()
        .toString()
        .padStart(2, "0")}`;
      buckets[label] = (buckets[label] || 0) + 1;
    });
    // Convert to array for recharts
    return Object.entries(buckets).map(([date, count]) => ({ date, count }));
  }, [logs]);

  if (!data.length) {
    return (
      <div className="h-[350px] flex items-center justify-center text-muted-foreground">
        No data
      </div>
    );
  }

  return (
    <ChartContainer
      id="request-volume"
      config={{ count: { color: "#6b9080" } }} // Ghibli-inspired green
      className="h-full w-full"
    >
      <RechartsPrimitive.BarChart
        data={data}
        margin={{ top: 16, right: 16, left: 8, bottom: 24 }}
      >
        <defs>
          <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-count)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-count)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <RechartsPrimitive.CartesianGrid vertical={false} />
        <RechartsPrimitive.XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          angle={-30}
          textAnchor="end"
          height={60}
          tickMargin={8}
        />
        <RechartsPrimitive.YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <RechartsPrimitive.Bar
          dataKey="count"
          fill="url(#fillCount)"
          stroke="var(--color-count)"
          radius={[4, 4, 0, 0]}
        />
      </RechartsPrimitive.BarChart>
    </ChartContainer>
  );
}
