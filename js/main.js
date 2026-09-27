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
