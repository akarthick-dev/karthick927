/* =============================================
   KARTHICK A — EXPERIMENTAL PORTFOLIO ENGINE
   GSAP ScrollTrigger · Particle Systems · Motion
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // LOADER
    // ==========================================
    const loader = document.getElementById('loader');
    document.body.classList.add('loading');

    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loader) loader.classList.add('loaded');
            document.body.classList.remove('loading');
            initAnimations();
        }, 1600);
    });

    // Fallback if load takes too long
    setTimeout(() => {
        if (loader && !loader.classList.contains('loaded')) {
            loader.classList.add('loaded');
            document.body.classList.remove('loading');
            initAnimations();
        }
    }, 4000);

    // ==========================================
    // NAVBAR
    // ==========================================
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleNavScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link tracking
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // ==========================================
    // MOBILE MENU
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('open');
            if (isOpen) {
                mobileMenu.classList.remove('open');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            } else {
                mobileMenu.classList.add('open');
                mobileToggle.classList.add('active');
                mobileToggle.setAttribute('aria-expanded', 'true');
                mobileMenu.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }
        });

        document.querySelectorAll('.mobile-link, .mobile-resume-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================
    // SMOOTH SCROLL
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offset = target.offsetTop - 80;
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // SANA VOICE MODULE
    // ==========================================
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

    if (sanaBtn && sanaPanel) {
        sanaBtn.addEventListener('click', () => {
            panelOpen = !panelOpen;
            if (panelOpen) {
                sanaPanel.classList.remove('hidden');
            } else {
                sanaPanel.classList.add('hidden');
            }
        });

        if (sanaPlayPause && sanaAudio) {
            sanaPlayPause.addEventListener('click', (e) => {
                e.stopPropagation();
                if (isPlaying) {
                    sanaAudio.pause();
                    sanaPlayIcon.classList.remove('hidden');
                    sanaPauseIcon.classList.add('hidden');
                    sanaWave.classList.remove('active');
                    sanaStatus.textContent = 'Paused';
                    isPlaying = false;
                } else {
                    sanaAudio.play();
                    sanaPlayIcon.classList.add('hidden');
                    sanaPauseIcon.classList.remove('hidden');
                    sanaWave.classList.add('active');
                    sanaStatus.textContent = 'Playing voice...';
                    isPlaying = true;
                }
            });

            sanaAudio.addEventListener('ended', () => {
                sanaPlayIcon.classList.remove('hidden');
                sanaPauseIcon.classList.add('hidden');
                sanaWave.classList.remove('active');
                sanaStatus.textContent = 'Click to play again';
                isPlaying = false;
            });
        }

        document.addEventListener('click', (e) => {
            const module = document.getElementById('sana-voice-module');
            if (panelOpen && module && !module.contains(e.target)) {
                panelOpen = false;
                sanaPanel.classList.add('hidden');
            }
        });
    }

    // ==========================================
    // GSAP ANIMATIONS
    // ==========================================
    function initAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            // Fallback: show everything without animation
            document.querySelectorAll('.project').forEach(el => {
                el.classList.add('visible');
            });
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        // Check reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            document.querySelectorAll('.project').forEach(el => el.classList.add('visible'));
            return;
        }

        // Hero entrance
        const heroTimeline = gsap.timeline({ delay: 0.2 });

        // Coordinate fade in
        heroTimeline.from('.hero-coord', {
            opacity: 0,
            y: 10,
            duration: 0.6,
            ease: 'power3.out'
        });

        // Headline word reveals - staggered
        const heroWords = document.querySelectorAll('.hero-word');
        heroTimeline.from(heroWords, {
            y: '110%',
            opacity: 0,
            duration: 0.8,
            ease: 'power4.out',
            stagger: 0.08
        }, '-=0.3');

        // Identity block
        heroTimeline.from('.hero-identity', {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.3');

        // Description and CTA
        heroTimeline.from('.hero-description', {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.3');

        // Motif
        heroTimeline.from('.hero-motif', {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: 'power2.out'
        }, '-=0.5');

        // Scroll indicator
        heroTimeline.from('.hero-scroll-indicator', {
            opacity: 0,
            y: -10,
            duration: 0.5,
            ease: 'power2.out'
        }, '-=0.3');

        // Section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header.children, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%',
                    once: true
                },
                y: 30,
                opacity: 0,
                duration: 0.7,
                ease: 'power3.out',
                stagger: 0.1
            });
        });

        // Projects
        gsap.utils.toArray('.project').forEach(project => {
            ScrollTrigger.create({
                trigger: project,
                start: 'top 80%',
                once: true,
                onEnter: () => project.classList.add('visible')
            });
        });

        // About statement
        const aboutStatement = document.querySelector('.about-statement');
        if (aboutStatement) {
            gsap.from(aboutStatement, {
                scrollTrigger: {
                    trigger: aboutStatement,
                    start: 'top 80%',
                    once: true
                },
                x: -30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        }

        // About body
        const aboutBody = document.querySelector('.about-body');
        if (aboutBody) {
            gsap.from(aboutBody.children, {
                scrollTrigger: {
                    trigger: aboutBody,
                    start: 'top 85%',
                    once: true
                },
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.out',
                stagger: 0.1
            });
        }

        // Skills index
        const skillsIndex = document.querySelector('.skills-index');
        if (skillsIndex) {
            gsap.from(skillsIndex, {
                scrollTrigger: {
                    trigger: skillsIndex,
                    start: 'top 85%',
                    once: true
                },
                y: 30,
                opacity: 0,
                duration: 0.7,
                ease: 'power3.out'
            });
        }

        // Experience items
        gsap.utils.toArray('.exp-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    once: true
                },
                y: 15,
                opacity: 0,
                duration: 0.5,
                ease: 'power3.out',
                delay: i * 0.05
            });
        });

        // Lab cards
        gsap.utils.toArray('.lab-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    once: true
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.out',
                delay: i * 0.1
            });
        });

        // Contact
        const contactHeadline = document.querySelector('.contact-headline');
        if (contactHeadline) {
            gsap.from('.contact-line', {
                scrollTrigger: {
                    trigger: contactHeadline,
                    start: 'top 80%',
                    once: true
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power4.out',
                stagger: 0.15
            });
        }

        // Contact links
        gsap.utils.toArray('.contact-link').forEach((link, i) => {
            gsap.from(link, {
                scrollTrigger: {
                    trigger: link,
                    start: 'top 90%',
                    once: true
                },
                x: 30,
                opacity: 0,
                duration: 0.5,
                ease: 'power3.out',
                delay: i * 0.08
            });
        });

        // Subtle parallax on hero motif
        gsap.to('.hero-motif', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: -60,
            rotation: 15,
            ease: 'none'
        });
    }

    // ==========================================
    // MAGNETIC BUTTONS
    // ==========================================
    function initMagneticButtons() {
        if (!window.matchMedia('(pointer: fine)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const buttons = document.querySelectorAll('.hero-cta, .project-link, .nav-resume, .sana-module-btn');

        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
                btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                setTimeout(() => { btn.style.transition = ''; }, 400);
            });
        });
    }

    initMagneticButtons();

    // ==========================================
    // TEXT SCRAMBLE ON SECTION TITLES
    // ==========================================
    function initTextScramble() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const glyphs = '01#%&$*+/[];:~ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const targets = document.querySelectorAll('.section-title');

        function scrambleElement(el) {
            const originalText = el.dataset.original || el.textContent.trim();
            el.dataset.original = originalText;

            let step = 0;
            const total = originalText.length;
            const interval = setInterval(() => {
                el.textContent = originalText
                    .split('')
                    .map((char, i) => {
                        if (char === ' ' || char === '.' || char === '—') return char;
                        if (i < step) return originalText[i];
                        return glyphs[Math.floor(Math.random() * glyphs.length)];
                    })
                    .join('');

                step += 0.6;
                if (step >= total) {
                    clearInterval(interval);
                    el.textContent = originalText;
                }
            }, 30);
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    scrambleElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        targets.forEach(t => observer.observe(t));
    }

    initTextScramble();

    // ==========================================
    // INTERACTIVE PARTICLE FIELD (Lab Section)
    // ==========================================
    function initParticleField() {
        const canvas = document.getElementById('lab-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const container = canvas.parentElement;
        let width, height;
        let particles = [];
        let mouseX = -1000;
        let mouseY = -1000;
        let animationId;

        const PARTICLE_COUNT = 80;
        const CONNECTION_DISTANCE = 120;
        const MOUSE_RADIUS = 150;

        function resize() {
            width = container.clientWidth;
            height = container.clientHeight;
            canvas.width = width * window.devicePixelRatio;
            canvas.height = height * window.devicePixelRatio;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }

        function createParticles() {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 2 + 1,
                    baseRadius: Math.random() * 2 + 1
                });
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                // Movement
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                // Mouse interaction
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MOUSE_RADIUS) {
                    const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                    p.vx -= (dx / dist) * force * 0.3;
                    p.vy -= (dy / dist) * force * 0.3;
                    p.radius = p.baseRadius + force * 3;
                } else {
                    p.radius += (p.baseRadius - p.radius) * 0.05;
                }

                // Damping
                p.vx *= 0.99;
                p.vy *= 0.99;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 85, 61, ${0.4 + p.radius * 0.1})`;
                ctx.fill();
            });

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONNECTION_DISTANCE) {
                        const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(200, 85, 61, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animationId = requestAnimationFrame(animate);
        }

        // Track mouse
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });

        container.addEventListener('mouseleave', () => {
            mouseX = -1000;
            mouseY = -1000;
        });

        // Touch support
        container.addEventListener('touchmove', (e) => {
            const rect = container.getBoundingClientRect();
            const touch = e.touches[0];
            mouseX = touch.clientX - rect.left;
            mouseY = touch.clientY - rect.top;
        }, { passive: true });

        container.addEventListener('touchend', () => {
            mouseX = -1000;
            mouseY = -1000;
        });

        // Visibility observer (performance)
        let isVisible = false;
        const visibilityObserver = new IntersectionObserver((entries) => {
            isVisible = entries[0].isIntersecting;
            if (isVisible && !animationId) {
                animate();
            } else if (!isVisible && animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        }, { threshold: 0.1 });

        visibilityObserver.observe(container);

        resize();
        createParticles();

        window.addEventListener('resize', () => {
            resize();
            createParticles();
        });
    }

    initParticleField();

    // ==========================================
    // HERO MOTIF POINTER INTERACTION
    // ==========================================
    function initMotifInteraction() {
        if (!window.matchMedia('(pointer: fine)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const motif = document.querySelector('.hero-motif');
        const hero = document.querySelector('.hero');
        if (!motif || !hero) return;

        let targetRotation = 0;
        let currentRotation = 0;

        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            targetRotation = x * 20;
        });

        function updateMotif() {
            currentRotation += (targetRotation - currentRotation) * 0.03;
            motif.style.transform = `translateY(-50%) rotate(${currentRotation}deg)`;
            requestAnimationFrame(updateMotif);
        }

        updateMotif();
    }

    initMotifInteraction();

    // ==========================================
    // PROJECT HOVER EFFECTS
    // ==========================================
    function initProjectInteractions() {
        if (!window.matchMedia('(pointer: fine)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        document.querySelectorAll('.project').forEach(project => {
            const visual = project.querySelector('.project-visual-frame');
            if (!visual) return;

            project.addEventListener('mousemove', (e) => {
                const rect = project.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;

                const rotateX = (y - 0.5) * -4;
                const rotateY = (x - 0.5) * 4;

                visual.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            project.addEventListener('mouseleave', () => {
                visual.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                visual.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                setTimeout(() => { visual.style.transition = ''; }, 600);
            });
        });
    }

    initProjectInteractions();

    // ==========================================
    // CONSOLE SIGNATURE
    // ==========================================
    console.log(
        '%c KA ',
        'font-size: 28px; font-weight: bold; color: #F5F0EB; background: #0A0A0A; padding: 8px 16px; font-family: "Space Grotesk", monospace; letter-spacing: 0.1em;'
    );
    console.log(
        '%cKarthick A — Building Things That Should Exist',
        'font-size: 12px; color: #8A8A8A; font-family: "IBM Plex Mono", monospace;'
    );
    console.log(
        '%ckarthicka.me',
        'font-size: 11px; color: #C8553D; font-family: "IBM Plex Mono", monospace;'
    );
});
