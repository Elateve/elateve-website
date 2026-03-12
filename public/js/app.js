/* ========================================
   ELATEVE — Client Application
   Fetches data from Express API
   ======================================== */

// ==================== STATE ====================
let currentPage = 'home';
let currentFilter = 'all';
let productsCache = null;

// ==================== DARK MODE ====================
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = theme === 'dark' ? '☀' : '☾';
}

function initTheme() {
  const saved = localStorage.getItem('elateve_theme') || 'light';
  applyTheme(saved);

  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('elateve_theme', next);
    });
  }
}

// ==================== API ====================
async function fetchProducts(category = 'all') {
  const url = category === 'all' ? '/api/products' : `/api/products?category=${category}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.products;
}

async function fetchBlog() {
  const res = await fetch('/api/blog');
  const data = await res.json();
  return data.posts;
}

async function fetchSpring() {
  const res = await fetch('/api/spring');
  const data = await res.json();
  return data.products;
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
        resetBlogView();
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

// ==================== COMING SOON MODAL ====================
function initComingSoonModal() {
  if (document.getElementById('comingSoonOverlay')) return;
  const overlay = document.createElement('div');
  overlay.id = 'comingSoonOverlay';
  overlay.className = 'popup-overlay';
  overlay.innerHTML = `
    <div class="popup">
      <button class="popup-close" id="comingSoonClose">&times;</button>
      <span class="popup-eyebrow">ELATEVE</span>
      <h2 class="popup-title" style="font-size:clamp(1.4rem,3vw,2rem)">Coming Soon</h2>
      <p class="popup-text">We're still curating the best way to bring you this find.<br>Check back soon — it's worth the wait.</p>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
  document.getElementById('comingSoonClose')?.addEventListener('click', () => {
    overlay.classList.remove('active');
  });
}

function showComingSoon() {
  initComingSoonModal();
  document.getElementById('comingSoonOverlay')?.classList.add('active');
}

// ==================== PRODUCT RENDERING ====================
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.category = product.category;

  const tierBadge = product.badge
    ? `<span class="product-tier-badge product-tier-badge--${product.badge.toLowerCase()}">${product.badge}</span>`
    : '';

  const elateveLoves = product.whyElateveLoves
    ? `<div class="product-card-loves">
        <button class="loves-toggle" aria-expanded="false">
          <span class="loves-heart">♥</span> Why ELATEVE loves this
          <span class="loves-arrow">›</span>
        </button>
        <p class="loves-text">${product.whyElateveLoves}</p>
       </div>`
    : '';

  card.innerHTML = `
    <div class="product-card-img">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <span class="product-card-badge">${product.category}</span>
      ${tierBadge}
    </div>
    <div class="product-card-body">
      <h3 class="product-card-name">${product.name}</h3>
      ${product.description ? `<p class="product-card-desc">${product.description}</p>` : ''}
      ${elateveLoves}
      <div class="product-card-bottom">
        <span class="product-card-price">${product.price}</span>
        <span class="product-card-link">${product.link ? 'Shop Now' : 'Coming Soon'}</span>
      </div>
    </div>
  `;

  // Handle click — open link or show coming soon modal
  card.addEventListener('click', (e) => {
    // Don't navigate if clicking the loves toggle
    if (e.target.closest('.loves-toggle')) return;

    if (product.link) {
      window.open(product.link, '_blank', 'noopener,noreferrer');
    } else {
      showComingSoon();
    }
  });

  // Toggle "Why ELATEVE loves this" accordion
  const toggle = card.querySelector('.loves-toggle');
  if (toggle) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isOpen);
      toggle.classList.toggle('open', !isOpen);
    });
  }

  return card;
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

// Subcategory definitions per category
const categorySubcategories = {
  home: [
    { label: 'All Home', tag: null },
    { label: 'Spring Refresh', tag: 'refresh' }
  ],
  wellness: [
    { label: 'All Wellness', tag: null },
    { label: 'Spring Glow Up', tag: 'glow-up' }
  ]
};

function setFilter(category) {
  currentFilter = category;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === category);
  });
  renderSubcategories(category);
  loadProducts(category);
}

function renderSubcategories(category) {
  const container = document.getElementById('shopSubcategories');
  if (!container) return;

  const subs = categorySubcategories[category];
  if (!subs) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = subs.map((sub, i) =>
    `<button class="sub-tab${i === 0 ? ' active' : ''}" data-category="${category}" data-tag="${sub.tag || ''}">${sub.label}</button>`
  ).join('');
}

async function loadFilteredProducts(category, springTag) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  let products = await fetchProducts(category);
  if (springTag) {
    products = products.filter(p => p.springTag === springTag);
  }

  products.forEach((product, i) => {
    const card = createProductCard(product);
    card.style.animationDelay = `${i * 0.05}s`;
    grid.appendChild(card);
  });

  setTimeout(() => {
    document.querySelectorAll('#productsGrid .product-card').forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 40);
    });
  }, 50);
}

// ==================== SPRING COLLECTION ====================
async function loadSpring() {
  const grid = document.getElementById('springGrid');
  if (!grid) return;

  const products = await fetchSpring();

  grid.innerHTML = '';
  products.slice(0, 4).forEach((product, i) => {
    const card = createProductCard(product);
    card.style.animationDelay = `${i * 0.05}s`;
    grid.appendChild(card);
  });

  setTimeout(() => {
    document.querySelectorAll('#springGrid .product-card').forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 40);
    });
  }, 50);
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
    card.dataset.postId = post.id;
    card.innerHTML = `
      <span class="blog-card-date">${post.date}</span>
      <div class="blog-card-content">
        <span class="blog-card-tag">${post.tag}</span>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
      </div>
      <span class="blog-card-arrow">&rarr;</span>
    `;
    card.addEventListener('click', () => openArticle(post.id));
    grid.appendChild(card);
  });
}

async function openArticle(postId) {
  const res = await fetch(`/api/blog/${postId}`);
  const post = await res.json();

  const grid = document.getElementById('blogGrid');
  const hero = document.querySelector('.blog-hero');
  const article = document.getElementById('blogArticle');

  document.getElementById('articleTag').textContent = post.tag;
  document.getElementById('articleDate').textContent = post.date;
  document.getElementById('articleRead').textContent = post.readTime || '';
  document.getElementById('articleTitle').textContent = post.title;

  const body = document.getElementById('articleBody');
  body.innerHTML = '';
  if (post.content) {
    post.content.forEach(paragraph => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      body.appendChild(p);
    });
  }

  grid.style.display = 'none';
  hero.style.display = 'none';
  article.style.display = 'block';
  article.querySelector('.blog-article-inner').style.animation = 'none';
  requestAnimationFrame(() => {
    article.querySelector('.blog-article-inner').style.animation = 'fadeUp 0.6s var(--ease-out) forwards';
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeArticle() {
  const grid = document.getElementById('blogGrid');
  const hero = document.querySelector('.blog-hero');
  const article = document.getElementById('blogArticle');

  if (article) article.style.display = 'none';
  if (hero) hero.style.display = 'block';
  if (grid) grid.style.display = 'flex';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Also reset blog article state when navigating to blog page
function resetBlogView() {
  const grid = document.getElementById('blogGrid');
  const hero = document.querySelector('.blog-hero');
  const article = document.getElementById('blogArticle');

  if (article) article.style.display = 'none';
  if (hero) hero.style.display = 'block';
  if (grid) grid.style.display = 'flex';
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
    if (e.target.classList.contains('sub-tab')) {
      document.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      const tag = e.target.dataset.tag || null;
      const cat = e.target.dataset.category;
      loadFilteredProducts(cat, tag);
    }
  });

  const toggle = document.getElementById('navToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      document.getElementById('navLinks')?.classList.toggle('open');
    });
  }

  const blogBack = document.getElementById('blogBack');
  if (blogBack) {
    blogBack.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeArticle();
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
  loadSpring();

  if (initialPage === 'shop') {
    const cat = params.get('category') || 'all';
    setFilter(cat);
  }

  if (initialPage === 'blog') {
    loadBlog();
  }

  initNavigation();
  initScrollEffects();
  initTheme();

  // ==================== SPRING CHECKLIST BUTTON ====================
  const springBtn = document.getElementById('springChecklist');
  if (springBtn) {
    springBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('blog');
      setTimeout(() => openArticle(10), 350);
    });
  }

  // Push initial state
  history.replaceState({ page: initialPage, category: params.get('category') }, '', window.location.href);

  // ==================== EMAIL POPUP ====================
  initPopup();
});

function initPopup() {
  const overlay = document.getElementById('popupOverlay');
  const closeBtn = document.getElementById('popupClose');
  const form = document.getElementById('popupForm');

  if (!overlay) return;

  // Check if user has already dismissed the popup
  const dismissed = localStorage.getItem('elateve_popup_dismissed');
  if (dismissed) return;

  // Show popup after 3 seconds
  setTimeout(() => {
    overlay.classList.add('active');
  }, 3000);

  // Close popup
  function closePopup() {
    overlay.classList.remove('active');
    localStorage.setItem('elateve_popup_dismissed', 'true');
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closePopup();
    });
  }

  // Close on overlay click (outside popup)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closePopup();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closePopup();
    }
  });

  // Handle popup form submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Show thank you + download link inside the popup
      const popupContent = overlay.querySelector('.popup-content');
      if (popupContent) {
        popupContent.innerHTML = `
          <span class="popup-eyebrow">You're In!</span>
          <h2 class="popup-title">Your Guide Is Ready</h2>
          <p class="popup-text">Thank you for joining the ELATEVE community. Download your free Spring Refresh Guide below.</p>
          <a href="/downloads/elateve-spring-refresh-guide.pdf" target="_blank" class="btn btn--gold" style="display:inline-block;text-align:center;margin-top:1rem;">Download Your Free Guide</a>
          <p class="popup-note" style="margin-top:1rem;">Check your inbox for weekly curated picks.</p>
        `;
      }
      localStorage.setItem('elateve_popup_dismissed', 'true');
    });
  }
}
