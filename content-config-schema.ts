// src/content/config.ts
//
// Drop this into your Astro Rocket project (merge with its existing
// collections rather than overwrite — Astro Rocket likely already has
// a "projects" or "blog" collection defined; adapt field names to match
// its existing routing/templates where needed).
//
// This schema borrows the NARRATIVE STRUCTURE from the "Case" theme
// (problem -> constraints -> decisions -> trade-offs -> outcome) without
// using any of Case's code — just its content shape.

import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content", // markdown/MDX body used for extended narrative if needed
  schema: z.object({
    // --- Basics ---
    title: z.string(),                     // e.g. "RGCP: Self-Service GPU Compute Bridge"
    summary: z.string(),                   // 1-2 sentence hook, shown on the projects list page
    role: z.string(),                      // e.g. "Sole architect & implementer"
    timeframe: z.string(),                 // e.g. "2024 - 2026" (free text, no need to be exact dates)
    featured: z.boolean().default(true),   // show on homepage highlights?
    publishDate: z.date(),

    // --- The narrative core (this is the "Case"-inspired part) ---
    context: z.string(),
    // The situation before you stepped in. What problem existed,
    // for whom, why it mattered. Sets the stakes.

    constraints: z.array(z.string()),
    // Bullet list of real-world limits you had to work within.
    // e.g. "No dedicated ops budget", "Solo implementation, no team",
    // "Legacy systems had to stay online during transition"

    approach: z.string(),
    // What you actually did, at a level a non-specialist founder
    // can follow. Save deep technical detail for optional "tags".

    decisions: z.array(
      z.object({
        decision: z.string(),        // the choice you made
        alternatives: z.string(),    // what else you considered
        reasoning: z.string(),       // why you chose what you chose
      })
    ),
    // This is your lightweight "decision log" — 2-4 of these is
    // plenty for a one-pager. Don't try to document every choice,
    // just the ones that show judgment under real constraints.

    outcome: z.string(),
    // What changed as a result. Keep this factual and specific;
    // this is the section that does the heavy credibility lifting.

    metrics: z.array(
      z.object({
        label: z.string(),   // e.g. "Compute capacity added"
        value: z.string(),   // e.g. "[fill in: number of VMs/cores]"
      })
    ).optional(),
    // Optional stat strip, e.g. for a "highlights" block near the top
    // of the case study page. Only include numbers you can stand behind.

    // --- Metadata ---
    tags: z.array(z.string()).default([]), // e.g. ["HyperStack", "GPU", "Cost Governance"]
    track: z.enum(["gpu-infra", "hpc-cloud", "other"]).optional(),
    // Lets you later filter/group case studies by which service track
    // they demonstrate, once you have more than one.
  }),
});

export const collections = { projects };
