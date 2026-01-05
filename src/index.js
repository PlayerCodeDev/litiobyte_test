import { readJsonFile } from './fileReader.js';
import { processSales } from './processor.js';
import { writeFileOutputData, writeFileOutputReport, writeLog } from './fileWriter.js';
import { deduplicateSales } from './deduplicator.js';

const main = async () => {

  writeLog('INFO', 'Iniciando el procesado de datos.');

  const data = await readJsonFile();

  writeLog('INFO', 'Datos obtenidos desde el archivo.');

  const {validSales, discardedCount, discardReasons} = processSales(data);
  const {uniqueOrders: deduplicatedSales, descardedDuplicates: duplicatedCount} = deduplicateSales(validSales);
  await writeFileOutputData(deduplicatedSales);

  const totalDiscarded = discardedCount + duplicatedCount;

  const reportLines = [
    `Total de registros entrantes: ${data.length}`,
    `Total de registros aprobados: ${deduplicatedSales.length}`,
    `Total de registros descartados: ${totalDiscarded}`,
    '',
    'Rasones de descartes:'
  ];

  for (const [reason, count] of Object.entries(discardReasons)) {
    reportLines.push(` - ${reason}: ${count}`);
  }

  if (duplicatedCount > 0) reportLines.push(` - Registros duplicados: ${duplicatedCount}`);

  await writeFileOutputReport(reportLines);

  writeLog('INFO', 'Proceso terminado con éxito.');
}

main();