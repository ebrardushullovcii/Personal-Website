# AGENTS.md

Single-page portfolio for Ebrar Dushullovci, built as static HTML with no framework.

## Layout

- `data.js`: all content (profile, highlights, work, projects, experience, skills, about, contact). Edit content here.
- `site.js`: renders `index.html` (the "Journal" design) from `data.js`.
- `lib/html.js`: shared helpers (escaping, inline icons, system diagram SVG, loop ring, the hero screenshot collage, the horizontal chronology, the side dot nav).
- `designs/canvas/`: Canvas mode, published at `/canvas/` (noindex) and linked from a small header link. Same data, rendered as a pannable map of connected nodes with a stepped tour. Phones get a note and a link back.
- `styles.css`, `app.js`: styling and the small interaction layer (mobile nav, scroll reveal, count-up, active nav).
- `scripts/build-static.mjs`: writes `index.html`, every design, and the deployable `dist/` folder. Referenced images are copied under content-hashed names, so replacing an image never needs a rename. All local paths are root-absolute (`/assets/...`). `dist/` is tracked as the deployment artifact.
- `scripts/make-resume.mjs`: regenerates the public resume PDF from `data.js` with headless Chrome. Run it after changing experience or profile content.
- `scripts/make-og.mjs`: regenerates the social preview image `assets/og.png`.
- `scripts/check-site.mjs`: verifies every local reference in `dist/` exists and no private file leaked.
- Product media lives in `assets/projects/`: a still, an app icon (`*-mark.png`), and a short muted loop (`*-loop.mp4`) plus a 35 to 38-second film (`*-film.mp4`) copied from each product's own landing page. Loops use `preload="none"` and load only in view (shelf) or on hover (hero collage); films open in one shared `<dialog>` and fall back to the plain file without JavaScript. The asset scanner also follows `poster`, `data-src` and `data-poster`. Nordri's loop has padding baked in, so its `zoom` (1.18) crops to the app window; `nordri.jpg` is the same crop.

## Commands

```bash
npm run build     # index.html + dist/
npm run check     # sanity checks on dist/
npm run resume    # assets/resume/Ebrar-Dushullovci-Resume.pdf
npm run dev       # build, then serve dist/ on http://127.0.0.1:4173
```

## Rules

- Public contact details only: `ebrar.dushullovci@gmail.com`, GitHub, and LinkedIn. Never add phone, address, or date of birth. `assets/references/` stays gitignored.
- Keep copy factual and hire-safe: no invented metrics, no client screenshots without permission, calm tone, no marketing language.
- `app.js` is shared by the site and canvas and feature-detects what the page contains (nav toggle, reveal, tilt, copy email, collage parallax, chronology). `designs/canvas/app.js` adds pan, zoom, connectors, minimap, and the tour.
- The chronology in Experience is driven by `experience` (needs `start`/`end` as YYYY-MM) and `milestones` in `data.js`. Products and releases become pills, everything else becomes axis marks; rows are packed automatically so labels never overlap.
- Deploy: run the Netlify connector's deploy-site command from this folder (site id 9a8530fb-b300-4108-8f05-71cb47ef07c9); it uploads the folder and builds with `npm run build`.
- Verify visually after UI changes at desktop (1440) and mobile (390) widths before calling work done.
- Respect `prefers-reduced-motion`; animations must degrade to static content, and content must be visible without JavaScript.
