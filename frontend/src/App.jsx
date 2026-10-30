import { useState, useEffect, useRef } from 'react';
import CuteMascot from './CuteMascot';

// Resume & Social links
const RESUME_URL = '/Karthick-Resume.pdf';
const GITHUB_URL = 'https://github.com/akarthick-dev';
const LINKEDIN_URL = 'https://www.linkedin.com/in/karthick-seven/';
const CURRENT_YEAR = new Date().getFullYear();

// Nav items
const NAV_ITEMS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Awards', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

// Tech stack marquee
const TECH_STACK = [
  'Python', 'FastAPI', 'Pydantic', 'MySQL', 'Supabase', 'Firebase', 
  'React Native', 'Fine-tuning', 'QLoRA', 'MCP', 'ElevenLabs', 'n8n', 
  'Linux', 'Git / GitHub', 'Agile', 'Waterfall'
];

// Projects data
const PROJECTS = [
  {
    id: '01',
    title: 'RAG Knowledge Engine',
    tagline: 'Retrieval-Augmented Generation',
    description:
      'An end-to-end RAG system that ingests documents, embeds them into a vector store and answers questions with grounded, cited responses — no hallucinations, no dead ends. FastAPI service, typed schemas, production-style deployment.',
    tags: ['Python', 'FastAPI', 'Supabase', 'Vector DB'],
    meta: 'Generative AI',
    link: GITHUB_URL,
    featured: true,
  },
  {
    id: '02',
    title: 'Sana — AI Companion',
    tagline: 'Live AI companion product',
    description:
      'A shipped AI companion that holds context across conversations, replies in a natural voice and stays on-persona over long sessions. Built as a Python service with prompt orchestration, memory and speech synthesis — live and in daily use.',
    tags: ['Python', 'LLM', 'Prompt Engineering', 'ElevenLabs'],
    meta: 'Applied AI',
    link: 'https://sana.karthicka.me',
    site: 'sana.karthicka.me',
  },
  {
    id: '03',
    title: 'Qwen 9B Fine-tune',
    tagline: 'Open-model tuning with QLoRA',
    description:
      'Fine-tuned a Qwen 9B model on general-domain data, covering dataset cleaning, quantised LoRA training runs and evaluation against the base model.',
    tags: ['Python', 'QLoRA', 'Linux'],
    meta: 'Model Training',
    link: GITHUB_URL,
  },
];

// Focus list
const FOCUS_AREAS = [
  'Retrieval-augmented generation',
  'LLM fine-tuning & evaluation',
  'Applied AI product engineering',
  'IoT & embedded systems',
];

// Awards & Certifications
const AWARDS = [
  {
    title: '1st Place — AI Agent Creation Competition',
    detail: 'Built and pitched an autonomous AI agent against competing teams, taking first place.',
  },
  {
    title: '1st Place — IoT Internship Challenge',
    detail: 'Recognised as the top performer across the IoT internship program.',
  },
];

const CERTIFICATIONS = [
  { title: 'Cybersecurity Internship', issuer: 'IBM' },
  { title: 'IoT Internship', issuer: 'Nandhi Foundation' },
];

// Icons
function GithubIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function ArrowUpRightIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function GraduationCapIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  );
}

function TrophyIcon({ className = 'h-4 w-4 text-red-500' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function BadgeCheckIcon({ className = 'h-4 w-4 text-blue-500' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function SunIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function DownloadIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

// Bidirectional Scroll Arrival Component
function ScrollReveal({ children, className = '', delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Triggers smoothly both scrolling down and scrolling up
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`scroll-reveal ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

// Section Header reusable component
function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <div className="mb-4 flex items-center gap-3">
        {align === 'left' && <span className="h-px w-8 bg-gradient-to-r from-red-500 to-blue-500" />}
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-red-500 dark:text-red-400 font-bold">{eyebrow}</span>
      </div>
      <h2 className="font-display text-[1.9rem] font-bold leading-[1.12] tracking-[-0.025em] text-foreground sm:text-[2.5rem]">
        {title}
      </h2>
      {description && <p className="section-desc mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>}
    </div>
  );
}

// Project Card
function ProjectCard({ project }) {
  return (
    <a
      href={project.link || GITHUB_URL}
      target="_blank"
      rel="noreferrer"
      className="project-card group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white/90 dark:bg-card/60 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-black dark:hover:border-white/40 hover:shadow-xl sm:p-7"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-400/40 dark:via-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[11px] tracking-[0.2em] text-red-500 font-bold">{project.id}</span>
            <span className="h-px w-6 bg-slate-200 dark:bg-border" />
            <span className="project-meta font-mono text-[10px] uppercase tracking-[0.18em] font-semibold">
              {project.meta}
            </span>
          </div>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300 transition-all duration-300 group-hover:border-black dark:group-hover:border-white group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black group-hover:scale-105">
            <ArrowUpRightIcon className="h-4 w-4" />
          </span>
        </div>

        <h3 className="project-title mt-5 font-display text-xl font-bold tracking-tight sm:text-2xl">
          {project.title}
        </h3>
        <p className="project-tagline mt-1 font-mono text-xs font-semibold">{project.tagline}</p>
        <p className="project-desc mt-4 text-sm leading-relaxed">{project.description}</p>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-slate-200/80 dark:border-border/70 pt-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="project-tag rounded-md border px-2.5 py-1 font-mono text-[11px] transition-colors"
          >
            {tag}
          </span>
        ))}
        {project.site && (
          <span className="ml-auto font-mono text-[11px] text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-4">
            {project.site}
          </span>
        )}
      </div>
    </a>
  );
}

// Navbar component with Theme Switcher
function Navbar({ theme, setTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'mt-3 rounded-2xl border border-white/[0.12] dark:border-white/[0.12] border-black/[0.08] bg-background/80 px-4 py-2.5 shadow-[0_16px_50px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl'
            : 'mt-4 border border-transparent px-1 py-3'
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5 group" aria-label="Home">
          <CuteMascot theme={theme} size="h-9 w-9" />
          <span className="font-display text-sm font-bold tracking-tight text-foreground">Karthick A</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors hover:bg-black/[0.06] hover:text-black dark:hover:bg-white/[0.08] dark:hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="hidden items-center gap-2 md:flex">
          {/* Theme Switcher: Moon for Night Mode, Sun for Light Mode */}
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="grid h-9 w-9 place-items-center rounded-full border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300 transition-all hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white hover:scale-105"
            title={theme === 'dark' ? 'Night mode active (click for Light mode)' : 'Light mode active (click for Night mode)'}
            aria-label="Toggle color theme"
          >
            {theme === 'dark' ? (
              <MoonIcon className="h-4 w-4 text-blue-400" />
            ) : (
              <SunIcon className="h-4 w-4 text-amber-500" />
            )}
          </button>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid h-9 w-9 place-items-center rounded-full border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300 transition-colors hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white hover:scale-105"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid h-9 w-9 place-items-center rounded-full border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300 transition-colors hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white hover:scale-105"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href={RESUME_URL}
            download="Karthick-Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 dark:border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all hover:border-red-500 hover:text-red-500 dark:hover:border-red-400 dark:hover:text-red-400 hover:scale-105"
            title="Download Karthick's Resume (PDF)"
          >
            <DownloadIcon className="h-3.5 w-3.5 text-red-500" />
            <span>Resume</span>
          </a>
          <a
            href="#contact"
            className="ml-1 rounded-full bg-gradient-to-r from-red-500 to-blue-600 px-4 py-2 text-sm font-bold text-white shadow-md shadow-blue-500/25 transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-red-500/30 hover:scale-105"
          >
            Let's talk
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300"
            title={theme === 'dark' ? 'Night mode active (click for Light mode)' : 'Light mode active (click for Night mode)'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <MoonIcon className="h-4 w-4 text-blue-400" />
            ) : (
              <SunIcon className="h-4 w-4 text-amber-500" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300"
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mt-2 rounded-2xl border border-border bg-card/95 p-4 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-black/[0.06] hover:text-black dark:hover:bg-white/[0.08] dark:hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-border pt-3">
              <a
                href={RESUME_URL}
                download="Karthick-Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-sm font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
              >
                <DownloadIcon className="h-4 w-4" /> Resume
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white"
              >
                <GithubIcon className="h-4 w-4" /> GitHub
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white"
              >
                <LinkedinIcon className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

// Code Card terminal mockup - compact, sleek, non-zoomed
function CodeCard() {
  const [copied, setCopied] = useState(false);

  const codeSnippet = `const profile = {
  name: 'Karthick A',
  role: 'AI Engineer',
  degree: 'BSc Computer Science',
  stack: ['python', 'fastapi', 'supabase'],
  shipping: true,
};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-card-wrapper relative group">
      {/* Ambient background glow (Red & Blue) */}
      <div className="profile-ambient-glow" aria-hidden="true" />
      
      <div className="profile-card">
        {/* Terminal Title Bar */}
        <div className="profile-header">
          <div className="flex items-center gap-2">
            <span className="dot-red" />
            <span className="dot-yellow" />
            <span className="dot-green" />
            <span className="ml-2 rounded profile-main-badge px-2 py-0.5 font-mono text-[10px] flex items-center gap-1 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              main
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs profile-title-text flex items-center gap-1.5 font-medium">
              <span className="text-amber-500 text-[10px] font-bold">JS</span> profile.js
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="profile-copy-btn rounded px-2 py-0.5 font-mono text-[10px] transition active:scale-95"
              aria-label="Copy code"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="profile-code-content">
          <p className="profile-code-line">
            <span className="token-kw">const</span> <span className="token-ident">profile</span> <span className="token-punc">=</span> <span className="token-punc">{'{'}</span>
          </p>
          <p className="profile-code-line profile-indent">
            <span className="token-key">name</span><span className="token-punc">:</span> <span className="token-str">'Karthick A'</span><span className="token-punc">,</span>
          </p>
          <p className="profile-code-line profile-indent">
            <span className="token-key">role</span><span className="token-punc">:</span> <span className="token-str">'AI Engineer'</span><span className="token-punc">,</span>
          </p>
          <p className="profile-code-line profile-indent">
            <span className="token-key">degree</span><span className="token-punc">:</span> <span className="token-str">'BSc Computer Science'</span><span className="token-punc">,</span>
          </p>
          <p className="profile-code-line profile-indent">
            <span className="token-key">stack</span><span className="token-punc">:</span> <span className="token-punc">[</span><span className="token-arr-item">'python'</span><span className="token-punc">, </span><span className="token-arr-item">'fastapi'</span><span className="token-punc">, </span><span className="token-arr-item">'supabase'</span><span className="token-punc">]</span><span className="token-punc">,</span>
          </p>
          <p className="profile-code-line profile-indent">
            <span className="token-key">shipping</span><span className="token-punc">:</span> <span className="token-bool">true</span><span className="token-punc">,</span>
          </p>
          <p className="profile-code-line">
            <span className="token-punc">{'};'}</span>
          </p>

          {/* Terminal interactive prompt */}
          <div className="profile-footer">
            <p className="profile-prompt">
              <span className="profile-prompt-arrow select-none">&gt;</span>
              <span>building something useful</span>
              <span className="profile-prompt-cursor" />
            </p>
            <div className="mt-2.5 flex items-center justify-between">
              <span className="profile-status-pill">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                open to full-time roles
              </span>
              <span className="profile-ready-tag">Node v20.x · Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hero section with Red & Blue gradient & responsive 2-column layout
function Hero() {
  const stats = [
    { value: '03', label: 'Projects shipped', sub: 'RAG · Fine-tune · Voice' },
    { value: '02', label: 'First-place wins', sub: 'Hackathons & AI Agent' },
    { value: 'Graduate', label: 'BSc Computer Science', sub: 'A M Jain College' },
  ];

  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-24">
      <div className="relative mx-auto max-w-6xl px-5 hero-grid">
        <ScrollReveal>
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-red-500/30 bg-red-500/[0.08] dark:bg-red-500/[0.08] py-1.5 pl-3 pr-4 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-80" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-800 dark:text-foreground font-bold">
              BSc CS Graduate · Open to roles
            </span>
          </div>

          {/* Heading with Red & Blue Gradient */}
          <h1 className="mt-7 hero-heading">
            I build AI systems
            <br />
            that <span className="gradient-highlight">actually ship.</span>
          </h1>

          {/* Bio paragraph */}
          <p className="mt-7 hero-paragraph">
            I'm <span className="font-bold text-slate-950 dark:text-white">Karthick A</span>, a Computer Science graduate from{' '}
            <span className="font-bold text-slate-950 dark:text-white">A M Jain College</span>. I build retrieval-augmented apps, fine-tune open
            models with QLoRA, and take AI products from a rough idea to something people can actually use.
          </p>

          {/* Action buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 via-rose-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:brightness-110 hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              View my work
              <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={RESUME_URL}
              download="Karthick-Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="group/cv inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-white/15 bg-white dark:bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-slate-900 dark:text-white shadow-sm transition-all duration-300 hover:border-red-500 hover:text-red-500 dark:hover:border-red-400 dark:hover:text-red-400 hover:-translate-y-0.5"
            >
              <DownloadIcon className="h-4 w-4 text-red-500 transition-transform group-hover/cv:translate-y-0.5" />
              Download Resume
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-white/15 bg-white dark:bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-slate-900 dark:text-white shadow-sm transition-all duration-300 hover:border-black dark:hover:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:-translate-y-0.5"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-white/15 bg-white dark:bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-slate-900 dark:text-white shadow-sm transition-all duration-300 hover:border-black dark:hover:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:-translate-y-0.5"
            >
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
            </a>
          </div>

          {/* Enhanced Glass Stat Cards */}
          <div className="mt-12 stats-container border-t border-slate-200 dark:border-white/[0.08] pt-8">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-box">
                <div className="font-display text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-red-600 dark:text-red-400 font-bold">
                  {stat.label}
                </div>
                <div className="mt-0.5 text-[11px] text-slate-600 dark:text-muted-foreground truncate font-medium">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Right Code Card */}
        <ScrollReveal delay={150}>
          <CodeCard />
        </ScrollReveal>
      </div>
    </section>
  );
}

// Infinite Marquee Ticker with Plus Jakarta Sans & Red-Blue styling
function Ticker() {
  const marqueeItems = [...TECH_STACK, ...TECH_STACK];

  return (
    <section className="relative border-y border-white/[0.08] dark:border-white/[0.08] border-black/[0.06] bg-black/40 dark:bg-black/40 bg-white/40 py-4.5 backdrop-blur-md">
      <div className="mask-fade-x overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-4">
          {marqueeItems.map((item, index) => (
            <div key={`${item}-${index}`} className="flex items-center gap-4">
              <span className="ticker-pill">
                <span className="ticker-dot" />
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Work section with ScrollArrival animations
function Work() {
  return (
    <section id="work" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Things I've built and shipped"
            description="Three projects that sum up how I work: retrieval systems that stay grounded, AI pipelines that produce real output, and open models tuned by hand."
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project, idx) => (
            <ScrollReveal
              key={project.id}
              delay={idx * 120}
              className={idx === 0 ? 'md:col-span-2' : ''}
            >
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200}>
          <div className="mt-8 text-center sm:text-right">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs text-blue-500 dark:text-blue-400 font-semibold transition hover:underline"
            >
              More on GitHub →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// About section with ScrollArrival animations
function About() {
  return (
    <section id="about" className="relative overflow-hidden border-y border-slate-200/80 dark:border-white/[0.08] bg-slate-50/60 dark:bg-card/30 py-20 sm:py-28">
      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-[1fr_0.85fr]">
        <ScrollReveal>
          <SectionHeading
            eyebrow="About"
            title="Engineer by craft, builder by default"
            description="With my BSc in Computer Science completed, I focus on the parts of AI that are hard to fake — data quality, retrieval, evaluation, and making models behave the way real users need them to."
          />

          <div className="mt-8 max-w-xl space-y-4 text-[15px] leading-relaxed text-muted-foreground font-normal">
            <p>
              Most of what I know came from building rather than watching. I've taken a RAG system from an empty repo
              to grounded answers, fine-tuned an open 9B model and benchmarked it against its base, and shipped an AI
              campaign pipeline that generates assets instead of suggestions.
            </p>
            <p>
              I'm strongest where research meets product: cleaning the dataset nobody wants to touch, wiring the
              retrieval layer, and then giving it a front end that feels effortless.
            </p>
          </div>

          <div className="mt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-red-500 dark:text-red-400 font-bold">Focus</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {FOCUS_AREAS.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-foreground/90 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-red-500 to-blue-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        {/* Education & credentials card */}
        <ScrollReveal delay={150}>
          <div className="rounded-2xl border border-white/[0.08] dark:border-white/[0.08] border-black/[0.08] bg-card/70 dark:bg-card/70 bg-white/80 p-6 backdrop-blur-md shadow-lg">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-red-500/10 to-blue-500/10 text-blue-500 border border-blue-500/20">
                <GraduationCapIcon className="h-5 w-5" />
              </span>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-bold">Education</p>
            </div>

            <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-foreground">
              BSc Computer Science
            </h3>
            <p className="mt-1 text-sm text-muted-foreground font-medium">A M Jain College</p>
            <p className="mt-4 font-mono text-[12px] text-emerald-500 dark:text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Completed · Graduated
            </p>

            <div className="mt-6 space-y-5 border-t border-border pt-6">
              {[
                { label: 'Projects shipped', value: '3' },
                { label: 'First-place wins', value: '2' },
                { label: 'Certifications', value: '2' },
              ].map((item) => (
                <div key={item.label} className="flex items-baseline justify-between gap-4">
                  <span className="text-sm text-muted-foreground font-medium">{item.label}</span>
                  <span className="font-display text-2xl font-bold text-foreground">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-border pt-4">
              <a
                href={RESUME_URL}
                download="Karthick-Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500/10 via-rose-500/10 to-blue-500/10 hover:from-red-500/20 hover:to-blue-500/20 border border-red-500/20 dark:border-blue-500/30 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all hover:scale-[1.02]"
              >
                <DownloadIcon className="h-3.5 w-3.5 text-red-500" />
                Download Full Resume (PDF)
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Recognition / Achievements section
function Achievements() {
  return (
    <section id="achievements" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Recognition"
            title="Awards & certifications"
            description="Competitions and programs that pushed me to build under pressure and prove the work."
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Awards */}
          <ScrollReveal delay={100}>
            <div className="h-full rounded-2xl border border-white/[0.08] dark:border-white/[0.08] border-black/[0.08] bg-card/60 dark:bg-card/60 bg-white/80 p-6 sm:p-7 backdrop-blur-md shadow-md">
              <div className="flex items-center gap-2.5">
                <TrophyIcon className="h-4 w-4" />
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-red-500 dark:text-red-400 font-bold">Awards</p>
              </div>
              <div className="mt-6 space-y-6">
                {AWARDS.map((award) => (
                  <div key={award.title} className="border-l-2 border-red-500/70 pl-4">
                    <h3 className="font-display text-base font-bold leading-snug tracking-tight text-foreground">
                      {award.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{award.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Certifications */}
          <ScrollReveal delay={200}>
            <div className="h-full rounded-2xl border border-white/[0.08] dark:border-white/[0.08] border-black/[0.08] bg-card/60 dark:bg-card/60 bg-white/80 p-6 sm:p-7 backdrop-blur-md shadow-md">
              <div className="flex items-center gap-2.5">
                <BadgeCheckIcon className="h-4 w-4" />
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue-500 dark:text-blue-400 font-bold">
                  Certifications
                </p>
              </div>
              <div className="mt-6 space-y-3">
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.title}
                    className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background/50 px-4 py-3.5"
                  >
                    <div>
                      <p className="text-sm font-semibold text-foreground">{cert.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{cert.issuer}</p>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-blue-500 dark:text-blue-400 font-bold">Verified</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// Contact section with Red & Blue gradient
function Contact() {
  return (
    <section id="contact" className="pb-20 pt-4 sm:pb-28">
      <div className="mx-auto max-w-6xl px-5">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.12] dark:border-white/[0.12] border-black/[0.08] bg-card/70 dark:bg-card/70 bg-white/90 px-6 py-14 text-center sm:px-12 sm:py-20 backdrop-blur-xl shadow-2xl">
            <div className="pointer-events-none absolute inset-0 grid-lines opacity-20" aria-hidden="true" />
            <div
              className="pointer-events-none absolute -bottom-40 left-1/2 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-red-500/15 blur-[120px]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/15 blur-[120px]"
              aria-hidden="true"
            />

            <div className="relative">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-red-500 dark:text-red-400 font-bold">Let's work together</p>
              <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
                Building something with AI?
                <br />
                <span className="gradient-highlight">I'd love to help.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base font-medium">
                Open to full-time roles, freelance collaborations, and impactful AI engineering projects. Fastest way to reach me is
                LinkedIn.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 via-rose-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:brightness-110 hover:shadow-xl hover:shadow-red-500/35 hover:-translate-y-0.5"
                >
                  Connect on LinkedIn
                  <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-white/15 bg-white dark:bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-slate-900 dark:text-white shadow-sm transition-all duration-300 hover:border-black dark:hover:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:-translate-y-0.5"
                >
                  <GithubIcon className="h-4 w-4" />
                  akarthick-dev
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-white/15 bg-white dark:bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-slate-900 dark:text-white shadow-sm transition-all duration-300 hover:border-black dark:hover:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:-translate-y-0.5"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  Karthick A
                </a>
                <a
                  href={RESUME_URL}
                  download="Karthick-Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-white/15 bg-white dark:bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-slate-900 dark:text-white shadow-sm transition-all duration-300 hover:border-red-500 hover:text-red-500 dark:hover:border-red-400 dark:hover:text-red-400 hover:-translate-y-0.5"
                >
                  <DownloadIcon className="h-4 w-4 text-red-500" />
                  Resume (PDF)
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Footer
function Footer({ theme = 'light' }) {
  return (
    <footer className="border-t border-border/70 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
        <div className="flex items-center gap-2.5 group">
          <CuteMascot theme={theme} size="h-7 w-7" />
          <span className="text-sm text-muted-foreground font-medium">Karthick A · {CURRENT_YEAR}</span>
        </div>

        <div className="flex items-center gap-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground/80 font-semibold">
            BSc Computer Science Graduate
          </span>
          <a
            href={RESUME_URL}
            download="Karthick-Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-red-500"
            title="Download Resume"
          >
            <DownloadIcon className="h-3.5 w-3.5 text-red-500" />
            <span className="font-medium">Resume</span>
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground transition hover:text-foreground"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition hover:text-foreground"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

// Main App Component with White Background with Gradient by default
export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {}
  }, [theme]);

  return (
    <div
      className={`relative min-h-screen font-body antialiased transition-colors duration-500 selection:bg-blue-500/20 selection:text-blue-600 ${
        theme === 'light' ? 'bg-mesh-white text-slate-900' : 'bg-mesh-dark text-foreground'
      }`}
    >
      <Navbar theme={theme} setTheme={setTheme} />
      <main>
        <Hero />
        <Ticker />
        <Work />
        <About />
        <Achievements />
        <Contact />
      </main>
      <Footer theme={theme} />
    </div>
  );
}
