"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

export default function AddProductPage() {
  const [images, setImages] = useState<string[]>([]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-black mb-6">Add New Product</h2>
        
        <form className="space-y-6">
          {/* Product Images */}
          <div>
            <label className="block text-sm font-semibold text-black mb-3">Product Images</label>
            <div className="grid grid-cols-4 gap-4">
              <button
                type="button"
                className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 hover:border-black transition-colors"
              >
                <Upload className="w-6 h-6 text-gray-400" />
                <span className="text-xs text-gray-500">Upload</span>
              </button>
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-black"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Description</label>
            <textarea
              rows={4}
              placeholder="Describe your product..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-black resize-none"
            />
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Price (TZS)</label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Stock Quantity</label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Category</label>
            <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-black bg-white">
              <option value="">Select category</option>
              <option value="shoes">Shoes</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          {/* Store Location */}
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Store Location</label>
            <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-black bg-white">
              <option value="">Select location</option>
              <option value="dar">Dar es Salaam</option>
              <option value="arusha">Arusha</option>
              <option value="dodoma">Dodoma</option>
              <option value="mwanza">Mwanza</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1 rounded-full bg-black text-white hover:bg-gray-800 py-6">
              Add Product
            </Button>
            <Button type="button" variant="outline" className="rounded-full px-8 border-gray-200">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
