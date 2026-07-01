/* CheckoutView.js */
import store from '../store.js';

export class CheckoutView {
  constructor() {
    this.orderPlaced = false;
    this.orderId = '';
  }

  render() {
    const cart = store.state.cart;

    if (this.orderPlaced) {
      return `
        <div class="container section-padding fade-in">
          <div class="success-card">
            <div class="success-icon">✓</div>
            <h1 class="success-title">Order Confirmed</h1>
            <p class="success-msg">Thank you for your order. We have sent a confirmation email to your address.</p>
            <div style="background-color: var(--surface-card); padding: 1.5rem; border-radius: var(--radius-md); border: 1px solid var(--border); margin-bottom: 2rem;">
              <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.5rem;">
                <span style="color: var(--text-muted);">Order ID:</span>
                <span style="font-weight: 600; font-family: monospace;">${this.orderId}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
                <span style="color: var(--text-muted);">Status:</span>
                <span style="color: var(--color-success); font-weight: 600;">Processing Delivery</span>
              </div>
            </div>
            <a href="/catalog" class="btn btn-primary" data-link>Continue Shopping</a>
          </div>
        </div>
      `;
    }

    if (cart.length === 0) {
      return `
        <div class="container section-padding text-center fade-in">
          <h2>Your bag is empty</h2>
          <p style="color: var(--text-muted); margin-bottom: 2rem;">You must add items to your shopping bag before checking out.</p>
          <a href="/catalog" class="btn btn-primary" data-link>Browse Collection</a>
        </div>
      `;
    }

    let subtotal = 0;
    const summaryItemsHtml = cart.map(item => {
      const price = item.product.price * item.quantity;
      subtotal += price;
      const strapObj = item.product.straps.find(s => s.id === item.selectedStrap) || { name: 'Original' };
      return `
        <div class="summary-item">
          <div>
            <div style="font-weight: 500; color: var(--text);">${item.product.name}</div>
            <div class="summary-item-details">${item.product.brand} &bull; Qty: ${item.quantity}</div>
            <div style="font-size: 0.75rem; color: var(--color-gold);">${strapObj.name}</div>
          </div>
          <span style="font-weight: 500;">$${price.toLocaleString()}</span>
        </div>
      `;
    }).join('');

    const shipping = 150; // Premium courier shipping
    const total = subtotal + shipping;

    return `
      <div class="container section-padding fade-in" style="padding-top: 2rem;">
        <div style="margin-bottom: 2rem;">
          <h1 style="font-size: 2.5rem; font-weight: 800; letter-spacing: -0.02em;">Checkout</h1>
          <p style="color: var(--text-muted);">Provide your delivery details and secure payment credentials to finalize order.</p>
        </div>

        <div class="checkout-layout">
          <!-- Shipping and Payment Forms -->
          <form id="checkout-form">
            <div class="checkout-card" style="margin-bottom: 2rem;">
              <h3 class="checkout-section-title">Shipping Address</h3>
              
              <div class="form-grid">
                <div class="form-group">
                  <label for="first-name">First Name *</label>
                  <input type="text" id="first-name" class="form-input" required />
                  <div class="form-error-msg" id="first-name-err"></div>
                </div>
                <div class="form-group">
                  <label for="last-name">Last Name *</label>
                  <input type="text" id="last-name" class="form-input" required />
                  <div class="form-error-msg" id="last-name-err"></div>
                </div>
                
                <div class="form-group form-group-full">
                  <label for="email">Email Address *</label>
                  <input type="email" id="email" class="form-input" required />
                  <div class="form-error-msg" id="email-err"></div>
                </div>

                <div class="form-group form-group-full">
                  <label for="address">Delivery Street Address *</label>
                  <input type="text" id="address" class="form-input" required />
                  <div class="form-error-msg" id="address-err"></div>
                </div>

                <div class="form-group">
                  <label for="city">City *</label>
                  <input type="text" id="city" class="form-input" required />
                  <div class="form-error-msg" id="city-err"></div>
                </div>
                <div class="form-group">
                  <label for="zipcode">Postal/ZIP Code *</label>
                  <input type="text" id="zipcode" class="form-input" required />
                  <div class="form-error-msg" id="zipcode-err"></div>
                </div>
              </div>
            </div>

            <div class="checkout-card">
              <h3 class="checkout-section-title">Secure Payment</h3>
              
              <div class="form-group">
                <label for="card-name">Name on Card *</label>
                <input type="text" id="card-name" class="form-input" required />
                <div class="form-error-msg" id="card-name-err"></div>
              </div>

              <div class="form-group">
                <label for="card-number">Card Number *</label>
                <input type="text" id="card-number" class="form-input" placeholder="4111 2222 3333 4444" required />
                <div class="form-error-msg" id="card-number-err"></div>
              </div>

              <div class="form-grid">
                <div class="form-group">
                  <label for="card-expiry">Expiration Date *</label>
                  <input type="text" id="card-expiry" class="form-input" placeholder="MM/YY" required />
                  <div class="form-error-msg" id="card-expiry-err"></div>
                </div>
                <div class="form-group">
                  <label for="card-cvv">Security Code (CVV) *</label>
                  <input type="password" id="card-cvv" class="form-input" placeholder="123" maxlength="4" required />
                  <div class="form-error-msg" id="card-cvv-err"></div>
                </div>
              </div>

              <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1.5rem; font-size: 0.95rem; padding: 1rem;">
                Authorize Payment ($${total.toLocaleString()})
              </button>
            </div>
          </form>

          <!-- Order Summary Sidebar -->
          <div class="checkout-summary">
            <h3 style="font-size: 1.25rem; margin-bottom: 1.5rem; font-weight: 600;">Summary</h3>
            
            <div class="summary-items">
              ${summaryItemsHtml}
            </div>

            <div class="summary-divider"></div>

            <div class="summary-item" style="margin-bottom: 0.75rem;">
              <span style="color: var(--text-muted);">Subtotal</span>
              <span>$${subtotal.toLocaleString()}</span>
            </div>
            
            <div class="summary-item" style="margin-bottom: 0.75rem;">
              <span style="color: var(--text-muted);">Courier Shipping (Insured)</span>
              <span>$${shipping.toLocaleString()}</span>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-item" style="margin-bottom: 0;">
              <span style="font-size: 1.1rem; font-weight: 600;">Order Total</span>
              <span style="font-size: 1.5rem; font-weight: 700; color: var(--color-gold);">$${total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  afterRender() {
    if (this.orderPlaced) return;

    const form = document.getElementById('checkout-form');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      
      // Perform validation
      if (this.validateForm()) {
        // Generate Order ID
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        this.orderId = `CH-${randomNum}`;
        this.orderPlaced = true;
        
        // Clear global cart
        store.clearCart();
        store.triggerToast("Order placed successfully!", "success");

        // Force a re-render of this view
        const app = document.getElementById('app');
        if (app) {
          app.innerHTML = this.render();
          this.afterRender();
        }
      }
    });
  }

  validateForm() {
    let isValid = true;

    const fields = [
      { id: 'first-name', val: () => document.getElementById('first-name').value.trim(), rule: (v) => v.length > 0, msg: 'First name is required.' },
      { id: 'last-name', val: () => document.getElementById('last-name').value.trim(), rule: (v) => v.length > 0, msg: 'Last name is required.' },
      { id: 'email', val: () => document.getElementById('email').value.trim(), rule: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Enter a valid email address.' },
      { id: 'address', val: () => document.getElementById('address').value.trim(), rule: (v) => v.length > 0, msg: 'Address is required.' },
      { id: 'city', val: () => document.getElementById('city').value.trim(), rule: (v) => v.length > 0, msg: 'City is required.' },
      { id: 'zipcode', val: () => document.getElementById('zipcode').value.trim(), rule: (v) => v.length >= 4, msg: 'Enter a valid postal code.' },
      { id: 'card-name', val: () => document.getElementById('card-name').value.trim(), rule: (v) => v.length > 0, msg: 'Name on card is required.' },
      { id: 'card-number', val: () => document.getElementById('card-number').value.replace(/\s+/g, ''), rule: (v) => /^\d{16}$/.test(v), msg: 'Card number must be exactly 16 digits.' },
      { id: 'card-expiry', val: () => document.getElementById('card-expiry').value.trim(), rule: (v) => /^\d{2}\/\d{2}$/.test(v), msg: 'Format must be MM/YY.' },
      { id: 'card-cvv', val: () => document.getElementById('card-cvv').value.trim(), rule: (v) => /^\d{3,4}$/.test(v), msg: 'CVV must be 3 or 4 digits.' }
    ];

    fields.forEach(f => {
      const input = document.getElementById(f.id);
      const errDiv = document.getElementById(`${f.id}-err`);
      if (!input || !errDiv) return;

      const value = f.val();
      const pass = f.rule(value);

      if (!pass) {
        input.classList.add('error');
        errDiv.innerText = f.msg;
        isValid = false;
      } else {
        input.classList.remove('error');
        errDiv.innerText = '';
      }
    });

    return isValid;
  }
}
export default CheckoutView;
