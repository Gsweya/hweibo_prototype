"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, Package, ShoppingCart, DollarSign } from "lucide-react";
import Link from "next/link";
import { formatPriceFull } from "@/lib/price-utils";

type DashboardStats = {
  total_sales_cents: number;
  total_orders: number;
  total_products: number;
  conversion_rate: number;
};

type DashboardOrder = {
  id: string;
  customer_name: string;
  product_title: string;
  amount_cents: number;
  status: string;
};

type DashboardTopProduct = {
  id: number;
  title: string;
  sales_units: number;
  revenue_cents: number;
  price_cents: number;
  status: string;
  stock_units: number;
  image: string;
};

type DashboardPayload = {
  stats: DashboardStats;
  recent_orders: DashboardOrder[];
  top_products: DashboardTopProduct[];
  feeder_lines: string[];
};

const fallbackData: DashboardPayload = {
  stats: {
    total_sales_cents: 12450000,
    total_orders: 156,
    total_products: 43,
    conversion_rate: 3.2,
  },
  recent_orders: [
    { id: "HW-202600", customer_name: "James Madenge", product_title: "Nike Air Max 90", amount_cents: 450000, status: "Completed" },
    { id: "HW-202601", customer_name: "Sarah Johnson", product_title: "Puma Sport Runner", amount_cents: 320000, status: "Processing" },
    { id: "HW-202602", customer_name: "Michael Brown", product_title: "New Balance Fresh Foam", amount_cents: 520000, status: "Pending" },
  ],
  top_products: [
    { id: 1, title: "Nike Air Max 90", sales_units: 45, revenue_cents: 20250000, price_cents: 450000, status: "Active", stock_units: 25, image: "/product_images/shoes/nike-airmax-90.webp" },
    { id: 2, title: "Puma Sport Runner", sales_units: 38, revenue_cents: 12160000, price_cents: 320000, status: "Active", stock_units: 18, image: "/product_images/shoes/puma-sport.jpg" },
  ],
  feeder_lines: [
    "Starter feed: seller dashboard loaded from fallback data.",
  ],
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardPayload>(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/seller/dashboard", { cache: "no-store" });
        if (!res.ok) throw new Error(`seller_dashboard_${res.status}`);
        const payload = (await res.json()) as DashboardPayload;
        if (!mounted) return;
        if (payload && payload.stats && Array.isArray(payload.recent_orders)) {
          setData(payload);
        }
      } catch {
        if (!mounted) return;
        setData(fallbackData);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    void load();
    return () => {
      mounted = false;
    };
  }, []);

  const stats = useMemo(
    () => [
      { label: "Total Sales", value: formatPriceFull(data.stats.total_sales_cents), icon: DollarSign },
      { label: "Total Orders", value: String(data.stats.total_orders), icon: ShoppingCart },
      { label: "Products", value: String(data.stats.total_products), icon: Package },
      { label: "Conversion Rate", value: `${data.stats.conversion_rate}%`, icon: TrendingUp },
    ],
    [data.stats]
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="rounded-2xl border border-zinc-200 bg-white p-4">
        {data.feeder_lines.map((line) => (
          <p key={line} className="text-sm text-zinc-600">
            {line}
          </p>
        ))}
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-normal text-black mb-1">Welcome back, Seller</h1>
          <p className="text-gray-500">Here&apos;s what&apos;s happening with your store today.</p>
        </div>
        <Link href="/sellers/products/new">
          <Button className="rounded-full bg-black text-white hover:bg-gray-800 px-6 py-3 shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Add New Product
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-gray-700" />
                </div>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  Live
                </span>
              </div>
              <p className="text-2xl font-bold text-black mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-black">Recent Orders</h3>
            <Link href="/sellers/orders" className="text-sm font-semibold text-gray-600 hover:text-black">
              View all
            </Link>
          </div>

          <div className="space-y-4">
            {data.recent_orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold">
                    {order.customer_name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-black">{order.customer_name}</p>
                    <p className="text-sm text-gray-500">{order.product_title}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-black">{formatPriceFull(order.amount_cents)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Processing"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
            {!data.recent_orders.length && !loading ? (
              <p className="text-sm text-gray-500">No recent orders yet.</p>
            ) : null}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black mb-6">Top Products</h3>

          <div className="space-y-4">
            {data.top_products.map((product, idx) => (
              <div key={product.id} className="flex items-center gap-4">
                <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-black text-sm">{product.title}</p>
                  <p className="text-xs text-gray-500">{product.sales_units} sales</p>
                </div>
                <p className="text-sm font-bold text-black">{formatPriceFull(product.revenue_cents)}</p>
              </div>
            ))}
            {!data.top_products.length && !loading ? (
              <p className="text-sm text-gray-500">No products yet.</p>
            ) : null}
          </div>

          <Link href="/sellers/analytics">
            <Button variant="outline" className="w-full mt-6 rounded-full border-gray-200">
              View Full Analytics
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
