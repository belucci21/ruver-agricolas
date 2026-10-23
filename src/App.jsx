import { useEffect, useState } from 'react';
import { Hero, HowToBuy, Discounts, Meshes, Trays, Irrigation, Footer } from './Sections.jsx';
import { Terms, Privacy, Cookies, Shipping } from './legal.jsx';
import { PAGES, DEFAULT_META, SITE_URL } from './routes.js';
import { business } from './config.js';
import { readConsent, writeConsent, injectFonts, removeFonts, CONSENT_EVENT } from './consent.js';
import { CATEGORIES } from './categories.js';
import { CategoryPage, CategoryLinks } from './CategoryPage.jsx';
import Order from './Order.jsx';
import QuoteForm from './QuoteForm.jsx';

const LEGAL_LINKS = {
  [PAGES[0].path]: Terms,
  [PAGES[1].path]: Privacy,
  [PAGES[2].path]: Cookies,
  '/envios-y-devoluciones': Shipping,
};

const HOME_LINKS = [['mallas', 'Mallas'], ['bandejas', 'Bandejas'], ['cintas', 'Cintas de riego'], ['pedido', 'Pedido y pago']];
const OTHER_LEGAL_LINKS = [['/', 'Inicio'], ...PAGES.map(page => [page.path, page.label])];

const currentPath = () => {
  const path = (globalThis.location?.pathname || '/').replace(/\/+$/, '') || '/';
  return path;
};

// Refresca los metadatos de la página; los documentos legales ajustan título, descripción y canonical.
function setHead(meta, path) {
  document.title = meta.title;
  const set = (query, attribute, value) => {
    const element = document.head.querySelector(query);
    if (element) element.setAttribute(attribute, value);
  };
  set('meta[name="description"]', 'content', meta.description);
  set('link[rel="canonical"]', 'href', `${SITE_URL}${path}`);
  set('meta[property="og:title"]', 'content', meta.title);
  set('meta[property="og:description"]', 'content', meta.description);
  set('meta[property="og:url"]', 'content', `${SITE_URL}${path}`);
  set('meta[name="twitter:title"]', 'content', meta.title);
  set('meta[name="twitter:description"]', 'content', meta.description);
}

function CookieBanner({ decide }) {
  return <aside className="cookie-banner" role="dialog" aria-modal="false" aria-label="Aviso de cookies" aria-live="polite">
    <p><strong>Este sitio no usa cookies de seguimiento.</strong> Guardamos tu carrito y tu preferencia en el navegador. Puedes aceptar o rechazar las fuentes de Google; el almacenamiento del carrito sigue activo porque es necesario para el sitio. <a href="/cookies">Más información</a></p>
    <div className="cookie-actions">
      <button type="button" className="button button-green" onClick={() => decide('granted')}>Aceptar</button>
      <button type="button" className="button button-outline" onClick={() => decide('denied')}>Rechazar</button>
    </div>
  </aside>;
}

export default function App({ initialPath }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [product, setProduct] = useState('Malla antiáfido');
  const [consent, setConsent] = useState(null);
  const path = initialPath || currentPath();
  const category = CATEGORIES.find(c => c.path === path);
  const secondary = path !== '/';
  const Legal = LEGAL_LINKS[path];

  function onQuote(value) {
    if (value) setProduct(value.includes('bandeja') || value.includes('Bandeja') ? 'Bandejas almacigueras' : value.includes('cinta') || value.includes('Cinta') ? 'Cintas de riego' : value);
    setMenuOpen(false);
  }
  function decide(value) {
    const saved = writeConsent(value);
    if (saved) setConsent(saved);
    if (saved === 'granted') injectFonts();
  }
  useEffect(() => {
    setConsent(readConsent());
    const close = event => { if (event.key === 'Escape') setMenuOpen(false); };
    const reset = () => setConsent(readConsent());
    window.addEventListener('keydown', close);
    window.addEventListener(CONSENT_EVENT, reset);
    return () => { window.removeEventListener('keydown', close); window.removeEventListener(CONSENT_EVENT, reset); };
  }, []);
  useEffect(() => {
    if (path === '/' || Legal || category) setHead(category || PAGES.find(page => page.path === path) || DEFAULT_META, path);
  }, [path]);
  useEffect(() => { if (consent === 'granted') injectFonts(); else removeFonts(); }, [consent]);

  const navigation = secondary
    ? OTHER_LEGAL_LINKS.map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)
    : HOME_LINKS.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>);
  const contactHref = secondary ? '/#contacto' : '#contacto';

  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header className="site-header">
      <div className="header-inner">
        <a href={secondary ? '/' : '#inicio'} className="brand" aria-label="RUVER, inicio" onClick={() => setMenuOpen(false)}><img src={business.logo} width="134" height="64" alt="Insumos Agrícolas RUVER" /></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Cerrar ✕' : 'Menú ☰'}</button>
        <nav id="navigation" aria-label="Secciones" className={menuOpen ? 'navigation is-open' : 'navigation'}>
          {navigation}
          {secondary
            ? <a className="button button-lime" href={contactHref} onClick={() => setMenuOpen(false)}>Pedir cotización <span aria-hidden="true">↗</span></a>
            : <a className="button button-lime" href={contactHref} onClick={() => onQuote('')}>Pedir cotización <span aria-hidden="true">↗</span></a>}
        </nav>
      </div>
    </header>
    <main id="contenido">
      {Legal
        ? <Legal />
        : category ? <CategoryPage category={category} /> : secondary ? <section className="container seo-section"><h1>Página no encontrada</h1><p>Esta dirección no existe. <a href="/">Volver al catálogo RUVER</a>.</p></section>
        : <><Hero onQuote={onQuote} /><CategoryLinks /><HowToBuy /><Discounts />
          <Meshes onQuote={onQuote} /><Trays onQuote={onQuote} /><Irrigation onQuote={onQuote} />
          <Order /><QuoteForm product={product} setProduct={setProduct} /></>}
    </main>
    <Footer path={path} />
    {consent === null && <CookieBanner decide={decide} />}
    <a className="floating-contact" href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Hablar con RUVER por WhatsApp">WhatsApp <span aria-hidden="true">↗</span></a>
  </>;
}
