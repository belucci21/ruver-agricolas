import catalog from './catalog.json' with { type: 'json' };

export const MAX_QUANTITY = 9999;
export function newOrderCode(provider = globalThis.crypto) {
  const id = typeof provider.randomUUID === 'function' ? provider.randomUUID() : Array.from(provider.getRandomValues(new Uint8Array(16)), byte => byte.toString(16).padStart(2, '0')).join('');
  return 'RUVER-' + id;
}
export const money = value => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(value);
export const validQuantity = value => /^\d+$/.test(String(value)) && Number(value) >= 1 && Number(value) <= MAX_QUANTITY;
export function sanitizeCart(value) {
  if (!Array.isArray(value)) return [];
  return value.filter(item => item && Number.isInteger(item.id) && catalog[item.id] && validQuantity(item.quantity))
    .reduce((items, item) => {
      const found = items.find(row => row.id === item.id);
      if (found) found.quantity = Math.min(MAX_QUANTITY, found.quantity + Number(item.quantity));
      else items.push({ id: item.id, quantity: Number(item.quantity) });
      return items;
    }, []);
}
export function totals(cart) {
  const net = sanitizeCart(cart).reduce((sum, item) => sum + catalog[item.id][1] * item.quantity, 0);
  const tax = Math.round(net * 0.19);
  return { net, tax, total: net + tax };
}
export function parseAmount(value) {
  const text = String(value).trim();
  if (!/^(?:\d+|\d{1,3}(?:\.\d{3})+)$/.test(text)) return 0;
  const amount = Number(text.replaceAll('.', ''));
  return Number.isSafeInteger(amount) && amount > 0 && amount <= 999999999 ? amount : 0;
}
export function orderMessage(cart, code, paid = false) {
  const rows = sanitizeCart(cart);
  const { net, tax, total } = totals(rows);
  return [paid ? `Hola, pagué este pedido con Webpay (${code}):` : `Hola, quiero confirmar disponibilidad y despacho para este pedido (${code}):`,
    ...rows.map(item => `- ${catalog[item.id][0]}: ${item.quantity} ${catalog[item.id][2]} (${money(item.quantity * catalog[item.id][1])} + IVA)`),
    `Neto: ${money(net)}`, `IVA (19 %): ${money(tax)}`, `Total: ${money(total)}`,
    'Flete: por confirmar según la dirección de despacho.', 'Dirección de despacho: ',
    ...(paid ? ['Adjunto el comprobante de pago.'] : [])].join('\n');
}
