const day = 14;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let rows = og_input.split('\n');

// PART 1
let total = 0;
let grid = [];
for (let r = 0; r < rows.length; r++) {
  let gridRow = [];
  for (let c = 0; c < rows[r].length; c++) {
    gridRow.push(rows[r][c]);
  }
  grid.push(gridRow);
}

let pushed = true;
while(pushed) {
  pushed = false;
  for (let r = 1; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      let value = grid[r][c];
      if (value === "O") {
        if (grid[r-1][c] === ".") {
          grid[r-1][c] = "O";
          grid[r][c] = ".";
          pushed = true;
        }
      }
    }
  }
}

for (let r = 0; r < grid.length; r++) {
  let numRocks = grid[r].filter(rock => rock === "O").length;
  total += (numRocks * (grid.length - r));
}

let outputStr = '';
for (let r = 0; r < grid.length; r++) {
  outputStr += grid[r].join("") + "\n";
}
const outputFile = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'output' : 'input') + '.txt';
let output = fs.writeFileSync(outputFile, outputStr, 'utf-8');

console.log("ANSWER", total);