'use client';

import './design4.css';
import { 
  Building2, 
  FileCheck, 
  HeadphonesIcon, 
  Globe, 
  MessageCircle,
  CheckCircle2,
  TrendingUp,
  Shield,
  Zap,
  Target,
  Users,
  Award
} from 'lucide-react';
import { useState } from 'react';
import { ASSETS } from '@/lib/paths';
import { CONTACT } from '@/lib/constants';

export default function Design4() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', activity: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'حدث خطأ في إرسال الرسالة');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', activity: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ. الرجاء المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="design4-container">
      {/* Header */}
      <header className="design4-header">
        <div className="design4-header-container">
          <a href="https://corpenta.com/" target="_blank" rel="noopener noreferrer" className="design4-logo">
            <img src={ASSETS.logo} alt="Corpenta" className="design4-logo-img" />
          </a>
          <nav className="design4-nav">
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#why-corpenta">Why Us</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="design4-header-actions">
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="design4-btn-whatsapp">
              <MessageCircle size={18} />
              WhatsApp
            </a>
            <a href="#contact" className="design4-btn-cta">Book Consultation</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="design4-hero">
        <h1 className="design4-hero-title">
          Your Company in <span className="highlight">Saudi Arabia</span> — Without Bureaucracy
        </h1>
        <p className="design4-hero-subtitle">
          We manage the entire company formation process: from the MISA investment license to corporate bank account assistance — with complete professional support in English.
        </p>
        <div className="design4-hero-buttons">
          <a href="#contact" className="design4-btn-primary">Start Your Consultation →</a>
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="design4-btn-secondary">Chat on WhatsApp</a>
        </div>

        {/* Stats */}
        <div className="design4-stats">
          <div className="design4-stat-item">
            <div className="design4-stat-number">100%</div>
            <div className="design4-stat-label">Foreign Ownership Available</div>
          </div>
          <div className="design4-stat-item">
            <div className="design4-stat-number">0%</div>
            <div className="design4-stat-label">Personal Income Tax on Salaries (Generally)</div>
          </div>
          <div className="design4-stat-item">
            <div className="design4-stat-number">6</div>
            <div className="design4-stat-label">Support Languages Available</div>
          </div>
        </div>
      </section>

      {/* Why Saudi Arabia Section */}
      <section className="design4-section">
        <div className="design4-section-header">
          <span className="design4-section-tag">— WHY SAUDI ARABIA</span>
          <h2 className="design4-section-title">
            The Largest Economy in the Middle East — <span className="highlight">Open</span> to Foreign Investors
          </h2>
        </div>

        <div className="design4-features-grid">
          <div className="design4-feature-card">
            <div className="design4-feature-icon blue">
              <Building2 size={24} />
            </div>
            <h3 className="design4-feature-title">100% Foreign Ownership</h3>
            <p className="design4-feature-text">
              Foreign investors can fully own companies in Saudi Arabia without requiring a local partner in most business sectors.
            </p>
          </div>

          <div className="design4-feature-card">
            <div className="design4-feature-icon gold">
              <TrendingUp size={24} />
            </div>
            <h3 className="design4-feature-title">Competitive Tax Environment</h3>
            <p className="design4-feature-text">
              No personal income tax on salaries in general. Corporate tax may apply depending on structure and tax status.
            </p>
          </div>

          <div className="design4-feature-card">
            <div className="design4-feature-icon purple">
              <Zap size={24} />
            </div>
            <h3 className="design4-feature-title">Vision 2030</h3>
            <p className="design4-feature-text">
              Massive opportunities in technology, construction, healthcare, logistics, tourism, and infrastructure.
            </p>
          </div>

          <div className="design4-feature-card">
            <div className="design4-feature-icon orange">
              <Target size={24} />
            </div>
            <h3 className="design4-feature-title">GCC Market Access</h3>
            <p className="design4-feature-text">
              Direct access to Gulf markets including Saudi Arabia, UAE, Qatar, Bahrain, Kuwait, and Oman.
            </p>
          </div>

          <div className="design4-feature-card">
            <div className="design4-feature-icon green">
              <Shield size={24} />
            </div>
            <h3 className="design4-feature-title">Stability</h3>
            <p className="design4-feature-text">
              Strong economy, A+ credit rating, and modern infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="design4-section design4-section-alt">
        <div className="design4-section-header">
          <span className="design4-section-tag">— WHAT WE DO FOR YOU</span>
          <h2 className="design4-section-title">
            We manage the <span className="highlight">complete</span> company formation process
          </h2>
          <p className="design4-section-subtitle">
            Corpenta is a direct service provider — not an intermediary. One point of contact, full responsibility.
          </p>
        </div>

        <div className="design4-services-list">
          <div className="design4-service-item">
            <div className="design4-service-icon">
              <FileCheck size={20} />
            </div>
            <div className="design4-service-content">
              <h3>MISA Investment License</h3>
              <p>We obtain the foreign investment license from the Ministry of Investment — the essential document required to legally operate in Saudi Arabia.</p>
            </div>
          </div>

          <div className="design4-service-item">
            <div className="design4-service-icon">
              <Building2 size={20} />
            </div>
            <div className="design4-service-content">
              <h3>Full Commercial Registration</h3>
              <p>Preparation of incorporation documents, notarization, Chamber of Commerce registration, GOSI, Qiwa, and all required government platform registrations.</p>
            </div>
          </div>

          <div className="design4-service-item">
            <div className="design4-service-icon">
              <HeadphonesIcon size={20} />
            </div>
            <div className="design4-service-content">
              <h3>Post-Formation Support</h3>
              <p>General Manager visa assistance, residency (Iqama) support, ZATCA registration, and corporate bank account assistance.</p>
            </div>
          </div>

          <div className="design4-service-item">
            <div className="design4-service-icon">
              <Globe size={20} />
            </div>
            <div className="design4-service-content">
              <h3>Full English Support</h3>
              <p>Clear communication throughout the entire process. The Corpenta team supports clients in 6 languages.</p>
            </div>
          </div>

          <div className="design4-service-item">
            <div className="design4-service-icon">
              <MessageCircle size={20} />
            </div>
            <div className="design4-service-content">
              <h3>WhatsApp Communication</h3>
              <p>Direct communication with our team through WhatsApp for faster follow-up and updates.</p>
            </div>
          </div>
        </div>

        <div className="design4-cta-buttons">
          <a href="#contact" className="design4-btn-primary">Start Your Consultation</a>
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="design4-btn-secondary">Chat on WhatsApp</a>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="design4-section">
        <div className="design4-section-header">
          <span className="design4-section-tag">— HOW IT WORKS</span>
          <h2 className="design4-section-title">
            From First Contact to an <span className="highlight">Operational</span> Company
          </h2>
        </div>

        <div className="design4-steps">
          {[
            { num: '01', title: 'Consultation & Analysis', desc: 'We review your company documents and determine the most suitable legal structure for Saudi Arabia.' },
            { num: '02', title: 'MISA License', desc: 'We prepare and submit the complete application file for the foreign investment license.' },
            { num: '03', title: 'Incorporation Documents', desc: 'We prepare and notarize the company formation documents according to Saudi regulations.' },
            { num: '04', title: 'Full Registration', desc: 'Commercial Registration, GOSI, Qiwa, Chamber of Commerce — handled within one complete process.' },
            { num: '05', title: 'Visa & Residency', desc: 'Full support for the General Manager visa and residency (Iqama) process.' },
            { num: '06', title: 'Bank Account & Operations', desc: 'Corporate bank account assistance and post-launch operational support.' }
          ].map((step, idx) => (
            <div key={idx} className="design4-step">
              <div className="design4-step-number">{step.num}</div>
              <div className="design4-step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="design4-timeline-note">
          <strong>Estimated Timeline:</strong> 3–8 Weeks
          <span className="design4-timeline-sub">Depending on package and application complexity.</span>
        </div>
      </section>

      {/* Who Is This For Section */}
      <section className="design4-section design4-section-alt">
        <div className="design4-section-header">
          <span className="design4-section-tag">— WHO IS THIS FOR</span>
          <h2 className="design4-section-title">
            Our Services Are Designed for <span className="highlight">Serious</span> Businesses
          </h2>
        </div>

        <div className="design4-target-grid">
          <div className="design4-target-card">
            <Users size={32} />
            <h3>International Companies</h3>
            <p>Businesses looking to expand into the Saudi market and benefit from the Kingdom's growing economy.</p>
          </div>
          <div className="design4-target-card">
            <Award size={32} />
            <h3>Investors with Existing Companies</h3>
            <p>Businesses with active legal entities abroad seeking to establish a branch or subsidiary in Saudi Arabia.</p>
          </div>
          <div className="design4-target-card">
            <Building2 size={32} />
            <h3>Construction & Engineering Companies</h3>
            <p>Saudi Arabia is investing heavily in infrastructure, creating major opportunities for international companies.</p>
          </div>
          <div className="design4-target-card">
            <Zap size={32} />
            <h3>Technology & IT Services</h3>
            <p>Rapid growth in digital sectors with major investments in AI, cloud infrastructure, and digital transformation.</p>
          </div>
        </div>
      </section>

      {/* Why Corpenta Section */}
      <section className="design4-section">
        <div className="design4-section-header">
          <span className="design4-section-tag">— WHY CORPENTA</span>
          <h2 className="design4-section-title">
            Transparency, Expertise, and <span className="highlight">Direct</span> Involvement
          </h2>
        </div>

        <div className="design4-why-grid">
          <div className="design4-why-item">
            <CheckCircle2 className="design4-why-icon" />
            <h3>Direct Service Provider</h3>
            <p>We are not intermediaries. We manage the process directly with Saudi authorities.</p>
          </div>
          <div className="design4-why-item">
            <CheckCircle2 className="design4-why-icon" />
            <h3>6 Support Languages</h3>
            <p>Professional multilingual communication throughout the process.</p>
          </div>
          <div className="design4-why-item">
            <CheckCircle2 className="design4-why-icon" />
            <h3>Fixed Pricing</h3>
            <p>Clear pricing from the beginning with no hidden costs.</p>
          </div>
          <div className="design4-why-item">
            <CheckCircle2 className="design4-why-icon" />
            <h3>Complete Expertise</h3>
            <p>MISA, ZATCA, Qiwa, GOSI — we work directly with all major Saudi government platforms.</p>
          </div>
        </div>

        <div className="design4-highlight-box">
          <h3>We Are Not Brokers</h3>
          <p>Corpenta directly manages the entire process — from the first document to full operational setup. One responsible team without third-party intermediaries.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="design4-section design4-section-contact">
        <div className="design4-contact-container">
          <div className="design4-contact-info">
            <h2>Start Now</h2>
            <h3>Request a Free Consultation</h3>
            <p>Fill out the form and our team will contact you within 24 hours.</p>
            
            <ul className="design4-contact-benefits">
              <li><CheckCircle2 size={18} /> Initial consultation without obligation</li>
              <li><CheckCircle2 size={18} /> Response within 24 hours</li>
              <li><CheckCircle2 size={18} /> Professional multilingual support</li>
              <li><CheckCircle2 size={18} /> Complete confidentiality</li>
              <li><CheckCircle2 size={18} /> WhatsApp Support Available</li>
            </ul>
          </div>

          <div className="design4-contact-form">
            {submitted ? (
              <div className="design4-success-message">
                <div className="design4-success-icon">
                  <CheckCircle2 size={48} />
                </div>
                <h3>Thank You for Contacting Us!</h3>
                <p>We will get back to you as soon as possible.</p>
              </div>
            ) : (
              <>
                <h4>Contact Form</h4>
                <p className="design4-form-note">Fields marked with * are required</p>
                
                {error && (
                  <div className="design4-error-message">
                    <p>{error}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="design4-form-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="Enter your full name" 
                      required 
                      disabled={loading}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="design4-form-row">
                    <div className="design4-form-group">
                      <label>Email *</label>
                      <input 
                        type="email" 
                        placeholder="email@example.com" 
                        required 
                        disabled={loading}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        dir="ltr"
                      />
                    </div>

                    <div className="design4-form-group">
                      <label>Phone Number *</label>
                      <input 
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

                  <div className="design4-form-group">
                    <label>Business Activity *</label>
                    <select 
                      required
                      disabled={loading}
                      value={formData.activity}
                      onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                    >
                      <option value="">Select your business activity</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Trading">Trading</option>
                      <option value="IT Services">IT Services</option>
                      <option value="Professional Services">Professional Services</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Construction">Construction</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="design4-form-group">
                    <label>Your Message (Optional)</label>
                    <textarea 
                      rows={4} 
                      placeholder="Tell us about your project or inquiry..."
                      disabled={loading}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="design4-btn-primary design4-btn-full"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Your Inquiry'}
                  </button>
                </form>

                <div className="design4-whatsapp-alt">
                  Or Contact Us Directly on <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                </div>

                <p className="design4-privacy-note">
                  Your information remains confidential and is used only to respond to your inquiry.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="design4-footer">
        <p>©️ 2026 Corpenta — Company Formation Experts</p>
        <p>Jeddah, Saudi Arabia</p>
      </footer>
    </div>
  );
}
