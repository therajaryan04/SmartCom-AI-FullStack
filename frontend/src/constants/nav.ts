import {
  LayoutDashboard,
  Package,
  Boxes,
  Truck,
  Users,
  ShoppingCart,
  CreditCard,
  LineChart,
  BrainCircuit,
  UserCircle,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  group: "main" | "analytics" | "system";
}

export const NAV_ITEMS: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, group: "main" },
  { to: "/products", label: "Products", icon: Package, group: "main" },
  { to: "/inventory", label: "Inventory", icon: Boxes, group: "main" },
  { to: "/suppliers", label: "Suppliers", icon: Truck, group: "main" },
  { to: "/customers", label: "Customers", icon: Users, group: "main" },
  { to: "/orders", label: "Orders", icon: ShoppingCart, group: "main" },
  { to: "/payments", label: "Payments", icon: CreditCard, group: "main" },
  { to: "/forecast", label: "Forecast", icon: LineChart, group: "analytics" },
  { to: "/demand", label: "Demand", icon: BrainCircuit, group: "analytics" },
  { to: "/profile", label: "Profile", icon: UserCircle, group: "system" },
  { to: "/settings", label: "Settings", icon: Settings, group: "system" },
];
