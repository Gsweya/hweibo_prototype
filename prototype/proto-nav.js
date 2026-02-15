/* Prototype sidebar behavior (no build step).
   - Keeps a fixed item order.
   - Shows Search + Browse always.
   - Also shows active + immediate neighbors.
   - Reveals all on hover/focus.
*/

(function () {
  function setup(nav, order, activeId) {
    const rows = new Map();
    nav.querySelectorAll("[data-proto-id]").forEach((el) => {
      const id = el.getAttribute("data-proto-id") || "";
      const row = el.closest("[data-proto-row]");
      if (!id || !row) return;
      rows.set(id, row);
    });

    const activeIndex = order.indexOf(activeId);
    const pinned = new Set(["search", "browse"]);
    if (activeIndex !== -1) {
      pinned.add(order[activeIndex]);
      if (activeIndex - 1 >= 0) pinned.add(order[activeIndex - 1]);
      if (activeIndex + 1 < order.length) pinned.add(order[activeIndex + 1]);
    }

    function setRowVisible(id, visible) {
      const row = rows.get(id);
      if (!row) return;
      row.style.maxHeight = visible ? "56px" : "0px";
      row.style.opacity = visible ? "1" : "0";
      row.style.pointerEvents = visible ? "auto" : "none";
    }

    function applyPinned() {
      for (const id of order) setRowVisible(id, pinned.has(id));
    }

    function revealAll() {
      for (const id of order) setRowVisible(id, true);
    }

    // initial
    applyPinned();

    // hover
    nav.addEventListener("mouseenter", revealAll);
    nav.addEventListener("mouseleave", applyPinned);

    // keyboard focus
    nav.addEventListener("focusin", revealAll);
    nav.addEventListener("focusout", (e) => {
      const next = e.relatedTarget;
      if (next && nav.contains(next)) return;
      applyPinned();
    });

    const common =
      "flex items-center gap-3 text-base sm:text-lg whitespace-nowrap py-1.5 transition-all duration-300 ease-out";
    const activeCls = "text-black font-bold";
    const inactiveCls = "text-zinc-400 hover:text-black hover:font-bold font-medium";

    // aria-current + active styling
    nav.querySelectorAll("[data-proto-id]").forEach((el) => {
      const id = el.getAttribute("data-proto-id") || "";
      if (id === activeId) {
        el.setAttribute("aria-current", "page");
        el.className = `${common} ${activeCls}`;
      } else {
        el.removeAttribute("aria-current");
        el.className = `${common} ${inactiveCls}`;
      }
    });
  }

  const buyersNav = document.querySelector('[data-proto-nav="buyers"]');
  if (buyersNav) {
    const active = document.body.getAttribute("data-proto-active") || "search";
    setup(
      buyersNav,
      ["search", "browse", "orders", "wallet", "cart", "profile"],
      active
    );
  }
})();
