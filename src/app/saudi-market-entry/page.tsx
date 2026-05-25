'use client';

import './design5.css';
import {
  Globe,
  MessageCircle,
  CheckCircle2,
  TrendingUp,
  Zap,
  Target,
  Briefcase,
  ArrowRight,
  MapPin,
  FileCheck,
  Building2,
  Headphones,
  Handshake,
  Landmark,
  Award,
} from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { ASSETS } from '@/lib/paths';
import { CONTACT } from '@/lib/constants';

export default function Design5() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    activity: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    const container = containerRef.current;
    if (container) {
      container.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, [submitted]);

  // Smooth scroll
  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://formspree.io/f/xpqnjrdv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          activity: formData.activity,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.[0]?.message || 'An error occurred while sending the message');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', activity: '', message: '' });
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="design5-container" ref={containerRef}>      {/* Navbar */}
      <header className="design5-navbar">
        <div className="container">
          <div className="navbar-inner">
            <a href="https://corpenta.com/" target="_blank" rel="noopener noreferrer" className="navbar-logo">
              <img
                src={ASSETS.logo}
                alt="Corpenta"
                className="navbar-logo-img"
              />
            </a>
            <nav className="navbar-nav">
              <a href="#services" onClick={closeMobile}>Services</a>
              <a href="#why-corpenta" onClick={closeMobile}>Why Us</a>
              <a href="#contact" onClick={closeMobile}>Contact</a>
            </nav>
            <div className="navbar-actions">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="navbar-btn-whatsapp">
                <MessageCircle size={18} />
                WhatsApp
              </a>
              <a href="#contact" className="navbar-btn-cta">Request a Consultation</a>
              <button
                className={`navbar-hamburger ${mobileOpen ? 'active' : ''}`}
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay - outside header for proper z-index */}
      <div
        className={`navbar-mobile-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={closeMobile}
      ></div>

      {/* Mobile menu drawer - outside header for proper z-index */}
      <div className={`navbar-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <img
            src={ASSETS.logo}
            alt="Corpenta"
            className="mobile-menu-logo"
          />
          <button
            className="mobile-menu-close"
            onClick={closeMobile}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <nav className="mobile-menu-nav">
          <a href="#services" onClick={closeMobile}>
            <Briefcase size={18} />
            Services
          </a>
          <a href="#why-corpenta" onClick={closeMobile}>
            <Award size={18} />
            Why Us
          </a>
          <a href="#contact" onClick={closeMobile}>
            <MessageCircle size={18} />
            Contact
          </a>
        </nav>

        <div className="mobile-menu-divider"></div>

        <div className="mobile-menu-actions">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-wa"
            onClick={closeMobile}
          >
            <MessageCircle size={20} />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href="#contact"
            className="mobile-cta"
            onClick={(e) => {
              closeMobile();
              scrollTo(e, 'contact');
            }}
          >
            <span>Request a Consultation</span>
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="mobile-menu-footer">
          <p>&copy; 2026 Corpenta</p>
        </div>
      </div>

      {/* ==================== HERO ==================== */}
      <section className="design5-hero">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>

        <div className="container">
          <div className="hero-inner">
            <div className="hero-tag">
              <span className="hero-tag-dot"></span>
              Corpenta — International Business Consulting
            </div>

            <h1 className="heading-xl">
              Expand Your Business into <em>Saudi Arabia</em>
            </h1>

            <p className="body-lg hero-desc">
              Professional consulting and business support for international companies exploring expansion opportunities in Saudi Arabia and the Gulf region.
            </p>

            <p className="body-md" style={{ marginBottom: 32, maxWidth: 520, color: 'var(--text-secondary)' }}>
              Corpenta supports international businesses with strategic guidance, market understanding, operational planning, and business coordination.
            </p>

            <div className="hero-actions">
              <a href="#contact" className="btn-primary" onClick={(e) => scrollTo(e, 'contact')}>
                Request a Consultation
                <ArrowRight size={16} />
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
            </div>

            <div className="hero-metrics">
              <div className="hero-metric">
                <div className="hero-metric-val">
                  <span className="accent">50+</span>
                </div>
                <div className="hero-metric-lbl">Countries Supported</div>
              </div>
              <div className="hero-metric">
                <div className="hero-metric-val">
                  <span className="accent">6</span>
                </div>
                <div className="hero-metric-lbl">Support Languages</div>
              </div>
              <div className="hero-metric">
                <div className="hero-metric-val">
                  <span className="accent">24</span>h
                </div>
                <div className="hero-metric-lbl">Response Time</div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-hint">
          <div className="scroll-line"></div>
          scroll
        </div>
      </section>

      {/* ==================== SAUDI MARKET OPPORTUNITIES ==================== */}
      <section className="sect why-saudi" id="services">
        <div className="container">
          <div className="sect-header reveal">
            <span className="eyebrow">Saudi Market Opportunities</span>
            <h2 className="heading-lg">
              International Business Support in the <em className="em-accent">Kingdom&apos;s</em> Growing Economy
            </h2>
            <p className="body-md" style={{ marginTop: 16, maxWidth: 580 }}>
              Saudi Arabia continues to attract international businesses across construction, technology, logistics, healthcare, tourism, consulting, and professional services.
            </p>
          </div>

          <div className="why-cards">
            <div className="why-card reveal reveal-delay-1">
              <div className="why-card-icon gold">
                <Globe size={28} />
              </div>
              <h3>GCC Market Access</h3>
              <p>
                Strategic access to Gulf markets including Saudi Arabia, UAE, Qatar, Bahrain, Kuwait, and Oman.
              </p>
            </div>

            <div className="why-card reveal reveal-delay-2">
              <div className="why-card-icon">
                <TrendingUp size={28} />
              </div>
              <h3>Business Expansion Environment</h3>
              <p>
                A rapidly developing market supported by major infrastructure projects, economic transformation, and international investment activity.
              </p>
            </div>

            <div className="why-card reveal reveal-delay-3">
              <div className="why-card-icon gold">
                <Headphones size={28} />
              </div>
              <h3>Multilingual Communication</h3>
              <p>
                Professional communication and support in multiple languages throughout the process.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-line"></div>

      {/* ==================== WHAT WE DO ==================== */}
      <section className="sect what-section" id="pricing">
        <div className="container">
          <div className="sect-header reveal">
            <span className="eyebrow">What We Do</span>
            <h2 className="heading-lg">
              Business Expansion & <em className="em-accent">Market Coordination</em>
            </h2>
            <p className="body-md" style={{ marginTop: 16, maxWidth: 580 }}>
              Corpenta provides professional consulting and coordination support for international companies interested in the Saudi market.
            </p>
          </div>

          <div className="services-steps">
            <div className="service-step reveal reveal-delay-1">
              <div className="step-connector"></div>
              <div className="step-circle">
                <Target size={24} />
              </div>
              <div className="step-content">
                <div className="step-number">01</div>
                <h3>Market Entry Advisory</h3>
                <p>
                  Strategic guidance for companies evaluating expansion into Saudi Arabia, including market analysis and entry strategy development.
                </p>
              </div>
            </div>

            <div className="service-step reveal reveal-delay-2">
              <div className="step-connector"></div>
              <div className="step-circle">
                <Handshake size={24} />
              </div>
              <div className="step-content">
                <div className="step-number">02</div>
                <h3>Business Coordination Support</h3>
                <p>
                  Professional coordination support throughout different stages of business expansion and operational preparation.
                </p>
              </div>
            </div>

            <div className="service-step reveal reveal-delay-3">
              <div className="step-connector"></div>
              <div className="step-circle">
                <FileCheck size={24} />
              </div>
              <div className="step-content">
                <div className="step-number">03</div>
                <h3>Operational Planning Support</h3>
                <p>
                  Support related to operational readiness, planning, and international business coordination.
                </p>
              </div>
            </div>

            <div className="service-step reveal reveal-delay-4">
              <div className="step-connector"></div>
              <div className="step-circle">
                <Globe size={24} />
              </div>
              <div className="step-content">
                <div className="step-number">04</div>
                <h3>International Business Communication</h3>
                <p>
                  Clear and structured communication for international companies and investors throughout the engagement.
                </p>
              </div>
            </div>

            <div className="service-step reveal reveal-delay-5">
              <div className="step-connector"></div>
              <div className="step-circle">
                <MessageCircle size={24} />
              </div>
              <div className="step-content">
                <div className="step-number">05</div>
                <h3>WhatsApp Communication</h3>
                <p>
                  Direct communication with our team for faster follow-up and coordination via WhatsApp.
                </p>
              </div>
            </div>

            <div className="service-step reveal reveal-delay-6">
              <div className="step-circle">
                <Briefcase size={24} />
              </div>
              <div className="step-content">
                <div className="step-number">06</div>
                <h3>Business Expansion & Market Coordination</h3>
                <p>
                  Comprehensive consulting and coordination support for international companies interested in the Saudi market.
                </p>
              </div>
            </div>
          </div>

          <div className="cta-mid reveal">
            <a
              href="#contact"
              className="btn-primary"
              onClick={(e) => scrollTo(e, 'contact')}
            >
              Request a Consultation
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="sect how-section" id="how-it-works">
        <div className="container">
          <div className="sect-header reveal">
            <span className="eyebrow">How It Works</span>
            <h2 className="heading-lg">
              Structured <em className="em-accent">Consulting</em> Process
            </h2>
          </div>

          <div className="process-track">
            {[
              {
                num: '01',
                title: 'Initial Consultation',
                desc: 'Discussion of business goals, expansion plans, and market interests.',
              },
              {
                num: '02',
                title: 'Business Evaluation',
                desc: 'Review of business activity and expansion objectives.',
              },
              {
                num: '03',
                title: 'Strategic Planning',
                desc: 'Guidance regarding suitable business expansion approaches and operational considerations.',
              },
              {
                num: '04',
                title: 'Coordination & Support',
                desc: 'Ongoing coordination support during business expansion planning.',
              },
              {
                num: '05',
                title: 'Operational Preparation',
                desc: 'Support related to business readiness and operational coordination.',
              },
              {
                num: '06',
                title: 'Ongoing Communication',
                desc: 'Continued communication and support for international businesses.',
              },
            ].map((step, idx) => (
              <div key={idx} className={`process-card reveal reveal-delay-${idx + 1}`}>
                <div className="process-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHO WE WORK WITH ==================== */}
      <section className="sect who-section" id="who-is-this-for">
        <div className="container">
          <div className="sect-header reveal">
            <span className="eyebrow">Who We Work With</span>
            <h2 className="heading-lg">
              Designed for <em className="em-accent">International</em> Businesses
            </h2>
          </div>

          <div className="audience-grid">
            <div className="audience-card reveal reveal-delay-1">
              <div className="audience-icon">
                <Building2 size={22} />
              </div>
              <div>
                <h3>International Companies</h3>
                <p>
                  Businesses seeking expansion opportunities in Saudi Arabia and the Gulf region.
                </p>
              </div>
            </div>
            <div className="audience-card reveal reveal-delay-2">
              <div className="audience-icon">
                <Award size={22} />
              </div>
              <div>
                <h3>Investors & Entrepreneurs</h3>
                <p>
                  International entrepreneurs exploring long-term opportunities in the region.
                </p>
              </div>
            </div>
            <div className="audience-card reveal reveal-delay-3">
              <div className="audience-icon">
                <Briefcase size={22} />
              </div>
              <div>
                <h3>Construction & Engineering Companies</h3>
                <p>
                  Companies interested in infrastructure and development opportunities.
                </p>
              </div>
            </div>
            <div className="audience-card reveal reveal-delay-4">
              <div className="audience-icon">
                <Zap size={22} />
              </div>
              <div>
                <h3>Technology & Digital Businesses</h3>
                <p>
                  IT, software, AI, cloud, and digital service companies expanding internationally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-line"></div>

      {/* ==================== WHY CORPENTA ==================== */}
      <section className="sect trust-section" id="why-corpenta">
        <div className="container">
          <div className="sect-header reveal">
            <span className="eyebrow">Why Corpenta</span>
            <h2 className="heading-lg">
              Professional Communication & <em className="em-accent">International</em> Focus
            </h2>
          </div>

          <div className="trust-pillars">
            <div className="trust-pillar reveal reveal-delay-1">
              <div className="trust-pillar-icon">
                <Globe size={22} />
              </div>
              <h3>International Business Focus</h3>
              <p>Support tailored for international companies.</p>
            </div>
            <div className="trust-pillar reveal reveal-delay-2">
              <div className="trust-pillar-icon">
                <Headphones size={22} />
              </div>
              <h3>Multilingual Support</h3>
              <p>Professional communication in multiple languages.</p>
            </div>
            <div className="trust-pillar reveal reveal-delay-3">
              <div className="trust-pillar-icon">
                <CheckCircle2 size={22} />
              </div>
              <h3>Clear Coordination</h3>
              <p>Structured communication and organized follow-up.</p>
            </div>
            <div className="trust-pillar reveal reveal-delay-4">
              <div className="trust-pillar-icon">
                <Landmark size={22} />
              </div>
              <h3>Regional Market Understanding</h3>
              <p>Understanding of the Saudi and Gulf business environment.</p>
            </div>
            <div className="trust-pillar reveal reveal-delay-5">
              <div className="trust-pillar-icon">
                <MessageCircle size={22} />
              </div>
              <h3>Direct Communication</h3>
              <p>One communication point throughout the coordination process.</p>
            </div>
          </div>

          <div className="direct-banner reveal">
            <h3>
              We Speak Your <em>Business Language</em>
            </h3>
            <p>
              Corpenta provides clear, professional, and structured consulting services for international companies expanding into the Saudi and Gulf markets.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT FORM ==================== */}
      <section className="sect form-section" id="contact">
        <div className="container">
          <div className="form-layout">
            <div className="form-left reveal">
              <span className="eyebrow">Start Now</span>
              <h2 className="heading-lg">
                Request a <em className="em-accent">Consultation</em>
              </h2>
              <p className="body-lg" style={{ margin: '20px 0 40px', maxWidth: 420 }}>
                Fill out the form and our team will contact you within 24 hours.
              </p>
              <ul className="form-checklist">
                <li>
                  <span className="form-check-icon">
                    <CheckCircle2 size={13} />
                  </span>
                  Initial consultation without obligation
                </li>
                <li>
                  <span className="form-check-icon">
                    <CheckCircle2 size={13} />
                  </span>
                  Professional communication
                </li>
                <li>
                  <span className="form-check-icon">
                    <CheckCircle2 size={13} />
                  </span>
                  Fast response time
                </li>
                <li>
                  <span className="form-check-icon">
                    <CheckCircle2 size={13} />
                  </span>
                  Confidential handling of information
                </li>
              </ul>
            </div>

            <div className="form-card reveal reveal-delay-2">
              {submitted ? (
                <div className="form-success">
                  <div className="form-success-icon">
                    <CheckCircle2 size={30} />
                  </div>
                  <h3>Thank You!</h3>
                  <p>
                    Your request has been sent successfully.
                    <br />
                    The Corpenta team will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <div className="form-card-header">
                    <h3>Contact Form</h3>
                    <p>Fields marked with * are required</p>
                  </div>

                  {error && <div className="form-error"><p>{error}</p></div>}

                  <form onSubmit={handleSubmit}>
                    <div className="form-group full">
                      <label className="form-label">
                        Full Name <span className="req">*</span>
                      </label>
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Enter your full name"
                        required
                        disabled={loading}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">
                          Email <span className="req">*</span>
                        </label>
                        <input
                          className="form-input"
                          type="email"
                          placeholder="email@example.com"
                          required
                          disabled={loading}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          dir="ltr"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          Phone Number <span className="req">*</span>
                        </label>
                        <input
                          className="form-input"
                          type="tel"
                          placeholder="+966 5X XXX XXXX"
                          required
                          disabled={loading}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="form-group full">
                      <label className="form-label">
                        Business Activity <span className="req">*</span>
                      </label>
                      <select
                        className="form-select"
                        required
                        disabled={loading}
                        value={formData.activity}
                        onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                      >
                        <option value="" disabled>
                          Select your business activity
                        </option>
                        <option value="Consulting">Consulting</option>
                        <option value="Trading">Trading</option>
                        <option value="IT Services">IT Services</option>
                        <option value="Professional Services">Professional Services</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Construction">Construction</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Logistics">Logistics</option>
                        <option value="Tourism">Tourism</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="form-group full">
                      <label className="form-label">
                        Short Message <span className="opt">(optional)</span>
                      </label>
                      <textarea
                        className="form-textarea"
                        rows={3}
                        placeholder="Briefly describe your business plans or expansion goals."
                        disabled={loading}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="form-submit"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Request a Consultation'}
                    </button>
                  </form>

                  <p className="form-footer">
                    Your information is kept confidential and used only to respond to your inquiry.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* WhatsApp Banner */}
          <div className="whatsapp-banner reveal">
            <div className="whatsapp-banner-left">
              <div className="whatsapp-banner-icon">
                <MessageCircle size={24} />
              </div>
              <div className="whatsapp-banner-text">
                <h4>WhatsApp Support Available</h4>
                <p>Or contact us directly on WhatsApp for faster response</p>
              </div>
            </div>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-wa"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="lp-footer">
        <div className="container">
          <div className="footer-row">
            <p>&copy; 2026 Corpenta — International Business Consulting</p>
            <div className="footer-loc">
              <MapPin size={13} />
              Jeddah, Saudi Arabia
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
