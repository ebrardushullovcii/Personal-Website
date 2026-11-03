// Renders the social preview image (assets/og.png, 1200x630) with headless Chrome.
// Usage: node scripts/make-og.mjs
import { existsSync, writeFileSync, unlinkSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { profile } from "../data.js";
import { accent, escapeHtml } from "../lib/html.js";

const root = process.cwd();
const htmlPath = join(root, "assets", "og.html");
const pngPath = join(root, "assets", "og.png");
const chrome =
  process.env.CHROME_PATH ||
  ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium"].find(existsSync);
if (!chrome) throw new Error("Chrome not found. Set CHROME_PATH.");

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  html,body{margin:0;width:1200px;height:630px;overflow:hidden}
  body{position:relative;background:#0b0b0d;color:#f2efe9;font-family:"Inter",-apple-system,"Segoe UI",Helvetica,Arial,sans-serif}
  .glow{position:absolute;inset:0;background:linear-gradient(90deg,transparent 95%,#ffffff04 95%),linear-gradient(transparent 95%,#ffffff04 95%);background-size:64px 64px}
  .wrap{position:absolute;inset:0;padding:78px 84px;display:flex;flex-direction:column;justify-content:space-between}
  .eyebrow{font-family:"JetBrains Mono",Menlo,monospace;font-size:20px;letter-spacing:.1em;text-transform:uppercase;color:#ffb454;display:flex;align-items:center;gap:14px}
  .dot{width:12px;height:12px;border-radius:50%;background:#ffb454;box-shadow:0 0 0 8px rgba(255,180,84,.15)}
  h1{margin:26px 0 0;font-size:74px;line-height:1.02;letter-spacing:-.03em;font-weight:800;max-width:900px}
  h1 em{font-family:Georgia,serif;font-weight:400;color:#ffb454}
  .name{font-size:30px;font-weight:600}
  .meta{font-family:"JetBrains Mono",Menlo,monospace;font-size:19px;color:#a3adbb;margin-top:10px}
  .bottom{display:flex;justify-content:space-between;align-items:flex-end}
  .mark{display:grid;place-items:center;width:64px;height:64px;border-radius:18px;background:#ffb454;color:#16120a;font-family:"JetBrains Mono",Menlo,monospace;font-weight:700;font-size:22px}
</style></head><body><div class="glow"></div><div class="wrap">
  <div><div class="eyebrow"><span class="dot"></span>${escapeHtml(profile.role)}</div><h1>${accent(profile.tagline)}</h1></div>
  <div class="bottom"><div><div class="name">${escapeHtml(profile.name)}</div><div class="meta">React · Next.js · TypeScript · Node.js · C# / .NET · SQL</div></div><div class="meta">Prishtina · Remote</div></div>
</div></body></html>`;

writeFileSync(htmlPath, html);
execFileSync(chrome, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--window-size=1200,630",
  "--force-device-scale-factor=1",
  "--virtual-time-budget=3000",
  `--screenshot=${pngPath}`,
  pathToFileURL(htmlPath).href,
], { stdio: "ignore" });
unlinkSync(htmlPath);
console.log(`Social image written to ${pngPath}`);
