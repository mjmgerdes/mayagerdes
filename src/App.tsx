import {
  Activity,
  BadgeCheck,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  Code2,
  ExternalLink,
  FlaskConical,
  Github,
  GraduationCap,
  HeartPulse,
  Linkedin,
  Mail,
  Music,
  Rocket,
  Sparkles,
  Users,
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

type ProofPoint = {
  value: string;
  label: string;
};

type WorkCard = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
  proof: string;
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

const proofPoints: ProofPoint[] = [
  { value: "4.00", label: "GPA in Neuroscience at Michigan" },
  { value: "4", label: "SMB clients led through blockchain strategy" },
  { value: "50+", label: "clinical neuropsychiatry cases supported" },
  { value: "$15k+", label: "professional programming budget managed" },
];

const focusAreas = [
  "Healthtech",
  "Biohacking",
  "Human-computer interaction",
  "Cognitive science",
  "Music systems",
];

const workCards: WorkCard[] = [
  {
    icon: FlaskConical,
    eyebrow: "Michigan Medicine",
    title: "Programmable DNA sensing and translational research",
    body:
      "Researching CRISPR-based sensing systems for cancer-specific genomic alterations, plus vascular imaging and cardiac surgery datasets across Michigan Medicine and Engineering.",
    proof:
      "Hands-on lab workflows, SnapGene analysis, Epic and Excel datasets, and construct-level troubleshooting.",
  },
  {
    icon: BriefcaseBusiness,
    eyebrow: "Michigan Blockchain Consulting",
    title: "Frontier tech strategy for real clients",
    body:
      "Project-managed blockchain consulting work for SMB clients, translating technical storage infrastructure, L2, rollup, and middleware insights into GTM recommendations.",
    proof:
      "Led client-facing demos, integration strategy, market analysis, scalability review, and cost-structure evaluation.",
  },
  {
    icon: Users,
    eyebrow: "Campus leadership",
    title: "Community-building with operating discipline",
    body:
      "Founded a University of Michigan chapter for Cancer Screening Advocates and led programming across professional and medical fraternities.",
    proof:
      "Built partnerships, hosted speaker events for 120+ members, and organized professional workshops for 160+ members.",
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

const timeline = [
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

function App() {
  const [liveProjects, setLiveProjects] = useState<Project[]>(fallbackProjects);

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
          .filter((repo) => !repo.name.includes("personal portfolio website"))
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

    return newest ? `Live GitHub sync, newest update ${formatRepoDate(newest)}` : "Live GitHub sync";
  }, [liveProjects]);

  return (
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Maya Gerdes home">
          <span>MG</span>
          Maya Gerdes
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#builds">Builds</a>
          <a href="#dossier">Dossier</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

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
            <a className="button secondary" href="#work">
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

      <section className="proof-rail" aria-label="Highlights">
        {proofPoints.map((point) => (
          <div key={point.label}>
            <strong>{point.value}</strong>
            <span>{point.label}</span>
          </div>
        ))}
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

      <section className="section" id="work">
        <SectionHeading
          eyebrow="Work"
          title="Science depth, operator range, and early builder velocity."
          body="The through-line is translating complexity into useful systems, whether the system is biological, technical, commercial, or social."
        />
        <div className="work-grid">
          {workCards.map((card) => {
            const Icon = card.icon;
            return (
              <article className="work-card" key={card.title}>
                <Icon className="card-icon" size={24} />
                <p>{card.eyebrow}</p>
                <h3>{card.title}</h3>
                <span>{card.body}</span>
                <strong>{card.proof}</strong>
              </article>
            );
          })}
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
            <div>
              <Zap size={20} />
              <span>Fast translation from research context to product or GTM thinking.</span>
            </div>
            <div>
              <Brain size={20} />
              <span>Comfortable operating between biology, behavior, data, and interface design.</span>
            </div>
            <div>
              <Activity size={20} />
              <span>Grounded in real clinical and lab environments, not just abstractions.</span>
            </div>
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
          body="A few visible artifacts from the current builder phase. This section pulls from public GitHub data, then layers in curated context for the most relevant work."
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

      <section className="section founder-section">
        <div className="founder-image" aria-hidden="true" />
        <div className="founder-copy">
          <p className="eyebrow dark">Human layer</p>
          <h2>Music, systems, health, and the search for better loops.</h2>
          <p>
            Outside the formal work, I am drawn to piano, guitar, DJing,
            biohacking, and the design of routines that make people feel more
            awake in their own lives. That curiosity is not separate from the
            startup work. It is the taste engine.
          </p>
          <div className="interest-row">
            <span>
              <Music size={17} />
              Piano / guitar / DJing
            </span>
            <span>
              <BookOpen size={17} />
              Cognitive science
            </span>
            <span>
              <Rocket size={17} />
              Entrepreneurship
            </span>
          </div>
        </div>
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

export default App;
