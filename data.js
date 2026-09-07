export const profile = {
  name: "Ebrar",
  role: "Full-stack Software Engineer",
  path: "~/ebrar/portfolio",
  email: "hello@ebrar.dev",
  github: "https://github.com/ebrardushullovcii",
  linkedin: "https://www.linkedin.com/in/ebrar-dushullovci",
  location: "Remote / Europe",
  updated: "July 2026",
};

export const stack = [
  { tone: "yellow", icon: "icon-braces", category: "Languages", items: "TypeScript, JavaScript, C#, SQL" },
  { tone: "green", icon: "icon-panels", category: "Frontend", items: "React, Next.js, Expo, CSS" },
  { tone: "blue", icon: "icon-server", category: "Backend", items: "Node.js, .NET, REST APIs" },
  { tone: "orange", icon: "icon-database", category: "Data", items: "SQL Server, PostgreSQL, Convex" },
  { tone: "amber", icon: "icon-container", category: "Systems", items: "Docker, NGINX, Electron, Linux" },
  { tone: "cyan", icon: "icon-bot", category: "AI", items: "Agents, vLLM, LiteLLM, MCP" },
];

export const workHistory = [
  {
    period: "2023 - Present",
    title: "Senior Full-stack Software Engineer",
    company: "AutomatedPros",
    mode: "Primary role",
    slug: "automatedpros/senior-full-stack",
    summary:
      "Hands-on product engineering across real-time restaurant operations, QA automation, and AI-assisted frontend systems.",
    details: [
      "Engineered restaurant ordering and kitchen workflows with React, Next.js, Tailwind CSS, and WebSockets, keeping order state synchronized across operational screens.",
      "Led a QA management platform with dynamic test templates, executable API integrations, real-time results, reporting, and ticket handoff.",
      "Built and reviewed reusable frontend patterns for product dashboards, builder workflows, and Figma-to-Next.js generation experiments.",
    ],
    stack: "React · Next.js · TypeScript · Node.js · WebSockets · QA automation",
  },
  {
    period: "2022 - Present",
    title: ".NET Consultant",
    company: "Infotech L.L.C",
    mode: "Concurrent consulting",
    slug: "infotech/dotnet-consulting",
    summary:
      "On-call architecture support, performance triage, code review, mentoring, and reliability work for business-critical .NET systems.",
    details: [
      "Diagnose production issues and query bottlenecks across long-running operational systems.",
      "Review architecture and refactoring work with an emphasis on stability, maintainability, and practical delivery risk.",
      "Mentor developers through paired sessions, playbooks, and focused technical guidance.",
    ],
    stack: "C# · .NET · SQL Server · Architecture · Performance",
  },
  {
    period: "2021 - 2023",
    title: "Chief Experience Officer",
    company: "AutomatedPros",
    mode: "Leadership / operations",
    slug: "automatedpros/customer-experience",
    summary:
      "Connected customer needs, support, QA, product planning, and development before returning to a fully hands-on engineering role.",
    details: [
      "Led customer-experience initiatives and turned recurring support friction into product and tooling priorities.",
      "Coordinated support, QA, and development work around bugs, feature requests, onboarding, and release readiness.",
      "Built a strong product-operations perspective that now informs how I design and ship software.",
    ],
    stack: "Product operations · QA · Team coordination · Customer workflows",
  },
  {
    period: "2019 - 2022",
    title: ".NET Developer",
    company: "Infotech L.L.C",
    mode: "Full-time",
    slug: "infotech/dotnet-development",
    summary:
      "Built and maintained desktop and web software for inventory, sales, tax documents, POS, restaurant operations, repair shops, and fuel-pump control.",
    details: [
      "Implemented SQL-backed business logic, reporting, real-time inventory updates, POS workflows, and operational integrations.",
      "Led a .NET MVC logistics and delivery application from registration through live order tracking and response handling.",
      "Worked directly with the messy edge cases of long-lived software used in day-to-day business operations.",
    ],
    stack: ".NET Framework · .NET MVC · SQL Server · Desktop UI · Reporting",
  },
  {
    period: "2019",
    title: ".NET Developer",
    company: "CREA-KO",
    mode: "Full-time",
    slug: "crea-ko/dotnet-development",
    summary:
      "Helped migrate and modernize a web-based ERP system from .NET Framework to .NET Core MVC.",
    details: [
      "Refactored frontend and backend code around the newer MVC architecture.",
      "Removed deprecated packages and coordinated compatibility fixes across the development team.",
    ],
    stack: ".NET Core MVC · C# · ERP · Migration",
  },
];

export const workProjects = [
  {
    path: "/work/orderific",
    label: "Restaurant operations",
    summary:
      "A connected restaurant platform spanning customer ordering, service screens, kitchen flow, reservations, POS-side tools, and brand management.",
    details: [
      "Built real-time ordering and kitchen workflows where state changes need to be fast, clear, and dependable.",
      "Worked across customer, staff, kitchen, and management surfaces instead of treating each screen as an isolated frontend.",
      "Contributed to dashboard, integration, onboarding, and operational UX decisions alongside implementation.",
    ],
    stack: "React · Next.js · Node.js · WebSockets · SQL",
    visual: {
      kind: "stack",
      label: "realtime-operations.stack",
      caption: "Ordering → service → kitchen → management",
      icons: ["brand-react", "brand-nextdotjs", "brand-nodedotjs", "icon-database"],
    },
  },
  {
    path: "/work/testingmill",
    label: "QA platform",
    summary:
      "A dynamic API-driven testing platform for defining interfaces, assembling datasets, running tests in batches, and tracking outcomes.",
    details: [
      "Turns API-provided interface definitions into reusable testing workflows rather than one-off scripts.",
      "Supports test users, datasets, batch execution, result inspection, reporting, and failed-test ticket creation.",
      "Required product planning across backend contracts, frontend state, execution feedback, and QA operations.",
    ],
    stack: "TypeScript · Next.js · REST APIs · QA automation",
    visual: {
      kind: "stack",
      label: "api-test.matrix",
      caption: "Definitions → datasets → runs → results",
      icons: ["brand-typescript", "brand-nextdotjs", "icon-server", "icon-git-branch"],
    },
  },
  {
    path: "/work/figma-to-next",
    label: "AI + design systems",
    summary:
      "A generation system that interprets Figma structures and produces Next.js component trees with validation loops.",
    details: [
      "Maps nested design data and reusable components into frontend architecture instead of flattening everything into screenshots.",
      "Explores prompt design, Figma Code Connect, tool-calling, MCP-style integrations, and visual verification.",
      "Combines design systems, frontend architecture, automation, and AI-assisted code generation.",
    ],
    stack: "Next.js · Figma · Design systems · AI agents",
    visual: {
      kind: "stack",
      label: "design-to-code.pipeline",
      caption: "Figma structure → component tree → verified output",
      icons: ["brand-figma", "brand-nextdotjs", "brand-react", "icon-git-branch"],
    },
  },
  {
    path: "/work/ai-infrastructure",
    label: "Internal enablement",
    summary:
      "Self-hosted model infrastructure and AI tooling for development teams that need control over routing, deployment, and access.",
    details: [
      "Configured Docker-based model serving with vLLM, LiteLLM, Open WebUI, NGINX, and OpenAI-compatible APIs.",
      "Worked on GPU server setup, long-context serving, model routing, reverse proxies, and deployment troubleshooting.",
      "Helped teams adopt agents, tool-calling, and automation patterns with clearer guidance and safer operating boundaries.",
    ],
    stack: "Docker · vLLM · LiteLLM · NGINX · OpenAI-compatible APIs",
    visual: {
      kind: "stack",
      label: "model-routing.topology",
      caption: "Gateway → routing → model serving → team access",
      icons: ["brand-docker", "brand-nginx", "icon-server", "icon-bot"],
    },
  },
];

export const personalProjects = [
  {
    path: "/projects/clipvault",
    label: "Shipped · v1.6.0",
    url: "https://github.com/ebrardushullovcii/ClipVault",
    summary: "A lightweight Windows game-clipping tool built around an always-on replay buffer.",
    details: [
      "Saves recent gameplay to MP4 with separate desktop and microphone audio tracks.",
      "Includes monitor capture, NVENC with x264 fallback, a clip library, trimming, tagging, favorites, and export tools.",
      "Pairs a C++ capture backend using libobs with an Electron and React product surface.",
    ],
    stack: "C++ · libobs · Electron · React · FFmpeg",
    visual: {
      kind: "image",
      label: "clipvault.app",
      caption: "Capture → review → trim → export",
      image: "assets/projects/clipvault.png",
      alt: "ClipVault logo with a clipped video-frame mark",
      fit: "contain",
      icons: ["brand-cplusplus", "brand-electron", "brand-ffmpeg"],
    },
  },
  {
    path: "/projects/showtracker",
    label: "Public build · v0.1",
    url: "https://github.com/ebrardushullovcii/ShowTracker",
    summary: "A public TV, anime, and movie tracker built as a faster, cleaner TVTime alternative.",
    details: [
      "Covers discovery, progress tracking, watchlists, schedules, custom lists, imports, and watch statistics.",
      "Uses realtime Convex data with bounded local UI state and multiple media providers.",
    ],
    stack: "Expo · React Native · Convex · NativeWind · TypeScript",
    visual: {
      kind: "image",
      label: "showtracker.discover",
      caption: "Discovery, watchlists, schedules, and progress",
      image: "assets/projects/showtracker.png",
      alt: "ShowTracker discovery screen with a featured show and media grid",
      icons: ["brand-expo", "brand-convex", "brand-react"],
      credit: {
        logo: "assets/icons/tmdb.svg",
        alt: "TMDB",
        href: "https://www.themoviedb.org",
        text: "This product uses the TMDB API but is not endorsed or certified by TMDB.",
      },
    },
  },
  {
    path: "/projects/unemployed",
    label: "In development · v0.1",
    url: "https://github.com/ebrardushullovcii/UnEmployed",
    summary: "A desktop monorepo for a Job Finder and Interview Helper with durable agent guidance built into the repository.",
    details: [
      "Local-first Electron architecture with SQLite, typed package boundaries, Job Finder, and Interview Helper surfaces.",
      "Keeps application review safe and non-submitting while treating documentation, decisions, verification, and handoff context as part of the architecture.",
    ],
    stack: "Electron · React · TypeScript · pnpm · Turbo",
    visual: {
      kind: "image",
      label: "unemployed.applications",
      caption: "Local-first review with deliberate human consent",
      image: "assets/projects/unemployed.png",
      alt: "UnEmployed applications screen showing a safely paused job application",
      icons: ["brand-electron", "brand-typescript", "brand-react"],
    },
  },
  {
    path: "/projects/arcane-survivors",
    label: "Prototype",
    url: "https://github.com/ebrardushullovcii/RogueLike",
    summary: "A Vampire Survivors-style browser game with two characters, weapon upgrades, waves, and progression.",
    details: [
      "A smaller project that shows the playful side of my work and experiments with real-time game systems.",
    ],
    stack: "Phaser 3 · TypeScript · Webpack",
    visual: {
      kind: "image",
      label: "arcane-survivors.play",
      caption: "A small browser-game prototype with real-time systems",
      image: "assets/projects/arcane-survivors.jpg",
      alt: "Arcane Survivors main menu",
      fit: "game",
      icons: ["icon-gamepad", "brand-typescript"],
    },
  },
  {
    path: "/projects/global-agent-skills",
    label: "Public tooling",
    url: "https://github.com/ebrardushullovcii/global-agent-skills",
    summary: "A reusable collection of agent workflows for challenging plans, improving architecture, prototyping, and handing work off cleanly.",
    details: [
      "Includes Grill Me, Grill With Docs, architecture review, prototype, and handoff workflows.",
      "Captures repeatable working patterns as portable instructions instead of leaving them buried in individual sessions.",
    ],
    stack: "Codex · Agent workflows · Documentation · Review",
    visual: {
      kind: "stack",
      label: "skills-router.graph",
      caption: "Challenge → review → prototype → handoff",
      icons: ["icon-github", "icon-bot", "icon-git-branch", "icon-file"],
    },
  },
];

export const workflowSteps = [
  {
    number: "01",
    title: "Find the source of truth",
    body:
      "Start with the code, live behavior, screenshots, logs, domain docs, and the people closest to the workflow.",
  },
  {
    number: "02",
    title: "Make the slice explicit",
    body:
      "Turn the request into acceptance criteria, interfaces, risks, and the smallest useful sequence of changes.",
  },
  {
    number: "03",
    title: "Build with leverage",
    body:
      "Use AI and automation for exploration and implementation while keeping architecture and product judgment hands-on.",
  },
  {
    number: "04",
    title: "Verify the real outcome",
    body:
      "Run focused tests, inspect the product, compare screenshots for UI work, and chase the remaining mismatch or failure.",
  },
  {
    number: "05",
    title: "Leave the system clearer",
    body:
      "Ship the change with useful documentation, decisions, and context so the next person can continue without archaeology.",
  },
];
