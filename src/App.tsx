import {
  Activity,
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  Brain,
  BriefcaseBusiness,
  Github,
  GraduationCap,
  HeartPulse,
  Linkedin,
  Mail,
  Menu,
  Music,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Lenis from "lenis";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const links = {
  email: "mailto:mjgerdes@umich.edu",
  github: "https://github.com/mjmgerdes",
  linkedin: "https://www.linkedin.com/in/mayagerdes",
  x: "https://x.com/mayajeangerdes",
};

const projectLinks = {
  praxigen: "https://praxigen.dev",
  startupCrm: "https://ustartleague.lovable.app/login",
  grndworkLive: "https://grndwork.vercel.app",
  grndworkRepo: "https://github.com/mjmgerdes/grndwork",
  foreverData: "https://foreverdata.live/",
};

type ExperienceCategory = "Work" | "Clubs" | "Other";

type ExperienceItem = {
  category: ExperienceCategory;
  logo: {
    alt: string;
    image?: string;
    text: string;
  };
  title: string;
  org: string;
  date: string;
  summary: string;
  tags: string[];
};

type Project = {
  number: string;
  name: string;
  label: string;
  href: string;
  body: string;
  tags: string[];
  repo?: string;
  preview: "crm" | "grndwork";
};

type PersonalCard = {
  icon: LucideIcon;
  title: string;
  body: string;
};

type LenisWindow = Window & { mayaLenis?: Lenis };

const experienceTabs: ExperienceCategory[] = ["Work", "Clubs", "Other"];

const experiences: ExperienceItem[] = [
  {
    category: "Work",
    logo: {
      alt: "Michigan Blockchain Consulting",
      image: "/logos/michigan-blockchain.png",
      text: "MBC",
    },
    title: "Project Manager / Business Analyst",
    org: "Michigan Blockchain Consulting",
    date: "Aug 2025 - Present",
    summary:
      "Lead client-facing blockchain strategy work for SMBs, translating infrastructure tradeoffs into product and go-to-market recommendations.",
    tags: ["Blockchain", "GTM", "Client work", "Product"],
  },
  {
    category: "Work",
    logo: {
      alt: "Michigan Medicine",
      image: "/logos/michigan-medicine.svg",
      text: "MM",
    },
    title: "Research Assistant",
    org: "Michigan Medicine, Department of Human Genetics",
    date: "Aug 2025 - Present",
    summary:
      "Research CRISPR-based sensing systems for cancer-specific genomic alterations, including construct design, SnapGene analysis, and wet-lab troubleshooting.",
    tags: ["CRISPR", "Genetics", "Cancer sensing", "Wet lab"],
  },
  {
    category: "Work",
    logo: {
      alt: "University of Michigan",
      image: "/logos/university-of-michigan.svg",
      text: "M",
    },
    title: "Research Assistant",
    org: "Michigan Medicine + College of Engineering",
    date: "Nov 2024 - Sep 2025",
    summary:
      "Worked across computational biomechanics, cardiovascular imaging, and clinical datasets for patient-outcome and translational research.",
    tags: ["Biomechanics", "Clinical data", "Imaging"],
  },
  {
    category: "Work",
    logo: {
      alt: "Neuropsychiatry and forensic neurology practice",
      text: "NF",
    },
    title: "Neuropsychiatry Intern",
    org: "Private neuropsychiatry and forensic neurology practice",
    date: "May 2025 - Aug 2025",
    summary:
      "Supported neuropsychiatry and forensic neurology workflows across patient cases, diagnostics, and care coordination.",
    tags: ["Neuropsychiatry", "Clinical workflows", "Patient context"],
  },
  {
    category: "Clubs",
    logo: {
      alt: "Cancer Screening Advocates",
      image: "/logos/csa-favicon.png",
      text: "CSA",
    },
    title: "President and Founding Campus Lead",
    org: "Cancer Screening Advocates",
    date: "Nov 2025 - Present",
    summary:
      "Founded the University of Michigan chapter and built programming around cancer screening awareness, campus partnerships, and health advocacy.",
    tags: ["Health advocacy", "Chapter building", "Partnerships"],
  },
  {
    category: "Clubs",
    logo: { alt: "Pi Sigma Epsilon", text: "PSE" },
    title: "DEI Director and Council Member",
    org: "Pi Sigma Epsilon",
    date: "Sep 2024 - Present",
    summary:
      "Help organize programming, recruiting, and member-facing systems for a business and professional development community.",
    tags: ["Programming", "Recruiting", "Leadership"],
  },
  {
    category: "Clubs",
    logo: { alt: "Phi Delta Epsilon", text: "PhiDE" },
    title: "Marketing and Public Relations Chair",
    org: "Phi Delta Epsilon",
    date: "Nov 2024 - Present",
    summary:
      "Create member communications, event visibility, and brand systems for a pre-medical community.",
    tags: ["Marketing", "Community", "Events"],
  },
  {
    category: "Other",
    logo: { alt: "Music", text: "MUS" },
    title: "Music",
    org: "Guitar, piano, DJing, and playlist curation",
    date: "Ongoing",
    summary:
      "Guitar, piano, DJing, and playlists that tend to follow me through work sessions.",
    tags: ["Music", "Taste", "Rituals"],
  },
  {
    category: "Other",
    logo: { alt: "Pickleball", text: "PB" },
    title: "Pickleball",
    org: "Recreation, competition, and movement",
    date: "Now",
    summary:
      "A favorite way to move, compete, reset, and get immediate feedback outside the laptop.",
    tags: ["Pickleball", "Movement", "Energy"],
  },
];

const supportingProjects: Project[] = [
  {
    number: "02",
    name: "Startup CRM",
    label: "Product / operations",
    href: projectLinks.startupCrm,
    body:
      "A lightweight operating layer for a startup league team, with Google Sheets kept as the source of truth.",
    tags: ["CRM", "Google Sheets", "Operations"],
    preview: "crm",
  },
  {
    number: "03",
    name: "grndwork",
    label: "Product / career discovery",
    href: projectLinks.grndworkLive,
    repo: projectLinks.grndworkRepo,
    body:
      "An early-access product that helps students turn broad interests into clearer roles, targets, and outreach.",
    tags: ["React", "Product", "Career discovery"],
    preview: "grndwork",
  },
];

const personalCards: PersonalCard[] = [
  {
    icon: Music,
    title: "Music",
    body: "Guitar, piano, DJing, and playlists. It is the least forced part of my personality.",
  },
  {
    icon: Brain,
    title: "Neuroscience",
    body: "Brains, behavior change, cognition, and why people get stuck or change.",
  },
  {
    icon: Activity,
    title: "Pickleball",
    body: "Fast feedback, friendly competition, and a very satisfying reset button.",
  },
  {
    icon: HeartPulse,
    title: "Biohacking",
    body: "Sleep, training, food, and small habits that are either useful or nonsense. I like figuring out which.",
  },
];

const backgroundItems = [
  {
    icon: GraduationCap,
    title: "University of Michigan",
    body: "B.S. in Neuroscience, Entrepreneurship minor, Honors Program. Expected May 2028.",
  },
  {
    icon: BadgeCheck,
    title: "Academic recognition",
    body: "William J. Branstrom Award, James B. Angell Scholar, Phi Kappa Phi, and neuroscience honors recognition.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Current through-line",
    body: "Research detail, clinical workflow exposure, product judgment, and go-to-market work.",
  },
];

function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.35,
      allowNestedScroll: true,
    });
    (window as LenisWindow).mayaLenis = lenis;

    let frame = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete (window as LenisWindow).mayaLenis;
    };
  }, []);

  return null;
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function RevealWords({ text }: { text: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <span aria-hidden="true">
      {text.split(" ").map((word, index, words) => (
        <motion.span
          className="reveal-word"
          key={`${word}-${index}`}
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 12, filter: "blur(5px)" }
          }
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: index * 0.04, ease: EASE }}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}

function ParallaxMedia({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [18, -18]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y: reduceMotion ? 0 : y }}
    >
      {children}
    </motion.div>
  );
}

function IconLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      <Icon size={17} strokeWidth={1.9} />
    </motion.a>
  );
}

function scrollToSection(
  event: ReactMouseEvent<HTMLAnchorElement>,
  id: string,
  closeMenu?: () => void,
) {
  if (window.location.pathname.replace(/\/$/, "") !== "") return;
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  closeMenu?.();

  const lenis = (window as LenisWindow).mayaLenis;
  if (lenis) lenis.scrollTo(target, { offset: -72, duration: 1.05 });
  else target.scrollIntoView({ behavior: "smooth" });
}

function SiteNav({ page = "home" }: { page?: "home" | "personal" }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isPersonal = page === "personal";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 34);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const close = () => setMenuOpen(false);
  const anchorHref = (id: string) => (isPersonal ? `/#${id}` : `#${id}`);
  const items = [
    { label: "Work", id: "work" },
    { label: "Experience", id: "experience" },
    { label: "About", id: "about" },
    { label: "Personal", href: "/me" },
  ];
  const mobileItems = [...items, { label: "Email", href: links.email }];

  return (
    <>
      <nav
        className={`site-nav${scrolled ? " is-scrolled" : ""}`}
        aria-label="Primary navigation"
      >
        <a className="brand" href={isPersonal ? "/" : "#top"}>
          Maya Gerdes
        </a>
        <div className="nav-links">
          {items.map((item) =>
            item.href ? (
              <a key={item.label} href={item.href}>{item.label}</a>
            ) : (
              <a
                key={item.label}
                href={anchorHref(item.id!)}
                onClick={(event) => scrollToSection(event, item.id!)}
              >
                {item.label}
              </a>
            ),
          )}
        </div>
        <a className="nav-email" href={links.email}>
          Email <ArrowUpRight size={14} />
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: EASE }}
          >
            {mobileItems.map((item) =>
              item.href ? (
                <a key={item.label} href={item.href} onClick={close}>
                  {item.label}<ArrowUpRight size={16} />
                </a>
              ) : (
                <a
                  key={item.label}
                  href={anchorHref(item.id!)}
                  onClick={(event) => scrollToSection(event, item.id!, close)}
                >
                  {item.label}<ArrowDown size={16} />
                </a>
              ),
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function SectionHeading({
  number,
  eyebrow,
  title,
  body,
}: {
  number: string;
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="section-heading">
      <div className="section-index">
        <span>{number}</span>
        <span>{eyebrow}</span>
      </div>
      <div>
        <h2 aria-label={title}><RevealWords text={title} /></h2>
        {body ? <p>{body}</p> : null}
      </div>
    </div>
  );
}

function ProjectPreview({ kind }: { kind: Project["preview"] }) {
  if (kind === "crm") {
    return (
      <div className="project-art crm-art" aria-hidden="true">
        <div className="art-toolbar">
          <strong>UStart League</strong>
          <span>Season 04</span>
        </div>
        <div className="crm-art-body">
          <div>
            <small>TEAM WORKSPACE</small>
            <b>Run the season from one place.</b>
            <p>Google Sheets stays the source of truth.</p>
          </div>
          <div className="crm-art-data">
            <span>Founder pipeline <b>24 active</b></span>
            <span>Partner outreach <b>9 due</b></span>
            <span>Upcoming reviews <b>6</b></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-art grndwork-art" aria-hidden="true">
      <div className="art-toolbar">
        <strong>grndwork</strong>
        <span>Early access</span>
      </div>
      <div className="grndwork-art-copy">
        <small>YOUR CAREER, WITH SIGNAL</small>
        <b>Discover your path.</b>
      </div>
      <div className="grndwork-art-data">
        <span><small>MATCH</small>92%</span>
        <span><small>ROLES</small>48</span>
        <span><small>TRACKED</small>12</span>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.58, delay: index * 0.08, ease: EASE }}
    >
      <a href={project.href} target="_blank" rel="noreferrer" className="project-art-link">
        <ProjectPreview kind={project.preview} />
      </a>
      <div className="project-card-copy">
        <div className="project-card-meta">
          <span>{project.number}</span>
          <span>{project.label}</span>
        </div>
        <h3>{project.name}</h3>
        <p>{project.body}</p>
        <div className="tag-row">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <div className="project-links">
          <a href={project.href} target="_blank" rel="noreferrer">
            View project <ArrowUpRight size={15} />
          </a>
          {project.repo ? (
            <a href={project.repo} target="_blank" rel="noreferrer">
              <Github size={15} /> Repository
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

function LogoMark({ logo }: { logo: ExperienceItem["logo"] }) {
  return (
    <div className={`logo-mark${logo.image ? " has-image" : ""}`} aria-label={logo.alt}>
      {logo.image ? <img src={logo.image} alt="" /> : <span>{logo.text}</span>}
    </div>
  );
}

function ExperienceLedger() {
  const [activeTab, setActiveTab] = useState<ExperienceCategory>("Work");
  const items = useMemo(
    () => experiences.filter((experience) => experience.category === activeTab),
    [activeTab],
  );

  return (
    <>
      <div className="experience-controls" role="tablist" aria-label="Experience filters">
        {experienceTabs.map((tab) => (
          <button
            type="button"
            role="tab"
            aria-selected={tab === activeTab}
            className={tab === activeTab ? "active" : ""}
            key={tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div className="experience-list" layout>
        <AnimatePresence mode="popLayout">
          {items.map((experience) => (
            <motion.article
              className="experience-item"
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
              key={`${experience.org}-${experience.title}`}
            >
              <LogoMark logo={experience.logo} />
              <div className="experience-role">
                <h3>{experience.title}</h3>
                <p>{experience.org}</p>
              </div>
              <p className="experience-summary">{experience.summary}</p>
              <div className="experience-meta">
                <time>{experience.date}</time>
                <div className="tag-row compact">
                  {experience.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

function PortfolioHome() {
  const heroVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
  };
  const heroItem = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.62, ease: EASE } },
  };

  return (
    <main>
      <a className="skip-link" href="#work">Skip to selected work</a>
      <SiteNav />

      <header className="portfolio-hero" id="top">
        <motion.div
          className="hero-layout"
          variants={heroVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div className="hero-name" variants={heroItem}>
            <p>Founder / researcher / builder</p>
            <h1>Maya Gerdes</h1>
          </motion.div>
          <motion.div className="hero-intro" variants={heroItem}>
            <p className="hero-lead">
              I am building Praxigen, a prior authorization workspace for
              specialty medical practices.
            </p>
            <p>
              I study neuroscience at the University of Michigan and work
              across product, clinical research, and go-to-market. I am most
              interested in systems where small workflow failures create very
              human consequences.
            </p>
            <div className="hero-links">
              <a href="#work" onClick={(event) => scrollToSection(event, "work")}>
                Selected work <ArrowDown size={15} />
              </a>
              <a href={links.email}>
                Email <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-notes"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.58, delay: 0.42, ease: EASE }}
        >
          <div><span>Currently</span><strong>Founder at Praxigen</strong></div>
          <div><span>Studying</span><strong>Neuroscience + entrepreneurship</strong></div>
          <div><span>Working across</span><strong>Clinical operations, product, GTM</strong></div>
          <div className="hero-note-socials" aria-label="External profiles">
            <IconLink href={links.linkedin} label="LinkedIn" icon={Linkedin} />
            <IconLink href={links.github} label="GitHub" icon={Github} />
            <IconLink href={links.x} label="X / Twitter" icon={X} />
          </div>
        </motion.div>
      </header>

      <section className="portfolio-section work-section" id="work">
        <Reveal>
          <SectionHeading
            number="01"
            eyebrow="Selected work"
            title="Things I have built, tested, and helped move forward."
            body="Praxigen is the main build. The rest are smaller products and go-to-market work that sharpened how I think about users, systems, and momentum."
          />
        </Reveal>

        <article className="featured-case">
          <div className="featured-case-copy">
            <Reveal>
              <div className="case-meta"><span>01</span><span>Founder / product / GTM</span></div>
              <h3>Praxigen</h3>
              <p>
                A source-grounded prior authorization workspace for specialty
                medical practices. It connects payer requirements, clinical-note
                checks, appeals, pre-claim mismatches, and follow-up in one workflow.
              </p>
              <dl className="case-facts">
                <div><dt>Role</dt><dd>Founder</dd></div>
                <div><dt>Focus</dt><dd>Healthcare workflow</dd></div>
                <div><dt>Stage</dt><dd>Building + piloting</dd></div>
              </dl>
              <a className="case-link" href={projectLinks.praxigen} target="_blank" rel="noreferrer">
                Visit praxigen.dev <ArrowUpRight size={15} />
              </a>
            </Reveal>
          </div>

          <div className="featured-case-media">
            <ParallaxMedia className="case-image case-image-main">
              <img
                src="/praxigen/workspace.webp"
                alt="Praxigen case workspace showing payer status, due dates, and next actions."
              />
            </ParallaxMedia>
            <ParallaxMedia className="case-image case-image-secondary">
              <img
                src="/praxigen/note-checker.webp"
                alt="Praxigen note checker showing a clinical documentation score and policy checks."
              />
            </ParallaxMedia>
            <span className="case-caption">Selected Praxigen product surfaces</span>
          </div>
        </article>

        <div className="project-grid">
          {supportingProjects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.name} />
          ))}
        </div>

        <Reveal className="collaboration-row">
          <div>
            <span>04</span>
            <span>Go-to-market collaboration</span>
          </div>
          <h3>ForeverData</h3>
          <p>GTM support for a data persistence product in storage and Web3 infrastructure.</p>
          <a href={projectLinks.foreverData} target="_blank" rel="noreferrer" aria-label="Open ForeverData">
            <ArrowUpRight size={18} />
          </a>
        </Reveal>
      </section>

      <section className="point-of-view">
        <Reveal className="point-of-view-inner">
          <p>Working thesis</p>
          <blockquote>
            I am drawn to the point where a complex system becomes an ordinary human task.
          </blockquote>
          <span>
            That is where design, judgment, and the quality of the next action matter most.
          </span>
        </Reveal>
      </section>

      <section className="portfolio-section experience-section" id="experience">
        <Reveal>
          <SectionHeading
            number="02"
            eyebrow="Experience"
            title="Research, clinical exposure, and operator work."
            body="Different environments, but a consistent preference for technical detail, real users, and ambiguous problems."
          />
        </Reveal>
        <ExperienceLedger />
      </section>

      <section className="portfolio-section about-section" id="about">
        <Reveal>
          <SectionHeading
            number="03"
            eyebrow="About"
            title="The context behind the work."
          />
        </Reveal>

        <div className="about-layout">
          <Reveal className="about-copy">
            <p>
              The resume version is neuroscience, research, clinical exposure,
              consulting, and product. The more useful version is that each has
              taught me how to see a different part of the same system.
            </p>
            <p>
              Outside work, I care a lot about music, behavior, movement, and the
              little experiments people run on themselves. Those interests live on
              a separate page because they deserve more than a resume footnote.
            </p>
            <a href="/me">Personal page <ArrowUpRight size={15} /></a>
          </Reveal>

          <div className="background-list">
            {backgroundItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal className="background-item" delay={index * 0.06} key={item.title}>
                  <Icon size={20} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="contact-footer" id="contact">
        <div className="contact-footer-main">
          <span>04 / Contact</span>
          <h2>Let&apos;s talk.</h2>
          <a href={links.email}>mjgerdes@umich.edu <ArrowUpRight size={20} /></a>
        </div>
        <div className="contact-footer-bottom">
          <span>Maya Gerdes</span>
          <div>
            <IconLink href={links.linkedin} label="LinkedIn" icon={Linkedin} />
            <IconLink href={links.github} label="GitHub" icon={Github} />
            <IconLink href={links.x} label="X / Twitter" icon={X} />
          </div>
          <a href="#top" onClick={(event) => scrollToSection(event, "top")}>
            Back to top <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>
    </main>
  );
}

function PersonalPage() {
  return (
    <main>
      <SiteNav page="personal" />
      <header className="personal-hero">
        <motion.div
          className="personal-hero-layout"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.62, ease: EASE }}
        >
          <div>
            <a className="back-link" href="/"><ArrowLeft size={16} /> Main portfolio</a>
            <p>Personal index / Maya Gerdes</p>
            <h1>A few things that shape how I think.</h1>
          </div>
          <p>
            This is the less application-shaped side of the site: music,
            movement, brains, and the small experiments that become part of how I work.
          </p>
        </motion.div>
      </header>

      <section className="personal-quote">
        <p>Same curiosity, different surfaces.</p>
        <blockquote>How do people feel, learn, perform, and change?</blockquote>
      </section>

      <section className="portfolio-section personal-section">
        <SectionHeading
          number="01"
          eyebrow="Personal"
          title="The things I make time for."
          body="Not a second professional identity. Just the parts that explain the first one a little better."
        />
        <div className="personal-list">
          {personalCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal className="personal-row" delay={index * 0.055} key={card.title}>
                <span>0{index + 1}</span>
                <Icon size={21} />
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <footer className="personal-footer">
        <p>Back to the founder, researcher, and builder version.</p>
        <a href="/">Return to portfolio <ArrowUpRight size={15} /></a>
      </footer>
    </main>
  );
}

function App() {
  const normalizedPath = window.location.pathname.replace(/\/$/, "") || "/";
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <SmoothScroll />
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      {normalizedPath === "/me" ? <PersonalPage /> : <PortfolioHome />}
    </>
  );
}

export default App;
