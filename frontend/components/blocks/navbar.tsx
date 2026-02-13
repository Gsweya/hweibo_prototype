"use client";

import Link from "next/link";

const ITEMS = [
  { label: "About", href: "/#about" },
  { label: "Markets", href: "/#marketplaces" },
  { label: "Supported Areas", href: "/#supported-areas" },
  { label: "Help", href: "/#help" },
];

export const Navbar = () => {
  return (
    <section className="absolute left-0 right-0 top-4 z-50">
      <div className="relative mx-auto w-[min(96%,1200px)]">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-full bg-white px-5 py-3 text-slate-900 shadow-sm">
          <Link href="/" className="text-sm font-semibold">
            Hweibo
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-4">
            {ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/auth/login">
            <span className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-300">
              Sign in
            </span>
          </Link>
        </div>
        <div className="pointer-events-none absolute inset-x-8 top-full mt-2 h-8 rounded-full bg-white/40 blur-2xl" />
      </div>
    </section>
  );
};
