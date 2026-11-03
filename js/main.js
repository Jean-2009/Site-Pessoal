// Menu no celular
const btn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
btn.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  btn.setAttribute('aria-expanded', aberto);
});
menu.addEventListener('click', e => {
  if (e.target.tagName === 'A') { menu.classList.remove('aberto'); btn.setAttribute('aria-expanded', false); }
});

// Destaca no menu a seção que está na tela
const links = [...menu.querySelectorAll('a')];
const observador = new IntersectionObserver(entradas => {
  entradas.forEach(en => {
    if (en.isIntersecting) {
      links.forEach(a => a.classList.toggle('ativo', a.getAttribute('href') === '#' + en.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => observador.observe(s));

// Sapo pula entre as vitórias-régias
const sapo = document.getElementById('sapo-pulador');
const balao = document.getElementById('balao');
const paradas = [{ x: 0, y: 0 }, { x: -95, y: 62 }, { x: 120, y: 98 }];
const falas = ['ribbit!', 'plof!', 'croac!', 'quá!'];
const semMovimento = matchMedia('(prefers-reduced-motion: reduce)').matches;
let atual = 0;

function pular() {
  const de = paradas[atual];
  atual = (atual + 1) % paradas.length;
  const para = paradas[atual];
  balao.textContent = falas[Math.floor(Math.random() * falas.length)];
  const final = `translate(${para.x}px, ${para.y}px)`;
  if (semMovimento) { sapo.style.transform = final; return; }
  sapo.animate([
    { transform: `translate(${de.x}px, ${de.y}px)` },
    { transform: `translate(${(de.x + para.x) / 2}px, ${Math.min(de.y, para.y) - 55}px)` },
    { transform: final }
  ], { duration: 550, easing: 'ease-in-out', fill: 'forwards' });
}
sapo.addEventListener('click', pular);
sapo.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pular(); } });

// Banner ampliado
const modal = document.getElementById('modal');
document.querySelector('.abrir-banner').addEventListener('click', () => modal.showModal());
modal.querySelector('.fechar').addEventListener('click', () => modal.close());
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });

// Copiar e-mail
document.querySelectorAll('.copiar').forEach(b => b.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(b.dataset.copiar); b.textContent = 'Copiado!'; }
  catch { b.textContent = 'Selecione e copie'; }
  setTimeout(() => (b.textContent = 'Copiar'), 2000);
}));
