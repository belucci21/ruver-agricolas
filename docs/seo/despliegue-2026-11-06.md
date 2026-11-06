# SEO RUVER: rejas, cercos y usos del tejido

Fecha: 6 de noviembre de 2026. Estado: publicado en https://ruver-agricolas.com/ y verificado.

El usuario confirmó que «reja» se refiere a los mismos productos agrícolas del catálogo. Se incorpora la intención de cubrir una reja con raschel, conservando los nombres técnicos, las 71 variantes y las URLs existentes. No se añade una oferta de cerramientos metálicos. La sustitución literal de todos los nombres de producto confundiría tejidos y usos distintos.

## Matriz de palabras clave

| Grupo propuesto | Página de destino | Intención y enlace comercial |
| --- | --- | --- |
| raschel para rejas; cubrir reja; raschel para cercos | /blog/raschel-para-rejas-y-cercos | Elegir cobertura de un cerramiento existente; enlace a /malla-raschel. |
| raschel cortaviento; cortaviento agrícola | /blog/raschel-cortaviento-cultivos | Revisar ficha y condiciones del proyecto; enlace a /malla-raschel. |
| ground cover; tela para malezas | /blog/ground-cover-malla-antimaleza | Comparar propiedades y medidas; enlace a /malla-antimaleza. |
| raschel para rejas; medidas; precios | /malla-raschel | Categoría comercial existente, con título y descripción actualizados. |
| malla antimaleza; ground cover | /malla-antimaleza | Categoría existente, con título y contenido de apoyo actualizados. |

Son hipótesis de intención, no estimaciones de volumen ni posiciones medidas. La revisión pública cualitativa del 06/11/2026 encontró usos de raschel sobre rejas y cercos; no demuestra que «reja» sustituya de forma general a «malla» en Chile. Referencias de vocabulario: [SAG, criterios de manejo de fauna](https://www.sag.gob.cl/sites/default/files/criterios_tec_mantencion_fauna_silv_cautiverio.pdf), [FIA, captación de aguas lluvias y maqui](https://opia.fia.cl/601/articles-116102_archivo_01.pdf). Son ejemplos de uso y no fichas de producto RUVER.

## Contenido y enlaces

Tres guías nuevas, publicadas editorialmente el 06/11/2026. El blog pasa de 8 a 11 artículos y el sitemap de 20 a 23 URLs. Se conserva la fecha editorial de las ocho guías anteriores. Las categorías modificadas llevan lastmod 06/11. El índice se ordena por fecha de publicación, mostrando primero los nuevos contenidos; las recomendaciones por familia también dan acceso a la nueva ronda.

Las categorías de raschel y antimaleza añaden secciones de usos con enlaces directos a las guías. Estas enlazan de vuelta al catálogo, hacia guías existentes y entre temas pertinentes. No se crean páginas duplicadas por cada variación de una palabra. Se conserva HTML prerrenderizado, canonical propio, BlogPosting y sitemap automático.

## Validación local

18 pruebas de lógica y contenido y 3 de HTML/sitemap correctas. Compilación con 23 páginas y 404. Navegador: metadatos e hidratación de la guía de rejas correctos, sin errores de consola observados; categoría raschel conserva sus 20 filas de producto y muestra los nuevos enlaces. Catálogo y precios sin modificaciones.

## Activación y comprobación pública

Commit de aplicación: `6e1bb3a`, integrado por avance directo en main y enviado a GitHub. Compose existente confirmado con GitHub `#main`. Se conservó la imagen anterior como `ruver-ruver:pre-seo-20261106`. La reconstrucción explícita terminó correctamente en unos 22 segundos; `up -d ruver` inició el contenedor con la nueva imagen.

Verificación pública: 23 URLs HTTP 200, H1 único, títulos distintos, canonical propio y JSON-LD válido. Las tres guías nuevas tienen fecha de publicación y modificación 06/11/2026. No se encontraron destinos internos inexistentes en los enlaces de esas 23 páginas; las tres guías reciben enlaces internos. Sitemap XML correcto, robots.txt en texto y ruta desconocida HTTP 404. Bundle público `/assets/index-BDlQxWYW.js` coincide con el build local.

En navegador se confirmaron H1 y títulos de las tres guías sin errores de consola observados. La portada conserva sus metadatos comerciales tras ejecutar React y el blog público muestra 11 artículos, con los nuevos primero. Evidencia local: `output/seo-release-2026-11-06/publicacion-verificada.json` y `blog-publicado.png`. No se han medido velocidad, indexación ni posiciones como parte de estas comprobaciones.

## Seguimiento

Enviar o comprobar sitemap e inspeccionar las tres URLs en Search Console del titular. Comparar consultas de cada grupo, impresiones, clics y cotizaciones en ventanas equivalentes de 28 días; si todavía no hay suficientes datos, ampliar el periodo. No se ha accedido a Search Console en esta entrega. No se han creado fichas en directorios.

Referencias de criterio SEO consultadas: [contenido útil de Google](https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=es), [enlaces rastreables](https://developers.google.com/search/docs/crawling-indexing/links-crawlable?hl=es). La publicación no garantiza indexación, primeras posiciones ni crecimiento exponencial.
