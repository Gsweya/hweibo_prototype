"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoginPanel } from "@/components/auth/LoginPanel";
import { SignupPanel } from "@/components/auth/SignupPanel";

export default function AuthLanding() {
  return (
    <div className="app-shell flex min-h-screen flex-col items-center justify-center gap-8">
      <div className="glass-shell m-0 flex w-full max-w-5xl flex-col gap-8 rounded-[32px] border border-white/20 bg-white/5 px-6 py-8 shadow-[0_20px_60px_rgba(2,6,23,0.5)] backdrop-blur-3xl">
        <header className="flex flex-col gap-2 text-center text-white">
          <p className="text-xs uppercase tracking-[0.5em] text-slate-300">Authentication</p>
          <h1 className="text-3xl font-semibold md:text-4xl">Choose your entry point</h1>
          <p className="text-sm text-slate-200/80">
            Secure login, quick onboarding, and dedicated sign-up experiences for sellers, admins, and buyers.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <LoginPanel />
          <SignupPanel />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/70">
          <span>Need role-based access?</span>
          <Link href="/sellers">
            <Button variant="ghost" size="sm">
              Sellers
            </Button>
          </Link>
          <Link href="/admins">
            <Button variant="ghost" size="sm">
              Admins
            </Button>
          </Link>
          <Link href="/buyers">
            <Button variant="ghost" size="sm">
              Buyers
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
