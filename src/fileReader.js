import { readFile } from 'fs/promises';

/**
 * Leer un archivo JSON desde la carpeta input.
 * 
 * @param {string} fileName Nombre del archivo. Por defecto `data.json`
 * @returns La lista de ventas registradas en el archivo JSON
 */
export const readJsonFile = async (fileName = 'data.json') => {
  try {
    const json = await readFile(`./input/${fileName}`, 'utf-8');
    return JSON.parse(json);
  } catch (err) {
    console.log(`Error al leer el archivo ./input/${fileName}:`, err.message);
  }
  
};