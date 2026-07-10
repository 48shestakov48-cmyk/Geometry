(function () {
  'use strict';

  /* ---------- i18n ---------- */
  var LANG_KEY = 'nm-lang';
  var htmlEl = document.documentElement;

  function applyLang(lang) {
    var dict = window.NM_I18N[lang];
    if (!dict) return;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    document.querySelectorAll('.lang-switch button').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    htmlEl.setAttribute('lang', lang === 'ua' ? 'uk' : lang);
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }

  document.querySelectorAll('.lang-switch button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(btn.getAttribute('data-lang'));
    });
  });

  var savedLang = null;
  try { savedLang = localStorage.getItem(LANG_KEY); } catch (e) {}
  applyLang(savedLang && window.NM_I18N[savedLang] ? savedLang : 'pl');

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById('burgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- reveal on scroll ---------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.rv');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- hero hex signature: light up once on load ---------- */
  var heroHex = document.getElementById('heroHex');
  if (heroHex && !reduceMotion) {
    requestAnimationFrame(function () {
      setTimeout(function () { heroHex.classList.add('lit'); }, 250);
    });
  }

  /* ---------- before/after draggable slider ---------- */
  var slider = document.getElementById('baSlider');
  var handle = document.getElementById('baHandle');
  if (slider && handle) {
    var afterWrap = slider.querySelector('.ba-after-wrap');
    var dragging = false;

    function setPosition(clientX) {
      var rect = slider.getBoundingClientRect();
      var x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      var pct = (x / rect.width) * 100;
      handle.style.left = pct + '%';
      afterWrap.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
    }

    function onDown(e) {
      dragging = true;
      slider.setPointerCapture && e.pointerId != null && slider.setPointerCapture(e.pointerId);
    }
    function onMove(e) {
      if (!dragging) return;
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      setPosition(clientX);
    }
    function onUp() { dragging = false; }

    slider.addEventListener('pointerdown', function (e) { onDown(e); setPosition(e.clientX); });
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    slider.addEventListener('touchstart', function (e) { onDown(e); setPosition(e.touches[0].clientX); }, { passive: true });
    slider.addEventListener('touchmove', onMove, { passive: true });
    slider.addEventListener('touchend', onUp);

    slider.addEventListener('keydown', function (e) {
      var rect = slider.getBoundingClientRect();
      var current = parseFloat(handle.style.left) || 50;
      if (e.key === 'ArrowLeft') { setPosition(rect.left + (rect.width * Math.max(current - 5, 0) / 100)); }
      if (e.key === 'ArrowRight') { setPosition(rect.left + (rect.width * Math.min(current + 5, 100) / 100)); }
    });
    slider.setAttribute('tabindex', '0');
    slider.setAttribute('role', 'slider');
    slider.setAttribute('aria-label', 'Before / after comparison');
    slider.setAttribute('aria-valuemin', '0');
    slider.setAttribute('aria-valuemax', '100');
    slider.setAttribute('aria-valuenow', '50');
  }

  /* ---------- header background on scroll ---------- */
  var header = document.querySelector('header');
  if (header) {
    var onScroll = function () {
      header.style.background = window.scrollY > 20 ? 'rgba(10,10,10,0.92)' : 'rgba(10,10,10,0.7)';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
