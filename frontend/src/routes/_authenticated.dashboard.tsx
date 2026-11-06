import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

import {
  mockCityRevenue,
  mockInsights,
  mockRecentOrders,
  mockRevenueTrend,
  mockSummary,
  mockTopProducts,
} from "@/services/mockData";

import { KpiTile } from "@/components/dashboard/KpiTile";
import { RevenueForecastChart } from "@/components/dashboard/RevenueForecastChart";
import { TopProductsList } from "@/components/dashboard/TopProductsList";
import { RevenueByCityChart } from "@/components/dashboard/RevenueByCityChart";
import { AiInsightsPanel } from "@/components/dashboard/AiInsightsPanel";
import { RecentOrdersTable } from "@/components/dashboard/RecentOrdersTable";
import { SystemStatus } from "@/components/dashboard/SystemStatus";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,

  head: () => ({
    meta: [
      {
        title: "Dashboard — SmartCom AI",
      },
      {
        name: "description",
        content:
          "SmartCom AI retail analytics dashboard with KPIs, revenue trends, top products, city-wise revenue and business insights.",
      },
    ],
  }),
});

function DashboardPage() {
  const summary = mockSummary;
  const trend = mockRevenueTrend;
  const products = mockTopProducts;
  const cities = mockCityRevenue;
  const orders = mockRecentOrders;
  const insights = mockInsights;

  const kpis = summary.kpis.map((metric) => ({
    ...metric,
    trend: (
      metric.trend === "up" ||
      metric.trend === "down" ||
      metric.trend === "flat"
        ? metric.trend
        : "flat"
    ) as "up" | "down" | "flat",
  }));

  return (
    <div className="space-y-8 p-6 lg:p-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            System · Overview
          </p>

          <h1 className="mt-1 font-mono text-2xl font-bold tracking-tight">
            SYSTEM_OVERVIEW
          </h1>

          <p className="mt-1 max-w-[64ch] text-sm text-muted-foreground">
            Retail operations overview with business KPIs, revenue analytics,
            product performance, regional revenue and intelligent insights.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="border border-border bg-surface/40 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors hover:bg-surface"
          >
            Range · 6M
          </button>

          <button
            type="button"
            className="bg-ocean-highlight px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-ocean-deep transition-all hover:brightness-110"
          >
            Export
          </button>
        </div>
      </motion.div>

      {/* =====================================================
          DATA STATUS
      ===================================================== */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="flex items-center gap-2 border border-border bg-surface/30 px-3 py-2"
      >
        <span className="h-2 w-2 rounded-full bg-ocean-highlight" />

        <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Dashboard Data · Demo / Mock
        </span>

        <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Backend Analytics · Pending
        </span>
      </motion.div>

      {/* =====================================================
          KPI GRID
      ===================================================== */}

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8">
        {summary.kpis.map((metric, index) => (
          <KpiTile
            key={metric.key}
            metric={metric}
            delay={index * 0.04}
          />
        ))}
      </section>

      {/* =====================================================
          MAIN ANALYTICS
      ===================================================== */}

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* MAIN COLUMN */}

        <div className="space-y-6 xl:col-span-2">

          {/* Revenue Forecast */}

          <RevenueForecastChart data={trend} />

          {/* Products + City Revenue */}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TopProductsList items={products} />

            <RevenueByCityChart data={cities} />
          </div>
        </div>

        {/* RIGHT COLUMN */}

        <aside className="space-y-6">
          <AiInsightsPanel insights={insights} />

          <SystemStatus />
        </aside>
      </section>

      {/* =====================================================
          RECENT ORDERS
      ===================================================== */}

      <section>
        <RecentOrdersTable orders={orders} />
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-border pt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span>
            SmartCom AI · Retail Analytics Platform
          </span>

          <span>
            Authentication · Spring Boot JWT · Analytics · Mock Data
          </span>
        </div>
      </footer>

    </div>
  );
}