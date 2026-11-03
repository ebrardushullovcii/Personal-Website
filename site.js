// "Journal" design: the main site. Renders index.html from data.js.
import { accent, arrow, arrowUpRight, chrono, collage, diagram, dotnav, escapeHtml, head, icon, list, loopVideo, stackLine, words } from "./lib/html.js";
import {
  heroShots,
  about,
  contact,
  earlierRoles,
  experience,
  milestones,
  personalProjects,
  profile,
  skillTiers,
  smallProjects,
  workProjects,
  workflow,
} from "./data.js";

export { escapeHtml };

const navItems = [
  ["#work", "01", "Work"],
  ["#products", "02", "Products"],
  ["#experience", "03", "Experience"],
  ["#about", "04", "About"],
  ["#contact", "05", "Contact"],
];

function header({ fromNotFound = false } = {}) {
  return `
    <header class="site-header" id="top">
      <div class="wrap header-inner">
        <a class="brand" href="${fromNotFound ? "/" : "#top"}" aria-label="${escapeHtml(profile.name)}, ${fromNotFound ? "home" : "back to top"}">
          <span class="brand-first">${escapeHtml(profile.firstName)}</span>
          <span class="brand-last">${escapeHtml(profile.lastName)}</span>
        </a>
        <nav class="site-nav" id="site-nav" aria-label="Sections">
          ${navItems.map(([href, num, label]) => `<a href="${fromNotFound ? "/" : ""}${href}"><span class="num">${num}</span>${label}</a>`).join("")}
          <a class="mobile-canvas" href="/canvas/">Canvas</a>
        </nav>
        <div class="header-actions">
          <span class="avail"><span class="pulse" aria-hidden="true"></span>${escapeHtml(profile.availability)}</span>
          <a class="canvas-link" href="/canvas/" title="Explore the same content as a spatial canvas">${icon("panels-top-left")}<span>Canvas</span></a>
          <a class="btn btn-solid btn-sm" href="mailto:${profile.email}">Email me${arrowUpRight}</a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Toggle navigation"><span></span><span></span></button>
        </div>
      </div>
    </header>`;
}

function hero() {
  return `
    <section class="hero" id="hero" aria-labelledby="hero-title">
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <p class="kicker reveal">${escapeHtml(profile.role)}<br />${escapeHtml(profile.location)} <span class="sep">·</span> ${escapeHtml(profile.timezone)} <span class="sep">·</span> Remote</p>
          <h1 id="hero-title" class="display reveal-words">${words(profile.tagline)}</h1>
          <p class="lead reveal" style="--i:3">${escapeHtml(profile.pitch)}</p>
          <div class="actions reveal" style="--i:4">
            <a class="btn btn-solid" href="mailto:${profile.email}">Get in touch${arrowUpRight}</a>
            <a class="btn" href="${profile.resume}" target="_blank" rel="noreferrer">Resume (PDF)</a>
            <a class="textlink" href="${profile.github}" target="_blank" rel="noreferrer">${icon("github")}GitHub</a>
            <a class="textlink" href="${profile.linkedin}" target="_blank" rel="noreferrer">${icon("linkedin")}LinkedIn</a>
          </div>
        </div>
        <div class="hero-demo reveal" style="--i:2">
          ${collage(heroShots)}
        </div>
      </div>
    </section>`;
}

function sectionHead(num, eyebrow, title, intro) {
  return `
      <div class="section-head reveal">
        <p class="kicker"><span class="num">${num}</span>${escapeHtml(eyebrow)}</p>
        <h2 id="${({ "01": "work-title", "02": "products-title", "03": "experience-title" })[num]}" class="display-2">${accent(title)}</h2>
        ${intro ? `<p class="intro">${escapeHtml(intro)}</p>` : ""}
      </div>`;
}

function work() {
  return `
    <section id="work" class="section" aria-labelledby="work-title">
      <div class="wrap">
        ${sectionHead("01", "Selected work", "Systems built for *real* operations.", "Selected professional work. Orderific is a public product; TestingMill and the generation pipeline are internal tools.")}
      </div>
      ${workProjects
        .map(
          (project) => project.compact ? `
      <article class="spread spread-compact" id="${project.id}">
        <div class="wrap">
          <p class="kicker">${escapeHtml(project.tag)}</p>
          <h3 class="display-3">${escapeHtml(project.title)}</h3>
          <p class="intro">${escapeHtml(project.summary)}</p>
          <p class="mono stack">${stackLine(project.stack)}</p>
        </div>
      </article>` : `
      <article class="spread" id="${project.id}">
        <div class="wrap spread-grid">
          <div class="spread-side">
            <div class="spread-sticky">
              <p class="spread-index mono">${project.index}</p>
              ${
                project.name
                  ? `<a class="spread-brand" href="${project.url}" target="_blank" rel="noreferrer"><img class="app-mark" src="${project.mark}" alt="" width="36" height="36" loading="lazy" decoding="async" /><span>${escapeHtml(project.name)}</span><span class="mono dim">${escapeHtml(project.url.replace("https://", ""))}${arrowUpRight}</span></a>`
                  : ""
              }
              <p class="tag">${escapeHtml(project.tag)}</p>
              <h3 class="spread-title">${escapeHtml(project.title)}</h3>
              <p class="spread-summary">${escapeHtml(project.summary)}</p>
              <p class="mono stack">${stackLine(project.stack)}</p>
            </div>
          </div>
          <div class="spread-main">
            <figure class="diagram-frame reveal">
              ${diagram(project.diagram, project.id)}
              <figcaption class="mono">workflow overview</figcaption>
            </figure>
            <div class="outcomes reveal">
              ${project.outcomes.map((outcome) => `<div><strong class="display-num">${escapeHtml(outcome.value)}</strong><span>${escapeHtml(outcome.label)}</span></div>`).join("")}
            </div>
            ${list(project.points, "list reveal")}
          </div>
        </div>
      </article>`,
        )
        .join("")}
    </section>`;
}

function products() {
  return `
    <section id="products" class="section section-products" aria-labelledby="products-title">
      <div class="wrap">
        ${sectionHead("02", "Personal products", "What I build when I own the *whole* product.", "Public projects I build, use and maintain.")}
        <div class="shelf">
          ${personalProjects
            .map(
              (project, index) => `
          <article class="shelf-item reveal" style="--i:${index}">
            <a class="shelf-media" href="${project.url}" target="_blank" rel="noreferrer" tabindex="-1" aria-hidden="true" data-tilt>
              ${
                project.loop
                  ? loopVideo(project.loop, "shelf-loop")
                  : `<img src="${project.image}" alt="${escapeHtml(project.imageAlt)}" loading="lazy" decoding="async" />`
              }
            </a>
            <div class="shelf-copy">
              <div class="shelf-head">
                <img class="app-mark" src="${project.mark}" alt="" width="44" height="44" loading="lazy" decoding="async" />
                <div>
                  <h3><a href="${project.url}" target="_blank" rel="noreferrer">${escapeHtml(project.name)}${arrowUpRight}</a></h3>
                  <p class="mono shelf-status">${escapeHtml(project.status)}</p>
                </div>
              </div>
              <p>${escapeHtml(project.summary)}</p>
              ${list(project.points)}
              <p class="mono stack">${stackLine(project.stack)}</p>
              <div class="shelf-links">
                <a class="btn btn-sm btn-solid" href="${project.primary.href}" target="_blank" rel="noreferrer">${escapeHtml(project.primary.label)}${arrowUpRight}</a>
                ${
                  project.film
                    ? `<a class="btn btn-sm" href="${project.film.src}" target="_blank" rel="noreferrer" data-film data-poster="${project.film.poster}" data-title="${escapeHtml(project.name)} in ${project.film.seconds} seconds"><span class="play" aria-hidden="true"></span>Watch the film<span class="dim">${project.film.seconds} s</span></a>`
                    : ""
                }
                ${project.repo !== project.primary.href ? `<a class="textlink" href="${project.repo}" target="_blank" rel="noreferrer">GitHub${arrowUpRight}</a>` : ""}
              </div>
            </div>
          </article>`,
            )
            .join("")}
        </div>
        <div class="minis reveal">
          ${smallProjects
            .map(
              (project) => `
          <a class="mini" href="${project.url}" target="_blank" rel="noreferrer">
            <span class="mini-name">${escapeHtml(project.name)}${arrowUpRight}</span>
            <span class="mini-sum">${escapeHtml(project.summary)}</span>
          </a>`,
            )
            .join("")}
        </div>
      </div>
    </section>`;
}

function experienceSection() {
  return `
    <section id="experience" class="section" aria-labelledby="experience-title">
      <div class="wrap">
        ${sectionHead("03", "Experience", "A career close to the *product*.", "Engineering, customer experience and QA, with concurrent work marked clearly.")}
        <div class="role-list">
          ${experience.map((job) => `
          <article class="role-entry" id="role-${job.id}">
            <div class="role-heading"><div><p class="mono role-company">${escapeHtml(job.company)}</p><h3>${escapeHtml(job.title)}</h3></div><p class="mono role-dates">${escapeHtml(job.period)}</p></div>
            <p class="mono role-mode">${escapeHtml(job.mode)}</p>
            <p class="role-summary">${escapeHtml(job.summary)}</p>
            ${job.points.length ? list(job.points) : ""}
          </article>`).join("")}
        </div>
        <p class="earlier">${escapeHtml(earlierRoles)}</p>
        <details class="timeline-disclosure">
          <summary>Explore the career timeline</summary>
          ${chrono({ experience, milestones })}
        </details>
      </div>
      <div class="wrap work-method" aria-labelledby="loop-title">
        <p class="kicker">How I work</p>
        <h3 id="loop-title" class="display-3">From understanding the problem to checking the result.</h3>
        <ol class="method-steps">${workflow.map((step) => `<li><h4>${escapeHtml(step.title)}</h4><p>${escapeHtml(step.body)}</p></li>`).join("")}</ol>
      </div>
      <div class="wrap skills-block" aria-labelledby="skills-title">
        <p class="kicker">Skills</p><h3 id="skills-title" class="display-3">The main tools I work with.</h3>
        <dl class="skills-list">${skillTiers.map((tier) => `<div><dt>${escapeHtml(tier.name)}</dt><dd>${tier.items.map(escapeHtml).join(", ")}</dd></div>`).join("")}</dl>
      </div>
    </section>`;
}

function aboutSection() {
  return `
    <section id="about" class="section section-about" aria-labelledby="about-title">
      <div class="wrap">
        <p class="kicker reveal"><span class="num">04</span>About</p>
        <h2 id="about-title" class="display-2 reveal-words">${words(about.quote)}</h2>
        <div class="about-grid">
          <div class="about-copy reveal">
            <p class="lead">${escapeHtml(about.lead)}</p>
            <p>${escapeHtml(about.body)}</p>
          </div>
          <dl class="facts reveal">
            ${about.facts.map((fact) => `<div><dt class="mono">${escapeHtml(fact.label)}</dt><dd>${escapeHtml(fact.value)}</dd></div>`).join("")}
          </dl>
        </div>
      </div>
    </section>`;
}

function contactSection() {
  return `
    <section id="contact" class="section section-contact" aria-labelledby="contact-title">
      <div class="wrap">
        <p class="kicker reveal"><span class="num">05</span>Contact</p>
        <h2 id="contact-title" class="display-2 reveal-words">${words(contact.heading)}</h2>
        <p class="intro reveal">${escapeHtml(contact.body)}</p>
        <a class="big-email reveal" href="mailto:${profile.email}" data-copy="${profile.email}">
          <span class="big-email-text">${escapeHtml(profile.email)}</span>
          <span class="big-email-hint mono">click to email <span class="sep">·</span> <span data-copy-label>copy address</span></span>
        </a>
        <div class="contact-row reveal">
          <div class="actions">
            <a class="btn btn-solid" href="mailto:${profile.email}">Send an email${arrowUpRight}</a>
            <a class="btn" href="${profile.linkedin}" target="_blank" rel="noreferrer">${icon("linkedin")}LinkedIn</a>
            <a class="btn" href="${profile.github}" target="_blank" rel="noreferrer">${icon("github")}GitHub</a>
            <a class="btn" href="${profile.resume}" target="_blank" rel="noreferrer">${icon("file-text")}Resume</a>
          </div>
          <div class="fit">
            <p class="mono">Good fit for</p>
            ${list(contact.fit)}
          </div>
        </div>
      </div>
    </section>`;
}

function footer() {
  return `
    <footer class="site-footer">
      <div class="wrap footer-inner">
        <p>© 2026 ${escapeHtml(profile.name)}</p>
        <p class="mono">${escapeHtml(profile.location)} · ${escapeHtml(profile.timezone)} · updated ${escapeHtml(profile.updated)}</p>
        <a href="#top" class="textlink">Back to top${arrow}</a>
      </div>
    </footer>`;
}

export function renderNotFound({ version, cssHref = "/styles.css" }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta name="color-scheme" content="dark" />
    <meta name="robots" content="noindex" />
    ${head({
      profile,
      title: `Page not found | ${profile.name}`,
      description: "That page does not exist.",
      version,
      cssHref,
      themeColor: "#0b0b0d",
      fonts: "family=Inter+Tight:wght@500;600;700;800&family=Inter:wght@400;500;600&family=Instrument+Serif:ital@1",
    })}
  </head>
  <body>
    <div class="grain" aria-hidden="true"></div>
    ${header({ fromNotFound: true })}
    <main id="main" class="not-found">
      <p class="kicker"><span class="num">404</span>Page not found</p>
      <h1 class="display">${accent("Nothing lives at this *address*.")}</h1>
      <p class="lead">The link may be old or mistyped. Everything about my work is on the main page.</p>
      <div class="actions">
        <a class="btn btn-solid" href="/">Back to the site${arrow}</a>
        <a class="btn" href="/canvas/">Open the canvas</a>
      </div>
    </main>
    ${footer()}
    <script src="/app.js?v=${version}" defer></script>
  </body>
</html>
`;
}

// One dialog shared by every "Watch the film" link; app.js fills it in on click.
const filmDialog = () => `
    <dialog class="film" id="film" aria-labelledby="film-title">
      <div class="film-frame">
        <div class="film-bar">
          <p class="mono" id="film-title">Product film</p>
          <button class="film-close" type="button" aria-label="Close the film">${icon("x")}</button>
        </div>
        <video class="film-video" controls muted playsinline preload="none"></video>
      </div>
    </dialog>`;

export function renderIndex({ version, cssHref = "/styles.css" }) {
  const description = `${profile.name} is a senior full-stack software engineer building real-time operational products, QA automation, desktop tools, and internal developer tools. React, Next.js, TypeScript, Node.js, and .NET.`;
  return `<!doctype html>
<html lang="en">
  <head>
    <meta name="color-scheme" content="dark" />
    ${head({
      profile,
      description,
      version,
      cssHref,
      themeColor: "#0b0b0d",
      fonts: "family=Inter+Tight:wght@500;600;700;800&family=Inter:wght@400;500;600&family=Instrument+Serif:ital@1",
      extraHead: `<script type="speculationrules">{"prerender":[{"urls":["/canvas/"],"eagerness":"moderate"}]}</script>`,
    })}
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="grain" aria-hidden="true"></div>
    ${header()}
    ${dotnav([["#hero", "Top"], ["#work", "Work"], ["#products", "Products"], ["#experience", "Experience"], ["#about", "About"], ["#contact", "Contact"]])}
    <main id="main">
      ${hero()}
      ${work()}
      ${products()}
      ${experienceSection()}
      ${aboutSection()}
      ${contactSection()}
    </main>
    ${footer()}
    ${filmDialog()}
    <script src="/app.js?v=${version}" defer></script>
  </body>
</html>
`;
}
