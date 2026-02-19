"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatPriceFull } from "@/lib/price-utils";

type SellerProduct = {
  id: number;
  title: string;
  price_cents: number;
  stock_units: number;
  sales_units: number;
  status: string;
  images: string[];
  category: string;
};

type SellerProductsPayload = {
  products: SellerProduct[];
  feeder_lines: string[];
};

const fallbackProducts: SellerProduct[] = [
  {
    id: 1,
    title: "Nike Air Max 90",
    price_cents: 450000,
    stock_units: 25,
    sales_units: 45,
    status: "Active",
    images: ["/product_images/shoes/nike-airmax-90.webp"],
    category: "Shoes",
  },
  {
    id: 2,
    title: "Puma Sport Runner",
    price_cents: 320000,
    stock_units: 18,
    sales_units: 38,
    status: "Active",
    images: ["/product_images/shoes/puma-sport.jpg"],
    category: "Shoes",
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<SellerProduct[]>(fallbackProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [feederLines, setFeederLines] = useState<string[]>([
    "Starter feed: product rows connected to backend.",
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/seller/products?limit=80", { cache: "no-store" });
        if (!res.ok) throw new Error(`seller_products_${res.status}`);
        const data = (await res.json()) as SellerProductsPayload;
        if (!mounted) return;
        if (Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
        }
        if (Array.isArray(data.feeder_lines) && data.feeder_lines.length > 0) {
          setFeederLines(data.feeder_lines);
        }
      } catch {
        if (!mounted) return;
        setProducts(fallbackProducts);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    void load();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => `${p.title} ${p.category}`.toLowerCase().includes(q));
  }, [products, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-4">
        {feederLines.map((line) => (
          <p key={line} className="text-sm text-zinc-600">
            {line}
          </p>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden">
                      <img
                        src={(product.images && product.images[0]) || "/product_images/canon_camera.jpg"}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-black">{product.title}</span>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-black">{formatPriceFull(product.price_cents)}</td>
                <td className="px-6 py-4 text-gray-600">{product.stock_units} units</td>
                <td className="px-6 py-4 text-gray-600">{product.sales_units} sold</td>
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
            {!filteredProducts.length && !loading ? (
              <tr>
                <td className="px-6 py-8 text-sm text-gray-500" colSpan={6}>
                  No products matched your search.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
