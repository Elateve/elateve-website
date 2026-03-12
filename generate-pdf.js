const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const doc = new PDFDocument({
  size: 'letter',
  margins: { top: 72, bottom: 72, left: 72, right: 72 },
  info: {
    Title: 'The European Spring Refresh Guide',
    Author: 'ELATEVE',
    Subject: 'Spring Refresh Guide',
    Creator: 'ELATEVE — www.elateve.com'
  }
});

const outputPath = path.join(__dirname, 'public', 'downloads', 'elateve-spring-refresh-guide.pdf');
const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

// Brand colors
const GOLD = '#C5973E';
const CREAM = '#F7F5F0';
const CHARCOAL = '#1A1A1A';
const LIGHT_GOLD = '#E8C872';
const DARK_GOLD = '#8B6914';

const W = 612; // letter width
const H = 792; // letter height

// Helper: draw a gold horizontal rule
function goldRule(y, width = 120) {
  const x = (W - width) / 2;
  doc.moveTo(x, y).lineTo(x + width, y).lineWidth(1).strokeColor(GOLD).stroke();
}

// Helper: centered text
function centerText(text, y, options = {}) {
  const fontSize = options.fontSize || 12;
  const color = options.color || CHARCOAL;
  const font = options.font || 'Helvetica';
  doc.font(font).fontSize(fontSize).fillColor(color);
  doc.text(text, 72, y, { width: W - 144, align: 'center' });
}

// Helper: left-aligned body text
function bodyText(text, options = {}) {
  const fontSize = options.fontSize || 11;
  const color = options.color || CHARCOAL;
  const font = options.font || 'Helvetica';
  doc.font(font).fontSize(fontSize).fillColor(color);
  doc.text(text, { width: W - 144, lineGap: 4 });
}

// Helper: bullet point
function bullet(text) {
  doc.font('Helvetica').fontSize(11).fillColor(CHARCOAL);
  const x = doc.x;
  const y = doc.y;
  doc.font('Helvetica').fontSize(11).fillColor(GOLD).text('—', x, y, { continued: true });
  doc.font('Helvetica').fontSize(11).fillColor(CHARCOAL).text('  ' + text, { lineGap: 3 });
  doc.moveDown(0.3);
}

// Helper: checklist item
function checkItem(text) {
  doc.font('Helvetica').fontSize(11.5).fillColor(CHARCOAL);
  const x = 90;
  const y = doc.y;
  // Draw empty checkbox
  doc.rect(x, y + 1, 12, 12).lineWidth(1).strokeColor(GOLD).stroke();
  doc.text(text, x + 22, y, { width: W - 184, lineGap: 3 });
  doc.moveDown(0.5);
}

// Helper: step page header
function stepHeader(stepNum, title) {
  doc.moveDown(1);
  doc.font('Helvetica').fontSize(10).fillColor(GOLD);
  doc.text('ELATEVE SPRING REFRESH GUIDE', 72, 52, { width: W - 144, align: 'center' });
  goldRule(68, 80);

  doc.moveDown(4);
  doc.font('Helvetica').fontSize(13).fillColor(GOLD);
  doc.text(`Step ${stepNum}`, 72, 120, { width: W - 144, align: 'center' });
  doc.moveDown(0.3);
  doc.font('Helvetica-Bold').fontSize(26).fillColor(CHARCOAL);
  doc.text(title, 72, doc.y, { width: W - 144, align: 'center' });
  goldRule(doc.y + 12, 60);
  doc.moveDown(2);
  doc.x = 72;
}

// =============================================
// PAGE 1: COVER
// =============================================
// Cream background
doc.rect(0, 0, W, H).fill(CREAM);

// Gold accent line at top
doc.rect(0, 0, W, 6).fill(GOLD);

// Brand name
doc.font('Helvetica').fontSize(14).fillColor(GOLD);
doc.text('ELATEVE', 72, 180, { width: W - 144, align: 'center', characterSpacing: 6 });

goldRule(210, 60);

// Title
doc.moveDown(3);
doc.font('Helvetica-Bold').fontSize(36).fillColor(CHARCOAL);
doc.text('The European', 72, 260, { width: W - 144, align: 'center' });
doc.text('Spring Refresh', 72, doc.y, { width: W - 144, align: 'center' });
doc.text('Guide', 72, doc.y, { width: W - 144, align: 'center' });

goldRule(doc.y + 20, 100);

// Subtitle
doc.moveDown(2.5);
doc.font('Helvetica').fontSize(13).fillColor(GOLD);
doc.text('By ELATEVE \u2014 Elevate Your Everyday', 72, doc.y, { width: W - 144, align: 'center' });

// Tagline
doc.moveDown(3);
doc.font('Helvetica-Oblique').fontSize(12).fillColor(CHARCOAL);
doc.text('Refresh your home, your look, and your energy', 72, doc.y, { width: W - 144, align: 'center' });
doc.text('\u2014 the European way.', 72, doc.y, { width: W - 144, align: 'center' });

// Website
doc.moveDown(4);
doc.font('Helvetica').fontSize(10).fillColor(GOLD);
doc.text('www.elateve.com', 72, doc.y, { width: W - 144, align: 'center', characterSpacing: 2 });

// Gold accent line at bottom
doc.rect(0, H - 6, W, 6).fill(GOLD);

// =============================================
// PAGE 2: INTRODUCTION
// =============================================
doc.addPage();
doc.rect(0, 0, W, H).fill('#FFFFFF');

// Header
doc.font('Helvetica').fontSize(10).fillColor(GOLD);
doc.text('ELATEVE SPRING REFRESH GUIDE', 72, 52, { width: W - 144, align: 'center' });
goldRule(68, 80);

doc.moveDown(5);
doc.font('Helvetica').fontSize(13).fillColor(GOLD);
doc.text('Introduction', 72, 140, { width: W - 144, align: 'center' });

doc.moveDown(1);
doc.font('Helvetica-Bold').fontSize(28).fillColor(CHARCOAL);
doc.text('Spring Is a Reset', 72, doc.y, { width: W - 144, align: 'center' });

goldRule(doc.y + 15, 60);
doc.moveDown(2.5);

doc.font('Helvetica').fontSize(12).fillColor(CHARCOAL);
doc.text('Spring is not just a season \u2014 it\u2019s a reset.', 72, doc.y, { width: W - 144, align: 'left', lineGap: 6 });
doc.moveDown(0.8);
doc.text('In Europe, the arrival of spring is treated as a ritual. From airing out the home to switching up skincare routines, Europeans approach the season change with intention.', 72, doc.y, { width: W - 144, align: 'left', lineGap: 6 });
doc.moveDown(0.8);
doc.text('This guide walks you through the essential steps to refresh every area of your life before spring arrives.', 72, doc.y, { width: W - 144, align: 'left', lineGap: 6 });

doc.moveDown(2);
goldRule(doc.y, 40);
doc.moveDown(2);

doc.font('Helvetica-Oblique').fontSize(11).fillColor(GOLD);
doc.text('Four steps. One season. A completely elevated you.', 72, doc.y, { width: W - 144, align: 'center' });

doc.moveDown(4);
doc.font('Helvetica').fontSize(9).fillColor(GOLD);
doc.text('What\u2019s Inside:', 72, doc.y, { width: W - 144, align: 'center' });
doc.moveDown(0.8);
doc.font('Helvetica').fontSize(10).fillColor(CHARCOAL);
doc.text('Step 1  \u2014  Refresh Your Space', 72, doc.y, { width: W - 144, align: 'center' });
doc.moveDown(0.4);
doc.text('Step 2  \u2014  Refresh Your Look', 72, doc.y, { width: W - 144, align: 'center' });
doc.moveDown(0.4);
doc.text('Step 3  \u2014  Refresh Your Energy', 72, doc.y, { width: W - 144, align: 'center' });
doc.moveDown(0.4);
doc.text('Step 4  \u2014  Refresh Your Rituals', 72, doc.y, { width: W - 144, align: 'center' });
doc.moveDown(0.4);
doc.text('Your Spring Refresh Checklist', 72, doc.y, { width: W - 144, align: 'center' });

// =============================================
// PAGE 3: STEP 1 — REFRESH YOUR SPACE
// =============================================
doc.addPage();
doc.rect(0, 0, W, H).fill('#FFFFFF');

stepHeader('1', 'Refresh Your Space');

doc.x = 72;
doc.font('Helvetica-Bold').fontSize(13).fillColor(CHARCOAL);
doc.text('Deep Clean with Intention', 72, doc.y);
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(11).fillColor(CHARCOAL);
doc.text('Start with decluttering \u2014 room by room, drawer by drawer. Open every window. Air out every corner. Europeans believe fresh air is the foundation of a clean home. Let the winter stagnation go.', 72, doc.y, { width: W - 144, lineGap: 4 });
doc.moveDown(1);

doc.font('Helvetica-Bold').fontSize(13).fillColor(CHARCOAL);
doc.text('Switch to Lighter Linens', 72, doc.y);
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(11).fillColor(CHARCOAL);
doc.text('Swap heavy duvets for bamboo sheets and organic cotton towels. Lighter fabrics signal the season shift and improve your sleep in warmer weather.', 72, doc.y, { width: W - 144, lineGap: 4 });
doc.moveDown(1);

doc.font('Helvetica-Bold').fontSize(13).fillColor(CHARCOAL);
doc.text('Add Botanicals', 72, doc.y);
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(11).fillColor(CHARCOAL);
doc.text('Cherry blossoms on the dining table. An olive tree in the living room. Fresh herbs on the kitchen windowsill. Bring the outside in \u2014 even faux greenery transforms a space instantly.', 72, doc.y, { width: W - 144, lineGap: 4 });
doc.moveDown(1);

doc.font('Helvetica-Bold').fontSize(13).fillColor(CHARCOAL);
doc.text('Upgrade Your Scent', 72, doc.y);
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(11).fillColor(CHARCOAL);
doc.text('Swap heavy winter candles for lighter spring scents: eucalyptus, sage, peony, and citrus. A new candle is the easiest way to signal a fresh start.', 72, doc.y, { width: W - 144, lineGap: 4 });
doc.moveDown(1);

doc.font('Helvetica-Bold').fontSize(13).fillColor(CHARCOAL);
doc.text('Elevate Your Table', 72, doc.y);
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(11).fillColor(CHARCOAL);
doc.text('Linen napkins, coloured glassware, a marble bowl centrepiece. In Europe, the table is where life happens \u2014 make it beautiful.', 72, doc.y, { width: W - 144, lineGap: 4 });

// =============================================
// PAGE 4: STEP 2 — REFRESH YOUR LOOK
// =============================================
doc.addPage();
doc.rect(0, 0, W, H).fill('#FFFFFF');

stepHeader('2', 'Refresh Your Look');

doc.x = 72;
doc.font('Helvetica-Bold').fontSize(13).fillColor(CHARCOAL);
doc.text('Spring Skincare Reset', 72, doc.y);
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(11).fillColor(CHARCOAL);
doc.text('Switch from heavy winter moisturisers to lighter formulas. Add a brightening serum with Vitamin C or viniferine to tackle dark spots from winter. Your skin needs to breathe again.', 72, doc.y, { width: W - 144, lineGap: 4 });
doc.moveDown(1);

doc.font('Helvetica-Bold').fontSize(13).fillColor(CHARCOAL);
doc.text('Hydrate from the Outside In', 72, doc.y);
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(11).fillColor(CHARCOAL);
doc.text('Invest in a quality hand cream, a nourishing shower oil, and a face mist you love. These small rituals compound into visibly healthier skin. The French pharmacy approach: consistent, quality basics.', 72, doc.y, { width: W - 144, lineGap: 4 });
doc.moveDown(1);

doc.font('Helvetica-Bold').fontSize(13).fillColor(CHARCOAL);
doc.text('Wardrobe Edit', 72, doc.y);
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(11).fillColor(CHARCOAL);
doc.text('Pull everything out. Keep what sparks joy and fits well. Donate the rest. Introduce lighter layers \u2014 a classic Oxford shirt, a quality tote, sunglasses that frame your face beautifully.', 72, doc.y, { width: W - 144, lineGap: 4 });
doc.moveDown(1);

doc.font('Helvetica-Bold').fontSize(13).fillColor(CHARCOAL);
doc.text('The European Approach', 72, doc.y);
doc.moveDown(0.3);
doc.font('Helvetica-Oblique').fontSize(11.5).fillColor(GOLD);
doc.text('Less is more. Invest in timeless staples over fast trends. Europeans don\u2019t chase trends \u2014 they build wardrobes and skincare routines that last.', 72, doc.y, { width: W - 144, lineGap: 4 });

// =============================================
// PAGE 5: STEP 3 — REFRESH YOUR ENERGY
// =============================================
doc.addPage();
doc.rect(0, 0, W, H).fill('#FFFFFF');

stepHeader('3', 'Refresh Your Energy');

doc.x = 72;
doc.font('Helvetica-Bold').fontSize(13).fillColor(CHARCOAL);
doc.text('Prioritise Sleep', 72, doc.y);
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(11).fillColor(CHARCOAL);
doc.text('Invest in a sunrise alarm that wakes you gently. Create a wind-down routine that signals rest. Good sleep is the foundation of every elevated day. Europeans treat rest as non-negotiable, not a luxury.', 72, doc.y, { width: W - 144, lineGap: 4 });
doc.moveDown(1);

doc.font('Helvetica-Bold').fontSize(13).fillColor(CHARCOAL);
doc.text('Move Your Body', 72, doc.y);
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(11).fillColor(CHARCOAL);
doc.text('Find a practice you love \u2014 not one you endure. Walk in nature, try Pilates, dance in your kitchen. The point is joy, not punishment. Movement should feel like celebration.', 72, doc.y, { width: W - 144, lineGap: 4 });
doc.moveDown(1);

doc.font('Helvetica-Bold').fontSize(13).fillColor(CHARCOAL);
doc.text('Digital Declutter', 72, doc.y);
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(11).fillColor(CHARCOAL);
doc.text('Unsubscribe from emails that drain you. Unfollow accounts that make you feel less than. Simplify your digital life the way you\u2019d simplify a room \u2014 keep only what adds value.', 72, doc.y, { width: W - 144, lineGap: 4 });
doc.moveDown(1);

doc.font('Helvetica-Bold').fontSize(13).fillColor(CHARCOAL);
doc.text('Set Spring Intentions', 72, doc.y);
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(11).fillColor(CHARCOAL);
doc.text('Write down 3 things you want this season to bring. Not resolutions \u2014 intentions. How do you want to feel? What do you want to create? What energy do you want to carry?', 72, doc.y, { width: W - 144, lineGap: 4 });

// =============================================
// PAGE 6: STEP 4 — REFRESH YOUR RITUALS
// =============================================
doc.addPage();
doc.rect(0, 0, W, H).fill('#FFFFFF');

stepHeader('4', 'Refresh Your Rituals');

doc.x = 72;
doc.font('Helvetica-Bold').fontSize(13).fillColor(CHARCOAL);
doc.text('Morning Ritual', 72, doc.y);
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(11).fillColor(CHARCOAL);
doc.text('Light first \u2014 open the curtains before you touch your phone. Then movement \u2014 even five minutes of stretching. Then nourishment \u2014 a proper breakfast, eaten slowly. This is how Europeans start the day.', 72, doc.y, { width: W - 144, lineGap: 4 });
doc.moveDown(1);

doc.font('Helvetica-Bold').fontSize(13).fillColor(CHARCOAL);
doc.text('Evening Ritual', 72, doc.y);
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(11).fillColor(CHARCOAL);
doc.text('Wind down with intention. A proper skincare routine. A candle lit. A moment of gratitude \u2014 written or simply felt. The day deserves a beautiful ending.', 72, doc.y, { width: W - 144, lineGap: 4 });
doc.moveDown(1);

doc.font('Helvetica-Bold').fontSize(13).fillColor(CHARCOAL);
doc.text('Weekly Ritual', 72, doc.y);
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(11).fillColor(CHARCOAL);
doc.text('Plan one elevated experience per week. A home-cooked meal with good wine and real plates. A long walk through somewhere beautiful. A book read cover to cover. Quality over quantity, always.', 72, doc.y, { width: W - 144, lineGap: 4 });
doc.moveDown(1.5);

goldRule(doc.y, 60);
doc.moveDown(1.5);

doc.font('Helvetica-Bold').fontSize(14).fillColor(GOLD);
doc.text('The European Secret', 72, doc.y, { width: W - 144, align: 'center' });
doc.moveDown(0.8);
doc.font('Helvetica-Oblique').fontSize(13).fillColor(CHARCOAL);
doc.text('Slow down to speed up.', 72, doc.y, { width: W - 144, align: 'center' });
doc.moveDown(0.5);
doc.font('Helvetica').fontSize(11).fillColor(CHARCOAL);
doc.text('When you invest time in rituals that nourish you, everything else flows with more ease, clarity, and intention. This is the European way.', 72, doc.y, { width: W - 144, align: 'center', lineGap: 4 });

// =============================================
// PAGE 7: CHECKLIST
// =============================================
doc.addPage();
doc.rect(0, 0, W, H).fill(CREAM);

doc.font('Helvetica').fontSize(10).fillColor(GOLD);
doc.text('ELATEVE SPRING REFRESH GUIDE', 72, 52, { width: W - 144, align: 'center' });
goldRule(68, 80);

doc.moveDown(4);
doc.font('Helvetica').fontSize(13).fillColor(GOLD);
doc.text('Your Checklist', 72, 130, { width: W - 144, align: 'center' });
doc.moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(28).fillColor(CHARCOAL);
doc.text('Spring Refresh\nChecklist', 72, doc.y, { width: W - 144, align: 'center' });

goldRule(doc.y + 15, 60);
doc.moveDown(3);

doc.x = 72;
doc.y = doc.y;

checkItem('Deep clean and declutter your space');
checkItem('Switch to lighter bedding and towels');
checkItem('Add fresh botanicals or faux greenery');
checkItem('Update your candle collection for spring');
checkItem('Reset your skincare routine');
checkItem('Hydrate \u2014 inside and out');
checkItem('Do a wardrobe edit');
checkItem('Set 3 spring intentions');
checkItem('Create a morning and evening ritual');
checkItem('Plan one elevated experience per week');

doc.moveDown(2);
goldRule(doc.y, 40);
doc.moveDown(1.5);

doc.font('Helvetica-Oblique').fontSize(10.5).fillColor(GOLD);
doc.text('Print this page. Stick it on your fridge. Check them off one by one.', 72, doc.y, { width: W - 144, align: 'center' });

// =============================================
// PAGE 8: CLOSING
// =============================================
doc.addPage();
doc.rect(0, 0, W, H).fill('#FFFFFF');
doc.rect(0, 0, W, 6).fill(GOLD);
doc.rect(0, H - 6, W, 6).fill(GOLD);

doc.font('Helvetica').fontSize(14).fillColor(GOLD);
doc.text('ELATEVE', 72, 220, { width: W - 144, align: 'center', characterSpacing: 6 });

goldRule(250, 60);

doc.moveDown(3);
doc.font('Helvetica-Bold').fontSize(26).fillColor(CHARCOAL);
doc.text('Ready to Elevate\nYour Spring?', 72, 290, { width: W - 144, align: 'center' });

doc.moveDown(2);
doc.font('Helvetica').fontSize(12).fillColor(CHARCOAL);
doc.text('Visit www.elateve.com for curated picks across Wellness, Home, and Wealth.', 72, doc.y, { width: W - 144, align: 'center', lineGap: 5 });

doc.moveDown(0.5);
doc.text('Follow us for weekly inspiration.', 72, doc.y, { width: W - 144, align: 'center' });

doc.moveDown(4);
goldRule(doc.y, 40);

doc.moveDown(3);
doc.font('Helvetica').fontSize(10).fillColor(GOLD);
doc.text('www.elateve.com', 72, doc.y, { width: W - 144, align: 'center', characterSpacing: 2 });

doc.moveDown(6);
doc.font('Helvetica').fontSize(8.5).fillColor('#999999');
doc.text('\u00A9 2026 ELATEVE. All rights reserved.', 72, doc.y, { width: W - 144, align: 'center' });
doc.moveDown(0.3);
doc.text('Affiliate Disclosure: ELATEVE participates in affiliate marketing programs.', 72, doc.y, { width: W - 144, align: 'center' });
doc.text('When you purchase through our links, we may earn a small commission at no extra cost to you.', 72, doc.y, { width: W - 144, align: 'center' });

// Finalize
doc.end();

stream.on('finish', () => {
  console.log('PDF generated successfully at:', outputPath);
});
