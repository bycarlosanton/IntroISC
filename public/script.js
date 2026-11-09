// Efecto de escritura
const phrases = [
  'Ingeniería en Sistemas Computacionales',
  'Desarrollo de Software',
  'aprendiz constante'
];
const typed = document.getElementById('typed');
let p = 0, c = 0, deleting = false;

function type() {
  const word = phrases[p];
  typed.textContent = word.slice(0, c);
  if (!deleting && c < word.length) c++;
  else if (!deleting) { deleting = true; return setTimeout(type, 1500); }
  else if (c > 0) c--;
  else { deleting = false; p = (p + 1) % phrases.length; }
  setTimeout(type, deleting ? 35 : 70);
}
type();

// Menú móvil
const menu = document.getElementById('menu');
document.getElementById('menuBtn').addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// Nav al hacer scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20));

// Aparición de secciones
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Enlace activo según la sección
const links = [...menu.querySelectorAll('a')];
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

document.getElementById('year').textContent = new Date().getFullYear();
