import type { APIRoute } from 'astro';
import siteConfig from '@/config/site.config';
import { defaultLocale } from '@/i18n';
import { getVisibleProjects, getProjectUrl } from '@/lib/projects';
import { getNavItems } from '@/config/nav.config';

/**
 * /llms.txt
 *
 * A plain-Markdown map of this site for large language models, following the
 * proposal at https://llmstxt.org. Where robots.txt tells a crawler *whether*
 * it may read the site, llms.txt tells a model *what the site is and which
 * pages matter* — in one short, token-cheap file.
 *
 * Why it's worth having: when someone asks an assistant a question this site
 * could answer, the model has a clean, citable summary instead of guessing
 * from scattered marketing copy.
 *
 * Everything here is generated at build time from `site.config.ts`, the nav
 * config and the content collections, so it describes *your* site and never
 * drifts out of sync with the real pages. There is nothing to keep updated by
 * hand.
 *
 * The Pages list comes from `getNavItems`, so it follows whatever pages a
 * site configures.
 *
 * External nav entries are left out: this file is a map of *this* site, and a
 * link to somewhere else is not part of it.
 *
 * Multi-language sites: the default locale is listed, since llms.txt is meant
 * to stay short. Translated pages remain discoverable through the sitemap and
 * the hreflang tags the theme already emits.
 */

export const GET: APIRoute = async ({ site }) => {
  const base = (site?.toString() || siteConfig.url).replace(/\/$/, '');

  const projects = await getVisibleProjects(defaultLocale);

  const line = (title: string, url: string, description?: string) =>
    description ? `- [${title}](${url}): ${description}` : `- [${title}](${url})`;

  const projectLines = [...projects]
    .sort((a, b) => a.data.order - b.data.order)
    .map((project) =>
      line(project.data.title, `${base}${getProjectUrl(project.id, defaultLocale)}`, project.data.description)
    )
    .join('\n');

  const pageLines = getNavItems(defaultLocale)
    .filter((item) => !item.external)
    .map((item) => line(item.label, `${base}${item.href}`));

  const sections = [
    `# ${siteConfig.name}`,
    ``,
    `> ${siteConfig.description}`,
    ``,
    `## Pages`,
    ``,
    ...pageLines,
  ];

  if (projectLines) {
    sections.push(``, `## Projects`, ``, projectLines);
  }

  sections.push(
    ``,
    `## More`,
    ``,
    line('Sitemap', `${base}/sitemap-index.xml`),
    ``,
    `---`,
    ``,
    `Contact: ${siteConfig.email}`,
    ``
  );

  return new Response(sections.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
