import { PAGES, DEFAULT_META } from './routes.js';
import { CATEGORIES } from './categories.js';
import { BLOG_INDEX, BLOG_POSTS } from './blog.js';

export function pageMeta(path) {
  if (path === '/') return DEFAULT_META;
  if (path === BLOG_INDEX.path) return BLOG_INDEX;
  return CATEGORIES.find(page => page.path === path)
    || PAGES.find(page => page.path === path)
    || BLOG_POSTS.find(page => page.path === path)
    || null;
}
