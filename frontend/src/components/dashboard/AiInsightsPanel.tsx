import { Sparkles } from "lucide-react";
import type { AiInsight } from "@/types/Dashboard";

const TYPE_LABEL: Record<AiInsight["type"], string> = {
  demand: "Demand Spike",
  margin: "Margin Risk",
  restock: "Restock",
  trend: "Trend",
};

const TYPE_COLOR: Record<AiInsight["type"], string> = {
  demand: "text-ocean-highlight",
  margin: "text-destructive",
  restock: "text-ocean-accent",
  trend: "text-foreground",
};

export function AiInsightsPanel({ insights }: { insights: AiInsight[] }) {
  return (
    <div className="relative overflow-hidden border border-ocean-highlight/30 bg-surface p-5">
      <div className="absolute right-0 top-0 bg-ocean-highlight px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-ocean-deep">
        Live AI
      </div>
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="size-4 text-ocean-highlight" />
        <h3 className="text-sm font-bold tracking-tight">AI Insights</h3>
      </div>
      <ul className="space-y-3">
        {insights.map((i) => (
          <li
            key={i.id}
            className="border border-border bg-background/40 p-3"
          >
            <p className={`font-mono text-[10px] font-bold uppercase tracking-widest ${TYPE_COLOR[i.type]}`}>
              {TYPE_LABEL[i.type]}
            </p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-foreground/85">
              {i.message}
            </p>
            {i.actionLabel && (
              <button className="mt-2 border border-ocean-highlight/40 bg-ocean-highlight/10 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-ocean-highlight hover:bg-ocean-highlight/20">
                {i.actionLabel}
              </button>
            )}
          </li>
        ))}
      </ul>
      <button className="mt-4 w-full border border-border py-2 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-ocean-highlight hover:text-ocean-deep transition-colors">
        Full report
      </button>
    </div>
  );
}
