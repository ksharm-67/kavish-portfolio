import './App.css'
import catImage from './assets/cat.jpg'
import { useState, useCallback, memo } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'

// Memoized skill component to prevent unnecessary re-renders
const Skill = memo(function Skill({ name, variant = 1 }) {
  const className = variant === 1 ? 'skill' : `skill${variant}`;
  return <div className={className}>{name}</div>;
});

// Memoized project card
const ProjectCard = memo(function ProjectCard({ title, description, link, index }) {
  return (
    <div className={`proj p${index}`}>
      <p className="job-title">{title}</p>
      <p>{description}</p>
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer">GitHub</a>
      )}
    </div>
  );
});

// Memoized experience card
const ExperienceCard = memo(function ExperienceCard({ title, company, period, points, index }) {
  return (
    <div className={`rectangle card${index}`}>
      <p className="job-title">
        {title}<br /><br />
        {company}<br /><br />
        {period}
      </p>
      <ul>
        {points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </div>
  );
});

// UI/UX project card
const UXProjectCard = memo(function UXProjectCard({ title, tools, date, description, link }) {
  return (
    <div className="ux-card">
      <div className="ux-card-header">
        <h3>{title}</h3>
        <span className="ux-date">{date}</span>
      </div>
      <div className="ux-tools">
        {tools.map((tool, i) => (
          <span key={i} className="ux-tool">{tool}</span>
        ))}
      </div>
      <p className="ux-description">{description}</p>
      <Link to={link} className="ux-link">View Case Study →</Link>
    </div>
  );
});

// Contact form component
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    // For now, just show a success message
    // Replace with actual form submission logic (e.g., EmailJS, Formspree, or your backend)
    setStatus('Thanks for reaching out! I\'ll get back to you soon.');
    setFormData({ name: "", email: "", type: "", subject: "", message: "" });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
          autoComplete="name"
        />
      </label>

      <label>
        Email:
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
          autoComplete="email"
        />
      </label>

      <label>
        Type:
        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="">Select...</option>
          <option value="feedback">Feedback</option>
          <option value="opportunity">Opportunity</option>
          <option value="question">Question</option>
        </select>
      </label>

      <label>
        Subject:
        <input 
          type="text" 
          name="subject" 
          value={formData.subject} 
          onChange={handleChange} 
          required 
        />
      </label>

      <label>
        Message:
        <textarea 
          name="message" 
          value={formData.message} 
          onChange={handleChange} 
          required
          rows={4}
        />
      </label>

      <button type="submit" id="submitb">Submit</button>
      {status && <p className="form-status">{status}</p>}
    </form>
  );
}

// Scroll functions using useCallback pattern
const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

function App() {
  const uiuxProjects = [
    {
      title: "JobTracker",
      tools: ["Figma", "A/B Testing", "UED"],
      date: "Sep 2025 – Nov 2025",
      description: "A comprehensive job application tracking system with intuitive dashboard, profile management, and calendar integration to help students organize their internship and job search process. Conducted comparative usability research examining split-screen versus sequential form layouts.",
      link: "/projects/jobtracker"
    },
    {
      title: "RateMyProfessor Redesign",
      tools: ["Figma", "User Research", "Wireframing"],
      date: "Dec 2025",
      description: "Redesigned core RateMyProfessor flows by analyzing how users search for professors, interpret ratings, and compare options. Created revised user flows and mid-fidelity wireframes that reorganized rating data and reduced cognitive load.",
      link: "/projects/ratemyprofessor"
    }
  ];

  const experiences = [
    {
      title: "Data Engineering Intern",
      company: "CerebrumX",
      period: "(Summer 2025)",
      points: [
        "Built Kafka-based data pipeline with Docker to process 50K+ daily vehicle telemetry events.",
        "Integrated MongoDB and ClickHouse for analytics, achieving 8x faster queries.",
        "Implemented geospatial indexing & anomaly detection, reducing false positives by 40%."
      ]
    },
    {
      title: "AI-Powered Prediction of Protein Thermal Stability",
      company: "Capstone Project",
      period: "(2025 - Present)",
      points: [
        "Engineered features from protein sequence and structure data (FASTA, PDB).",
        "Built & trained regression models in Python (Random Forest, Neural Networks).",
        "Developed pipelines for large biological datasets with RMSE, MAE, R² evaluation."
      ]
    },
    {
      title: "Math Instructional Aide",
      company: "School of Mathematics, ASU",
      period: "(2023 - Present)",
      points: [
        "Graded 50+ assignments weekly for Calculus and College Math using structured rubrics.",
        "Led bi-weekly group discussions of 6-10 students on challenging concepts.",
        "Developed supplementary materials that improved comprehension for 130+ students."
      ]
    }
  ];

  const projects = [
    {
      title: "SecureVault Password Manager",
      description: "A command line password manager using AES encryption and PBKDF2 for key derivation, with password protected access.",
      link: "https://github.com/ksharm-67/SecureVault"
    },
    {
      title: "Vehicle Telemetry Pipeline",
      description: "A secure data pipeline using Kafka to ingest vehicle data and detect anomalies like geofence breaches and GPS spoofing.",
      link: "https://github.com/ksharm-67/CerebrumX-Internship"
    },
    {
      title: "Diffie-Hellman Key Encryption",
      description: "Performs key exchange using a 256-bit key, then uses AES symmetric encryption to encrypt and decrypt data.",
      link: "https://github.com/ksharm-67/Diffie-Hellman-Key-Encryption"
    },
    {
      title: "RSA Encryption",
      description: "Implements the Extended Euclidean Algorithm for private key generation and RSA encryption of plaintext.",
      link: "https://github.com/ksharm-67/RSA-Encryption"
    }
  ];

  const skillCategories = [
    {
      title: "Languages",
      variant: 1,
      skills: ["C", "C++", "Python", "Java", "JavaScript", "SQL"]
    },
    {
      title: "Web & Applications",
      variant: 2,
      skills: ["React.js", "Flask", "HTML", "CSS", "REST APIs"]
    },
    {
      title: "Databases",
      variant: 3,
      skills: ["MongoDB", "ClickHouse", "PostgreSQL"]
    },
    {
      title: "Data & Analysis",
      variant: 4,
      skills: ["R", "Tableau", "scikit-learn", "Excel"]
    },
    {
      title: "Systems & DevOps",
      variant: 5,
      skills: ["Shell Scripting", "Docker", "Git", "Jira", "Unit Testing"]
    }
  ];

  return (
    <div className="App">
      <h1 className="header">Kavish Sharma</h1>

      <nav>
        <ul className="navi">
          <li>
            <a 
              href="https://media.licdn.com/dms/image/v2/D562DAQFb6O9Yx93NgQ/profile-treasury-image-shrink_1280_1280/B56ZpmvnRQI0AQ-/0/1762660349562?e=1763265600&v=beta&t=Ut4s6aO6f5DSViwddoXZLpKqd6RFTYmtxYfD-h2R5KM" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <button className="nav-button" type="button">My Resume</button>
            </a>
          </li>
          <li><button className="nav-button" type="button" onClick={() => scrollToSection('uiux')}>UI/UX</button></li>
          <li><button className="nav-button" type="button" onClick={() => scrollToSection('education')}>Education</button></li>
          <li><button className="nav-button" type="button" onClick={() => scrollToSection('exp')}>Experience</button></li>
          <li><button className="nav-button" type="button" onClick={() => scrollToSection('projects')}>Projects</button></li>
          <li><button className="nav-button" type="button" onClick={() => scrollToSection('skills')}>Skills</button></li>
          <li><button className="nav-button" type="button" onClick={() => scrollToSection('contact')}>Contact</button></li>
        </ul>
      </nav>

      <section className="container">
        <div className="about">
          <h2 className="mini-heading">About Me<span className="blinker">|</span></h2>
          <p className="intro">
            I'm a fourth year student from New Delhi studying Computer Science with a minor in English at 
            Arizona State University. I've been a Teaching Assistant for the Math Department at ASU since 2023, 
            working with MAT 114 (College Math), MAT 210 (Brief Calculus), and MAT 265 (Calculus for Engineers).
          </p>
          <p className="intro">
            I'm also a Grader for first-year English classes (ENG 101 and 102) at the Learning Enterprise. 
            Last summer I interned at CerebrumX in a Data Engineering capacity.
          </p>
          <p className="intro">
            My classes have covered cryptography, data science, and human-computer interaction.
            I'm interested in how cryptography and data science get used in healthcare and finance.
            Both industries handle sensitive information at scale, and the technical challenges around security 
            and analysis seem worth paying attention to.
          </p>
          <p className="intro">
            I'm still early in my career, but I'm trying to learn as much as I can and figure out where I can contribute something useful.
          </p>
        </div>
        <img src={catImage} className="side-img" alt="Profile" loading="lazy" />
      </section>

      {/* UI/UX Portfolio Section */}
      <section id="uiux">
        <h2 className="mini-heading">UI/UX Portfolio</h2>
        <div className="ux-cards">
          {uiuxProjects.map((project, i) => (
            <UXProjectCard key={i} {...project} />
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section id="education">
        <h2 className="mini-heading">Education</h2>
        <div className="education-container">
          <div className="education-card">
            <div className="edu-header">
              <div className="edu-icon">🎓</div>
              <div className="edu-title">
                <h3>Arizona State University</h3>
                <p className="edu-degree">B.S. Computer Science, Minor in English</p>
              </div>
              <div className="edu-date">Aug 2022 - May 2026</div>
            </div>
            
            <div className="edu-details">
              <div className="edu-stat">
                <span className="stat-label">GPA</span>
                <span className="stat-value">3.8</span>
              </div>
              <div className="edu-stat">
                <span className="stat-label">Year</span>
                <span className="stat-value">Senior</span>
              </div>
              <div className="edu-stat">
                <span className="stat-label">Location</span>
                <span className="stat-value">Tempe, AZ</span>
              </div>
            </div>

            <div className="edu-section">
              <h4>Relevant Coursework</h4>
              <div className="coursework-grid">
                <span className="course">Data Structures & Algorithms</span>
                <span className="course">Operating Systems</span>
                <span className="course">Database Management</span>
                <span className="course">Cryptography</span>
                <span className="course">Human-Computer Interaction</span>
                <span className="course">Data Science</span>
                <span className="course">Software Engineering</span>
                <span className="course">Computer Networks</span>
              </div>
            </div>

            <div className="edu-section">
              <h4>Activities & Roles</h4>
              <ul className="activities-list">
                <li>Teaching Assistant, School of Mathematics (2023 - Present)</li>
                <li>Grader, First-Year English Composition (2024 - Present)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="exp">
        <h2 className="mini-heading">Experience</h2>
        <div className="exp-cards">
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} {...exp} index={i + 1} />
          ))}
        </div>
      </section>

      <section id="projects">
        <h2 className="mini-heading">Projects</h2>
        <div className="proj-cards">
          {projects.map((proj, i) => (
            <ProjectCard key={i} {...proj} index={i + 1} />
          ))}
        </div>
      </section>

      <section id="skills">
        <h2 className="mini-heading">Skills</h2>
        {skillCategories.map((category, i) => (
          <div key={i} className={`skill-section ${['', 'two', 'three', 'four', 'five'][category.variant - 1]}`}>
            <div className="skill-heading">
              <h3>{category.title}</h3>
              <div className="skills-container">
                {category.skills.map((skill, j) => (
                  <Skill key={j} name={skill} variant={category.variant} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      <section id="contact">
        <h2 className="mini-heading">Contact Me</h2>
        <div className="contact">
          <ContactForm />
        </div>
      </section>

      <footer>
        <p>© 2025 Kavish Sharma</p>
      </footer>
    </div>
  );
}

// RateMyProfessor Case Study Page
function RMPCaseStudy() {
  const navigate = useNavigate();

  return (
    <div className="case-study">
      <button className="back-button" onClick={() => navigate('/')}>← Back to Portfolio</button>
      
      <header className="case-study-header">
        <h1>Redesigning RateMyProfessors.com</h1>
        <div className="case-study-meta">
          <span className="meta-item">Figma</span>
          <span className="meta-item">User Research</span>
          <span className="meta-item">Wireframing</span>
          <span className="meta-date">December 2025</span>
        </div>
      </header>

      <section className="case-study-section">
        <h2>Introduction</h2>
        <p>
          RateMyProfessors.com is a free site where users can rate their professors at higher education 
          institutions (generally in the US) based on class difficulty, teaching style, and other factors. 
          Users leave reviews to help future students decide whether to take classes offered by a particular professor.
        </p>
        <div className="case-study-objectives">
          <div className="objective">
            <h4>Test Case</h4>
            <p>
              The main objective of this study was to analyze ratemyprofessors.com for usability and 
              accessibility issues. The issues identified would inform a redesign to better support 
              user goals and expectations.
            </p>
          </div>
          <div className="objective">
            <h4>Test Objectives</h4>
            <p>
              To improve ease of use by addressing glitches and unhelpful policies, ensure consistency 
              throughout the website, and help users achieve their intended outcomes.
            </p>
          </div>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Methodology</h2>
        <div className="methodology-steps">
          <div className="method-step">
            <span className="step-number">1</span>
            <div>
              <h4>Preliminary Analysis</h4>
              <p>Understood the purpose and function of the website and verified it matched project requirements.</p>
            </div>
          </div>
          <div className="method-step">
            <span className="step-number">2</span>
            <div>
              <h4>Heuristic Evaluation</h4>
              <p>Used Nielsen's heuristics to assess usability issues based on a severity code.</p>
            </div>
          </div>
          <div className="method-step">
            <span className="step-number">3</span>
            <div>
              <h4>User Research</h4>
              <p>Conducted online surveys through Google Forms and received 23 responses as part of primary research.</p>
            </div>
          </div>
          <div className="method-step">
            <span className="step-number">4</span>
            <div>
              <h4>User Personas</h4>
              <p>Crafted 3 personas based on information gathered during user research.</p>
            </div>
          </div>
          <div className="method-step">
            <span className="step-number">5</span>
            <div>
              <h4>User Stories</h4>
              <p>Created 3 user stories defining tasks the personas would perform on the website.</p>
            </div>
          </div>
          <div className="method-step">
            <span className="step-number">6</span>
            <div>
              <h4>Prototyping</h4>
              <p>Designed an interactive prototype based on user tasks.</p>
            </div>
          </div>
          <div className="method-step">
            <span className="step-number">7</span>
            <div>
              <h4>Usability Testing</h4>
              <p>Conducted task-based testing with 3 participants to evaluate the prototype.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Heuristic Evaluation</h2>
        <div className="heuristic-findings">
          <div className="heuristic-item">
            <h4>User Control and Freedom</h4>
            <p>
              There is currently no way to erase a review if a user submits one without logging in. 
              Additionally, there is no way to add a professor to the website who isn't already listed.
            </p>
          </div>
          <div className="heuristic-item">
            <h4>Error Prevention</h4>
            <ul>
              <li>
                If a user wants to review a professor for a class not in the dropdown list, they must 
                type directly into the dropdown box. There's no separate "add a class" option, leading 
                users to assume they can't add a class and instead select a different one.
              </li>
              <li>
                Anyone, including the professor themselves, can report a review for removal without it 
                actually violating site policy. This enables misuse and unintended outcomes.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="case-study-section">
        <h2>User Research</h2>
        <p>
          I distributed a Google Forms survey to 23 college students across three universities. 
          The survey focused on how often they use RateMyProfessors, what information they look for, 
          and what frustrations they encounter.
        </p>
        <div className="research-findings">
          <div className="finding">
            <span className="finding-stat">78%</span>
            <p>of respondents check RateMyProfessors before registering for classes each semester</p>
          </div>
          <div className="finding">
            <span className="finding-stat">61%</span>
            <p>said they struggle to compare multiple professors teaching the same course</p>
          </div>
          <div className="finding">
            <span className="finding-stat">52%</span>
            <p>mentioned that outdated reviews (3+ years old) make it hard to judge current teaching quality</p>
          </div>
        </div>
        <p>
          Several participants mentioned that the rating categories feel vague. "Difficulty" in particular 
          caused confusion because some students want challenging courses while others want manageable workloads. 
          The current system doesn't distinguish between "hard but rewarding" and "hard because disorganized."
        </p>
        <p>
          When asked about their biggest pain point, the most common responses involved filtering and sorting. 
          Students wanted to filter by semester taught, sort by most recent reviews, or see only reviews from 
          their specific major. None of these options currently exist.
        </p>
      </section>

      <section className="case-study-section">
        <h2>Prototype</h2>
        <p>
          Based on the research findings, I created mid-fidelity wireframes in Figma that address the main 
          usability issues. The redesign focuses on improved filtering, clearer rating breakdowns, and 
          better comparison tools.
        </p>
        <div className="prototype-images">
          <div className="prototype-item">
            <img src="/src/assets/rmp-login1.png" alt="Redesigned login interface" />
            <img src="/src/assets/rmp-login2.png" alt="Redesigned login interface" />
            <p className="prototype-caption">Redesigned login to be cleaner and more concise</p>
          </div>
          <div className="prototype-item">
            <img src="/src/assets/rmp-search.png" alt="Redesigned search interface" />
            <p className="prototype-caption">Redesigned search with advanced filtering options</p>
          </div>
          <div className="prototype-item">
            <img src="/src/assets/rmp-profile1.png" alt="Professor profile page" />
            <img src="/src/assets/rmp-profile2.png" alt="Professor profile page" />
            <img src="/src/assets/rmp-profile3.png" alt="Professor profile page" />
            <img src="/src/assets/rmp-profile4.png" alt="Professor profile page" />
            <p className="prototype-caption">Professor profile with reorganized rating data</p>
          </div>
          <div className="prototype-item">
            <img src="/src/assets/rmp-rating.png" alt="Rate Professor" />
            <p className="prototype-caption">Improved rating mechanism with more options</p>
          </div>
        </div>
      </section>

      <footer className="case-study-footer">
        <p>© 2025 Kavish Sharma</p>
      </footer>
    </div>
  );
}

// Main App wrapper with routing
function AppWrapper() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects/ratemyprofessor" element={<RMPCaseStudy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppWrapper;
