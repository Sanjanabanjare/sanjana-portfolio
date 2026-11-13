export default function WorkSection() {
  const projects = [
    {
      id: '01',
      title: 'GymPro Suite',
      category: 'FULL-STACK ENTERPRISE PLATFORM',
      description:
        'A comprehensive fitness center management platform featuring recurring subscription billing, member attendance tracking, trainer schedules, and real-time administrative analytics.',
      tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'REST API'],
      github: 'https://github.com/Sanjanabanjare',
      featured: true,
      stats: 'Automated 80% of admin workflows',
    },
    {
      id: '02',
      title: 'IndiSky Voyages',
      category: 'TRAVEL & DISCOVERY EXPERIENCE',
      description:
        'An immersive travel portal concept for exploring Indian destinations, curated itineraries, hotel reservations, and interactive dynamic weather & route insights.',
      tags: ['JavaScript', 'HTML5/CSS3', 'Modern Canvas', 'REST API', 'Responsive UI'],
      github: 'https://github.com/Sanjanabanjare',
      featured: true,
      stats: 'Sub-second page load speeds',
    },
    {
      id: '03',
      title: 'NeuralVision Studio',
      category: 'CREATIVE AI & VISION INTERFACE',
      description:
        'An experimental frontend lab showcasing generative image styling, zero-latency cursor tracking, and hardware-accelerated WebGL visual interactions.',
      tags: ['React', 'HTML5 Canvas', 'OpenCV Pipeline', 'Python', 'Tailwind'],
      github: 'https://github.com/Sanjanabanjare',
      featured: false,
      stats: '60 FPS synchronized rendering',
    },
  ];

  return (
    <section className="portfolio-section work-section" id="work">
      <div className="section-container">
        <div className="section-header">
          <p className="section-kicker">01 / SELECTED WORK</p>
          <h2 className="section-title">
            Crafting digital products with <span>precision.</span>
          </h2>
          <p className="section-subtitle">
            A selection of full-stack web applications and interactive digital
            experiences built with clean code and modern architecture.
          </p>
        </div>

        <div className="project-cards-grid">
          {projects.map((project) => (
            <article key={project.id} className="luxury-project-card interactive">
              <div className="card-top-meta">
                <span className="card-index">{project.id}</span>
                <span className="card-category">{project.category}</span>
              </div>

              <div className="card-body">
                <h3 className="card-title">{project.title}</h3>
                <p className="card-desc">{project.description}</p>
                <div className="card-stats-pill">
                  <span className="stats-dot" />
                  <span>{project.stats}</span>
                </div>
              </div>

              <div className="card-footer">
                <div className="card-tags-list">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="card-action-link interactive"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <span>Explore on GitHub</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
