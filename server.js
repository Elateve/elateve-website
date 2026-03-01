const express = require('express');
const path = require('path');
const productsRouter = require('./routes/products');
const pagesRouter = require('./routes/pages');

const app = express();
const PORT = process.env.PORT || 3000;

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// JSON parsing
app.use(express.json());

// API routes
app.use('/api', productsRouter);

// Page routes
app.use('/', pagesRouter);

app.listen(PORT, () => {
  console.log(`ELATEVE running at http://localhost:${PORT}`);
});
