import test from 'node:test';
import assert from 'node:assert/strict';
import { BLOG_INDEX, BLOG_POSTS } from '../src/blog.js';
import { CATEGORIES } from '../src/categories.js';

test('el blog tiene índice y guías publicadas', () => {
  assert.equal(BLOG_INDEX.path, '/blog');
  assert.ok(BLOG_POSTS.length >= 4);
});

test('cada guía es una ruta única con metadatos completos', () => {
  const paths = BLOG_POSTS.map(post => post.path);
  assert.equal(new Set(paths).size, paths.length);
  for (const post of BLOG_POSTS) {
    assert.match(post.path, /^\/blog\/[a-z0-9-]+$/);
    assert.ok(post.title.includes('Blog RUVER'));
    assert.ok(post.headline.length >= 25);
    assert.ok(post.description.length >= 60 && post.description.length <= 200);
    assert.match(post.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(post.dateLabel.length > 8);
    assert.ok(CATEGORIES.some(category => category.path === post.category));
    assert.equal(new Set(post.sections.map(section => section.heading)).size, post.sections.length);
    for (const section of post.sections) {
      assert.ok(section.heading.length > 6);
      assert.ok((section.paragraphs || section.list || []).length > 0);
    }
  }
});

test('el índice del blog no compite con la portada comercial', () => {
  assert.ok(BLOG_INDEX.title.includes('Blog RUVER'));
  assert.ok(BLOG_INDEX.description.toLowerCase().includes('guías'));
  assert.ok(BLOG_INDEX.label === 'Blog');
});
