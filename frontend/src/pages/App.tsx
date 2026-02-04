import { RegistrationCard } from "../components/RegistrationCard";
import { SellerWorkspace } from "../components/SellerWorkspace";
import { AiPromptPanel } from "../components/AiPromptPanel";
import { ProfileSettings } from "../components/ProfileSettings";

export function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Hweibo</p>
            <h1 className="text-2xl font-semibold">Marketplace Prototype</h1>
          </div>
          <button className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200">
            Invite teammate
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-6 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-6">
          <RegistrationCard />
          <SellerWorkspace />
          <AiPromptPanel />
        </section>
        <aside className="space-y-6">
          <ProfileSettings />
        </aside>
      </main>
    </div>
  );
}
