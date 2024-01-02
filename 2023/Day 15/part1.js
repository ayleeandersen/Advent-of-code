const day = 15;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let characterSets = og_input.split(",");

// PART 1
let total = 0;
for (let s = 0; s < characterSets.length; s++) {
  let characters = characterSets[s];
  let subTotal = 0;
  for (let c = 0; c < characters.length; c++) {
    let newValue = characters[c].charCodeAt(0) + subTotal;
    // console.log("New total", newValue);
    newValue = newValue * 17;
    // console.log("New total * 17", newValue);
    subTotal = newValue % 256;
    // console.log("Total remainder", subTotal);
  }
  total += subTotal;
}

// let outputStr = '';
// for (let r = 0; r < grid.length; r++) {
//   outputStr += grid[r].join("") + "\n";
// }
// const outputFile = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'output' : 'input') + '.txt';
// let output = fs.writeFileSync(outputFile, outputStr, 'utf-8');

console.log("ANSWER", total);