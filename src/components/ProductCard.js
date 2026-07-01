/* ProductCard.js */
import store from '../store.js';

export function ProductCard(product) {
  const isWishlisted = store.state.wishlist.includes(product.id);
  const formattedPrice = product.price.toLocaleString();

  return `
    <article class="product-card" data-id="${product.id}">
      ${product.tag ? `<div class="card-badge">${product.tag}</div>` : ''}
      
      <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" 
              data-id="${product.id}" 
              aria-label="${isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}">
        ★
      </button>

      <a href="/product/${product.id}" class="product-img-wrapper" data-link>
        <img class="product-img" src="${product.image}" alt="${product.name}" loading="lazy" />
      </a>

      <div class="product-info">
        <span class="product-brand">${product.brand}</span>
        <h3 class="product-name">
          <a href="/product/${product.id}" data-link>${product.name}</a>
        </h3>
        
        <div style="display: flex; gap: 0.25rem; align-items: center; margin-bottom: 1rem; font-size: 0.85rem;">
          <span style="color: var(--color-gold);">★</span>
          <span>${product.rating}</span>
          <span style="color: var(--text-muted); font-size: 0.8rem;">(${product.reviews} reviews)</span>
        </div>

        <div class="product-meta">
          <span class="product-price">$${formattedPrice}</span>
          <button class="add-cart-btn" data-id="${product.id}">Add to Bag</button>
        </div>
      </div>
    </article>
  `;
}

// Binds actions for grids containing product cards
export function bindProductCardActions(container) {
  if (!container) return;

  container.addEventListener('click', e => {
    // Wishlist click
    const wishlistBtn = e.target.closest('.wishlist-btn');
    if (wishlistBtn) {
      e.preventDefault();
      const id = wishlistBtn.getAttribute('data-id');
      store.toggleWishlist(id);
      
      // Update UI state directly for instant feedback
      const isWishlisted = store.state.wishlist.includes(id);
      wishlistBtn.classList.toggle('active', isWishlisted);
    }

    // Add to cart click
    const addCartBtn = e.target.closest('.add-cart-btn');
    if (addCartBtn) {
      e.preventDefault();
      const id = addCartBtn.getAttribute('data-id');
      // Import products list or get product detail from data
      // For clean coupling, let's load product data from store or direct import
      import('../data/products.js').then(module => {
        const productObj = module.getProductById(id);
        if (productObj) {
          store.addToCart(productObj, 1, 'steel'); // default to steel or first strap
        }
      });
    }
  });
}
export default ProductCard;
