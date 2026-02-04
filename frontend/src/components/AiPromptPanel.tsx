const aiSuggestions = [
  "Bamboo toothbrush starter kit",
  "Refillable glass cleaning spray",
  "Zero-waste travel toiletries",
  "Compostable cutlery set",
  "Organic cotton bedding set",
];

export function AiPromptPanel() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">AI prompt interface</p>
          <h2 className="text-xl font-semibold">Ask for product ideas</h2>
        </div>
        <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
          Returns 5 products
        </span>
      </div>
      <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
        <label className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Prompt
        </label>
        <p className="mt-2 text-sm text-slate-200">
          “Suggest sustainable, low-MOQ products for boutique hotels.”
        </p>
        <div className="mt-4 grid gap-2">
          {aiSuggestions.map((item) => (
            <div
              key={item}
              className="rounded-lg border border-slate-800 bg-slate-900/40 px-3 py-2 text-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
