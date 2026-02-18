(function () {
  const nav = document.querySelector("[data-admin-nav]");
  if (!nav) return;

  const ICONS = {
    dashboard: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>',
    users: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    "new-user": '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6"/><path d="M22 11h-6"/></svg>',
    "seller-view": '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>',
    "buyer-view": '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>'
  };

  const order = ["dashboard", "users", "new-user", "seller-view", "buyer-view"];
  const active = document.body.getAttribute("data-admin-active") || "dashboard";
  const activeIndex = order.indexOf(active);
  const collapsed = new Set();

  if (activeIndex === -1) {
    collapsed.add(order[0]);
    if (order[1]) collapsed.add(order[1]);
  } else {
    collapsed.add(order[activeIndex]);
    if (order[activeIndex - 1]) collapsed.add(order[activeIndex - 1]);
    if (order[activeIndex + 1]) collapsed.add(order[activeIndex + 1]);
  }

  function setVisible(item, visible) {
    item.style.maxHeight = visible ? "56px" : "0px";
    item.style.opacity = visible ? "1" : "0";
    item.style.pointerEvents = visible ? "auto" : "none";
    item.style.overflow = "hidden";
  }

  function showCollapsed() {
    nav.querySelectorAll("[data-admin-id]").forEach((item) => {
      const id = item.getAttribute("data-admin-id") || "";
      setVisible(item, collapsed.has(id));
    });
  }

  function showAll() {
    nav.querySelectorAll("[data-admin-id]").forEach((item) => setVisible(item, true));
  }

  const common =
    "inline-flex items-center gap-2.5 text-sm sm:text-base whitespace-nowrap px-4 py-2 rounded-full border transition-all duration-300";
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
  hoverZone.style.padding = "10px 8px";

  showCollapsed();
  hoverZone.addEventListener("mouseenter", showAll);
  hoverZone.addEventListener("mouseleave", showCollapsed);

  nav.addEventListener("focusin", showAll);
  nav.addEventListener("focusout", (event) => {
    const next = event.relatedTarget;
    if (next && nav.contains(next)) return;
    showCollapsed();
  });
})();
