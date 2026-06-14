import {
  Activity,
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  ExternalLink,
  Github,
  GraduationCap,
  HeartPulse,
  Linkedin,
  Mail,
  Music,
  Rocket,
  Sparkles,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";

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

type FeaturedProject = {
  name: string;
  tag: string;
  body: string;
  stack: string[];
  href: string;
};

type HonorableMention = FeaturedProject & {
  cta: string;
  preview: "crm" | "grndwork";
  repo?: string;
};

type ExperienceCategory = "Work" | "Clubs" | "Other";

type ExperienceItem = {
  category: ExperienceCategory;
  logo: {
    alt: string;
    image?: string;
    text: string;
    variant: string;
  };
  title: string;
  org: string;
  date: string;
  summary: string;
  tags: string[];
  href?: string;
};

type TimelineItem = {
  icon: LucideIcon;
  label: string;
  detail: string;
};

type MemoryCard = {
  id: string;
  title: string;
  year: string;
  body: string;
  tone: "blue" | "aqua" | "navy" | "coral";
  icon: LucideIcon;
};

type Passion = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const praxigenSignals = [
  { label: "Clinical Note", value: "3 missing criteria found" },
  { label: "Payer Rule", value: "UHC · CPT 27447" },
  { label: "Follow Up", value: "Adjuster due in 3 days" },
  { label: "Status", value: "Ready to submit" },
];

const praxigenSteps = [
  "01 Read note",
  "02 Match requirements",
  "03 Prepare packet",
  "04 Track outcome",
];

const honorableMentions: HonorableMention[] = [
  {
    name: "Startup CRM",
    tag: "Operator tool",
    body:
      "A lightweight CRM for a startup league team. It keeps Google Sheets as the source of truth, then adds a cleaner login and operating layer on top.",
    stack: ["CRM", "Google Sheets", "Ops"],
    href: projectLinks.startupCrm,
    cta: "Open CRM",
    preview: "crm",
  },
  {
    name: "grndwork",
    tag: "Student career platform",
    body:
      "A public early-access career product for students trying to turn broad interests into a clearer path, roles to track, and outreach to manage.",
    stack: ["React", "Product", "Waitlist"],
    href: projectLinks.grndworkLive,
    cta: "View interface",
    preview: "grndwork",
    repo: projectLinks.grndworkRepo,
  },
];

const additionalProjects: FeaturedProject[] = [
  {
    name: "ForeverData",
    tag: "GTM support",
    body:
      "Go-to-market support for a data persistence product in storage and Web3 infrastructure.",
    stack: ["GTM", "Data", "Storage"],
    href: projectLinks.foreverData,
  },
];

const grndworkMetrics = [
  { label: "Interests", value: "Product + Design" },
  { label: "Match score", value: "92%" },
  { label: "Opportunities", value: "48 open" },
];

const grndworkRoles = [
  ["Career direction", "Product + design", "92% match"],
  ["Internship tracker", "Applications", "48 open"],
  ["Outreach queue", "Alumni + founders", "12 drafts"],
];

const focusAreas = [
  "Prior authorization",
  "Clinical workflows",
  "Neuroscience",
  "Human-computer interaction",
  "Go-to-market",
];

const experienceTabs: ExperienceCategory[] = ["Work", "Clubs", "Other"];

const experiences: ExperienceItem[] = [
  {
    category: "Work",
    logo: {
      alt: "Michigan Blockchain Consulting",
      text: "MBC",
      variant: "logo-mbc",
    },
    title: "Project Manager / Business Analyst",
    org: "Michigan Blockchain Consulting",
    date: "Aug 2025 - Present",
    summary:
      "Lead client-facing strategy work for SMBs in blockchain, translating infrastructure tradeoffs into product and GTM recommendations.",
    tags: ["Blockchain", "GTM", "Client work", "Product"],
  },
  {
    category: "Work",
    logo: {
      alt: "Michigan Medicine",
      text: "MM",
      variant: "logo-medicine",
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
      text: "M",
      variant: "logo-michigan",
    },
    title: "Research Assistant",
    org: "Michigan Medicine + College of Engineering",
    date: "Nov 2024 - Sep 2025",
    summary:
      "Worked across computational biomechanics, cardiovascular imaging, and clinical datasets for patient-outcome and translational research.",
    tags: ["Biomechanics", "Clinical data", "Imaging", "Cardiac"],
  },
  {
    category: "Work",
    logo: {
      alt: "Neuropsychiatry and forensic neurology practice",
      text: "NF",
      variant: "logo-neuro",
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
      text: "CSA",
      variant: "logo-csa",
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
      variant: "logo-pse",
    },
    title: "DEI Director and Council Member",
    org: "Pi Sigma Epsilon",
    date: "Sep 2024 - Present",
    summary:
      "Help organize programming, recruiting, and member-facing systems for a business and professional development community.",
    tags: ["Professional development", "Programming", "Leadership"],
  },
  {
    category: "Clubs",
    logo: {
      alt: "Phi Delta Epsilon",
      text: "PhiDE",
      variant: "logo-phide",
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
      variant: "logo-music",
    },
    title: "Music",
    org: "Guitar, piano, DJing, and playlist curation",
    date: "Ongoing",
    summary:
      "Guitar, piano, DJing, and the playlists that tend to follow me through work sessions.",
    tags: ["Music", "Taste", "Rituals"],
  },
  {
    category: "Other",
    logo: {
      alt: "Pickleball",
      text: "PB",
      variant: "logo-pickleball",
    },
    title: "Pickleball and fast feedback",
    org: "Recreation, competition, and movement",
    date: "Now",
    summary:
      "A favorite way to move, compete, reset, and get immediate feedback outside the laptop.",
    tags: ["Pickleball", "Movement", "Energy"],
  },
];

const timeline: TimelineItem[] = [
  {
    icon: GraduationCap,
    label: "University of Michigan",
    detail:
      "B.S. in Neuroscience, Entrepreneurship minor, Honors Program. Expected May 2028.",
  },
  {
    icon: BadgeCheck,
    label: "Academic recognition",
    detail:
      "William J. Branstrom Award, James B. Angell Scholar, Phi Kappa Phi, and neuroscience honors recognition.",
  },
  {
    icon: HeartPulse,
    label: "Clinical and research exposure",
    detail:
      "Human genetics, neuropsychiatry, cardiovascular surgery, computational biomechanics, and patient-outcome datasets.",
  },
];

const dossierPoints = [
  {
    icon: Zap,
    text: "I like messy domains where the buyer, user, and workflow are not the same person.",
  },
  {
    icon: Brain,
    text: "My research background makes me patient with technical detail; building makes me impatient with bad workflows.",
  },
  {
    icon: BriefcaseBusiness,
    text: "The common thread is translating complex systems into something a team can actually use.",
  },
];

const memoryCards: MemoryCard[] = [
  {
    id: "guitar",
    title: "Music",
    year: "Age 5",
    body:
      "I started with guitar and piano, and now music is still one of the fastest ways I understand attention.",
    tone: "blue",
    icon: Music,
  },
  {
    id: "pickleball",
    title: "Pickleball",
    year: "Now",
    body:
      "Fast rallies, quick decisions, and the rare hobby that makes my brain quiet down immediately.",
    tone: "aqua",
    icon: Activity,
  },
  {
    id: "brain",
    title: "Neuroscience",
    year: "Michigan",
    body:
      "The question under a lot of my work: what makes people heal, adapt, perform, and change?",
    tone: "navy",
    icon: Brain,
  },
  {
    id: "builder",
    title: "Building",
    year: "2026",
    body:
      "Prototypes, customer calls, awkward first versions, and the slow conversion of a hunch into something real.",
    tone: "coral",
    icon: Rocket,
  },
];

const passions: Passion[] = [
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
    icon: BookOpen,
    title: "Biohacking",
    body:
      "Sleep, training, food, and small habits that are either useful or nonsense. I like figuring out which.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="section-heading">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      <span>{body}</span>
    </div>
  );
}

function IconLink({
  href,
  label,
  icon: Icon,
  iconOnly = false,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  iconOnly?: boolean;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
      <Icon size={18} strokeWidth={1.9} />
      <span className={iconOnly ? "sr-only" : undefined}>{label}</span>
    </a>
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
        <a href={isPersonal ? "/#work" : "#work"}>Work</a>
        <a href="/me">Me</a>
        <a href={isPersonal ? "/#contact" : "#contact"}>Contact</a>
      </div>
    </nav>
  );
}

function MemoryGallery({ compact = false }: { compact?: boolean }) {
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const cards = compact ? memoryCards.slice(0, 3) : memoryCards;

  return (
    <div className={compact ? "memory-grid memory-grid-compact" : "memory-grid"}>
      {cards.map((card) => {
        const Icon = card.icon;
        const isFlipped = flippedId === card.id;

        return (
          <button
            className={`memory-card tone-${card.tone} ${isFlipped ? "is-flipped" : ""}`}
            key={card.id}
            type="button"
            aria-pressed={isFlipped}
            onClick={() => setFlippedId(isFlipped ? null : card.id)}
          >
            <span className="memory-card-inner">
              <span className="memory-face memory-front">
                <span className="memory-visual" aria-hidden="true" />
                <span className="memory-front-content">
                  <Icon size={23} />
                  <span>{card.year}</span>
                  <strong>{card.title}</strong>
                </span>
              </span>
              <span className="memory-face memory-back">
                <span>{card.year}</span>
                <strong>{card.title}</strong>
                <em>{card.body}</em>
              </span>
            </span>
          </button>
        );
      })}
    </div>
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
        <div className="hero-content">
          <p className="eyebrow">Neuroscience student / healthtech founder</p>
          <h1>Maya Gerdes</h1>
          <p className="hero-copy">
            I am a University of Michigan neuroscience student building
            Praxigen, a prior authorization workflow product for healthcare
            teams. My work sits between clinical research, product, and
            go-to-market.
          </p>
          <div className="hero-actions" aria-label="Contact and profile links">
            <a className="button primary" href={links.email}>
              <Mail size={18} />
              Email me
            </a>
            <a className="button secondary" href="#projects">
              <ExternalLink size={18} />
              Selected work
            </a>
          </div>
          <div className="social-strip" aria-label="External profiles">
            <IconLink href={links.linkedin} label="LinkedIn" icon={Linkedin} iconOnly />
            <IconLink href={links.github} label="GitHub" icon={Github} iconOnly />
            <IconLink href={links.x} label="X / Twitter" icon={X} iconOnly />
          </div>
        </div>
      </header>

      <section className="featured-projects" id="projects" aria-label="Featured projects">
        <div className="featured-projects-inner">
          <div className="featured-projects-heading">
            <p className="eyebrow dark">Selected work</p>
            <h2>Projects with a specific workflow behind them.</h2>
          </div>
          <article className="project-spotlight">
            <div className="spotlight-copy">
              <span className="spotlight-kicker">Main project</span>
              <h3>Praxigen</h3>
              <p>
                Praxigen is a prior authorization workspace for healthcare
                teams. The goal is simple: make payer requirements, clinical
                documentation, forms, and case status easier to find and act on
                before a denial happens.
              </p>
              <div className="tag-row">
                <em>Healthtech</em>
                <em>Prior authorization</em>
                <em>Agent infrastructure</em>
                <em>Payer workflows</em>
              </div>
              <div className="spotlight-actions">
                <a
                  className="button primary"
                  href={projectLinks.praxigen}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink size={18} />
                  View Praxigen
                </a>
              </div>
            </div>
            <div className="spotlight-interface praxigen-interface" aria-label="Praxigen interface preview">
              <div className="spotlight-window-bar" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="praxigen-preview-nav">
                <strong>Praxigen</strong>
                <span>PA Lookup</span>
                <span>Note Checker</span>
                <span>Cases</span>
              </div>
              <div className="spotlight-interface-header">
                <span>Praxigen / workflow</span>
                <strong>Find the rule. Fix the packet. Track the case.</strong>
                <p>Check the payer rule, compare it to the note, prepare the packet, and keep the case moving.</p>
              </div>
              <div className="praxigen-signal-grid">
                {praxigenSignals.map((signal) => (
                  <div key={signal.label}>
                    <span>{signal.label}</span>
                    <strong>{signal.value}</strong>
                  </div>
                ))}
              </div>
              <div className="praxigen-step-list">
                {praxigenSteps.map((step) => (
                  <span key={step}>{step}</span>
                ))}
              </div>
              <div className="praxigen-request-row">
                <span>Toolkit</span>
                <strong>Lookup · document · track · appeal</strong>
              </div>
            </div>
          </article>

          <div className="honorable-heading">
            <span>Other projects</span>
            <p>Smaller builds and GTM work that round out the product story.</p>
          </div>
          <div className="honorable-grid">
            {honorableMentions.map((project) => (
              <article className="honorable-card" key={project.name}>
                <div className="honorable-copy">
                  <span className="project-card-topline">
                    <small>{project.tag}</small>
                    <ExternalLink size={17} />
                  </span>
                  <h3>{project.name}</h3>
                  <p>{project.body}</p>
                  <span className="tag-row">
                    {project.stack.map((tag) => (
                      <em key={tag}>{tag}</em>
                    ))}
                  </span>
                  <div className="honorable-actions">
                    <a
                      className="button primary"
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink size={17} />
                      {project.cta}
                    </a>
                    {project.repo ? (
                      <a
                        className="button secondary"
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Github size={17} />
                        Repo
                      </a>
                    ) : null}
                  </div>
                </div>
                <div className={`mini-interface mini-interface-${project.preview}`}>
                  <div className="spotlight-window-bar" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  {project.preview === "crm" ? (
                    <>
                      <div className="mini-back-link">Back home</div>
                      <div className="mini-interface-header">
                        <span>UStart League / Season 04</span>
                        <strong>Sign in to your team workspace.</strong>
                        <p>Use your Google account. The team's sheet stays the source of truth; the CRM makes it easier to operate.</p>
                      </div>
                      <div className="mini-login-button">Continue with Google</div>
                      <div className="mini-access-note">Sheets and Drive access stay tied to the league workspace.</div>
                      <div className="mini-quote">
                        <span>Validation view</span>
                        <p>Track founders, interviews, notes, and follow-ups without rebuilding the system every week.</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grndwork-mini-nav">
                        <strong><span /> grndwork</strong>
                        <em>Join Early Access</em>
                      </div>
                      <div className="mini-pill">Now in early access</div>
                      <div className="mini-interface-header">
                        <span>grndwork</span>
                        <strong>Discover your path. Land your future.</strong>
                        <p>Helping students go from not knowing what to pursue to landing real opportunities.</p>
                      </div>
                      <div className="grndwork-mini-actions">
                        <span>Join Early Access</span>
                        <span>Learn More</span>
                      </div>
                      <div className="grndwork-metrics">
                        {grndworkMetrics.map((metric) => (
                          <div key={metric.label}>
                            <span>{metric.label}</span>
                            <strong>{metric.value}</strong>
                          </div>
                        ))}
                      </div>
                      <div className="grndwork-role-list">
                        {grndworkRoles.slice(0, 2).map(([role, company, location]) => (
                          <div key={`${role}-${company}`}>
                            <span>
                              <strong>{role}</strong>
                              <em>{company} / {location}</em>
                            </span>
                            <small>Track</small>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="additional-project-grid">
            {additionalProjects.map((project) => (
              <a
                className="featured-project-card"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                key={project.name}
              >
                <span className="project-card-topline">
                  <small>{project.tag}</small>
                  <ExternalLink size={17} />
                </span>
                <h3>{project.name}</h3>
                <p>{project.body}</p>
                <span className="tag-row">
                  {project.stack.map((tag) => (
                    <em key={tag}>{tag}</em>
                  ))}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section thesis-section">
        <div className="thesis-copy">
          <p className="eyebrow dark">Current focus</p>
          <h2>Healthcare software has to respect the workflow it enters.</h2>
        </div>
        <div className="thesis-body">
          <p>
            I am most interested in products where scientific detail, human
            behavior, and operations all matter. That is what drew me toward
            healthtech: the problem is rarely just the model or the interface.
            It is the workflow around it.
          </p>
          <div className="focus-grid" aria-label="Focus areas">
            {focusAreas.map((focus) => (
              <span key={focus}>{focus}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section experience-section" id="work">
        <div className="experience-heading-row">
          <SectionHeading
            eyebrow="Experience"
            title="Research, clinical exposure, and GTM work."
            body="The through-line is translating complicated systems into something a team can understand and use."
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
        <div className="experience-list">
          {activeExperiences.map((experience) => (
            <article className="experience-item" key={`${experience.org}-${experience.title}`}>
              <div className={`experience-logo ${experience.logo.variant}`} aria-label={experience.logo.alt}>
                {experience.logo.image ? (
                  <img src={experience.logo.image} alt="" loading="lazy" />
                ) : (
                  <span>{experience.logo.text}</span>
                )}
              </div>
              <div className="experience-body">
                <div className="experience-title-row">
                  <div>
                    <h3>
                      {experience.title}
                      {experience.href ? <ExternalLink size={15} /> : null}
                    </h3>
                    <p>{experience.org}</p>
                  </div>
                  <time>{experience.date}</time>
                </div>
                <p className="experience-summary">{experience.summary}</p>
                <div className="tag-row">
                  {experience.tags.map((tag) => (
                    <em key={tag}>{tag}</em>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section" id="dossier">
        <div>
          <SectionHeading
            eyebrow="Background"
            title="The context behind the work."
            body="A compact version of the academic, research, and operator context that shapes how I build."
          />
          <div className="dossier-points">
            {dossierPoints.map((point) => {
              const Icon = point.icon;

              return (
                <div key={point.text}>
                  <Icon size={20} />
                  <span>{point.text}</span>
                </div>
              );
            })}
          </div>
        </div>
        <aside className="profile-panel" aria-label="Education and background">
          {timeline.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label}>
                <Icon size={20} />
                <p>{item.label}</p>
                <span>{item.detail}</span>
              </div>
            );
          })}
        </aside>
      </section>

      <section className="section personal-bridge">
        <div className="personal-bridge-copy">
          <p className="eyebrow dark">Outside work</p>
          <h2>Music, pickleball, neuroscience, and a few useful obsessions.</h2>
          <p>
            I wanted one page that is not trying to be a resume. This is where
            the personal threads live.
          </p>
          <a className="button blue" href="/me">
            <Sparkles size={18} />
            About me
          </a>
        </div>
        <div className="personal-bridge-panel" aria-label="Personal interests">
          <span>
            <Music size={17} />
            Piano / guitar / DJing
          </span>
          <span>
            <Brain size={17} />
            Neuroscience
          </span>
          <span>
            <Activity size={17} />
            Pickleball
          </span>
          <span>
            <Rocket size={17} />
            Entrepreneurship
          </span>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <p className="eyebrow">Contact</p>
        <h2>For Praxigen, healthcare workflow questions, grants, accelerators, or research-product conversations.</h2>
        <p>
          Email is best. LinkedIn and GitHub are here too if you want the
          public version of what I am working on.
        </p>
        <div className="contact-actions">
          <a className="button primary" href={links.email}>
            <Mail size={18} />
            mjgerdes@umich.edu
          </a>
          <a className="button secondary" href={links.linkedin} target="_blank" rel="noreferrer">
            <Linkedin size={18} />
            LinkedIn
          </a>
          <a className="button secondary" href={links.github} target="_blank" rel="noreferrer">
            <Github size={18} />
            GitHub
          </a>
          <a className="button secondary" href={links.x} target="_blank" rel="noreferrer">
            <X size={18} />
            X / Twitter
          </a>
        </div>
      </section>
    </main>
  );
}

function PersonalPage() {
  return (
    <main className="personal-page">
      <SiteNav page="personal" />

      <header className="personal-hero">
        <div className="personal-hero-content">
          <a className="back-link" href="/">
            <ArrowLeft size={17} />
            Back to main page
          </a>
          <p className="eyebrow">Outside the resume</p>
          <h1>Music, movement, brains, and habits.</h1>
          <p>
            A less formal page for the parts of me that do not fit neatly into
            a project card: music, neuroscience, pickleball, biohacking, and
            the small routines that make life feel better.
          </p>
        </div>
      </header>

      <section className="section passion-section">
        <SectionHeading
          eyebrow="Passions"
          title="The things I keep coming back to."
          body="Different surfaces, same questions: how people feel, learn, perform, and change."
        />
        <div className="passion-grid">
          {passions.map((passion) => {
            const Icon = passion.icon;

            return (
              <article className="passion-card" key={passion.title}>
                <Icon size={22} />
                <h3>{passion.title}</h3>
                <p>{passion.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section memory-section personal-memory-section" id="memories">
        <SectionHeading
          eyebrow="Notes"
          title="A few non-work threads."
          body="Tap a card if you want the longer version."
        />
        <MemoryGallery />
      </section>

      <section className="contact-section personal-contact">
        <p className="eyebrow">Back to the work</p>
        <h2>The main page has the projects and experience.</h2>
        <div className="contact-actions">
          <a className="button primary" href="/">
            <ArrowLeft size={18} />
            Main portfolio
          </a>
          <a className="button secondary" href={links.x} target="_blank" rel="noreferrer">
            <X size={18} />
            X / Twitter
          </a>
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
