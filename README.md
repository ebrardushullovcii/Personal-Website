# Personal website

Source of [ebrar-dushullovci.netlify.app](https://ebrar-dushullovci.netlify.app), my portfolio and resume.

It is a static site with no framework. All content lives in `data.js`. `site.js` renders it into `index.html`, `scripts/build-static.mjs` writes the deployable `dist/` folder, and `scripts/make-resume.mjs` turns the same data into the resume PDF. Netlify builds and publishes `main`.

```bash
npm install
npm run build   # index.html and dist/
npm run check   # every local reference in dist/ exists and nothing private leaked
npm run resume  # regenerate the resume PDF from data.js
npm run dev     # build, then serve dist/ on http://127.0.0.1:4173
```

Repo structure and working rules are in [AGENTS.md](AGENTS.md).
