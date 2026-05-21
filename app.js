// coding-teacher — Old School playground
// Pure HTML/CSS/JS. No build step. Open index.html in a browser.

const STARTERS = {
  html: [
    {
      name: "Hello, world",
      code:
`<!doctype html>
<html>
  <body>
    <h1>Hello, world</h1>
    <p>This is your first web page.</p>
  </body>
</html>`,
    },
    {
      name: "Your name in big letters",
      code:
`<!doctype html>
<html>
  <body>
    <h1>Your Name Here</h1>
    <p>Change the text above to your own name, then watch the preview.</p>
  </body>
</html>`,
    },
    {
      name: "A list of things you like",
      code:
`<!doctype html>
<html>
  <body>
    <h2>Things I like</h2>
    <ul>
      <li>Tea in the morning</li>
      <li>Long walks</li>
      <li>A good book</li>
    </ul>
  </body>
</html>`,
    },
  ],

  css: [
    {
      name: "Colour the heading",
      code:
`/* CSS controls how things look.
   The HTML below already has an <h1>. Style it. */

h1 {
  color: tomato;
  font-family: system-ui, sans-serif;
}`,
    },
    {
      name: "Round the corners",
      code:
`/* Make the box softer by rounding its corners. */

.card {
  background: #fde68a;
  padding: 20px;
  border-radius: 16px;
  width: 220px;
}`,
    },
    {
      name: "Center a box",
      code:
`/* Centre the card inside its parent using flexbox. */

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  background: #f5f7fb;
}

.card {
  background: white;
  padding: 24px 32px;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0,0,0,0.08);
}`,
    },
  ],

  js: [
    {
      name: "Change the heading",
      code:
`// JavaScript can change things on the page.
// The HTML below has an <h1 id="title">. Change its text.

const title = document.getElementById("title");
title.textContent = "Changed by JavaScript!";`,
    },
    {
      name: "Count clicks on a button",
      code:
`// Each time the button is clicked, the number goes up.

let count = 0;
const button = document.getElementById("btn");
const display = document.getElementById("count");

button.addEventListener("click", () => {
  count = count + 1;
  display.textContent = count;
});`,
    },
    {
      name: "Show today's date",
      code:
`// Put today's date onto the page.

const now = new Date();
const text = now.toDateString();
document.getElementById("out").textContent = text;`,
    },
  ],
};

// HTML scaffolds the iframe uses when the learner is editing CSS or JS only.
// This way, CSS/JS mode shows a meaningful result without making the learner
// also write the surrounding HTML.
const SCAFFOLDS = {
  css:
`<!doctype html>
<html>
  <head><style>__CODE__</style></head>
  <body>
    <h1>Hello</h1>
    <div class="card">I am a card. Style me.</div>
  </body>
</html>`,
  js:
`<!doctype html>
<html>
  <body>
    <h1 id="title">Original heading</h1>
    <button id="btn">Click me</button>
    <p>Clicks: <span id="count">0</span></p>
    <p id="out"></p>
    <script>__CODE__<\/script>
  </body>
</html>`,
};

const FILENAMES = {
  html: "index.html",
  css: "styles.css",
  js: "script.js",
};

// ---- Challenges -----------------------------------------------------------
// Three per language. Each has a check() that runs against the state object
// posted up by the reporter. Keep them satisfiable using only what the
// learner can write in the current scaffold (see SCAFFOLDS above).

function parseRgb(s) {
  const m = (s || "").match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  return m ? [+m[1], +m[2], +m[3]] : null;
}
const isReddish  = s => { const c = parseRgb(s); return !!c && c[0] > 150 && c[1] < 110 && c[2] < 110; };
const isBluish   = s => { const c = parseRgb(s); return !!c && c[2] > 150 && c[0] < 130 && c[1] < 180; };
const isYellowish = s => { const c = parseRgb(s); return !!c && c[0] > 200 && c[1] > 180 && c[2] < 140; };

const CHALLENGES = {
  html: [
    {
      id: "html-1",
      text: 'Write an <code>&lt;h1&gt;</code> that says exactly <strong>Hello</strong> (nothing else).',
      check: s => s.h1Text === "Hello",
    },
    {
      id: "html-2",
      text: 'Add a list (<code>&lt;ul&gt;</code>) with exactly <strong>three</strong> items (<code>&lt;li&gt;</code>).',
      check: s => s.liCount === 3,
    },
    {
      id: "html-3",
      text: 'Add a link to <code>https://example.com</code> with the text <strong>Example</strong>.',
      check: s => !!s.exampleLink && s.exampleLink.text === "Example",
    },
  ],
  css: [
    {
      id: "css-1",
      text: 'Make the <code>&lt;h1&gt;</code> red.',
      check: s => isReddish(s.h1Color),
    },
    {
      id: "css-2",
      text: 'Give the <code>.card</code> rounded corners (any non-zero <code>border-radius</code>).',
      check: s => !!s.cardRadius && s.cardRadius !== "0px",
    },
    {
      id: "css-3",
      text: 'Make the <code>.card</code> background yellow.',
      check: s => isYellowish(s.cardBg),
    },
  ],
  js: [
    {
      id: "js-1",
      text: 'Use JavaScript to change the heading text to exactly <strong>Hello</strong>.',
      check: s => s.titleText === "Hello",
    },
    {
      id: "js-2",
      text: 'Use JavaScript to make the heading text colour <strong>blue</strong> (e.g. <code>title.style.color = "blue"</code>).',
      check: s => isBluish(s.titleColor),
    },
    {
      id: "js-3",
      // Year is computed at challenge-check time so this stays correct
      // across calendar years without any code change.
      text: `Use JavaScript to put the current year (<code>${new Date().getFullYear()}</code>) into the <code>#out</code> element.`,
      check: s => (s.outText || "").includes(String(new Date().getFullYear())),
    },
  ],
};

// ---- State ----------------------------------------------------------------

const state = {
  lang: "html",
  buffers: { html: "", css: "", js: "" },
  active: { html: 0, css: 0, js: 0 },
  lastReport: null,
};

const STORAGE_KEY = "coding-teacher:v2";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { challengesDone: [] };
  } catch {
    return { challengesDone: [] };
  }
}

function saveProgress(progress) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }
  catch { /* storage might be disabled — fine, no persistence */ }
}

let progress = loadProgress();

// ---- Elements -------------------------------------------------------------

const editor = document.getElementById("editor");
const preview = document.getElementById("preview");
const starter = document.getElementById("starter");
const editorLabel = document.getElementById("editor-label");
const langButtons = document.querySelectorAll(".lang");
const challengeStatus = document.getElementById("challenge-status");
const challengeText = document.getElementById("challenge-text");
const challengeCounter = document.getElementById("challenge-counter");
const challengeDots = document.getElementById("challenge-dots");

// ---- Rendering ------------------------------------------------------------

// Reporter posts a snapshot of the rendered page back to the parent — once
// on load, and again shortly after to catch JS-driven mutations. The iframe
// is sandboxed without allow-same-origin, so postMessage is the only way
// for the parent to observe its state.
const REPORTER = `<script>
(function () {
  function gather() {
    var $ = function (sel) { return document.querySelector(sel); };
    var all = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };
    var h1 = $("h1");
    var card = $(".card");
    var exampleA = all("a").filter(function (a) {
      return a.getAttribute("href") === "https://example.com";
    })[0];
    var title = $("#title");
    var out = $("#out");
    var cs = function (el) { return el ? getComputedStyle(el) : null; };
    var h1Style = cs(h1);
    var cardStyle = cs(card);
    var titleStyle = cs(title);
    return {
      type: "ct:state",
      h1Text: h1 ? h1.textContent.trim() : null,
      liCount: all("li").length,
      exampleLink: exampleA ? { href: exampleA.getAttribute("href"), text: exampleA.textContent.trim() } : null,
      h1Color: h1Style ? h1Style.color : null,
      cardRadius: cardStyle ? cardStyle.borderTopLeftRadius : null,
      cardBg: cardStyle ? cardStyle.backgroundColor : null,
      titleText: title ? title.textContent.trim() : null,
      titleColor: titleStyle ? titleStyle.color : null,
      outText: out ? out.textContent.trim() : null,
    };
  }
  function report() {
    try { parent.postMessage(gather(), "*"); } catch (e) {}
  }
  window.addEventListener("load", report);
  setTimeout(report, 300);
})();
<\/script>`;

function buildDoc(lang, code) {
  // For CSS / JS, inject into the scaffold. Use a function replacer so the
  // learner's code is not interpreted as a regex replacement pattern (e.g. $&).
  const base = lang === "html" ? code : SCAFFOLDS[lang].replace("__CODE__", () => code);
  // Append the reporter just before </body> if we can; otherwise tack it on.
  if (/<\/body>/i.test(base)) return base.replace(/<\/body>/i, REPORTER + "</body>");
  return base + REPORTER;
}

let renderTimer = null;
function scheduleRender() {
  clearTimeout(renderTimer);
  renderTimer = setTimeout(render, 200);
}

function render() {
  const doc = buildDoc(state.lang, state.buffers[state.lang]);
  preview.srcdoc = doc;
  // The reporter inside `doc` will postMessage back; see message listener below.
}

// ---- Language switching ---------------------------------------------------

function setLanguage(lang) {
  // remember the current buffer before swapping
  state.buffers[state.lang] = editor.value;
  state.lang = lang;
  editor.value = state.buffers[lang];
  editorLabel.textContent = FILENAMES[lang];

  langButtons.forEach(b => {
    b.setAttribute("aria-pressed", b.dataset.lang === lang ? "true" : "false");
  });

  populateStarters();
  renderChallengeUI();
  render();
}

function populateStarters() {
  starter.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "— choose one —";
  starter.appendChild(placeholder);

  STARTERS[state.lang].forEach((s, i) => {
    const opt = document.createElement("option");
    opt.value = String(i);
    opt.textContent = s.name;
    starter.appendChild(opt);
  });
}

// ---- Challenges -----------------------------------------------------------
// The chip and dots reflect the *current* preview state — they flip back if
// the learner edits past the goal. The persisted "challengesDone" list is
// "ever completed", which is what level-unlocking will read later.

function activeChallenge() {
  return CHALLENGES[state.lang][state.active[state.lang]];
}

function renderChallengeUI() {
  const list = CHALLENGES[state.lang];
  const idx = state.active[state.lang];
  const ch = list[idx];

  challengeText.innerHTML = ch.text;
  challengeCounter.textContent = `${idx + 1} / ${list.length}`;

  // Rebuild dots
  challengeDots.innerHTML = "";
  list.forEach((c, i) => {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.type = "button";
    dot.dataset.i = String(i);
    dot.textContent = String(i + 1);
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-selected", i === idx ? "true" : "false");
    dot.setAttribute("aria-label", `Challenge ${i + 1}`);
    if (progress.challengesDone.includes(c.id)) dot.classList.add("done");
    dot.addEventListener("click", () => {
      state.active[state.lang] = i;
      renderChallengeUI();
      evaluateChallenge(); // re-check against last report immediately
    });
    challengeDots.appendChild(dot);
  });

  evaluateChallenge();
}

function setChallengeChip(done) {
  if (done) {
    challengeStatus.textContent = "done ✓";
    challengeStatus.classList.add("done");
  } else {
    challengeStatus.textContent = "not yet";
    challengeStatus.classList.remove("done");
  }
}

function evaluateChallenge() {
  const s = state.lastReport;
  if (!s) { setChallengeChip(false); return; }
  const ch = activeChallenge();
  let done = false;
  try { done = !!ch.check(s); } catch { done = false; }
  setChallengeChip(done);
  if (done && !progress.challengesDone.includes(ch.id)) {
    progress.challengesDone.push(ch.id);
    saveProgress(progress);
    // refresh dot styling to show the new ✓ state
    const dot = challengeDots.querySelector(`[data-i="${state.active[state.lang]}"]`);
    if (dot) dot.classList.add("done");
  }
}

window.addEventListener("message", (event) => {
  if (event.source !== preview.contentWindow) return;
  const data = event.data;
  if (!data || data.type !== "ct:state") return;
  state.lastReport = data;
  evaluateChallenge();
});

// ---- Wire-up --------------------------------------------------------------

editor.addEventListener("input", () => {
  state.buffers[state.lang] = editor.value;
  scheduleRender();
});

langButtons.forEach(b => {
  b.addEventListener("click", () => setLanguage(b.dataset.lang));
});

starter.addEventListener("change", () => {
  const idx = starter.value;
  if (idx === "") return;
  const snippet = STARTERS[state.lang][Number(idx)];
  editor.value = snippet.code;
  state.buffers[state.lang] = snippet.code;
  render();
});

// Levels are visible but only Old School is interactive in v1.
document.querySelectorAll(".level").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.disabled) return;
    document.querySelectorAll(".level").forEach(b =>
      b.setAttribute("aria-pressed", b === btn ? "true" : "false"));
  });
});

// ---- Boot -----------------------------------------------------------------

setLanguage("html");
editor.value = STARTERS.html[0].code;
state.buffers.html = editor.value;
render();
