// Fallback mock data used when the Spring Boot backend is unreachable.
// When the real backend is live at VITE_API_BASE_URL, live data is used
// automatically; these mocks let the UI render meaningfully offline.
import type {
  AiInsight,
  CityRevenue,
  DashboardSummary,
  RecentOrder,
  RevenuePoint,
  TopProduct,
} from "@/types/Dashboard";

export const mockSummary: DashboardSummary = {
  kpis: [
    { key: "revenue", label: "Revenue", value: 1482900, formatted: "$1.48M", deltaPct: 12.4, trend: "up" },
    { key: "orders", label: "Orders", value: 14204, formatted: "14,204", deltaPct: 3.1, trend: "up" },
    { key: "products", label: "Products", value: 12400, formatted: "12.4K", deltaPct: 0, trend: "flat" },
    { key: "customers", label: "Customers", value: 32180, formatted: "32.1K", deltaPct: 8.2, trend: "up" },
    { key: "inventoryValue", label: "Inv Value", value: 842000, formatted: "$842K", deltaPct: -2.4, trend: "down" },
    { key: "profit", label: "Profit", value: 210400, formatted: "$210K", deltaPct: 18.5, trend: "up" },
    { key: "todaysSales", label: "Sales / Day", value: 42100, formatted: "$42.1K", deltaPct: 5.6, trend: "up" },
    { key: "lowStock", label: "Low Stock", value: 142, formatted: "142", deltaPct: 9.2, trend: "up", intent: "danger" },
  ],
};

export const mockRevenueTrend: RevenuePoint[] = [
  { period: "Oct 23", actual: 820000, forecast: null, lower: null, upper: null },
  { period: "Nov 23", actual: 905000, forecast: null, lower: null, upper: null },
  { period: "Dec 23", actual: 1110000, forecast: null, lower: null, upper: null },
  { period: "Jan 24", actual: 980000, forecast: null, lower: null, upper: null },
  { period: "Feb 24", actual: 1180000, forecast: null, lower: null, upper: null },
  { period: "Mar 24", actual: 1290000, forecast: 1290000, lower: 1250000, upper: 1330000 },
  { period: "Apr 24", actual: null, forecast: 1380000, lower: 1310000, upper: 1450000 },
  { period: "May 24", actual: null, forecast: 1470000, lower: 1370000, upper: 1580000 },
  { period: "Jun 24", actual: null, forecast: 1560000, lower: 1420000, upper: 1710000 },
];

export const mockTopProducts: TopProduct[] = [
  { sku: "SKU-88219-L", name: "Ultra-Wide Pro Monitor", revenue: 42102, growthPct: 15.2 },
  { sku: "SKU-11204-S", name: "Mechanical Keyboard V2", revenue: 28440, growthPct: 8.1 },
  { sku: "SKU-99021-M", name: "Ergonomic Desk Chair", revenue: 21110, growthPct: -2.4 },
  { sku: "SKU-40012-B", name: "Noise-Cancel Headset", revenue: 18740, growthPct: 22.8 },
  { sku: "SKU-70318-K", name: "USB-C Docking Station", revenue: 15220, growthPct: 4.9 },
];

export const mockCityRevenue: CityRevenue[] = [
  { city: "New York", code: "NYC", revenue: 412000 },
  { city: "London", code: "LDN", revenue: 528000 },
  { city: "Tokyo", code: "TKY", revenue: 264000 },
  { city: "Berlin", code: "BER", revenue: 372000 },
  { city: "Singapore", code: "SGP", revenue: 298000 },
];

export const mockRecentOrders: RecentOrder[] = [
  { id: "ORD-9921", customer: "Brooklyn Design Co.", product: "Ultra-Wide Monitor", date: "2024-03-14", amount: 1240, status: "SHIPPED" },
  { id: "ORD-9920", customer: "Marcus Sterling", product: "Desk Setup Kit", date: "2024-03-14", amount: 840.5, status: "PROCESSING" },
  { id: "ORD-9919", customer: "Sarah Jenkins", product: "Smart Lamp V2", date: "2024-03-13", amount: 120, status: "DELIVERED" },
  { id: "ORD-9918", customer: "Vapor Studio", product: "4K HDMI Cables (x10)", date: "2024-03-13", amount: 299, status: "DELAYED" },
  { id: "ORD-9917", customer: "Enterprise Corp", product: "Workstation Bundle", date: "2024-03-12", amount: 4900, status: "SHIPPED" },
];

export const mockInsights: AiInsight[] = [
  {
    id: "ins-1",
    type: "demand",
    title: "Demand Spike Alert",
    message:
      "Projected 24% increase for SKU-88219 in the London region for May. Recommend increasing stock by 1,200 units.",
    actionLabel: "Approve Restock",
  },
  {
    id: "ins-2",
    type: "margin",
    title: "Margin Risk",
    message:
      "Rising logistics costs in Central Europe are eroding profit on furniture categories. Suggested price adjustment: +5.2%.",
  },
  {
    id: "ins-3",
    type: "restock",
    title: "Turnover Watch",
    message:
      "Accessories are turning 15% faster than last month. Forecasting stockout in 9 days if not replenished.",
  },
];
