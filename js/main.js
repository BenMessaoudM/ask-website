'use strict';
document.documentElement.classList.add('js');
const toggle = document.getElementById('navToggle');
const navigation = document.getElementById('navigation');
function closeMenu() {
  navigation.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}
toggle.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    toggle.focus();
  }
});
// Keep visitors in the same section when changing language.
document.querySelectorAll('a[hreflang]').forEach(link => {
  link.addEventListener('click', () => {
    link.hash = window.location.hash;
  });
});
document.getElementById('year').textContent = new Date().getFullYear();

// Refresh on load, on tab return and across midnight without a reload.
function renderEvents() {
  const list = document.getElementById('eventsList');
  if (!list || !globalThis.ASKCalendar) return;
  const sv = document.documentElement.lang === 'sv';
  const events = ASKCalendar.upcoming();
  const signature = JSON.stringify(events);
  if (list.dataset.signature === signature) return;
  list.dataset.signature = signature;
  const format = iso => new Intl.DateTimeFormat(sv ? 'sv-SE' : 'en-GB', {
    day:'numeric',month:'short',year:'numeric',timeZone:'UTC'
  }).format(new Date(`${iso}T12:00:00Z`));
  list.replaceChildren();
  if (!events.length) {
    const empty = document.createElement('p');
    empty.textContent = sv ? 'Nya evenemang publiceras snart.' : 'New events will be announced soon.';
    list.append(empty);
  }
  for (const event of events) {
    const row = document.createElement('article');
    row.className = 'event-row';
    const date = document.createElement(event.start ? 'time' : 'span');
    date.className = 'event-date';
    if (event.start) {
      date.dateTime = event.start;
      date.textContent = event.end ? `${format(event.start)} – ${format(event.end)}` : format(event.start);
    } else date.textContent = sv ? 'Datum meddelas senare' : 'Date to be announced';
    const details = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = sv ? event.sv : event.en;
    details.append(title);
    if (event.venue) {
      const venue = document.createElement('p');
      venue.textContent = event.venue;
      details.append(venue);
    }
    row.append(date, details);
    list.append(row);
  }
}
renderEvents();
setInterval(renderEvents, 30000);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) renderEvents();
});
