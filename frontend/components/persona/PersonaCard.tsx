import type { ReactNode } from "react";

interface PersonaCardProps {
  role: string;
  title: string;
  description: string;
  metric: string;
  icon: ReactNode;
  accent: string;
}

export function PersonaCard({ role, title, description, metric, icon, accent }: PersonaCardProps) {
  return (
    <div
      className={`group flex flex-col gap-3 rounded-3xl border border-white/20 bg-white/5 p-6 shadow-[0_20px_60px_rgba(2,6,23,0.55)] transition hover:border-white/40 hover:shadow-[0_30px_80px_rgba(2,6,23,0.6)] ${accent}`}
    >
      <div className="flex items-center justify-between text-white/80">
        <span className="text-xs uppercase tracking-[0.5em]">{role}</span>
        <div className="rounded-full bg-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-white/60">
          {metric}
        </div>
      </div>
      <div className="flex items-center gap-3 text-2xl">{icon}</div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-200/80">{description}</p>
    </div>
  );
}
