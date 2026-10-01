import { copyFileSync, cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, extname, join, sep } from "node:path";
import { renderIndex, renderNotFound } from "../site.js";
import { profile } from "../data.js";
import { designs } from "../designs/index.js";

const root = process.cwd();
const dist = join(root, "dist");
const version = new Date().toISOString().slice(0, 10).replaceAll("-", "") + "-" + Date.now().toString(36).slice(-4);
const publicResume = "assets/resume/Ebrar-Dushullovci-Resume.pdf";
const copiedDirectories = ["assets/fonts", "assets/icons"];
const copiedFiles = ["app.js", "assets/og.png"];

if (existsSync(dist)) rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

const write = (relative, contents) => {
  mkdirSync(dirname(join(dist, relative)), { recursive: true });
  writeFileSync(join(dist, relative), contents);
};

// Pages: the main site plus every design variant under /designs/<slug>/.
const pages = [];
const indexHtml = renderIndex({ version, cssHref: "/styles.css" });
writeFileSync(join(root, "index.html"), indexHtml);
write("index.html", indexHtml);
write("styles.css", readFileSync(join(root, "styles.css"), "utf8"));
write("404.html", renderNotFound({ version, cssHref: "/styles.css" }));
pages.push("index.html", "404.html", "styles.css");
write("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${profile.siteUrl}/sitemap.xml\n`);
const lastmod = new Date().toISOString().slice(0, 10);
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    ["/", "/canvas/"].map((path) => `  <url><loc>${profile.siteUrl}${path}</loc><lastmod>${lastmod}</lastmod></url>`).join("\n") +
    `\n</urlset>\n`,
);

for (const design of designs) {
  const base = design.path || `designs/${design.slug}`;
  const cssHref = `/${base}/styles.css`;
  write(`${base}/index.html`, design.render({ version, cssHref, base: `/${base}` }));
  write(`${base}/styles.css`, readFileSync(join(root, "designs", design.slug, "styles.css"), "utf8"));
  pages.push(`${base}/index.html`, `${base}/styles.css`);
  const designScript = join(root, "designs", design.slug, "app.js");
  if (existsSync(designScript)) write(`${base}/app.js`, readFileSync(designScript, "utf8"));
}

for (const file of copiedFiles) {
  mkdirSync(dirname(join(dist, file)), { recursive: true });
  copyFileSync(join(root, file), join(dist, file));
}
for (const directory of copiedDirectories) {
  if (existsSync(join(root, directory))) cpSync(join(root, directory), join(dist, directory), { recursive: true });
}

// Collect every root-absolute local asset referenced by the pages.
const referencedAssets = new Set();
for (const page of pages) {
  const contents = readFileSync(join(dist, page), "utf8");
  const pattern = extname(page) === ".css" ? /url\(\s*["']?([^"')]+)["']?\s*\)/g : /\b(?:href|src|poster|data-src|data-poster)="([^"]+)"/g;
  for (const match of contents.matchAll(pattern)) {
    const ref = match[1].trim();
    if (/^(#|%23|https?:|mailto:|data:|\/\/)/.test(ref)) continue;
    if (!ref.startsWith("/")) throw new Error(`Use root-absolute paths for local references (${page}): ${ref}`);
    const file = decodeURIComponent(ref.split("?")[0].split("#")[0]).slice(1);
    if (!file || file.endsWith("/") || [".html", ".css", ".js"].includes(extname(file).toLowerCase()) || file.startsWith("designs/") || file.startsWith("canvas/")) continue;
    if (file.startsWith("assets/references/") || ["data.js", "site.js"].includes(file)) {
      throw new Error(`Refusing to publish source-only or reference asset: ${file}`);
    }
    referencedAssets.add(file);
  }
}
if (!referencedAssets.has(publicResume)) throw new Error(`The public resume is not linked by the site: ${publicResume}`);

// Copy referenced assets under content-hashed names so long cache lifetimes never serve a stale image.
const hashedNames = new Map();
for (const asset of referencedAssets) {
  const source = join(root, asset);
  if (!existsSync(source)) throw new Error(`Referenced local asset does not exist: ${asset}`);
  const keepName = asset === publicResume || copiedDirectories.some((directory) => asset.startsWith(`${directory}/`)) || asset === "assets/og.png" || asset === "assets/favicon.svg";
  const hash = createHash("sha1").update(readFileSync(source)).digest("hex").slice(0, 8);
  const target = keepName ? asset : asset.replace(/(\.[a-z0-9]+)$/i, `.${hash}$1`);
  hashedNames.set(asset, target);
  mkdirSync(dirname(join(dist, target)), { recursive: true });
  copyFileSync(source, join(dist, target));
}
for (const page of pages) {
  let contents = readFileSync(join(dist, page), "utf8");
  for (const [original, hashed] of hashedNames) {
    if (original !== hashed) contents = contents.replaceAll(`/${original}`, `/${hashed}`);
  }
  writeFileSync(join(dist, page), contents);
}

console.log(`Static site built to dist/ (version ${version}, ${designs.length + 1} designs, ${referencedAssets.size} referenced assets).`);
