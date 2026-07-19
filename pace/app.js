/* ═══════════════════════════════════════════════════════════
   PACE — app.js v2
   ═══════════════════════════════════════════════════════════ */
"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* ── 1. Scroll progress bar ────────────────────────────── */
  const bar = document.getElementById("scroll-bar");
  if (bar) {
    const onScroll = () => {
      const d = document.documentElement;
      bar.style.width = (window.scrollY / (d.scrollHeight - d.clientHeight) * 100) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ── 2. Navbar scroll state ────────────────────────────── */
  const nav = document.getElementById("nav");
  if (nav) {
    const update = () => nav.classList.toggle("nav--scrolled", window.scrollY > 60);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ── 3. Mobile drawer ──────────────────────────────────── */
  const ham     = document.getElementById("ham");
  const drawer  = document.getElementById("drawer");
  const dClose  = document.getElementById("drawer-close");

  const openDrawer = () => {
    drawer?.classList.add("open");
    document.body.style.overflow = "hidden";
    ham?.setAttribute("aria-expanded", "true");
  };
  const closeDrawer = () => {
    drawer?.classList.remove("open");
    document.body.style.overflow = "";
    ham?.setAttribute("aria-expanded", "false");
  };

  ham?.addEventListener("click", openDrawer);
  dClose?.addEventListener("click", closeDrawer);
  drawer?.querySelectorAll("a").forEach(a => a.addEventListener("click", closeDrawer));

  // Close on backdrop click
  drawer?.addEventListener("click", (e) => { if (e.target === drawer) closeDrawer(); });

  /* ── 4. Scroll reveal (IntersectionObserver) ───────────── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("on");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07, rootMargin: "0px 0px -56px 0px" });

  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  /* ── 5. Animated counters ──────────────────────────────── */
  const counters = [
    { id: "stat-1", target: 120 },
    { id: "stat-2", target: 250 },
    { id: "stat-3", target: 60  },
    { id: "stat-4", target: 18  },
  ];

  const cio = new IntersectionObserver(entries => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      const cfg = counters.find(c => document.getElementById(c.id) === target);
      if (!cfg) return;
      cio.unobserve(target);

      const start = performance.now();
      const dur   = 1600;
      const tick  = (now) => {
        const t = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        target.textContent = Math.round(ease * cfg.target);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => {
    const el = document.getElementById(c.id);
    if (el) cio.observe(el);
  });

  /* ── 6. Filter chips ───────────────────────────────────── */
  document.querySelectorAll(".chips").forEach(group => {
    group.querySelectorAll(".chip").forEach(chip => {
      chip.addEventListener("click", () => {
        group.querySelectorAll(".chip").forEach(c => c.classList.remove("chip--active"));
        chip.classList.add("chip--active");
      });
    });
  });

  /* ── 7. Smooth anchor scroll ───────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* ── 8. Hero parallax (subtle, GPU only) ──────────────── */
  const heroImg = document.querySelector(".hero__media img");
  if (heroImg && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("scroll", () => {
      if (window.scrollY < window.innerHeight * 1.2) {
        heroImg.style.transform = `translate3d(0, ${window.scrollY * 0.25}px, 0) scale(1.06)`;
      }
    }, { passive: true });
  }

  /* ── 9. Product card — colour dot swap ─────────────────── */
  document.querySelectorAll(".pcard").forEach(card => {
    card.querySelectorAll(".dot").forEach(dot => {
      dot.addEventListener("click", () => {
        dot.closest(".pcard__dots").querySelectorAll(".dot").forEach(d => d.classList.remove("dot--active"));
        dot.classList.add("dot--active");
      });
    });
  });

});
