import { readJsonFile } from './fileReader.js';
import { processSales } from './processor.js';
import { writeFileOutputData } from './fileWriter.js';

const main = async () => {
  const data = await readJsonFile();
  const validSales = processSales(data);
  await writeFileOutputData(validSales);
}

main();