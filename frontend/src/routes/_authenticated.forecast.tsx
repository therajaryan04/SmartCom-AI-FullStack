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
import { fmtCurrency, fmtPercent } from "@/utils/format";

export const Route = createFileRoute("/_authenticated/forecast")({
  component: ForecastPage,
  head: () => ({
    meta: [
      { title: "Revenue Forecast — SmartCom AI" },
      {
        name: "description",
        content:
          "Configurable Prophet-based revenue forecasting with 80/90/95% confidence intervals.",
      },
      { property: "og:title", content: "Revenue Forecast — SmartCom AI" },
      {
        property: "og:description",
        content: "Retail revenue projections with confidence bands.",
      },
    ],
  }),
});

function ForecastPage() {
  const [state, setState] = useState<HorizonState>({
    horizon: 6,
    granularity: "month",
    confidence: 0.95,
  });

  const q = useQuery({
    queryKey: ["forecast", "revenue", state],
    queryFn: () =>
      forecastService.revenue({
        horizon: state.horizon,
        granularity: state.granularity,
        confidence: state.confidence,
      }),
  });

  const data = q.data;
  const projected =
    data?.points
      .filter((p) => p.forecast != null && p.actual == null)
      .reduce((a, p) => a + (p.forecast ?? 0), 0) ?? 0;

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
            Analytics · Forecast
          </p>
          <h1 className="mt-1 font-mono text-2xl font-bold tracking-tight">
            REVENUE_FORECAST
          </h1>
          <p className="mt-1 max-w-[64ch] text-sm text-muted-foreground">
            Prophet-modeled projection with tunable horizon and confidence
            intervals sourced from the Spring Boot forecasting service.
          </p>
        </div>
        <ExportPdfButton
          targetRef={exportRef}
          title="Revenue Forecast"
          fileName={`revenue-forecast-${state.horizon}${state.granularity[0]}.pdf`}
          meta={{
            Horizon: `${state.horizon} ${state.granularity}s`,
            Granularity: state.granularity,
            Confidence: `${Math.round(state.confidence * 100)}%`,
            "Projected Total": fmtCurrency(projected, true),
            Model: data?.model ?? "—",
            MAPE: data?.mape != null ? fmtPercent(data.mape) : "—",
          }}
        />
      </motion.div>

      <HorizonControls value={state} onChange={setState} maxHorizon={24} />

      <div ref={exportRef} className="space-y-6">
        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Horizon" value={`${state.horizon} ${state.granularity}s`} />
          <StatCard
            label="Projected Total"
            value={fmtCurrency(projected, true)}
          />
          <StatCard label="Confidence" value={`${Math.round(state.confidence * 100)}%`} />
          <StatCard
            label="MAPE"
            value={data?.mape != null ? fmtPercent(data.mape) : "—"}
          />
        </section>

        {data ? (
          <ForecastChart
            data={data.points}
            title="Revenue Trend + Forecast"
            subtitle={`Model: ${data.model} · CI ${Math.round(data.confidence * 100)}%`}
            unit="currency"
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
