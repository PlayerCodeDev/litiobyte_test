/**
 * Normalizar el monto de una venta (`amount`).
 * - Convernit valores de texto a numéricos.
 * - ASegurar que los valores sean siempre positivos.
 * 
 * @param {string|number} amount Monto total de la venta
 * @returns {number} Monto total de la venta en formato numérico positivo
 * @throws Si el monto de la venta es nulo, está vacío o es inválido
 */
export const normalizeAmount = ( amount ) => {
  if (amount === null || amount === undefined || amount === '' ) {
    throw new Error('La venta no tiene un monto asignado');
  }

  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    throw new Error(`El monto de la venta es inválido: ${amount}`);
  }

  return Math.abs(amount);
}