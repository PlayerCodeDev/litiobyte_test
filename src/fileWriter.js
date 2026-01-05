import { writeFile, appendFile } from 'fs/promises';

/**
 * Escribir contenido en el archivo JSON disponible en la carpeta `output`.
 * Si no hay uno disponible lo crea.
 * 
 * @param {string} fileContent Contenido que se agregará al archivo JSON.
 */
export const writeFileOutputData = async ( fileContent ) => {
  try {
    const data = JSON.stringify(fileContent, null, 2);
    await writeFile(`./output/data.json`, data, 'utf-8');
  } catch (err) {
    console.error(`Error al crear el archivo ./output/data.json:`, err.message);
  }
}

/**
 * Escribir contenido en el archivo txt disponible en la carpeta `output` destinada a reportes.
 * 
 * @param {string} fileContent Contenido que se agregará al archivo de reporte.
 */
export const writeFileOutputReport = async ( fileContent ) => {
  try {
    await writeFile(`./output/report.txt`, fileContent.join('\n'));
  } catch (err) {
    console.error(`Error al crear el archivo ./output/report.txt`, err.message);
  }
}

/**
 * Agregar registros al archivo de logs.
 * 
 * @param {'INFO', 'WARNING', 'ERROR'} level Prefijo para el mensaje de logs
 * @param {string} message Mensaje del registro de logs
 * @param {object} data Información para agregar al registro
 */
export const writeLog = async (level, message, data = null) => {
  const timestamp = new Date().toISOString();
  let logEntry = `[${timestamp}] [${level}] ${message}`;
  
  if (data) {
    logEntry += ` | data=${JSON.stringify(data)}`;
  }

  logEntry += '\n';

  try {
    await appendFile(`./logs/process.log`, logEntry, 'utf-8');
  } catch (err) {
    console.error(`Error al escribir logs en ./logs/process.log: `, err.message);
  }
};
