/* main.js */
import './styles/main.css';
import store from './store.js';
import Router from './router.js';

// Import Views
import HomeView from './views/HomeView.js';
import CatalogView from './views/CatalogView.js';
import ProductDetailView from './views/ProductDetailView.js';
import CheckoutView from './views/CheckoutView.js';

// Import Components
import Header from './components/Header.js';
import CartDrawer from './components/CartDrawer.js';
import Toast from './components/Toast.js';

// Initialize core HTML wrapper structure
document.getElementById('app').innerHTML = `
  <div id="header-mount"></div>
  <main id="view-container"></main>
  <div id="cart-mount"></div>
`;

// Initialize persistent global components
const header = new Header();
const cartDrawer = new CartDrawer();
const toast = new Toast();

document.getElementById('header-mount').innerHTML = header.render();
header.afterRender();

document.getElementById('cart-mount').innerHTML = cartDrawer.render();
cartDrawer.afterRender();

// Define router pathways
const routes = [
  { path: '/', view: HomeView },
  { path: '/catalog', view: CatalogView },
  { path: '/product/:id', view: ProductDetailView },
  { path: '/checkout', view: CheckoutView }
];

const router = new Router(routes);

// Sync HTML document theme on load
document.documentElement.setAttribute('data-theme', store.state.theme);

// Handle programatic navigation requests from components
window.addEventListener('chronos-navigate', (e) => {
  const targetPath = e.detail;
  router.navigateTo(targetPath);
});

// Run initial route checking
router.route();
