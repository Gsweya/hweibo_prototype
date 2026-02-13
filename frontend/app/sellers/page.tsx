"use client";

import Link from "next/link";
import { FeatureCard } from "@/components/FeatureCard";
import { PersonaCard } from "@/components/persona/PersonaCard";
import { Button } from "@/components/ui/button";

const sellerStories = [
  {
    role: "Launch",
    title: "Coordinate drops",
    description: "Preview curated timelines, collector feedback, and multi-market allocations in one pane.",
    metric: "24h ready",
    icon: "🚚",
    accent: "bg-gradient-to-b from-amber-400/10 to-orange-500/5",
  },
  {
    role: "Insights",
    title: "Creator pulse",
    description: "Live dashboards show which influencers are trending and which collaborations need attention.",
    metric: "Realtime",
    icon: "📡",
    accent: "bg-gradient-to-b from-cyan-400/10 to-blue-500/5",
  },
];

const seals = [
  { title: "Launch control rooms", description: "Customizable hero panels that adapt to your brand identity." },
  { title: "Invite creators", description: "Role-based invites keep tickets and payout logic isolated." },
];

export default function SellersPage() {
  return (
    <div className="app-shell flex min-h-screen flex-col gap-10">
      <div className="glass-panel space-y-6 rounded-[32px] border border-white/20 bg-white/5 p-8 backdrop-blur-[24px]">
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.6em] text-slate-300">Sellers</p>
          <h1 className="text-4xl font-semibold text-white">Preview curated drops &amp; manage flows.</h1>
          <p className="text-sm text-slate-200/80">Everything you need to keep creators on-brand and on schedule.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {seals.map((seal) => (
            <FeatureCard key={seal.title} title={seal.title} description={seal.description} icon={<span>•</span>} />
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="default" size="default" className="rounded-full px-6 py-3">
            Start a launch
          </Button>
          <Link href="/auth/login">
            <Button variant="secondary" size="sm">
              Login
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {sellerStories.map((story) => (
          <PersonaCard
            key={story.title}
            role={story.role}
            title={story.title}
            description={story.description}
            metric={story.metric}
            icon={<span className="text-2xl">{story.icon}</span>}
            accent={story.accent}
          />
        ))}
      </div>
    </div>
  );
}
