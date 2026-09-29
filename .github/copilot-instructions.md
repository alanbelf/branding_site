# Business-specific instructions (alan-ops.dev)

See AGENTS.md at the repo root for all technical/theme conventions — file
locations, config structure, commands, checks. This file only covers what
AGENTS.md can't know: whose site this is and what it should say.

## What this site is
A personal one-pager for Alan Belferrag, a freelance HPC/cloud
infrastructure specialist. Not a company — no team, no "we," no invented
years of client history.

## Positioning, in priority order
1. GPU infrastructure for AI startups, including a cost/token optimization
   offer ("cut your GPU/token spend, pay only on demonstrated gains").
2. HPC/cloud consulting for research-oriented organizations (AWS
   ParallelCluster / Azure CycleCloud style work).

## Content rules
- Plain, factual, specific. No "passionate," "innovative,"
  "cutting-edge," or similar filler.
- Never fabricate numbers, client names, or metrics. If a real figure
  isn't provided, leave a `[PLACEHOLDER: ...]` marker instead of guessing.
- Never include anything that wouldn't be appropriate as fully public
  information — no internal system names, org structure, or details from
  Alan's employer.
- New case studies follow the structure already used in
  `src/content/projects/rgcp.mdx` (situation, constraints, approach, key
  decisions, outcome) — ask for the missing narrative details rather than
  inventing them if a new case study is requested.

## Deploy target
Cloudflare Pages only. Do not reintroduce Vercel or Netlify
adapters/packages/config.