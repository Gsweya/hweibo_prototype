"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, Heart, X, Store, MapPin, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { formatPriceFull } from "@/lib/price-utils";

type UiProduct = {
  id: string;
  image: string;
  name: string;
  price: number;
  store: string;
  location: string;
  description: string;
  category: string;
};

type ApiProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price_cents: number;
  images: string[];
  store_name?: string;
  store_location?: string;
};

const fallbackProducts: UiProduct[] = [
  {
    id: "f1",
    image: "/product_images/laptops/macbook-pro-16.jpg",
    name: "MacBook Pro 16-inch",
    price: 219900,
    store: "Hweibo Store",
    location: "Dodoma",
    description: "Powerful laptop for creative and engineering workloads.",
    category: "Laptops",
  },
  {
    id: "f2",
    image: "/product_images/laptops/lenovo-idea-pad.avif",
    name: "Lenovo IdeaPad",
    price: 74900,
    store: "Hweibo Store",
    location: "Dar es Salaam",
    description: "A clean daily-driver laptop with stable performance.",
    category: "Laptops",
  },
  {
    id: "f3",
    image: "/product_images/shoes/puma-sport.jpg",
    name: "Puma Sport Runner",
    price: 12900,
    store: "Sport World",
    location: "Mwanza",
    description: "Supportive running shoe for daily training.",
    category: "Shoes",
  },
];

function mapApiProduct(product: ApiProduct): UiProduct {
  return {
    id: String(product.id),
    image: (product.images && product.images[0]) || "/product_images/canon_camera.jpg",
    name: product.title,
    price: Number(product.price_cents || 0),
    store: product.store_name || "Hweibo Store",
    location: product.store_location || "Dodoma",
    description: product.description || "",
    category: product.category || "General",
  };
}

function ProductCard({ product, onSelect }: { product: UiProduct; onSelect: () => void }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div
      className="group relative cursor-pointer rounded-[40px] bg-white border-2 border-zinc-200/80 shadow-[0_18px_50px_-30px_rgba(24,24,27,0.45)] hover:border-zinc-300 hover:shadow-[0_30px_80px_-45px_rgba(24,24,27,0.55)] transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" ? onSelect() : null)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-70" />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-white/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : "text-zinc-700"}`} />
        </button>
      </div>

      <div className="p-5 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-zinc-900 text-lg line-clamp-1">{product.name}</h3>
          <span className="font-extrabold text-zinc-900 whitespace-nowrap">{formatPriceFull(product.price)}</span>
        </div>
        <p className="text-sm text-zinc-600 line-clamp-2">{product.description}</p>
        <p className="text-xs text-zinc-500">
          {product.store} · {product.location}
        </p>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  const { addToCart } = useCart();
  const router = useRouter();

  const [products, setProducts] = useState<UiProduct[]>(fallbackProducts);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<UiProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [feederLines, setFeederLines] = useState<string[]>([
    "Starter feed: loading live catalog from backend.",
  ]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/products?limit=60&include_metrics=true", { cache: "no-store" });
        if (!res.ok) throw new Error(`products_${res.status}`);
        const data = (await res.json()) as ApiProduct[];
        if (!mounted) return;
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data.map(mapApiProduct));
          setFeederLines([
            "Starter feed: live products loaded.",
            "Starter feed: category filters are generated from backend data.",
          ]);
        }
      } catch {
        if (!mounted) return;
        setFeederLines([
          "Starter feed: backend unavailable, using local fallback catalog.",
        ]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    void load();
    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category).filter(Boolean))).sort();
    return ["All", ...unique];
  }, [products]);

  const visibleProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory, products]);

  const handleAddToCart = (product: UiProduct) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      store: product.store,
      location: product.location,
      description: product.description,
    });
  };

  return (
    <div className="min-h-screen bg-[#f6f6f8]">
      {selectedProduct ? (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setSelectedProduct(null)} aria-hidden="true" />
          <aside className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[420px] bg-white/85 backdrop-blur-2xl border-l border-zinc-200 shadow-[0_25px_90px_rgba(2,6,23,0.25)] animate-in slide-in-from-right duration-300">
            <div className="h-full flex flex-col">
              <div className="p-5 border-b border-zinc-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-900 text-white flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Product</p>
                    <p className="font-bold text-zinc-900 leading-tight line-clamp-1">{selectedProduct.name}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 rounded-full hover:bg-zinc-100 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-zinc-500" />
                </button>
              </div>

              <div className="p-5 overflow-y-auto flex-1">
                <div className="rounded-3xl overflow-hidden border border-zinc-200 bg-white shadow-sm">
                  <div className="relative aspect-square bg-zinc-50">
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="text-2xl font-extrabold text-zinc-900 leading-tight">{selectedProduct.name}</h2>
                        <p className="text-sm text-zinc-500 mt-1 flex items-center gap-2">
                          <Store className="w-4 h-4" />
                          {selectedProduct.store}
                        </p>
                        <p className="text-sm text-zinc-500 flex items-center gap-2 mt-1">
                          <MapPin className="w-4 h-4 text-red-500" />
                          {selectedProduct.location}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center rounded-full bg-zinc-900 text-white px-4 py-2 text-sm font-bold">
                          {formatPriceFull(selectedProduct.price)}
                        </span>
                      </div>
                    </div>

                    <p className="text-zinc-700 mt-4 leading-relaxed">{selectedProduct.description}</p>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <Button
                        onClick={() => handleAddToCart(selectedProduct)}
                        className="h-12 rounded-full bg-white text-zinc-900 border-2 border-zinc-900 hover:bg-zinc-50 font-semibold"
                      >
                        Add to Cart
                      </Button>
                      <Button
                        onClick={() => {
                          handleAddToCart(selectedProduct);
                          router.push("/buyers/checkout");
                        }}
                        className="h-12 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 font-semibold flex items-center justify-center gap-2"
                      >
                        Checkout
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </>
      ) : null}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 rounded-2xl border border-zinc-200 bg-white px-4 py-3">
          {feederLines.map((line) => (
            <p key={line} className="text-sm text-zinc-600">
              {line}
            </p>
          ))}
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-black text-white"
                    : "bg-white text-black border border-zinc-200 hover:border-zinc-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <Button variant="outline" className="rounded-full border-zinc-200 gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="h-[340px] rounded-[40px] border-2 border-zinc-200 bg-white animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} onSelect={() => setSelectedProduct(product)} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
