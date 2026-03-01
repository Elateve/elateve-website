/* ========================================
   ELATEVE — Client Application
   Fetches data from Express API
   ======================================== */

// ==================== STATE ====================
let currentPage = 'home';
let currentFilter = 'all';
let productsCache = null;

// ==================== API ====================
async function fetchProducts(category = 'all') {
  const url = category === 'all' ? '/api/products' : `/api/products?category=${category}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.products;
}

async function fetchFeatured() {
  const res = await fetch('/api/featured');
  return res.json();
}

async function fetchBlog() {
  const res = await fetch('/api/blog');
  const data = await res.json();
  return data.posts;
}

// ==================== ROUTER ====================
function navigateTo(page, category = null) {
  const activePage = document.querySelector('.page.active');
  if (activePage) {
    activePage.classList.remove('visible');
    setTimeout(() => {
      activePage.classList.remove('active');

      const newPage = document.getElementById(`page-${page}`);
      if (newPage) {
        newPage.classList.add('active');
        requestAnimationFrame(() => newPage.classList.add('visible'));
      }

      if (page === 'shop') {
        const filter = category || 'all';
        setFilter(filter);
      }

      if (page === 'blog') {
        loadBlog();
      }

      currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      updateNavActive(page);

      // Update URL without reload
      const paths = { home: '/', shop: '/shop', blog: '/blog', about: '/about' };
      const url = category ? `${paths[page]}?category=${category}` : paths[page];
      history.pushState({ page, category }, '', url);
    }, 300);
  }
}

function updateNavActive(page) {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.style.color = link.dataset.page === page ? 'var(--gold)' : '';
  });
}

// ==================== PRODUCT RENDERING ====================
function createProductCard(product) {
  const card = document.createElement('a');
  card.href = product.link;
  card.target = '_blank';
  card.rel = 'noopener noreferrer';
  card.className = 'product-card';
  card.dataset.category = product.category;

  card.innerHTML = `
    <div class="product-card-img">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <span class="product-card-badge">${product.category}</span>
    </div>
    <div class="product-card-body">
      <h3 class="product-card-name">${product.name}</h3>
      <div class="product-card-bottom">
        <span class="product-card-price">${product.price}</span>
        <span class="product-card-link">Shop Now</span>
      </div>
    </div>
  `;
  return card;
}

async function loadFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  const featured = await fetchFeatured();
  grid.innerHTML = '';
  featured.forEach(product => {
    const card = createProductCard(product);
    card.classList.add('visible');
    grid.appendChild(card);
  });
}

async function loadProducts(filter = 'all') {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const products = await fetchProducts(filter);
  products.forEach((product, i) => {
    const card = createProductCard(product);
    card.style.animationDelay = `${i * 0.05}s`;
    grid.appendChild(card);
  });

  // Staggered reveal
  setTimeout(() => {
    document.querySelectorAll('#productsGrid .product-card').forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 40);
    });
  }, 50);
}

function setFilter(category) {
  currentFilter = category;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === category);
  });
  loadProducts(category);
}

// ==================== BLOG RENDERING ====================
async function loadBlog() {
  const grid = document.getElementById('blogGrid');
  if (!grid || grid.children.length > 0) return;

  const posts = await fetchBlog();
  grid.innerHTML = '';
  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.innerHTML = `
      <span class="blog-card-date">${post.date}</span>
      <div class="blog-card-content">
        <span class="blog-card-tag">${post.tag}</span>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
      </div>
      <span class="blog-card-arrow">&rarr;</span>
    `;
    grid.appendChild(card);
  });
}

// ==================== EVENT LISTENERS ====================
function initNavigation() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-page]');
    if (link) {
      e.preventDefault();
      const page = link.dataset.page;
      const category = link.dataset.category || null;
      navigateTo(page, category);

      document.getElementById('navLinks')?.classList.remove('open');
      document.getElementById('navToggle')?.classList.remove('active');
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
      setFilter(e.target.dataset.filter);
    }
  });

  const toggle = document.getElementById('navToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      document.getElementById('navLinks')?.classList.toggle('open');
    });
  }

  const form = document.getElementById('newsletterForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Welcome to the elevation. Check your inbox.');
      form.reset();
    });
  }

  // Handle browser back/forward
  window.addEventListener('popstate', (e) => {
    if (e.state) {
      navigateTo(e.state.page, e.state.category);
    }
  });
}

// ==================== SCROLL EFFECTS ====================
function initScrollEffects() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 60);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('revealed');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.section-header, .category-card, .about-block, .about-value, .about-disclosure').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

// ==================== TOAST ====================
function showToast(message) {
  document.querySelector('.toast')?.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', async () => {
  // Determine initial page from URL
  const path = window.location.pathname;
  const params = new URLSearchParams(window.location.search);
  const pageMap = { '/': 'home', '/shop': 'shop', '/blog': 'blog', '/about': 'about' };
  const initialPage = pageMap[path] || 'home';

  // Activate initial page
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active', 'visible');
  });
  const page = document.getElementById(`page-${initialPage}`);
  if (page) {
    page.classList.add('active');
    requestAnimationFrame(() => page.classList.add('visible'));
  }

  currentPage = initialPage;
  updateNavActive(initialPage);

  // Load data
  loadFeatured();

  if (initialPage === 'shop') {
    const cat = params.get('category') || 'all';
    setFilter(cat);
  }

  if (initialPage === 'blog') {
    loadBlog();
  }

  initNavigation();
  initScrollEffects();

  // Push initial state
  history.replaceState({ page: initialPage, category: params.get('category') }, '', window.location.href);
});
