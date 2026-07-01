/* ProductDetailView.js */
import store from '../store.js';
import { getProductById } from '../data/products.js';

export class ProductDetailView {
  constructor(params) {
    this.productId = params.id;
    this.product = getProductById(this.productId);
    this.selectedStrapId = 'steel'; // default strap selection
    
    // Choose appropriate default strap based on product definition
    if (this.product && this.product.straps && this.product.straps.length > 0) {
      this.selectedStrapId = this.product.straps[0].id;
    }
  }

  render() {
    if (!this.product) {
      return `
        <div class="container section-padding text-center fade-in">
          <h2>Timepiece Not Found</h2>
          <p style="color: var(--text-muted); margin-bottom: 2rem;">The watch you are looking for does not exist in our catalog.</p>
          <a href="/catalog" class="btn btn-primary" data-link>Back to Catalog</a>
        </div>
      `;
    }

    const p = this.product;
    const isWishlisted = store.state.wishlist.includes(p.id);

    return `
      <div class="container section-padding fade-in" style="padding-top: 3rem;">
        <div style="margin-bottom: 2rem;">
          <a href="/catalog" class="btn-text" data-link>&larr; Back to Collection</a>
        </div>

        <div class="detail-layout">
          <!-- Gallery & Visual Studio -->
          <div class="detail-gallery">
            <div class="detail-img-container">
              <!-- Interactive Strap customizer canvas behind the watch -->
              <canvas id="customizer-canvas" class="custom-canvas-container"></canvas>
              <img id="main-watch-img" class="detail-main-img" src="${p.image}" alt="${p.name}" />
            </div>
            
            <!-- Customizer Options Panel -->
            <div class="customizer-box">
              <h4 class="customizer-title">Select Customized Strap</h4>
              <div class="customizer-options">
                ${p.straps.map(strap => {
                  const isActive = strap.id === this.selectedStrapId;
                  return `
                    <div class="strap-option ${isActive ? 'active' : ''}" data-strap-id="${strap.id}">
                      <div class="strap-color-preview" style="background-color: ${strap.preview};"></div>
                      <span class="strap-name">${strap.name.split(' ')[0]}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- Product Specs & Buying -->
          <div class="detail-info">
            <span class="detail-brand">${p.brand}</span>
            <h1 class="detail-name">${p.name}</h1>
            <div class="detail-price">$${p.price.toLocaleString()}</div>
            
            <p class="detail-description">${p.description}</p>
            
            <div class="detail-actions">
              <button id="add-to-bag-btn" class="btn btn-primary">Add to Shopping Bag</button>
              <button id="detail-wishlist-btn" class="btn btn-secondary ${isWishlisted ? 'active' : ''}">
                ${isWishlisted ? '★ Saved' : '⭐ Save to Wishlist'}
              </button>
            </div>

            <!-- Technical Specifications Table -->
            <div class="detail-specs-table">
              <h3 class="specs-title">Technical Specifications</h3>
              <div class="specs-row">
                <span class="specs-label">Case Diameter</span>
                <span class="specs-val">${p.specs.case}</span>
              </div>
              <div class="specs-row">
                <span class="specs-label">Bezel</span>
                <span class="specs-val">${p.specs.bezel}</span>
              </div>
              <div class="specs-row">
                <span class="specs-label">Movement</span>
                <span class="specs-val">${p.specs.movement}</span>
              </div>
              <div class="specs-row">
                <span class="specs-label">Power Reserve</span>
                <span class="specs-val">${p.specs.powerReserve}</span>
              </div>
              <div class="specs-row">
                <span class="specs-label">Water Resistance</span>
                <span class="specs-val">${p.specs.waterResistance}</span>
              </div>
              <div class="specs-row">
                <span class="specs-label">Dial</span>
                <span class="specs-val">${p.specs.dial}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  afterRender() {
    if (!this.product) return;

    const canvas = document.getElementById('customizer-canvas');
    const addBagBtn = document.getElementById('add-to-bag-btn');
    const wishlistBtn = document.getElementById('detail-wishlist-btn');
    const strapOptions = document.querySelectorAll('.strap-option');

    // Canvas drawing function for interactive straps
    const drawStrap = (strapId) => {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Make canvas high resolution
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Find strap color
      const strap = this.product.straps.find(s => s.id === strapId);
      const color = strap ? strap.color : '#b5b8bd';

      // Let's draw a vertical watch strap band behind the watch
      // The strap should go from the top middle to the bottom middle
      const strapWidth = 56;
      const centerX = w / 2;

      // Draw Top Strap (casing to top edge)
      ctx.fillStyle = color;
      
      // Top Strap Block
      ctx.beginPath();
      ctx.roundRect(centerX - strapWidth / 2, 40, strapWidth, h / 2 - 80, [10, 10, 0, 0]);
      ctx.fill();

      // Bottom Strap Block
      ctx.beginPath();
      ctx.roundRect(centerX - strapWidth / 2, h / 2 + 80, strapWidth, h / 2 - 120, [0, 0, 10, 10]);
      ctx.fill();

      // Stitching details for leather straps
      if (strapId.includes('leather') || strapId.includes('nato')) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);

        // Draw left stitch
        ctx.beginPath();
        ctx.moveTo(centerX - strapWidth / 2 + 6, 45);
        ctx.lineTo(centerX - strapWidth / 2 + 6, h / 2 - 80);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX - strapWidth / 2 + 6, h / 2 + 80);
        ctx.lineTo(centerX - strapWidth / 2 + 6, h - 50);
        ctx.stroke();

        // Draw right stitch
        ctx.beginPath();
        ctx.moveTo(centerX + strapWidth / 2 - 6, 45);
        ctx.lineTo(centerX + strapWidth / 2 - 6, h / 2 - 80);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX + strapWidth / 2 - 6, h / 2 + 80);
        ctx.lineTo(centerX + strapWidth / 2 - 6, h - 50);
        ctx.stroke();
      }

      // Link segments detail for metal straps
      if (strapId === 'steel' || strapId === 'gold' || strapId === 'titanium' || strapId === 'gold-mesh') {
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.lineWidth = 2;
        ctx.setLineDash([]);

        // Draw horizontal metal link dividers
        const linkHeight = 24;
        
        // Top links
        for (let y = 60; y < h / 2 - 80; y += linkHeight) {
          ctx.beginPath();
          ctx.moveTo(centerX - strapWidth / 2, y);
          ctx.lineTo(centerX + strapWidth / 2, y);
          ctx.stroke();
          
          // Vertical lines to simulate 3-link bracelet style
          ctx.beginPath();
          ctx.moveTo(centerX - strapWidth / 6, y - linkHeight);
          ctx.lineTo(centerX - strapWidth / 6, y);
          ctx.moveTo(centerX + strapWidth / 6, y - linkHeight);
          ctx.lineTo(centerX + strapWidth / 6, y);
          ctx.stroke();
        }

        // Bottom links
        for (let y = h / 2 + 100; y < h - 40; y += linkHeight) {
          ctx.beginPath();
          ctx.moveTo(centerX - strapWidth / 2, y);
          ctx.lineTo(centerX + strapWidth / 2, y);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(centerX - strapWidth / 6, y - linkHeight);
          ctx.lineTo(centerX - strapWidth / 6, y);
          ctx.moveTo(centerX + strapWidth / 6, y - linkHeight);
          ctx.lineTo(centerX + strapWidth / 6, y);
          ctx.stroke();
        }
      }
    };

    // Draw default strap after brief timeout so rect size is computed
    setTimeout(() => drawStrap(this.selectedStrapId), 50);

    // Watch for window resize to redraw canvas
    this.resizeHandler = () => drawStrap(this.selectedStrapId);
    window.addEventListener('resize', this.resizeHandler);

    // Handle Strap Options click
    strapOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        strapOptions.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        this.selectedStrapId = opt.getAttribute('data-strap-id');
        drawStrap(this.selectedStrapId);
      });
    });

    // Add to bag
    if (addBagBtn) {
      addBagBtn.addEventListener('click', () => {
        store.addToCart(this.product, 1, this.selectedStrapId);
        
        // Open Cart Drawer
        const cartOverlay = document.getElementById('cart-overlay');
        if (cartOverlay) {
          cartOverlay.classList.add('active');
        }
      });
    }

    // Toggle Wishlist
    if (wishlistBtn) {
      wishlistBtn.addEventListener('click', () => {
        store.toggleWishlist(this.product.id);
        const isWishlisted = store.state.wishlist.includes(this.product.id);
        wishlistBtn.innerHTML = isWishlisted ? '★ Saved' : '⭐ Save to Wishlist';
        wishlistBtn.classList.toggle('active', isWishlisted);
      });
    }

    // Subscribe to wishlist updates externally
    this.unsubscribe = store.subscribe(state => {
      const isWish = state.wishlist.includes(this.product.id);
      if (wishlistBtn) {
        wishlistBtn.innerHTML = isWish ? '★ Saved' : '⭐ Save to Wishlist';
        wishlistBtn.classList.toggle('active', isWish);
      }
    });
  }

  destroy() {
    window.removeEventListener('resize', this.resizeHandler);
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
export default ProductDetailView;
