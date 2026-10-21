// Fuente única de rutas legales y metadatos del sitio.
export const SITE_URL = 'https://ruver-agricolas.com';

export const PAGES = [
  {
    path: '/terminos',
    label: 'Términos',
    full: 'Términos y condiciones',
    title: 'Términos y condiciones | Insumos Agrícolas RUVER',
    description: 'Condiciones de venta de Insumos Agrícolas RUVER: precios más IVA, formas de pago con Webpay o transferencia, despacho a todo Chile y derecho de retractación.',
  },
  {
    path: '/privacidad',
    label: 'Privacidad',
    full: 'Política de privacidad',
    title: 'Política de privacidad | Insumos Agrícolas RUVER',
    description: 'Cómo tratamos los datos que compartes con Insumos Agrícolas RUVER por WhatsApp o correo: finalidad, conservación, derechos y contactos para solicitarlos.',
  },
  {
    path: '/cookies',
    label: 'Cookies',
    full: 'Política de cookies',
    title: 'Política de cookies | Insumos Agrícolas RUVER',
    description: 'Insumos Agrícolas RUVER no usa cookies de seguimiento: revisa el almacenamiento local del carrito, las fuentes de Google y los servicios externos de pago.',
  },
];

// Titulares por defecto (página de inicio). Deben coincidir con index.html.
export const DEFAULT_META = {
  title: 'Insumos Agrícolas RUVER | Mallas agrícolas, bandejas almacigueras y cintas de riego',
  description: 'Mallas antiáfido, raschel, antimaleza y antihelada, bandejas almacigueras y cintas de riego. Despacho a todo Chile.',
  image: `${SITE_URL}/images/0914ad0ee180.jpg`,
};

// Actualización visible de los documentos legales.
export const LEGAL_UPDATED = 'octubre de 2026';
