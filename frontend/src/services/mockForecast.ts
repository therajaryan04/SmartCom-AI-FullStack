import type {
  DemandForecastResponse,
  ForecastPoint,
  ForecastResponse,
  SkuOption,
} from "@/types/Forecast";
import type {
  DemandForecastParams,
  RevenueForecastParams,
} from "./forecastService";

export const mockSkuOptions: SkuOption[] = [
  { sku: "SKU-88219-L", name: "Ultra-Wide Pro Monitor" },
  { sku: "SKU-11204-S", name: "Mechanical Keyboard V2" },
  { sku: "SKU-99021-M", name: "Ergonomic Desk Chair" },
  { sku: "SKU-40012-B", name: "Noise-Cancel Headset" },
  { sku: "SKU-70318-K", name: "USB-C Docking Station" },
];

function labelFor(i: number, gran: "day" | "week" | "month") {
  const d = new Date();
  if (gran === "day") {
    d.setDate(d.getDate() + i);
    return d.toISOString().slice(5, 10);
  }
  if (gran === "week") {
    d.setDate(d.getDate() + i * 7);
    return `W${Math.ceil(((+d - +new Date(d.getFullYear(), 0, 1)) / 86400000 + 1) / 7)}`;
  }
  d.setMonth(d.getMonth() + i);
  return d.toLocaleString("en-US", { month: "short", year: "2-digit" });
}

function seededSeries(
  base: number,
  volatility: number,
  history: number,
  horizon: number,
  gran: "day" | "week" | "month",
  confidence: number,
): ForecastPoint[] {
  const pts: ForecastPoint[] = [];
  const bandK = 1 + (0.95 - confidence) * -2; // wider bands for higher confidence
  const width = Math.max(0.05, 0.12 * bandK);
  for (let i = -history; i < 0; i++) {
    const seasonal = Math.sin((i / 6) * Math.PI) * volatility * 0.6;
    const noise = (Math.sin(i * 7.13) + Math.cos(i * 3.71)) * volatility * 0.2;
    const val = Math.round(base + seasonal + noise + i * (base * 0.005));
    pts.push({
      period: labelFor(i, gran),
      actual: val,
      forecast: null,
      lower: null,
      upper: null,
    });
  }
  // bridge point (last actual = first forecast)
  const bridge = Math.round(base + Math.sin(0) * volatility * 0.6);
  pts.push({
    period: labelFor(0, gran),
    actual: bridge,
    forecast: bridge,
    lower: Math.round(bridge * (1 - width * 0.4)),
    upper: Math.round(bridge * (1 + width * 0.4)),
  });
  for (let i = 1; i <= horizon; i++) {
    const seasonal = Math.sin((i / 6) * Math.PI) * volatility * 0.6;
    const trend = i * (base * 0.012);
    const fc = Math.round(base + seasonal + trend);
    const spread = width * (1 + i * 0.06);
    pts.push({
      period: labelFor(i, gran),
      actual: null,
      forecast: fc,
      lower: Math.round(fc * (1 - spread)),
      upper: Math.round(fc * (1 + spread)),
    });
  }
  return pts;
}

export function mockRevenueForecast(
  params: RevenueForecastParams,
): ForecastResponse {
  const granularity = params.granularity ?? "month";
  const horizon = Math.max(1, Math.min(24, params.horizon));
  const confidence = params.confidence ?? 0.95;
  return {
    horizon,
    granularity,
    model: "Prophet",
    confidence,
    mape: 4.8,
    points: seededSeries(1_200_000, 180_000, 8, horizon, granularity, confidence),
  };
}

export function mockDemandForecast(
  params: DemandForecastParams,
): DemandForecastResponse {
  const granularity = params.granularity ?? "week";
  const horizon = Math.max(1, Math.min(52, params.horizon));
  const confidence = params.confidence ?? 0.9;
  const sku = mockSkuOptions.find((s) => s.sku === params.sku) ?? mockSkuOptions[0];
  const base = 480 + (sku.sku.charCodeAt(4) % 12) * 35;
  const points = seededSeries(base, base * 0.25, 8, horizon, granularity, confidence);
  const projected = points
    .filter((p) => p.forecast != null)
    .reduce((acc, p) => acc + (p.forecast ?? 0), 0);
  return {
    horizon,
    granularity,
    model: "LightGBM + Prophet",
    confidence,
    mape: 6.2,
    sku: sku.sku,
    name: sku.name,
    unit: "units",
    recommendedRestock: Math.round(projected * 1.1),
    points,
  };
}
