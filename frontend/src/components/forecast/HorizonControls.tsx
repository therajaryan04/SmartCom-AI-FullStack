import { cn } from "@/lib/utils";

export interface HorizonState {
  horizon: number;
  granularity: "day" | "week" | "month";
  confidence: number;
}

interface Props {
  value: HorizonState;
  onChange: (next: HorizonState) => void;
  maxHorizon?: number;
  minHorizon?: number;
  granularities?: Array<"day" | "week" | "month">;
  extra?: React.ReactNode;
}

const CI_OPTIONS = [0.8, 0.9, 0.95];

export function HorizonControls({
  value,
  onChange,
  maxHorizon = 24,
  minHorizon = 1,
  granularities = ["day", "week", "month"],
  extra,
}: Props) {
  const set = (patch: Partial<HorizonState>) => onChange({ ...value, ...patch });

  return (
    <div className="border border-border bg-surface/30 p-4">
      <div className="flex flex-wrap items-end gap-6">
        {extra}

        <div className="flex flex-col gap-1">
          <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Horizon
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={minHorizon}
              max={maxHorizon}
              value={value.horizon}
              onChange={(e) => set({ horizon: Number(e.target.value) })}
              className="w-40 accent-ocean-highlight"
            />
            <input
              type="number"
              min={minHorizon}
              max={maxHorizon}
              value={value.horizon}
              onChange={(e) =>
                set({
                  horizon: Math.max(
                    minHorizon,
                    Math.min(maxHorizon, Number(e.target.value) || minHorizon),
                  ),
                })
              }
              className="w-16 border border-border bg-background px-2 py-1 font-mono text-xs"
            />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {value.granularity}s
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Granularity
          </span>
          <div className="flex">
            {granularities.map((g) => (
              <button
                key={g}
                onClick={() => set({ granularity: g })}
                className={cn(
                  "border border-border px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest -ml-px first:ml-0",
                  value.granularity === g
                    ? "bg-ocean-highlight text-ocean-deep"
                    : "bg-surface/40 hover:bg-surface",
                )}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Confidence
          </span>
          <div className="flex">
            {CI_OPTIONS.map((c) => (
              <button
                key={c}
                onClick={() => set({ confidence: c })}
                className={cn(
                  "border border-border px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest -ml-px first:ml-0",
                  value.confidence === c
                    ? "bg-ocean-highlight text-ocean-deep"
                    : "bg-surface/40 hover:bg-surface",
                )}
              >
                {Math.round(c * 100)}%
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
