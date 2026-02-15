"use client";

import { Button } from "@/components/ui/button";
import { Package, Truck, CheckCircle, Clock, Filter } from "lucide-react";

const orders = [
  { id: "#ORD-001", customer: "James Madenge", email: "james@example.com", product: "Nike Air Max 90", amount: "TZS 450,000", status: "Completed", date: "2024-01-15" },
  { id: "#ORD-002", customer: "Sarah Johnson", email: "sarah@example.com", product: "Puma Sport Runner", amount: "TZS 320,000", status: "Processing", date: "2024-01-14" },
  { id: "#ORD-003", customer: "Michael Brown", email: "michael@example.com", product: "New Balance Fresh Foam", amount: "TZS 520,000", status: "Pending", date: "2024-01-14" },
  { id: "#ORD-004", customer: "Emily Davis", email: "emily@example.com", product: "Adidas Galaxy 5", amount: "TZS 280,000", status: "Completed", date: "2024-01-13" },
  { id: "#ORD-005", customer: "David Wilson", email: "david@example.com", product: "Nike Air Max Plus", amount: "TZS 680,000", status: "Shipped", date: "2024-01-12" },
  { id: "#ORD-006", customer: "Lisa Anderson", email: "lisa@example.com", product: "Nike Air Max 720", amount: "TZS 750,000", status: "Cancelled", date: "2024-01-11" },
];

const statusConfig = {
  Completed: { icon: CheckCircle, color: "bg-green-100 text-green-700" },
  Processing: { icon: Clock, color: "bg-blue-100 text-blue-700" },
  Pending: { icon: Clock, color: "bg-yellow-100 text-yellow-700" },
  Shipped: { icon: Truck, color: "bg-purple-100 text-purple-700" },
  Cancelled: { icon: Package, color: "bg-red-100 text-red-700" },
};

export default function OrdersPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Orders", value: "156", color: "bg-black text-white" },
          { label: "Pending", value: "12", color: "bg-yellow-100 text-yellow-800" },
          { label: "Processing", value: "8", color: "bg-blue-100 text-blue-800" },
          { label: "Completed", value: "136", color: "bg-green-100 text-green-800" },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.color} rounded-2xl p-4`}>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="outline" className="rounded-full border-gray-200">
          <Filter className="w-4 h-4 mr-2" />
          Filter Orders
        </Button>
        {["All", "Pending", "Processing", "Shipped", "Completed", "Cancelled"].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === "All"
                ? "bg-black text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Order ID</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Customer</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Product</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Amount</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon;
              const statusColor = statusConfig[order.status as keyof typeof statusConfig].color;
              
              return (
                <tr key={order.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-black">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-black">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{order.product}</td>
                  <td className="px-6 py-4 font-medium text-black">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium ${statusColor}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{order.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
