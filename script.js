/* ═══════════════════════════════════════════════════════════════
   PATRONAXXX — script.js v4 — No CDN, all inline
   ═══════════════════════════════════════════════════════════════ */

/* ─── MOCK YOUTUBE DATA (без реального API) ────────────────────────── */
const MOCK_SHORTS = [
    { id: 'short1', title: 'Вовочка vs Учительница 😂', views: '1.2М', bg: 'linear-gradient(135deg,#1a003580,#0a001580)', icon: '😂' },
    { id: 'short2', title: 'Школьный угар 24/7 💀', views: '980Т', bg: 'linear-gradient(135deg,#001a0080,#000a0080)', icon: '💀' },
    { id: 'short3', title: 'Чёрный юмор 🔥', views: '2.4М', bg: 'linear-gradient(135deg,#1a000080,#0a001580)', icon: '🔥' },
    { id: 'short4', title: 'Sora 2 прикол ❤️', views: '750Т', bg: 'linear-gradient(135deg,#0d001a80,#00001580)', icon: '❤️' },
    { id: 'short5', title: 'Вовочка vs Родители 🤯', views: '1.8М', bg: 'linear-gradient(135deg,#001a1a80,#000a0080)', icon: '🤯' },
    { id: 'short6', title: 'Мем уровня 💥', views: '3.1М', bg: 'linear-gradient(135deg,#0a001580,#1a003580)', icon: '💥' },
    { id: 'short7', title: 'Классный угар 🎓', views: '620Т', bg: 'linear-gradient(135deg,#00001580,#0d001a80)', icon: '🎓' },
    { id: 'short8', title: 'Кручешь? 👿', views: '890Т', bg: 'linear-gradient(135deg,#1a003580,#001a0080)', icon: '👿' },
    { id: 'short9', title: 'Подписывайся! ⚡', views: '5М+', bg: 'linear-gradient(135deg,#0a001580,#00001580)', icon: '⚡' },
];

function loadYouTubeData() {
    renderMockShorts();
}

function renderMockShorts() {
    const grid = document.querySelector('.shorts-grid');
    if (!grid) return;
    const delays = [50, 100, 150, 200, 250, 300, 350, 400, 450];
    grid.innerHTML = MOCK_SHORTS.map((s, i) => `
        <div class="short-card" data-video-id="${s.id}" data-aos="zoom-in" data-aos-delay="${delays[i]}">
          <div class="short-thumb" style="background:${s.bg}">
            <div class="short-placeholder-art">
              <div class="sp-icon" style="font-size:3rem">${s.icon}</div>
              <div class="sp-text">${s.title}</div>
              <div class="sp-views">${s.views} просмотров</div>
            </div>
            <div class="short-play-icon">▶</div>
            <div class="short-glitch-overlay"></div>
            <div class="short-label">${s.title}</div>
          </div>
        </div>`).join('');
    grid.querySelectorAll('.short-card').forEach(card => {
        card.addEventListener('click', () => {
            playSound('click');
            window.open('https://www.youtube.com/@patronaxxx/shorts', '_blank');
        });
    });
    refreshAOS();
}

function truncate(str, max) {
    return str.length > max ? str.slice(0, max) + '…' : str;
}

/* ── Inline AOS via IntersectionObserver ───────────────────── */
function initAOS() {
    const els = document.querySelectorAll('[data-aos]');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
}

function refreshAOS() {
    const newEls = document.querySelectorAll('[data-aos]:not(.aos-animate)');
    if (!newEls.length) return;
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    newEls.forEach(el => obs.observe(el));
}

/* ─── INIT ──────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

    // Load real YouTube data (async, non-blocking)
    loadYouTubeData();

    initSplash();
    initCursor();
    initParticles();
    initNavbar();
    initTicker();
    initParallax();
    initCountdown();
    initGame();
    initWheel();
    initGenerator();
    initMemeGallery();
    initStatsCounter();
    initScrollTop();
    initCornerVovochka();
    initVovochkaWink();
    initHoverSounds();

    // Inline AOS (no CDN)
    initAOS();

    // Safety fallback: ensure all AOS elements are visible after 3s
    setTimeout(() => {
        document.querySelectorAll('[data-aos]:not(.aos-animate)').forEach(el => {
            el.classList.add('aos-animate');
        });
    }, 3000);

    // All short-cards → YouTube Shorts
    document.querySelectorAll('.short-card').forEach(card => {
        card.addEventListener('click', () => {
            playSound('click');
            window.open('https://www.youtube.com/@patronaxxx/shorts', '_blank');
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
    });
});

/* ═══════════════════════════════════════════════════════════════
   SPLASH SCREEN
   ═══════════════════════════════════════════════════════════════ */
function initSplash() {
    const splash = document.getElementById('splash');
    if (!splash) return;

    // Hide after animation completes (~2.2s)
    setTimeout(() => {
        splash.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 2200);

    document.body.style.overflow = 'hidden';
}

/* ═══════════════════════════════════════════════════════════════
   CUSTOM CURSOR
   ═══════════════════════════════════════════════════════════════ */
function initCursor() {
    const cursor = document.getElementById('cursor');
    const trail = document.getElementById('cursor-trail');
    if (!cursor || !trail) return;

    let tx = 0, ty = 0, lx = 0, ly = 0;

    document.addEventListener('mousemove', e => {
        tx = e.clientX; ty = e.clientY;
        cursor.style.left = tx + 'px';
        cursor.style.top = ty + 'px';
    });

    function animTrail() {
        lx += (tx - lx) * 0.15;
        ly += (ty - ly) * 0.15;
        trail.style.left = lx + 'px';
        trail.style.top = ly + 'px';
        requestAnimationFrame(animTrail);
    }
    animTrail();

    // Scale on interactive elements
    const hovers = document.querySelectorAll('a, button, .short-card, .meme-card, .game-option, .corner-vovo');
    hovers.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(2.5)');
        el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; trail.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; trail.style.opacity = '0.7'; });
}

/* ═══════════════════════════════════════════════════════════════
   CANVAS PARTICLES
   ═══════════════════════════════════════════════════════════════ */
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    const COLORS = ['#C300FF', '#39FF14', '#FFFF00', '#8800BB', '#00FF8C'];
    const NUM = 90;

    const particles = Array.from({ length: NUM }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2 + 0.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.6 + 0.2
    }));

    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 8; ctx.shadowColor = p.color;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        });
        ctx.globalAlpha = 1; ctx.shadowBlur = 0;
        requestAnimationFrame(draw);
    }
    draw();

    window.addEventListener('resize', () => {
        W = window.innerWidth; H = window.innerHeight;
        canvas.width = W; canvas.height = H;
    });
}

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════════ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    if (burger) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            playSound('click');
        });
    }
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('open');
            mobileMenu.classList.remove('open');
        });
    });

    // Simulate live status randomly (for demo; replace with actual YouTube API check)
    // Randomly show "live" badge ~5% of the time for UI demo purposes
    if (Math.random() < 0.05) {
        const liveBadge = document.getElementById('nav-live');
        if (liveBadge) liveBadge.style.display = 'flex';
    }
}

/* ═══════════════════════════════════════════════════════════════
   TICKER
   ═══════════════════════════════════════════════════════════════ */
function initTicker() {
    const ticker = document.querySelector('.ticker-inner');
    if (!ticker) return;
    // Pause on hover
    ticker.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
    ticker.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
}

/* ═══════════════════════════════════════════════════════════════
   PARALLAX
   ═══════════════════════════════════════════════════════════════ */
function initParallax() {
    const heroContent = document.getElementById('hero-content');
    const crown = document.getElementById('parallax-crown');
    const title = document.getElementById('parallax-title');
    const vovo = document.getElementById('parallax-vovo');

    if (!heroContent) return;

    let ticking = false;
    document.addEventListener('mousemove', e => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const dx = (e.clientX - cx) / cx; // -1 to 1
            const dy = (e.clientY - cy) / cy;

            if (crown) crown.style.transform = `translate(${dx * -20}px, ${dy * -12}px) translateY(-8px)`;
            if (title) title.style.transform = `translate(${dx * -8}px, ${dy * -5}px)`;
            if (vovo) vovo.style.transform = `translate(${dx * 15}px, ${dy * 10}px)`;
            ticking = false;
        });
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
        if (crown) crown.style.transform = '';
        if (title) title.style.transform = '';
        if (vovo) vovo.style.transform = '';
    });
}

/* ═══════════════════════════════════════════════════════════════
   COUNTDOWN — next Short drops every day at 18:00
   ═══════════════════════════════════════════════════════════════ */
function initCountdown() {
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');
    if (!hoursEl) return;

    function update() {
        const now = new Date();
        // Target: next occurrence of 18:00 local time
        let target = new Date(now);
        target.setHours(18, 0, 0, 0);
        if (now >= target) target.setDate(target.getDate() + 1);

        const diff = target - now;
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);

        hoursEl.textContent = String(h).padStart(2, '0');
        minsEl.textContent = String(m).padStart(2, '0');
        secsEl.textContent = String(s).padStart(2, '0');
    }
    update();
    setInterval(update, 1000);
}

/* ═══════════════════════════════════════════════════════════════
   MINI GAME
   ═══════════════════════════════════════════════════════════════ */
const QUESTIONS = [
    { q: '— Учительница, а правда, что из ничего ничего не получается?', options: ['— Правда, Вовочка.', '— Правда. Именно поэтому я не жду твоих домашних заданий.', '— Нет, Вовочка, работай усерднее!'], answer: 1 },
    { q: '— Вовочка, почему ты опоздал?', options: ['— Я не опоздал, это класс ушёл вперёд.', '— Пробки, Мариванна.', '— Сломался будильник.'], answer: 0 },
    { q: '— Вовочка, назови примеры животных, обитающих в Африке.', options: ['— Слон и жираф.', '— Лев, зебра и учительница географии.', '— Крокодил.'], answer: 1 },
    { q: '— Вовочка, сколько будет семью восемь?', options: ['— Пятьдесят шесть.', '— Не уверен, но у меня нет на это времени.', '— Не знаю, это ваш предмет, а не мой.'], answer: 2 },
    { q: '— Вовочка, кем ты хочешь стать?', options: ['— Врачом.', '— Блогером с миллионом подписчиков.', '— Тем, у кого нет уроков.'], answer: 2 }
];

function initGame() {
    let qIndex = 0, score = 0, answered = false;
    const qEl = document.getElementById('game-question');
    const optsEl = document.getElementById('game-options');
    const fbEl = document.getElementById('game-feedback');
    const nextBtn = document.getElementById('game-next');
    const resultEl = document.getElementById('game-result');
    const scoreEl = document.getElementById('score');
    const qNumEl = document.getElementById('question-num');
    const bubble = document.getElementById('mascot-bubble');
    const restartBtn = document.getElementById('game-restart');
    if (!qEl) return;

    function loadQuestion() {
        if (qIndex >= QUESTIONS.length) { showResult(); return; }
        answered = false;
        const q = QUESTIONS[qIndex];
        qEl.textContent = q.q;
        qNumEl.textContent = qIndex + 1;
        if (bubble) bubble.textContent = '🤔';
        fbEl.style.display = 'none';
        nextBtn.style.display = 'none';
        optsEl.innerHTML = '';

        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'game-option';
            btn.textContent = opt;
            btn.addEventListener('click', () => selectAnswer(i, btn));
            optsEl.appendChild(btn);
        });
    }

    function selectAnswer(i, el) {
        if (answered) return;
        answered = true;
        playSound('click');
        const correct = QUESTIONS[qIndex].answer === i;

        document.querySelectorAll('.game-option').forEach((b, j) => {
            b.disabled = true;
            if (j === QUESTIONS[qIndex].answer) b.classList.add('correct');
            else if (j === i && !correct) b.classList.add('wrong');
        });

        fbEl.style.display = 'block';
        if (correct) {
            score += 20; scoreEl.textContent = score;
            scoreEl.style.animation = 'none';
            requestAnimationFrame(() => { scoreEl.style.animation = 'spin 0.5s ease-out'; });
            fbEl.textContent = ['✅ Правильно! Вовочка доволен!', '✅ Угар! Ты настоящий знаток!', '✅ 100% знаешь Вовочку!'][Math.floor(Math.random() * 3)];
            fbEl.className = 'game-feedback correct-fb';
            if (bubble) bubble.textContent = '😁';
            playSound('win');
        } else {
            fbEl.textContent = ['❌ Неверно! Вовочка разочарован.', '❌ Нет! Вовочка смотрит с укором.', '❌ Мимо! Учи анекдоты!'][Math.floor(Math.random() * 3)];
            fbEl.className = 'game-feedback wrong-fb';
            if (bubble) bubble.textContent = '😒';
            playSound('lose');
        }

        nextBtn.style.display = 'flex';
        qIndex++;
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { playSound('click'); loadQuestion(); });

    function showResult() {
        document.getElementById('game-question-wrap').style.display = 'none';
        optsEl.style.display = 'none';
        fbEl.style.display = 'none';
        nextBtn.style.display = 'none';
        resultEl.style.display = 'block';

        const emojiEl = document.getElementById('result-emoji');
        const titleEl = document.getElementById('result-title');
        const scoreResultEl = document.getElementById('result-score');

        if (score === 100) {
            emojiEl.textContent = '🏆'; titleEl.textContent = 'ЛЕГЕНДА УГАРА!';
            titleEl.style.color = 'var(--yellow)'; titleEl.style.textShadow = 'var(--glow-yellow)';
        } else if (score >= 60) {
            emojiEl.textContent = '😎'; titleEl.textContent = 'ЗНАТОК ВОВОЧКИ';
            titleEl.style.color = 'var(--green)';
        } else if (score >= 40) {
            emojiEl.textContent = '🤡'; titleEl.textContent = 'ПОЧТИ УГАРНУЛ';
            titleEl.style.color = 'var(--purple)';
        } else {
            emojiEl.textContent = '💀'; titleEl.textContent = 'ЕЩЁ УЧИТЬСЯ';
            titleEl.style.color = '#ff5555';
        }

        scoreResultEl.textContent = `Твой счёт: ${score} / 100`;
        const msg = `Набрал ${score}/100 в викторине "Угадай фразу Вовочки" на PATRONAXXX! Попробуй и ты 🎮 — https://youtube.com/@patronaxxx`;
        document.getElementById('share-x').href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(msg)}`;
        document.getElementById('share-vk').href = `https://vk.com/share.php?title=${encodeURIComponent(msg)}`;
        document.getElementById('share-tg').href = `https://t.me/share/url?url=https://youtube.com/@patronaxxx&text=${encodeURIComponent(msg)}`;
        playSound('win');
    }

    if (restartBtn) restartBtn.addEventListener('click', () => {
        qIndex = 0; score = 0;
        scoreEl.textContent = '0';
        resultEl.style.display = 'none';
        document.getElementById('game-question-wrap').style.display = '';
        optsEl.style.display = '';
        playSound('click');
        loadQuestion();
    });

    loadQuestion();
}

/* ═══════════════════════════════════════════════════════════════
   WHEEL OF FATE
   ═══════════════════════════════════════════════════════════════ */
const WHEEL_SEGMENTS = [
    { label: 'VOVOCHKA', icon: '😈', color: '#C300FF', title: 'Вовочка Классика', desc: 'Отборные анекдоты про Вовочку и учительницу' },
    { label: 'SORA 2', icon: '🤖', color: '#39FF14', title: 'Sora 2 AI Угар', desc: 'Безумные ролики с Sora 2 Generation!' },
    { label: 'ШКОЛА', icon: '💀', color: '#FFFF00', title: 'Школьный Апокалипсис', desc: 'Когда учёба — это настоящий кошмар' },
    { label: 'AI МЕМ', icon: '🎭', color: '#FF3366', title: 'AI Мемы 2026', desc: 'Самые свежие мемы от AI Вовочки' },
    { label: 'УГАР 24/7', icon: '🔥', color: '#FF6600', title: 'Угар без остановок', desc: 'Нон-стоп веселье для настоящих ценителей' },
    { label: 'RANDOM', icon: '🎲', color: '#00CCFF', title: 'Сюрприз от Вовочки!', desc: 'Вовочка сам выбрал для тебя кое-что крутое' },
];

function initWheel() {
    const canvas = document.getElementById('wheel-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const spinBtn = document.getElementById('wheel-spin-btn');
    const resultBox = document.getElementById('wheel-result-box');
    const resultIcon = document.getElementById('wheel-result-icon');
    const resultTitle = document.getElementById('wheel-result-title');
    const resultDesc = document.getElementById('wheel-result-desc');
    const resultBtn = document.getElementById('wheel-result-btn');

    const N = WHEEL_SEGMENTS.length;
    const arc = (Math.PI * 2) / N;
    let currentAngle = 0;
    let spinning = false;

    function drawWheel(angle) {
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const r = Math.min(cx, cy) - 8;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Outer glow ring
        const grd = ctx.createRadialGradient(cx, cy, r - 4, cx, cy, r + 4);
        grd.addColorStop(0, 'rgba(195,0,255,0.5)');
        grd.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(cx, cy, r + 4, 0, Math.PI * 2);
        ctx.strokeStyle = grd; ctx.lineWidth = 8; ctx.stroke();

        WHEEL_SEGMENTS.forEach((seg, i) => {
            const startA = angle + i * arc;
            const endA = startA + arc;

            // Segment fill
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, r, startA, endA);
            ctx.closePath();
            ctx.fillStyle = seg.color + '33'; // semi-transparent
            ctx.fill();
            ctx.strokeStyle = seg.color + '99';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Label + icon
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(startA + arc / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#fff';
            ctx.shadowColor = seg.color;
            ctx.shadowBlur = 12;
            ctx.font = 'bold 11px Montserrat, sans-serif';
            ctx.fillText(seg.label, r - 14, 4);
            ctx.font = '16px serif';
            ctx.fillText(seg.icon, r - 70, 5);
            ctx.restore();
        });

        // Center circle
        ctx.beginPath();
        ctx.arc(cx, cy, 24, 0, Math.PI * 2);
        const cGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 24);
        cGrad.addColorStop(0, '#C300FF'); cGrad.addColorStop(1, '#5500aa');
        ctx.fillStyle = cGrad;
        ctx.shadowColor = '#C300FF'; ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Center text
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 10px Montserrat, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('XXX', cx, cy + 4);
    }

    drawWheel(currentAngle);

    function spin() {
        if (spinning) return;
        spinning = true;
        spinBtn.disabled = true;
        resultBox.classList.remove('active');
        playSound('click');

        const rounds = 6 + Math.floor(Math.random() * 6); // 6-12 full rounds
        const extra = Math.random() * Math.PI * 2;
        const total = (Math.PI * 2 * rounds + extra);
        const duration = 4000 + Math.random() * 2000;
        const start = performance.now();
        const startA = currentAngle;

        function easeOut(t) { return 1 - Math.pow(1 - t, 4); }

        function frame(now) {
            const elapsed = now - start;
            const t = Math.min(elapsed / duration, 1);
            currentAngle = startA + total * easeOut(t);
            drawWheel(currentAngle);

            if (t < 1) { requestAnimationFrame(frame); }
            else {
                spinning = false;
                spinBtn.disabled = false;
                // Determine result: pointer at top (angle = 0 → -PI/2 from center)
                const norm = ((Math.PI * 2) - (currentAngle % (Math.PI * 2))) % (Math.PI * 2);
                const idx = Math.floor(norm / arc) % N;
                const seg = WHEEL_SEGMENTS[idx];

                resultIcon.textContent = seg.icon;
                resultTitle.textContent = seg.title;
                resultDesc.textContent = seg.desc;
                resultBtn.href = 'https://www.youtube.com/@patronaxxx/shorts';
                resultBtn.style.display = 'inline-flex';
                resultBox.classList.add('active');
                playSound('win');
            }
        }
        requestAnimationFrame(frame);
    }

    if (spinBtn) spinBtn.addEventListener('click', spin);
    canvas.addEventListener('click', spin);
}

/* ═══════════════════════════════════════════════════════════════
   JOKE GENERATOR
   ═══════════════════════════════════════════════════════════════ */
const BEGINNINGS = [
    'Вовочка пришёл в школу и увидел учителя...',
    'Мариванна спросила Вовочку...',
    'Вовочка зашёл в директора и...',
    'На уроке математики Вовочка вдруг...',
];

const ENDINGS = [
    '— А Вовочка поднял руку: «Мариванна, это не я — это ваш аккаунт в ТикТоке!»',
    '— Вовочка спокойно достал телефон и поставил лайк. «Это, — сказал он, — называется сочувствие.»',
    '— «Вы не то думаете», — сказал Вовочка. И оказался прав.',
    '— Вовочка ответил: «Я тут самый честный, ведь остальные врут, что не списывают».',
    '— «Ну, — протянул Вовочка, — Sora 2 тоже так делает. И у неё уже 10 миллионов.»',
    '— Вовочка закрыл тетрадь: «Всё, тест сдан. AI сдал за меня».»',
    '— «Это не я виноват, — объяснил Вовочка. — Это алгоритм YouTube так решил».',
    '— Вовочка почесал голову: «Значит, ЕГЭ — это тоже мем? Понял».',
    '— На что Вовочка лишь поднял телефон и показал: у него уже 500K подписчиков.',
    '— «Честно говоря, — сказал Вовочка, — я видел этот ответ в Reels три минуты назад».',
    '— Вовочка прошептал: «Это не урок. Это подготовка к мему».',
    '— И тут Вовочка включил Sora 2. Весь класс молчал полчаса.',
];

function initGenerator() {
    const genBtn = document.getElementById('gen-btn');
    const genInput = document.getElementById('gen-input');
    const genOutput = document.getElementById('gen-output');
    const genText = document.getElementById('gen-result-text');
    const genBtns = document.getElementById('gen-output-btns');
    const genThink = document.getElementById('gen-thinking');
    const genCount = document.getElementById('gen-count');
    const genCopy = document.getElementById('gen-copy');
    if (!genBtn) return;

    if (genInput && genCount) {
        genInput.addEventListener('input', () => { genCount.textContent = genInput.value.length; });
    }

    genBtn.addEventListener('click', () => {
        const beginning = (genInput.value.trim() || BEGINNINGS[Math.floor(Math.random() * BEGINNINGS.length)]);
        const ending = ENDINGS[Math.floor(Math.random() * ENDINGS.length)];
        const full = beginning + '\n\n' + ending;

        playSound('click');
        genOutput.style.display = 'block';
        genText.textContent = '';
        genBtns.style.display = 'none';
        genThink.style.display = 'flex';

        setTimeout(() => {
            genThink.style.display = 'none';
            let i = 0;
            function type() {
                if (i < full.length) {
                    genText.textContent += full[i]; i++;
                    setTimeout(type, 20 + Math.random() * 15);
                } else {
                    genBtns.style.display = 'flex';
                    const msg = encodeURIComponent('😈 Анекдот от Вовочки:\n' + full + '\n\nСмотри ещё: https://youtube.com/@patronaxxx');
                    document.getElementById('gen-share-tg').href = `https://t.me/share/url?url=https://youtube.com/@patronaxxx&text=${msg}`;
                    document.getElementById('gen-share-x').href = `https://twitter.com/intent/tweet?text=${msg}`;
                }
            }
            type();
        }, 1000);
    });

    if (genCopy) {
        genCopy.addEventListener('click', () => {
            navigator.clipboard.writeText(genText.textContent).then(() => {
                genCopy.textContent = '✅ Скопировано!';
                setTimeout(() => { genCopy.textContent = '📋 Копировать'; }, 2000);
            });
            playSound('click');
        });
    }
}

/* ═══════════════════════════════════════════════════════════════
   MEME GALLERY + LIGHTBOX
   ═══════════════════════════════════════════════════════════════ */
function initMemeGallery() {
    const lightbox = document.getElementById('lightbox');
    const lbClose = document.getElementById('lightbox-close');
    const lbArt = document.getElementById('lightbox-art');
    const lbTitle = document.getElementById('lightbox-title');
    const lbShareTg = document.getElementById('lb-share-tg');
    const lbShareX = document.getElementById('lb-share-x');
    const lbCopy = document.getElementById('lb-copy');

    document.querySelectorAll('.meme-card').forEach(card => {
        const btn = card.querySelector('.meme-btn-view');
        function open() {
            const art = card.querySelector('.meme-art').cloneNode(true);
            lbArt.innerHTML = ''; lbArt.appendChild(art);
            const title = card.dataset.title || 'Мем от PATRONAXXX';
            lbTitle.textContent = title;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            const msg = encodeURIComponent(`😈 ${title} — PATRONAXXX: https://youtube.com/@patronaxxx`);
            lbShareTg.href = `https://t.me/share/url?url=https://youtube.com/@patronaxxx&text=${msg}`;
            lbShareX.href = `https://twitter.com/intent/tweet?text=${msg}`;
            playSound('click');
        }
        if (btn) btn.addEventListener('click', open);
        card.addEventListener('click', open);
    });

    function closeLb() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }
    if (lbClose) lbClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox.style.display !== 'none') closeLb(); });

    if (lbCopy) {
        lbCopy.addEventListener('click', () => {
            navigator.clipboard.writeText('https://youtube.com/@patronaxxx');
            lbCopy.textContent = '✅ Скопировано!';
            setTimeout(() => { lbCopy.textContent = '📋 Поделиться ссылкой'; }, 2000);
            playSound('click');
        });
    }
}

/* ═══════════════════════════════════════════════════════════════
   STATS COUNTER
   ═══════════════════════════════════════════════════════════════ */
function formatNum(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return Math.round(n / 1000) + 'K';
    return String(n);
}

function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000, step = 16;
    const steps = duration / step;
    let current = 0;
    const increment = target / steps;
    const iv = setInterval(() => {
        current += increment;
        if (current >= target) { current = target; clearInterval(iv); }
        el.textContent = formatNum(Math.round(current));
    }, step);
}

function initStatsCounter() {
    const counters = document.querySelectorAll('.stat-num[data-target]');
    if (!counters.length) return;
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { animateCounter(entry.target); obs.unobserve(entry.target); }
        });
    }, { threshold: 0.5 });
    counters.forEach(el => obs.observe(el));
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL TO TOP
   ═══════════════════════════════════════════════════════════════ */
function initScrollTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) btn.classList.add('visible');
        else btn.classList.remove('visible');
    });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        playSound('click');
    });
}

/* ═══════════════════════════════════════════════════════════════
   CORNER VOVOCHKA — reacts to scroll
   ═══════════════════════════════════════════════════════════════ */
const SECTION_REACTIONS = {
    hero: { face: '😈', bubble: 'Начинаем угар!' },
    shorts: { face: '📱', bubble: 'Смотри Shorts!' },
    game: { face: '🤔', bubble: 'Угадаешь фразу?' },
    wheel: { face: '🎡', bubble: 'Крути колесо!' },
    generator: { face: '🤖', bubble: 'Придумаем анекдот?' },
    comments: { face: '💬', bubble: 'Смешные комменты!' },
    memes: { face: '🃏', bubble: 'Мемы, мемы, мемы!' },
    about: { face: '👑', bubble: 'Подпишись?' },
    footer: { face: '💜', bubble: 'Спасибо за угар!' },
};

function initCornerVovochka() {
    const vovo = document.getElementById('corner-vovo');
    const face = document.getElementById('corner-vovo-face');
    const bubble = document.getElementById('corner-vovo-bubble');
    if (!vovo) return;

    // Click: random phrase
    const PHRASES = ['Знаешь чё?😂', 'Подписался?🔔', 'Угар 24/7!🔥', 'Лайк поставь!👍', 'Вовочка правит!😈'];
    vovo.addEventListener('click', () => {
        bubble.textContent = PHRASES[Math.floor(Math.random() * PHRASES.length)];
        bubble.classList.add('visible');
        setTimeout(() => bubble.classList.remove('visible'), 2000);
        playSound('click');
    });

    // Scroll reaction
    const sections = Object.keys(SECTION_REACTIONS);
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + window.innerHeight * 0.4;
        for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i]);
            if (el && el.offsetTop <= scrollY) {
                const r = SECTION_REACTIONS[sections[i]];
                face.textContent = r.face;
                bubble.textContent = r.bubble;
                break;
            }
        }
    }, { passive: true });

    // Show bubble occasionally
    setInterval(() => {
        bubble.classList.add('visible');
        setTimeout(() => bubble.classList.remove('visible'), 2500);
    }, 8000);
}

/* ═══════════════════════════════════════════════════════════════
   VOVOCHKA WINK
   ═══════════════════════════════════════════════════════════════ */
function initVovochkaWink() {
    const open = document.getElementById('eye-right-open');
    const wink = document.getElementById('eye-right-wink');
    const vovo = document.getElementById('vovochka');
    if (!open || !wink) return;

    function doWink() {
        open.style.display = 'none'; wink.style.display = 'block';
        setTimeout(() => { open.style.display = 'block'; wink.style.display = 'none'; }, 180);
    }

    // Random wink
    function scheduleWink() { doWink(); setTimeout(scheduleWink, 5000 + Math.random() * 4000); }
    scheduleWink();

    // Click wink
    if (vovo) vovo.addEventListener('click', () => { doWink(); playSound('click'); });
}

/* ═══════════════════════════════════════════════════════════════
   SOUND EFFECTS
   ═══════════════════════════════════════════════════════════════ */
let audioCtx = null;
function getAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
}

function playSound(type) {
    try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);

        const now = ctx.currentTime;
        if (type === 'click') {
            osc.type = 'sine'; osc.frequency.setValueAtTime(520, now); osc.frequency.exponentialRampToValueAtTime(280, now + 0.08);
            gain.gain.setValueAtTime(0.05, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        } else if (type === 'win') {
            osc.type = 'triangle'; osc.frequency.setValueAtTime(440, now); osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);
            gain.gain.setValueAtTime(0.08, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        } else if (type === 'lose') {
            osc.type = 'sawtooth'; osc.frequency.setValueAtTime(300, now); osc.frequency.exponentialRampToValueAtTime(100, now + 0.25);
            gain.gain.setValueAtTime(0.06, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        } else if (type === 'hover') {
            osc.type = 'sine'; osc.frequency.setValueAtTime(660, now); osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
            gain.gain.setValueAtTime(0.02, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        }
        osc.start(now); osc.stop(now + 0.5);
    } catch (e) { /* Ignore audio errors */ }
}

/* ═══════════════════════════════════════════════════════════════
   HOVER SOUNDS on interactive elements
   ═══════════════════════════════════════════════════════════════ */
function initHoverSounds() {
    // Sound on all buttons and nav links
    document.querySelectorAll('.btn, nav .nav-links a').forEach(el => {
        el.addEventListener('mouseenter', () => playSound('hover'));
    });
    // Click sounds on all buttons
    document.querySelectorAll('.btn').forEach(el => {
        el.addEventListener('click', () => playSound('click'));
    });
}

/* ═══════════════════════════════════════════════════════════════
   SERVICE WORKER REGISTRATION (PWA)
   ═══════════════════════════════════════════════════════════════ */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => { /* no sw in local file mode */ });
    });
}
