/* Filters.js */
import store from '../store.js';
import { products } from '../data/products.js';

export class Filters {
  render() {
    const { brands, categories, priceRange, search } = store.state.filters;
    const wishlistOnly = brands.includes('Wishlist');
    
    // Extract unique brands and categories from data
    const uniqueBrands = [...new Set(products.map(p => p.brand))];
    const uniqueCategories = [...new Set(products.map(p => p.category))];

    return `
      <aside class="filters-sidebar fade-in">
        <div class="filter-group">
          <h4 class="filter-title">Search</h4>
          <input type="text" id="search-input" class="form-input" 
                 placeholder="Search watches..." value="${search}" />
        </div>

        <div class="filter-group">
          <h4 class="filter-title">Showcase</h4>
          <label class="checkbox-label">
            <input type="checkbox" id="wishlist-filter" ${wishlistOnly ? 'checked' : ''} />
            <span>Wishlist Only ⭐</span>
          </label>
        </div>

        <div class="filter-group">
          <h4 class="filter-title">Brands</h4>
          <div style="display: flex; flex-direction: column;">
            ${uniqueBrands.map(brand => {
              const isChecked = brands.includes(brand);
              return `
                <label class="checkbox-label">
                  <input type="checkbox" class="brand-filter" value="${brand}" ${isChecked ? 'checked' : ''} />
                  <span>${brand}</span>
                </label>
              `;
            }).join('')}
          </div>
        </div>

        <div class="filter-group">
          <h4 class="filter-title">Collections</h4>
          <div style="display: flex; flex-direction: column;">
            ${uniqueCategories.map(category => {
              const isChecked = categories.includes(category);
              return `
                <label class="checkbox-label">
                  <input type="checkbox" class="category-filter" value="${category}" ${isChecked ? 'checked' : ''} />
                  <span>${category}</span>
                </label>
              `;
            }).join('')}
          </div>
        </div>

        <div class="filter-group">
          <h4 class="filter-title">Max Price</h4>
          <div class="price-range-inputs">
            <input type="range" id="price-slider" class="price-slider" 
                   min="0" max="50000" step="1000" value="${priceRange.max}" />
            <div class="price-values">
              <span>$0</span>
              <span id="price-display" style="font-weight: 600; color: var(--color-gold);">$${priceRange.max.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <button id="reset-filters-btn" class="btn btn-secondary" style="width: 100%; margin-top: 1rem; font-size: 0.75rem; padding: 0.6rem 1rem;">
          Reset Filters
        </button>
      </aside>
    `;
  }

  afterRender() {
    const searchInput = document.getElementById('search-input');
    const wishlistFilter = document.getElementById('wishlist-filter');
    const brandCheckboxes = document.querySelectorAll('.brand-filter');
    const categoryCheckboxes = document.querySelectorAll('.category-filter');
    const priceSlider = document.getElementById('price-slider');
    const priceDisplay = document.getElementById('price-display');
    const resetBtn = document.getElementById('reset-filters-btn');

    // Debounce function for text search
    let debounceTimeout;
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          store.updateFilters({ search: e.target.value });
        }, 300);
      });
    }

    // Wishlist Only filter
    if (wishlistFilter) {
      wishlistFilter.addEventListener('change', e => {
        let currentBrands = [...store.state.filters.brands];
        if (e.target.checked) {
          if (!currentBrands.includes('Wishlist')) currentBrands.push('Wishlist');
        } else {
          currentBrands = currentBrands.filter(b => b !== 'Wishlist');
        }
        store.updateFilters({ brands: currentBrands });
      });
    }

    // Brand filters
    brandCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const checkedBrands = Array.from(brandCheckboxes)
          .filter(input => input.checked)
          .map(input => input.value);
        
        // Retain Wishlist Only state if checked
        if (wishlistFilter && wishlistFilter.checked) {
          checkedBrands.push('Wishlist');
        }
        store.updateFilters({ brands: checkedBrands });
      });
    });

    // Category filters
    categoryCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const checkedCategories = Array.from(categoryCheckboxes)
          .filter(input => input.checked)
          .map(input => input.value);
        
        store.updateFilters({ categories: checkedCategories });
      });
    });

    // Price range slider
    if (priceSlider) {
      priceSlider.addEventListener('input', e => {
        const val = parseInt(e.target.value);
        if (priceDisplay) {
          priceDisplay.innerText = `$${val.toLocaleString()}`;
        }
      });

      priceSlider.addEventListener('change', e => {
        const val = parseInt(e.target.value);
        store.updateFilters({
          priceRange: { min: 0, max: val }
        });
      });
    }

    // Reset filters click
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        store.resetFilters();
      });
    }
  }
}
export default Filters;
