/**
 * Hweibo Prototype Application
 * Fully functional JavaScript for the HTML prototype
 */

// Application State
const state = {
  currentUser: null,
  userType: null, // 'buyer' or 'seller'
  cart: [],
  orders: [],
  products: [
    { id: 1, name: "Nike Air Max 90", price: 450000, stock: 25, sales: 45, status: "Active", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", store: "Sport World", location: "Dar es Salaam", description: "Classic Nike Air Max 90 with premium cushioning." },
    { id: 2, name: "Puma Sport Runner", price: 320000, stock: 18, sales: 38, status: "Active", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400", store: "Athletic Store", location: "Arusha", description: "Lightweight Puma running shoes with breathable mesh." },
    { id: 3, name: "New Balance Fresh Foam", price: 520000, stock: 12, sales: 32, status: "Low Stock", image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400", store: "Premium Shoes", location: "Dodoma", description: "New Balance Fresh Foam technology for ultimate comfort." },
    { id: 4, name: "Adidas Galaxy 5", price: 280000, stock: 30, sales: 28, status: "Active", image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400", store: "Sport Center", location: "Mwanza", description: "Adidas Galaxy 5 trainers with Cloudfoam midsole." },
    { id: 5, name: "Nike Air Max Plus", price: 680000, stock: 8, sales: 15, status: "Low Stock", image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400", store: "Nike Store TZ", location: "Dar es Salaam", description: "Iconic Air Max Plus with Tuned Air technology." },
    { id: 6, name: "MacBook Pro 16", price: 2199000, stock: 5, sales: 12, status: "Active", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400", store: "Tech World", location: "Dar es Salaam", description: "Powerful laptop for creative and engineering workloads." },
  ],
  chatMessages: [],
  selectedPayment: 'wallet',
  currentPage: 'landing'
};

// Navigation
function navigateTo(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });
  
  // Show target page
  const targetPage = document.getElementById(page);
  if (targetPage) {
    targetPage.classList.add('active');
    state.currentPage = page;
    
    // Update navigation visibility
    updateNavigation();
    
    // Page-specific initialization
    if (page === 'buyerBrowse') {
      renderBrowseProducts();
    } else if (page === 'cart') {
      renderCart();
    } else if (page === 'buyerOrders') {
      renderBuyerOrders();
    } else if (page === 'sellerProducts') {
      renderSellerProducts();
    } else if (page === 'buyerDashboard') {
      initializeChat();
    }
  }
  
  // Scroll to top
  window.scrollTo(0, 0);
}

function updateNavigation() {
  const mainNav = document.getElementById('mainNav');
  const buyerNav = document.getElementById('buyerNav');
  const sellerNav = document.getElementById('sellerNav');
  
  if (!mainNav || !buyerNav || !sellerNav) return;
  
  if (state.currentUser) {
    mainNav.style.display = 'none';
    if (state.userType === 'buyer') {
      buyerNav.style.display = 'flex';
      sellerNav.style.display = 'none';
    } else {
      buyerNav.style.display = 'none';
      sellerNav.style.display = 'flex';
    }
  } else {
    mainNav.style.display = 'flex';
    buyerNav.style.display = 'none';
    sellerNav.style.display = 'none';
  }
}

// Authentication
function handleLogin(event) {
  event.preventDefault();
  const btn = document.getElementById('loginBtn');
  btn.innerHTML = '<div class="spinner"></div> Signing in...';
  btn.disabled = true;
  
  setTimeout(() => {
    // Simulate login - check if email contains 'seller' for demo
    const email = event.target.querySelector('input[type="email"]').value;
    state.currentUser = { email, name: 'John Doe' };
    state.userType = email.toLowerCase().includes('seller') ? 'seller' : 'buyer';
    
    if (state.userType === 'seller') {
      navigateTo('sellerDashboard');
    } else {
      navigateTo('buyerDashboard');
    }
    
    showToast('Successfully logged in!', 'success');
  }, 1000);
}

function handleRegister(event) {
  event.preventDefault();
  const btn = document.getElementById('registerBtn');
  btn.innerHTML = '<div class="spinner"></div> Creating account...';
  btn.disabled = true;
  
  setTimeout(() => {
    const userType = event.target.querySelector('input[name="userType"]:checked').value;
    state.currentUser = { name: 'New User' };
    state.userType = userType;
    
    if (userType === 'seller') {
      navigateTo('sellerDashboard');
    } else {
      navigateTo('buyerDashboard');
    }
    
    showToast('Account created successfully!', 'success');
  }, 1000);
}

function logout() {
  state.currentUser = null;
  state.userType = null;
  state.cart = [];
  updateCartBadge();
  navigateTo('landing');
  showToast('Logged out successfully', 'success');
}

function selectUserType(type) {
  document.querySelectorAll('input[name="userType"]').forEach(input => {
    input.checked = input.value === type;
  });
}

// Search and AI
function startSearchFromHero() {
  const query = document.getElementById('heroSearch').value;
  if (query.trim()) {
    navigateTo('buyerDashboard');
    setTimeout(() => {
      document.getElementById('chatInput').value = query;
      sendChatMessage();
    }, 100);
  }
}

function quickSearch(query) {
  document.getElementById('heroSearch').value = query;
  startSearchFromHero();
}

function handleChatKeypress(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
}

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (!message) return;
  
  // Add user message
  addChatMessage('user', message);
  input.value = '';
  
  // Show AI typing/searching
  setTimeout(() => {
    showSearchProgress();
  }, 500);
}

function addChatMessage(role, text, products = null) {
  const container = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${role}`;
  messageDiv.textContent = text;
  container.appendChild(messageDiv);
  
  if (products) {
    const productsDiv = document.createElement('div');
    productsDiv.className = 'chat-products';
    productsDiv.innerHTML = '<p style="color: var(--text-secondary); margin-bottom: 1rem; font-size: 0.875rem;">Found 5 matching products:</p>';
    
    products.forEach((product, index) => {
      const card = createResultCard(product, index);
      productsDiv.appendChild(card);
    });
    
    const messageContainer = document.createElement('div');
    messageContainer.style.cssText = 'align-self: flex-start; width: 100%; margin-top: 1rem;';
    messageContainer.appendChild(productsDiv);
    container.appendChild(messageContainer);
  }
  
  container.scrollTop = container.scrollHeight;
}

function showSearchProgress() {
  const container = document.getElementById('chatMessages');
  const progressDiv = document.createElement('div');
  progressDiv.className = 'chat-message ai search-progress-message';
  progressDiv.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <span>Searching market...</span>
    </div>
  `;
  container.appendChild(progressDiv);
  container.scrollTop = container.scrollHeight;
  
  // Simulate search steps
  setTimeout(() => {
    progressDiv.querySelector('span').textContent = 'Finding best prices...';
  }, 800);
  
  setTimeout(() => {
    progressDiv.querySelector('span').textContent = 'Ranking results...';
  }, 1600);
  
  setTimeout(() => {
    progressDiv.remove();
    const results = getSearchResults();
    addChatMessage('ai', 'Here are 5 ranked matches from the catalog:', results);
  }, 2400);
}

function getSearchResults() {
  // Return all products as search results
  return state.products.slice(0, 5);
}

function createResultCard(product, index) {
  const card = document.createElement('div');
  card.className = 'result-card';
  card.innerHTML = `
    <div class="result-card-header" onclick="toggleResultCard(this)">
      <img src="${product.image}" alt="${product.name}" class="result-card-image">
      <div class="result-card-info">
        <div class="result-card-name">${product.name}</div>
        <div class="result-card-store">${product.store}</div>
      </div>
      <div class="result-card-price">${formatPrice(product.price)}</div>
    </div>
    <div class="result-card-body" style="display: none;">
      <p style="color: var(--text-secondary); margin-bottom: 1rem;">${product.description}</p>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <div style="font-size: 0.875rem; color: var(--text-secondary);">
          <span>${product.store}</span> · <span>${product.location}</span>
        </div>
      </div>
      <div class="result-card-actions">
        <button class="btn btn-outline" onclick="addToCart(${product.id}); event.stopPropagation();">
          Add to Cart
        </button>
        <button class="btn btn-primary" onclick="buyNow(${product.id}); event.stopPropagation();">
          Buy Now
        </button>
      </div>
    </div>
  `;
  return card;
}

function toggleResultCard(header) {
  const card = header.parentElement;
  const body = card.querySelector('.result-card-body');
  const isExpanded = body.style.display !== 'none';
  
  if (isExpanded) {
    body.style.display = 'none';
    card.classList.remove('expanded');
  } else {
    body.style.display = 'block';
    card.classList.add('expanded');
  }
}

function initializeChat() {
  const container = document.getElementById('chatMessages');
  if (container && container.children.length === 0) {
    addChatMessage('ai', "Hi! I'm Hweibo AI. Describe what you're looking for and I'll find the best products for you.");
  }
}

// Cart Functions
function addToCart(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;
  
  const existingItem = state.cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    state.cart.push({
      ...product,
      quantity: 1
    });
  }
  
  updateCartBadge();
  showToast(`${product.name} added to cart`, 'success');
}

function buyNow(productId) {
  addToCart(productId);
  navigateTo('cart');
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(item => item.id !== productId);
  renderCart();
  updateCartBadge();
}

function updateQuantity(productId, quantity) {
  const item = state.cart.find(item => item.id === productId);
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
      renderCart();
      updateCartBadge();
    }
  }
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (badge) {
    const total = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = total;
    badge.style.display = total > 0 ? 'inline' : 'none';
  }
}

function renderCart() {
  const container = document.getElementById('cartItems');
  if (!container) return;
  
  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
        </div>
        <h2>Your cart is empty</h2>
        <p>Start shopping to add items to your cart</p>
        <button class="btn btn-primary" onclick="navigateTo('buyerBrowse')">Browse Products</button>
      </div>
    `;
    return;
  }
  
  let html = '';
  state.cart.forEach(item => {
    html += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-store">${item.store}</div>
          <div class="cart-item-actions">
            <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
          </div>
        </div>
        <div style="text-align: right;">
          <div class="cart-item-price">${formatPrice(item.price * item.quantity)}</div>
          <button class="action-btn delete" onclick="removeFromCart(${item.id})" style="margin-top: 0.5rem;">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
  updateCartTotals();
}

function updateCartTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = state.cart.length > 0 ? 15000 : 0;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;
  
  const subtotalEl = document.getElementById('cartSubtotal');
  const taxEl = document.getElementById('cartTax');
  const totalEl = document.getElementById('cartTotal');
  
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (taxEl) taxEl.textContent = formatPrice(tax);
  if (totalEl) totalEl.textContent = formatPrice(total);
}

function selectPayment(method) {
  state.selectedPayment = method;
  document.querySelectorAll('.payment-method').forEach(el => {
    el.classList.remove('active');
  });
  event.currentTarget.classList.add('active');
}

function checkout() {
  if (state.cart.length === 0) {
    showToast('Your cart is empty', 'error');
    return;
  }
  
  const btn = document.getElementById('checkoutBtn');
  btn.innerHTML = '<div class="spinner"></div> Processing...';
  btn.disabled = true;
  
  setTimeout(() => {
    // Create order
    const order = {
      id: 'HW-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      items: [...state.cart],
      total: state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      date: new Date().toLocaleDateString(),
      status: 'Processing'
    };
    
    state.orders.push(order);
    
    // Clear cart
    state.cart = [];
    updateCartBadge();
    
    // Show success
    document.getElementById('orderId').textContent = order.id;
    navigateTo('checkoutSuccess');
    
    btn.innerHTML = 'Confirm Purchase';
    btn.disabled = false;
  }, 2000);
}

// Product Rendering
function renderBrowseProducts() {
  const container = document.getElementById('browseProducts');
  if (!container) return;
  
  let html = '';
  state.products.forEach(product => {
    html += `
      <div class="product-card" onclick="showProductDetails(${product.id})">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
          <div class="product-name">${product.name}</div>
          <div class="product-store">${product.store}</div>
          <div class="product-footer">
            <div class="product-price">${formatPrice(product.price)}</div>
            <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id}); event.stopPropagation();">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

function renderSellerProducts() {
  const tbody = document.getElementById('sellerProductsTable');
  if (!tbody) return;
  
  let html = '';
  state.products.forEach(product => {
    const statusClass = product.status === 'Active' ? 'active' : 
                       product.status === 'Low Stock' ? 'low' : 'out';
    
    html += `
      <tr>
        <td>
          <div class="product-cell">
            <img src="${product.image}" alt="${product.name}">
            <span style="font-weight: 600;">${product.name}</span>
          </div>
        </td>
        <td style="font-weight: 600;">${formatPrice(product.price)}</td>
        <td style="color: var(--text-secondary);">${product.stock} units</td>
        <td style="color: var(--text-secondary);">${product.sales} sold</td>
        <td><span class="status-badge ${statusClass}">${product.status}</span></td>
        <td style="text-align: right;">
          <div class="action-btns">
            <button class="action-btn" onclick="showToast('Edit product coming soon', 'info')">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
            <button class="action-btn delete" onclick="showToast('Delete product coming soon', 'info')">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  });
  
  tbody.innerHTML = html;
}

function renderBuyerOrders() {
  const tbody = document.getElementById('ordersTableBody');
  if (!tbody) return;
  
  if (state.orders.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 3rem;">
          <div class="empty-state" style="padding: 0;">
            <h3 style="margin-bottom: 0.5rem;">No orders yet</h3>
            <p style="color: var(--text-secondary);">Start shopping to see your orders here</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }
  
  let html = '';
  state.orders.forEach(order => {
    html += `
      <tr>
        <td style="font-family: monospace; font-size: 0.875rem;">${order.id}</td>
        <td>${order.items[0].name} ${order.items.length > 1 ? `(+${order.items.length - 1} more)` : ''}</td>
        <td class="order-amount">${formatPrice(order.total)}</td>
        <td><span class="order-status processing">${order.status}</span></td>
        <td style="color: var(--text-secondary);">${order.date}</td>
      </tr>
    `;
  });
  
  tbody.innerHTML = html;
}

function showProductDetails(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;
  
  // Create modal
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 1rem;
  `;
  
  modal.innerHTML = `
    <div style="background: white; border-radius: 1rem; max-width: 500px; width: 100%; max-height: 90vh; overflow-y: auto;">
      <div style="position: relative;">
        <img src="${product.image}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 1rem 1rem 0 0;">
        <button onclick="this.closest('.modal').remove()" style="position: absolute; top: 1rem; right: 1rem; width: 36px; height: 36px; border-radius: 50%; background: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div style="padding: 1.5rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem;">${product.name}</h2>
        <p style="color: var(--text-secondary); margin-bottom: 1rem;">${product.description}</p>
        <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; font-size: 0.875rem; color: var(--text-secondary);">
          <span>${product.store}</span>
          <span>•</span>
          <span>${product.location}</span>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="font-size: 1.5rem; font-weight: 700;">${formatPrice(product.price)}</div>
          <div style="display: flex; gap: 0.75rem;">
            <button class="btn btn-outline" onclick="addToCart(${product.id}); this.closest('.modal').remove();">Add to Cart</button>
            <button class="btn btn-primary" onclick="buyNow(${product.id}); this.closest('.modal').remove();">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  modal.className = 'modal';
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };
  
  document.body.appendChild(modal);
}

// Utility Functions
function formatPrice(price) {
  return 'TZS ' + price.toLocaleString();
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      ${type === 'success' 
        ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>'
        : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'
      }
    </svg>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Initialize
function init() {
  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .fade-in {
      animation: fadeIn 0.3s ease;
    }
    
    .chat-products {
      background: white;
      border: 1px solid var(--border);
      border-radius: 1rem;
      padding: 1rem;
      margin-top: 0.5rem;
    }
    
    .dot {
      width: 6px;
      height: 6px;
      background: var(--text-secondary);
      border-radius: 50%;
      animation: bounce 1s infinite;
    }
    
    .dot:nth-child(2) { animation-delay: 0.15s; }
    .dot:nth-child(3) { animation-delay: 0.3s; }
    
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
    
    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
  
  // Start on landing page
  navigateTo('landing');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
