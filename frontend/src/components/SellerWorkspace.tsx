const searchResults = [
  "Recycled PET bottles - 1L (MOQ 10k)",
  "Plant-based detergent pods", 
  "Organic cotton tote bags",
  "Reusable silicone storage bags",
];

const browseCollections = [
  {
    title: "Home & Kitchen",
    count: "128 active listings",
  },
  {
    title: "Personal Care",
    count: "84 active listings",
  },
  {
    title: "Packaging",
    count: "52 active listings",
  },
];

export function SellerWorkspace() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Seller workspace</p>
          <h2 className="text-xl font-semibold">Search / Browse tabs</h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="rounded-full bg-slate-800 px-2 py-1">Search</span>
          <span className="rounded-full border border-slate-700 px-2 py-1">Browse</span>
        </div>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
          <p className="text-sm font-medium text-slate-200">Search results</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {searchResults.map((result) => (
              <li key={result} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                <span>{result}</span>
              </li>
            ))}
          </ul>
          <button className="mt-4 w-full rounded-lg bg-emerald-500/20 px-3 py-2 text-sm text-emerald-200">
            Save search
          </button>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
          <p className="text-sm font-medium text-slate-200">Browse collections</p>
          <div className="mt-3 space-y-3">
            {browseCollections.map((collection) => (
              <div
                key={collection.title}
                className="flex items-center justify-between rounded-lg border border-slate-800 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium">{collection.title}</p>
                  <p className="text-xs text-slate-400">{collection.count}</p>
                </div>
                <button className="text-xs text-slate-300">Open</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
