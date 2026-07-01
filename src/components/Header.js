/* Header.js */
import store from '../store.js';

export class Header {
  render() {
    const isDark = store.state.theme === 'dark';
    const cartCount = store.state.cart.reduce((total, item) => total + item.quantity, 0);
    const wishlistCount = store.state.wishlist.length;

    return `
      <header class="site-header">
        <div class="container header-container">
          <a href="/" class="logo" data-link>
            CHRONOS<span class="logo-gold">.</span>
          </a>

          <ul class="nav-menu">
            <li><a href="/" class="nav-link" data-link>Home</a></li>
            <li><a href="/catalog" class="nav-link" data-link>Collection</a></li>
          </ul>

          <div class="header-actions">
            <!-- Theme Toggle -->
            <button id="theme-toggle" class="icon-btn" aria-label="Toggle dark/light theme">
              ${isDark ? '☀️' : '🌙'}
            </button>

            <!-- Wishlist Button -->
            <a href="/catalog" id="wishlist-trigger" class="icon-btn" data-link aria-label="Wishlist">
              ⭐
              <span id="wishlist-badge" class="badge" style="display: ${wishlistCount > 0 ? 'flex' : 'none'};">
                ${wishlistCount}
              </span>
            </a>

            <!-- Cart Trigger -->
            <button id="cart-trigger" class="icon-btn" aria-label="Shopping Cart">
              🛒
              <span id="cart-badge" class="badge" style="display: ${cartCount > 0 ? 'flex' : 'none'};">
                ${cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>
    `;
  }

  afterRender() {
    // Theme toggle event
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        store.toggleTheme();
      });
    }

    // Cart trigger event
    const cartBtn = document.getElementById('cart-trigger');
    if (cartBtn) {
      cartBtn.addEventListener('click', () => {
        const cartOverlay = document.getElementById('cart-overlay');
        if (cartOverlay) {
          cartOverlay.classList.add('active');
        }
      });
    }

    // Subscribe to store updates to dynamically adjust badges without full re-render
    this.unsubscribe = store.subscribe((state) => {
      // Update theme toggle icon
      const toggle = document.getElementById('theme-toggle');
      if (toggle) {
        toggle.innerHTML = state.theme === 'dark' ? '☀️' : '🌙';
      }

      // Update Cart Badge
      const cartBadge = document.getElementById('cart-badge');
      if (cartBadge) {
        const count = state.cart.reduce((total, item) => total + item.quantity, 0);
        if (count > 0) {
          cartBadge.innerText = count;
          cartBadge.style.display = 'flex';
          
          // Trigger micro-animation bounce
          cartBadge.classList.remove('bounce-badge');
          void cartBadge.offsetWidth; // trigger reflow
          cartBadge.classList.add('bounce-badge');
        } else {
          cartBadge.style.display = 'none';
        }
      }

      // Update Wishlist Badge
      const wishBadge = document.getElementById('wishlist-badge');
      if (wishBadge) {
        const count = state.wishlist.length;
        if (count > 0) {
          wishBadge.innerText = count;
          wishBadge.style.display = 'flex';
        } else {
          wishBadge.style.display = 'none';
        }
      }
    });
  }

  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
export default Header;
