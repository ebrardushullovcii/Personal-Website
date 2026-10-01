// Sanity checks for the built site: every local link/asset in dist/ exists and no private files leaked.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const failures = [];
const pages = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if ([".html", ".css"].includes(extname(full))) pages.push(full);
  }
};
walk(dist);
let total = 0;
for (const page of pages) {
  const contents = readFileSync(page, "utf8");
  const pattern = extname(page) === ".css" ? /url\(\s*["']?([^"')]+)["']?\s*\)/g : /\b(?:href|src|poster|data-src|data-poster)="([^"]+)"/g;
  for (const match of contents.matchAll(pattern)) {
    const ref = match[1];
    if (/^(#|%23|https?:|mailto:|data:|\/\/)/.test(ref)) continue;
    total += 1;
    const file = decodeURIComponent(ref.split("?")[0].split("#")[0]);
    const target = file.endsWith("/") ? `${file}index.html` : file;
    if (!existsSync(join(dist, target))) failures.push(`Missing in dist/: ${file} (from ${page.replace(dist, "")})`);
  }
  if (/hello@ebrar\.dev/.test(contents)) failures.push(`Stale contact email in ${page.replace(dist, "")}`);
}
for (const forbidden of ["assets/references", "data.js", "site.js", "lib"]) {
  if (existsSync(join(dist, forbidden))) failures.push(`Private or source file leaked into dist/: ${forbidden}`);
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`check-site: ${pages.length} pages, ${total} references verified.`);
