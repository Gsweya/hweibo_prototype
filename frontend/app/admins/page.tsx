"use client";

import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/FeatureCard";
import { PersonaCard } from "@/components/persona/PersonaCard";

const adminHighlights = [
  {
    role: "Safety",
    title: "Governance cockpit",
    description: "Audit logs, approvals, and compliance rules live in one central hub.",
    metric: "Trusted",
    icon: "🛡️",
    accent: "bg-gradient-to-b from-slate-500/10 to-slate-900/5",
  },
  {
    role: "Ops",
    title: "Workflow intelligence",
    description: "Automated routing surfaces escalations before they touch the runway.",
    metric: "Auto",
    icon: "⚙️",
    accent: "bg-gradient-to-b from-purple-400/10 to-slate-900/5",
  },
];

const adminFeatures = [
  { title: "Drill into data", description: "Dynamic dashboards for regulations, fraud detection, and payouts." },
  { title: "Shared knowledge", description: "Contextual documentation surfaces inside every workflow." },
];

export default function AdminPage() {
  return (
    <div className="app-shell flex min-h-screen flex-col gap-10">
      <div className="glass-panel space-y-5 rounded-[32px] border border-white/20 bg-white/5 p-8 backdrop-blur-[24px]">
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.6em] text-slate-300/70">Admins</p>
          <h1 className="text-4xl font-semibold text-white">Run the platform with confidence.</h1>
          <p className="text-sm text-slate-200/80">
            Role-aware tooling tunes permissions, compliance, and security for every release.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {adminFeatures.map((feature) => (
            <FeatureCard key={feature.title} title={feature.title} description={feature.description} icon={<span>•</span>} />
          ))}
        </div>
        <div>
          <Button variant="default" size="default" className="rounded-full px-6 py-3">
            Manage access
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {adminHighlights.map((highlight) => (
          <PersonaCard
            key={highlight.title}
            role={highlight.role}
            title={highlight.title}
            description={highlight.description}
            metric={highlight.metric}
            icon={<span className="text-2xl">{highlight.icon}</span>}
            accent={highlight.accent}
          />
        ))}
      </div>
    </div>
  );
}
