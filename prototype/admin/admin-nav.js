(function () {
  const nav = document.querySelector("[data-admin-nav]");
  if (!nav) return;

  const ICONS = {
    dashboard: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>',
    users: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    categories: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.59 13.41 11 3.83a2 2 0 0 0-1.42-.59H4a2 2 0 0 0-2 2v5.59a2 2 0 0 0 .59 1.41L12.17 22a2 2 0 0 0 2.83 0l5.59-5.59a2 2 0 0 0 0-2.83Z"/><path d="M7 7h.01"/></svg>',
    "new-user": '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6"/><path d="M22 11h-6"/></svg>',
    "seller-view": '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>',
    "buyer-view": '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>'
  };

  const active = document.body.getAttribute("data-admin-active") || "dashboard";

  const common =
    "inline-flex w-full items-center justify-start gap-2.5 text-sm sm:text-base whitespace-nowrap px-4 py-2 rounded-full border transition-colors duration-150";
  const activeCls = "bg-zinc-100 border-zinc-200 text-zinc-900 font-semibold";
  const inactiveCls = "border-transparent text-zinc-500 hover:text-zinc-900 hover:font-semibold font-medium";

  nav.querySelectorAll("[data-admin-id]").forEach((item) => {
    const id = item.getAttribute("data-admin-id") || "";
    if (item.querySelector("svg")) return;
    const label = (item.querySelector("span")?.textContent || item.textContent || "").trim();
    item.innerHTML = `${ICONS[id] || ""}<span>${label}</span>`;
  });

  nav.querySelectorAll("[data-admin-id]").forEach((item) => {
    const id = item.getAttribute("data-admin-id") || "";
    if (id === active) {
      item.className = `${common} ${activeCls}`;
      item.setAttribute("aria-current", "page");
    } else {
      item.className = `${common} ${inactiveCls}`;
      item.removeAttribute("aria-current");
    }
  });

  const hoverZone = nav.parentElement || nav;
  nav.style.width = "220px";
  nav.style.gap = "4px";

  hoverZone.style.padding = "12px";
  hoverZone.style.borderRadius = "22px";
  hoverZone.style.border = "1px solid rgba(228, 228, 231, 0.85)";
  hoverZone.style.background = "linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(250, 250, 250, 0.82))";
  hoverZone.style.backdropFilter = "blur(10px)";
  hoverZone.style.webkitBackdropFilter = "blur(10px)";

  nav.querySelectorAll("[data-admin-id]").forEach((item) => {
    item.style.maxHeight = "none";
    item.style.opacity = "1";
    item.style.pointerEvents = "auto";
    item.style.overflow = "visible";
    item.style.transitionProperty = "color, background-color, border-color";
  });
})();
