/* Prototype sidebar behavior (no build step).
   - Keeps a fixed item order.
   - Collapsed: active tab + one above + one below.
   - Hover/focus: reveals all tabs.
   - Active pill stays only on the active tab.
*/

(function () {
  function setup(nav, order, activeId) {
    const rows = new Map();
    nav.querySelectorAll("[data-proto-id]").forEach((link) => {
      const id = link.getAttribute("data-proto-id") || "";
      const row = link.closest("[data-proto-row]");
      if (!id || !row) return;
      rows.set(id, row);
    });

    const activeIndex = order.indexOf(activeId);
    const collapsed = new Set();
    if (activeIndex === -1) {
      collapsed.add(order[0]);
      if (order[1]) collapsed.add(order[1]);
    } else {
      collapsed.add(order[activeIndex]);
      if (order[activeIndex - 1]) collapsed.add(order[activeIndex - 1]);
      if (order[activeIndex + 1]) collapsed.add(order[activeIndex + 1]);
    }

    function setRowVisible(id, visible) {
      const row = rows.get(id);
      if (!row) return;
      row.style.maxHeight = visible ? "64px" : "0px";
      row.style.opacity = visible ? "1" : "0";
      row.style.pointerEvents = visible ? "auto" : "none";
    }

    function applyCollapsed() {
      for (const id of order) setRowVisible(id, collapsed.has(id));
    }

    function revealAll() {
      for (const id of order) setRowVisible(id, true);
    }

    const hoverZone = nav.parentElement || nav;
    hoverZone.style.padding = "10px 8px";

    applyCollapsed();

    hoverZone.addEventListener("mouseenter", revealAll);
    hoverZone.addEventListener("mouseleave", applyCollapsed);

    nav.addEventListener("focusin", revealAll);
    nav.addEventListener("focusout", (event) => {
      const next = event.relatedTarget;
      if (next && nav.contains(next)) return;
      applyCollapsed();
    });

    const common =
      "inline-flex items-center gap-2.5 text-sm sm:text-base whitespace-nowrap px-4 py-2 rounded-full border transition-all duration-300 ease-out";
    const activeCls = "bg-zinc-100 border-zinc-200 text-zinc-900 font-semibold";
    const inactiveCls = "border-transparent text-zinc-500 hover:text-zinc-900 hover:font-semibold font-medium";

    nav.querySelectorAll("[data-proto-id]").forEach((link) => {
      const id = link.getAttribute("data-proto-id") || "";
      if (id === activeId) {
        link.setAttribute("aria-current", "page");
        link.className = `${common} ${activeCls}`;
      } else {
        link.removeAttribute("aria-current");
        link.className = `${common} ${inactiveCls}`;
      }
    });
  }

  const buyersNav = document.querySelector('[data-proto-nav="buyers"]');
  if (buyersNav) {
    const active = document.body.getAttribute("data-proto-active") || "search";
    setup(buyersNav, ["search", "browse", "orders", "wallet", "cart", "profile"], active);
  }
})();
