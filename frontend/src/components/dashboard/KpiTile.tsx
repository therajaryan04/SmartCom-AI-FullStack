import { motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { fmtPercent } from "@/utils/format";
import type { KpiMetric } from "@/types/Dashboard";

export function KpiTile({
  metric,
  delay = 0,
}: {
  metric: KpiMetric;
  delay?: number;
}) {
  const isDanger = metric.intent === "danger";
  const Icon =
    metric.trend === "up"
      ? ArrowUpRight
      : metric.trend === "down"
      ? ArrowDownRight
      : Minus;
  const trendColor =
    metric.trend === "up"
      ? "text-ocean-highlight"
      : metric.trend === "down"
      ? "text-destructive"
      : "text-muted-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative overflow-hidden border bg-surface/40 p-4 transition-colors",
        isDanger
          ? "border-destructive/40 hover:bg-destructive/5"
          : "border-border hover:border-ocean-highlight/40",
      )}
    >
      <p
        className={cn(
          "font-mono text-[10px] font-bold uppercase tracking-widest",
          isDanger ? "text-destructive" : "text-muted-foreground",
        )}
      >
        {metric.label}
      </p>
      <p className="mt-2 num text-xl font-bold tracking-tight text-foreground">
        {metric.formatted}
      </p>
      <div
        className={cn(
          "mt-1 flex items-center gap-1 font-mono text-[10px]",
          trendColor,
        )}
      >
        <Icon className="size-3" />
        <span>{fmtPercent(metric.deltaPct)}</span>
      </div>
    </motion.div>
  );
}
