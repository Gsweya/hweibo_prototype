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

  const TAB_URLS = {
    dashboard: "index.html",
    products: "sellers-products.html",
    orders: "sellers-orders.html",
    analytics: "sellers-analytics.html",
    "new-product": "sellers-new-product.html"
  };
  const INTERNAL_TABS = new Set(Object.keys(TAB_URLS));
  let active = document.body.getAttribute("data-seller-active") || "dashboard";

  const common =
    "inline-flex w-full items-center justify-start gap-2.5 text-sm sm:text-base whitespace-nowrap px-4 py-2 rounded-full border transition-colors duration-150";
  const activeCls = "bg-zinc-100 border-zinc-200 text-zinc-900 font-semibold";
  const inactiveCls = "border-transparent text-zinc-500 hover:text-zinc-900 hover:font-semibold font-medium";

  nav.querySelectorAll("[data-seller-id]").forEach((item) => {
    const id = item.getAttribute("data-seller-id") || "";
    if (item.querySelector("svg")) return;
    const label = (item.querySelector("span")?.textContent || item.textContent || "").trim();
    item.innerHTML = `${ICONS[id] || ""}<span>${label}</span>`;
  });

  function applyActiveClasses() {
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
  }

  applyActiveClasses();

  const hoverZone = nav.parentElement || nav;
  nav.style.width = "220px";
  nav.style.gap = "4px";

  hoverZone.style.padding = "12px";
  hoverZone.style.borderRadius = "22px";
  hoverZone.style.border = "1px solid rgba(228, 228, 231, 0.85)";
  hoverZone.style.background = "linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(250, 250, 250, 0.82))";
  hoverZone.style.backdropFilter = "blur(10px)";
  hoverZone.style.webkitBackdropFilter = "blur(10px)";

  nav.querySelectorAll("[data-seller-id]").forEach((item) => {
    item.style.maxHeight = "none";
    item.style.opacity = "1";
    item.style.pointerEvents = "auto";
    item.style.overflow = "visible";
    item.style.transitionProperty = "color, background-color, border-color";
  });

  function tabFromPath(pathname) {
    if (/\/seller\/?$/.test(pathname) || /\/seller\/index\.html$/.test(pathname)) return "dashboard";
    if (/\/seller\/sellers-products\.html$/.test(pathname)) return "products";
    if (/\/seller\/sellers-orders\.html$/.test(pathname)) return "orders";
    if (/\/seller\/sellers-analytics\.html$/.test(pathname)) return "analytics";
    if (/\/seller\/sellers-new-product\.html$/.test(pathname)) return "new-product";
    return null;
  }

  function absoluteSellerUrl(id) {
    return new URL(TAB_URLS[id], window.location.href).toString();
  }

  function clearDynamicPortals() {
    document.querySelectorAll("[data-seller-portal-mounted], [data-seller-portal]").forEach((node) => node.remove());
  }

  function mountPortalsFromDoc(doc) {
    clearDynamicPortals();
    doc.querySelectorAll("[data-seller-portal]").forEach((node) => {
      const clone = node.cloneNode(true);
      clone.setAttribute("data-seller-portal-mounted", "1");
      document.body.appendChild(clone);
    });
  }

  function ensureSellerDemo() {
    if (window.SellerDemo) return Promise.resolve();

    const existing = document.querySelector('script[src="seller-demo.js"]');
    if (existing) {
      return new Promise((resolve, reject) => {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
      });
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "seller-demo.js";
      script.onload = () => resolve();
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function initOrdersPage() {
    const sellerMapModal = document.getElementById("sellerMapModal");
    const expandBtn = document.getElementById("expandSellerMapBtn");
    const closeBtn = document.getElementById("closeSellerMapModal");
    if (!sellerMapModal || !expandBtn || !closeBtn || sellerMapModal.dataset.bound === "1") return;

    sellerMapModal.dataset.bound = "1";
    expandBtn.addEventListener("click", () => sellerMapModal.classList.remove("hidden"));
    closeBtn.addEventListener("click", () => sellerMapModal.classList.add("hidden"));
    document.querySelectorAll(".seller-track-btn").forEach((btn) => {
      btn.addEventListener("click", () => sellerMapModal.classList.remove("hidden"));
    });
  }

  async function initDashboardPage() {
    await ensureSellerDemo();
    const revenueValue = document.getElementById("revenueValue");
    const latestOrders = document.getElementById("latestOrders");
    const topProducts = document.getElementById("dashboardTopProducts");
    if (!revenueValue || !latestOrders) return;

    const products = window.SellerDemo.readProducts();
    const managedCategories = window.SellerDemo.readCategories();
    const summary = window.SellerDemo.getSummary(products);

    const estimatedRevenue = products.reduce((sum, product) => {
      const unit = Number(product.price) || 0;
      const estimatedUnits = Math.max(1, Math.min(8, Number(product.stock) || 1));
      return sum + (unit * estimatedUnits);
    }, 0);

    const orderCount = Math.max(12, Math.round(products.length * 6.5));
    const processingCount = Math.max(2, Math.round(orderCount * 0.18));
    const views = Math.max(120, Math.round(orderCount * 13.4));

    document.getElementById("revenueValue").textContent = window.SellerDemo.formatCurrency(estimatedRevenue);
    document.getElementById("revenueMeta").textContent = `${managedCategories.length} managed categories`;
    document.getElementById("ordersValue").textContent = orderCount;
    document.getElementById("ordersMeta").textContent = `${processingCount} in progress`;
    document.getElementById("inventoryValue").textContent = summary.totalStock;
    document.getElementById("inventoryMeta").textContent = `${summary.totalProducts} products listed`;
    if (document.getElementById("viewsValue")) document.getElementById("viewsValue").textContent = views;
    if (document.getElementById("viewsMeta")) document.getElementById("viewsMeta").textContent = "last 7 days";

    const locations = ["Dar es Salaam", "Arusha", "Mwanza", "Dodoma"];
    const statuses = ["Pending", "Shipped", "Processing", "Delivered"];
    latestOrders.innerHTML = products.slice(0, 4).map((product, index) => {
      const orderId = `HW-${String(9800 - index)}`;
      const qty = Math.max(1, Math.min(3, Math.round((Number(product.stock) || 1) / 10)));
      const total = (Number(product.price) || 0) * qty;
      const status = statuses[index % statuses.length];
      const badgeClass = status === "Shipped" || status === "Delivered"
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : status === "Pending"
          ? "bg-amber-50 text-amber-700 border-amber-200"
          : "bg-blue-50 text-blue-700 border-blue-200";
      return `
        <div class="rounded-2xl bg-zinc-50 border border-zinc-100 p-4">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="font-bold text-zinc-900">#${orderId}</p>
              <p class="text-sm text-zinc-500">${product.name}</p>
            </div>
            <span class="px-2 py-1 rounded-full border text-[11px] font-semibold ${badgeClass}">${status}</span>
          </div>
          <div class="mt-3 flex items-center justify-between gap-3">
            <p class="text-sm text-zinc-500">${qty} item${qty > 1 ? "s" : ""} · ${locations[index % locations.length]}</p>
            <span class="text-sm font-bold text-zinc-900">${window.SellerDemo.formatCurrency(total)}</span>
          </div>
        </div>
      `;
    }).join("") || '<p class="text-sm text-zinc-500">No recent orders yet.</p>';

    if (topProducts) {
      const topProductsData = products
        .slice()
        .sort((a, b) => Number(b.stock || 0) - Number(a.stock || 0))
        .slice(0, 6);

      topProducts.innerHTML = topProductsData.map((product) => `
        <tr>
          <td class="px-6 py-4 font-semibold text-zinc-900">${product.name}</td>
          <td class="px-6 py-4"><span class="px-2 py-1 rounded-full border border-zinc-200 bg-zinc-50 text-zinc-700">${product.category}</span></td>
          <td class="px-6 py-4 text-zinc-700">${product.stock}</td>
          <td class="px-6 py-4 text-zinc-700">${window.SellerDemo.formatCurrency(product.price)}</td>
        </tr>
      `).join("") || `
        <tr>
          <td class="px-6 py-6 text-sm text-zinc-500" colspan="4">No products listed yet.</td>
        </tr>
      `;
    }

    const categoryChips = document.getElementById("dashboardCategoryChips");
    if (categoryChips) {
      categoryChips.innerHTML = managedCategories.map((category) => {
        const count = summary.categories[category] || 0;
        return `<span class="px-3 py-1 rounded-full border border-zinc-200 bg-zinc-50 text-sm text-zinc-700">${category} · ${count}</span>`;
      }).join("") || '<p class="text-sm text-zinc-500">No categories available.</p>';
    }

    const dashboardActivity = document.getElementById("dashboardActivity");
    if (dashboardActivity) {
      dashboardActivity.innerHTML = products.slice(0, 4).map((product, index) => `
        <div class="flex items-center justify-between rounded-2xl border border-zinc-100 bg-zinc-50 p-3">
          <div>
            <p class="text-sm font-semibold text-zinc-900">${product.name}</p>
            <p class="text-xs text-zinc-500">Category: ${product.category}</p>
          </div>
          <span class="text-xs font-semibold text-zinc-700">Updated ${index + 1}h ago</span>
        </div>
      `).join("") || '<p class="text-sm text-zinc-500">No activity yet.</p>';
    }
  }

  async function initProductsPage() {
    await ensureSellerDemo();
    const searchInput = document.getElementById("productSearch");
    const categoryFilter = document.getElementById("categoryFilter");
    const rows = document.getElementById("productsRows");
    const count = document.getElementById("productCount");
    const empty = document.getElementById("emptyState");
    if (!searchInput || !categoryFilter || !rows || !count || !empty) return;
    if (searchInput.dataset.bound === "1") return;
    searchInput.dataset.bound = "1";

    const products = window.SellerDemo.readProducts();
    const managedCategories = window.SellerDemo.readCategories();

    const categories = Array.from(new Set([
      ...managedCategories,
      ...products.map((product) => product.category)
    ])).sort();
    categoryFilter.innerHTML = '<option value="all">All categories</option>';
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });

    function render() {
      const term = searchInput.value.trim().toLowerCase();
      const selected = categoryFilter.value;
      const filtered = products.filter((product) => {
        const matchesSearch = !term || product.name.toLowerCase().includes(term);
        const matchesCategory = selected === "all" || product.category === selected;
        return matchesSearch && matchesCategory;
      });

      count.textContent = `${filtered.length} items`;
      empty.classList.toggle("hidden", filtered.length !== 0);

      rows.innerHTML = filtered.map((product) => `
        <tr>
          <td class="px-6 py-4 font-semibold text-zinc-900">${product.name}</td>
          <td class="px-6 py-4"><span class="px-2 py-1 rounded-full border border-zinc-200 bg-zinc-50 text-zinc-700">${product.category}</span></td>
          <td class="px-6 py-4 text-zinc-700">${window.SellerDemo.formatCurrency(product.price)}</td>
          <td class="px-6 py-4 text-zinc-700">${product.stock}</td>
        </tr>
      `).join("");
    }

    searchInput.addEventListener("input", render);
    categoryFilter.addEventListener("change", render);
    render();
  }

  async function initAnalyticsPage() {
    await ensureSellerDemo();
    const productsStat = document.getElementById("analyticsProducts");
    const stockStat = document.getElementById("analyticsStock");
    const avgStat = document.getElementById("analyticsAvg");
    const wrap = document.getElementById("categoryBreakdown");
    if (!productsStat || !stockStat || !avgStat || !wrap) return;

    const products = window.SellerDemo.readProducts();
    const summary = window.SellerDemo.getSummary(products);

    productsStat.textContent = summary.totalProducts;
    stockStat.textContent = summary.totalStock;
    avgStat.textContent = window.SellerDemo.formatCurrency(summary.avgPrice);

    const rows = Object.entries(summary.categories).sort((a, b) => b[1] - a[1]);
    if (!rows.length) {
      wrap.innerHTML = '<p class="text-sm text-zinc-500">No categories yet.</p>';
      return;
    }

    wrap.innerHTML = rows.map(([category, count]) => `
      <div class="flex items-center justify-between rounded-2xl bg-zinc-50 border border-zinc-100 p-4">
        <span class="font-semibold text-zinc-900">${category}</span>
        <span class="text-sm font-bold text-zinc-700">${count} products</span>
      </div>
    `).join("");
  }

  async function initNewProductPage() {
    await ensureSellerDemo();
    const form = document.getElementById("newProductForm");
    const categorySelect = document.getElementById("productCategory");
    if (!form || !categorySelect || form.dataset.bound === "1") return;

    const categories = window.SellerDemo.readCategories();
    categorySelect.innerHTML = categories.map((category) => `<option>${category}</option>`).join("") || "<option>Uncategorized</option>";

    form.dataset.bound = "1";

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      window.SellerDemo.addProduct({
        name: document.getElementById("productName").value.trim(),
        category: document.getElementById("productCategory").value,
        price: document.getElementById("productPrice").value,
        stock: document.getElementById("productStock").value
      });

      await loadTab("products", absoluteSellerUrl("products"), true);
    });
  }

  async function initTab(id) {
    if (id === "dashboard") return initDashboardPage();
    if (id === "products") return initProductsPage();
    if (id === "orders") return initOrdersPage();
    if (id === "analytics") return initAnalyticsPage();
    if (id === "new-product") return initNewProductPage();
  }

  let loading = false;
  async function loadTab(id, url, pushHistory) {
    if (loading) return;
    loading = true;
    try {
      const response = await fetch(url, { credentials: "same-origin" });
      if (!response.ok) throw new Error(`Failed to load ${url}`);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const incomingMain = doc.querySelector("main");
      if (!incomingMain) throw new Error("Missing main content");

      const currentMain = document.querySelector("main");
      if (currentMain) {
        currentMain.replaceWith(incomingMain);
      } else {
        document.body.appendChild(incomingMain);
      }

      mountPortalsFromDoc(doc);

      active = id;
      document.body.setAttribute("data-seller-active", id);
      applyActiveClasses();

      if (pushHistory) {
        const nextUrl = new URL(url, window.location.href);
        history.pushState({ sellerTab: id }, "", `${nextUrl.pathname}${nextUrl.search}`);
      }

      await initTab(id);
    } catch (error) {
      window.location.href = url;
    } finally {
      loading = false;
    }
  }

  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-seller-id]");
    if (!link) return;

    const id = link.getAttribute("data-seller-id") || "";
    if (!INTERNAL_TABS.has(id)) return;

    event.preventDefault();
    loadTab(id, absoluteSellerUrl(id), true);
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link) return;
    if (link.closest("[data-seller-nav]")) return;
    if (link.target || link.hasAttribute("download")) return;

    const nextUrl = new URL(link.getAttribute("href"), window.location.href);
    if (nextUrl.origin !== window.location.origin) return;
    const id = tabFromPath(nextUrl.pathname);
    if (!id || !INTERNAL_TABS.has(id)) return;

    event.preventDefault();
    loadTab(id, nextUrl.toString(), true);
  });

  window.addEventListener("popstate", () => {
    const id = tabFromPath(window.location.pathname);
    if (!id || !INTERNAL_TABS.has(id)) return;
    loadTab(id, window.location.href, false);
  });

  initTab(active);
})();
