import { Fragment } from 'react';
import { business } from './config.js';
import { whatsappLink } from './links.js';
import { BLOG_INDEX, BLOG_POSTS } from './blog.js';
import { CATEGORIES } from './categories.js';
import { CategoryLinks } from './CategoryPage.jsx';

const tagName = post => CATEGORIES.find(category => category.path === post.category)?.name || post.category;

function Card({ post }) {
  return <article className="panel blog-card">
    <time dateTime={post.date}>{post.dateLabel}</time>
    <h2><a href={post.path}>{post.headline}</a></h2>
    <p>{post.description}</p>
    <span className="blog-card-tag">{tagName(post)}</span>
  </article>;
}

export function BlogIndex() {
  return <article className="legal-page">
    <div className="legal-hero">
      <div className="container">
        <nav aria-label="Ruta de navegación"><a href="/">Inicio</a> / Blog</nav>
        <h1>Guías para elegir insumos agrícolas</h1>
        <p className="legal-intro">{BLOG_INDEX.description}</p>
        <p className="small muted">Escritas por el equipo de Insumos Agrícolas RUVER · {BLOG_POSTS.length} guías publicadas</p>
      </div>
    </div>
    <div className="container legal-body">
      <div className="blog-grid">{BLOG_POSTS.map(post => <Card post={post} key={post.path} />)}</div>
      <CategoryLinks />
    </div>
  </article>;
}

export function BlogPost({ post }) {
  return <article className="legal-page">
    <div className="legal-hero">
      <div className="container">
        <nav aria-label="Ruta de navegación"><a href="/">Inicio</a> / <a href="/blog">Blog</a> / {tagName(post)}</nav>
        <h1>{post.headline}</h1>
        <p className="legal-intro">{post.description}</p>
        <p className="small muted">Guía · {post.dateLabel} · <a href={post.category}>{tagName(post)}</a></p>
      </div>
    </div>
    <div className="container legal-body">
      {post.sections.map((section, index) => <Fragment key={index}>
        <h2 id={`guia-${index}`}>{section.heading}</h2>
        {(section.paragraphs || []).map((text, item) => <p key={item} className="legal-p">{text}</p>)}
        {section.list && <ul>{section.list.map((text, item) => <li key={item}>{text}</li>)}</ul>}
      </Fragment>)}
      <div className="panel legal-contact">
        <h2>Cotizar este producto con RUVER</h2>
        <p className="legal-p">Escríbenos con la medida y la cantidad. Confirmamos disponibilidad, flete y plazo antes de cobrar o pagar.</p>
        <p className="legal-p"><a href={whatsappLink(`Hola, leí la guía sobre ${tagName(post).toLowerCase()} y quiero cotizar. Mi comuna es: `)} target="_blank" rel="noopener noreferrer">WhatsApp +56 9 8731 6764</a> · <a href={`mailto:${business.email}`}>{business.email}</a></p>
      </div>
      <div className="panel legal-contact">
        <h2>Guías relacionadas</h2>
        <ul>{BLOG_POSTS.filter(related => related.path !== post.path).map(related => <li key={related.path}><a href={related.path}>{related.headline}</a></li>)}</ul>
        <p className="legal-p"><a href="/envios-y-devoluciones">Envíos y devoluciones</a> · <a href="/#pedido">Arma tu pedido en la web</a></p>
      </div>
      <CategoryLinks />
    </div>
  </article>;
}

// Enlaces al blog desde otras páginas (matriz de enlazado interno).
export function BlogLinks() {
  return <section className="container seo-section">
    <h2>Guías del blog RUVER</h2>
    <p>Contenido de apoyo para elegir cada familia del catálogo antes de cotizar.</p>
    <div className="category-grid">{BLOG_POSTS.map(post => <a className="panel category-link" href={post.path} key={post.path}>{post.headline} <span aria-hidden="true">↗</span></a>)}</div>
  </section>;
}

export { BLOG_INDEX };
