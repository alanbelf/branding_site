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
src/lib/               Helpers for projects, tags, SEO, themes
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

## Things that are easy to get wrong

- **Content collections are schema-checked.** Frontmatter that doesn't
  match `src/content.config.ts` fails the build. Read the schema before
  adding fields — prefer writing narrative content in the MDX body over
  adding new frontmatter fields.
- **Drafts are filtered in production only.** `draft: true` still renders
  in `npm dev` — verify with a build before assuming something's hidden.
- **A draft is unreachable.** Linking to a drafted post/project produces a
  404 in production.

## Development workflow

Follow this workflow for implementation tasks, from the initial change through publication.

### 1. Inspect before changing

- Read the relevant source files and existing implementations.
- Check `component-registry.json` before introducing or replacing components.
- Check the current Git branch and working tree. Preserve all pre-existing and unrelated changes.
- Ask questions only when a consequential ambiguity prevents a sound implementation.

### 2. Implement the change

- Make the smallest coherent change that meets the request.
- Follow existing architecture, design tokens, and coding conventions.
- Avoid unrelated refactoring and unnecessary dependencies.
- Work on the current branch by default. Create branches or pull requests only when I explicitly request them.

### 3. Validate

Run the following commands after implementation:

```bash
npm check
npm test
npm build
```

Fix failures introduced by the change and rerun the relevant checks. If a command fails for an unrelated reason or cannot be run, report this clearly. Never claim a check passed unless it actually did.

Use `npm fix` when formatting or lint fixes are needed, and review the resulting diff.

I will inspect visual changes in the browser myself and review code changes using the VS Code Git plugin. Do not spend time performing manual visual reviews or preparing detailed diffs for me.

### 4. Present for review

After implementation and validation, stop before committing or pushing.

Give me a brief summary of:
- What changed.
- The main files affected.
- The validation results and any unresolved issues.

Leave the changes uncommitted. I will inspect the code and visual result myself. Ask me to review and explicitly approve the changes before proceeding.

### 5. Iterate on feedback

If I request corrections:

1. Apply the requested changes without disturbing unrelated work.
2. Rerun the relevant checks.
3. Summarize the updated changes and validation results.
4. Wait for my approval.

Repeat until I explicitly approve the final changes. Requests for further modifications are not approval to publish.

### 6. Commit and push after approval

Only after my explicit approval:

1. Check the final Git status and diff.
2. Stage only the files belonging to the approved change. Do not blindly use `git add .` or `git add -A`.
3. Create a concise commit message following the repository's commit message conventions.
4. Push to the existing branch and configured remote.
5. Report the commit and push results.

Never overwrite unrelated work, amend existing commits, or force-push without my explicit authorization. If the push fails, report the failure rather than claiming the changes were published.

## Commands

```bash
npm dev          # Start the development server
npm check        # Astro check, TypeScript, ESLint, and Prettier
npm test         # Run Vitest unit tests
npm build        # Production build, including schema and link validation
npm fix          # Apply ESLint and Prettier fixes
```

## Commit messages

This repository is public, so keep the Git history clean and descriptive.

Use short, imperative/present-tense messages describing the change, for example:

- `Add ACC case study`
- `Improve light-mode SVG rendering`
- `Fix project page layout`

Avoid vague messages such as `Updates` and past-tense messages such as `Added the case study`.

## Final principle

**Implement → Validate → Ask for review → Iterate if needed → Commit and push after approval.**

Never skip the approval gate or claim that work, tests, commits, or pushes succeeded unless they actually did.