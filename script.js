/* ============================================================
   DON BOSCO SCHOOL — Main JavaScript
   ============================================================ */

// ── Navbar Scroll Effect ──────────────────────────────────────
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Navbar glass effect
  if (scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Scroll-to-top button
  if (scrollY > 400) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }

  // Active nav link highlight
  updateActiveNav();
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Active Nav Link ───────────────────────────────────────────
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ── Hamburger Menu ────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const isOpen = navLinksEl.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = isOpen ? '0' : '';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});

// ── Scroll Reveal Animation ───────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

function addRevealClasses() {
  const selectors = [
    '.feature-card',
    '.achievement-card',
    '.contact-card',
    '.about-content',
    '.about-visual',
    '.academics-content',
    '.academics-visual',
    '.adm-item',
    '.subject-card',
    '.pillar',
    '.gallery-item',
    '.section-header',
    '.admissions-info',
    '.form-card',
    '.aerial-img-wrap',
    '.quote-card'
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      // Stagger delay for grid items
      if (['feature-card', 'achievement-card', 'contact-card', 'pillar', 'gallery-item'].some(c => el.classList.contains(c))) {
        el.style.transitionDelay = `${i * 0.08}s`;
      }
      revealObserver.observe(el);
    });
  });
}

addRevealClasses();

// ── Enquiry Form Handler ──────────────────────────────────────
const form = document.getElementById('enquiryForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simulate submission
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      formSuccess.classList.add('show');
    }, 1500);
  });
}

// ── Smooth Scroll for all anchor links ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Counter Animation ─────────────────────────────────────────
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const text = el.textContent.trim();
    const num = parseInt(text.replace(/[^0-9]/g, ''));
    if (!isNaN(num) && num > 0) {
      const suffix = text.replace(/[0-9]/g, '').trim();
      let count = 0;
      const step = Math.ceil(num / 60);
      const timer = setInterval(() => {
        count += step;
        if (count >= num) {
          count = num;
          clearInterval(timer);
        }
        el.textContent = count + suffix;
      }, 24);
    }
  });
}

// Trigger counter when hero stats are visible
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  const counterObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setTimeout(animateCounters, 600);
      counterObserver.disconnect();
    }
  }, { threshold: 0.5 });
  counterObserver.observe(heroStats);
}

// ── Gallery Lightbox (simple) ─────────────────────────────────
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const label = item.querySelector('.gallery-overlay span')?.textContent || '';
    openLightbox(img.src, img.alt, label);
  });
});

function openLightbox(src, alt, caption) {
  const overlay = document.createElement('div');
  overlay.id = 'lightbox';
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    padding:24px;cursor:zoom-out;animation:fadeIn 0.25s ease;
  `;
  overlay.innerHTML = `
    <img src="${src}" alt="${alt}" style="max-width:90vw;max-height:80vh;object-fit:contain;border-radius:12px;box-shadow:0 32px 80px rgba(0,0,0,0.8);">
    <p style="color:rgba(255,255,255,0.8);margin-top:16px;font-size:0.95rem;font-family:'Inter',sans-serif;">${caption}</p>
    <button onclick="document.getElementById('lightbox').remove()" style="position:absolute;top:24px;right:24px;color:white;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);border-radius:50%;width:44px;height:44px;font-size:1.4rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:0.2s;">✕</button>
  `;
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
  document.body.appendChild(overlay);
}

// ── Class badge hover ─────────────────────────────────────────
document.querySelectorAll('.class-badge').forEach(badge => {
  badge.addEventListener('mouseenter', () => {
    badge.style.transform = 'scale(1.1)';
  });
  badge.addEventListener('mouseleave', () => {
    badge.style.transform = '';
  });
});

// ── Feature cards sequential animation ───────────────────────
document.querySelectorAll('[data-index]').forEach(el => {
  el.style.transitionDelay = `${(parseInt(el.dataset.index) - 1) * 0.08}s`;
});

console.log('%c🎓 Don Bosco Matric. Hr. Sec. School', 'font-size:18px;font-weight:bold;color:#1a56db;');
console.log('%c"Learn · Live · Lead" — Website loaded successfully!', 'font-size:12px;color:#f59e0b;');
