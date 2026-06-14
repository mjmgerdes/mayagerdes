import {
  Activity,
  ArrowLeft,
  BadgeCheck,
  Brain,
  BriefcaseBusiness,
  ExternalLink,
  Github,
  GraduationCap,
  HeartPulse,
  Linkedin,
  Mail,
  Music,
  X,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState, type ReactNode } from "react";

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
  name: string;
  label: string;
  href: string;
  body: string;
  tags: string[];
  cta: string;
  repo?: string;
  preview?: "crm" | "grndwork";
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
};

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
      "Lead client-facing blockchain strategy work for SMBs, translating infrastructure tradeoffs into product and GTM recommendations.",
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
    logo: {
      alt: "Music",
      text: "MUS",
    },
    title: "Music",
    org: "Guitar, piano, DJing, and playlist curation",
    date: "Ongoing",
    summary:
      "Guitar, piano, DJing, and playlists that tend to follow me through work sessions.",
    tags: ["Music", "Taste", "Rituals"],
  },
  {
    category: "Other",
    logo: {
      alt: "Pickleball",
      text: "PB",
    },
    title: "Pickleball",
    org: "Recreation, competition, and movement",
    date: "Now",
    summary:
      "A favorite way to move, compete, reset, and get immediate feedback outside the laptop.",
    tags: ["Pickleball", "Movement", "Energy"],
  },
];

const projects: Project[] = [
  {
    name: "Startup CRM",
    label: "Operator tool",
    href: projectLinks.startupCrm,
    body:
      "A lightweight CRM for a startup league team. It keeps Google Sheets as the source of truth, then adds a cleaner login and operating layer on top.",
    tags: ["CRM", "Google Sheets", "Ops"],
    cta: "Open CRM",
    preview: "crm",
  },
  {
    name: "grndwork",
    label: "Career platform",
    href: projectLinks.grndworkLive,
    repo: projectLinks.grndworkRepo,
    body:
      "A public early-access product for students trying to turn broad interests into a clearer career path, roles to track, and outreach to manage.",
    tags: ["React", "Product", "Waitlist"],
    cta: "View site",
    preview: "grndwork",
  },
  {
    name: "ForeverData",
    label: "GTM support",
    href: projectLinks.foreverData,
    body:
      "Go-to-market support for a data persistence product in storage and Web3 infrastructure.",
    tags: ["GTM", "Data", "Storage"],
    cta: "View site",
  },
];

const praxigenScreens: PraxigenScreen[] = [
  {
    title: "Case queue",
    body: "A shared workspace for submitted, urgent, overdue, and denied authorizations.",
    image: "/praxigen/workspace.webp",
    alt: "Praxigen case queue showing prior authorization cases, payer status, due dates, and next actions.",
  },
  {
    title: "PA lookup",
    body: "Search a procedure once and compare payer criteria, required documentation, and next actions.",
    image: "/praxigen/pa-lookup.webp",
    alt: "Praxigen prior authorization lookup showing payer criteria for rotator cuff repair.",
  },
  {
    title: "Note checker",
    body: "Score a clinical note against payer policy and surface documentation gaps before submission.",
    image: "/praxigen/note-checker.webp",
    alt: "Praxigen note checker showing a strong note score and clinical policy checks.",
  },
  {
    title: "Appeal generator",
    body: "Collect case context, payer, plan, procedure, and appeal level before generating a letter.",
    image: "/praxigen/appeal-generator.webp",
    alt: "Praxigen appeal letter generator form with payer and case type inputs.",
  },
  {
    title: "Appeal letter",
    body: "Produce a formal letter that can be copied or exported to .docx and .pdf.",
    image: "/praxigen/appeal-letter.webp",
    alt: "Praxigen generated appeal letter preview with copy and export controls.",
  },
  {
    title: "Pre-claim check",
    body: "Compare authorization details against claim details before the claim drops.",
    image: "/praxigen/preclaim-check.webp",
    alt: "Praxigen pre-claim check comparing authorized and billed details with blocking issues.",
  },
  {
    title: "Denial intelligence",
    body: "Track usage, common procedures, payer activity, and denial patterns.",
    image: "/praxigen/denial-insights.webp",
    alt: "Praxigen denial intelligence dashboard with metrics and procedure activity.",
  },
];

const personalCards: PersonalCard[] = [
  {
    icon: Music,
    title: "Music",
    body:
      "Guitar, piano, DJing, and playlists. It is the least forced part of my personality.",
  },
  {
    icon: Brain,
    title: "Neuroscience",
    body:
      "Brains, behavior change, cognition, and why people get stuck or change.",
  },
  {
    icon: Activity,
    title: "Pickleball",
    body:
      "Fast feedback, friendly competition, and a very satisfying reset button.",
  },
  {
    icon: HeartPulse,
    title: "Biohacking",
    body:
      "Sleep, training, food, and small habits that are either useful or nonsense. I like figuring out which.",
  },
];

const backgroundItems = [
  {
    icon: GraduationCap,
    title: "University of Michigan",
    body:
      "B.S. in Neuroscience, Entrepreneurship minor, Honors Program. Expected May 2028.",
  },
  {
    icon: BadgeCheck,
    title: "Academic recognition",
    body:
      "William J. Branstrom Award, James B. Angell Scholar, Phi Kappa Phi, and neuroscience honors recognition.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Current through-line",
    body:
      "Research detail, clinical workflow exposure, product taste, and go-to-market work.",
  },
];

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
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] }}
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
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      <Icon size={17} strokeWidth={1.9} />
    </motion.a>
  );
}

function SiteNav({ page = "home" }: { page?: "home" | "personal" }) {
  const isPersonal = page === "personal";

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <a
        className="brand"
        href={isPersonal ? "/" : "#top"}
        aria-label="Maya Gerdes home"
      >
        <span>MG</span>
        Maya Gerdes
      </a>
      <div className="nav-links">
        <a href={isPersonal ? "/#projects" : "#projects"}>Projects</a>
        <a href={isPersonal ? "/#experience" : "#experience"}>Experience</a>
        <a href="/me">Personal</a>
        <a href={isPersonal ? "/#contact" : "#contact"}>Contact</a>
      </div>
    </nav>
  );
}

function SectionHeader({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="section-header">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {body ? <span>{body}</span> : null}
    </div>
  );
}

function LogoMark({ logo }: { logo: ExperienceItem["logo"] }) {
  return (
    <div className="logo-mark" aria-label={logo.alt}>
      {logo.image ? <img src={logo.image} alt="" loading="lazy" /> : <span>{logo.text}</span>}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      className="project-card"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 360, damping: 30 }}
    >
      <div className="card-topline">
        <span>{project.label}</span>
        <ExternalLink size={16} />
      </div>
      {project.preview ? <ProjectPreview kind={project.preview} /> : null}
      <h3>{project.name}</h3>
      <p>{project.body}</p>
      <div className="tag-row">
        {project.tags.map((tag) => (
          <em key={tag}>{tag}</em>
        ))}
      </div>
      <div className="project-actions">
        <a href={project.href} target="_blank" rel="noreferrer">
          {project.cta}
        </a>
        {project.repo ? (
          <a href={project.repo} target="_blank" rel="noreferrer">
            Repo
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}

function ProjectPreview({ kind }: { kind: "crm" | "grndwork" }) {
  if (kind === "crm") {
    return (
      <div className="mini-preview mini-preview-crm" aria-hidden="true">
        <div className="mini-preview-line">
          <span>UStart League</span>
          <em>Season 04</em>
        </div>
        <strong>Team workspace</strong>
        <p>Sheets source of truth, cleaner operating layer.</p>
        <div className="google-button">Continue with Google</div>
        <div className="validation-chip">// Validation Engine</div>
      </div>
    );
  }

  return (
    <div className="mini-preview mini-preview-grndwork" aria-hidden="true">
      <div className="mini-preview-line">
        <span>grndwork</span>
        <em>Early access</em>
      </div>
      <strong>Discover your path.</strong>
      <div className="mini-metrics">
        <span>
          <small>Interests</small>
          Product + Design
        </span>
        <span>
          <small>Match</small>
          92%
        </span>
        <span>
          <small>Open</small>
          48
        </span>
      </div>
      <div className="role-line">Associate PM - tracked</div>
    </div>
  );
}

function PraxigenPreview() {
  const [featured, ...supporting] = praxigenScreens;

  return (
    <motion.div
      className="product-preview product-preview-real"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="product-shot-main">
        <img src={featured.image} alt={featured.alt} />
        <div>
          <span>Actual Praxigen interface</span>
          <strong>{featured.title}</strong>
          <p>{featured.body}</p>
        </div>
      </div>

      <div className="product-shot-grid" aria-label="Praxigen product screens">
        {supporting.map((screen) => (
          <article className="product-shot" key={screen.title}>
            <img src={screen.image} alt={screen.alt} />
            <div>
              <strong>{screen.title}</strong>
              <p>{screen.body}</p>
            </div>
          </article>
        ))}
      </div>
    </motion.div>
  );
}

function PortfolioHome() {
  const [activeExperienceTab, setActiveExperienceTab] =
    useState<ExperienceCategory>("Work");

  const activeExperiences = useMemo(
    () =>
      experiences.filter(
        (experience) => experience.category === activeExperienceTab,
      ),
    [activeExperienceTab],
  );

  return (
    <main>
      <SiteNav />

      <header className="hero" id="top">
        <div className="hero-copy">
          <Reveal>
            <p className="eyebrow">University of Michigan · Praxigen</p>
            <h1>Maya Gerdes</h1>
            <p className="hero-subtitle">
              Neuroscience student building healthcare workflow software.
            </p>
            <p>
              I am at the University of Michigan studying neuroscience and
              building Praxigen, a prior authorization product for healthcare
              teams. My background crosses clinical research, product, and
              go-to-market work.
            </p>
            <div className="hero-actions">
              <a className="button primary" href={links.email}>
                <Mail size={17} />
                Email me
              </a>
              <a className="button secondary" href="#projects">
                Selected work
              </a>
            </div>
            <div className="social-strip" aria-label="External profiles">
              <IconLink href={links.linkedin} label="LinkedIn" icon={Linkedin} />
              <IconLink href={links.github} label="GitHub" icon={Github} />
              <IconLink href={links.x} label="X / Twitter" icon={X} />
            </div>
          </Reveal>
        </div>

        <Reveal className="hero-card" delay={0.08}>
          <div className="now-card">
            <span>Current build</span>
            <h2>Praxigen</h2>
            <p>
              Prior authorization is still too much searching, copying, and
              waiting. I am working on the system I wish existed inside that
              workflow.
            </p>
            <div className="signal-list">
              <div>
                <small>Workflow</small>
                <strong>Prior authorization</strong>
              </div>
              <div>
                <small>Wedge</small>
                <strong>Payer policy + note gaps</strong>
              </div>
              <div>
                <small>Buyer context</small>
                <strong>Practices losing time to denials</strong>
              </div>
            </div>
          </div>
        </Reveal>
      </header>

      <section className="section projects-section" id="projects">
        <Reveal>
          <SectionHeader
            eyebrow="Selected work"
            title="A few things with a real user and workflow behind them."
            body="Less project museum, more evidence of how I think: find the messy workflow, understand the user, then build the smallest useful surface."
          />
        </Reveal>

        <div className="featured-project">
          <Reveal className="featured-copy">
            <span className="kicker">Main project</span>
            <h3>Praxigen</h3>
            <p>
              A prior authorization workspace for healthcare teams. It brings
              payer requirement lookup, note checking, appeal drafting,
              pre-claim mismatch checks, denial intelligence, and case tracking
              into one operating surface.
            </p>
            <div className="tag-row">
              <em>Healthtech</em>
              <em>Prior authorization</em>
              <em>Policy-grounded workflows</em>
              <em>Clinical ops</em>
            </div>
            <a className="button primary" href={projectLinks.praxigen} target="_blank" rel="noreferrer">
              <ExternalLink size={17} />
              View Praxigen
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <PraxigenPreview />
          </Reveal>
        </div>

        <Reveal className="project-grid">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.name} />
          ))}
        </Reveal>
      </section>

      <section className="section experience-section" id="experience">
        <Reveal>
          <div className="experience-heading">
            <SectionHeader
              eyebrow="Experience"
              title="Research, clinical exposure, and operator work."
              body="I like domains where technical detail and human workflow are tangled together."
            />
            <div className="experience-tabs" aria-label="Experience filters">
              {experienceTabs.map((tab) => (
                <button
                  className={tab === activeExperienceTab ? "active" : ""}
                  type="button"
                  key={tab}
                  onClick={() => setActiveExperienceTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <motion.div className="experience-list" layout>
          {activeExperiences.map((experience) => (
            <motion.article
              className="experience-item"
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              key={`${experience.org}-${experience.title}`}
            >
              <LogoMark logo={experience.logo} />
              <div className="experience-body">
                <div className="experience-title-row">
                  <div>
                    <h3>{experience.title}</h3>
                    <p>{experience.org}</p>
                  </div>
                  <time>{experience.date}</time>
                </div>
                <p className="experience-summary">{experience.summary}</p>
                <div className="tag-row compact">
                  {experience.tags.map((tag) => (
                    <em key={tag}>{tag}</em>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="section background-section">
        <Reveal>
          <SectionHeader
            eyebrow="Background"
            title="Why this direction makes sense."
            body="The resume version is straightforward: neuroscience, research, clinical exposure, consulting, and product work. The personal version is that I keep coming back to systems where small delays and confusing handoffs make people's lives worse."
          />
        </Reveal>

        <div className="background-grid">
          {backgroundItems.map((item) => {
            const Icon = item.icon;

            return (
              <Reveal className="background-card" key={item.title}>
                <Icon size={20} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section personal-note">
        <Reveal className="personal-note-copy">
          <p className="eyebrow">Personal note</p>
          <h2>Music, pickleball, biohacking, and a real interest in how people change.</h2>
          <p>
            Outside of work, I am usually somewhere between guitar, piano,
            DJing, pickleball, and obsessing over sleep/training/nutrition
            experiments. It is not a separate personality from the work; it is
            the same curiosity about attention, behavior, and feedback loops.
          </p>
          <a className="button secondary" href="/me">
            Read the personal page
          </a>
        </Reveal>
      </section>

      <section className="contact-section" id="contact">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2>Best reached by email.</h2>
          <p>
            For Praxigen, healthcare workflow questions, grants, accelerators,
            or research-product conversations.
          </p>
          <div className="contact-actions">
            <a className="button primary" href={links.email}>
              <Mail size={17} />
              mjgerdes@umich.edu
            </a>
            <a className="button secondary" href={links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="button secondary" href={links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

function PersonalPage() {
  return (
    <main>
      <SiteNav page="personal" />
      <header className="personal-hero">
        <Reveal>
          <a className="back-link" href="/">
            <ArrowLeft size={16} />
            Back to main page
          </a>
          <p className="eyebrow">Outside the resume</p>
          <h1>A few things that shape how I think.</h1>
          <p>
            I wanted one place for the parts that do not belong in a grant
            answer or resume bullet but do explain me a little better.
          </p>
        </Reveal>
      </header>

      <section className="section">
        <Reveal>
          <SectionHeader
            eyebrow="Personal"
            title="Music, movement, brains, and small experiments."
            body="Different surfaces, same question: how do people feel, learn, perform, and change?"
          />
        </Reveal>

        <div className="personal-grid">
          {personalCards.map((card) => {
            const Icon = card.icon;

            return (
              <Reveal className="personal-card" key={card.title}>
                <Icon size={21} />
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </Reveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function App() {
  const normalizedPath =
    typeof window === "undefined"
      ? "/"
      : window.location.pathname.replace(/\/$/, "") || "/";

  if (normalizedPath === "/me") {
    return <PersonalPage />;
  }

  return <PortfolioHome />;
}

export default App;
