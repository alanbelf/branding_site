import { describe, it, expect, vi } from 'vitest';

// Exercise the nav config's locale resolution with i18n turned ON and two
// locales. The default locale stays at the site root; the secondary locale is
// prefixed and labels fall back to the default dictionary. Guards the localized
// header/footer nav and logo wired up for #438.
vi.mock('@/config/i18n.config', () => ({
  default: {
    enabled: true,
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    localeNames: { en: 'English', fr: 'Français' },
    detectBrowserLocale: false,
  },
}));

import { getNavItems, getLogoHref, resolveNavItem, type NavItem } from '@/config/nav.config';

describe('nav config — locale resolution (en default, fr secondary)', () => {
  it('keeps default-locale hrefs at the site root', () => {
    const items = getNavItems('en');
    expect(items.find((i) => i.label === 'About')?.href).toBe('/about');
  });

  it('prefixes secondary-locale hrefs with the locale', () => {
    const items = getNavItems('fr');
    expect(items.map((i) => i.href)).toEqual([
      '/fr',
      '/fr/services',
      '/fr/projects',
      '/fr/about',
      '/fr/contact',
    ]);
  });

  it('falls back to default-language labels when no translation is loaded', () => {
    const items = getNavItems('fr');
    expect(items.find((i) => i.href === '/fr/about')?.label).toBe('About');
    expect(items.find((i) => i.href === '/fr/services')?.label).toBe('Services');
  });

  it('points the logo at the locale home', () => {
    expect(getLogoHref('en')).toBe('/');
    expect(getLogoHref('fr')).toBe('/fr');
  });

  it('never locale-prefixes external, mailto/tel, or anchor hrefs', () => {
    expect(
      resolveNavItem(
        { label: 'GitHub', href: 'https://github.com/x', order: 1, external: true },
        'fr'
      ).href
    ).toBe('https://github.com/x');
    expect(resolveNavItem({ label: 'Top', href: '#top', order: 1 }, 'fr').href).toBe('#top');
    expect(resolveNavItem({ label: 'Mail', href: 'mailto:a@b.com', order: 1 }, 'fr').href).toBe(
      'mailto:a@b.com'
    );
  });

  it('applies a per-locale override (label + path), still locale-prefixed', () => {
    const item: NavItem = {
      label: 'Contact',
      href: '/contact',
      order: 1,
      locales: { fr: { label: 'Me contacter', href: '/contact' } },
    };
    expect(resolveNavItem(item, 'fr')).toEqual({
      label: 'Me contacter',
      href: '/fr/contact',
      external: undefined,
    });
    // The default locale is unaffected by a secondary-locale override.
    expect(resolveNavItem(item, 'en')).toEqual({
      label: 'Contact',
      href: '/contact',
      external: undefined,
    });
  });

  it('falls back to the literal label when no labelKey is set', () => {
    expect(resolveNavItem({ label: 'Docs', href: '/docs', order: 1 }, 'fr').label).toBe('Docs');
  });
});
