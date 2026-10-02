// Canvas mode: the site's content as a spatial map of connected nodes, with a stepped tour.
import { accent, arrow, arrowUpRight, diagram, escapeHtml, head, icon, list } from "../../lib/html.js";
import { about, contact, earlierRoles, experience, personalProjects, profile, skillTiers, workProjects, workflow } from "../../data.js";

const WORLD = { w: 3700, h: 2700 };

const layout = {
  start: { x: 1460, y: 900, w: 560 },
  orderific: { x: 160, y: 80, w: 480 },
  testingmill: { x: 720, y: 20, w: 480 },
  "figma-to-next": { x: 160, y: 900, w: 480 },
  "ai-infrastructure": { x: 720, y: 820, w: 480 },
  "p-clipvault": { x: 2300, y: 40, w: 440 },
  "p-showtracker": { x: 2840, y: 120, w: 440 },
  "p-nordri": { x: 2300, y: 780, w: 440 },
  "e-0": { x: 160, y: 1720, w: 320 },
  "e-1": { x: 560, y: 1880, w: 320 },
  "e-2": { x: 960, y: 1720, w: 320 },
  "e-3": { x: 1360, y: 1880, w: 320 },
  "e-4": { x: 1760, y: 1720, w: 320 },
  skills: { x: 2300, y: 1600, w: 580 },
  about: { x: 2960, y: 940, w: 460 },
  contact: { x: 2960, y: 1660, w: 560 },
};

// Edges carry a short label shown when either end is focused.
const edges = [
  ["start", "orderific", "professional work"],
  ["start", "testingmill", "professional work"],
  ["start", "figma-to-next", "professional work"],
  ["start", "ai-infrastructure", "professional work"],
  ["start", "p-clipvault", "personal product"],
  ["start", "p-showtracker", "personal product"],
  ["start", "p-nordri", "personal product"],
  ["start", "e-4", "career, newest first"],
  ["e-4", "e-3", "earlier"],
  ["e-3", "e-2", "earlier"],
  ["e-2", "e-1", "earlier"],
  ["e-1", "e-0", "earlier"],
  ["start", "skills", "how I work"],
  ["skills", "about", "the person"],
  ["about", "contact", "get in touch"],
  ["p-nordri", "contact", "built for this search"],
];

const tour = [
  ["start", "Start here"],
  ["orderific", "Work · restaurant platform"],
  ["testingmill", "Work · QA platform"],
  ["figma-to-next", "Work · Figma to Next.js"],
  ["ai-infrastructure", "Work · AI infrastructure"],
  ["p-clipvault", "Product · ClipVault"],
  ["p-showtracker", "Product · ShowTracker"],
  ["p-nordri", "Product · Nordri"],
  ["e-4", "Experience · today"],
  ["e-2", "Experience · leadership years"],
  ["e-0", "Experience · where it started"],
  ["skills", "Skills and how I work"],
  ["about", "About"],
  ["contact", "Contact"],
];

const node = (id, kind, body) => {
  const pos = layout[id];
  return `<article class="node node-${kind}" id="n-${id}" data-node="${id}" style="left:${pos.x}px;top:${pos.y}px;width:${pos.w}px" tabindex="0">${body}</article>`;
};

export function render({ version, cssHref, base = "/canvas" }) {
  const description = `${profile.name}, senior full-stack software engineer. Real-time operational products, QA automation, desktop tools, and AI-assisted developer systems.`;
  const nodes = [
    node(
      "start",
      "start",
      `<p class="kicker mono">Start here</p>
      <h1 class="display">${accent(profile.tagline)}</h1>
      <p class="mono who">${escapeHtml(profile.name)} · ${escapeHtml(profile.role)} · ${escapeHtml(profile.location)} · Remote · <span class="ok">${escapeHtml(profile.availability)}</span></p>
      <p class="lead">${escapeHtml(profile.pitch)}</p>
      <div class="actions">
        <a class="btn btn-solid" href="mailto:${profile.email}">Get in touch${arrowUpRight}</a>
        <a class="btn" href="${profile.resume}" target="_blank" rel="noreferrer">Resume (PDF)</a>
        <a class="textlink" href="${profile.github}" target="_blank" rel="noreferrer">${icon("github")}GitHub</a>
        <a class="textlink" href="${profile.linkedin}" target="_blank" rel="noreferrer">${icon("linkedin")}LinkedIn</a>
      </div>
      <p class="mono legend">Drag to explore, or press <b>Tour</b> and step through with next and previous.</p>`,
    ),
    ...workProjects.map((project) =>
      node(
        project.id,
        "work",
        `<p class="kicker mono">${escapeHtml(project.index)} · ${escapeHtml(project.name ? `${project.name} · ${project.tag}` : project.tag)}</p>
        <h2>${escapeHtml(project.title)}</h2>${project.url ? `\n        <p class="node-links"><a class="mono" href="${project.url}" target="_blank" rel="noreferrer">${escapeHtml(project.url.replace("https://", ""))}${arrowUpRight}</a></p>` : ""}
        <div class="node-diagram">${diagram(project.diagram, `cv-${project.id}`)}</div>
        <p class="summary">${escapeHtml(project.summary)}</p>
        <div class="outcomes">${project.outcomes.map((outcome) => `<div><strong>${escapeHtml(outcome.value)}</strong><span>${escapeHtml(outcome.label)}</span></div>`).join("")}</div>
        ${list(project.points, "list", { brief: true })}
        <p class="mono stack">${escapeHtml(project.stack)}</p>`,
      ),
    ),
    ...personalProjects.map((project) =>
      node(
        `p-${project.id}`,
        "product",
        `<a class="node-shot" href="${project.url}" target="_blank" rel="noreferrer" tabindex="-1" aria-hidden="true"><img src="${project.image}" alt="${escapeHtml(project.imageAlt)}" loading="eager" fetchpriority="low" decoding="async" width="1400" height="875" /></a>
        <p class="kicker mono">${escapeHtml(project.status)}</p>
        <h2 class="product-title"><img class="app-mark" src="${project.mark}" alt="" width="32" height="32" loading="eager" decoding="async" /><a href="${project.url}" target="_blank" rel="noreferrer">${escapeHtml(project.name)}${arrowUpRight}</a></h2>
        <p class="summary">${escapeHtml(project.summary)}</p>
        ${list(project.points)}
        <p class="mono stack">${escapeHtml(project.stack)}</p>
        <p class="node-links"><a class="mono" href="${project.primary.href}" target="_blank" rel="noreferrer">${escapeHtml(project.primary.label)}${arrowUpRight}</a>${project.repo !== project.primary.href ? `<a class="mono" href="${project.repo}" target="_blank" rel="noreferrer">GitHub${arrowUpRight}</a>` : ""}</p>`,
      ),
    ),
    ...experience.map((job, index) =>
      node(
        `e-${index}`,
        `role${job.current ? " current" : ""}`,
        `<p class="kicker mono">${escapeHtml(job.period)}</p>
        <h2>${escapeHtml(job.title)}</h2>
        <p class="mono">${escapeHtml(job.company)} · ${escapeHtml(job.mode)}</p>
        <p class="summary">${escapeHtml(job.summary)}</p>
        ${list(job.points.slice(0, 3), "list", { brief: true })}`,
      ),
    ),
    node(
      "skills",
      "skills",
      `<p class="kicker mono">Skills</p>
      ${skillTiers.map((tier) => `<div class="tier"><strong>${escapeHtml(tier.name)}</strong><p class="tier-items">${tier.items.map(escapeHtml).join(" · ")}</p></div>`).join("")}
      <p class="kicker mono how">How I work</p>
      <ol class="steps">${workflow.map((step, index) => `<li><span class="mono">0${index + 1}</span><div><strong>${escapeHtml(step.title)}</strong><p>${escapeHtml(step.body)}</p></div></li>`).join("")}</ol>`,
    ),
    node(
      "about",
      "about",
      `<p class="kicker mono">About</p>
      <h2>${accent(about.quote)}</h2>
      <p class="summary">${escapeHtml(about.lead)}</p>
      <p class="summary">${escapeHtml(about.body)}</p>
      <dl class="facts">${about.facts.map((fact) => `<div><dt class="mono">${escapeHtml(fact.label)}</dt><dd>${escapeHtml(fact.value)}</dd></div>`).join("")}</dl>
      <p class="mono earlier">${escapeHtml(earlierRoles)}</p>`,
    ),
    node(
      "contact",
      "contact",
      `<p class="kicker mono">Contact</p>
      <h2>${accent(contact.heading)}</h2>
      <p class="summary">${escapeHtml(contact.body)}</p>
      <a class="big-email" href="mailto:${profile.email}" data-copy="${profile.email}">${escapeHtml(profile.email)}<span class="mono" data-copy-label>click to copy</span></a>
      <div class="actions">
        <a class="btn btn-solid" href="mailto:${profile.email}">Send an email${arrowUpRight}</a>
        <a class="btn" href="${profile.linkedin}" target="_blank" rel="noreferrer">${icon("linkedin")}LinkedIn</a>
        <a class="btn" href="${profile.github}" target="_blank" rel="noreferrer">${icon("github")}GitHub</a>
        <a class="btn" href="${profile.resume}" target="_blank" rel="noreferrer">${icon("file-text")}Resume</a>
      </div>
      <p class="mono fit">Good fit for: ${contact.fit.map(escapeHtml).join(" · ")}</p>`,
    ),
  ].join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta name="color-scheme" content="dark" />
    <meta name="robots" content="noindex" />
    ${head({ profile, title: `${profile.name} — Canvas`, description, version, cssHref, themeColor: "#0a0a0c", fonts: "family=Inter+Tight:wght@500;600;700;800&family=Inter:wght@400;500;600&family=Instrument+Serif:ital@1" })}
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="bar">
      <div class="bar-left">
        <a class="brand" href="/">${escapeHtml(profile.firstName)} <em>${escapeHtml(profile.lastName)}</em></a>
        <a class="back" href="/">${arrow}<span>Back to the site</span></a>
      </div>
      <div class="bar-mid">
        <button type="button" class="ctl ctl-tour" data-tour><svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg><span>Take the tour</span></button>
        <span class="tour-callout mono" id="tour-callout">14 stops, next and previous, about two minutes</span>
      </div>
      <a class="btn btn-solid btn-sm" href="mailto:${profile.email}">Email me${arrowUpRight}</a>
    </header>

    <main id="main">
      <div class="viewport" id="viewport" data-world-w="${WORLD.w}" data-world-h="${WORLD.h}" aria-label="Canvas of nodes. Drag to pan.">
        <div class="world" id="world" style="width:${WORLD.w}px;height:${WORLD.h}px">
          <svg class="links" id="links" width="${WORLD.w}" height="${WORLD.h}" aria-hidden="true">
            <defs><marker id="arrow-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" /></marker></defs>
            <g class="link-paths"></g><g class="link-labels"></g>
          </svg>
          ${nodes}
        </div>
        <div class="zoom-dock" role="group" aria-label="Zoom">
          <button type="button" class="dock-btn" data-zoom="1" aria-label="Zoom in" title="Zoom in">+</button>
          <button type="button" class="dock-btn" data-zoom="-1" aria-label="Zoom out" title="Zoom out">−</button>
          <button type="button" class="dock-btn dock-fit" data-fit aria-label="Show everything" title="Show everything"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg></button>
        </div>
        <div class="minimap" id="minimap" aria-hidden="true"><div class="mini-view"></div></div>
        <p class="hint mono" id="hint">Drag to pan · scroll to move · pinch or ⌘ + scroll to zoom</p>
        <p class="toast mono" id="toast" role="status"></p>
        <div class="tourbar" id="tourbar" hidden>
          <button type="button" class="ctl" data-tour-prev aria-label="Previous stop">←</button>
          <span class="tour-status"><span class="mono tour-count">1 / ${tour.length}</span><span class="tour-label"></span></span>
          <button type="button" class="ctl ctl-next" data-tour-next aria-label="Next stop">Next →</button>
          <button type="button" class="ctl ctl-quiet" data-tour-stop aria-label="End tour">✕</button>
        </div>
      </div>
      <div class="small-screen">
        <p class="kicker mono">Canvas mode</p>
        <h1>This view needs a bigger screen.</h1>
        <p class="summary">The canvas is a pannable map of the same content. On a phone, the regular site is the better read.</p>
        <a class="btn btn-solid" href="/">Open the site${arrowUpRight}</a>
      </div>
    </main>
    <script type="application/json" id="graph">${JSON.stringify({ edges, tour, layout }).replaceAll("<", "\\u003c")}</script>
    <script src="/app.js?v=${version}" defer></script>
    <script src="${base}/app.js?v=${version}" defer></script>
  </body>
</html>
`;
}
