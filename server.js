const express = require('express');
const path = require('path');
const fs = require('fs');
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

// Subscribe endpoint — stores emails and forwards to hello@elateve.com
const SUBSCRIBERS_FILE = path.join(__dirname, 'data', 'subscribers.json');

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  // Load existing subscribers
  let subscribers = [];
  try {
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      subscribers = JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, 'utf8'));
    }
  } catch (e) { /* start fresh */ }

  // Check for duplicates
  if (subscribers.some(s => s.email === email)) {
    return res.json({ success: true, message: 'Already subscribed' });
  }

  // Add new subscriber
  subscribers.push({ email, date: new Date().toISOString() });
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));

  console.log(`New subscriber: ${email} → forward to hello@elateve.com`);
  res.json({ success: true, message: 'Subscribed' });
});

// Page routes
app.use('/', pagesRouter);

app.listen(PORT, () => {
  console.log(`ELATEVE running at http://localhost:${PORT}`);
});
