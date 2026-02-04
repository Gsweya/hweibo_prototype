const settings = [
  {
    label: "Company name",
    value: "Acme Hospitality Group",
  },
  {
    label: "Primary role",
    value: "Buyer",
  },
  {
    label: "Region",
    value: "North America",
  },
];

const notifications = [
  "New supplier matches",
  "Weekly market pulse",
  "Shipment updates",
];

export function ProfileSettings() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <div>
        <p className="text-sm text-slate-400">Profile settings</p>
        <h2 className="text-xl font-semibold">Account preferences</h2>
      </div>
      <div className="mt-5 space-y-4">
        {settings.map((setting) => (
          <div key={setting.label} className="rounded-xl border border-slate-800 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              {setting.label}
            </p>
            <p className="mt-1 text-sm text-slate-200">{setting.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
        <p className="text-sm font-medium text-slate-200">Notifications</p>
        <div className="mt-3 space-y-2">
          {notifications.map((item) => (
            <label key={item} className="flex items-center justify-between text-sm">
              <span>{item}</span>
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-emerald-400"
              />
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}
