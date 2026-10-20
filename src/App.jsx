import { useEffect, useState } from 'react';
import { Hero, HowToBuy, Discounts, Meshes, Trays, Irrigation, Footer } from './Sections.jsx';
import { business } from './config.js';
import Order from './Order.jsx';
import QuoteForm from './QuoteForm.jsx';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [product, setProduct] = useState('Malla antiáfido');
  function onQuote(value) {
    if (value) setProduct(value.includes('bandeja') || value.includes('Bandeja') ? 'Bandejas almacigueras' : value.includes('cinta') || value.includes('Cinta') ? 'Cintas de riego' : value);
    setMenuOpen(false);
  }
  useEffect(() => {
    const close = event => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header className="site-header">
      <div className="header-inner">
        <a href="#inicio" className="brand" aria-label="RUVER, inicio" onClick={() => setMenuOpen(false)}><img src={business.logo} width="134" height="64" alt="Insumos Agrícolas RUVER" /></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Cerrar ✕' : 'Menú ☰'}</button>
        <nav id="navigation" aria-label="Secciones" className={menuOpen ? 'navigation is-open' : 'navigation'}>
          {[['mallas','Mallas'],['bandejas','Bandejas'],['cintas','Cintas de riego'],['pedido','Pedido y pago']].map(([id,label]) => <a key={id} href={'#'+id} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="button button-lime" href="#contacto" onClick={() => onQuote('')}>Pedir cotización <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </header>
    <main id="contenido">
      <Hero onQuote={onQuote} /><HowToBuy /><Discounts />
      <Meshes onQuote={onQuote} /><Trays onQuote={onQuote} /><Irrigation onQuote={onQuote} />
      <Order /><QuoteForm product={product} setProduct={setProduct} />
    </main>
    <Footer />
    <a className="floating-contact" href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Hablar con RUVER por WhatsApp">WhatsApp <span aria-hidden="true">↗</span></a>
  </>;
}
