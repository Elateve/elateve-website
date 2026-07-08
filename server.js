// Load .env if present (e.g. SHEETS_WEBHOOK_URL on the host) — no-op if missing
try { process.loadEnvFile(); } catch (e) { /* no .env file, fine in local dev */ }

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
const QUIZ_RESULTS_FILE = path.join(__dirname, 'data', 'quiz-results.json');

// Google Sheets webhook (Apps Script Web App /exec URL). Entries still save
// locally either way — this is just a live-sheet mirror. Set SHEETS_WEBHOOK_URL
// as an environment variable on the host (not committed — it's a write-access
// URL, anyone with it can append rows to the Sheet).
const SHEETS_WEBHOOK_URL = process.env.SHEETS_WEBHOOK_URL || '';

function forwardToSheet(payload) {
  if (!SHEETS_WEBHOOK_URL) return;
  fetch(SHEETS_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).catch(err => console.error('Sheet webhook forward failed:', err.message));
}

function readJsonFile(file) {
  try {
    if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) { /* start fresh */ }
  return [];
}

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const subscribers = readJsonFile(SUBSCRIBERS_FILE);

  // Check for duplicates
  if (subscribers.some(s => s.email === email)) {
    return res.json({ success: true, message: 'Already subscribed' });
  }

  const entry = { email, date: new Date().toISOString() };
  subscribers.push(entry);
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
  forwardToSheet({ type: 'newsletter', ...entry });

  console.log(`New subscriber: ${email} → forward to hello@elateve.com`);
  res.json({ success: true, message: 'Subscribed' });
});

// Quiz result endpoint — stores email + stage + result, mirrors to Google Sheet
app.post('/api/quiz-result', (req, res) => {
  const { email, stage, resultKey, resultTitle } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }
  if (!stage) {
    return res.status(400).json({ error: 'Stage required' });
  }

  const results = readJsonFile(QUIZ_RESULTS_FILE);
  const pdfUrl = resultKey
    ? `https://www.elateve.com/downloads/quiz-guides/${stage}-${String(resultKey).toLowerCase()}.pdf`
    : null;
  const entry = { email, stage, resultKey: resultKey || null, resultTitle: resultTitle || null, pdfUrl, date: new Date().toISOString() };
  results.push(entry);
  fs.writeFileSync(QUIZ_RESULTS_FILE, JSON.stringify(results, null, 2));
  forwardToSheet({ type: 'quiz', ...entry });

  // Also fold into the general subscriber list so quiz-takers get future emails
  const subscribers = readJsonFile(SUBSCRIBERS_FILE);
  if (!subscribers.some(s => s.email === email)) {
    subscribers.push({ email, date: entry.date, source: 'quiz' });
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
  }

  console.log(`Quiz result: ${email} → ${stage} / ${resultTitle}`);
  res.json({ success: true, message: 'Result saved' });
});

// Page routes
app.use('/', pagesRouter);

app.listen(PORT, () => {
  console.log(`ELATEVE running at http://localhost:${PORT}`);
});
