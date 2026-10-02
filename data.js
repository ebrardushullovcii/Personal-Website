// Single source of truth for the portfolio content. Edit here, then run `npm run build`.

export const profile = {
  firstName: "Ebrar",
  lastName: "Dushullovci",
  name: "Ebrar Dushullovci",
  role: "Senior Full-Stack Software Engineer",
  // The word inside *asterisks* is rendered in the serif italic accent.
  tagline: "I build the software that runs real *operations*.",
  pitch:
    "Seven years of shipping web, desktop, and internal products: real-time restaurant systems, QA automation, business software, and AI-assisted developer tooling. Comfortable anywhere between the interface, the backend, and the operational mess in between.",
  email: "ebrar.dushullovci@gmail.com",
  github: "https://github.com/ebrardushullovcii",
  linkedin: "https://www.linkedin.com/in/ebrar-dushullovci-5b98b420b/",
  resume: "/assets/resume/Ebrar-Dushullovci-Resume.pdf",
  location: "Prishtina, Kosovo",
  timezone: "CET (UTC+1)",
  workMode: "Remote across Europe, UK, and US time zones",
  availability: "Available now",
  updated: "September 2026",
  siteUrl: "https://ebrar-dushullovci.netlify.app",
};

// Real merged pull requests from the public repos, used by the kanban board. Keep titles verbatim.
export const boardTasks = [
  { project: "Nordri", pr: 34, title: "Finish desktop production readiness across Job Finder and Interview Helper", state: "done" },
  { project: "ShowTracker", pr: 148, title: "Finish agent guidance cleanup", state: "done" },
  { project: "ShowTracker", pr: 146, title: "Hide caught-up shared watches until an episode is actionable", state: "review" },
  { project: "ShowTracker", pr: 145, title: "Improve shared watch people picker", state: "review" },
  { project: "ShowTracker", pr: 143, title: "Add watching with others queue", state: "doing" },
  { project: "ClipVault", pr: 32, title: "Release ClipVault 1.7.0", state: "doing" },
  { project: "ShowTracker", pr: 142, title: "Recover canonical coordinates after historical collisions", state: "backlog" },
  { project: "ClipVault", pr: 31, title: "Reduce recording overhead", state: "backlog" },
  { project: "ShowTracker", pr: 138, title: "Retry transient TV Time metadata lookups", state: "backlog" },
  { project: "Nordri", pr: 30, title: "Refresh multimodal resume and visual apply workflows", state: "backlog" },
  { project: "ShowTracker", pr: 137, title: "Fix multilingual TV Time import matching", state: "queue" },
  { project: "Nordri", pr: 24, title: "Ship Job Finder resume catalog, studio UX reset, and truthful preview editing", state: "queue" },
  { project: "ClipVault", pr: 28, title: "Restore tray icon on startup", state: "queue" },
  { project: "ShowTracker", pr: 127, title: "Reconcile TV Time episodes with provider catalogues", state: "queue" },
  { project: "Nordri", pr: 20, title: "Ship source intelligence and faster discovery", state: "queue" },
  { project: "Nordri", pr: 11, title: "Add system-aware desktop light theme", state: "queue" },
  { project: "ClipVault", pr: 23, title: "Repair Windows startup registration", state: "queue" },
  { project: "ShowTracker", pr: 134, title: "Refine signed-in UI and branding", state: "queue" },
];

export const stackGroups = [
  { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "React Native", "Expo", "Electron", "WPF", "WinForms"] },
  { name: "Backend", items: ["Node.js", "Express", "C#", ".NET Core", "ASP.NET Core MVC", "Entity Framework", "REST APIs", "WebSockets", "SignalR", "OAuth and JWT", "Stripe"] },
  { name: "Data and messaging", items: ["SQL Server", "PostgreSQL", "MySQL", "MongoDB", "SQLite", "Convex", "Redis", "RabbitMQ"] },
  { name: "Quality", items: ["Playwright", "Cypress", "Selenium", "Vitest", "xUnit", "NUnit", "API testing"] },
  { name: "Platform", items: ["Docker", "NGINX", "Linux", "AWS (EC2, RDS, S3, Lambda)", "Azure (App Service)", "Terraform", "GitHub Actions"] },
  { name: "AI tooling", items: ["Agents and MCP", "vLLM", "LiteLLM", "Open WebUI", "Prompt and eval design", "Claude Code", "Codex", "OpenCode", "Pi", "Cursor", "GitHub Copilot"] },
  { name: "Also", items: ["C++ (libobs)", "FFmpeg", "Python", "pnpm and Turborepo", "Zod", "OpenAPI", "Figma Code Connect", "ADRs"] },
];

// Honest tiers instead of a badge wall.
export const skillTiers = [
  {
    name: "Daily drivers",
    note: "What I reach for most days and would be hired for.",
    items: ["React", "Next.js", "TypeScript", "Node.js", "C#", ".NET Core", "ASP.NET Core MVC", "Entity Framework", "SQL Server", "PostgreSQL", "REST APIs", "WebSockets", "SignalR", "Tailwind CSS", "shadcn/ui"],
  },
  {
    name: "Ship with confidence",
    note: "Used in production on real projects, less often than the row above.",
    items: ["React Native", "Expo", "Electron", "WPF", "WinForms", "Express", "Redis", "RabbitMQ", "MySQL", "MongoDB", "SQLite", "Convex", "Docker", "NGINX", "Linux", "AWS (EC2, RDS, S3, Lambda)", "Azure (App Service)", "Stripe", "OAuth and JWT", "Playwright", "Cypress", "Selenium", "Vitest", "xUnit", "NUnit", "Figma"],
  },
  {
    name: "Building depth",
    note: "Real projects behind each one, still growing.",
    items: ["C++ (libobs, ClipVault)", "FFmpeg and NVENC", "vLLM and LiteLLM serving", "MCP and agent tooling", "Prompt and eval design", "Python", "Terraform", "Phaser 3"],
  },
  {
    name: "Also fluent in",
    note: "The tools and process around the code.",
    items: ["pnpm and Turborepo", "Git and GitHub", "GitHub Actions", "Zod", "OpenAPI and Swagger", "Postman", "Figma Code Connect", "ADRs and technical docs", "Linear", "Jira", "Notion", "Claude Code", "Codex", "OpenCode", "Pi", "Cursor", "GitHub Copilot"],
  },
];

export const workProjects = [
  {
    id: "orderific",
    index: "01",
    name: "Orderific",
    url: "https://orderific.com",
    mark: "/assets/projects/orderific-mark.png",
    tag: "Real-time operations",
    title: "Restaurant ordering and kitchen platform",
    summary:
      "A connected platform used live in dozens of restaurants every day: customer ordering, service screens, kitchen display, reservations, POS tools, and management dashboards. My work centred on the order flow itself, where a slow or unclear ticket costs a table.",
    points: [
      {
        result: "Tickets reach the kitchen display in under a second, and the platform holds 150+ orders an hour at peak.",
        how: "Kitchen screens used to poll the server every few seconds. Replaced that with a persistent WebSocket channel per venue in React, Next.js, and Node.js, and moved order writes off the request path into a queue so a burst of orders never blocks the next one.",
      },
      {
        result: "About 40% less effort per delivery or payment integration, with three delivery partners onboarded on the new layer.",
        how: "Partners were wired straight into the order flow, so each one meant touching core code. Rebuilt this as one internal order contract with a small adapter per partner, so a new integration is one adapter plus its tests.",
      },
      {
        result: "Kitchen staff task completion on 10-inch tablets rose from 83% to 98% in usability tests.",
        how: "The old screen was a desktop layout squeezed onto a tablet. Rebuilt it with shadcn components: large touch targets, one ticket per card, colour-coded status, and the most common action always one tap away. Measured before and after with the same tasks.",
      },
    ],
    outcomes: [
      { value: "<1s", label: "placement to kitchen" },
      { value: "150+", label: "orders per hour sustained" },
      { value: "98%", label: "kitchen task completion" },
    ],
    stack: "React · Next.js · TypeScript · Node.js · WebSockets · SQL",
    diagram: {
      nodes: [
        { id: "app", x: 10, y: 30, w: 118, label: "Customer app", sub: "web · kiosk" },
        { id: "pos", x: 10, y: 140, w: 118, label: "POS / service", sub: "staff screens" },
        { id: "svc", x: 196, y: 85, w: 128, label: "Order service", sub: "Next.js · WebSockets" },
        { id: "kds", x: 392, y: 30, w: 118, label: "Kitchen display", sub: "< 1 s" },
        { id: "mgmt", x: 392, y: 140, w: 118, label: "Management", sub: "dashboards" },
      ],
      edges: [
        ["app", "svc"],
        ["pos", "svc"],
        ["svc", "kds"],
        ["svc", "mgmt"],
      ],
    },
  },
  {
    id: "testingmill",
    index: "02",
    tag: "QA platform · project lead",
    title: "API-driven QA management platform",
    summary:
      "A testing platform where teams describe test cases in a template engine, run them one at a time or in batches, watch results stream in, and hand every failure straight to ticketing. I led it end to end: API design, frontend, execution engine, reporting, and the QA workflow around it.",
    points: [
      {
        result: "Regression runs went from days of manual work to hours, with several hundred templates in use.",
        how: "QA used to run API checks by hand, one case at a time. A template engine turns their cases into executable API calls, and a custom integration layer runs whole suites on demand or in batches and streams results back live, so a full regression is a button press and the wait is machine time, not people time.",
      },
      {
        result: "One reporting dashboard became the single source of truth for QA and engineering outcomes.",
        how: "Every run writes to a central results store with history, so pass rates, flaky cases, and regressions are read from one place instead of reconstructed from chat threads and spreadsheets.",
      },
      {
        result: "Failed tests create and assign tickets automatically, with no manual triage.",
        how: "A REST integration with the company project-management tool files a ticket for each failure with the request, response, and expected result attached, routed to the owner of that interface.",
      },
    ],
    outcomes: [
      { value: "0", label: "manual triage steps after a failure" },
      { value: "1", label: "source of truth for results" },
      { value: "Lead", label: "from API design to rollout" },
    ],
    stack: "TypeScript · Next.js · REST APIs · QA automation",
    diagram: {
      nodes: [
        { id: "tpl", x: 10, y: 85, w: 112, label: "Test templates", sub: "defined by QA" },
        { id: "api", x: 176, y: 85, w: 112, label: "Generated APIs", sub: "executable" },
        { id: "run", x: 342, y: 30, w: 112, label: "Batch runs", sub: "on demand" },
        { id: "res", x: 342, y: 140, w: 112, label: "Results", sub: "streamed live" },
        { id: "tkt", x: 500, y: 140, w: 112, label: "Ticket", sub: "auto-created" },
      ],
      edges: [
        ["tpl", "api"],
        ["api", "run"],
        ["run", "res"],
        ["res", "tkt"],
      ],
    },
  },
  {
    id: "figma-to-next",
    index: "03",
    tag: "AI + design systems",
    title: "Figma-to-Next.js generation system",
    summary:
      "A generator that reads Figma design structures and produces Next.js component trees, with validation loops instead of one-shot screenshots. It maps nested design data and reusable components into real frontend architecture.",
    points: [
      {
        result: "Roughly halved delivery time on design-heavy pages.",
        how: "Component trees are generated straight from the Figma structure instead of hand-built from screenshots, so engineers start from a working scaffold and spend their time on behaviour rather than layout.",
      },
      {
        result: "Keeps component hierarchy and reuse instead of flattening every screen into static markup.",
        how: "Figma Code Connect maps design components to the existing code components, and the mapper walks the nested design tree so repeated elements become one reusable component with props.",
      },
      {
        result: "Catches drift before review instead of after.",
        how: "A validation loop renders the generated page, diffs it against the design, and feeds the mismatches back to the agent for another pass, rather than trusting a one-shot generation.",
      },
    ],
    outcomes: [
      { value: "Tree", label: "components, not flat screens" },
      { value: "Loop", label: "generate, verify, repeat" },
    ],
    stack: "Next.js · Figma · Design systems · AI agents",
    diagram: {
      nodes: [
        { id: "fig", x: 10, y: 85, w: 112, label: "Figma file", sub: "nested structure" },
        { id: "map", x: 176, y: 85, w: 112, label: "Mapper", sub: "Code Connect · agents" },
        { id: "tree", x: 342, y: 85, w: 112, label: "Component tree", sub: "Next.js" },
        { id: "ver", x: 342, y: 170, w: 112, label: "Visual check", sub: "screenshot diff" },
      ],
      edges: [
        ["fig", "map"],
        ["map", "tree"],
        ["tree", "ver"],
        ["ver", "map"],
      ],
    },
  },
  {
    id: "ai-infrastructure",
    index: "04",
    tag: "Internal platform",
    title: "Self-hosted AI infrastructure for engineering teams",
    summary:
      "Model serving, routing, and access for development teams that need control over latency, cost, and data. Docker-based serving with vLLM, LiteLLM, Open WebUI, and NGINX on GPU servers, plus the guidance that let teams adopt agents and tool-calling safely.",
    points: [
      {
        result: "Model spend well over half lower than hosted APIs, with data kept in-house.",
        how: "Open-weight models served on the team's own GPU servers through vLLM, with LiteLLM routing each request to the cheapest model that handles it and escalating to a hosted API only when needed. Long-context serving and model routing were tuned per workload.",
      },
      {
        result: "One OpenAI-compatible gateway for every tool the team already used.",
        how: "NGINX in front of LiteLLM with auth and TLS, so IDEs, agents, and Open WebUI all point at one endpoint and models can be swapped behind it without touching any client.",
      },
      {
        result: "The team adopted agents and tool-calling without leaking data or budget.",
        how: "Wrote the operating boundaries: which data may leave the network, per-team spend limits on the gateway, and a short playbook for safe tool-calling. Handled the deployment troubleshooting so engineers never had to.",
      },
    ],
    outcomes: [
      { value: "1", label: "OpenAI-compatible gateway" },
      { value: "GPU", label: "servers configured in-house" },
    ],
    stack: "Docker · vLLM · LiteLLM · NGINX · Linux",
    diagram: {
      nodes: [
        { id: "team", x: 10, y: 85, w: 100, label: "Engineers", sub: "IDEs · agents" },
        { id: "gw", x: 160, y: 85, w: 110, label: "NGINX gateway", sub: "auth · TLS" },
        { id: "rt", x: 320, y: 85, w: 100, label: "LiteLLM", sub: "routing" },
        { id: "m1", x: 470, y: 30, w: 100, label: "vLLM", sub: "GPU node A" },
        { id: "m2", x: 470, y: 140, w: 100, label: "vLLM", sub: "GPU node B" },
      ],
      edges: [
        ["team", "gw"],
        ["gw", "rt"],
        ["rt", "m1"],
        ["rt", "m2"],
      ],
    },
  },
];

export const personalProjects = [
  {
    id: "clipvault",
    name: "ClipVault",
    status: "Shipped · v1.8.0",
    url: "https://getclipvault.netlify.app",
    repo: "https://github.com/ebrardushullovcii/ClipVault",
    primary: { label: "Website", href: "https://getclipvault.netlify.app" },
    mark: "/assets/projects/clipvault-mark.png",
    image: "/assets/projects/clipvault.jpg",
    imageAlt: "ClipVault editor trimming a League of Legends clip with separate desktop and microphone audio tracks",
    loop: { src: "/assets/projects/clipvault-loop.mp4", poster: "/assets/projects/clipvault-loop.jpg", pos: "50% 50%" },
    film: { src: "/assets/projects/clipvault-film.mp4", poster: "/assets/projects/clipvault-film.jpg", seconds: 35 },
    summary:
      "A free, open-source game-clipping app for Windows. A rolling buffer keeps the last two minutes of play; press the hotkey and they are saved as an MP4 with separate game and microphone tracks, ready to trim and export small enough to post.",
    points: [
      "C++ capture backend on libobs with NVENC hardware encoding and x264 fallback.",
      "Electron and React editor with a clip library, trimming, tagging, favourites, and export.",
      "Sixteen public releases with installer and portable builds.",
    ],
    stack: "C++ · libobs · Electron · React · FFmpeg",
  },
  {
    id: "showtracker",
    name: "ShowTracker",
    status: "Live on the web",
    url: "https://showtrackerapp.netlify.app",
    repo: "https://github.com/ebrardushullovcii/ShowTracker",
    primary: { label: "Open the app", href: "https://showtrackerapp.netlify.app" },
    mark: "/assets/projects/showtracker-mark.png",
    image: "/assets/projects/showtracker.jpg",
    imageAlt: "ShowTracker home watchlist with shows in progress and a shared watch queue",
    loop: { src: "/assets/projects/showtracker-loop.mp4", poster: "/assets/projects/showtracker.jpg" },
    film: { src: "/assets/projects/showtracker-film.mp4", poster: "/assets/projects/showtracker-film.jpg", seconds: 38 },
    summary:
      "A TV, anime, and movie tracker built as a faster, cleaner alternative to TV Time: one queue that remembers where you left off and tells you what airs next, from one Expo codebase for web, iOS, and Android.",
    points: [
      "Discovery, episode tracking, watchlists, schedule projections, custom lists, imports, and statistics.",
      "Realtime Convex backend with four media providers normalised behind one data model.",
      "A schedule-confidence reconciler on a small server keeps release dates correct without heavy database reads.",
    ],
    stack: "Expo · React Native · TypeScript · Convex · NativeWind",
  },
  {
    id: "nordri",
    name: "Nordri",
    status: "In development",
    url: "https://nordri.netlify.app",
    repo: "https://github.com/ebrardushullovcii/Nordri",
    primary: { label: "Website", href: "https://nordri.netlify.app" },
    mark: "/assets/projects/nordri-mark.png",
    image: "/assets/projects/nordri.jpg",
    imageAlt: "Nordri Job Finder with job results, fit scores, and the details of a selected job, on sample data",
    loop: { src: "/assets/projects/nordri-loop.mp4", poster: "/assets/projects/nordri-loop.jpg", zoom: 1.18 },
    film: { src: "/assets/projects/nordri-film.mp4", poster: "/assets/projects/nordri-film.jpg", seconds: 38 },
    summary:
      "A local-first desktop app for job search. Job Finder searches the sites you choose in its own browser, shows how well each job fits and why, tailors a resume per job, and fills in applications in the mode you pick. Live Assistant helps during the interview itself.",
    points: [
      "Thirteen-package TypeScript monorepo with typed IPC boundaries and 40 architecture decision records.",
      "Source-generic browser automation and AI evaluation harnesses keep the agents honest.",
      "Everything stays on the user's computer, and sign-in, security checks, and account creation always pause for the user.",
    ],
    stack: "Electron · React · TypeScript · SQLite · Playwright",
  },
];

// Hero collage, front to back. Orderific (my day-to-day product work) leads; ClipVault sits at the back.
export const heroShots = [
  {
    id: "orderific",
    name: "Orderific",
    status: "Live in restaurants",
    url: "https://orderific.com",
    image: "/assets/projects/orderific.jpg",
    imageAlt: "Orderific restaurant dashboard with sales progress, new customers, weekly stats and latest orders, from Orderific's public site",
    pan: true,
  },
  ...["nordri", "showtracker"].map((id) => personalProjects.find((project) => project.id === id)),
  // Tucked behind the others, so only a narrow band shows: label it with the version alone.
  ((clipvault) => ({ ...clipvault, status: clipvault.status.split(" · ").pop() }))(personalProjects.find((project) => project.id === "clipvault")),
];

export const smallProjects = [
  {
    name: "global-agent-skills",
    url: "https://github.com/ebrardushullovcii/global-agent-skills",
    summary: "Reusable review, prototyping, and handoff workflows for AI coding agents, with install and sync scripts.",
  },
  {
    name: "Arcane Survivors",
    url: "https://github.com/ebrardushullovcii/RogueLike",
    summary: "A small Vampire Survivors-style browser game in Phaser 3 and TypeScript with weapons, upgrades, and waves.",
  },
];

export const experience = [
  {
    period: "Jul 2023 – Present",
    years: "2023 →",
    start: "2023-07",
    end: null,
    title: "Senior Full-Stack Software Engineer",
    company: "AutomatedPros",
    mode: "Full-time · Remote",
    current: true,
    summary:
      "Primary engineer on Orderific, a restaurant operations platform used daily by dozens of restaurants, then lead on the QA automation platform and the team's AI tooling. I own features from API design to the screens staff use during service.",
    points: [
      {
        result: "Kitchen tickets in under a second, 150+ orders an hour at peak.",
        how: "Replaced kitchen screens that polled the server every few seconds with a persistent WebSocket channel per venue, and moved order writes off the request path into a queue so a burst of orders never blocks the next one. Removed the manual order calls between floor and kitchen.",
      },
      {
        result: "About 40% less effort per delivery or payment integration, with three delivery partners onboarded on it.",
        how: "Partners used to be wired directly into the order flow, so each one meant touching core code. Rebuilt this as one internal order contract with a small adapter per partner, so a new integration is one adapter plus its tests.",
      },
      {
        result: "Kitchen tablet task completion from 83% to 98% in staff usability tests.",
        how: "The old screen was a desktop layout squeezed onto a 10-inch tablet. Rebuilt it with shadcn components: large touch targets, one ticket per card, colour-coded status, and the most common action always one tap away. Measured before and after with the same tasks.",
      },
      {
        result: "Led the QA management platform end to end; regression runs went from days to hours.",
        how: "QA used to run API checks by hand, one case at a time. Now they write cases in templates, the platform turns them into executable API calls, runs suites on demand or in batches with live results, and files a ticket in the project-management tool for every failure. Several hundred templates are in use.",
      },
      {
        result: "Roughly halved delivery time on design-heavy pages with the Figma-to-Next.js generator.",
        how: "Component trees are generated straight from the Figma structure instead of hand-built from screenshots, and a visual-diff loop catches drift before review, so engineers spend their time on behaviour rather than layout.",
      },
      {
        result: "Self-hosted AI infrastructure for the team, with model spend well over half lower than hosted APIs.",
        how: "Open-weight models served on the team's own GPU servers through vLLM, LiteLLM routing each request to the cheapest model that handles it and escalating to a hosted API only when needed, Open WebUI and an OpenAI-compatible gateway behind NGINX. Wrote the guidelines for using agents and tool-calling without leaking data or budget.",
      },
      {
        result: "Review most frontend pull requests and set the team's component and testing conventions.",
      },
    ],
  },
  {
    period: "Jan 2022 – Present",
    years: "2022 →",
    start: "2022-01",
    end: null,
    title: ".NET Consultant",
    company: "Infotech L.L.C",
    mode: "Part-time · Remote",
    current: true,
    summary:
      "Retained by my former employer, alongside my primary role, for architecture reviews, performance work, incident response, and mentoring on the .NET business systems I originally helped build.",
    points: [
      {
        result: "Query response times down by up to 60% in critical workflows; the end-of-day reporting job went from minutes to seconds.",
        how: "Profiled the slowest workflows with SQL Server execution plans, added the missing indexes, replaced row-by-row loops and N+1 patterns with set-based queries, and moved the heaviest reports to precomputed tables refreshed on a schedule.",
      },
      {
        result: "AWS hosting costs down 15%.",
        how: "Audits found oversized instances running around the clock plus unused storage and snapshots. Right-sized the instances, scheduled non-production environments to shut down out of hours, and cleaned up the leftovers.",
      },
      {
        result: "Onboarding for six junior developers from four weeks to ten days.",
        how: "Replaced learn-by-asking with written playbooks for the codebase, environments, and release process, plus scheduled pairing in the first two weeks so new developers ship a real change in week one.",
      },
      {
        result: "Business-critical services restored within two hours of an incident, 99.9% uptime.",
        how: "Runbooks for the recurring failure types and a rollback path for every deployment, so most incidents are a known fix rather than a fresh investigation.",
      },
      {
        result: "Planned the upgrade path from .NET Framework to modern .NET for the core suite.",
      },
    ],
  },
  {
    period: "Nov 2021 – Jul 2023",
    years: "2021 – 23",
    start: "2021-11",
    end: "2023-07",
    title: "Chief Experience Officer",
    company: "AutomatedPros",
    mode: "Leadership",
    summary:
      "Ran customer experience and the QA team, sitting between support, QA, product, and engineering. Returned to hands-on engineering by choice once the function ran without me.",
    points: [
      {
        result: "Grew the QA team from two to five and chose its testing tools, automation frameworks, and bug-tracking setup.",
      },
      {
        result: "Escaped defects reaching customers down around 40%.",
        how: "Introduced a release-readiness checklist, automated the regression suite for the highest-traffic flows, and made QA sign-off a gate before release rather than a step after it.",
      },
      {
        result: "Customer satisfaction lifted into the 90s.",
        how: "Support tooling integrated with the management system put the customer's setup and order history on the agent's screen, cutting the back-and-forth per ticket, and recurring complaints were routed into the product backlog so the same issue stopped coming back.",
      },
      {
        result: "Turned support and QA findings into a prioritised product backlog the development team worked from.",
      },
    ],
  },
  {
    period: "Aug 2019 – Jan 2022",
    years: "2019 – 22",
    start: "2019-08",
    end: "2022-01",
    title: ".NET Developer",
    company: "Infotech L.L.C",
    mode: "Full-time · Hybrid",
    summary:
      "Developed and maintained a .NET desktop business-management suite used by over a hundred businesses: shops, restaurants, repair garages, and fuel stations. Inventory, sales, tax documents, POS, restaurant orders, and hardware control.",
    points: [
      {
        result: "Car-repair parts screen from 15 seconds to 2 seconds (87%).",
        how: "It loaded the full catalogue and filtered on the client. Rewrote it to query only matching parts with proper indexes, paginate results, and cache the reference lists, so the first results show almost instantly.",
      },
      {
        result: "Invoicing, reporting, and tax documents automated on one data model.",
        how: "Invoices and tax documents were assembled by hand from sales records. Generating them from the same data as live sales and inventory removed the re-typing and the mismatches between sales, stock, and finance.",
      },
      {
        result: "Remote fuel-pump activation and deactivation with safety protocols, live at multiple stations, plus restaurant order tracking with kitchen workflows and billing.",
      },
      {
        result: "Project lead on a .NET MVC logistics and delivery web application.",
        how: "Registration, order placement, real-time tracking, and a database tuned for high order volumes.",
      },
    ],
  },
  {
    period: "Jan 2019 – Jul 2019",
    years: "2019",
    start: "2019-01",
    end: "2019-07",
    title: ".NET Developer",
    company: "CREA-KO",
    mode: "Full-time",
    summary:
      "First developer role, on the team migrating a web-based ERP used across the company's client base from .NET Framework to .NET Core MVC, refactoring both front end and back end.",
    points: [
      {
        result: "Cleared 100+ security warnings from CI builds.",
        how: "Replaced the 12 deprecated NuGet packages first so the rest of the migration built cleanly.",
      },
      {
        result: "Migration blockers cleared two weeks ahead of cut-over.",
        how: "Split the remaining compatibility fixes across the four developers by module so nobody blocked anyone else.",
      },
    ],
  },
];

// Dated milestones for the chronology views.
export const milestones = [
  { date: "2016-05", label: "First job: call centre and sales", detail: "Tregi Kosovo. Learned to listen for the real problem.", kind: "earlier" },
  { date: "2017-06", label: "Technical support, Bit by Bit", detail: "IPTV incidents at 40+ tickets a day, 92% first-call resolution.", kind: "earlier" },
  { date: "2017-12", label: "Digital marketing and project management, Beautyque", detail: "Ran e-commerce and landing-site projects, cut post-launch defects by 40%.", kind: "earlier" },
  { date: "2019-01", label: "Became a developer", detail: "CREA-KO, migrating an ERP from .NET Framework to .NET Core MVC.", kind: "career" },
  { date: "2021-11", label: "Chief Experience Officer", detail: "Led customer experience and the QA team at AutomatedPros.", kind: "career" },
  { date: "2023-07", label: "Back to hands-on engineering", detail: "Senior Full-Stack Software Engineer at AutomatedPros.", kind: "career" },
  {
    date: "2025-09",
    label: "Arcane Survivors",
    status: "Prototype",
    detail: "A Vampire Survivors-style browser game in Phaser 3 and TypeScript: two classes, auto-attacking weapons, upgrades, and waves. Built for fun.",
    kind: "project",
    url: "https://github.com/ebrardushullovcii/RogueLike",
    image: "/assets/projects/arcane.jpg",
  },
  {
    date: "2026-01",
    label: "ClipVault",
    status: "Shipped · v1.8.0",
    detail: "Windows game-clipping tool: a C++ capture backend on libobs with an Electron and React editor. Sixteen public releases so far.",
    kind: "project",
    url: "https://getclipvault.netlify.app",
    image: "/assets/projects/clipvault.jpg",
    mark: "/assets/projects/clipvault-mark.png",
  },
  {
    date: "2026-02",
    label: "ShowTracker",
    status: "Live on the web",
    detail: "Cross-platform TV, anime, and movie tracker on Expo and Convex, from one codebase for web, iOS, and Android.",
    kind: "project",
    url: "https://showtrackerapp.netlify.app",
    image: "/assets/projects/showtracker.jpg",
    mark: "/assets/projects/showtracker-mark.png",
  },
  {
    date: "2026-03",
    label: "Nordri",
    status: "In development",
    detail: "Local-first desktop app for job search: fit you can check, a tailored resume per job, and applications filled in the mode you pick. Renamed from UnEmployed in September 2026.",
    kind: "project",
    url: "https://nordri.netlify.app",
    image: "/assets/projects/nordri.jpg",
    mark: "/assets/projects/nordri-mark.png",
  },
  { date: "2026-09", label: "Available now", detail: "Open to senior full-stack and product engineering roles.", kind: "now" },
];

export const earlierRoles =
  "Before engineering: project management and digital marketing at Beautyque (2017–2018) and technical support at Bit by Bit (2017). Those years are why I care about the people who operate the software.";

export const workflow = [
  { title: "Start from the source of truth", body: "Code, live behaviour, logs, screenshots, and the people closest to the workflow, before any abstraction." },
  { title: "Make the slice explicit", body: "Acceptance criteria, interfaces, and risks, then the smallest sequence of changes that proves the idea." },
  { title: "Build with leverage", body: "AI agents and automation for exploration and implementation. Architecture, security, and product judgment stay hands-on." },
  { title: "Verify the real outcome", body: "Focused tests, product inspection, and side-by-side screenshots for UI work until nothing visible is off." },
  { title: "Leave the system clearer", body: "Documentation, decisions, and handoff context so the next person can continue without archaeology." },
];

export const about = {
  quote: "I understand the *workflow* before I abstract the software.",
  lead:
    "I started in technical support and project work, moved into .NET development in 2019, led customer experience and QA for two years, and came back to hands-on engineering because building is where I do my best work.",
  body:
    "That path made me comfortable with users, edge cases, and problems that cross team boundaries. I am most useful when the brief is incomplete, the workflow has real constraints, and the product needs someone who can move between the interface and the implementation.",
  facts: [
    { label: "Languages", value: "English (C2), Albanian (native)" },
    { label: "Education", value: "BSc Computer Science, Riinvest College" },
    { label: "Based in", value: "Prishtina, Kosovo · CET" },
    { label: "Off the clock", value: "Building my own tools, cooking over charcoal, games, and walks with Yuna the Pomeranian" },
  ],
};

export const contact = {
  heading: "Let's talk about your *product*.",
  body:
    "Open to senior full-stack and product engineering roles, remote or hybrid across Europe. A few lines about the product, the team, and what you need is the best way to start.",
  fit: [
    "Full-stack product engineering",
    "Internal tools and QA automation",
    "Desktop and cross-platform products",
    "AI-assisted delivery systems",
  ],
};
