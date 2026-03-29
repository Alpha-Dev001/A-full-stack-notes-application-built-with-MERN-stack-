import { Link } from 'react-router-dom';
import { ArrowRightIcon, BrainCircuitIcon, LockIcon, SparklesIcon, ZapIcon, CheckCircleIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

function LandingPage() {
  const [email, setEmail] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: BrainCircuitIcon,
      title: "Smart Organization",
      description: "Intelligent categorization and instant search so your best ideas are always one keystroke away.",
      accent: "#22c55e"
    },
    {
      icon: LockIcon,
      title: "Secure Storage",
      description: "Enterprise-grade encryption keeps your most private thoughts safe at rest and in transit.",
      accent: "#4ade80"
    },
    {
      icon: SparklesIcon,
      title: "Beautiful Design",
      description: "A clean, distraction-free canvas that makes writing feel effortless and even enjoyable.",
      accent: "#86efac"
    },
    {
      icon: ZapIcon,
      title: "Lightning Fast",
      description: "Real-time sync across every device — your notes are always exactly where you left them.",
      accent: "#16a34a"
    }
  ];

  const benefits = [
    "Never lose an idea again",
    "Access notes from anywhere",
    "Collaborate with your team",
    "Export to multiple formats"
  ];

  const stats = [
    { value: "1,000+", label: "Active users" },
    { value: "4.9★", label: "User rating" },
    { value: "< 50ms", label: "Sync speed" },
    { value: "99.9%", label: "Uptime SLA" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --ink: #e8f5e9;
          --ink-muted: #a5c8a8;
          --ink-faint: #5a7a5d;
          --surface: #0a0f0a;
          --surface-2: #0f1a10;
          --border: #1c3020;
          --accent: #22c55e;
          --accent-light: #0f2a14;
          --accent-dark: #16a34a;
          --green: #4ade80;
          --radius-card: 20px;
          --shadow-sm: 0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3);
          --shadow-md: 0 4px 16px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.3);
          --shadow-lg: 0 12px 40px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.4);
          --shadow-accent: 0 8px 32px rgba(34,197,94,0.25);
        }

        .mv-root {
          font-family: 'DM Sans', sans-serif;
          color: var(--ink);
          background: var(--surface);
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }

        /* ── NAV ─────────────────────────────────────── */
        .mv-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 0 40px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          transition: none;
        }
        .mv-nav-wrap {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(10,15,10,0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid transparent;
          transition: border-color 0.3s;
        }
        .mv-nav-wrap.scrolled { border-color: var(--border); }

        .mv-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .mv-logo-icon {
          width: 36px; height: 36px;
          background: var(--accent-light);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: var(--accent);
        }
        .mv-logo-text {
          font-family: 'Instrument Serif', serif;
          font-size: 22px;
          color: var(--ink);
          letter-spacing: -0.3px;
        }

        .mv-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--accent);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          padding: 10px 22px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          letter-spacing: 0.01em;
          min-height: 44px; /* Better touch target */
        }
        .mv-btn-primary:hover {
          background: var(--accent-dark);
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(34,197,94,0.36);
        }
        .mv-btn-primary:active { 
          transform: translateY(0); 
          min-height: 42px; /* Slight press effect */
        }

        .mv-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: var(--ink);
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          padding: 10px 22px;
          border-radius: 100px;
          border: 1.5px solid var(--border);
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.2s, background 0.2s, transform 0.15s;
          min-height: 44px; /* Better touch target */
        }
        .mv-btn-ghost:hover {
          border-color: var(--accent);
          background: var(--accent-light);
          transform: translateY(-1px);
        }
        .mv-btn-ghost:active { 
          transform: translateY(0); 
          min-height: 42px; /* Slight press effect */
        }

        /* ── HERO ────────────────────────────────────── */
        .mv-hero {
          max-width: 1200px;
          margin: 0 auto;
          padding: 100px 40px 80px;
          text-align: center;
          position: relative;
        }
        .mv-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--accent-light);
          color: var(--accent);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 28px;
        }
        .mv-eyebrow-dot {
          width: 6px; height: 6px;
          background: var(--accent);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .mv-h1 {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(44px, 7vw, 76px);
          line-height: 1.07;
          letter-spacing: -1.5px;
          color: var(--ink);
          margin: 0 0 24px;
          max-width: 820px;
          margin-left: auto;
          margin-right: auto;
        }
        .mv-h1 em {
          font-style: italic;
          color: var(--accent);
        }
        .mv-hero-sub {
          font-size: 18px;
          line-height: 1.7;
          color: var(--ink-muted);
          max-width: 520px;
          margin: 0 auto 44px;
          font-weight: 400;
        }

        .mv-hero-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 60px;
        }
        .mv-btn-primary.lg { font-size: 15px; padding: 14px 30px; }
        .mv-btn-ghost.lg { font-size: 15px; padding: 14px 30px; }

        .mv-trust {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
          color: var(--ink-faint);
          font-size: 13px;
        }
        .mv-trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--ink-muted);
        }
        .mv-trust-item svg { color: var(--green); }
        .mv-trust-divider { color: var(--border); }

        /* ── STATS ───────────────────────────────────── */
        .mv-stats-bar {
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: #0c180d;
        }
        .mv-stats-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .mv-stat {
          padding: 32px 24px;
          text-align: center;
          border-right: 1px solid var(--border);
        }
        .mv-stat:last-child { border-right: none; }
        .mv-stat-value {
          font-family: 'Instrument Serif', serif;
          font-size: 36px;
          color: var(--ink);
          letter-spacing: -1px;
          line-height: 1;
          margin-bottom: 6px;
        }
        .mv-stat-label {
          font-size: 12px;
          color: var(--ink-faint);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 500;
        }

        /* ── FEATURES ────────────────────────────────── */
        .mv-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 100px 40px;
        }
        .mv-section-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 16px;
        }
        .mv-h2 {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(32px, 4vw, 48px);
          letter-spacing: -1px;
          color: var(--ink);
          line-height: 1.12;
          margin: 0 0 16px;
        }
        .mv-section-sub {
          font-size: 17px;
          color: var(--ink-muted);
          max-width: 480px;
          line-height: 1.6;
        }

        .mv-features-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 56px;
          gap: 40px;
        }
        .mv-features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 900px) {
          .mv-features-grid { grid-template-columns: repeat(4, 1fr); }
        }

        .mv-feature-card {
          background: #0d1a0e;
          border: 1px solid var(--border);
          border-radius: var(--radius-card);
          padding: 28px;
          transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s;
          position: relative;
          overflow: hidden;
        }
        .mv-feature-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--card-accent, #6366f1) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
          border-radius: inherit;
        }
        .mv-feature-card:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-4px);
          border-color: transparent;
        }
        .mv-feature-card:hover::before { opacity: 0.04; }

        .mv-feature-icon-wrap {
          width: 44px; height: 44px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
          background: var(--accent-light);
          color: var(--accent);
        }
        .mv-feature-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 10px;
          letter-spacing: -0.2px;
        }
        .mv-feature-desc {
          font-size: 14px;
          color: var(--ink-muted);
          line-height: 1.65;
        }

        /* ── WHY SECTION ─────────────────────────────── */
        .mv-why-section {
          background: #0c180d;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 100px 0;
        }
        .mv-why-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        @media (max-width: 760px) {
          .mv-why-inner { grid-template-columns: 1fr; gap: 48px; }
        }
        .mv-benefits-list {
          list-style: none;
          padding: 0; margin: 28px 0 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .mv-benefit-item {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 16px;
          color: var(--ink);
        }
        .mv-benefit-check {
          width: 24px; height: 24px;
          border-radius: 50%;
          background: var(--accent-light);
          color: var(--accent);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .mv-why-visual {
          background: linear-gradient(135deg, #14532d 0%, #166534 50%, #15803d 100%);
          border-radius: 24px;
          padding: 48px 36px;
          color: white;
          box-shadow: var(--shadow-accent);
          position: relative;
          overflow: hidden;
        }
        .mv-why-visual::after {
          content: '';
          position: absolute;
          top: -40%;
          right: -20%;
          width: 280px; height: 280px;
          background: rgba(255,255,255,0.08);
          border-radius: 50%;
        }
        .mv-why-quote {
          font-family: 'Instrument Serif', serif;
          font-size: 26px;
          line-height: 1.35;
          letter-spacing: -0.3px;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }
        .mv-why-quote-meta {
          font-size: 13px;
          opacity: 0.7;
          position: relative;
          z-index: 1;
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        /* ── CTA ─────────────────────────────────────── */
        .mv-cta-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 100px 40px;
          text-align: center;
        }
        .mv-cta-card {
          background: #050a06;
          border-radius: 28px;
          padding: 80px 40px;
          position: relative;
          overflow: hidden;
        }
        .mv-cta-card::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(34,197,94,0.2) 0%, transparent 70%);
          border-radius: 50%;
        }
        .mv-cta-card::after {
          content: '';
          position: absolute;
          bottom: -80px; left: -40px;
          width: 240px; height: 240px;
          background: radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%);
          border-radius: 50%;
        }
        .mv-cta-h2 {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(32px, 4vw, 52px);
          color: #fff;
          letter-spacing: -1px;
          margin-bottom: 16px;
          position: relative; z-index: 1;
        }
        .mv-cta-sub {
          font-size: 17px;
          color: rgba(255,255,255,0.6);
          margin-bottom: 40px;
          position: relative; z-index: 1;
        }
        .mv-btn-primary.on-dark {
          background: #fff;
          color: #16a34a;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          position: relative; z-index: 1;
        }
        .mv-btn-primary.on-dark:hover {
          background: #e8f5e9;
          box-shadow: 0 12px 40px rgba(0,0,0,0.4);
        }

        /* ── FOOTER ──────────────────────────────────── */
        .mv-footer {
          border-top: 1px solid var(--border);
          padding: 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          flex-wrap: wrap;
          gap: 16px;
        }
        .mv-footer-copy {
          font-size: 13px;
          color: var(--ink-faint);
        }
        .mv-footer-links {
          display: flex;
          gap: 24px;
        }
        .mv-footer-link {
          font-size: 13px;
          color: var(--ink-faint);
          text-decoration: none;
          transition: color 0.15s;
        }
        .mv-footer-link:hover { color: var(--ink); }

        @media (max-width: 640px) {
          .mv-nav { padding: 0 20px; }
          .mv-hero { padding: 60px 24px 60px; }
          .mv-h1 { font-size: clamp(36px, 6vw, 56px); }
          .mv-hero-sub { font-size: 16px; }
          .mv-hero-actions { 
            flex-direction: column; 
            align-items: stretch; 
            gap: 12px; 
          }
          .mv-btn-primary.lg, .mv-btn-ghost.lg { 
            width: 100%; 
            justify-content: center; 
            padding: 14px 24px; 
          }
          .mv-trust { 
            flex-direction: column; 
            gap: 12px; 
            font-size: 12px; 
          }
          .mv-stat-value { font-size: 28px; }
          .mv-stat { padding: 24px 16px; }
          .mv-features-header { 
            flex-direction: column; 
            align-items: flex-start; 
            gap: 20px; 
            margin-bottom: 40px; 
          }
          .mv-h2 { font-size: clamp(28px, 5vw, 40px); }
          .mv-idea-card { padding: 20px; }
          .mv-ideas-title { font-size: 28px; }
          .mv-why-inner { 
            grid-template-columns: 1fr; 
            gap: 40px; 
          }
          .mv-why-quote { font-size: 20px; }
          .mv-cta-card { padding: 52px 24px; }
          .mv-cta-h2 { font-size: clamp(28px, 5vw, 40px); }
          .mv-footer { 
            padding: 32px 24px; 
            flex-direction: column; 
            align-items: flex-start; 
            gap: 16px; 
          }
        }
      `}</style>

      <div className="mv-root">
        {/* Nav */}
        <div className={`mv-nav-wrap ${scrolled ? 'scrolled' : ''}`}>
          <nav className="mv-nav">
            <Link to="/" className="mv-logo">
              <div className="mv-logo-icon">
                <BrainCircuitIcon size={18} />
              </div>
              <span className="mv-logo-text">MindVault</span>
            </Link>
            <Link to="/app" className="mv-btn-primary">
              Launch App <ArrowRightIcon size={15} />
            </Link>
          </nav>
        </div>

        {/* Hero */}
        <section className="mv-hero">
          <div className="mv-eyebrow">
            <span className="mv-eyebrow-dot" />
            Now in open beta
          </div>
          <h1 className="mv-h1">
            Organize your thoughts.<br />
            <em>Elevate your ideas.</em>
          </h1>
          <p className="mv-hero-sub">
            A focused note-taking workspace designed for clarity and deep work.
            Transform scattered thinking into structured knowledge.
          </p>
          <div className="mv-hero-actions">
            <Link to="/app" className="mv-btn-primary lg">
              Get Started — It's Free <ArrowRightIcon size={16} />
            </Link>
            <button className="mv-btn-ghost lg">View Demo</button>
          </div>
          <div className="mv-trust">
            <span className="mv-trust-item">
              <CheckCircleIcon size={14} />&nbsp;Free forever plan
            </span>
            <span className="mv-trust-divider">·</span>
            <span className="mv-trust-item">
              <CheckCircleIcon size={14} />&nbsp;No credit card required
            </span>
            <span className="mv-trust-divider">·</span>
            <span className="mv-trust-item">
              <CheckCircleIcon size={14} />&nbsp;1,000+ users and growing
            </span>
          </div>
        </section>

        {/* Stats bar */}
        <div className="mv-stats-bar">
          <div className="mv-stats-inner">
            {stats.map((s, i) => (
              <div className="mv-stat" key={i}>
                <div className="mv-stat-value">{s.value}</div>
                <div className="mv-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <section className="mv-section">
          <div className="mv-features-header">
            <div>
              <div className="mv-section-label">Features</div>
              <h2 className="mv-h2">Everything you need<br />to stay organized</h2>
            </div>
            <p className="mv-section-sub">
              Powerful tools designed to make note-taking effortless — from first idea to finished thought.
            </p>
          </div>
          <div className="mv-features-grid">
            {features.map((f, i) => (
              <div
                className="mv-feature-card"
                key={i}
                style={{ '--card-accent': f.accent }}
              >
                <div className="mv-feature-icon-wrap">
                  <f.icon size={20} />
                </div>
                <div className="mv-feature-title">{f.title}</div>
                <p className="mv-feature-desc">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why MindVault */}
        <div className="mv-why-section">
          <div className="mv-why-inner">
            <div>
              <div className="mv-section-label">Why MindVault</div>
              <h2 className="mv-h2">Built for people<br />who think a lot</h2>
              <ul className="mv-benefits-list">
                {benefits.map((b, i) => (
                  <li className="mv-benefit-item" key={i}>
                    <span className="mv-benefit-check">
                      <CheckCircleIcon size={14} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mv-why-visual">
              <p className="mv-why-quote">
                "MindVault is the first note app that actually got out of my way. My thinking has never been clearer."
              </p>
              <p className="mv-why-quote-meta">— EARLY BETA USER · PRODUCT DESIGNER</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <section className="mv-cta-section">
          <div className="mv-cta-card">
            <h2 className="mv-cta-h2">Ready to think more clearly?</h2>
            <p className="mv-cta-sub">
              Join thousands of people who have already made the switch.
            </p>
            <Link to="/app" className="mv-btn-primary lg on-dark">
              Start Organizing Now <ArrowRightIcon size={16} />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <div className="mv-footer">
            <div className="mv-logo">
              <div className="mv-logo-icon">
                <BrainCircuitIcon size={16} />
              </div>
              <span className="mv-logo-text" style={{ fontSize: 18 }}>MindVault</span>
            </div>
            <span className="mv-footer-copy">© 2024 MindVault. All rights reserved.</span>
            <div className="mv-footer-links">
              <a href="#" className="mv-footer-link">Privacy</a>
              <a href="#" className="mv-footer-link">Terms</a>
              <a href="#" className="mv-footer-link">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default LandingPage;