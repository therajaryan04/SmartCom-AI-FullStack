export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  dashboard: {
    summary: ["dashboard", "summary"] as const,
    revenueTrend: (range: string) =>
      ["dashboard", "revenue-trend", range] as const,
    topProducts: (limit: number) =>
      ["dashboard", "top-products", limit] as const,
    revenueByCity: ["dashboard", "revenue-by-city"] as const,
    recentOrders: (limit: number) =>
      ["dashboard", "recent-orders", limit] as const,
    aiInsights: ["dashboard", "ai-insights"] as const,
  },
};
