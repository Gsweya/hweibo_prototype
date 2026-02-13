"use client";

import Link from "next/link";

const ITEMS = [
  { label: "Help", href: "/#help" },
  { label: "Support", href: "/#support" },
  { label: "About", href: "/#about" },
  { label: "How it works", href: "/#how-it-works" },
];

export const Navbar = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] w-[min(92%,1100px)] items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-3">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-black text-white">
            <svg width="14" height="14" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.99996 16.6667C3.63329 16.6667 3.3194 16.5362 3.05829 16.2751C2.79718 16.014 2.66663 15.7001 2.66663 15.3334V7.33341C2.66663 6.96675 2.79718 6.65286 3.05829 6.39175C3.3194 6.13064 3.63329 6.00008 3.99996 6.00008H5.33329C5.33329 5.26675 5.5944 4.63897 6.11663 4.11675C6.63885 3.59453 7.26663 3.33341 7.99996 3.33341C8.73329 3.33341 9.36107 3.59453 9.88329 4.11675C10.4055 4.63897 10.6666 5.26675 10.6666 6.00008H12C12.3666 6.00008 12.6805 6.13064 12.9416 6.39175C13.2027 6.65286 13.3333 6.96675 13.3333 7.33341V15.3334C13.3333 15.7001 13.2027 16.014 12.9416 16.2751C12.6805 16.5362 12.3666 16.6667 12 16.6667H3.99996Z"
                fill="white"
              />
            </svg>
          </span>
          <span className="text-lg font-extrabold tracking-tight text-black">Hweibo</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50 hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/auth/login"
          className="inline-flex h-10 items-center justify-center rounded-full bg-black px-8 text-sm font-bold text-white transition hover:bg-black/90"
        >
          Login
        </Link>
      </div>
    </header>
  );
};
