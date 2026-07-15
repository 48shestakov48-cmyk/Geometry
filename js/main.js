/* ============================================================
   GEOMETRIA LOFT STUDIO — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Header scroll effect ── */
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── Scroll reveal (progressive enhancement) ── */
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
    // Fallback: make all visible immediately
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── Form: file upload label ── */
  const fileInput = document.querySelector('input[type="file"]');
  const fileLabel = document.querySelector('.file-upload span');
  if (fileInput && fileLabel) {
    fileInput.addEventListener('change', () => {
      const name = fileInput.files[0]?.name;
      if (name) fileLabel.textContent = name;
    });
  }

  /* ── Netlify form feedback ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Wysyłanie…';
      btn.disabled = true;

      const data = new FormData(form);

      try {
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(data).toString()
        });
        if (res.ok) {
          btn.textContent = '✓ Wiadomość wysłana';
          btn.style.background = '#222222';
          btn.style.color = '#A8A8A0';
          btn.style.border = '1px solid #A8A8A0';
          form.reset();
          if (fileLabel) fileLabel.textContent = 'Dodaj zdjęcie lub szkic (opcjonalnie)';
        } else {
          throw new Error('Network');
        }
      } catch {
        btn.textContent = 'Błąd — spróbuj ponownie';
        btn.disabled = false;
      }
    });
  }

  /* ── Smooth anchor scroll for nav links ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── GDPR Custom Checkbox ── */
  const gdprInput = document.getElementById('gdpr');
  const checkBox  = document.getElementById('checkBox');

  if (checkBox && gdprInput) {
    checkBox.addEventListener('click', () => {
      gdprInput.checked = !gdprInput.checked;
      if (gdprInput.checked) {
        checkBox.textContent = '✓';
        checkBox.style.borderColor = '#A8A8A0';
      } else {
        checkBox.textContent = '';
        checkBox.style.borderColor = 'rgba(239,239,236,0.5)';
      }
    });
  }


  /* ── Burger Menu ── */
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuBackdrop = document.getElementById('menuBackdrop');

  function openMenu() {
    burgerBtn.classList.add('open');
    mobileMenu.classList.add('open');
    menuBackdrop.classList.add('open');
    document.body.classList.add('menu-open');
    burgerBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    burgerBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
    menuBackdrop.classList.remove('open');
    document.body.classList.remove('menu-open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  burgerBtn?.addEventListener('click', () => {
    burgerBtn.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close on link click
  mobileMenu?.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on backdrop click
  menuBackdrop?.addEventListener('click', closeMenu);


  /* ── Stats Counter Animation ── */
  const counters = document.querySelectorAll('.hero-stat-num[data-target]');

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2200;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = easeOut(step / steps);
      current = Math.round(progress * target);
      el.textContent = current + suffix;
      if (step >= steps) {
        el.textContent = target + suffix;
        clearInterval(timer);
      }
    }, stepTime);
  };

  // Trigger when hero stats become visible
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            counters.forEach(animateCounter);
          }, 400);
          counterObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });

    const statsBlock = document.querySelector('.hero-stats');
    if (statsBlock) counterObserver.observe(statsBlock);
  }

  /* ── Cookie Banner ── */
  const banner = document.getElementById('cookieBanner');
  const accepted = localStorage.getItem('cookieConsent');

  if (!accepted) {
    setTimeout(() => { banner.style.display = 'block'; }, 800);
  }

  document.getElementById('cookieAccept')?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    banner.style.display = 'none';
  });

  document.getElementById('cookieReject')?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'rejected');
    banner.style.display = 'none';
  });

  /* ── FAQ Accordion ── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked (if was closed)
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

});
