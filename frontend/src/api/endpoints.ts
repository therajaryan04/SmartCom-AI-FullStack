// Centralized endpoint paths. Adjust to match the actual Spring Boot backend
// controllers — this file is the single point of adaptation.
export const endpoints = {
  auth: {
    login: "/api/auth/login",
    me: "/api/auth/me",
    logout: "/api/auth/logout",
  },
  dashboard: {
    summary: "/api/dashboard/summary",
    revenueTrend: "/api/dashboard/revenue-trend",
    topProducts: "/api/dashboard/top-products",
    revenueByCity: "/api/dashboard/revenue-by-city",
    recentOrders: "/api/dashboard/recent-orders",
    aiInsights: "/api/dashboard/ai-insights",
  },
  forecast: {
    revenue: "/api/forecast/revenue",
    demand: "/api/forecast/demand",
    skus: "/api/forecast/skus",
  },
} as const;
