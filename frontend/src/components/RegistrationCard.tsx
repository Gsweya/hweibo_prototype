const roles = [
  {
    title: "Buyer",
    description: "Browse curated product bundles and request quick samples.",
  },
  {
    title: "Seller",
    description: "List inventory, respond to RFPs, and manage fulfillment.",
  },
  {
    title: "Partner",
    description: "Connect logistics, payments, or sourcing integrations.",
  },
];

export function RegistrationCard() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Registration</p>
          <h2 className="text-xl font-semibold">Choose your primary role</h2>
        </div>
        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300">
          Step 1 of 3
        </span>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {roles.map((role) => (
          <div
            key={role.title}
            className="rounded-xl border border-slate-800 bg-slate-950/40 p-4"
          >
            <h3 className="text-lg font-semibold">{role.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{role.description}</p>
            <button className="mt-4 w-full rounded-lg border border-slate-700 px-3 py-2 text-sm">
              Select {role.title}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
