export default function ProjectsSection() {
  const projects = [
    {
      id: '01',
      title: 'EduVerse 3D – Immersive Virtual Learning Platform',
      badge: 'FEATURED · ACTIVE PROJECT',
      period: 'Jun 2026 – Present',
      description:
        'An immersive EdTech platform bringing together 3D learning spaces, virtual classrooms, interactive coding labs, assignment management, and collaborative study. Exploring AI-powered hand-gesture recognition, live webcam drawing, a virtual air keyboard, and intelligent learning analytics.',
      tags: ['React', 'Three.js', 'WebGL', 'Node.js', 'JavaScript', 'Python', 'OpenCV'],
      status: 'Active Development',
      github: 'https://github.com/Sanjanabanjare/eduverse-3d',
      featured: true,
    },
    {
      id: '02',
      title: 'GymPro — Fitness Center Management System',
      badge: 'FULL-STACK PLATFORM',
      period: 'July 2026',
      description:
        'Developed a full-stack fitness management platform to streamline gym operations and member management. Built interactive dashboards and backend services with database integration, API functionality, and authentication to support efficient data management.',
      tags: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT'],
      status: 'Completed',
      github: 'https://github.com/Sanjanabanjare/gympro.git',
      featured: false,
    },
    {
      id: '03',
      title: 'Real-Time Process Monitoring Dashboard',
      badge: 'SYSTEMS & OS ENGINEERING',
      period: '2025 – 2026',
      description:
        'Developed a Real-Time Process Monitoring Dashboard using C++ and Operating System concepts to monitor active processes, CPU utilization, memory consumption, and system performance metrics. Implemented process tracking, resource monitoring, and real-time data display.',
      tags: ['C++', 'Operating Systems', 'System Programming', 'Monitoring', 'Performance Analytics'],
      status: 'Completed',
      github: 'https://github.com/Sanjanabanjare/Real-Time-Process-Monitoring-Dashboard.git',
      featured: false,
    },
  ];

  return (
    <section className="portfolio-section projects-section" id="projects">
      <div className="section-container">
        <div className="section-header">
          <p className="section-kicker">03 / SELECTED WORK</p>
          <h2 className="section-title">
            Featured <span>Projects.</span>
          </h2>
          <p className="section-subtitle">
            Engineered with a focus on immersive user experience, scalable backend
            architecture, and systems-level performance.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((proj) => (
            <article
              key={proj.id}
              className={`project-card interactive ${proj.featured ? 'featured-card' : ''}`}
            >
              <div className="project-card-top">
                <div className="card-top-left">
                  <span className="project-index">{proj.id}</span>
                  <span className="project-badge">{proj.badge}</span>
                </div>
                <span className="project-period">{proj.period}</span>
              </div>

              <div className="project-card-body">
                <h3 className="project-title">{proj.title}</h3>
                <p className="project-description">{proj.description}</p>
              </div>

              <div className="project-card-bottom">
                <div className="project-tags-wrap">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-links-row">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-github-btn interactive"
                    aria-label={`Open ${proj.title} GitHub repository in a new tab`}
                  >
                    <span>{proj.id === '01' ? 'View Project on GitHub' : 'GitHub Repository'}</span>
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
