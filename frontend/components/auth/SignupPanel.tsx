"use client";

import { Button } from "@/components/ui/button";

export function SignupPanel() {
  return (
    <div className="glass-panel border border-white/30 bg-white/5 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-200/70">Create account</p>
        <span className="text-[0.65rem] text-slate-200/60">Free</span>
      </div>

      <h2 className="mt-4 text-2xl font-semibold text-white">Start building</h2>

      <form className="mt-6 space-y-4">
        <label className="block text-sm text-slate-200/80">
          Full name
          <input
            type="text"
            placeholder="Arielle Turner"
            className="mt-1 w-full rounded-2xl border border-white/30 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/80"
          />
        </label>

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

        <Button type="submit" variant="default" size="default" className="w-full">
          Create workspace
        </Button>
      </form>
    </div>
  );
}
