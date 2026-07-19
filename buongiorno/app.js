/* ======================================================
   MASZ BABO PLACEK — app.js
   Animations, Scroll Effects, Navigation Logic
   ====================================================== */

'use strict';

// ===== UTILITY =====
const $ = (selector, ctx = document) => ctx.querySelector(selector);
const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];

// ===== 1. NAVBAR SCROLL EFFECT =====
(function initNavbar() {
  const navbar = $('#navbar');
  const hamburger = $('#hamburger');
  const navLinks = $('#nav-links');
  let lastScroll = 0;

  // Scrolled class for background blur
  function onScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on load

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu on nav link click
  $$('.nav-link', navLinks).forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();


// ===== 2. PARALLAX HERO BACKGROUND =====
(function initHeroParallax() {
  const heroBg = $('#hero-bg');
  if (!heroBg) return;

  // Disable on mobile for performance
  const mql = window.matchMedia('(min-width: 769px) and (prefers-reduced-motion: no-preference)');

  function onScroll() {
    if (!mql.matches) {
      heroBg.style.transform = 'scale(1.1)';
      return;
    }
    const scrolled = window.scrollY;
    const rate = scrolled * 0.35;
    heroBg.style.transform = `scale(1.1) translateY(${rate}px)`;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();


// ===== 3. HERO FADE-IN ANIMATIONS =====
(function initHeroAnimations() {
  const elements = $$('.fade-in-up');
  if (!elements.length) return;

  // Staggered animation on page load
  elements.forEach(el => {
    const delay = parseInt(el.dataset.delay || '0', 10);
    setTimeout(() => {
      el.classList.add('visible');
    }, delay + 200); // base delay of 200ms after page load
  });
})();


// ===== 4. INTERSECTION OBSERVER — SCROLL REVEAL =====
(function initScrollReveal() {
  const revealEls = $$('.reveal');
  if (!revealEls.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    // Instantly show everything for accessibility
    revealEls.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || '0', 10);

        setTimeout(() => {
          el.classList.add('visible');
        }, delay);

        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
})();


// ===== 5. FLOATING CTA + BACK TO TOP VISIBILITY =====
(function initFloatingElements() {
  const floatingCta = $('#floating-cta');
  const backToTop = $('#back-to-top');

  function onScroll() {
    const scrollY = window.scrollY;
    const showThreshold = window.innerHeight * 0.6;

    if (floatingCta) {
      floatingCta.classList.toggle('visible', scrollY > showThreshold);
    }
    if (backToTop) {
      backToTop.classList.toggle('visible', scrollY > showThreshold);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();


// ===== 6. SMOOTH ACTIVE NAV LINK HIGHLIGHTING =====
(function initActiveNav() {
  const sections = $$('section[id], footer[id], header[id]');
  const navLinks = $$('.nav-link');

  function getActiveSection() {
    const scrollY = window.scrollY + window.innerHeight * 0.35;

    for (let i = sections.length - 1; i >= 0; i--) {
      if (sections[i].offsetTop <= scrollY) {
        return sections[i].id;
      }
    }
    return null;
  }

  function updateActiveLink() {
    const activeId = getActiveSection();
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.style.color = 'var(--gold-light)';
      } else {
        link.style.color = '';
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
})();


// ===== 7. MENU CARDS STAGGER ENTRANCE =====
(function initMenuCardStagger() {
  const cards = $$('.menu-card');
  if (!cards.length) return;

  // Cards are already handled by .reveal + IntersectionObserver
  // Add a slight additional visual polish: shimmer on hover
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.willChange = 'transform, box-shadow';
    });
    card.addEventListener('mouseleave', function() {
      this.style.willChange = '';
    });
  });
})();


// ===== 8. GALLERY LIGHTBOX (simple) =====
(function initGalleryInteraction() {
  const items = $$('.gallery-item');
  items.forEach(item => {
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');

    const img = item.querySelector('img');
    if (!img) return;

    function openImage() {
      // Simple overlay lightbox
      const overlay = document.createElement('div');
      overlay.id = 'gallery-lightbox';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-label', img.alt || 'Zdjęcie');
      overlay.style.cssText = `
        position: fixed; inset: 0; z-index: 9999;
        background: rgba(10, 6, 3, 0.94);
        display: flex; align-items: center; justify-content: center;
        cursor: zoom-out; backdrop-filter: blur(12px);
        animation: fadeIn 0.3s ease;
      `;

      const cloneImg = document.createElement('img');
      cloneImg.src = img.src;
      cloneImg.alt = img.alt;
      cloneImg.style.cssText = `
        max-width: 90vw; max-height: 88vh;
        object-fit: contain; border-radius: 12px;
        box-shadow: 0 24px 80px rgba(0,0,0,0.7);
        animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      `;

      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '✕';
      closeBtn.setAttribute('aria-label', 'Zamknij');
      closeBtn.style.cssText = `
        position: absolute; top: 24px; right: 24px;
        background: rgba(212,168,67,0.15); border: 1px solid rgba(212,168,67,0.3);
        color: #d4a843; width: 48px; height: 48px; border-radius: 50%;
        font-size: 1.1rem; cursor: pointer; display: flex;
        align-items: center; justify-content: center;
        transition: background 0.2s;
      `;
      closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(212,168,67,0.3)';
      });
      closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'rgba(212,168,67,0.15)';
      });

      // Style tag for keyframes
      if (!document.getElementById('lightbox-styles')) {
        const style = document.createElement('style');
        style.id = 'lightbox-styles';
        style.textContent = `
          @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
          @keyframes scaleIn { from { transform: scale(0.85) } to { transform: scale(1) } }
        `;
        document.head.appendChild(style);
      }

      overlay.appendChild(cloneImg);
      overlay.appendChild(closeBtn);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';
      closeBtn.focus();

      function close() {
        overlay.style.animation = 'fadeIn 0.2s ease reverse';
        setTimeout(() => {
          overlay.remove();
          document.body.style.overflow = '';
        }, 200);
      }

      overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
      closeBtn.addEventListener('click', close);
      document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
          close();
          document.removeEventListener('keydown', escHandler);
        }
      });
    }

    item.addEventListener('click', openImage);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openImage();
      }
    });
  });
})();


// ===== 9. ANNOUNCEMENT STRIP — PAUSE ON HOVER =====
(function initStripPause() {
  const strip = $('.announcement-strip');
  const track = $('.strip-track');
  if (!strip || !track) return;

  strip.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
  strip.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
})();


// ===== 10. TESTIMONIAL CARDS — SUBTLE TILT EFFECT =====
(function initCardTilt() {
  const cards = $$('.testimonial-card');
  const mql = window.matchMedia('(min-width: 769px) and (hover: hover)');

  if (!mql.matches) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `
        translateY(-6px)
        rotateY(${x * 6}deg)
        rotateX(${-y * 6}deg)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


// ===== 11. MENU CARD TILT =====
(function initMenuTilt() {
  const cards = $$('.menu-card:not(.menu-card--promo)');
  const mql = window.matchMedia('(min-width: 769px) and (hover: hover)');

  if (!mql.matches) return;

  cards.forEach(card => {
    card.style.perspective = '800px';
    card.style.transformStyle = 'preserve-3d';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `
        translateY(-8px)
        rotateY(${x * 5}deg)
        rotateX(${-y * 5}deg)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


// ===== 12. PAGE LOAD INDICATOR =====
(function initPageLoad() {
  // Remove loading state, trigger initial animations
  document.documentElement.classList.add('js-loaded');
})();


// ===== 13. SMOOTH SCROLL POLYFILL FOR ANCHOR LINKS =====
(function initSmoothScroll() {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();


// ===== 14. COUNTER ANIMATION =====
(function initCounters() {
  // Animate stat numbers when they come into view
  const stats = $$('.stat-number');
  if (!stats.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const animData = [
    { el: stats[0], from: 0, to: 8, prefix: '', suffix: '+', isInt: true },
    { el: stats[1], from: 0, to: 100, prefix: '', suffix: '%', isInt: true },
    { el: stats[2], from: 0.0, to: 4.9, prefix: '⭐ ', suffix: '', isInt: false }
  ];

  function animateCounter(data) {
    const { el, from, to, prefix, suffix, isInt } = data;
    const duration = 1800;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = from + (to - from) * eased;

      el.textContent = prefix + (isInt
        ? Math.round(value)
        : value.toFixed(1)) + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stat = animData.find(d => d.el === entry.target);
        if (stat) {
          animateCounter(stat);
          observer.unobserve(entry.target);
        }
      }
    });
  }, { threshold: 0.5 });

  animData.forEach(d => observer.observe(d.el));
})();


// Contact Copy Function
window.copyContact = function(e, text) {
  e.preventDefault();
  navigator.clipboard.writeText(text).then(() => {
    const el = e.currentTarget;
    const originalText = el.innerHTML;
    el.innerHTML = 'Skopiowano! ✓';
    setTimeout(() => { el.innerHTML = originalText; }, 2000);
  });
};
