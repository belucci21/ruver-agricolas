// Guías del blog. Cada entrada agrega /blog/<slug>, se prerrenderiza y entra al
// sitemap automáticamente (scripts/prerender.mjs). El contenido usa datos del
// catálogo de RUVER; no se publican precios prometidos ni disponibilidad.
export const BLOG_INDEX = {
  path: '/blog',
  label: 'Blog',
  title: 'Blog RUVER | Guías de mallas, bandejas y riego',
  description: 'Guías para elegir malla antiáfido, raschel, antimaleza, antihelada, bandejas almacigueras y cinta de riego, con los pasos de cotización del catálogo RUVER.',
};

export const BLOG_POSTS = [
  {
    path: '/blog/raschel-porcentaje-de-sombra',
    slug: 'raschel-porcentaje-de-sombra',
    title: 'Porcentajes de sombra de la malla raschel | Blog RUVER',
    headline: 'Malla raschel: qué significa cada porcentaje de sombra',
    description: 'Porcentajes de malla raschel de 35 a 90 %, anchos de 2,10 y 4,20 m y colores del catálogo RUVER. Qué confirme antes de cotizar según cultivo y exposición.',
    date: '2026-10-26',
    dateLabel: '26 de octubre de 2026',
    category: '/malla-raschel',
    sections: [
      { heading: 'Qué es la malla raschel', paragraphs: [
        'La malla raschel es una red tejida de polietileno de alta densidad. En el catálogo de RUVER se usa para sombreaderos, cortavientos, cierres, estacionamientos y secado de fruta.',
      ] },
      { heading: 'Porcentajes de sombra disponibles', paragraphs: [
        'El catálogo trabaja con sombras del 35 % al 90 %, en verde, negro, verde oscuro, blanco, beige, azul, gris y combinados azul y blanco o verde y blanco. Un porcentaje mayor bloquea más luz, pero la elección correcta depende del cultivo, la exposición y el objetivo del proyecto, no de un número máximo por principio.',
      ], list: [
        'Sombra media (35 a 50 %): reforzar luminosidad en viveros y manejos donde sigue siendo prioritario el paso de luz.',
        'Sombra alta (65 a 90 %): sombreaderos, cierres laterales y usos donde conviene reducir con fuerza la radiación directa.',
        'Cada uso se confirma con la ficha del formato elegido antes de pagar; no todo proyecto pide el porcentaje más alto.',
      ] },
      { heading: 'Medidas del catálogo', paragraphs: [
        'Los formatos combinan anchos de 2,10 m y 4,20 m con rollos de 50 y 100 metros. En la página de la categoría puedes compararlos con su precio neto y el total con IVA.',
      ] },
      { heading: 'Qué revisar antes de cotizar', paragraphs: [
        'Mide la superficie a cubrir, define el porcentaje objetivo con quien cultiva y revisa la sujeción y los encuentros entre paños. Envíanos el porcentaje, el ancho, el largo y la cantidad de rollos para confirmar disponibilidad y flete antes del pago.',
      ], list: [
        'Mensaje de ejemplo: «Hola, quiero cotizar malla raschel 65 % verde, 2,10 x 100 m, 4 rollos para Quillota».',
      ] },
    ],
  },
  {
    path: '/blog/antiafido-40-o-50-mesh',
    slug: 'antiafido-40-o-50-mesh',
    title: 'Malla antiáfido 40 o 50 mesh | Blog RUVER',
    headline: 'Malla antiáfido: ¿40 mesh o 50 mesh?',
    description: 'Compara malla antiáfido 40 y 50 mesh por poro, sombra y formato de rollo antes de cotizar. Guía del catálogo RUVER con precios y pasos de pedido.',
    date: '2026-10-26',
    dateLabel: '26 de octubre de 2026',
    category: '/malla-antiafido',
    sections: [
      { heading: 'Para qué sirve la malla antiáfido', paragraphs: [
        'Bloquea el paso de trips, áfidos, mosca blanca y pulgones, y deja pasar el aire entre los paños. En el catálogo se indica que reduce la necesidad de aplicar insecticidas; la eficacia real depende también de la instalación y del cierre de accesos.',
      ] },
      { heading: '40 mesh (16/10): más ventilación', paragraphs: [
        'El formato 16/10 de 40 mesh se vende en rollos de 4 x 100 m, con 110 g/m², un 24 % de sombra y poros de 0,39 x 0,77 mm. Es la versión con el poro más grande de la familia, elegida cuando la ventilación de la estructura pesa más en el diseño.',
      ] },
      { heading: '50 mesh (20/10): poro más fino', paragraphs: [
        'El formato 20/10 de 50 mesh se vende en rollos de 5 x 100 m, con 125 g/m², un 32 % de sombra y poros de 0,27 x 0,77 mm. Reduce más el tamaño de partícula que deja pasar, y sigue exigiendo asegurar bordes, puertas y empalmes.',
      ], list: [
        'Existe además la variante 50 mesh en color negro del mismo formato de 5 x 100 m.',
      ] },
      { heading: 'Cómo elegir la medida', paragraphs: [
        'Parte de la plaga objetivo y del cultivo: revisa qué combinación de mesh encaja con la ventilación necesaria y el tipo de estructura. Luego decide ancho y largo del rollo según tus paños; los precios por rollo están en la página de la categoría.',
      ] },
    ],
  },
  {
    path: '/blog/bandejas-almacigueras-celdas',
    slug: 'bandejas-almacigueras-celdas',
    title: 'Bandejas almacigueras según el cultivo | Blog RUVER',
    headline: 'Bandejas almacigueras: cuál elegir según el cultivo',
    description: 'Bandejas almacigueras de 50, 72, 128, 200 y 288 celdas con el cultivo recomendado en cada caso, y la diferencia entre bandeja suelta y caja de 100.',
    date: '2026-10-26',
    dateLabel: '26 de octubre de 2026',
    category: '/bandejas-almacigueras',
    sections: [
      { heading: 'Por qué importa el número de celdas', paragraphs: [
        'Las bandejas almacigueras permiten producir plantines uniformes y trasplantarlos sin dañar la raíz. El número de celdas decide cuánto espacio tiene cada plantín y cuántos bandejas necesitas para tu superficie.',
      ] },
      { heading: 'Elección de alvéolos según cultivo', paragraphs: [
        'La correspondencia del catálogo entre celdas y cultivos recomendados es la siguiente:',
      ], list: [
        '50 celdas: sandía, melón, zapallo y pepino.',
        '72 celdas: cucurbitáceas, frutales y forestales.',
        '128 celdas: tomate, pimiento, ají y berenjena.',
        '200 celdas: lechuga, brócoli, repollo y coliflor.',
        '288 celdas: cebolla, apio, lechuga y aromáticas.',
      ] },
      { heading: 'Bandeja suelta o caja de 100', paragraphs: [
        'El catálogo vende la bandeja por unidad y también en cajas de 100 unidades, con precios netos al costado del total con IVA. Comprueba siempre la presentación de cada variante antes de comprar: el precio de una bandeja suelta no se compone directamente con el de la caja, y el despacho depende del volumen de cajas.',
      ] },
      { heading: 'Qué enviar para cotizar', paragraphs: [
        'Indica el número de celdas y la cantidad que necesitas, más tu comuna. Con eso confirmamos presentación, disponibilidad, flete y plazo antes del pago.',
      ] },
    ],
  },
  {
    path: '/blog/cinta-de-riego-6-mil',
    slug: 'cinta-de-riego-6-mil',
    title: 'Cinta de riego por goteo 6 mil | Blog RUVER',
    headline: 'Cinta de riego por goteo: qué revisar antes de comparar',
    description: 'Especificaciones de la cinta de riego por goteo 6 mil de RUVER: rollo de 2.500 metros, goteros a 10, 15 o 20 cm y caudal de 1,1 L/h. Qué revisar y qué enviar para cotizar.',
    date: '2026-10-26',
    dateLabel: '26 de octubre de 2026',
    category: '/cintas-de-riego',
    sections: [
      { heading: 'Dónde funciona bien', paragraphs: [
        'El riego por goteo lleva el agua directo a la raíz. La cinta de 6 mil del catálogo está pensada para hortalizas de una temporada, donde el montaje se renueva entre ciclos de siembra.',
      ] },
      { heading: 'Especificaciones del rollo', paragraphs: [
        'Estas son las especificaciones publicadas del formato disponible:',
      ], list: [
        'Espesor: 6 mil.',
        'Distancia entre goteros: 10, 15 o 20 cm.',
        'Rollo: 2.500 metros lineales.',
        'Caudal por gotero: 1,1 L/h.',
      ] },
      { heading: 'Datos para cotizar', paragraphs: [
        'Antes de comprar, revisa el diseño hidráulico y la calidad del agua: indica la superficie y el largo de las hileras, la separación entre plantas y la especificación de cinta que necesitas. Con esos datos confirmamos compatibilidad con tu filtrado y el resto del sistema.',
      ], list: [
        'Mensaje de ejemplo: «Hola, quiero cotizar cinta de riego 6 mil con goteros cada 15 cm para 2.000 metros de hilera; comuna de Quillota».',
      ] },
    ],
  },
];

// Utilidades compartidas con la compilación y las pruebas.
export function blogPages() {
  return [BLOG_INDEX, ...BLOG_POSTS];
}
