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
  useMotionValue,
  useMotionValueEvent,
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

type RailProject = {
  number: string;
  name: string;
  label: string;
  href: string;
  body: string;
  tags: string[];
  repo?: string;
  image: string;
  imageAlt: string;
  role: string;
  year: string;
  tone: "ice" | "carbon" | "sky" | "violet";
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

const railProjects: RailProject[] = [
  {
    number: "01",
    name: "Praxigen",
    label: "Featured build / HealthTech",
    href: projectLinks.praxigen,
    body:
      "Healthcare workflow infrastructure for specialty practices, connecting payer requirements, clinical-note checks, appeals, pre-claim mismatches, and follow-up.",
    tags: ["30+ interviews", "Product pilots", "Five-person team"],
    image: "/praxigen/workspace.webp",
    imageAlt: "Praxigen case workspace showing payer status, due dates, and next actions.",
    role: "Founder & technical builder",
    year: "2026 - now",
    tone: "ice",
  },
  {
    number: "02",
    name: "Startup CRM",
    label: "Product / operations",
    href: projectLinks.startupCrm,
    body:
      "A lightweight operating layer for a startup league team, with Google Sheets kept as the source of truth.",
    tags: ["CRM", "Google Sheets", "Operations"],
    image: "/projects/startup-crm-interface.webp",
    imageAlt: "Startup CRM dashboard with member records, workspace metrics, and operating views.",
    role: "Product & engineering",
    year: "2026",
    tone: "carbon",
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
    image: "/projects/grndwork-interface.webp",
    imageAlt: "grndwork career discovery interface with role matches and career signals.",
    role: "Product & engineering",
    year: "2026",
    tone: "sky",
  },
  {
    number: "04",
    name: "ForeverData",
    label: "GTM / infrastructure",
    href: projectLinks.foreverData,
    body:
      "Go-to-market support for a data persistence product working across decentralized storage and Web3 infrastructure.",
    tags: ["GTM", "Data infrastructure", "Web3"],
    image: "/projects/foreverdata-interface.webp",
    imageAlt: "ForeverData product website showing permanent data storage infrastructure.",
    role: "Go-to-market",
    year: "2025",
    tone: "violet",
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

function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let ratio = 1;
    let frame = 0;
    const pointer = { x: 0, y: 0, active: false };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      pointer.x = width * 0.7;
      pointer.y = height * 0.42;
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active =
        pointer.x >= 0 && pointer.x <= bounds.width && pointer.y >= 0 && pointer.y <= bounds.height;
    };

    const draw = (time: number) => {
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.lineWidth = 0.7;

      const rowGap = width < 700 ? 48 : 42;
      const columnGap = width < 700 ? 58 : 70;
      const rows = Math.ceil(height / rowGap) + 2;
      const columns = Math.ceil(width / columnGap) + 2;

      for (let row = -1; row < rows; row += 1) {
        const baseY = row * rowGap;
        context.beginPath();
        for (let x = 0; x <= width + 16; x += 16) {
          const distanceX = x - pointer.x;
          const distanceY = baseY - pointer.y;
          const influence = pointer.active
            ? Math.exp(-(distanceX * distanceX) / 36000) * Math.exp(-(distanceY * distanceY) / 70000)
            : 0;
          const bend = (pointer.y - baseY) * influence * 0.16;
          const wave = reduceMotion ? 0 : Math.sin(time * 0.00032 + x * 0.012 + row * 0.5) * 2.2;
          const y = baseY + bend + wave;
          if (x === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.strokeStyle = row % 5 === 0
          ? "rgba(151, 211, 18, 0.34)"
          : "rgba(33, 82, 255, 0.14)";
        context.stroke();
      }

      for (let column = -1; column < columns; column += 1) {
        const baseX = column * columnGap;
        context.beginPath();
        for (let y = 0; y <= height + 16; y += 16) {
          const distanceX = baseX - pointer.x;
          const distanceY = y - pointer.y;
          const influence = pointer.active
            ? Math.exp(-(distanceY * distanceY) / 36000) * Math.exp(-(distanceX * distanceX) / 62000)
            : 0;
          const bend = (pointer.x - baseX) * influence * 0.13;
          const wave = reduceMotion ? 0 : Math.cos(time * 0.00027 + y * 0.01 + column * 0.42) * 1.7;
          const x = baseX + bend + wave;
          if (y === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.strokeStyle = "rgba(15, 22, 33, 0.07)";
        context.stroke();
      }

      context.fillStyle = "rgba(33, 82, 255, 0.34)";
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          if ((row + column) % 3 !== 0) continue;
          context.fillRect(column * columnGap - 0.75, row * rowGap - 0.75, 1.5, 1.5);
        }
      }

      if (!reduceMotion) {
        const scanY = (time * 0.035) % Math.max(height, 1);
        context.beginPath();
        context.moveTo(0, scanY);
        context.lineTo(width, scanY);
        context.strokeStyle = "rgba(151, 211, 18, 0.18)";
        context.lineWidth = 1;
        context.stroke();
      }
    };

    const animate = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    if (reduceMotion) draw(0);
    else frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} className="signal-field" aria-hidden="true" />;
}

function DecodeText({ text, className }: { text: string; className?: string }) {
  const reduceMotion = useReducedMotion();
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (reduceMotion) {
      setOutput(text);
      return;
    }

    const glyphs = "01<>/[]{}+*";
    const duration = 820;
    const startedAt = performance.now();
    let frame = 0;

    const tick = (time: number) => {
      const progress = Math.min(1, (time - startedAt) / duration);
      const resolved = Math.floor(progress * text.length);
      setOutput(
        text
          .split("")
          .map((character, index) => {
            if (character === " " || character === "/") return character;
            if (index < resolved) return character;
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join(""),
      );
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, text]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{output}</span>
    </span>
  );
}

function PortraitFigure() {
  const reduceMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothX = useSpring(rotateX, { stiffness: 180, damping: 24 });
  const smoothY = useSpring(rotateY, { stiffness: 180, damping: 24 });

  const onPointerMove = (event: ReactMouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateY.set(x * 3.5);
    rotateX.set(y * -3.5);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.figure
      className="hero-portrait"
      style={{ rotateX: smoothX, rotateY: smoothY, transformPerspective: 1000 }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      <motion.div
        className="hero-portrait-image"
        initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: reduceMotion ? 0 : 1.05, delay: reduceMotion ? 0 : 0.18, ease: EASE }}
      >
        <img src="/profile/maya-gerdes-headshot.jpg" alt="Maya Gerdes" />
        <span className="portrait-scan" aria-hidden="true" />
      </motion.div>
      <figcaption>
        <span>Ann Arbor, MI</span>
        <span>Founder file / 2026</span>
      </figcaption>
    </motion.figure>
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
              : { opacity: 0, y: 12, filter: "blur(5px)" }
          }
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
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
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 360, damping: 24 });
  const springY = useSpring(y, { stiffness: 360, damping: 24 });

  const onPointerMove = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.2);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      aria-label={label}
      style={{ x: springX, y: springY }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
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
  const reduceMotion = useReducedMotion();
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
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.24, ease: EASE }}
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

function ProjectRail() {
  const railRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeProject, setActiveProject] = useState(0);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-255vw"]);
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActiveProject(Math.min(railProjects.length - 1, Math.floor(latest * railProjects.length)));
  });

  return (
    <section className="project-rail-section" id="work" ref={railRef}>
      <div className="project-rail-sticky">
        <div className="project-rail-header">
          <div>
            <span>01 / Selected systems</span>
            <strong>Products, experiments, and go-to-market work</strong>
          </div>
          <a href={projectLinks.buildAndPitch} target="_blank" rel="noreferrer">
            <span>Build & Pitch winner</span>
            <small>a16z NY Tech Week / Raylu</small>
            <ArrowUpRight size={15} />
          </a>
        </div>

        <motion.div
          className="project-rail-track"
          style={{ x: reduceMotion ? 0 : x }}
        >
          {railProjects.map((project, index) => (
            <article className={`rail-panel tone-${project.tone}`} key={project.name}>
              <div className="rail-panel-copy">
                <div className="rail-panel-index">
                  <span>{project.number}</span>
                  <span>{project.label}</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.body}</p>
                <dl>
                  <div><dt>Role</dt><dd>{project.role}</dd></div>
                  <div><dt>Year</dt><dd>{project.year}</dd></div>
                </dl>
                <div className="rail-panel-links">
                  <a href={project.href} target="_blank" rel="noreferrer">
                    Open project <ArrowUpRight size={15} />
                  </a>
                  {project.repo ? (
                    <a href={project.repo} target="_blank" rel="noreferrer">
                      <Github size={14} /> Source
                    </a>
                  ) : null}
                </div>
              </div>

              <a
                className="rail-panel-media"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.name}`}
              >
                <span className="interface-window-bar" aria-hidden="true">
                  <i /><i /><i />
                  <b>{project.name.toLowerCase()}.interface</b>
                </span>
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <span className="media-open-indicator" aria-hidden="true">
                  View <ArrowUpRight size={14} />
                </span>
              </a>

              <div className="rail-panel-tags" aria-label={`${project.name} highlights`}>
                {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </motion.div>

        <div className="project-rail-progress" aria-hidden="true">
          <div className="rail-progress-label">
            <span>{String(activeProject + 1).padStart(2, "0")}</span>
            <span>/ {String(railProjects.length).padStart(2, "0")}</span>
          </div>
          <span className="rail-progress-track">
            <motion.span className="rail-progress-fill" style={{ scaleX: progress }} />
          </span>
          <span className="rail-progress-name">{railProjects[activeProject].name}</span>
        </div>
      </div>
    </section>
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
  const reduceMotion = useReducedMotion();
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
            {tab === activeTab ? (
              <motion.span className="experience-tab-active" layoutId="experience-tab-active" />
            ) : null}
            <span>{tab}</span>
          </button>
        ))}
      </div>

      <motion.div className="experience-list" layout>
        <AnimatePresence mode="popLayout">
          {items.map((experience, index) => (
            <motion.article
              className="experience-item"
              layout
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              whileHover={reduceMotion ? undefined : { x: 6 }}
              transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
              key={`${experience.org}-${experience.title}`}
            >
              <span className="experience-count">{String(index + 1).padStart(2, "0")}</span>
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
  const reduceMotion = useReducedMotion();
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
        <SignalField />
        <motion.div
          className="hero-layout"
          variants={heroVariants}
          initial={reduceMotion ? false : "hidden"}
          animate="show"
        >
          <motion.div className="hero-copy" variants={heroItem}>
            <div className="hero-presence">
              <span><i /> Founder, Praxigen</span>
              <span>Ann Arbor, MI</span>
            </div>
            <p className="hero-kicker">
              <DecodeText text="student / builder / founder" />
            </p>
            <h1>
              <span className="hero-name-line"><span>Maya</span></span>
              <span className="hero-name-line"><span>Gerdes</span></span>
            </h1>
            <p className="hero-lead">
              Building at the edge of healthcare, software, and human behavior.
            </p>
            <p className="hero-bio">
              I study neuroscience, business, and entrepreneurship at the
              University of Michigan. I&apos;m interested in genetics, human
              consciousness, and the future of healthcare.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#work" onClick={(event) => scrollToSection(event, "work")}>
                Enter selected work <ArrowDown size={15} />
              </a>
              <a href="/Maya-Gerdes-Resume.pdf" target="_blank" rel="noreferrer">
                Resume <ArrowUpRight size={15} />
              </a>
              <a href="/me">
                Personal index <ArrowUpRight size={15} />
              </a>
            </div>
            <div className="hero-socials" aria-label="Maya Gerdes profiles">
              <IconLink href={links.linkedin} label="LinkedIn" icon={Linkedin} size={19} />
              <IconLink href={links.github} label="GitHub" icon={Github} size={19} />
              <IconLink href={links.x} label="X / Twitter" icon={X} size={19} />
              <IconLink href={links.email} label="Email Maya" icon={Mail} size={19} />
            </div>
          </motion.div>

          <motion.div className="hero-visual" variants={heroItem}>
            <PortraitFigure />
            <div className="hero-visual-readout" aria-hidden="true">
              <span>MG / 2026</span>
              <span>NEURO + SYSTEMS</span>
              <span>42.2808 N</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-notes"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.62, delay: reduceMotion ? 0 : 0.56, ease: EASE }}
        >
          <div><span>01 / Current</span><strong>Building Praxigen</strong></div>
          <div><span>02 / Study</span><strong>Neuroscience + business</strong></div>
          <div><span>03 / Signal</span><strong>Genetics + consciousness</strong></div>
          <a href={projectLinks.buildAndPitch} target="_blank" rel="noreferrer">
            <span>04 / Recent</span><strong>Build & Pitch winner</strong><ArrowUpRight size={14} />
          </a>
        </motion.div>
      </header>

      <ProjectRail />

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
  const reduceMotion = useReducedMotion();

  return (
    <main>
      <SiteNav page="personal" />
      <header className="personal-hero">
        <motion.div
          className="personal-hero-layout"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.62, ease: EASE }}
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
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <SmoothScroll />
      <motion.div className="scroll-progress" style={{ scaleX: reduceMotion ? scrollYProgress : progress }} aria-hidden="true" />
      {normalizedPath === "/me" ? <PersonalPage /> : <PortfolioHome />}
    </>
  );
}

export default App;
