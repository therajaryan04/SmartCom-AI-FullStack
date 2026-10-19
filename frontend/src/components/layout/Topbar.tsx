import { Bell, LogOut, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "@tanstack/react-router";

export function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials = (user?.username ?? "SC")
    .split(/[\s._-]+/)
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/80 px-6 backdrop-blur-md">
      <div className="flex flex-1 max-w-xl items-center">
        <div className="relative w-full">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Explore SKUs, orders, customers, regions..."
            className="w-full rounded-md border border-border bg-surface/40 py-2 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:border-ocean-highlight/50 focus:outline-none focus:ring-1 focus:ring-ocean-highlight/30"
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            /
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative grid size-9 place-items-center rounded-md border border-border hover:bg-surface"
        >
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-ocean-highlight" />
        </button>
        <div className="flex items-center gap-3 border-l border-border pl-4">
          <div className="hidden text-right sm:block">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Station · 04
            </div>
            <div className="text-sm font-medium">{user?.username ?? "Guest"}</div>
          </div>
          <div className="grid size-9 place-items-center rounded-full bg-ocean-mid font-mono text-xs font-bold text-foreground ring-1 ring-ocean-accent/40">
            {initials}
          </div>
          <button
            type="button"
            aria-label="Log out"
            onClick={() => {
              logout();
              navigate({ to: "/login" });
            }}
            className="grid size-9 place-items-center rounded-md border border-border hover:bg-surface"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
