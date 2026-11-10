import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Braces,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Code2,
  Database,
  Download,
  MapPin,
  Menu,
  MonitorSmartphone,
  GraduationCap,
  Link2,
  Sparkles,
  X,
} from "lucide-react";
import {
  SiReact,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiReactrouter,
  SiJquery,
  SiGreensock,
  SiSwiper,
  SiGit,
  SiGithub,
  SiPostman,
  SiVite,
  SiXampp,
} from "react-icons/si";
import {
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import { experience, education } from "./data/experience";
import { projects } from "./data/projects";
import { skills } from "./data/skills";
import portfolioImage from "../assets/portfolio-img.webp";
import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import Reveal from "./components/ui/Reveal";
import SectionHeading from "./components/ui/SectionHeading";
import Tag from "./components/ui/Tag";
import SiteFooter from "./components/common/SiteFooter";

const skillIcons = {
  "React.js": [SiReact, "#61DAFB"],
  HTML5: [SiHtml5, "#E34F26"],
  CSS3: [SiCss, "#1572B6"],
  JavaScript: [SiJavascript, "#F7DF1E"],
  TypeScript: [SiTypescript, "#3178C6"],
  "Tailwind CSS": [SiTailwindcss, "#38BDF8"],
  Bootstrap: [SiBootstrap, "#7952B3"],
  "Node.js": [SiNodedotjs, "#5FA04E"],
  "Express.js": [SiExpress, "#E8E8E8"],
  "RESTful API Development": [Braces, "#61A5C2"],
  MongoDB: [SiMongodb, "#47A248"],
  "MongoDB (Basic)": [SiMongodb, "#47A248"],
  MySQL: [SiMysql, "#4479A1"],
  SQL: [Database, "#F0A500"],
  "React Router": [SiReactrouter, "#F44250"],
  "React Hooks": [SiReact, "#61DAFB"],
  jQuery: [SiJquery, "#0769AD"],
  GSAP: [SiGreensock, "#88CE02"],
  "Swiper.js": [SiSwiper, "#6332F6"],
  "AOS.js": [Sparkles, "#9B8AFB"],
  "CRUD Operations": [Database, "#F0A500"],
  "API Integration": [Link2, "#61A5C2"],
  "Responsive Web Design": [MonitorSmartphone, "#61DAFB"],
  Git: [SiGit, "#F05032"],
  GitHub: [SiGithub, "#F5F5F5"],
  Postman: [SiPostman, "#FF6C37"],
  "VS Code": [Code2, "#007ACC"],
  Vite: [SiVite, "#646CFF"],
  XAMPP: [SiXampp, "#FB7A24"],
};

const navItems = [
  ["About", "about"],
  ["Skills", "skills"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Education", "education"],
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activeProject, setActiveProject] = useState(0);
  const [isProjectCarouselPaused, setIsProjectCarouselPaused] = useState(false);
  const [isProjectCarouselVisible, setIsProjectCarouselVisible] = useState(false);
  const heroScrollRef = useRef(null);
  const heroRef = useRef(null);
  const navLinksRef = useRef(null);
  const menuButtonRef = useRef(null);
  const navWrapRef = useRef(null);
  const scrollProgressRef = useRef(null);
  const projectTrackRef = useRef(null);
  const lastActiveProjectRef = useRef(-1);
  const projectPauseTimeoutRef = useRef(0);

  useEffect(() => {
    document.title = "Alfiya A N | Full Stack Developer";
  }, []);

  useEffect(() => {
    const sections = ["home", ...navItems.map(([, id]) => id), "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.05, 0.25, 0.5] },
    );
    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frameId = 0;
    const updateScrollState = () => {
      frameId = 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
      if (scrollProgressRef.current) {
        scrollProgressRef.current.style.transform = `scaleX(${progress})`;
      }
      navWrapRef.current?.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen || !window.matchMedia("(max-width: 900px)").matches) return;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const focusable = () => Array.from(
      navLinksRef.current?.querySelectorAll('button:not([disabled]), a[href]') ?? [],
    );
    focusable()[0]?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const handleResize = () => {
      if (!window.matchMedia("(max-width: 900px)").matches) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  useEffect(() => {
    let frameId = 0;

    const updateReveal = () => {
      frameId = 0;
      const wrapper = heroScrollRef.current;
      const hero = heroRef.current;
      if (!wrapper || !hero) return;
      if (window.matchMedia("(max-width: 620px)").matches) return;

      const distance = Math.max(wrapper.offsetHeight - window.innerHeight, 1);
      const scrolled = -wrapper.getBoundingClientRect().top;
      hero.toggleAttribute("data-scrolling", scrolled > 8);
      const progress = Math.min(1, Math.max(0, scrolled / distance));
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const start = [31, 31, 31];
      const end = [12, 31, 69];
      const rgb = start.map((value, index) =>
        Math.round(value + (end[index] - value) * eased),
      );
      const midRgb = rgb.map((value, index) =>
        Math.round(value + (end[index] - value) * 0.35),
      );
      hero.style.background = [
        `radial-gradient(circle at 50% 48%, rgba(${rgb[0] + 18},${rgb[1] + 18},${rgb[2] + 18},.16), transparent 34%)`,
        `linear-gradient(135deg, rgb(${rgb[0]},${rgb[1]},${rgb[2]}) 0%, rgb(${midRgb[0]},${midRgb[1]},${midRgb[2]}) 58%, rgb(17,19,20) 100%)`,
      ].join(",");
      hero.style.setProperty("--reveal-progress", progress.toFixed(4));
    };

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateReveal);
    };

    updateReveal();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const scrollTo = (id) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    if (menuOpen) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    if (lastActiveProjectRef.current === activeProject) return;
    lastActiveProjectRef.current = activeProject;
    const activeCard = projectTrackRef.current?.children[activeProject];
    const track = projectTrackRef.current;
    if (!activeCard || !track) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const trackBounds = track.getBoundingClientRect();
    const cardBounds = activeCard.getBoundingClientRect();
    const centeredLeft =
      track.scrollLeft +
      cardBounds.left -
      trackBounds.left -
      (track.clientWidth - activeCard.offsetWidth) / 2;
    track.scrollTo({
      left: centeredLeft,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [activeProject]);

  useEffect(() => {
    const section = projectTrackRef.current?.closest(".projects");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsProjectCarouselVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (
      isProjectCarouselPaused
      || !isProjectCarouselVisible
      || document.visibilityState !== "visible"
      || window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      setActiveProject((current) => (current + 1) % projects.length);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, [isProjectCarouselPaused, isProjectCarouselVisible]);

  useEffect(() => () => {
    window.clearTimeout(projectPauseTimeoutRef.current);
  }, []);

  const pauseProjectCarousel = () => {
    window.clearTimeout(projectPauseTimeoutRef.current);
    setIsProjectCarouselPaused(true);
  };

  const resumeProjectCarousel = () => {
    window.clearTimeout(projectPauseTimeoutRef.current);
    projectPauseTimeoutRef.current = window.setTimeout(
      () => setIsProjectCarouselPaused(false),
      5000,
    );
  };

  const scrollProjects = (direction) => {
    setActiveProject((current) => (
      (current + direction + projects.length) % projects.length
    ));
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="nav-wrap" ref={navWrapRef}>
        <nav className="nav container" aria-label="Main navigation">
          <div
            className={`nav-links ${menuOpen ? "open" : ""}`}
            id="primary-navigation"
            ref={navLinksRef}
          >
            <button
              className={activeSection === "home" ? "active" : ""}
              aria-current={activeSection === "home" ? "location" : undefined}
              onClick={() => scrollTo("home")}
            >
              Home
            </button>
            {navItems.map(([label, id]) => (
              <button
                key={id}
                className={activeSection === id ? "active" : ""}
                aria-current={activeSection === id ? "location" : undefined}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            ))}
            <a
              className="mobile-nav-action mobile-nav-action--resume"
              href="/Alfiya_A_N_Software_Developer_Resume.pdf"
              download="Alfiya_A_N_Software_Developer_Resume.pdf"
              onClick={() => setMenuOpen(false)}
            >
              Download Resume <Download size={14} />
            </a>
            <a
              className="mobile-nav-action"
              href="mailto:alfiyaalfy8@gmail.com"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </div>
          <div className="nav-actions">
            <a
              className="resume-button resume-button--compact"
              href="/Alfiya_A_N_Software_Developer_Resume.pdf"
              download="Alfiya_A_N_Software_Developer_Resume.pdf"
            >
              Download Resume <Download size={14} />
            </a>
            <a className="contact-button" href="mailto:alfiyaalfy8@gmail.com">
              Contact <ArrowUpRight size={15} />
            </a>
          </div>
          <button
            className="menu-button"
            ref={menuButtonRef}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>
        <span className="nav-progress" ref={scrollProgressRef} aria-hidden="true" />
      </header>

      <main id="main-content" tabIndex="-1">
        <div className="hero-scroll" ref={heroScrollRef}>
          <section className="hero" id="home" ref={heroRef}>
            <h1 className="hero-word" aria-label="Portfolio">
              {"PORTFOLIO".split("").map((letter, index) => (
                <span key={`${letter}-${index}`} aria-hidden="true" style={{ animationDelay: `${index * 45}ms` }}>
                  {letter}
                </span>
              ))}
            </h1>
            <div className="hero-name" aria-label="Alfiya A N">
              ALFIYA A N
            </div>
            <div className="hero-role">
              {/* <span aria-hidden="true" /> */}
              <p>WEB DEVELOPER</p>
              {/* <span aria-hidden="true" /> */}
            </div>
            <div className="hero-actions" aria-label="Quick links">
              <Button as="a" variant="primary" href="#projects" onClick={(event) => {
                event.preventDefault();
                scrollTo("projects");
              }}>
                View Projects <ArrowUpRight size={15} aria-hidden="true" />
              </Button>
              <Button
                as="a"
                variant="secondary"
                href="/Alfiya_A_N_Software_Developer_Resume.pdf"
                download="Alfiya_A_N_Software_Developer_Resume.pdf"
              >
                Get My CV <Download size={15} aria-hidden="true" />
              </Button>
              <Button
                as="a"
                variant="glass"
                href="https://wa.me/918281478323?text=Hi%20Alfiya"
                target="_blank"
                rel="noopener noreferrer"
              >
                Let&apos;s Talk <FaWhatsapp aria-hidden="true" />
              </Button>
            </div>
            <div className="hero-scroll-indicator" aria-hidden="true">
              <span>SCROLL</span>
              <i />
            </div>
          </section>
        </div>

        <section className="about section" id="about">
          <div className="container about-grid">
            <Reveal as="div" direction="left" className="about-portrait">
              <img src={portfolioImage} alt="Alfiya A N" width="1268" height="1640" loading="lazy" />
            </Reveal>
            <Reveal as="div" direction="right" className="about-copy">
              <SectionHeading
                eyebrow="01 / ABOUT ME"
                title={<>Building Digital<br />Experiences<span>.</span></>}
                className="about-heading"
              />
              <p className="about-role">
                FULL STACK DEVELOPER | MERN STACK DEVELOPER
              </p>
              <p className="about-description">
                Full Stack Developer with professional experience building responsive
                web applications, corporate platforms and administrative dashboards
                using React.js, Node.js and Express.js. Skilled in creating reusable
                UI components, connecting REST APIs, delivering database-driven
                functionality and collaborating on production web projects.
              </p>
              <p className="about-tech-title">CORE TECHNOLOGIES</p>
              <div className="about-tech">
                <Tag>React.js</Tag>
                <Tag>Node.js</Tag>
                <Tag>Express.js</Tag>
                <Tag>MySQL</Tag>
              </div>
              <Button
                className="about-projects-button"
                onClick={() => scrollTo("projects")}
                variant="secondary"
              >
                View Projects <ArrowUpRight size={16} />
              </Button>
            </Reveal>
          </div>
        </section>

        <section className="skills section" id="skills">
          <div className="container">
            <SectionHeading eyebrow="02 / EXPERTISE" title="Technical Skills" className="section-heading-row" />
            <div className="skill-categories">
              {skills.map((group) => (
                <Card
                  as={Reveal}
                  direction="up"
                  className="skill-category"
                  key={group.category}
                >
                  <h3>{group.category}</h3>
                  <div className="skill-tags">
                    {group.items.map((item) => (
                      <Tag key={item}>
                        {skillIcons[item] ? (() => {
                          const [Icon, color] = skillIcons[item];
                          return <Icon className="skill-brand-icon" style={{ color }} aria-hidden="true" />;
                        })() : null}
                        {item}
                      </Tag>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="experience section" id="experience">
          <div className="container">
            <SectionHeading
              eyebrow="03 / EXPERIENCE"
              title={<>Professional Experience<span>.</span></>}
              className="experience-heading"
            />
            <div className="experience-grid">
              {experience.map((item, index) => (
                <Card
                  as={Reveal}
                  direction={index % 2 === 0 ? "left" : "right"}
                  className="experience-card"
                  key={item.role}
                >
                  <div className="experience-card-top">
                    <span className="experience-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="experience-line" />
                    <BriefcaseBusiness className="experience-briefcase" size={31} strokeWidth={1.7} />
                  </div>
                  <p className="experience-period"><CalendarDays size={20} strokeWidth={1.8} /> {item.period}</p>
                  <h3>{item.role}</h3>
                  <div className="experience-company-row">
                    <span><Building2 size={19} strokeWidth={1.8} /> {item.company}</span>
                    <span><MapPin size={19} strokeWidth={1.8} /> {item.location}</span>
                  </div>
                  <ul>
                    {item.responsibilities.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="projects section" id="projects">
          <div className="container">
            <SectionHeading eyebrow="04 / SELECTED WORK" title="Featured Projects" className="section-heading-row" />
            <div
              className="project-carousel"
              onMouseEnter={pauseProjectCarousel}
              onMouseLeave={(event) => {
                if (!event.currentTarget.contains(document.activeElement)) {
                  setIsProjectCarouselPaused(false);
                }
              }}
              onFocusCapture={pauseProjectCarousel}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  resumeProjectCarousel();
                }
              }}
              onTouchStart={pauseProjectCarousel}
              onTouchEnd={resumeProjectCarousel}
              onTouchCancel={resumeProjectCarousel}
            >
              <div className="project-track" ref={projectTrackRef}>
                {projects.map((project, index) => {
                  return (
                    <Card
                      as={Reveal}
                      direction="up"
                      className="project-card"
                      data-project={project.title}
                      data-active={index === activeProject}
                      key={project.title}
                    >
                      <div className="project-surface">
                        <a
                          className="project-image-link"
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} project`}
                        >
                          <div className="project-placeholder">
                            {project.image && (
                              <img
                                src={project.image}
                                alt={`${project.title} preview`}
                                width="1672"
                                height="941"
                                loading="lazy"
                                decoding="async"
                              />
                            )}
                          </div>
                        </a>
                        <div className="project-info">
                          <p className="project-company">{project.company}</p>
                          <h3>{project.title}</h3>
                          <p className="project-description">{project.description}</p>
                          <div className="project-tags" aria-label="Technologies used">
                            {project.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                          </div>
                          <Button
                            as="a"
                            variant="secondary"
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit project <ArrowUpRight size={15} aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
              <Reveal
                as="div"
                direction="down"
                className="project-controls"
                aria-label="Project carousel controls"
              >
                <button
                  className="project-arrow project-arrow-prev"
                  type="button"
                  aria-label="Previous project"
                  onClick={() => scrollProjects(-1)}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  className="project-arrow project-arrow-next"
                  type="button"
                  aria-label="Next project"
                  onClick={() => scrollProjects(1)}
                >
                  <ChevronRight size={20} />
                </button>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="education section" id="education">
          <div className="container">
            <SectionHeading
              eyebrow="05 / ACADEMIC JOURNEY"
              title={<>Education<span>.</span></>}
              className="section-heading-row"
            />
            <div className="education-grid">
              {education.map((item, index) => (
                <Card
                  as={Reveal}
                  direction="up"
                  className="education-card"
                  key={item.degree}
                >
                  <div className="education-card-top">
                    <span className="education-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="education-line" />
                    <GraduationCap className="education-cap" size={32} strokeWidth={1.7} aria-hidden="true" />
                  </div>
                  <p className="education-period">{item.period}</p>
                  <h3>{item.degree}</h3>
                  <div className="education-institutions">
                    <strong>{item.school}</strong>
                    <span>{item.university}</span>
                  </div>
                  <Tag className="education-grade">{item.grade}</Tag>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="container">
            <SectionHeading
              eyebrow="07 / GET IN TOUCH"
              title={<>Feel free to reach out<span>.</span></>}
              className="contact-heading"
            />
            <p className="contact-status">
              <span className="contact-status__dot" aria-hidden="true" />
              Open to opportunities
            </p>
            <div className="contact-social-links" aria-label="Contact links">
              <Reveal
                as="a"
                direction="up"
                className="social-github"
                href="https://github.com/Alfiya200314"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub aria-hidden="true" />
                <span>GitHub</span>
                <span className="contact-card__arrow" aria-hidden="true">↗</span>
              </Reveal>
              <Reveal
                as="a"
                direction="up"
                className="social-linkedin"
                href="https://www.linkedin.com/in/alfiya-a-n"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn aria-hidden="true" />
                <span>LinkedIn</span>
                <span className="contact-card__arrow" aria-hidden="true">↗</span>
              </Reveal>
              <Reveal
                as="a"
                direction="up"
                className="social-whatsapp"
                href="https://wa.me/?text=Hi%20Alfiya"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp aria-hidden="true" />
                <span>WhatsApp</span>
                <span className="contact-card__arrow" aria-hidden="true">↗</span>
              </Reveal>
              <Reveal
                as="a"
                direction="up"
                className="social-email"
                href="mailto:alfiyaalfy8@gmail.com"
                aria-label="Email"
              >
                <FaEnvelope aria-hidden="true" />
                <span>Email</span>
                <span className="contact-card__arrow" aria-hidden="true">↗</span>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
