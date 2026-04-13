/* ========================================
   KARTHICK PORTFOLIO — VANILLA JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ========== Custom Cursor ==========
    const cursor = document.getElementById('cursor');
    const cursorTrail = document.getElementById('cursor-trail');
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth trail following
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.15;
        trailY += (mouseY - trailY) * 0.15;
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .skill-tag, .project-card, .achievement-card, .contact-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // ========== Navbar Scroll ==========
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }

        // Active section highlight
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ========== Mobile Menu ==========
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // ========== Sana Floating Voice Module ==========
    const sanaBtn = document.getElementById('sana-voice-btn');
    const sanaAudio = document.getElementById('sana-audio');
    const sanaPlayIcon = document.getElementById('sana-play-icon');
    const sanaPauseIcon = document.getElementById('sana-pause-icon');
    const sanaWave = document.getElementById('sana-wave');
    const sanaPanel = document.getElementById('sana-player-panel');
    const sanaPlayPause = document.getElementById('sana-play-pause');
    const sanaStatus = document.getElementById('sana-status-text');
    let isPlaying = false;
    let panelOpen = false;

    // Toggle panel on avatar click
    sanaBtn.addEventListener('click', () => {
        panelOpen = !panelOpen;
        if (panelOpen) {
            sanaPanel.classList.remove('hidden');
        } else {
            sanaPanel.classList.add('hidden');
        }
    });

    // Play/Pause inside the panel
    sanaPlayPause.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isPlaying) {
            sanaAudio.pause();
            sanaPlayIcon.classList.remove('hidden');
            sanaPauseIcon.classList.add('hidden');
            sanaWave.classList.remove('active');
            sanaBtn.classList.remove('playing');
            sanaStatus.textContent = 'Paused';
            isPlaying = false;
        } else {
            sanaAudio.play();
            sanaPlayIcon.classList.add('hidden');
            sanaPauseIcon.classList.remove('hidden');
            sanaWave.classList.add('active');
            sanaBtn.classList.add('playing');
            sanaStatus.textContent = 'Playing voice...';
            isPlaying = true;
        }
    });

    sanaAudio.addEventListener('ended', () => {
        sanaPlayIcon.classList.remove('hidden');
        sanaPauseIcon.classList.add('hidden');
        sanaWave.classList.remove('active');
        sanaBtn.classList.remove('playing');
        sanaStatus.textContent = 'Click to play again';
        isPlaying = false;
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        const module = document.getElementById('sana-voice-module');
        if (panelOpen && !module.contains(e.target)) {
            panelOpen = false;
            sanaPanel.classList.add('hidden');
        }
    });

    // ========== Typewriter Effect ==========
    const typewriterEl = document.getElementById('typewriter');
    const phrases = [
        '"Artificial Intelligence"',
        '"Backend Systems"',
        '"Python & FastAPI"',
        '"Tool-Based AI Agents"',
        '"Retrieval Augmented Generation"',
        '"System Automation"',
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(typeWriter, typeSpeed);
    }

    typeWriter();

    // ========== Particles ==========
    const particlesContainer = document.getElementById('particles-container');

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const x = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 5;
        const colors = ['rgba(168,85,247,0.4)', 'rgba(99,102,241,0.3)', 'rgba(34,211,238,0.3)', 'rgba(245,158,11,0.2)'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
            left: ${x}%;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;

        particlesContainer.appendChild(particle);

        // Clean up after animation
        setTimeout(() => {
            particle.remove();
            createParticle();
        }, (duration + delay) * 1000);
    }

    // Create initial particles
    for (let i = 0; i < 30; i++) {
        setTimeout(() => createParticle(), i * 200);
    }

    // ========== Intersection Observer — Reveal on Scroll ==========
    const revealElements = document.querySelectorAll('.reveal-element');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Use the animation-delay from inline style if present
                const delay = entry.target.style.animationDelay;
                if (delay) {
                    const ms = parseFloat(delay) * 1000;
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, ms);
                } else {
                    entry.target.classList.add('revealed');
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========== Smooth Scroll for Anchor Links ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth',
                });
            }
        });
    });

    // ========== Parallax on Mouse Move (Hero Section) ==========
    const hero = document.getElementById('hero');

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        const heroGrid = hero.querySelector('.hero-grid');
        if (heroGrid) {
            heroGrid.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
        }
    });

    // ========== Skill Tag Tilt Effect ==========
    document.querySelectorAll('.skill-category-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ========== Achievement Card Glow Effect ==========
    document.querySelectorAll('.achievement-card, .project-card, .contact-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--glow-x', x + 'px');
            card.style.setProperty('--glow-y', y + 'px');
            card.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(168,85,247,0.04), transparent 40%), rgba(255,255,255,0.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = 'rgba(255,255,255,0.02)';
        });
    });

    // ========== Console Easter Egg ==========
    console.log(
        '%c🚀 Karthick\'s Portfolio',
        'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #a855f7, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'
    );
    console.log(
        '%cBuilding AI tools & backend systems — Let\'s connect!',
        'font-size: 14px; color: #888;'
    );
});
