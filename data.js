export const profile = {
  name: "Ebrar",
  role: "Software Engineer",
  path: "~/engineer/portfolio",
  email: "hello@ebrar.dev",
  github: "https://github.com/ebrardushullovcii",
  linkedin: "https://www.linkedin.com/in/ebrar-dushullovci",
};

export const stack = [
  { tone: "yellow", mark: "⌘", category: "Languages", items: "TypeScript, JavaScript, C#, SQL" },
  { tone: "green", mark: "▱", category: "Frontend", items: "React, Next.js, Tailwind CSS, Expo" },
  { tone: "blue", mark: "▣", category: "Backend", items: "Node.js, .NET Core, REST APIs" },
  { tone: "orange", mark: "◇", category: "Data", items: "SQL Server, PostgreSQL, Redis" },
  { tone: "amber", mark: "⌬", category: "Infra", items: "Docker, NGINX, Linux, GitHub Actions" },
  { tone: "cyan", mark: "⌁", category: "AI Tools", items: "Cursor, agents, vLLM, LiteLLM" },
];

export const workHistory = [
  {
    period: "2021 - Present",
    title: "Senior Software Engineer",
    company: "Product & Platform Systems",
    summary:
      "Building product systems across frontend, backend, QA automation, and AI-assisted developer workflows.",
    details: [
      "Developed restaurant order management flows covering customer ordering, staff tools, kitchen operations, reservations, and management dashboards.",
      "Designed internal QA tooling for dynamic API tests, batch execution, result tracking, and ticket handoff.",
      "Worked on Figma-to-Next.js generation experiments that connect design structures, components, prompts, and validation loops.",
    ],
    stack: "React · Next.js · Node.js · TypeScript · SQL · AI agents",
  },
  {
    period: "2019 - 2021",
    title: "Full-stack Developer",
    company: "Restaurant & Business Software",
    summary:
      "Built ordering, delivery, POS, dashboard, and SQL-backed business application features.",
    details: [
      "Implemented .NET MVC delivery workflows and backend business logic for ordering systems.",
      "Created management views, reporting surfaces, and operational interfaces for business users.",
      "Collaborated across feature planning, implementation, QA, and release follow-through.",
    ],
    stack: "C# · ASP.NET MVC · SQL Server · JavaScript · REST APIs",
  },
  {
    period: "2017 - 2019",
    title: "Software Developer",
    company: "Desktop and Operations Systems",
    summary:
      "Built desktop modules, reporting flows, hardware-adjacent features, and internal tools.",
    details: [
      "Worked on inventory, sales, tax document generation, POS, car repair, and gas pump management modules.",
      "Handled database operations, business rules, and operational debugging for real-world workflows.",
      "Learned to value reliability, readable systems, and boring tools that solve actual problems.",
    ],
    stack: ".NET Framework · SQL Server · Desktop UI · Reporting",
  },
];

export const workProjects = [
  {
    path: "/projects/orderific",
    label: "Featured",
    imageLabel: "order-flow.map",
    summary:
      "Restaurant order management platform for online orders, dine-in workflows, kitchen operations, and staff-side management.",
    details: [
      "Customer panel, service panel, brand management, POS-side tools, and kitchen-side order handling.",
      "Order state handling, frontend workflows, backend logic, API integrations, and team coordination.",
      "Operational dashboard work for restaurant status, revenue, order counts, popular items, and payment distribution.",
    ],
    stack: "React · Next.js · Node.js · SQL · Dashboard UI",
  },
  {
    path: "/projects/testingmill",
    label: "QA Platform",
    imageLabel: "api-test.grid",
    summary:
      "Dynamic API-based testing platform for interfaces, datasets, batch test runs, and result tracking.",
    details: [
      "Organizations provide an API endpoint that returns available test interfaces and parameter definitions.",
      "Users create datasets, run tests individually or in batches, and inspect failures and outcomes.",
      "Connects QA workflows with internal tickets, project systems, and automation loops.",
    ],
    stack: "TypeScript · REST APIs · QA automation · Product planning",
  },
  {
    path: "/projects/figma-to-next",
    label: "AI + Design",
    imageLabel: "figma-tree.render",
    summary:
      "System for converting Figma design structures into generated Next.js frontends and components.",
    details: [
      "Reads Figma JSON/design structures and maps nested components to frontend component trees.",
      "Experiments with prompt engineering, Figma Code Connect, MCP-style tooling, and generated output validation.",
      "Combines frontend architecture, design systems, automation, and AI-assisted code generation.",
    ],
    stack: "Next.js · Figma JSON · AI agents · Design systems",
  },
  {
    path: "/projects/landers-builder",
    label: "Builder",
    imageLabel: "builder-canvas.ui",
    summary:
      "Landing page and website builder for reusable sections, publishing workflows, and marketing pages.",
    details: [
      "Builder-style page creation with reusable sections and frontend rendering patterns.",
      "Focused on page structure management, publishing flows, and builder UX.",
      "Useful overlap between product thinking, design implementation, and frontend systems.",
    ],
    stack: "React · Builder UX · Rendering · Publishing",
  },
];

export const personalProjects = [
  {
    path: "/unemployed",
    label: "Desktop AI",
    imageLabel: "agent-desk.app",
    summary: "Agent-first desktop monorepo for job finding and interview preparation.",
    details: [
      "pnpm workspaces, Turbo, TypeScript, Electron, and React architecture.",
      "Shows agent-oriented product thinking, desktop app structure, and AI-assisted workflow documentation.",
    ],
    stack: "Electron · React · TypeScript · Turbo",
  },
  {
    path: "/clipvault",
    label: "Released Tool",
    imageLabel: "capture-timeline.mp4",
    summary: "Windows game clipping tool with high-quality MP4 capture and separate audio tracks.",
    details: [
      "Uses C++ backend concepts around OBS/libobs and an Electron + React frontend.",
      "Includes system tray recording, monitor capture, NVENC encoding, a modern editor, and portable releases.",
    ],
    stack: "C++ · Electron · React · OBS/libobs",
  },
  {
    path: "/showtracker",
    label: "Mobile App",
    imageLabel: "media-tracker.sync",
    summary: "Cross-platform show, anime, and movie tracker with discovery and episode tracking.",
    details: [
      "Built with Expo, Convex, NativeWind, Zustand, MMKV, and external media APIs.",
      "Covers search, watchlists, schedules, custom lists, stats, and TV/anime/movie integrations.",
    ],
    stack: "Expo · Convex · NativeWind · APIs",
  },
];

export const workflowSteps = [
  {
    title: "Capture & Clarify",
    body:
      "Turn rough notes, screenshots, and requirements into explicit acceptance criteria before building.",
  },
  {
    title: "Plan & Scaffold",
    body:
      "Break down implementation slices, inspect existing patterns, and scaffold the smallest useful structure.",
  },
  {
    title: "Code with AI",
    body:
      "Use agents as accelerators for exploration, implementation, and review while keeping engineering judgment in the loop.",
  },
  {
    title: "Test & Refine",
    body:
      "Run targeted checks, inspect failures, compare screenshots for UI work, and iterate until behavior is verified.",
  },
  {
    title: "Document & Ship",
    body:
      "Leave behind README notes, agent guidance, handoff context, and release-ready evidence.",
  },
];

export const skillModes = [
  {
    id: "frontend-design",
    title: "Frontend Design",
    mode: "visual implementation",
    input: "references, screenshots, product taste",
    output: "polished UI, responsive passes, visual diffs",
  },
  {
    id: "agent-browser",
    title: "Agent Browser",
    mode: "browser verification",
    input: "local app, flows, screenshots",
    output: "snapshots, screenshots, interaction evidence",
  },
  {
    id: "review-collection",
    title: "Review Collection",
    mode: "async review pressure",
    input: "finished slice, changed files, risk areas",
    output: "bugs, regressions, edge cases, cleanup notes",
  },
  {
    id: "improve-codebase-architecture",
    title: "Architecture Scan",
    mode: "system design pass",
    input: "existing repo, domain docs, ADRs",
    output: "refactor targets, seams, testability improvements",
  },
  {
    id: "handoff / to-prd",
    title: "Handoff / PRD",
    mode: "context packaging",
    input: "conversation, plan, implementation state",
    output: "handoff notes, product requirements, next-agent context",
  },
];
