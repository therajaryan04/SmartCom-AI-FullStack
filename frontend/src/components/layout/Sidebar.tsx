import { Link, useRouterState } from "@tanstack/react-router";
import { NAV_ITEMS } from "@/constants/nav";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const groups: { title: string | null; items: typeof NAV_ITEMS }[] = [
    { title: null, items: NAV_ITEMS.filter((i) => i.group === "main") },
    { title: "Analytics", items: NAV_ITEMS.filter((i) => i.group === "analytics") },
    { title: "System", items: NAV_ITEMS.filter((i) => i.group === "system") },
  ];

  let idx = 0;
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-ocean-deep">
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="grid size-8 place-items-center rounded-sm bg-ocean-highlight text-ocean-deep font-mono font-bold">
          S
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-tight text-foreground">
            SmartCom AI
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Retail Intel v1.0
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {groups.map((g, gi) => (
          <div key={gi} className={cn(gi > 0 && "mt-4 pt-4 border-t border-border/60")}> 
            {g.title && (
              <div className="px-3 pb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                {g.title}
              </div>
            )}
            <ul className="space-y-0.5">
              {g.items.map((item) => {
                idx += 1;
                const active = pathname === item.to || pathname.startsWith(item.to + "/");
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={cn(
                        "group flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                        active
                          ? "bg-surface text-ocean-highlight border-l-2 border-ocean-highlight -ml-[2px]"
                          : "border-l-2 border-transparent -ml-[2px] text-muted-foreground hover:bg-surface/50 hover:text-foreground",
                      )}
                    >
                      <span className="font-mono text-[10px] opacity-50 w-5">
                        {String(idx).padStart(2, "0")}
                      </span>
                      <Icon className="size-4 shrink-0" />
                      <span className="text-sm font-medium truncate">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <div className="rounded-md border border-border bg-surface/50 p-3">
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-ocean-highlight">
            AI Core
          </p>
          <p className="mt-1 text-xs text-foreground/80">
            LightGBM · Prophet online
          </p>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-border">
            <div className="h-full w-full bg-ocean-highlight" />
          </div>
        </div>
      </div>
    </aside>
  );
}
