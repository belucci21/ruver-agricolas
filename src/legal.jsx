import { useEffect, Fragment } from 'react';
import { business } from './config.js';
import { whatsappLink } from './links.js';
import { PAGES, SITE_URL, LEGAL_UPDATED } from './routes.js';

// Atajos de contenido: elementos frecuentes en estos documentos.
const P = props => <p className="legal-p" {...props} />;
const LI = props => <li {...props} />;
const Link = props => <a {...props} />;
const CONTACT = { phone: '+56 9 8731 6764' };

function useHead({ title, description, path }) {
  useEffect(() => {
    document.title = title;
    const set = (query, attribute, value) => {
      const element = document.head.querySelector(query);
      if (element) element.setAttribute(attribute, value);
    };
    set('meta[name="description"]', 'content', description);
    set('link[rel="canonical"]', 'href', `${SITE_URL}${path}`);
    set('meta[property="og:title"]', 'content', title);
    set('meta[property="og:description"]', 'content', description);
    set('meta[property="og:url"]', 'content', `${SITE_URL}${path}`);
    set('meta[name="twitter:title"]', 'content', title);
    set('meta[name="twitter:description"]', 'content', description);
  }, [title, description, path]);
}

function LegalLayout({ page, title, intro, sections }) {
  useHead({ title: page.title, description: page.description, path: page.path });
  return <article className="legal-page">
    <div className="legal-hero">
      <div className="container">
        <p className="legal-kicker">Insumos Agrícolas RUVER</p>
        <h1>{title}</h1>
        <p className="legal-intro">{intro}</p>
        <p className="small muted legal-date">Última actualización: {LEGAL_UPDATED}</p>
      </div>
    </div>
    <div className="container legal-body">
      <nav className="panel legal-toc" aria-label="Contenido del documento">
        <strong>En este documento</strong>
        <ol>{sections.map((section, index) => <li key={index}><a href={`#legal-${index}`}>{section.heading}</a></li>)}</ol>
      </nav>
      {sections.map((section, index) => <Fragment key={index}>
        <h2 id={`legal-${index}`}>{section.heading}</h2>
        {section.body}
      </Fragment>)}
      <div className="panel legal-contact">
        <h3>Contacto</h3>
        <P>Insuagri Ruver SpA · RUT 77.872.414-6 · Av. San Isidro 21H, Quillota, Región de Valparaíso.</P>
        <P><Link href={whatsappLink('Hola, tengo una consulta sobre el sitio de Insumos Agrícolas RUVER.')} target="_blank" rel="noopener noreferrer">WhatsApp {CONTACT.phone}</Link> · <Link href={`mailto:${business.email}`}>{business.email}</Link></P>
      </div>
    </div>
  </article>;
}

export function Terms() {
  return <LegalLayout title="Términos y condiciones"
    intro="Estas condiciones regulan la compra de insumos agrícolas a través de este sitio web. Al armar un pedido o pagar, declaras que las leíste y las aceptas."
    sections={[
      { heading: '1. Quién vende', body: <>
        <P>El sitio y la venta de productos corresponden a <strong>Insuagri Ruver SpA</strong>, RUT 77.872.414-6, con domicilio en Av. San Isidro 21H, comuna de Quillota, Región de Valparaíso, Chile. Atiende de lunes a viernes de 9:00 a 17:30 h por WhatsApp {CONTACT.phone} y por el correo {business.email}.</P>
      </> },
      { heading: '2. Catálogo, precios e IVA', body: <>
        <P>Los precios se publican en pesos chilenos y corresponden a la venta al detalle, más IVA (19 %), salvo que se indique lo contrario. El precio de cada producto no incluye el flete: el valor del despacho se confirma según la zona y la dirección de entrega.</P>
        <P>Los precios, medidas, presentaciones y stock disponibles pueden variar sin aviso previo. Las fotos y características publicadas son referenciales del formato del producto.</P>
      </> },
      { heading: '3. Cómo se arma y se confirma un pedido', body: <>
        <LI>Agregas productos al carrito y el sitio calcula neto, IVA y total.</LI>
        <LI>Confirmas y nos envías el pedido por WhatsApp o correo con tu referencia (por ejemplo, RUVER-1234), la dirección de despacho y tus datos de contacto.</LI>
        <LI>Nosotros revisamos disponibilidad, flete y precio final, y te escribimos para confirmar costos y plazo.</LI>
        <LI>El pedido queda registrado solo cuando responds esa confirmación. La referencia del carrito sirve para identificar la conversación; no es una orden registrada en un servidor.</LI>
      </> },
      { heading: '4. Formas de pago', body: <>
        <P><strong>Webpay:</strong> pago con tarjeta de débito o crédito en la plataforma de Transbank. El enlace del sitio no completa automáticamente el monto: puedes copiarlo con un clic e ingresarlo en el formulario de Webpay. La transacción ocurre íntegramente en Transbank; nunca recibimos ni almacenamos datos de tarjetas.</P>
        <P><strong>Transferencia bancaria:</strong> desde cualquier banco a la cuenta corriente de Insuagri Ruver SpA en Banco Santander, N.º de cuenta 000037266493. Te recomendamos indicar en el motivo de la transferencia tu referencia (por ejemplo, RUVER-1234 o el número de la cotización) para identificar tu pago con rapidez.</P>
        <P>Al pagar una cotización, ingresa su número y el total con IVA indicado en el PDF; si el monto pagado no coincide con la cotización, te contactamos antes de despachar.</P>
      </> },
      { heading: '5. Confirmación del pago y entrega', body: <>
        <P>El sitio no verifica pagos automáticamente: revisamos el comprobante (Webpay o transferencia) antes de despachar. Confirmado el pago y acordado el flete, coordinamos la entrega con la dirección escrita en tu mensaje. Si necesitas factura electrónica, pídela con el RUT y el giro de tu empresa en la misma conversación.</P>
      </> },
      { heading: '6. Derecho a retractarse', body: <>
        <P>Si compraste en este sitio sin negociar el pedido en una tienda física, puedes retractarte de la compra dentro de los <strong>10 días siguientes a la recepción del producto</strong> (Ley N.º 19.496 sobre Protección de los Derechos de los Consumidores, modificada por la Ley N.º 21.723), siempre que podamos reponer el producto y lo devuelvas con su embalaje original y la boleta o factura. Reembolsamos el dinero dentro del mismo plazo de 10 días. También puedes pedir la reposición del producto con desperfectos.</P>
        <P>El retracto no aplica a pedidos despachados con medidas especiales ni a encargos confeccionados según tus especificaciones.</P>
      </> },
      { heading: '7. Garantía', body: <>
        <P>Los productos cuentan con garantía legal de 90 días para fallas de fabricación o desperfectos manifiestos al momento de la entrega o dentro del plazo. La garantía legal es independiente de cualquier garantía voluntaria que informemos en cada cotización o conversación.</P>
      </> },
      { heading: '8. Ley aplicable y fiscalización', body: <>
        <P>Estas condiciones se rigen por las leyes de Chile. Puedes presentar reclamos ante el Servicio Nacional del Consumidor (SERNAC) o ante los tribunales que correspondan según la ley. Las dudas sobre este documento se resuelven en la conversación de tu pedido.</P>
      </> },
    ]} />;
}

export function Privacy() {
  return <LegalLayout title="Política de privacidad"
    intro="Este sitio no registra cuentas ni guarda tus datos en un servidor. Esta política explica qué información te pedimos, para qué la usamos y cómo ejercer tus derechos."
    sections={[
      { heading: '1. Responsable del tratamiento', body: <>
        <P>Los datos compartidos al usar este sitio son tratados por <strong>Insuagri Ruver SpA</strong>, RUT 77.872.414-6, responsable del tratamiento. Para consultas de privacidad escribe a {business.email}.</P>
      </> },
      { heading: '2. Qué datos recolectamos', body: <>
        <LI><strong>Datos que compartes voluntariamente:</strong> al cotizar, confirmar un pedido o enviar un comprobante de pago compartes por WhatsApp o correo datos como nombre, teléfono, correo, dirección de despacho, documentos y el detalle de los productos. Este sitio web no pide registro de usuarios ni envía formularios a un servidor.</LI>
        <LI><strong>Datos del navegador (solo locales):</strong> el carrito y la preferencia de cookies se guardan en el almacenamiento local de tu navegador (localStorage) y no llegan a ningún servidor propio. Los detalles están en la política de cookies.</LI>
        <LI><strong>Datos del pago:</strong> si pagas con Webpay, la información de la tarjeta la procesa Transbank conforme a sus propias políticas; nosotros solo revisamos el comprobante que nos envías.</LI>
      </> },
      { heading: '3. Para qué usamos los datos', body: <>
        <P>Usamos la información compartida para responder cotizaciones, preparar tu pedido, coordinar el flete y el despacho, emitir boleta o factura, resolver reclamos y mantener el historial de tu relación comercial como cliente. No la usamos para publicidad ni para crear perfiles de comportamiento.</P>
      </> },
      { heading: '4. Con quién compartimos los datos', body: <>
        <P>No vendemos ni arrendamos tus datos. Solo los compartimos cuando es necesario para ejecutar tu pedido o cumplir una obligación legal:</P>
        <LI><strong>Transbank:</strong> para tramitar el pago dentro de Webpay, cuando la transacción ocurre en su plataforma.</LI>
        <LI><strong>Operadores de despacho:</strong> distribuidoras o transportistas, con los datos mínimos para la entrega.</LI>
        <LI><strong>Servicio de Impuestos Internos:</strong> en el contexto de la facturación electrónica.</LI>
        <LI><strong>Plataformas de comunicación que elijas:</strong> WhatsApp y tu proveedor de correo, que aplican sus propias políticas y están fuera de nuestro control.</LI>
      </> },
      { heading: '5. Conservación', body: <>
        <P>Conservamos la información compartida por WhatsApp o el correo durante el tiempo necesario para atender tu pedido y mantener la historia comercial. El almacenamiento local del carrito permanece en tu navegador hasta que lo borres o vacíes el carrito. Si solicitas borrar la información, eliminamos los datos personales que correspondan, salvo los que debamos conservar por ley.</P>
      </> },
      { heading: '6. Tus derechos', body: <>
        <P>Puedes ejercer los derechos de acceso, actualización o rectificación de tus datos, y solicitar su cancelación u oposición a tratamientos determinados, conforme a la Ley N.º 19.628 sobre Protección de la Vida Privada. Desde el 1 de diciembre de 2026 también aplica la Ley N.º 21.719, que crea la Agencia de Protección de Datos Personales y refuerza estos derechos.</P>
        <P>Para ejercerlos escribe a {business.email} o por WhatsApp al {CONTACT.phone} con la solicitud y la información que permita identificar tus datos.</P>
      </> },
      { heading: '7. Seguridad y servicios externos', body: <>
        <P>Trabajamos con canales de mensajería con cifrado como WhatsApp, aunque ninguna transmisión es absolutamente segura: evita enviar datos que no sean necesarios para comprar (por ejemplo, no envíes fotos de tu tarjeta).</P>
        <P>El pago con Webpay y el despacho dependen de terceros (Transbank, operadores de despacho), conforme a sus propias normativas de seguridad y privacidad.</P>
      </> },
      { heading: '8. Menores de edad', body: <>
        <P>Este sitio se dirige a compradores agrícolas mayores de 18 años. Si descubrimos datos de un menor tratados sin autorización, los eliminamos a la brevedad.</P>
      </> },
      { heading: '9. Cambios en esta política', body: <>
        <P>Esta política se actualizó en {LEGAL_UPDATED}. Si la modificamos, publicaremos la nueva versión en esta dirección con su fecha de vigencia.</P>
      </> },
    ]} />;
}

export function Cookies() {
  return <LegalLayout title="Política de cookies"
    intro="Este sitio no usa cookies de seguimiento ni de publicidad: el único almacenamiento que hacemos es el carrito y tu preferencia de cookies, dentro de tu navegador."
    sections={[
      { heading: '1. Sin cookies ni seguimiento de terceros', body: <>
        <P>Este sitio no instala cookies propias de análisis, publicidad o redes sociales, y tampoco contrata seguimiento de terceros mientras navegas. El carrito funciona sin cookies de identificación porque usa herramientas del propio navegador.</P>
      </> },
      { heading: '2. Almacenamiento local del navegador (localStorage)', body: <>
        <P>En lugar de cookies, guardamos dos claves en el almacenamiento local de tu navegador, siempre desde el dominio ruver-agricolas.com:</P>
        <LI><strong>ruver-order-v1</strong> guarda tu carrito y la referencia del pedido (formato RUVER-…). Permite recuperar el carrito al recargar la página. Se borra si vacías el carrito o limpias los datos del navegador.</LI>
        <LI><strong>ruver-consent-v1</strong> guarda tu decisión sobre las fuentes de Google (aceptar o rechazar). Se reinicia con el botón «Ajustes de cookies» del pie de página.</LI>
        <P>Estos datos no salen de tu dispositivo: si cambias de equipo o de navegador, la web vuelve a empezar desde cero.</P>
      </> },
      { heading: '3. Fuentes de Google (opcionales)', body: <>
        <P>Las tipografías del sitio se descargan desde Google Fonts <strong>solo si las aceptas</strong> en el aviso de cookies. Si las rechazas, el sitio completo funciona con fuentes del sistema y Google no recibe solicitudes desde tu visita. Si las aceptas, Google puede registrar en sus servidores la solicitud de las fuentes (por ejemplo, tu dirección IP), conforme a sus políticas de privacidad.</P>
      </> },
      { heading: '4. Servicios externos fuera del sitio', body: <>
        <P>Al continuar la compra en otros servicios, ellos aplican sus propias cookies y políticas; no son parte del site de RUVER:</P>
        <LI><strong>WhatsApp (wa.me):</strong> al abrir la conversación de cotización, pedido o comprobante.</LI>
        <LI><strong>Webpay (Transbank):</strong> al abrir la pasarela de pago; allí Transbank administra la información de la tarjeta.</LI>
        <LI><strong>Tu proveedor de correo:</strong> al abrir la aplicación de correo para enviarnos un mensaje.</LI>
      </> },
      { heading: '5. Cómo cambiar tu decisión', body: <>
        <P>En el pie de cualquier página puedes usar «<strong>Ajustes de cookies</strong>» para volver a elegir entre aceptar o rechazar las fuentes de Google. El rechazo no impide cotizar, armar el pedido ni pagar: el almacenamiento del carrito sigue disponible porque es necesario para el funcionamiento del sitio.</P>
      </> },
      { heading: '6. Actualización', body: <>
        <P>Esta política se actualizó en {LEGAL_UPDATED}. Ante cambios relevantes publicaremos la nueva versión en esta dirección.</P>
      </> },
    ]} />;
}
