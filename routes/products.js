const express = require('express');
const router = express.Router();
const products = require('../data/products');
const blogPosts = require('../data/blog');

// GET /api/products — all products or filtered by category
router.get('/products', (req, res) => {
  const { category } = req.query;
  if (category && category !== 'all') {
    const filtered = products.filter(p => p.category === category.toLowerCase());
    return res.json({ count: filtered.length, products: filtered });
  }
  res.json({ count: products.length, products });
});

// GET /api/products/:id — single product
router.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// GET /api/categories — category summary
router.get('/categories', (req, res) => {
  const categories = ['wellness', 'experience', 'home', 'wealth'].map(cat => ({
    name: cat,
    count: products.filter(p => p.category === cat).length
  }));
  res.json(categories);
});

// GET /api/featured — one random product per category
router.get('/featured', (req, res) => {
  const featured = ['wellness', 'experience', 'home', 'wealth'].map(cat => {
    const catProducts = products.filter(p => p.category === cat);
    return catProducts[Math.floor(Math.random() * catProducts.length)];
  });
  res.json(featured);
});

// GET /api/spring — all spring collection products
router.get('/spring', (req, res) => {
  const spring = products.filter(p => p.spring);
  res.json({ count: spring.length, products: spring });
});

// GET /api/blog — all blog posts (without full content for list view)
router.get('/blog', (req, res) => {
  const summaries = blogPosts.map(({ content, ...rest }) => rest);
  res.json({ count: summaries.length, posts: summaries });
});

// GET /api/blog/:id — single blog post with full content
router.get('/blog/:id', (req, res) => {
  const post = blogPosts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

module.exports = router;
