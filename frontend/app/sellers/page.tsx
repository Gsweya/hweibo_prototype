"use client";

import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, Package, ShoppingCart, DollarSign } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Total Sales", value: "TZS 12,450,000", change: "+12.5%", icon: DollarSign },
  { label: "Total Orders", value: "156", change: "+8.2%", icon: ShoppingCart },
  { label: "Products", value: "43", change: "+3", icon: Package },
  { label: "Conversion Rate", value: "3.2%", change: "+0.5%", icon: TrendingUp },
];

const recentOrders = [
  { id: "#ORD-001", customer: "James Madenge", product: "Nike Air Max 90", amount: "TZS 450,000", status: "Completed" },
  { id: "#ORD-002", customer: "Sarah Johnson", product: "Puma Sport Runner", amount: "TZS 320,000", status: "Processing" },
  { id: "#ORD-003", customer: "Michael Brown", product: "New Balance Fresh Foam", amount: "TZS 520,000", status: "Pending" },
  { id: "#ORD-004", customer: "Emily Davis", product: "Adidas Galaxy 5", amount: "TZS 280,000", status: "Completed" },
];

const topProducts = [
  { name: "Nike Air Max 90", sales: 45, revenue: "TZS 20,250,000" },
  { name: "Puma Sport Runner", sales: 38, revenue: "TZS 12,160,000" },
  { name: "New Balance Fresh Foam", sales: 32, revenue: "TZS 16,640,000" },
  { name: "Adidas Galaxy 5", sales: 28, revenue: "TZS 7,840,000" },
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-normal text-black mb-1">Welcome back, Sarah</h1>
          <p className="text-gray-500">Here&apos;s what&apos;s happening with your store today.</p>
        </div>
        <Link href="/sellers/products/new">
          <Button className="rounded-full bg-black text-white hover:bg-gray-800 px-6 py-3 shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Add New Product
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
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
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-black mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-black">Recent Orders</h3>
            <Link href="/sellers/orders" className="text-sm font-semibold text-gray-600 hover:text-black">
              View all
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold">
                    {order.customer.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-black">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.product}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-black">{order.amount}</p>
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
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black mb-6">Top Products</h3>
          
          <div className="space-y-4">
            {topProducts.map((product, idx) => (
              <div key={product.name} className="flex items-center gap-4">
                <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-black text-sm">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.sales} sales</p>
                </div>
                <p className="text-sm font-bold text-black">{product.revenue}</p>
              </div>
            ))}
          </div>

          <Link href="/sellers/analytics">
            <Button variant="outline" className="w-full mt-6 rounded-full border-gray-200">
              View Full Analytics
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/sellers/products/new">
          <div className="bg-black rounded-2xl p-6 text-white hover:bg-gray-800 transition-colors cursor-pointer">
            <Plus className="w-8 h-8 mb-4" />
            <h4 className="text-lg font-bold mb-1">Add New Product</h4>
            <p className="text-sm text-gray-400">List a new item in your store</p>
          </div>
        </Link>
        
        <Link href="/sellers/orders">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer">
            <ShoppingCart className="w-8 h-8 mb-4 text-black" />
            <h4 className="text-lg font-bold mb-1 text-black">Manage Orders</h4>
            <p className="text-sm text-gray-500">View and process orders</p>
          </div>
        </Link>
        
        <Link href="/sellers/products">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer">
            <Package className="w-8 h-8 mb-4 text-black" />
            <h4 className="text-lg font-bold mb-1 text-black">My Products</h4>
            <p className="text-sm text-gray-500">Manage your inventory</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
