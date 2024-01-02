const day = 19;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let rows = og_input.split("\n");

// PART 2
let total = 0;
for (let s = 0; s < rows.length; s++) {
}

// let outputStr = '';
// for (let r = 0; r < grid.length; r++) {
//   outputStr += grid[r].join("") + "\n";
// }
// const outputFile = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'output' : 'input') + '.txt';
// let output = fs.writeFileSync(outputFile, outputStr, 'utf-8');

console.log("ANSWER", total);