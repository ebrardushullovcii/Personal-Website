# Personal website

Source of [ebrar-dushullovci.netlify.app](https://ebrar-dushullovci.netlify.app): my portfolio site, generated from one content file by a small custom JavaScript build, with a separately reviewed resume PDF.

![Desktop portfolio homepage with an introduction and project previews](.github/images/portfolio-preview.png)

_Current public homepage, captured in November 2026. [Open the website](https://ebrar-dushullovci.netlify.app)._

## How it is built

There is no frontend framework. Content lives in `data.js`; `site.js` and `lib/html.js` render it. The static build writes the root `index.html` and deployable `dist/` folder. Netlify builds and publishes `main`.

The root `index.html` is generated build output; edit its source files instead. [.gitattributes](.gitattributes) marks that file as generated for GitHub's language statistics.

## Building from source

Use Node.js/npm for the static build. The local development server also needs Python 3. The optional social-image renderer needs Chrome or Chromium; set `CHROME_PATH` if the browser is not auto-detected.

```bash
npm install
npm run build   # generate index.html and dist/
npm run dev     # build, then serve dist/ on http://127.0.0.1:4173
```

The public resume is maintained separately. Replace `assets/resume/Ebrar-Dushullovci-Resume.pdf` only with a newly reviewed public PDF, then rebuild. The old resume commands are retired and cannot overwrite the PDF.

## Checks

`npm run check` checks local references in the built HTML/CSS, a stale-email pattern, and a fixed list of source/reference paths that must not appear in `dist/`. It does not inspect PDF or image contents, or repository history.

## Documentation

- [Documentation index](docs/README.md)
- [Build script](scripts/build-static.mjs)
- [Public resume](assets/resume/Ebrar-Dushullovci-Resume.pdf)
- [Built-site checks](scripts/check-site.mjs)

## Contributing

Update content in `data.js` and rendering in the source templates. Keep generated files aligned with source changes, and follow the repository rules in [AGENTS.md](AGENTS.md).
