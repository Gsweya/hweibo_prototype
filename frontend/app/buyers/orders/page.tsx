"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin, Navigation, Truck } from "lucide-react";
import { formatPriceFull } from "@/lib/price-utils";

type BuyerOrder = {
  id: string;
  date: string;
  status: string;
  title: string;
  store: string;
  amount_cents: number;
  product_title: string;
  from_location: string;
  to_name: string;
  to_location: string;
};

type MapSnapshot = {
  from_store: string;
  from_location: string;
  to_name: string;
  to_location: string;
  status: string;
  product_title: string;
};

type OrdersPayload = {
  orders: BuyerOrder[];
  map_snapshot: MapSnapshot;
  feeder_lines: string[];
};

const fallbackPayload: OrdersPayload = {
  orders: [
    {
      id: "#HW-12345",
      date: "2026-02-15",
      status: "In transit",
      title: "Luna Steel Watch",
      store: "Watch Hub · Dar es Salaam",
      amount_cents: 285000,
      product_title: "Luna Steel Watch",
      from_location: "Dar es Salaam",
      to_name: "Alex M.",
      to_location: "Nyerere Square, Dodoma",
    },
    {
      id: "#HW-12344",
      date: "2026-02-13",
      status: "Delivered",
      title: "Studio Pro Wireless",
      store: "Audio Center · Mwanza",
      amount_cents: 420000,
      product_title: "Studio Pro Wireless",
      from_location: "Mwanza",
      to_name: "Alex M.",
      to_location: "Nyerere Square, Dodoma",
    },
  ],
  map_snapshot: {
    from_store: "Watch Hub · Dar es Salaam",
    from_location: "Dar es Salaam",
    to_name: "Alex M.",
    to_location: "Nyerere Square, Dodoma",
    status: "In transit",
    product_title: "Luna Steel Watch",
  },
  feeder_lines: ["Starter feed: loading orders from backend."],
};

function toDisplayDate(date: string): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function statusTone(status: string): "yellow" | "green" | "zinc" {
  const s = status.toLowerCase();
  if (s.includes("deliver")) return "green";
  if (s.includes("transit") || s.includes("process")) return "yellow";
  return "zinc";
}

function DeliveryMap({ map }: { map: MapSnapshot }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-50 via-white to-zinc-50">
      <div className="absolute inset-0 opacity-[0.35]" aria-hidden="true">
        <svg viewBox="0 0 600 240" className="h-full w-full">
          <defs>
            <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#e4e4e7" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="600" height="240" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative p-6 sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Delivery snapshot</p>
            <h2 className="mt-2 text-xl sm:text-2xl font-extrabold text-zinc-900">{map.product_title}</h2>
            <p className="mt-2 text-sm text-zinc-500">Current order status: {map.status}</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700">
            <Truck className="h-4 w-4" />
            {map.status}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white/80 backdrop-blur border border-zinc-200 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">From</p>
                <p className="mt-1 font-bold text-zinc-900 truncate">{map.from_store}</p>
                <p className="text-sm text-zinc-500 truncate">{map.from_location}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/80 backdrop-blur border border-zinc-200 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900">
                <Navigation className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">To</p>
                <p className="mt-1 font-bold text-zinc-900 truncate">{map.to_name}</p>
                <p className="text-sm text-zinc-500 truncate">{map.to_location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4">
          <svg viewBox="0 0 720 180" className="h-[180px] w-full" aria-label="Delivery route map">
            <defs>
              <linearGradient id="route" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#18181b" />
                <stop offset="100%" stopColor="#71717a" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="720" height="180" rx="18" fill="#fafafa" />
            <path
              d="M90,120 C200,40 310,150 420,70 C510,10 600,40 650,85"
              fill="none"
              stroke="url(#route)"
              strokeWidth="3"
              strokeDasharray="6 6"
            />

            <circle cx="90" cy="120" r="10" fill="#18181b" />
            <circle cx="90" cy="120" r="22" fill="#18181b" opacity="0.12" />
            <text x="120" y="126" fontSize="12" fill="#3f3f46" fontFamily="ui-sans-serif, system-ui">Shop</text>

            <circle cx="650" cy="85" r="10" fill="#a1a1aa" />
            <circle cx="650" cy="85" r="22" fill="#a1a1aa" opacity="0.18" />
            <text x="548" y="80" fontSize="12" fill="#3f3f46" fontFamily="ui-sans-serif, system-ui">You</text>

            <circle cx="420" cy="70" r="6" fill="#18181b" />
            <text x="436" y="76" fontSize="11" fill="#52525b" fontFamily="ui-sans-serif, system-ui">Pin</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order }: { order: BuyerOrder }) {
  const tone = statusTone(order.status);
  const toneClass =
    tone === "green"
      ? "bg-green-50 text-green-700 border-green-100"
      : tone === "yellow"
        ? "bg-yellow-50 text-yellow-800 border-yellow-100"
        : "bg-zinc-50 text-zinc-700 border-zinc-100";

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-zinc-500">Order {order.id}</p>
          <p className="text-sm text-zinc-400 mt-0.5">Placed on {toDisplayDate(order.date)}</p>
        </div>
        <span className={["px-3 py-1 rounded-full text-sm font-semibold border", toneClass].join(" ")}>{order.status}</span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="font-bold text-zinc-900 truncate">{order.title}</p>
          <p className="text-sm text-zinc-500 truncate">{order.store}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="font-extrabold text-zinc-900">{formatPriceFull(order.amount_cents)}</p>
          <button className="mt-1 text-sm font-semibold text-zinc-900 hover:underline">View details</button>
        </div>
      </div>
    </div>
  );
}

export default function BuyerOrdersPage() {
  const [payload, setPayload] = useState<OrdersPayload>(fallbackPayload);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/buyer/orders?limit=12", { cache: "no-store" });
        if (!res.ok) throw new Error(`buyer_orders_${res.status}`);
        const data = (await res.json()) as OrdersPayload;
        if (!mounted) return;
        if (Array.isArray(data.orders) && data.map_snapshot) {
          setPayload(data);
        }
      } catch {
        if (!mounted) return;
        setPayload(fallbackPayload);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    void load();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredOrders = useMemo(() => {
    if (activeTab === "all") return payload.orders;
    if (activeTab === "processing") {
      return payload.orders.filter((o) => /transit|process/i.test(o.status));
    }
    if (activeTab === "delivered") {
      return payload.orders.filter((o) => /deliver/i.test(o.status));
    }
    if (activeTab === "cancelled") {
      return payload.orders.filter((o) => /cancel/i.test(o.status));
    }
    return payload.orders;
  }, [activeTab, payload.orders]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-extrabold text-zinc-900">Orders</h1>
        <p className="text-zinc-500 mt-2">Track your orders and delivery progress.</p>

        <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
          {payload.feeder_lines.map((line) => (
            <p key={line} className="text-sm text-zinc-600">
              {line}
            </p>
          ))}
        </div>

        <div className="mt-8">
          <DeliveryMap map={payload.map_snapshot} />
        </div>

        <div className="mt-10">
          <div className="flex items-center gap-4 border-b border-zinc-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`pb-4 font-bold border-b-2 ${activeTab === "all" ? "text-black border-black" : "text-zinc-500 border-transparent"}`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("processing")}
              className={`pb-4 font-medium border-b-2 ${activeTab === "processing" ? "text-black border-black" : "text-zinc-500 border-transparent"}`}
            >
              Processing
            </button>
            <button
              onClick={() => setActiveTab("delivered")}
              className={`pb-4 font-medium border-b-2 ${activeTab === "delivered" ? "text-black border-black" : "text-zinc-500 border-transparent"}`}
            >
              Delivered
            </button>
            <button
              onClick={() => setActiveTab("cancelled")}
              className={`pb-4 font-medium border-b-2 ${activeTab === "cancelled" ? "text-black border-black" : "text-zinc-500 border-transparent"}`}
            >
              Cancelled
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
            {!filteredOrders.length && !loading ? (
              <p className="text-sm text-zinc-500">No orders found for this tab.</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
