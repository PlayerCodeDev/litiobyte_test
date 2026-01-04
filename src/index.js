import { readFile } from 'fs/promises';

const main = async () => {
  try {
    const json = await readFile('./input/data.json', 'utf-8');
    const data = JSON.parse(json);
    console.log(data);
  } catch (err) {
    console.error('Error', err.message);
  }
}

main();