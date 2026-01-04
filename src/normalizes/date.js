/**
 * Normalizar el formato de fecha a formato ISO (YYYY-MM-DD).
 * 
 * Formatos soportados:
 * - YYYY-MM-DD (ISO)
 * - DD-MM-YYYY
 * - YYYY/MM/DD
 * - DD/MM/YYYY
 * 
 * Si el dato es nulo o inválido se devuelve un dato nulo.
 * 
 * @param {string|null} date Fecha en la que se realiza la venta
 * @returns {string|null}
 */
export const normalizeDate = ( date ) => {
  if (!date) return null;

  if (/^\d{4}[\/\-]\d{2}[\/\-]\d{2}$/.test(date)) {
    const [year, month, day] = date.split(/[\/\-]/);
    return `${year}-${month}-${day}`;
  }

  if (/^\d{2}[\/\-]\d{2}[\/\-]\d{4}$/.test(date)) {
    const [day, month, year] = date.split(/[\/\-]/);
    return `${year}-${month}-${day}`;
  }

  return null;
}