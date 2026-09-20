(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- Preloader ---------- */
  const pre = $('#preloader'), preFill = $('#preFill'), preCount = $('#preCount');
  const preWord = $('#preWord');
  const words = ['loading system', 'linking cardinal', 'waking agents', 'compiling portfolio'];
  let wi = 0;
  const wTick = setInterval(() => {
    wi = (wi + 1) % words.length;
    if (preWord) preWord.textContent = words[wi];
  }, 500);
  let p = 0;
  const tick = setInterval(() => {
    p = Math.min(100, p + Math.random() * 14 + 4);
    preFill.style.width = p + '%';
    preCount.textContent = String(Math.floor(p)).padStart(2, '0');
    if (p >= 100) {
      clearInterval(tick); clearInterval(wTick);
      setTimeout(() => pre.classList.add('done'), 350);
    }
  }, 110);

  /* ---------- Theme (B/W invert) ---------- */
  const root = document.documentElement;
  try {
    if (localStorage.getItem('as-theme')) root.dataset.theme = localStorage.getItem('as-theme');
  } catch (e) {}
  $('#themeBtn').addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('as-theme', root.dataset.theme); } catch (e) {}
  });

  /* ---------- Burger ---------- */
  const burger = $('#burger'), navLinks = $('#navLinks');
  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
  $$('#navLinks a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  /* ---------- Active nav link ---------- */
  const navMap = {};
  $$('#navLinks a').forEach(a => { navMap[a.getAttribute('href').slice(1)] = a; });
  const secIO = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
      $$('#navLinks a').forEach(a => a.classList.remove('active'));
      const link = navMap[e.target.id];
      if (link) link.classList.add('active');
    }
  }), { rootMargin: '-40% 0px -55% 0px' });
  ['work', 'about', 'stack', 'journey', 'contact'].forEach(id => {
    const el = document.getElementById(id);
    if (el) secIO.observe(el);
  });

  /* ---------- Custom cursor ---------- */
  const dot = $('#cursorDot'), ring = $('#cursorRing');
  let mx = -100, my = -100, rx = -100, ry = -100;
  addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function loop() {
    rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
    dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();
  $$('[data-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('link-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('link-hover'));
  });

  /* ---------- Magnetic buttons ---------- */
  $$('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.18}px,${y * 0.18}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });

  /* ---------- Scramble hero title ---------- */
  const scr = $('#scramble'), chars = '█▓▒░<>/\\|01ANIMESAO#_';
  let si = 0;
  function scramble() {
    const target = scr.dataset.text; let out = '', frame = si / 3;
    for (let i = 0; i < target.length; i++) {
      out += i < frame ? target[i] : chars[Math.floor(Math.random() * chars.length)];
    }
    scr.textContent = out; si++;
    if (si < target.length * 3 + 12) setTimeout(scramble, 34); else scr.textContent = target;
  }
  setTimeout(scramble, 900);

  /* ---------- Typer ---------- */
  const lines = [
    'Cardinal — my main ecosystem project.',
    'AI-assisted development: agents, RAG, MCP, automation.',
    'Web & backend — Nuxt · Next · Node · Python · MySQL.',
    'Minecraft — Paper plugins & server systems.'
  ];
  const typer = $('#typer'); let li = 0, ci = 0, del = false;
  (function type() {
    const cur = lines[li];
    typer.textContent = cur.slice(0, ci);
    if (!del && ci < cur.length) { ci++; setTimeout(type, 34); }
    else if (!del) { del = true; setTimeout(type, 1700); }
    else if (ci > 0) { ci -= 3; setTimeout(type, 16); }
    else { del = false; li = (li + 1) % lines.length; setTimeout(type, 300); }
  })();

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  $$('.reveal').forEach(el => io.observe(el));

  /* ---------- Counters ---------- */
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count; let v = 0;
    const t = setInterval(() => {
      v += Math.max(1, Math.round(end / 24));
      if (v >= end) { v = end; clearInterval(t); }
      el.textContent = String(v).padStart(2, '0');
    }, 60);
    cio.unobserve(el);
  }), { threshold: 0.6 });
  $$('[data-count]').forEach(el => cio.observe(el));

  /* ---------- Progress bar ---------- */
  const fill = $('#progressFill');
  addEventListener('scroll', () => {
    const h = document.documentElement;
    fill.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
  }, { passive: true });
  $('#toTop').addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Tilt ---------- */
  $$('.tilt').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-3px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });

  /* ---------- Copy bio ---------- */
  const copyBtn = $('#copyMail');
  if (copyBtn) copyBtn.addEventListener('click', async () => {
    const txt = $('#bioShort').textContent;
    try { await navigator.clipboard.writeText(txt); } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = txt; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); ta.remove();
    }
    const b = copyBtn.querySelector('b'); const old = b.textContent;
    b.textContent = '✓ copied to clipboard'; setTimeout(() => b.textContent = old, 1600);
  });

  /* ---------- Hero particle network (monochrome) ---------- */
  const cv = $('#net'), ctx = cv.getContext('2d');
  let W, H, pts = [];
  function resize() {
    const r = cv.parentElement.getBoundingClientRect();
    W = cv.width = r.width; H = cv.height = r.height;
    const n = Math.min(90, Math.floor(W * H / 16000));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.6 + 0.6
    }));
  }
  resize(); addEventListener('resize', resize);
  function stroke() { return getComputedStyle(document.documentElement).getPropertyValue('--fg').trim() || '#fff'; }
  (function draw() {
    ctx.clearRect(0, 0, W, H);
    const c = stroke();
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7);
      ctx.fillStyle = c; ctx.globalAlpha = 0.7; ctx.fill(); ctx.globalAlpha = 1;
    });
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.hypot(dx, dy);
      if (d < 150) {
        ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
        ctx.strokeStyle = c; ctx.globalAlpha = (1 - d / 150) * 0.28; ctx.stroke(); ctx.globalAlpha = 1;
      }
    }
    requestAnimationFrame(draw);
  })();

  /* ---------- Console easter egg ---------- */
  console.log('%canimesao®', 'font-family:monospace;font-size:22px;font-weight:bold');
  console.log('%cCARDINAL · AI-ASSISTED · WEB · MINECRAFT · DEVTOOLS', 'font-family:monospace;color:#888');
})();
