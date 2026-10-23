# Informe SEO RUVER
Fecha: 23 de octubre de 2026

## Informe SEO y plan de crecimiento

RUVER

ruver-agricolas.com | Chile | 23 de octubre de 2026

INSUAGRI RUVER SpA. Insumos agrícolas, mallas, bandejas almacigueras y cintas de riego. Base comercial: Quillota, Región de Valparaíso.

### Diagnóstico ejecutivo

La prioridad es que cada dirección entregue el contenido correcto y que los productos tengan páginas propias. En la versión pública inicial, robots.txt, sitemap.xml, los documentos legales y una URL inexistente devolvían la misma portada con HTTP 200. Esto dificulta el rastreo y genera respuestas engañosas para buscadores y usuarios.

### Decisión de estrategia

Construir visibilidad por familias de producto y búsquedas concretas de medida, presentación y uso. Reforzar la confianza local de RUVER en Quillota y convertir visitas en cotizaciones atendidas por WhatsApp o correo. Mantener el diseño y los precios base del catálogo.

| 71 variantes | 6 familias | 11 páginas |
| --- | --- | --- |
| Catálogo existente | Páginas comerciales específicas | Inicio + 6 categorías + 4 legales |

### Estado de la entrega

Publicación verificada por HTTP en el dominio y revisión de navegador.

Se han implementado páginas de catálogo, contenido inicial por familia, HTML generado en compilación, títulos y canonical por URL, datos estructurados, sitemap, robots, página 404 y textos legales revisados. Las acciones comerciales, de medición y de contenidos futuros siguen en el plan.

### Alcance y límites

Auditoría de código y respuestas HTTP, revisión de navegador y muestra cualitativa de resultados públicos. Sin acceso a Search Console, analítica ni CRM. No se presentan volúmenes de búsqueda, posiciones, tráfico, ingresos o puntuaciones Lighthouse inventados. Publicar páginas no garantiza indexación ni posiciones.

## 01 | Auditoría técnica: antes y después

Evidencia inicial: siete solicitudes HTTPS realizadas el 23/10/2026. La portada, tres páginas legales, robots.txt, sitemap.xml y una ruta inexistente respondieron con el mismo HTML de 856 bytes. El documento original dependía de JavaScript para mostrar el contenido.

| Hallazgo inicial | Impacto | Corrección implementada |
| --- | --- | --- |
| robots.txt devuelve HTML 200 | No hay un archivo robots válido | Texto de rastreo que permite los recursos y enlaza el sitemap. |
| sitemap.xml devuelve HTML 200 | No enumera URLs para descubrimiento | XML con las 11 páginas reales. |
| URL inexistente devuelve portada 200 | Posibles soft 404 y direcciones sin contenido propio | Nginx responde 404 y muestra una página de error. |
| Sin canonical en HTML público inicial | Señal preferida de URL ausente | Canonical absoluto por página, dominio HTTPS raíz. |
| Sin H1 en HTML antes de ejecutar JS | Contenido dependiente del renderizado | HTML de cada ruta generado en compilación; React activa interacciones. |
| Sin páginas comerciales por familia | Todas las consultas apuntan a una portada | Seis categorías enlazadas desde inicio y entre sí. |
| Textos legales del código no desplegados | Falta de información visible y textos incorrectos | Cuatro páginas legales/comerciales revisadas. |

### Criterio de verificación

Cada página conocida debe devolver 200, tener un H1, título y canonical propios y conservar su contenido sin ejecutar JavaScript. El sitemap debe ser XML, robots texto y una dirección inventada debe devolver 404. HTTPS y www deben conducir al dominio preferido.

Google puede renderizar JavaScript: la ausencia de texto en la respuesta inicial no prueba por sí sola que una página sea imposible de indexar. La generación de HTML reduce esa dependencia. Referencias: [1], [2] y [3].

## 02 | Palabras clave y páginas objetivo

Priorización cualitativa por ajuste al catálogo y cercanía a una cotización. Las expresiones siguientes son propuestas de trabajo, no volúmenes ni posiciones medidos. Validar demanda y consultas reales con Search Console tras la publicación.

| Página objetivo | Consultas y variantes propuestas | Prioridad |
| --- | --- | --- |
| / | insumos agrícolas Quillota; insumos agrícolas RUVER; mallas agrícolas Chile | Alta: marca y localidad |
| /malla-antiafido | malla antiáfido 40 mesh; malla antiáfido 50 mesh; malla antiáfido 4 x 100 precio | Alta: compra específica |
| /malla-raschel | malla raschel precio; raschel 65 %; raschel 80 % 4,20 x 100 | Alta: catálogo amplio |
| /malla-antimaleza | malla antimaleza rollo; malla antimaleza 2 x 100; precio con IVA | Alta: formato y costo |
| /malla-antihelada | malla antihelada; manta antihelada 17 g; manto térmico agrícola | Media: validar estacionalidad |
| /bandejas-almacigueras | bandejas almacigueras 128 celdas; bandeja 200 celdas; caja de 100 bandejas | Alta: presentación clara |
| /cintas-de-riego | cinta de riego 6 mil; cinta goteo 2500 metros; goteros 10 15 20 cm | Alta: especificación |

### Intención de búsqueda

Comprar/cotizar: medida, porcentaje de sombra, mesh, número de celdas, rollo y precio. Deben resolver formato, IVA, disponibilidad y cómo pedir. Informarse: selección, cálculo e instalación; se atiende con guías útiles enlazadas a la categoría correspondiente.

### Evitar competencia entre páginas propias

Cada familia tiene una URL principal. No crear páginas casi idénticas por cada comuna ni por pequeñas variaciones de palabras. Las futuras fichas de producto necesitan información propia y suficiente; 71 variantes no justifican automáticamente 71 páginas.

## 03 | Contenido, arquitectura y conversión

### Arquitectura implementada

La portada presenta el catálogo completo y enlaza las seis categorías. Cada categoría incluye introducción propia, tabla de formatos con neto y total con IVA, orientación de compra, preguntas frecuentes, enlace de cotización y acceso a envíos y condiciones.

El pie de todas las páginas ofrece términos, privacidad, cookies y envíos/devoluciones. La razón social, RUT, teléfono, correo y dirección comercial son coherentes. La dirección fue confirmada por el titular del proyecto.

### Metadatos y marcado

Título de inicio: Insumos agrícolas en Quillota | Mallas y riego RUVER. Las categorías tienen títulos y descripciones diferenciados. Se generan Open Graph y tarjetas sociales con la URL correspondiente. El marcado incluye Store, WebSite, WebPage/CollectionPage y BreadcrumbList en categorías.

No se han inventado reseñas, valoraciones, disponibilidad, marcas o credenciales. No se promete un resultado enriquecido por añadir schema. Antes de ampliar a Product/Offer, confirmar ficha, precio final, stock y políticas aplicables por producto. Validar con Rich Results Test y Search Console [4].

### Mejoras comerciales

- El formulario explica que prepara un mensaje y que el envío se confirma en WhatsApp o correo; enlaza a privacidad.

- Se distingue el precio neto del total con IVA y se indica que el flete se confirma aparte. Las categorías mantienen los mismos precios base.

- Se reemplaza la promesa general de entrega inmediata por disponibilidad a confirmar. El plazo y flete se acuerdan antes del pago.

- El pago sigue siendo externo y de comprobación manual: un clic en Webpay o un mensaje no acredita una venta.

### Contenido que debe aportar el negocio

Fichas verificadas de fabricantes, fotografías de producto y uso autorizadas, stock, marcas, garantías adicionales y condiciones operativas. Contrastar especialmente afirmaciones absolutas de protección frente a plagas o heladas y resistencia UV de cada referencia antes de ampliarlas.

## 04 | Competencia y presencia local

Muestra cualitativa consultada el 23/10/2026. Los ejemplos muestran prácticas de contenido, sin establecer un ranking de competidores ni comparar precios entre presentaciones distintas.

| Referencia observada | Qué aporta su página | Aplicación para RUVER |
| --- | --- | --- |
| Gomatex: antiáfido 40 mesh [7] | Nombre técnico, dimensiones y detalle de la variante | Ampliar fichas confirmadas por producto y separar 40 de 50 mesh. |
| Copeval: antiáfidos 40 mesh [8] | Especificaciones del rollo y opciones comerciales | Aclarar presentación y condiciones de entrega antes de pagar. |
| Protekta: raschel 65 % [9] | Porcentaje, ancho y largo en una página de producto | Responder consultas de formato y usar Quillota cuando sea relevante. |

### Posicionamiento recomendado

RUVER puede competir con claridad de catálogo, atención cercana desde Quillota y cotizaciones por medida y volumen. No conviene prometer ser el más barato ni tener stock inmediato sin evidencia. La oportunidad comercial es reducir dudas antes de iniciar la conversación.

### Plan de SEO local

- Comprobar si existe una ficha de Google Business Profile y reclamarla o crearla si corresponde, evitando duplicados. Esta tarea no se ha realizado.

- Confirmar si se atiende público en la dirección y con qué horario. Publicar dirección o área de servicio según la operación real y las reglas de Google.

- Mantener nombre, dirección y teléfono consistentes en web, ficha y directorios pertinentes. Usar fotos propias del negocio y productos.

- Solicitar reseñas reales tras compras atendidas, sin incentivos ni reseñas ficticias; responder con información útil.

- Buscar menciones legítimas de proveedores, asociaciones y negocios locales. Evitar compra masiva de enlaces y directorios sin relación.

### Criterio geográfico

Quillota y Región de Valparaíso describen la base comercial confirmada; Chile corresponde a la cobertura anunciada, sujeta a transporte y destino. No se atribuyen sucursales ni puntos de retiro adicionales.

## 05 | Privacidad, cookies y confianza

### Identificación incorporada

INSUAGRI RUVER SpA · RUT 77.872.414-6. Domicilio confirmado: Av. San Isidro 21H, Quillota, Región de Valparaíso. Se usaron únicamente los datos de la empresa necesarios para identificarla. La captura bancaria adjunta no se incorpora al sitio ni al informe.

### Correcciones de los textos anteriores

- Garantía legal: se corrige la referencia de 90 días a seis meses para productos nuevos en los supuestos legales, con las opciones correspondientes [10].

- Retracto: se informa el plazo general de 10 días, extensión por falta de confirmación escrita y excepciones legales; se elimina una cita de ley incorrecta y condiciones que limitaban indebidamente los derechos.

- Privacidad: se distinguen los campos preparados en el navegador, los datos de la conversación y los registros técnicos del alojamiento. No se afirma que ningún servidor trate datos.

- Cookies: se documentan ruver-order-v1 y ruver-consent-v1. Vaciar el carrito no equivale a borrar toda la clave. Las fuentes de Google se cargan tras aceptar y sus enlaces se retiran al reiniciar la preferencia.

- No se añaden herramientas de analítica o publicidad. WhatsApp, correo, alojamiento y pago externo se explican según el flujo actual.

### Pendientes de validación del negocio

Representante legal: falta su nombre confirmado; no puede deducirse de la persona que aparece en un comprobante bancario. Debe completarse la identificación exigible del proveedor. Operación: documentar cobertura, plazos de preparación/entrega y procedimiento real de devoluciones. Datos: acordar períodos internos de conservación, acceso a buzones y tratamiento por proveedores.

### Fecha regulatoria que requiere revisión

La Ley N.º 21.719 entra en vigor el 1 de diciembre de 2026. Antes de esa fecha, revisar políticas y procedimientos reales de protección de datos; publicar una política no basta para acreditar cumplimiento operativo [11], [12]. Los textos se basan en la normativa consultada y requieren completar los datos pendientes.

## 06 | Hoja de ruta de 90 días

Día 0 = publicación de esta versión. Responsables propuestos: Web/SEO para técnica y contenidos; RUVER para datos, producto, atención y validación comercial. Son objetivos de ejecución, no promesas de posicionamiento.

| Período | Acción y responsable | Criterio de cierre |
| --- | --- | --- |
| Días 0-7 | Web: publicar y verificar 11 URLs, 404, robots, sitemap, canonical y redirecciones. RUVER: representante legal y condiciones reales. | Rastreo sin rutas inventadas; datos legales pendientes identificados y completados cuando se faciliten. |
| Días 8-14 | Web + titular: verificar propiedad en Search Console; enviar sitemap; inspeccionar inicio y dos categorías. | Propiedad verificada y sitemap aceptado. La indexación depende de Google. |
| Días 15-30 | RUVER: aportar fichas e imágenes. Web: mejorar las seis categorías y medir rendimiento móvil. Titular: gestionar ficha local. | Ficha coherente por familia y línea base de consultas/clics; sin afirmar tráfico previo. |
| Días 31-45 | Publicar guías: elección de raschel y diferencia antiáfido 40/50 mesh. Revisión técnica del negocio. | Dos guías originales, enlazadas a categorías, con fotos o esquemas pertinentes. |
| Días 46-60 | Publicar cálculo de rollos antimaleza y elección de bandejas por celdas. Revisar URLs con impresiones. | Dos guías y ajustes de título/contenido sustentados en consultas reales. |
| Días 61-75 | Publicar preparación ante heladas y elección de cinta de riego. Plan de menciones y reseñas legítimas. | Dos guías revisadas; ficha local y datos consistentes. |
| Días 76-90 | Comparar 28 días frente a los 28 anteriores; priorizar categorías que generan oportunidades reales. | Informe con consultas, páginas, leads atendidos y próximos cambios; separar marca/no marca. |

### Orden de inversión

Primero acceso técnico e información de compra; después fichas y medición; luego guías y reputación local. Con un dominio reciente, un calendario editorial no sustituye a la indexación ni garantiza resultados a 90 días.

## 07 | Medición y rendimiento

| Indicador | Fuente / definición | Frecuencia |
| --- | --- | --- |
| Descubrimiento e indexación | Search Console: páginas indexadas, excluidas y motivo; inspección de URLs principales. | Semanal al inicio |
| Demanda y visibilidad | Impresiones y clics por consulta/página, país Chile y dispositivo. Separar marca y no marca. | Cada 28 días |
| CTR y posición | CTR = clics / impresiones; posición media orientativa por consulta. Comparar períodos equivalentes. | Cada 28 días |
| Cotizaciones calificadas | Registro interno de conversaciones con producto, cantidad y destino; deduplicar por solicitud. | Semanal |
| Ventas confirmadas | Pedidos aceptados y pagos verificados por RUVER. No equiparar clic en WhatsApp/Webpay con compra. | Mensual |
| Core Web Vitals | Datos de campo, percentil 75: LCP <= 2,5 s; INP <= 200 ms; CLS <= 0,1 [5]. | Mensual si hay datos |

### Configuración recomendada

Search Console es el primer paso y no requiere insertar un rastreador de visitantes. Verificar la propiedad con el titular y enviar /sitemap.xml. No se ha accedido a una cuenta privada ni se declara la propiedad configurada. Exportar 28 días para establecer la primera línea base disponible.

Si se incorpora analítica de eventos, revisar antes privacidad, proveedores y preferencias. Eventos propuestos: abrir cotización, añadir al pedido y abrir pago; son acciones intermedias. No enviar nombre, correo, teléfono o detalle del mensaje a herramientas de analítica.

### Rendimiento: evidencia y trabajo pendiente

La compilación de producción genera aproximadamente 294 kB de JavaScript (88 kB comprimidos) y 22 kB de CSS (5 kB comprimidos). Las seis imágenes originales suman unos 374 kB. Son tamaños de archivos, no mediciones de experiencia real.

No se ha obtenido una medición Lighthouse ni un informe CrUX para esta entrega. Medir móvil y escritorio con PageSpeed Insights tras desplegar; puede faltar información de campo en dominios recientes [6]. Revisar prioridad de imágenes visibles, dimensiones explícitas y posible carga de código por ruta si los resultados lo justifican.

### Objetivos verificables

Técnica: 11 páginas accesibles y sitemap válido. Comercial: establecer línea base durante el primer mes. Rendimiento: usar los umbrales de campo anteriores como metas. Fijar objetivos de leads e ingresos cuando existan datos y márgenes, sin inventar porcentajes de crecimiento.

## 08 | Fuentes, evidencia y próximos datos

Fuentes consultadas el 23/10/2026. Las referencias técnicas y normativas apoyan los criterios; la muestra de competidores solo apoya observaciones de contenido.

[1] Google: SEO para JavaScript
[developers.google.com - JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

[2] Google: canonical y consolidación
[developers.google.com - Consolidate duplicate URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

[3] Google: sitemaps
[developers.google.com - Sitemaps overview](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)

[4] Google: datos estructurados LocalBusiness
[developers.google.com - Local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)

[5] Google: Core Web Vitals
[support.google.com - Informe de Core Web Vitals](https://support.google.com/webmasters/answer/9205520?hl=es)

[6] Google: PageSpeed Insights y datos de campo
[developers.google.com - About PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/about)

[7] Gomatex: ficha antiáfido
[gomatex.cl - Antiáfido 40 mesh 4 x 100](https://www.gomatex.cl/product/malla-antiafido-40-mesh-110g-4x100-metros)

[8] Copeval: ficha antiáfidos
[copeval.cl - Antiáfidos 40 mesh](https://copeval.cl/malla-antiafidos-40-mesh-16/10-4-m-x-100-m/)

[9] Protekta: ficha raschel
[protekta.cl - Raschel 65 % 2,10 m](https://www.protekta.cl/producto/ver/malla-raschel-65-verde-blanca-ancho-210m-rollo-100m)

[10] SERNAC: comercio electrónico y derechos
[sernac.gov.cl - Comercio electrónico](https://www.sernac.gov.cl/portal/604/w3-propertyvalue-20982.html)

[11] BCN: Ley N.º 19.628
[bcn.cl - Protección de la vida privada](https://www.bcn.cl/leychile/Navegar?dt=open&idLey=19628)

[12] ANCI: vigencia de la Ley N.º 21.719
[anci.gob.cl - Leyes](https://anci.gob.cl/normativa/leyes/)

### Evidencia propia y límites

Se conservaron el resultado inicial HTTP en tmp/seo/baseline.json y las comprobaciones de la versión final cuando se verificó la publicación. Código: src/, scripts/prerender.mjs, nginx.conf y pruebas en tests/. La inspección pública no equivale a datos internos de Google.
