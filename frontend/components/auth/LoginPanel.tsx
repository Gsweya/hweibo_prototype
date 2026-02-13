"use client";

import { Button } from "@/components/ui/button";

const marqueeLines = [
  "Encrypted sessions • 99.99% uptime • event-driven product drops •",
  "Global creators onboarded weekly • responsive dashboard •",
  "Prototype-friendly tooling • build once, ship everywhere •",
];

export function LoginPanel() {
  return (
    <div className="glass-panel border border-white/30 bg-white/5 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-200/70">Member Access</p>
        <span className="text-[0.65rem] text-slate-200/60">Beta</span>
      </div>

      <h2 className="mt-4 text-2xl font-semibold text-white">Sign in to continue</h2>

      <form className="mt-6 space-y-4">
        <label className="block text-sm text-slate-200/80">
          Email
          <input
            type="email"
            placeholder="you@example.com"
            className="mt-1 w-full rounded-2xl border border-white/30 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/80"
          />
        </label>

        <label className="block text-sm text-slate-200/80">
          Password
          <input
            type="password"
            placeholder="••••••••"
            className="mt-1 w-full rounded-2xl border border-white/30 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/80"
          />
        </label>

        <Button type="submit" variant="outline" size="default" className="w-full">
          Unlock dashboard
        </Button>
      </form>

      <div className="relative mt-6 h-6 overflow-hidden rounded-full border border-white/20 bg-gradient-to-r from-white/10 via-white/20 to-white/10">
        <div className="marquee">
          {marqueeLines.map((line, index) => (
            <span
              key={`marquee-${index}`}
              className="mr-6 whitespace-nowrap text-[0.75rem] tracking-[0.2em] text-white/80"
            >
              {line}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
