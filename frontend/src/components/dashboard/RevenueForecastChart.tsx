import {
  Area,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import type { RevenuePoint } from "@/types/Dashboard";
import { fmtCurrency } from "@/utils/format";

export function RevenueForecastChart({ data }: { data: RevenuePoint[] }) {
  const forecastStart = data.find((d) => d.actual === null)?.period;

  return (
    <div className="border border-border bg-surface/20 p-6">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold tracking-tight">
            Revenue Trend + Forecast
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Historical performance vs Prophet-modeled projection · CI 95%
          </p>
        </div>
        <div className="flex gap-4 text-[10px]">
          <span className="flex items-center gap-1.5 font-mono uppercase tracking-widest text-muted-foreground">
            <span className="size-2 rounded-full bg-ocean-accent" /> Actual
          </span>
          <span className="flex items-center gap-1.5 font-mono uppercase tracking-widest text-muted-foreground">
            <span className="size-2 rounded-full bg-ocean-highlight" /> Forecast
          </span>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 12, left: -8, bottom: 0 }}>
            <defs>
              <linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--ocean-accent)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--ocean-accent)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ciFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--ocean-highlight)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="var(--ocean-highlight)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="period"
              stroke="var(--color-muted-foreground)"
              tick={{ fontSize: 10, fontFamily: "var(--font-mono)" }}
              tickLine={false}
              axisLine={{ stroke: "var(--color-border)" }}
            />
            <YAxis
              stroke="var(--color-muted-foreground)"
              tick={{ fontSize: 10, fontFamily: "var(--font-mono)" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => fmtCurrency(v, true)}
              width={60}
            />
            <Tooltip
              cursor={{ stroke: "var(--ocean-highlight)", strokeDasharray: 3 }}
              contentStyle={{
                background: "var(--color-popover)",
                border: "1px solid var(--color-border)",
                borderRadius: 6,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
              }}
              formatter={(value, name) => {
                if (value == null || typeof value !== "number") return ["—", String(name)];
                return [fmtCurrency(value), String(name)];
              }}
            />
            {forecastStart && (
              <ReferenceLine
                x={forecastStart}
                stroke="var(--ocean-highlight)"
                strokeDasharray="4 4"
                strokeOpacity={0.5}
              />
            )}
            <Area
              type="monotone"
              dataKey="upper"
              stroke="none"
              fill="url(#ciFill)"
              activeDot={false}
              name="CI upper"
            />
            <Area
              type="monotone"
              dataKey="lower"
              stroke="none"
              fill="var(--color-background)"
              activeDot={false}
              name="CI lower"
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="var(--ocean-accent)"
              strokeWidth={2}
              fill="url(#actualFill)"
              name="Actual"
              connectNulls={false}
              dot={{ r: 2, fill: "var(--ocean-accent)" }}
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="var(--ocean-highlight)"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 3, fill: "var(--ocean-highlight)" }}
              activeDot={{ r: 5 }}
              name="Forecast"
              connectNulls={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
