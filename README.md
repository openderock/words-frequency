# Words frequency

An NPM package for common English words frequency based on 20,000 [common words in Project Gutenberg](https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists#Project_Gutenberg).

## Install

```bash
npm i "@derock.ir/words-frequency"
```

## Usage

```javascript
const wordsFrequency = require('@derock.ir/words-frequency');

console.log(wordsFrequency[0]);
// [1, "the", 5.6271872]
```

Every arry item includes:

* Rank
* Word
* Occurrence percentage

## CSV files

* [The source file with 20,000 words](/resources/project-gutenberge-20000-common-words.csv).
* [The cleaned list with 18,270 words](/dist/words-frequency.csv).
