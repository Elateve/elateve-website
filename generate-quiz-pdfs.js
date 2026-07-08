const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const quizzes = require('./data/quizzes');

// Brand colors
const GOLD = '#C5973E';
const CREAM = '#F7F5F0';
const CHARCOAL = '#1A1A1A';
const GREY = '#6B6B6B';

const W = 612; // letter width
const H = 792; // letter height

const OUT_DIR = path.join(__dirname, 'public', 'downloads', 'quiz-guides');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Extra "Tips & Tricks" content per stage + result, on top of what's already
// in data/quizzes.js (title, summary, picks).
const tips = {
  ripple: {
    A: [
      "Keep a simple cycle calendar together — normalize tracking early without making it clinical.",
      "Introduce fragrance-free, gentle skincare now, before breakouts start, not after.",
      "Protect her sleep window — no screens 30 minutes before bed sets a foundation that pays off for years.",
      "Normalize movement as fun, not fitness — dance, walking the dog, and bike rides all count.",
      "Keep the conversation door open with low-pressure check-ins rather than one big \"talk.\"",
      "Revisit this assessment every few months — bodies change fast at this age."
    ],
    B: [
      "Swap to a breathable, cool pillowcase if night warmth or restlessness is new.",
      "Introduce a wind-down tea ritual to signal bedtime to a system that's recalibrating.",
      "Address breakouts with gentle, dermatologist-formulated products — not aggressive acne treatments.",
      "Validate mood swings out loud: hormones can make even small things feel huge right now.",
      "Add a diffuser with calming scents to her room for the harder weeks.",
      "Book a check-in with a provider experienced with adolescent hormonal health if symptoms feel bigger than \"normal.\""
    ],
    C: [
      "Prioritize her sleep environment first — cooling sheets, blackout curtains, a consistent bedtime.",
      "Seek a provider experienced with adolescent hormonal health, not just a general check-up.",
      "Introduce a shared journal so she can express what's hard to say out loud.",
      "Keep skincare minimal and soothing until things stabilize — less is more right now.",
      "Build in a weekly low-pressure ritual together (tea, a show, a walk) to keep connection strong.",
      "Remember: intense doesn't mean permanent. Most turbulence here softens with time and support."
    ]
  },
  creation: {
    A: [
      "Layer in a daily probiotic now — gut health compounds well before you need it to.",
      "Protect one non-negotiable stretch of sleep, even 20 minutes, daily.",
      "Build a simple support list (people you can actually call) before you need it.",
      "Keep movement gentle and consistent rather than ambitious.",
      "Journal weekly — tracking how you feel early makes changes easier to spot later.",
      "Revisit this assessment each trimester or postpartum month — this stage moves fast."
    ],
    B: [
      "Say the sentence out loud to someone: \"I need more help than I'm asking for.\"",
      "Add a weighted or pressure-based sleep aid for whatever sleep window you get.",
      "Simplify meals — nutrient-dense and easy beats elaborate and abandoned.",
      "Let one thing go this week. Just one. Notice how it feels.",
      "Use scent (a diffuser, a candle) as a fast nervous-system reset between tasks.",
      "Book one appointment focused only on you, not the baby — a massage, a check-up, anything."
    ],
    C: [
      "This week, ask for real help — meals, night shifts, anything you can hand off.",
      "Talk to your provider about postpartum mood support; depletion this deep deserves attention.",
      "Protect sleep like it's medicine, because it is.",
      "Lower the bar on everything non-essential for the next two weeks.",
      "Keep gut and nutrient support simple and consistent (probiotic, easy protein, hydration).",
      "Revisit this assessment in two weeks — deep depletion should trend upward with support, not stay flat."
    ]
  },
  shift: {
    A: [
      "Start strength training now if you haven't — bone density work compounds for decades.",
      "Build a cooling sleep setup before you need it (breathable bedding, temperature regulation).",
      "Get a baseline hormone panel with your doctor so you have something to compare against later.",
      "Introduce adaptogens or magnesium now as a gentle foundation, not a fix.",
      "Keep a symptom log monthly — subtle shifts are easiest to catch early.",
      "Revisit this assessment every few months as your baseline shifts."
    ],
    B: [
      "Swap to bamboo or linen bedding to soften night sweats and temperature swings.",
      "Add magnesium glycinate in the evening to help with the 3am cortisol spike.",
      "Bring in a red light or gentle movement routine to support mood and joints.",
      "Track your cycle changes — irregularity is data, not something to ignore.",
      "Talk to your doctor about symptoms now rather than waiting for them to worsen.",
      "Build one weekly \"radical rest\" block — this stage asks for more recovery, not less."
    ],
    C: [
      "Prioritize a full sleep environment overhaul — cooling sheets, a dark room, a consistent schedule.",
      "Ask your doctor about a comprehensive hormone panel — you deserve real answers, not \"it's just aging.\"",
      "Consider heat therapy (sauna) or red light therapy to support inflammation and recovery.",
      "Build an anti-inflammatory nutrition foundation — whole foods, less processed sugar.",
      "Find a provider who treats this stage as a full transition, not a single symptom to medicate.",
      "Give yourself permission for radical rest — this is a season to receive support, not push through."
    ]
  },
  wisdom: {
    A: [
      "Keep strength training central — it's the single best predictor of vitality in this decade.",
      "Track sleep and recovery trends so you can catch small dips early.",
      "Stay socially engaged — community is as protective as any supplement.",
      "Refine your nutrition toward Mediterranean-style eating if you haven't already.",
      "Keep learning something new — cognitive engagement compounds like physical training does.",
      "Revisit this assessment yearly to keep building on what's working."
    ],
    B: [
      "Add one structural home upgrade this month — an air purifier, a better sleep setup, or similar.",
      "Build gut health support into your daily routine (probiotic, fibre-rich meals).",
      "Bring consistency to movement — even modest, regular strength work beats occasional intense effort.",
      "Reconnect with a sense of purpose — a project, a class, a commitment to look forward to.",
      "Get a full check-up if it's been a while — bone density, cardiovascular, cognitive baseline.",
      "Pick one thing from this list and commit to 30 days before adding the next."
    ],
    C: [
      "Start with recovery, not ambition — sleep, heat therapy, and gentle movement first.",
      "Get a comprehensive health check — bone density, cardiovascular, and hormone-related markers.",
      "Introduce red light or sauna therapy gradually to support cellular repair.",
      "Rebuild strength slowly and consistently — this is a marathon, not a sprint back.",
      "Seek support, not just supplements — a coach, a community, or a provider who takes this stage seriously.",
      "Revisit this assessment in a month; deep rebuilds move in weeks, not days, but they do move."
    ]
  }
};

function goldRule(doc, y, width = 100) {
  const x = (W - width) / 2;
  doc.moveTo(x, y).lineTo(x + width, y).lineWidth(1).strokeColor(GOLD).stroke();
}

function centerText(doc, text, y, opts = {}) {
  doc.font(opts.font || 'Helvetica').fontSize(opts.fontSize || 12).fillColor(opts.color || CHARCOAL);
  doc.text(text, 72, y, { width: W - 144, align: 'center', ...opts.textOpts });
}

function pageHeader(doc, kicker) {
  doc.font('Helvetica').fontSize(9).fillColor(GOLD);
  doc.text(kicker, 72, 52, { width: W - 144, align: 'center', characterSpacing: 1 });
  goldRule(doc, 68, 80);
}

function buildPdf(quiz, resultKey, result) {
  const doc = new PDFDocument({
    size: 'letter',
    margins: { top: 72, bottom: 72, left: 72, right: 72 },
    info: {
      Title: `ELATEVE — ${result.title} Guide`,
      Author: 'ELATEVE',
      Subject: `${quiz.stageLabel} Assessment Results — ${result.title}`,
      Creator: 'ELATEVE — www.elateve.com'
    }
  });

  const outPath = path.join(OUT_DIR, `${quiz.key}-${resultKey.toLowerCase()}.pdf`);
  const stream = fs.createWriteStream(outPath);
  doc.pipe(stream);

  // ============ PAGE 1: COVER ============
  doc.rect(0, 0, W, H).fill(CREAM);
  doc.rect(0, 0, W, 6).fill(GOLD);

  doc.font('Helvetica').fontSize(13).fillColor(GOLD);
  doc.text('ELATEVE', 72, 170, { width: W - 144, align: 'center', characterSpacing: 6 });
  goldRule(doc, 198, 60);

  doc.font('Helvetica').fontSize(11).fillColor(GREY);
  doc.text(`${quiz.stageLabel.toUpperCase()} — ${quiz.stageName.toUpperCase()}`, 72, 232, { width: W - 144, align: 'center', characterSpacing: 1 });

  doc.moveDown(1.5);
  doc.font('Helvetica-Bold').fontSize(32).fillColor(CHARCOAL);
  doc.text(result.title, 72, doc.y + 10, { width: W - 144, align: 'center' });

  goldRule(doc, doc.y + 18, 90);

  doc.moveDown(2.2);
  doc.font('Helvetica-Oblique').fontSize(12).fillColor(CHARCOAL);
  doc.text(result.summary, 72, doc.y, { width: W - 144, align: 'center', lineGap: 4 });

  doc.font('Helvetica').fontSize(10).fillColor(GOLD);
  doc.text('www.elateve.com', 72, H - 90, { width: W - 144, align: 'center', characterSpacing: 2 });
  doc.rect(0, H - 6, W, 6).fill(GOLD);

  // ============ PAGE 2: TIPS & TRICKS ============
  doc.addPage();
  doc.rect(0, 0, W, H).fill('#FFFFFF');
  pageHeader(doc, `${quiz.stageLabel.toUpperCase()} — ${result.title.toUpperCase()}`);

  doc.font('Helvetica-Bold').fontSize(22).fillColor(CHARCOAL);
  doc.text('Your Tips & Tricks', 72, 130, { width: W - 144, align: 'center' });
  goldRule(doc, doc.y + 12, 60);
  doc.moveDown(2);

  const list = tips[quiz.key][resultKey] || [];
  doc.x = 72;
  list.forEach((tip, i) => {
    const y = doc.y;
    doc.font('Helvetica-Bold').fontSize(12).fillColor(GOLD).text(String(i + 1).padStart(2, '0'), 72, y, { continued: true });
    doc.font('Helvetica').fontSize(11.5).fillColor(CHARCOAL).text('   ' + tip, { width: W - 144 - 30, lineGap: 3 });
    doc.moveDown(0.9);
  });

  // ============ PAGE 3: PRODUCT PICKS ============
  doc.addPage();
  doc.rect(0, 0, W, H).fill(CREAM);
  pageHeader(doc, `${quiz.stageLabel.toUpperCase()} — THE ELATEVE PATH FORWARD`);

  doc.font('Helvetica-Bold').fontSize(22).fillColor(CHARCOAL);
  doc.text('Curated For You', 72, 130, { width: W - 144, align: 'center' });
  goldRule(doc, doc.y + 12, 60);
  doc.moveDown(2.5);

  doc.x = 72;
  (result.picks || []).forEach((pick) => {
    const y = doc.y;
    doc.font('Helvetica-Bold').fontSize(13).fillColor(CHARCOAL).text(pick.name, 72, y, { width: W - 144 });
    doc.font('Helvetica-Oblique').fontSize(10.5).fillColor(GREY).text(pick.note, 72, doc.y + 2, { width: W - 144, lineGap: 2 });
    doc.moveDown(1.1);
  });

  doc.moveDown(2);
  centerText(doc, 'Explore the full collection for your stage at', doc.y, { fontSize: 10.5, color: GREY });
  doc.font('Helvetica-Bold').fontSize(11).fillColor(GOLD);
  doc.text('www.elateve.com/shop', 72, doc.y + 4, { width: W - 144, align: 'center', characterSpacing: 1 });

  doc.rect(0, H - 6, W, 6).fill(GOLD);

  doc.end();
  return outPath;
}

let count = 0;
Object.values(quizzes).forEach((quiz) => {
  Object.entries(quiz.results).forEach(([resultKey, result]) => {
    const outPath = buildPdf(quiz, resultKey, result);
    console.log('Generated:', outPath);
    count++;
  });
});
console.log(`\nDone. Generated ${count} PDFs in ${OUT_DIR}`);
