# Insumos Agrícolas RUVER

Web comercial adaptada del HTML original a React y Vite. Conserva marca, imágenes, catálogo y precios. Incluye navegación móvil, tablas desplegables, carrito persistente, IVA del 19 %, cotizaciones por WhatsApp/correo y enlaces a Webpay.

## Desarrollo

Node.js 22 o 24. Instalar con `npm ci`, iniciar con `npm run dev` y comprobar con `npm test` y `npm run build`. `npm run preview` permite revisar el resultado de producción.

## Publicar en Hostinger desde GitHub

### VPS con Docker Manager (pantalla «Componer → URL»)

Repositorio: https://github.com/belucci21/ruver-agricolas

URL del archivo que se pega en Hostinger:

```text
https://raw.githubusercontent.com/belucci21/ruver-agricolas/main/docker-compose.yml
```

Nombre del proyecto: `ruver`. El contenedor compila React y sirve la web con Nginx en el puerto **8088** del VPS. `RUVER_PORT` permite cambiarlo si ese puerto está ocupado. El contenedor funciona sin usuario root.

### Dominio ruver-agricolas.com y HTTPS

El dominio principal apunta por registro A a `187.126.5.248`; `www` es un CNAME hacia `ruver-agricolas.com`.

El proyecto Docker separado `ruver-domain` publica HTTPS con Caddy, certificados automáticos persistentes y redirección de HTTP a HTTPS. `www` redirige al dominio principal conservando la ruta. El proxy envía las solicitudes al puerto 8088 de la web y no accede al socket de Docker.

Archivo para desplegar el proxy desde Docker Manager:

```text
https://raw.githubusercontent.com/belucci21/ruver-agricolas/main/docker-compose.domain.yml
```

Requiere puertos 80 y 443 libres y DNS apuntando al VPS. Mantener los volúmenes `caddy_data` y `caddy_config` para conservar certificados y configuración. Si cambia el puerto de la web, actualizar también el destino del proxy en este archivo.

El despliegue usa el código de `main` como contexto Git remoto. No fijar SHA de commit cortos en el `context` del compose: BuildKit no los resuelve y el build falla en segundos. No necesita tokens ni secretos en el archivo Compose. Para actualizarlo después de cambiar el código hay que compilar la imagen de nuevo (build) y luego recrear el contenedor; el botón «Implementar» del Docker Manager solo re-crea el contenedor con la imagen existente. El dominio y HTTPS se configuran en el proxy del VPS; el despliegue del contenedor no crea un dominio ni un certificado automáticamente.

Guía oficial: https://www.hostinger.com/support/12040815-how-to-deploy-your-first-container-with-hostinger-docker-manager/

### Alojamiento administrado para aplicaciones web

Importar este repositorio en la opción de aplicaciones web de Hostinger y seleccionar:

| Ajuste | Valor |
| --- | --- |
| Framework | Vite / React |
| Rama | `main` |
| Directorio del proyecto | Raíz del repositorio |
| Node.js | 24 (o 22) |
| Instalación | `npm ci` |
| Compilación | `npm run build` |
| Directorio de salida | `dist` |
| Variables de entorno | Ninguna |

El proyecto genera una web estática y no necesita un servidor Node en ejecución. Si el plan dispone solo de alojamiento estático, subir el **contenido** generado en `dist` a `public_html`. No publicar `src`, `node_modules` ni el proyecto sin compilar en `public_html`.

Guía oficial: https://www.hostinger.com/support/how-to-deploy-apps-built-with-codex-on-hostinger/

## Funcionamiento y límites

- **Formulario:** valida nombre y detalle. Abre WhatsApp o la aplicación de correo con el mensaje preparado. El cliente confirma el envío allí. No se envían correos desde un servidor.
- **Carrito:** 71 variantes originales, cantidades enteras entre 1 y 9999, neto más IVA y flete pendiente. Se guarda localmente en el navegador, sin datos personales. La referencia sirve para identificar el mensaje; no representa una orden registrada en un servidor.
- **Webpay:** conserva el enlace comercial del archivo original, configurable en `src/config.js`. Abre la página externa y trata de copiar el monto. Si falla el portapapeles, muestra la cantidad para introducirla manualmente. El comercio revisa el comprobante; esta web no confirma ni verifica transacciones automáticamente.
- **Cotización personalizada:** requiere referencia y monto CLP positivo sin decimales. El PDF y el comprobante se adjuntan manualmente en WhatsApp/correo.
- **Precios:** conservados del archivo suministrado. Revisar disponibilidad, tarifas y enlace comercial con el negocio antes de cobrar pedidos reales.

## Archivos

- `src/App.jsx`: página y navegación.
- `src/Sections.jsx`: contenido comercial conservado.
- `src/blog.js` y `src/Blog.jsx`: índice y guías del blog.
- `scripts/prerender.mjs`: HTML estático, sitemap y robots por ruta.
- `src/catalog.json`: variantes y precios del catálogo.
- `src/Order.jsx`, `src/order.js`: carrito, totales y pagos externos.
- `src/QuoteForm.jsx`: formulario de cotización.
- `src/config.js`: canales comerciales y Webpay.
- `public/images/`: seis imágenes originales, extraídas y sin duplicados.
- `tests/order.test.js`: cálculos y entradas inválidas.

El HTML original de Downloads no se modifica.

## SEO y documentos legales (23 de octubre de 2026)

La compilación genera 17 páginas con contenido HTML, título, descripción,
canonical y datos estructurados propios: inicio, seis familias del catálogo, el
índice del blog y cinco guías de compra, además de los legales términos,
privacidad, cookies y envíos/devoluciones. Genera también robots.txt,
sitemap.xml y 404.html. Nginx sirve las rutas existentes y responde 404 para
las demás. No sustituir esta configuración por un fallback general a la portada.

Para verificar: `npm test` ejecuta las pruebas de lógica; `npm run build` compila,
genera las páginas y ejecuta dos comprobaciones del HTML y del sitemap. El blog
se compone en `src/blog.js` (datos) y `src/Blog.jsx` (vistas); `scripts/
prerender.mjs` incorpora índice y guías al HTML estático y al sitemap. Para
revisar los archivos estáticos localmente puede usarse `python -m http.server
4174 --directory dist`; el servidor de preview de Vite puede aplicar su fallback
SPA a rutas sin barra final y entregar la portada durante las pruebas.

Publicar una nueva guía del blog: 1) agregar el objeto con ruta, título, bajada,
fecha y categoría en `src/blog.js`; 2) actualizar el conteo de páginas en
`tests/prerender.test.mjs`; 3) empujar a `main`; 4) en el VPS, compilar la
imagen y recrear el servicio; 5) comprobar en el dominio que la guía responde
200 con H1 propio y que el sitemap incluye la nueva URL.

Después de publicar código hay que compilar la imagen (build), no basta
reiniciar el contenedor ni usar solo «Implementar» del Docker Manager (re-crea
la misma imagen). En el VPS actual: `docker compose -f
/docker/ruver/docker-compose.yml build ruver`, y tras una compilación correcta
`docker compose -f /docker/ruver/docker-compose.yml up -d ruver`. No fijar SHA
cortos en `context` del compose (el fetch de BuildKit no los resuelve).

El informe editable está en `docs/seo/informe-seo-ruver-2026-10-23.md`. Search
Console, el perfil de Google y la analítica requieren configuración adicional.
No se han añadido rastreadores. Falta confirmar el nombre del representante
legal y documentar los plazos operativos antes de ampliar las condiciones.
