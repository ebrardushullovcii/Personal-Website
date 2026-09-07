import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, isAbsolute, join, relative, resolve, sep } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const pageNames = ["work", "projects", "workflow", "about", "contact"];
const htmlFiles = ["index.html", ...pageNames.map((page) => `${page}.html`)];
const siteFiles = [...htmlFiles, "styles.css"];
const publicResume = "assets/resume/Ebrar-Dushullovci-Resume.pdf";
const privateResume = "assets/references/resume/CV.pdf";
const privateResumeFiles = [
  privateResume,
  "assets/references/resume/page1.png",
  "assets/references/resume/page2.png",
  "assets/references/resume/page3.png",
];
const publicAssetDirectories = ["assets/fonts", "assets/icons"];

function fail(message) {
  console.error(message);
  process.exit(1);
}

for (const file of privateResumeFiles) {
  if (existsSync(join(root, file))) {
    fail(`Private resume reference must remain outside the repository: ${file}`);
  }
}

function posixPath(path) {
  return path.split(sep).join("/");
}

function listFiles(directory, base = directory) {
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = join(directory, entry.name);
    if (entry.isDirectory()) return listFiles(absolute, base);
    return [posixPath(relative(base, absolute))];
  });
}

function isExternalReference(reference) {
  return reference.startsWith("//") || /^[a-z][a-z\d+.-]*:/i.test(reference);
}

function resolveLocalReference(reference, fromFile, baseDirectory) {
  const trimmed = reference.trim();
  if (!trimmed || isExternalReference(trimmed)) return null;

  const hashIndex = trimmed.indexOf("#");
  const fragment = hashIndex >= 0 ? trimmed.slice(hashIndex + 1) : "";
  const beforeHash = hashIndex >= 0 ? trimmed.slice(0, hashIndex) : trimmed;
  const pathOnly = beforeHash.split("?", 1)[0];

  let decodedPath;
  let decodedFragment;
  try {
    decodedPath = decodeURIComponent(pathOnly);
    decodedFragment = decodeURIComponent(fragment);
  } catch {
    fail(`Invalid encoded local reference in ${fromFile}: ${reference}`);
  }

  const target = !decodedPath
    ? resolve(baseDirectory, fromFile)
    : decodedPath.startsWith("/")
      ? resolve(baseDirectory, decodedPath.slice(1))
      : resolve(baseDirectory, dirname(fromFile), decodedPath);
  const relativeTarget = relative(baseDirectory, target);

  if (
    isAbsolute(relativeTarget) ||
    relativeTarget === ".." ||
    relativeTarget.startsWith(`..${sep}`)
  ) {
    fail(`Local reference escapes the site root in ${fromFile}: ${reference}`);
  }

  return { fragment: decodedFragment, relativeTarget: posixPath(relativeTarget) };
}

function extractHtmlReferences(contents) {
  return [...contents.matchAll(/\b(?:href|src)\s*=\s*(["'])(.*?)\1/gi)].map((match) => match[2]);
}

function extractCssReferences(contents) {
  return [...contents.matchAll(/url\(\s*(["']?)([^"')]+)\1\s*\)/gi)].map((match) => match[2]);
}

function documentAnchors(contents) {
  const anchors = new Set();
  for (const match of contents.matchAll(/\b(?:id|name)\s*=\s*(["'])(.*?)\1/gi)) {
    anchors.add(match[2]);
  }
  return anchors;
}

function validateLocalReferences(baseDirectory) {
  const referencedFiles = new Set(siteFiles);

  for (const file of htmlFiles) {
    const source = join(baseDirectory, file);
    if (!existsSync(source)) fail(`Missing site page: ${posixPath(relative(root, source))}`);
    const contents = readFileSync(source, "utf8");

    for (const reference of extractHtmlReferences(contents)) {
      const resolved = resolveLocalReference(reference, file, baseDirectory);
      if (!resolved) continue;

      const target = join(baseDirectory, resolved.relativeTarget);
      if (!existsSync(target) || !statSync(target).isFile()) {
        fail(`Broken local reference in ${posixPath(relative(root, source))}: ${reference}`);
      }

      referencedFiles.add(resolved.relativeTarget);
      if (resolved.fragment && extname(target).toLowerCase() === ".html") {
        const targetContents = readFileSync(target, "utf8");
        if (!documentAnchors(targetContents).has(resolved.fragment)) {
          fail(
            `Missing fragment target in ${posixPath(relative(root, source))}: ${reference}`,
          );
        }
      }
    }
  }

  const css = readFileSync(join(baseDirectory, "styles.css"), "utf8");
  for (const reference of extractCssReferences(css)) {
    const resolved = resolveLocalReference(reference, "styles.css", baseDirectory);
    if (!resolved) continue;
    const target = join(baseDirectory, resolved.relativeTarget);
    if (!existsSync(target) || !statSync(target).isFile()) {
      fail(`Broken local asset reference in ${posixPath(relative(root, join(baseDirectory, "styles.css")))}: ${reference}`);
    }
    referencedFiles.add(resolved.relativeTarget);
  }

  return referencedFiles;
}

for (const file of ["index.html", "pages.js", "data.js", "styles.css"]) {
  if (!existsSync(join(root, file))) fail(`Missing required source file: ${file}`);
}

for (const page of pageNames) {
  const generated = execFileSync(process.execPath, [join(root, "pages.js"), page], {
    cwd: root,
    encoding: "utf8",
  });
  const rootPage = join(root, `${page}.html`);
  if (!existsSync(rootPage)) fail(`Missing generated root page: ${page}.html`);
  if (readFileSync(rootPage, "utf8") !== generated) {
    fail(`${page}.html is stale. Run npm run build to regenerate it from pages.js and data.js.`);
  }
}

if (!existsSync(dist)) fail("Missing dist/. Run npm run build before npm run check.");

for (const file of siteFiles) {
  const source = join(root, file);
  const deployed = join(dist, file);
  if (!existsSync(deployed)) fail(`Missing deploy output: dist/${file}`);
  if (!readFileSync(source).equals(readFileSync(deployed))) {
    fail(`Deploy output is stale: dist/${file}`);
  }
}

const sourceReferences = validateLocalReferences(root);
const distReferences = validateLocalReferences(dist);
if (!sourceReferences.has(publicResume)) {
  fail(`The site must link the sanitized public resume: ${publicResume}`);
}
if (sourceReferences.has(privateResume) || existsSync(join(dist, privateResume))) {
  fail(`The private reference CV must never be linked or shipped: ${privateResume}`);
}
const forbiddenReference = [...sourceReferences].find(
  (file) => ["data.js", "pages.js"].includes(file) || file.startsWith("assets/references/"),
);
if (forbiddenReference) {
  fail(`Source-only and reference assets must not be linked or shipped: ${forbiddenReference}`);
}
const publicDirectoryFiles = publicAssetDirectories.flatMap((directory) =>
  listFiles(join(root, directory)).map((file) => `${directory}/${file}`),
);
const expectedDistFiles = [...new Set([...sourceReferences, ...publicDirectoryFiles])].sort();
const actualDistFiles = listFiles(dist).sort();

if (JSON.stringify(actualDistFiles) !== JSON.stringify(expectedDistFiles)) {
  const expected = new Set(expectedDistFiles);
  const actual = new Set(actualDistFiles);
  const missing = expectedDistFiles.filter((file) => !actual.has(file));
  const unexpected = actualDistFiles.filter((file) => !expected.has(file));
  fail(
    [
      "dist/ does not contain exactly the deployable site files.",
      missing.length ? `Missing:\n${missing.map((file) => `- ${file}`).join("\n")}` : "",
      unexpected.length ? `Unexpected:\n${unexpected.map((file) => `- ${file}`).join("\n")}` : "",
    ].filter(Boolean).join("\n"),
  );
}

for (const file of expectedDistFiles) {
  const source = join(root, file);
  const deployed = join(dist, file);
  if (!readFileSync(source).equals(readFileSync(deployed))) {
    fail(`Deployed file differs from its source: dist/${file}`);
  }
}

if (JSON.stringify([...sourceReferences].sort()) !== JSON.stringify([...distReferences].sort())) {
  fail("Root pages and dist pages do not resolve to the same local files.");
}

const html = readFileSync(join(root, "index.html"), "utf8");
const css = readFileSync(join(root, "styles.css"), "utf8");

const requiredContent = [
  "Ebrar Dushullovci",
  "Software Engineer",
  "I build useful",
  "CURRENT FOCUS",
  "EXPERIENCE",
  "SELECTED PROFESSIONAL SYSTEMS",
  "HOW I WORK",
  "CORE STACK",
  "about.html",
  "work.html",
  "projects.html",
  "CONTACT",
  "hello@ebrar.dev",
];
const missingContent = requiredContent.filter((text) => !html.includes(text));
if (missingContent.length) {
  fail(`Missing expected homepage content:\n${missingContent.map((text) => `- ${text}`).join("\n")}`);
}

const requiredStyles = [
  ".app-frame",
  ".sidebar",
  ".hero-grid",
  ".timeline",
  ".project-card",
  ".project-row-list",
  ".workflow-map-section",
  ".contact-shell",
  "@media",
];
const missingStyles = requiredStyles.filter((text) => !css.includes(text));
if (missingStyles.length) {
  fail(`Missing expected CSS selectors:\n${missingStyles.map((text) => `- ${text}`).join("\n")}`);
}

const retiredContent = [
  "Acme Inc.",
  "Beta Systems",
  "Gamma Labs",
  "Drop project screenshot here",
  "Built with Next.js",
  "© 2025",
  "agent-browser",
  "SIDE QUESTS BEFORE ENGINEERING",
  "Part-time · concurrent",
  privateResume,
];

for (const file of htmlFiles) {
  const pageHtml = readFileSync(join(root, file), "utf8");
  const stale = retiredContent.filter((text) => pageHtml.includes(text));
  if (stale.length) {
    fail(`Retired placeholder content found in ${file}:\n${stale.map((text) => `- ${text}`).join("\n")}`);
  }
}

for (const page of pageNames) {
  const pageHtml = readFileSync(join(root, `${page}.html`), "utf8");
  if (
    !pageHtml.includes('aria-current="page"') ||
    !pageHtml.includes("sidebar-stack") ||
    !pageHtml.includes('id="main-content"')
  ) {
    fail(`Generated detail page failed structural checks: ${page}.html`);
  }
}

const workHtml = readFileSync(join(root, "work.html"), "utf8");
for (const expected of ["AutomatedPros", "Infotech L.L.C", "Concurrent consulting", "EARLIER ROLES"]) {
  if (!workHtml.includes(expected)) fail(`Work page is missing expected context: ${expected}`);
}

const workflowHtml = readFileSync(join(root, "workflow.html"), "utf8");
for (const expected of ["GRILL ME", "CODE QUALITY REVIEW", "VISUAL QA", "HANDOFF"]) {
  if (!workflowHtml.includes(expected)) fail(`Workflow page is missing expected review mode: ${expected}`);
}

const projectsHtml = readFileSync(join(root, "projects.html"), "utf8");
if (!projectsHtml.includes('id="personal"')) {
  fail("Projects page is missing the #personal anchor used by the homepage.");
}

console.log(
  `Site check passed: ${htmlFiles.length} pages are generated, linked, fragment-safe, and exactly mirrored in dist/.`,
);
