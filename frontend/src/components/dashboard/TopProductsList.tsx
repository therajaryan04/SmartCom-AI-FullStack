import type { TopProduct } from "@/types/Dashboard";
import { fmtCurrency, fmtPercent } from "@/utils/format";
import { cn } from "@/lib/utils";

export function TopProductsList({ items }: { items: TopProduct[] }) {
  return (
    <div className="border border-border bg-surface/20 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Top Products
        </h4>
        <button className="font-mono text-[10px] font-bold uppercase tracking-widest text-ocean-highlight hover:underline">
          View all →
        </button>
      </div>
      <ul className="space-y-3">
        {items.map((p, i) => {
          const positive = p.growthPct >= 0;
          return (
            <li
              key={p.sku}
              className="flex items-center justify-between gap-3 rounded-sm px-1 py-1 hover:bg-surface/50"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid size-9 shrink-0 place-items-center border border-border bg-surface font-mono text-[11px]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="truncate font-mono text-[10px] text-muted-foreground">
                    {p.sku}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="num text-sm">{fmtCurrency(p.revenue)}</p>
                <p
                  className={cn(
                    "num text-[10px]",
                    positive ? "text-ocean-highlight" : "text-destructive",
                  )}
                >
                  {fmtPercent(p.growthPct)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
