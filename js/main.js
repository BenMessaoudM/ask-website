/* ========= js/main.js =========
   - Mobile nav toggle
   - Year in footer
   - Events (auto-hide past, corrected locations)
   - Language toggle (English <-> Swedish) with flag, switches any element that has data-en / data-sv
   - Re-renders event dates to selected locale
================================= */

// ---------- Mobile nav ----------
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// ---------- Footer year ----------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Events (auto-hide past) ----------
const events = [
  { start: '2025-09-03', title: 'Kick-off',               place: 'Maxine' },
  { start: '2025-09-10', title: 'Gulis Initiation',       place: 'Downtown Helsinki' },
  { start: '2025-09-10', title: 'Gulis Afterparty',       place: 'Noname' },
  { start: '2025-09-18', end: '2025-09-19', title: 'Mölkky (Sport Tutors)', place: 'TBD' },
  { start: '2025-09-23', end: '2025-09-26', title: 'Gulis Sitz', place: 'Cor-house' }
];

const eventsList = document.getElementById('eventsList');
const today = new Date(); today.setHours(0,0,0,0);

// Current language state
let currentLang = 'en';

// Format date by language
const fmtDate = (dStr) => {
  const locale = currentLang === 'sv' ? 'sv' : 'en';
  return new Date(dStr).toLocaleDateString(locale, { year:'numeric', month:'short', day:'numeric' });
};

// Build events HTML
function renderEvents() {
  if (!eventsList) return;

  const upcoming = events
    .filter(ev => {
      const end = new Date(ev.end || ev.start);
      end.setHours(0,0,0,0);
      return end >= today;
    })
    .sort((a,b) => new Date(a.start) - new Date(b.start));

  eventsList.innerHTML = upcoming.map(ev => `
    <div class="event">
      <div class="date">${ev.end ? `${fmtDate(ev.start)} – ${fmtDate(ev.end)}` : fmtDate(ev.start)}</div>
      <div>
        <div style="font-weight:800">${ev.title}</div>
        <div class="section-sub">${ev.place}</div>
      </div>
    </div>
  `).join('');
}

renderEvents();

// ---------- Language toggle ----------
const langBtn = document.getElementById('langToggle');

// Switch all elements that have data-en / data-sv
function switchLang(lang) {
  document.querySelectorAll('[data-en]').forEach(el => {
    const next = el.getAttribute(`data-${lang}`);
    if (next !== null) el.innerHTML = next;
  });

  currentLang = lang;
  if (langBtn) langBtn.textContent = lang === 'en' ? 'Svenska 🇸🇪' : 'English 🇬🇧';

  // Re-render dates in selected locale
  renderEvents();

  // Persist preference
  try { localStorage.setItem('ask-lang', lang); } catch {}
}

// Initial language (restore from storage or default EN)
(function initLang() {
  let saved = null;
  try { saved = localStorage.getItem('ask-lang'); } catch {}
  // If nothing saved, you can auto-detect browser language (optional):
  const auto = (!saved && navigator.language && navigator.language.toLowerCase().startsWith('sv')) ? 'sv' : 'en';
  switchLang(saved || auto || 'en');
})();

langBtn?.addEventListener('click', () => {
  switchLang(currentLang === 'en' ? 'sv' : 'en');
});
