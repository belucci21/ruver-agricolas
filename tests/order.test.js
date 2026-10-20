import test from 'node:test';
import assert from 'node:assert/strict';
import { totals, sanitizeCart, validQuantity, parseAmount, orderMessage, newOrderCode } from '../src/order.js';

test('referencia funciona también en HTTP sin randomUUID', () => {
  const code = newOrderCode({getRandomValues: bytes => bytes.fill(15)});
  assert.match(code, /^RUVER-[a-f0-9]{32}$/);
});

test('calcula precios originales e IVA chileno con redondeo al peso', () => {
  assert.deepEqual(totals([{id:0,quantity:2}]), {net:374060,tax:71071,total:445131});
  assert.deepEqual(totals([]), {net:0,tax:0,total:0});
});
test('rechaza cantidades negativas, decimales y excesivas', () => {
  for (const value of ['0', '-1', '1.5', 'abc', '', '10000', '1e3']) assert.equal(validQuantity(value), false);
  assert.equal(validQuantity('3'), true);
});
test('recupera solo productos y cantidades válidos del almacenamiento', () => {
  assert.deepEqual(sanitizeCart([null,{id:999,quantity:1},{id:0,quantity:-1},{id:0,quantity:2},{id:0,quantity:3}]), [{id:0,quantity:5}]);
  assert.deepEqual(sanitizeCart({}), []);
});
test('importes CLP aceptan puntos de miles sin convertir entradas erróneas', () => {
  assert.equal(parseAmount('450.000'),450000);
  assert.equal(parseAmount('450000'),450000);
  for (const value of ['-450000','450,50','450.50','0','abc','1e3','999999999999']) assert.equal(parseAmount(value),0);
});
test('pedido transmite productos, IVA, referencia y flete pendiente', () => {
  const message = orderMessage([{id:0,quantity:2}], 'RUVER-123');
  assert.match(message,/RUVER-123/); assert.match(message,/2 rollos/);
  assert.match(message,/445\.131/); assert.match(message,/Flete: por confirmar/);
  assert.doesNotMatch(message,/pagué/);
  assert.match(orderMessage([{id:0,quantity:2}], 'RUVER-123', true),/Adjunto el comprobante/);
});
