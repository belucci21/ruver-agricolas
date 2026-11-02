# Entrega SEO - 2 de noviembre de 2026

Estado: publicada en Hostinger y verificada en el dominio el 2 de noviembre de 2026.
Rama: codex/seo-nuevos-temas-2026-11-02.

## Contenido de esta versión

Tres guías nuevas:

- /blog/como-elegir-manta-antihelada
- /blog/medir-malla-sombreadero
- /blog/cotizar-insumos-agricolas-despacho

El sitio pasa de 17 a 20 páginas y el blog de cinco a ocho artículos. El sitemap
incluye las rutas nuevas y fechas de actualización del contenido editorial.

Correcciones y mejoras:

- La portada mantiene su título y descripción comerciales al activar React.
- Se añade acceso al blog desde el menú principal de inicio.
- Se añaden enlaces contextuales de artículos a categorías y de categorías a su guía.
- Las categorías muestran guías de su familia y las recomendaciones de artículos
  comparten tema, con un máximo de tres, sin recomendarse a sí mismos.
- Fotografías del catálogo en las familias con imagen pertinente y schema coherente.
  Cinta de riego no usa una fotografía genérica de otra familia.
- Croquis SVG accesible y ejemplo de paños para un sombreadero, con supuestos
  declarados. No es un diseño de estructura ni una prescripción de instalación.
- Ajustes de redacción y límites de afirmaciones técnicas de antiáfido, bandejas y riego.

Los precios, canales de contacto y proceso de pagos permanecen como en el catálogo.
El contenido sobre despacho no inventa plazos, stock, retiro en local ni flete gratis.
La referencia INIA del artículo antihelada sirve de contexto; no certifica el producto RUVER.

## Verificación previa

- `pnpm test`: 18 pruebas satisfactorias de lógica, metadatos, blog y enlaces.
- `pnpm run build`: compilación correcta y tres pruebas del HTML, schema y sitemap.
- 20 páginas con un H1, canonical y título propios en el HTML.
- Prueba en navegador de metadatos tras ejecutar React, rutas nuevas y vista móvil.
- Sin errores de React en la revisión y sin desbordamiento horizontal observado en
  la guía de cotización a 390 x 844.
- `git diff --check`: sin errores de formato.

## Activación en Hostinger

El paquete de entrega incluye un Compose que referencia el SHA completo de esta
versión; evita usar una referencia corta. El proyecto existente es `ruver`.
No crear un segundo servicio con el mismo puerto 8088.

1. Conservar la imagen previa de la web para poder volver a ella.
2. Actualizar el contexto Git del Compose del proyecto ruver al SHA completo
   indicado en el paquete, o integrar la rama en main y comprobar el SHA resultante.
3. Reconstruir explícitamente: `docker compose -f /docker/ruver/docker-compose.yml build ruver`.
4. Solo tras una compilación correcta: `docker compose -f /docker/ruver/docker-compose.yml up -d ruver`.
5. Verificar inicio, tres guías nuevas, sitemap de 20 URLs, robots y una ruta 404.
6. En navegador, comprobar el título comercial de inicio tras ejecutar JavaScript.
7. Revisar imágenes, enlaces de categoría y cotización, menú móvil y carrito.

Reiniciar el contenedor o usar Implementar sin build no garantiza actualizar la imagen.
Estos pasos se ejecutaron en el VPS tras la petición expresa de publicación.

## Después de activar

Enviar el sitemap e inspeccionar las rutas nuevas desde Search Console del titular.
No se ha accedido a esa propiedad en esta entrega. La publicación de contenido
no garantiza indexación inmediata ni posiciones específicas.

Fuentes de criterio:

- https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- https://biblioteca.inia.cl/bitstreams/ed563cfd-f95b-4768-9384-1ca9e3a74c30/download


## Verificación de publicación

Versión de la aplicación: 1aef8e30af49fcd6fd1bce87eedfc119ce50cdbe, integrada en main.
Se conservó la imagen anterior como `ruver-ruver:pre-seo-20261102` antes de reconstruir.
Build del VPS satisfactorio; servicio ruver recreado con la nueva imagen.

- Las 20 URLs del sitemap devuelven 200, con un H1 y canonical propio.
- Las tres guías nuevas responden y muestran sus titulares en navegador.
- Sitemap XML de 20 URLs, robots en texto y dirección inexistente con 404.
- Bundle público `/assets/index-CbypHgze.js` coincide con la compilación validada.
- Título, descripción y canonical de inicio correctos después de ejecutar React.
- Consola sin errores en la revisión de inicio y de las tres guías nuevas.

Search Console y fichas de directorios no se modificaron en este despliegue.
