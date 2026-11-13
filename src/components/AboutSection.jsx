export default function AboutSection() {
  return (
    <section className="portfolio-section about-section" id="about">
      <div className="section-container">
        <div className="section-header">
          <p className="section-kicker">01 / WHO I AM</p>
          <h2 className="section-title">
            About <span>Myself.</span>
          </h2>
          <p className="section-lead-quote">
            "Innovation begins with a question, evolves through experimentation, and succeeds through execution."
          </p>
        </div>

        <div className="about-content-layout">
          <div className="about-main-text-card">
            <p className="about-paragraph primary-highlight">
              I am a <strong>Computer Science Graduate, technology enthusiast, and aspiring innovator</strong> passionate
              about transforming ambitious ideas into impactful digital solutions. With a strong foundation in{' '}
              <strong>software development, backend engineering, and full-stack technologies</strong>, I thrive on solving
              complex problems and creating scalable, efficient, and user-centric applications.
            </p>

            <p className="about-paragraph">
              My expertise spans programming, database management, API integration, and modern web technologies.
              Through projects such as <strong>EduVerse and GymPro</strong>, I have explored innovative ways to bridge
              technology with real-world challenges. Securing a{' '}
              <span className="accent-badge-text">Top 3 position in a college hackathon among 200+ participants</span>{' '}
              reflects my commitment to creative thinking, collaboration, and technical excellence.
            </p>

            <p className="about-paragraph">
              Beyond technology, I am driven by <strong>curiosity, continuous growth, and the desire to create meaningful impact</strong>.
              My vision is to build intelligent digital experiences, embrace emerging technologies, and turn bold ideas
              into solutions that inspire, empower, and make a difference.
            </p>
          </div>

          <div className="about-sidebar-cards">
            {/* Hackathon Distinction Card */}
            <div className="about-feature-card hackathon-card interactive">
              <div className="feature-icon">🏆</div>
              <div className="feature-content">
                <span className="feature-tag">COLLEGE HACKATHON</span>
                <h3 className="feature-title">Top 3 Position</h3>
                <p className="feature-desc">
                  Ranked among the top 3 teams out of 200+ competitive participants for innovative problem-solving and rapid prototype execution.
                </p>
              </div>
            </div>

            {/* Core Pillars */}
            <div className="about-feature-card interactive">
              <div className="feature-icon">⚡</div>
              <div className="feature-content">
                <span className="feature-tag">FULL-STACK & BACKEND</span>
                <h3 className="feature-title">Robust Architecture</h3>
                <p className="feature-desc">
                  Building dependable, scalable server-side systems, REST APIs, and responsive user interfaces with modern frameworks.
                </p>
              </div>
            </div>

            <div className="about-feature-card interactive">
              <div className="feature-icon">✨</div>
              <div className="feature-content">
                <span className="feature-tag">PHILOSOPHY</span>
                <h3 className="feature-title">Curiosity & Craft</h3>
                <p className="feature-desc">
                  Approaching development with creativity and user empathy, turning concepts into polished, intuitive digital realities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
