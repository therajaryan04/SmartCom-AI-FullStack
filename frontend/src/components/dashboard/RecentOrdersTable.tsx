import type { OrderStatus, RecentOrder } from "@/types/Dashboard";
import { fmtCurrency, fmtDate } from "@/utils/format";
import { cn } from "@/lib/utils";

const STATUS_STYLE: Record<OrderStatus, string> = {
  PENDING: "text-muted-foreground border-border bg-muted/20",
  PROCESSING: "text-ocean-accent border-ocean-accent/30 bg-ocean-accent/10",
  SHIPPED: "text-ocean-highlight border-ocean-highlight/30 bg-ocean-highlight/10",
  DELIVERED: "text-ocean-highlight border-ocean-highlight/30 bg-ocean-highlight/10",
  DELAYED: "text-destructive border-destructive/30 bg-destructive/10",
  CANCELLED: "text-destructive border-destructive/30 bg-destructive/10",
};

export function RecentOrdersTable({ orders }: { orders: RecentOrder[] }) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold tracking-tight">Recent Orders</h3>
        <button className="font-mono text-[10px] font-bold uppercase tracking-widest text-ocean-highlight hover:underline">
          Export data →
        </button>
      </div>
      <div className="overflow-x-auto border border-border bg-surface/20">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-surface/30 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <th className="p-3 font-bold">Order ID</th>
              <th className="p-3 font-bold">Customer</th>
              <th className="p-3 font-bold">Product</th>
              <th className="p-3 font-bold">Date</th>
              <th className="p-3 text-right font-bold">Amount</th>
              <th className="p-3 font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 text-sm">
            {orders.map((o) => (
              <tr key={o.id} className="transition-colors hover:bg-surface/40">
                <td className="p-3 font-mono text-xs">#{o.id}</td>
                <td className="p-3">{o.customer}</td>
                <td className="p-3 text-muted-foreground">{o.product}</td>
                <td className="p-3 font-mono text-xs text-muted-foreground">
                  {fmtDate(o.date)}
                </td>
                <td className="num p-3 text-right">{fmtCurrency(o.amount)}</td>
                <td className="p-3">
                  <span
                    className={cn(
                      "inline-block rounded-sm border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest",
                      STATUS_STYLE[o.status],
                    )}
                  >
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
