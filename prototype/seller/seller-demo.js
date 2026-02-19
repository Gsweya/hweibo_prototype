(function () {
  const STORAGE_KEY = "hweibo.prototype.seller.products";
  const CATEGORY_STORAGE_KEY = "hweibo.prototype.admin.categories";
  const DEFAULT_PRODUCTS = [
    { id: "HW-P100", name: "Luna Steel Watch", category: "Accessories", price: 285000, stock: 24 },
    { id: "HW-P101", name: "Aero Sprint V2", category: "Shoes", price: 145000, stock: 55 },
    { id: "HW-P102", name: "Studio Pro Wireless", category: "Audio", price: 420000, stock: 12 }
  ];
  const DEFAULT_CATEGORIES = ["Accessories", "Shoes", "Audio", "Electronics", "Home", "Fashion"];

  function toNumber(value, fallback) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function readProducts() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PRODUCTS.slice();

    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return DEFAULT_PRODUCTS.slice();

      return parsed
        .map((item) => ({
          id: typeof item.id === "string" && item.id ? item.id : `HW-P${Date.now()}`,
          name: typeof item.name === "string" && item.name ? item.name : "Untitled Product",
          category: typeof item.category === "string" && item.category ? item.category : "Uncategorized",
          price: toNumber(item.price, 0),
          stock: toNumber(item.stock, 0),
          createdAt: typeof item.createdAt === "string" ? item.createdAt : new Date().toISOString()
        }))
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } catch (_error) {
      return DEFAULT_PRODUCTS.slice();
    }
  }

  function writeProducts(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }

  function formatCurrency(value) {
    const amount = Math.max(0, Math.round(toNumber(value, 0)));
    if (amount >= 1000000) {
      const compact = (amount / 1000000).toFixed(amount % 1000000 === 0 ? 0 : 1);
      return `TZS ${compact.replace(/\.0$/, "")}M`;
    }
    if (amount >= 1000) {
      const compact = (amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1);
      return `TZS ${compact.replace(/\.0$/, "")}k`;
    }
    return `TZS ${amount}`;
  }

  function getCategoryCounts(products) {
    const categories = {};
    products.forEach((product) => {
      categories[product.category] = (categories[product.category] || 0) + 1;
    });
    return categories;
  }

  function readCategories() {
    const raw = localStorage.getItem(CATEGORY_STORAGE_KEY);
    if (!raw) return DEFAULT_CATEGORIES.slice();

    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return DEFAULT_CATEGORIES.slice();

      const seen = new Set();
      const cleaned = parsed
        .map((item) => String(item || "").trim())
        .filter((item) => {
          if (!item) return false;
          const key = item.toLowerCase();
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });

      return cleaned.length ? cleaned : DEFAULT_CATEGORIES.slice();
    } catch (_error) {
      return DEFAULT_CATEGORIES.slice();
    }
  }

  function getSummary(products) {
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, product) => sum + toNumber(product.stock, 0), 0);
    const avgPrice = totalProducts
      ? Math.round(products.reduce((sum, product) => sum + toNumber(product.price, 0), 0) / totalProducts)
      : 0;

    return {
      totalProducts,
      totalStock,
      avgPrice,
      categories: getCategoryCounts(products)
    };
  }

  function addProduct(input) {
    const products = readProducts();
    const categoryOptions = readCategories();
    const next = {
      id: `HW-P${String(Date.now()).slice(-5)}`,
      name: input.name,
      category: input.category || categoryOptions[0] || "Uncategorized",
      price: toNumber(input.price, 0),
      stock: toNumber(input.stock, 0),
      createdAt: new Date().toISOString()
    };

    products.unshift(next);
    writeProducts(products);
    return next;
  }

  function resetProducts() {
    writeProducts(DEFAULT_PRODUCTS.slice());
  }

  window.SellerDemo = {
    readProducts,
    readCategories,
    writeProducts,
    addProduct,
    resetProducts,
    getSummary,
    formatCurrency
  };
})();
