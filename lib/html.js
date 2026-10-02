// Shared rendering helpers for every design variant.
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

export const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

// "some *accent* words" -> escaped HTML with <em> around the accent word(s).
export const accent = (text) => escapeHtml(text).replace(/\*([^*]+)\*/g, "<em>$1</em>");

// Plain text without the accent markers.
export const plain = (text) => String(text).replaceAll("*", "");

// Word-by-word masked reveal. Keeps <em> accents intact.
export const words = (text) =>
  accent(text)
    .split(/(\s+)/)
    .filter(Boolean)
    .map((token, index) =>
      /^\s+$/.test(token) ? " " : `<span class="w"><span class="wi" style="--w:${Math.floor(index / 2)}">${token}</span></span>`,
    )
    .join("");

const iconCache = new Map();
export function icon(name, className = "icon") {
  if (!iconCache.has(name)) {
    let svg = readFileSync(join(root, "assets", "icons", `${name}.svg`), "utf8")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<\?xml[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/^<svg([^>]*)>/, (match, attrs) => `<svg${attrs.replace(/\s+(width|height)="[^"]*"/g, "")}>`);
    if (!/<svg[^>]*\sfill=/.test(svg) && !/stroke="currentColor"/.test(svg)) {
      svg = svg.replace("<svg", '<svg fill="currentColor"');
    }
    iconCache.set(name, svg);
  }
  return iconCache.get(name).replace("<svg", `<svg class="${className}" aria-hidden="true" focusable="false"`);
}

export const arrow =
  '<svg class="icon icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>';
export const arrowUpRight =
  '<svg class="icon icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>';

export const pointText = (item) => (typeof item === "string" ? item : [item.result, item.how].filter(Boolean).join(" "));
export const list = (items, className = "list", { brief = false } = {}) =>
  `<ul class="${className}">${items
    .map((item) => {
      if (typeof item === "string") return `<li><span class="dash" aria-hidden="true"></span><span>${escapeHtml(item)}</span></li>`;
      const how = item.how && !brief ? `<span class="how">${escapeHtml(item.how)}</span>` : "";
      return `<li${how ? ' class="has-how"' : ""}><span class="dash" aria-hidden="true"></span><span><span class="result">${escapeHtml(item.result)}</span>${how}</span></li>`;
    })
    .join("")}</ul>`;

/* ---------- brand marks next to skill labels ---------- */
import { BRAND_SLUGS } from "./brands.js";
let brandHex = null;
export function brandIcon(label) {
  const slug = BRAND_SLUGS[label];
  if (!slug) return "";
  if (!brandHex) brandHex = JSON.parse(readFileSync(join(root, "assets", "icons", "brands", "brands.json"), "utf8"));
  const svg = readFileSync(join(root, "assets", "icons", "brands", `${slug}.svg`), "utf8").trim();
  return svg.replace("<svg", `<svg class="brand" style="--brand:${brandHex[slug]}" aria-hidden="true" focusable="false"`);
}
export const hasBrand = (label) => Boolean(BRAND_SLUGS[label]);
// Items with a mark first (stable), plain text after, so each row starts with the recognisable logos.
export const brandsFirst = (items) => [...items].sort((a, b) => Number(hasBrand(b)) - Number(hasBrand(a)));
export const skill = (label, className = "skill") => `<span class="${className}"${BRAND_SLUGS[label] ? "" : ' data-plain=""'}>${brandIcon(label)}<span>${escapeHtml(label)}</span></span>`;
export const stackLine = (text) => brandsFirst(text.split(" · ").map((item) => item.trim())).map((item) => skill(item, "stack-item")).join("");

/* ---------- head ---------- */
export function head({ profile, title, description, version, cssHref, fonts, themeColor, extraHead = "" }) {
  const pageTitle = title || `${profile.name} — ${profile.role}`;
  return `<meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(pageTitle)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="author" content="${escapeHtml(profile.name)}" />
    <meta name="theme-color" content="${themeColor}" />
    <link rel="canonical" href="${profile.siteUrl}/" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${profile.siteUrl}/" />
    <meta property="og:title" content="${escapeHtml(pageTitle)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${profile.siteUrl}/assets/og.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" href="/assets/favicon.ico" sizes="16x16 32x32 48x48" />
    <link rel="icon" href="/assets/favicon-16.png" type="image/png" sizes="16x16" />
    <link rel="icon" href="/assets/favicon-32.png" type="image/png" sizes="32x32" />
    <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" sizes="any" />
    <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" sizes="180x180" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    ${fonts ? `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fonts}&display=swap" />` : ""}
    <link rel="preload" href="/assets/fonts/JetBrainsMono.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="stylesheet" href="${cssHref}?v=${version}" />
    <script>document.documentElement.classList.add("js");</script>
    ${extraHead}
    <script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.role,
      email: `mailto:${profile.email}`,
      url: `${profile.siteUrl}/`,
      sameAs: [profile.github, profile.linkedin],
      address: { "@type": "PostalAddress", addressLocality: "Prishtina", addressCountry: "XK" },
    })}</script>`;
}

/* ---------- system diagram (inline SVG with animated flow) ---------- */
export function diagram(spec, id, { light = false } = {}) {
  const W = 620;
  const NH = 52;
  // Widen a node when its label or subtitle would overflow the authored width.
  const fitWidth = (node) => Math.max(node.w, Math.ceil(22 + Math.max((node.label || "").length * 7.2, (node.sub || "").length * 6.1)));
  spec = { ...spec, nodes: spec.nodes.map((node) => ({ ...node, w: fitWidth(node) })) };
  const byId = Object.fromEntries(spec.nodes.map((node) => [node.id, node]));
  const center = (node) => ({ x: node.x + node.w / 2, y: node.y + NH / 2 });
  let maxY = Math.max(...spec.nodes.map((node) => node.y + NH));
  const edgePath = ([from, to]) => {
    const a = byId[from];
    const b = byId[to];
    const ac = center(a);
    const bc = center(b);
    if (bc.x < ac.x) {
      // Loop back: leave the bottom of "a", curve under, enter the bottom of "b".
      const y1 = a.y + NH;
      const y2 = b.y + NH;
      const dip = Math.max(y1, y2) + 30;
      maxY = Math.max(maxY, dip);
      return `M ${ac.x} ${y1} C ${ac.x} ${dip}, ${bc.x} ${dip}, ${bc.x} ${y2}`;
    }
    const x1 = a.x + a.w;
    const x2 = b.x;
    if (Math.abs(ac.y - bc.y) < 4) return `M ${x1} ${ac.y} L ${x2} ${bc.y}`;
    const mid = (x1 + x2) / 2;
    return `M ${x1} ${ac.y} C ${mid} ${ac.y}, ${mid} ${bc.y}, ${x2} ${bc.y}`;
  };
  const edges = spec.edges
    .map((edge, index) => {
      const pathId = `${id}-e${index}`;
      return `<path id="${pathId}" d="${edgePath(edge)}" class="dg-edge" /><circle r="3.2" class="dg-dot"><animateMotion dur="${2.6 + index * 0.35}s" begin="${index * 0.5}s" repeatCount="indefinite"><mpath href="#${pathId}"/></animateMotion></circle>`;
    })
    .join("");
  const nodes = spec.nodes
    .map(
      (node) =>
        `<g class="dg-node" transform="translate(${node.x} ${node.y})"><rect width="${node.w}" height="${NH}" rx="${light ? 3 : 8}" /><text x="12" y="21" class="dg-label">${escapeHtml(node.label)}</text><text x="12" y="39" class="dg-sub">${escapeHtml(node.sub || "")}</text></g>`,
    )
    .join("");
  const H = Math.max(230, maxY + 14);
  return `<svg class="diagram" viewBox="0 0 ${W} ${H}" role="img" aria-label="System diagram: ${escapeHtml(spec.nodes.map((node) => node.label).join(", "))}">${edges}${nodes}</svg>`;
}

/* ---------- ring diagram for the operating loop ---------- */
export function ring(steps) {
  const size = 320;
  const c = size / 2;
  const r = 118;
  const points = steps.map((step, index) => {
    const angle = -Math.PI / 2 + (index / steps.length) * Math.PI * 2;
    return { x: c + Math.cos(angle) * r, y: c + Math.sin(angle) * r, index };
  });
  return `<svg class="ring" viewBox="0 0 ${size} ${size}" aria-hidden="true">
      <circle cx="${c}" cy="${c}" r="${r}" class="ring-track" />
      <circle cx="${c}" cy="${c}" r="${r}" class="ring-flow" />
      <text x="${c}" y="${c - 6}" class="ring-center">loop</text>
      <text x="${c}" y="${c + 16}" class="ring-center-sub">evidence decides</text>
      ${points.map((point) => `<g class="ring-node" transform="translate(${point.x} ${point.y})"><circle r="17" /><text y="5" text-anchor="middle">0${point.index + 1}</text></g>`).join("")}
    </svg>`;
}

/* ---------- kanban board of real merged work ---------- */
export function board(tasks, { id = "board", caption } = {}) {
  const columns = [
    ["backlog", "Backlog"],
    ["doing", "In progress"],
    ["review", "In review"],
    ["done", "Shipped"],
  ];
  const card = (task) =>
    `<article class="kcard" data-project="${escapeHtml(task.project)}"><span class="kcard-top mono"><span>${escapeHtml(task.project)}</span><span>#${task.pr}</span></span><span class="kcard-title">${escapeHtml(task.title)}</span></article>`;
  return `<div class="board" id="${id}" aria-label="Kanban board of recently merged pull requests">
      <div class="board-head"><span class="board-title">Recently shipped</span><span class="mono board-note">merged pull requests from my public repos</span></div>
      <div class="board-cols">
        ${columns
          .map(
            ([key, label]) =>
              `<div class="kcol" data-col="${key}"><h3 class="mono">${label}<span class="kcount"></span></h3><div class="klist">${tasks
                .filter((task) => task.state === key)
                .map(card)
                .join("")}</div></div>`,
          )
          .join("")}
      </div>
      <script type="application/json" class="board-data">${JSON.stringify(tasks).replaceAll("<", "\\u003c")}</script>
      ${caption ? `<p class="board-foot mono">${escapeHtml(caption)}</p>` : ""}
    </div>`;
}

/* ---------- screenshot collage (hero) ---------- */
// A product's looping clip, framed like its still. `zoom` crops away padding baked into the video.
export const loopVideo = (loop, className) =>
  `<video class="${className}" muted loop playsinline preload="none" data-src="${loop.src}"${loop.poster ? ` poster="${loop.poster}"` : ""} aria-hidden="true" tabindex="-1" style="--zoom:${loop.zoom || 1};--pos:${loop.pos || (loop.zoom ? "50% 50%" : "0 0")}"></video>`;

export function collage(shots, { id = "collage" } = {}) {
  const items = shots.slice(0, 4);
  const names = items.map((shot) => shot.name);
  // Slots are fixed positions in the scene (1 = front and largest); depth drives scroll parallax.
  const depth = [0.7, 0.45, 0.35, 0.2];
  return `<div class="collage" id="${id}" aria-label="Screenshots of ${escapeHtml(`${names.slice(0, -1).join(", ")}, and ${names.at(-1)}`)}">
      <div class="collage-scene">
        ${items
          .map(
            (shot, index) => `
        <a class="shot shot-${index + 1}${shot.pan ? " shot-pan" : ""}" href="${shot.url}" target="_blank" rel="noreferrer" data-depth="${depth[index]}">
          <span class="shot-card">
            <img src="${shot.image}" alt="${escapeHtml(shot.imageAlt)}" loading="eager" decoding="async" />
            ${shot.loop ? loopVideo({ src: shot.loop.src, zoom: shot.loop.zoom, pos: shot.loop.pos }, "shot-loop") : ""}
            <span class="shot-cap"><span class="mono">${escapeHtml(shot.name)}</span><span class="mono dim">${escapeHtml(shot.status)}</span></span>
          </span>
        </a>`,
          )
          .join("")}
      </div>
    </div>`;
}

/* ---------- horizontal chronology (roles as bars, products as cards, career marks on the axis) ---------- */
const CHRONO_START = 2016;
const CHRONO_YEAR_W = 330; // a year with something in it
const CHRONO_QUIET_W = 130; // a year where nothing starts, ends, or ships
const yearOf = (ym) => Number(ym.slice(0, 4));

// Piecewise scale: quiet years are compressed so the track is not mostly empty space.
function makeScale(activeYears, endYear) {
  const widths = [];
  const starts = [];
  let x = 0;
  for (let year = CHRONO_START; year <= endYear; year += 1) {
    starts[year - CHRONO_START] = x;
    widths[year - CHRONO_START] = activeYears.has(year) ? CHRONO_YEAR_W : CHRONO_QUIET_W;
    x += widths[year - CHRONO_START];
  }
  const px = (ym) => {
    const [y, m] = ym.split("-").map(Number);
    const i = Math.min(Math.max(0, y - CHRONO_START), widths.length - 1);
    return starts[i] + ((m - 1) / 12) * widths[i];
  };
  return { px, isQuiet: (year) => !activeYears.has(year) };
}

export function chrono({ experience, milestones, endMonth = "2026-10", id = "chrono" }) {
  const lane = (job) => (job.company === "AutomatedPros" ? 0 : job.company === "Infotech L.L.C" ? 1 : 2);
  const endYear = Number(endMonth.slice(0, 4));
  const activeYears = new Set([
    ...experience.flatMap((job) => [yearOf(job.start), job.end ? yearOf(job.end) : endYear]),
    ...milestones.map((mark) => yearOf(mark.date)),
  ]);
  const { px, isQuiet } = makeScale(activeYears, endYear);
  const years = [];
  for (let year = CHRONO_START; year <= endYear; year += 1) years.push(year);
  const bars = experience
    .map((job, index) => {
      const left = px(job.start);
      const right = job.end ? px(job.end) : px(endMonth);
      return `<div class="bar lane-${lane(job)}${job.current ? " current" : ""}" role="button" tabindex="0" style="left:${left.toFixed(1)}px;width:${(right - left).toFixed(1)}px" data-detail="job-${index}" aria-controls="${id}-detail" aria-label="${escapeHtml(job.title)} at ${escapeHtml(job.company)}"><span class="bar-inner"><span class="bar-title">${escapeHtml(job.title)}</span><span class="bar-sub mono">${escapeHtml(job.company)} · ${escapeHtml(job.period)}</span></span></div>`;
    })
    .join("");
  // Greedy row packing so labels never overlap: first row whose last item ends before this one starts.
  const packRows = (items, widthOf, gap = 10) => {
    const rowEnds = [];
    return items.map((item) => {
      const left = px(item.mark.date);
      let row = rowEnds.findIndex((end) => end + gap <= left);
      if (row === -1) row = rowEnds.length;
      rowEnds[row] = left + widthOf(item.mark);
      return { ...item, row };
    });
  };
  // Product cards: anchored to their month by a leader line, but spread out so they never crowd.
  const CARD_ROWS = [30, 82];
  const cardWidth = (mark) => mark.label.length * 7 + (mark.image ? 112 : 66);
  const rowRight = [];
  const cards = milestones
    .map((mark, index) => ({ mark, index }))
    .filter(({ mark }) => mark.kind === "project")
    .map((item, order) => {
      const row = order % CARD_ROWS.length;
      const anchor = px(item.mark.date);
      const left = Math.max(anchor - 14, (rowRight[row] ?? -Infinity) + 18);
      rowRight[row] = left + cardWidth(item.mark);
      return { ...item, row, anchor, left, top: CARD_ROWS[row] };
    });
  const slug = (label) => label.split(" ")[0].toLowerCase();
  const leaders = cards
    .map(
      ({ mark, anchor, left, top }) =>
        `<circle class="proj-${slug(mark.label)}" cx="${anchor.toFixed(1)}" cy="0" r="3.5" /><path d="M ${anchor.toFixed(1)} 0 C ${anchor.toFixed(1)} ${(top / 2).toFixed(1)}, ${(left + 16).toFixed(1)} ${(top / 2).toFixed(1)}, ${(left + 16).toFixed(1)} ${top}" />`,
    )
    .join("");
  const pills = cards
    .map(({ mark, index, row, left, top }) => {
      const popRight = left > px(endMonth) - 200;
      const thumb = mark.image
        ? mark.mark
          ? `<img class="pill-icon" src="${mark.mark}" alt="" loading="lazy" decoding="async" width="24" height="24" />`
          : `<span class="pill-thumb"><img src="${mark.image}" alt="" loading="lazy" decoding="async" width="88" height="56" /></span>`
        : `<i aria-hidden="true"></i>`;
      const pop = `<span class="pill-pop${popRight ? " pop-right" : ""}" aria-hidden="true">${mark.image ? `<img src="${mark.image}" alt="" loading="lazy" decoding="async" width="600" height="375" />` : ""}<span class="pop-meta"><strong>${escapeHtml(mark.label)}</strong><span class="mono">${escapeHtml(mark.status || mark.date.slice(0, 4))}</span></span><span class="pop-detail">${escapeHtml(mark.detail)}</span></span>`;
      return `<button class="pill row-${row} proj-${slug(mark.label)}" type="button" style="left:${left.toFixed(1)}px;top:${top}px" data-detail="mark-${index}" aria-controls="${id}-detail">${thumb}<span>${escapeHtml(mark.label)}</span><span class="mono pill-date">${escapeHtml(mark.date.slice(0, 4))}</span>${pop}</button>`;
    })
    .join("");
  const markItems = packRows(
    milestones.map((mark, index) => ({ mark, index })).filter(({ mark }) => mark.kind !== "project"),
    (mark) => Math.min(170, mark.label.length * 6.4) + 16,
  );
  const marks = markItems
    .map(
      ({ mark, index, row }) =>
        `<button class="mark kind-${mark.kind} row-${row}" type="button" style="left:${px(mark.date).toFixed(1)}px" data-detail="mark-${index}" aria-controls="${id}-detail"><span class="mark-dot" aria-hidden="true"></span><span class="mark-label">${escapeHtml(mark.label)}</span></button>`,
    )
    .join("");
  const details = [
    ...experience.map(
      (job, index) => `<article class="detail-card" data-id="job-${index}" data-name="${escapeHtml(job.title)} · ${escapeHtml(job.company)}"${index === 0 ? "" : " hidden"}><p class="mono">${escapeHtml(job.period)} · ${escapeHtml(job.mode)}</p><h3>${escapeHtml(job.title)} <span class="dim">· ${escapeHtml(job.company)}</span></h3><p class="summary">${escapeHtml(job.summary)}</p>${list(job.points)}</article>`,
    ),
    ...milestones.map(
      (mark, index) => `<article class="detail-card" data-id="mark-${index}" data-name="${escapeHtml(mark.label)}" hidden><p class="mono">${escapeHtml(mark.date.replace("-", " · "))}${mark.status ? ` · ${escapeHtml(mark.status)}` : ` · ${escapeHtml(mark.kind)}`}</p><h3>${escapeHtml(mark.label)}</h3><p class="summary">${escapeHtml(mark.detail)}</p>${mark.url ? `<a class="textlink" href="${mark.url}" target="_blank" rel="noreferrer">${mark.url.includes("github.com") ? "Open on GitHub" : "Visit the website"}${arrowUpRight}</a>` : ""}</article>`,
    ),
  ].join("");
  const trackWidth = Math.max(px(endMonth) + 120, Math.max(0, ...rowRight) + 40);
  // Chronological order for the detail stepper: roles by start date, products by their month.
  const order = [
    ...experience.map((job, index) => ({ id: `job-${index}`, date: job.start })),
    ...milestones.map((mark, index) => ({ id: `mark-${index}`, date: mark.date })).filter((_, index) => milestones[index].kind === "project"),
  ]
    .sort((a, b) => (a.date < b.date ? -1 : 1))
    .map((item) => item.id)
    .join(",");
  const detailNav = `<div class="detail-nav">
        <button class="dnav dnav-prev" type="button" data-step="-1" aria-label="Earlier entry"><span class="dnav-arrow" aria-hidden="true">${arrow}</span><span class="dnav-text"><span class="mono dnav-kicker">Earlier</span><span class="dnav-name" data-step-name="-1"></span></span></button>
        <span class="dnav-mid"><span class="mono dnav-count" data-step-count></span><span class="mono dnav-hint">Click any bar or card above</span></span>
        <button class="dnav dnav-next" type="button" data-step="1" aria-label="Later entry"><span class="dnav-text"><span class="mono dnav-kicker">Later</span><span class="dnav-name" data-step-name="1"></span></span><span class="dnav-arrow" aria-hidden="true">${arrow}</span></button>
      </div>`;
  return `<div class="chrono" id="${id}">
      <div class="chrono-tools">
        <div class="chrono-controls">
          <button class="ctl" type="button" data-scroll="-1" aria-label="Earlier">←</button>
          <button class="ctl" type="button" data-scroll="1" aria-label="Later">→</button>
          <button class="ctl ctl-now" type="button" data-jump="now">Today</button>
        </div>
        <p class="mono chrono-hint"><span class="drag-hint" aria-hidden="true"></span>Drag or scroll sideways<span class="hint-range"> · 2016 to now</span></p>
      </div>
      <div class="rail-wrap">
        <div class="rail" tabindex="0" aria-label="Timeline, scrolls horizontally">
          <div class="track" style="width:${trackWidth.toFixed(0)}px">
            <div class="years">${years.map((year) => `<span class="year${isQuiet(year) ? " quiet" : ""}" style="left:${px(`${year}-01`).toFixed(1)}px"><span class="year-label mono">${year}</span></span>`).join("")}</div>
            <div class="lanes">
              <span class="lane-name mono" style="top:8px">AutomatedPros</span>
              <span class="lane-name mono" style="top:96px">Infotech L.L.C</span>
              <span class="lane-name mono" style="top:184px">Earlier</span>
              ${bars}
            </div>
            <div class="pills"><span class="lane-name mono">Products</span><svg class="pill-links" aria-hidden="true">${leaders}</svg>${pills}</div>
            <div class="marks">${marks}</div>
            <div class="now" style="left:${px("2026-09").toFixed(1)}px"><span class="mono">now</span></div>
          </div>
        </div>
        <span class="rail-edge rail-edge-l" aria-hidden="true">‹</span>
        <span class="rail-edge rail-edge-r" aria-hidden="true">›</span>
      </div>
      <div class="scrub" aria-hidden="true"><span class="scrub-thumb"></span></div>
      ${detailNav}
      <div class="detail" id="${id}-detail" aria-live="polite" data-order="${order}">${details}</div>
    </div>`;
}

/* ---------- side dot navigation ---------- */
export function dotnav(items) {
  return `<nav class="dotnav" data-nav aria-label="Sections">${items
    .map(([href, label]) => `<a href="${href}"><span class="dot-label mono">${escapeHtml(label)}</span><span class="dot" aria-hidden="true"></span></a>`)
    .join("")}<span class="orb-companion"><svg class="companion-props" width="1" height="1" aria-hidden="true"><path class="companion-tether" /></svg><span class="companion-sprite" aria-hidden="true"><img src="/assets/companion/rest.png" alt="" draggable="false" /></span><span class="companion-ring"></span><span class="companion-edge"></span><span class="companion-balloon"></span><button class="companion-hit" type="button" aria-label="Play with the companion" title="Say hello"></button><span class="companion-status" aria-live="polite"></span></span><script src="/companion.js" defer></script></nav>`;
}
