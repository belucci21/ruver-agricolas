import test from 'node:test';
import assert from 'node:assert/strict';
import { pageMeta } from '../src/page-meta.js';
import { DEFAULT_META, PAGES } from '../src/routes.js';
import { BLOG_INDEX, BLOG_POSTS, relatedPosts } from '../src/blog.js';
import { CATEGORIES } from '../src/categories.js';

test('inicio conserva metadatos comerciales y blog conserva los suyos', () => {
  assert.equal(pageMeta('/'), DEFAULT_META);
  assert.equal(pageMeta('/blog'), BLOG_INDEX);
  for (const page of [...PAGES, ...CATEGORIES, ...BLOG_POSTS]) assert.equal(pageMeta(page.path), page);
  assert.equal(pageMeta('/no-existe'), null);
});

test('las tres guías nuevas resuelven familias y cotización con enlaces válidos', () => {
  const paths = new Set(['/', '/blog', ...PAGES.map(p => p.path), ...CATEGORIES.map(p => p.path), ...BLOG_POSTS.map(p => p.path)]);
  assert.equal(BLOG_POSTS.length, 8);
  for (const post of BLOG_POSTS) {
    const links = post.sections.flatMap(section => section.links || []);
    assert.ok(links.length > 0, post.path);
    for (const link of links) {
      assert.ok(link.text.trim().length > 5);
      const url = new URL(link.href, 'https://ruver-agricolas.com');
      if (url.hostname === 'ruver-agricolas.com') assert.ok(paths.has(url.pathname), link.href);
      else assert.equal(url.protocol, 'https:');
    }
    const related = relatedPosts(post);
    assert.ok(related.length > 0 && related.length <= 3);
    assert.ok(related.every(other => other.path !== post.path));
  }
  assert.ok(BLOG_POSTS.some(p => p.category === '/malla-antihelada'));
});
