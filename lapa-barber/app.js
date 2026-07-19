/* =====================================================
   ŁAPA BARBER SHOP – app.js
   Intersection Observer | Counters | Navbar |
   Hamburger | Particles | Floating CTA | Hero BG
   ===================================================== */

'use strict';

/* ── DOM READY ── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHamburger();
  initHeroBackground();
  initParticles();
  initScrollAnimations();
  initCounters();
  initFloatingCta();
  initSmoothScroll();
});

/* =====================================================
   NAVBAR – scroll behaviour
   ===================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load
}

/* =====================================================
   HAMBURGER MENU
   ===================================================== */
function initHamburger() {
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');
  if (!hamburger || !navLinks) return;

  const openMenu = () => {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    navLinks.classList.add('open');
    navOverlay && navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
    navOverlay && navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close on overlay click
  navOverlay && navOverlay.addEventListener('click', closeMenu);

  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* =====================================================
   HERO BACKGROUND PARALLAX + LOAD ANIMATION
   ===================================================== */
function initHeroBackground() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  // Trigger scale animation after a short delay
  requestAnimationFrame(() => {
    setTimeout(() => heroBg.classList.add('loaded'), 100);
  });

  // Subtle parallax on scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroBg.style.transform = `scale(1) translateY(${scrollY * 0.3}px)`;
    }
  }, { passive: true });
}

/* =====================================================
   FLOATING GOLD PARTICLES in HERO
   ===================================================== */
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const COUNT = 22;

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const x        = Math.random() * 100;
    const delay    = Math.random() * 12;
    const duration = 8 + Math.random() * 14;
    const size     = 1 + Math.random() * 3;

    p.style.cssText = `
      left: ${x}%;
      bottom: -10px;
      width: ${size}px;
      height: ${size}px;
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
    `;

    container.appendChild(p);
  }
}

/* =====================================================
   SCROLL ANIMATIONS – Intersection Observer
   ===================================================== */
function initScrollAnimations() {
  const targets = document.querySelectorAll('.fade-in');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // once only
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  targets.forEach(el => observer.observe(el));
}

/* =====================================================
   ANIMATED COUNTERS
   ===================================================== */
function initCounters() {
  const statItems = document.querySelectorAll('.stat-item');
  if (!statItems.length) return;

  const easeOutQuad = t => t * (2 - t);

  const animateCounter = (el, target, suffix, duration = 1800) => {
    const display = el.querySelector('.stat-number');
    if (!display) return;

    const start = performance.now();

    const tick = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutQuad(progress);
      const current  = Math.floor(eased * target);

      display.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        display.textContent = target + suffix;
      }
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const suffix = el.dataset.suffix || '';
          animateCounter(el, target, suffix);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.4 }
  );

  statItems.forEach(item => observer.observe(item));
}

/* =====================================================
   FLOATING CTA – appear after scroll
   ===================================================== */
function initFloatingCta() {
  const btn = document.getElementById('floatingCta');
  if (!btn) return;

  const SHOW_AFTER = 600; // px

  window.addEventListener('scroll', () => {
    if (window.scrollY > SHOW_AFTER) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });
}

/* =====================================================
   SMOOTH SCROLL for anchor links
   ===================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navbarH = document.getElementById('navbar')?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navbarH;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}


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
