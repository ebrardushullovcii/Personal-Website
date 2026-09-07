import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, extname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const dist = join(root, "dist");
const pageNames = ["work", "projects", "workflow", "about", "contact"];
const htmlFiles = ["index.html", ...pageNames.map((page) => `${page}.html`)];
const publicResume = join("assets", "resume", "Ebrar-Dushullovci-Resume.pdf");
const privateResume = join("assets", "references", "resume", "CV.pdf");
const publicAssetDirectories = [join("assets", "fonts"), join("assets", "icons")];
const referenceAssetsDirectory = join("assets", "references");

function isExternalReference(reference) {
  return (
    reference.startsWith("#") ||
    reference.startsWith("//") ||
    /^[a-z][a-z\d+.-]*:/i.test(reference)
  );
}

function referencedFile(reference, fromFile) {
  const trimmed = reference.trim();
  if (!trimmed || isExternalReference(trimmed)) return null;

  const pathOnly = trimmed.split("#", 1)[0].split("?", 1)[0];
  if (!pathOnly) return null;

  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathOnly);
  } catch {
    throw new Error(`Invalid encoded local reference in ${fromFile}: ${reference}`);
  }

  const absoluteTarget = decodedPath.startsWith("/")
    ? resolve(root, decodedPath.slice(1))
    : resolve(root, dirname(fromFile), decodedPath);
  const relativeTarget = relative(root, absoluteTarget);

  if (
    isAbsolute(relativeTarget) ||
    relativeTarget === ".." ||
    relativeTarget.startsWith(`..${sep}`)
  ) {
    throw new Error(`Local reference escapes the project root in ${fromFile}: ${reference}`);
  }

  return relativeTarget;
}

function extractReferences(contents, file) {
  const references = [];
  const pattern = extname(file) === ".css"
    ? /url\(\s*(["']?)([^"')]+)\1\s*\)/gi
    : /\b(?:href|src)\s*=\s*(["'])(.*?)\1/gi;

  for (const match of contents.matchAll(pattern)) {
    references.push(match[2]);
  }

  return references;
}

if (existsSync(dist)) {
  rmSync(dist, { recursive: true, force: true });
}

mkdirSync(dist, { recursive: true });

for (const file of ["index.html", "styles.css"]) {
  copyFileSync(join(root, file), join(dist, file));
}

for (const page of pageNames) {
  const html = execFileSync(process.execPath, [join(root, "pages.js"), page], {
    cwd: root,
    encoding: "utf8",
  });
  writeFileSync(join(root, `${page}.html`), html);
  writeFileSync(join(dist, `${page}.html`), html);
}

const referencedAssets = new Set();
for (const file of [...htmlFiles, "styles.css"]) {
  const contents = readFileSync(join(root, file), "utf8");
  for (const reference of extractReferences(contents, file)) {
    const localFile = referencedFile(reference, file);
    if (!localFile || [".html", ".css"].includes(extname(localFile).toLowerCase())) continue;
    referencedAssets.add(localFile);
  }
}

if (referencedAssets.has(privateResume)) {
  throw new Error(
    `Refusing to publish the private reference CV. Link pages to ${posixPath(publicResume)} instead.`,
  );
}

const forbiddenAsset = [...referencedAssets].find(
  (asset) =>
    ["data.js", "pages.js"].includes(asset) ||
    asset === referenceAssetsDirectory ||
    asset.startsWith(`${referenceAssetsDirectory}${sep}`),
);
if (forbiddenAsset) {
  throw new Error(`Refusing to publish source-only or reference asset: ${posixPath(forbiddenAsset)}`);
}

if (!referencedAssets.has(publicResume)) {
  throw new Error(`The public resume is not linked by the site: ${posixPath(publicResume)}`);
}

for (const asset of referencedAssets) {
  const source = join(root, asset);
  const target = join(dist, asset);
  if (!existsSync(source)) {
    throw new Error(`Referenced local asset does not exist: ${asset}`);
  }
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(source, target);
}

for (const directory of publicAssetDirectories) {
  const source = join(root, directory);
  if (!existsSync(source)) continue;
  cpSync(source, join(dist, directory), { recursive: true });
}

console.log(
  `Static site built to dist/ (${htmlFiles.length} pages, ${referencedAssets.size} referenced asset${referencedAssets.size === 1 ? "" : "s"}).`,
);

function posixPath(path) {
  return path.split(sep).join("/");
}
