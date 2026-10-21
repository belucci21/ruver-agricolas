import { useEffect, useState } from 'react';
import catalog from './catalog.json';
import { business } from './config.js';
import { money, validQuantity, totals, sanitizeCart, parseAmount, orderMessage, MAX_QUANTITY, newOrderCode } from './order.js';
import { copyText, emailLink, whatsappLink } from './links.js';

const STORAGE_KEY = 'ruver-order-v1';
function loadOrder() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (data && /^RUVER-[a-f0-9-]{8,36}$/i.test(data.code)) return { code:data.code, cart:sanitizeCart(data.cart) };
  } catch { /* El almacenamiento no disponible no impide hacer un pedido. */ }
  return { code: newOrderCode(), cart: [] };
}
const categories = ['Malla antiáfido','Malla raschel','Malla antimaleza','Malla antihelada','Bandeja almaciguera','Cinta de riego'];

function PaymentLink({ amount, description, children }) {
  const [feedback, setFeedback] = useState('');
  useEffect(() => setFeedback(''), [amount, description]);
  async function onPay() {
    const copied = await copyText(String(amount));
    setFeedback(copied ? `Monto copiado: ${amount}. Pégalo en Webpay.` : `No se pudo copiar. Escribe ${amount} en el campo del monto de Webpay.`);
  }
  return <>
    <a className="button button-green" href={business.webpay} target="_blank" rel="noopener noreferrer" onClick={onPay}>{children || `Pagar ${money(amount)} con Webpay`} <span aria-hidden="true">↗</span></a>
    <p className="small muted">En Webpay ingresa <strong>{amount}</strong> como monto y <strong className="order-code">{description}</strong> en la descripción. El monto no se completa automáticamente.</p>
    <p className="small" role="status">{feedback}</p>
  </>;
}

export default function Order() {
  const [order, setOrder] = useState(loadOrder);
  const [selected, setSelected] = useState(0);
  const [quantity, setQuantity] = useState('1');
  const [notice, setNotice] = useState('');
  const [storageError, setStorageError] = useState(false);
  const [quoteNumber, setQuoteNumber] = useState('');
  const [quoteAmount, setQuoteAmount] = useState('');
  const [bankNotice, setBankNotice] = useState('');
  const {cart, code} = order;
  const {net, tax, total} = totals(cart);
  const amount = parseAmount(quoteAmount);
  const quoteReady = quoteNumber.trim().length > 0 && amount > 0;
  const quoteMessage = `Hola, pagué la cotización N.º ${quoteNumber.trim()} por ${money(amount)} con Webpay.\nAdjunto el PDF de la cotización y el comprobante de pago.`;
  const bankText = 'Titular: Insuagri Ruver SpA\nRUT: 77.872.414-6\nBanco: Santander\nTipo de cuenta: Cuenta corriente\nN.º de cuenta: 000037266493\nCorreo: insumosruver@gmail.com';
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(order)); setStorageError(false); }
    catch { setStorageError(true); }
  }, [order]);
  function add(event) {
    event.preventDefault();
    if (!validQuantity(quantity)) { setNotice(`Ingresa una cantidad entera entre 1 y ${MAX_QUANTITY}.`); return; }
    const existing = cart.find(item => item.id === selected)?.quantity || 0;
    if (existing + Number(quantity) > MAX_QUANTITY) { setNotice(`El máximo es ${MAX_QUANTITY} unidades por producto.`); return; }
    setOrder(previous => ({...previous, cart:sanitizeCart([...previous.cart, {id:selected,quantity:Number(quantity)}])}));
    setNotice(`Agregado: ${quantity} ${catalog[selected][2]} de ${catalog[selected][0]}.`);
  }
  function update(id, value) {
    if (!validQuantity(value)) { setNotice(`La cantidad debe ser un entero entre 1 y ${MAX_QUANTITY}.`); return; }
    setOrder(previous => ({...previous,cart:previous.cart.map(item => item.id === id ? {...item,quantity:Number(value)} : item)}));
  }
  function remove(id) {
    setOrder(previous => ({...previous,cart:previous.cart.filter(item => item.id !== id)}));
    setNotice(`Producto eliminado: ${catalog[id][0]}.`);
  }
  return <section id="pedido" className="order-section">
    <div className="container">
      <div className="section-heading"><h2>Arma tu pedido</h2><p>Elige tus productos y revisa el total con IVA. Te confirmamos disponibilidad y el valor del despacho.</p></div>
      <div className="order-layout">
        <div className="order-builder panel">
          <h3>Tu pedido</h3>
          <form onSubmit={add} className="add-product-form">
            <div className="field product-field"><label htmlFor="p-producto">Producto y medida</label>
              <select id="p-producto" value={selected} onChange={e => setSelected(Number(e.target.value))}>
                {categories.map(category => <optgroup key={category} label={category}>{catalog.map((item,id) => item[0].startsWith(category) ? <option key={id} value={id}>{item[0]} · {money(item[1])} + IVA</option> : null)}</optgroup>)}
              </select>
            </div>
            <div className="field quantity-field"><label htmlFor="p-cantidad">Cantidad</label><input id="p-cantidad" type="number" min="1" max={MAX_QUANTITY} step="1" inputMode="numeric" required value={quantity} onChange={e => setQuantity(e.target.value)} /></div>
            <button className="button button-green add-button" type="submit">Agregar <span aria-hidden="true">+</span></button>
          </form>
          <p className="small muted">Cantidades en rollos para mallas y riego, y en unidades o cajas para bandejas. Precios en pesos chilenos.</p>
          <div role="status" aria-live="polite" className="small cart-notice">{notice}</div>
          {storageError && <p className="notice">Este navegador no permite guardar el carrito. El pedido se perderá al recargar la página.</p>}
          {!cart.length ? <div className="empty-cart"><span aria-hidden="true">＋</span><strong>Tu próximo cultivo empieza aquí</strong><p>Todavía no agregas productos. Elige una medida para armar tu pedido.</p></div> : <>
            <ul className="cart-items">{cart.map(item => <li className="cart-item" key={item.id}>
              <div className="cart-item-name"><strong>{catalog[item.id][0]}</strong><span className="small muted">{money(catalog[item.id][1])} + IVA / {catalog[item.id][2] === 'bandejas' ? 'bandeja' : catalog[item.id][2] === 'cajas' ? 'caja' : 'rollo'}</span></div>
              <div className="quantity-control"><button type="button" aria-label={`Reducir cantidad de ${catalog[item.id][0]}`} disabled={item.quantity===1} onClick={() => update(item.id,item.quantity-1)}>−</button><span aria-label="Cantidad">{item.quantity}</span><button type="button" aria-label={`Aumentar cantidad de ${catalog[item.id][0]}`} disabled={item.quantity===MAX_QUANTITY} onClick={() => update(item.id,item.quantity+1)}>+</button></div>
              <strong>{money(catalog[item.id][1]*item.quantity)}</strong>
              <button className="remove-button" type="button" aria-label={`Quitar ${catalog[item.id][0]}`} onClick={() => remove(item.id)}>Quitar</button>
            </li>)}</ul>
            <dl className="totals"><div><dt>Neto</dt><dd>{money(net)}</dd></div><div><dt>IVA (19 %)</dt><dd>{money(tax)}</dd></div><div className="grand-total"><dt>Total</dt><dd data-testid="order-total">{money(total)}</dd></div></dl>
            <p className="notice">El total no incluye el flete. Te confirmamos su valor según la zona y la dirección de despacho.</p>
            <a className="button button-green" href={whatsappLink(orderMessage(cart,code))} target="_blank" rel="noopener noreferrer">Confirmar pedido por WhatsApp ↗</a>
            <a className="button button-outline" href={emailLink('Pedido desde la página web',orderMessage(cart,code))}>Enviar pedido por correo</a>
            <p className="small muted order-code">Referencia: {code}</p>
          </>}
        </div>
        <div className="payment-options">
          <h3>Formas de pago</h3>
          <div className="panel payment-panel"><h4><span className="step-dot">1</span> Pagar el pedido con Webpay</h4>
            <p>Confirma disponibilidad y despacho con nosotros antes de pagar. Puedes pagar con débito o crédito en Webpay.</p>
            {cart.length ? <><PaymentLink amount={total} description={code} /><a className="button button-outline" target="_blank" rel="noopener noreferrer" href={whatsappLink(orderMessage(cart,code,true))}>Ya pagué: enviar comprobante</a></> : <p className="notice neutral">Agrega productos para ver el monto a pagar.</p>}
            <p className="small muted">El pago se realiza en Webpay. Revisamos el comprobante antes de despachar. El flete se cobra aparte.</p>
          </div>
          <div id="pagar-cotizacion" className="panel payment-panel"><h4><span className="step-dot">2</span> Pagar una cotización</h4><p>Ingresa el número y el total con IVA de tu cotización en PDF.</p>
            <div className="field"><label htmlFor="c-numero">N.º de cotización</label><input id="c-numero" maxLength={60} placeholder="Ejemplo: 1045" value={quoteNumber} onChange={e => setQuoteNumber(e.target.value)} /></div>
            <div className="field"><label htmlFor="c-monto">Total de la cotización con IVA</label><input id="c-monto" type="text" inputMode="numeric" placeholder="Ejemplo: 450.000" value={quoteAmount} onChange={e => setQuoteAmount(e.target.value)} aria-invalid={quoteAmount.length > 0 && !amount} aria-describedby="quote-amount-help" /></div>
            <p id="quote-amount-help" className="small muted">Monto en pesos chilenos, sin decimales. Completa ambos campos para habilitar el pago.</p>
            {quoteReady && <><PaymentLink amount={amount} description={'Cotización '+quoteNumber.trim()} /><a className="button button-outline" target="_blank" rel="noopener noreferrer" href={whatsappLink(quoteMessage)}>Ya pagué: enviar PDF por WhatsApp</a><a className="text-link" href={emailLink('Pago de cotización N.º '+quoteNumber.trim(),quoteMessage)}>Enviar comprobante por correo ↗</a></>}
            <p className="small muted">Adjunta el PDF y el comprobante en WhatsApp o en tu aplicación de correo.</p>
          </div>
          <details className="panel bank-details"><summary><span className="step-dot">3</span> Transferencia bancaria <span aria-hidden="true">+</span></summary>
            <dl>{[['Titular','Insuagri Ruver SpA'],['RUT','77.872.414-6'],['Banco','Banco Santander'],['Tipo de cuenta','Cuenta corriente'],['N.º de cuenta','000037266493'],['Correo',business.email]].map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            <button type="button" className="button button-outline" onClick={async () => setBankNotice(await copyText(bankText) ? 'Datos bancarios copiados.' : 'No se pudieron copiar. Puedes seleccionarlos y copiarlos manualmente.')}>Copiar datos bancarios</button><p role="status" className="small">{bankNotice}</p>
            <p className="small muted">En el <strong>motivo</strong> de la transferencia escribe tu referencia ({cart.length ? code : 'RUVER-…'} o el número de cotización) para identificar tu pago.</p>
            <p className="small muted">Envía el comprobante por WhatsApp o al correo para despachar tu pedido.</p>
          </details>
        </div>
      </div>
    </div>
  </section>;
}
