/* CartDrawer.js */
import store from '../store.js';

export class CartDrawer {
  render() {
    return `
      <div id="cart-overlay" class="cart-overlay">
        <div class="cart-drawer">
          <div class="cart-header">
            <h3>Shopping Bag</h3>
            <button id="cart-close-btn" class="cart-close" aria-label="Close cart">&times;</button>
          </div>
          <div id="cart-items-container" class="cart-items">
            <!-- Dynamic Cart Items -->
          </div>
          <div id="cart-footer-container" class="cart-footer">
            <!-- Dynamic Subtotal & Checkout -->
          </div>
        </div>
      </div>
    `;
  }

  afterRender() {
    const overlay = document.getElementById('cart-overlay');
    const closeBtn = document.getElementById('cart-close-btn');

    const hideCart = () => {
      overlay.classList.remove('active');
    };

    if (closeBtn) closeBtn.addEventListener('click', hideCart);
    if (overlay) {
      overlay.addEventListener('click', e => {
        if (e.target === overlay) hideCart();
      });
    }

    // Initial render of items
    this.updateCartUI(store.state);

    // Subscribe to store updates
    this.unsubscribe = store.subscribe(state => {
      this.updateCartUI(state);
    });

    // Delegate events inside the cart drawer for performance
    const drawer = overlay.querySelector('.cart-drawer');
    drawer.addEventListener('click', e => {
      const target = e.target;

      // Handle quantity increment/decrement
      if (target.classList.contains('qty-btn')) {
        const id = target.getAttribute('data-id');
        const strap = target.getAttribute('data-strap');
        const change = parseInt(target.getAttribute('data-change'));
        const currentQty = parseInt(target.getAttribute('data-qty'));
        
        store.updateCartQuantity(id, strap, currentQty + change);
      }

      // Handle remove item
      if (target.classList.contains('remove-item')) {
        const id = target.getAttribute('data-id');
        const strap = target.getAttribute('data-strap');
        store.removeFromCart(id, strap);
      }

      // Handle checkout navigation
      if (target.closest('#checkout-btn')) {
        hideCart();
        // Since we are inside the router, we must trigger navigation using router's navigate (or dispatch a click/event)
        // We will dispatch a CustomEvent or click a simulated link.
        // Even simpler: navigate by modifying history and calling the router's route, or dispatching an event
        const navEvent = new CustomEvent('chronos-navigate', { detail: '/checkout' });
        window.dispatchEvent(navEvent);
      }
    });
  }

  updateCartUI(state) {
    const itemsContainer = document.getElementById('cart-items-container');
    const footerContainer = document.getElementById('cart-footer-container');

    if (!itemsContainer || !footerContainer) return;

    if (state.cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="cart-empty-msg">
          <p>Your luxury bag is empty.</p>
          <a href="/catalog" class="btn btn-secondary" style="margin-top: 1.5rem; display: inline-block;" data-link>Browse Catalog</a>
        </div>
      `;
      footerContainer.innerHTML = '';
      footerContainer.style.display = 'none';
      return;
    }

    footerContainer.style.display = 'block';

    // Build items HTML
    let itemsHtml = '';
    let subtotal = 0;

    state.cart.forEach(item => {
      const { product, quantity, selectedStrap } = item;
      const price = product.price * quantity;
      subtotal += price;

      // Find selected strap name
      const strapObj = product.straps.find(s => s.id === selectedStrap) || { name: 'Original strap' };

      itemsHtml += `
        <div class="cart-item">
          <div class="cart-item-img">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="cart-item-details">
            <div>
              <div class="cart-item-brand">${product.brand}</div>
              <div class="cart-item-name">${product.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">
                Strap: ${strapObj.name}
              </div>
            </div>
            
            <div class="cart-item-meta">
              <div class="quantity-controls">
                <button class="qty-btn" data-id="${product.id}" data-strap="${selectedStrap}" data-qty="${quantity}" data-change="-1">-</button>
                <span class="qty-val">${quantity}</span>
                <button class="qty-btn" data-id="${product.id}" data-strap="${selectedStrap}" data-qty="${quantity}" data-change="1">+</button>
              </div>
              <span class="cart-item-price">$${price.toLocaleString()}</span>
            </div>
            
            <button class="remove-item" data-id="${product.id}" data-strap="${selectedStrap}">Remove</button>
          </div>
        </div>
      `;
    });

    itemsContainer.innerHTML = itemsHtml;

    // Build footer HTML
    footerContainer.innerHTML = `
      <div class="cart-summary-row">
        <span class="cart-total-label">Subtotal</span>
        <span class="cart-total-val">$${subtotal.toLocaleString()}</span>
      </div>
      <button id="checkout-btn" class="btn btn-primary" style="width: 100%;">Proceed to Checkout</button>
    `;
  }

  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
export default CartDrawer;
