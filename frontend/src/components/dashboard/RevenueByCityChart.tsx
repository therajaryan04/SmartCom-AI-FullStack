import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import type { CityRevenue } from "@/types/Dashboard";
import { fmtCurrency } from "@/utils/format";

const CHART_COLORS = [
  "var(--ocean-highlight)",
  "var(--ocean-accent)",
  "var(--ocean-highlight)",
  "var(--ocean-accent)",
  "var(--ocean-highlight)",
];

export function RevenueByCityChart({ data }: { data: CityRevenue[] }) {
  return (
    <div className="border border-border bg-surface/20 p-5">
      <div className="mb-4">
        <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Revenue by City
        </h4>
      </div>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
            <XAxis
              dataKey="code"
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
              width={54}
            />
            <Tooltip
              cursor={{ fill: "var(--color-muted)", opacity: 0.15 }}
              contentStyle={{
                background: "var(--color-popover)",
                border: "1px solid var(--color-border)",
                borderRadius: 6,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
              }}
              formatter={(v: number) => [fmtCurrency(v), "Revenue"]}
              labelFormatter={(l, payload) =>
                payload?.[0]?.payload?.city ?? l
              }
            />
            <Bar dataKey="revenue" radius={[2, 2, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} fillOpacity={0.7} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
