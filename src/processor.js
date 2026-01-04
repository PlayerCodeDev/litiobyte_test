import { normalizeAmount } from './normalizes/amount.js';
import { normalizeCurrency } from './normalizes/currency.js';
import { normalizeDate } from './normalizes/date.js';
import { saleValidator } from './validators/saleValidator.js';

/**
 * Procesa una lista de registros de ventas.
 * 
 * @param {Array<Object>} sales Lista de registros de ventas
 * @returns { { validSales: Array<Object>, discardReasons: Record<string, number>} }
 */
export const processSales = ( sales ) => {
  const validSales = [];
  const discardReasons = {};

  for (const order of sales) {
    const { isValid, reason } = saleValidator(order);

    if (!isValid) {
      discardReasons[reason] = (discardReasons[reason] || 0) +1;
      continue;
    }

    try {
      const normalizedOrder = {
        order_id: order.order_id,
        amount: normalizeAmount(order.amount),
        currency: normalizeCurrency(order.currency),
        date: normalizeDate(order.date),
      };

      const { isValid, reason } = saleValidator(normalizedOrder);

      if (!isValid) {
        discardReasons[reason] = (discardReasons[reason] || 0) +1;
        continue;
      }

      validSales.push(normalizedOrder);
    } catch (err) {
      console.log(err);
    }
  }

  return {
    validSales,
    discardedCount: sales.length - validSales.length,
    discardReasons,
  };
}