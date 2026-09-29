import { describe, it, expect } from 'vitest';
import {
  collectSlugRecords,
  findSlugCollisions,
  formatSlugCollisions,
  type SlugRecord,
} from '@/lib/content-validation';

const entry = (id: string, locale = 'en') => ({ id, data: { locale } });

describe('collectSlugRecords', () => {
  it('maps pages to /<slug> at the site root', () => {
    const records = collectSlugRecords([entry('en/about')]);
    expect(records).toEqual([
      { source: 'pages: en/about', locale: 'en', path: '/about' },
    ]);
  });

  it('keeps nested slugs intact after the locale prefix', () => {
    const records = collectSlugRecords([], [entry('en/guides/deploy')]);
    expect(records[0].path).toBe('/projects/guides/deploy');
  });

  it('leaves ids without a matching locale prefix unchanged', () => {
    const records = collectSlugRecords([], [entry('getting-started', 'en')]);
    expect(records[0].path).toBe('/projects/getting-started');
  });
});

describe('findSlugCollisions', () => {
  it('returns nothing when every path is unique within its locale', () => {
    const records: SlugRecord[] = [
      { source: 'projects: en/a', locale: 'en', path: '/projects/a' },
      { source: 'projects: en/b', locale: 'en', path: '/projects/b' },
    ];
    expect(findSlugCollisions(records)).toEqual([]);
  });

  it('does not flag the same path across different locales', () => {
    const records: SlugRecord[] = [
      { source: 'projects: en/a', locale: 'en', path: '/projects/a' },
      { source: 'projects: es/a', locale: 'es', path: '/projects/a' },
    ];
    expect(findSlugCollisions(records)).toEqual([]);
  });

  it('flags two entries that resolve to the same path in one locale', () => {
    const records: SlugRecord[] = [
      { source: 'projects: en/a', locale: 'en', path: '/projects/a' },
      { source: 'projects: en/sub/a', locale: 'en', path: '/projects/a' },
    ];
    const collisions = findSlugCollisions(records);
    expect(collisions).toHaveLength(1);
    expect(collisions[0]).toMatchObject({ locale: 'en', path: '/projects/a' });
    expect(collisions[0].sources).toEqual(['projects: en/a', 'projects: en/sub/a']);
  });

  it('does collide when two pages share a slug', () => {
    const records = collectSlugRecords([entry('en/about'), entry('about')]);
    const collisions = findSlugCollisions(records);
    expect(collisions).toHaveLength(1);
    expect(collisions[0].path).toBe('/about');
  });
});

describe('formatSlugCollisions', () => {
  it('produces a readable, actionable message listing every source', () => {
    const message = formatSlugCollisions([
      { locale: 'en', path: '/projects/a', sources: ['projects: en/a', 'projects: en/sub/a'] },
    ]);
    expect(message).toContain('Duplicate slugs detected');
    expect(message).toContain('[en] /projects/a');
    expect(message).toContain('projects: en/a');
    expect(message).toContain('projects: en/sub/a');
  });
});
