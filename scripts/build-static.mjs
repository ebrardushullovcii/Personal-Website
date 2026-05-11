import { copyFileSync, cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const dist = join(root, "dist");

if (existsSync(dist)) {
  rmSync(dist, { recursive: true, force: true });
}

mkdirSync(dist, { recursive: true });

for (const file of ["index.html", "styles.css", "data.js", "pages.js"]) {
  copyFileSync(join(root, file), join(dist, file));
}

for (const page of ["work", "projects", "workflow", "about", "contact"]) {
  const html = execFileSync(process.execPath, [join(root, "pages.js"), page], {
    cwd: root,
    encoding: "utf8",
  });
  writeFileSync(join(root, `${page}.html`), html);
  writeFileSync(join(dist, `${page}.html`), html);
}

const resumeSource = join(root, "assets", "references", "resume", "CV.pdf");
const resumeTarget = join(dist, "assets", "references", "resume", "CV.pdf");

if (existsSync(resumeSource)) {
  mkdirSync(dirname(resumeTarget), { recursive: true });
  copyFileSync(resumeSource, resumeTarget);
}

const designSource = join(root, "assets", "references", "design");
const designTarget = join(dist, "assets", "references", "design");
if (existsSync(designSource)) {
  cpSync(designSource, designTarget, { recursive: true });
}

console.log("Static site built to dist/");
