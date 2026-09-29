# Working in this codebase

This is Alan Belferrag's personal site (alan-ops.dev), built on the Astro
Rocket theme. This file tells you where things live and which conventions
to follow.

## The shape of the project

```
src/config/          Site settings — start here for almost any request
src/content/         The site's content (Markdown/MDX/JSON collections)
src/i18n/             All user-facing interface text
src/components/      Components, grouped by purpose — check component-registry.json
src/pages/            Routes; a file here is a URL
src/layouts/          Page shells the routes render into
src/lib/               Helpers for blog, projects, tags, SEO, themes
src/styles/            Design tokens and colour themes
component-registry.json   Catalogue of every component, with category, purpose, props
```

**Check `component-registry.json` before building anything new.** It's the
fastest way to find out whether the component you need already exists —
it usually does.

## Where to make a change

| The request | The file |
|---|---|
| Site name, logo, social links, contact details | `src/config/site.config.ts` |
| Navigation menus | `src/config/nav.config.ts` |
| Languages | `src/config/i18n.config.ts` |
| Cookie-consent behaviour | `src/config/consent.config.ts` |
| Any interface text, including `aria-label`, `alt`, `placeholder`, `title` | `src/i18n/en.json` |
| A blog post | a new `.mdx` file in `src/content/blog/` |
| A project / case study | a new `.mdx` file in `src/content/projects/` |
| Colours | `src/styles/themes/*.css` — tokens only, never a hard-coded hex |

**Page copy is not in the page files.** Text lives in `src/i18n/en.json` and
is read through `t()`. If a page appears to have hard-coded text, check the
locale file first before editing `.astro` files.

## Conventions worth keeping

- **Use existing components** from the registry rather than writing new
  ones — they share one design language.
- **Use the design tokens.** Colours come from CSS custom properties in
  `src/styles/`. Never hard-code a hex value.
- **Motion respects `prefers-reduced-motion`.**
- **Images go through `astro:assets`** — use the `<Image>` component.
- **Zero JavaScript unless it earns its place.** Reach for a `<script>`
  only when the interaction genuinely needs one.

## Commit messages

This repo is public — worth keeping history clean since anyone evaluating
Alan may look at it. Present tense, describing the change: "Add ACC case
study", not "Added the ACC case study" or "Fixed content".

## Commands

```bash
npm dev          # development server
npm build        # production build — run before declaring work finished
npm check        # astro check, TypeScript, ESLint and Prettier
npm test         # Vitest unit tests
npm fix          # apply ESLint and Prettier fixes
```

`npm build` is the real test — it runs schema checks and link validation
that the dev server doesn't catch.

## Things that are easy to get wrong

- **Content collections are schema-checked.** Frontmatter that doesn't
  match `src/content.config.ts` fails the build. Read the schema before
  adding fields — prefer writing narrative content in the MDX body over
  adding new frontmatter fields.
- **Drafts are filtered in production only.** `draft: true` still renders
  in `npm dev` — verify with a build before assuming something's hidden.
- **A draft is unreachable.** Linking to a drafted post/project produces a
  404 in production.

## Before you finish

Run `npm build`. Then confirm the change is actually visible on the page
you changed — not just that the command exited without error.