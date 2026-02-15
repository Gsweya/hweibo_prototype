"use client";

import { Button } from "@/components/ui/button";
import { Plus, Search, MoreVertical, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

const products = [
  { id: 1, name: "Nike Air Max 90", price: "TZS 450,000", stock: 25, sales: 45, status: "Active", image: "/product_images/shoes/nike-airmax-90.webp" },
  { id: 2, name: "Puma Sport Runner", price: "TZS 320,000", stock: 18, sales: 38, status: "Active", image: "/product_images/shoes/puma-sport.jpg" },
  { id: 3, name: "New Balance Fresh Foam", price: "TZS 520,000", stock: 12, sales: 32, status: "Low Stock", image: "/product_images/shoes/new-balance-wake-up.webp" },
  { id: 4, name: "Adidas Galaxy 5", price: "TZS 280,000", stock: 30, sales: 28, status: "Active", image: "/product_images/shoes/galaxy-5-trainers-with-laces.jpg" },
  { id: 5, name: "Nike Air Max Plus", price: "TZS 680,000", stock: 8, sales: 15, status: "Low Stock", image: "/product_images/shoes/Nike-Air-Max-Plus.webp" },
  { id: 6, name: "Nike Air Max 720", price: "TZS 750,000", stock: 5, sales: 10, status: "Out of Stock", image: "/product_images/shoes/nke-air-max-720-black.webp" },
];

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-black w-64"
            />
          </div>
        </div>
        <Link href="/sellers/products/new">
          <Button className="rounded-full bg-black text-white hover:bg-gray-800">
            <Plus className="w-4 h-4 mr-2" />
            Add New Product
          </Button>
        </Link>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Product</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Price</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Stock</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Sales</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="font-semibold text-black">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-black">{product.price}</td>
                <td className="px-6 py-4 text-gray-600">{product.stock} units</td>
                <td className="px-6 py-4 text-gray-600">{product.sales} sold</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    product.status === "Active" 
                      ? "bg-green-100 text-green-700" 
                      : product.status === "Low Stock"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
