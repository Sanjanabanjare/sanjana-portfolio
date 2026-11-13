const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="luxury-footer">
      <div className="section-container footer-content">
        <div className="footer-left">
          <a href="#home" className="footer-brand interactive">
            SANJANA<span>.</span>
          </a>
          <p className="footer-tagline">
            Designed & Engineered with modern zero-lag canvas animation.
          </p>
        </div>

        <div className="footer-right">
          <span className="footer-location">BASED IN INDIA · AVAILABLE GLOBALLY</span>
          <a href="#home" className="footer-back-to-top interactive">
            Back to top ↑
          </a>
        </div>
      </div>
      <div className="footer-bottom-bar">
        <span>© {CURRENT_YEAR} Sanjana Banjare. All rights reserved.</span>
      </div>
    </footer>
  );
}
