import { readJsonFile } from './fileReader.js';
import { processSales } from './processor.js';
import { writeFileOutputData } from './fileWriter.js';
import { deduplicateSales } from './deduplicator.js';

const main = async () => {
  const data = await readJsonFile();
  const {validSales, discardReasons} = processSales(data);
  const {uniqueOrders: deduplicatedSales, descardedDuplicates: CountDuplicated} = deduplicateSales(validSales);
  await writeFileOutputData(deduplicatedSales);
}

main();