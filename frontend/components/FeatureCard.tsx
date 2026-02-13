import type { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/20 bg-white/5 p-6 shadow-[0_20px_50px_rgba(2,6,23,0.45)] backdrop-blur-3xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white/90">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-slate-200/80">{description}</p>
    </div>
  );
}
