var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=t({default:()=>i}),r=()=>{let e={cart:[],wishlist:[],theme:`dark`,filters:{search:``,brands:[],categories:[],priceRange:{min:0,max:5e4},sortBy:`featured`}};try{let t=localStorage.getItem(`chronos_cart`),n=localStorage.getItem(`chronos_wishlist`),r=localStorage.getItem(`chronos_theme`);t&&(e.cart=JSON.parse(t)),n&&(e.wishlist=JSON.parse(n)),r&&(e.theme=r)}catch(e){console.error(`Error reading localStorage data`,e)}return e},i=new class{constructor(){this.state=r(),this.listeners=[]}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}notify(){this.listeners.forEach(e=>e(this.state)),this.persist()}persist(){try{localStorage.setItem(`chronos_cart`,JSON.stringify(this.state.cart)),localStorage.setItem(`chronos_wishlist`,JSON.stringify(this.state.wishlist)),localStorage.setItem(`chronos_theme`,this.state.theme)}catch(e){console.error(`Failed to write state to localStorage`,e)}}setTheme(e){this.state.theme=e,document.documentElement.setAttribute(`data-theme`,e),this.notify()}toggleTheme(){let e=this.state.theme===`dark`?`light`:`dark`;this.setTheme(e)}addToCart(e,t=1,n=`original`){let r=this.state.cart.findIndex(t=>t.product.id===e.id&&t.selectedStrap===n);r>-1?this.state.cart[r].quantity+=t:this.state.cart.push({product:e,quantity:t,selectedStrap:n}),this.notify(),this.triggerToast(`${e.name} added to cart!`,`success`)}removeFromCart(e,t=`original`){this.state.cart=this.state.cart.filter(n=>!(n.product.id===e&&n.selectedStrap===t)),this.notify(),this.triggerToast(`Item removed from cart.`,`info`)}updateCartQuantity(e,t,n){if(n<=0){this.removeFromCart(e,t);return}let r=this.state.cart.find(n=>n.product.id===e&&n.selectedStrap===t);r&&(r.quantity=n,this.notify())}clearCart(){this.state.cart=[],this.notify()}toggleWishlist(e){let t=this.state.wishlist.indexOf(e),n=!1;t>-1?this.state.wishlist.splice(t,1):(this.state.wishlist.push(e),n=!0),this.notify(),this.triggerToast(n?`Added to wishlist!`:`Removed from wishlist.`,n?`success`:`info`)}updateFilters(e){this.state.filters={...this.state.filters,...e},this.notify()}resetFilters(){this.state.filters={search:``,brands:[],categories:[],priceRange:{min:0,max:5e4},sortBy:`featured`},this.notify()}triggerToast(e,t=`info`){let n=new CustomEvent(`chronos-toast`,{detail:{message:e,type:t}});window.dispatchEvent(n)}},a=class{constructor(e){this.routes=e,this.appContainer=document.getElementById(`view-container`),window.addEventListener(`popstate`,()=>this.route()),document.addEventListener(`click`,e=>{let t=e.target.closest(`[data-link]`);if(t){e.preventDefault();let n=t.getAttribute(`href`);this.navigateTo(n)}})}navigateTo(e){history.pushState(null,null,e),this.route()}route(){let e=window.location.pathname,t=null,n=null;for(let r of this.routes){let i=`^`+r.path.replace(/\/:[a-zA-Z0-9]+/g,`/([^/]+)`)+`$`,a=new RegExp(i),o=e.match(a);if(o){n=r;let e=(r.path.match(/\/:[a-zA-Z0-9]+/g)||[]).map(e=>e.slice(2)),i=o.slice(1),a={};e.forEach((e,t)=>{a[e]=i[t]}),t={params:a};break}}if(n||(n=this.routes.find(e=>e.path===`/`)||this.routes[0],t={params:{}}),document.querySelectorAll(`[data-link]`).forEach(t=>{t.getAttribute(`href`)===e?t.classList.add(`active`):t.classList.remove(`active`)}),n&&n.view){window.scrollTo(0,0);let e=new n.view(t.params),r=e.render();r instanceof Promise?r.then(t=>{this.appContainer.innerHTML=t,e.afterRender&&e.afterRender()}):(this.appContainer.innerHTML=r,e.afterRender&&e.afterRender())}}},o=t({getProductById:()=>c,products:()=>s}),s=[{id:`rolex-submariner`,name:`Submariner Date`,brand:`Rolex`,category:`Sport`,price:10200,image:`/src/assets/watches/submariner.png`,tag:`Legendary Diver`,rating:4.9,reviews:142,description:`The Rolex Submariner Date in Oystersteel with a Cerachrom bezel insert in black ceramic and a black dial with large luminescent hour markers. It is the archetype of the divers' watch, embodying the historic link between Rolex and the underwater world.`,specs:{case:`Oyster, 41 mm, Oystersteel`,bezel:`Unidirectional rotatable 60-minute, ceramic insert`,waterResistance:`300 metres / 1,000 feet`,movement:`Perpetual, mechanical, self-winding (Calibre 3235)`,powerReserve:`Approximately 70 hours`,dial:`Black with highly legible Chromalight display`,originalStrap:`Oystersteel bracelet`},straps:[{id:`steel`,name:`Oystersteel Bracelet`,color:`#b5b8bd`,preview:`#9fa4ab`},{id:`gold`,name:`Yellow Gold Link`,color:`#d4af37`,preview:`#d4af37`},{id:`rubber`,name:`Oysterflex Black Rubber`,color:`#1a1a1a`,preview:`#222`}]},{id:`omega-speedmaster`,name:`Speedmaster Moonwatch Professional`,brand:`Omega`,category:`Complications`,price:7600,image:`/src/assets/watches/speedmaster.png`,tag:`Space Icon`,rating:4.8,reviews:98,description:`The Speedmaster Moonwatch is one of the world's most iconic timepieces. Having been a part of all six lunar missions, the legendary chronograph is an impressive representation of the brand’s adventurous pioneering spirit.`,specs:{case:`Stainless steel, 42 mm`,bezel:`Black anodized aluminum ring with tachymeter scale`,waterResistance:`50 metres / 167 feet`,movement:`Manual-winding chronograph, Co-Axial Master Chronometer (Calibre 3861)`,powerReserve:`Approximately 50 hours`,dial:`Matte black with white hands and markers`,originalStrap:`Brushed stainless steel bracelet`},straps:[{id:`steel`,name:`Stainless Steel Bracelet`,color:`#b5b8bd`,preview:`#9fa4ab`},{id:`leather`,name:`Black Alligator Leather`,color:`#2b2b2a`,preview:`#1f1f1e`},{id:`nato`,name:`Polyamide Striped NATO`,color:`#4f4f4f`,preview:`#5c5c5c`}]},{id:`ap-royal-oak`,name:`Royal Oak Selfwinding`,brand:`Audemars Piguet`,category:`Sport`,price:27800,image:`/src/assets/watches/royaloak.png`,tag:`High Demand`,rating:4.9,reviews:76,description:`The stainless steel Royal Oak Selfwinding is distinguished by its 'Grande Tapisserie' black dial and an integrated steel bracelet. Introduced in 1972, the Audemars Piguet Royal Oak rewrote the rules of luxury watchmaking.`,specs:{case:`Stainless steel, 41 mm, glareproofed sapphire crystal`,bezel:`Octagonal fixed bezel with 8 hexagonal white gold screws`,waterResistance:`50 metres / 167 feet`,movement:`Selfwinding (Calibre 4302)`,powerReserve:`Approximately 70 hours`,dial:`Black with 'Grande Tapisserie' pattern`,originalStrap:`Integrated stainless steel bracelet`},straps:[{id:`steel`,name:`Integrated Steel Bracelet`,color:`#b5b8bd`,preview:`#9fa4ab`},{id:`leather`,name:`Cognac Calfskin Leather`,color:`#8b5a2b`,preview:`#8b5a2b`},{id:`rubber`,name:`Textured Royal Oak Rubber`,color:`#1a1c1e`,preview:`#232527`}]},{id:`cartier-tank`,name:`Tank Louis Cartier`,brand:`Cartier`,category:`Dress`,price:12800,image:`/src/assets/watches/tank.png`,tag:`Timeless Classic`,rating:4.7,reviews:64,description:`Tank Louis Cartier watch, large model, Manufacture mechanical movement with manual winding. 18K yellow gold case, beaded crown set with a sapphire cabochon, silvered grained dial, blued-steel sword-shaped hands.`,specs:{case:`18K Yellow Gold, 33.7 mm x 25.5 mm`,bezel:`Polished yellow gold fixed`,waterResistance:`30 metres / 100 feet`,movement:`Manual-winding mechanical (Calibre 1917 MC)`,powerReserve:`Approximately 38 hours`,dial:`Silvered grained, Roman numerals, blued-steel hands`,originalStrap:`Alligator leather strap`},straps:[{id:`leather`,name:`Glossy Black Alligator`,color:`#1a1a1a`,preview:`#1f1f1e`},{id:`brown-leather`,name:`Mahogany Brown Alligator`,color:`#5c3317`,preview:`#663300`},{id:`gold-mesh`,name:`18K Gold Woven Mesh`,color:`#e3b827`,preview:`#e3b827`}]},{id:`patek-calatrava`,name:`Calatrava Clous de Paris`,brand:`Patek Philippe`,category:`Dress`,price:31400,image:`/src/assets/watches/calatrava.png`,tag:`Elite Craftsmanship`,rating:5,reviews:32,description:`With its pure lines, the Calatrava is recognized as the very essence of the round wristwatch. Supremely elegant, it charms each new generation of watch lovers by its timeless understated perfection.`,specs:{case:`Rose gold, 39 mm, sapphire crystal caseback`,bezel:`Hobnail patterned ('Clous de Paris') fixed bezel`,waterResistance:`30 metres / 100 feet`,movement:`Manually wound mechanical movement (Calibre 30-255 PS)`,powerReserve:`Approximately 65 hours`,dial:`Charcoal gray, vertical satin-finished`,originalStrap:`Alligator leather strap`},straps:[{id:`leather`,name:`Matte Black Alligator`,color:`#1a1a1a`,preview:`#222`},{id:`brown-leather`,name:`Chestnut Brown Leather`,color:`#704214`,preview:`#7a4a1b`},{id:`gray-suede`,name:`Charcoal Nubuck Suede`,color:`#545a60`,preview:`#5b6167`}]},{id:`gs-snowflake`,name:`Spring Drive 'Snowflake'`,brand:`Grand Seiko`,category:`Dress`,price:6200,image:`/src/assets/watches/snowflake.png`,tag:`High Precision`,rating:4.8,reviews:120,description:`The Grand Seiko SBGA211 is powered by Spring Drive, Grand Seiko's unique caliber, which combines the motive force of a mainspring with the high precision of a quartz watch. The dial texture is inspired by the wind-swept snow of Shinshu.`,specs:{case:`High-intensity titanium, 41 mm`,bezel:`Polished titanium fixed`,waterResistance:`100 metres / 330 feet`,movement:`Spring Drive automatic winding (Calibre 9R65)`,powerReserve:`Approximately 72 hours`,dial:`White 'Snowflake' texture with blue steel seconds hand`,originalStrap:`High-intensity titanium bracelet`},straps:[{id:`titanium`,name:`High-intensity Titanium`,color:`#a5a9b0`,preview:`#b5b9c0`},{id:`blue-leather`,name:`Midnight Blue Crocodile`,color:`#0f1c3f`,preview:`#182a5c`},{id:`rubber`,name:`Snow-white Curved Rubber`,color:`#f8f9fa`,preview:`#f0f2f5`}]}],c=e=>s.find(t=>t.id===e),l=`modulepreload`,u=function(e){return`/`+e},d={},f=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,new URL(`../../../src/node/plugins/importAnalysisBuild.ts`,import.meta.url)).href}r=o(t.map(t=>{if(t=u(t,n),t=s(t),t in d)return;d[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:l,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};function p(e){let t=i.state.wishlist.includes(e.id),n=e.price.toLocaleString();return`
    <article class="product-card" data-id="${e.id}">
      ${e.tag?`<div class="card-badge">${e.tag}</div>`:``}
      
      <button class="wishlist-btn ${t?`active`:``}" 
              data-id="${e.id}" 
              aria-label="${t?`Remove from wishlist`:`Add to wishlist`}">
        ★
      </button>

      <a href="/product/${e.id}" class="product-img-wrapper" data-link>
        <img class="product-img" src="${e.image}" alt="${e.name}" loading="lazy" />
      </a>

      <div class="product-info">
        <span class="product-brand">${e.brand}</span>
        <h3 class="product-name">
          <a href="/product/${e.id}" data-link>${e.name}</a>
        </h3>
        
        <div style="display: flex; gap: 0.25rem; align-items: center; margin-bottom: 1rem; font-size: 0.85rem;">
          <span style="color: var(--color-gold);">★</span>
          <span>${e.rating}</span>
          <span style="color: var(--text-muted); font-size: 0.8rem;">(${e.reviews} reviews)</span>
        </div>

        <div class="product-meta">
          <span class="product-price">$${n}</span>
          <button class="add-cart-btn" data-id="${e.id}">Add to Bag</button>
        </div>
      </div>
    </article>
  `}function m(e){e&&e.addEventListener(`click`,e=>{let t=e.target.closest(`.wishlist-btn`);if(t){e.preventDefault();let n=t.getAttribute(`data-id`);i.toggleWishlist(n);let r=i.state.wishlist.includes(n);t.classList.toggle(`active`,r)}let n=e.target.closest(`.add-cart-btn`);if(n){e.preventDefault();let t=n.getAttribute(`data-id`);f(()=>Promise.resolve().then(()=>o).then(e=>{let n=e.getProductById(t);n&&i.addToCart(n,1,`steel`)}),void 0)}})}var h=class{render(){return`
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
              ${s.slice(0,3).map(e=>p(e)).join(``)}
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
    `}afterRender(){let e=document.getElementById(`featured-grid`);e&&m(e),document.querySelectorAll(`.brand-item`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-brand`);f(()=>Promise.resolve().then(()=>n).then(e=>{let n=e.default;n.resetFilters(),n.updateFilters({brands:[t]});let r=new CustomEvent(`chronos-navigate`,{detail:`/catalog`});window.dispatchEvent(r)}),void 0)})})}},g=class{render(){let{brands:e,categories:t,priceRange:n,search:r}=i.state.filters,a=e.includes(`Wishlist`),o=[...new Set(s.map(e=>e.brand))],c=[...new Set(s.map(e=>e.category))];return`
      <aside class="filters-sidebar fade-in">
        <div class="filter-group">
          <h4 class="filter-title">Search</h4>
          <input type="text" id="search-input" class="form-input" 
                 placeholder="Search watches..." value="${r}" />
        </div>

        <div class="filter-group">
          <h4 class="filter-title">Showcase</h4>
          <label class="checkbox-label">
            <input type="checkbox" id="wishlist-filter" ${a?`checked`:``} />
            <span>Wishlist Only ⭐</span>
          </label>
        </div>

        <div class="filter-group">
          <h4 class="filter-title">Brands</h4>
          <div style="display: flex; flex-direction: column;">
            ${o.map(t=>`
                <label class="checkbox-label">
                  <input type="checkbox" class="brand-filter" value="${t}" ${e.includes(t)?`checked`:``} />
                  <span>${t}</span>
                </label>
              `).join(``)}
          </div>
        </div>

        <div class="filter-group">
          <h4 class="filter-title">Collections</h4>
          <div style="display: flex; flex-direction: column;">
            ${c.map(e=>`
                <label class="checkbox-label">
                  <input type="checkbox" class="category-filter" value="${e}" ${t.includes(e)?`checked`:``} />
                  <span>${e}</span>
                </label>
              `).join(``)}
          </div>
        </div>

        <div class="filter-group">
          <h4 class="filter-title">Max Price</h4>
          <div class="price-range-inputs">
            <input type="range" id="price-slider" class="price-slider" 
                   min="0" max="50000" step="1000" value="${n.max}" />
            <div class="price-values">
              <span>$0</span>
              <span id="price-display" style="font-weight: 600; color: var(--color-gold);">$${n.max.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <button id="reset-filters-btn" class="btn btn-secondary" style="width: 100%; margin-top: 1rem; font-size: 0.75rem; padding: 0.6rem 1rem;">
          Reset Filters
        </button>
      </aside>
    `}afterRender(){let e=document.getElementById(`search-input`),t=document.getElementById(`wishlist-filter`),n=document.querySelectorAll(`.brand-filter`),r=document.querySelectorAll(`.category-filter`),a=document.getElementById(`price-slider`),o=document.getElementById(`price-display`),s=document.getElementById(`reset-filters-btn`),c;e&&e.addEventListener(`input`,e=>{clearTimeout(c),c=setTimeout(()=>{i.updateFilters({search:e.target.value})},300)}),t&&t.addEventListener(`change`,e=>{let t=[...i.state.filters.brands];e.target.checked?t.includes(`Wishlist`)||t.push(`Wishlist`):t=t.filter(e=>e!==`Wishlist`),i.updateFilters({brands:t})}),n.forEach(e=>{e.addEventListener(`change`,()=>{let e=Array.from(n).filter(e=>e.checked).map(e=>e.value);t&&t.checked&&e.push(`Wishlist`),i.updateFilters({brands:e})})}),r.forEach(e=>{e.addEventListener(`change`,()=>{let e=Array.from(r).filter(e=>e.checked).map(e=>e.value);i.updateFilters({categories:e})})}),a&&(a.addEventListener(`input`,e=>{let t=parseInt(e.target.value);o&&(o.innerText=`$${t.toLocaleString()}`)}),a.addEventListener(`change`,e=>{let t=parseInt(e.target.value);i.updateFilters({priceRange:{min:0,max:t}})})),s&&s.addEventListener(`click`,()=>{i.resetFilters()})}},_=class{render(){let e=this.getFilteredProducts();return e.length===0?`
        <div class="empty-state fade-in">
          <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">No Timepieces Found</h3>
          <p style="color: var(--text-muted); margin-bottom: 1.5rem;">We couldn't find any watches matching your current filter selection.</p>
          <button id="reset-all-filters-btn" class="btn btn-primary">Reset Filters</button>
        </div>
      `:`
      <div id="grid-container" class="products-grid fade-in">
        ${e.map(e=>p(e)).join(``)}
      </div>
    `}afterRender(){let e=document.getElementById(`grid-container`);e&&m(e);let t=document.getElementById(`reset-all-filters-btn`);t&&t.addEventListener(`click`,()=>{i.resetFilters()})}getFilteredProducts(){let{search:e,brands:t,categories:n,priceRange:r,sortBy:a}=i.state.filters,o=i.state.wishlist;return s.filter(i=>{if(e){let t=e.toLowerCase();if(!(i.name.toLowerCase().includes(t)||i.brand.toLowerCase().includes(t)||i.category.toLowerCase().includes(t)||i.description.toLowerCase().includes(t)))return!1}return!(t&&t.length>0&&!t.includes(i.brand)&&!(t.includes(`Wishlist`)&&o.includes(i.id))||n&&n.length>0&&!n.includes(i.category)||i.price<r.min||i.price>r.max)}).sort((e,t)=>a===`price-asc`?e.price-t.price:a===`price-desc`?t.price-e.price:a===`rating`?t.rating-e.rating:0)}},v=class{constructor(){this.filtersComponent=new g,this.gridComponent=new _}render(){let e=i.state.filters.sortBy;return`
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
                  <option value="featured" ${e===`featured`?`selected`:``}>Featured</option>
                  <option value="price-asc" ${e===`price-asc`?`selected`:``}>Price: Low to High</option>
                  <option value="price-desc" ${e===`price-desc`?`selected`:``}>Price: High to Low</option>
                  <option value="rating" ${e===`rating`?`selected`:``}>Top Rated</option>
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
    `}afterRender(){this.filtersComponent.afterRender(),this.gridComponent.afterRender();let e=document.getElementById(`sort-select`);e&&e.addEventListener(`change`,e=>{i.updateFilters({sortBy:e.target.value})}),this.updateCountUI(i.state),this.unsubscribe=i.subscribe(e=>{let t=document.getElementById(`grid-mount-point`);t&&(t.innerHTML=this.gridComponent.render(),this.gridComponent.afterRender()),this.updateCountUI(e);let n=document.getElementById(`sort-select`);n&&(n.value=e.filters.sortBy)})}updateCountUI(e){let t=document.getElementById(`results-count-display`);if(t){let e=this.gridComponent.getFilteredProducts().length;t.innerText=`${e} ${e===1?`watch`:`watches`} available`}}destroy(){this.unsubscribe&&this.unsubscribe(),this.filtersComponent.destroy&&this.filtersComponent.destroy(),this.gridComponent.destroy&&this.gridComponent.destroy()}},y=class{constructor(e){this.productId=e.id,this.product=c(this.productId),this.selectedStrapId=`steel`,this.product&&this.product.straps&&this.product.straps.length>0&&(this.selectedStrapId=this.product.straps[0].id)}render(){if(!this.product)return`
        <div class="container section-padding text-center fade-in">
          <h2>Timepiece Not Found</h2>
          <p style="color: var(--text-muted); margin-bottom: 2rem;">The watch you are looking for does not exist in our catalog.</p>
          <a href="/catalog" class="btn btn-primary" data-link>Back to Catalog</a>
        </div>
      `;let e=this.product,t=i.state.wishlist.includes(e.id);return`
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
              <img id="main-watch-img" class="detail-main-img" src="${e.image}" alt="${e.name}" />
            </div>
            
            <!-- Customizer Options Panel -->
            <div class="customizer-box">
              <h4 class="customizer-title">Select Customized Strap</h4>
              <div class="customizer-options">
                ${e.straps.map(e=>`
                    <div class="strap-option ${e.id===this.selectedStrapId?`active`:``}" data-strap-id="${e.id}">
                      <div class="strap-color-preview" style="background-color: ${e.preview};"></div>
                      <span class="strap-name">${e.name.split(` `)[0]}</span>
                    </div>
                  `).join(``)}
              </div>
            </div>
          </div>

          <!-- Product Specs & Buying -->
          <div class="detail-info">
            <span class="detail-brand">${e.brand}</span>
            <h1 class="detail-name">${e.name}</h1>
            <div class="detail-price">$${e.price.toLocaleString()}</div>
            
            <p class="detail-description">${e.description}</p>
            
            <div class="detail-actions">
              <button id="add-to-bag-btn" class="btn btn-primary">Add to Shopping Bag</button>
              <button id="detail-wishlist-btn" class="btn btn-secondary ${t?`active`:``}">
                ${t?`★ Saved`:`⭐ Save to Wishlist`}
              </button>
            </div>

            <!-- Technical Specifications Table -->
            <div class="detail-specs-table">
              <h3 class="specs-title">Technical Specifications</h3>
              <div class="specs-row">
                <span class="specs-label">Case Diameter</span>
                <span class="specs-val">${e.specs.case}</span>
              </div>
              <div class="specs-row">
                <span class="specs-label">Bezel</span>
                <span class="specs-val">${e.specs.bezel}</span>
              </div>
              <div class="specs-row">
                <span class="specs-label">Movement</span>
                <span class="specs-val">${e.specs.movement}</span>
              </div>
              <div class="specs-row">
                <span class="specs-label">Power Reserve</span>
                <span class="specs-val">${e.specs.powerReserve}</span>
              </div>
              <div class="specs-row">
                <span class="specs-label">Water Resistance</span>
                <span class="specs-val">${e.specs.waterResistance}</span>
              </div>
              <div class="specs-row">
                <span class="specs-label">Dial</span>
                <span class="specs-val">${e.specs.dial}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `}afterRender(){if(!this.product)return;let e=document.getElementById(`customizer-canvas`),t=document.getElementById(`add-to-bag-btn`),n=document.getElementById(`detail-wishlist-btn`),r=document.querySelectorAll(`.strap-option`),a=t=>{if(!e)return;let n=e.getContext(`2d`);if(!n)return;let r=e.getBoundingClientRect();e.width=r.width*window.devicePixelRatio,e.height=r.height*window.devicePixelRatio,n.scale(window.devicePixelRatio,window.devicePixelRatio);let i=r.width,a=r.height;n.clearRect(0,0,i,a);let o=this.product.straps.find(e=>e.id===t),s=o?o.color:`#b5b8bd`,c=i/2;if(n.fillStyle=s,n.beginPath(),n.roundRect(c-56/2,40,56,a/2-80,[10,10,0,0]),n.fill(),n.beginPath(),n.roundRect(c-56/2,a/2+80,56,a/2-120,[0,0,10,10]),n.fill(),(t.includes(`leather`)||t.includes(`nato`))&&(n.strokeStyle=`rgba(255, 255, 255, 0.4)`,n.lineWidth=1.5,n.setLineDash([4,4]),n.beginPath(),n.moveTo(c-56/2+6,45),n.lineTo(c-56/2+6,a/2-80),n.stroke(),n.beginPath(),n.moveTo(c-56/2+6,a/2+80),n.lineTo(c-56/2+6,a-50),n.stroke(),n.beginPath(),n.moveTo(c+56/2-6,45),n.lineTo(c+56/2-6,a/2-80),n.stroke(),n.beginPath(),n.moveTo(c+56/2-6,a/2+80),n.lineTo(c+56/2-6,a-50),n.stroke()),t===`steel`||t===`gold`||t===`titanium`||t===`gold-mesh`){n.strokeStyle=`rgba(0, 0, 0, 0.15)`,n.lineWidth=2,n.setLineDash([]);for(let e=60;e<a/2-80;e+=24)n.beginPath(),n.moveTo(c-56/2,e),n.lineTo(c+56/2,e),n.stroke(),n.beginPath(),n.moveTo(c-56/6,e-24),n.lineTo(c-56/6,e),n.moveTo(c+56/6,e-24),n.lineTo(c+56/6,e),n.stroke();for(let e=a/2+100;e<a-40;e+=24)n.beginPath(),n.moveTo(c-56/2,e),n.lineTo(c+56/2,e),n.stroke(),n.beginPath(),n.moveTo(c-56/6,e-24),n.lineTo(c-56/6,e),n.moveTo(c+56/6,e-24),n.lineTo(c+56/6,e),n.stroke()}};setTimeout(()=>a(this.selectedStrapId),50),this.resizeHandler=()=>a(this.selectedStrapId),window.addEventListener(`resize`,this.resizeHandler),r.forEach(e=>{e.addEventListener(`click`,()=>{r.forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),this.selectedStrapId=e.getAttribute(`data-strap-id`),a(this.selectedStrapId)})}),t&&t.addEventListener(`click`,()=>{i.addToCart(this.product,1,this.selectedStrapId);let e=document.getElementById(`cart-overlay`);e&&e.classList.add(`active`)}),n&&n.addEventListener(`click`,()=>{i.toggleWishlist(this.product.id);let e=i.state.wishlist.includes(this.product.id);n.innerHTML=e?`★ Saved`:`⭐ Save to Wishlist`,n.classList.toggle(`active`,e)}),this.unsubscribe=i.subscribe(e=>{let t=e.wishlist.includes(this.product.id);n&&(n.innerHTML=t?`★ Saved`:`⭐ Save to Wishlist`,n.classList.toggle(`active`,t))})}destroy(){window.removeEventListener(`resize`,this.resizeHandler),this.unsubscribe&&this.unsubscribe()}},b=class{constructor(){this.orderPlaced=!1,this.orderId=``}render(){let e=i.state.cart;if(this.orderPlaced)return`
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
      `;if(e.length===0)return`
        <div class="container section-padding text-center fade-in">
          <h2>Your bag is empty</h2>
          <p style="color: var(--text-muted); margin-bottom: 2rem;">You must add items to your shopping bag before checking out.</p>
          <a href="/catalog" class="btn btn-primary" data-link>Browse Collection</a>
        </div>
      `;let t=0,n=e.map(e=>{let n=e.product.price*e.quantity;t+=n;let r=e.product.straps.find(t=>t.id===e.selectedStrap)||{name:`Original`};return`
        <div class="summary-item">
          <div>
            <div style="font-weight: 500; color: var(--text);">${e.product.name}</div>
            <div class="summary-item-details">${e.product.brand} &bull; Qty: ${e.quantity}</div>
            <div style="font-size: 0.75rem; color: var(--color-gold);">${r.name}</div>
          </div>
          <span style="font-weight: 500;">$${n.toLocaleString()}</span>
        </div>
      `}).join(``),r=t+150;return`
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
                Authorize Payment ($${r.toLocaleString()})
              </button>
            </div>
          </form>

          <!-- Order Summary Sidebar -->
          <div class="checkout-summary">
            <h3 style="font-size: 1.25rem; margin-bottom: 1.5rem; font-weight: 600;">Summary</h3>
            
            <div class="summary-items">
              ${n}
            </div>

            <div class="summary-divider"></div>

            <div class="summary-item" style="margin-bottom: 0.75rem;">
              <span style="color: var(--text-muted);">Subtotal</span>
              <span>$${t.toLocaleString()}</span>
            </div>
            
            <div class="summary-item" style="margin-bottom: 0.75rem;">
              <span style="color: var(--text-muted);">Courier Shipping (Insured)</span>
              <span>$${150 .toLocaleString()}</span>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-item" style="margin-bottom: 0;">
              <span style="font-size: 1.1rem; font-weight: 600;">Order Total</span>
              <span style="font-size: 1.5rem; font-weight: 700; color: var(--color-gold);">$${r.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    `}afterRender(){if(this.orderPlaced)return;let e=document.getElementById(`checkout-form`);e&&e.addEventListener(`submit`,e=>{if(e.preventDefault(),this.validateForm()){let e=Math.floor(1e5+Math.random()*9e5);this.orderId=`CH-${e}`,this.orderPlaced=!0,i.clearCart(),i.triggerToast(`Order placed successfully!`,`success`);let t=document.getElementById(`app`);t&&(t.innerHTML=this.render(),this.afterRender())}})}validateForm(){let e=!0;return[{id:`first-name`,val:()=>document.getElementById(`first-name`).value.trim(),rule:e=>e.length>0,msg:`First name is required.`},{id:`last-name`,val:()=>document.getElementById(`last-name`).value.trim(),rule:e=>e.length>0,msg:`Last name is required.`},{id:`email`,val:()=>document.getElementById(`email`).value.trim(),rule:e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),msg:`Enter a valid email address.`},{id:`address`,val:()=>document.getElementById(`address`).value.trim(),rule:e=>e.length>0,msg:`Address is required.`},{id:`city`,val:()=>document.getElementById(`city`).value.trim(),rule:e=>e.length>0,msg:`City is required.`},{id:`zipcode`,val:()=>document.getElementById(`zipcode`).value.trim(),rule:e=>e.length>=4,msg:`Enter a valid postal code.`},{id:`card-name`,val:()=>document.getElementById(`card-name`).value.trim(),rule:e=>e.length>0,msg:`Name on card is required.`},{id:`card-number`,val:()=>document.getElementById(`card-number`).value.replace(/\s+/g,``),rule:e=>/^\d{16}$/.test(e),msg:`Card number must be exactly 16 digits.`},{id:`card-expiry`,val:()=>document.getElementById(`card-expiry`).value.trim(),rule:e=>/^\d{2}\/\d{2}$/.test(e),msg:`Format must be MM/YY.`},{id:`card-cvv`,val:()=>document.getElementById(`card-cvv`).value.trim(),rule:e=>/^\d{3,4}$/.test(e),msg:`CVV must be 3 or 4 digits.`}].forEach(t=>{let n=document.getElementById(t.id),r=document.getElementById(`${t.id}-err`);if(!n||!r)return;let i=t.val();t.rule(i)?(n.classList.remove(`error`),r.innerText=``):(n.classList.add(`error`),r.innerText=t.msg,e=!1)}),e}},x=class{render(){let e=i.state.theme===`dark`,t=i.state.cart.reduce((e,t)=>e+t.quantity,0),n=i.state.wishlist.length;return`
      <header class="site-header">
        <div class="container header-container">
          <a href="/" class="logo" data-link>
            CHRONOS<span class="logo-gold">.</span>
          </a>

          <ul class="nav-menu">
            <li><a href="/" class="nav-link" data-link>Home</a></li>
            <li><a href="/catalog" class="nav-link" data-link>Collection</a></li>
          </ul>

          <div class="header-actions">
            <!-- Theme Toggle -->
            <button id="theme-toggle" class="icon-btn" aria-label="Toggle dark/light theme">
              ${e?`☀️`:`🌙`}
            </button>

            <!-- Wishlist Button -->
            <a href="/catalog" id="wishlist-trigger" class="icon-btn" data-link aria-label="Wishlist">
              ⭐
              <span id="wishlist-badge" class="badge" style="display: ${n>0?`flex`:`none`};">
                ${n}
              </span>
            </a>

            <!-- Cart Trigger -->
            <button id="cart-trigger" class="icon-btn" aria-label="Shopping Cart">
              🛒
              <span id="cart-badge" class="badge" style="display: ${t>0?`flex`:`none`};">
                ${t}
              </span>
            </button>
          </div>
        </div>
      </header>
    `}afterRender(){let e=document.getElementById(`theme-toggle`);e&&e.addEventListener(`click`,()=>{i.toggleTheme()});let t=document.getElementById(`cart-trigger`);t&&t.addEventListener(`click`,()=>{let e=document.getElementById(`cart-overlay`);e&&e.classList.add(`active`)}),this.unsubscribe=i.subscribe(e=>{let t=document.getElementById(`theme-toggle`);t&&(t.innerHTML=e.theme===`dark`?`☀️`:`🌙`);let n=document.getElementById(`cart-badge`);if(n){let t=e.cart.reduce((e,t)=>e+t.quantity,0);t>0?(n.innerText=t,n.style.display=`flex`,n.classList.remove(`bounce-badge`),n.offsetWidth,n.classList.add(`bounce-badge`)):n.style.display=`none`}let r=document.getElementById(`wishlist-badge`);if(r){let t=e.wishlist.length;t>0?(r.innerText=t,r.style.display=`flex`):r.style.display=`none`}})}destroy(){this.unsubscribe&&this.unsubscribe()}},S=class{render(){return`
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
    `}afterRender(){let e=document.getElementById(`cart-overlay`),t=document.getElementById(`cart-close-btn`),n=()=>{e.classList.remove(`active`)};t&&t.addEventListener(`click`,n),e&&e.addEventListener(`click`,t=>{t.target===e&&n()}),this.updateCartUI(i.state),this.unsubscribe=i.subscribe(e=>{this.updateCartUI(e)}),e.querySelector(`.cart-drawer`).addEventListener(`click`,e=>{let t=e.target;if(t.classList.contains(`qty-btn`)){let e=t.getAttribute(`data-id`),n=t.getAttribute(`data-strap`),r=parseInt(t.getAttribute(`data-change`)),a=parseInt(t.getAttribute(`data-qty`));i.updateCartQuantity(e,n,a+r)}if(t.classList.contains(`remove-item`)){let e=t.getAttribute(`data-id`),n=t.getAttribute(`data-strap`);i.removeFromCart(e,n)}if(t.closest(`#checkout-btn`)){n();let e=new CustomEvent(`chronos-navigate`,{detail:`/checkout`});window.dispatchEvent(e)}})}updateCartUI(e){let t=document.getElementById(`cart-items-container`),n=document.getElementById(`cart-footer-container`);if(!t||!n)return;if(e.cart.length===0){t.innerHTML=`
        <div class="cart-empty-msg">
          <p>Your luxury bag is empty.</p>
          <a href="/catalog" class="btn btn-secondary" style="margin-top: 1.5rem; display: inline-block;" data-link>Browse Catalog</a>
        </div>
      `,n.innerHTML=``,n.style.display=`none`;return}n.style.display=`block`;let r=``,i=0;e.cart.forEach(e=>{let{product:t,quantity:n,selectedStrap:a}=e,o=t.price*n;i+=o;let s=t.straps.find(e=>e.id===a)||{name:`Original strap`};r+=`
        <div class="cart-item">
          <div class="cart-item-img">
            <img src="${t.image}" alt="${t.name}" />
          </div>
          <div class="cart-item-details">
            <div>
              <div class="cart-item-brand">${t.brand}</div>
              <div class="cart-item-name">${t.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">
                Strap: ${s.name}
              </div>
            </div>
            
            <div class="cart-item-meta">
              <div class="quantity-controls">
                <button class="qty-btn" data-id="${t.id}" data-strap="${a}" data-qty="${n}" data-change="-1">-</button>
                <span class="qty-val">${n}</span>
                <button class="qty-btn" data-id="${t.id}" data-strap="${a}" data-qty="${n}" data-change="1">+</button>
              </div>
              <span class="cart-item-price">$${o.toLocaleString()}</span>
            </div>
            
            <button class="remove-item" data-id="${t.id}" data-strap="${a}">Remove</button>
          </div>
        </div>
      `}),t.innerHTML=r,n.innerHTML=`
      <div class="cart-summary-row">
        <span class="cart-total-label">Subtotal</span>
        <span class="cart-total-val">$${i.toLocaleString()}</span>
      </div>
      <button id="checkout-btn" class="btn btn-primary" style="width: 100%;">Proceed to Checkout</button>
    `}destroy(){this.unsubscribe&&this.unsubscribe()}},C=class{constructor(){this.container=null,this.init()}init(){let e=document.getElementById(`toast-container`);e||(e=document.createElement(`div`),e.id=`toast-container`,e.className=`toast-container`,document.body.appendChild(e)),this.container=e,this.toastHandler=e=>{let{message:t,type:n}=e.detail;this.show(t,n)},window.addEventListener(`chronos-toast`,this.toastHandler)}show(e,t=`info`){let n=document.createElement(`div`);n.className=`toast ${t}`;let r=`ℹ️`;t===`success`&&(r=`✨`),t===`error`&&(r=`⚠️`),n.innerHTML=`
      <span>${r}</span>
      <div>${e}</div>
    `,this.container.appendChild(n),setTimeout(()=>{n.style.animation=`slide-in-toast 0.3s ease-in reverse forwards`,n.style.opacity=`0`,setTimeout(()=>{n.remove()},300)},3500)}destroy(){window.removeEventListener(`chronos-toast`,this.toastHandler)}};document.getElementById(`app`).innerHTML=`
  <div id="header-mount"></div>
  <main id="view-container"></main>
  <div id="cart-mount"></div>
`;var w=new x,T=new S;new C,document.getElementById(`header-mount`).innerHTML=w.render(),w.afterRender(),document.getElementById(`cart-mount`).innerHTML=T.render(),T.afterRender();var E=new a([{path:`/`,view:h},{path:`/catalog`,view:v},{path:`/product/:id`,view:y},{path:`/checkout`,view:b}]);document.documentElement.setAttribute(`data-theme`,i.state.theme),window.addEventListener(`chronos-navigate`,e=>{let t=e.detail;E.navigateTo(t)}),E.route();