// import fs from 'fs/promises';
import fs from 'fs';

export const locationData = await fs.readFileSync('./location.json', 'utf-8');

// const config = await fs.readFile('./location.json', 'utf-8');
fs.appendFileSync('logs.txt', `Server started at ${new Date()}\n`);

if (!fs.existsSync('./data.json')) {
  fs.writeFileSync('./data.json', JSON.stringify([]));
}
