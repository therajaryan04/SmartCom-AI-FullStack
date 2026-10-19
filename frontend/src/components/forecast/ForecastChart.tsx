import {
  Area,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ForecastPoint } from "@/types/Forecast";
import { fmtCurrency, fmtNumber } from "@/utils/format";

interface Props {
  data: ForecastPoint[];
  title: string;
  subtitle?: string;
  unit?: "currency" | "number";
  height?: number;
}

export function ForecastChart({
  data,
  title,
  subtitle,
  unit = "currency",
  height = 340,
}: Props) {
  const fmt = (v: number) => (unit === "currency" ? fmtCurrency(v, true) : fmtNumber(v, true));
  const forecastStart = data.find((d) => d.actual === null)?.period;

  return (
    <div className="border border-border bg-surface/20 p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold tracking-tight">{title}</h3>
          {subtitle && (
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex gap-4 text-[10px]">
          <span className="flex items-center gap-1.5 font-mono uppercase tracking-widest text-muted-foreground">
            <span className="size-2 rounded-full bg-ocean-accent" /> Actual
          </span>
          <span className="flex items-center gap-1.5 font-mono uppercase tracking-widest text-muted-foreground">
            <span className="size-2 rounded-full bg-ocean-highlight" /> Forecast
          </span>
          <span className="flex items-center gap-1.5 font-mono uppercase tracking-widest text-muted-foreground">
            <span className="size-2 rounded-sm bg-ocean-highlight/25" /> CI
          </span>
        </div>
      </div>

      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 12, left: -8, bottom: 0 }}>
            <defs>
              <linearGradient id="fcActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--ocean-accent)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--ocean-accent)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fcCi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--ocean-highlight)" stopOpacity={0.3} />
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
              tickFormatter={fmt}
              width={64}
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
                return [unit === "currency" ? fmtCurrency(value) : fmtNumber(value), String(name)];
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
              fill="url(#fcCi)"
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
              fill="url(#fcActual)"
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
