import { http } from "./http";
import type { DashboardSummary, Offer } from "../types/api";

export interface RevenuePoint {
  label: string;
  revenue: number;
}
export interface RevenueResponse {
  period: "weekly" | "monthly" | "yearly";
  points: RevenuePoint[];
}
export interface OrderStatusPoint {
  status: "PENDING" | "PREPARING" | "READY" | "COMPLETED";
  count: number;
}
export interface PopularItemsResponse {
  veg: Array<{ menuItemId: string; name: string; diet: "VEG"; likes: number }>;
  nonVeg: Array<{ menuItemId: string; name: string; diet: "NON_VEG"; likes: number }>;
  beverages: Array<{ menuItemId: string; name: string; diet: "BEVERAGE"; likes: number }>;
}

export const dashboardApi = {
  summary: () => http<DashboardSummary>("/dashboard/summary"),
  revenue: () => http<RevenueResponse>("/dashboard/revenue?period=weekly"),
  orderStatus: () => http<OrderStatusPoint[]>("/dashboard/order-status"),
  activeOffers: () => http<Offer[]>("/dashboard/active-offers"),
  popularItems: () => http<PopularItemsResponse>("/dashboard/popular-items"),
};
