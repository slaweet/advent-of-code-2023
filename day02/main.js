if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

const fs = require('fs');
const filename = process.argv[2];

const expected = {
 red: 12,
 green: 13,
 blue: 14,
};

function parseLine(line) {
  const [game, sets] = line.split(': ');
  return {
    id: parseFloat(game.replace('Game ', '')),
    sets: sets
      .split('; ').map((set) => (
        set.split(', ').reduce((accumulator, draw) => {
          const [count, color] = draw.split(' ');
          accumulator[color] = parseFloat(count);
          return accumulator;
        }, { red: 0, green: 0, blue: 0 })
      ))
  }
}

try {
  const data = fs.readFileSync(filename, 'utf8');
  const rows = data.toString().split('\n');
  const output = rows
    .filter((line) => line)
    .map(parseLine)
    .map(({ sets }) => (
      Object.values(
        sets.reduce((minSet, set) => ({
          red: Math.max(minSet.red, set.red),
          blue: Math.max(minSet.blue, set.blue),
          green: Math.max(minSet.green, set.green),
        }), { red: 0, green: 0, blue: 0 })
      ).reduce((product, number) => product * number, 1)
    ))
    .reduce((sum, number) => sum + number, 0);

  console.log(output);
} catch(e) {
  console.log('Error:', e.stack);
}

