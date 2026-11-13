import { useState } from 'react';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const emailAddress = 'Sanjanabanjare2512@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending message or open mail client
    window.location.href = `mailto:${emailAddress}?subject=Contact from ${encodeURIComponent(
      formData.name || 'Portfolio Visitor'
    )}&body=${encodeURIComponent(formData.message)}%0A%0AReply to: ${encodeURIComponent(
      formData.email
    )}`;
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  return (
    <section className="portfolio-section contact-section" id="contact">
      <div className="section-container">
        <div className="contact-wrapper">
          <div className="contact-info">
            <p className="section-kicker">06 / GET IN TOUCH</p>
            <h2 className="section-title">
              Have an idea? <br />
              <span>Let's make it real.</span>
            </h2>
            <p className="contact-lead">
              Always open to discussing new engineering opportunities, creative
              collaborations, or high-impact full-stack development projects.
            </p>

            <div className="contact-actions-box">
              <div className="email-copy-pill interactive" onClick={handleCopyEmail}>
                <span className="email-label">{emailAddress}</span>
                <span className="copy-badge">
                  {copied ? '✓ Copied!' : 'Copy Email'}
                </span>
              </div>

              <a
                href={`mailto:${emailAddress}`}
                className="btn-pill-solid interactive"
                style={{ width: 'fit-content', marginTop: '16px' }}
              >
                <span>Direct Email</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>

            <div className="social-links-row">
              <a
                href="https://www.linkedin.com/in/sanjana-banjare/"
                target="_blank"
                rel="noreferrer"
                className="social-pill interactive"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/Sanjanabanjare"
                target="_blank"
                rel="noreferrer"
                className="social-pill interactive"
              >
                GitHub ↗
              </a>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-glass-form" onSubmit={handleSubmit}>
              <h3 className="form-heading">Send a Quick Message</h3>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="e.g. Alex Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="interactive"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="interactive"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project, idea, or role..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="interactive"
                />
              </div>

              <button type="submit" className="btn-form-submit interactive">
                <span>{formSent ? 'Opening Mail Client...' : 'Send Message ↗'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
