import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'journals');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

/* ── Design Tokens ────────────────────────────────────────────────── */
const COLORS = {
  bg: '#FAF7F4',
  bgAlt: '#F3EDE7',
  text: '#3D3530',
  textMuted: '#8A7E76',
  accent: '#C4A08A',
  accentLight: '#E8D5C8',
  accentDark: '#A67C65',
  line: '#D4C5B9',
  white: '#FFFFFF',
  cream: '#FDF9F5',
};

/* ── Shared CSS ───────────────────────────────────────────────────── */
const BASE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

@page { size: A4; margin: 0; }

body {
  font-family: 'DM Sans', sans-serif;
  color: ${COLORS.text};
  background: ${COLORS.bg};
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.page {
  width: 210mm;
  height: 297mm;
  padding: 28mm 26mm;
  position: relative;
  overflow: hidden;
  page-break-after: always;
  background: ${COLORS.bg};
}
.page:last-child { page-break-after: avoid; }

/* ── Typography ─────────────────── */
.serif { font-family: 'Playfair Display', serif; }
.sans { font-family: 'DM Sans', sans-serif; }

h1 { font-family: 'Playfair Display', serif; font-weight: 400; line-height: 1.2; }
h2 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: 22px; margin-bottom: 20px; color: ${COLORS.text}; }
h3 { font-family: 'Playfair Display', serif; font-weight: 500; font-size: 15px; margin-bottom: 8px; color: ${COLORS.text}; }

p, li { font-size: 11.5px; line-height: 1.85; color: ${COLORS.text}; font-weight: 300; }

/* ── Decorative ─────────────────── */
.divider {
  width: 50px; height: 1px;
  background: ${COLORS.accent};
  margin: 20px 0;
}
.divider-center {
  width: 50px; height: 1px;
  background: ${COLORS.accent};
  margin: 20px auto;
}
.ornament {
  text-align: center;
  color: ${COLORS.accent};
  font-size: 18px;
  letter-spacing: 12px;
  margin: 16px 0;
}

/* ── Quote Blocks ───────────────── */
.quote {
  border-left: 2px solid ${COLORS.accentLight};
  padding: 10px 0 10px 18px;
  margin: 14px 0;
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 12px;
  line-height: 1.8;
  color: ${COLORS.textMuted};
}

/* ── Writing Lines ──────────────── */
.writing-lines {
  margin: 12px 0 18px 0;
}
.writing-line {
  border-bottom: 1px solid ${COLORS.line};
  height: 32px;
  width: 100%;
}
.writing-line-short {
  border-bottom: 1px solid ${COLORS.line};
  height: 28px;
  width: 100%;
}

/* ── Reflection Box ────────────────── */
.prompt {
  margin: 18px 0;
}
.prompt-number {
  font-family: 'Playfair Display', serif;
  font-size: 11px;
  color: ${COLORS.accent};
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 6px;
}
.prompt-title {
  font-family: 'Playfair Display', serif;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}
.prompt-desc {
  font-size: 10.5px;
  font-style: italic;
  color: ${COLORS.textMuted};
  margin-bottom: 8px;
  font-weight: 300;
}

/* ── Fill-in blanks ─────────────── */
.fill-in {
  font-size: 11.5px;
  line-height: 2.4;
  font-weight: 300;
}
.blank {
  display: inline-block;
  border-bottom: 1px solid ${COLORS.line};
  min-width: 200px;
  margin: 0 4px;
}

/* ── Gratitude ──────────────────── */
.gratitude-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 12px 0;
}
.gratitude-num {
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  color: ${COLORS.accentLight};
  width: 24px;
  flex-shrink: 0;
}
.gratitude-line {
  flex: 1;
  border-bottom: 1px solid ${COLORS.line};
  height: 24px;
}

/* ── Section Label ──────────────── */
.section-label {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 4px;
  color: ${COLORS.accent};
  margin-bottom: 22px;
}

/* ── Footer ─────────────────────── */
.page-footer {
  position: absolute;
  bottom: 18mm;
  left: 26mm;
  right: 26mm;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 8px;
  color: ${COLORS.textMuted};
  letter-spacing: 2px;
  text-transform: uppercase;
}

/* ── Cover specific ─────────────── */
.cover {
  background: linear-gradient(170deg, ${COLORS.cream} 0%, ${COLORS.bgAlt} 50%, ${COLORS.accentLight}22 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40mm 30mm;
}
.cover-brand {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 6px;
  color: ${COLORS.accent};
  margin-bottom: 40px;
}
.cover-series {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  font-weight: 400;
  color: ${COLORS.textMuted};
  letter-spacing: 3px;
  margin-bottom: 8px;
}
.cover-title {
  font-family: 'Playfair Display', serif;
  font-size: 52px;
  font-weight: 400;
  line-height: 1.15;
  margin-bottom: 12px;
  color: ${COLORS.text};
}
.cover-month {
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  font-style: italic;
  font-weight: 400;
  color: ${COLORS.accentDark};
  margin-bottom: 30px;
}
.cover-subtitle {
  font-size: 11px;
  color: ${COLORS.textMuted};
  font-weight: 300;
  letter-spacing: 1px;
  max-width: 320px;
  line-height: 1.8;
}
.cover-year {
  font-size: 10px;
  color: ${COLORS.textMuted};
  letter-spacing: 4px;
  margin-top: 50px;
}
.cover-corner-tl, .cover-corner-br {
  position: absolute;
  width: 80px;
  height: 80px;
  border: 1px solid ${COLORS.accentLight};
}
.cover-corner-tl { top: 20mm; left: 20mm; border-right: none; border-bottom: none; }
.cover-corner-br { bottom: 20mm; right: 20mm; border-left: none; border-top: none; }

/* ── Closing page ───────────────── */
.closing {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(170deg, ${COLORS.cream} 0%, ${COLORS.bgAlt} 100%);
}
.closing-quote {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 20px;
  line-height: 1.7;
  color: ${COLORS.textMuted};
  max-width: 380px;
  margin-bottom: 24px;
}
.closing-source {
  font-size: 9px;
  color: ${COLORS.accent};
  letter-spacing: 3px;
  text-transform: uppercase;
}
.closing-brand {
  margin-top: 60px;
  font-family: 'Playfair Display', serif;
  font-size: 14px;
  color: ${COLORS.textMuted};
  letter-spacing: 2px;
}
.closing-social {
  margin-top: 10px;
  font-size: 9px;
  color: ${COLORS.accent};
  letter-spacing: 2px;
}
`;

/* ── Helper: generate writing lines ─────────────────────────────── */
function lines(n) {
  return Array(n).fill('<div class="writing-line"></div>').join('');
}
function linesShort(n) {
  return Array(n).fill('<div class="writing-line-short"></div>').join('');
}

/* ── Helper: reflection block ────────────────────────────────────── */
function prompt(num, title, desc, lineCount = 3) {
  return `
    <div class="prompt">
      <div class="prompt-number">Reflection ${num}</div>
      <div class="prompt-title">${title}</div>
      <div class="prompt-desc">${desc}</div>
      <div class="writing-lines">${linesShort(lineCount)}</div>
    </div>`;
}

/* ── Helper: cover page ──────────────────────────────────────────── */
function coverPage(month, year = '2026') {
  return `
    <div class="page cover">
      <div class="cover-corner-tl"></div>
      <div class="cover-corner-br"></div>
      <div class="cover-brand">Miss Joo Writes</div>
      <div class="cover-series">Notes on Becoming</div>
      <div class="ornament">✦ &nbsp; ✦ &nbsp; ✦</div>
      <div class="cover-month">${month}</div>
      <div class="divider-center"></div>
      <div class="cover-subtitle">A gentle reflection journal for anyone learning to move slower and trust what's unfolding.</div>
      <div class="cover-year">${year}</div>
    </div>`;
}

/* ── Helper: closing page ────────────────────────────────────────── */
function closingPage(quote, month) {
  return `
    <div class="page closing">
      <div class="cover-corner-tl"></div>
      <div class="cover-corner-br"></div>
      <div class="ornament">✦</div>
      <div class="closing-quote">"${quote}"</div>
      <div class="closing-source">— Notes on Becoming, ${month}</div>
      <div style="margin-top: 80px;">
        <div class="closing-brand">Miss Joo Writes</div>
        <div class="closing-social">missjoowrites.com &nbsp;·&nbsp; @missjooo98</div>
      </div>
    </div>`;
}

/* ── Helper: letter page ─────────────────────────────────────────── */
function letterPage(month, body) {
  return `
    <div class="page">
      <div class="section-label">Monthly Letter</div>
      <h2 style="font-style: italic; font-size: 28px; margin-bottom: 8px;">Dear one,</h2>
      <div class="divider"></div>
      <div style="margin-top: 20px;">
        ${body.map(p => `<p style="margin-bottom: 12px;">${p}</p>`).join('')}
      </div>
      <div style="margin-top: 28px;">
        <p style="font-style: italic; color: ${COLORS.textMuted};">With love,</p>
        <p style="font-family: 'Playfair Display', serif; font-size: 16px; margin-top: 6px; color: ${COLORS.accentDark};">Miss Joo</p>
      </div>
      <div class="page-footer">
        <span>Notes on Becoming</span>
        <span>${month} 2026</span>
      </div>
    </div>`;
}

/* ── Helper: recap page ──────────────────────────────────────────── */
function recapPage(month, posts, quotes) {
  return `
    <div class="page">
      <div class="section-label">This Month's Reflections</div>
      <h2>Blog Recap & Highlights</h2>
      <div style="margin-bottom: 24px;">
        ${posts.map((p, i) => `<p style="margin-bottom: 6px; font-size: 11px;"><span style="color: ${COLORS.accent}; font-family: 'Playfair Display', serif;">${i + 1}.</span> &nbsp;${p}</p>`).join('')}
      </div>
      <div class="divider"></div>
      <h3 style="margin-top: 20px; font-size: 13px; color: ${COLORS.textMuted}; letter-spacing: 2px; text-transform: uppercase; font-family: 'DM Sans', sans-serif;">Quotes to sit with</h3>
      ${quotes.map(q => `<div class="quote">${q}</div>`).join('')}
      <div class="page-footer">
        <span>Notes on Becoming</span>
        <span>${month} 2026</span>
      </div>
    </div>`;
}

/* ── Helper: gratitude page ──────────────────────────────────────── */
function gratitudePage(month, specialPrompt, intentionLabel) {
  return `
    <div class="page">
      <div class="section-label">Gratitude & Intentions</div>
      <h2>What I'm Grateful For</h2>
      <p style="font-style: italic; color: ${COLORS.textMuted}; margin-bottom: 20px; font-size: 11px;">Three things from this month that I want to hold onto.</p>
      <div class="gratitude-item"><div class="gratitude-num">1</div><div class="gratitude-line"></div></div>
      <div class="writing-lines">${linesShort(2)}</div>
      <div class="gratitude-item"><div class="gratitude-num">2</div><div class="gratitude-line"></div></div>
      <div class="writing-lines">${linesShort(2)}</div>
      <div class="gratitude-item"><div class="gratitude-num">3</div><div class="gratitude-line"></div></div>
      <div class="writing-lines">${linesShort(2)}</div>
      <div class="divider" style="margin: 24px 0;"></div>
      <h3 style="font-size: 14px;">${specialPrompt}</h3>
      <div class="writing-lines">${linesShort(3)}</div>
      <div class="divider" style="margin: 20px 0;"></div>
      <h3 style="font-size: 14px;">${intentionLabel}</h3>
      <div class="writing-lines">${linesShort(4)}</div>
      <div class="page-footer">
        <span>Notes on Becoming</span>
        <span>${month} 2026</span>
      </div>
    </div>`;
}


/* ════════════════════════════════════════════════════════════════════
   JOURNAL DATA — January to May
   ════════════════════════════════════════════════════════════════════ */

const journals = [
  /* ── JANUARY ────────────────────────────────────────────────────── */
  {
    month: 'January',
    slug: 'january',
    letter: [
      "January didn't arrive the way I expected. I thought a new year would bring clarity.. a sense of direction, maybe even a fresh start I could feel in my bones. Instead, it brought stillness. The kind that makes you uncomfortable because there's nowhere to hide.",
      "But maybe that's exactly what I needed.",
      "This month taught me that not everything needs to come with me into a new year. Some habits, some guilt, some versions of myself.. they did their job. They taught me what I needed to learn. And now they can stay where they belong.",
      "This journal is an invitation to sit with that same stillness. To look honestly at what you're carrying and ask yourself.. does this still belong here?",
      "You don't need answers yet. You just need honesty.",
    ],
    posts: [
      '<strong>What I\'m leaving behind without guilt</strong> — January 8',
      '<strong>This version of me feels unfamiliar, and that\'s okay</strong> — January 13',
      '<strong>I\'m learning to choose myself without explaining</strong> — January 20',
      '<strong>January taught me to slow down</strong> — January 27',
    ],
    quotes: [
      'Some things were never meant to be carried into a new year. They did their job. They taught me.',
      'Growth doesn\'t always feel empowering. Sometimes it feels quiet. Sometimes it feels lonely.',
      'Choosing myself doesn\'t have to be loud or defensive. It doesn\'t need a speech.',
      'Maybe growth doesn\'t need pressure. Maybe becoming doesn\'t need a deadline.',
    ],
    prompts_page1: (month) => `
      ${prompt(1, 'Leaving behind', 'What are 3 things you\'re choosing to leave behind this year.. without explaining why?', 4)}
      ${prompt(2, 'The unfamiliar self', 'Is there a version of you emerging that feels unfamiliar? What does she do differently?', 4)}
      ${prompt(3, 'Choosing yourself', 'Where in your life have you been waiting for permission to choose yourself? What would it look like to stop waiting?', 4)}
    `,
    prompts_page2: (month) => `
      ${prompt(4, 'Stillness check-in', 'When was the last time you sat in complete silence with yourself? What came up?', 4)}
      <div class="prompt" style="margin-top: 24px;">
        <div class="prompt-number">Reflection 5</div>
        <div class="prompt-title">Fill in the blanks</div>
        <div style="margin-top: 14px;">
          <div class="fill-in">I used to believe <span class="blank"></span>.</div>
          <div class="fill-in">Now I'm learning <span class="blank"></span>.</div>
          <div class="fill-in">This year, I'm giving myself permission to <span class="blank"></span>.</div>
        </div>
      </div>
    `,
    activity: (month) => `
      <div class="section-label">Creative Activity</div>
      <h2>A Letter to Last Year</h2>
      <p style="font-style: italic; color: ${COLORS.textMuted}; margin-bottom: 6px; font-size: 11px;">Write a short letter to 2025. Thank it for what it taught you. Tell it what you're leaving behind. Tell it what you're taking with you.</p>
      <div class="divider"></div>
      <p style="font-family: 'Playfair Display', serif; font-style: italic; font-size: 16px; margin: 20px 0 14px 0; color: ${COLORS.accentDark};">Dear 2025,</p>
      <div class="writing-lines">${lines(16)}</div>
    `,
    gratitudeSpecial: 'One feeling I want to carry into February:',
    intentionLabel: 'My intention for next month:',
    closingQuote: 'Not moving was sometimes the most honest thing I could do.',
  },

  /* ── FEBRUARY ───────────────────────────────────────────────────── */
  {
    month: 'February',
    slug: 'february',
    letter: [
      "February was the month I started listening to myself again.",
      "Not to the noise. Not to the overthinking. Not to the voice that constantly asked.. \"are you sure?\" But to the quieter one underneath. The one that already knows.",
      "I spent so long looking outward for confirmation.. for reassurance, for signs that I was doing the right thing. But this month, I started turning inward. And what I found wasn't emptiness. It was steadiness.",
      "This journal is for anyone learning to trust their own voice again. To stop forcing what doesn't flow. To notice what feels light and what feels heavy.. and to finally honor the difference.",
      "You already know more than you think you do.",
    ],
    posts: [
      '<strong>I\'m learning to trust myself again</strong> — February 4',
      '<strong>I\'m becoming more selective with my energy</strong> — February 12',
      '<strong>I feel calmer in ways I can\'t fully explain</strong> — February 19',
      '<strong>I no longer force what doesn\'t flow</strong> — February 24',
    ],
    quotes: [
      'Trusting myself doesn\'t mean I never feel unsure. It means I pause before doubting myself.',
      'There\'s a difference between being available and being aligned.',
      'There\'s a quiet confidence growing. The kind that doesn\'t need to be announced.',
      'What is meant for me will not require me to abandon myself first.',
    ],
    prompts_page1: (month) => `
      ${prompt(1, 'Body check-in', 'Close your eyes for 30 seconds. What does your body feel right now? Where are you holding tension? Write what you notice.', 4)}
      ${prompt(2, 'Energy audit', 'List the 5 people or activities you spend the most energy on. Next to each, honestly note whether it feels LIGHT or HEAVY.', 5)}
      ${prompt(3, 'Trust inventory', 'When was the last time you trusted your gut and were right? Describe what happened.', 4)}
    `,
    prompts_page2: (month) => `
      ${prompt(4, 'What are you forcing?', 'Is there something in your life right now that you\'re trying to make work.. but it doesn\'t flow naturally? Be honest.', 5)}
      <div class="prompt" style="margin-top: 24px;">
        <div class="prompt-number">Reflection 5</div>
        <div class="prompt-title">Fill in the blanks</div>
        <div style="margin-top: 14px;">
          <div class="fill-in">I feel most like myself when <span class="blank"></span>.</div>
          <div class="fill-in">I feel least like myself when <span class="blank"></span>.</div>
          <div class="fill-in">The quiet voice inside me is saying <span class="blank"></span>.</div>
        </div>
      </div>
    `,
    activity: (month) => `
      <div class="section-label">Creative Activity</div>
      <h2>The Energy Map</h2>
      <p style="font-style: italic; color: ${COLORS.textMuted}; margin-bottom: 6px; font-size: 11px;">Draw a simple circle in the center below — that's you. Around it, write the names of people, places, habits, and commitments in your life. Place them CLOSE if they give you energy, FAR if they drain it. No judgment. Just honesty.</p>
      <div class="divider"></div>
      <div style="height: 360px; border: 1px dashed ${COLORS.line}; border-radius: 4px; margin-top: 16px; display: flex; align-items: center; justify-content: center;">
        <div style="width: 80px; height: 80px; border-radius: 50%; border: 2px solid ${COLORS.accentLight}; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-style: italic; color: ${COLORS.textMuted}; font-size: 12px;">me</div>
      </div>
    `,
    gratitudeSpecial: 'Something I stopped forcing this month:',
    intentionLabel: 'My intention for March:',
    closingQuote: 'Flow feels lighter. Flow feels mutual. Flow feels calm. And I\'m choosing that now.',
  },

  /* ── MARCH ──────────────────────────────────────────────────────── */
  {
    month: 'March',
    slug: 'march',
    letter: [
      "March arrived before I was ready for it.",
      "The season changed, the light shifted, and suddenly the world was asking me to bloom when I was still processing winter. But I'm learning that growth doesn't wait for readiness. It just needs willingness.",
      "This month, I noticed changes in myself I couldn't name. Quiet shifts. The kind that don't make for good stories but reshape everything from the inside out. I also started paying attention to the people around me.. noticing who stays without being asked and who only shows up when it's convenient.",
      "This journal is for the in-between moments. The ones where you're not quite who you were, but not yet who you're becoming. Trust the middle.",
    ],
    posts: [
      '<strong>Some shifts don\'t need to be announced</strong> — March 3',
      '<strong>I\'m starting to feel at home in my own company</strong> — March 10',
      '<strong>Spring came before I felt ready</strong> — March 17',
      '<strong>The people who stay don\'t need convincing</strong> — March 24',
      '<strong>I stopped waiting for the right moment</strong> — March 31',
    ],
    quotes: [
      'The most meaningful shifts are the ones that happen between you and yourself. No audience required.',
      'Loneliness is the ache of disconnection. Solitude is the comfort of reconnection.. with yourself.',
      'The right people don\'t need convincing. They see you.. even in your quiet seasons.. and they stay anyway.',
      'I\'d rather be someone who tried before she was ready than someone who waited until the moment had already passed.',
    ],
    prompts_page1: (month) => `
      ${prompt(1, 'The quiet shift', 'What has changed in you recently that no one else has noticed? Describe it.', 4)}
      ${prompt(2, 'Your own company', 'How do you feel when you\'re alone? Has that feeling changed? Write about your relationship with solitude.', 4)}
      ${prompt(3, 'Who stays?', 'Think of someone who stays without being asked. What makes that relationship different?', 4)}
    `,
    prompts_page2: (month) => `
      ${prompt(4, 'Ready or not', 'What\'s something you\'ve been waiting to feel "ready" for? What would it look like to begin anyway?', 5)}
      <div class="prompt" style="margin-top: 24px;">
        <div class="prompt-number">Reflection 5</div>
        <div class="prompt-title">Fill in the blanks</div>
        <div style="margin-top: 14px;">
          <div class="fill-in">I'm not the same person who started this year. The biggest change is <span class="blank"></span>.</div>
          <div class="fill-in">Home feels like <span class="blank"></span>.</div>
          <div class="fill-in">I stopped waiting for <span class="blank"></span> and started <span class="blank"></span>.</div>
        </div>
      </div>
    `,
    activity: (month) => `
      <div class="section-label">Creative Activity</div>
      <h2>A Letter to Someone Who Stayed</h2>
      <p style="font-style: italic; color: ${COLORS.textMuted}; margin-bottom: 6px; font-size: 11px;">Write a short letter to someone who has stayed in your life without needing to be convinced. You don't have to send it. Just let them know what their presence means.</p>
      <div class="divider"></div>
      <p style="font-family: 'Playfair Display', serif; font-style: italic; font-size: 16px; margin: 20px 0 14px 0; color: ${COLORS.accentDark};">Dear <span style="border-bottom: 1px solid ${COLORS.line}; min-width: 140px; display: inline-block;">&nbsp;</span>,</p>
      <div class="writing-lines">${lines(15)}</div>
    `,
    gratitudeSpecial: 'A quiet shift I want to honor:',
    intentionLabel: 'My intention for April:',
    closingQuote: 'Maybe growth doesn\'t need you to be ready. Maybe it just needs you to not resist it.',
  },

  /* ── APRIL ──────────────────────────────────────────────────────── */
  {
    month: 'April',
    slug: 'april',
    letter: [
      "April taught me something I didn't expect.. that joy can feel uncomfortable when you're not used to it.",
      "I caught myself smiling and immediately questioned it. I enjoyed a slow afternoon and felt guilty for not being productive. I let someone be kind to me and almost deflected it out of habit.",
      "But this month, I practiced allowing. Allowing myself to feel good without earning it. Allowing softness without calling it weakness. Allowing an ordinary day to be enough.",
      "This journal is for anyone who's been so focused on healing that they forgot to enjoy the life they're building. You're allowed to feel light. You're allowed to rest. You're allowed to be soft and still be strong.",
    ],
    posts: [
      '<strong>Allowing myself to enjoy things without guilt</strong> — April 7',
      '<strong>Softness is not weakness</strong> — April 14',
      '<strong>A quiet Monday that felt like healing</strong> — April 21',
      '<strong>I\'m no longer the version they remember</strong> — April 28',
    ],
    quotes: [
      'Joy doesn\'t need to be earned. It\'s not a reward for suffering long enough.',
      'I want to be soft and steady. Gentle and grounded. Open and still safe.',
      'Healing looks like sometimes.. just a regular day where you realize you\'re not carrying as much as you used to.',
      'I\'d rather be misunderstood and aligned than familiar and empty.',
    ],
    prompts_page1: (month) => `
      <div class="prompt">
        <div class="prompt-number">Reflection 1</div>
        <div class="prompt-title">Joy inventory</div>
        <div class="prompt-desc">List 5 small things that brought you joy this month. Don't filter.. even the tiny ones count.</div>
        ${[1,2,3,4,5].map(n => `<div style="display: flex; gap: 10px; align-items: center; margin: 8px 0;"><span style="color: ${COLORS.accentLight}; font-family: 'Playfair Display', serif; font-size: 14px;">${n}.</span><div style="flex: 1; border-bottom: 1px solid ${COLORS.line}; height: 24px;"></div></div>`).join('')}
      </div>
      ${prompt(2, 'The guilt check', 'When was the last time you felt guilty for enjoying something? What were you doing? Why did guilt show up?', 4)}
    `,
    prompts_page2: (month) => `
      ${prompt(3, 'Softness reflection', 'Where in your life are you performing hardness when you\'d rather be soft? What would it look like to let that go?', 4)}
      ${prompt(4, 'An ordinary day', 'Describe a recent ordinary day that felt quietly beautiful. What made it special?', 4)}
      <div class="prompt" style="margin-top: 16px;">
        <div class="prompt-number">Reflection 5</div>
        <div class="prompt-title">Fill in the blanks</div>
        <div style="margin-top: 14px;">
          <div class="fill-in">I deserve <span class="blank"></span> even without earning it.</div>
          <div class="fill-in">Softness for me looks like <span class="blank"></span>.</div>
          <div class="fill-in">The old version of me would have <span class="blank"></span>. This version of me <span class="blank"></span>.</div>
        </div>
      </div>
    `,
    activity: (month) => `
      <div class="section-label">Creative Activity</div>
      <h2>Permission Slips</h2>
      <p style="font-style: italic; color: ${COLORS.textMuted}; margin-bottom: 6px; font-size: 11px;">Write yourself 5 permission slips. Things you're officially allowing yourself to do, feel, or be — without guilt.</p>
      <div class="divider"></div>
      <p style="font-family: 'Playfair Display', serif; font-style: italic; font-size: 14px; margin: 20px 0 16px 0; color: ${COLORS.text};">I give myself permission to:</p>
      ${[1,2,3,4,5].map(n => `<div style="display: flex; gap: 10px; align-items: center; margin: 14px 0;"><span style="color: ${COLORS.accentLight}; font-family: 'Playfair Display', serif; font-size: 18px;">${n}.</span><div style="flex: 1; border-bottom: 1px solid ${COLORS.line}; height: 28px;"></div></div>`).join('')}
      <div style="margin-top: 40px; display: flex; gap: 30px;">
        <div style="flex: 1;"><span style="font-size: 10px; color: ${COLORS.textMuted}; text-transform: uppercase; letter-spacing: 2px;">Signed</span><div style="border-bottom: 1px solid ${COLORS.line}; height: 28px; margin-top: 6px;"></div></div>
        <div style="width: 140px;"><span style="font-size: 10px; color: ${COLORS.textMuted}; text-transform: uppercase; letter-spacing: 2px;">Date</span><div style="border-bottom: 1px solid ${COLORS.line}; height: 28px; margin-top: 6px;"></div></div>
      </div>
    `,
    gratitudeSpecial: 'One moment of joy I want to remember:',
    intentionLabel: 'My intention for May:',
    closingQuote: 'Maybe that\'s enough. Maybe that\'s everything.',
  },

  /* ── MAY ────────────────────────────────────────────────────────── */
  {
    month: 'May',
    slug: 'may',
    letter: [
      "May felt like arriving somewhere I'd been walking toward for a long time.. without realizing I was already there.",
      "This month wasn't about breakthroughs. It was about looking back and realizing how far I've come. The version of me who started this year.. she was still shrinking. Still proving. Still waiting for permission.",
      "But this version? She's here. Taking up space. Not loudly, but honestly.",
      "This journal is for anyone who's done the quiet work of becoming and is finally starting to feel it. You don't need to prove you've changed. You don't need applause. You just need to keep going.",
      "The hardest part is behind you. Trust that.",
    ],
    posts: [
      '<strong>What peace actually looks like for me</strong> — May 5',
      '<strong>I don\'t need to prove I\'ve changed</strong> — May 12',
      '<strong>Gratitude for the version of me who kept going</strong> — May 19',
      '<strong>This is the season I stopped shrinking</strong> — May 26',
    ],
    quotes: [
      'Peace isn\'t something I\'ve arrived at. It\'s something I practice. Daily. Imperfectly. Intentionally.',
      'Growth doesn\'t need a stage. It doesn\'t need applause.',
      'She survived every single thing that tried to break her. And I\'m here because of her.',
      'This isn\'t arrogance. It\'s arrival.',
    ],
    prompts_page1: (month) => `
      ${prompt(1, 'Your definition of peace', 'Forget the dictionary. What does peace actually look like in YOUR daily life? Describe a peaceful day.', 4)}
      ${prompt(2, 'Unseen growth', 'What\'s something you\'ve grown through that no one else will ever fully understand? Write it here.. just for you.', 4)}
      ${prompt(3, 'Thank-you note', 'Write a few lines to a past version of yourself. The one who got through the hardest season. What would you tell her?', 4)}
    `,
    prompts_page2: (month) => `
      ${prompt(4, 'Taking up space', 'Where in your life have you been shrinking? What would it look like to take up the full space you deserve?', 5)}
      <div class="prompt" style="margin-top: 24px;">
        <div class="prompt-number">Reflection 5</div>
        <div class="prompt-title">Fill in the blanks</div>
        <div style="margin-top: 14px;">
          <div class="fill-in">Peace for me is not <span class="blank"></span>. Peace for me is <span class="blank"></span>.</div>
          <div class="fill-in">I no longer need to prove <span class="blank"></span>.</div>
          <div class="fill-in">The version of me who kept going deserves to hear <span class="blank"></span>.</div>
        </div>
      </div>
    `,
    activity: (month) => `
      <div class="section-label">Creative Activity</div>
      <h2>Before & After</h2>
      <p style="font-style: italic; color: ${COLORS.textMuted}; margin-bottom: 6px; font-size: 11px;">On the left, write words that describe who you were at the start of this year. On the right, write words that describe who you are now. No full sentences. Just words. Just honesty.</p>
      <div class="divider"></div>
      <div style="display: flex; gap: 24px; margin-top: 20px; height: 300px;">
        <div style="flex: 1; border: 1px solid ${COLORS.line}; padding: 20px;">
          <div style="text-align: center; font-size: 10px; text-transform: uppercase; letter-spacing: 3px; color: ${COLORS.accent}; margin-bottom: 16px;">Start of the Year</div>
          ${linesShort(9)}
        </div>
        <div style="flex: 1; border: 1px solid ${COLORS.line}; padding: 20px;">
          <div style="text-align: center; font-size: 10px; text-transform: uppercase; letter-spacing: 3px; color: ${COLORS.accent}; margin-bottom: 16px;">Now</div>
          ${linesShort(9)}
        </div>
      </div>
      <div style="margin-top: 20px;">
        <p style="font-family: 'Playfair Display', serif; font-style: italic; font-size: 13px; color: ${COLORS.textMuted}; margin-bottom: 8px;">What do you notice?</p>
        <div class="writing-lines">${linesShort(3)}</div>
      </div>
    `,
    gratitudeSpecial: 'A version of myself I want to honor:',
    intentionLabel: 'My intention for June:',
    closingQuote: 'I think this is the version of me I was always becoming.. the one who stops shrinking and starts living.',
  },
];


/* ════════════════════════════════════════════════════════════════════
   BUILD HTML → PDF
   ════════════════════════════════════════════════════════════════════ */

async function generatePDF(journal) {
  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>${BASE_CSS}</style></head><body>

${coverPage(journal.month)}

${letterPage(journal.month, journal.letter)}

${recapPage(journal.month, journal.posts, journal.quotes)}

<!-- Prompts Page 1 -->
<div class="page">
  <div class="section-label">Guided Reflections</div>
  <h2>Reflections for This Month</h2>
  ${journal.prompts_page1(journal.month)}
  <div class="page-footer">
    <span>Notes on Becoming</span>
    <span>${journal.month} 2026</span>
  </div>
</div>

<!-- Prompts Page 2 -->
<div class="page">
  <div class="section-label">Guided Reflections</div>
  ${journal.prompts_page2(journal.month)}
  <div class="page-footer">
    <span>Notes on Becoming</span>
    <span>${journal.month} 2026</span>
  </div>
</div>

<!-- Activity Page -->
<div class="page">
  ${journal.activity(journal.month)}
  <div class="page-footer">
    <span>Notes on Becoming</span>
    <span>${journal.month} 2026</span>
  </div>
</div>

${gratitudePage(journal.month, journal.gratitudeSpecial, journal.intentionLabel)}

${closingPage(journal.closingQuote, journal.month)}

</body></html>`;

  const outPath = path.join(OUTPUT_DIR, `notes-on-becoming-${journal.slug}.pdf`);
  
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await browser.close();

  console.log(`✅ Created: ${outPath}`);
}

/* ── Main ─────────────────────────────────────────────────────────── */
async function main() {
  console.log('🖨️  Generating Notes on Becoming journals...\n');
  for (const journal of journals) {
    await generatePDF(journal);
  }
  console.log('\n✨ All journals generated successfully!');
}

main().catch(console.error);
