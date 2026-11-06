import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { motion } from "motion/react";

import { forecastService } from "@/services/forecastService";
import {
  HorizonControls,
  type HorizonState,
} from "@/components/forecast/HorizonControls";
import { ForecastChart } from "@/components/forecast/ForecastChart";
import { ExportPdfButton } from "@/components/forecast/ExportPdfButton";
import { Skeleton } from "@/components/ui/skeleton";
import { fmtNumber, fmtPercent } from "@/utils/format";

export const Route = createFileRoute("/_authenticated/demand")({
  component: DemandPage,
  head: () => ({
    meta: [
      { title: "Demand Prediction — SmartCom AI" },
      {
        name: "description",
        content:
          "SKU-level demand forecasting with configurable horizon and confidence intervals.",
      },
      { property: "og:title", content: "Demand Prediction — SmartCom AI" },
      {
        property: "og:description",
        content: "LightGBM + Prophet demand projections per SKU.",
      },
    ],
  }),
});

function DemandPage() {
  const skus = useQuery({
    queryKey: ["forecast", "skus"],
    queryFn: () => forecastService.skus(),
  });

  const [sku, setSku] = useState<string>("SKU-88219-L");
  const [state, setState] = useState<HorizonState>({
    horizon: 8,
    granularity: "week",
    confidence: 0.9,
  });

  const q = useQuery({
    queryKey: ["forecast", "demand", sku, state],
    queryFn: () =>
      forecastService.demand({
        sku,
        horizon: state.horizon,
        granularity: state.granularity,
        confidence: state.confidence,
      }),
    enabled: !!sku,
  });

  const data = q.data;
  const projectedUnits =
    data?.points
      .filter((p) => p.forecast != null && p.actual == null)
      .reduce((a, p) => a + (p.forecast ?? 0), 0) ?? 0;

  const skuPicker = (
    <div className="flex flex-col gap-1">
      <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        SKU
      </label>
      <select
        value={sku}
        onChange={(e) => setSku(e.target.value)}
        className="min-w-56 border border-border bg-background px-2 py-1.5 font-mono text-xs"
      >
        {(skus.data ?? []).map((s) => (
          <option key={s.sku} value={s.sku}>
            {s.sku} · {s.name}
          </option>
        ))}
      </select>
    </div>
  );

  const exportRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-start justify-between gap-4"
      >
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Analytics · Demand
          </p>
          <h1 className="mt-1 font-mono text-2xl font-bold tracking-tight">
            DEMAND_PREDICTION
          </h1>
          <p className="mt-1 max-w-[64ch] text-sm text-muted-foreground">
            Per-SKU demand projections combining LightGBM feature signals with
            Prophet seasonality. Tune horizon, cadence, and confidence to plan
            restock windows.
          </p>
        </div>
        <ExportPdfButton
          targetRef={exportRef}
          title={`Demand Prediction · ${sku}`}
          fileName={`demand-${sku}-${state.horizon}${state.granularity[0]}.pdf`}
          meta={{
            SKU: sku,
            Product: data?.name ?? "—",
            Horizon: `${state.horizon} ${state.granularity}s`,
            Granularity: state.granularity,
            Confidence: `${Math.round(state.confidence * 100)}%`,
            "Projected Units": fmtNumber(projectedUnits, true),
            "Recommended Restock":
              data?.recommendedRestock != null ? fmtNumber(data.recommendedRestock) : "—",
            Model: data?.model ?? "—",
            MAPE: data?.mape != null ? fmtPercent(data.mape) : "—",
          }}
        />
      </motion.div>

      <HorizonControls
        value={state}
        onChange={setState}
        maxHorizon={52}
        granularities={["day", "week", "month"]}
        extra={skuPicker}
      />

      <div ref={exportRef} className="space-y-6">
        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard
            label="Horizon"
            value={`${state.horizon} ${state.granularity}s`}
          />
          <StatCard
            label="Projected Units"
            value={fmtNumber(projectedUnits, true)}
          />
          <StatCard
            label="Recommended Restock"
            value={
              data?.recommendedRestock != null
                ? fmtNumber(data.recommendedRestock)
                : "—"
            }
          />
          <StatCard
            label="MAPE"
            value={data?.mape != null ? fmtPercent(data.mape) : "—"}
          />
        </section>

        {data ? (
          <ForecastChart
            data={data.points}
            title={`${data.sku} · ${data.name ?? "Demand"}`}
            subtitle={`Model: ${data.model} · CI ${Math.round(data.confidence * 100)}% · unit: ${data.unit ?? "units"}`}
            unit="number"
            height={400}
          />
        ) : (
          <Skeleton className="h-[440px] rounded-none" />
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border bg-surface/40 p-4">
      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 num text-xl font-bold tracking-tight">{value}</p>
    </div>
  );
}
