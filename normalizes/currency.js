/**
 * Normalizar el código de moneda correspondiente al monto total de la venta.
 * - Devuelve un valor nulo si el registro está vacío o es inválido.
 * - Convierte el valor en texto con mayúsculas.
 * 
 * @param {string|null|undefined} currency Código de moneda del valor de la venta
 * @returns {string|null} Valor en mayúsculas
 */
export const normalizeCurrency = ( currency ) => {
  if (currency === null || currency === undefined || currency === '') {
    return null;
  }

  if (typeof currency !== 'string' || !/^[A-Z]{3}$/.test(currency) || currency.length > 3) {
    return null;
  }

  return currency.trim().toUpperCase();
}