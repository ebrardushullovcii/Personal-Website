// Copies the brand marks the site uses out of simple-icons into assets/icons/brands/ (run when the skill list changes).
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import * as si from "simple-icons";
import { BRAND_SLUGS } from "../lib/brands.js";

const dir = new URL("../assets/icons/brands/", import.meta.url);
rmSync(dir, { recursive: true, force: true });
mkdirSync(dir, { recursive: true });
const manifest = {};
for (const slug of new Set(Object.values(BRAND_SLUGS))) {
  const icon = si[`si${slug[0].toUpperCase()}${slug.slice(1)}`];
  if (!icon) throw new Error(`simple-icons has no icon for ${slug}`);
  writeFileSync(new URL(`${slug}.svg`, dir), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="${icon.path}"/></svg>\n`);
  manifest[slug] = `#${icon.hex}`;
}
writeFileSync(new URL("brands.json", dir), JSON.stringify(manifest, null, 2) + "\n");
console.log(`Wrote ${Object.keys(manifest).length} brand icons.`);
