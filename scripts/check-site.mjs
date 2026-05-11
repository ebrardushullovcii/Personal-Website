import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const requiredFiles = [
  "index.html",
  "work.html",
  "projects.html",
  "workflow.html",
  "about.html",
  "contact.html",
  "styles.css",
  "assets/references/resume/CV.pdf",
  "assets/references/design/personal-website.png",
];

const missing = requiredFiles.filter((file) => !existsSync(join(root, file)));
if (missing.length > 0) {
  console.error(`Missing required files:\n${missing.map((file) => `- ${file}`).join("\n")}`);
  process.exit(1);
}

const html = readFileSync(join(root, "index.html"), "utf8");
const css = readFileSync(join(root, "styles.css"), "utf8");

const requiredContent = [
  "Ebrar",
  "Software Engineer",
  "I build useful",
  "CURRENT FOCUS",
  "EXPERIENCE",
  "SELECTED WORK PROJECTS",
  "AI WORKFLOW",
  "TECH STACK",
  "about.html",
  "work.html",
  "projects.html",
  "CONTACT",
  "hello@ebrar.dev",
];

const missingContent = requiredContent.filter((text) => !html.includes(text));
if (missingContent.length > 0) {
  console.error(`Missing expected page content:\n${missingContent.map((text) => `- ${text}`).join("\n")}`);
  process.exit(1);
}

const requiredStyles = [".app-frame", ".sidebar", ".hero-grid", ".timeline", ".project-card", "@media"];
const missingStyles = requiredStyles.filter((text) => !css.includes(text));
if (missingStyles.length > 0) {
  console.error(`Missing expected CSS selectors:\n${missingStyles.map((text) => `- ${text}`).join("\n")}`);
  process.exit(1);
}

for (const page of ["work", "projects", "workflow", "about", "contact"]) {
  const pageHtml = readFileSync(join(root, `${page}.html`), "utf8");
  if (!pageHtml.includes(`aria-current="page"`) || !pageHtml.includes("sidebar-stack")) {
    console.error(`Generated detail page failed structural checks: ${page}.html`);
    process.exit(1);
  }
}

console.log("Site structure check passed.");
