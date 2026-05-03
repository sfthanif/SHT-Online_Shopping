import { DashboardOrder } from "@/types";

export const brand = {
  name: "ROSEQUI",
  heroTitle: "Timeless Elegance, Crafted for You",
  story:
    "At ROSEQUI, every silhouette is born from Italian full-grain leather and hand-finished by artisans whose techniques span generations.",
};

export const currencies = ["USD", "EUR", "GBP"] as const;

export const dashboardOrders: DashboardOrder[] = [
  { id: "RQ-2104", date: "2026-04-18", status: "Delivered", total: 780 },
  { id: "RQ-2031", date: "2026-03-12", status: "Shipped", total: 520 },
  { id: "RQ-1998", date: "2026-02-27", status: "Processing", total: 1120 },
];
