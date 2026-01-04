import { readJsonFile } from './fileReader.js';
import { processSales } from './processor.js';
import { writeFileOutputData } from './fileWriter.js';

const main = async () => {
  const data = await readJsonFile();
  const processResult = processSales(data);
  await writeFileOutputData(processResult.discardReasons);
}

main();