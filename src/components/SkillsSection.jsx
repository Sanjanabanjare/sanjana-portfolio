export default function SkillsSection() {
  const skillCategories = [
    {
      id: 'languages',
      title: 'Programming Languages',
      icon: '💻',
      skills: ['Python', 'C++', 'C', 'Java', 'JavaScript'],
    },
    {
      id: 'web',
      title: 'Web & Full-Stack Development',
      icon: '🌐',
      skills: [
        'HTML5',
        'CSS3',
        'React.js',
        'Node.js',
        'Express.js',
        'Full-Stack Development',
        'REST API Development',
        'Responsive Web Design',
      ],
    },
    {
      id: 'databases',
      title: 'Database & Backend Systems',
      icon: '🗄️',
      skills: [
        'MongoDB',
        'MySQL',
        'SQL',
        'DBMS',
        'Database Design',
        'Backend Development',
        'JWT Authentication',
        'API Integration',
      ],
    },
    {
      id: 'analytics',
      title: 'Data & Analytics',
      icon: '📊',
      skills: [
        'Power BI',
        'Microsoft Excel',
        'Data Analysis',
        'Data Visualization',
        'Data Interpretation',
        'Dashboard Development',
      ],
    },
    {
      id: 'tools',
      title: 'Development Tools & Platforms',
      icon: '🛠️',
      skills: ['Git', 'GitHub', 'Visual Studio Code', 'Vite', 'Tailwind CSS', 'Figma'],
    },
    {
      id: 'cloud-ai',
      title: 'Cloud & Emerging Technologies',
      icon: '☁️',
      skills: [
        'AWS Fundamentals',
        'Cloud Computing Fundamentals',
        'Artificial Intelligence Fundamentals',
        'Machine Learning Fundamentals',
      ],
    },
    {
      id: 'se',
      title: 'Software Engineering',
      icon: '⚙️',
      skills: [
        'Data Structures & Algorithms',
        'Object-Oriented Programming',
        'Client-Server Architecture',
        'Software Development',
        'Problem-Solving',
      ],
    },
    {
      id: 'leadership',
      title: 'Professional & Leadership Skills',
      icon: '🤝',
      skills: [
        'Leadership',
        'Team Collaboration',
        'Communication',
        'Critical Thinking',
        'Project Management',
        'Public Speaking',
        'Content Management',
        'Market Research',
        'Operations Management',
        'Team Coordination',
      ],
    },
  ];

  return (
    <section className="portfolio-section skills-section" id="skills">
      <div className="section-container">
        <div className="section-header">
          <p className="section-kicker">04 / TECHNICAL ARSENAL</p>
          <h2 className="section-title">
            Technical <span>Stack.</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive skill set spanning core computer science fundamentals,
            modern full-stack engineering, and collaborative leadership.
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((cat) => (
            <div key={cat.id} className="skill-category-card interactive">
              <div className="category-header">
                <span className="category-icon">{cat.icon}</span>
                <h3 className="category-title">{cat.title}</h3>
              </div>

              <div className="category-chips-wrap">
                {cat.skills.map((skill, index) => (
                  <span
                    key={skill}
                    className="skill-badge-pill interactive"
                    style={{ '--reveal-index': index }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
