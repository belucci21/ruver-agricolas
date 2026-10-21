// Preferencia de cookies guardada localmente y carga condicional de Google Fonts.
export const STORAGE_KEY = 'ruver-consent-v1';
export const FONTS_HREF = 'https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Semi+Condensed:wght@600;700&display=swap';
export const CONSENT_EVENT = 'ruver-consent-reset';

const VALID = { granted: 'granted', denied: 'denied' };

export function readConsent(storage = globalThis.localStorage) {
  try {
    const value = storage.getItem(STORAGE_KEY);
    return VALID[value] || null;
  } catch { return null; }
}

export function writeConsent(value, storage = globalThis.localStorage) {
  const approved = VALID[value];
  if (!approved) return null;
  try { storage.setItem(STORAGE_KEY, approved); return approved; } catch { return null; }
}

export function clearConsent(storage = globalThis.localStorage) {
  try { storage.removeItem(STORAGE_KEY); } catch { /* sin almacenamiento no hay nada que limpiar */ }
}

// Inserta las tipografías solo cuando la persona aceptó. Devuelve true si insertó.
export function injectFonts(document = globalThis.document) {
  if (!document || !document.head) return false;
  if (document.querySelector('link[data-ruver-fonts]')) return false;
  const nodes = [
    ['https://fonts.googleapis.com', 'preconnect', false],
    ['https://fonts.gstatic.com', 'preconnect', true],
    [FONTS_HREF, 'stylesheet', false],
  ];
  for (const [href, rel, cors] of nodes) {
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    if (cors) link.crossorigin = 'anonymous';
    link.setAttribute('data-ruver-fonts', '');
    document.head.append(link);
  }
  return true;
}
