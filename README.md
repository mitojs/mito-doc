# MitoJS documentation

English and Simplified Chinese guides for the MitoJS monitoring SDK, built with Astro Starlight and published on [GitHub Pages](https://mitojs.github.io/mito-doc/).

## Develop

Use the Node version in `.node-version`. Run `npm ci` and `npm run dev`, then open the local `/mito-doc/` URL. Use `npm run build` and `npm run preview` to try the production search index.

Edit the English Markdown in `src/content/docs/` and its Chinese counterpart in `src/content/docs/zh-CN/`. Use matching filenames for language switching. Page titles, descriptions and sidebar labels belong in frontmatter. Keep existing fragment identifiers when editing headings with historical bookmarks.

## Verify and publish

Run `npm run build` and `npm test` to check the static output. Install Chromium with `npx playwright install chromium` and run `npm run test:browser` for mobile and desktop navigation, search, copying code and the v4 example with its local receiver.

Pull requests run the same checks. A successful build on `master` deploys the verified artifact through the GitHub Pages environment. The previous dumi release is available on [the preserved publishing branch](https://github.com/mitojs/mito-doc/tree/gh-pages). Select that branch and its root directory as the Pages source to restore the previous publication.
