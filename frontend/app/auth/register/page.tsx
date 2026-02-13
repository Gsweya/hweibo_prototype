"use client";

import Link from "next/link";
import { BadgeCheck, Layers, LineChart, Rocket } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const perks = [
  {
    title: "Role-ready workspaces",
    description: "Invite buyers, sellers, and admins with tailored dashboards from day one.",
    icon: Layers,
  },
  {
    title: "Launch momentum",
    description: "Automated timelines keep every launch coordinated without extra tooling.",
    icon: Rocket,
  },
  {
    title: "Signal intelligence",
    description: "AI scores market activity so you stay ahead of demand spikes.",
    icon: LineChart,
  },
];

const onboardingSteps = ["Create your workspace", "Connect your markets", "Ship your first drop"];

export default function RegisterPage() {
  return (
    <div className="app-shell relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="background-orb-1 orb-float" />
      <div className="background-orb-2 orb-float-delay" />
      <div className="background-orb-3 orb-float-slow" />
      <div className="auth-grid" />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="space-y-8">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.6em] text-slate-300/80">
                Create account
              </p>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                Build your Hweibo workspace.
              </h1>
              <p className="text-lg text-slate-200/80">
                Join a network of teams orchestrating product drops, feedback, and
                pricing with the help of AI.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {perks.map((perk) => {
                const Icon = perk.icon;
                return (
                  <div
                    key={perk.title}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                  >
                    <div className="flex items-center gap-3 text-sm font-semibold text-white">
                      <span className="grid size-10 place-items-center rounded-2xl bg-white/10 text-white/80">
                        <Icon className="size-4" />
                      </span>
                      <span>{perk.title}</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-200/70">
                      {perk.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span className="grid size-9 place-items-center rounded-2xl bg-white/10 text-white/80">
                  <BadgeCheck className="size-4" />
                </span>
                Onboarding timeline
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-200/70">
                {onboardingSteps.map((step, index) => (
                  <div key={step} className="flex items-center gap-3">
                    <span className="grid size-6 place-items-center rounded-full border border-white/20 text-xs">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="glass-panel w-full max-w-md justify-self-center border border-white/20 bg-white/5 p-6 shadow-[0_30px_80px_rgba(2,6,23,0.65)] backdrop-blur-3xl">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-slate-200/70">
              <span>Sign up</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.6rem]">
                Free tier
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-semibold text-white">
              Create your workspace.
            </h2>
            <p className="mt-2 text-sm text-slate-200/80">
              Start with your core details and refine later.
            </p>

            <form className="mt-6 space-y-4">
              <label className="block text-sm text-slate-200/80">
                Full name
                <Input
                  type="text"
                  placeholder="Arielle Turner"
                  autoComplete="name"
                  className="mt-2 h-12 rounded-2xl border-white/15 bg-white/5 text-white placeholder:text-slate-300/60 focus-visible:border-white/70 focus-visible:ring-white/20"
                />
              </label>

              <label className="block text-sm text-slate-200/80">
                Work email
                <Input
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  className="mt-2 h-12 rounded-2xl border-white/15 bg-white/5 text-white placeholder:text-slate-300/60 focus-visible:border-white/70 focus-visible:ring-white/20"
                />
              </label>

              <label className="block text-sm text-slate-200/80">
                Password
                <Input
                  type="password"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  className="mt-2 h-12 rounded-2xl border-white/15 bg-white/5 text-white placeholder:text-slate-300/60 focus-visible:border-white/70 focus-visible:ring-white/20"
                />
              </label>

              <label className="block text-sm text-slate-200/80">
                Confirm password
                <Input
                  type="password"
                  placeholder="Repeat password"
                  autoComplete="new-password"
                  className="mt-2 h-12 rounded-2xl border-white/15 bg-white/5 text-white placeholder:text-slate-300/60 focus-visible:border-white/70 focus-visible:ring-white/20"
                />
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-200/70">
                <Checkbox />
                I agree to receive onboarding tips and product updates.
              </label>

              <Button className="h-12 w-full rounded-2xl bg-white text-slate-900 hover:bg-white/90">
                Create account
              </Button>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs text-slate-200/50">
              <span className="h-px flex-1 bg-white/10" />
              OR START WITH
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                variant="outline"
                className="h-11 rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                Google
              </Button>
              <Button
                variant="outline"
                className="h-11 rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                Microsoft
              </Button>
            </div>

            <p className="mt-6 text-center text-xs text-slate-200/70">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-semibold text-white">
                Sign in
              </Link>
            </p>
          </section>
        </div>
      </div>

      <style jsx>{`
        .auth-grid {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top, rgba(255, 255, 255, 0.08), transparent 55%),
            linear-gradient(120deg, rgba(15, 23, 42, 0.4), transparent 45%);
          opacity: 0.5;
          pointer-events: none;
        }
        .orb-float {
          animation: float 12s ease-in-out infinite;
        }
        .orb-float-delay {
          animation: float 14s ease-in-out infinite;
          animation-delay: 1s;
        }
        .orb-float-slow {
          animation: float 18s ease-in-out infinite;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(24px);
          }
        }
      `}</style>
    </div>
  );
}
