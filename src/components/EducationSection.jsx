export default function EducationSection() {
  const educationList = [
    {
      degree: 'Bachelor of Technology (B.Tech.)',
      major: 'Computer Science and Engineering',
      institution: 'Lovely Professional University (LPU), Punjab',
      period: 'August 2024 – Present',
      scoreLabel: 'CGPA',
      score: '7.09',
      highlight: 'Specializing in Full-Stack Web Development, Data Structures & Cloud Systems',
    },
    {
      degree: 'Higher Secondary Education (Class XII)',
      major: 'Science Stream (PCM)',
      institution: 'Ashoka Public School, Chhattisgarh',
      period: '2021 – 2023',
      scoreLabel: 'Percentage',
      score: '70%',
      highlight: 'Strong foundation in Mathematics, Physics, and Analytical Logic',
    },
    {
      degree: 'Secondary Education (Class X)',
      major: 'General Curriculum',
      institution: 'Happy Public School, Chhattisgarh',
      period: '2019 – 2021',
      scoreLabel: 'Percentage',
      score: '97%',
      highlight: 'Academic excellence and top-tier scholastic achievement',
    },
  ];

  const certifications = [
    {
      title: 'Database Management System',
      issuer: 'Infosys Springboard',
      date: 'August 2026',
      icon: '🗄️',
    },
    {
      title: 'Advanced Backend Development',
      issuer: 'Lovely Professional University',
      date: 'July 2026',
      icon: '⚡',
    },
    {
      title: 'Java Programming Language',
      issuer: 'Neo Browser',
      date: 'May 2026',
      icon: '☕',
    },
    {
      title: 'C++ Programming',
      issuer: 'Infosys Springboard',
      date: 'August 2025',
      icon: '⚙️',
    },
    {
      title: 'C Programming Language',
      issuer: 'Neo Browser',
      date: 'May 2025',
      icon: '💻',
    },
    {
      title: 'Artificial Intelligence & Machine Learning',
      issuer: 'Skillera',
      date: 'March 2025',
      icon: '🤖',
    },
    {
      title: 'AWS & AI Skill Development Program',
      issuer: 'Cloud Computing and Artificial Intelligence',
      date: 'May 2025',
      icon: '☁️',
    },
  ];

  return (
    <section className="portfolio-section education-section" id="education">
      <div className="section-container">
        <div className="section-header">
          <p className="section-kicker">05 / ACADEMIC & CREDENTIALS</p>
          <h2 className="section-title">
            Education & <span>Certifications.</span>
          </h2>
          <p className="section-subtitle">
            Formal education in Computer Science and Engineering accompanied by
            industry-recognized certifications in software engineering.
          </p>
        </div>

        <div className="education-certs-layout">
          {/* Education Column */}
          <div className="education-column">
            <h3 className="sub-column-heading">
              <span className="col-icon">🎓</span> Academic Background
            </h3>

            <div className="edu-cards-stack">
              {educationList.map((edu, idx) => (
                <div key={idx} className="edu-card interactive">
                  <div className="edu-card-top">
                    <div>
                      <h4 className="edu-degree">{edu.degree}</h4>
                      <p className="edu-major">{edu.major}</p>
                      <p className="edu-institution">{edu.institution}</p>
                    </div>
                    <div className="edu-score-pill">
                      <span className="score-label">{edu.scoreLabel}</span>
                      <span className="score-val">{edu.score}</span>
                    </div>
                  </div>

                  <p className="edu-highlight">{edu.highlight}</p>
                  <span className="edu-period">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div className="certifications-column">
            <h3 className="sub-column-heading">
              <span className="col-icon">📜</span> Professional Certifications
            </h3>

            <div className="certs-grid">
              {certifications.map((cert, idx) => (
                <div key={idx} className="cert-card interactive">
                  <span className="cert-icon">{cert.icon}</span>
                  <div className="cert-info">
                    <h4 className="cert-title">{cert.title}</h4>
                    <p className="cert-issuer">{cert.issuer}</p>
                    <span className="cert-date">{cert.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
