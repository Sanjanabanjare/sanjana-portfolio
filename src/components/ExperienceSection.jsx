export default function ExperienceSection() {
  const experiences = [
    {
      id: '01',
      role: 'Operations Intern',
      company: 'AppKit Studio Pvt. Ltd.',
      period: 'May 2026 – August 2026',
      type: 'Internship',
      certificateUrl: 'https://drive.google.com/file/d/1iBOOMGSfdel8i6uBlCJjmxaZaIU4B7tR/view?usp=drive_link',
      certificateLabel: 'View Internship Certificate',
      description:
        'Contributed to day-to-day business operations, team coordination, and workflow management at AppKit Studio. Strengthened professional communication, organizational, and problem-solving abilities while supporting operational activities and collaborating with team members to ensure smooth execution of assigned responsibilities.',
      highlights: [
        'Streamlined workflow management and inter-team operational coordination',
        'Facilitated cross-functional collaboration and milestone delivery',
        'Strengthened executive communication and task prioritization',
      ],
      skills: ['Operations Management', 'Team Coordination', 'Workflow Optimization', 'Communication'],
    },
    {
      id: '02',
      role: 'Backend Development Trainee',
      company: 'Backend Engineering Program',
      period: 'March 2026 – July 2026',
      type: 'Traineeship',
      certificateUrl: 'https://drive.google.com/file/d/1mcC6fGucaACJtPtxe8p9moqAfzXeEB4t/view?usp=drive_link',
      certificateLabel: 'View Training Certificate',
      description:
        'Gained hands-on experience in backend application development using Node.js, Express.js, MongoDB, and REST APIs. Worked on server-side functionality, API integration, and database management while developing a practical understanding of backend architecture, application logic, and version control using Git and GitHub.',
      highlights: [
        'Architected RESTful endpoints and middleware authentication with JWT',
        'Engineered MongoDB schemas with indexing and efficient query pipelines',
        'Managed collaborative codebases with Git version control and GitHub PR workflows',
      ],
      skills: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT', 'Git & GitHub'],
    },
    {
      id: '03',
      role: 'Freelance Digital Marketing',
      company: 'Bizgurukul',
      period: 'April 2023 – September 2025',
      type: 'Freelance',
      description:
        'Worked on digital marketing initiatives focused on brand visibility, audience engagement, and business growth. Contributed to social media campaigns, content management, market research, and competitor analysis while developing skills in marketing strategy, communication, and understanding customer behavior.',
      highlights: [
        'Executed social campaigns improving audience reach and brand resonance',
        'Conducted market research and competitive positioning studies',
        'Leveraged customer analytics to optimize communication and conversion funnels',
      ],
      skills: ['Digital Marketing', 'Market Research', 'Content Strategy', 'Audience Analytics'],
    },
  ];

  return (
    <section className="portfolio-section experience-section" id="experience">
      <div className="section-container">
        <div className="section-header">
          <p className="section-kicker">02 / PROFESSIONAL JOURNEY</p>
          <h2 className="section-title">
            Work <span>Experience.</span>
          </h2>
          <p className="section-subtitle">
            Hands-on professional experience across backend engineering, operations
            management, and digital growth initiatives.
          </p>
        </div>

        <div className="experience-timeline">
          {experiences.map((exp) => (
            <div key={exp.id} className="timeline-item interactive">
              <div className="timeline-marker">
                <span className="marker-dot" />
                <span className="marker-line" />
              </div>

              <div className="timeline-card">
                <div className="card-header-row">
                  <div>
                    <span className="experience-type-pill">{exp.type}</span>
                    <h3 className="experience-role">{exp.role}</h3>
                    <h4 className="experience-company">{exp.company}</h4>
                  </div>
                  <span className="experience-period">{exp.period}</span>
                </div>

                <p className="experience-desc">{exp.description}</p>

                <ul className="experience-highlights-list">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>
                      <span className="bullet-dash">▹</span> {h}
                    </li>
                  ))}
                </ul>

                <div className="experience-skills-tags">
                  {exp.skills.map((s) => (
                    <span key={s} className="exp-skill-tag">
                      {s}
                    </span>
                  ))}
                </div>

                {exp.certificateUrl && (
                  <a
                    href={exp.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="experience-certificate-link interactive"
                    aria-label={`${exp.certificateLabel} in a new tab`}
                  >
                    <span>{exp.certificateLabel}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
