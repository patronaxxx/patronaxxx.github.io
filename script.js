/* ══════════════════════════════════════════════════════════════
   PATRONAXXX — script.js
   Interactive features: particles, cursor, glitch, wink,
   mini-game, joke generator, meme lightbox, stats counter, AOS
   ══════════════════════════════════════════════════════════════ */

// ── Init AOS ────────────────────────────────────────────────────
AOS.init({ duration: 700, once: true, offset: 80, easing: 'ease-out-cubic' });

// ── Custom Cursor ────────────────────────────────────────────────
(function () {
    const cursor = document.getElementById('cursor');
    const trail = document.getElementById('cursor-trail');
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

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(1.6)';
    });
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    });

    // Enlarge on interactive elements
    document.querySelectorAll('a, button, .short-card, .meme-card, .game-option').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%,-50%) scale(2)';
            cursor.style.background = '#39FF14';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%,-50%) scale(1)';
            cursor.style.background = '#C300FF';
        });
    });
})();

// ── Particle Canvas ──────────────────────────────────────────────
(function () {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    window.addEventListener('resize', () => {
        W = window.innerWidth; H = window.innerHeight;
        canvas.width = W; canvas.height = H;
    });

    const COLORS = ['#C300FF', '#39FF14', '#FFFF00', '#ffffff'];
    const particles = Array.from({ length: 90 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2 + 0.4,
        dx: (Math.random() - 0.5) * 0.6,
        dy: (Math.random() - 0.5) * 0.6,
        alpha: Math.random() * 0.7 + 0.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        blink: Math.random() * Math.PI * 2
    }));

    function drawParticles() {
        ctx.clearRect(0, 0, W, H);
        const t = Date.now() * 0.001;
        particles.forEach(p => {
            p.x += p.dx; p.y += p.dy;
            if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
            const alpha = p.alpha * (0.6 + 0.4 * Math.sin(t * 1.5 + p.blink));
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = alpha;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 8;
            ctx.fill();
        });
        ctx.globalAlpha = 1;
        requestAnimationFrame(drawParticles);
    }
    drawParticles();
})();

// ── Navbar Scroll Shrink ─────────────────────────────────────────
(function () {
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    });
})();

// ── Burger / Mobile Menu ─────────────────────────────────────────
(function () {
    const burger = document.getElementById('burger');
    const mMenu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');

    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        mMenu.classList.toggle('open');
    });
    links.forEach(l => l.addEventListener('click', () => {
        burger.classList.remove('open');
        mMenu.classList.remove('open');
    }));
})();

// ── Smooth nav scroll ───────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ── Scroll to Top ───────────────────────────────────────────────
(function () {
    const btn = document.getElementById('scroll-top');
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 500);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ── Winking Vovochka ────────────────────────────────────────────
(function () {
    const eyeOpen = document.getElementById('eye-right-open');
    const eyeWink = document.getElementById('eye-right-wink');
    if (!eyeOpen || !eyeWink) return;

    function wink() {
        eyeOpen.style.display = 'none';
        eyeWink.style.display = 'block';
        setTimeout(() => {
            eyeOpen.style.display = 'block';
            eyeWink.style.display = 'none';
            // schedule next wink in 5–7 s
            setTimeout(wink, 5000 + Math.random() * 2000);
        }, 300);
    }
    setTimeout(wink, 3000);

    // Also wink on hover
    const wrap = document.getElementById('vovochka');
    if (wrap) wrap.addEventListener('click', wink);
})();

// ── Short card click → YouTube ───────────────────────────────────
document.querySelectorAll('.short-card').forEach(card => {
    card.addEventListener('click', () => {
        window.open('https://www.youtube.com/@patronaxxx/shorts', '_blank');
    });
});

// ══════════════════════════════════════════════════════════════
//  MINI-GAME "Угадай фразу Вовочки"
// ══════════════════════════════════════════════════════════════
(function () {
    const QUESTIONS = [
        {
            q: '— Учительница, а правда, что из ничего ничего не получается?',
            options: [
                '— Правда, Вовочка.',
                '— Правда. Именно поэтому я не жду твоих домашних заданий.',
                '— Нет, Вовочка, работай усерднее!'
            ],
            answer: 1
        },
        {
            q: '— Вовочка, назови три причины, почему тебе нравится математика.',
            options: [
                '— Мне нравится считать деньги, делить пирог и умножать веселье!',
                '— Во-первых, я её не понимаю. Во-вторых, она меня не понимает. В-третьих, мы квиты!',
                '— Геометрия, алгебра и тригонометрия.'
            ],
            answer: 1
        },
        {
            q: '— Вовочка, почему ты не сделал домашнее задание?',
            options: [
                '— Я потерял тетрадь.',
                '— Мне было скучно.',
                '— Решил дать учебнику отдохнуть — он и так много работает!'
            ],
            answer: 2
        },
        {
            q: '— Что такое оптимизм? — спрашивает учительница.',
            options: [
                '— Когда веришь в лучшее.',
                '— Надежда на хорошее будущее.',
                '— Это когда ставишь двойку и думаешь, что я расстроюсь. А я только рад!'
            ],
            answer: 2
        },
        {
            q: '— Вовочка, кем ты хочешь стать, когда вырастешь?',
            options: [
                '— Космонавтом!',
                '— Врачом.',
                '— Пенсионером — это единственная работа, где не нужно ничего делать!'
            ],
            answer: 2
        }
    ];

    let current = 0, score = 0, answered = false;

    const qWrap = document.getElementById('game-question-wrap');
    const qText = document.getElementById('game-question');
    const opts = document.getElementById('game-options');
    const feedback = document.getElementById('game-feedback');
    const nextBtn = document.getElementById('game-next');
    const result = document.getElementById('game-result');
    const scoreEl = document.getElementById('score');
    const qNumEl = document.getElementById('question-num');
    const bubble = document.getElementById('mascot-bubble');

    function renderQuestion() {
        const q = QUESTIONS[current];
        qText.textContent = q.q;
        qNumEl.textContent = current + 1;
        feedback.style.display = 'none';
        nextBtn.style.display = 'none';
        answered = false;
        bubble.textContent = '🤔';

        opts.innerHTML = '';
        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'game-option';
            btn.textContent = opt;
            btn.addEventListener('click', () => handleAnswer(i));
            opts.appendChild(btn);
        });
    }

    function handleAnswer(idx) {
        if (answered) return;
        answered = true;
        const q = QUESTIONS[current];
        const allOpts = opts.querySelectorAll('.game-option');

        allOpts[q.answer].classList.add('correct');
        if (idx !== q.answer) {
            allOpts[idx].classList.add('wrong');
            feedback.textContent = '❌ Неправильно! Вовочка в шоке...';
            feedback.className = 'game-feedback wrong-fb';
            bubble.textContent = '😤';
        } else {
            score++;
            scoreEl.textContent = score;
            feedback.textContent = '✅ Правильно! Ты знаешь Вовочку как себя!';
            feedback.className = 'game-feedback correct-fb';
            bubble.textContent = '😍';
        }
        feedback.style.display = 'block';
        nextBtn.style.display = 'block';
    }

    nextBtn.addEventListener('click', () => {
        current++;
        if (current >= QUESTIONS.length) {
            showResult();
        } else {
            renderQuestion();
        }
    });

    function showResult() {
        qWrap.style.display = 'none';
        opts.style.display = 'none';
        feedback.style.display = 'none';
        nextBtn.style.display = 'none';
        result.style.display = 'block';

        const pct = score / QUESTIONS.length;
        let emoji, title;
        if (pct === 1) { emoji = '🏆'; title = 'ЛЕГЕНДА УГАРА!'; }
        else if (pct >= 0.6) { emoji = '🔥'; title = 'Почти Вовочка!'; }
        else if (pct >= 0.4) { emoji = '😐'; title = 'Учись у Вовочки...'; }
        else { emoji = '💀'; title = 'Ты не знаешь Вовочку!'; }

        document.getElementById('result-emoji').textContent = emoji;
        document.getElementById('result-title').textContent = title;
        document.getElementById('result-score').textContent =
            `Очки: ${score} из ${QUESTIONS.length}`;

        const text = encodeURIComponent(
            `Я набрал ${score}/${QUESTIONS.length} в игре "Угадай фразу Вовочки" на PATRONAXXX! 😈 https://www.youtube.com/@patronaxxx`
        );
        document.getElementById('share-x').href =
            `https://twitter.com/intent/tweet?text=${text}`;
        document.getElementById('share-vk').href =
            `https://vk.com/share.php?title=${text}`;
        document.getElementById('share-tg').href =
            `https://t.me/share/url?url=https://www.youtube.com/@patronaxxx&text=${text}`;

        bubble.textContent = pct === 1 ? '🤩' : '😏';
    }

    document.getElementById('game-restart').addEventListener('click', () => {
        current = 0; score = 0;
        scoreEl.textContent = '0';
        qWrap.style.display = 'block';
        opts.style.display = 'flex';
        result.style.display = 'none';
        renderQuestion();
    });

    renderQuestion();
})();

// ══════════════════════════════════════════════════════════════
//  JOKE GENERATOR
// ══════════════════════════════════════════════════════════════
(function () {
    const ENDINGS = [
        "— А Вовочка поднял руку: «Мариванна, это не я — это ваш аккаунт в ТикТоке!»",
        "— Вовочка спокойно достал телефон и поставил лайк. «Это, — сказал он, — называется сочувствие.»",
        "— Директор побледнел. Вовочка только пожал плечами: «Я думал, это интерактивный урок.»",
        "— Учительница упала в обморок. Вовочка записал это в телефон: «Контент сам себя не снимет.»",
        "— Весь класс замер. Вовочка встал и вышел. На доске осталось: «PATRONAXXX — подписывайтесь.»",
        "— Вовочка улыбнулся: «Мариванна, я просто запустил Sora 2 — она сама всё придумала.»",
        "— Родители на собрании переглянулись. «Это гений», — прошептала мама. «Или конец света», — добавил папа.",
        "— Вовочка поправил кепку: «Ошибаетесь, это не хаос. Это искусство.»",
        "— «Двойку ставь», — сказал Вовочка, — «но подписку не трогай.»",
        "— Класс взорвался смехом. Вовочка снял это на телефон: «Ещё один Shorts готов!»"
    ];

    const starters = [
        "Учительница сказала классу:",
        "Вовочка пришёл в школу и обнаружил,",
        "На уроке математики",
        "Директор вызвал родителей потому что",
        "Когда начался экзамен, Вовочка",
        "На уроке биологии учительница спросила"
    ];

    const genBtn = document.getElementById('gen-btn');
    const genInput = document.getElementById('gen-input');
    const genOutput = document.getElementById('gen-output');
    const genThink = document.getElementById('gen-thinking');
    const genText = document.getElementById('gen-result-text');
    const genBtns = document.getElementById('gen-output-btns');
    const genCount = document.getElementById('gen-count');
    const genCopy = document.getElementById('gen-copy');

    genInput.addEventListener('input', () => {
        genCount.textContent = genInput.value.length;
    });

    // Random placeholder typing effect
    let pIdx = 0;
    function rotatePlaceholder() {
        genInput.placeholder = starters[pIdx % starters.length] + '...';
        pIdx++;
    }
    rotatePlaceholder();
    setInterval(rotatePlaceholder, 4000);

    genBtn.addEventListener('click', () => {
        const userText = genInput.value.trim();
        const start = userText || starters[Math.floor(Math.random() * starters.length)];

        genOutput.style.display = 'block';
        genThink.style.display = 'flex';
        genText.textContent = '';
        genBtns.style.display = 'none';

        // Simulate generation delay
        const delay = 1200 + Math.random() * 800;
        setTimeout(() => {
            const ending = ENDINGS[Math.floor(Math.random() * ENDINGS.length)];
            const joke = start.endsWith('...') || start.endsWith('…')
                ? start.slice(0, -3) + ' ' + ending
                : start + '\n\n' + ending;

            genThink.style.display = 'none';
            typeText(genText, joke, 18, () => {
                genBtns.style.display = 'flex';

                const shareText = encodeURIComponent(joke + '\n\nhttps://www.youtube.com/@patronaxxx');
                document.getElementById('gen-share-tg').href =
                    `https://t.me/share/url?url=https://www.youtube.com/@patronaxxx&text=${shareText}`;
                document.getElementById('gen-share-x').href =
                    `https://twitter.com/intent/tweet?text=${shareText}`;
            });
        }, delay);
    });

    genCopy.addEventListener('click', () => {
        navigator.clipboard.writeText(genText.textContent).then(() => {
            const orig = genCopy.textContent;
            genCopy.textContent = '✅ Скопировано!';
            setTimeout(() => genCopy.textContent = orig, 2000);
        });
    });

    function typeText(el, text, speed, cb) {
        el.textContent = '';
        let i = 0;
        const iv = setInterval(() => {
            el.textContent += text[i++];
            if (i >= text.length) {
                clearInterval(iv);
                if (cb) cb();
            }
        }, speed);
    }
})();

// ══════════════════════════════════════════════════════════════
//  MEME GALLERY LIGHTBOX
// ══════════════════════════════════════════════════════════════
(function () {
    const lightbox = document.getElementById('lightbox');
    const lbArt = document.getElementById('lightbox-art');
    const lbTitle = document.getElementById('lightbox-title');
    const lbClose = document.getElementById('lightbox-close');
    const lbCopy = document.getElementById('lb-copy');
    const lbShareTg = document.getElementById('lb-share-tg');
    const lbShareX = document.getElementById('lb-share-x');

    document.querySelectorAll('.meme-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.dataset.title || 'Мем';
            const artEl = card.querySelector('.meme-art');
            lbArt.style.cssText = artEl ? artEl.style.cssText : '';
            lbArt.className = 'lightbox-art ' + (artEl ? artEl.className.replace('meme-art', '') : '');
            lbArt.innerHTML = artEl ? artEl.innerHTML : '<span>🃏</span>';
            lbTitle.textContent = title;

            const shareText = encodeURIComponent(
                `${title} — PATRONAXXX Мемы! https://www.youtube.com/@patronaxxx`
            );
            lbShareTg.href = `https://t.me/share/url?url=https://www.youtube.com/@patronaxxx&text=${shareText}`;
            lbShareX.href = `https://twitter.com/intent/tweet?text=${shareText}`;

            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLb() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }

    lbClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) closeLb();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeLb();
    });

    lbCopy.addEventListener('click', () => {
        const url = 'https://www.youtube.com/@patronaxxx';
        navigator.clipboard.writeText(url).then(() => {
            const orig = lbCopy.textContent;
            lbCopy.textContent = '✅ Ссылка скопирована!';
            setTimeout(() => lbCopy.textContent = orig, 2000);
        });
    });
})();

// ══════════════════════════════════════════════════════════════
//  ANIMATED STATS COUNTER
// ══════════════════════════════════════════════════════════════
(function () {
    function formatNum(n) {
        if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
        if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K';
        return n.toString();
    }

    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        const duration = 2000;
        const step = 16;
        const steps = duration / step;
        let current = 0;
        const increment = target / steps;

        const iv = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(iv);
            }
            el.textContent = formatNum(Math.round(current));
        }, step);
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-num[data-target]').forEach(el => observer.observe(el));
})();

// ══════════════════════════════════════════════════════════════
//  SHORT CARDS — Shorts link clicks
// ══════════════════════════════════════════════════════════════
// Already handled above via the '.short-card' click handler
// (No YouTube embeds since they require a real channel playlist)

// ══════════════════════════════════════════════════════════════
//  HERO GLITCH FLASH (random micro-glitch)
// ══════════════════════════════════════════════════════════════
(function () {
    const title = document.querySelector('.hero-title.glitch');
    if (!title) return;

    function triggerFlash() {
        title.style.transform = `translateX(${(Math.random() - 0.5) * 8}px) skewX(${(Math.random() - 0.5) * 4}deg)`;
        setTimeout(() => {
            title.style.transform = '';
        }, 80 + Math.random() * 80);
        setTimeout(triggerFlash, 3000 + Math.random() * 5000);
    }
    setTimeout(triggerFlash, 2000);
})();

// ══════════════════════════════════════════════════════════════
//  CLICK SOUND EASTER EGG (subtle neon click sound via Web Audio)
// ══════════════════════════════════════════════════════════════
(function () {
    let ctx;
    function playSfx(freq = 440, type = 'sine', duration = 0.09) {
        try {
            if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(freq * 0.4, ctx.currentTime + duration);
            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + duration);
        } catch (_) { }
    }

    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => playSfx(880, 'square', 0.07));
    });

    document.querySelectorAll('.game-option').forEach(opt => {
        opt.addEventListener('click', () => playSfx(660, 'sine', 0.1));
    });
})();

// ══════════════════════════════════════════════════════════════
//  NEON DIVIDERS injection between sections
// ══════════════════════════════════════════════════════════════
(function () {
    const sections = document.querySelectorAll('.section, #about, #footer');
    sections.forEach(sec => {
        const div = document.createElement('div');
        div.className = 'neon-divider';
        sec.parentNode.insertBefore(div, sec);
    });
})();
