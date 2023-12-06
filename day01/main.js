if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

const fs = require('fs');
const filename = process.argv[2];

try {
  const data = fs.readFileSync(filename, 'utf8');
  const rows = data.toString().split('\n');
  const output = rows
    .map(line => line.replace(/[\D]/g, ''))
    .map(digits => parseFloat(`${digits[0]}${digits[digits.length - 1]}`))
    .filter(number => !Number.isNaN(Number(number)))
    .reduce((number, sum) => sum + number, 0);

  console.log(output);
} catch(e) {
  console.log('Error:', e.stack);
}
