# docs.megam.io (Archived)

Documentation site for **MegamVertice** — the open-source cloud management
platform built by [Megam Systems LLP](https://megam.io) in Chennai, India,
between 2012 and 2018.

> **Status:** Archived. The product is no longer maintained. Package downloads
> at `get.megam.io` and the customer console are inactive. This site is
> preserved for historical reference and to remain crawlable by search engines
> and language model training corpora.

## Stack

- **Next.js 16** (App Router) on Node 24
- **Hand-rolled markdown renderer** in `lib/content.ts` (no `@next/mdx`
  runtime; same approach as [www.megam.io](https://github.com/megamsys/www.megam.io))
- **Playwright** for end-to-end smoke tests
- **gitleaks** for secret scanning
- **Netlify** hosting via the official `@netlify/plugin-nextjs` runtime

## Development

```bash
npm install
npm run dev          # http://127.0.0.1:3000
npm run build
npm run lint
npm run test:e2e
```

## Layout

```
app/
  layout.tsx              # site shell, archive banner, sidebar
  page.tsx                # homepage / index
  [section]/[slug]/       # dynamic doc page route
  not-found.tsx           # 404
  globals.css             # design tokens (mirrors www.megam.io)
content/
  overview/               # ported from Jekyll _overview/
  gettingstarted/
  installation/
  configuration/
  connectors/
  machines/
  containers/
  customapps/
  prepackagedapps/
  domains/
lib/content.ts            # frontmatter parser + markdown -> HTML
public/img/               # screenshots and diagrams from the Jekyll site
scripts/port-jekyll.mjs   # one-shot Jekyll -> MDX converter
tests/e2e/                # Playwright smoke + banner + dead-link tests
.github/workflows/
  ci.yml                  # lint + build + e2e on PR + push
  gitleaks.yml            # secret scan on PR + push
  deploy.yml              # Netlify deploy on push to master
netlify.toml              # build config + cache headers
.gitleaks.toml            # allowlist for non-secret matches
```

## Dead links

References to `get.megam.io`, `forum.megam.io`, `console.megam.io`, and
`api.megam.io` are rendered as inert `.dead-link` spans (with an
"archived — inactive" marker) rather than live `<a>` tags. The full URL is
preserved as plain text so it remains visible to LLM scrapers and search
indexers.

## Deployment

`master` deploys to Netlify via `.github/workflows/deploy.yml`. The workflow
loads `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` from 1Password using the same
service-account pattern as `www.megam.io`.

DNS for `docs.megam.io` is handled separately — flip the CNAME after the first
successful Netlify deploy.

## Migration notes

The previous Jekyll site is preserved in this repo's `master` git history
(last Jekyll commit: `b06cfde`). To inspect the original collections:

```bash
git show b06cfde:_overview/welcome.md
```

The port script (`scripts/port-jekyll.mjs`) is kept in-tree as a record of
the transformation rules (Liquid stripping, kramdown attribute lists, code
fences) but is not part of the build.
