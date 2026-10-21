import test from 'node:test';
import assert from 'node:assert/strict';
import { readConsent, writeConsent, clearConsent, injectFonts, FONTS_HREF, STORAGE_KEY } from '../src/consent.js';
import { PAGES, DEFAULT_META, SITE_URL } from '../src/routes.js';

// Respaldo en memoria para pruebas sin navegador.
function stubStorage() {
  const map = new Map();
  return {
    getItem: key => (map.has(key) ? map.get(key) : null),
    setItem: (key, value) => { map.set(key, String(value)); },
    removeItem: key => { map.delete(key); },
  };
}

test('las tres páginas legales son rutas únicas con metadatos', () => {
  assert.equal(PAGES.length, 3);
  assert.deepEqual([...new Set(PAGES.map(page => page.path))], ['/terminos', '/privacidad', '/cookies']);
  for (const page of PAGES) {
    assert.match(page.path, /^\/[a-z]+$/);
    assert.ok(page.title.includes('RUVER'));
    assert.ok(page.description.length > 40);
    assert.ok(page.full.includes(page.label));
  }
});

test('metadatos por defecto apuntan al dominio publicado', () => {
  assert.ok(DEFAULT_META.title.includes('RUVER'));
  assert.equal(DEFAULT_META.image, `${SITE_URL}/images/0914ad0ee180.jpg`);
});

test('preferencia de cookies se guarda, se lee y se reinicia solo con valores válidos', () => {
  const storage = stubStorage();
  assert.equal(readConsent(storage), null);
  assert.equal(writeConsent('granted', storage), 'granted');
  assert.equal(readConsent(storage), 'granted');
  assert.equal(writeConsent('cookie monstruo', storage), null);
  assert.equal(readConsent(storage), 'granted');
  assert.equal(writeConsent('denied', storage), 'denied');
  assert.equal(readConsent(storage), 'denied');
  clearConsent(storage);
  assert.equal(readConsent(storage), null);
});

test('el consentimiento aceptado carga las fuentes una sola vez', () => {
  const attached = [];
  const stubDocument = {
    head: { append: (...nodes) => attached.push(...nodes) },
    querySelector: () => attached[0] || null,
    createElement: () => ({ setAttribute() {}, getAttribute() { return null; } }),
  };
  assert.equal(injectFonts(stubDocument), true);
  assert.equal(attached.length, 3);
  assert.equal(attached.find(node => node.rel === 'stylesheet').href, FONTS_HREF);
  assert.equal(injectFonts(stubDocument), false);
  assert.equal(attached.length, 3);
});

test('la clave del consentimiento cambia junto con la versión', () => {
  assert.equal(STORAGE_KEY, 'ruver-consent-v1');
});
