"use client";

import { Button } from "@/components/ui/button";

const chatMessages = [
  {
    role: "assistant",
    text: "Scope the latest curated drops, then draft a hero pitch for the launch.",
  },
  {
    role: "user",
    text: "Highlight the story, product features, and how creators can benefit.",
  },
  {
    role: "assistant",
    text: "Include urgency, a flexible pricing tier, and the transparency of your roadmap.",
  },
];

export function ChatSection() {
  return (
    <div className="glass-panel flex flex-col gap-6 rounded-[32px] border border-white/20 bg-white/5 p-6 shadow-[0_25px_90px_rgba(2,6,23,0.65)] backdrop-blur-3xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-300/80">Prompt Kit</p>
          <h3 className="text-xl font-semibold text-white">Creative AI co-pilot</h3>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
          Live
        </span>
      </div>

      <div className="space-y-4">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-100/90 shadow-[0_10px_20px_rgba(2,6,23,0.45)]"
          >
            <p className="text-[0.65rem] uppercase tracking-[0.4em] text-white/60">
              {message.role}
            </p>
            <p className="mt-2 text-base">{message.text}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <textarea
          aria-label="Prompt input"
          rows={3}
          placeholder="Ask the ai to build product messaging, roadmap notes, or onboarding scripts..."
          className="w-full rounded-3xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white outline-none backdrop-blur-lg focus:border-white/60"
        />
        <div className="flex items-center justify-between">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/60">Powered by prompt-kit</p>
          <Button variant="secondary" size="sm" className="rounded-full px-5 py-2">
            Send prompt
          </Button>
        </div>
      </div>
    </div>
  );
}
