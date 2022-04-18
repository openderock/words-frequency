// @ts-check
console.time('done');
const fs = require('fs');

const csvSource = fs.readFileSync(
  './resources/project-gutenberge-20000-common-words.csv',
  { encoding: 'utf8' }
);

const rows = csvSource.split('\n').map((row) => row.split(','));
rows.shift();

const cleanedWords = rows
  .filter(
    ([rank, word, count]) => count && word.length > 1 && /^[a-z]+$/.test(word)
  )
  .map(([rank, word, count], index) => [
    index + 1,
    word,
    (parseInt(count) * 100) / Math.pow(10, 9),
  ]);

// saving as CSV
const csvRows = cleanedWords.map((row) => row.join(','));
csvRows.unshift('Rank,Word,Occurrence percentage');
fs.writeFileSync('./dist/words-frequency.csv', csvRows.join('\n'), {
  encoding: 'utf-8',
});

// saving as JS
const jsArray = cleanedWords
  .map(([rank, word, percentage]) => `[${rank},"${word}",${percentage}]`)
  .join(',');
fs.writeFileSync('./dist/words-frequency.js', `module.exports=[${jsArray}];`, {
  encoding: 'utf-8',
});

// saving as JSON
fs.writeFileSync('./dist/words-frequency.json', JSON.stringify(cleanedWords), {
  encoding: 'utf-8',
});

// saving as SQL
fs.writeFileSync(
  './dist/words-frequency.sql',
  `
-- DROP TABLE IF EXISTS "Word";
-- CreateTable
-- CREATE TABLE "Word" (
--   "rank" INTEGER NOT NULL,
--   "word" TEXT NOT NULL,
--   "occurrence" DOUBLE PRECISION NOT NULL,
--   CONSTRAINT "Word_pkey" PRIMARY KEY ("rank")
-- );
INSERT INTO 
  "Word" (rank, word, occurrence)
VALUES ${cleanedWords
    .map(
      ([rank, word, percentage]) => `
  (${rank},'${word}',${percentage})`
    )
    .join(',')};
`,
  { encoding: 'utf-8' }
);

console.timeEnd('done');
