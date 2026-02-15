import { MapPin, Navigation, Truck } from "lucide-react";

function DeliveryMap() {
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
            <h2 className="mt-2 text-xl sm:text-2xl font-extrabold text-zinc-900">Shop to your door</h2>
            <p className="mt-2 text-sm text-zinc-500">A quick visual of the current route.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700">
            <Truck className="h-4 w-4" />
            In transit
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
                <p className="mt-1 font-bold text-zinc-900 truncate">Watch Hub</p>
                <p className="text-sm text-zinc-500 truncate">Dar es Salaam</p>
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
                <p className="mt-1 font-bold text-zinc-900 truncate">Alexander Hamilton</p>
                <p className="text-sm text-zinc-500 truncate">Manhattan, New York</p>
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
            <text x="436" y="76" fontSize="11" fill="#52525b" fontFamily="ui-sans-serif, system-ui">Courier</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

function OrderCard({
  id,
  date,
  status,
  statusTone,
  title,
  store,
  amount,
}: {
  id: string;
  date: string;
  status: string;
  statusTone: "yellow" | "green" | "zinc";
  title: string;
  store: string;
  amount: string;
}) {
  const tone =
    statusTone === "green"
      ? "bg-green-50 text-green-700 border-green-100"
      : statusTone === "yellow"
        ? "bg-yellow-50 text-yellow-800 border-yellow-100"
        : "bg-zinc-50 text-zinc-700 border-zinc-100";

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-zinc-500">Order {id}</p>
          <p className="text-sm text-zinc-400 mt-0.5">Placed on {date}</p>
        </div>
        <span className={["px-3 py-1 rounded-full text-sm font-semibold border", tone].join(" ")}>{status}</span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="font-bold text-zinc-900 truncate">{title}</p>
          <p className="text-sm text-zinc-500 truncate">{store}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="font-extrabold text-zinc-900">{amount}</p>
          <button className="mt-1 text-sm font-semibold text-zinc-900 hover:underline">View details</button>
        </div>
      </div>
    </div>
  );
}

export default function BuyerOrdersPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-extrabold text-zinc-900">Orders</h1>
        <p className="text-zinc-500 mt-2">Track your orders and delivery progress.</p>

        <div className="mt-8">
          <DeliveryMap />
        </div>

        <div className="mt-10">
          <div className="flex items-center gap-4 border-b border-zinc-200">
            <button className="pb-4 text-black font-bold border-b-2 border-black">All</button>
            <button className="pb-4 text-zinc-500 font-medium hover:text-black">Processing</button>
            <button className="pb-4 text-zinc-500 font-medium hover:text-black">Delivered</button>
            <button className="pb-4 text-zinc-500 font-medium hover:text-black">Cancelled</button>
          </div>

          <div className="mt-6 space-y-4">
            <OrderCard
              id="#HW-12345"
              date="Jan 15, 2024"
              status="In transit"
              statusTone="yellow"
              title="Luna Steel Watch"
              store="Watch Hub · Dar es Salaam"
              amount="TZS 285k"
            />
            <OrderCard
              id="#HW-12344"
              date="Jan 10, 2024"
              status="Delivered"
              statusTone="green"
              title="Studio Pro Wireless"
              store="Audio Center · Mwanza"
              amount="TZS 420k"
            />
            <OrderCard
              id="#HW-12340"
              date="Jan 5, 2024"
              status="Delivered"
              statusTone="green"
              title="Aero Sprint V2"
              store="Sport World · Arusha"
              amount="TZS 290k"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
