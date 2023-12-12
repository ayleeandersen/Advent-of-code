const day = 11;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let rows = og_input.split('\n');

// PART 1
let total = 0;
let grid = [];
let galaxies = [];
let galaxyNums = 1;
let colGalaxyCounts = new Array(rows.length).fill(0);
for (let r = 0; r < rows.length; r++) {
  let newRow = rows[r].split("");
  if (newRow.indexOf("#") !== -1) {
    for (let c = 0; c < newRow.length; c++) {
      if (newRow[c] === "#") {
        newRow[c] = galaxyNums;
        galaxyNums++;
        colGalaxyCounts[c] = colGalaxyCounts[c] + 1;
      }
    }
  } else {
    grid.push([...newRow]);
  }
  grid.push([...newRow]);
}
let offset = 0;
colGalaxyCounts.forEach((col, i) => {
  if (col === 0) {
    for (let r = 0; r < grid.length; r++) {
      grid[r].splice(i + offset, 0, ".");
    }
    offset++;
  }
});
for (let r = 0; r < grid.length; r++) {
  for (let c = 0; c < grid[r].length; c++) {
    if (!isNaN(grid[r][c])) {
      galaxies.push({ i: grid[r][c], r: r, c: c });
    }
  }
}

for (let i = 0; i < galaxies.length; i++) {
  let galaxy = galaxies[i];
  for (let j = i + 1; j < galaxies.length; j++) {
    let compareTo = galaxies[j];
    diff = Math.abs(galaxy.r - compareTo.r) + Math.abs(galaxy.c - compareTo.c);
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