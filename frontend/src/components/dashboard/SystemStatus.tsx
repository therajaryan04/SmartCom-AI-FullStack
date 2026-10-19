export function SystemStatus() {
  const items = [
    { label: "AI Core Engine", status: "Operational", color: "bg-ocean-highlight text-ocean-highlight" },
    { label: "Data Pipeline", status: "Live", color: "bg-ocean-highlight text-ocean-highlight" },
    { label: "Prophet Forecast", status: "14m ago", color: "bg-muted-foreground text-muted-foreground" },
    { label: "LightGBM Model", status: "v2.4 · trained", color: "bg-ocean-accent text-ocean-accent" },
  ];
  return (
    <div className="border border-border bg-surface/20 p-5">
      <h4 className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
        System Status
      </h4>
      <ul className="space-y-2.5">
        {items.map((it) => {
          const [dot, text] = it.color.split(" ");
          return (
            <li key={it.label} className="flex items-center justify-between">
              <span className="font-mono text-[11px]">{it.label}</span>
              <div className="flex items-center gap-1.5">
                <span className={`size-1.5 rounded-full ${dot}`} />
                <span className={`font-mono text-[10px] ${text}`}>{it.status}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
