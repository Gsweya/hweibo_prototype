"use client";

import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react";

const analyticsCards = [
  { title: "Total Revenue", value: "TZS 12,450,000", change: "+12.5%", trend: "up", icon: DollarSign },
  { title: "Total Orders", value: "1,234", change: "+8.2%", trend: "up", icon: ShoppingCart },
  { title: "Total Customers", value: "856", change: "+15.3%", trend: "up", icon: Users },
  { title: "Products Sold", value: "2,456", change: "-2.1%", trend: "down", icon: Package },
];

const salesData = [
  { month: "Jan", sales: 45000 },
  { month: "Feb", sales: 52000 },
  { month: "Mar", sales: 48000 },
  { month: "Apr", sales: 61000 },
  { month: "May", sales: 55000 },
  { month: "Jun", sales: 67000 },
];

const topProducts = [
  { name: "Nike Air Max 90", revenue: "TZS 20,250,000", growth: "+25%" },
  { name: "Puma Sport Runner", revenue: "TZS 12,160,000", growth: "+18%" },
  { name: "New Balance Fresh Foam", revenue: "TZS 16,640,000", growth: "+12%" },
  { name: "Adidas Galaxy 5", revenue: "TZS 7,840,000", growth: "+8%" },
];

export default function AnalyticsPage() {
  const maxSales = Math.max(...salesData.map(d => d.sales));

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsCards.map((card) => {
          const Icon = card.icon;
          const TrendIcon = card.trend === "up" ? TrendingUp : TrendingDown;
          
          return (
            <div key={card.title} className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-gray-700" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  card.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  <TrendIcon className="w-4 h-4" />
                  {card.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-black mb-1">{card.value}</p>
              <p className="text-sm text-gray-500">{card.title}</p>
            </div>
          );
        })}
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-black">Sales Overview</h3>
          <select className="px-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-black">
            <option>Last 6 Months</option>
            <option>Last Year</option>
            <option>All Time</option>
          </select>
        </div>
        
        <div className="h-64 flex items-end gap-8">
          {salesData.map((data) => (
            <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-black rounded-t-lg transition-all"
                style={{ height: `${(data.sales / maxSales) * 200}px` }}
              />
              <span className="text-sm text-gray-600 font-medium">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Products */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black mb-6">Top Products by Revenue</h3>
          <div className="space-y-4">
            {topProducts.map((product, idx) => (
              <div key={product.name} className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-black">{product.name}</p>
                  <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
                    <div 
                      className="h-full bg-black rounded-full"
                      style={{ width: `${100 - idx * 20}%` }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-black">{product.revenue}</p>
                  <p className="text-sm text-green-600">{product.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Performance */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black mb-6">Performance Insights</h3>
          <div className="space-y-6">
            <div className="p-4 bg-green-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">Sales are up 12.5%</span>
              </div>
              <p className="text-sm text-green-700">
                Your store is performing well this month compared to last month.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-800">New customers +15%</span>
              </div>
              <p className="text-sm text-blue-700">
                You&apos;re attracting more new customers to your store.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-yellow-800">Low stock alert</span>
              </div>
              <p className="text-sm text-yellow-700">
                3 products are running low on stock. Consider restocking soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
