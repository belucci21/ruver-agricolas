import { useState } from 'react';
import { business } from './config.js';
import { emailLink, whatsappLink } from './links.js';

export default function QuoteForm({ product, setProduct }) {
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [status, setStatus] = useState('');
  function submit(event) {
    event.preventDefault();
    if (!name.trim() || !detail.trim()) { setStatus('Indica tu nombre, la medida y la cantidad que necesitas.'); return; }
    const message = `Hola, quiero una cotización.\nNombre: ${name.trim()}\nProducto: ${product}\nMedida y cantidad: ${detail.trim()}`;
    const channel = event.nativeEvent.submitter?.value || 'whatsapp';
    if (channel === 'email') {
      window.location.href = emailLink('Solicitud de cotización', message);
      setStatus('Se ha solicitado abrir tu aplicación de correo con el mensaje preparado. Revisa y envía el correo allí.');
    } else {
      const opened = window.open(whatsappLink(message), '_blank', 'noopener,noreferrer');
      if (opened) opened.opener = null;
      setStatus('Continúa en WhatsApp para revisar y enviar tu solicitud. Si no se abre, utiliza el enlace de abajo.');
    }
  }
  const message = `Hola, quiero una cotización.\nNombre: ${name.trim()}\nProducto: ${product}\nMedida y cantidad: ${detail.trim()}`;
  return <section id="contacto" className="contact-section">
    <div className="container contact-layout">
      <div className="contact-copy">
        <h2>Pide tu cotización</h2>
        <p>Cuéntanos qué producto necesitas, la medida y la cantidad. Te respondemos con precio y disponibilidad. Hacemos descuentos por volumen y a clientes habituales.</p>
        <dl className="contact-details">
          <div><dt>WhatsApp</dt><dd><a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer">+56 9 8731 6764</a></dd></div>
          <div><dt>Correo</dt><dd><a href={`mailto:${business.email}`}>{business.email}</a></dd></div>
          <div><dt>Dirección</dt><dd>Av. San Isidro 21H, Quillota, Región de Valparaíso</dd></div>
          <div><dt>Horario</dt><dd>Lunes a viernes, de 9:00 a 17:30 h</dd></div>
        </dl>
      </div>
      <form className="quote-form panel" onSubmit={submit}>
        <label htmlFor="f-nombre">Nombre</label>
        <input id="f-nombre" name="nombre" autoComplete="name" placeholder="Tu nombre" required maxLength={100} value={name} onChange={e => setName(e.target.value)} />
        <label htmlFor="f-producto">Producto</label>
        <select id="f-producto" name="producto" value={product} onChange={e => setProduct(e.target.value)}>
          {['Malla antiáfido','Malla raschel','Malla antimaleza','Malla antihelada','Bandejas almacigueras','Cintas de riego','Varios productos'].map(item => <option key={item}>{item}</option>)}
        </select>
        <label htmlFor="f-detalle">Medida y cantidad</label>
        <textarea id="f-detalle" name="detalle" rows={4} required maxLength={2000} placeholder="Ejemplo: malla raschel 80 %, 4,20 × 100 m, 3 rollos" value={detail} onChange={e => setDetail(e.target.value)} />
        <button className="button button-green" type="submit" value="whatsapp">Enviar por WhatsApp <span aria-hidden="true">↗</span></button>
        <button className="button button-outline" type="submit" value="email">Cotizar por correo</button>
        <p className="muted small">Se abre WhatsApp o tu aplicación de correo con el mensaje escrito. Revisa y confirma el envío allí.</p>
        <p className="muted small">Usamos tus datos para atender esta solicitud. Consulta la <a href="/privacidad">política de privacidad</a> y las <a href="/envios-y-devoluciones">condiciones de envío y devolución</a>.</p>
        <div role="status" aria-live="polite">{status && <p className="notice">{status} {name.trim() && detail.trim() && <a target="_blank" rel="noopener noreferrer" href={whatsappLink(message)}>Abrir WhatsApp</a>}</p>}</div>
      </form>
    </div>
  </section>;
}
