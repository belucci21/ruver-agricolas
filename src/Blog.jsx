import { Fragment } from 'react';
import { business } from './config.js';
import { whatsappLink } from './links.js';
import { BLOG_INDEX, BLOG_POSTS, relatedPosts } from './blog.js';
import { CATEGORIES } from './categories.js';
import { CategoryLinks } from './CategoryPage.jsx';

const tagName = post => post.topic || CATEGORIES.find(category => category.path === post.category)?.name || post.category;

function MeasurementDiagram() {
  return <figure className="blog-diagram">
    <svg viewBox="0 0 640 220" role="img" aria-labelledby="measurement-title measurement-desc">
      <title id="measurement-title">Dos paños de 4,20 metros con unión de 0,20 metros</title>
      <desc id="measurement-desc">Esquema ilustrativo en planta: los paños se solapan y cubren 8,20 metros de ancho. No representa un diseño estructural.</desc>
      <rect x="30" y="45" width="300" height="110" fill="#dce9cb" stroke="#346238" strokeWidth="2" />
      <rect x="310" y="45" width="300" height="110" fill="#b3d879" fillOpacity=".75" stroke="#346238" strokeWidth="2" />
      <rect x="310" y="45" width="20" height="110" fill="#346238" />
      <text x="165" y="105" textAnchor="middle">Paño 1: 4,20 m</text>
      <text x="465" y="105" textAnchor="middle">Paño 2: 4,20 m</text>
      <text x="320" y="28" textAnchor="middle">Solape ilustrativo: 0,20 m</text>
      <text x="320" y="192" textAnchor="middle">Cobertura: 4,20 + 4,20 − 0,20 = 8,20 m</text>
    </svg>
    <figcaption>Esquema sin escala. El solape y las reservas deben adaptarse al montaje y a la ficha del material.</figcaption>
  </figure>;
}

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
        <p className="small muted">Guías del catálogo RUVER · {BLOG_POSTS.length} artículos</p>
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
        <p className="small muted">Publicado: <time dateTime={post.date}>{post.dateLabel}</time> · Actualizado: <time dateTime={post.modified}>{post.modifiedLabel}</time> · {post.topic ? <a href="/envios-y-devoluciones">{post.topic}</a> : <a href={post.category}>{tagName(post)}</a>}</p>
      </div>
    </div>
    <div className="container legal-body">
      {post.image && <figure className="blog-figure"><img src={post.image} alt={post.imageAlt} loading="lazy" decoding="async" /><figcaption>Imagen del catálogo RUVER. Confirma la ficha del formato que necesitas.</figcaption></figure>}
      {post.diagram && <MeasurementDiagram />}
      {post.sections.map((section, index) => <Fragment key={index}>
        <h2 id={`guia-${index}`}>{section.heading}</h2>
        {(section.paragraphs || []).map((text, item) => <p key={item} className="legal-p">{text}</p>)}
        {section.list && <ul>{section.list.map((text, item) => <li key={item}>{text}</li>)}</ul>}
        {section.links?.map((link, item) => <p className="legal-p" key={item}>{link.before}<a href={link.href}>{link.text}</a>{link.after}</p>)}
      </Fragment>)}
      <div className="panel legal-contact">
        <h2>Cotizar este producto con RUVER</h2>
        <p className="legal-p">Escríbenos con la medida y la cantidad. Confirmamos disponibilidad, flete y plazo antes de cobrar o pagar.</p>
        <p className="legal-p"><a href={whatsappLink(`Hola, leí la guía sobre ${tagName(post).toLowerCase()} y quiero cotizar. Mi comuna es: `)} target="_blank" rel="noopener noreferrer">WhatsApp +56 9 8731 6764</a> · <a href={`mailto:${business.email}`}>{business.email}</a></p>
      </div>
      <div className="panel legal-contact">
        <h2>Guías relacionadas</h2>
        <ul>{relatedPosts(post).map(related => <li key={related.path}><a href={related.path}>{related.headline}</a></li>)}</ul>
        <p className="legal-p"><a href="/envios-y-devoluciones">Envíos y devoluciones</a> · <a href="/#pedido">Arma tu pedido en la web</a></p>
      </div>
      <CategoryLinks />
    </div>
  </article>;
}

// Enlaces al blog desde otras páginas (matriz de enlazado interno).
export function BlogLinks({ category } = {}) {
  const posts = category ? BLOG_POSTS.filter(post => (post.categories || [post.category]).includes(category)) : BLOG_POSTS;
  return <section className="container seo-section">
    <h2>Guías del blog RUVER</h2>
    <p>Contenido de apoyo para elegir cada familia del catálogo antes de cotizar.</p>
    <div className="category-grid">{posts.map(post => <a className="panel category-link" href={post.path} key={post.path}>{post.headline} <span aria-hidden="true">↗</span></a>)}</div>
  </section>;
}

export { BLOG_INDEX };
