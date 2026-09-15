/* ==============================================
   KARTHICK PORTFOLIO — ADVANCED PRODUCT UI JS
   Three.js Real-time 3D WebGL Models & Physics
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========== Navbar Scroll ==========
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 30) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }

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

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenuBtn.classList.toggle('active');
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

    // ========== Sana Voice Module ==========
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

    // ========== Typewriter ==========
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
        if (!typewriterEl) return;
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
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }
        setTimeout(typeWriter, typeSpeed);
    }

    if (typewriterEl) typeWriter();

    // ========== Scroll Reveal ==========
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -60px 0px',
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========== Smooth Scroll ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth',
                });
            }
        });
    });

    // ==============================================
    // 3D MODEL 1: OPENAI ASTRA-STYLE 3D NEURAL SPHERE
    // ==============================================
    function initHeroNeural3D() {
        const canvas = document.getElementById('hero-3d-canvas');
        if (!canvas || typeof THREE === 'undefined') return;

        const container = canvas.parentElement;
        const width = container.clientWidth || 400;
        const height = container.clientHeight || 180;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.z = 24;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Neural Particle Sphere (Fibonacci distribution)
        const particleCount = 700;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const basePositions = new Float32Array(particleCount * 3);
        const radius = 8;

        const phi = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < particleCount; i++) {
            const y = 1 - (i / (particleCount - 1)) * 2;
            const radiusAtY = Math.sqrt(1 - y * y);
            const theta = phi * i;

            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;

            positions[i * 3] = x * radius;
            positions[i * 3 + 1] = y * radius;
            positions[i * 3 + 2] = z * radius;

            basePositions[i * 3] = positions[i * 3];
            basePositions[i * 3 + 1] = positions[i * 3 + 1];
            basePositions[i * 3 + 2] = positions[i * 3 + 2];
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.36,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        // Inner wireframe lattice
        const innerGeo = new THREE.IcosahedronGeometry(4.8, 1);
        const innerMat = new THREE.MeshBasicMaterial({
            color: 0x93c5fd,
            wireframe: true,
            transparent: true,
            opacity: 0.22
        });
        const innerMesh = new THREE.Mesh(innerGeo, innerMat);
        scene.add(innerMesh);

        // Interactive mouse tracking
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        let pulseWave = 0;

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            targetY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
        });

        container.addEventListener('mouseleave', () => {
            targetX = 0;
            targetY = 0;
        });

        container.addEventListener('click', () => {
            pulseWave = 1.8;
        });

        let isVisible = true;
        const observer = new IntersectionObserver((entries) => {
            isVisible = entries[0].isIntersecting;
        }, { threshold: 0.1 });
        observer.observe(container);

        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            if (!isVisible) return;

            const time = clock.getElapsedTime();
            mouseX += (targetX - mouseX) * 0.06;
            mouseY += (targetY - mouseY) * 0.06;

            points.rotation.y = time * 0.25 + mouseX * 0.8;
            points.rotation.x = Math.sin(time * 0.2) * 0.15 + mouseY * 0.8;
            innerMesh.rotation.y = -time * 0.35 + mouseX;
            innerMesh.rotation.x = time * 0.25 + mouseY;

            if (pulseWave > 0) pulseWave -= 0.035;

            const pos = geometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                const bx = basePositions[i * 3];
                const by = basePositions[i * 3 + 1];
                const bz = basePositions[i * 3 + 2];

                const wave = Math.sin(time * 2.8 + by * 0.7 + bx * 0.4) * (0.35 + pulseWave);
                const scale = 1 + wave * 0.12;

                pos[i * 3] = bx * scale;
                pos[i * 3 + 1] = by * scale;
                pos[i * 3 + 2] = bz * scale;
            }
            geometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', () => {
            const newW = container.clientWidth || 400;
            const newH = container.clientHeight || 180;
            camera.aspect = newW / newH;
            camera.updateProjectionMatrix();
            renderer.setSize(newW, newH);
        });
    }

    // ==============================================
    // 3D MODEL 2: REAL WEBGL IOT GYROSCOPE & TELEMETRY
    // ==============================================
    function initIoTTelemetry3D() {
        const canvas = document.getElementById('iot-3d-canvas');
        if (!canvas || typeof THREE === 'undefined') return;

        const container = canvas.parentElement;
        const width = container.clientWidth || 64;
        const height = container.clientHeight || 64;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.z = 25;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const ringGroup = new THREE.Group();
        scene.add(ringGroup);

        // Ring 1: Outer Gimbal (Pure Metallic Chrome)
        const ring1Geo = new THREE.TorusGeometry(8.5, 0.45, 16, 80);
        const ring1Mat = new THREE.MeshStandardMaterial({
            color: 0xdddddd,
            metalness: 0.94,
            roughness: 0.15
        });
        const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
        ringGroup.add(ring1);

        // Ring 2: Middle Gimbal (Gunmetal Titanium)
        const ring2Geo = new THREE.TorusGeometry(6.2, 0.38, 16, 80);
        const ring2Mat = new THREE.MeshStandardMaterial({
            color: 0x888888,
            metalness: 0.9,
            roughness: 0.2
        });
        const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
        ringGroup.add(ring2);

        // Ring 3: Inner Gimbal (Platinum)
        const ring3Geo = new THREE.TorusGeometry(4.2, 0.32, 16, 80);
        const ring3Mat = new THREE.MeshStandardMaterial({
            color: 0xbbbbbb,
            metalness: 0.95,
            roughness: 0.1
        });
        const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
        ringGroup.add(ring3);

        // Central Core: Quantum Geometric Lattice
        const coreGeo = new THREE.IcosahedronGeometry(2.3, 1);
        const coreMat = new THREE.MeshStandardMaterial({
            color: 0x333333,
            metalness: 0.85,
            roughness: 0.25,
            wireframe: true
        });
        const coreMesh = new THREE.Mesh(coreGeo, coreMat);
        ringGroup.add(coreMesh);

        // Glowing Solid Nucleus
        const nucleusGeo = new THREE.SphereGeometry(1.15, 16, 16);
        const nucleusMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
        ringGroup.add(nucleus);

        // Orbiting Satellite Beacons
        const sat1 = new THREE.Mesh(
            new THREE.SphereGeometry(0.65, 12, 12),
            new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
        );
        const sat2 = new THREE.Mesh(
            new THREE.SphereGeometry(0.55, 12, 12),
            new THREE.MeshBasicMaterial({ color: 0x34d399 })
        );
        ringGroup.add(sat1);
        ringGroup.add(sat2);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
        scene.add(ambientLight);

        const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
        dirLight1.position.set(15, 20, 15);
        scene.add(dirLight1);

        const dirLight2 = new THREE.DirectionalLight(0x93c5fd, 1.4);
        dirLight2.position.set(-15, -10, -10);
        scene.add(dirLight2);

        // Pointer Drag / Interaction
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        let rotationVelocity = { x: 0.012, y: 0.018 };
        let isHovered = false;

        container.addEventListener('pointerdown', (e) => {
            isDragging = true;
            previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;

            ringGroup.rotation.y += deltaX * 0.025;
            ringGroup.rotation.x += deltaY * 0.025;

            rotationVelocity.x = deltaY * 0.005;
            rotationVelocity.y = deltaX * 0.005;

            previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('pointerup', () => {
            isDragging = false;
        });

        container.addEventListener('mouseenter', () => { isHovered = true; });
        container.addEventListener('mouseleave', () => { isHovered = false; });

        let isVisible = true;
        const observer = new IntersectionObserver((entries) => {
            isVisible = entries[0].isIntersecting;
        }, { threshold: 0.1 });
        observer.observe(container);

        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            if (!isVisible) return;

            const time = clock.getElapsedTime();
            const speed = isHovered ? 2.4 : 1.0;

            if (!isDragging) {
                ringGroup.rotation.x += rotationVelocity.x * speed;
                ringGroup.rotation.y += rotationVelocity.y * speed;
                rotationVelocity.x *= 0.98;
                rotationVelocity.y *= 0.98;

                if (Math.abs(rotationVelocity.x) < 0.006) rotationVelocity.x = 0.006;
                if (Math.abs(rotationVelocity.y) < 0.01) rotationVelocity.y = 0.01;
            }

            // Gimbals counter-rotation
            ring1.rotation.z = time * 0.7 * speed;
            ring2.rotation.x = time * 1.1 * speed;
            ring2.rotation.y = time * 0.6 * speed;
            ring3.rotation.y = -time * 1.3 * speed;
            ring3.rotation.z = time * 0.75 * speed;
            coreMesh.rotation.y = -time * 1.6 * speed;

            // Satellite orbits
            sat1.position.x = Math.cos(time * 2.2 * speed) * 8.5;
            sat1.position.z = Math.sin(time * 2.2 * speed) * 8.5;

            sat2.position.y = Math.cos(time * 2.8 * speed) * 6.2;
            sat2.position.z = Math.sin(time * 2.8 * speed) * 6.2;

            renderer.render(scene, camera);
        }

        animate();
    }

    // Initialize 3D Models
    initHeroNeural3D();
    initIoTTelemetry3D();

    // ==============================================
    // ADVANCED PHYSICS: MAGNETIC BUTTONS
    // ==============================================
    function initMagneticButtons() {
        if (!window.matchMedia('(pointer: fine)').matches) return;

        const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta, #sana-voice-btn, .achieve-cert-link');

        magneticButtons.forEach(btn => {
            btn.style.transition = 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease';

            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    initMagneticButtons();

    // ==============================================
    // ADVANCED PHYSICS: TEXT SCRAMBLE / DECODER
    // ==============================================
    function initTextScramble() {
        const glyphs = '01#%&$*+/[];:~';
        const targets = document.querySelectorAll('.section-headline');

        function scrambleElement(el) {
            const originalText = el.dataset.scrambleText || el.textContent.trim();
            el.dataset.scrambleText = originalText;

            let step = 0;
            const totalSteps = originalText.length;
            const interval = setInterval(() => {
                el.textContent = originalText
                    .split('')
                    .map((char, i) => {
                        if (char === ' ' || char === '.' || char === '—') return char;
                        if (i < step) return originalText[i];
                        return glyphs[Math.floor(Math.random() * glyphs.length)];
                    })
                    .join('');

                step += 0.8;
                if (step >= totalSteps) {
                    clearInterval(interval);
                    el.textContent = originalText;
                }
            }, 30);
        }

        const scrambleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    scrambleElement(entry.target);
                    scrambleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        targets.forEach(t => scrambleObserver.observe(t));
    }

    initTextScramble();

    // ==============================================
    // ADVANCED PHYSICS: 3D CARD TILT & SPECULAR SHEEN
    // ==============================================
    const tiltElements = document.querySelectorAll('[data-tilt], .achieve-item, .hero-terminal, .project, .skill-cell, .edu-card');

    if (window.matchMedia('(pointer: fine)').matches) {
        tiltElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -5.0;
                const rotateY = ((x - centerX) / centerX) * 5.0;

                el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(8px)`;
                el.style.setProperty('--mouse-x', `${((x / rect.width) * 100).toFixed(1)}%`);
                el.style.setProperty('--mouse-y', `${((y / rect.height) * 100).toFixed(1)}%`);
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });
    }

    // ========== Console ==========
    console.log(
        '%c■ Karthick',
        'font-size: 20px; font-weight: bold; color: #0a0a0a; font-family: monospace;'
    );
    console.log(
        '%cAI Developer & Backend Engineer // 3D WebGL Engine Active',
        'font-size: 12px; color: #737373; font-family: monospace;'
    );
});
