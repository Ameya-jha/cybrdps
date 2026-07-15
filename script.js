/* ============================================================
   WarP X CybR — Intra'26
   ============================================================ */

/* ---- Documents shown in the Documents section.
   To add a new document:
     1. Drop the file into the /documents folder in this repo.
     2. Add an entry below with a title, the file path, and a type label.
     3. Commit + push to GitHub — the card appears automatically.
   ---------------------------------------------------------- */
const documents = [
  {
    title: "WarP Intra'26 Brochure",
    file: "documents/WarP_Intra_26_Brochure.pdf",
    type: "PDF"
  }
  // Example — once you add the poster file to /documents:
  // {
  //   title: "WarP X CybR Intra'26 Poster",
  //   file: "documents/poster.png",
  //   type: "IMAGE"
  // }
];

function renderDocuments(){
  const grid = document.getElementById('docGrid');
  if(!grid) return;

  if(documents.length === 0){
    grid.innerHTML = '<p class="doc-empty">No documents uploaded yet.</p>';
    return;
  }

  grid.innerHTML = documents.map(doc => `
    <article class="doc-card">
      <div class="doc-card-top">
        <span class="doc-type">${doc.type}</span>
      </div>
      <h3 class="doc-title">${doc.title}</h3>
      <div class="doc-actions">
        <a class="doc-btn" href="${doc.file}" target="_blank" rel="noopener">Open</a>
        <a class="doc-btn" href="${doc.file}" download>Download</a>
      </div>
    </article>
  `).join('');
}

/* ---- Splash screen ---- */
function initSplash(){
  const splash = document.getElementById('splash');
  const site = document.getElementById('site');
  const audio = document.getElementById('bg-audio');

  const dismiss = () => {
    splash.classList.add('is-hidden');
    site.removeAttribute('aria-hidden');
    document.body.style.overflow = '';

    if(audio){
      audio.volume = 0.5;
      audio.play().catch(() => {
        /* Autoplay was blocked or the audio file hasn't been added yet — that's fine. */
      });
    }

    splash.removeEventListener('click', dismiss);
    window.removeEventListener('keydown', onKey);
  };

  const onKey = (e) => {
    if(e.key === 'Enter' || e.key === ' '){
      dismiss();
    }
  };

  document.body.style.overflow = 'hidden';
  splash.addEventListener('click', dismiss);
  window.addEventListener('keydown', onKey);
}

/* ---- Mobile nav toggle ---- */
function initNav(){
  const burger = document.getElementById('navBurger');
  const links = document.querySelector('.nav-links');
  if(!burger || !links) return;

  burger.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---- Active nav link on scroll ---- */
function initScrollSpy(){
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[data-nav]');
  if(!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        navLinks.forEach(a => a.classList.remove('is-active'));
        const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if(match) match.classList.add('is-active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ---- Footer year ---- */
function initYear(){
  const el = document.getElementById('year');
  if(el) el.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  renderDocuments();
  initSplash();
  initNav();
  initScrollSpy();
  initYear();
});
