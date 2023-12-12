const day = 11;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let rows = og_input.split('\n');

// PART 2
let total = 0;
let grid = [];
let galaxies = [];
let galaxyNums = 1;
let colGalaxyCounts = new Array(rows[0].length).fill(0);
let rowGalaxyCounts = new Array(rows.length).fill(0);
for (let r = 0; r < rows.length; r++) {
  let newRow = rows[r].split("");
  if (newRow.indexOf("#") !== -1) {
    rowGalaxyCounts[r] = rowGalaxyCounts[r] + 1;
    for (let c = 0; c < newRow.length; c++) {
      if (newRow[c] === "#") {
        newRow[c] = galaxyNums;
        galaxyNums++;
        colGalaxyCounts[c] = colGalaxyCounts[c] + 1;
      }
    }
  }
  grid.push([...newRow]);
}

for (let r = 0; r < grid.length; r++) {
  for (let c = 0; c < grid[r].length; c++) {
    if (!isNaN(grid[r][c])) {
      galaxies.push({ i: grid[r][c], r: r, c: c });
    }
  }
}

const MUL = 1000000;

for (let i = 0; i < galaxies.length; i++) {
  let galaxy = galaxies[i];
  for (let j = i + 1; j < galaxies.length; j++) {
    let compareTo = galaxies[j];
    diff = Math.abs(galaxy.r - compareTo.r) + Math.abs(galaxy.c - compareTo.c);
    for (let m = (galaxy.r < compareTo.r ? galaxy.r : compareTo.r); m < (galaxy.r < compareTo.r ? compareTo.r : galaxy.r); m++) {
      if (rowGalaxyCounts[m] === 0) {
        diff += (MUL - 1);
      }
    }
    for (let n = (galaxy.c < compareTo.c ? galaxy.c : compareTo.c); n < (galaxy.c < compareTo.c ? compareTo.c : galaxy.c); n++) {
      if (colGalaxyCounts[n] === 0) {
        diff += (MUL - 1);
      }
    }
    // console.log(galaxy, compareTo, diff);
    total += diff;
  }
}

let outputStr = '';
for (let r = 0; r < grid.length; r++) {
  outputStr += grid[r].join("") + "\n";
}
const outputFile = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'output' : 'input') + '.txt';
let output = fs.writeFileSync(outputFile, outputStr, 'utf-8');

console.log("ANSWER", total);