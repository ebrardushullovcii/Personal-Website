import { personalProjects, profile, stack, workHistory, workflowSteps, workProjects } from "./data.js";

const page = process.argv[2];
const siteVersion = "20260712-8";
const pageHref = (file, fragment = "") => `${file}?v=${siteVersion}${fragment ? `#${fragment}` : ""}`;

const pageMeta = {
  work: {
    title: "Work",
    active: "Work",
    eyebrow: "WORK HISTORY",
    heading: "Software shaped by real operations, not demo data.",
    intro:
      "My work spans restaurant systems, QA automation, business software, product operations, and developer tooling. The common thread is making complex workflows understandable and dependable.",
  },
  projects: {
    title: "Projects",
    active: "Projects",
    eyebrow: "PROJECT INDEX",
    heading: "Selected systems, products, and implementation stories.",
    intro:
      "Professional work shows the workflows I have helped solve. Personal projects show what I choose to build when I own the product, architecture, and finish line.",
  },
  workflow: {
    title: "Workflow",
    active: "Workflow",
    eyebrow: "HOW I WORK",
    heading: "AI adds leverage. Engineering judgment keeps the work honest.",
    intro:
      "I use agents and automation throughout delivery, and build self-hosted model infrastructure when control, latency, or routing makes it useful. The operating loop around the tools still matters most.",
  },
  about: {
    title: "About",
    active: "About",
    eyebrow: "ABOUT",
    heading: "I understand the workflow before I abstract the software.",
    intro:
      "My path began in support and project work, moved into software engineering, then customer-experience leadership, and returned to hands-on engineering. It made me comfortable with users, edge cases, and the reality behind a feature request.",
  },
  contact: {
    title: "Contact",
    active: "Contact",
    eyebrow: "CONTACT",
    heading: "Have a difficult workflow or a useful product to ship?",
    intro:
      "I am interested in full-stack product engineering, internal tools, QA automation, desktop products, and practical AI-assisted development work.",
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
  Overview: pageHref("index.html"),
  Work: pageHref("work.html"),
  Projects: pageHref("projects.html"),
  Workflow: pageHref("workflow.html"),
  About: pageHref("about.html"),
  Contact: pageHref("contact.html"),
};
const navIcon = {
  Work: "icon-briefcase",
  Projects: "icon-folder-git",
  Workflow: "icon-git-branch",
  About: "icon-user",
  Contact: "icon-mail",
};

function sidebar(active) {
  return `
      <aside class="sidebar" aria-label="Profile navigation">
        <div class="pathbar">${profile.path}</div>
        <div class="sidebar-body">
          <div class="sidebar-primary">
            <div class="identity-block">
            <p class="identity-name">${profile.name} <span class="status-dot" role="img" aria-label="Available for conversation"></span></p>
            <p class="role">${profile.role}</p>
            <p class="micro-intro">Product-minded engineering<br />for real operational<br />workflows.</p>
            </div>
            <nav class="nav-list" aria-label="Section navigation">
            <p class="nav-title">NAVIGATION</p>
            ${nav
              .map((item) => {
                const isActive = item === active;
                const marker = item === "Overview" ? '<span class="prompt" aria-hidden="true">&gt;_</span>' : `<span class="nav-glyph icon-mask ${navIcon[item]}" aria-hidden="true"></span>`;
                return `<a class="nav-item${isActive ? " active" : ""}" href="${navHref[item]}"${isActive ? ' aria-current="page"' : ""}>${marker}<span>${item}</span></a>`;
              })
              .join("\n            ")}
            </nav>
          </div>
          <section class="sidebar-stack" aria-labelledby="sidebar-stack-title">
            <h2 id="sidebar-stack-title">CORE STACK</h2>
            <div class="sidebar-stack-list">
              ${stack
                .map(
                  (row) =>
                    `<div><span class="stack-icon icon-mask ${row.icon} ${row.tone}" aria-hidden="true"></span><strong>${escapeHtml(row.category)}</strong><p>${escapeHtml(row.items)}</p></div>`,
                )
                .join("\n              ")}
            </div>
          </section>
          <section class="status-panel" aria-labelledby="system-status-title">
            <h2 id="system-status-title">CURRENT STATUS</h2>
            <dl>
              <div><dt>Focus</dt><dd class="green">Product engineering</dd></div>
              <div><dt>Availability</dt><dd class="green">Let's talk</dd></div>
              <div><dt>Location</dt><dd>${profile.location}</dd></div>
              <div><dt>Updated</dt><dd>${profile.updated}</dd></div>
            </dl>
          </section>
          <section class="external-links" aria-label="External links">
            <a href="${profile.github}" target="_blank" rel="noreferrer"><span><span class="icon-mask icon-github" aria-hidden="true"></span>GitHub</span><span class="external-mark icon-mask icon-external" aria-hidden="true"></span></a>
            <a href="${profile.linkedin}" target="_blank" rel="noreferrer"><span><span class="icon-mask icon-linkedin" aria-hidden="true"></span>LinkedIn</span><span class="external-mark icon-mask icon-external" aria-hidden="true"></span></a>
            <a href="assets/resume/Ebrar-Dushullovci-Resume.pdf" target="_blank" rel="noreferrer"><span><span class="icon-mask icon-file" aria-hidden="true"></span>Resume (PDF)</span><span class="external-mark icon-mask icon-external" aria-hidden="true"></span></a>
          </section>
          <section class="whoami" aria-label="Working style">
            <p>$ working_style</p><span class="terminal-gap" aria-hidden="true"></span><p>&gt; product-minded</p><p>&gt; systems-oriented</p><p>&gt; evidence-driven</p>
          </section>
          <p class="sidebar-footer">© 2026 Ebrar Dushullovci</p>
        </div>
      </aside>`;
}

function shell(meta, content) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta name="description" content="${escapeHtml(meta.intro)}" />
    <meta name="author" content="Ebrar Dushullovci" />
    <meta name="theme-color" content="#02070b" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Ebrar Dushullovci — ${meta.title}" />
    <meta property="og:description" content="${escapeHtml(meta.intro)}" />
    <meta name="twitter:card" content="summary" />
    <title>Ebrar Dushullovci — ${meta.title}</title>
    <link rel="preload" href="assets/fonts/JetBrainsMono.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="stylesheet" href="styles.css?v=${siteVersion}" />
  </head>
  <body>
    <a class="skip-link" href="#main-content">Skip to content</a>
    <div class="app-frame detail-frame">
      ${sidebar(meta.active)}
      <main id="main-content" class="dashboard detail-dashboard">
        <header class="topbar" aria-label="Site status"><span>/${meta.title.toLowerCase()}</span><p><span class="status-dot small" aria-hidden="true"></span>Available for conversation</p></header>
        <section class="detail-hero">
          <p class="section-label">${meta.eyebrow}</p>
          <h1>${escapeHtml(meta.heading)}<span class="cursor">_</span></h1>
          <p>${escapeHtml(meta.intro)}</p>
        </section>
        ${content}
        <footer class="main-footer"><span>/${meta.title.toLowerCase()}/end</span><p>© 2026 Ebrar Dushullovci</p></footer>
      </main>
    </div>
  </body>
</html>`;
}

function workPage() {
  return `
        <section class="work-timeline-section" aria-label="Professional experience">
          <div class="work-timeline-rail" aria-hidden="true"></div>
          ${workHistory
            .map(
              (job, index) => `
          <article class="work-timeline-item${index < 2 ? " current" : ""}">
            <div class="work-date"><span>${escapeHtml(job.period)}</span></div>
            <div class="work-body">
              <p class="path-title">/${escapeHtml(job.slug)}</p>
              <div class="role-line"><h2>${escapeHtml(job.title)}</h2><p class="company-name">@ ${escapeHtml(job.company)}</p><span class="role-mode">${escapeHtml(job.mode)}</span></div>
              <p>${escapeHtml(job.summary)}</p>
              <ul class="detail-list">${job.details.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
              <p class="tech">${escapeHtml(job.stack)}</p>
            </div>
          </article>`,
            )
            .join("\n")}
        </section>
        <section class="detail-section side-quests-section">
          <div class="section-heading-row"><h2 class="section-label">EARLIER ROLES</h2><p>One card, several useful detours</p></div>
          <div class="side-quest-card">
            <p class="path-title">/work/useful-detours</p>
            <div class="side-quest-list">
              <article><span>2017 - 2018 · Beautyque</span><h3>Project &amp; digital marketing work</h3><p>Ran small web projects, campaigns, QA checklists, and stakeholder coordination—an early lesson in shipping to an outcome, not just a spec.</p></article>
              <article><span>2017 · Bit by Bit</span><h3>Technical support</h3><p>Resolved high-volume IPTV incidents and wrote troubleshooting steps, which made clear communication and reproducible debugging second nature.</p></article>
              <article><span>2016 · Tregi Kosovo</span><h3>Call center &amp; sales</h3><p>Learned to listen for the actual problem, explain clearly, and stay useful when the conversation is messy.</p></article>
            </div>
            <a class="terminal-link" href="assets/resume/Ebrar-Dushullovci-Resume.pdf" target="_blank" rel="noreferrer">→ Open the full chronology</a>
          </div>
        </section>`;
}

function projectVisual(project, index) {
  const visual = project.visual;
  const iconStrip = visual.icons?.length
    ? `<div class="visual-icon-strip" aria-hidden="true">${visual.icons.map((icon) => `<span class="icon-mask ${icon}"></span>`).join("")}</div>`
    : "";
  const media = visual.kind === "image"
    ? `<img class="project-screenshot${visual.fit ? ` ${visual.fit}` : ""}" src="${visual.image}" alt="${escapeHtml(visual.alt)}" loading="lazy" decoding="async" />${iconStrip}`
    : `<div class="project-tech-visual" aria-hidden="true">${visual.icons.map((icon) => `<span class="project-tech-tile"><i class="icon-mask ${icon}"></i></span>`).join("")}</div>`;
  const credit = visual.credit
    ? `<span class="media-credit"><a href="${visual.credit.href}" target="_blank" rel="noreferrer"><img src="${visual.credit.logo}" alt="${escapeHtml(visual.credit.alt)}" /></a><span>${escapeHtml(visual.credit.text)}</span></span>`
    : "";

  return `<figure class="project-visual visual-${visual.kind}${visual.credit ? " has-credit" : ""}">
              <div class="visual-topline"><span>${escapeHtml(visual.label)}</span><span>${String(index + 1).padStart(2, "0")}</span></div>
              <div class="visual-media">${media}</div>
              <figcaption><span>${escapeHtml(visual.caption)}</span>${credit}</figcaption>
            </figure>`;
}

function projectRow(project, type, index) {
  const projectId = project.path.split("/").filter(Boolean).at(-1);
  const title = project.url
    ? `<a href="${project.url}" target="_blank" rel="noreferrer">${escapeHtml(project.path)}<span class="external-mark icon-mask icon-external" aria-hidden="true"></span></a>`
    : escapeHtml(project.path);
  return `
          <article id="${escapeHtml(projectId)}" class="project-row ${index % 2 === 1 ? "image-left" : "image-right"} ${type}-project-row">
            <div class="project-row-copy">
              <div class="detail-card-head"><h2 class="path-title">${title}</h2>${project.label ? `<span>${escapeHtml(project.label)}</span>` : ""}</div>
              <p class="project-summary">${escapeHtml(project.summary)}</p>
              <ul class="detail-list">${project.details.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
              <p class="tech">${escapeHtml(project.stack)}</p>
            </div>
            ${projectVisual(project, index)}
          </article>`;
}

function projectsPage() {
  return `
        <section class="project-rows-section">
          <div class="section-heading-row"><h2 class="section-label">PROFESSIONAL SYSTEMS</h2><p>Selected contribution areas</p></div>
          <div class="project-row-list work-project-list">${workProjects.map((project, index) => projectRow(project, "work", index)).join("\n")}</div>
        </section>
        <section id="personal" class="project-rows-section personal-project-section">
          <div class="section-heading-row"><h2 class="section-label">PERSONAL PRODUCTS</h2><p>Public repositories</p></div>
          <div class="project-row-list personal-project-list">${personalProjects.map((project, index) => projectRow(project, "personal", index + workProjects.length)).join("\n")}</div>
        </section>`;
}

function workflowPage() {
  return `
        <section class="workflow-intro" aria-label="Workflow principles">
          <article class="workflow-intro-copy">
            <p class="path-title">/workflow/quality-loop.md</p>
            <h2>Context → slice → build → verify → leave clarity behind.</h2>
            <p>The point of AI-assisted development is not to generate more code. It is to shorten the distance between a real problem and a verified solution without losing the reasoning that makes the system maintainable.</p>
          </article>
          <dl class="workflow-contract">
            <div><dt>AI LENDS SPEED</dt><dd>Exploration, repetitive edits, scaffolding, comparison, summarization, and review pressure.</dd></div>
            <div><dt>JUDGMENT STAYS HUMAN</dt><dd>Product decisions, architecture, security boundaries, trade-offs, final copy, and acceptance.</dd></div>
            <div><dt>DONE LEAVES EVIDENCE</dt><dd>Working behavior, visual checks, understood risks, and enough context for the next person.</dd></div>
          </dl>
        </section>
        <section class="workflow-map-section" aria-labelledby="operating-loop-title">
          <div class="section-heading-row"><h2 id="operating-loop-title" class="section-label">OPERATING LOOP</h2><p>Follow the signal, not a rigid ceremony</p></div>
          <figure class="workflow-map">
            <figcaption class="workflow-core">
              <p class="path-title">/loop/quality-gate</p>
              <h2>Evidence decides what happens next.</h2>
              <p>Every pass either reduces uncertainty, proves the slice, or sends the work back around with better context.</p>
            </figcaption>
            <div class="workflow-track" aria-hidden="true"></div>
            <span class="workflow-signal" aria-hidden="true"></span>
            <ol class="workflow-nodes">
            ${workflowSteps
              .map(
                (step, index) => `
              <li class="workflow-node node-${index + 1}">
                <span>${step.number}</span>
                <div><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.body)}</p></div>
              </li>`,
              )
              .join("\n")}
            </ol>
          </figure>
        </section>
        <section class="review-router-section">
          <div class="section-heading-row"><h2 class="section-label">REVIEW MODES</h2><p>Pressure before confidence</p></div>
          <div class="review-router">
            <div class="review-router-copy"><p class="path-title">$ route --review</p><h3>Use the review that matches the uncertainty.</h3><p>Not every change needs the same ceremony. The risky or unclear part determines the pressure test.</p></div>
            <div class="review-routes">
              <article><span>IF THE PLAN IS FUZZY</span><h3>GRILL ME</h3><p>Interrogate assumptions, terminology, constraints, and trade-offs until the decision tree is clear enough to build.</p></article>
              <article><span>IF CODE EXISTS</span><h3>CODE QUALITY REVIEW</h3><p>Inspect correctness, security, architecture, edge cases, regressions, and maintenance cost—not just formatting.</p></article>
              <article><span>IF PEOPLE WILL SEE IT</span><h3>VISUAL QA</h3><p>Compare real browser screenshots at desktop and mobile sizes, fix visible mismatches, and repeat after meaningful changes.</p></article>
              <article><span>IF WORK CHANGES HANDS</span><h3>HANDOFF</h3><p>Package decisions, verification evidence, follow-ups, and current state for the next person or agent.</p></article>
            </div>
          </div>
        </section>`;
}

function aboutPage() {
  return `
        <section class="about-story-section">
          <article class="about-lead">
            <p class="path-title">/about/the-through-line.md</p>
            <h2>Make the complicated part clear enough to build, use, and operate.</h2>
            <p>My path began in support and project work, moved into software engineering, then customer-experience leadership, and returned to hands-on engineering. That range is useful when a problem crosses team or system boundaries—which the interesting ones usually do.</p>
            <p>I am most at home when the brief is incomplete, the workflow has real edge cases, and the product needs someone who can move between user experience and implementation detail.</p>
          </article>
          <div class="about-facts">
            <article class="about-fact-block">
              <p class="path-title">/about/what-i-build</p>
              <ul class="detail-list">
                <li>Operational products where state, timing, and clarity matter.</li>
                <li>Internal tools that replace repeated manual work.</li>
                <li>Desktop and cross-platform products with real technical constraints.</li>
              </ul>
            </article>
            <article class="about-fact-block">
              <p class="path-title">/about/what-i-value</p>
              <ul class="detail-list">
                <li>Readable systems and explicit trade-offs.</li>
                <li>Small feedback loops and evidence over assumption.</li>
                <li>Useful documentation for both humans and agents.</li>
              </ul>
            </article>
          </div>
        </section>
        <section class="personal-notes-section" aria-labelledby="personal-notes-title">
          <article class="personal-notes-lead">
            <p class="path-title">/about/offline.log</p>
            <h2 id="personal-notes-title">A clean setup, a new tool to test, and Yuna nearby.</h2>
            <p>Away from client work, I like things that feel intentional: a calm desk, well-tuned software, cold weather, good food over charcoal, and enough time to get properly absorbed in a game.</p>
          </article>
          <div class="personal-notes-log">
            <article><span>01 · YUNA</span><h3>Small dog, strong opinions</h3><p>Yuna is my small golden Pomeranian and a very effective reminder that focused work still needs walk breaks.</p></article>
            <article><span>02 · SETUP</span><h3>Clean desk, tuned tools</h3><p>I switch between macOS and Windows, keep a tidy dual-monitor setup, and care far too much about keyboards, audio, terminals, and tiny workflow improvements.</p></article>
            <article><span>03 · CURIOSITY</span><h3>Try the new thing properly</h3><p>New developer tools, self-hosted models, automation workflows, and software releases usually end up in a real experiment—not just a bookmark.</p></article>
            <article><span>04 · OFF HOURS</span><h3>Games, anime, fire, travel</h3><p>Recently: Clair Obscur: Expedition 33, League of Legends, and VALORANT; plus anime, charcoal grilling, travel, and the occasional game prototype.</p></article>
          </div>
        </section>
        <section class="about-project-section">
          <div class="about-project-note">
            <p class="path-title">/about/outside-client-work.txt</p>
            <p>I build tools I want to use: a released Windows clipping app, a cross-platform media tracker, an agent-first job and interview desktop app, and the occasional game prototype. Those projects are where I test product taste, architecture, and long-term iteration.</p>
            <a class="terminal-link" href="${pageHref("projects.html")}">→ Browse personal projects</a>
          </div>
        </section>`;
}

function contactPage() {
  return `
        <section class="contact-shell">
          <article class="contact-primary">
            <p class="path-title">/contact/primary</p>
            <p class="contact-kicker">The simplest way to start:</p>
            <h2><a href="mailto:${profile.email}">${profile.email}</a></h2>
            <p>Send a short note about the product, workflow, or role. Context is more useful than a polished pitch, and a messy problem is completely fine.</p>
            <a class="contact-button" href="mailto:${profile.email}"><span class="icon-mask icon-mail" aria-hidden="true"></span>Compose email</a>
            <dl class="contact-meta">
              <div><dt>LOCATION</dt><dd>${profile.location}</dd></div>
              <div><dt>FOCUS</dt><dd>Product engineering</dd></div>
              <div><dt>START WITH</dt><dd>Email + context</dd></div>
            </dl>
          </article>
          <div class="contact-side">
            <article class="contact-fit">
              <p class="path-title">/contact/good-fit</p>
              <h2>Problems I am well suited to.</h2>
              <ul>
                <li>Full-stack product engineering</li>
                <li>Internal tools and QA automation</li>
                <li>Desktop and cross-platform products</li>
                <li>AI-assisted delivery systems</li>
              </ul>
            </article>
            <nav class="contact-link-list" aria-label="External profile links">
              <a href="${profile.github}" target="_blank" rel="noreferrer"><span><span class="icon-mask icon-github" aria-hidden="true"></span>GitHub</span><span class="external-mark icon-mask icon-external" aria-hidden="true"></span></a>
              <a href="${profile.linkedin}" target="_blank" rel="noreferrer"><span><span class="icon-mask icon-linkedin" aria-hidden="true"></span>LinkedIn</span><span class="external-mark icon-mask icon-external" aria-hidden="true"></span></a>
              <a href="assets/resume/Ebrar-Dushullovci-Resume.pdf" target="_blank" rel="noreferrer"><span><span class="icon-mask icon-file" aria-hidden="true"></span>Resume PDF</span><span class="external-mark icon-mask icon-external" aria-hidden="true"></span></a>
            </nav>
          </div>
        </section>
        <section class="contact-brief-section" aria-labelledby="contact-brief-title">
          <article class="contact-brief-copy">
            <p class="path-title">/contact/useful-first-message.md</p>
            <h2 id="contact-brief-title">A useful first message can be short.</h2>
            <p>I do not need a formal brief. Three or four concrete lines are enough to understand whether I can help and what the next conversation should cover.</p>
          </article>
          <ol class="contact-brief-steps">
            <li><span>01</span><div><h3>The problem</h3><p>What are you trying to ship, fix, automate, or understand?</p></div></li>
            <li><span>02</span><div><h3>The current state</h3><p>What exists today, and where is the workflow or implementation getting stuck?</p></div></li>
            <li><span>03</span><div><h3>The constraints</h3><p>Share the important timeline, stack, team, ownership, or operational boundaries.</p></div></li>
          </ol>
        </section>`;
}

const contentByPage = { work: workPage, projects: projectsPage, workflow: workflowPage, about: aboutPage, contact: contactPage };

console.log(shell(pageMeta[page], contentByPage[page]()));
