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
  buildAndPitch:
    "https://www.linkedin.com/posts/raylu-ai_thats-a-wrap-on-build-pitch-wraylu-activity-7468661807285637120-wi-k",
  startupCrm: "https://ustartleague.lovable.app/login",
  grndworkLive: "https://grndwork.vercel.app",
  grndworkRepo: "https://github.com/mjmgerdes/grndwork",
  foreverData: "https://foreverdata.live/",
};

type ExperienceCategory = "Work" | "Research" | "Clubs";

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
  image: string;
  imageAlt: string;
};

type ProjectIndexItem = {
  name: string;
  descriptor: string;
  href: string;
  image: string;
};

type PersonalCard = {
  icon: LucideIcon;
  title: string;
  body: string;
};

type LenisWindow = Window & { mayaLenis?: Lenis };

const experienceTabs: ExperienceCategory[] = ["Work", "Research", "Clubs"];

const experiences: ExperienceItem[] = [
  {
    category: "Work",
    logo: {
      alt: "Praxigen",
      image: "/logos/praxigen.png",
      text: "P",
    },
    title: "Founder & Technical Builder",
    org: "Praxigen",
    date: "Apr 2026 - Present",
    summary:
      "Building healthcare workflow infrastructure for specialty practices; led 30+ discovery interviews, product pilots, and a five-person team.",
    tags: ["Founder", "Product", "HealthTech"],
  },
  {
    category: "Work",
    logo: {
      alt: "Michigan Blockchain Consulting",
      image: "/logos/michigan-blockchain.png",
      text: "MBC",
    },
    title: "Forward Deployed Engineer / Project Manager",
    org: "Michigan Blockchain Consulting",
    date: "Aug 2025 - Present",
    summary:
      "Led client-facing product and go-to-market work across blockchain infrastructure, translating technical tradeoffs into usable strategy for four SMB clients.",
    tags: ["Product", "GTM", "Blockchain"],
  },
  {
    category: "Work",
    logo: {
      alt: "NYC Health and Hospitals",
      image: "/logos/nyc-health-hospitals.png",
      text: "NYC",
    },
    title: "Clinical & Forensic Neuropsychiatry Intern",
    org: "NYC Health + Hospitals / Bellevue",
    date: "May 2025 - Aug 2025",
    summary:
      "Supported neuropsychiatry and forensic neurology work across patient cases, diagnostics, and clinical care coordination.",
    tags: ["Neuropsychiatry", "Clinical"],
  },
  {
    category: "Work",
    logo: {
      alt: "Orthopaedic and Spine Surgeons of New Jersey",
      image: "/logos/ossnj.png",
      text: "OSSNJ",
    },
    title: "Orthopaedic Surgery Intern",
    org: "Orthopaedic & Spine Surgeons of New Jersey",
    date: "May 2022 - Feb 2025",
    summary:
      "Observed longitudinal surgical workflows and supported patient-facing practice operations across a multi-year clinical internship.",
    tags: ["Orthopaedics", "Clinical operations"],
  },
  {
    category: "Research",
    logo: {
      alt: "Michigan Medicine",
      image: "/logos/michigan-medicine.svg",
      text: "MM",
    },
    title: "CRISPR Research Assistant",
    org: "Michigan Medicine, Department of Human Genetics",
    date: "Jul 2025 - May 2026",
    summary:
      "Researched CRISPR-based sensing systems for cancer-specific genomic alterations through construct design, SnapGene analysis, and wet-lab troubleshooting.",
    tags: ["CRISPR", "Genetics", "Cancer sensing"],
  },
  {
    category: "Research",
    logo: {
      alt: "Michigan Medicine",
      image: "/logos/michigan-medicine.svg",
      text: "MM",
    },
    title: "Clinical Research Assistant",
    org: "Michigan Medicine, Cardiovascular Surgery",
    date: "Jan 2025 - Sep 2025",
    summary:
      "Worked with cardiovascular imaging and clinical datasets to support patient-outcome and translational research.",
    tags: ["Clinical data", "Imaging", "Outcomes"],
  },
  {
    category: "Research",
    logo: {
      alt: "University of Michigan",
      image: "/logos/university-of-michigan.svg",
      text: "M",
    },
    title: "Biomedical Engineering Research Assistant",
    org: "University of Michigan College of Engineering",
    date: "Nov 2024 - May 2025",
    summary:
      "Contributed to computational biomechanics research connecting engineering methods with clinically meaningful questions.",
    tags: ["Biomechanics", "BME", "Research"],
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
    logo: {
      alt: "Pi Sigma Epsilon",
      image: "/logos/pi-sigma-epsilon.png",
      text: "PSE",
    },
    title: "Speaker Chair",
    org: "Pi Sigma Epsilon",
    date: "Jan 2025 - May 2026",
    summary:
      "Led speaker programming and external outreach for a business and professional development organization.",
    tags: ["Programming", "Outreach", "Leadership"],
  },
  {
    category: "Clubs",
    logo: {
      alt: "Phi Delta Epsilon",
      image: "/logos/phi-delta-epsilon.png",
      text: "PhiDE",
    },
    title: "Finance & Professional Development Chair",
    org: "Phi Delta Epsilon",
    date: "Sep 2025 - Present",
    summary:
      "Managed chapter finances and built professional-development programming for a pre-medical community.",
    tags: ["Finance", "Professional development"],
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
    image: "/projects/startup-crm-interface.png",
    imageAlt: "Startup CRM dashboard with member records, workspace metrics, and operating views.",
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
    image: "/projects/grndwork-interface.png",
    imageAlt: "grndwork career discovery interface with role matches and career signals.",
  },
  {
    number: "04",
    name: "ForeverData",
    label: "GTM / infrastructure",
    href: projectLinks.foreverData,
    body:
      "Go-to-market support for a data persistence product working across decentralized storage and Web3 infrastructure.",
    tags: ["GTM", "Data infrastructure", "Web3"],
    image: "/projects/foreverdata-interface.png",
    imageAlt: "ForeverData product website showing permanent data storage infrastructure.",
  },
];

const projectIndex: ProjectIndexItem[] = [
  {
    name: "Praxigen",
    descriptor: "HealthTech startup",
    href: projectLinks.praxigen,
    image: "/praxigen/pa-lookup.webp",
  },
  {
    name: "Build & Pitch Winner",
    descriptor: "a16z NY Tech Week / Raylu",
    href: projectLinks.buildAndPitch,
    image: "/praxigen/appeal-generator.webp",
  },
  {
    name: "Startup CRM",
    descriptor: "Product & operations",
    href: projectLinks.startupCrm,
    image: "/projects/startup-crm-interface.png",
  },
  {
    name: "grndwork",
    descriptor: "Career discovery product",
    href: projectLinks.grndworkLive,
    image: "/projects/grndwork-interface.png",
  },
  {
    name: "ForeverData",
    descriptor: "Go-to-market collaboration",
    href: projectLinks.foreverData,
    image: "/projects/foreverdata-interface.png",
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
    body: "B.S. in Neuroscience Honors, with minors in Business and Entrepreneurship. Expected May 2028.",
  },
  {
    icon: BadgeCheck,
    title: "Academic recognition",
    body: "3.96 GPA, William J. Branstrom Award, James B. Angell Scholar, and Phi Kappa Phi.",
  },
  {
    icon: BriefcaseBusiness,
    title: "What I work on",
    body: "Clinical workflows, healthcare products, research, and go-to-market.",
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
  size = 17,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  size?: number;
}) {
  const external = href.startsWith("http");

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      aria-label={label}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      <Icon size={size} strokeWidth={1.9} />
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
    { label: "Resume", href: "/Maya-Gerdes-Resume.pdf" },
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

function ProjectMarquee() {
  return (
    <div className="project-marquee" aria-label="Project index">
      <div className="project-marquee-track">
        {[0, 1].map((copy) => (
          <div className="project-marquee-set" aria-hidden={copy === 1} key={copy}>
            {projectIndex.map((project) => (
              <a
                className="project-marquee-card"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                tabIndex={copy === 1 ? -1 : undefined}
                key={`${copy}-${project.name}`}
              >
                <span className="project-marquee-image">
                  <img src={project.image} alt="" />
                </span>
                <span className="project-marquee-copy">
                  <strong>{project.name}</strong>
                  <small>{project.descriptor}</small>
                </span>
                <ArrowUpRight size={15} />
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="project-card"
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.58, delay: index * 0.08, ease: EASE }}
    >
      <a href={project.href} target="_blank" rel="noreferrer" className="project-art-link">
        <span className="project-interface">
          <img src={project.image} alt={project.imageAlt} />
        </span>
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
          <motion.div className="hero-copy" variants={heroItem}>
            <p className="hero-kicker">student / builder / founder</p>
            <h1>Maya Gerdes</h1>
            <div className="hero-socials" aria-label="Maya Gerdes profiles">
              <IconLink href={links.linkedin} label="LinkedIn" icon={Linkedin} size={20} />
              <IconLink href={links.github} label="GitHub" icon={Github} size={20} />
              <IconLink href={links.x} label="X / Twitter" icon={X} size={20} />
              <IconLink href={links.email} label="Email Maya" icon={Mail} size={20} />
            </div>
            <p className="hero-bio">
              Hi, I&apos;m Maya! I study neuroscience, business, and
              entrepreneurship at the University of Michigan. I&apos;m deeply
              curious about how people, technology, and complex systems work,
              with particular interests in genetics, human consciousness, and
              the future of healthcare.
            </p>
            <div className="hero-links">
              <a href="#work" onClick={(event) => scrollToSection(event, "work")}>
                Selected work <ArrowDown size={15} />
              </a>
              <a href="/Maya-Gerdes-Resume.pdf" target="_blank" rel="noreferrer">
                Resume <ArrowUpRight size={15} />
              </a>
              <a href="/me">
                Outside work <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>
          <motion.figure className="hero-portrait" variants={heroItem}>
            <img
              src="/profile/maya-gerdes-headshot.jpg"
              alt="Maya Gerdes"
            />
            <figcaption>
              <span>Ann Arbor, MI</span>
              <span>2026</span>
            </figcaption>
          </motion.figure>
        </motion.div>

        <motion.div
          className="hero-notes"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.58, delay: 0.42, ease: EASE }}
        >
          <div><span>Currently</span><strong>Building Praxigen</strong></div>
          <div><span>Studying</span><strong>Neuroscience, business, entrepreneurship</strong></div>
          <div><span>Curious about</span><strong>Genetics, consciousness, healthcare</strong></div>
        </motion.div>
      </header>

      <section className="portfolio-section work-section" id="work">
        <Reveal>
          <SectionHeading
            number="01"
            eyebrow="Selected work"
            title="Selected builds and collaborations."
            body="Praxigen is the main build. The others came from roles where I needed a tool, a clearer workflow, or a sharper route to market."
          />
        </Reveal>

        <Reveal className="project-index-block">
          <div className="project-index-label">
            <span>Project index</span>
            <span>Open any project to explore</span>
          </div>
          <ProjectMarquee />
        </Reveal>

        <article className="featured-case">
          <div className="featured-case-copy">
            <Reveal>
              <div className="case-meta"><span>01</span><span>Founder / product / GTM</span></div>
              <h3>Praxigen</h3>
              <p>
                Healthcare workflow infrastructure for specialty practices. It
                connects payer requirements, clinical-note checks, appeals,
                pre-claim mismatches, and follow-up in one workspace.
              </p>
              <dl className="case-facts">
                <div><dt>Role</dt><dd>Founder & technical builder</dd></div>
                <div><dt>Discovery</dt><dd>30+ interviews</dd></div>
                <div><dt>Stage</dt><dd>Product pilots</dd></div>
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
            <div className="case-interface-strip">
              <div className="case-image case-image-secondary">
                <img
                  src="/praxigen/pa-lookup.webp"
                  alt="Praxigen prior authorization lookup showing payer requirements."
                />
              </div>
              <div className="case-image case-image-secondary">
                <img
                  src="/praxigen/note-checker.webp"
                  alt="Praxigen note checker showing a clinical documentation score and policy checks."
                />
              </div>
              <div className="case-image case-image-secondary">
                <img
                  src="/praxigen/preclaim-check.webp"
                  alt="Praxigen pre-claim checker comparing an authorization and a claim."
                />
              </div>
            </div>
            <span className="case-caption">Selected Praxigen product surfaces</span>
          </div>
        </article>

        <div className="project-grid">
          {supportingProjects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.name} />
          ))}
        </div>

        <Reveal className="collaboration-row achievement-row">
          <div>
            <span>05</span>
            <span>Milestone</span>
          </div>
          <h3>Build & Pitch Winner</h3>
          <p>Won Raylu&apos;s Build & Pitch hackathon during a16z New York Tech Week with Praxigen.</p>
          <a href={projectLinks.buildAndPitch} target="_blank" rel="noreferrer" aria-label="Open Build and Pitch announcement">
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
            title="Where I have worked, researched, and led."
            body="Roles across clinical research, product, client work, and campus organizations."
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
              I study neuroscience because I like problems that demand rigor
              and humility. Building products gives me a way to turn that
              curiosity into something people can use.
            </p>
            <p>
              Outside work, I play guitar and piano, DJ, play pickleball, and
              keep a running list of questions about sleep, behavior, and the
              brain. That side of me lives on its own page.
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
            This page is for music, movement, brains, and the small experiments
            I keep coming back to when I am not working.
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
