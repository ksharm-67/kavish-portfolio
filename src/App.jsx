import './App.css'
import MyImage from './assets/cat.jpg'
import { useState, useCallback, memo } from 'react';

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
      title: "Programming",
      variant: 1,
      skills: ["C++", "Python", "Java", "JavaScript", "SQL", "HTML/CSS", "MATLAB", "R"]
    },
    {
      title: "Frameworks/Libraries",
      variant: 2,
      skills: ["Firebase", "React.js", "Flask", "Pandas", "NumPy", "PyTorch", "Kafka"]
    },
    {
      title: "Databases",
      variant: 3,
      skills: ["MongoDB", "ClickHouse", "PostgreSQL"]
    },
    {
      title: "Tools/Platforms",
      variant: 4,
      skills: ["Git", "GitHub", "Docker", "Jira", "Linux", "VS Code"]
    },
    {
      title: "Concepts",
      variant: 5,
      skills: ["OAuth2", "REST APIs", "OOP", "Functional Programming", "Multithreading", "Unit Testing", "Agile", "Cryptographic Protocols", "Big O", "CRUD Operations"]
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
        <img src={MyImage} className="side-img" alt="Profile" loading="lazy" />
      </section>

      {/* Education Section - Replacing Timeline */}
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

export default App;