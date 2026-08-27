const express = require('express');
const path = require('path');
const router = express.Router();

// Serve index.html for all page routes (SPA)
const sendIndex = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
};

router.get('/', sendIndex);
router.get('/blog', sendIndex);
router.get('/about', sendIndex);
// /shop retired — redirect any old links home
router.get('/shop', (req, res) => res.redirect(301, '/'));

module.exports = router;
