import {
  Activity,
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
  useInView,
  useMotionValue,
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
const INTRO_KEY = "maya-portfolio:intro-seen";

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

type SupportingProject = {
  name: string;
  label: string;
  href: string;
  body: string;
  tags: string[];
  repo?: string;
  preview: "crm" | "grndwork" | "forever";
};

type PersonalCard = {
  icon: LucideIcon;
  title: string;
  body: string;
};

type PraxigenScreen = {
  title: string;
  body: string;
  image: string;
  alt: string;
  route: string;
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
    logo: {
      alt: "Pi Sigma Epsilon",
      text: "PSE",
    },
    title: "DEI Director and Council Member",
    org: "Pi Sigma Epsilon",
    date: "Sep 2024 - Present",
    summary:
      "Help organize programming, recruiting, and member-facing systems for a business and professional development community.",
    tags: ["Programming", "Recruiting", "Leadership"],
  },
  {
    category: "Clubs",
    logo: {
      alt: "Phi Delta Epsilon",
      text: "PhiDE",
    },
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

const supportingProjects: SupportingProject[] = [
  {
    name: "Startup CRM",
    label: "Operator tool",
    href: projectLinks.startupCrm,
    body:
      "A lightweight operating layer for a startup league team, with Google Sheets kept as the source of truth.",
    tags: ["CRM", "Google Sheets", "Operations"],
    preview: "crm",
  },
  {
    name: "grndwork",
    label: "Career platform",
    href: projectLinks.grndworkLive,
    repo: projectLinks.grndworkRepo,
    body:
      "An early-access product that helps students turn broad interests into clearer roles, targets, and outreach.",
    tags: ["React", "Product", "Career discovery"],
    preview: "grndwork",
  },
  {
    name: "ForeverData",
    label: "Go-to-market",
    href: projectLinks.foreverData,
    body:
      "Go-to-market work for a data persistence product operating across storage and Web3 infrastructure.",
    tags: ["GTM", "Data infrastructure", "Web3"],
    preview: "forever",
  },
];

const praxigenScreens: PraxigenScreen[] = [
  {
    title: "Case queue",
    body: "One operating view for submitted, urgent, overdue, and denied authorizations.",
    image: "/praxigen/workspace.webp",
    alt: "Praxigen case queue showing prior authorization cases, payer status, due dates, and next actions.",
    route: "praxigen.dev/app/cases",
  },
  {
    title: "PA lookup",
    body: "Compare payer criteria and required documentation before a case is submitted.",
    image: "/praxigen/pa-lookup.webp",
    alt: "Praxigen prior authorization lookup showing payer criteria for rotator cuff repair.",
    route: "praxigen.dev/search",
  },
  {
    title: "Note checker",
    body: "Score a clinical note against payer policy and surface the missing evidence.",
    image: "/praxigen/note-checker.webp",
    alt: "Praxigen note checker showing a strong note score and clinical policy checks.",
    route: "praxigen.dev/check",
  },
  {
    title: "Appeal generator",
    body: "Turn case context, payer policy, and appeal level into a grounded first draft.",
    image: "/praxigen/appeal-generator.webp",
    alt: "Praxigen appeal letter generator form with payer and case type inputs.",
    route: "praxigen.dev/appeal",
  },
  {
    title: "Pre-claim check",
    body: "Catch authorization and claim mismatches before the claim drops.",
    image: "/praxigen/preclaim-check.webp",
    alt: "Praxigen pre-claim check comparing authorized and billed details with blocking issues.",
    route: "praxigen.dev/digital-auth",
  },
  {
    title: "Denial intelligence",
    body: "See recurring procedures, payer activity, and the patterns driving denials.",
    image: "/praxigen/denial-insights.webp",
    alt: "Praxigen denial intelligence dashboard with metrics and procedure activity.",
    route: "praxigen.dev/insights",
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
    title: "The through-line",
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

function SiteIntro() {
  const [visible, setVisible] = useState(() => {
    try {
      return window.sessionStorage.getItem(INTRO_KEY) !== "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!visible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(INTRO_KEY, "1");
      } catch {
        // The intro still completes when storage is unavailable.
      }
      setVisible(false);
      document.body.style.overflow = previousOverflow;
    }, 1850);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="site-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: EASE } }}
          aria-hidden="true"
        >
          <motion.div
            className="intro-lockup"
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.62, ease: EASE, delay: 0.1 }}
          >
            <span className="intro-mark">MG</span>
            <strong>Maya Gerdes</strong>
            <small>Founder / researcher / builder</small>
            <i />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
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
              : { opacity: 0, y: 13, filter: "blur(5px)" }
          }
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.52, delay: index * 0.045, ease: EASE }}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}

function Drift({
  children,
  className,
  range = [24, -24],
}: {
  children: ReactNode;
  className?: string;
  range?: [number, number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], range);

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

function MagneticLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className: string;
}) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22 });
  const springY = useSpring(y, { stiffness: 260, damping: 22 });

  const onMove = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.13);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.16);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
    >
      {children}
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
  if (lenis) lenis.scrollTo(target, { offset: -74, duration: 1.05 });
  else target.scrollIntoView({ behavior: "smooth" });
}

function SiteNav({ page = "home" }: { page?: "home" | "personal" }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isPersonal = page === "personal";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
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

  const anchorHref = (id: string) => (isPersonal ? `/#${id}` : `#${id}`);
  const close = () => setMenuOpen(false);

  const navItems = [
    { label: "Work", id: "work" },
    { label: "Experience", id: "experience" },
    { label: "Personal", href: "/me" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <nav
        className={`site-nav${scrolled ? " is-scrolled" : ""}`}
        aria-label="Primary navigation"
      >
        <a className="brand" href={isPersonal ? "/" : "#top"}>
          <span className="brand-mark" aria-hidden="true">MG</span>
          <span>Maya Gerdes</span>
        </a>

        <div className="nav-links">
          {navItems.map((item) =>
            item.href ? (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
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

        <a className="nav-contact arrow-shift" href={links.email}>
          Say hello <span className="arr">↗</span>
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
            {navItems.map((item) =>
              item.href ? (
                <a key={item.label} href={item.href} onClick={close}>
                  {item.label}
                  <ArrowUpRight size={16} />
                </a>
              ) : (
                <a
                  key={item.label}
                  href={anchorHref(item.id!)}
                  onClick={(event) => scrollToSection(event, item.id!, close)}
                >
                  {item.label}
                  <ArrowUpRight size={16} />
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
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-heading ${align}`}>
      <p className="section-kicker">{eyebrow}</p>
      <h2 aria-label={title}>
        <RevealWords text={title} />
      </h2>
      {body ? <p className="section-body">{body}</p> : null}
    </div>
  );
}

function BrowserFrame({
  route,
  children,
  className = "",
}: {
  route: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`browser-frame ${className}`}>
      <div className="browser-chrome" aria-hidden="true">
        <span className="chrome-dot red" />
        <span className="chrome-dot yellow" />
        <span className="chrome-dot green" />
        <span className="browser-url">{route}</span>
      </div>
      {children}
    </div>
  );
}

function PraxigenTour() {
  const [active, setActive] = useState(0);
  const touched = useRef(false);
  const tourRef = useRef<HTMLDivElement>(null);
  const inView = useInView(tourRef, { margin: "-15% 0px -15% 0px" });
  const reduceMotion = useReducedMotion();
  const screen = praxigenScreens[active];

  useEffect(() => {
    if (reduceMotion || !inView) return;
    const timer = window.setInterval(() => {
      if (!touched.current) {
        setActive((current) => (current + 1) % praxigenScreens.length);
      }
    }, 5200);
    return () => window.clearInterval(timer);
  }, [inView, reduceMotion]);

  const choose = (index: number) => {
    touched.current = true;
    setActive(index);
  };

  return (
    <div className="praxigen-tour" ref={tourRef}>
      <div className="tour-tabs" role="tablist" aria-label="Praxigen product screens">
        {praxigenScreens.map((item, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls="praxigen-tour-panel"
            className={active === index ? "active" : ""}
            key={item.title}
            onClick={() => choose(index)}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="tour-beam">
        <BrowserFrame route={screen.route} className="tour-window">
          <div id="praxigen-tour-panel" role="tabpanel" className="tour-panel">
            <AnimatePresence mode="wait">
              <motion.img
                key={screen.image}
                src={screen.image}
                alt={screen.alt}
                initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: -14 }}
                transition={{ duration: 0.36, ease: EASE }}
              />
            </AnimatePresence>
          </div>
          <div className="tour-caption">
            <div>
              <span>Actual product interface</span>
              <strong>{screen.title}</strong>
            </div>
            <p>{screen.body}</p>
          </div>
        </BrowserFrame>
      </div>
    </div>
  );
}

function ProjectPreview({ kind }: { kind: SupportingProject["preview"] }) {
  if (kind === "crm") {
    return (
      <div className="mini-product crm-preview" aria-hidden="true">
        <div className="mini-product-bar">
          <strong>UStart League</strong>
          <span>Season 04</span>
        </div>
        <div className="crm-layout">
          <div>
            <small>TEAM WORKSPACE</small>
            <b>Run the season from one place.</b>
            <i>Google Sheets stays the source of truth.</i>
          </div>
          <div className="crm-panel">
            <span>Founder pipeline</span>
            <em>24 active</em>
            <span>Partner outreach</span>
            <em>9 due</em>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "grndwork") {
    return (
      <div className="mini-product grndwork-preview" aria-hidden="true">
        <div className="mini-product-bar">
          <strong>grndwork</strong>
          <span>EARLY ACCESS</span>
        </div>
        <div className="grndwork-copy">
          <small>YOUR CAREER, WITH SIGNAL</small>
          <b>Discover your path.</b>
        </div>
        <div className="grndwork-metrics">
          <span><small>MATCH</small>92%</span>
          <span><small>ROLES</small>48</span>
          <span><small>TRACKED</small>12</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mini-product forever-preview" aria-hidden="true">
      <div className="mini-product-bar">
        <strong>ForeverData</strong>
        <span>DATA PERSISTENCE</span>
      </div>
      <div className="forever-orbit">
        <span>Archive</span>
        <span>Verify</span>
        <span>Retrieve</span>
        <i />
      </div>
      <div className="forever-status">
        <span>Storage network</span>
        <strong>Persistent</strong>
      </div>
    </div>
  );
}

function ProjectRow({
  project,
  index,
}: {
  project: SupportingProject;
  index: number;
}) {
  return (
    <motion.article
      className="project-row"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.52, delay: index * 0.06, ease: EASE }}
    >
      <span className="project-index">0{index + 1}</span>
      <div className="project-row-copy">
        <p className="project-label">{project.label}</p>
        <h3>{project.name}</h3>
        <p>{project.body}</p>
        <div className="tag-row">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <div className="project-links">
          <a className="arrow-shift" href={project.href} target="_blank" rel="noreferrer">
            Open project <ArrowUpRight className="arr" size={15} />
          </a>
          {project.repo ? (
            <a href={project.repo} target="_blank" rel="noreferrer">
              <Github size={15} /> Repository
            </a>
          ) : null}
        </div>
      </div>
      <ProjectPreview kind={project.preview} />
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
      <div className="experience-heading">
        <SectionHeading
          eyebrow="Experience"
          title="Research, clinical exposure, and operator work."
          body="I tend to end up where technical detail and human workflow are tangled together."
        />
        <div className="experience-tabs" role="tablist" aria-label="Experience filters">
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
              <div className="experience-primary">
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

function ThesisBand() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.965, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [26, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [34, 0]);

  return (
    <motion.section
      ref={ref}
      className="thesis-band"
      style={{
        scale: reduceMotion ? 1 : scale,
        borderRadius: reduceMotion ? 0 : radius,
      }}
    >
      <div className="thesis-grid" aria-hidden="true" />
      <motion.div className="thesis-copy" style={{ y: reduceMotion ? 0 : contentY }}>
        <p>Working thesis</p>
        <h2>
          The hardest problems are often stuck between
          <span> policy, people, and the next action.</span>
        </h2>
        <small>That is the kind of system I keep choosing to work on.</small>
      </motion.div>
    </motion.section>
  );
}

function PortfolioHome() {
  const heroVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
  };
  const heroItem = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.62, ease: EASE } },
  };

  return (
    <main>
      <SiteIntro />
      <SiteNav />

      <header className="home-hero" id="top">
        <Drift className="hero-copy" range={[0, 32]}>
          <motion.div variants={heroVariants} initial="hidden" animate="show">
            <motion.p className="status-pill" variants={heroItem}>
              <span /> Founder, Praxigen · University of Michigan
            </motion.p>
            <motion.h1 variants={heroItem}>Maya Gerdes</motion.h1>
            <motion.p className="hero-role" variants={heroItem}>
              I build software for work that falls between systems.
            </motion.p>
            <motion.p className="hero-body" variants={heroItem}>
              Right now, that is Praxigen: a prior authorization workspace for
              specialty medical practices. I study neuroscience at Michigan and
              work across product, clinical research, and go-to-market.
            </motion.p>
            <motion.div className="hero-actions" variants={heroItem}>
              <MagneticLink className="button primary arrow-shift" href={projectLinks.praxigen}>
                See Praxigen <ArrowUpRight className="arr" size={17} />
              </MagneticLink>
              <a className="button secondary" href={links.email}>
                <Mail size={17} /> Email me
              </a>
            </motion.div>
            <motion.div className="social-strip" variants={heroItem} aria-label="External profiles">
              <IconLink href={links.linkedin} label="LinkedIn" icon={Linkedin} />
              <IconLink href={links.github} label="GitHub" icon={Github} />
              <IconLink href={links.x} label="X / Twitter" icon={X} />
            </motion.div>
          </motion.div>
        </Drift>

        <motion.a
          className="hero-product"
          href={projectLinks.praxigen}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 30, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.78, delay: 0.46, ease: EASE }}
        >
          <BrowserFrame route="praxigen.dev/app/cases">
            <img
              src="/praxigen/workspace.webp"
              alt="Praxigen case workspace with authorization status, payer, due date, and next action."
            />
            <div className="hero-product-caption">
              <span><small>Current build</small>Praxigen</span>
              <p>One workflow from payer requirement to next action.</p>
              <b>Open product <ArrowUpRight size={15} /></b>
            </div>
          </BrowserFrame>
        </motion.a>
      </header>

      <div className="focus-rail" aria-label="Areas of focus">
        {["Founder", "Healthcare workflow", "Neuroscience", "Clinical research", "Product", "Go-to-market"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <section className="section praxigen-section" id="work">
        <Reveal>
          <SectionHeading
            eyebrow="The startup"
            title="Praxigen is the thing I am building now."
            body="A source-grounded workflow for the administrative work around prior authorization: requirements, clinical-note checks, appeals, pre-claim mismatches, and follow-up."
            align="center"
          />
        </Reveal>

        <Reveal className="praxigen-brief">
          <div>
            <span>My role</span>
            <strong>Founder</strong>
          </div>
          <div>
            <span>Problem</span>
            <strong>Prior authorization</strong>
          </div>
          <div>
            <span>Built across</span>
            <strong>Product, workflow, and GTM</strong>
          </div>
          <a className="arrow-shift" href={projectLinks.praxigen} target="_blank" rel="noreferrer">
            Visit Praxigen <ArrowUpRight className="arr" size={15} />
          </a>
        </Reveal>

        <Reveal delay={0.08}>
          <PraxigenTour />
        </Reveal>
      </section>

      <section className="section supporting-section">
        <Reveal>
          <SectionHeading
            eyebrow="Other builds"
            title="Smaller products, real operating problems."
            body="Side projects are where I test product ideas quickly: a clearer workflow, a cleaner interface, or a sharper way to get signal."
          />
        </Reveal>

        <div className="project-list">
          {supportingProjects.map((project, index) => (
            <ProjectRow project={project} index={index} key={project.name} />
          ))}
        </div>
      </section>

      <ThesisBand />

      <section className="experience-section" id="experience">
        <div className="section experience-inner">
          <ExperienceLedger />
        </div>
      </section>

      <section className="section background-section">
        <Reveal>
          <SectionHeading
            eyebrow="Background"
            title="A little context behind the work."
            body="The resume version is neuroscience, research, clinical exposure, consulting, and product. The useful version is that each has taught me how to see a different part of the same system."
          />
        </Reveal>

        <div className="background-ledger">
          {backgroundItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal className="background-item" delay={index * 0.06} key={item.title}>
                <Icon size={21} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="personal-bridge">
        <Drift className="personal-bridge-inner" range={[18, -18]}>
          <div>
            <p className="section-kicker">Beyond the resume</p>
            <h2>Music, neuroscience, pickleball, and the experiments in between.</h2>
            <p>
              The personal page is where the less application-shaped parts live:
              what I listen to, how I reset, and the questions I keep returning to.
            </p>
          </div>
          <div className="interest-index" aria-label="Personal interests">
            {["Guitar + piano", "DJing", "Pickleball", "Biohacking", "Behavior change"].map((interest) => (
              <span key={interest}>{interest}</span>
            ))}
          </div>
          <a className="button secondary arrow-shift" href="/me">
            Go to the personal page <span className="arr">→</span>
          </a>
        </Drift>
      </section>

      <section className="closing-section" id="contact">
        <motion.div
          className="closing-card"
          initial={{ opacity: 0, y: 30, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.72, ease: EASE }}
        >
          <div className="closing-grid" aria-hidden="true" />
          <p>Contact</p>
          <h2>Building, researching, or thinking about a hard workflow?</h2>
          <span>For Praxigen, grants, accelerators, healthcare operations, or research-product conversations.</span>
          <div className="closing-actions">
            <a className="button light" href={links.email}>
              <Mail size={17} /> mjgerdes@umich.edu
            </a>
            <IconLink href={links.linkedin} label="LinkedIn" icon={Linkedin} />
            <IconLink href={links.github} label="GitHub" icon={Github} />
            <IconLink href={links.x} label="X / Twitter" icon={X} />
          </div>
        </motion.div>
      </section>

      <footer className="site-footer">
        <span>Maya Gerdes</span>
        <span>Founder, Praxigen</span>
        <a href="#top" onClick={(event) => scrollToSection(event, "top")}>Back to top ↑</a>
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
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.62, ease: EASE }}
        >
          <a className="back-link arrow-shift" href="/">
            <ArrowLeft className="arr" size={16} /> Back to the main page
          </a>
          <p className="status-pill"><span /> Outside the resume</p>
          <h1>A few things that shape how I think.</h1>
          <p>
            This is the less polished, more personal side of the site: music,
            movement, brains, and the small experiments that become part of how I work.
          </p>
        </motion.div>
      </header>

      <section className="personal-statement">
        <p>Same curiosity, different surfaces.</p>
        <h2>How do people feel, learn, perform, and change?</h2>
      </section>

      <section className="section personal-section">
        <SectionHeading
          eyebrow="Personal index"
          title="The things I make time for."
          body="Not a second professional identity. Just the parts that explain the first one a little better."
        />
        <div className="personal-list">
          {personalCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal className="personal-row" delay={index * 0.055} key={card.title}>
                <span>0{index + 1}</span>
                <Icon size={22} />
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="personal-return">
        <p>The founder version is back on the main page.</p>
        <a className="button primary arrow-shift" href="/">
          Return home <span className="arr">→</span>
        </a>
      </section>
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
