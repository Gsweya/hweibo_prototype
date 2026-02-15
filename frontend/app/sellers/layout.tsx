"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  ShoppingCart, 
  BarChart3, 
  LogOut,
  Bell,
  ChevronDown,
  HeadphonesIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { href: "/sellers", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/sellers/products", icon: Package, label: "My Products" },
  { href: "/sellers/products/new", icon: PlusCircle, label: "Add New Product" },
  { href: "/sellers/orders", icon: ShoppingCart, label: "Orders", badge: 3 },
  { href: "/sellers/analytics", icon: BarChart3, label: "Sales Analytics" },
];

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-black min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3 px-2">
          <div>
            <h1 className="text-xl font-medium font-sans text-white">hweibo</h1>
            <p className="text-xs text-gray-400">Seller Center</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? "bg-white/10 text-white font-bold"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-white text-black text-xs font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-6 space-y-4">
        {/* Support */}
        <div className="rounded-2xl bg-white/5 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <HeadphonesIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-white">Support</span>
          </div>
          <p className="text-xs text-gray-400">
            Need help with your store? Contact our 24/7 support.
          </p>
        </div>

        {/* Sign Out */}
        <button className="w-full flex items-center justify-center gap-2 rounded-full border border-white/20 py-3 text-sm font-bold text-white hover:bg-white/10 transition-colors">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

export default function SellerDashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f7f7f7]">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h2 className="text-2xl font-bold text-black">
            {(() => {
              const pathname = usePathname();
              if (pathname === "/sellers") return "Overview";
              if (pathname === "/sellers/products") return "My Products";
              if (pathname === "/sellers/products/new") return "Add New Product";
              if (pathname === "/sellers/orders") return "Orders";
              if (pathname === "/sellers/analytics") return "Sales Analytics";
              return "Overview";
            })()}
          </h2>
          
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            
            {/* Profile */}
            <button className="flex items-center gap-3 rounded-full bg-black pl-1 pr-4 py-1 text-white hover:bg-gray-800 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gray-700 border border-gray-600" />
              <span className="text-sm font-bold">Sarah&apos;s Store</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
