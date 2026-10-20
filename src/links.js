import { business } from './config.js';
export const whatsappLink = text => `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
export const emailLink = (subject, text) => `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
export async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch { return false; }
}
