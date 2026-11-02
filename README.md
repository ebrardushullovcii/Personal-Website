# Personal website

Source of [ebrar-dushullovci.netlify.app](https://ebrar-dushullovci.netlify.app): my portfolio site and resume PDF, generated from one content file by a small custom JavaScript build.

![Desktop portfolio homepage with an introduction and project previews](.github/images/portfolio-preview.png)

_Current public homepage, captured in November 2026. [Open the website](https://ebrar-dushullovci.netlify.app)._

## How it is built

There is no frontend framework. Content lives in `data.js`; `site.js` and `lib/html.js` render it. The static build writes the root `index.html` and deployable `dist/` folder. The resume generator reads the same content and exports the PDF. Netlify builds and publishes `main`.

The root `index.html` is generated build output; edit its source files instead. [.gitattributes](.gitattributes) marks that file as generated for GitHub's language statistics.

## Building from source

Use Node.js/npm for the static build. The local development server also needs Python 3. The PDF generator needs Chrome or Chromium; set `CHROME_PATH` if the browser is not auto-detected. See [the generator](scripts/make-resume.mjs) for its configuration.

```bash
npm install
npm run build   # generate index.html and dist/
npm run dev     # build, then serve dist/ on http://127.0.0.1:4173
```

To regenerate the PDF separately:

```bash
npm run resume
```

## Checks

`npm run check` checks local references in the built HTML/CSS, a stale-email pattern, and a fixed list of source/reference paths that must not appear in `dist/`. It does not inspect PDF or image contents, or repository history.

## Documentation

- [Documentation index](docs/README.md)
- [Build script](scripts/build-static.mjs)
- [Resume generator](scripts/make-resume.mjs)
- [Built-site checks](scripts/check-site.mjs)

## Contributing

Update content in `data.js` and rendering in the source templates. Keep generated files aligned with source changes, and follow the repository rules in [AGENTS.md](AGENTS.md).
