import { PAGES } from './routes.js';
import { BLOG_INDEX } from './blog.js';
import { clearConsent, CONSENT_EVENT } from './consent.js';

export function Hero({onQuote = () => {}}) { return (<section id="inicio" className="s8 section-inicio">
<div className="s9">
<div className="s10">
<h1 className="s11">Insumos agrícolas en Quillota para proteger tu cultivo</h1>
<p className="s12">Mallas agrícolas, bandejas almacigueras y cintas de riego. Pide tu cotización por WhatsApp y te respondemos con precio y disponibilidad.</p>
<div className="s13">
<a href="#contacto" className="s14" onClick={() => onQuote("")}>Pedir cotización</a>
<a href="#mallas" className="s15">Ver productos</a>
</div>
<div className="s16">
<span>Disponibilidad por confirmar</span>
<span>Despacho a todo Chile</span>
</div>
</div>
<div className="s17">
<img src="/images/0914ad0ee180.jpg" alt="Sombreadero con malla raschel" className="s18" decoding="async" loading="eager" />
<img src="/images/e4209fc7f047.jpg" alt="Túneles cubiertos con malla antihelada" className="s18" decoding="async" loading="eager" />
<img src="/images/144daa186560.jpg" alt="Malla antimaleza con plantines" className="s18" decoding="async" loading="eager" />
<img src="/images/a5eb8be00dce.jpg" alt="Bandejas almacigueras con plantines" className="s18" decoding="async" loading="eager" />
</div>
</div>
</section>); }

export function HowToBuy({onQuote = () => {}}) { return (<section className="s19 section-steps">
<div className="s20">
<h2 className="s21">Cómo comprar</h2>
<div className="s22">
<div className="s23">
<span className="s24">1</span>
<div className="s25">
<strong className="s26">Elige el producto</strong>
<span>Revisa las medidas y tipos disponibles en cada sección.</span>
</div>
</div>
<div className="s23">
<span className="s24">2</span>
<div className="s25">
<strong className="s26">Pide tu cotización</strong>
<span>Escríbenos por WhatsApp con la medida y la cantidad. Te enviamos el precio.</span>
</div>
</div>
<div className="s23">
<span className="s24">3</span>
<div className="s25">
<strong className="s26">Recibe tu pedido</strong>
<span>Despachamos a todo Chile. El flete se cobra según la zona y la dirección de despacho.</span>
</div>
</div>
</div>
</div>
</section>); }

export function Discounts({onQuote = () => {}}) { return (<section id="descuentos" className="s27 section-descuentos">
<div className="s28">
<div className="s29">
<h2 className="s21">Descuentos por volumen y para clientes habituales</h2>
<p className="s30">Los precios publicados son por ventas al detalle y más IVA. Por compras de volumen o si eres cliente habitual, te hacemos descuento. Por eso siempre conviene cotizar directamente con nosotros.</p>
</div>
<div className="s31">
<a href="https://wa.me/56987316764" target="_blank" rel="noopener" className="s32">WhatsApp +56 9 8731 6764</a>
<a href="mailto:insumosruver@gmail.com" className="s33">insumosruver@gmail.com</a>
</div>
</div>
</section>); }

export function Meshes({onQuote = () => {}}) { return (<section id="mallas" className="s34 section-mallas">
<div className="s35">
<div className="s36">
<h2 className="s37">Mallas agrícolas</h2>
<p className="s38">Cuatro tipos de malla para proteger el cultivo de los insectos, el sol, la maleza y las heladas. Todas con resistencia a los rayos UV. Todos los precios son más IVA.</p>
</div>
<div className="s39">

<article className="s40 product-card">
<img src="/images/d3615e3d5b46.jpg" alt="Tejido de la malla antiáfido" className="s41" decoding="async" loading="lazy" />
<div className="s42">
<h3 className="s43">Malla antiáfido</h3>
<p className="s44">Bloquea trips, áfidos, mosca blanca y pulgones, y deja pasar el aire. Reduce la necesidad de aplicar insecticidas.</p>
<dl className="s45">
<div className="s46"><dt className="s47">Material</dt><dd className="s48">Monofilamento de HDPE, color cristal</dd></div>
<div className="s46"><dt className="s47">16/10 (40 mesh)</dt><dd className="s48">Rollo de 4 × 100 m, 110 g/m², 24 % de sombra, poro de 0,39 × 0,77 mm</dd></div>
<div className="s46"><dt className="s47">20/10 (50 mesh)</dt><dd className="s48">Rollo de 5 × 100 m, 125 g/m², 32 % de sombra, poro de 0,27 × 0,77 mm</dd></div>
</dl>
<details className="price-details"><summary>Ver medidas y precios <span aria-hidden="true">+</span></summary><div className="table-scroll"><table className="precios product-table">
<thead>
<tr><th scope="col">Medida</th><th scope="col">Precio por rollo + IVA</th></tr>
</thead>
<tbody>
<tr><td>40 mesh, 2 × 100 m</td><td>$187.030</td></tr>
<tr><td>40 mesh, 3 × 100 m</td><td>$298.798</td></tr>
<tr><td>40 mesh, 4 × 100 m</td><td>$372.538</td></tr>
<tr><td>40 mesh, 5 × 100 m</td><td>$526.604</td></tr>
<tr><td>50 mesh, 5 × 100 m</td><td>$539.898</td></tr>
<tr><td>50 mesh, 5 × 100 m, negro</td><td>$585.410</td></tr>
</tbody>
</table></div></details>
<a href="#contacto" className="s49" onClick={() => onQuote("Malla antiáfido")}>Cotizar malla antiáfido</a>
</div>
</article>

<article className="s40 product-card">
<img src="/images/0914ad0ee180.jpg" alt="Sombreadero con malla raschel" className="s41" decoding="async" loading="lazy" />
<div className="s42">
<h3 className="s43">Malla raschel</h3>
<p className="s44">Red tejida de polietileno de alta densidad. Sirve para sombreaderos, cortavientos, cierres, estacionamientos y secado de fruta.</p>
<dl className="s45">
<div className="s46"><dt className="s47">Sombra</dt><dd className="s48">35 %, 50 %, 65 %, 80 % y 90 %</dd></div>
<div className="s46"><dt className="s47">Ancho</dt><dd className="s48">2,10 m y 4,20 m</dd></div>
<div className="s46"><dt className="s47">Largo</dt><dd className="s48">Rollos de 50 y 100 m</dd></div>
<div className="s46"><dt className="s47">Colores</dt><dd className="s48">Negro, verde, verde oscuro, blanco, beige, azul, gris, azul y blanco, verde y blanco</dd></div>
</dl>
<details className="price-details"><summary>Ver medidas y precios <span aria-hidden="true">+</span></summary><div className="table-scroll"><table className="precios product-table">
<thead>
<tr><th scope="col">Sombra, color y medida</th><th scope="col">Precio por rollo + IVA</th></tr>
</thead>
<tbody>
<tr><td>65 % negro, 2,10 × 100 m</td><td>$58.414</td></tr>
<tr><td>65 % negro, 4,20 × 100 m</td><td>$120.716</td></tr>
<tr><td>65 % verde, 2,10 × 100 m</td><td>$60.642</td></tr>
<tr><td>65 % verde, 4,20 × 100 m</td><td>$119.180</td></tr>
<tr><td>65 % azul y blanco, 4,20 × 100 m</td><td>$101.580</td></tr>
<tr><td>65 % verde y blanco, 4,20 × 100 m</td><td>$162.000</td></tr>
<tr><td>80 % negro, 2,10 × 50 m</td><td>$35.054</td></tr>
<tr><td>80 % negro, 2,10 × 100 m</td><td>$70.110</td></tr>
<tr><td>80 % negro, 4,20 × 100 m</td><td>$141.746</td></tr>
<tr><td>80 % verde, 2,10 × 50 m</td><td>$37.420</td></tr>
<tr><td>80 % verde, 2,10 × 100 m</td><td>$74.728</td></tr>
<tr><td>80 % verde, 4,20 × 100 m</td><td>$149.598</td></tr>
<tr><td>80 % blanco, 2,10 × 100 m</td><td>$74.778</td></tr>
<tr><td>80 % blanco, 4,20 × 100 m</td><td>$143.010</td></tr>
<tr><td>90 % verde y negro, 2,10 × 100 m</td><td>$282.000</td></tr>
<tr><td>90 % negro, 4,20 × 100 m</td><td>$319.064</td></tr>
<tr><td>90 % verde, 4,20 × 100 m</td><td>$301.700</td></tr>
<tr><td>90 % beige, 4,20 × 100 m</td><td>$301.700</td></tr>
<tr><td>90 % plata, 4,20 × 100 m</td><td>$301.700</td></tr>
<tr><td>90 % azul, 4,20 × 100 m</td><td>$564.000</td></tr>
</tbody>
</table></div></details>
<a href="#contacto" className="s49" onClick={() => onQuote("Malla raschel")}>Cotizar malla raschel</a>
</div>
</article>

<article className="s40 product-card">
<img src="/images/144daa186560.jpg" alt="Malla antimaleza instalada con plantines" className="s41" decoding="async" loading="lazy" />
<div className="s42">
<h3 className="s43">Malla antimaleza</h3>
<p className="s44">Controla la maleza al bloquear la luz, baja la temperatura del suelo y reduce la pérdida de agua. Trae líneas guía a lo largo.</p>
<dl className="s45">
<div className="s46"><dt className="s47">Material</dt><dd className="s48">Rafia de HDPE con protección UV, color negro</dd></div>
<div className="s46"><dt className="s47">Peso</dt><dd className="s48">95 g/m²</dd></div>
<div className="s46"><dt className="s47">Resistencia</dt><dd className="s48">19 kN/m en urdimbre y 12 kN/m en trama</dd></div>
<div className="s46"><dt className="s47">Permeabilidad</dt><dd className="s48">6,7 L/m² por segundo</dd></div>
</dl>
<details className="price-details"><summary>Ver medidas y precios <span aria-hidden="true">+</span></summary><div className="table-scroll"><table className="precios product-table">
<thead>
<tr><th scope="col">Medida</th><th scope="col">Precio por rollo + IVA</th></tr>
</thead>
<tbody>
<tr><td>0,70 × 100 m</td><td>$32.276</td></tr>
<tr><td>0,70 × 400 m</td><td>$129.076</td></tr>
<tr><td>1 × 50 m</td><td>$25.876</td></tr>
<tr><td>1 × 100 m</td><td>$44.728</td></tr>
<tr><td>1,20 × 100 m</td><td>$55.314</td></tr>
<tr><td>1,20 × 400 m</td><td>$224.904</td></tr>
<tr><td>1,40 × 100 m</td><td>$64.522</td></tr>
<tr><td>1,40 × 400 m</td><td>$266.028</td></tr>
<tr><td>1,60 × 200 m</td><td>$136.958</td></tr>
<tr><td>1,60 × 400 m</td><td>$273.944</td></tr>
<tr><td>1,80 × 100 m</td><td>$84.698</td></tr>
<tr><td>2 × 5 m</td><td>$7.428</td></tr>
<tr><td>2 × 10 m</td><td>$12.512</td></tr>
<tr><td>2 × 25 m</td><td>$23.970</td></tr>
<tr><td>2 × 50 m</td><td>$79.470</td></tr>
<tr><td>2 × 100 m</td><td>$85.594</td></tr>
<tr><td>4 × 100 m</td><td>$171.218</td></tr>
<tr><td>4 × 200 m</td><td>$376.380</td></tr>
<tr><td>4 × 400 m</td><td>$1.047.056</td></tr>
</tbody>
</table></div></details>
<a href="#contacto" className="s49" onClick={() => onQuote("Malla antimaleza")}>Cotizar malla antimaleza</a>
</div>
</article>

<article className="s40 product-card">
<img src="/images/e4209fc7f047.jpg" alt="Túneles cubiertos con malla antihelada" className="s41" decoding="async" loading="lazy" />
<div className="s42">
<h3 className="s43">Malla antihelada</h3>
<p className="s44">Manto térmico de polipropileno no tejido. Retiene el calor del suelo y protege las plantas en las noches de helada.</p>
<dl className="s45">
<div className="s46"><dt className="s47">Peso</dt><dd className="s48">17 g/m²</dd></div>
</dl>
<details className="price-details"><summary>Ver medidas y precios <span aria-hidden="true">+</span></summary><div className="table-scroll"><table className="precios product-table">
<thead>
<tr><th scope="col">Medida</th><th scope="col">Precio por rollo + IVA</th></tr>
</thead>
<tbody>
<tr><td>1,04 × 50 m</td><td>$6.494</td></tr>
<tr><td>1,04 × 100 m</td><td>$12.388</td></tr>
<tr><td>1,04 × 500 m</td><td>$46.908</td></tr>
<tr><td>1,04 × 1.000 m</td><td>$101.686</td></tr>
<tr><td>1,40 × 500 m</td><td>$65.490</td></tr>
<tr><td>1,40 × 1.000 m</td><td>$147.504</td></tr>
<tr><td>2,10 × 50 m</td><td>$11.872</td></tr>
<tr><td>2,10 × 100 m</td><td>$24.464</td></tr>
<tr><td>2,10 × 500 m</td><td>$98.634</td></tr>
<tr><td>3,10 × 500 m</td><td>$145.902</td></tr>
<tr><td>3,10 × 1.000 m</td><td>$301.472</td></tr>
<tr><td>4,10 × 500 m</td><td>$235.430</td></tr>
<tr><td>16 × 250 m</td><td>$491.716</td></tr>
</tbody>
</table></div></details>
<a href="#contacto" className="s49" onClick={() => onQuote("Malla antihelada")}>Cotizar malla antihelada</a>
</div>
</article>

</div>
</div>
</section>); }

export function Trays({onQuote = () => {}}) { return (<section id="bandejas" className="s19 section-bandejas">
<div className="s50">
<div className="s51">
<img src="/images/a5eb8be00dce.jpg" alt="Bandejas almacigueras con plantines" className="s18" decoding="async" loading="lazy" />
<h2 className="s52">Bandejas almacigueras</h2>
<p className="s44">Para producir plantines uniformes y trasplantar sin dañar la raíz. Elige el número de celdas según tu cultivo.</p>
<a href="#contacto" className="s53" onClick={() => onQuote("Bandejas")}>Cotizar bandejas</a>
</div>
<div className="s54">
<div className="table-scroll"><table className="product-table">
<thead>
<tr><th scope="col">Celdas</th><th scope="col">Cultivos recomendados</th><th scope="col">Precio por unidad + IVA</th><th scope="col">Caja de 100 unidades + IVA</th></tr>
</thead>
<tbody>
<tr><td><strong>50 celdas</strong></td><td>Sandía, melón, zapallo, pepino</td><td className="s55">$1.200</td><td className="s55">$80.000</td></tr>
<tr><td><strong>72 celdas</strong></td><td>Cucurbitáceas, frutales y forestales</td><td className="s55">$1.200</td><td className="s55">$80.000</td></tr>
<tr><td><strong>128 celdas</strong></td><td>Tomate, pimiento, ají, berenjena</td><td className="s55">$1.200</td><td className="s55">$80.000</td></tr>
<tr><td><strong>200 celdas</strong></td><td>Lechuga, brócoli, repollo, coliflor</td><td className="s55">$1.200</td><td className="s55">$80.000</td></tr>
<tr><td><strong>288 celdas</strong></td><td>Cebolla, apio, lechuga, aromáticas</td><td className="s55">$1.200</td><td className="s55">$80.000</td></tr>
</tbody>
</table></div>
</div>
</div>
</section>); }

export function Irrigation({onQuote = () => {}}) { return (<section id="cintas" className="s34 section-cintas">
<div className="s50">
<div className="s51">
<div className="s56"></div>
<h2 className="s52">Cintas de riego</h2>
<p className="s44">Riego por goteo que lleva el agua directo a la raíz. Cinta de 6 mil de espesor, con goteros a 10, 15 o 20 cm.</p>
<a href="#contacto" className="s53" onClick={() => onQuote("Cintas")}>Cotizar cintas</a>
</div>
<div className="s54">
<div className="table-scroll"><table className="product-table">
<thead>
<tr><th scope="col">Espesor</th><th scope="col">Uso</th><th scope="col">Distancia entre goteros</th><th scope="col">Precio + IVA</th></tr>
</thead>
<tbody>
<tr><td><strong>6 mil</strong></td><td>Hortalizas de una temporada</td><td>10, 15 o 20 cm</td><td>$125.000 el rollo de 2.500 metros lineales</td></tr>
</tbody>
</table></div>
<p className="s57">Rollos de 2.500 metros lineales. Caudal por gotero: 1,1 L/h.</p>
</div>
</div>
</section>); }

export function Footer({ path = '' }) { return (<footer className="s104">
<div className="s105">
<div className="footer-brand">
<span>Insumos Agrícolas RUVER</span>
<span className="footer-detail">Mallas agrícolas, bandejas almacigueras y cintas de riego</span>
<span className="footer-detail">Insuagri Ruver SpA · RUT 77.872.414-6 · Av. San Isidro 21H, Quillota, Chile</span>
</div>
<nav className="footer-legal" aria-label="Documentos legales">
<a href={BLOG_INDEX.path}>Blog de guías</a>
{PAGES.map(page => <a key={page.path} href={page.path} className={page.path === path ? 'is-selected' : ''}>{page.full}</a>)}
<button type="button" className="footer-legal-button" onClick={() => { clearConsent(); window.dispatchEvent(new CustomEvent(CONSENT_EVENT)); }}>Ajustes de cookies</button>
</nav>
</div>
</footer>); }
