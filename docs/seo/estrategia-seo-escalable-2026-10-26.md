# Estrategia SEO escalable RUVER

Fecha: 26 de octubre de 2026 · sitio: ruver-agricolas.com · empresa: INSUAGRI RUVER SpA (insumos agrícolas), base comercial Quillota, Región de Valparaíso, Chile · alcance comercial anunciado: Chile, sujeto a transporte y destino.

Documento complementario del informe SEO del 26 de octubre de 2026 y del informe base del 23 de octubre de 2026. Mantiene los mismos criterios: sin volúmenes de búsqueda, posiciones ni resultados medidos que no existan; las expresiones de consulta son propuestas de trabajo a validar con Search Console.

## 1 | Objetivo y principio

- Objetivo: que las seis familias del catálogo capturen búsquedas comerciales en Chile y conviertan en cotizaciones por WhatsApp o correo, atendidas por RUVER.
- Principio rector: una URL nueva solo se publica si aporta contenido propio que responde una pregunta real de compra o de uso. Las páginas por comuna o por pequeñas variaciones de palabras no se crean (canibalización y contenido delgado).
- Fuente única de verdad: el catálogo y las fichas confirmadas por el negocio. Ninguna guía promete precios finales, stock ni resultados de protección absoluta; la disponibilidad, el flete y el plazo se confirman en la conversación antes del pago.

## 2 | La máquina de contenido: cómo escala el blog

El blog fue integrado al flujo de compilación del sitio, no es un sistema aparte:

1. Datos: `src/blog.js` contiene el índice y la lista de guías (ruta, título, bajada, fecha, categoría y secciones).
2. Presentación: `src/Blog.jsx` dibuja índice, guía y bloques de enlaces.
3. Build: `scripts/prerender.mjs` genera cada `/blog/<slug>` como HTML propio con título, canonical, Open Graph y JSON-LD (WebPage para el índice; BlogPosting + BreadcrumbList para cada guía), y los incorpora a `sitemap.xml` automáticamente.
4. Tests: `tests/blog.test.js` valida integridad de datos (rutas únicas, metadatos completos, categoría real) y `tests/prerender.test.mjs` exige un HTML válido por cada página con título y H1 únicos. El build falla si algo está mal, y el contenedor anterior queda sirviendo: la publicación nunca deja el sitio en blanco.

### Cómo se publica una guía nueva (procedimiento)

1. Agregar el objeto en `src/blog.js` con: `path`, `title` (diferente de todas las anteriores), `headline` (H1), `description` (60–200 caracteres), `date`, `dateLabel`, `category` (de `src/categories.js`) y `sections` (párrafos y/o listas).
2. Actualizar el conteo de páginas en `tests/prerender.test.mjs` (actualmente 16). Este paso es intencional: obliga a revisar que el índice y el sitemap queden coherentes antes de publicar.
3. Ejecutar el flujo completo en una rama si hay dudas (npm test && npm run build); de lo contrario, empujar a `main`.
4. En Docker Manager (VPS 2080359 → proyecto `ruver` → Implementar) reconstruir; el build corre tests + prerender dentro del contenedor.
5. Verificar en el dominio: la guía responde 200 con H1 en el HTML prerrenderizado, el sitemap la incorpora y `/blog` la lista.
6. Agregar en una categoría existente o pedir revisión del negocio si la guía introduce afirmaciones técnicas nuevas.

### Acumulación de contenido

Las cuatro guías publicadas (26-oct) cubren las familias con mayor variedad de formato (raschel, antiáfido, bandejas, cinta de riego). Antimaleza y antihelada se atienden en la siguiente tanda (sección 3). Cada nueva guía hereda enlazado interno, sitemap y marcado sin trabajo manual.

## 3 | Mapa de contenido: familia → guía → consultas

Matriz de trabajo. Prioridad cualitativa por cercanía a una cotización; validar demanda real en Search Console.

| Familia (URL de categoría) | Guía publicada 26-oct | Próximas guías propuestas | Consultas objetivo adicionales (propuestas) |
| --- | --- | --- | --- |
| Malla raschel /malla-raschel | Porcentajes de sombra ✔ | Elegir sombra según cultivo y exposición (síntomas de exceso/déficit de luz); instalación, anclaje y sujeción de paños | sombreadero Chile; raschel verde o negro; cortaviento raschel |
| Malla antiáfido /malla-antiafido | 40 mesh u 50 mesh ✔ | Instalación en invernadero: bordes, puertas y ventanas; coexistencia con polinizadores y ventilación | malla para invernadero Chile; malla mosquito agrícola |
| Malla antimaleza /malla-antimaleza | — | Cómo calcular rollos para una superficie (ancho útil, traslapo, 2 x 100 m) | manta antimaleza por metro; tela antihierba rollo |
| Malla antihelada /malla-antihelada | — | Manto térmico 17 g: uso y retiro post-helada (estacional: publicar entre marzo y abril) | manta antihelada; mantillo térmico agrícola |
| Bandejas almacigueras /bandejas-almacigueras | Celdas según cultivo ✔ | Del alveolo al trasplante: calendario de siembra por zona; pedir por caja de 100 | bandeja de siembra; caja de bandejas para almácigo |
| Cintas de riego /cintas-de-riego | Cinta 6 mil ✔ | Diseño básico de hilera: largo, filtrado y presión; comparar cinta con manguera de goteo | cinta de goteo por metro; cinta de riego 6 mil precio |

Reglas anti-duplicación del mapa: solo una guía por atributo (sombra, mesh, celdas, espesor). Si surge una consulta de formato, se incorpora en la guía de la familia, no en una página nueva.

## 4 | Enlazado interno (matriz viva)

Implementado el 26-oct y permanente para guías nuevas:

| Desde | Enlaza a |
| --- | --- |
| Portada / | Índice del blog (`BlogLinks`) + seis categorías |
| Índice /blog | Todas las guías (tarjetas) + seis categorías (CategoryLinks) |
| Cada guía | Su categoría (encabezado y CTA), las demás guías ("Guías relacionadas"), envíos y devoluciones, pedido de la web |
| Cada categoría | BlogLinks (todas las guías) + CategoryLinks (resto de categorías) |
| Footer global | Blog de guías + documentos legales |

Norma de textos de ancla: usar nombre + especificación («malla raschel 65 % en 4,20 m»), nunca «haz clic aquí». Al migrar o renombrar una guía, preservar la URL (los slugs son permanentes: un cambio rompe enlaces internos y del sitemap).

## 5 | Search Console y líneas de medición

1. Verificar la propiedad con el titular (dominio o prefijo de URL). Sin verificación no hay informes.
2. Enviar `https://ruver-agricolas.com/sitemap.xml` (ahora 16 URLs, se mantiene sola).
3. Inspeccionar portada, /blog y una guía: comprobar que Google renderiza el HTML prerrenderizado y detectar índice/404.
4. Exportar cada 28 días: consultas, páginas, país Chile, marca vs. no marca. Primera exportación = línea base histórica; no hay cifras previas que comparar.
5. Priorizar mejoras por contenido con impresiones y pocas conversiones (título/bajada o falta de guía en esa familia).

Sin herramientas de analítica de terceros. Cualquier incorporación futura (GA4, píxeles) exige revisar el banner de consentimiento y la política de cookies primero; hoy el sitio solo usa localStorage (`ruver-order-v1`, `ruver-consent-v1`) y carga Google Fonts únicamente tras aceptar.

## 6 | SEO local (Quillota / Valparaíso)

- Reclamar o crear la ficha de Google Business Profile con el NAP exacto del sitio: INSUAGRI RUVER SpA · RUT 77.872.414-6 · Av. San Isidro 21H, Quillota. Definir con RUVER si hay atención en el domicilio (mostrar dirección) o área de servicio.
- Fotos propias de productos y despachos; categorías de negocio coherentes con las familias.
- Reseñas reales solicitadas tras compras atendidas, sin incentivos; responderlas con información útil.
- Menciones legítimas: fabricantes de mallas, proveedores asociados, negocios de la zona. Se prohíben directorios comprados o enlaces masivos.

## 7 | Fechas y compromisos del calendario

Cadencia sostenible para este equipo: **1 guía nueva cada 1–2 semanas** (no diaria). Razón: la guía debe revisarse con datos del catálogo y fotos; publicar contenido delgado dañaría la credibilidad del blog.

| Período | Compromiso | Cierre |
| --- | --- | --- |
| Semanas 1–2 | Verificar Search Console + sitemap; verificar 16 URLs en vivo | Propiedad verificada; blog indexado o en cola |
| Semanas 3–4 | Guías de antimaleza (cálculo de rollos) y antihelada (manto 17 g, estacional) | Dos familias sin guía cubiertas |
| Semanas 5–8 | Ajustar títulos/descripciones con consultas reales observadas | Cambios justificados por datos, no por suposiciones |
| Semanas 9–12 | Ficha de Google Business Profile + reseñas operativas | NAP coherente y ficha publicada |
| Trimestre | Comparar 28 días vs previos; fortalecer familias con oportunidades reales | Informe con consultas, páginas y cotizaciones atendidas |

## 8 | Guardarraíles (no negociables)

- Datos: no publicar stock, costos de flete ni disponibilidad sin confirmar por WhatsApp/correo; el precio neto y el IVA del catálogo son los únicos importes.
- Exageraciones: prohibidas promesas absolutas de protección («elimina», «100 % eficaz»); la efectividad depende de instalación y manejo.
- Legal y privacidad: completar representante legal y condiciones operativas reales; revisar las políticas antes del 1 de diciembre de 2026 (Ley 21.719).
- Rastreo: sin seguimiento de visitantes ni fuentes de terceros sin consentimiento previo configurado.
- Estructura: mantener títulos y descripciones únicos por página (tests lo exigen) y una sola URL por intención de búsqueda.

## 9 | Qué logró el 26 de octubre y qué falta

- Logrado: 16 URLs prerrenderizadas y en sitemap; blog con enlazado cruzado home ↔ categorías ↔ guías; marcado Blog/BlogPosting/BreadcrumbList; proceso documentado para agregar guías sin tocar la infraestructura.
- Falta (dependencias externas): verificación de Search Console, ficha local, fichas de producto con fotos del negocio, medición de rendimiento real (PageSpeed/CrUX), primera exportación de datos de Search Console.
- La indexación de las nuevas URLs depende de Google; el trabajo técnico solo la habilita.
