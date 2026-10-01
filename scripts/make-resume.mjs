// Builds the public resume PDF from data.js using headless Chrome (no npm dependencies).
// Usage: npm run resume
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { about, experience, personalProjects, profile, stackGroups } from "../data.js";
import { pointText } from "../lib/html.js";
import { escapeHtml } from "../site.js";

const root = process.cwd();
const outDir = join(root, "assets", "resume");
const htmlPath = join(outDir, "resume.html");
const pdfPath = join(outDir, "Ebrar-Dushullovci-Resume.pdf");
const chrome =
  process.env.CHROME_PATH ||
  ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium"].find(existsSync);

if (!chrome) {
  throw new Error("Chrome not found. Set CHROME_PATH to a Chrome or Chromium binary.");
}

const summary =
  "Senior full-stack software engineer with 7+ years of professional experience building real-time operational products, QA automation platforms, business software, and AI-assisted developer tooling. Strongest in React, Next.js, TypeScript, Node.js, and C#/.NET on SQL Server and PostgreSQL. Returned to hands-on engineering after leading customer experience and QA, and now ships end to end: from understanding the workflow to verified, documented delivery. Remote from Prishtina, Kosovo (CET), C2 English, available immediately.";

const skillLine = (group) => `<div class="skill-row"><strong>${escapeHtml(group.name)}</strong><span>${group.items.map(escapeHtml).join(", ")}</span></div>`;

const jobBlock = (job) => `
  <article class="job">
    <div class="job-head">
      <h3>${escapeHtml(job.title)} <span class="company">· ${escapeHtml(job.company)}</span></h3>
      <span class="period">${escapeHtml(job.period)}</span>
    </div>
    <p class="mode">${escapeHtml(job.mode)}</p>
    <p class="summary">${escapeHtml(job.summary)}</p>
    <ul>${job.points.map((point) => (typeof point === "string" ? `<li>${escapeHtml(point)}</li>` : `<li><b>${escapeHtml(point.result)}</b>${point.how ? ` ${escapeHtml(point.how)}` : ""}</li>`)).join("")}</ul>
  </article>`;

const projectBlock = (project) => `
  <article class="project">
    <div class="job-head"><h3>${escapeHtml(project.name)} <span class="company">· ${escapeHtml(project.status)}</span></h3><span class="period">${escapeHtml(project.url.replace("https://", ""))}</span></div>
    <p class="summary">${escapeHtml(project.summary)} ${escapeHtml(project.points[0])}</p>
    <p class="stack">${escapeHtml(Array.isArray(project.stack) ? project.stack.join(" · ") : project.stack)}</p>
  </article>`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(profile.name)} — Resume</title>
<style>
  @page { size: A4; margin: 14mm 15mm 15mm; }
  * { box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { margin: 0; font-family: "Inter", -apple-system, "Segoe UI", Helvetica, Arial, sans-serif; color: #1d232b; font-size: 9.6pt; line-height: 1.38; }
  h1, h2, h3, p, ul { margin: 0; }
  a { color: inherit; text-decoration: none; }
  header { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; padding-bottom: 9pt; border-bottom: 2px solid #12b48c; }
  h1 { font-size: 22pt; letter-spacing: -0.02em; line-height: 1.05; }
  .role { margin-top: 3pt; font-size: 11.5pt; font-weight: 600; color: #12b48c; }
  .contact { text-align: right; font-size: 9.2pt; color: #4b5563; line-height: 1.5; }
  .contact strong { color: #1d232b; }
  section { margin-top: 10pt; }
  h2 { font-size: 8.6pt; letter-spacing: 0.12em; text-transform: uppercase; color: #12b48c; margin-bottom: 5pt; padding-bottom: 3pt; border-bottom: 1px solid #e3e7ec; }
  .lead { font-size: 10pt; color: #2b3440; }
  .skill-row { display: grid; grid-template-columns: 78pt 1fr; gap: 8pt; padding: 1.6pt 0; font-size: 9.6pt; }
  .skill-row strong { color: #1d232b; }
  .skill-row span { color: #3c4652; }
  .job, .project { margin-top: 7pt; }
  .project { break-inside: avoid; }
  .job-head, h2 { break-after: avoid; }
  .job-head, .summary { break-inside: avoid; }
  li { break-inside: avoid; }
  li b { font-weight: 600; color: #1d232b; }
  .job-head { display: flex; justify-content: space-between; gap: 12pt; align-items: baseline; }
  h3 { font-size: 10.8pt; font-weight: 700; }
  .company { font-weight: 500; color: #4b5563; }
  .period { flex: none; font-size: 9pt; color: #4b5563; font-variant-numeric: tabular-nums; }
  .mode { font-size: 8.8pt; color: #6b7280; margin-top: 1pt; }
  .summary { margin-top: 2.5pt; color: #2b3440; }
  ul { margin-top: 3pt; padding-left: 13pt; }
  li { margin: 1.6pt 0; padding-left: 2pt; color: #3c4652; }
  li::marker { color: #12b48c; }
  .stack { margin-top: 2pt; font-size: 8.8pt; color: #6b7280; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16pt; }
  .fact { display: grid; grid-template-columns: 70pt 1fr; gap: 8pt; padding: 1.6pt 0; font-size: 9.6pt; }
  .fact strong { color: #1d232b; }
  .fact span { color: #3c4652; }
</style>
</head>
<body>
  <header>
    <div>
      <h1>${escapeHtml(profile.name)}</h1>
      <p class="role">${escapeHtml(profile.role)}</p>
    </div>
    <div class="contact">
      <div><strong><a href="mailto:${profile.email}">${escapeHtml(profile.email)}</a></strong></div>
      <div><a href="${profile.linkedin}">${escapeHtml(profile.linkedin.replace("https://www.", "").replace(/\/$/, ""))}</a></div>
      <div><a href="${profile.github}">${escapeHtml(profile.github.replace("https://", ""))}</a></div>
      <div>${escapeHtml(profile.location)} · Remote (${escapeHtml(profile.timezone)})</div>
    </div>
  </header>

  <section>
    <h2>Summary</h2>
    <p class="lead">${escapeHtml(summary)}</p>
  </section>

  <section>
    <h2>Skills</h2>
    ${stackGroups.map(skillLine).join("")}
  </section>

  <section>
    <h2>Experience</h2>
    ${experience.map(jobBlock).join("")}
    <p class="mode" style="margin-top:6pt">Earlier: Project Manager and Digital Marketing Manager at Beautyque (2017–2018); Technical Support Agent at Bit by Bit (2017).</p>
  </section>

  <section>
    <h2>Selected personal projects</h2>
    ${personalProjects.map(projectBlock).join("")}
  </section>

  <section class="two-col">
    <div>
      <h2>Education</h2>
      <div class="fact"><strong>Degree</strong><span>${escapeHtml(about.facts.find((fact) => fact.label === "Education").value)}, Prishtina</span></div>
    </div>
    <div>
      <h2>Languages &amp; availability</h2>
      <div class="fact"><strong>Languages</strong><span>English (C2, proficient), Albanian (native)</span></div>
      <div class="fact"><strong>Availability</strong><span>Available now, no notice period. Remote, or hybrid within Europe.</span></div>
    </div>
  </section>
</body>
</html>
`;

mkdirSync(outDir, { recursive: true });
writeFileSync(htmlPath, html);
execFileSync(chrome, [
  "--headless=new",
  "--disable-gpu",
  "--no-pdf-header-footer",
  "--run-all-compositor-stages-before-draw",
  "--virtual-time-budget=4000",
  `--print-to-pdf=${pdfPath}`,
  pathToFileURL(htmlPath).href,
], { stdio: "ignore" });
unlinkSync(htmlPath);
console.log(`Resume written to ${pdfPath}`);
