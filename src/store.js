/* store.js */

// Load initial state from LocalStorage or use defaults
const getInitialState = () => {
  const defaults = {
    cart: [],
    wishlist: [],
    theme: 'dark', // default to dark theme for luxury aesthetic
    filters: {
      search: '',
      brands: [],
      categories: [],
      priceRange: { min: 0, max: 50000 },
      sortBy: 'featured'
    }
  };

  try {
    const savedCart = localStorage.getItem('chronos_cart');
    const savedWishlist = localStorage.getItem('chronos_wishlist');
    const savedTheme = localStorage.getItem('chronos_theme');

    if (savedCart) defaults.cart = JSON.parse(savedCart);
    if (savedWishlist) defaults.wishlist = JSON.parse(savedWishlist);
    if (savedTheme) defaults.theme = savedTheme;
  } catch (e) {
    console.error('Error reading localStorage data', e);
  }

  return defaults;
};

class Store {
  constructor() {
    this.state = getInitialState();
    this.listeners = [];
  }

  // Subscribe to state changes
  subscribe(listener) {
    this.listeners.push(listener);
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify all subscribers of state changes
  notify() {
    this.listeners.forEach(listener => listener(this.state));
    this.persist();
  }

  // Save specific parts of state to LocalStorage
  persist() {
    try {
      localStorage.setItem('chronos_cart', JSON.stringify(this.state.cart));
      localStorage.setItem('chronos_wishlist', JSON.stringify(this.state.wishlist));
      localStorage.setItem('chronos_theme', this.state.theme);
    } catch (e) {
      console.error('Failed to write state to localStorage', e);
    }
  }

  /* --- ACTIONS --- */

  // Theme Actions
  setTheme(theme) {
    this.state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    this.notify();
  }

  toggleTheme() {
    const newTheme = this.state.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  // Cart Actions
  addToCart(product, quantity = 1, selectedStrap = 'original') {
    const cartItemIndex = this.state.cart.findIndex(
      item => item.product.id === product.id && item.selectedStrap === selectedStrap
    );

    if (cartItemIndex > -1) {
      this.state.cart[cartItemIndex].quantity += quantity;
    } else {
      this.state.cart.push({
        product,
        quantity,
        selectedStrap
      });
    }
    this.notify();
    this.triggerToast(`${product.name} added to cart!`, 'success');
  }

  removeFromCart(productId, selectedStrap = 'original') {
    this.state.cart = this.state.cart.filter(
      item => !(item.product.id === productId && item.selectedStrap === selectedStrap)
    );
    this.notify();
    this.triggerToast(`Item removed from cart.`, 'info');
  }

  updateCartQuantity(productId, selectedStrap, quantity) {
    if (quantity <= 0) {
      this.removeFromCart(productId, selectedStrap);
      return;
    }

    const item = this.state.cart.find(
      item => item.product.id === productId && item.selectedStrap === selectedStrap
    );

    if (item) {
      item.quantity = quantity;
      this.notify();
    }
  }

  clearCart() {
    this.state.cart = [];
    this.notify();
  }

  // Wishlist Actions
  toggleWishlist(productId) {
    const index = this.state.wishlist.indexOf(productId);
    let added = false;
    if (index > -1) {
      this.state.wishlist.splice(index, 1);
    } else {
      this.state.wishlist.push(productId);
      added = true;
    }
    this.notify();
    this.triggerToast(
      added ? 'Added to wishlist!' : 'Removed from wishlist.',
      added ? 'success' : 'info'
    );
  }

  // Filter Actions
  updateFilters(newFilters) {
    this.state.filters = {
      ...this.state.filters,
      ...newFilters
    };
    this.notify();
  }

  resetFilters() {
    this.state.filters = {
      search: '',
      brands: [],
      categories: [],
      priceRange: { min: 0, max: 50000 },
      sortBy: 'featured'
    };
    this.notify();
  }

  // Toast dispatch
  triggerToast(message, type = 'info') {
    const event = new CustomEvent('chronos-toast', {
      detail: { message, type }
    });
    window.dispatchEvent(event);
  }
}

const store = new Store();
export default store;
