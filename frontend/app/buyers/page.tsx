"use client";

import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/FeatureCard";
import { PersonaCard } from "@/components/persona/PersonaCard";

const buyerArrivals = [
  {
    role: "Discovery",
    title: "Story-driven carts",
    description: "Guided journeys highlight product heritage, pricing tiers, and social proof.",
    metric: "VIP",
    icon: "📦",
    accent: "bg-gradient-to-b from-pink-400/10 to-rose-500/5",
  },
  {
    role: "Support",
    title: "Live concierge",
    description: "Prompt-kit powered chat keeps buyers informed and confident during checkout.",
    metric: "Live",
    icon: "💬",
    accent: "bg-gradient-to-b from-cyan-400/10 to-emerald-500/5",
  },
];

const buyerPath = [
  { title: "Personalized drops", description: "Curated suggestions based on your playbook." },
  { title: "Resale ready", description: "Manage provenance, authenticity, and waitlists without friction." },
];

export default function BuyersPage() {
  return (
    <div className="app-shell flex min-h-screen flex-col gap-10">
      <div className="glass-panel space-y-6 rounded-[32px] border border-white/20 bg-white/5 p-8 backdrop-blur-[24px]">
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.6em] text-slate-300/70">Buyers</p>
          <h1 className="text-4xl font-semibold text-white">Experience drops with narrative finesse.</h1>
          <p className="text-sm text-slate-200/80">
            Transparent pricing, high-touch support, and scroll-ready chat for every drop.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {buyerPath.map((entry) => (
            <FeatureCard key={entry.title} title={entry.title} description={entry.description} icon={<span>•</span>} />
          ))}
        </div>
        <div>
          <Button variant="secondary" size="default" className="rounded-full px-6 py-3">
            Browse collection
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {buyerArrivals.map((arrival) => (
          <PersonaCard
            key={arrival.title}
            role={arrival.role}
            title={arrival.title}
            description={arrival.description}
            metric={arrival.metric}
            icon={<span className="text-2xl">{arrival.icon}</span>}
            accent={arrival.accent}
          />
        ))}
      </div>
    </div>
  );
}
