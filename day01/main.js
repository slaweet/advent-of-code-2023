if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

const fs = require('fs');
const filename = process.argv[2];

const replacements = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};
const replacementRegex = new RegExp(Object.keys(replacements).toString().replace(/,/g, '|'));

function replaceSpelledDigits(line) {
  while (line.match(replacementRegex)) {
    const matches = line.match(replacementRegex);
    line = line.replace(matches[0], replacements[matches[0]]);
  }
  return line;
}

try {
  const data = fs.readFileSync(filename, 'utf8');
  const rows = data.toString().split('\n');
  const output = rows
    .map(replaceSpelledDigits)
    .map(line => line.replace(/[\D]/g, ''))
    .map(digits => parseFloat(`${digits[0]}${digits[digits.length - 1]}`))
    .filter(number => !Number.isNaN(Number(number)))
    .reduce((number, sum) => sum + number, 0);

  console.log(output);
} catch(e) {
  console.log('Error:', e.stack);
}
