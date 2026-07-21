/* ========================================
   ELATEVE — Stage Assessment Quiz Popup
   Self-select a life stage, answer 7 questions,
   unlock a tailored result behind an email gate.
   ======================================== */

let quizData = null;
let quizState = { stage: null, index: 0, answers: [] };

async function fetchQuizzes() {
  if (quizData) return quizData;
  const res = await fetch('/api/quizzes');
  quizData = await res.json();
  return quizData;
}

function initQuizPopup() {
  if (document.getElementById('quizOverlay')) return;
  const overlay = document.createElement('div');
  overlay.id = 'quizOverlay';
  overlay.className = 'popup-overlay';
  overlay.innerHTML = `
    <div class="popup popup--quiz">
      <button class="popup-close" id="quizClose">&times;</button>
      <div id="quizBody"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeQuizPopup();
  });
  document.getElementById('quizClose').addEventListener('click', closeQuizPopup);
}

function closeQuizPopup() {
  document.getElementById('quizOverlay')?.classList.remove('active');
}

async function openQuizPopup(stageKey = null) {
  initQuizPopup();
  await fetchQuizzes();
  document.getElementById('quizOverlay').classList.add('active');
  if (stageKey && quizData[stageKey]) {
    startStage(stageKey);
  } else {
    renderStageSelect();
  }
  sessionStorage.setItem('elateve_quiz_shown', '1');
}

function renderStageSelect() {
  const body = document.getElementById('quizBody');
  const stages = Object.values(quizData);
  body.innerHTML = `
    <span class="popup-eyebrow">ELATEVE Assessment</span>
    <h2 class="popup-title">Which Stage Are You In?</h2>
    <p class="popup-text">A 2-minute check-in on your body, mind, and home &mdash; tailored to exactly where you are right now.</p>
    <div class="quiz-stage-grid">
      ${stages.map(s => `
        <button class="quiz-stage-card" data-stage="${s.key}">
          <span class="quiz-stage-name">${s.stageLabel}</span>
          <span class="quiz-stage-sub">${s.stageName}</span>
          <span class="quiz-stage-desc">${s.cardDesc}</span>
        </button>
      `).join('')}
    </div>
  `;
  body.querySelectorAll('.quiz-stage-card').forEach(btn => {
    btn.addEventListener('click', () => startStage(btn.dataset.stage));
  });
}

function startStage(stageKey) {
  quizState = { stage: stageKey, index: 0, answers: [] };
  renderQuestion();
}

function renderQuestion() {
  const quiz = quizData[quizState.stage];
  const q = quiz.questions[quizState.index];
  const body = document.getElementById('quizBody');
  const progress = Math.round((quizState.index / quiz.questions.length) * 100);

  body.innerHTML = `
    <span class="popup-eyebrow">${quiz.stageLabel} &mdash; ${quiz.stageName}</span>
    <div class="quiz-progress"><div class="quiz-progress-bar" style="width:${progress}%"></div></div>
    <p class="quiz-question-count">Question ${quizState.index + 1} of ${quiz.questions.length}</p>
    <h2 class="popup-title quiz-question-title">${q.prompt}</h2>
    <div class="quiz-options">
      ${q.options.map(opt => `
        <button class="quiz-option" data-key="${opt.key}">${opt.text}</button>
      `).join('')}
    </div>
    ${quizState.index === 0 ? `<p class="quiz-intro">${quiz.intro}</p>` : ''}
  `;
  body.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => selectAnswer(btn.dataset.key));
  });
}

function selectAnswer(key) {
  const quiz = quizData[quizState.stage];
  quizState.answers.push(key);
  if (quizState.index < quiz.questions.length - 1) {
    quizState.index++;
    renderQuestion();
  } else {
    renderEmailGate();
  }
}

function computeResultKey() {
  const counts = { A: 0, B: 0, C: 0 };
  quizState.answers.forEach(k => counts[k]++);
  return Object.keys(counts).reduce((a, b) => counts[b] > counts[a] ? b : a);
}

function renderEmailGate() {
  const quiz = quizData[quizState.stage];
  const body = document.getElementById('quizBody');
  body.innerHTML = `
    <span class="popup-eyebrow">${quiz.stageLabel}</span>
    <h2 class="popup-title">Your Results Are Ready</h2>
    <p class="popup-text">Enter your email to unlock your personalized archetype and tailored product picks.</p>
    <form class="quiz-email-form" id="quizEmailForm">
      <input type="email" name="email" placeholder="Your email" required>
      <button type="submit" class="btn btn--gold">Unlock My Results</button>
    </form>
    <p class="quiz-fineprint">We'll only use this to send your results and occasional ELATEVE wellness content. Unsubscribe anytime.</p>
  `;
  document.getElementById('quizEmailForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const resultKey = computeResultKey();
    const result = quiz.results[resultKey];
    try {
      await fetch('/api/quiz-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, stage: quizState.stage, resultKey, resultTitle: result.title })
      });
    } catch (err) { /* still show result */ }
    renderResult(resultKey);
  });
}

function renderResult(resultKey) {
  const quiz = quizData[quizState.stage];
  const result = quiz.results[resultKey];
  const pdfUrl = `/downloads/quiz-guides/${quizState.stage}-${resultKey.toLowerCase()}.pdf`;
  const body = document.getElementById('quizBody');
  body.innerHTML = `
    <span class="popup-eyebrow">${quiz.stageLabel} &mdash; Your Archetype</span>
    <h2 class="popup-title">${result.title}</h2>
    <p class="popup-text">${result.summary}</p>
    <div class="quiz-picks">
      <p class="quiz-picks-label">The ELATEVE Path Forward</p>
      ${result.picks.map(p => `
        <div class="quiz-pick">
          <span class="quiz-pick-name">${p.name}</span>
          <span class="quiz-pick-note">${p.note}</span>
        </div>
      `).join('')}
    </div>
    <a href="${pdfUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--gold" id="quizPdfBtn">Download Your Free Guide (PDF) &darr;</a>
    <!-- SHOP HIDDEN FOR NOW: <a href="/shop" class="btn btn--outline" data-page="shop" id="quizShopBtn">Shop Your Picks &rarr;</a> -->
  `;
}

function initQuizTriggers() {
  ['heroQuizBtn', 'navQuizBtn', 'footerQuizBtn', 'quizTeaserBtn', 'aboutQuizBtn'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', (e) => {
      e.preventDefault();
      openQuizPopup();
    });
  });

  // Auto-open once per session
  if (!sessionStorage.getItem('elateve_quiz_shown')) {
    setTimeout(() => {
      if (!sessionStorage.getItem('elateve_quiz_shown')) openQuizPopup();
    }, 15000);
  }
}

document.addEventListener('DOMContentLoaded', initQuizTriggers);
