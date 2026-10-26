# Informe SEO RUVER — iteración blog
Fecha: 26 de octubre de 2026

## Informe SEO del trabajo realizado y estado del blog

RUVER

ruver-agricolas.com | Chile | 26 de octubre de 2026

INSUAGRI RUVER SpA. Insumos agrícolas: mallas, bandejas almacigueras y cintas de riego. Base comercial: Quillota, Región de Valparaíso.

### Resumen ejecutivo

Entre el 20 y el 23 de octubre de 2026 el sitio pasó de una portada de JavaScript a un conjunto de 11 direcciones prerrenderizadas con títulos, descripciones y canonical propios; datos estructurados de Store y WebSite; robots.txt y sitemap.xml reales; páginas 404 diferenciadas; y textos legales revisados. Ese trabajo está en producción y se verificó por HTTP el 23 de octubre.

Hoy, 26 de octubre, se sumó una capa de contenido escalable: un blog de guías con 6 direcciones nuevas (índice + 5 guías), prerrenderizadas en la compilación, incluidas en el sitemap (17 URLs en total), con marcado Blog/BlogPosting/BreadcrumbList y enlazado cruzado con la portada y las categorías. Segunda entrega del mismo día: la guía «Malla antimaleza: cómo calcular los rollos para tu superficie» (19 variantes del catálogo; anchos de 0,70 a 4 metros), publicada y verificada en vivo tras el último build.

### Decisión de estrategia

Las categorías resuelven búsquedas de compra y el blog resuelve búsquedas de información («qué porcentaje de sombra», «40 u 50 mesh», «cuántas celdas», «6 mil»). Cada guía termina en una cotización de su categoría. Esta separación evita canibalización: una intención, una URL.

| Iteración 23-oct | Iteración 26-oct (blog) | Total |
| --- | --- | --- |
| 11 URLs: portada + 6 categorías + 4 legales | +6 URLs: /blog + 5 guías | 17 URLs en sitemap |

### Estado de la entrega del blog

- `src/blog.js`: datos del índice y de cada guía (ruta, título, bajada, fecha, categoría, secciones).
- `src/Blog.jsx`: índice, plantilla de guía y bloques de enlaces internos.
- `scripts/prerender.mjs`: genera cada `/blog/<slug>` como HTML propio con título, canonical, Open Graph y JSON-LD; actualiza sitemap y robots automáticamente.
- Tests que impiden publicar contenido roto: `tests/blog.test.js` (integridad de datos) y `tests/prerender.test.mjs` (17 páginas con H1 y título únicos, sitemap completo, 404 correcto).
- Enlazado: la portada muestra el índice de guías; cada categoría enlaza las guías; cada guía enlaza su categoría, las demás guías, envíos y el pedido de la web; el pie de página enlaza el blog en todas las páginas.

### Alcance y límites

Auditoría de código, compilación y respuestas HTTP del dominio; revisión de navegador. Sin acceso a Search Console ni analítica: no hay volúmenes de búsqueda, posiciones, clics ni puntuaciones de Lighthouse declaradas; las expresiones de consulta propuestas son hipótesis de trabajo. Publicar páginas no garantiza indexación ni posiciones.

## 01 | Verificación técnica HTTP (26 de octubre)

Verificación final medida por HTTPS sobre el dominio real a las 11:4x del 26 de octubre (tras el rebuild definitivo, que incluyó la guía de antimaleza), con `Cache-Control: no-cache`:

| Comprobación | Resultado |
| --- | --- |
| `/blog` (índice) | 200, HTML prerrenderizado con H1 propio («Guías para elegir insumos agrícolas») |
| `/blog/raschel-porcentaje-de-sombra` | 200 con H1, título y canonical propios |
| `/blog/antiafido-40-o-50-mesh` | 200 con H1, título y canonical propios |
| `/blog/bandejas-almacigueras-celdas` | 200 con H1, título y canonical propios |
| `/blog/cinta-de-riego-6-mil` | 200 con H1, título y canonical propios |
| `/blog/malla-antimaleza-rollos` (segunda entrega del 26-oct) | 200 con H1, título y canonical propios (`charset=utf-8` y tildes verificadas byte a byte) |
| Categorías (6) | 200 con H1 propio |
| Páginas legales (4) | 200 |
| `sitemap.xml` | 200, XML con 17 URLs (`<loc>` medidos por expresión regular sobre la línea única del XML; `grep -c` cuenta líneas completas y no sirve para contarlas) |
| `robots.txt` | 200, texto plano, enlaza el sitemap |
| Ruta inexistente | 404 con página propia (`noindex, follow`) |
| Puerto interno 8088 | Coincide con el servi­do por el dominio (Caddy → 8088) |
| Fonts | Solo se cargan tras aceptar cookies; el HTML prerrenderizado no depende de Google Fonts |

### Criterio de verificación

Cada URL nueva responde 200, tiene un H1, título y canonical propios, y su contenido existe en el HTML sin ejecutar JavaScript. El sitemap es XML; una dirección inventada devuelve 404. Los tests de compilación exigen estas mismas condiciones dentro del contenedor antes de publicar: si fallan, la versión anterior sigue en producción.

### Incidente operacional del despliegue (causa raíz y solución definitiva)

- Síntoma: el código con el blog estaba en `origin/main` horas antes, pero el dominio seguía sirviendo la imagen del 23-oct (sitemap de 11 URLs y `/blog` en 404).
- Causa 1: el botón «Implementar» del Docker Manager solo ejecuta `docker compose up` (su registro mostró «Pulling project images / ruver Skipped / No image to be pulled»): re-creó el contenedor con la imagen antigua, sin compilar. Seis intentos entre 10:25 y 10:59 lo confirmaron («Listo» en Últimas acciones sin build).
- Causa 2: fijar el commit exacto en el contexto (`git#2950903` corto) no funcionó: el fetch de BuildKit de este Docker no resuelve SHA cortos y el build falla en segundos con «repository does not contain ref» (mensaje visible solo en el log del build, no en el panel).
- Solución definitiva ejecutada en la consola del VPS (root): restaurar `#main` en el contexto del compose del proyecto y ejecutar `docker compose -f /docker/ruver/docker-compose.yml build ruver` (EXIT 0) y `docker compose -f /docker/ruver/docker-compose.yml up -d ruver`; luego el recreate final del panel aplicó la imagen nueva. Heredado del procedimiento del 23-oct.
- Flujo de publicación verificado del 26-oct: push a `main` → build por consola/VPS (`docker compose build` + `up -d`) → verificar `sitemap.xml` (17 `<loc>`) y las 6 direcciones del blog (200 con H1 prerrenderizado).
- Para próximas guías: repetir exactamente ese flujo; no confiar en «Implementar» solo, y no fijar SHA cortos en el `context`.

## 02 | SEO del blog: metadatos y marcado

- Cada guía tiene título y descripción propios y únicos (los tests los verifican): no hay dos URLs del sitio con el mismo title.
- JSON-LD por página: en el índice, tipo `Blog`; en cada guía, `BlogPosting` con fecha de publicación, autor y editor (la empresa), así como `BreadcrumbList` Inicio → Blog → Guía.
- El índice del blog usa un título distinto al de la portada comercial para no competir entre sí («Blog RUVER | Guías de mallas, bandejas y riego»).
- Sin reseñas, valoraciones ni disponibilidad inventadas; sin schema de Product/Offer hasta tener fichas verificadas por producto.
- Fecha de publicación: 2026-10-26; se mantendrá `dateModified` al actualizar guías.

## 03 | Contenido publicado (5 guías)

| Guía | Categoría vinculada | Consultas objetivo (propuestas) |
| --- | --- | --- |
| Malla raschel: qué significa cada porcentaje de sombra | /malla-raschel | porcentaje de sombra raschel; raschel 65 %; sombreadero |
| Malla antiáfido: ¿40 mesh o 50 mesh? | /malla-antiafido | malla antiáfido 40 mesh; 50 mesh; poros |
| Bandejas almacigueras: cuál elegir según el cultivo | /bandejas-almacigueras | bandeja 128 celdas; caja de 100 bandejas |
| Cinta de riego por goteo: qué revisar antes de comparar | /cintas-de-riego | cinta de riego 6 mil; goteros 10 15 20 cm |
| Malla antimaleza: cómo calcular los rollos para tu superficie | /malla-antimaleza | manta antimaleza por metro; tela antihierba rollo; malla antimaleza 2 x 100 |

Reglas aplicadas en la redacción: datos del catálogo (medidas, porcentajes, gramajes, caudales), sin precios prometidos sin confirmar, sin stock ni plazos garantizados; cada guía cierra con qué enviar por WhatsApp para cotizar (producto, medida, cantidad, comuna).

Familia aún sin guía: malla antihelada (estacional, manto térmico 17 g; mejor publicar entre marzo y abril, antes del otoño austral). La guía de antimaleza se publicó el 26-oct. Véase la estrategia escalable adjunta.

## 04 | Enlazado interno

- Portada → índice de guías (sección «Guías del blog RUVER»).
- Índice de guías → cada guía y las seis categorías.
- Cada guía → su categoría (encabezado y CTA de cotización), las otras guías, envíos y pedido de la web.
- Cada categoría → todas las guías del blog.
- Pie de página global → «Blog de guías».

Efecto esperado (a validar con Search Console): el rastreo descubre las 17 URLs por enlaces internos sin depender solo del sitemap, y el flujo guía → categoría concentra autoridad en las URLs de compra.

## 05 | Privacidad y confianza sin cambios

- Sin rastreadores ni analítica de terceros: solo `localStorage` (carrito y consentimiento).
- Google Fonts se carga únicamente tras aceptar; el banner de cookies permite rechazar y revocar («Ajustes de cookies»).
- Las políticas legales publicadas el 23-oct siguen vigentes: identidad INSUAGRI RUVER SpA · RUT 77.872.414-6; garantía de seis meses; retracto de 10 días con reglas de devolución; sin datos bancarios publicados.
- Pendiente del negocio: nombre del representante legal y condiciones operativas confirmadas (despachos y devoluciones reales).
- Recordatorio regulatorio: Ley N.° 21.719 (protección de datos) entra en vigor el 1 de diciembre de 2026; revisar políticas y procedimientos antes de esa fecha.

## 06 | Qué sigue (resumen de la estrategia adjunta)

1. Verificar propiedad en Search Console y enviar el sitemap (17 URLs).
2. Publicar la guía de antihelada (manto térmico 17 g) entre marzo y abril austral; la de antimaleza (cálculo de rollos) se publicó el 26-oct.
3. Gestionar la ficha de Google Business Profile con NAP coherente y reseñas reales.
4. Medir cada 28 días con Search Console: impresiones, clics, consultas marca/no marca; nada de métricas suspensivas.
5. Mantener el procedimiento documentado para agregar guías sin tocar infraestructura.

## 07 | Medición

Mismas líneas del informe del 23-oct (Search Console, cotizaciones registradas por WhatsApp/correo, Core Web Vitals cuando haya datos de campo). Línea base: no existen mediciones previas; la primera exportación de 28 días será el punto de comparación «antes y después» del blog.
