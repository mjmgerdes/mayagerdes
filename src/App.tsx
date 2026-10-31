import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  RefreshCw,
  Trophy,
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
  type CSSProperties,
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
  praxessLive: "https://praxess-production.up.railway.app",
  praxessRepo: "https://github.com/mjmgerdes/praxess",
  neurtalkRepo: "https://github.com/mjmgerdes/neurtalk",
  relageLive: "https://mjmgerdes.github.io/relage/",
  relageRepo: "https://github.com/mjmgerdes/relage",
  relageWriteup:
    "https://www.kaggle.com/competitions/build-with-gemma-nyc-on-device-ai-for-healthcare/writeups/relage-from-appointment-to-arrival",
  gordonRepo: "https://github.com/mjmgerdes/gordon",
};

type ExperienceCategory = "Work" | "Research" | "Clubs" | "Honors + Awards";

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

type ResumeEntry = {
  organization: string;
  role: string;
  location: string;
  date: string;
  bullets: string[];
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
  linkLabel?: string;
  award?: {
    href: string;
    label: string;
  };
  tone: "ice" | "carbon" | "sky" | "violet";
};

type PersonalMediaItem = {
  number?: string;
  title: string;
  shortTitle?: string;
  detail?: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  secondaryImage?: string;
  secondaryImageAlt?: string;
  flipAlignment?: "mason";
  video?: string;
  poster?: string;
  fit?: "cover" | "contain";
  position?: string;
  shape?: "wide" | "landscape" | "portrait";
};

type LenisWindow = Window & { mayaLenis?: Lenis };

const experienceTabs: ExperienceCategory[] = ["Work", "Research", "Clubs", "Honors + Awards"];

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
  {
    category: "Clubs",
    logo: {
      alt: "Nu Rho Psi",
      image: "/logos/nu-rho-psi.png",
      text: "NRP",
    },
    title: "Neuroscience National Honor Society Member",
    org: "Nu Rho Psi",
    date: "Sep 2025 - Present",
    summary:
      "Selected for the national honor society in neuroscience, recognizing scholarship and professional interest in brain research.",
    tags: ["Neuroscience", "Scholarship", "Service"],
  },
  {
    category: "Honors + Awards",
    logo: {
      alt: "Phi Kappa Phi",
      image: "/logos/phi-kappa-phi.png",
      text: "PKP",
    },
    title: "Collegiate Honor Society Member",
    org: "The Honor Society of Phi Kappa Phi",
    date: "Jan 2026 - Present",
    summary:
      "Invited to Phi Kappa Phi, an all-discipline collegiate honor society recognizing sustained academic achievement.",
    tags: ["Academic distinction", "Invitation only"],
  },
  {
    category: "Honors + Awards",
    logo: {
      alt: "University of Michigan Honors",
      image: "/logos/michigan-honors.png",
      text: "M",
    },
    title: "University Honors",
    org: "University of Michigan",
    date: "Aug 2024 - May 2028",
    summary:
      "Earned University Honors for term academic performance meeting the University's GPA and graded-credit criteria.",
    tags: ["Academic achievement", "University Honors"],
  },
  {
    category: "Honors + Awards",
    logo: {
      alt: "Google DeepMind",
      image: "/logos/google-deepmind.png",
      text: "GDM",
    },
    title: "1st Place - Agentic Care Copilots",
    org: "Google DeepMind NYC Hackathon / Build with Gemma",
    date: "2026",
    summary:
      "Built Relage with Andrew Poveda in under eight hours and won the Agentic Care Copilots track among 45+ healthcare AI teams.",
    tags: ["Relage", "Gemma", "1st Place"],
  },
  {
    category: "Honors + Awards",
    logo: {
      alt: "a16z",
      text: "a16z",
    },
    title: "1st Place - Build & Pitch Hackathon",
    org: "a16z NYC Tech Week",
    date: "2026",
    summary:
      "Built and pitched Praxigen, winning first place at the NYC Tech Week Build & Pitch hackathon.",
    tags: ["Praxigen", "Build & Pitch", "1st Place"],
  },
  {
    category: "Honors + Awards",
    logo: {
      alt: "ElevenLabs",
      image: "/logos/elevenlabs.png",
      text: "11",
    },
    title: "Startup Grant Recipient",
    org: "ElevenLabs",
    date: "2026",
    summary:
      "Selected for an ElevenLabs startup grant supporting Praxigen's product development.",
    tags: ["Praxigen", "Startup grant"],
  },
  {
    category: "Honors + Awards",
    logo: {
      alt: "Ballard Spahr",
      image: "/logos/ballard-spahr.png",
      text: "BS",
    },
    title: "Ballard Academy for Student Entrepreneurs",
    org: "Ballard Spahr",
    date: "2026",
    summary:
      "Selected for the startup accelerator supporting Praxigen through founder programming and legal mentorship.",
    tags: ["Praxigen", "Accelerator"],
  },
  {
    category: "Honors + Awards",
    logo: {
      alt: "MCombinator",
      image: "/logos/mcombinator.png",
      text: "MC",
    },
    title: "Startup Accelerator",
    org: "MCombinator",
    date: "2026",
    summary:
      "Selected for MCombinator's startup accelerator to advance Praxigen.",
    tags: ["Praxigen", "Accelerator"],
  },
  {
    category: "Honors + Awards",
    logo: {
      alt: "University of Michigan Ross",
      image: "/logos/michigan-ross.png",
      text: "M",
    },
    title: "1st Place - Business+Tech Demo Day",
    org: "University of Michigan",
    date: "2026",
    summary:
      "Won first place pitching Praxigen at the University of Michigan Business+Tech Demo Day.",
    tags: ["Praxigen", "Demo Day", "1st Place"],
  },
];

const resumeExperience: ResumeEntry[] = [
  {
    organization: "Praxigen, Inc.",
    role: "Founder & CEO",
    location: "New York City, NY",
    date: "Apr 2026 - Present",
    bullets: [
      "Founded a HealthTech startup and AI prior-authorization platform piloted across 10+ specialty practices, cutting submission time by 80% across insurance PA and appeal workflows with 100% approval or overturn across 40+ submissions.",
      "Designed, built, and deployed the full-stack MVP grounded in 1,300+ payer requirements, including case management, clinical note checks, audit logs, automated payer calls, and product analytics.",
      "Led 3 developers and 3 BDRs across product development, prioritizing the roadmap from customer feedback and shipping features from discovery to launch.",
      "Led 120+ provider interviews and go-to-market work, generated 600K+ LinkedIn impressions, delivered technical demos to 80+ practice leaders, and achieved 20% trial conversion.",
    ],
  },
  {
    organization: "Michigan Blockchain Consulting",
    role: "Product Manager",
    location: "Ann Arbor, MI",
    date: "Aug 2025 - Present",
    bullets: [
      "Led 3 developers from requirements through launch of ForeverData, a permanent file-storage product on EigenDA; defined the roadmap, UX, wallet upload flow, and product requirements before its sale to Eigen Labs.",
      "Led product and go-to-market strategy for 4 blockchain clients, translating user needs into product requirements and launch plans.",
    ],
  },
  {
    organization: "Michigan Medicine, Department of Human Genetics",
    role: "Research Assistant",
    location: "Ann Arbor, MI",
    date: "Aug 2025 - May 2026",
    bullets: [
      "Engineered CRISPR constructs for a patent-pending DNA-sensing system targeting cancer-specific genomic alterations; used SnapGene modeling and experimental data to diagnose failures and improve system performance.",
      "Led recruiting and onboarding to scale the wet-lab team to 15+ researchers; built protocols and documentation for new members.",
    ],
  },
  {
    organization: "Michigan Medicine & College of Engineering",
    role: "Research Assistant",
    location: "Ann Arbor, MI",
    date: "Nov 2024 - Sept 2025",
    bullets: [
      "Conducted translational research across computational vascular biomechanics and cardiovascular surgery, integrating wet-lab and computational approaches to improve vascular imaging and reconstruction in surgical planning.",
      "Analyzed pre- and post-operative CABG and cardiac catheterization datasets for 1,500+ patients using Epic and Excel to support outcome prediction research.",
    ],
  },
  {
    organization: "Neuropsychiatry & Forensic Neurology Private Practice",
    role: "Intern",
    location: "New York City, NY",
    date: "May 2025 - Aug 2025",
    bullets: [
      "Worked across outpatient neuropsychiatric clinical workflows, including diagnostic evaluations, cognitive assessments, and treatment planning across 50+ patient cases.",
      "Formulated structured interview protocols for 12+ forensic neuropsychiatric evaluations, improving data collection for expert witness testimony and case development.",
    ],
  },
];

const resumeLeadership: ResumeEntry[] = [
  {
    organization: "Cancer Screening Advocates",
    role: "President & Founding Campus Lead",
    location: "Ann Arbor, MI",
    date: "Nov 2025 - Present",
    bullets: [
      "Launched the first university chapter of a national cancer-prevention nonprofit, built a partnership with Michigan Medicine, reached 1K+ students, and raised $10K+.",
    ],
  },
  {
    organization: "Pi Sigma Epsilon, Ross Professional Business Fraternity",
    role: "Speaker Chair",
    location: "Ann Arbor, MI",
    date: "Jan 2025 - May 2026",
    bullets: [
      "Led outreach to industry professionals and partners, building cross-functional relationships for speaker events with 120+ attendees.",
    ],
  },
];

const resumeSkills = [
  {
    label: "Technical",
    value: "Python, JavaScript/TypeScript, R, C++, React, Supabase, Vercel, GitHub, Excel, Power BI, Tableau, MATLAB",
  },
  {
    label: "AI / ML",
    value: "LLMs, RAG, model evaluation, prompt design, OpenAI and Claude APIs, Lovable, Cursor",
  },
  {
    label: "Product",
    value: "Roadmapping, user research, A/B testing, product analytics, GTM, competitive analysis, Figma, Jira, UX design",
  },
  {
    label: "Interests",
    value: "HealthTech, entrepreneurship, pickleball and fitness, music, cognitive science, AI and frontier technology",
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
    tags: ["Founder build", "Product pilots", "Build & Pitch winner"],
    image: "/projects/praxigen-landing.webp",
    imageAlt: "Praxigen landing page for end-to-end prior authorization workflows for surgical teams.",
    role: "Founder & technical builder",
    year: "2026 - now",
    award: {
      href: projectLinks.buildAndPitch,
      label: "a16z NYC Tech Week - Build & Pitch Hackathon Win",
    },
    tone: "ice",
  },
  {
    number: "02",
    name: "Relage",
    label: "Google DeepMind / Track winner",
    href: projectLinks.relageLive,
    repo: projectLinks.relageRepo,
    body:
      "Track 2 winner at Build with Gemma NYC, built in under eight hours at One World Trade Center. An on-device care logistics agent for rural older adults.",
    tags: ["Official track winner", "On-device Gemma", "Privacy-first"],
    image: "/projects/relage-intro.webp",
    imageAlt: "Relage, from appointment to arrival where access is hardest, built for the Build with Gemma NYC healthcare hackathon.",
    role: "Co-builder with Andrew Poveda",
    year: "Aug 2026",
    award: {
      href: projectLinks.relageWriteup,
      label: "Winner writeup",
    },
    tone: "carbon",
  },
  {
    number: "03",
    name: "Praxess",
    label: "Hackathon / prior authorization",
    href: projectLinks.praxessLive,
    repo: projectLinks.praxessRepo,
    body:
      "A closed-loop prior authorization agent that recovers medical-necessity evidence from clinical conversations, verifies every claim, and keeps working after denial.",
    tags: ["Anthropic", "Provenance", "Human-in-the-loop"],
    image: "/projects/praxess-workspace.webp",
    imageAlt: "Praxess case workspace showing evidence gaps, case state, and the next best action.",
    role: "Co-builder",
    year: "Jul 2026",
    tone: "sky",
  },
  {
    number: "04",
    name: "NeurTalk",
    label: "Solo build / adaptive communication",
    href: projectLinks.neurtalkRepo,
    linkLabel: "View on GitHub",
    body:
      "An on-device communication system for people losing speech and movement, combining visual context, linguistic identity, and head-controlled selection.",
    tags: ["Gemma", "On-device", "Accessibility"],
    image: "/projects/neurtalk-workspace.webp",
    imageAlt: "NeurTalk adaptive communication workspace with visual context and head-control access.",
    role: "Solo builder",
    year: "Aug 2026",
    tone: "violet",
  },
  {
    number: "05",
    name: "Startup CRM",
    label: "Operating system / founder network",
    href: projectLinks.startupCrm,
    body:
      "A live operating layer for startup league teams, combining outreach CRM, interview tracking, AI coaching, scheduling, and a Google Sheets-backed source of truth.",
    tags: ["CRM", "Workflow design", "Founder operations"],
    image: "/projects/startup-crm-interface.webp",
    imageAlt: "UStart League team dashboard with a season timeline, outreach, interviews, and operating metrics.",
    role: "Product & engineering",
    year: "2026",
    tone: "ice",
  },
  {
    number: "06",
    name: "Gordon",
    label: "AI tools / prompt coaching",
    href: projectLinks.gordonRepo,
    linkLabel: "View on GitHub",
    body:
      "An AI coding coach that watches how people prompt agents, scores six dimensions, and interrupts weak instructions with a roast, diagnosis, and rewrite.",
    tags: ["Desktop overlay", "Prompt evaluation", "Voice"],
    image: "/projects/gordon-interface.webp",
    imageAlt: "Gordon Kitchen dashboard showing prompt scores, category tracking, token savings, and an incident log.",
    role: "Product & interface",
    year: "Jul 2026",
    tone: "carbon",
  },
  {
    number: "07",
    name: "grndwork",
    label: "Early access / career discovery",
    href: projectLinks.grndworkLive,
    repo: projectLinks.grndworkRepo,
    body:
      "A career discovery and opportunity-tracking product that turns broad interests into recommended roles, clearer outreach, and one place to manage applications.",
    tags: ["Career discovery", "Opportunity matching", "React"],
    image: "/projects/grndwork-interface.webp",
    imageAlt: "grndwork opportunity dashboard showing interests, match score, open roles, and application tracking.",
    role: "Product & engineering",
    year: "2026",
    tone: "violet",
  },
  {
    number: "08",
    name: "ForeverData",
    label: "Go-to-market / data infrastructure",
    href: projectLinks.foreverData,
    body:
      "Go-to-market work for a permanent file-storage product on EigenDA, translating decentralized persistence into a clear wallet and upload flow.",
    tags: ["GTM", "EigenDA", "Data persistence"],
    image: "/projects/foreverdata-interface.webp",
    imageAlt: "ForeverData interface with wallet connection and permanent file upload to EigenDA.",
    role: "Go-to-market",
    year: "2025",
    tone: "sky",
  },
];

const personalArchive = {
  clairDeLune: {
    number: "04",
    title: "Clair de Lune at fifteen.",
    shortTitle: "Piano",
    detail: "Piano / age 15",
    body: "A home recording of Clair de Lune.",
    video: "/personal/archive/clair-de-lune.mp4",
    poster: "/personal/archive/clair-de-lune-poster.webp",
    shape: "wide",
  },
  childhoodGuitar: {
    number: "01",
    title: "Self-taught guitarist & pianist. Currently: learning to DJ with my DDJ-FLX4 and produce music on Ableton.",
    shortTitle: "Music",
    detail: "Music / since age five",
    body: "I've been playing guitar since I was five years old!",
    image: "/personal/archive/childhood-guitar.webp",
    imageAlt: "Maya Gerdes as a child posing with a guitar and pink sunglasses.",
    position: "50% 30%",
    shape: "portrait",
  },
  eyeStudy: {
    number: "03",
    title: "I still draw by hand.",
    shortTitle: "Sketchbook",
    detail: "Colored pencil / sketchbook",
    body: "An eye study from my sketchbook.",
    image: "/personal/archive/eye-study.webp",
    imageAlt: "Colored pencil drawing of an eye by Maya Gerdes.",
    fit: "contain",
    shape: "wide",
  },
  softballHelmet: {
    number: "02",
    title: "Softball, pickleball, and lifting.",
    shortTitle: "Sports",
    detail: "Sports / always moving",
    body: "I played softball most of my life, spending my last two years playing as varsity captain and starting shortstop.",
    image: "/personal/archive/softball-helmet.webp",
    imageAlt: "Maya Gerdes smiling in a batting helmet beside the softball field.",
    position: "50% 42%",
    shape: "wide",
  },
  redwoods: {
    number: "04",
    title: "I love exploring nature with family and friends.",
    shortTitle: "Outdoors",
    detail: "Outdoors / California",
    body: "Under the redwoods with my sister.",
    image: "/personal/archive/redwoods.webp",
    imageAlt: "Maya Gerdes and her sister standing beneath tall California redwoods.",
    position: "50% 66%",
    shape: "portrait",
  },
  childhoodPiano: {
    title: "The first piano years.",
    detail: "Piano / early years",
    body: "Learning to play with family nearby.",
    image: "/personal/archive/childhood-piano.webp",
    imageAlt: "Maya Gerdes as a child sitting at a piano with family.",
    shape: "landscape",
  },
  guitarWithDad: {
    title: "Music by the lake.",
    detail: "Guitar / summer 2025",
    body: "An afternoon with my dad, a guitar, and no real agenda.",
    video: "/personal/archive/guitar-with-dad.mp4",
    poster: "/personal/archive/guitar-with-dad-poster.webp",
    shape: "landscape",
  },
  djDeck: {
    title: "Learning the decks.",
    detail: "DJing / 2025",
    body: "One transition at a time.",
    image: "/personal/archive/dj-deck.webp",
    imageAlt: "DJ controller and laptop running mixing software.",
    shape: "portrait",
  },
  jazzNight: {
    title: "A room with live music.",
    detail: "Jazz / 2022",
    body: "One of many nights planned around a piano.",
    image: "/personal/archive/jazz-night.webp",
    imageAlt: "A piano player performing in a dimly lit jazz room.",
    shape: "wide",
  },
  masonDrawing: {
    number: "03",
    title: "Meet Mason! (I draw dogs a lot)",
    shortTitle: "Drawing",
    detail: "Colored pencil / from reference",
    body: "My first color pencil sketch, featuring my favorite leonberger, Mason.",
    image: "/personal/archive/mason-drawing.webp",
    imageAlt: "Hand-drawn portrait of a black dog named Mason.",
    secondaryImage: "/personal/archive/mason-reference.JPG",
    secondaryImageAlt: "Reference photo of Mason used for the drawing.",
    flipAlignment: "mason",
    shape: "landscape",
  },
  tuckerDrawing: {
    title: "Tucker, drawn from a photo.",
    detail: "Portrait study / colored pencil",
    body: "Another reference-to-paper study.",
    image: "/personal/archive/tucker-drawing.webp",
    imageAlt: "Hand-drawn portrait of a brown dog named Tucker.",
    secondaryImage: "/personal/archive/tucker-reference.webp",
    secondaryImageAlt: "Reference photo of Tucker used for the drawing.",
    shape: "landscape",
  },
  softballAtBat: {
    title: "In the box.",
    detail: "Softball / high school",
    body: "One more season at bat.",
    image: "/personal/archive/softball-at-bat.webp",
    imageAlt: "Maya Gerdes at bat during a high school softball game.",
    position: "50% 34%",
    shape: "portrait",
  },
  siblingsSkiing: {
    title: "Ski days with my siblings.",
    detail: "Skiing / family",
    body: "Cold hands, good company.",
    image: "/personal/archive/siblings-skiing.webp",
    imageAlt: "Maya Gerdes skiing with her siblings.",
    shape: "portrait",
  },
  kayak: {
    title: "Out on the water.",
    detail: "Kayaking",
    body: "A very good reason to put the phone away.",
    image: "/personal/archive/kayak.webp",
    imageAlt: "Maya Gerdes kayaking outdoors.",
    shape: "portrait",
  },
  siblings: {
    title: "The four of us.",
    detail: "Family",
    body: "Me and my three siblings.",
    image: "/personal/archive/siblings.webp",
    imageAlt: "Maya Gerdes with her three siblings.",
    position: "50% 34%",
    shape: "portrait",
  },
  ginger: {
    title: "Me and Ginger.",
    detail: "Home",
    body: "A reliably good welcome home.",
    image: "/personal/archive/ginger.webp",
    imageAlt: "Maya Gerdes with her dog Ginger.",
    position: "50% 36%",
    shape: "portrait",
  },
  birdInMiami: {
    title: "A completely normal day in Miami.",
    detail: "Friends / Miami",
    body: "My best friend, me, and a very large bird.",
    image: "/personal/archive/bird-in-miami.webp",
    imageAlt: "Maya Gerdes and her best friend posing with a large white bird in Miami.",
    position: "50% 30%",
    shape: "portrait",
  },
  yankeesGame: {
    title: "A night at Yankee Stadium.",
    detail: "New York",
    body: "Baseball with a friend.",
    image: "/personal/archive/yankees-game.webp",
    imageAlt: "Maya Gerdes and a friend at a New York Yankees game.",
    position: "50% 28%",
    shape: "portrait",
  },
  michiganGame: {
    title: "Game day in Ann Arbor.",
    detail: "University of Michigan",
    body: "The Big House, in full voice.",
    image: "/personal/archive/michigan-game.webp",
    imageAlt: "Maya Gerdes at a University of Michigan football game.",
    position: "50% 32%",
    shape: "portrait",
  },
  hackathon: {
    title: "Eight hours, one prototype.",
    detail: "Hackathon / 2026",
    body: "Building Relage with Andrew at One World Trade Center.",
    image: "/personal/archive/hackathon.webp",
    imageAlt: "Maya Gerdes and Andrew Poveda building Relage together at a hackathon.",
    shape: "wide",
  },
  speaker: {
    title: "At the mic.",
    detail: "Speaking / 2026",
    body: "A student event and a room full of questions.",
    image: "/personal/archive/speaker.webp",
    imageAlt: "Maya Gerdes speaking into a microphone at a student event.",
    position: "50% 38%",
    shape: "landscape",
  },
  labBench: {
    title: "CRISPR bench days.",
    detail: "Human genetics lab",
    body: "Bench work from my cancer-sensing research.",
    image: "/personal/archive/lab-bench.webp",
    imageAlt: "Petri dishes and lab materials on Maya Gerdes's CRISPR research bench.",
    shape: "portrait",
  },
  crisprLab: {
    title: "The old lab.",
    detail: "CRISPR research",
    body: "Where I learned to be patient with experiments.",
    image: "/personal/archive/crispr-lab.webp",
    imageAlt: "The University of Michigan lab where Maya Gerdes conducted CRISPR research.",
    shape: "portrait",
  },
  suturePractice: {
    title: "Learning with my hands.",
    detail: "Suture practice",
    body: "Some skills make more sense off the page.",
    image: "/personal/archive/suture-practice.webp",
    imageAlt: "Suture practice pad and surgical instruments.",
    shape: "portrait",
  },
} satisfies Record<string, PersonalMediaItem>;

const personalMedia: PersonalMediaItem[] = [
  personalArchive.childhoodGuitar,
  personalArchive.softballHelmet,
  personalArchive.masonDrawing,
  personalArchive.redwoods,
];

const addedPersonalMedia = {
  builderEventStage: {
    title: "Builder event",
    image: "/personal/archive/additions/builder-event-stage.webp",
    imageAlt: "Audience gathered for a builder event presentation.",
    shape: "landscape",
  },
  childhoodCamping: {
    title: "Childhood camping",
    image: "/personal/archive/additions/childhood-camping.webp",
    imageAlt: "Maya Gerdes as a child standing beside a tent while camping.",
    shape: "portrait",
  },
  dogAndDrawing: {
    title: "Dog and drawing",
    image: "/personal/archive/additions/dog-and-drawing.webp",
    imageAlt: "A dog sitting beside Maya's colored pencil portrait of it.",
    shape: "portrait",
  },
  dogColoredPencil: {
    title: "Colored pencil dog portrait",
    image: "/personal/archive/additions/dog-colored-pencil.webp",
    imageAlt: "A colored pencil portrait of a dog drawn by Maya Gerdes.",
    shape: "portrait",
  },
  dogOnBoat: {
    title: "Dog on the water",
    image: "/personal/archive/additions/dog-on-boat.webp",
    imageAlt: "A dog looking over the water from a boat.",
    shape: "portrait",
  },
  friendsSummer: {
    title: "Summer with friends",
    image: "/personal/archive/additions/friends-summer.webp",
    imageAlt: "Maya Gerdes smiling outdoors with two friends.",
    shape: "landscape",
  },
  hackathonRoom: {
    title: "Hackathon room",
    image: "/personal/archive/additions/hackathon-room.webp",
    imageAlt: "Builders working together beneath blue and purple lights at a hackathon.",
    shape: "landscape",
  },
  hackathonWorkspace: {
    title: "Hackathon workspace",
    image: "/personal/archive/additions/hackathon-workspace.webp",
    imageAlt: "A busy hackathon workspace filled with laptops, boxes, and builders.",
    shape: "portrait",
  },
  lakesideHandstand: {
    title: "Lakeside handstand",
    image: "/personal/archive/additions/lakeside-handstand.webp",
    imageAlt: "Maya Gerdes doing a handstand on a dock at sunset.",
    shape: "landscape",
  },
  mayaWithDog: {
    title: "At home with a dog",
    image: "/personal/archive/additions/maya-with-dog.webp",
    imageAlt: "Maya Gerdes holding a small dog at home.",
    shape: "portrait",
  },
  michiganNight: {
    title: "Michigan night",
    image: "/personal/archive/additions/michigan-night.webp",
    imageAlt: "Maya Gerdes and friends celebrating together at night in Michigan colors.",
    shape: "portrait",
  },
  michiganStadium: {
    title: "Michigan Stadium",
    image: "/personal/archive/additions/michigan-stadium.webp",
    imageAlt: "A packed Michigan Stadium beneath a blue evening sky.",
    shape: "portrait",
  },
  poolRobot: {
    title: "Pool robot",
    image: "/personal/archive/additions/pool-robot.webp",
    imageAlt: "A homemade floating robot being tested in a swimming pool.",
    shape: "landscape",
  },
  pseGroup: {
    title: "Pi Sigma Epsilon",
    image: "/personal/archive/additions/pse-group.webp",
    imageAlt: "Maya Gerdes with members of Pi Sigma Epsilon in professional attire.",
    shape: "landscape",
  },
  skiDay: {
    title: "Ski day",
    image: "/personal/archive/additions/ski-day.webp",
    imageAlt: "Two skiers smiling together on a bright mountain day.",
    shape: "portrait",
  },
  softballAction: {
    title: "At bat",
    image: "/personal/archive/additions/softball-action.webp",
    imageAlt: "Maya Gerdes at bat during a softball game.",
    shape: "portrait",
  },
  studentGroup: {
    title: "Student group",
    image: "/personal/archive/additions/student-group.webp",
    imageAlt: "A large student organization gathered together in a classroom.",
    shape: "landscape",
  },
  waterfrontEvening: {
    title: "Waterfront evening",
    image: "/personal/archive/additions/waterfront-evening.webp",
    imageAlt: "Friends swimming off a dock beneath a pastel evening sky.",
    shape: "landscape",
  },
  workshopPresentation: {
    title: "Workshop presentation",
    image: "/personal/archive/additions/workshop-presentation.webp",
    imageAlt: "An audience watching a presentation in a bright workshop space.",
    shape: "portrait",
  },
} satisfies Record<string, PersonalMediaItem>;

const personalArchiveItems: PersonalMediaItem[] = [
  addedPersonalMedia.michiganNight,
  personalArchive.childhoodGuitar,
  addedPersonalMedia.friendsSummer,
  addedPersonalMedia.dogOnBoat,
  personalArchive.eyeStudy,
  addedPersonalMedia.softballAction,
  addedPersonalMedia.mayaWithDog,
  addedPersonalMedia.builderEventStage,
  personalArchive.masonDrawing,
  addedPersonalMedia.lakesideHandstand,
  personalArchive.guitarWithDad,
  addedPersonalMedia.pseGroup,
  addedPersonalMedia.childhoodCamping,
  personalArchive.djDeck,
  addedPersonalMedia.hackathonRoom,
  personalArchive.redwoods,
  addedPersonalMedia.dogColoredPencil,
  addedPersonalMedia.michiganStadium,
  personalArchive.clairDeLune,
  addedPersonalMedia.studentGroup,
  personalArchive.softballHelmet,
  addedPersonalMedia.workshopPresentation,
  personalArchive.tuckerDrawing,
  addedPersonalMedia.waterfrontEvening,
  personalArchive.siblingsSkiing,
  addedPersonalMedia.hackathonWorkspace,
  personalArchive.siblings,
  addedPersonalMedia.poolRobot,
  personalArchive.jazzNight,
  addedPersonalMedia.dogAndDrawing,
  personalArchive.ginger,
  addedPersonalMedia.skiDay,
  personalArchive.birdInMiami,
  personalArchive.kayak,
  personalArchive.childhoodPiano,
  personalArchive.softballAtBat,
  personalArchive.yankeesGame,
  personalArchive.michiganGame,
  personalArchive.hackathon,
  personalArchive.speaker,
  personalArchive.labBench,
  personalArchive.crisprLab,
  personalArchive.suturePractice,
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
          ? "rgba(59, 166, 255, 0.34)"
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
        context.strokeStyle = "rgba(59, 166, 255, 0.18)";
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
      </motion.div>
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

function illuminateGlass(event: ReactMouseEvent<HTMLElement>) {
  const element = event.currentTarget;
  const bounds = element.getBoundingClientRect();
  const x = event.clientX - bounds.left;
  const y = event.clientY - bounds.top;
  const xRatio = x / bounds.width - 0.5;
  const yRatio = y / bounds.height - 0.5;

  element.style.setProperty("--glass-x", `${x}px`);
  element.style.setProperty("--glass-y", `${y}px`);
  element.style.setProperty("--glass-rx", `${yRatio * -2.2}deg`);
  element.style.setProperty("--glass-ry", `${xRatio * 2.2}deg`);
}

function settleGlass(event: ReactMouseEvent<HTMLElement>) {
  const element = event.currentTarget;
  element.style.setProperty("--glass-x", "50%");
  element.style.setProperty("--glass-y", "42%");
  element.style.setProperty("--glass-rx", "0deg");
  element.style.setProperty("--glass-ry", "0deg");
}

function SiteNav({ page = "home" }: { page?: "home" | "personal" | "resume" }) {
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = page === "home";

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
  const anchorHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);
  const items = [
    { label: "Work", id: "work" },
    { label: "Experience", id: "experience" },
    { label: "About", id: "about" },
    { label: "Personal", id: "personal" },
    { label: "Resume", href: "/resume" },
  ];
  const mobileItems = [...items, { label: "Email", href: links.email }];

  return (
    <>
      <nav
        className={`site-nav${scrolled ? " is-scrolled" : ""}`}
        aria-label="Primary navigation"
      >
        <a className="brand" href={isHome ? "#top" : "/"} aria-label="Maya Gerdes home">
          <span className="sr-only">Maya Gerdes home</span>
        </a>
        <div className="nav-links">
          {items.map((item) =>
            item.href ? (
              <a
                key={item.label}
                href={item.href}
                aria-current={page === "resume" && item.label === "Resume" ? "page" : undefined}
              >
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
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="section-heading">
      <span className="section-index">{number}</span>
      <h2 aria-label={title}><RevealWords text={title} /></h2>
    </div>
  );
}

function PersonalMediaVisual({
  item,
  priority = false,
}: {
  item: PersonalMediaItem;
  priority?: boolean;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  if (item.video) {
    return (
      <video
        className="personal-media-video"
        aria-label={`Video: ${item.title}`}
        controls
        playsInline
        preload="metadata"
        poster={item.poster}
      >
        <source src={item.video} type="video/mp4" />
        Your browser does not support embedded video.
      </video>
    );
  }

  if (item.secondaryImage) {
    return (
      <button
        type="button"
        className={`personal-image-flip${
          item.flipAlignment ? ` align-${item.flipAlignment}` : ""
        }${isFlipped ? " is-flipped" : ""}`}
        onClick={() => setIsFlipped((flipped) => !flipped)}
        aria-label={
          isFlipped
            ? `Show drawing for ${item.title}`
            : `Show original photo for ${item.title}`
        }
        aria-pressed={isFlipped}
      >
        <span className="personal-image-flip-inner">
          <span
            className="personal-image-flip-face personal-image-flip-front"
            aria-hidden={isFlipped}
          >
            <img
              src={item.image}
              alt={item.imageAlt ?? ""}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
            />
            <span className="personal-flip-hint">
              <RefreshCw size={13} aria-hidden="true" />
              Original photo
            </span>
          </span>
          <span
            className="personal-image-flip-face personal-image-flip-back"
            aria-hidden={!isFlipped}
          >
            <img
              src={item.secondaryImage}
              alt={item.secondaryImageAlt ?? ""}
              loading="lazy"
              decoding="async"
            />
            <span className="personal-flip-hint">
              <RefreshCw size={13} aria-hidden="true" />
              Back to drawing
            </span>
          </span>
        </span>
      </button>
    );
  }

  return (
    <div className={`personal-image-frame fit-${item.fit ?? "cover"}`}>
      <img
        src={item.image}
        alt={item.imageAlt ?? ""}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={item.position ? { objectPosition: item.position } : undefined}
      />
    </div>
  );
}

function PersonalStory({ compact = false }: { compact?: boolean }) {
  const storyRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeItem, setActiveItem] = useState(0);
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (compact || reduceMotion) return;
    setActiveItem(
      Math.min(personalMedia.length - 1, Math.round(latest * (personalMedia.length - 1))),
    );
  });

  const moveToItem = (index: number) => {
    setActiveItem(index);
    const story = storyRef.current;
    if (!story || compact || reduceMotion) return;

    const rect = story.getBoundingClientRect();
    const storyTop = window.scrollY + rect.top;
    const travel = Math.max(0, story.offsetHeight - window.innerHeight);
    const target = storyTop + (travel * index) / (personalMedia.length - 1);
    const lenis = (window as LenisWindow).mayaLenis;
    if (lenis) lenis.scrollTo(target, { duration: 0.9 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  if (compact) {
    return (
      <section className="personal-archive" id="personal">
        <div className="personal-archive-heading">
          <SectionHeading number="01" title="Archive" />
        </div>
        <div className="personal-feed">
          {personalArchiveItems.map((item, index) => (
            <article
              className={`personal-feed-item shape-${item.shape ?? "landscape"}`}
              aria-label={item.imageAlt ?? item.title}
              key={`${item.title}-${index}`}
            >
              <div className="personal-feed-media">
                <PersonalMediaVisual item={item} priority={index < 4} />
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  const current = personalMedia[activeItem];

  return (
    <section
      className="personal-story"
      id="personal"
      ref={storyRef}
      style={{ "--personal-story-height": `${personalMedia.length * 82}vh` } as CSSProperties}
    >
      <div className="personal-story-stage">
        <div className="personal-story-layout">
          <div className="personal-story-copy">
            <span className="personal-story-index">04 / Personal</span>
            <h2>Hobbies + Interests</h2>

            <div className="personal-story-nav" aria-label="Personal archive chapters">
              {personalMedia.map((item, index) => (
                <button
                  type="button"
                  className={index === activeItem ? "active" : ""}
                  aria-current={index === activeItem ? "step" : undefined}
                  onClick={() => moveToItem(index)}
                  key={item.title}
                >
                  <span>{item.number}</span>
                  <strong>{item.shortTitle}</strong>
                  <i aria-hidden="true" />
                </button>
              ))}
            </div>

            <a className="personal-story-link" href="/me">
              Open the full archive <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="personal-story-display">
            <AnimatePresence mode="wait">
              <motion.article
                className="personal-story-item"
                key={current.title}
                initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -18, scale: 0.99 }}
                transition={{ duration: reduceMotion ? 0 : 0.42, ease: EASE }}
              >
                <div className="personal-story-media">
                  <PersonalMediaVisual item={current} priority />
                </div>
                <div className="personal-story-caption">
                  <span>{current.detail}</span>
                  <div>
                    <h3>{current.title}</h3>
                    <p>{current.body}</p>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="personal-mobile-track">
            {personalMedia.map((item, index) => (
              <article className="personal-mobile-card" key={item.title}>
                <div className="personal-mobile-media">
                  <PersonalMediaVisual item={item} priority={index === 0} />
                </div>
                <div className="personal-mobile-caption">
                  <span>{item.detail}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="personal-story-progress" aria-hidden="true">
            <motion.span style={{ scaleX: progress }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectRail() {
  const railRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeProject, setActiveProject] = useState(0);
  const railTravelVw = (railProjects.length - 1) * 85;
  const railHeightVh = 100 + (railProjects.length - 1) * 105;
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${railTravelVw}vw`]);
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActiveProject(Math.min(railProjects.length - 1, Math.round(latest * (railProjects.length - 1))));
  });

  return (
    <section
      className="project-rail-section"
      id="work"
      ref={railRef}
      style={{ "--rail-height": `${railHeightVh}vh` } as CSSProperties}
    >
      <div className="project-rail-sticky">
        <div className="project-rail-header">
          <div>
            <span>01 / Selected work</span>
          </div>
        </div>

        <motion.div
          className="project-rail-track"
          style={{ x: reduceMotion ? 0 : x }}
        >
          {railProjects.map((project, index) => (
            <article
              className={`rail-panel tone-${project.tone}`}
              key={project.name}
              onPointerMove={illuminateGlass}
              onPointerLeave={settleGlass}
            >
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
                    {project.linkLabel ?? "Open project"} <ArrowUpRight size={15} />
                  </a>
                  {project.repo ? (
                    <a href={project.repo} target="_blank" rel="noreferrer">
                      <Github size={14} /> Source
                    </a>
                  ) : null}
                  {project.award ? (
                    <a href={project.award.href} target="_blank" rel="noreferrer">
                      <Trophy size={14} /> {project.award.label}
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
            <span className="rail-progress-current">{String(activeProject + 1).padStart(2, "0")}</span>
            <span className="rail-progress-slash">/</span>
            <span className="rail-progress-total">{String(railProjects.length).padStart(2, "0")}</span>
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
              <span>University of Michigan</span>
              <span>Ann Arbor, MI</span>
            </div>
            <h1>
              <span className="hero-name-line"><span>Maya</span></span>
              <span className="hero-name-line"><span>Gerdes</span></span>
            </h1>
            <p className="hero-lead">
              I love learning problems deeply and building solutions. Neuroscience,
              cognition, tech, and entrepreneurship.
            </p>
            <p className="hero-bio">
              At Michigan, I study Biopsychology, Cognition, and Neuroscience
              alongside entrepreneurship and business. I move between research,
              product, and company-building.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#work" onClick={(event) => scrollToSection(event, "work")}>
                Enter selected work <ArrowDown size={15} />
              </a>
              <a href="/resume">
                Resume <ArrowUpRight size={15} />
              </a>
              <a href="#personal" onClick={(event) => scrollToSection(event, "personal")}>
                Personal archive <ArrowDown size={15} />
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
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-notes"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.62, delay: reduceMotion ? 0 : 0.56, ease: EASE }}
        >
          <div className="hero-note" onPointerMove={illuminateGlass} onPointerLeave={settleGlass}>
            <span>Current</span><strong>Building Praxigen</strong>
          </div>
          <div className="hero-note" onPointerMove={illuminateGlass} onPointerLeave={settleGlass}>
            <span>Study</span><strong>Neuroscience + business</strong>
          </div>
          <div className="hero-note" onPointerMove={illuminateGlass} onPointerLeave={settleGlass}>
            <span>Interests</span><strong>Genetics + consciousness</strong>
          </div>
          <a
            className="hero-note hero-note-recent"
            href={projectLinks.relageWriteup}
            target="_blank"
            rel="noreferrer"
            onPointerMove={illuminateGlass}
            onPointerLeave={settleGlass}
          >
            <span>Recent</span><strong>Google DeepMind NYC Hackathon Winner</strong><ArrowUpRight size={14} />
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
            title="Experience"
          />
        </Reveal>
        <ExperienceLedger />
      </section>

      <section className="portfolio-section about-section" id="about">
        <Reveal>
          <SectionHeading
            number="03"
            title="About"
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
              brain. A few of those things are just below.
            </p>
            <a href="#personal" onClick={(event) => scrollToSection(event, "personal")}>
              Personal archive <ArrowDown size={15} />
            </a>
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

      <PersonalStory />

      <footer className="contact-footer" id="contact">
        <div className="contact-footer-main">
          <span>05 / Contact</span>
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
            <h1>Outside the resume.</h1>
          </div>
          <p>
            Music, drawings, movement, the people I love, and a few places I
            keep returning to.
          </p>
        </motion.div>
      </header>

      <PersonalStory compact />

      <footer className="personal-footer">
        <a href="/">Return to portfolio <ArrowUpRight size={15} /></a>
      </footer>
    </main>
  );
}

function ResumeEntryList({ entries }: { entries: ResumeEntry[] }) {
  return (
    <div className="resume-entry-list">
      {entries.map((entry, index) => (
        <article
          className="resume-entry"
          key={`${entry.organization}-${entry.role}`}
        >
          <span className="resume-entry-number">{String(index + 1).padStart(2, "0")}</span>
          <div className="resume-entry-main">
            <h3>{entry.organization}</h3>
            <p>{entry.role}</p>
          </div>
          <div className="resume-entry-meta">
            <span>{entry.location}</span>
            <time>{entry.date}</time>
          </div>
          <ul>
            {entry.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
          </ul>
        </article>
      ))}
    </div>
  );
}

function ResumePage() {
  return (
    <main className="resume-page">
      <SiteNav page="resume" />

      <header className="resume-hero">
        <div className="resume-hero-inner">
          <div>
            <a className="back-link" href="/"><ArrowLeft size={16} /> Main portfolio</a>
            <p className="resume-kicker">Maya Gerdes / 2026</p>
            <h1>Resume.</h1>
          </div>
          <div className="resume-hero-summary">
            <p>
              Founder, product builder, and neuroscience student working across
              healthcare, research, and emerging technology.
            </p>
            <a
              className="resume-download"
              href="/Maya-Gerdes-Resume.pdf"
              download="Maya_Gerdes_Resume_2026.pdf"
            >
              Download PDF <Download size={17} />
            </a>
          </div>
        </div>
      </header>

      <div className="resume-contact-row">
        <a href={links.email}>mjgerdes@umich.edu</a>
        <a href="tel:+19736341419">+1 973 634 1419</a>
        <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a>
        <span>Ann Arbor / New York</span>
      </div>

      <div className="resume-document">
        <section className="resume-section">
          <div className="resume-section-label"><span>01</span><h2>Education</h2></div>
          <div className="resume-education">
            <div className="resume-education-heading">
              <div>
                <h3>University of Michigan</h3>
                <p>B.S. in Biopsychology, Cognition, and Neuroscience · Honors</p>
              </div>
              <div>
                <span>Ann Arbor, MI</span>
                <time>Expected May 2028</time>
              </div>
            </div>
            <p className="resume-education-detail">GPA 3.96 / 4.00 · Minors in Entrepreneurship and Business (Ross)</p>
            <div className="resume-facts">
              <div><span>Coursework</span><p>Calculus I-III, Programming & OOP, Statistics, Honors Physics I/II</p></div>
              <div><span>Honors</span><p>Branstrom Prize, Angell Scholar, Phi Kappa Phi, Nu Rho Psi</p></div>
              <div><span>Programs</span><p>Ballard, MCombinator, UStart</p></div>
              <div><span>Awards</span><p>a16z Build & Pitch, Google DeepMind NYC, UStart Demo Day</p></div>
            </div>
          </div>
        </section>

        <section className="resume-section">
          <div className="resume-section-label"><span>02</span><h2>Professional experience</h2></div>
          <ResumeEntryList entries={resumeExperience} />
        </section>

        <section className="resume-section">
          <div className="resume-section-label"><span>03</span><h2>Leadership</h2></div>
          <ResumeEntryList entries={resumeLeadership} />
        </section>

        <section className="resume-section">
          <div className="resume-section-label"><span>04</span><h2>Additional</h2></div>
          <div className="resume-skills">
            {resumeSkills.map((skill) => (
              <div key={skill.label}><span>{skill.label}</span><p>{skill.value}</p></div>
            ))}
          </div>
        </section>
      </div>

      <footer className="resume-footer">
        <div>
          <span>Official copy</span>
          <p>One-page PDF, ready for applications.</p>
        </div>
        <a href="/Maya-Gerdes-Resume.pdf" download="Maya_Gerdes_Resume_2026.pdf">
          Download resume <Download size={17} />
        </a>
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
      {normalizedPath === "/me" ? (
        <PersonalPage />
      ) : normalizedPath === "/resume" ? (
        <ResumePage />
      ) : (
        <PortfolioHome />
      )}
    </>
  );
}

export default App;
