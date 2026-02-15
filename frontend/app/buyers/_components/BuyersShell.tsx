"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Compass, ShoppingBag, Wallet, ShoppingCart, User } from "lucide-react";

import { useCart } from "@/lib/cart-context";

const navItems = [
  { href: "/buyers", label: "Search", id: "search", icon: Search },
  { href: "/buyers/browse", label: "Browse", id: "browse", icon: Compass },
  { href: "/buyers/orders", label: "Orders", id: "orders", icon: ShoppingBag },
  { href: "/buyers/wallet", label: "Wallet", id: "wallet", icon: Wallet },
  { href: "/buyers/checkout", label: "Cart", id: "cart", icon: ShoppingCart },
  { href: "/buyers/profile", label: "Profile", id: "profile", icon: User },
];

function BuyersRail() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  const isSearch = pathname === "/buyers" || pathname.startsWith("/buyers/search");
  const isBrowse = pathname.startsWith("/buyers/browse");
  const isCheckout = (pathname || "").startsWith("/buyers/checkout");
  const isOrders = (pathname || "").startsWith("/buyers/orders");
  const isWallet = (pathname || "").startsWith("/buyers/wallet");
  const isProfile = (pathname || "").startsWith("/buyers/profile");

  const getIsActive = (id: string) => {
    switch (id) {
      case "search": return isSearch;
      case "browse": return isBrowse;
      case "orders": return isOrders;
      case "wallet": return isWallet;
      case "cart": return isCheckout;
      case "profile": return isProfile;
      default: return false;
    }
  };

  const activeIndex = Math.max(0, navItems.findIndex((it) => getIsActive(it.id)));
  const pinned = new Set<number>();

  // Always keep Search + Browse visible at the top.
  pinned.add(0);
  pinned.add(1);

  // Also keep the active item and its immediate neighbors visible.
  for (const i of [activeIndex - 1, activeIndex, activeIndex + 1]) {
    if (i >= 0 && i < navItems.length) pinned.add(i);
  }

  return (
    <>
      {/* hweibo Logo - Separate, top left */}
      <Link
        href="/buyers"
        className="fixed left-4 sm:left-6 top-6 z-50 text-sm sm:text-base font-medium font-sans tracking-[0.18em] text-zinc-800 hover:text-black transition-all duration-300"
        aria-label="hweibo home"
      >
        hweibo
      </Link>

      {/* Navigation - fixed order; hide extras until hover */}
      <div className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-50">
        <nav className="group flex flex-col items-start">
          {navItems.map((item, idx) => {
            const active = getIsActive(item.id);
            const Icon = item.icon;
            const isPinned = pinned.has(idx);

            const link = (
              <Link
                key={item.id}
                href={item.href}
                className={[
                  "flex items-center gap-3 text-base sm:text-lg whitespace-nowrap py-1.5 transition-all duration-300 ease-out",
                  active
                    ? "text-black font-bold"
                    : "text-zinc-400 hover:text-black hover:font-bold font-medium",
                ].join(" ")}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
                {item.id === "cart" && totalItems > 0 && (
                  <span className="text-[10px] bg-black text-white px-1.5 py-0.5 rounded-full font-bold ml-1">
                    {totalItems}
                  </span>
                )}
              </Link>
            );

            if (isPinned) return link;

            return (
              <div
                key={item.id}
                className="max-h-0 opacity-0 overflow-hidden pointer-events-none group-hover:max-h-12 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 ease-out"
                style={{ transitionDelay: `${Math.max(0, idx - 2) * 40}ms` }}
              >
                {link}
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
}

export default function BuyersShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <BuyersRail />
      <div className="pl-24 sm:pl-32 min-h-screen">
        {children}
      </div>
    </div>
  );
}
