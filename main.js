// Scroll-reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Active nav link
const currentFile = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === currentFile) link.classList.add('active');
});

// Sticky nav: increase opacity on scroll
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 20
      ? 'rgba(197, 200, 232, 0.99)'
      : 'rgba(197, 200, 232, 0.97)';
  }, { passive: true });
}

// Hamburger menu
const hamburger = document.querySelector('.nav-hamburger');
if (hamburger) {
  const navEl = document.querySelector('.nav');

  hamburger.addEventListener('click', () => {
    navEl.classList.toggle('nav-open');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navEl.classList.remove('nav-open'));
  });

  document.addEventListener('click', e => {
    if (!navEl.contains(e.target)) navEl.classList.remove('nav-open');
  });
}

// Contact form: confirmation on submit
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Message Sent ✓';
    btn.disabled = true;
    btn.style.background = 'var(--cornflower)';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      btn.style.background = '';
      contactForm.reset();
    }, 4000);
  });
}
