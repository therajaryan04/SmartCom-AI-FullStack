import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type {
  AiInsight,
  CityRevenue,
  DashboardSummary,
  RecentOrder,
  RevenuePoint,
  TopProduct,
} from "@/types/Dashboard";
import {
  mockCityRevenue,
  mockInsights,
  mockRecentOrders,
  mockRevenueTrend,
  mockSummary,
  mockTopProducts,
} from "./mockData";

/**
 * Wrap a real API call so the UI still renders when the Spring Boot backend
 * isn't reachable (e.g. running the frontend against the Lovable preview
 * without a local backend). When the real API responds, live data flows
 * through — no code change needed.
 */
async function withFallback<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn("[dashboardService] backend unreachable, using mock:", err);
    }
    return fallback;
  }
}

export const dashboardService = {
  summary: () =>
    withFallback(
      async () =>
        (await apiClient.get<DashboardSummary>(endpoints.dashboard.summary))
          .data,
      mockSummary,
    ),
  revenueTrend: (range = "6M") =>
    withFallback(
      async () =>
        (
          await apiClient.get<RevenuePoint[]>(endpoints.dashboard.revenueTrend, {
            params: { range },
          })
        ).data,
      mockRevenueTrend,
    ),
  topProducts: (limit = 5) =>
    withFallback(
      async () =>
        (
          await apiClient.get<TopProduct[]>(endpoints.dashboard.topProducts, {
            params: { limit },
          })
        ).data,
      mockTopProducts,
    ),
  revenueByCity: () =>
    withFallback(
      async () =>
        (
          await apiClient.get<CityRevenue[]>(
            endpoints.dashboard.revenueByCity,
          )
        ).data,
      mockCityRevenue,
    ),
  recentOrders: (limit = 5) =>
    withFallback(
      async () =>
        (
          await apiClient.get<RecentOrder[]>(endpoints.dashboard.recentOrders, {
            params: { limit },
          })
        ).data,
      mockRecentOrders,
    ),
  aiInsights: () =>
    withFallback(
      async () =>
        (await apiClient.get<AiInsight[]>(endpoints.dashboard.aiInsights))
          .data,
      mockInsights,
    ),
};
