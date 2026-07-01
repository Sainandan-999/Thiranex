/* ProductGrid.js */
import store from '../store.js';
import { products } from '../data/products.js';
import { ProductCard, bindProductCardActions } from './ProductCard.js';

export class ProductGrid {
  render() {
    const filteredProducts = this.getFilteredProducts();

    if (filteredProducts.length === 0) {
      return `
        <div class="empty-state fade-in">
          <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">No Timepieces Found</h3>
          <p style="color: var(--text-muted); margin-bottom: 1.5rem;">We couldn't find any watches matching your current filter selection.</p>
          <button id="reset-all-filters-btn" class="btn btn-primary">Reset Filters</button>
        </div>
      `;
    }

    return `
      <div id="grid-container" class="products-grid fade-in">
        ${filteredProducts.map(product => ProductCard(product)).join('')}
      </div>
    `;
  }

  afterRender() {
    const gridContainer = document.getElementById('grid-container');
    if (gridContainer) {
      bindProductCardActions(gridContainer);
    }

    const resetBtn = document.getElementById('reset-all-filters-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        store.resetFilters();
        // Since we are in SPA, the view container will catch the store change and redraw.
      });
    }
  }

  getFilteredProducts() {
    const { search, brands, categories, priceRange, sortBy } = store.state.filters;
    const wishlistIds = store.state.wishlist;

    return products
      .filter(product => {
        // Search Filter
        if (search) {
          const query = search.toLowerCase();
          const matchesSearch = 
            product.name.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query);
          
          if (!matchesSearch) return false;
        }

        // Brand Filter
        if (brands && brands.length > 0) {
          // Special brand handling if "Wishlist Only" or similar is checked or brands list matched
          if (!brands.includes(product.brand)) {
            // Check if wishlist filter is toggled via custom brand name 'Wishlist'
            if (brands.includes('Wishlist') && wishlistIds.includes(product.id)) {
              // keep it
            } else {
              return false;
            }
          }
        }

        // Category Filter
        if (categories && categories.length > 0) {
          if (!categories.includes(product.category)) return false;
        }

        // Price Filter
        if (product.price < priceRange.min || product.price > priceRange.max) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Sorting logic
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // 'featured' (original order)
      });
  }
}
export default ProductGrid;
