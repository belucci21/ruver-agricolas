import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { render } from '../.prerender/entry-server.js';
import { PAGES, DEFAULT_META, SITE_URL } from '../src/routes.js';
import { CATEGORIES } from '../src/categories.js';
import { BLOG_POSTS, BLOG_INDEX } from '../src/blog.js';

const template = await readFile('dist/index.html', 'utf8');
const pages = [{ ...DEFAULT_META, path: '/' }, ...CATEGORIES, ...PAGES, BLOG_INDEX, ...BLOG_POSTS];
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const originalSchema = JSON.parse(template.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
delete originalSchema['@graph'][0].priceRange;
originalSchema['@graph'][0].currenciesAccepted = 'CLP';
originalSchema['@graph'][0].legalName = 'INSUAGRI RUVER SpA';

for (const page of [...pages, { path: '/404', title: 'Página no encontrada | RUVER', description: 'La dirección solicitada no existe.' }]) {
  const url = `${SITE_URL}${page.path}`;
  let html = template.replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`);
  for (const key of ['description', 'og:description', 'twitter:description']) {
    html = html.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*(")`), `$1${escape(page.description)}$2`);
  }
  for (const key of ['og:title', 'twitter:title']) html = html.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*(")`), `$1${escape(page.title)}$2`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`).replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  if (page.path === '/404') html = html.replace('index, follow, max-image-preview:large', 'noindex, follow');
  const schema = structuredClone(originalSchema);
  const breadcrumb = { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` }] };
  const isCategory = CATEGORIES.includes(page);
  const isPost = BLOG_POSTS.includes(page);
  if (isCategory) breadcrumb.itemListElement.push({ '@type': 'ListItem', position: 2, name: page.name, item: url });
  if (page === BLOG_INDEX) {
    schema['@graph'].push({ '@type': 'Blog', '@id': `${url}#blog`, url, name: page.title, description: page.description, inLanguage: 'es-CL', publisher: { '@id': `${SITE_URL}/#negocio` }, isPartOf: { '@id': `${SITE_URL}/#sitio` } });
  } else if (isPost) {
    breadcrumb.itemListElement.push({ '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` }, { '@type': 'ListItem', position: 3, name: page.headline, item: url });
    schema['@graph'].push(
      { '@type': 'WebPage', '@id': `${url}#pagina`, url, name: page.title, description: page.description, inLanguage: 'es-CL', isPartOf: { '@id': `${SITE_URL}/#sitio` } },
      { '@type': 'BlogPosting', '@id': `${url}#guia`, url, headline: page.headline, description: page.description, datePublished: page.date, dateModified: page.date, inLanguage: 'es-CL', image: `${SITE_URL}/images/0914ad0ee180.jpg` , author: { '@id': `${SITE_URL}/#negocio` }, publisher: { '@id': `${SITE_URL}/#negocio` }, mainEntityOfPage: { '@id': `${url}#pagina` }, isPartOf: { '@id': `${SITE_URL}/blog#blog` } },
    );
  } else {
    schema['@graph'].push({ '@type': isCategory ? 'CollectionPage' : 'WebPage', '@id': `${url}#pagina`, url, name: page.title, description: page.description, inLanguage: 'es-CL', isPartOf: { '@id': `${SITE_URL}/#sitio` } });
  }
  if (breadcrumb.itemListElement.length > 1) schema['@graph'].push(breadcrumb);
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, () => `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`);
  html = html.replace('<div id="root"></div>', () => `<div id="root">${render(page.path)}</div>`);
  const output = page.path === '/' ? 'dist/index.html' : page.path === '/404' ? 'dist/404.html' : `dist${page.path}/index.html`;
  await mkdir(output.slice(0, output.lastIndexOf('/')), { recursive: true });
  await writeFile(output, html);
}
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(p => `<url><loc>${SITE_URL}${p.path}</loc></url>`).join('')}</urlset>\n`);
await rm('.prerender', { recursive: true, force: true });
console.log(`Prerender: ${pages.length} páginas y 404, robots y sitemap generados.`);
