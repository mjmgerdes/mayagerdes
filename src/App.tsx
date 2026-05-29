import {
  Activity,
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  Code2,
  Disc3,
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
import { useEffect, useMemo, useState } from "react";

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
  logo: string;
  title: string;
  org: string;
  date: string;
  summary: string;
  tags: string[];
  href?: string;
};

type Project = {
  name: string;
  tag: string;
  body: string;
  stack: string;
  href: string;
  updatedAt?: string;
};

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  updated_at: string;
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

type PlaylistSlot = {
  title: string;
  note: string;
  href: string;
  tone: "blue" | "aqua" | "navy" | "coral";
};

const praxigenSignals = [
  { label: "Clinical Note", value: "3 missing criteria found" },
  { label: "Payer Rule", value: "UHC / CPT 27447" },
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
      "A team workspace layer for startup league operators, turning a Google Sheet into a cleaner login, validation, and relationship-tracking surface.",
    stack: ["CRM", "Google Sheets", "Team workspace"],
    href: projectLinks.startupCrm,
    cta: "Open CRM",
    preview: "crm",
  },
  {
    name: "grndwork",
    tag: "Student career platform",
    body:
      "A live early-access app helping students move from vague ambition to career direction, internship tracking, and outreach systems.",
    stack: ["React", "FastAPI", "Waitlist"],
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
      "Helped shape go-to-market thinking for a data persistence product at the edge of storage and Web3 infrastructure.",
    stack: ["GTM", "Data", "Infrastructure"],
    href: projectLinks.foreverData,
  },
];

const grndworkMetrics = [
  { label: "Interests", value: "Product + Design" },
  { label: "Match score", value: "92%" },
  { label: "Opportunities", value: "48 open" },
];

const grndworkRoles = [
  ["Associate PM", "Stripe", "Remote"],
  ["Product Design Intern", "Linear", "NYC"],
  ["SWE Intern", "Anthropic", "SF"],
];

const focusAreas = [
  "Healthtech",
  "Biohacking",
  "Human-computer interaction",
  "Cognitive science",
  "Behavior design",
];

const experienceTabs: ExperienceCategory[] = ["Work", "Clubs", "Other"];

const experiences: ExperienceItem[] = [
  {
    category: "Work",
    logo: "MBC",
    title: "Project Manager / Business Analyst",
    org: "Michigan Blockchain Consulting",
    date: "Aug 2025 - Present",
    summary:
      "Lead client-facing blockchain strategy work for SMBs, translating technical infrastructure, storage, L2, rollup, and middleware choices into GTM and product recommendations.",
    tags: ["Blockchain", "GTM", "Client strategy", "Product"],
  },
  {
    category: "Work",
    logo: "DNA",
    title: "Research Assistant",
    org: "Michigan Medicine, Department of Human Genetics",
    date: "Aug 2025 - Present",
    summary:
      "Research CRISPR-based sensing systems for cancer-specific genomic alterations, with hands-on construct design, SnapGene analysis, and wet-lab troubleshooting.",
    tags: ["CRISPR", "Genetics", "Cancer sensing", "Wet lab"],
  },
  {
    category: "Work",
    logo: "MM",
    title: "Research Assistant",
    org: "Michigan Medicine + College of Engineering",
    date: "Nov 2024 - Sep 2025",
    summary:
      "Worked across computational biomechanics, cardiovascular imaging, and clinical datasets to support patient outcome and translational research workflows.",
    tags: ["Biomechanics", "Clinical data", "Imaging", "Cardiac"],
  },
  {
    category: "Work",
    logo: "NP",
    title: "Neuropsychiatry Intern",
    org: "Private neuropsychiatry and forensic neurology practice",
    date: "May 2025 - Aug 2025",
    summary:
      "Supported clinical workflows across neuropsychiatry and forensic neurology, building context around patient cases, diagnostics, and care coordination.",
    tags: ["Neuropsychiatry", "Clinical workflows", "Patient context"],
  },
  {
    category: "Clubs",
    logo: "CSA",
    title: "President and Founding Campus Lead",
    org: "Cancer Screening Advocates",
    date: "Nov 2025 - Present",
    summary:
      "Founded the University of Michigan chapter and built early programming around cancer screening awareness, campus partnerships, and health advocacy.",
    tags: ["Health advocacy", "Chapter building", "Partnerships"],
  },
  {
    category: "Clubs",
    logo: "PSE",
    title: "DEI Director and Council Member",
    org: "Pi Sigma Epsilon",
    date: "Sep 2024 - Present",
    summary:
      "Helped organize professional programming, recruiting, and member-facing systems for a large business and professional development community.",
    tags: ["Professional development", "Programming", "Leadership"],
  },
  {
    category: "Clubs",
    logo: "PDE",
    title: "Marketing and Public Relations Chair",
    org: "Phi Delta Epsilon",
    date: "Nov 2024 - Present",
    summary:
      "Create member communications, event visibility, and brand systems for a pre-medical community with a strong service and mentorship culture.",
    tags: ["Marketing", "Community", "Events"],
  },
  {
    category: "Other",
    logo: "MUS",
    title: "Music and performance loops",
    org: "Guitar, piano, DJing, and playlist curation",
    date: "Ongoing",
    summary:
      "Music is one of the places where taste, repetition, emotional patterning, and attention all become visible.",
    tags: ["Music", "Taste", "Rituals"],
  },
  {
    category: "Other",
    logo: "PB",
    title: "Pickleball and fast feedback",
    org: "Recreation, competition, and movement",
    date: "Now",
    summary:
      "A favorite low-friction way to move, compete, reset, and get immediate feedback outside the laptop.",
    tags: ["Pickleball", "Movement", "Energy"],
  },
];

const projectOverrides: Record<string, Omit<Project, "href">> = {
  grndwork: {
    name: "grndwork",
    tag: "Startup build log",
    body:
      "Public repo connected to current founder work and product experimentation.",
    stack: "JavaScript, Python, HTML, CSS",
  },
  luma_clone_project_googleAI: {
    name: "luma_clone_project_googleAI",
    tag: "AI app prototype",
    body:
      "Google AI Studio app exploration with TypeScript and Supabase-style architecture patterns.",
    stack: "TypeScript",
  },
  bjmartin: {
    name: "bjmartin",
    tag: "Portfolio implementation",
    body:
      "A full-stack-style portfolio build for a public-facing personal brand.",
    stack: "HTML, CSS, JavaScript",
  },
  ustartleague: {
    name: "ustartleague",
    tag: "Community concept",
    body:
      "Early-stage public repo for student entrepreneurship and community experimentation.",
    stack: "Public GitHub repo",
  },
};

const fallbackProjects: Project[] = Object.entries(projectOverrides).map(
  ([repoName, project]) => ({
    ...project,
    href: `https://github.com/mjmgerdes/${repoName}`,
  }),
);

const timeline: TimelineItem[] = [
  {
    icon: GraduationCap,
    label: "University of Michigan",
    detail:
      "B.S. in Neuroscience, Entrepreneurship minor, Honors Program, expected May 2028.",
  },
  {
    icon: BadgeCheck,
    label: "Academic signal",
    detail:
      "William J. Branstrom Award, James B. Angell Scholar, Phi Kappa Phi, and neuroscience honors recognition.",
  },
  {
    icon: HeartPulse,
    label: "Clinical and research exposure",
    detail:
      "Neuropsychiatry, human genetics, cardiac surgery, computational biomechanics, and patient-outcome datasets.",
  },
];

const dossierPoints = [
  {
    icon: Zap,
    text: "Fast translation from research context to product or GTM thinking.",
  },
  {
    icon: Brain,
    text: "Comfortable operating between biology, behavior, data, and interface design.",
  },
  {
    icon: BriefcaseBusiness,
    text: "Grounded in real clinical, lab, client, and operator environments.",
  },
];

const memoryCards: MemoryCard[] = [
  {
    id: "guitar",
    title: "Tiny guitar era",
    year: "Age 5",
    body:
      "The first version of the music loop: small hands, serious focus, and a lifelong obsession with sound starting to form.",
    tone: "blue",
    icon: Music,
  },
  {
    id: "pickleball",
    title: "Pickleball mode",
    year: "Now",
    body:
      "Fast rallies, quick decisions, and the sport I can talk almost anyone into trying after one game.",
    tone: "aqua",
    icon: Activity,
  },
  {
    id: "brain",
    title: "Neuroscience thread",
    year: "Michigan",
    body:
      "The question under a lot of my work: what makes people heal, adapt, perform, and change?",
    tone: "navy",
    icon: Brain,
  },
  {
    id: "builder",
    title: "Builder season",
    year: "2026",
    body:
      "Messy prototypes, sharper questions, and learning how to turn conviction into shipped work.",
    tone: "coral",
    icon: Rocket,
  },
];

const passions: Passion[] = [
  {
    icon: Music,
    title: "Music",
    body:
      "Guitar, piano, DJing, and playlist-making as another way of thinking about taste and timing.",
  },
  {
    icon: Brain,
    title: "Neuroscience",
    body:
      "Brains, behavior change, cognition, and what makes people feel more awake in their own lives.",
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
      "Sleep, nutrition, training, and tiny rituals that compound into better days.",
  },
];

const playlistSlots: PlaylistSlot[] = [
  {
    title: "Current rotation",
    note: "The songs getting replayed while I build.",
    href: "https://open.spotify.com/",
    tone: "blue",
  },
  {
    title: "Piano / guitar brain",
    note: "For when I want sound to feel tactile.",
    href: "https://open.spotify.com/",
    tone: "aqua",
  },
  {
    title: "Founder focus",
    note: "A work mode playlist slot for deep build sessions.",
    href: "https://open.spotify.com/",
    tone: "navy",
  },
  {
    title: "Long walk songs",
    note: "Music for processing ideas before they become plans.",
    href: "https://open.spotify.com/",
    tone: "coral",
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
}: {
  href: string;
  label: string;
  icon: LucideIcon;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
      <Icon size={18} strokeWidth={1.9} />
      <span>{label}</span>
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

function formatRepoDate(value?: string) {
  if (!value) {
    return "Live GitHub repo";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
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
  const [liveProjects, setLiveProjects] = useState<Project[]>(fallbackProjects);
  const [activeExperienceTab, setActiveExperienceTab] =
    useState<ExperienceCategory>("Work");

  useEffect(() => {
    const controller = new AbortController();

    async function loadRepos() {
      try {
        const response = await fetch(
          "https://api.github.com/users/mjmgerdes/repos?sort=updated&per_page=8",
          { signal: controller.signal },
        );

        if (!response.ok) {
          return;
        }

        const repos = (await response.json()) as GitHubRepo[];
        const projects = repos
          .filter((repo) => !repo.name.includes("mayagerdes"))
          .slice(0, 6)
          .map((repo) => {
            const override = projectOverrides[repo.name];

            return {
              name: repo.name,
              tag: override?.tag ?? "Public GitHub repo",
              body:
                override?.body ??
                repo.description ??
                "A public build or experiment from the current portfolio of work.",
              stack: override?.stack ?? repo.language ?? "GitHub repository",
              href: repo.html_url,
              updatedAt: repo.updated_at,
            };
          });

        if (projects.length > 0) {
          setLiveProjects(projects);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.warn("GitHub repo sync failed", error);
        }
      }
    }

    loadRepos();

    return () => controller.abort();
  }, []);

  const githubUpdatedLabel = useMemo(() => {
    const sortedUpdates = liveProjects
      .map((project) => project.updatedAt)
      .filter(Boolean)
      .sort();
    const newest = sortedUpdates[sortedUpdates.length - 1];

    return newest
      ? `Live GitHub sync, newest update ${formatRepoDate(newest)}`
      : "Live GitHub sync";
  }, [liveProjects]);

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
          <p className="eyebrow">Founder in progress / neuroscience / frontier tech</p>
          <h1>Maya Gerdes</h1>
          <p className="hero-copy">
            I am building at the edge of health, cognition, and software:
            part researcher, part operator, part product obsessive. My work
            spans CRISPR sensing systems, clinical datasets, blockchain GTM,
            and the early founder muscle of turning ambiguous ideas into
            credible motion.
          </p>
          <div className="hero-actions" aria-label="Contact and profile links">
            <a className="button primary" href={links.email}>
              <Mail size={18} />
              Start a conversation
            </a>
            <a className="button secondary" href="#projects">
              <Sparkles size={18} />
              View the signal
            </a>
          </div>
          <div className="social-strip" aria-label="External profiles">
            <IconLink href={links.linkedin} label="LinkedIn" icon={Linkedin} />
            <IconLink href={links.github} label="GitHub" icon={Github} />
            <IconLink href={links.x} label="X / Twitter" icon={X} />
          </div>
        </div>
      </header>

      <section className="featured-projects" id="projects" aria-label="Featured projects">
        <div className="featured-projects-inner">
          <div className="featured-projects-heading">
            <p className="eyebrow dark">Projects</p>
            <h2>Current proof of build, taste, and distribution muscle.</h2>
          </div>
          <article className="project-spotlight">
            <div className="spotlight-copy">
              <span className="spotlight-kicker">Featured build</span>
              <h3>Praxigen</h3>
              <p>
                AI prior authorization infrastructure for giving agents clean,
                structured access to payer requirements, forms, and submission
                criteria. This is the founder build: healthcare workflow pain,
                clinical nuance, and a clear wedge into a paperwork-heavy
                system.
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
              <div className="spotlight-interface-header">
                <span>Product Demo</span>
                <strong>One workflow. Every payer step.</strong>
                <p>Praxigen reads the note, checks payer rules, strengthens documentation, and tracks the case.</p>
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
            </div>
          </article>

          <div className="honorable-heading">
            <span>Honorable mentions</span>
            <p>Smaller interface snapshots from adjacent builds that show range.</p>
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
                      <div className="mini-interface-header">
                        <span>UStart League / Season 04</span>
                        <strong>Sign in to your team workspace.</strong>
                        <p>Google Sheets stays the source of truth. The CRM makes it usable.</p>
                      </div>
                      <div className="mini-login-button">Continue with Google</div>
                      <div className="mini-quote">
                        <span>// Validation Engine</span>
                        <p>"If you can give me back two hours every morning, take my money."</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mini-interface-header">
                        <span>grndwork</span>
                        <strong>Discover your path. Land your future.</strong>
                        <p>Career clarity, internships, tracking, and outreach guidance.</p>
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
          <p className="eyebrow dark">Current thesis</p>
          <h2>Useful health products need scientific taste and founder urgency.</h2>
        </div>
        <div className="thesis-body">
          <p>
            I am especially interested in products that help people understand,
            tune, and extend their own performance without losing scientific
            rigor. That shows up in my work through healthtech, biohacking,
            cognitive science, HCI, and the small daily rituals that turn a
            product into behavior.
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
            title="Research depth, operator range, and early builder velocity."
            body="The through-line is translating complexity into useful systems, whether the system is biological, technical, commercial, or social."
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
              <div className="experience-logo" aria-hidden="true">
                {experience.logo}
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
            eyebrow="Founder dossier"
            title="Built for grant reviewers, accelerators, and collaborators."
            body="A tighter public surface than a resume: enough context to evaluate direction, credibility, and momentum."
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
        <aside className="profile-panel" aria-label="Education and signal">
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

      <section className="section builds-section" id="builds">
        <SectionHeading
          eyebrow="Builds"
          title="Public GitHub work and product experiments."
          body="A few visible artifacts from the current builder phase. This section pulls from public GitHub data when the page loads, then layers in curated context for the most relevant work."
        />
        <div className="sync-pill" aria-label={githubUpdatedLabel}>
          <Github size={16} />
          {githubUpdatedLabel}
        </div>
        <div className="project-grid">
          {liveProjects.map((project) => (
            <a
              className="project-card"
              href={project.href}
              target="_blank"
              rel="noreferrer"
              key={project.name}
            >
              <div>
                <Code2 size={22} />
                <ExternalLink size={17} />
              </div>
              <p>{project.tag}</p>
              <h3>{project.name}</h3>
              <span>{project.body}</span>
              <strong>
                {project.stack}
                <small>{formatRepoDate(project.updatedAt)}</small>
              </strong>
            </a>
          ))}
        </div>
      </section>

      <section className="section personal-bridge">
        <div className="personal-bridge-copy">
          <p className="eyebrow dark">Beyond the resume</p>
          <h2>Music, neuroscience, pickleball, and the loops behind the work.</h2>
          <p>
            The founder page should still feel like a whole person made it.
            This is the lighter side of the site: what I listen to, what I am
            curious about, and the non-resume threads that shape my taste.
          </p>
          <a className="button blue" href="/me">
            <Sparkles size={18} />
            Explore the personal page
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

      <section className="section memory-section" id="snapshots">
        <SectionHeading
          eyebrow="Snapshots"
          title="A few cards with personality, ready for real photos."
          body="Tap a card to flip it. The exact pictures and years can be swapped in when you have the files, but the interaction and layout are already here."
        />
        <MemoryGallery compact />
      </section>

      <section className="contact-section" id="contact">
        <p className="eyebrow">Open loop</p>
        <h2>For grants, accelerators, research-product collaborations, and strange good ideas.</h2>
        <p>
          The fastest path is email. For public work and ongoing signal, use
          LinkedIn, GitHub, or X.
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
          <p className="eyebrow">Maya / outside the resume</p>
          <h1>Music, brains, movement, and better loops.</h1>
          <p>
            This page is for the things that make the work sharper: music,
            neuroscience, pickleball, biohacking, and the little rituals that
            turn curiosity into taste.
          </p>
        </div>
      </header>

      <section className="section passion-section">
        <SectionHeading
          eyebrow="Passions"
          title="The patterns I keep coming back to."
          body="Different surfaces, same underlying obsession: how people feel, learn, perform, and change."
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

      <section className="section playlist-section" id="music">
        <div className="playlist-copy">
          <p className="eyebrow dark">Spotify</p>
          <h2>What I have been listening to lately.</h2>
          <p>
            The playlist cards are placed here because the personal page is
            where music can have room without distracting from grants,
            accelerators, and founder signal on the homepage.
          </p>
        </div>
        <div className="playlist-grid">
          {playlistSlots.map((playlist) => (
            <a
              className={`playlist-card tone-${playlist.tone}`}
              href={playlist.href}
              target="_blank"
              rel="noreferrer"
              key={playlist.title}
            >
              <span className="playlist-cover" aria-hidden="true">
                <Disc3 size={36} />
              </span>
              <span>
                <strong>{playlist.title}</strong>
                <em>{playlist.note}</em>
              </span>
              <ExternalLink size={17} />
            </a>
          ))}
        </div>
      </section>

      <section className="section memory-section personal-memory-section" id="memories">
        <SectionHeading
          eyebrow="Photo notes"
          title="Clickable cards for the pictures that explain the person."
          body="These are structured for guitar-at-five, pickleball, music, and founder-life moments. Once the photos are added, each front can become the actual image."
        />
        <MemoryGallery />
      </section>

      <section className="contact-section personal-contact">
        <p className="eyebrow">Back to the work</p>
        <h2>Founder signal on the main page, human context here.</h2>
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
