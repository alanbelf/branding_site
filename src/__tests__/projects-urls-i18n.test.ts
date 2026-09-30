import { describe, it, expect, vi } from 'vitest';

// Exercise the project URL helpers with i18n turned ON and two locales. The
// default locale stays at the site root; the secondary locale is prefixed.
// This guards the locale-prefixed project routing wired up for #437, mirroring
// the project URL behavior when i18n is enabled.
vi.mock('astro:content', () => ({
  getCollection: vi.fn(async () => []),
}));

vi.mock('@/config/i18n.config', () => ({
  default: {
    enabled: true,
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    localeNames: { en: 'English', fr: 'Français' },
    detectBrowserLocale: false,
  },
}));

import {
  getProjectUrl,
  getProjectsBaseUrl,
  getProjectsPageUrl,
  getProjectTagUrl,
  getSecondaryLocales,
} from '@/lib/projects';

describe('project URL helpers (i18n enabled — en default, fr secondary)', () => {
  it('keeps default-locale project URLs at the site root', () => {
    expect(getProjectUrl('en/astro-rocket')).toBe('/projects/astro-rocket');
    expect(getProjectUrl('en/astro-rocket', 'en')).toBe('/projects/astro-rocket');
  });

  it('prefixes secondary-locale project URLs with the locale', () => {
    expect(getProjectUrl('fr/astro-rocket', 'fr')).toBe('/fr/projects/astro-rocket');
  });

  it('prefixes the projects index base URL for the secondary locale only', () => {
    expect(getProjectsBaseUrl()).toBe('/projects');
    expect(getProjectsBaseUrl('en')).toBe('/projects');
    expect(getProjectsBaseUrl('fr')).toBe('/fr/projects');
  });

  it('prefixes paginated URLs for the secondary locale', () => {
    expect(getProjectsPageUrl(1, 'fr')).toBe('/fr/projects');
    expect(getProjectsPageUrl(2, 'fr')).toBe('/fr/projects/page/2');
    expect(getProjectsPageUrl(2)).toBe('/projects/page/2');
  });

  it('prefixes tag URLs for the secondary locale', () => {
    expect(getProjectTagUrl('Client Work', 'fr')).toBe('/fr/projects/tag/client-work');
    expect(getProjectTagUrl('Client Work')).toBe('/projects/tag/client-work');
  });

  it('lists the non-default locales as needing prefixed routes', () => {
    expect(getSecondaryLocales()).toEqual(['fr']);
  });
});
