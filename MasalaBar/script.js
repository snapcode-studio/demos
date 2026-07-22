/* =============================================
   LENIS SMOOTH SCROLLING
   ============================================= */
const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
});

function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

/* GSAP + ScrollTrigger */
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({ scroller: document.body });

/* =============================================
   CUSTOM CURSOR (desktop)
   ============================================= */
const cursor   = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && follower && window.matchMedia('(pointer: fine)').matches) {
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  gsap.ticker.add(() => {
    fx += (mx - fx) * 0.15;
    fy += (my - fy) * 0.15;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
  });

  document.querySelectorAll('a, button, .widget-glass-container, .masonry-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform   = 'translate(-50%,-50%) scale(1.6)';
      cursor.style.background  = 'transparent';
      cursor.style.border      = '1px solid var(--gold)';
      follower.style.transform = 'translate(-50%,-50%) scale(1.5)';
      follower.style.borderColor = 'transparent';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform   = 'translate(-50%,-50%) scale(1)';
      cursor.style.background  = 'var(--gold)';
      cursor.style.border      = 'none';
      follower.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.borderColor = 'var(--gold)';
    });
  });
}

/* =============================================
   NAVBAR SCROLL STATE
   ============================================= */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* =============================================
   PRELOADER
   ============================================= */
window.addEventListener('load', () => {
  const tl = gsap.timeline({
    onComplete() {
      document.getElementById('preloader').classList.add('done');
    }
  });

  tl.to('.progress',        { width: '100%', duration: 1,   ease: 'power2.inOut' })
    .to('.preloader-logo',  { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' }, '-=0.1')
    .to('.preloader',       { yPercent: -100, duration: 0.8, ease: 'power3.inOut' })
    .fromTo('#navbar',      { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3')
    .fromTo('.animate-split', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.2')
    .fromTo('.animate-fade', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.18 }, '-=0.6')
    .fromTo('.scroll-indicator', { opacity: 0 }, { opacity: 0.5, duration: 1 }, '-=0.4');
});

/* =============================================
   PARALLAX — HERO BG
   ============================================= */
gsap.to('.hero-bg img', {
  yPercent: 28,
  ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
});

/* =============================================
   PARALLAX — ABOUT IMAGES
   ============================================= */
if (window.innerWidth > 768) {
  gsap.to('.img-main img', {
    yPercent: 14, ease: 'none',
    scrollTrigger: { trigger: '.about-images', start: 'top bottom', end: 'bottom top', scrub: true }
  });
  gsap.to('.img-accent img', {
    yPercent: -18, ease: 'none',
    scrollTrigger: { trigger: '.about-images', start: 'top bottom', end: 'bottom top', scrub: true }
  });
}

/* =============================================
   SCROLL REVEAL — fade-up
   ============================================= */
const fadeEls = document.querySelectorAll('.fade-up');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  fadeEls.forEach(el => io.observe(el));
} else {
  fadeEls.forEach(el => el.classList.add('visible'));
}

/* =============================================
   SMOOTH SCROLL — anchor links (Lenis)
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    e.preventDefault();
    lenis.scrollTo(id, { duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    closeMobileMenu();
  });
});

/* =============================================
   MOBILE MENU
   ============================================= */
const mobileMenuBtn   = document.getElementById('mobileMenuBtn');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenu      = document.getElementById('mobileMenu');
const mobileOverlay   = document.getElementById('mobileOverlay');

function openMobileMenu() {
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('active');
  mobileMenuBtn.classList.add('open');
  mobileMenuBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('active');
  mobileMenuBtn.classList.remove('open');
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', () => {
  if (mobileMenu.classList.contains('open')) closeMobileMenu();
  else openMobileMenu();
});
mobileMenuClose.addEventListener('click', closeMobileMenu);
mobileOverlay.addEventListener('click', closeMobileMenu);

/* Close on Escape */
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileMenu(); });

/* =============================================
   WIDGET IFRAME — smooth wheel scroll & hide custom cursor
   Hide custom cursor over iframe, forward wheel scroll to Lenis without freezing page scroll.
   ============================================= */
const widgetContainer = document.querySelector('.widget-glass-container');

if (widgetContainer) {
  widgetContainer.addEventListener('mouseenter', () => {
    if (cursor)   cursor.style.opacity   = '0';
    if (follower) follower.style.opacity = '0';
  });

  widgetContainer.addEventListener('mouseleave', () => {
    if (cursor)   cursor.style.opacity   = '1';
    if (follower) follower.style.opacity = '1';
  });

  widgetContainer.addEventListener('wheel', (e) => {
    if (lenis) {
      lenis.scrollTo(lenis.scroll + e.deltaY * 0.85, { immediate: true });
    }
  }, { passive: true });
}

/* =============================================
   COPY PHONE NUMBER (all desktop call buttons)
   ============================================= */
const copyTooltip  = document.getElementById('copyTooltip');

document.querySelectorAll('#navCallBtn, .call-btn-copy').forEach(btn => {
  btn.addEventListener('click', e => {
    if (window.matchMedia('(pointer: fine)').matches) {
      e.preventDefault();
      const num = '32 422 00 00';
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(num).catch(() => legacyCopy(num));
      } else {
        legacyCopy(num);
      }
      showTooltip();
    }
  });
});

function legacyCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); } catch(_) {}
  document.body.removeChild(ta);
}

function showTooltip() {
  if (!copyTooltip) return;
  copyTooltip.classList.add('show');
  setTimeout(() => copyTooltip.classList.remove('show'), 2200);
}

/* =============================================
   FLOATING BAR — appear after hero, hide at footer
   ============================================= */
const floatingBar = document.getElementById('floatingBar');
const hero        = document.querySelector('.hero');
const footer      = document.querySelector('.footer');

if (floatingBar && hero) {
  let heroGone   = false;
  let footerHere = false;

  function updateBar() {
    if (heroGone && !footerHere) floatingBar.classList.add('visible');
    else                          floatingBar.classList.remove('visible');
  }

  // Show once hero scrolls out of view
  const heroObs = new IntersectionObserver(entries => {
    heroGone = !entries[0].isIntersecting;
    updateBar();
  }, { threshold: 0.1 });
  heroObs.observe(hero);

  // Hide when footer comes into view
  if (footer) {
    const footerObs = new IntersectionObserver(entries => {
      footerHere = entries[0].isIntersecting;
      updateBar();
    }, { threshold: 0.1 });
    footerObs.observe(footer);
  }
}
