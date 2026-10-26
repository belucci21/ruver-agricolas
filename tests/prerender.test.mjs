import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PAGES, SITE_URL } from '../src/routes.js';
import { CATEGORIES } from '../src/categories.js';
import { blogPages } from '../src/blog.js';
const pages = ['/', ...PAGES.map(p=>p.path), ...CATEGORIES.map(p=>p.path), ...blogPages().map(p=>p.path)];
test('17 páginas con contenido y metadatos propios sin depender de JavaScript',async()=>{
 const titles = new Set();
 for(const path of pages){
  const html = await readFile(`dist${path === '/' ? '' : path}/index.html`,'utf8');
  assert.equal((html.match(/<h1\b/g)||[]).length,1,path);
  assert.ok(html.includes(`rel="canonical" href="${SITE_URL}${path}"`),path);
  assert.ok(html.includes('ruver-agricolas.com/#negocio'),path);
  const title=html.match(/<title>(.*?)<\/title>/)[1];assert.ok(!titles.has(title));titles.add(title);
  assert.doesNotThrow(()=>JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]));
  assert.ok(!/<link[^>]+href="https:\/\/fonts\./.test(html),path);
 }
 assert.equal(titles.size,17);
});
test('sitemap enumera las rutas reales y robots permite renderizar recursos',async()=>{
 const sitemap=await readFile('dist/sitemap.xml','utf8');
 assert.equal((sitemap.match(/<loc>/g)||[]).length,pages.length);
 for(const path of pages)assert.ok(sitemap.includes(`<loc>${SITE_URL}${path}</loc>`));
 assert.ok(!(await readFile('dist/robots.txt','utf8')).includes('Disallow: /assets/'));
 const notFound=await readFile('dist/404.html','utf8');assert.ok(notFound.includes('noindex, follow'));
 const nginx=await readFile('nginx.conf','utf8');assert.ok(nginx.includes('try_files $uri $uri/index.html =404'));
});
