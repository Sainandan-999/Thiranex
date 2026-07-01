/* CatalogView.js */
import store from '../store.js';
import Filters from '../components/Filters.js';
import ProductGrid from '../components/ProductGrid.js';

export class CatalogView {
  constructor() {
    this.filtersComponent = new Filters();
    this.gridComponent = new ProductGrid();
  }

  render() {
    const currentSort = store.state.filters.sortBy;

    return `
      <div class="container section-padding fade-in" style="padding-top: 2rem;">
        <div style="margin-bottom: 2rem;">
          <h1 style="font-size: 2.5rem; font-weight: 800; letter-spacing: -0.02em;">The Catalog</h1>
          <p style="color: var(--text-muted);">Explore hand-picked luxury models, precision movements, and master design.</p>
        </div>

        <div class="catalog-layout">
          <!-- Filters Column -->
          <div id="filters-column">
            ${this.filtersComponent.render()}
          </div>

          <!-- Listings Column -->
          <div>
            <div class="catalog-header">
              <span id="results-count-display" class="results-count">
                <!-- Calculated dynamically -->
              </span>
              
              <div class="catalog-sorting">
                <label for="sort-select" style="font-size: 0.85rem; color: var(--text-muted);">Sort by:</label>
                <select id="sort-select" class="sort-select">
                  <option value="featured" ${currentSort === 'featured' ? 'selected' : ''}>Featured</option>
                  <option value="price-asc" ${currentSort === 'price-asc' ? 'selected' : ''}>Price: Low to High</option>
                  <option value="price-desc" ${currentSort === 'price-desc' ? 'selected' : ''}>Price: High to Low</option>
                  <option value="rating" ${currentSort === 'rating' ? 'selected' : ''}>Top Rated</option>
                </select>
              </div>
            </div>

            <!-- Dynamic Product Grid -->
            <div id="grid-mount-point">
              ${this.gridComponent.render()}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  afterRender() {
    // Mount event listeners for static and dynamic components
    this.filtersComponent.afterRender();
    this.gridComponent.afterRender();

    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', e => {
        store.updateFilters({ sortBy: e.target.value });
      });
    }

    this.updateCountUI(store.state);

    // Subscribe to store updates to selectively update Grid and Count UI
    this.unsubscribe = store.subscribe(state => {
      // Re-render grid mount point
      const gridMount = document.getElementById('grid-mount-point');
      if (gridMount) {
        gridMount.innerHTML = this.gridComponent.render();
        this.gridComponent.afterRender();
      }
      
      this.updateCountUI(state);
      
      // Keep sort dropdown synchronized
      const sort = document.getElementById('sort-select');
      if (sort) {
        sort.value = state.filters.sortBy;
      }
    });
  }

  updateCountUI(state) {
    const display = document.getElementById('results-count-display');
    if (display) {
      const count = this.gridComponent.getFilteredProducts().length;
      display.innerText = `${count} ${count === 1 ? 'watch' : 'watches'} available`;
    }
  }

  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    if (this.filtersComponent.destroy) this.filtersComponent.destroy();
    if (this.gridComponent.destroy) this.gridComponent.destroy();
  }
}
export default CatalogView;
