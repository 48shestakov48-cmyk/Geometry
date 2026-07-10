document.addEventListener('DOMContentLoaded', () => {

  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  const revealEls = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  const burgerBtn = document.getElementById('burgerBtn');
  const mobileNav = document.getElementById('mobileNav');

  function closeMenu() {
    burgerBtn.classList.remove('open');
    mobileNav.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded', 'false');
  }

  burgerBtn?.addEventListener('click', () => {
    const open = burgerBtn.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    burgerBtn.setAttribute('aria-expanded', String(open));
  });

  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

});
