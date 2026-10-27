// Année dans le pied de page
document.getElementById("year").textContent = new Date().getFullYear();

// Barre de progression + ombre de la navigation
const progress = document.getElementById("progress");
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (window.scrollY / max) * 100 + "%";
  nav.classList.toggle("scrolled", window.scrollY > 20);
});

// Menu mobile
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
menu.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => {
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", false);
  })
);

// Lien actif selon la section visible
const links = menu.querySelectorAll("a:not(.btn-nav)");
const sections = [...document.querySelectorAll("main section[id]")];
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(s => spy.observe(s));

// Apparition des blocs, barres de compétences et compteurs
document.querySelectorAll(".section h2, .about, .card, .timeline li, .contact").forEach(el => el.classList.add("reveal"));

function countUp(el) {
  const target = +el.dataset.to;
  let n = 0;
  const step = setInterval(() => {
    el.textContent = ++n;
    if (n >= target) clearInterval(step);
  }, 200);
}

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    el.classList.add("in");
    el.querySelectorAll(".skill").forEach(s => (s.querySelector("i").style.width = s.dataset.level + "%"));
    el.querySelectorAll(".num").forEach(countUp);
    io.unobserve(el);
  });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal, #competences").forEach(el => io.observe(el));

// Filtre des projets
const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".card");
chips.forEach(chip =>
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    cards.forEach(card => {
      const show = chip.dataset.f === "all" || card.dataset.cat === chip.dataset.f;
      card.classList.toggle("hide", !show);
    });
  })
);

// Formulaire de contact (ouvre le client mail)
document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const msg = document.getElementById("msg").value;
  const body = encodeURIComponent(`${msg}\n\n${name} (${email})`);
  window.location.href = `mailto:dorodba2006@gmail.com?subject=Contact portfolio&body=${body}`;
  document.getElementById("note").textContent = "Merci ! Ton application mail va s'ouvrir.";
});