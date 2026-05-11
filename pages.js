import { personalProjects, profile, stack, workHistory, workflowSteps, workProjects } from "./data.js";

const page = process.argv[2];

const pageMeta = {
  work: {
    file: "work.html",
    title: "Work",
    active: "Work",
    eyebrow: "WORK HISTORY",
    heading: "Professional systems, product work, and operations-heavy software.",
    intro:
      "A deeper view of the work behind the dashboard: business applications, internal tools, QA systems, ordering platforms, and AI-assisted delivery workflows.",
  },
  projects: {
    file: "projects.html",
    title: "Projects",
    active: "Projects",
    eyebrow: "PROJECT INDEX",
    heading: "Selected shipped systems and personal products with implementation notes.",
    intro:
      "A compact project map covering professional systems and personal builds. The focus is on useful software, not decorative case studies.",
  },
  workflow: {
    file: "workflow.html",
    title: "Workflow",
    active: "Workflow",
    eyebrow: "AI WORKFLOW",
    heading: "How I use AI without letting it replace engineering judgment.",
    intro:
      "A practical operating loop for turning unclear work into shipped software: clarify, scaffold, code, review, test, document, and ship.",
  },
  about: {
    file: "about.html",
    title: "About",
    active: "About",
    eyebrow: "ABOUT",
    heading: "Practical full-stack engineering across product, tools, QA, and automation.",
    intro:
      "I like direct systems, readable interfaces, and tools that reduce operational drag. The site is designed as a personal engineering command center because that is how I think about the work.",
  },
  contact: {
    file: "contact.html",
    title: "Contact",
    active: "Contact",
    eyebrow: "CONTACT",
    heading: "Reach out for product engineering, internal tools, or AI workflow work.",
    intro:
      "I am open to remote opportunities and practical software projects where the work improves real workflows.",
  },
};

if (!pageMeta[page]) {
  throw new Error(`Unknown page ${page}`);
}

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const nav = ["Overview", "Work", "Projects", "Workflow", "About", "Contact"];
const navHref = {
  Overview: "index.html",
  Work: "work.html",
  Projects: "projects.html",
  Workflow: "workflow.html",
  About: "about.html",
  Contact: "contact.html",
};
const navGlyph = {
  Work: "▤",
  Projects: "▧",
  Workflow: "⌁",
  About: "○",
  Contact: "✉",
};

function sidebar(active) {
  return `
      <aside class="sidebar" aria-label="Profile navigation">
        <div class="pathbar">${profile.path}</div>
        <div class="sidebar-body">
          <div class="identity-block">
            <h1>${profile.name} <span class="status-dot" aria-label="online"></span></h1>
            <p class="role">${profile.role}</p>
            <p class="micro-intro">I build practical software<br />that solves real problems<br />and creates value.</p>
          </div>
          <nav class="nav-list" aria-label="Section navigation">
            <p class="nav-title">NAVIGATION</p>
            ${nav
              .map((item) => {
                const isActive = item === active;
                const marker = item === "Overview" ? '<span class="prompt">&gt;_</span>' : `<span class="nav-glyph">${navGlyph[item]}</span>`;
                return `<a class="nav-item${isActive ? " active" : ""}" href="${navHref[item]}"${isActive ? ' aria-current="page"' : ""}>${marker}<span>${item}</span></a>`;
              })
              .join("\n            ")}
          </nav>
          <section class="sidebar-stack" aria-labelledby="sidebar-stack-title">
            <h2 id="sidebar-stack-title">TECH STACK</h2>
            <div class="sidebar-stack-list">
              ${stack
                .map(
                  (row) =>
                    `<div><span class="stack-icon ${row.tone}">${row.mark}</span><strong>${escapeHtml(row.category)}</strong><p>${escapeHtml(row.items)}</p></div>`,
                )
                .join("\n              ")}
            </div>
          </section>
          <section class="status-panel" aria-labelledby="system-status-title">
            <h2 id="system-status-title">SYSTEM STATUS</h2>
            <dl>
              <div><dt>Focus</dt><dd class="green">Deep Work</dd></div>
              <div><dt>Availability</dt><dd class="green">Open</dd></div>
              <div><dt>Location</dt><dd>Remote</dd></div>
              <div><dt>Last Updated</dt><dd>May 18, 2025</dd></div>
            </dl>
          </section>
          <section class="external-links" aria-label="External links">
            <a href="${profile.github}" target="_blank" rel="noreferrer"><span>⌁ GitHub</span><span class="external-mark">↗</span></a>
            <a href="${profile.linkedin}" target="_blank" rel="noreferrer"><span>▣ LinkedIn</span><span class="external-mark">↗</span></a>
            <a href="assets/references/resume/CV.pdf" target="_blank" rel="noreferrer"><span>▤ Resume (PDF)</span><span class="external-mark">↗</span></a>
          </section>
          <section class="whoami" aria-label="Terminal identity">
            <p>$ whoami</p><span class="terminal-gap" aria-hidden="true"></span><p>&gt; problem-solver</p><p>&gt; builder</p><p>&gt; shipper</p>
          </section>
          <p class="sidebar-footer">© 2025 Ebrar</p>
        </div>
      </aside>`;
}

function shell(meta, content) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${escapeHtml(meta.intro)}" />
    <title>${profile.name} — ${meta.title}</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="app-frame detail-frame">
      ${sidebar(meta.active)}
      <main class="dashboard detail-dashboard">
        <header class="topbar" aria-label="System status"><span></span><p><span class="status-dot small"></span>System Online</p></header>
        <section class="detail-hero">
          <p class="section-label">${meta.eyebrow}</p>
          <h1>${escapeHtml(meta.heading)}<span class="cursor">_</span></h1>
          <p>${escapeHtml(meta.intro)}</p>
        </section>
        ${content}
        <footer class="main-footer"><span></span><p>Built with Next.js and a lot of ☕</p></footer>
      </main>
    </div>
  </body>
</html>`;
}

function workPage() {
  return `
        <section class="detail-grid detail-grid-single">
          ${workHistory
            .map(
              (job) => `
          <article class="detail-card">
            <div class="detail-card-head"><p class="date">${job.period}</p><h2>${job.title}</h2><span>${job.company}</span></div>
            <p>${job.summary}</p>
            <ul class="detail-list">${job.details.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            <p class="tech">${job.stack}</p>
          </article>`,
            )
            .join("\n")}
        </section>`;
}

function projectCard(project) {
  return `
          <article class="detail-card">
            <div class="detail-card-head"><p class="path-title">${project.path}</p>${project.label ? `<span>${project.label}</span>` : ""}</div>
            <p>${project.summary}</p>
            <ul class="detail-list">${project.details.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            <p class="tech">${project.stack}</p>
          </article>`;
}

function personalProjectCard(project) {
  return `
          <article class="detail-card">
            <div class="detail-card-head"><p class="path-title">${project.path}</p></div>
            <p>${project.summary}</p>
            <ul class="detail-list">${project.details.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            <p class="tech">${project.stack}</p>
          </article>`;
}

function projectsPage() {
  return `
        <section class="detail-section">
          <h2 class="section-label">WORK PROJECTS</h2>
          <div class="detail-grid">${workProjects.map(projectCard).join("\n")}</div>
        </section>
        <section class="detail-section">
          <h2 class="section-label">PERSONAL PROJECTS</h2>
          <div class="detail-grid">${personalProjects.map(personalProjectCard).join("\n")}</div>
        </section>`;
}

function workflowPage() {
  return `
        <section class="detail-grid">
          ${workflowSteps
            .map(
              (step, index) => `
          <article class="detail-card workflow-detail-card">
            <p class="date">0${index + 1}</p>
            <h2>${step.title}</h2>
            <p>${step.body}</p>
          </article>`,
            )
            .join("\n")}
        </section>
        <section class="detail-section">
          <div class="detail-card wide-note">
            <p class="path-title">/workflow/operating-rules.txt</p>
            <ul class="detail-list">
              <li>Prefer clear repo instructions, acceptance criteria, and small verifiable changes.</li>
              <li>Use AI for exploration, drafting, refactoring support, screenshot comparison, and review pressure.</li>
              <li>Do not trust generated code without running checks and validating the product behavior.</li>
            </ul>
          </div>
        </section>`;
}

function aboutPage() {
  return `
        <section class="detail-grid">
          <article class="detail-card">
            <p class="path-title">/about/principles.md</p>
            <ul class="detail-list">
              <li>Build practical systems before polishing abstractions.</li>
              <li>Make workflows visible, testable, and easier to operate.</li>
              <li>Keep interfaces dense enough to be useful but structured enough to scan.</li>
            </ul>
          </article>
          <article class="detail-card">
            <p class="path-title">/about/interests.md</p>
            <ul class="detail-list">
              <li>Developer tooling, automation, QA platforms, dashboards, and internal systems.</li>
              <li>AI coding workflows, self-hosted LLM infrastructure, tool calling, and agent guidance.</li>
              <li>Products with real operational users and messy edge cases.</li>
            </ul>
          </article>
        </section>
        <section class="detail-section">
          <div class="detail-card wide-note">
            <p class="path-title">/about/current-direction.txt</p>
            <p>I am focused on becoming sharper at end-to-end product engineering: turning unclear ideas into working software, using AI intentionally, and keeping quality high through verification.</p>
          </div>
        </section>`;
}

function contactPage() {
  return `
        <section class="detail-grid">
          <article class="detail-card contact-detail-card">
            <p class="path-title">/contact/email</p>
            <h2><a href="mailto:${profile.email}">${profile.email}</a></h2>
            <p>Best for opportunities, project conversations, and technical collaboration.</p>
          </article>
          <article class="detail-card contact-detail-card">
            <p class="path-title">/contact/availability</p>
            <h2>Remote / Worldwide</h2>
            <p>Open to full-stack product engineering, internal tooling, QA automation, and AI workflow roles.</p>
          </article>
          <article class="detail-card contact-detail-card">
            <p class="path-title">/contact/links</p>
            <h2>Profiles</h2>
            <p><a class="terminal-link" href="${profile.github}" target="_blank" rel="noreferrer">→ GitHub</a></p>
            <p><a class="terminal-link" href="${profile.linkedin}" target="_blank" rel="noreferrer">→ LinkedIn</a></p>
            <p><a class="terminal-link" href="assets/references/resume/CV.pdf" target="_blank" rel="noreferrer">→ Resume PDF</a></p>
          </article>
        </section>`;
}

const contentByPage = {
  work: workPage,
  projects: projectsPage,
  workflow: workflowPage,
  about: aboutPage,
  contact: contactPage,
};

console.log(shell(pageMeta[page], contentByPage[page]()));
