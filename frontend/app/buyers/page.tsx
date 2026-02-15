"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";

import { useCart } from "@/lib/cart-context";
import { formatPriceFull } from "@/lib/price-utils";

type ApiRankedProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price_cents: number;
  currency: string;
  images: string[];
  rank: number;
};

type UiProduct = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  images: string[];
  store: string;
  location: string;
  badge?: string | null;
  whyThis?: string;
};

type ChatMessage = {
  id: number;
  role: "user" | "ai";
  text: string;
  products?: UiProduct[];
};

const backendBase = "/api/ai/prompts";

const fallbackCatalog: UiProduct[] = [
  {
    id: "f1",
    name: "MacBook Pro 16-inch",
    description: "Powerful laptop for creative and engineering workloads with a large display.",
    category: "Laptops",
    price: 219900,
    image: "/product_images/laptops/macbook-pro-16.jpg",
    images: ["/product_images/laptops/macbook-pro-16.jpg"],
    store: "Hweibo Store",
    location: "Dodoma",
    badge: "TOP PICK",
    whyThis: "Great performance for programming and multitasking.",
  },
  {
    id: "f2",
    name: "Lenovo IdeaPad",
    description: "A clean daily-driver laptop with a slim profile.",
    category: "Laptops",
    price: 74900,
    image: "/product_images/laptops/lenovo-idea-pad.avif",
    images: ["/product_images/laptops/lenovo-idea-pad.avif"],
    store: "Hweibo Store",
    location: "Dar es Salaam",
    badge: null,
  },
  {
    id: "f3",
    name: "Dell XPS 17",
    description: "Large-screen premium laptop with strong performance.",
    category: "Laptops",
    price: 189900,
    image: "/product_images/laptops/xps-17.avif",
    images: ["/product_images/laptops/xps-17.avif"],
    store: "Hweibo Store",
    location: "Arusha",
    badge: "BEST DISPLAY",
  },
  {
    id: "f4",
    name: "Canon Camera",
    description: "Capture crisp photos and smooth video with a reliable camera body.",
    category: "Cameras",
    price: 89900,
    image: "/product_images/canon_camera.jpg",
    images: ["/product_images/canon_camera.jpg"],
    store: "Hweibo Store",
    location: "Dodoma",
    badge: null,
  },
  {
    id: "f5",
    name: "Nike Airmax 90",
    description: "Classic sneaker silhouette with all-day comfort.",
    category: "Shoes",
    price: 15900,
    image: "/product_images/shoes/nike-airmax-90.webp",
    images: ["/product_images/shoes/nike-airmax-90.webp"],
    store: "Sport World",
    location: "Dar es Salaam",
    badge: null,
  },
  {
    id: "f6",
    name: "Puma Sport Runner",
    description: "Comfortable running shoes with supportive cushioning.",
    category: "Shoes",
    price: 12900,
    image: "/product_images/shoes/puma-sport.jpg",
    images: ["/product_images/shoes/puma-sport.jpg"],
    store: "Athletic Store",
    location: "Mwanza",
    badge: "BEST VALUE",
  },
];

function mapApiProducts(apiProducts: ApiRankedProduct[]): UiProduct[] {
  return apiProducts
    .slice()
    .sort((a, b) => (a.rank || 0) - (b.rank || 0))
    .map((p) => ({
      id: String(p.id),
      name: p.title,
      description: p.description || "",
      category: p.category || "",
      price: Number(p.price_cents || 0),
      image: (p.images && p.images[0]) || "/product_images/canon_camera.jpg",
      images: Array.isArray(p.images) ? p.images : [],
      store: "Hweibo Store",
      location: "Tanzania",
      badge: p.rank === 1 ? "TOP PICK" : null,
      whyThis: p.rank === 1 ? "Best match for your prompt." : undefined,
    }));
}

async function fetchRecommendations(prompt: string): Promise<UiProduct[]> {
  const res = await fetch(backendBase, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    throw new Error(`backend_error_${res.status}`);
  }

  const data = (await res.json()) as { products?: ApiRankedProduct[] };
  const products = Array.isArray(data.products) ? data.products : [];
  if (products.length !== 5) return [];
  return mapApiProducts(products);
}

function scoreProduct(prompt: string, p: UiProduct): number {
  const q = prompt.toLowerCase();
  const hay = `${p.name} ${p.description} ${p.category}`.toLowerCase();
  let s = 0;
  for (const token of q.split(/\s+/).filter(Boolean)) {
    if (token.length < 3) continue;
    if (p.name.toLowerCase().includes(token)) s += 4;
    else if (p.category.toLowerCase().includes(token)) s += 3;
    else if (hay.includes(token)) s += 1;
  }
  return s;
}

function fallbackSearch(prompt: string): UiProduct[] {
  const scored = fallbackCatalog
    .map((p) => ({ p, s: scoreProduct(prompt, p) }))
    .sort((a, b) => b.s - a.s)
    .map((x) => x.p);
  return scored.slice(0, 5);
}

function ResultCard({
  product,
  isExpanded,
  onToggle,
  onAddToCart,
  onBuyNow,
}: {
  product: UiProduct;
  isExpanded: boolean;
  onToggle: () => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
}) {
  const base =
    "bg-white border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300";

  const router = useRouter();

  return (
    <div
      className={[
        base,
        isExpanded ? "border-zinc-900 shadow-xl" : "border-zinc-200 hover:border-zinc-400 hover:shadow-md",
      ].join(" ")}
      onClick={onToggle}
    >
      {!isExpanded ? (
        <div className="flex items-center p-3 sm:p-4">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-200">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.badge ? (
              <div className="absolute top-1.5 left-1.5 bg-black text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md leading-tight">
                {product.badge}
              </div>
            ) : null}
          </div>
          <div className="flex-1 ml-4 min-w-0">
            <h3 className="font-bold text-zinc-900 text-lg sm:text-xl truncate">{product.name}</h3>
            <p className="text-zinc-500 text-sm mt-0.5 truncate">
              {product.store} · {product.location}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <span className="bg-zinc-900 text-white text-base font-bold px-4 py-2 rounded-full">
              {formatPriceFull(product.price)}
            </span>
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-5" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-start gap-4">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0 rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-200">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              {product.badge ? (
                <div className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded-md leading-tight">
                  {product.badge}
                </div>
              ) : null}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-zinc-900 text-2xl">{product.name}</h3>
                <button
                  type="button"
                  className="p-1 hover:bg-zinc-100 rounded-full transition-colors"
                  onClick={onToggle}
                  aria-label="Collapse"
                >
                  <span className="block w-5 h-5 text-zinc-400">×</span>
                </button>
              </div>
              <p className="text-zinc-600 text-sm mt-2">{product.description}</p>

              {product.whyThis ? (
                <div className="mt-3 bg-black text-white p-3 rounded-xl">
                  <p className="text-[10px] font-bold uppercase tracking-wide opacity-70 mb-1">Why this?</p>
                  <p className="text-sm">{product.whyThis}</p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-100">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm text-zinc-500">
                <span className="font-semibold text-zinc-900">{product.store}</span> · {product.location}
              </div>
              <span className="bg-zinc-900 text-white text-xl font-bold px-5 py-2.5 rounded-full">
                {formatPriceFull(product.price)}
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full bg-white text-zinc-900 font-semibold py-3 rounded-xl border-2 border-zinc-900 hover:bg-zinc-50 transition-colors"
              onClick={onAddToCart}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="w-full bg-zinc-900 text-white font-semibold py-3 rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
              onClick={() => {
                onBuyNow();
                router.push("/buyers/checkout");
              }}
            >
              Checkout
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BuyersSearchPage() {
  const { addToCart } = useCart();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<number[]>([]);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchStep, setSearchStep] = useState(0);
  const [scenarioRunning, setScenarioRunning] = useState(false);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const suggestionPrompts = useMemo(
    () => [
      "I am looking for a pc under 2M TZS",
      "Running shoes under 500k TZS",
      "Smartphone with a good camera under 1.5M TZS",
      "Noise-canceling headphones for travel",
    ],
    []
  );

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  function clearScenarioTimers() {
    for (const id of timeoutsRef.current) window.clearTimeout(id);
    timeoutsRef.current = [];
  }

  function pushMessage(m: Omit<ChatMessage, "id">) {
    setMessages((prev) => [...prev, { id: prev.length + 1, ...m }]);
  }

  function addToCartFromUi(p: UiProduct) {
    addToCart({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
      store: p.store,
      location: p.location,
      description: p.description,
    });
  }

  async function runSearch(prompt: string, opts?: { simulated?: boolean }): Promise<UiProduct[]> {
    setSearchStep(1);
    setIsTyping(true);
    try {
      await new Promise((r) => setTimeout(r, 650));
      setSearchStep(2);
      await new Promise((r) => setTimeout(r, 650));
      setSearchStep(3);
      await new Promise((r) => setTimeout(r, 650));

      const products = await fetchRecommendations(prompt);
      setSearchStep(0);
      setIsTyping(false);

      if (products.length === 5) {
        pushMessage({
          role: "ai",
          text: opts?.simulated
            ? "Here are 5 ranked options. Tap a card to expand, add to cart, then checkout when you're ready."
            : "Here are 5 ranked matches from the catalog:",
          products,
        });
        return products;
      }
      throw new Error("invalid_products");
    } catch {
      setSearchStep(0);
      setIsTyping(false);
      const products = fallbackSearch(prompt);
      pushMessage({
        role: "ai",
        text: "Here are 5 ranked matches (fallback mode):",
        products,
      });
      return products;
    }
  }

  async function handleSend() {
    const prompt = inputText.trim();
    if (!prompt || isTyping || scenarioRunning) return;

    pushMessage({ role: "user", text: prompt });
    setInputText("");
    await runSearch(prompt);
  }

  function simulateFullFlow(seedPrompt: string) {
    if (isTyping) return;

    clearScenarioTimers();
    setScenarioRunning(true);
    setMessages([]);
    setExpandedKey(null);

    pushMessage({ role: "user", text: seedPrompt });

    timeoutsRef.current.push(
      window.setTimeout(() => pushMessage({ role: "ai", text: "What is it for?" }), 700)
    );
    timeoutsRef.current.push(
      window.setTimeout(() => pushMessage({ role: "user", text: "Programming and office work." }), 1400)
    );
    timeoutsRef.current.push(
      window.setTimeout(
        () => pushMessage({ role: "ai", text: "Any preferences (screen size, battery, location)?" }),
        2100
      )
    );
    timeoutsRef.current.push(
      window.setTimeout(() => pushMessage({ role: "user", text: "Portable, long battery. Prefer Dodoma." }), 2800)
    );
    timeoutsRef.current.push(
      window.setTimeout(async () => {
        const products = await runSearch(`${seedPrompt}. Use: programming and office work. Preferences: portable, long battery, Dodoma.`, {
          simulated: true,
        });
        const top = products[0];
        if (top) {
          pushMessage({
            role: "ai",
            text: `Top pick is "${top.name}". Expand any card to see details, then add to cart when you're ready.`,
          });
        }
        setScenarioRunning(false);
      }, 3400)
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[896px] mx-auto px-4 py-8">
          {messages.length === 0 ? (
            <div className="text-center mt-16">
              <h1 className="text-[48px] font-extrabold leading-tight text-black mb-4">
                Hweibo AI Smart Search
              </h1>
              <p className="text-lg text-black/50 font-medium mb-10">
                Your minimalist AI shopping companion.
              </p>
              <p className="text-sm text-black/50 mb-4">Try a sample prompt:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {suggestionPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => simulateFullFlow(prompt)}
                    className="px-4 py-2 rounded-full bg-black/5 border border-black/5 text-sm font-semibold text-black/70 hover:bg-black/10 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((m) => (
                <div key={m.id} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                  <span className="text-xs font-bold uppercase tracking-wider text-black/40 mb-2 px-2">
                    {m.role === "user" ? "You" : "Hweibo AI"}
                  </span>

                  <div
                    className={[
                      "max-w-[80%] px-6 py-4",
                      m.role === "user"
                        ? "bg-white border border-black/10 rounded-[18px] rounded-tr-[10px] shadow-sm"
                        : "bg-zinc-100 rounded-[18px] rounded-tl-[10px]",
                    ].join(" ")}
                  >
                    <p className="text-base text-black whitespace-pre-wrap">{m.text}</p>
                  </div>

                  {m.products ? (
                    <div className="mt-6 w-full">
                      <div className="flex items-center gap-2 mb-4 text-sm text-zinc-500 px-2">
                        <span>Found {m.products.length} matching products</span>
                      </div>
                      <div className="space-y-3">
                        {m.products.map((p) => {
                          const key = `${m.id}:${p.id}`;
                          return (
                            <ResultCard
                              key={key}
                              product={p}
                              isExpanded={expandedKey === key}
                              onToggle={() => setExpandedKey(expandedKey === key ? null : key)}
                              onAddToCart={() => addToCartFromUi(p)}
                              onBuyNow={() => addToCartFromUi(p)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}

              {isTyping ? (
                <div className="flex flex-col items-start">
                  <span className="text-xs font-bold uppercase tracking-wider text-black/40 mb-2 px-2">Hweibo AI</span>
                  <div className="bg-zinc-100 px-6 py-4 rounded-[18px] rounded-tl-[10px]">
                    <div className="flex items-center gap-2 text-sm text-zinc-700">
                      <span className="font-semibold">
                        {searchStep === 1
                          ? "Searching market"
                          : searchStep === 2
                            ? "Finding best prices"
                            : searchStep === 3
                              ? "Ranking results"
                              : "Thinking"}
                      </span>
                      <span className="flex gap-0.5 text-zinc-500">
                        <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
                        <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
                        <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-black/10 p-4">
        <div className="max-w-[896px] mx-auto">
          <div className="flex items-center bg-white rounded-full border border-black/10 shadow-sm px-4 py-2">
            <Search className="w-5 h-5 text-black/40" />
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? handleSend() : null)}
              placeholder={scenarioRunning ? "Scenario running..." : "Describe what you're looking for..."}
              disabled={scenarioRunning}
              className="flex-1 ml-4 py-3 text-base text-black placeholder:text-black/30 focus:outline-none bg-transparent disabled:opacity-60"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim() || isTyping || scenarioRunning}
              className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send prompt"
            >
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-center text-xs text-zinc-400 mt-2">
            Tip: click a sample prompt above to simulate the full chat flow to product results.
          </p>
        </div>
      </footer>
    </div>
  );
}
