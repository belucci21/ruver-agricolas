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

El despliegue usa el código de `main` como contexto Git remoto. No necesita tokens ni secretos en el archivo Compose. Para actualizarlo después de cambiar el código, reconstruir el proyecto desde Docker Manager. El dominio y HTTPS se configuran en el proxy del VPS; el despliegue del contenedor no crea un dominio ni un certificado automáticamente.

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
- `src/catalog.json`: variantes y precios del catálogo.
- `src/Order.jsx`, `src/order.js`: carrito, totales y pagos externos.
- `src/QuoteForm.jsx`: formulario de cotización.
- `src/config.js`: canales comerciales y Webpay.
- `public/images/`: seis imágenes originales, extraídas y sin duplicados.
- `tests/order.test.js`: cálculos y entradas inválidas.

El HTML original de Downloads no se modifica.
