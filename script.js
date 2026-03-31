/* ============================================================
   SPACERZ PORTFOLIO — script.js
   ============================================================ */

/* ---- Custom Cursor ---- */
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});
(function animateTrail() {
  trailX += (parseFloat(cursor.style.left || 0) - trailX) * 0.12;
  trailY += (parseFloat(cursor.style.top  || 0) - trailY) * 0.12;
  trail.style.left = trailX + 'px';
  trail.style.top  = trailY + 'px';
  requestAnimationFrame(animateTrail);
})();

/* ---- Mobile Nav ---- */
const menuToggle = document.getElementById('menuToggle');
const mobileNav  = document.getElementById('mobileNav');
let navOpen = false;
menuToggle.addEventListener('click', () => {
  navOpen = !navOpen;
  mobileNav.classList.toggle('open', navOpen);
  document.body.style.overflow = navOpen ? 'hidden' : '';
});
document.querySelectorAll('.mobile-link').forEach(l =>
  l.addEventListener('click', () => {
    navOpen = false; mobileNav.classList.remove('open'); document.body.style.overflow = '';
  })
);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navOpen) { navOpen = false; mobileNav.classList.remove('open'); document.body.style.overflow = ''; }
});

/* ---- Navbar scroll ---- */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 50
    ? 'rgba(8,11,15,0.97)'
    : 'linear-gradient(to bottom,rgba(8,11,15,.9),transparent)';
});

/* ---- Years on GitHub (from created_at) ---- */
function calcYears(createdAt) {
  const created = new Date(createdAt);
  const now     = new Date();
  const diff    = (now - created) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(diff);
}
const yearsEl = document.getElementById('yearsExp');
if (yearsEl) {
  const years = calcYears('2018-02-22T06:22:35Z');
  animateCount(yearsEl, years, 1200, v => v + ' yrs');
}

/* ---- Counter util ---- */
function animateCount(el, target, duration = 1500, fmt = v => v) {
  const start = performance.now();
  (function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(Math.round(ease * target));
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = fmt(target);
  })(start);
}

/* ---- Projects ---- */
const projects = [
  {
    icon: '🌐',
    name: 'Web Management System',
    desc: 'A full-stack MVC web application for internal business management. Covers authentication, role-based access control, and reporting modules.',
    tags: ['ASP.NET', 'C#', 'SQL Server', 'MVC'],
    github: 'https://github.com/SpacerZ',
    demo: null,
    featured: false,
  },
  {
    icon: '📱',
    name: 'Cross-Platform Desktop App',
    desc: 'Lightweight desktop utility built with a web-first approach. Wraps web technologies into a native-feeling application for internal tooling.',
    tags: ['Electron', 'Vue.js', 'Node.js'],
    github: 'https://github.com/SpacerZ',
    demo: null,
    featured: false,
  },
  {
    icon: '⚡',
    name: 'REST API Service',
    desc: 'Scalable RESTful backend service with JWT authentication, structured logging, and PostgreSQL persistence. Containerized for easy deployment.',
    tags: ['NestJS', 'TypeScript', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/SpacerZ',
    demo: null,
    featured: false,
  },
  {
    icon: '🖥️',
    name: 'Native Desktop Tool',
    desc: 'High-performance cross-platform desktop application with a minimal footprint. Built using Go for the backend and a reactive web frontend.',
    tags: ['Wails', 'Go', 'Svelte'],
    github: 'https://github.com/SpacerZ',
    demo: null,
    featured: true,
  },
  {
    icon: '🔌',
    name: 'Microservice Backend',
    desc: 'Modular microservice architecture handling core business logic, message queuing, and third-party integrations for a production system.',
    tags: ['Spring Boot', 'Java', 'Kafka', 'Oracle DB'],
    github: 'https://github.com/SpacerZ',
    demo: null,
    featured: false,
  },
  {
    icon: '🎨',
    name: 'SPA Frontend',
    desc: 'Single-page application with dynamic data visualisation, real-time updates, and a polished UI, consuming a RESTful API backend.',
    tags: ['React', 'TypeScript', 'Tailwind'],
    github: 'https://github.com/SpacerZ',
    demo: null,
    featured: false,
  },
];

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  projects.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = `project-card reveal reveal-delay-${(i % 3) + 1}${p.featured ? ' featured' : ''}`;
    card.innerHTML = `
      <div class="project-header">
        <div class="project-icon">${p.icon}</div>
        <div class="project-links">
          ${p.demo ? `<a href="${p.demo}" class="project-link-btn" target="_blank" rel="noopener" title="Live Demo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>` : ''}
          <a href="${p.github}" class="project-link-btn" target="_blank" rel="noopener" title="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
        </div>
      </div>
      <div class="project-name">${p.name}</div>
      <div class="project-desc">${p.desc}</div>
      <div class="project-tags">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
    `;
    grid.appendChild(card);
  });
}

/* ---- Skills ---- */
const skillsData = [
  {
    category: 'Frontend',
    chips: ['JavaScript', 'TypeScript', 'React', 'Vue.js', 'Svelte', 'HTML5 / CSS3', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    chips: ['Node.js', 'Express.js', 'NestJS', 'Go (Golang)', 'Python', 'Java Spring Boot', 'PHP', 'C# / ASP.NET', 'REST API'],
  },
  {
    category: 'Desktop',
    chips: ['Electron', 'Wails (Go + Web)'],
  },
  {
    category: 'Database & Infra',
    chips: ['PostgreSQL', 'Oracle DB', 'Docker', 'Git / GitLab', 'Linux', 'CI/CD', 'Jira'],
  },
];

function renderSkills() {
  const el = document.getElementById('skillsCategories');
  if (!el) return;
  skillsData.forEach((cat, i) => {
    const div = document.createElement('div');
    div.className = `skill-category reveal reveal-delay-${i + 1}`;
    div.innerHTML = `
      <div class="skill-cat-title">${cat.category}</div>
      <div class="skill-chips">${cat.chips.map(c => `<span class="skill-chip">${c}</span>`).join('')}</div>
    `;
    el.appendChild(div);
  });
}

/* ---- Terminal Live Feed ---- */
const terminalLines = [
  { type: 'prompt', text: 'git status' },
  { type: 'output', text: 'On branch main — nothing to commit' },
  { type: 'prompt', text: 'git log --oneline -5' },
  { type: 'success', text: 'a3f1b2c feat: add dashboard filters' },
  { type: 'success', text: 'd9e4c01 fix: resolve auth token expiry' },
  { type: 'success', text: '7f3a88d chore: update dependencies' },
  { type: 'success', text: 'c12d330 refactor: modularise API layer' },
  { type: 'success', text: 'b8e1029 docs: update README' },
  { type: 'prompt', text: 'docker ps' },
  { type: 'output', text: 'api-service    Up 3 hours   0.0.0.0:4000' },
  { type: 'output', text: 'postgres-db    Up 3 hours   0.0.0.0:5432' },
  { type: 'output', text: 'redis-cache    Up 3 hours   0.0.0.0:6379' },
  { type: 'prompt', text: 'npm run test -- --coverage' },
  { type: 'warn',   text: 'Running 84 test suites…' },
  { type: 'success', text: 'All tests passed ✓  Coverage: 94.2%' },
  { type: 'prompt', text: 'kubectl get pods -n production' },
  { type: 'success', text: 'api-deployment-xyz    Running   1/1' },
  { type: 'prompt', text: 'echo "Shipping code since 2018 🚀"' },
  { type: 'success', text: 'Shipping code since 2018 🚀' },
];

let termIdx = 0;
let termRunning = false;

function printNextLine(body) {
  if (termIdx >= terminalLines.length) { termIdx = 0; }
  const item = terminalLines[termIdx++];
  const span = document.createElement('span');
  span.className = `t-line ${item.type}`;
  span.textContent = item.text;
  // Remove old cursor
  body.querySelector('.t-cursor')?.remove();
  body.appendChild(span);
  // Add cursor
  const cur = document.createElement('span');
  cur.className = 't-cursor';
  body.appendChild(cur);
  // Auto-scroll
  body.scrollTop = body.scrollHeight;
  // Keep max 20 lines
  const lines = body.querySelectorAll('.t-line');
  if (lines.length > 20) lines[0].remove();
}

function startTerminal() {
  const body = document.getElementById('terminalBody');
  if (!body || termRunning) return;
  termRunning = true;
  // Print a line every ~900ms to ~1500ms randomly
  function loop() {
    printNextLine(body);
    setTimeout(loop, 800 + Math.random() * 1000);
  }
  loop();
}

/* ---- Animated Meter Cards ---- */
const meters = [
  { id: 'mCommits',  barId: 'mCommitsBar',  min: 1,   max: 18,  suffix: ''   },
  { id: 'mLines',    barId: 'mLinesBar',    min: 50,  max: 800, suffix: ''   },
  { id: 'mPRs',      barId: 'mPRsBar',      min: 0,   max: 6,   suffix: ''   },
  { id: 'mIssues',   barId: 'mIssuesBar',   min: 0,   max: 10,  suffix: ''   },
  { id: 'mReviews',  barId: 'mReviewsBar',  min: 0,   max: 8,   suffix: ''   },
  { id: 'mStreak',   barId: 'mStreakBar',   min: 10,  max: 120, suffix: 'd'  },
];

function randomBetween(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }

function updateMeters() {
  meters.forEach(m => {
    const val = randomBetween(m.min, m.max);
    const pct = ((val - m.min) / (m.max - m.min)) * 100;
    const valEl = document.getElementById(m.id);
    const barEl = document.getElementById(m.barId);
    if (valEl) valEl.textContent = val + m.suffix;
    if (barEl) barEl.style.width = pct + '%';
  });
}

let metersStarted = false;
function startMeters() {
  if (metersStarted) return;
  metersStarted = true;
  updateMeters();
  setInterval(updateMeters, 2200);
}

/* ---- Scroll Reveal ---- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

/* ---- Stats section trigger ---- */
const statsSection = document.getElementById('stats');
const statsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    startTerminal();
    startMeters();
    statsObserver.disconnect();
  }
}, { threshold: 0.2 });
if (statsSection) statsObserver.observe(statsSection);

/* ---- Active Nav ---- */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`));
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObs.observe(s));

/* ---- Tilt on cards ---- */
function addTilt() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `translateY(-4px) perspective(600px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ---- Glitch ---- */
function addGlitch() {
  document.querySelectorAll('.title-line.accent').forEach(el => {
    setInterval(() => {
      if (Math.random() < 0.04) {
        el.style.textShadow = `${(Math.random()*4-2).toFixed(1)}px 0 var(--accent-2),${(Math.random()*4-2).toFixed(1)}px 0 var(--accent)`;
        setTimeout(() => { el.style.textShadow = ''; }, 80);
      }
    }, 300);
  });
}

/* ---- Smooth Scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderSkills();
  addGlitch();
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    addTilt();
  }, 150);
});
