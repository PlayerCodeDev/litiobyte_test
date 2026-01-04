/**
 * Validar un registro de venta.
 * 
 * Campos obligatorios:
 * - order_id
 * - amount
 * 
 * Campos opcionales:
 * - currency
 * - date
 * 
 * @param {object} order Datos de la venta
 * @returns {{isValid: boolean, reason: string|null}} Resultados de la validación
 */
export const saleValidator = ( order ) => {
  if (!order || typeof order !== 'object') {
    return {
      isValid: false,
      reason: 'Registro de venta con estructura inválida',
    };
  }

  if (!order.order_id || typeof order.order_id !== 'string') {
    return {
      isValid: false,
      reason: 'Identificador de la venta faltante o inválida',
    };
  }

  if (order.amount === null || order.amount === undefined || order.amount === '') {
    return {
      isValid: false,
      reason: 'Venta sin monto asingando'
    };
  }

  return {
    isValid: true,
    reason: null,
  };
};
