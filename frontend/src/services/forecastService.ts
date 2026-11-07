import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type {
  DemandForecastResponse,
  ForecastResponse,
  SkuOption,
} from "@/types/Forecast";
import {
  mockDemandForecast,
  mockRevenueForecast,
  mockSkuOptions,
} from "./mockForecast";

async function withFallback<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn("[forecastService] backend unreachable, using mock:", err);
    }
    return fallback;
  }
}

export interface RevenueForecastParams {
  horizon: number;
  granularity?: "day" | "week" | "month";
  confidence?: number;
}

export interface DemandForecastParams extends RevenueForecastParams {
  sku: string;
}

export const forecastService = {
  revenue: (params: RevenueForecastParams) =>
    withFallback(
      async () =>
        (
          await apiClient.get<ForecastResponse>(endpoints.forecast.revenue, {
            params,
          })
        ).data,
      mockRevenueForecast(params),
    ),
  demand: (params: DemandForecastParams) =>
    withFallback(
      async () =>
        (
          await apiClient.get<DemandForecastResponse>(
            endpoints.forecast.demand,
            { params },
          )
        ).data,
      mockDemandForecast(params),
    ),
  skus: () =>
    withFallback(
      async () =>
        (await apiClient.get<SkuOption[]>(endpoints.forecast.skus)).data,
      mockSkuOptions,
    ),
};
