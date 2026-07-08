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

// ── Tips & Tricks per stage + result ──
const tips = {
  ripple: {
    A: [
      "Keep a simple cycle calendar together — normalize tracking early, without making it clinical.",
      "Introduce fragrance-free, gentle skincare now, before breakouts start.",
      "Protect her sleep window — no screens 30 minutes before bed.",
      "Normalize movement as fun, not fitness — dance, walks, bike rides all count.",
      "Keep the door open with low-pressure check-ins, not one big \"talk.\"",
      "Revisit this assessment every few months — bodies change fast at this age."
    ],
    B: [
      "Swap to a breathable, cool pillowcase if night warmth is new.",
      "Introduce a wind-down tea ritual to signal bedtime.",
      "Address breakouts with gentle, dermatologist-formulated products.",
      "Validate mood swings out loud — hormones can make small things feel huge.",
      "Add a calming diffuser to her room for the harder weeks.",
      "Book a check-in with a provider if symptoms feel bigger than \"normal.\""
    ],
    C: [
      "Prioritize her sleep environment first — cooling sheets, blackout curtains, routine.",
      "Seek a provider experienced with adolescent hormonal health.",
      "Introduce a shared journal so she can express what's hard to say.",
      "Keep skincare minimal and soothing until things stabilize.",
      "Build a weekly low-pressure ritual together to keep connection strong.",
      "Remember: intense doesn't mean permanent."
    ]
  },
  creation: {
    A: [
      "Layer in a daily probiotic now — gut health compounds early.",
      "Protect one non-negotiable stretch of sleep, even 20 minutes, daily.",
      "Build a simple support list before you need it.",
      "Keep movement gentle and consistent rather than ambitious.",
      "Journal weekly — tracking early makes changes easier to spot.",
      "Revisit this assessment each trimester or postpartum month."
    ],
    B: [
      "Say it out loud: \"I need more help than I'm asking for.\"",
      "Add a weighted or pressure-based sleep aid for whatever sleep you get.",
      "Simplify meals — nutrient-dense and easy beats elaborate.",
      "Let one thing go this week. Notice how it feels.",
      "Use scent as a fast nervous-system reset between tasks.",
      "Book one appointment focused only on you."
    ],
    C: [
      "This week, ask for real help — meals, night shifts, anything.",
      "Talk to your provider about postpartum mood support.",
      "Protect sleep like it's medicine, because it is.",
      "Lower the bar on everything non-essential for two weeks.",
      "Keep gut and nutrient support simple and consistent.",
      "Revisit this assessment in two weeks."
    ]
  },
  shift: {
    A: [
      "Start strength training now — bone density work compounds for decades.",
      "Build a cooling sleep setup before you need it.",
      "Get a baseline hormone panel to compare against later.",
      "Introduce adaptogens or magnesium as a gentle foundation.",
      "Keep a monthly symptom log — subtle shifts are easiest to catch early.",
      "Revisit this assessment every few months."
    ],
    B: [
      "Swap to bamboo or linen bedding for night sweats and temperature swings.",
      "Add magnesium glycinate in the evening for the 3am cortisol spike.",
      "Bring in red light or gentle movement to support mood and joints.",
      "Track your cycle changes — irregularity is data, not something to ignore.",
      "Talk to your doctor about symptoms now.",
      "Build one weekly \"radical rest\" block."
    ],
    C: [
      "Prioritize a full sleep environment overhaul.",
      "Ask for a comprehensive hormone panel — demand real answers.",
      "Consider heat therapy or red light therapy for recovery.",
      "Build an anti-inflammatory nutrition foundation.",
      "Find a provider who treats this as a full transition, not one symptom.",
      "Give yourself permission for radical rest."
    ]
  },
  wisdom: {
    A: [
      "Keep strength training central — the best predictor of vitality now.",
      "Track sleep and recovery trends to catch small dips early.",
      "Stay socially engaged — community is as protective as any supplement.",
      "Lean into Mediterranean-style eating if you haven't already.",
      "Keep learning something new — cognitive engagement compounds too.",
      "Revisit this assessment yearly."
    ],
    B: [
      "Add one structural home upgrade this month.",
      "Build gut health support into your daily routine.",
      "Bring consistency to movement over occasional intensity.",
      "Reconnect with a sense of purpose — a project, a class, a goal.",
      "Get a full check-up if it's been a while.",
      "Pick one thing here and commit to 30 days before adding the next."
    ],
    C: [
      "Start with recovery, not ambition — sleep and gentle movement first.",
      "Get a comprehensive health check across key markers.",
      "Introduce red light or sauna therapy gradually.",
      "Rebuild strength slowly and consistently.",
      "Seek support, not just supplements.",
      "Revisit this assessment in a month — rebuilds move in weeks, not days."
    ]
  }
};

// ── Daily mantras per stage + result ──
const mantras = {
  ripple: {
    A: ["My body is learning, not broken.", "I am allowed to feel and grow at the same time.", "Change is happening for me, not to me.", "I trust the process, even when I don't understand it.", "I am becoming exactly who I'm meant to be.", "My feelings are valid, even the big ones."],
    B: ["This feeling is temporary, even when it feels huge.", "I don't have to have it all figured out today.", "It's okay to ask for help when things feel confusing.", "My body is not against me.", "I am growing into myself, one day at a time.", "I deserve patience — especially from myself."],
    C: ["This storm will pass, even when it doesn't feel like it.", "Asking for help is strength, not weakness.", "I am not alone in this.", "My body is working hard right now — I can be gentle with it.", "This hard season does not define the rest of my life.", "I am worthy of support and softness."]
  },
  creation: {
    A: ["I am building something extraordinary, one day at a time.", "My body did something miraculous — I honor that.", "I don't have to earn rest; I simply need it.", "Small, consistent care compounds into real strength.", "I am allowed to prioritize myself while caring for others.", "I trust my body's wisdom in this new chapter."],
    B: ["Needing help does not make me any less capable.", "I am allowed to put myself on today's to-do list.", "Rest is productive, even when it doesn't feel like it.", "I am doing enough, even on the hard days.", "This depletion is a signal, not a life sentence.", "I deserve the care I give so freely to others."],
    C: ["Asking for real help is strength, not surrender.", "I do not have to do this alone.", "My body has been through so much — it deserves patience.", "Rest is the foundation I'm rebuilding on.", "This season is hard, and I am still capable.", "I am allowed to receive care, not just give it."]
  },
  shift: {
    A: ["I am building my foundation before I need it.", "My body is recalibrating, and I'm listening closely.", "Small changes now become big protection later.", "I am proactive about my vitality, not fearful of my age.", "This transition is mine to navigate on my terms.", "I trust the data my body gives me."],
    B: ["This is a shift, not a decline.", "My body is recalibrating — I meet it with patience, not panic.", "I am allowed to rest more in this season.", "I am not \"too sensitive\" — my hormones are simply changing.", "I advocate for myself, especially in the doctor's office.", "This transition transforms me — it doesn't diminish me."],
    C: ["I am not broken. I am transforming.", "My symptoms are real, and I deserve real answers.", "Radical rest is not weakness — it's wisdom.", "I am allowed to demand better care for my body.", "This crucible is forging a stronger version of me.", "I trust that this intensity will not last forever."]
  },
  wisdom: {
    A: ["This is my launchpad, not my plateau.", "I get stronger and sharper the more I invest in myself.", "Curiosity keeps me young — I stay a lifelong learner.", "My vitality is a daily choice, and I choose it.", "I am proof this decade can be a peak, not a decline.", "I am building a life I want to keep living, fully."],
    B: ["Small, consistent changes are rebuilding my vitality.", "I am not behind — I am recalibrating.", "My best years are being built now, not behind me.", "I choose progress over perfection, every day.", "I am investing in myself the way I'd invest in someone I love.", "This chapter is mine to write, starting today."],
    C: ["Rebuilding takes time, and I am patient with myself.", "I am not starting over — I am starting stronger.", "Every small step counts, even when progress feels slow.", "I deserve real support, not just willpower.", "This body has carried me this far — I will care for it now.", "It is never too late to reclaim my vitality."]
  }
};

// ── "In Good Company" / "Did You Know" detail per stage + result ──
// For Ripple (teen), we use an educational fact instead of naming real people.
// For the adult stages, these reference well-documented, public statements
// public figures have made about their own experience with this life stage.
const details = {
  ripple: {
    label: "Did You Know",
    A: "The hormone surges of puberty are preparing your brain for one of its biggest growth spurts since infancy — this is a season of becoming, not just changing.",
    B: "Mood swings during hormonal shifts are usually temporary spikes in emotional sensitivity, not a permanent change in who you are. Most girls feel steadier again within a year or so of their cycle settling.",
    C: "A significant share of teens experience real, disruptive PMS or cycle-related symptoms — it is not \"just in your head,\" and it is worth real medical support."
  },
  creation: {
    label: "In Good Company",
    A: "Serena Williams has spoken openly about how seriously she treated postpartum recovery — physically and mentally — before returning to peak form.",
    B: "Chrissy Teigen has been candid about how depleting early motherhood can be, and how normal it is to feel like you're barely keeping up.",
    C: "Adele has spoken publicly about the toll early motherhood took on her, and how essential real support — not just willpower — was to her recovery."
  },
  shift: {
    label: "In Good Company",
    A: "Naomi Watts began paying close attention to her own hormonal shifts years before her diagnosis, later writing openly about the value of catching early signals.",
    B: "Michelle Obama has spoken publicly about her own hot flashes and sleep disruption, pushing for perimenopause to be discussed far more openly.",
    C: "Halle Berry has become a vocal advocate for menopause research and care, speaking about pushing past being dismissed until she got real answers."
  },
  wisdom: {
    label: "In Good Company",
    A: "Jane Fonda built an entire fitness movement starting in her 40s, and continues to champion strength training well into her eighties.",
    B: "Christie Brinkley has spoken often about strength training and nutrition as the foundation of her vitality well past 60.",
    C: "Helen Mirren has been outspoken about rejecting anti-aging pressure altogether, calling this stage of life liberating rather than diminishing."
  }
};

function goldRule(doc, x, y, width) {
  doc.moveTo(x, y).lineTo(x + width, y).lineWidth(1).strokeColor(GOLD).stroke();
}

function buildPdf(quiz, resultKey, result) {
  const doc = new PDFDocument({
    size: 'letter',
    margins: { top: 40, bottom: 24, left: 50, right: 50 },
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

  const contentW = W - 100; // 50pt margins each side
  const colW = (contentW - 28) / 2;
  const colLeftX = 50;
  const colRightX = 50 + colW + 28;
  const boxPad = 22;
  const list = tips[quiz.key][resultKey] || [];
  const mList = mantras[quiz.key][resultKey] || [];
  const detail = details[quiz.key];

  // ── Pass 1: measure each block's natural height (nothing drawn yet) ──
  const stageLabelText = `${quiz.stageLabel.toUpperCase()} — ${quiz.stageName.toUpperCase()}`;
  doc.font('Helvetica').fontSize(11);
  const logoH = doc.heightOfString('ELATEVE', { width: contentW, align: 'center', characterSpacing: 5 });
  doc.font('Helvetica').fontSize(9);
  const stageLabelH = doc.heightOfString(stageLabelText, { width: contentW, align: 'center', characterSpacing: 1 });
  doc.font('Helvetica-Bold').fontSize(25);
  const titleH = doc.heightOfString(result.title, { width: contentW, align: 'center' });
  doc.font('Helvetica-Oblique').fontSize(10.5);
  const summaryH = doc.heightOfString(result.summary, { width: contentW, lineGap: 2 });
  // Mirrors the exact gaps used in the real drawing pass below (18, 10, 8, 18)
  const headerH = logoH + 18 + stageLabelH + 10 + titleH + 8 + 18 + summaryH;

  doc.font('Helvetica').fontSize(9.5);
  let tipsH = 32;
  list.forEach(t => { tipsH += doc.heightOfString(t, { width: colW - 20, lineGap: 1.5 }) + 13; });
  doc.font('Helvetica-Oblique').fontSize(9.5);
  let mantrasH = 32;
  mList.forEach(m => { mantrasH += doc.heightOfString('“' + m + '”', { width: colW, lineGap: 1.5 }) + 13; });
  const columnsH = Math.max(tipsH, mantrasH);

  doc.font('Helvetica-Bold').fontSize(10);
  const labelH = doc.heightOfString(detail.label.toUpperCase(), { width: contentW - boxPad * 2, characterSpacing: 1 });
  doc.font('Helvetica-Oblique').fontSize(10.5);
  const bodyH = doc.heightOfString(detail[resultKey], { width: contentW - boxPad * 2, lineGap: 2 });
  const boxH = boxPad + labelH + 10 + bodyH + boxPad;

  const footerH = 20;

  // ── Distribute leftover space evenly between the 4 blocks ──
  const usableH = H - 40 - 24; // top/bottom margins
  const fixedH = headerH + columnsH + boxH + footerH;
  const gap = Math.max(28, (usableH - fixedH) / 3);

  // ── Pass 2: draw ──
  doc.rect(0, 0, W, H).fill(CREAM);
  doc.rect(0, 0, W, 5).fill(GOLD);

  doc.font('Helvetica').fontSize(11).fillColor(GOLD);
  doc.text('ELATEVE', 50, 40, { width: contentW, align: 'center', characterSpacing: 5 });

  doc.font('Helvetica').fontSize(9).fillColor(GREY);
  doc.text(`${quiz.stageLabel.toUpperCase()} — ${quiz.stageName.toUpperCase()}`, 50, doc.y + 18, { width: contentW, align: 'center', characterSpacing: 1 });

  doc.font('Helvetica-Bold').fontSize(25).fillColor(CHARCOAL);
  doc.text(result.title, 50, doc.y + 10, { width: contentW, align: 'center' });

  goldRule(doc, (W - 70) / 2, doc.y + 8, 70);

  doc.font('Helvetica-Oblique').fontSize(10.5).fillColor(CHARCOAL);
  doc.text(result.summary, 50, doc.y + 18, { width: contentW, align: 'center', lineGap: 2 });

  // ── Two columns: Tips & Tricks | Daily Mantras ──
  const colTop = doc.y + gap;

  doc.font('Helvetica-Bold').fontSize(11).fillColor(GOLD);
  doc.text('YOUR TIPS & TRICKS', colLeftX, colTop, { width: colW, characterSpacing: 0.5 });
  doc.font('Helvetica-Bold').fontSize(11).fillColor(GOLD);
  doc.text('YOUR DAILY MANTRAS', colRightX, colTop, { width: colW, characterSpacing: 0.5 });

  goldRule(doc, colLeftX, colTop + 18, colW);
  goldRule(doc, colRightX, colTop + 18, colW);

  let y = colTop + 32;
  list.forEach((tip, i) => {
    doc.font('Helvetica-Bold').fontSize(9.5).fillColor(GOLD).text(String(i + 1).padStart(2, '0'), colLeftX, y, { continued: true, width: colW });
    doc.font('Helvetica').fontSize(9.5).fillColor(CHARCOAL).text('  ' + tip, { width: colW, lineGap: 1.5 });
    y = doc.y + 13;
  });
  const tipsEndY = y;

  y = colTop + 32;
  mList.forEach((m) => {
    doc.font('Helvetica-Oblique').fontSize(9.5).fillColor(CHARCOAL).text('“' + m + '”', colRightX, y, { width: colW, align: 'left', lineGap: 1.5 });
    y = doc.y + 13;
  });
  const mantrasEndY = y;

  // ── Detail box ──
  const boxY = Math.max(tipsEndY, mantrasEndY) + gap;

  doc.rect(50, boxY, contentW, boxH).fill('#EFE9DF');
  doc.font('Helvetica-Bold').fontSize(10).fillColor(GOLD);
  doc.text(detail.label.toUpperCase(), 50 + boxPad, boxY + boxPad, { width: contentW - boxPad * 2, characterSpacing: 1 });
  doc.font('Helvetica-Oblique').fontSize(10.5).fillColor(CHARCOAL);
  doc.text(detail[resultKey], 50 + boxPad, boxY + boxPad + labelH + 10, { width: contentW - boxPad * 2, lineGap: 2 });

  // ── Footer ──
  const footerY = boxY + boxH + gap;
  doc.font('Helvetica').fontSize(9).fillColor(GOLD);
  doc.text('WWW.ELATEVE.COM', 50, footerY, { width: contentW, align: 'center', characterSpacing: 1.5, lineBreak: false });
  doc.rect(0, H - 5, W, 5).fill(GOLD);

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
console.log(`\nDone. Generated ${count} single-page PDFs in ${OUT_DIR}`);
