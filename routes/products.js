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
  const categories = ['wellness', 'love', 'home', 'wealth'].map(cat => ({
    name: cat,
    count: products.filter(p => p.category === cat).length
  }));
  res.json(categories);
});

// GET /api/featured — one random product per category
router.get('/featured', (req, res) => {
  const featured = ['wellness', 'love', 'home', 'wealth'].map(cat => {
    const catProducts = products.filter(p => p.category === cat);
    return catProducts[Math.floor(Math.random() * catProducts.length)];
  });
  res.json(featured);
});

// GET /api/blog — all blog posts
router.get('/blog', (req, res) => {
  res.json({ count: blogPosts.length, posts: blogPosts });
});

module.exports = router;
