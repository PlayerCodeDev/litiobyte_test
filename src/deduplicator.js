/**
 * Eliminar registros de ventas duplicadas.
 * 
 * Dos ventas se concideran duplicadas cuando comparten al mismo tiempo:
 * - El identificador (order_id)
 * - El monto del pedido (amount)
 * - El Código de moneda (currency)
 * - Fecha del pedido (date)
 * 
 * @param {Array<Object>} sales Lista de registros de ventas
 * @returns {{uniqueOrders: Array<Object>, descardedDuplicates: number}}
 */
export const deduplicateSales = ( sales ) => {
  const uniqueOrdersMap = new Map();
  let duplicatedCount = 0;

  for (const order of sales) {
    const keys = [
      order.order_id,
      order.amount,
      order.currency,
      order.date,
    ].join('|');

    if (uniqueOrdersMap.has(keys)) {
      duplicatedCount++;
      continue;
    }

    uniqueOrdersMap.set(keys, order);
  }

  return {
    uniqueOrders: Array.from(uniqueOrdersMap.values()),
    descardedDuplicates: duplicatedCount,
  };
};
