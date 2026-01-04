import { normalizeAmount } from '../normalizes/amount.js';

/**
 * Procesa una lista de registros de ventas.
 * 
 * @param {Array<Object>} sales Lista de registros de ventas
 * @returns { { validSales: Array<Object> } }
 */
export const processSales = ( sales ) => {
  const validSales = [];

  for (const order of sales) {
    try {
      const normalizedSales = {
        order_id: order.order_id,
        amount: normalizeAmount(order.amount),
        currency: order.currency,
        date: order.date,
      };

      validSales.push(normalizedSales);
    } catch (err) {
      console.log(err);
    }
  }

  return validSales;
}