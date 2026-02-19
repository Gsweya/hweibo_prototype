(function () {
  const STORAGE_KEY = "hweibo.prototype.admin.users";
  const CATEGORY_STORAGE_KEY = "hweibo.prototype.admin.categories";
  const DEFAULT_USERS = [
    { id: "U-1001", fullName: "Buyer Demo", email: "buyer@buyer.hweibo.demo", role: "buyer", status: "active", createdAt: "2026-02-01T12:00:00Z" },
    { id: "U-1002", fullName: "Seller Demo", email: "seller@seller.hweibo.demo", role: "seller", status: "active", createdAt: "2026-02-02T12:00:00Z" },
    { id: "U-1003", fullName: "Admin Demo", email: "admin@admin.hweibo.demo", role: "admin", status: "active", createdAt: "2026-02-03T12:00:00Z" }
  ];
  const DEFAULT_CATEGORIES = ["Accessories", "Shoes", "Audio", "Electronics", "Home", "Fashion"];

  function normalizeCategory(value) {
    const trimmed = String(value || "").trim().replace(/\s+/g, " ");
    if (!trimmed) return "";
    return trimmed
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  }

  function readUsers() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_USERS.slice();
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return DEFAULT_USERS.slice();
      return parsed.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } catch (_error) {
      return DEFAULT_USERS.slice();
    }
  }

  function writeUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  function addUser(input) {
    const users = readUsers();
    const next = {
      id: `U-${String(Date.now()).slice(-4)}`,
      fullName: input.fullName,
      email: input.email.toLowerCase(),
      role: input.role,
      status: "active",
      createdAt: new Date().toISOString()
    };
    users.unshift(next);
    writeUsers(users);
    return next;
  }

  function readCategories() {
    const raw = localStorage.getItem(CATEGORY_STORAGE_KEY);
    if (!raw) return DEFAULT_CATEGORIES.slice();

    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return DEFAULT_CATEGORIES.slice();

      const seen = new Set();
      const cleaned = parsed
        .map((item) => normalizeCategory(item))
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

  function writeCategories(categories) {
    const seen = new Set();
    const cleaned = (Array.isArray(categories) ? categories : [])
      .map((item) => normalizeCategory(item))
      .filter((item) => {
        if (!item) return false;
        const key = item.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

    localStorage.setItem(
      CATEGORY_STORAGE_KEY,
      JSON.stringify(cleaned.length ? cleaned : DEFAULT_CATEGORIES.slice())
    );
  }

  function addCategory(name) {
    const nextName = normalizeCategory(name);
    if (!nextName) return null;

    const categories = readCategories();
    if (categories.some((item) => item.toLowerCase() === nextName.toLowerCase())) {
      return nextName;
    }

    categories.push(nextName);
    writeCategories(categories);
    return nextName;
  }

  function removeCategory(name) {
    const target = normalizeCategory(name).toLowerCase();
    if (!target) return readCategories();

    const categories = readCategories();
    const next = categories.filter((item) => item.toLowerCase() !== target);
    writeCategories(next);
    return readCategories();
  }

  function getSummary(users) {
    const counts = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});

    return {
      total: users.length,
      buyers: counts.buyer || 0,
      sellers: counts.seller || 0,
      admins: counts.admin || 0
    };
  }

  window.AdminDemo = {
    readUsers,
    writeUsers,
    addUser,
    getSummary,
    readCategories,
    writeCategories,
    addCategory,
    removeCategory
  };
})();
