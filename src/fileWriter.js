import { writeFile } from 'fs/promises';

/**
 * Escribir contenido en el chivo JSON disponible en la carpeta `output`.
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

export const writeFileOutputReport = async ( fileContent ) => {
  try {
    await writeFile(`./output/report.txt`, fileContent.join('\n'));
  } catch (err) {
    console.error(`Error al crear el archivo ./output/report.txt`, err.message);
  }
}