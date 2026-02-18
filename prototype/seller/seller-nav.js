(function () {
  const nav = document.querySelector("[data-seller-nav]");
  if (!nav) return;

  const ICONS = {
    dashboard: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>',
    products: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/></svg>',
    orders: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>',
    analytics: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/></svg>',
    "new-product": '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
    "buyer-view": '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>',
    "admin-view": '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2s4 2 7 2v6c0 5-3.5 8-7 10-3.5-2-7-5-7-10V4c3 0 7-2 7-2z"/><path d="M9.5 11.5 11 13l3.5-3.5"/></svg>'
  };

  const order = ["dashboard", "products", "orders", "analytics", "new-product", "buyer-view", "admin-view"];
  const active = document.body.getAttribute("data-seller-active") || "dashboard";
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
    nav.querySelectorAll("[data-seller-id]").forEach((item) => {
      const id = item.getAttribute("data-seller-id") || "";
      setVisible(item, collapsed.has(id));
    });
  }

  function showAll() {
    nav.querySelectorAll("[data-seller-id]").forEach((item) => setVisible(item, true));
  }

  const common =
    "inline-flex items-center gap-2.5 text-sm sm:text-base whitespace-nowrap px-4 py-2 rounded-full border transition-all duration-300";
  const activeCls = "bg-zinc-100 border-zinc-200 text-zinc-900 font-semibold";
  const inactiveCls = "border-transparent text-zinc-500 hover:text-zinc-900 hover:font-semibold font-medium";

  nav.querySelectorAll("[data-seller-id]").forEach((item) => {
    const id = item.getAttribute("data-seller-id") || "";
    if (item.querySelector("svg")) return;
    const label = (item.querySelector("span")?.textContent || item.textContent || "").trim();
    item.innerHTML = `${ICONS[id] || ""}<span>${label}</span>`;
  });

  nav.querySelectorAll("[data-seller-id]").forEach((item) => {
    const id = item.getAttribute("data-seller-id") || "";
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
