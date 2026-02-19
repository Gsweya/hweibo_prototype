/* Prototype sidebar behavior (no build step).
   - Keeps all tabs visible at all times.
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

    function setRowVisible(id, visible) {
      const row = rows.get(id);
      if (!row) return;
      row.style.maxHeight = visible ? "none" : "0px";
      row.style.opacity = visible ? "1" : "0";
      row.style.pointerEvents = visible ? "auto" : "none";
      row.style.overflow = visible ? "visible" : "hidden";
      row.style.transition = "none";
    }

    function showAll() {
      for (const id of order) setRowVisible(id, true);
    }

    const hoverZone = nav.parentElement || nav;
    nav.style.width = "220px";
    nav.style.gap = "4px";

    hoverZone.style.padding = "12px";
    hoverZone.style.borderRadius = "22px";
    hoverZone.style.border = "1px solid rgba(228, 228, 231, 0.85)";
    hoverZone.style.background = "linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(250, 250, 250, 0.82))";
    hoverZone.style.backdropFilter = "blur(10px)";
    hoverZone.style.webkitBackdropFilter = "blur(10px)";

    showAll();

    const common =
      "inline-flex w-full items-center justify-start gap-2.5 text-sm sm:text-base whitespace-nowrap px-4 py-2 rounded-full border transition-colors duration-150";
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
      link.style.transitionProperty = "color, background-color, border-color";
    });
  }

  const buyersNav = document.querySelector('[data-proto-nav="buyers"]');
  if (buyersNav) {
    const active = document.body.getAttribute("data-proto-active") || "search";
    setup(buyersNav, ["search", "browse", "orders", "wallet", "cart", "profile"], active);
  }
})();
