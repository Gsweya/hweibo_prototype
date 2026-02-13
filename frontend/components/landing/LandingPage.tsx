"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Search, ShoppingCart, Star, Bot, Sparkles, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const PRODUCTS = [
  {
    name: "MacBook Pro 16",
    category: "Laptops",
    price: "TZS 5,200,000",
    image: "/backend/product_images/laptops/macbook-pro-16.jpg",
    rating: 4.8,
    reviews: 234,
  },
  {
    name: "Asus ZenBook",
    category: "Laptops",
    price: "TZS 2,700,000",
    image: "/backend/product_images/laptops/asus-zenbook.jpg",
    rating: 4.5,
    reviews: 156,
  },
  {
    name: "Lenovo Legion Pro",
    category: "Gaming Laptops",
    price: "TZS 3,200,000",
    image: "/backend/product_images/laptops/lenovo-legion-pro.webp",
    rating: 4.7,
    reviews: 189,
  },
  {
    name: "Nike Air Max Plus",
    category: "Sneakers",
    price: "TZS 450,000",
    image: "/backend/product_images/shoes/Nike-Air-Max-Plus.webp",
    rating: 4.6,
    reviews: 412,
  },
  {
    name: "Puma Sport Classic",
    category: "Sneakers",
    price: "TZS 235,000",
    image: "/backend/product_images/shoes/puma-sport.jpg",
    rating: 4.4,
    reviews: 98,
  },
  {
    name: "Canon EOS Camera",
    category: "Cameras",
    price: "TZS 2,100,000",
    image: "/backend/product_images/canon_camera.jpg",
    rating: 4.9,
    reviews: 267,
  },
  {
    name: "Galaxy 5 Trainers",
    category: "Running Shoes",
    price: "TZS 185,000",
    image: "/backend/product_images/shoes/galaxy-5-trainers-with-laces.jpg",
    rating: 4.3,
    reviews: 145,
  },
  {
    name: "Programming Shirt",
    category: "Fashion",
    price: "TZS 45,000",
    image: "/backend/product_images/shoes/programming_shirt-1.jpeg",
    rating: 4.2,
    reviews: 67,
  },
];

export function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof PRODUCTS>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setAiThinking(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setAiThinking(false);
      const results = PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      
      setSearchResults(results);
      setIsSearching(false);
    }, 2000);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Navigation with Glassmorphism */}
      <nav className="fixed left-0 right-0 top-0 z-50 bg-white/20 backdrop-blur-lg border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Hweibo
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              {["Home", "Features"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="px-4 py-2 rounded-full text-sm font-medium text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
                >
                  {item}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" className="px-6 py-2 rounded-full text-sm font-medium text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 transition-all duration-300">
                Sign In
              </Button>
              <Button className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            
            {/* AI Assistant Container */}
            <div className="bg-white/40 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Hweibo AI Assistant</h2>
                  <p className="text-sm text-slate-600">Your personal shopping expert</p>
                </div>
              </div>

              <div className="space-y-4">
                {aiThinking && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4 rounded-tl-none">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
                        <span className="text-sm font-medium text-purple-600">Searching the market...</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0ms]"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:150ms]"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:300ms]"></div>
                      </div>
                    </div>
                  </div>
                )}

                {searchResults.length > 0 && !aiThinking && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 rounded-tl-none border border-green-100">
                      <p className="text-sm font-medium text-green-700 mb-1">Found {searchResults.length} great options for you!</p>
                      <p className="text-xs text-green-600">Here are the best matches based on your search:</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Ask me to find anything... (e.g., 'laptop under 3M TZS')"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full px-6 py-4 pr-14 border-0 bg-white/60 backdrop-blur-sm rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  />
                  <Button
                    onClick={handleSearch}
                    disabled={isSearching || !searchQuery.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
                  >
                    {isSearching ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <Search className="w-4 h-4 text-white" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Container */}
            <div className="space-y-6">
              {searchResults.length > 0 ? (
                <>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Best Matches</h3>
                    <p className="text-slate-600">Top {searchResults.length} results for your search</p>
                  </div>
                  <div className="grid gap-4">
                    {searchResults.map((product, index) => (
                      <Card key={product.name} className="bg-white/60 backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                              <Image
                                src={product.image}
                                alt={product.name}
                                width={100}
                                height={100}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-1 left-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-slate-700">
                                #{index + 1}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-slate-900 mb-1 truncate">{product.name}</h4>
                              <p className="text-xs text-slate-500 mb-2">{product.category}</p>
                              <div className="flex items-center gap-3 mb-3">
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                  <span className="text-xs text-slate-600">{product.rating}</span>
                                </div>
                                <span className="text-xs text-slate-400">({product.reviews})</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                  {product.price}
                                </p>
                                <Button className="px-4 py-2 rounded-full text-xs font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                                  View Deal
                                  <ArrowRight className="w-3 h-3 ml-1" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                <div className="bg-white/40 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Start Your Search</h3>
                  <p className="text-slate-600">Ask the AI assistant to find the perfect products for you</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}