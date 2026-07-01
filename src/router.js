/* router.js */

export class Router {
  constructor(routes) {
    this.routes = routes;
    this.appContainer = document.getElementById('view-container');

    // Handle browser navigation back/forward
    window.addEventListener('popstate', () => this.route());

    // Intercept global link clicks
    document.addEventListener('click', e => {
      const link = e.target.closest('[data-link]');
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        this.navigateTo(href);
      }
    });
  }

  // Navigate programmatically
  navigateTo(url) {
    history.pushState(null, null, url);
    this.route();
  }

  // Route matching and rendering
  route() {
    const path = window.location.pathname;

    // Separate paths and dynamic parameters
    // Convert routes to regex patterns
    let match = null;
    let activeRoute = null;

    for (const route of this.routes) {
      // Replace /product/:id with regex pattern
      const patternStr = '^' + route.path.replace(/\/:[a-zA-Z0-9]+/g, '/([^/]+)') + '$';
      const regex = new RegExp(patternStr);
      const result = path.match(regex);

      if (result) {
        activeRoute = route;
        // Extract parameters (e.g. id)
        const paramNames = (route.path.match(/\/:[a-zA-Z0-9]+/g) || []).map(p => p.slice(2));
        const paramValues = result.slice(1);
        const params = {};
        paramNames.forEach((name, index) => {
          params[name] = paramValues[index];
        });
        match = { params };
        break;
      }
    }

    // Default route fallback to Home (first route) if no match
    if (!activeRoute) {
      activeRoute = this.routes.find(r => r.path === '/') || this.routes[0];
      match = { params: {} };
    }

    // Update active nav-links in Header
    document.querySelectorAll('[data-link]').forEach(link => {
      const href = link.getAttribute('href');
      if (href === path) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Render the view
    if (activeRoute && activeRoute.view) {
      // Scroll to top
      window.scrollTo(0, 0);
      
      const viewInstance = new activeRoute.view(match.params);
      const renderResult = viewInstance.render();

      if (renderResult instanceof Promise) {
        renderResult.then(html => {
          this.appContainer.innerHTML = html;
          if (viewInstance.afterRender) {
            viewInstance.afterRender();
          }
        });
      } else {
        this.appContainer.innerHTML = renderResult;
        if (viewInstance.afterRender) {
          viewInstance.afterRender();
        }
      }
    }
  }
}
export default Router;
