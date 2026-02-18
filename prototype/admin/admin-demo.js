(function () {
  const STORAGE_KEY = "hweibo.prototype.admin.users";
  const DEFAULT_USERS = [
    { id: "U-1001", fullName: "Buyer Demo", email: "buyer@buyer.hweibo.demo", role: "buyer", status: "active", createdAt: "2026-02-01T12:00:00Z" },
    { id: "U-1002", fullName: "Seller Demo", email: "seller@seller.hweibo.demo", role: "seller", status: "active", createdAt: "2026-02-02T12:00:00Z" },
    { id: "U-1003", fullName: "Admin Demo", email: "admin@admin.hweibo.demo", role: "admin", status: "active", createdAt: "2026-02-03T12:00:00Z" }
  ];

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
    getSummary
  };
})();
