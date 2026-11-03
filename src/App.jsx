import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { experience, education } from "./data/experience";
import { projects } from "./data/projects";
import { skills } from "./data/skills";
import portrait from "../assets/portfolio-img.webp";

const navItems = [
  ["About", "about"],
  ["Experience", "experience"],
  ["Skills", "skills"],
  ["Work", "work"],
  ["Contact", "contact"],
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Alfiya | Frontend Developer";
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <nav className="nav container" aria-label="Main navigation">
          <button className="brand" onClick={() => scrollTo("home")} aria-label="Back to top">
            A<span>.</span>
          </button>
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)}>
                {label}
              </button>
            ))}
          </div>
          <a className="nav-cta" href="mailto:hello@example.com">
            Let's Talk <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy container">
            <div className="eyebrow"><span /> FRONTEND DEVELOPER</div>
            <h1>
              Designing <em>digital</em>
              <br />
              experiences with
              <br />
              purpose.
            </h1>
            <div className="hero-bottom">
              <p>
                I create thoughtful, accessible, and beautifully crafted web
                experiences that turn ideas into meaningful products.
              </p>
              <button className="circle-button" onClick={() => scrollTo("work")} aria-label="View work">
                <ArrowDown size={22} />
              </button>
            </div>
          </div>
          <div className="hero-portrait" aria-label="Portrait of Alfiya">
            <img src={portrait} alt="Alfiya smiling in traditional attire" />
          </div>
        </section>

        <section className="about section" id="about">
          <div className="container about-grid">
            <div>
              <p className="section-kicker">01 / ABOUT</p>
              <h2>A little more<br />about me.</h2>
            </div>
            <div className="about-copy">
              <p className="lead">
                I’m a frontend developer who enjoys bringing clarity, warmth,
                and personality to digital experiences.
              </p>
              <p>
                My approach combines thoughtful design with clean, reliable
                development. I care about the details—from fluid layouts and
                intuitive interactions to the small moments that make a product
                feel human.
              </p>
              <div className="about-meta">
                <span><MapPin size={16} /> Available worldwide</span>
                <button onClick={() => scrollTo("contact")}>
                  More about me <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="experience section" id="experience">
          <div className="container">
            <p className="section-kicker">02 / JOURNEY</p>
            <div className="section-heading-row">
              <h2>Experience & Education</h2>
              <p>A growing path shaped by curiosity, practice, and purpose.</p>
            </div>
            <div className="timeline-grid">
              <div>
                <h3>Experience</h3>
                {experience.map((item) => (
                  <article className="timeline-item" key={item.role}>
                    <span>{item.period}</span>
                    <div>
                      <h4>{item.role}</h4>
                      <strong>{item.company}</strong>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div>
                <h3>Education</h3>
                {education.map((item) => (
                  <article className="timeline-item" key={item.degree}>
                    <span>{item.period}</span>
                    <div>
                      <h4>{item.degree}</h4>
                      <strong>{item.school}</strong>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="skills section" id="skills">
          <div className="container skills-grid">
            <div>
              <p className="section-kicker">03 / EXPERTISE</p>
              <h2>Skills &<br />Capabilities</h2>
              <p>
                A versatile toolkit for creating responsive, accessible, and
                memorable digital products.
              </p>
            </div>
            <div className="skill-list">
              {skills.map((skill) => (
                <div className="skill" key={skill.name}>
                  <div><span>{skill.name}</span><span>{skill.level}%</span></div>
                  <div className="skill-track">
                    <div style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="projects section" id="work">
          <div className="container">
            <p className="section-kicker">04 / SELECTED WORK</p>
            <div className="section-heading-row">
              <h2>Featured Projects</h2>
              <button>View all projects <ArrowUpRight size={16} /></button>
            </div>
            <div className="project-grid">
              {projects.map((project, index) => (
                <article className="project-card" key={project.title}>
                  <div className={`project-preview ${project.accent}`}>
                    <div className="preview-window">
                      <div className="preview-bar"><i /><i /><i /></div>
                      <div className="preview-content">
                        <span>0{index + 1}</span>
                        <strong>{project.category}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="project-info">
                    <p>{project.category}</p>
                    <h3>{project.title}</h3>
                    <span>{project.description}</span>
                    <div className="tags">
                      {project.tags.map((tag) => <b key={tag}>{tag}</b>)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="container contact-grid">
            <div>
              <p className="section-kicker">05 / CONTACT</p>
              <h2>Have a project<br />in mind?</h2>
            </div>
            <div className="contact-copy">
              <p>Let’s create something meaningful together.</p>
              <a href="mailto:hello@example.com">hello@example.com <ArrowUpRight size={22} /></a>
              <div className="socials">
                <a href="#" aria-label="LinkedIn"><Linkedin size={18} /> LinkedIn</a>
                <a href="#" aria-label="GitHub"><Github size={18} /> GitHub</a>
                <a href="mailto:hello@example.com" aria-label="Email"><Mail size={18} /> Email</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <span>© 2026 Alfiya</span>
          <button onClick={() => scrollTo("home")}>Back to top <ArrowUpRight size={15} /></button>
        </div>
      </footer>
    </div>
  );
}
