(function () {
  'use strict';

  const revealables = document.querySelectorAll(
    '.section-title, .title-underline, .section-desc, ' +
    '.synopsis-text, .synopsis-stats, ' +
    '.char-card, .mech-card, ' +
    '.enemy-card, .stage, .gal-item, .team-member, ' +
    '.trailer-soon, .hero-theme-badge'
  );
  revealables.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealables.forEach(el => io.observe(el));

  const sections = document.querySelectorAll('section.section, header.hero');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navMap = {};
  navLinks.forEach(a => { navMap[a.getAttribute('href').slice(1)] = a; });

  function updateActive() {
    const y = window.scrollY + 120;
    let current = null;
    sections.forEach(s => { if (s.offsetTop <= y) current = s.id; });
    navLinks.forEach(a => a.classList.remove('active'));
    if (current && navMap[current]) navMap[current].classList.add('active');
  }
  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();

  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const y = Math.min(window.scrollY, 600);
      hero.style.setProperty('--parallax', y + 'px');
      hero.querySelectorAll('.shard').forEach((s, i) => {
        s.style.transform = `translateY(${y * (i % 2 ? -0.15 : 0.15)}px) rotate(${y * 0.02}deg)`;
      });
    }, { passive: true });
  }
})();
