/* HomeView.js */
import { products } from '../data/products.js';
import { ProductCard, bindProductCardActions } from '../components/ProductCard.js';

export class HomeView {
  render() {
    // Select 3 featured products (e.g. first 3)
    const featured = products.slice(0, 3);

    return `
      <div class="home-page fade-in">
        <!-- Hero Section -->
        <section class="hero">
          <div class="container">
            <div class="hero-content">
              <span class="hero-subtitle">Bespoke Horology</span>
              <h1 class="hero-title">Precision Crafted <br/><span class="text-gold">Luxury Timepieces</span></h1>
              <p class="hero-description">
                Explore Chronos, a curated gallery of the world’s most prestigious timepieces. Experience master engineering and express your individuality with customizable styles.
              </p>
              <div class="hero-ctas">
                <a href="/catalog" class="btn btn-primary" data-link>Shop Collection</a>
                <a href="/product/rolex-submariner" class="btn btn-secondary" data-link>Interactive Studio</a>
              </div>
            </div>
          </div>
        </section>

        <!-- Brands Banner -->
        <section class="brands-section">
          <div class="container">
            <div class="brands-grid">
              <div class="brand-item" data-brand="Rolex">ROLEX</div>
              <div class="brand-item" data-brand="Omega">OMEGA</div>
              <div class="brand-item" data-brand="Audemars Piguet">AUDEMARS PIGUET</div>
              <div class="brand-item" data-brand="Cartier">CARTIER</div>
              <div class="brand-item" data-brand="Patek Philippe">PATEK PHILIPPE</div>
              <div class="brand-item" data-brand="Grand Seiko">GRAND SEIKO</div>
            </div>
          </div>
        </section>

        <!-- Curated Highlights -->
        <section class="section-padding">
          <div class="container">
            <div class="text-center" style="margin-bottom: 3.5rem;">
              <span class="hero-subtitle" style="font-size: 0.8rem;">Exclusive Selections</span>
              <h2 style="font-size: 2.25rem; margin-top: 0.5rem; font-weight: 700;">Curated Masterpieces</h2>
              <p style="color: var(--text-muted); max-width: 500px; margin: 1rem auto 0 auto;">
                A handpicked showcase of our finest timepieces, representing centuries of horological heritage and innovative design.
              </p>
            </div>

            <div id="featured-grid" class="products-grid">
              ${featured.map(product => ProductCard(product)).join('')}
            </div>
            
            <div class="text-center" style="margin-top: 3.5rem;">
              <a href="/catalog" class="btn btn-secondary" data-link>View Full Collection</a>
            </div>
          </div>
        </section>

        <!-- Promo banner -->
        <section class="section-padding" style="background-color: var(--surface-card); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);">
          <div class="container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
            <div>
              <span class="text-gold" style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em;">The Strap Studio</span>
              <h2 style="font-size: 2rem; margin-top: 0.5rem; margin-bottom: 1.5rem; font-weight: 700; line-height: 1.2;">Bespoke Design, Made Personal</h2>
              <p style="color: var(--text-muted); margin-bottom: 2rem;">
                Every Chronos watch is open to customization. Swap out bracelets in our Interactive Customizer to find the perfect configuration of precious metals, premium leather, or sporty rubber.
              </p>
              <a href="/product/rolex-submariner" class="btn btn-primary" data-link>Enter Customizer</a>
            </div>
            <div style="background-color: var(--surface); padding: 3rem; border-radius: var(--radius-lg); border: 1px solid var(--border); text-center; display: flex; align-items: center; justify-content: center;">
              <!-- Visual placeholder of customizer strap swaps -->
              <div style="text-align: center;">
                <img src="/src/assets/watches/submariner.png" style="max-height: 250px; margin: 0 auto; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.4));" alt="Watch customizer preview" />
                <div style="display: flex; gap: 0.75rem; justify-content: center; margin-top: 1.5rem;">
                  <span style="width: 24px; height: 24px; border-radius: 50%; background-color: #b5b8bd; border: 2px solid var(--color-gold);"></span>
                  <span style="width: 24px; height: 24px; border-radius: 50%; background-color: #d4af37;"></span>
                  <span style="width: 24px; height: 24px; border-radius: 50%; background-color: #1a1a1a;"></span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  afterRender() {
    const grid = document.getElementById('featured-grid');
    if (grid) {
      bindProductCardActions(grid);
    }

    // Connect brand clicks to filter and navigate
    const brandItems = document.querySelectorAll('.brand-item');
    brandItems.forEach(item => {
      item.addEventListener('click', () => {
        const brand = item.getAttribute('data-brand');
        import('../store.js').then(module => {
          const store = module.default;
          store.resetFilters();
          store.updateFilters({ brands: [brand] });
          // Navigate to catalog
          const navEvent = new CustomEvent('chronos-navigate', { detail: '/catalog' });
          window.dispatchEvent(navEvent);
        });
      });
    });
  }
}
export default HomeView;
