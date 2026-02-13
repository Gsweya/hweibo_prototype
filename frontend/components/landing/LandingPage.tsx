"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

type ApiProduct = {
  id: number;
  title: string;
  description?: string;
  category?: string;
  price_cents?: number;
  currency?: string;
  images?: string[];
};

function formatPrice(priceCents?: number, currency?: string) {
  if (!priceCents) return "TZS 150,000";
  const code = (currency || "TZS").toUpperCase();
  const amount = priceCents / 100;
  const formatted = amount.toLocaleString(undefined, { maximumFractionDigits: 0 });
  return `${code} ${formatted}`;
}

function TiltWrap({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const raf = useRef<number | null>(null);

  const setVars = (rx: number, ry: number, gx: number, gy: number) => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--gx", `${gx}%`);
    el.style.setProperty("--gy", `${gy}%`);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const ry = (px - 0.5) * 10;
    const rx = (0.5 - py) * 8;

    const gx = Math.max(0, Math.min(100, px * 100));
    const gy = Math.max(0, Math.min(100, py * 100));

    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => setVars(rx, ry, gx, gy));
  };

  const onPointerLeave = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    setVars(0, 0, 50, 50);
  };

  return (
    <div className="shrink-0 [perspective:1000px]" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <div
        ref={ref}
        className="relative will-change-transform"
        style={{
          transform:
            "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(0)",
          transformStyle: "preserve-3d",
          transition: "transform 180ms ease",
        }}
      >
        <div
          className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.75), rgba(255,255,255,0) 55%)",
          }}
        />
        <div className="group-hover:opacity-100">{children}</div>
      </div>
    </div>
  );
}

function ProductCard({
  imagePath,
  category,
  title,
  subtitle,
  store,
  location,
  price,
  ctaHref,
}: {
  imagePath: string;
  category: string;
  title: string;
  subtitle: string;
  store: string;
  location: string;
  price: string;
  ctaHref: string;
}) {
  return (
    <div className="w-[320px] overflow-hidden rounded-[28px] border border-zinc-200 bg-white">
      <div className="relative overflow-hidden">
        <img
          src={`${backendBase}${imagePath}`}
          onError={(e) => {
            // Fallback to local Next public assets when backend is not running.
            e.currentTarget.src = imagePath;
          }}
          alt={title}
          className="h-64 w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-4">
          <div className="text-2xl font-medium tracking-tight text-white">{title}</div>
          <div className="mt-1 text-sm text-white/80">{subtitle}</div>
        </div>
      </div>

      <div className="px-5 pb-5 pt-4">
        <div className="text-[11px] font-extrabold uppercase tracking-[0.35em] text-zinc-400">
          {category}
        </div>

        <div className="mt-3 grid gap-2 text-sm text-zinc-700">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100">
              <span className="text-[11px]">🏬</span>
            </span>
            <span className="font-medium">{store}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100">
              <span className="text-[11px]">📍</span>
            </span>
            <span className="truncate">{location}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 items-center rounded-full border border-zinc-200 bg-white px-2 text-[12px] font-extrabold text-black">
              {(price.split(" ")[0] || "TZS").toUpperCase()}
            </span>
            <span className="text-xl font-semibold tracking-tight text-black">
              {price.split(" ").slice(1).join(" ") || price}
            </span>
          </div>
          <Link
            href={ctaHref}
            className="inline-flex h-9 items-center justify-center rounded-full bg-black px-4 text-sm font-semibold text-white transition hover:bg-black/90"
          >
            Add to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

function RollingRail({
  items,
  seconds,
}: {
  items: Array<{
    imagePath: string;
    category: string;
    title: string;
    subtitle: string;
    store: string;
    location: string;
    price: string;
  }>;
  seconds: number;
}) {
  // Duplicate items for a seamless loop.
  const doubled = useMemo(() => [...items, ...items], [items]);

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
      <div
        className="flex w-[200%] gap-6 py-2"
        style={{
          animation: `carousel ${seconds}s linear infinite`,
        }}
      >
        {doubled.map((item, idx) => (
          <div key={`${item.title}-${idx}`} className="group shrink-0">
            <TiltWrap>
              <div className="transition-transform duration-300 group-hover:-translate-y-1">
                <ProductCard {...item} ctaHref="/auth/login" />
              </div>
            </TiltWrap>
          </div>
        ))}
      </div>
    </div>
  );
}

function HowItWorksCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
        {icon}
      </div>
      <div className="mt-6 text-xl font-bold text-black">{title}</div>
      <div className="mt-3 text-sm leading-6 text-zinc-500">{description}</div>
    </div>
  );
}

export function LandingPage() {
  const fallback: ApiProduct[] = useMemo(
    () => [
      {
        id: 1,
        title: "Lenovo IdeaPad",
        description: "A minimalist daily-driver laptop with clean performance and a slim profile.",
        category: "Laptops",
        images: ["/product_images/laptops/lenovo-idea-pad.avif"],
      },
      {
        id: 2,
        title: "MacBook Pro 16",
        description: "Powerful, refined, and fast for demanding creative and development work.",
        category: "Laptops",
        images: ["/product_images/laptops/macbook-pro-16.jpg"],
      },
      {
        id: 3,
        title: "Dell XPS 17",
        description: "A clean, premium build with a large display and strong performance.",
        category: "Laptops",
        images: ["/product_images/laptops/xps-17.avif"],
      },
      {
        id: 4,
        title: "Nike Air Max 720",
        description: "Comfort-first style built for everyday steps.",
        category: "Shoes",
        images: ["/product_images/shoes/nke-air-max-720-black.webp"],
      },
      {
        id: 5,
        title: "Puma Sport",
        description: "Simple and durable sneaker for daily wear.",
        category: "Shoes",
        images: ["/product_images/shoes/puma-sport.jpg"],
      },
    ],
    [],
  );

  const [products, setProducts] = useState<ApiProduct[]>(fallback);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(`${backendBase}/products?limit=20`, { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as ApiProduct[];
        if (!cancelled && Array.isArray(data) && data.length > 0) setProducts(data);
      } catch {
        // Keep fallback.
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const railItems = useMemo(() => {
    const mapped = products
      .map((p) => {
        const imagePath = p.images?.[0];
        if (!imagePath) return null;
        return {
          imagePath,
          category: p.category || "Product",
          title: p.title,
          subtitle: (p.description || "").slice(0, 26) || "Minimalist pick.",
          store: "Lark Stores, Inc.",
          location: "Nyerere Sq., Dodoma",
          price: formatPrice(p.price_cents, p.currency || "TZS"),
        };
      })
      .filter(Boolean) as Array<{
        imagePath: string;
        category: string;
        title: string;
        subtitle: string;
        store: string;
        location: string;
        price: string;
      }>;

    // Ensure we have enough cards for a smooth rail.
    if (mapped.length >= 6) return mapped;
    return [...mapped, ...mapped, ...mapped].slice(0, 9);
  }, [products]);

  return (
    <div className="bg-white text-black">
      <section className="relative overflow-hidden pt-28">
        <div className="pointer-events-none absolute left-1/2 top-16 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.10),rgba(0,0,0,0)_62%)] blur-2xl" />
        <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.08),rgba(0,0,0,0)_65%)] blur-2xl" />
        <div className="pointer-events-none absolute -right-24 top-28 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.08),rgba(0,0,0,0)_65%)] blur-2xl" />

        <div className="mx-auto w-[min(92%,1100px)] text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-zinc-50 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.35em] text-zinc-500 ring-1 ring-zinc-200">
            <span className="h-2 w-2 rounded-full bg-zinc-400" />
            The future of commerce
          </div>

          <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
            <span className="text-black">Shop smarter</span>
            <br />
            <span className="text-zinc-400">with Hweibo.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-7 text-zinc-500 sm:text-lg">
            A minimalist AI-powered shopping platform designed for the modern lifestyle. Effortless
            discovery meets sophisticated design.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/auth"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-black px-8 text-base font-bold text-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] transition hover:bg-black/90"
            >
              Get Started
              <span aria-hidden className="inline-block">
                →
              </span>
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex h-14 items-center justify-center rounded-full px-8 text-base font-bold text-black ring-1 ring-zinc-200 transition hover:bg-zinc-50"
            >
              Learn more
            </Link>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-2 text-sm text-zinc-500 sm:flex-row">
            <span>Already have an account?</span>
            <Link href="/auth/login" className="font-semibold text-black underline underline-offset-4">
              Login
            </Link>
            <span className="hidden sm:inline">·</span>
            <Link href="/auth/register" className="font-semibold text-black underline underline-offset-4">
              Sign up
            </Link>
          </div>

          <div className="mx-auto mt-10 w-full max-w-3xl">
            <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white px-6 py-5 text-left">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-black/5 blur-2xl" />
                <div className="absolute -right-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-black/5 blur-2xl" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/15 to-transparent" />
              </div>

              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-zinc-50 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.3em] text-zinc-500 ring-1 ring-zinc-200">
                    <span className="inline-block h-2 w-2 rounded-full bg-black/60" />
                    Sponsored AI picks
                  </div>
                  <div className="mt-3 text-lg font-semibold text-black">
                    Gemini-assisted discovery, curated for clean results.
                  </div>
                  <div className="mt-1 text-sm text-zinc-600">
                    Describe what you want. Hweibo suggests products instantly.
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href="/auth/register"
                    className="inline-flex h-10 items-center justify-center rounded-full bg-black px-5 text-sm font-semibold text-white transition hover:bg-black/90"
                  >
                    Try AI Search
                  </Link>
                  <Link
                    href="/auth/login"
                    className="inline-flex h-10 items-center justify-center rounded-full px-5 text-sm font-semibold text-black ring-1 ring-zinc-200 transition hover:bg-zinc-50"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 w-[min(98%,1400px)]">
          <RollingRail items={railItems} seconds={42} />
        </div>
      </section>

      <section id="how-it-works" className="mt-20 border-y border-zinc-100 bg-zinc-50 py-16">
        <div className="mx-auto w-[min(92%,1100px)]">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">How it works</h2>
            <p className="mt-3 text-base text-zinc-500">
              Simple, minimalist, and efficient shopping.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <HowItWorksCard
              title="Describe"
              description={
                "Tell Hweibo AI exactly what you are looking for in natural language. From style to specific technical features."
              }
              icon={
                <svg width="22" height="22" viewBox="0 0 29 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.33496 28.675V7.66005C2.33496 7.01792 2.5636 6.46823 3.02087 6.01095C3.47814 5.55368 4.02784 5.32505 4.66996 5.32505H23.35C23.9921 5.32505 24.5418 5.55368 24.9991 6.01095C25.4563 6.46823 25.685 7.01792 25.685 7.66005V21.67C25.685 22.3122 25.4563 22.8619 24.9991 23.3191C24.5418 23.7764 23.9921 24.005 23.35 24.005H7.00496L2.33496 28.675ZM6.01259 21.67H23.35V7.66005H4.66996V22.9835L6.01259 21.67Z"
                    fill="white"
                  />
                </svg>
              }
            />
            <HowItWorksCard
              title="Curate"
              description={
                "Our AI scans thousands of products across the web to find your perfect matches instantly. No more scrolling."
              }
              icon={
                <svg width="22" height="22" viewBox="0 0 29 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22.1825 13.4975L20.7231 10.2869L17.5125 8.82753L20.7231 7.36815L22.1825 4.15753L23.6419 7.36815L26.8525 8.82753L23.6419 10.2869L22.1825 13.4975ZM10.5075 26.34L7.58873 19.9188L1.16748 17L7.58873 14.0813L10.5075 7.66003L13.4262 14.0813L19.8475 17L13.4262 19.9188L10.5075 26.34Z"
                    fill="white"
                  />
                </svg>
              }
            />
            <HowItWorksCard
              title="Purchase"
              description={
                "Complete your purchase seamlessly with our integrated one-click checkout. Secure, fast, and unified."
              }
              icon={
                <svg width="22" height="22" viewBox="0 0 29 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.16748 7.66005V5.32505H4.99104L9.95292 15.8325H18.1254L22.6787 7.66005H25.3347L20.1977 16.9417C19.9837 17.3308 19.6967 17.6324 19.3367 17.8465C18.9767 18.0605 18.5827 18.1675 18.1546 18.1675H9.45673L8.17248 20.5025H22.1825V22.8375H8.17248C7.29686 22.8375 6.63041 22.4581 6.17314 21.6992C5.71587 20.9404 5.70127 20.1718 6.12936 19.3934L7.70548 16.533L3.50248 7.66005H1.16748Z"
                    fill="white"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 w-[min(92%,1100px)] rounded-[40px] bg-black px-8 py-16 text-center text-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
        <h2 className="text-4xl font-extrabold leading-[1.05] sm:text-5xl">
          Ready to transform your
          <br />
          shopping?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-300 sm:text-lg">
          Join thousands of users shopping smarter every day with the most minimalist AI experience.
        </p>
        <div className="mt-10">
          <Link
            href="/auth/register"
            className="inline-flex h-16 items-center justify-center rounded-full bg-white px-10 text-base font-bold text-black transition hover:bg-zinc-100"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
