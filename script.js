/* ============================================================
   PORTFOLIO — script.js
   Custom Cursor · Projects · Skills · Counters · Contrib Graph
   ============================================================ */

/* ---- Custom Cursor ---- */
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

function animateTrail() {
  trailX += (parseFloat(cursor.style.left || 0) - trailX) * 0.12;
  trailY += (parseFloat(cursor.style.top || 0) - trailY) * 0.12;
  trail.style.left = trailX + 'px';
  trail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

/* ---- Mobile Nav ---- */
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
let navOpen = false;

menuToggle.addEventListener('click', () => {
  navOpen = !navOpen;
  mobileNav.classList.toggle('open', navOpen);
  document.body.style.overflow = navOpen ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    navOpen = false;
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ---- Navbar Scroll Effect ---- */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 50
    ? 'rgba(8,11,15,0.95)'
    : 'linear-gradient(to bottom, rgba(8,11,15,0.9) 0%, transparent 100%)';
});

/* ---- Projects Data ---- */
const projects = [
  {
    icon: '🚀',
    name: 'Portfolio Pro',
    desc: 'Trang portfolio cá nhân với thiết kế hiện đại, animation mượt mà và giao diện tối tối ưu hoá cho GitHub Pages.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    stars: 128,
    forks: 34,
    github: '#',
    demo: '#',
    featured: true,
  },
  {
    icon: '⚡',
    name: 'DevTracker',
    desc: 'Ứng dụng theo dõi tiến độ học tập lập trình với biểu đồ thống kê và hệ thống gamification.',
    tags: ['React', 'Node.js', 'MongoDB'],
    stars: 89,
    forks: 21,
    github: '#',
    demo: '#',
    featured: false,
  },
  {
    icon: '🤖',
    name: 'AI Chat Bot',
    desc: 'Chatbot AI tích hợp OpenAI API với memory context, hỗ trợ đa ngôn ngữ và markdown rendering.',
    tags: ['Python', 'FastAPI', 'OpenAI'],
    stars: 215,
    forks: 67,
    github: '#',
    demo: null,
    featured: false,
  },
  {
    icon: '🛒',
    name: 'E-Commerce API',
    desc: 'RESTful API cho nền tảng thương mại điện tử với authentication, payment gateway và admin dashboard.',
    tags: ['Express', 'PostgreSQL', 'Redis'],
    stars: 54,
    forks: 18,
    github: '#',
    demo: '#',
    featured: false,
  },
  {
    icon: '📊',
    name: 'DataViz Dashboard',
    desc: 'Dashboard phân tích dữ liệu real-time với D3.js charts, WebSocket và export to PDF.',
    tags: ['Vue.js', 'D3.js', 'WebSocket'],
    stars: 143,
    forks: 45,
    github: '#',
    demo: '#',
    featured: false,
  },
  {
    icon: '🎮',
    name: 'CLI Game Engine',
    desc: 'Game engine dòng lệnh viết bằng Rust với physics engine đơn giản và hỗ trợ plugin.',
    tags: ['Rust', 'CLI', 'Game Dev'],
    stars: 76,
    forks: 12,
    github: '#',
    demo: null,
    featured: false,
  },
];

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  projects.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = `project-card reveal reveal-delay-${(i % 3) + 1}${p.featured ? ' featured' : ''}`;

    const demoBtn = p.demo ? `
      <a href="${p.demo}" class="project-link-btn" target="_blank" rel="noopener" title="Live Demo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </a>` : '';

    card.innerHTML = `
      <div class="project-header">
        <div class="project-icon">${p.icon}</div>
        <div class="project-links">
          ${demoBtn}
          <a href="${p.github}" class="project-link-btn" target="_blank" rel="noopener" title="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
      <div class="project-name">${p.name}</div>
      <div class="project-desc">${p.desc}</div>
      <div class="project-tags">
        ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
      </div>
      <div class="project-meta">
        <span>⭐ ${p.stars}</span>
        <span>🍴 ${p.forks}</span>
      </div>
    `;

    grid.appendChild(card);
  });
}

/* ---- Skills Data ---- */
const skillsData = [
  {
    category: 'Frontend',
    chips: ['React', 'Vue.js', 'TypeScript', 'CSS / Tailwind', 'HTML5', 'Next.js'],
  },
  {
    category: 'Backend',
    chips: ['Node.js', 'Python', 'Express', 'FastAPI', 'REST / GraphQL'],
  },
  {
    category: 'Database & Cloud',
    chips: ['PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Docker', 'Firebase'],
  },
  {
    category: 'Tools',
    chips: ['Git', 'GitHub Actions', 'Figma', 'Linux', 'VS Code', 'Jira'],
  },
];

function renderSkills() {
  const el = document.getElementById('skillsCategories');
  if (!el) return;
  el.innerHTML = '';
  skillsData.forEach((cat, i) => {
    const div = document.createElement('div');
    div.className = `skill-category reveal reveal-delay-${i + 1}`;
    div.innerHTML = `
      <div class="skill-cat-title">${cat.category}</div>
      <div class="skill-chips">
        ${cat.chips.map(c => `<span class="skill-chip">${c}</span>`).join('')}
      </div>
    `;
    el.appendChild(div);
  });
}

/* ---- Contribution Grid ---- */
function renderContribGrid() {
  const grid = document.getElementById('contribGrid');
  if (!grid) return;
  const weeks = 53, days = 7;
  const levels = ['l0', 'l0', 'l0', 'l0', 'l1', 'l1', 'l2', 'l2', 'l3', 'l4'];

  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < days; d++) {
      const cell = document.createElement('div');
      const rand = Math.random();
      let levelClass = 'l0';
      if (rand > 0.85) levelClass = 'l4';
      else if (rand > 0.70) levelClass = 'l3';
      else if (rand > 0.55) levelClass = 'l2';
      else if (rand > 0.40) levelClass = 'l1';
      cell.className = `contrib-cell ${levelClass}`;
      cell.title = `${Math.floor(rand * 10)} contributions`;
      grid.appendChild(cell);
    }
  }
}

/* ---- Counter Animation ---- */
function animateCounter(el) {
  const raw = el.getAttribute('data-count');
  const isFloat = raw.includes('.');
  const isSuffix = raw.endsWith('k') || raw.endsWith('m');
  let target;
  let suffix = '';

  if (raw.endsWith('k')) { target = parseFloat(raw) * 1000; suffix = 'k'; }
  else if (raw.endsWith('m')) { target = parseFloat(raw) * 1000000; suffix = 'm'; }
  else { target = parseInt(raw, 10); }

  let current = 0;
  const duration = 1800;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    current = Math.round(eased * target);

    if (suffix === 'k') {
      el.textContent = (current / 1000).toFixed(1) + 'k';
    } else {
      el.textContent = current.toLocaleString();
    }

    if (progress < 1) requestAnimationFrame(step);
    else {
      el.textContent = suffix === 'k' ? raw : target.toLocaleString();
    }
  }
  requestAnimationFrame(step);
}

/* ---- Scroll Reveal + Counter Trigger ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

/* ---- Hero chip counters (immediate) ---- */
function initHeroCounters() {
  document.querySelectorAll('.chip-num').forEach(el => {
    counterObserver.observe(el);
  });
  document.querySelectorAll('.stat-big').forEach(el => {
    counterObserver.observe(el);
  });
}

/* ---- Active Nav Highlight ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active',
          link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { threshold: 0.4 });

/* ---- Tilt Effect on project cards ---- */
function addTiltEffect() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-4px) perspective(600px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ---- Glitch Text Effect (Hero title) ---- */
function addGlitch() {
  const accents = document.querySelectorAll('.title-line.accent');
  accents.forEach(el => {
    el.style.position = 'relative';
    setInterval(() => {
      if (Math.random() < 0.05) {
        el.style.textShadow = `${Math.random() * 4 - 2}px 0 var(--accent-2), ${Math.random() * 4 - 2}px 0 var(--accent)`;
        setTimeout(() => { el.style.textShadow = ''; }, 80);
      }
    }, 300);
  });
}

/* ---- Smooth scroll for all anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderSkills();
  renderContribGrid();
  initHeroCounters();
  addGlitch();

  // Observe reveal elements
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    addTiltEffect();
  }, 100);

  // Observe sections for nav highlight
  sections.forEach(s => sectionObserver.observe(s));
});

/* ---- Keyboard nav accessibility ---- */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navOpen) {
    navOpen = false;
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }
});
